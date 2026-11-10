/* LEXICON II. main.js (vanilla, deferred, no dependencies). The globe lives in globe.js.
 *
 * Where Simon is right now. Change this one object and the edition bar follows.
 */
const HERE = { label: 'Ithaca, N.Y.', tz: 'America/New_York' };

/* EASTER EGGS
 * 1. Look up. Press "/" and type: the lexicon filters live and headwords highlight. Enter jumps to the first hit.
 * 2. 盘龙. A hidden entry under P. Look up "dragon", "panlong", "coiling", "tomato" or "龙", or follow "cf. 盘龙" in Writing.
 * 3. Pinyin. Hover, focus or tap any Chinese word and its pinyin appears above it.
 * 4. Thumb index keys. With the lexicon on screen, press Shift + a letter to jump to it.
 * 5. The date. Click it in the edition bar and it turns to Czech, then Chinese, then Spanish, then back.
 * 6. The console. Open it and there is an entry waiting.
 */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.prototype.slice.call(r.querySelectorAll(s));
  const root = document.documentElement;
  const mq = (q) => (window.matchMedia ? window.matchMedia(q) : { matches: false });
  const reduce = mq('(prefers-reduced-motion: reduce)');
  const narrow = mq('(max-width: 760px)');
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const typing = (e) => { const t = e.target; return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable); };
  const navH = () => { const n = $('#sn'); return n ? n.offsetHeight : 50; };
  const dec = (s) => { try { return decodeURIComponent(s); } catch (e) { return ''; } }; // a mangled hash must not stop the page
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

  /* ------------------------------------------------------------ edition bar clock */
  (function clock() {
    const d = $('#ed-date'), h = $('#ed-here'), l = $('#ed-here-l');
    if (!d || !h) return;
    if (l) l.textContent = HERE.label;
    // the date reads in English until it is clicked, then in each language Simon speaks
    const LOC = [['en-US', 'en'], ['cs-CZ', 'cs'], ['zh-CN', 'zh-Hans'], ['es-ES', 'es']];
    let li = 0, long, short, th;
    const mk = () => {
      long = new Intl.DateTimeFormat(LOC[li][0], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: HERE.tz });
      short = new Intl.DateTimeFormat(LOC[li][0], { weekday: 'short', month: 'short', day: 'numeric', timeZone: HERE.tz });
    };
    try { mk(); th = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: HERE.tz }); } catch (e) { return; }
    const tick = () => {
      const now = new Date();
      d.textContent = (narrow.matches ? short : long).format(now);
      h.textContent = th.format(now);
      h.setAttribute('datetime', now.toISOString());
    };
    tick();
    d.addEventListener('click', () => {
      li = (li + 1) % LOC.length;
      try { mk(); } catch (e) { li = 0; mk(); }
      d.lang = LOC[li][1];
      tick();
    });
    const arm = () => setTimeout(() => { tick(); arm(); }, 60000 - Date.now() % 60000 + 50);
    arm();
    document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
    if (narrow.addEventListener) narrow.addEventListener('change', tick);
  })();

  /* ------------------------------------------------------------ theme */
  const themeBtn = $('#theme'), themeMeta = $('meta[name="theme-color"]');
  const theme = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  const labelTheme = () => { if (themeBtn) themeBtn.setAttribute('aria-label', theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); };
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('lex-theme', t); } catch (e) { /* private mode */ }
    if (themeMeta) themeMeta.content = t === 'dark' ? '#1a1612' : '#f7f2e2';
    labelTheme();
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: t } }));
  }
  labelTheme();
  let wipe = null;
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const t = theme() === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduce.matches) { setTheme(t); return; }
    const b = themeBtn.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.classList.add('theming'); // holds every other transition still until the wipe is over
    const vt = wipe = document.startViewTransition(() => setTheme(t));
    const done = () => { if (wipe === vt) root.classList.remove('theming'); }; // a wipe cut short by a second click must not release the one that replaced it
    vt.finished.then(done, done);
    vt.ready.then(() => {
      root.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 520, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' });
    }).catch(() => {});
  });

  /* ------------------------------------------------------------ lexicon: filters, order, look-up */
  const lex = $('#lex'), wl = $('#wl'), wlList = $('#wl-l'), wlT = $('#wl-t'), empty = $('#empty'), q = $('#q'), sn = $('#sn');
  const SECRET = /dragon|panlong|coiling|tomato|盘|龙/;
  const KIND = { project: 'proj.', work: 'work', writing: 'writ.', community: 'comm.' };
  const letters = lex ? $$('.letter', lex) : [];
  const recs = (lex ? $$('.entry', lex) : []).map((a, i) => {
    const hw = $('.hw', a), lab = $('.gram .lab', a), kinds = (a.getAttribute('data-kind') || '').split(/\s+/).filter(Boolean);
    return {
      el: a, i, home: a.parentNode, id: a.id, hw: a.getAttribute('data-hw') || (hw ? hw.textContent : a.id), hwEl: hw, hwHTML: hw ? hw.innerHTML : '',
      kinds, lab: lab ? lab.textContent : (KIND[kinds[0]] || ''), when: a.getAttribute('data-when') || '', now: a.hasAttribute('data-now'),
      years: a.getAttribute('data-years') || '', secret: a.hasAttribute('data-secret'), major: a.classList.contains('entry--major'), core: a.hasAttribute('data-core'),
      text: norm(a.textContent), vis: true
    };
  });
  const byId = {};
  recs.forEach((r) => { byId[r.id] = r; });
  const st = { f: 'all', o: 'az', q: '', raw: '', userOrd: false, secret: false };
  let laid = '', shown = [], thumb = null;

  // counts: section nav and pills, all from the DOM
  $$('#sn-l a[data-count]').forEach((a) => {
    let n = 0;
    try { n = document.querySelectorAll(a.getAttribute('data-count')).length; } catch (e) { n = 0; }
    if (n) a.appendChild(el('span', 'n', String(n)));
  });
  $$('.pill[data-f]').forEach((b) => {
    const f = b.getAttribute('data-f');
    b.appendChild(el('span', 'n', String(recs.filter((r) => !r.secret && (f === 'all' || r.kinds.indexOf(f) >= 0)).length)));
  });

  function layout() {
    if (st.o === laid) return;
    laid = st.o;
    if (st.o === 'new') {
      recs.slice().sort((a, b) => (b.now - a.now) || (a.when < b.when ? 1 : a.when > b.when ? -1 : 0) || (a.i - b.i)).forEach((r) => lex.appendChild(r.el));
      return;
    }
    recs.forEach((r) => r.home.appendChild(r.el));
  }

  function mark(r) {
    const h = r.hwEl;
    if (!h) return;
    if (h.innerHTML !== r.hwHTML) h.innerHTML = r.hwHTML;
    if (!st.q || h.children.length) return;
    const t = h.textContent, n = norm(t), at = n.indexOf(st.q);
    if (at < 0 || n.length !== t.length) return;
    h.textContent = '';
    h.append(t.slice(0, at), el('mark', 'hl', t.slice(at, at + st.q.length)), t.slice(at + st.q.length));
  }

  function apply() {
    if (!lex) return;
    layout();
    const az = st.o === 'az', secretOn = st.secret || (st.raw && SECRET.test(st.raw.toLowerCase()));
    recs.forEach((r) => {
      if (r.secret) r.vis = !!secretOn && st.f === 'all' && (!st.q || SECRET.test(st.raw.toLowerCase()) || r.text.indexOf(st.q) >= 0);
      else r.vis = (st.f === 'all' || r.kinds.indexOf(st.f) >= 0) && (!st.q || r.text.indexOf(st.q) >= 0);
      r.el.hidden = !r.vis;
      r.el.classList.remove('entry--solo');
      if (r.hwEl) { if (az) r.hwEl.removeAttribute('aria-level'); else r.hwEl.setAttribute('aria-level', '3'); }
      mark(r);
    });
    letters.forEach((l) => {
      const first = az ? $('.entry:not([hidden])', l) : null, h = $('.lh', l);
      l.hidden = !first;
      if (h) h.classList.toggle('lh--span', !!first && first.classList.contains('entry--major'));
    });
    // reading order as laid out; a lone minor entry between two full-measure ones takes the full measure too
    shown = $$('.entry', lex).filter((a) => !a.hidden).map((a) => byId[a.id]);
    recs.forEach((r) => r.el.classList.toggle('is-last', r === shown[shown.length - 1]));
    let run = [];
    const close = () => {
      if (run.length === 1) {
        const a = run[0].el, p = a.previousElementSibling;
        a.classList.add('entry--solo');
        if (az && p && p.classList.contains('lh')) p.classList.add('lh--span');
      }
      run = [];
    };
    shown.forEach((r) => { if (r.major) close(); else run.push(r); });
    close();

    // index wordlist follows the filters
    if (wlList) {
      wlList.textContent = '';
      shown.forEach((r) => {
        const li = el('li'), a = el('a');
        a.href = '#' + r.id;
        const h = el('span', 'wl-h');
        if (r.core) { // the star rides with the last word, so it never wraps alone or drifts from the name
          const cut = r.hw.lastIndexOf(' ') + 1, nb = el('span', 'nb', r.hw.slice(cut)), s = el('span', 'wl-s');
          s.title = 'Core vocabulary'; nb.appendChild(s); h.append(r.hw.slice(0, cut), nb);
        } else h.textContent = r.hw;
        if (/[一-鿿]/.test(r.hw)) h.lang = 'zh-Hans';
        const dg = $('.hw .sym--d', r.el);
        if (dg) h.prepend(dg.cloneNode(true));
        a.appendChild(h);
        a.append(el('span', 'wl-k', r.lab), el('span', 'wl-d'), el('span', 'wl-y', r.years));
        li.appendChild(a); wlList.appendChild(li);
      });
    }
    if (wlT) { wlT.textContent = 'Index'; wlT.appendChild(el('span', 'n', String(shown.length))); }
    if (wl) wl.hidden = !shown.length;
    if (empty) {
      empty.hidden = !!shown.length;
      empty.textContent = shown.length ? '' : (st.raw ? 'No entry for “' + st.raw + '”' : 'No entry');
      const nf = $('#nf');
      if (nf) nf.hidden = !!shown.length;
    }
    $$('.pill[data-f]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === st.f)));
    $$('.ord [data-o]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-o') === st.o)));
    document.body.classList.toggle('o-az', az);
    buildThumb();
    queue();
  }

  $$('.pill[data-f]').forEach((b) => b.addEventListener('click', () => {
    st.f = b.getAttribute('data-f');
    if (!st.userOrd) st.o = st.f === 'work' ? 'new' : 'az';
    apply();
  }));
  $$('.ord [data-o]').forEach((b) => b.addEventListener('click', () => { st.o = b.getAttribute('data-o'); st.userOrd = true; apply(); }));

  // look-up
  function setQuery(v, quiet) {
    st.raw = v.trim(); st.q = norm(st.raw);
    apply();
    if (quiet || !st.q) return;
    const s = $('#lexicon'), b = s.getBoundingClientRect();
    if (b.top > window.innerHeight * .55 || b.bottom < navH() + 80) window.scrollTo(0, window.scrollY + b.top - navH() + 1);
    else if (lex.getBoundingClientRect().bottom < navH() + 80) window.scrollTo(0, window.scrollY + b.top - navH() + 1);
  }
  function openQ() {
    if (!q) return;
    if (narrow.matches && sn) { sn.classList.add('q-on'); $('#q-open').setAttribute('aria-expanded', 'true'); }
    q.focus(); q.select();
  }
  function closeQ(clear) {
    if (!q) return;
    if (clear && q.value) { q.value = ''; setQuery('', true); }
    if (sn && sn.classList.contains('q-on')) { sn.classList.remove('q-on'); $('#q-open').setAttribute('aria-expanded', 'false'); if (document.activeElement === q || document.activeElement === $('#q-close')) $('#q-open').focus(); }
  }
  if (q) {
    q.addEventListener('input', () => setQuery(q.value));
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!shown.length) return;
        const a = (shown.find((r) => norm(r.hw).startsWith(st.q)) || shown.find((r) => norm(r.hw).includes(st.q)) || shown[0]).el;
        // on phones the look-up bar stays open, so the active query and its clear button remain in view
        a.tabIndex = -1;
        a.focus({ preventScroll: true });
        head(a).scrollIntoView({ block: 'start', behavior: reduce.matches ? 'auto' : 'smooth' });
        a.classList.remove('is-hit'); void a.offsetWidth; a.classList.add('is-hit');
      } else if (e.key === 'Escape') { e.preventDefault(); closeQ(true); }
    });
    $('#q-open').addEventListener('click', openQ);
    $('#q-close').addEventListener('click', () => closeQ(true));
  }

  // any in-page link to an entry that is filtered away brings it back first
  function reveal(id) {
    const r = byId[id];
    if (!r) return false;
    if (r.secret) st.secret = true;
    if (r.el.hidden || r.secret) {
      if (r.secret || (st.f !== 'all' && r.kinds.indexOf(st.f) < 0)) { st.f = 'all'; if (!st.userOrd) st.o = 'az'; }
      if (st.q && r.text.indexOf(st.q) < 0) { st.q = st.raw = ''; if (q) q.value = ''; closeQ(false); }
      apply();
    }
    return true;
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || e.defaultPrevented) return;
    const id = dec(a.getAttribute('href').slice(1));
    if (!reveal(id)) return;
    if (wl && wl.contains(a) && narrow.matches) { wl.classList.remove('open'); wlT.setAttribute('aria-expanded', 'false'); }
    if (location.hash === '#' + a.getAttribute('href').slice(1)) fromHash(); // same hash again: no hashchange will fire
  });
  // an entry can run over a column break, so jumps aim at its head line
  const head = (el) => $('.eh', el) || el;
  function fromHash() {
    const id = dec(location.hash.slice(1));
    if (!id || !reveal(id)) return;
    const a = head(byId[id].el);
    requestAnimationFrame(() => a.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', fromHash);

  if (wlT) wlT.addEventListener('click', () => { const on = wl.classList.toggle('open'); wlT.setAttribute('aria-expanded', String(on)); });

  /* ------------------------------------------------------------ thumb index */
  function buildThumb() {
    if (!thumb) {
      thumb = el('nav', 'thumb'); thumb.setAttribute('aria-label', 'Letters');
      document.body.appendChild(thumb);
      thumb.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) jump(b.getAttribute('data-l')); });
    }
    thumb.textContent = '';
    if (st.o !== 'az') return;
    letters.forEach((l) => {
      if (l.hidden) return;
      const b = el('button', '', $('.lh', l).textContent); b.type = 'button'; b.setAttribute('data-l', l.id);
      thumb.appendChild(b);
    });
  }
  function jump(id) {
    const h = $('#' + id + ' .lh');
    if (h) h.scrollIntoView({ block: 'start', behavior: reduce.matches ? 'auto' : 'smooth' });
  }

  /* ------------------------------------------------------------ scroll state: current section, guide words, thumb */
  const secs = ['top', 'lexicon', 'writing', 'about', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
  const links = {};
  $$('#sn-l a').forEach((a) => { links[a.getAttribute('href').slice(1)] = a; });
  const gA = $('#g-a'), gB = $('#g-b'), snL = $('#sn-l');
  let raf = 0, cur = '';
  function queue() { if (!raf) raf = requestAnimationFrame(onScroll); }
  function onScroll() {
    raf = 0;
    const top = navH(), vh = window.innerHeight, line = top + Math.min(120, vh * .25);
    let now = secs[0];
    secs.forEach((s) => { if (s.getBoundingClientRect().top <= line) now = s; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) now = secs[secs.length - 1];
    if (now && now.id !== cur) {
      cur = now.id;
      Object.keys(links).forEach((id) => { if (id === cur) links[id].setAttribute('aria-current', 'true'); else links[id].removeAttribute('aria-current'); });
      const a = links[cur];
      if (a && snL && snL.scrollWidth > snL.clientWidth) {
        const l = a.offsetLeft - snL.offsetLeft;
        if (l < snL.scrollLeft || l + a.offsetWidth > snL.scrollLeft + snL.clientWidth) snL.scrollLeft = Math.max(0, l - 24);
      } else if (!a && snL) snL.scrollLeft = 0;
    }
    let a = '', b = '', inLex = false;
    if (cur === 'lexicon' && lex) {
      const lb = lex.getBoundingClientRect();
      inLex = lb.top < vh * .7 && lb.bottom > vh * .3;
      for (let i = 0; i < shown.length; i++) {
        const r = shown[i].el.getBoundingClientRect();
        if (r.bottom > top + 30 && r.top < vh - 40) { if (!a) a = shown[i].hw; b = shown[i].hw; }
      }
      if (!a) a = 'Lexicon';
      if (b === a) b = '';
    } else if (now && cur !== 'top') {
      const h = $('.sec-h', now);
      a = now.getAttribute('data-hw') || (h ? h.textContent : '');
    }
    if (gA && gA.textContent !== a) gA.textContent = a;
    if (gB && gB.textContent !== b) gB.textContent = b;
    document.body.classList.toggle('in-lex', inLex);
    if (thumb && inLex && st.o === 'az') {
      let on = null;
      // reading order: the first letter that still has an entry below the nav
      for (const l of letters) {
        if (!l.hidden && $$('.entry:not([hidden])', l).some((x) => x.getBoundingClientRect().bottom > top + 60)) { on = l.id; break; }
      }
      $$('button', thumb).forEach((x) => { if (x.getAttribute('data-l') === on) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current'); });
    }
  }
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);

  /* ------------------------------------------------------------ keys */
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Escape') { if (lb) closeLb(); else hideCard(); return; }
    if (typing(e)) return;
    if (e.key === '/') { e.preventDefault(); openQ(); return; }
    if (e.shiftKey && /^[A-Z]$/.test(e.key) && document.body.classList.contains('in-lex') && st.o === 'az') {
      const l = letters.filter((x) => !x.hidden && x.id === 'l-' + e.key.toLowerCase())[0];
      if (l) jump(l.id);
    }
  });

  /* ------------------------------------------------------------ pinyin taps */
  document.addEventListener('click', (e) => {
    const p = e.target.closest ? e.target.closest('.py') : null;
    $$('.py.on').forEach((x) => { if (x !== p) x.classList.remove('on'); });
    if (p) p.classList.toggle('on');
  });

  /* ------------------------------------------------------------ GCal Wrapped video */
  (function video() {
    const g = $('#gcw');
    if (!g) return;
    const v = $('video', g), b = $('.play', g), t = $('.vh', b);
    if (!v || !b) return;
    const sync = () => { b.setAttribute('aria-pressed', String(!v.paused)); if (t) t.textContent = v.paused ? 'Play' : 'Pause'; };
    b.addEventListener('click', () => { if (v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } else v.pause(); });
    v.addEventListener('click', () => b.click());
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    if ('IntersectionObserver' in window) new IntersectionObserver((en) => { if (!en[en.length - 1].isIntersecting && !v.paused) v.pause(); }).observe(g);
  })();

  /* ------------------------------------------------------------ cross-reference preview card */
  const fine = mq('(hover: hover) and (pointer: fine)');
  let card = null, cardFor = null;
  function showCard(a) {
    if (!fine.matches || lb) return;
    const bk = a.classList.contains('bk');
    const r = bk ? null : byId[dec(a.getAttribute('href').slice(1))];
    if ((!bk && !r) || a.closest('.wl')) return;
    if (!card) { card = el('div', 'xcard'); card.setAttribute('aria-hidden', 'true'); document.body.appendChild(card); }
    cardFor = a;
    card.textContent = '';
    if (bk) {
      // the two novels: title, series and edition, from the link's own data attributes
      card.append(el('div', 'xcard-h', a.getAttribute('data-t')), el('div', 'xcard-k', a.getAttribute('data-k')), el('div', 'xcard-p', a.getAttribute('data-p')));
    } else {
      const h = el('div', 'xcard-h', r.hw), pos = $('.gram .pos', r.el), first = $('.senses p', r.el);
      if (/[一-鿿]/.test(r.hw)) h.lang = 'zh-Hans';
      card.append(h, el('div', 'xcard-k', [pos ? pos.textContent : '', r.lab].filter(Boolean).join(' · ')));
      if (first) {
        // the entry's own first line; never new text
        const p = el('div', 'xcard-p'), c = first.cloneNode(true);
        while (c.firstChild) p.appendChild(c.firstChild);
        $$('a', p).forEach((x) => x.replaceWith.apply(x, Array.prototype.slice.call(x.childNodes)));
        card.appendChild(p);
      }
    }
    const b = a.getBoundingClientRect(), w = card.offsetWidth, hh = card.offsetHeight, vw = document.documentElement.clientWidth;
    let x = Math.min(Math.max(12, b.left), vw - w - 12), y = b.bottom + 8;
    if (y + hh > window.innerHeight - 8 && b.top - hh - 8 > navH()) y = b.top - hh - 8;
    card.style.left = (x + window.scrollX) + 'px';
    card.style.top = (y + window.scrollY) + 'px';
    card.classList.add('on');
  }
  function hideCard() { if (card) card.classList.remove('on'); cardFor = null; }
  const xref = (e) => (e.target.closest ? e.target.closest('a.xref[href^="#"], a.bk') : null);
  document.addEventListener('mouseover', (e) => { const a = xref(e); if (a && a !== cardFor) showCard(a); });
  document.addEventListener('mouseout', (e) => { const a = xref(e); if (a && !a.contains(e.relatedTarget)) hideCard(); });
  document.addEventListener('focusin', (e) => { const a = xref(e); if (a && a.matches(':focus-visible')) showCard(a); });
  document.addEventListener('focusout', (e) => { if (xref(e)) hideCard(); });
  document.addEventListener('click', hideCard, true);

  /* ------------------------------------------------------------ lightbox */
  let lb = null, lbFrom = null;
  function closeLb() {
    if (!lb) return;
    lb.remove(); lb = null;
    root.style.overflow = '';
    if (lbFrom && lbFrom.focus) lbFrom.focus({ preventScroll: true });
    lbFrom = null;
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('a.zm') : null;
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    hideCard();
    const small = $('img', a), img = el('img'), x = el('button', 'lb-x');
    lbFrom = a;
    lb = el('div', 'lb'); lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', (small && small.alt) || 'Image');
    x.type = 'button'; x.setAttribute('aria-label', 'Close');
    x.innerHTML = '<svg width="18" height="18" aria-hidden="true"><use href="#i-x"/></svg>';
    img.alt = small ? small.alt : ''; img.src = a.getAttribute('href');
    lb.append(img, x);
    lb.addEventListener('click', closeLb);
    lb.addEventListener('keydown', (k) => { if (k.key === 'Tab') { k.preventDefault(); x.focus(); } });
    document.body.appendChild(lb);
    root.style.overflow = 'hidden';
    x.focus();
  });

  /* ------------------------------------------------------------ GitHub stars: live, cached for a day, markup holds the fallback */
  (function stars() {
    const els = $$('[data-stars]');
    if (!els.length || !window.fetch) return;
    const K = 'lex-stars', DAY = 864e5;
    const paint = (m) => els.forEach((e) => { const n = m[e.getAttribute('data-stars')]; if (n > 0) e.textContent = n + '\u00a0stars'; });
    let c = null;
    try { c = JSON.parse(localStorage.getItem(K)); } catch (e) { c = null; }
    if (c && c.m) paint(c.m);
    if (c && c.m && Date.now() - c.t < DAY) return;
    fetch('https://api.github.com/users/Destaq/repos?per_page=100').then((r) => (r.ok ? r.json() : Promise.reject())).then((a) => {
      const m = {};
      a.forEach((r) => { m[r.name] = r.stargazers_count; });
      paint(m);
      try { localStorage.setItem(K, JSON.stringify({ t: Date.now(), m })); } catch (e) { /* private mode */ }
    }).catch(() => {});
  })();

  /* ------------------------------------------------------------ colophon guide words, and a note for the curious */
  (function colophon() {
    const v = $('#col-vol'), pub = recs.filter((r) => !r.secret);
    if (v && pub.length > 1) v.textContent = pub.length + ' entries, ' + pub[0].hw + ' to ' + pub[pub.length - 1].hw;
    try {
      console.log('%ccurious%c  adj.\n  1. Given to opening the console.\n  2. Likely to enjoy pressing / on the page and looking up "dragon".\n  See also: github.com/Destaq',
        'font: 700 22px Georgia, serif', 'font: italic 13px Georgia, serif');
    } catch (e) { /* no console */ }
  })();

  /* ------------------------------------------------------------ go */
  apply();
  if (location.hash) {
    fromHash();
    // web fonts and images settle after the first jump; land on the heading again unless the reader has moved
    let moved = false;
    const stop = () => { moved = true; };
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, stop, { once: true, passive: true }));
    const again = () => {
      if (moved) return;
      const id = dec(location.hash.slice(1));
      const el = byId[id] ? head(byId[id].el) : document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => requestAnimationFrame(again));
    window.addEventListener('load', () => setTimeout(again, 80), { once: true });
  }
  onScroll();
})();
