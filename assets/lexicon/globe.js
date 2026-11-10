/* globe.js, Lexicon II
   A hand-written orthographic canvas globe under a fog of war (a nod to Waymark).
   Self-initialising: finds every canvas[data-globe] and every [data-place] control.
   Places are public city-centre coordinates only. Nothing finer may ever be added. */
(function () {
  "use strict";
  if (window.LexGlobe) return;

  /* land: polygons "|", rings ";", delta-encoded ints at 0.2° */
  const LAND = "-339,-269,14,-4,-16,-5,-14,3,-18,11,17,-6,5,5,8,2|-293,-255,-4,-6,-9,2|351,-249,-7,0,1,6|727,-204,14,0,-1,-12,-10,-2,-6,12|865,-205,6,-4,-14,-12,-4,-9,-6,-3,-14,2,2,5,18,11,11,13|873,-181,4,-5,10,-4,6,2,-13,-18,-11,8,4,4|836,-111,-9,3,-7,7|250,-68,2,-8,-17,-49,-8,-3,-7,3,-4,15,6,10,-2,13,2,6,10,2,7,6,7,13|718,-69,9,-6,5,-20,12,-7,4,-10,16,-14,4,-15,-4,-17,-5,-7,-9,-17,0,-5,-18,-8,-8,3,-6,-2,-15,4,-5,9,-7,3,0,6,-7,-4,5,12,-9,-10,-9,11,-14,6,-26,-4,-10,-4,-3,-4,-19,-1,-9,-5,-15,4,4,10,-4,14,-4,6,-4,19,4,13,33,11,7,7,4,9,13,11,7,2,7,-5,5,2,6,9,10,2,-1,5,14,-5,9,-1,-8,-12,19,-13,8,0,5,12,-1,13,5,9|622,-51,-2,5,15,3|589,-40,7,-4,-12,-1|615,-40,-1,-3,-14,-1|543,-34,11,2,11,-6,14,-4,-6,-2,-32,5,-14,5,3,5|760,-27,-9,-5,-9,5,12,0,8,5|652,-15,-12,-2,1,3|766,-22,-13,8,8,-2|671,-6,1,-8,5,-3,4,5,11,3,31,-10,7,-8,8,-3,-3,-4,9,-12,10,-5,-14,0,-10,11,-6,2,-11,-9,-12,6,-13,-1,5,5,-3,10,-22,9,-3,-3,-4,10,-8,6,9,3|626,7,-4,-5,-21,-1,4,-8,12,4,-9,-7,8,-17,-5,1,-9,11,0,-13,-5,1,0,10,-3,3,6,17,4,4,16,-2|643,6,-3,-10,-3,9,3,6|529,-29,-5,0,-11,8,-20,30,-16,16,10,1,16,-16,5,0,11,-9,5,-13,7,-3|589,9,-1,-13,-5,-3,-2,-13,-7,-1,-8,5,-15,1,-6,13,3,12,8,-1,9,7,21,19,10,-8,-9,-11|632,42,-5,-14,-6,3,-3,8,-8,-5,2,6,19,6|406,31,-4,-1,-4,11,3,8,8,-11|620,51,-5,-6,0,9|609,59,7,-1,-6,-6|628,61,-4,-10,-3,12|607,93,6,-8,-5,-5,1,-8,11,-3,-17,0,-3,6,4,18|-363,99,9,0,12,-6,-17,-3|552,93,-9,0,3,6,8,1|-398,114,27,-13,-18,-2,4,3,-9,6,-20,5,3,3|606,114,-5,4,9,7|673,171,-8,-7,0,6|173,178,-8,-5,-4,3|119,179,12,-2,-7,-2|78,191,-2,-8,-14,5,1,3|46,206,2,-10,-6,0,-1,9|705,186,-4,-10,-15,-3,-7,-6,-4,6,-20,-4,5,-3,-3,-9,-10,9,16,11,15,1,6,9,3,-3,10,7,5,15,5,1,2,-11|720,221,7,1,1,-6,-12,-6,-8,3,-8,-5,2,9,5,0,3,11|-618,243,-10,1,-14,10,13,-3|-281,253,2,-5,12,-2,4,-8,-8,-4,0,5,-25,-1,12,18|718,254,5,-9,-7,2,-3,-8,5,-5,-8,-4,1,25,-3,12,5,2|-34,261,-16,-2,4,5,-2,5,10,7,10,-3|63,278,-3,-4,-5,5|-765,286,-8,1,7,3|-15,293,-5,-5,10,0,-6,-8,6,0,12,-15,6,-1,-5,-10,-32,-3,7,5,-1,11,8,0,-3,6,-10,4,-3,7,6,9|-859,319,16,-3,-5,-1|-426,328,25,-9,-15,2,-12,-6,-4,5|-73,332,5,-6,-7,-4,-18,-5,-21,3,5,2,-11,2,9,3,-11,1,11,4,8,-3|-379,336,-5,5,8,-1|-900,345,27,-10,14,0,10,-5,-14,-3,-6,-6,-12,6,-18,2,-1,-4,1800,0,-13,-2,10,-8,-29,-7,-16,-9,-7,4,-14,-4,-13,0,-8,-8,6,-3,-5,-14,-9,-2,-2,-6,-7,-1,-9,-10,-7,22,7,12,8,1,26,16,4,7,-21,-10,-4,6,-13,-2,-13,-8,4,-3,-19,-2,1,4,-14,-2,-16,1,-16,-2,-35,-21,15,-5,9,2,7,-6,-7,-23,-9,-10,-17,-15,-6,-3,-7,2,-13,-8,1,-4,-11,-5,9,-15,-2,-9,-13,-3,-1,17,-7,2,3,6,-6,3,-16,-6,6,8,-3,3,-20,-11,11,-8,5,3,9,-4,-7,-2,-10,-8,5,-3,9,-14,-4,-5,4,-4,-17,-26,-14,-9,-10,-1,-15,-6,-11,2,-9,-6,-6,-8,16,-19,2,-18,-20,-15,-1,7,-8,3,-4,8,-13,6,-4,-17,6,-13,15,-13,1,-18,-11,8,-9,23,-7,5,3,15,-8,28,-9,-6,-6,1,1,11,-12,15,-3,8,-6,-5,-16,-2,-3,-6,-7,-4,-14,-12,-9,-6,-3,-27,-11,-12,-5,5,-15,35,-5,27,-11,-3,-4,8,-11,8,-5,7,-25,-2,-20,4,-5,7,-8,-4,-16,7,-7,12,-11,-1,4,-12,10,-11,4,2,1,-9,11,1,12,11,0,-7,12,-7,5,-6,-10,-17,-13,-9,-14,-4,-1,-4,-18,-8,-26,-7,-4,21,-8,13,-9,9,-1,7,-19,27,-1,7,-5,-9,-6,6,20,-34,3,-17,5,-3,4,-10,21,-18,-3,-3,7,-7,12,2,23,6,-1,-7,-8,-19,-14,-20,-17,-13,-15,-14,-7,-19,2,-10,6,-12,2,-19,-7,-11,-10,-4,-13,-11,4,-11,-3,-12,-10,-5,-3,-15,-21,-22,-12,-6,-16,1,-15,-5,-7,5,0,11,-15,23,-5,24,-12,21,-1,7,6,17,4,6,-2,17,-6,18,-16,19,5,21,-6,9,-14,-3,-7,10,-17,-1,-15,-6,-10,2,-18,-4,-7,2,-20,15,-9,15,-9,7,-5,13,6,7,1,19,-4,5,5,14,8,12,9,9,5,1,10,9,-1,6,6,10,8,5,5,8,19,-3,18,7,41,4,5,-5,-2,-10,5,-6,20,-5,3,-4,16,-6,9,13,41,-10,5,3,21,-1,9,17,1,6,-7,5,-11,-3,-10,2,-5,-2,-10,2,-6,8,-1,6,15,9,10,-1,12,5,8,0,16,-5,16,3,-1,5,-24,13,13,10,-17,-3,-4,-5,8,-1,-14,-5,-7,5,6,2,-14,4,-10,-8,-6,-12,6,-8,-12,-4,-2,3,-16,-2,1,-7,5,-4,-12,-7,-2,8,-9,9,1,8,-18,9,-5,7,-9,4,-3,-9,16,-12,13,-6,-8,0,2,-5,-5,-7,-4,10,-13,6,-20,16,-11,-6,-17,-1,-1,-6,-11,-4,-3,-11,-12,-11,-11,0,-5,-3,-6,5,-11,-1,-4,10,4,10,-3,11,7,4,30,-2,4,13,-17,13,15,0,15,8,1,4,11,3,5,7,20,5,-3,8,2,8,10,3,2,-7,-7,-5,7,-7,8,2,8,-3,17,5,10,-2,8,4,-1,8,8,5,8,-4,1,7,-5,4,23,1,0,6,-26,-4,-7,5,-2,9,7,6,15,7,-7,4,-9,-1,-4,-7,-18,-8,-3,-7,8,-7,-10,-6,-5,-13,-14,-4,-13,20,-10,-5,-14,1,-3,17,28,12,21,17,22,10,19,2,8,4,18,1,15,-4,-6,-1,19,-4,14,-2,18,-5,5,-6,-14,-4,-22,4,5,-12,10,-3,1,7,12,-3,1,4,11,5,10,-2,3,4,-6,9,14,-2,1,-8,9,5,28,6,-2,-3,27,3,6,-3,5,4,-2,4,15,-1,25,-8,3,3,-10,7,-3,5,17,10,13,-1,-4,-7,5,-5,-1,-7,5,-3,-12,-10,6,-1,13,8,0,6,-7,3,4,5,-6,4,32,5,9,-3,-4,9,31,2,2,6,30,4,17,0,21,2,6,4,12,2,2,-2,31,-2,16,-5,-2,-2,-22,-6,21,-4,10,2,16,-1,1,-2,21,-1,0,4,19,-1,8,-3,-1,-5,14,-6,5,5,38,-2,-3,5,6,2,46,-3,17,-7,30,0,10,-7,34,1,9,-5,6,2,-2,5,27,-1,14,-2;246,206,2,-3,-4,-9,2,-6,8,-4,15,1,0,10,-4,9,9,1,-5,6,-12,5,-5,7,13,3,0,8,-9,1,-18,-7,-5,-5|-478,346,-3,-2,-18,3,8,4|-900,358,12,-2,-12,-2|-453,347,0,-5,7,4,9,-10,9,8,0,5,22,-3,-1,-10,-10,-4,-12,1,-8,-9,-13,-4,-21,-16,-2,-9,7,-1,5,-9,16,-1,20,-7,14,-1,4,-15,7,-5,7,7,-6,10,8,3,8,7,-10,11,6,5,-4,13,22,0,12,-6,9,-1,2,-10,8,-4,7,3,8,8,16,-17,-2,-3,22,-9,8,-7,1,-5,-22,-10,-32,0,-11,-6,-13,-11,23,12,12,-2,-5,-4,4,-9,14,-2,5,6,4,-5,-28,-12,-8,6,-16,-6,-3,-4,4,-6,-14,-2,-15,-16,-4,4,4,-16,-14,-9,-14,-12,0,-3,7,-20,-2,-8,-4,0,-13,24,-7,-2,-6,4,-16,-1,1,-5,-11,2,-15,-1,-14,-10,1,-8,-3,-17,10,-18,7,-3,18,5,3,9,16,3,-7,-25,-3,-4,23,0,6,-4,-3,-18,12,-13,9,4,14,-5,7,10,10,3,8,6,2,-7,13,2,3,-4,32,1,-3,-4,17,-10,9,-10,11,0,11,-3,7,-6,7,-16,-2,-5,9,-1,18,-7,2,-5,6,1,17,-2,14,-10,10,-3,2,-10,-2,-8,-9,-10,-10,-14,1,-9,-5,-20,-11,-17,-22,-5,-10,-9,-2,-14,-17,-18,-8,-11,-6,-3,-17,3,6,-4,2,-9,-5,-6,-7,-3,-16,0,1,-9,-15,-2,1,-5,8,-3,-9,-4,-2,-8,-10,-7,10,-4,-11,-13,-7,-5,5,-8,-13,-2,-1,-5,-20,8,-3,18,7,8,-7,2,6,12,6,-1,2,10,-8,-4,6,30,9,24,0,18,2,6,5,31,-2,15,-5,5,-23,14,-19,37,-7,5,-1,7,8,11,-6,2,5,15,6,3,8,12,-1,14,-9,12,-4,-7,-15,3,-14,10,0,4,-9,10,-18,5,-17,11,-10,-3,-34,13,-12,11,3,5,-4,7,-16,18,-15,13,-5,11,-8,3,1,-8,15,-18,11,-16,-14,7,-1,6,-10,6,1,7,-7,5,-8,17,-16,7,-17,23,-3,7,-1,12,3,14,-3,14,7,-2,1,5,-13,7,-9,2,-2,8,-7,2,-7,10,-17,17,-13,0,-16,7,-21,2,-16,4,-4,-4,-19,-4,2,8,-13,-7,4,-3,-26,-14,-23,-7,-10,0,22,7,14,8,4,7,-10,-3,-7,3,-8,-2,1,5,-10,1,-12,8,8,9,19,3,0,5,-21,-2,-16,6,19,5,14,-2,-19,9,-4,4,9,1,12,7,27,5,22,-4,36,-3,7,1,35,-7,11,4,7,0,24,4,12,-5,16,2,44,-7,2,-4,17,2,19,4,9,-4,15,-2,15,1,-1,3,20,-2,2,5,-11,5,6,10,12,-3|-571,366,16,-4,5,3,9,-7,-1,7,15,-2,5,-8,17,-5,-9,-2,2,-4,-18,2,-37,-3,-14,3,-6,4,25,2,-28,1,9,4,-16,1,8,6|-382,366,-15,-2,-5,5|-433,366,21,3,8,-9,15,4,33,-9,12,-2,9,-7,-9,-2,20,-5,7,-4,8,-1,-11,-9,-14,7,-7,-4,14,-6,2,-9,-19,6,13,-9,-13,2,-30,10,-15,-1,0,6,19,0,7,9,-4,4,-17,4,3,2,-14,5,-12,-2,-36,3,-8,9,9,7,13,1|-502,369,15,0,-3,-4,7,-2,-1,-5,-8,-2,-20,7,10,1|718,366,-19,1,11,2|-466,364,-11,-4,-3,5,7,6,20,-2|-602,357,-13,-2,-15,4,10,9,-5,3,17,1,20,-1,10,-4,-18,-4|754,375,-6,-2,-16,4|-468,375,-16,0,10,3|725,378,-4,-4,-26,-1,-10,3,3,4,19,0|-492,384,1,-9,-13,0,-9,7|-541,381,12,-1,-3,-5,-29,-3,-8,2,10,2,-30,0,12,6,32,-5,-7,5|288,354,-20,0,-10,3,10,12,12,4,-2,2,28,6,35,4,0,-4,-33,-5,-16,-4,-15,-10,1,-4|-473,385,15,-1,12,-6,14,-1,26,2,7,-4,-11,-3,-31,0,-21,2,-7,8,-17,2|-581,388,-1,-4,-18,-4,-14,1,18,7|124,389,-12,-2,-8,4,10,1|-500,392,-15,0,-12,5,23,-3|525,392,-28,-2,9,6,21,-2|91,399,17,-4,-13,-2,-9,-9,-17,3,4,2,-17,5,-4,4,33,2|127,402,10,-2,-7,-2,-30,0,-13,4,28,1|256,403,-18,-3,-3,3,15,2|500,394,-11,0,-22,3,-11,5,24,4,21,-7|-435,398,6,-1,-16,-6,-19,1,-2,5,-9,0,-9,4,10,5,12,0,23,-4|-342,416,24,-1,9,-3,-29,-4,11,0,-20,-5,-9,-4,-29,-2,8,-4,-21,-8,9,-1,-14,-3,-13,1,-31,0,8,4,-2,4,16,-2,-15,4,15,5,-10,4,18,-1,8,2,-29,1,-20,6,31,4,11,-1,4,2,15,2|-135,418,31,-4,-9,-2,-47,-1,36,-2,9,1,-1,-4,37,4,18,-4,-28,-5,-10,-7,7,-9,-16,-2,9,-3,-4,-4,6,-5,-11,0,4,-4,-14,0,6,-6,-9,2,12,-10,-9,-1,-10,5,-4,-6,20,0,-27,-9,-20,-1,-12,-8,-28,-6,-7,-10,-8,-4,2,-3,-5,-10,-14,4,-10,0,-17,14,-3,8,-9,10,5,6,8,2,3,6,-13,-4,-6,2,1,6,15,-1,-13,5,-9,0,5,5,-19,15,-13,3,-37,-1,-14,5,23,2,-21,1,-11,4,37,5,-11,4,29,6,-2,2,27,2,21,-2,13,3,29,-4,-11,5,17,3,18,0,24,2";

  /* ---------------------------------------------------------------- places */
  // story places: id, name, lon, lat, role
  const STORY = [
    ["prague", "Prague", 14.4378, 50.0755, "grew up"],
    ["losangeles", "Los Angeles", -118.2437, 34.0522, "born"],
    ["ithaca", "Ithaca", -76.5019, 42.444, "school · now"],
    ["hongkong", "Hong Kong", 114.1694, 22.3193, "studied abroad"],
    ["sunnyvale", "Sunnyvale", -122.0363, 37.3688, "interned"],
    ["seattle", "Seattle", -122.3321, 47.6062, "interned"],
    ["costarica", "Costa Rica", -84.2, 10, "last trip"],
    ["mexicocity", "Mexico City", -99.1332, 19.4326, "favorite place"],
  ];
  // also visited: name lon lat
  const ALSO = "San Francisco -122.4194 37.7749|New York -74.0060 40.7128|Washington, D.C. -77.0369 38.9072|Chicago -87.6298 41.8781|" +
    "Boston -71.0589 42.3601|Philadelphia -75.1652 39.9526|Boulder -105.2705 40.0150|Santa Barbara -119.6982 34.4208|" +
    "San Diego -117.1611 32.7157|Las Vegas -115.1398 36.1699|Niagara Falls -79.0377 43.0962|Toronto -79.3832 43.6532|" +
    "Waterloo -80.5204 43.4643|Vancouver -123.1207 49.2827|Whistler -122.9574 50.1163|Mount Rainier -121.7603 46.8523|" +
    "Sequoia -118.5658 36.4864|San Juan -66.1057 18.4655|Paris 2.3522 48.8566|London -0.1276 51.5072|" +
    "Amsterdam 4.9041 52.3676|Rome 12.4964 41.9028|Lisbon -9.1393 38.7223|Geneva 6.1432 46.2044|" +
    "Warsaw 21.0122 52.2297|Bratislava 17.1077 48.1486|High Tatras 20.13 49.17|Split 16.4402 43.5081|" +
    "Málaga -4.4214 36.7213|Milan 9.1900 45.4642|Marrakech -7.9811 31.6295|Doha 51.5310 25.2854|" +
    "Hanoi 105.8342 21.0278|Macau 113.5439 22.1987|Manila 120.9842 14.5995|Cebu 123.8854 10.3157";
  const DEFAULT_ROUTE = "losangeles prague ithaca hongkong sunnyvale seattle ithaca";

  const D = Math.PI / 180, TAU = Math.PI * 2;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const vec = (lon, lat) => { const a = lon * D, b = lat * D, c = Math.cos(b); return [c * Math.cos(a), c * Math.sin(a), Math.sin(b)]; };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  function slerp(a, b, t, out) {
    out = out || [0, 0, 0];
    const om = Math.acos(clamp(dot(a, b), -1, 1));
    if (om < 1e-4) { out[0] = b[0]; out[1] = b[1]; out[2] = b[2]; return out; }
    const s = Math.sin(om), k1 = Math.sin((1 - t) * om) / s, k2 = Math.sin(t * om) / s;
    out[0] = a[0] * k1 + b[0] * k2; out[1] = a[1] * k1 + b[1] * k2; out[2] = a[2] * k1 + b[2] * k2;
    return out;
  }
  // "Málaga" → "malaga", "Washington, D.C." → "washingtondc"
  const slug = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]/g, "");
  // small deterministic generator, so every clearing keeps its shape between visits
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  }
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

  const PLACES = {}, ORDER = [], ALIAS = {};
  function addPlace(id, name, lon, lat, role, story) {
    PLACES[id] = { id, name, lon, lat, role: role || "", story };
    ORDER.push(id);
    ALIAS[name.toLowerCase().replace(/[^a-z]/g, "")] = id; // "mlaga": ids built by stripping non-letters
  }
  STORY.forEach((p) => addPlace(p[0], p[1], p[2], p[3], p[4], true));
  ALSO.split("|").forEach((s) => { const m = /^(.+) (-?[\d.]+) (-?[\d.]+)$/.exec(s); addPlace(slug(m[1]), m[1], +m[2], +m[3], "", false); });
  const NP = ORDER.length;
  const resolve = (id) => { if (PLACES[id]) return id; const k = slug(id); return PLACES[k] ? k : ALIAS[k] || ALIAS[String(id || "").toLowerCase().replace(/[^a-z]/g, "")] || null; };

  /* geometry shared by every instance, built once on first use */
  let geo = null;
  function getGeo() {
    if (geo) return geo;
    let maxN = 0;
    const land = LAND.split("|").map((poly) => poly.split(";").map((ring) => {
      const a = ring.split(","), n = a.length / 2, P = new Float32Array(n * 3);
      let x = 0, y = 0;
      for (let i = 0; i < n; i++) { x += +a[2 * i]; y += +a[2 * i + 1]; const v = vec(x / 5, y / 5); P[3 * i] = v[0]; P[3 * i + 1] = v[1]; P[3 * i + 2] = v[2]; }
      if (n > maxN) maxN = n;
      return P;
    }));
    // graticule every 30° (anything finer is noise at this size), as flat xyz runs
    const grat = [];
    const run = (pts) => { const P = new Float32Array(pts.length * 3); pts.forEach((v, i) => P.set(v, i * 3)); grat.push(P); };
    for (let lon = -180; lon < 180; lon += 30) { const l = []; for (let lat = -84; lat <= 84; lat += 3) l.push(vec(lon, lat)); run(l); }
    for (let lat = -60; lat <= 60; lat += 30) { const l = []; for (let lon = -180; lon <= 180; lon += 3) l.push(vec(lon, lat)); run(l); }
    // place vectors, each with its tangent frame (east, north) and the reach of its clearing;
    // the clearing itself is a soft irregular patch of overlapping lobes, drawn once
    const pv = new Float32Array(NP * 3), tf = new Float32Array(NP * 7), clr = [], blob = getBlob();
    ORDER.forEach((id, i) => {
      const p = PLACES[id], v = vec(p.lon, p.lat), r = rng(hash(id)), e = [-Math.sin(p.lon * D), Math.cos(p.lon * D), 0];
      pv.set(v, i * 3); tf.set(e, i * 7);
      tf.set([v[1] * e[2] - v[2] * e[1], v[2] * e[0] - v[0] * e[2], v[0] * e[1] - v[1] * e[0]], i * 7 + 3);
      const n = p.story ? 7 : 4, L = [0, 0, 1], a0 = r() * TAU;
      let m = 1;
      for (let k = 0; k < n; k++) {
        const a = a0 + (k / n) * TAU + (r() - .5) * 1.1, d = .45 + r() * .65, q = .42 + r() * .5;
        L.push(Math.cos(a) * d, Math.sin(a) * d, q); m = Math.max(m, d + q);
      }
      tf[i * 7 + 6] = Math.sin((p.story ? 6.2 : 3.1) * D) * m;
      const S = p.story ? 144 : 72, c = document.createElement("canvas"), x = c.getContext("2d"), u = S / 2 / m;
      c.width = c.height = S;
      for (let k = 0; k < L.length; k += 3) x.drawImage(blob, S / 2 + (L[k] - L[k + 2]) * u, S / 2 - (L[k + 1] + L[k + 2]) * u, 2 * L[k + 2] * u, 2 * L[k + 2] * u);
      clr.push(c);
    });
    return (geo = { land, grat, pv, tf, clr, X: new Float32Array(maxN), Y: new Float32Array(maxN), Z: new Float32Array(maxN), x: new Float32Array(maxN), y: new Float32Array(maxN) });
  }

  /* ---------------------------------------------------------------- colour */
  function parseCol(s, fb) {
    s = (s || "").trim();
    let m = /^#([0-9a-f]{3,8})$/i.exec(s);
    if (m) {
      let h = m[1];
      if (h.length < 6) h = h.replace(/./g, "$&$&");
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    m = /^rgba?\(([^)]+)\)/i.exec(s);
    if (m) { const p = m[1].split(/[\s,\/]+/).map(parseFloat); if (p.length >= 3 && !p.slice(0, 3).some(isNaN)) return p.slice(0, 3); }
    return fb;
  }
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const css = (c, a) => "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + (a == null ? 1 : a) + ")";
  const lum = (c) => .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  function readColours(el) {
    const cs = getComputedStyle(el), g = (n, fb) => parseCol(cs.getPropertyValue(n), fb);
    const paper = g("--paper", [247, 242, 226]), hi = g("--paper-hi", [251, 248, 238]), land = g("--land", [235, 225, 201]),
      ink = g("--ink", [36, 28, 20]), red = g("--red", [163, 48, 28]);
    const dark = lum(paper) < lum(ink);
    return {
      key: [paper, hi, land, ink, red].join("|"),
      paper: css(paper), halo: css(paper, .9), ink: css(ink), red: css(red),
      sea0: css(dark ? mix(paper, hi, .9) : hi), sea1: css(paper),
      grat: css(ink, dark ? .1 : .12),
      clear: css(dark ? mix(land, ink, .34) : mix(land, red, .1)),
      coast: css(ink, dark ? .82 : .86),
      fog: css(mix(land, ink, dark ? .1 : .13)),
      fogCoast: css(mix(land, ink, dark ? .22 : .22)),
      stipple: css(ink, dark ? .25 : .4),
      limb: css(ink, dark ? .55 : .85),
      shade: css(dark ? [0, 0, 0] : ink, dark ? .34 : .13), shade0: css(dark ? [0, 0, 0] : ink, 0),
      dot: css(ink, .92), sub: css(ink, dark ? .82 : .8),
    };
  }

  // one soft white blob: the clearings are built from these
  let blob = null;
  function getBlob() {
    if (blob) return blob;
    blob = document.createElement("canvas"); blob.width = blob.height = 96;
    const c = blob.getContext("2d"), g = c.createRadialGradient(48, 48, 0, 48, 48, 48);
    for (let i = 0; i <= 10; i++) { const t = i / 10, u = clamp((1 - t) / .58, 0, 1); g.addColorStop(t, "rgba(255,255,255," + (u * u * (3 - 2 * u)).toFixed(3) + ")"); }
    c.fillStyle = g; c.fillRect(0, 0, 96, 96);
    return blob;
  }
  // the fog's grain: a blue-noise stipple on a wrapping tile (best-candidate sampling, done once)
  const TILE = 84;
  let grain = null;
  function getGrain() {
    if (grain) return grain;
    const n = 620, r = rng(7919), P = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      let bx = 0, by = 0, bd = -1;
      for (let c = 0; c < 7; c++) {
        const x = r() * TILE, y = r() * TILE;
        let d = 1e9;
        for (let j = 0; j < i; j++) {
          let dx = Math.abs(P[3 * j] - x), dy = Math.abs(P[3 * j + 1] - y);
          if (dx > TILE / 2) dx = TILE - dx; if (dy > TILE / 2) dy = TILE - dy;
          const q = dx * dx + dy * dy; if (q < d) d = q;
        }
        if (d > bd) { bd = d; bx = x; by = y; }
      }
      P[3 * i] = bx; P[3 * i + 1] = by; P[3 * i + 2] = r();
    }
    return (grain = P);
  }
  function stippleTile(colour, dpr) {
    const size = Math.round(TILE * dpr), k = size / TILE, t = document.createElement("canvas"), P = getGrain();
    t.width = t.height = size;
    const c = t.getContext("2d");
    c.fillStyle = colour;
    for (let i = 0; i < P.length; i += 3) {
      const a = P[i + 2], rad = (.48 + a * .42) * k;
      c.globalAlpha = .45 + ((a * 7) % 1) * .55;
      for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) { // wrap the edges
        const x = P[i] * k + ox * size, y = P[i + 1] * k + oy * size;
        if (x < -2 * k || y < -2 * k || x > size + 2 * k || y > size + 2 * k) continue;
        c.beginPath(); c.arc(x, y, rad, 0, TAU); c.fill();
      }
    }
    return { t, k };
  }

  /* ---------------------------------------------------------------- one globe */
  const reduce = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  const easeIO = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeO = (t) => 1 - Math.pow(1 - t, 3);
  const FONT = '"Old Standard TT", "PT Serif", Georgia, serif', SUB = "400 11.5px " + FONT;
  const C8 = [[1, 0], [-1, 0], [.7071, -.7071], [.7071, .7071], [-.7071, -.7071], [-.7071, .7071], [0, -1], [0, 1]];
  const NS = STORY.length; // story places come first in ORDER

  function Globe(canvas) {
    const G = this, geo = getGeo();
    const ctx = canvas.getContext("2d"), fogC = document.createElement("canvas"), fctx = fogC.getContext("2d");
    const scr = new Float32Array(NP * 3), E = [0, 0, 0], N = [0, 0, 0], V = [0, 0, 0], tmp = [0, 0, 0], taken = [];
    let W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1, col = null, stip = null, seaG = null, shadeG = null;
    let lon0 = -58 * D, lat0 = 46 * D;
    let raf = 0, visible = true, ease = null, spin = null, routeAnim = null, drag = null;
    G.canvas = canvas; G.active = -1; G.hover = -1; G.sub = ""; G.routeT = 1; G.onPick = null; G.dirty = true;

    // the route as one polyline of unit vectors, about 1.2° apart
    const routeIds = (canvas.getAttribute("data-route") || DEFAULT_ROUTE).split(/[\s,]+/).map(resolve).filter(Boolean);
    const route = (() => {
      const pts = [];
      for (let i = 1; i < routeIds.length; i++) {
        const a = PLACES[routeIds[i - 1]], b = PLACES[routeIds[i]], va = vec(a.lon, a.lat), vb = vec(b.lon, b.lat);
        const steps = Math.max(4, Math.ceil(Math.acos(clamp(dot(va, vb), -1, 1)) / (1.2 * D)));
        for (let s = i > 1 ? 1 : 0; s <= steps; s++) { const q = slerp(va, vb, s / steps); pts.push(q[0], q[1], q[2]); }
      }
      return new Float32Array(pts);
    })();
    G.routeEnd = routeIds.length ? ORDER.indexOf(routeIds[routeIds.length - 1]) : -1;

    function setVec(v) { lon0 = Math.atan2(v[1], v[0]); lat0 = Math.asin(clamp(v[2], -1, 1)); }
    function basis() {
      const sl = Math.sin(lon0), cl = Math.cos(lon0), sp = Math.sin(lat0), cp = Math.cos(lat0);
      E[0] = -sl; E[1] = cl; E[2] = 0; N[0] = -sp * cl; N[1] = -sp * sl; N[2] = cp; V[0] = cp * cl; V[1] = cp * sl; V[2] = sp;
    }

    G.size = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight || w;
      if (!w) return;
      const d = Math.min(3, window.devicePixelRatio || 1);
      if (w === W && h === H && d === dpr && col) return;
      W = w; H = h; dpr = d;
      canvas.width = fogC.width = Math.round(W * dpr); canvas.height = fogC.height = Math.round(H * dpr);
      R = Math.min(W, H) / 2 - 1.5; cx = W / 2; cy = H / 2;
      G.theme(true);
    };
    G.theme = (force) => {
      if (!W) return;
      const c = readColours(canvas);
      if (!force && col && c.key === col.key) return;
      col = c;
      const st = stippleTile(col.stipple, dpr);
      stip = fctx.createPattern(st.t, "repeat");
      if (stip && stip.setTransform) stip.setTransform(new DOMMatrix().scale(.7 / st.k)); // a fine grain, to suit a small globe
      seaG = ctx.createRadialGradient(cx - R * .3, cy - R * .36, R * .05, cx, cy, R);
      seaG.addColorStop(0, col.sea0); seaG.addColorStop(1, col.sea1);
      shadeG = ctx.createRadialGradient(cx, cy, R * .62, cx, cy, R);
      shadeG.addColorStop(0, col.shade0); shadeG.addColorStop(1, col.shade);
      G.draw();
    };

    // land, clipped to the visible hemisphere and rejoined along the limb
    function addPoly(path, poly) {
      const X = geo.X, Y = geo.Y, Z = geo.Z, x = geo.x, y = geo.y;
      let segs = null;
      for (const P3 of poly) {
        const n = P3.length / 3;
        let vis = 0;
        for (let i = 0; i < n; i++) {
          const a = P3[3 * i], b = P3[3 * i + 1], c = P3[3 * i + 2];
          x[i] = a * E[0] + b * E[1] + c * E[2]; y[i] = a * N[0] + b * N[1] + c * N[2]; Z[i] = a * V[0] + b * V[1] + c * V[2];
          X[i] = cx + R * x[i]; Y[i] = cy - R * y[i];
          if (Z[i] > 0) vis++;
        }
        if (!vis) continue;
        if (vis === n) { path.moveTo(X[0], Y[0]); for (let i = 1; i < n; i++) path.lineTo(X[i], Y[i]); path.closePath(); continue; }
        const cross = (i, j) => {
          const t = Z[i] / (Z[i] - Z[j]), px = x[i] + t * (x[j] - x[i]), py = y[i] + t * (y[j] - y[i]), l = Math.hypot(px, py) || 1;
          return [cx + R * px / l, cy - R * py / l, Math.atan2(-py, px)];
        };
        let k = 0;
        while (!(Z[k] > 0 && Z[(k - 1 + n) % n] <= 0)) k++;
        let cur = null;
        segs = segs || [];
        for (let c = 0; c < n; c++) {
          const j = (k + c) % n;
          if (Z[j] <= 0) continue;
          if (!cur) { const e = cross((j - 1 + n) % n, j); cur = { p: [e[0], e[1]], a0: e[2], a1: 0, used: false }; }
          cur.p.push(X[j], Y[j]);
          const nj = (j + 1) % n;
          if (Z[nj] <= 0) { const e = cross(j, nj); cur.p.push(e[0], e[1]); cur.a1 = e[2]; segs.push(cur); cur = null; }
        }
      }
      if (!segs) return;
      for (const s of segs) {
        if (s.used) continue;
        s.used = true; path.moveTo(s.p[0], s.p[1]);
        for (let i = 2; i < s.p.length; i += 2) path.lineTo(s.p[i], s.p[i + 1]);
        let c = s;
        for (let guard = 0; guard < 400; guard++) {
          let best = null, bd = Infinity;
          for (const t of segs) {
            if (t.used && t !== s) continue;
            const d = ((t.a0 - c.a1) % TAU + TAU) % TAU;
            if (d < bd) { bd = d; best = t; }
          }
          path.arc(cx, cy, R, c.a1, c.a1 + bd, false);
          if (best === s || !best) { path.closePath(); break; }
          best.used = true;
          for (let i = 0; i < best.p.length; i += 2) path.lineTo(best.p[i], best.p[i + 1]);
          c = best;
        }
      }
    }
    // a run of unit vectors as a polyline, broken at the limb; `upto` is a fractional point count
    function polyline(P, upto) {
      const n = Math.min(P.length / 3, Math.ceil(upto) + 1), full = Math.floor(upto);
      let pen = false, lx = 0, ly = 0;
      for (let i = 0; i < n; i++) {
        const a = P[3 * i], b = P[3 * i + 1], c = P[3 * i + 2];
        if (a * V[0] + b * V[1] + c * V[2] <= 0) { pen = false; continue; }
        let X = cx + R * (a * E[0] + b * E[1] + c * E[2]), Y = cy - R * (a * N[0] + b * N[1] + c * N[2]);
        if (i > full) { if (!pen) break; const f = upto - full; X = lx + (X - lx) * f; Y = ly + (Y - ly) * f; }
        if (pen) ctx.lineTo(X, Y); else { ctx.moveTo(X, Y); pen = true; }
        lx = X; ly = Y;
      }
    }

    G.draw = () => {
      G.dirty = false;
      if (!W || !col) return;
      basis();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.lineJoin = "bevel"; ctx.lineCap = "round"; // thin lines: bevels cost far less than round joins and look the same
      const pv = geo.pv;
      for (let i = 0; i < NP; i++) {
        const a = pv[3 * i], b = pv[3 * i + 1], c = pv[3 * i + 2];
        scr[3 * i] = cx + R * (a * E[0] + b * E[1] + c * E[2]); scr[3 * i + 1] = cy - R * (a * N[0] + b * N[1] + c * N[2]); scr[3 * i + 2] = a * V[0] + b * V[1] + c * V[2];
      }
      // sea and graticule
      ctx.fillStyle = seaG; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
      ctx.strokeStyle = col.grat; ctx.lineWidth = .5; ctx.beginPath();
      for (let k = 0; k < geo.grat.length; k++) polyline(geo.grat[k], 1e9);
      ctx.stroke();
      // land as it really is: clean, with a crisp coast
      const path = new Path2D();
      for (const poly of geo.land) addPoly(path, poly);
      ctx.fillStyle = col.clear; ctx.fill(path);
      ctx.strokeStyle = col.coast; ctx.lineWidth = .7; ctx.stroke(path);
      // the fog over it, lifted around every place visited: first its tone, then its grain,
      // which lingers a little further into each clearing so the edge dissolves instead of blurring
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
      for (let pass = 0; pass < 2; pass++) {
        fctx.setTransform(dpr, 0, 0, dpr, 0, 0); fctx.globalCompositeOperation = "source-over"; fctx.clearRect(0, 0, W, H);
        fctx.lineJoin = "bevel"; fctx.imageSmoothingEnabled = true;
        if (!pass) { // the wide stroke buries the crisp coast and leaves a soft one in its place
          fctx.fillStyle = col.fog; fctx.fill(path);
          fctx.strokeStyle = col.fogCoast; fctx.lineWidth = 1.5; fctx.stroke(path);
        } else if (stip) { fctx.fillStyle = stip; fctx.fill(path); } else break;
        fctx.globalCompositeOperation = "destination-out"; fctx.imageSmoothingEnabled = false;
        const T = geo.tf, k = R * dpr * 1.45 * (pass ? 1.12 : 1.3);
        for (let i = 0; i < NP; i++) {
          if (scr[3 * i + 2] < .04) continue;
          const j = i * 7, h = T[j + 6] * k; // the patch lies on the sphere, so it foreshortens with it
          fctx.setTransform((T[j] * E[0] + T[j + 1] * E[1] + T[j + 2] * E[2]) * h, -(T[j] * N[0] + T[j + 1] * N[1] + T[j + 2] * N[2]) * h,
            -(T[j + 3] * E[0] + T[j + 4] * E[1] + T[j + 5] * E[2]) * h, (T[j + 3] * N[0] + T[j + 4] * N[1] + T[j + 5] * N[2]) * h, scr[3 * i] * dpr, scr[3 * i + 1] * dpr);
          fctx.drawImage(geo.clr[i], -1, -1, 2, 2);
        }
        ctx.drawImage(fogC, 0, 0, W, H);
      }
      ctx.restore();
      // the roundness of the thing, and its edge
      ctx.fillStyle = shadeG; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
      ctx.strokeStyle = col.limb; ctx.lineWidth = .9; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
      // the route
      if (route.length) {
        const upto = G.routeT * (route.length / 3 - 1);
        ctx.beginPath(); polyline(route, upto);
        ctx.strokeStyle = col.red; ctx.lineWidth = 1.15; ctx.stroke();
      }
      // places
      const disc = (i, r) => { ctx.beginPath(); ctx.arc(scr[3 * i], scr[3 * i + 1], r, 0, TAU); };
      for (let i = NS; i < NP; i++) { // also visited: small ink dots
        if (scr[3 * i + 2] <= .03 || i === G.active) continue;
        ctx.fillStyle = col.dot; disc(i, 1.05); ctx.fill();
        if (i === G.hover) { ctx.strokeStyle = col.ink; ctx.lineWidth = .9; disc(i, 3.6); ctx.stroke(); }
      }
      for (let i = 0; i < NS; i++) { // story places: a red dot in a ring
        if (scr[3 * i + 2] <= .03 || i === G.active) continue;
        ctx.fillStyle = col.paper; disc(i, 3.5); ctx.fill();
        if (i === G.routeEnd && G.routeT >= 1) { ctx.strokeStyle = col.red; ctx.lineWidth = .9; disc(i, 5.2); ctx.stroke(); }
        ctx.fillStyle = col.red; disc(i, 2.2); ctx.fill();
      }
      taken.length = 0;
      const act = G.active;
      if (act >= 0 && scr[3 * act + 2] > .03) {
        const p = PLACES[ORDER[act]], c = act < NS ? col.red : col.ink, ar = 6.5;
        ctx.fillStyle = col.paper; disc(act, ar); ctx.fill();
        ctx.strokeStyle = c; ctx.lineWidth = 1.25; disc(act, ar - 1); ctx.stroke();
        ctx.fillStyle = c; disc(act, 2.6); ctx.fill();
        label(act, p.name, G.sub || p.role, "700 13px " + FONT, c, ar);
      }
      const hov = G.hover;
      if (hov >= 0 && hov !== act && scr[3 * hov + 2] > .03) label(hov, PLACES[ORDER[hov]].name, PLACES[ORDER[hov]].role, "400 13px " + FONT, col.ink, 4);
    };

    // a name beside its dot, with what happened there in small type under it, on the least crowded side
    function label(i, text, sub, font, colour, r) {
      const qx = scr[3 * i], qy = scr[3 * i + 1], d = r + 6, h = sub ? 28 : 15;
      ctx.textBaseline = "middle";
      let w = 0;
      if (sub) { ctx.font = SUB; w = ctx.measureText(sub).width; }
      ctx.font = font;
      w = Math.max(w, ctx.measureText(text).width);
      let bs = 1e9, bx = 0, by = 0, bc = -1;
      for (let c = 0; c < 8; c++) {
        const ux = C8[c][0], uy = C8[c][1], ax = qx + ux * d, ay = qy + uy * d;
        const x = ux > .1 ? ax + 4 : ux < -.1 ? ax - 4 - w : ax - w / 2, y = uy > .1 ? ay + h / 2 : uy < -.1 ? ay - h / 2 : ay;
        const x0 = x - 3, x1 = x + w + 3, y0 = y - h / 2 - 1, y1 = y + h / 2 + 1;
        if (x0 < 1 || x1 > W - 1 || y0 < 1 || y1 > H - 1) continue;
        let s = c * .35;
        for (let k = 0; k < NP; k++) {
          if (k === i || scr[3 * k + 2] <= .03) continue;
          const px = scr[3 * k], py = scr[3 * k + 1];
          if (px > x0 - 4 && px < x1 + 4 && py > y0 - 4 && py < y1 + 4) s += k < NS ? 4 : 1.5;
        }
        for (let k = 0; k < taken.length; k += 4) if (!(x1 < taken[k] || x0 > taken[k + 2] || y1 < taken[k + 1] || y0 > taken[k + 3])) s += 30;
        if (s < bs) { bs = s; bx = x; by = y; bc = c; }
      }
      if (bc < 0) { if (sub) label(i, text, "", font, colour, r); return; } // no room for two lines: the name alone
      for (let k = 0; k < NP; k++) { // a dot under the words would read as punctuation: paper it over
        if (k === i || scr[3 * k + 2] <= .03) continue;
        const px = scr[3 * k], py = scr[3 * k + 1];
        if (px > bx - 5 && px < bx + w + 5 && py > by - h / 2 - 2 && py < by + h / 2 + 2) { ctx.fillStyle = col.paper; ctx.beginPath(); ctx.arc(px, py, k < NS ? 5.6 : 2.6, 0, TAU); ctx.fill(); }
      }
      taken.push(bx - 3, by - h / 2 - 1, bx + w + 3, by + h / 2 + 1, qx - r, qy - r, qx + r, qy + r);
      const ux = C8[bc][0], uy = C8[bc][1];
      ctx.strokeStyle = colour; ctx.lineWidth = .9; ctx.beginPath();
      ctx.moveTo(qx + ux * (r + 1.5), qy + uy * (r + 1.5)); ctx.lineTo(qx + ux * d, qy + uy * d); ctx.stroke();
      // both lines share the edge nearest the dot
      const tx = ux > .1 ? bx : ux < -.1 ? bx + w : bx + w / 2, ty = sub ? by - 7 : by;
      ctx.textAlign = ux > .1 ? "left" : ux < -.1 ? "right" : "center";
      ctx.lineJoin = "round"; ctx.lineWidth = 4; ctx.strokeStyle = col.halo;
      ctx.strokeText(text, tx, ty);
      if (sub) { ctx.font = SUB; ctx.strokeText(sub, tx, by + 7.5); ctx.fillStyle = col.sub; ctx.fillText(sub, tx, by + 7.5); ctx.font = font; }
      ctx.fillStyle = colour; ctx.fillText(text, tx, ty);
      ctx.lineJoin = "bevel";
    }

    /* motion: one rAF chain that runs only while something is moving */
    function request() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }
    function frame(now) {
      raf = 0;
      let more = false;
      if (ease) {
        if (!ease.t0) ease.t0 = now;
        const t = clamp((now - ease.t0) / ease.dur, 0, 1);
        setVec(slerp(ease.a, ease.b, ease.f(t), tmp));
        if (t < 1) more = true; else ease = null;
      } else if (spin) {
        const dt = spin.t ? Math.min(.05, (now - spin.t) / 1000) : 0, k = Math.exp(-dt / .5);
        spin.t = now;
        lon0 -= spin.vx * dt; lat0 = clamp(lat0 + spin.vy * dt, -1.35, 1.35);
        spin.vx *= k; spin.vy *= k;
        if (Math.abs(spin.vx) + Math.abs(spin.vy) > .025) more = true; else spin = null;
      }
      if (routeAnim) {
        if (!routeAnim.t0) routeAnim.t0 = now;
        const t = clamp((now - routeAnim.t0 - routeAnim.delay) / routeAnim.dur, 0, 1);
        G.routeT = t * t * (3 - 2 * t);
        if (t < 1) more = true; else routeAnim = null;
      }
      G.draw();
      if (more) request();
    }
    function settle() { // nobody is looking: finish at once and wait
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (ease) { setVec(ease.b); ease = null; }
      if (routeAnim) { routeAnim = null; G.routeT = 1; }
      spin = null; G.dirty = true;
    }
    G.invalidate = () => { G.dirty = true; request(); };
    G.setVisible = (v) => { visible = v; if (!v) settle(); else if (G.dirty) request(); };
    G.settle = settle;
    G.view = () => [lon0 / D, lat0 / D];
    G.setView = (lon, lat) => { ease = spin = null; lon0 = lon * D; lat0 = lat * D; G.invalidate(); };
    // ease to a unit vector along the great circle; dur in ms (optional)
    G.rotateTo = (v, dur) => {
      spin = null;
      if (reduce.matches || !visible || document.hidden || !W) { ease = null; setVec(v); G.invalidate(); return; }
      basis();
      const om = Math.acos(clamp(dot(V, v), -1, 1));
      if (om < .003) { if (!ease) return; }
      ease = { a: V.slice(), b: v, t0: 0, dur: dur || clamp(640 + om * 320, 640, 1300), f: ease ? easeO : easeIO };
      request();
    };
    G.playRoute = (dur, delay) => {
      if (reduce.matches || !visible || !route.length) { G.routeT = 1; G.invalidate(); return; }
      G.routeT = 0; routeAnim = { t0: 0, dur: dur || 2600, delay: delay || 0 }; request();
    };

    /* pointer: drag with inertia, hover names, tap a dot */
    canvas.style.touchAction = "pan-y"; canvas.style.cursor = "grab";
    function hit(e, slop) {
      const b = canvas.getBoundingClientRect(), x = (e.clientX - b.left) * (W / (b.width || W)), y = (e.clientY - b.top) * (H / (b.height || H));
      let best = -1, bd = slop * slop;
      for (let i = 0; i < NP; i++) {
        if (scr[3 * i + 2] <= .03) continue;
        const dx = scr[3 * i] - x, dy = scr[3 * i + 1] - y, bias = i < NS ? .55 : 1, d = (dx * dx + dy * dy) * bias; // story dots win ties
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    }
    function setHover(i) {
      if (i === G.hover) return;
      G.hover = i; canvas.style.cursor = drag && drag.moved ? "grabbing" : i >= 0 ? "pointer" : "grab";
      G.invalidate();
    }
    canvas.addEventListener("pointerdown", (e) => {
      if (e.button || !W) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: e.timeStamp, vx: 0, vy: 0, moved: false };
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      if (e.pointerType === "mouse") e.preventDefault();
      if (spin) spin = null;
    });
    canvas.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) { if (e.pointerType === "mouse" && !drag) setHover(hit(e, 9)); return; }
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved) {
        if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 4) return;
        drag.moved = true; ease = null; G.hover = -1; canvas.style.cursor = "grabbing";
      }
      const dt = Math.max(1, e.timeStamp - drag.t) / 1000;
      drag.x = e.clientX; drag.y = e.clientY; drag.t = e.timeStamp;
      lon0 -= dx / R; lat0 = clamp(lat0 + dy / R, -1.35, 1.35);
      drag.vx += (dx / R / dt - drag.vx) * .45; drag.vy += (dy / R / dt - drag.vy) * .45;
      G.invalidate();
    });
    const release = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag; drag = null;
      try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
      canvas.style.cursor = G.hover >= 0 ? "pointer" : "grab";
      if (e.type === "pointercancel") return;
      if (!d.moved) { // a tap or click
        const i = hit(e, e.pointerType === "mouse" ? 9 : 22);
        if (i >= 0) { if (e.pointerType !== "mouse") G.hover = i; if (G.onPick) G.onPick(ORDER[i], G); G.invalidate(); }
        else if (e.pointerType !== "mouse" && G.hover >= 0) setHover(-1);
        return;
      }
      if (!reduce.matches && e.timeStamp - d.t < 90 && Math.abs(d.vx) + Math.abs(d.vy) > .25) {
        spin = { vx: clamp(d.vx, -7, 7), vy: clamp(d.vy, -7, 7), t: 0 }; request();
      }
    };
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    canvas.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && !drag) setHover(-1); });
  }

  /* ---------------------------------------------------------------- the page */
  const instances = [];
  let loc = null, activeId = null;
  // a slight tilt: the place sits a little above the middle, so the northern mid-latitudes read well
  const viewFor = (p) => vec(p.lon, clamp(p.lat * .7 + 4, -55, 55));
  const LOC_VIEW = vec(-58, 47);

  function mark() {
    const els = document.querySelectorAll("[data-place]");
    for (let i = 0; i < els.length; i++) {
      const el = els[i], on = !!activeId && resolve(el.getAttribute("data-place")) === activeId;
      el.classList.toggle("is-active", on);
    }
  }
  // name a place: the globe turns to it and labels it, with `sub` (or the place's own note) under the name
  function setActive(id, sub) {
    id = resolve(id);
    if (!id || !loc) return false;
    if (id !== activeId) { activeId = id; mark(); }
    loc.active = ORDER.indexOf(id); loc.sub = sub || "";
    if (loc.hover !== loc.active) loc.hover = -1; // a tapped dot must not keep its label once another place is named
    loc.rotateTo(viewFor(PLACES[id]));
    loc.invalidate();
    return true;
  }
  // nothing named: back to the Atlantic view with the whole route
  function clear() {
    if (!activeId || !loc) return;
    activeId = null; mark();
    loc.active = -1; loc.hover = -1; loc.sub = "";
    loc.rotateTo(LOC_VIEW);
    loc.invalidate();
  }

  function init() {
    const cvs = document.querySelectorAll("canvas[data-globe]");
    for (let i = 0; i < cvs.length; i++) {
      const c = cvs[i];
      if (!c.getContext || !c.getContext("2d")) continue;
      const cs = getComputedStyle(c);
      if (cs.aspectRatio === "auto" && !c.style.height) c.style.aspectRatio = "1";
      const g = new Globe(c);
      instances.push(g);
      if (!loc) loc = g;
    }

    instances.forEach((g) => {
      g.setView(Math.atan2(LOC_VIEW[1], LOC_VIEW[0]) / D, Math.asin(LOC_VIEW[2]) / D);
      g.onPick = (id) => setActive(id);
      g.size();
      if ("ResizeObserver" in window) new ResizeObserver(() => g.size()).observe(g.canvas);
      // first sight: swing in once and draw the route
      let seen = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver((en) => {
          const on = en[en.length - 1].isIntersecting;
          g.setVisible(on);
          if (!on || seen) return;
          seen = true;
          const intro = () => { // wait for the page to finish loading, so the turn is not fighting it for frames
            if (reduce.matches || activeId) return;
            const v = g.view();
            g.setView(v[0] - 46, v[1] - 8); g.rotateTo(LOC_VIEW, 2600); g.playRoute(2800, 250);
          };
          if (document.readyState === "complete") intro(); else window.addEventListener("load", intro, { once: true });
        }, { threshold: .2 }).observe(g.canvas);
      }
    });
    window.addEventListener("resize", () => instances.forEach((g) => g.size()), { passive: true });
    document.addEventListener("visibilitychange", () => instances.forEach((g) => { if (document.hidden) g.settle(); else if (g.dirty) g.invalidate(); }));

    // theme: the page fires `themechange`; the attribute watch is a belt for the braces
    const retheme = () => instances.forEach((g) => g.theme(false));
    document.addEventListener("themechange", retheme);
    if ("MutationObserver" in window) new MutationObserver(retheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    if (window.matchMedia) { const mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", retheme); }
    // canvas text needs the face loaded before it can be set
    if (document.fonts) {
      const redraw = () => instances.forEach((g) => g.invalidate());
      if (document.fonts.load) Promise.all([document.fonts.load('700 13px "Old Standard TT"'), document.fonts.load('400 13px "Old Standard TT"')]).then(redraw, () => {});
      if (document.fonts.ready) document.fonts.ready.then(redraw, () => {});
    }

    // every [data-place] in the document is a control: point at it, tap it or tab to it and the globe turns there,
    // showing the control's own gloss (its .r-g) under the name
    const ctl = (e) => (e.target && e.target.closest ? e.target.closest("[data-place]") : null);
    const name = (el) => { const s = el.querySelector(".r-g"); setActive(el.getAttribute("data-place"), s ? s.textContent : ""); };
    let overEl = null, keyEl = null;
    document.addEventListener("pointerover", (e) => {
      if (e.pointerType !== "mouse") return;
      const el = ctl(e), was = overEl;
      if (el === was) return;
      overEl = el;
      if (el) name(el); else if (was) { if (keyEl) name(keyEl); else clear(); } // falls back to the place the keyboard is on
    });
    document.addEventListener("click", (e) => {
      const el = ctl(e);
      if (el) name(el);
      else if (!(e.target && e.target.closest && e.target.closest("canvas[data-globe]"))) clear();
    });
    // keyboard only: a tap also moves focus, and must not undo itself when the finger goes on to the globe
    const keyed = (el) => { try { return el.matches(":focus-visible"); } catch (_) { return true; } };
    document.addEventListener("focusin", (e) => { const el = ctl(e); if (el && keyed(el)) { keyEl = el; name(el); } });
    document.addEventListener("focusout", (e) => {
      if (!keyEl || e.target !== keyEl) return;
      keyEl = null;
      if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest("[data-place]")) return;
      if (overEl) name(overEl); else clear();
    });
  }

  window.LexGlobe = { PLACES, focus: (id) => setActive(id), instances };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
