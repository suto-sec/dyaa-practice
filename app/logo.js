/* Logo candidates. Every design is drawn on a 64x64 tile from two colours (tile, ink), so the same code serves the
   top bar (CSS variables, follows the accent), the favicon (concrete hex values) and the preview sheet in design/.
   DYAA_LOGO.pick is the index of the design in use. */
(function (root) {
'use strict';
var fl = function (c) { return 'style="fill:' + c + '"'; };
var st = function (c, w) { return 'style="fill:none;stroke:' + c + ';stroke-width:' + w + ';stroke-linecap:round;stroke-linejoin:round"'; };

/* Sierpinski triangle of the given depth inside the triangle (a, b, c), as one path. */
function sier(a, b, c, depth, gap) {
  if (depth === 0) {
    var g = function (p, q) { return [p[0] + (q[0] - p[0]) * gap, p[1] + (q[1] - p[1]) * gap]; };
    var cx = (a[0] + b[0] + c[0]) / 3, cy = (a[1] + b[1] + c[1]) / 3, k = 1 - gap;
    var s = function (p) { return [cx + (p[0] - cx) * k, cy + (p[1] - cy) * k]; };
    var A = s(a), B = s(b), C = s(c);
    return 'M' + A.join(' ') + 'L' + B.join(' ') + 'L' + C.join(' ') + 'Z';
  }
  var m = function (p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  var ab = m(a, b), bc = m(b, c), ca = m(c, a);
  return sier(a, ab, ca, depth - 1, gap) + sier(ab, b, bc, depth - 1, gap) + sier(ca, bc, c, depth - 1, gap);
}
function fix(s) { return s.replace(/(\d+\.\d{2})\d+/g, '$1'); }

var FLAME = 'M12 2C12.3 5 15.5 6.6 15.6 10.4 16.9 9.5 17.7 8.2 17.8 6.8 19.9 8.8 21 11.2 21 13.8 21 18.3 17 22 12 22 7 22 3 18.3 3 13.8 3 10.7 4.7 8.3 6.6 6.6 6.8 8.2 7.6 9.4 8.9 10.2 8.4 7 9.8 4 12 2Z';

var DESIGNS = [
  { id: 'arbol', name: 'Árbol de recursión', draw: function (t, k) {
    return '<path ' + st(k, 3.2) + ' d="M32 15L18 32M32 15L46 32M18 32L11 49M18 32L25 49M46 32L39 49M46 32L53 49"/>' +
      '<circle cx="32" cy="15" r="6" ' + fl(k) + '/><circle cx="18" cy="32" r="5.2" ' + fl(k) + '/><circle cx="46" cy="32" r="5.2" ' + fl(k) + '/>' +
      [11, 25, 39, 53].map(function (x) { return '<circle cx="' + x + '" cy="49" r="4.6" ' + fl(k) + '/>'; }).join('');
  } },
  { id: 'curvas', name: 'Curvas de crecimiento', draw: function (t, k) {
    return '<path ' + st(k, 3.2) + ' stroke-opacity=".5" d="M13 12V51H52"/>' +
      '<path ' + st(k, 4) + ' stroke-opacity=".72" d="M13 51L51 30"/>' +
      '<path ' + st(k, 4.8) + ' d="M13 51C30 51 45 43 51 12"/>';
  } },
  { id: 'llama', name: 'Llama con curva', draw: function (t, k) {
    return '<defs><clipPath id="dyaa-fc"><path transform="translate(8 7) scale(2.05)" d="' + FLAME + '"/></clipPath></defs>' +
      '<path transform="translate(8 7) scale(2.05)" d="' + FLAME + '" ' + fl(k) + '/>' +
      '<g clip-path="url(#dyaa-fc)"><path ' + st(t, 4) + ' d="M12 52C28 52 36 44 41 18"/><path ' + st(t, 3) + ' stroke-opacity=".9" d="M12 52L56 37"/></g>';
  } },
  { id: 'grafo', name: 'Grafo y árbol generador', draw: function (t, k) {
    var P = { a: [13, 47], b: [24, 16], c: [41, 44], d: [52, 17] };
    var e = function (u, v, w, o) { return '<path ' + st(k, w) + (o ? ' stroke-opacity="' + o + '"' : '') + ' d="M' + P[u].join(' ') + 'L' + P[v].join(' ') + '"/>'; };
    return e('a', 'c', 3, .45) + e('b', 'd', 3, .45) + e('a', 'b', 5) + e('b', 'c', 5) + e('c', 'd', 5) +
      Object.keys(P).map(function (n) { return '<circle cx="' + P[n][0] + '" cy="' + P[n][1] + '" r="7" ' + fl(k) + '/>'; }).join('');
  } },
  { id: 'sierpinski', name: 'Triángulo recursivo', draw: function (t, k) {
    return '<path ' + fl(k) + ' d="' + fix(sier([32, 9], [8, 53], [56, 53], 2, 0.06)) + '"/>';
  } },
  { id: 'hanoi', name: 'Torres de Hanoi', draw: function (t, k) {
    var disc = function (cx, y, w) { return '<rect x="' + (cx - w / 2) + '" y="' + y + '" width="' + w + '" height="7.4" rx="3.7" ' + fl(k) + '/>'; };
    return '<rect x="6" y="50" width="52" height="6" rx="3" ' + fl(k) + '/>' +
      [17, 34, 51].map(function (x) { return '<rect x="' + (x - 2) + '" y="12" width="4" height="39" rx="2" ' + fl(k) + ' fill-opacity=".5"/>'; }).join('') +
      disc(17, 42, 25) + disc(17, 34, 18) + disc(17, 26, 11) + disc(51, 42, 11);
  } }
];

var LOGO = {
  pick: 0,
  designs: DESIGNS,
  /* A complete <svg>. tile = colour of the rounded square, ink = colour of the drawing. */
  svg: function (tile, ink, idx) {
    var d = DESIGNS[idx == null ? LOGO.pick : idx];
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="DyAA Practice"><rect width="64" height="64" rx="14" ' + fl(tile) + '/>' + d.draw(tile, ink) + '</svg>';
  }
};
if (typeof module !== 'undefined' && module.exports) module.exports = LOGO; else root.DYAA_LOGO = LOGO;
})(typeof window !== 'undefined' ? window : this);
