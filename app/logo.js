/* The logo: a graph whose spanning tree is drawn bold. It is drawn on a 64x64 tile from two colours (tile, ink), so the same
   code serves the top bar (CSS variables, follows the accent) and the favicon (concrete hex values). */
(function (root) {
'use strict';
var fl = function (c) { return 'style="fill:' + c + '"'; };
var st = function (c, w) { return 'style="fill:none;stroke:' + c + ';stroke-width:' + w + ';stroke-linecap:round;stroke-linejoin:round"'; };

var P = { a: [13, 47], b: [24, 16], c: [41, 44], d: [52, 17] };
function edge(k, u, v, w, o) { return '<path ' + st(k, w) + (o ? ' stroke-opacity="' + o + '"' : '') + ' d="M' + P[u].join(' ') + 'L' + P[v].join(' ') + '"/>'; }

var LOGO = {
  designs: [{ id: 'grafo', name: 'Grafo y árbol generador' }],
  /* A complete <svg>. tile = colour of the rounded square, ink = colour of the drawing. */
  svg: function (tile, ink) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="DyAA Practice"><rect width="64" height="64" rx="14" ' + fl(tile) + '/>' +
      edge(ink, 'a', 'c', 3, .45) + edge(ink, 'b', 'd', 3, .45) + edge(ink, 'a', 'b', 5) + edge(ink, 'b', 'c', 5) + edge(ink, 'c', 'd', 5) +
      Object.keys(P).map(function (n) { return '<circle cx="' + P[n][0] + '" cy="' + P[n][1] + '" r="7" ' + fl(ink) + '/>'; }).join('') + '</svg>';
  }
};
if (typeof module !== 'undefined' && module.exports) module.exports = LOGO; else root.DYAA_LOGO = LOGO;
})(typeof window !== 'undefined' ? window : this);
