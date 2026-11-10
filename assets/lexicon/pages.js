/* LEXICON II, the inner pages: the masthead's clock and theme switch (the same as main.js on the home page),
   a post's contents list, its comments, and the blog index look-up. No dependencies. */
(function () {
  'use strict';

  // Where Simon is. main.js has its own copy of this line: change both.
  const HERE = { label: 'Ithaca, N.Y.', tz: 'America/New_York' };

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const root = document.documentElement;
  const mq = (q) => (window.matchMedia ? window.matchMedia(q) : { matches: false });
  const reduce = mq('(prefers-reduced-motion: reduce)');
  const narrow = mq('(max-width: 760px)');
  const rail = mq('(min-width: 1061px)');

  /* ---------- the dateline: click the date to read it in another language ---------- */
  (function clock() {
    const d = $('#ed-date'), h = $('#ed-here'), l = $('#ed-here-l');
    if (!d || !h || !window.Intl) return;
    if (l) l.textContent = HERE.label;
    const LOC = [['en-US', 'en'], ['cs-CZ', 'cs'], ['zh-CN', 'zh-Hans'], ['es-ES', 'es']];
    let li = 0, long, short, th;
    const mk = () => {
      long = new Intl.DateTimeFormat(LOC[li][0], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: HERE.tz });
      short = new Intl.DateTimeFormat(LOC[li][0], { weekday: 'short', month: 'short', day: 'numeric', timeZone: HERE.tz });
    };
    try {
      mk();
      th = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: HERE.tz });
    } catch (e) { return; }
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

  /* ---------- theme ---------- */
  const themeBtn = $('#theme'), themeMeta = $('meta[name="theme-color"]');
  const theme = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  const labelTheme = () => { if (themeBtn) themeBtn.setAttribute('aria-label', theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); };
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('lex-theme', t); } catch (e) {}
    if (themeMeta) themeMeta.content = t === 'dark' ? '#1a1612' : '#f7f2e2';
    labelTheme();
  }
  labelTheme();
  let wipe = null;
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const t = theme() === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduce.matches) { setTheme(t); return; }
    const b = themeBtn.getBoundingClientRect(), x = b.left + b.width / 2, y = b.top + b.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.classList.add('theming');
    const vt = wipe = document.startViewTransition(() => setTheme(t));
    const done = () => { if (wipe === vt) root.classList.remove('theming'); };
    vt.finished.then(done, done);
    vt.ready.then(() => {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 520, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  });

  /* ---------- Chinese: the full face is fetched only by the pages that have some ---------- */
  const body = $('#main');
  if (body && /[㐀-鿿]/.test(body.textContent)) {
    const f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap';
    document.head.appendChild(f);
  }

  /* ---------- pictures in old posts that came without alt text are skipped by screen readers, not read out as a URL ---------- */
  $$('.prose img:not([alt])').forEach((i) => { i.alt = ''; });

  /* ---------- a link to a heading: the head script turned smooth scrolling off for the first jump. Pictures load
     after it, so land on the heading again unless the reader has moved, then give smooth scrolling back ---------- */
  if (location.hash.length > 1) {
    let moved = false;
    const stop = () => { moved = true; };
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, stop, { once: true, passive: true }));
    const again = () => {
      if (!moved) {
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch (e) {}
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      root.style.scrollBehavior = '';
    };
    if (document.readyState === 'complete') setTimeout(again, 80);
    else window.addEventListener('load', () => setTimeout(again, 80), { once: true });
  }

  /* ---------- the running head: the title joins the bar once the heading has gone ---------- */
  const guide = $('#guide'), head = $('#post-h');
  if (guide && head && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => { guide.classList.toggle('on', !es[0].isIntersecting); }, { rootMargin: '-60px 0px 0px 0px' }).observe(head);
  }

  /* ---------- contents, built from the headings ---------- */
  (function contents() {
    const toc = $('#toc'), list = $('#toc-l'), prose = $('#prose');
    if (!toc || !list || !prose) return;
    const hs = $$('h2[id], h3[id]', prose);
    if (hs.length < 3) return;
    const links = new Map();
    hs.forEach((h) => {
      const li = document.createElement('li'), a = document.createElement('a');
      if (h.tagName === 'H3') li.className = 't3';
      a.href = '#' + encodeURIComponent(h.id);
      a.textContent = h.textContent.trim();
      li.appendChild(a);
      list.appendChild(li);
      links.set(h, a);
    });
    toc.hidden = false;
    const fit = () => { toc.open = rail.matches; };
    fit();
    if (rail.addEventListener) rail.addEventListener('change', fit);
    toc.addEventListener('toggle', () => { if (rail.matches && !toc.open) toc.open = true; });
    list.addEventListener('click', (e) => { if (e.target.closest('a') && !rail.matches) toc.open = false; });

    // the heading most recently scrolled past the bar is the current one
    let cur = null, queued = false;
    const spy = () => {
      queued = false;
      let now = null;
      for (const h of hs) { if (h.getBoundingClientRect().top <= 120) now = h; else break; }
      if (now === cur) return;
      if (cur) links.get(cur).removeAttribute('aria-current');
      cur = now;
      if (!cur) return;
      const a = links.get(cur);
      a.setAttribute('aria-current', 'true');
      if (rail.matches && toc.scrollHeight > toc.clientHeight) {
        const t = a.offsetTop - toc.clientHeight / 2;
        toc.scrollTop = Math.max(0, t);
      }
    };
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(spy); } }, { passive: true });
    spy();
  })();

  /* ---------- comments wait until asked for ---------- */
  const cm = $('#cm-b');
  if (cm) {
    const load = () => {
      if (cm.hidden) return;
      const url = cm.dataset.url, id = cm.dataset.id;
      window.disqus_config = function () { this.page.url = url; this.page.identifier = id; };
      const s = document.createElement('script');
      s.src = 'https://' + cm.dataset.short + '.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      s.onerror = () => { cm.hidden = false; cm.textContent = 'Comments did not load. Try again'; };
      document.head.appendChild(s);
      cm.hidden = true;
    };
    cm.addEventListener('click', load);
    if (/^#(comment|disqus_thread)/.test(location.hash)) load();
  }

  /* ---------- the blog index look-up ---------- */
  (function lookup() {
    const q = $('#bq'), n = $('#bl-n'), none = $('#bl-none');
    if (!q) return;
    const rows = $$('.bl-y .cite').map((el) => ({ el, s: (el.dataset.s || el.textContent).toLowerCase() }));
    const years = $$('.bl-y');
    const total = rows.length;
    const run = () => {
      const words = q.value.toLowerCase().split(/[\s,]+/).filter(Boolean);
      let shown = 0;
      rows.forEach((r) => {
        const ok = words.every((w) => r.s.indexOf(w) !== -1);
        r.el.hidden = !ok;
        if (ok) shown++;
      });
      years.forEach((y) => { y.hidden = !$('.cite:not([hidden])', y); });
      if (n) n.textContent = words.length ? shown + ' of ' + total + ' posts' : total + ' posts';
      if (none) none.hidden = shown > 0;
      try {
        const u = new URL(location.href);
        if (q.value.trim()) u.searchParams.set('q', q.value.trim()); else u.searchParams.delete('q');
        history.replaceState(null, '', u);
      } catch (e) {}
    };
    try {
      const start = new URLSearchParams(location.search).get('q');
      if (start) q.value = start;
    } catch (e) {}
    q.addEventListener('input', run);
    q.addEventListener('keydown', (e) => { if (e.key === 'Escape' && q.value) { q.value = ''; run(); } });
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      q.focus();
    });
    if (q.value) run();
  })();

  /* ---------- 404: say which address was asked for ---------- */
  const lost = $('#lost-p');
  if (lost && location.pathname !== '/404.html') {
    let p = location.pathname;
    try { p = decodeURIComponent(p); } catch (e) {}
    if (p.length > 90) p = p.slice(0, 88) + '…';
    lost.textContent = p;
    lost.hidden = false;
  }
})();
