/* Theme and accent colour. Loaded in <head> so the saved choice is applied before the first paint.
   Pure colour maths is exported for tools/check-logic.js; the DOM parts are guarded so the file also runs in Node. */
(function (root) {
'use strict';
var T = {};
T.KEY_THEME = 'dyaa-practice-theme';
T.KEY_ACCENT = 'dyaa-practice-accent';
T.MODES = ['system', 'light', 'dark'];
/* Page backgrounds (keep in sync with style.css): the accent text colour is adjusted to stay readable on them. */
T.BG = { light: [246, 247, 249], dark: [18, 21, 28] };
T.INK_DARK = [26, 15, 8];
T.PRESETS = [
  ['Naranja', '#ea580c'], ['Ámbar', '#d97706'], ['Rojo', '#dc2626'], ['Rosa', '#db2777'],
  ['Violeta', '#7c3aed'], ['Azul', '#2f6fed'], ['Turquesa', '#0d9488'], ['Verde', '#16a34a']
];

/* ---------- colour maths (pure) ---------- */
T.hex = function (rgb) { return '#' + rgb.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); };
T.parseHex = function (t) {
  t = String(t || '').trim();
  var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);
  if (!m) return null;
  var h = m[1]; if (h.length === 3) h = h.replace(/./g, '$&$&');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
/* Any CSS colour (name, rgb(), hsl()...) through a canvas; #hex is parsed directly. null when it is not a colour. */
T.parse = function (text) {
  var x = T.parseHex(text); if (x) return x;
  var t = String(text || '').trim();
  try {
    if (!t || !root.CSS || !root.CSS.supports('color', t)) return null;
    var c = root.document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    c.fillStyle = '#fff'; c.fillRect(0, 0, 1, 1);
    c.fillStyle = t; c.fillRect(0, 0, 1, 1);   // a translucent colour is shown over white
    var d = c.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  } catch (e) { return null; }
};
T.lum = function (c) {
  var v = c.map(function (u) { u /= 255; return u <= 0.03928 ? u / 12.92 : Math.pow((u + 0.055) / 1.055, 2.4); });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
T.contrast = function (a, b) { var x = T.lum(a), y = T.lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
/* Text colour that reads best on top of the accent (buttons, the active tab). */
T.ink = function (acc) { return T.contrast(acc, [255, 255, 255]) >= T.contrast(acc, T.INK_DARK) ? [255, 255, 255] : T.INK_DARK; };
/* The accent moved towards black (light page) or white (dark page) until it reads as text (contrast >= 4.5) on the page. */
T.readable = function (acc, bg, dark) {
  var c = acc.slice(), to = dark ? 255 : 0;
  for (var i = 0; i < 40 && T.contrast(c, bg) < 4.5; i++) c = c.map(function (v) { return v + (to - v) * 0.08; });
  return c.map(Math.round);
};

/* ---------- state ---------- */
function get(k) { try { return root.localStorage.getItem(k); } catch (e) { return null; } }
function set(k, v) { try { if (v == null) root.localStorage.removeItem(k); else root.localStorage.setItem(k, v); } catch (e) { /* not remembered */ } }
T.mode = function () { var m = get(T.KEY_THEME); return T.MODES.indexOf(m) >= 0 ? m : 'system'; };
T.accent = function () { return get(T.KEY_ACCENT); };   // null = the built-in accent of the theme
T.isDark = function () {
  var m = T.mode();
  if (m !== 'system') return m === 'dark';
  try { return !!(root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches); } catch (e) { return false; }
};
/* The accent colour in use right now, as [r,g,b]. */
T.current = function () {
  var a = T.accent(), c = a && T.parse(a);
  if (c) return c;
  try { return T.parseHex(root.getComputedStyle(root.document.documentElement).getPropertyValue('--ac')) || [194, 65, 12]; } catch (e) { return [194, 65, 12]; }
};

/* ---------- apply ---------- */
T.applyAccent = function () {
  var st = root.document && root.document.documentElement && root.document.documentElement.style;
  if (!st) return;
  var a = T.accent(), c = a && T.parse(a);
  if (!c) { ['--ac', '--ac-ink', '--ac-text'].forEach(function (p) { st.removeProperty(p); }); }
  else {
    var dark = T.isDark();
    st.setProperty('--ac', T.hex(c));
    st.setProperty('--ac-ink', T.hex(T.ink(c)));
    st.setProperty('--ac-text', T.hex(T.readable(c, dark ? T.BG.dark : T.BG.light, dark)));
  }
  if (T.onChange) T.onChange();
};
T.applyMode = function () {
  var el = root.document && root.document.documentElement;
  if (!el) return;
  var m = T.mode();
  if (m === 'system') delete el.dataset.theme; else el.dataset.theme = m;
  T.applyAccent();   // the readable text colour depends on the theme
};
T.setMode = function (m) { set(T.KEY_THEME, m === 'system' ? null : m); T.applyMode(); };
T.setAccent = function (v) { set(T.KEY_ACCENT, v || null); T.applyAccent(); };

/* ---------- favicon (the logo drawn in the accent colour) ---------- */
T.favicon = function () {
  try {
    var link = root.document.getElementById('fav'), logo = root.DYAA_LOGO;
    if (!link || !logo) return;
    var c = T.current();
    link.href = 'data:image/svg+xml,' + encodeURIComponent(logo.svg(T.hex(c), T.hex(T.ink(c))));
  } catch (e) { /* keep the static icon */ }
};

T.onChange = function () { T.favicon(); };

T.init = function () {
  T.applyMode();
  try {
    var mq = root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)');
    if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (T.mode() === 'system') T.applyAccent(); });
  } catch (e) { /* no media query support */ }
};

if (typeof module !== 'undefined' && module.exports) module.exports = T; else { root.DYAA_THEME = T; T.init(); }
})(typeof window !== 'undefined' ? window : this);
