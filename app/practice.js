/* Practice that needs no paper: questions made on the spot (so they never run out) and checked by code.
   Pure (no DOM), loaded by the app and by tools/check-practice.js.

   A question is { type: 'mc', prompt, options: [text], answer: index, why } or
                  { type: 'rank', prompt, items: [text] (shown order), order: [indices from smallest to largest], why }.
   Text is Markdown with $math$. rnd is a function returning a number in [0,1) (Math.random in the app, a seeded one in the checks). */
(function (root) {
'use strict';
var P = {};

/* ---------- helpers ---------- */
function ri(rnd, a, b) { return a + Math.floor(rnd() * (b - a + 1)); }
function pick(arr, rnd) { return arr[Math.floor(rnd() * arr.length)]; }
function shuffle(arr, rnd) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function uniq(arr) { var seen = {}; return arr.filter(function (x) { if (seen[x]) return false; seen[x] = 1; return true; }); }
/* Four options at most: the right one and up to three wrong ones, shuffled. Wrong options equal to the right one or to each other are dropped. */
function mc(prompt, right, wrongs, why, rnd, n) {
  wrongs = uniq(wrongs.filter(function (w) { return w !== right; }));
  var opts = [right].concat(shuffle(wrongs, rnd).slice(0, (n || 4) - 1)), sh = shuffle(opts, rnd);
  return { type: 'mc', prompt: prompt, options: sh, answer: sh.indexOf(right), why: why };
}
function code(s) { return '```python\n' + s + '\n```'; }
function T(s) { return '$' + s + '$'; }

/* ---------- 1. generated drills ---------- */
function powTex(base, e) { return e === 0 ? '1' : e === 1 ? base : base + '^{' + e + '}'; }

/* T(n) = a T(n/b) + n^k: the three cases of the master theorem. */
function genMaster(rnd) {
  var cs = ri(rnd, 1, 3), b, k, a;
  for (;;) {
    b = pick([2, 2, 3, 4], rnd); k = ri(rnd, 0, 3);
    var bk = Math.pow(b, k);
    if (cs === 1) { a = bk + ri(rnd, 1, 6); break; }
    if (cs === 2) { a = bk; break; }
    if (bk > 1) { a = ri(rnd, 1, bk - 1); break; }
    cs = ri(rnd, 1, 2);
  }
  var bkv = Math.pow(b, k), f = k === 0 ? '1' : k === 1 ? 'n' : 'n^{' + k + '}';
  function logExp() {   // log_b a, as an integer when a is a power of b
    for (var e = 0; e <= 12; e++) if (Math.pow(b, e) === a) return String(e);
    return '\\log_{' + b + '} ' + a;
  }
  var nk = k === 0 ? '1' : k === 1 ? 'n' : 'n^{' + k + '}', nkLog = k === 0 ? '\\log n' : k === 1 ? 'n\\log n' : 'n^{' + k + '}\\log n';
  var le = logExp(), f1 = '\\Theta(' + (le === '0' ? '1' : le === '1' ? 'n' : 'n^{' + le + '}') + ')', f2 = '\\Theta(' + nkLog + ')', f3 = '\\Theta(' + nk + ')';
  var right = cs === 1 ? f1 : cs === 2 ? f2 : f3;
  var wrongs = [f1, f2, f3, '\\Theta(' + (k + 1 === 1 ? 'n' : 'n^{' + (k + 1) + '}') + ')', '\\Theta(' + (le === '0' ? '1' : le === '1' ? 'n' : 'n^{' + le + '}') + '\\log n)'].map(T);
  var why = 'Se compara $a=' + a + '$ con $b^{k}=' + b + '^{' + k + '}=' + bkv + '$ (aquí $f(n)=' + f + '$). ' +
    (cs === 1 ? 'Como $a>b^k$ dominan las hojas del árbol de recursión: $\\Theta(n^{\\log_{' + b + '} ' + a + '})$.' :
      cs === 2 ? 'Como $a=b^k$ todos los niveles cuestan lo mismo y hay $\\log n$ niveles: $\\Theta(n^{' + k + '}\\log n)$.' :
        'Como $a<b^k$ domina el trabajo de dividir y combinar de la raíz: $\\Theta(' + nk + ')$.');
  return mc('Con ' + T('T(1)=1') + ', ¿cuál es el orden de ' + T('T(n)=' + (a === 1 ? '' : a + '\\,') + 'T(n/' + b + ')+' + f) + '?', T(right), wrongs, why, rnd);
}

/* T(n) = a T(n-c) + n^k */
function npow(e) { return e === 0 ? '1' : e === 1 ? 'n' : 'n^{' + e + '}'; }
function genResta(rnd) {
  var a = ri(rnd, 1, 3), k = ri(rnd, 0, 2), c = a === 1 ? ri(rnd, 1, 2) : 1;
  var f = npow(k), term = c === 1 ? 'T(n-1)' : 'T(n-' + c + ')', poly = function (e) { return '\\Theta(' + npow(e) + ')'; };
  var right = a === 1 ? poly(k + 1) : '\\Theta(' + a + '^{n})';
  var wrongs = [poly(k), poly(k + 1), poly(k + 2), '\\Theta(2^{n})', a > 1 ? '\\Theta(' + (a + 1) + '^{n})' : '\\Theta(2^{n})', '\\Theta(' + (k === 0 ? '\\log n' : npow(k) + '\\log n') + ')', '\\Theta(\\log n)'].filter(function (x) { return x !== right; }).map(T);
  var pw = function (base) { return k === 0 ? '1' : k === 1 ? base : (base.length === 1 ? base : '(' + base + ')') + '^{' + k + '}'; };
  var why = a === 1 ? 'Se expande: ' + T('T(n)=' + pw('n') + '+' + pw('n-' + c) + '+' + pw('n-' + 2 * c) + '+\\cdots') + ': ' + (c === 1 ? '$n$' : 'unos $n/' + c + '$') + ' sumandos de tamaño como mucho ' + T(f) + ', una suma de potencias, así que ' + T(poly(k + 1)) + '.' :
    'Cada nivel multiplica por ' + a + ' el número de llamadas y hay $n$ niveles: ' + T(right) + '; el término $' + f + '$ de cada llamada no cambia el orden.';
  return mc('Con ' + T('T(0)=1') + ', ¿cuál es el orden de ' + T('T(n)=' + (a === 1 ? '' : a + '\\,') + term + '+' + f) + '?', T(right), wrongs, why, rnd);
}

/* Cost of loops. Every template has the code shown and a function that runs it (the checks use it to verify the class). */
var CLASSES = {
  loglog: '\\Theta(\\log\\log n)', log: '\\Theta(\\log n)', sqrt: '\\Theta(\\sqrt{n})', n: '\\Theta(n)', nlog: '\\Theta(n\\log n)',
  n15: '\\Theta(n^{1.5})', n2: '\\Theta(n^{2})', n3: '\\Theta(n^{3})'
};
P.LOOPS = [
  { cls: 'n2', code: function (r) { return 'for i in range(n):\n    for j in range(n):\n        c += 1'; }, run: function (n) { var c = 0, i, j; for (i = 0; i < n; i++) for (j = 0; j < n; j++) c++; return c; }, why: 'Dos bucles independientes de $n$ iteraciones: $n\\cdot n$.' },
  { cls: 'n2', code: function () { return 'for i in range(n):\n    for j in range(i):\n        c += 1'; }, run: function (n) { var c = 0, i, j; for (i = 0; i < n; i++) for (j = 0; j < i; j++) c++; return c; }, why: 'El interior hace $i$ vueltas: $\\sum_{i=0}^{n-1} i=n(n-1)/2$.' },
  { cls: 'nlog', code: function (r) { var m = r < 0.5 ? 2 : 3; return 'for i in range(n):\n    j = 1\n    while j < n:\n        j *= ' + m + '\n        c += 1'; }, run: function (n) { var c = 0, i, j; for (i = 0; i < n; i++) { j = 1; while (j < n) { j *= 2; c++; } } return c; }, why: 'El bucle interior multiplica $j$ por una constante: $\\log n$ vueltas; el exterior las repite $n$ veces.' },
  { cls: 'n', code: function () { return 'i = n\nwhile i >= 1:\n    for j in range(i):\n        c += 1\n    i //= 2'; }, run: function (n) { var c = 0, i = n, j; while (i >= 1) { for (j = 0; j < i; j++) c++; i = Math.floor(i / 2); } return c; }, why: 'Las vueltas son $n+n/2+n/4+\\cdots\\le 2n$: una serie geométrica.' },
  { cls: 'log', code: function (r) { var m = r < 0.5 ? 2 : 3; return 'i = 1\nwhile i < n:\n    i *= ' + m + '\n    c += 1'; }, run: function (n) { var c = 0, i = 1; while (i < n) { i *= 2; c++; } return c; }, why: '$i$ crece geométricamente: $\\log n$ vueltas.' },
  { cls: 'n3', code: function () { return 'for i in range(n):\n    for j in range(i):\n        for k in range(j):\n            c += 1'; }, run: function (n) { var c = 0, i, j, k; for (i = 0; i < n; i++) for (j = 0; j < i; j++) for (k = 0; k < j; k++) c++; return c; }, why: '$\\sum_i\\sum_{j<i} j\\approx\\sum_i i^2/2\\approx n^3/6$.' },
  { cls: 'n15', code: function () { return 'for i in range(n):\n    for j in range(int(n ** 0.5)):\n        c += 1'; }, run: function (n) { var c = 0, i, j, s = Math.floor(Math.sqrt(n)); for (i = 0; i < n; i++) for (j = 0; j < s; j++) c++; return c; }, why: '$n$ vueltas por $\\sqrt n$ vueltas: $n\\cdot n^{1/2}=n^{1.5}$.' },
  { cls: 'nlog', code: function () { return 'for i in range(1, n + 1):\n    for j in range(i, n + 1, i):\n        c += 1'; }, run: function (n) { var c = 0, i, j; for (i = 1; i <= n; i++) for (j = i; j <= n; j += i) c++; return c; }, why: 'Para cada $i$ el interior hace $n/i$ vueltas: $n\\sum 1/i=n\\,H_n=\\Theta(n\\log n)$.' },
  { cls: 'loglog', code: function () { return 'i = 2\nwhile i < n:\n    i = i * i\n    c += 1'; }, run: function (n) { var c = 0, i = 2; while (i < n) { i = i * i; c++; } return c; }, why: '$i$ se eleva al cuadrado: $2,4,16,256,\\dots=2^{2^k}$, así que hay $\\log\\log n$ vueltas.' },
  { cls: 'n', code: function (r) { var s = r < 0.5 ? 2 : 5; return 'for i in range(0, n, ' + s + '):\n    c += 1'; }, run: function (n) { var c = 0, i; for (i = 0; i < n; i += 2) c++; return c; }, why: 'Un paso constante solo cambia la constante: hay $n/\\text{paso}$ vueltas, es decir $\\Theta(n)$.' },
  { cls: 'n3', code: function () { return 'for i in range(n):\n    for j in range(i * i):\n        c += 1'; }, run: function (n) { var c = 0, i, j; for (i = 0; i < n; i++) for (j = 0; j < i * i; j++) c++; return c; }, why: '$\\sum_{i<n} i^2=\\Theta(n^3)$.' },
  { cls: 'sqrt', code: function () { return 'i = 1\nwhile i * i <= n:\n    i += 1\n    c += 1'; }, run: function (n) { var c = 0, i = 1; while (i * i <= n) { i++; c++; } return c; }, why: 'Se para cuando $i^2>n$, es decir tras $\\sqrt n$ vueltas.' }
];
function genBucles(rnd) {
  var t = pick(P.LOOPS, rnd), body = t.code(rnd());
  var src = 'def coste(n):\n    c = 0\n' + body.split('\n').map(function (l) { return '    ' + l; }).join('\n') + '\n    return c';
  var right = T(CLASSES[t.cls]), wrongs = Object.keys(CLASSES).filter(function (k) { return k !== t.cls; }).map(function (k) { return T(CLASSES[k]); });
  return mc('¿Cuál es el orden del valor que devuelve ' + '`coste(n)`' + ' (las veces que se ejecuta ' + '`c += 1`' + ')?\n\n' + code(src), right, wrongs, t.why, rnd);
}

/* Order by growth. Strictly increasing classes. */
P.GROWTH = [
  { tex: '\\log\\log n', ln: function (n) { return Math.log(Math.log(Math.log(n))); } },
  { tex: '\\log n', ln: function (n) { return Math.log(Math.log(n)); } },
  { tex: '\\log^{2} n', ln: function (n) { return 2 * Math.log(Math.log(n)); } },
  { tex: '\\sqrt{n}', ln: function (n) { return 0.5 * Math.log(n); } },
  { tex: 'n', ln: function (n) { return Math.log(n); } },
  { tex: 'n\\log n', ln: function (n) { return Math.log(n) + Math.log(Math.log(n)); } },
  { tex: 'n^{1.5}', ln: function (n) { return 1.5 * Math.log(n); } },
  { tex: 'n^{2}', ln: function (n) { return 2 * Math.log(n); } },
  { tex: 'n^{2}\\log n', ln: function (n) { return 2 * Math.log(n) + Math.log(Math.log(n)); } },
  { tex: 'n^{3}', ln: function (n) { return 3 * Math.log(n); } },
  { tex: '2^{n}', ln: function (n) { return n * Math.log(2); } },
  { tex: '3^{n}', ln: function (n) { return n * Math.log(3); } },
  { tex: 'n!', ln: function (n) { return n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n); } },
  { tex: 'n^{n}', ln: function (n) { return n * Math.log(n); } }
];
function genOrden(rnd) {
  var n = 5, idx = shuffle(P.GROWTH.map(function (g, i) { return i; }), rnd).slice(0, n).sort(function (a, b) { return a - b; });
  var shown = shuffle(idx, rnd);
  return { type: 'rank', prompt: 'Ordena de **menor a mayor** crecimiento asintótico (toca primero el que crece más despacio):', items: shown.map(function (i) { return T(P.GROWTH[i].tex); }),
    order: idx.map(function (i) { return shown.indexOf(i); }), why: 'De menor a mayor: ' + idx.map(function (i) { return T(P.GROWTH[i].tex); }).join(' $\\prec$ ') + '.' };
}

/* Closed forms of sums: the right form and wrong ones are all evaluated, so exactly one matches the sum. */
function sumOf(lo, hi, f) { var s = 0; for (var i = lo; i <= hi; i++) s += f(i); return s; }
function sumTemplates(rnd) {
  var a = ri(rnd, 2, 5), b = ri(rnd, -2, 4), r = pick([2, 3], rnd), m = ri(rnd, 2, 4), bs = b < 0 ? '-' + (-b) : '+' + b;
  return [
    { sum: '\\sum_{i=1}^{n}(' + a + 'i' + (b === 0 ? '' : bs) + ')', truth: function (n) { return sumOf(1, n, function (i) { return a * i + b; }); },
      right: { tex: '\\frac{' + a + 'n(n+1)}{2}' + (b === 0 ? '' : bs + 'n'), fn: function (n) { return a * n * (n + 1) / 2 + b * n; } },
      wrongs: [{ tex: '\\frac{' + a + 'n(n+1)}{2}' + (b === 0 ? '' : bs), fn: function (n) { return a * n * (n + 1) / 2 + b; } }, { tex: '\\frac{' + a + 'n(n-1)}{2}' + (b === 0 ? '' : bs + 'n'), fn: function (n) { return a * n * (n - 1) / 2 + b * n; } },
        { tex: a + 'n(n+1)' + (b === 0 ? '' : bs + 'n'), fn: function (n) { return a * n * (n + 1) + b * n; } }, { tex: '\\frac{' + a + 'n(n+1)}{2}' + (b === 0 ? '' : bs + '(n+1)'), fn: function (n) { return a * n * (n + 1) / 2 + b * (n + 1); } }],
      why: 'Se separa en $' + a + '\\sum i' + (b === 0 ? '' : bs + '\\sum 1') + '$, con $\\sum_{i=1}^n i=n(n+1)/2$ y $\\sum_{i=1}^n 1=n$.' },
    { sum: '\\sum_{i=0}^{n}' + r + '^{i}', truth: function (n) { return sumOf(0, n, function (i) { return Math.pow(r, i); }); },
      right: { tex: '\\frac{' + r + '^{n+1}-1}{' + (r - 1) + '}', fn: function (n) { return (Math.pow(r, n + 1) - 1) / (r - 1); } },
      wrongs: [{ tex: '\\frac{' + r + '^{n}-1}{' + (r - 1) + '}', fn: function (n) { return (Math.pow(r, n) - 1) / (r - 1); } }, { tex: '\\frac{' + r + '^{n+1}}{' + (r - 1) + '}', fn: function (n) { return Math.pow(r, n + 1) / (r - 1); } },
        { tex: '\\frac{' + r + '^{n+1}-1}{' + r + '}', fn: function (n) { return (Math.pow(r, n + 1) - 1) / r; } }, { tex: r + '^{n+1}-1', fn: function (n) { return Math.pow(r, n + 1) - 1; } }],
      why: 'Serie geométrica: $\\sum_{i=0}^{n} r^i=\\frac{r^{n+1}-1}{r-1}$ con $r=' + r + '$.' },
    { sum: '\\sum_{i=1}^{n}i^{2}', truth: function (n) { return sumOf(1, n, function (i) { return i * i; }); },
      right: { tex: '\\frac{n(n+1)(2n+1)}{6}', fn: function (n) { return n * (n + 1) * (2 * n + 1) / 6; } },
      wrongs: [{ tex: '\\frac{n(n+1)(2n+1)}{3}', fn: function (n) { return n * (n + 1) * (2 * n + 1) / 3; } }, { tex: '\\frac{n^{2}(n+1)}{2}', fn: function (n) { return n * n * (n + 1) / 2; } },
        { tex: '\\frac{n(n+1)(n+2)}{6}', fn: function (n) { return n * (n + 1) * (n + 2) / 6; } }, { tex: '\\frac{n^{3}}{3}', fn: function (n) { return n * n * n / 3; } }],
      why: 'Fórmula de la suma de cuadrados: $\\frac{n(n+1)(2n+1)}{6}$.' },
    { sum: '\\sum_{i=' + m + '}^{n}1', minN: m, cond: 'n\\ge ' + m, truth: function (n) { return sumOf(m, n, function () { return 1; }); },
      right: { tex: 'n-' + m + '+1', fn: function (n) { return n - m + 1; } },
      wrongs: [{ tex: 'n-' + m, fn: function (n) { return n - m; } }, { tex: 'n-' + m + '+2', fn: function (n) { return n - m + 2; } }, { tex: 'n+' + m + '-1', fn: function (n) { return n + m - 1; } }, { tex: 'n', fn: function (n) { return n; } }],
      why: 'Hay $n-' + m + '+1$ términos, todos iguales a $1$ (los extremos cuentan).' },
    { sum: '\\sum_{i=1}^{n}(2i-1)', truth: function (n) { return sumOf(1, n, function (i) { return 2 * i - 1; }); },
      right: { tex: 'n^{2}', fn: function (n) { return n * n; } },
      wrongs: [{ tex: 'n(n+1)', fn: function (n) { return n * (n + 1); } }, { tex: 'n^{2}-1', fn: function (n) { return n * n - 1; } }, { tex: '2n^{2}', fn: function (n) { return 2 * n * n; } }, { tex: '\\frac{n(n+1)}{2}', fn: function (n) { return n * (n + 1) / 2; } }],
      why: 'La suma de los $n$ primeros impares es $n^2$: $2\\cdot\\frac{n(n+1)}{2}-n=n^2$.' },
    { sum: '\\sum_{i=1}^{n}\\sum_{j=1}^{i}1', truth: function (n) { return sumOf(1, n, function (i) { return i; }); },
      right: { tex: '\\frac{n(n+1)}{2}', fn: function (n) { return n * (n + 1) / 2; } },
      wrongs: [{ tex: 'n^{2}', fn: function (n) { return n * n; } }, { tex: '\\frac{n(n-1)}{2}', fn: function (n) { return n * (n - 1) / 2; } }, { tex: '\\frac{n^{2}}{2}', fn: function (n) { return n * n / 2; } }, { tex: 'n(n+1)', fn: function (n) { return n * (n + 1); } }],
      why: 'La suma interior vale $i$; queda $\\sum_{i=1}^n i=\\frac{n(n+1)}{2}$.' }
  ];
}
P.sumTemplates = sumTemplates;
var SAMPLE = [1, 2, 3, 4, 5, 6, 7];
function sameFn(f, g, from) { return SAMPLE.filter(function (n) { return n >= (from || 1); }).every(function (n) { return Math.abs(f(n) - g(n)) < 1e-9 * Math.max(1, Math.abs(f(n))); }); }
function genSumas(rnd) {
  var t = pick(sumTemplates(rnd), rnd);
  var wrongs = t.wrongs.filter(function (w) { return !sameFn(w.fn, t.truth, t.minN); });
  return mc('¿Cuánto vale ' + T(t.sum) + (t.cond ? ' (con ' + T(t.cond) + ')' : '') + '?', T(t.right.tex), wrongs.map(function (w) { return T(w.tex); }), t.why, rnd);
}

/* Logarithms and powers. */
function genLogs(rnd) {
  var kind = ri(rnd, 1, 5), b, e, p, q;
  if (kind === 1) {
    var b1 = pick([2, 3, 5, 10], rnd), b2 = pick([2, 3, 5, 10], rnd), e1 = ri(rnd, 2, 6), e2 = ri(rnd, 2, 5), minus = rnd() < 0.4;
    var val = minus ? e1 - e2 : e1 + e2;
    return mc('¿Cuánto vale ' + T('\\log_{' + b1 + '}' + Math.pow(b1, e1) + (minus ? '-' : '+') + '\\log_{' + b2 + '}' + Math.pow(b2, e2)) + '?', String(val),
      [String(e1 * e2), String(val + 1), String(val - 1), String(minus ? e1 + e2 : Math.abs(e1 - e2)), String(Math.pow(b1, e1) + Math.pow(b2, e2))],
      '$\\log_{' + b1 + '}' + Math.pow(b1, e1) + '=' + e1 + '$ y $\\log_{' + b2 + '}' + Math.pow(b2, e2) + '=' + e2 + '$.', rnd);
  }
  if (kind === 2) {
    b = pick([2, 3, 10], rnd);
    return mc('Simplifica ' + T(b + '^{\\log_{' + b + '} n}') + '.', T('n'), [T('\\log_{' + b + '} n'), T(b + 'n'), T('n^{' + b + '}'), T('\\log n^{' + b + '}')],
      'Elevar la base a su propio logaritmo devuelve el argumento: $b^{\\log_b n}=n$.', rnd);
  }
  if (kind === 3) {
    e = ri(rnd, 2, 4); b = Math.pow(2, e);
    return mc('Escribe ' + T('\\log_{' + b + '} n') + ' en función de ' + T('\\log_{2} n') + '.', T('\\frac{1}{' + e + '}\\log_{2} n'), [T(e + '\\log_{2} n'), T('\\log_{2} n-' + e), T('\\frac{1}{' + (e + 1) + '}\\log_{2} n'), T('\\log_{2} n+' + e)],
      'Cambio de base: $\\log_{' + b + '} n=\\frac{\\log_2 n}{\\log_2 ' + b + '}=\\frac{\\log_2 n}{' + e + '}$.', rnd);
  }
  if (kind === 4) {
    p = pick([3, 5, 7], rnd);
    return mc('¿Cuál es igual a ' + T(p + '^{\\log_{2} n}') + '?', T('n^{\\log_{2} ' + p + '}'), [T('n^{\\log_{' + p + '} 2}'), T(p + '\\log_{2} n'), T('\\log_{2} n^{' + p + '}'), T(p + 'n')],
      'Se cumple $x^{\\log y}=y^{\\log x}$: $' + p + '^{\\log_2 n}=n^{\\log_2 ' + p + '}$.', rnd);
  }
  p = ri(rnd, 2, 4); q = pick(['m', 'k'], rnd);
  return mc('Desarrolla ' + T('\\log_{2}(n^{' + p + '}\\,' + q + ')') + '.', T(p + '\\log_{2} n+\\log_{2} ' + q), [T('(\\log_{2} n)^{' + p + '}+\\log_{2} ' + q), T(p + '\\log_{2} n\\cdot\\log_{2} ' + q), T('\\log_{2}(' + p + 'n)+\\log_{2} ' + q), T('\\log_{2} n^{' + p + '}\\cdot\\log_{2} ' + q)],
    '$\\log(xy)=\\log x+\\log y$ y $\\log(x^p)=p\\log x$.', rnd);
}

P.DRILLS = [
  { id: 'master', title: 'Teorema maestro', blurb: 'Recurrencias de dividir y vencer, $T(n)=aT(n/b)+n^k$: ¿qué orden tienen?', gen: genMaster },
  { id: 'resta', title: 'Recurrencias por sustracción', blurb: 'Recurrencias $T(n)=aT(n-1)+n^k$: polinómicas o exponenciales.', gen: genResta },
  { id: 'bucles', title: 'Coste de bucles', blurb: 'Código con bucles anidados: ¿cuántas veces se ejecuta la línea de dentro?', gen: genBucles },
  { id: 'orden', title: 'Ordenar por crecimiento', blurb: 'Cinco funciones, de la que crece más despacio a la que más.', gen: genOrden },
  { id: 'sumas', title: 'Sumatorios', blurb: 'Elige la fórmula cerrada de un sumatorio.', gen: genSumas },
  { id: 'logs', title: 'Logaritmos y potencias', blurb: 'Simplificar, cambiar de base y propiedades de las potencias.', gen: genLogs }
];

/* ---------- 2. trace an algorithm on a small input ---------- */
function hanoi(n) { var moves = 0, small = 0; (function h(k, a, c, v) { if (k === 0) return; h(k - 1, a, v, c); moves++; if (k === 1) small++; h(k - 1, v, c, a); })(n, 'A', 'C', 'B'); return { moves: moves, small: small }; }
function fibCalls(n) { var c = 0; (function f(k) { c++; if (k < 2) return k; return f(k - 1) + f(k - 2); })(n); return c; }
function mergeCount(arr) {
  var cmp = 0;
  (function ms(a) {
    if (a.length <= 1) return a;
    var mid = Math.floor(a.length / 2), l = ms(a.slice(0, mid)), r = ms(a.slice(mid)), out = [], i = 0, j = 0;
    while (i < l.length && j < r.length) { cmp++; if (l[i] <= r[j]) out.push(l[i++]); else out.push(r[j++]); }
    return out.concat(l.slice(i), r.slice(j));
  })(arr);
  return cmp;
}
function binSteps(arr, x) { var lo = 0, hi = arr.length - 1, steps = 0; while (lo <= hi) { var mid = Math.floor((lo + hi) / 2); steps++; if (arr[mid] === x) return steps; if (arr[mid] < x) lo = mid + 1; else hi = mid - 1; } return steps; }
function lomuto(a, pivotAtEnd) {
  a = a.slice(); var p = a[a.length - 1], i = -1, j, t;
  for (j = 0; j < a.length - 1; j++) if (a[j] < p) { i++; t = a[i]; a[i] = a[j]; a[j] = t; }
  if (pivotAtEnd !== false) { t = a[i + 1]; a[i + 1] = a[a.length - 1]; a[a.length - 1] = t; }
  return a;
}
function greedyActs(acts, key) {
  var order = acts.map(function (a, i) { return i; }).sort(function (x, y) { return key(acts[x]) - key(acts[y]) || x - y; }), chosen = [], end = -Infinity;
  order.forEach(function (i) { if (acts[i][0] >= end) { chosen.push(i); end = acts[i][1]; } });
  return chosen.sort(function (a, b) { return a - b; });
}
function coinsGreedy(coins, t) { var n = 0; coins.slice().sort(function (a, b) { return b - a; }).forEach(function (c) { n += Math.floor(t / c); t %= c; }); return n; }
function coinsBest(coins, t) { var d = [0], i, c; for (i = 1; i <= t; i++) { d[i] = Infinity; for (c = 0; c < coins.length; c++) if (coins[c] <= i && d[i - coins[c]] + 1 < d[i]) d[i] = d[i - coins[c]] + 1; } return d[t]; }
function queens(n, wantAll) {
  var cols = [], sols = [];
  (function place(r) {
    if (sols.length && !wantAll) return;
    if (r === n) { sols.push(cols.slice()); return; }
    for (var c = 0; c < n; c++) {
      var ok = true; for (var k = 0; k < r; k++) if (cols[k] === c || Math.abs(cols[k] - c) === r - k) { ok = false; break; }
      if (ok) { cols[r] = c; place(r + 1); }
    }
  })(0);
  return sols;
}
function subsetCount(nums, target) { var cnt = 0, m = 1 << nums.length, mask, i, s; for (mask = 0; mask < m; mask++) { s = 0; for (i = 0; i < nums.length; i++) if (mask & (1 << i)) s += nums[i]; if (s === target) cnt++; } return cnt; }
function dijkstra(n, edges, src) {
  var d = [], done = [], i; for (i = 0; i < n; i++) { d[i] = Infinity; done[i] = false; } d[src] = 0;
  for (;;) {
    var u = -1; for (i = 0; i < n; i++) if (!done[i] && d[i] < Infinity && (u < 0 || d[i] < d[u])) u = i;
    if (u < 0) break; done[u] = true;
    edges.forEach(function (e) { var v = e[0] === u ? e[1] : e[1] === u ? e[0] : -1; if (v >= 0 && d[u] + e[2] < d[v]) d[v] = d[u] + e[2]; });
  }
  return d;
}
function bfsDist(n, edges, src) {   // fewest edges, then the cost of that path found by BFS order (a common wrong answer)
  var seen = [src], q = [src], cost = []; cost[src] = 0;
  while (q.length) { var u = q.shift(); edges.forEach(function (e) { var v = e[0] === u ? e[1] : e[1] === u ? e[0] : -1; if (v >= 0 && seen.indexOf(v) < 0) { seen.push(v); cost[v] = cost[u] + e[2]; q.push(v); } }); }
  return cost;
}
P.sim = { hanoi: hanoi, fibCalls: fibCalls, mergeCount: mergeCount, binSteps: binSteps, lomuto: lomuto, greedyActs: greedyActs, coinsGreedy: coinsGreedy, coinsBest: coinsBest, queens: queens, subsetCount: subsetCount, dijkstra: dijkstra };

function nums(vals) { return vals.map(function (v) { return String(v); }); }
function near(v, rnd, extra) { return uniq(nums([v + 1, v - 1, v + 2, v - 2].concat(extra || []))).filter(function (x) { return +x > 0; }); }
function arr(a) { return '[' + a.join(', ') + ']'; }
function distinctArray(rnd, n, lo, hi) { var pool = []; for (var i = lo; i <= hi; i++) pool.push(i); return shuffle(pool, rnd).slice(0, n); }

function traceHanoi(rnd) {
  var n = ri(rnd, 3, 7), h = hanoi(n), small = rnd() < 0.4;
  var right = small ? h.small : h.moves;
  return mc(small ? 'En la solución recursiva de las torres de Hanoi con ' + n + ' discos, ¿cuántas veces se mueve el disco más pequeño?' : 'En la solución recursiva de las torres de Hanoi con ' + n + ' discos, ¿cuántos movimientos se hacen en total?',
    String(right), near(right, rnd, small ? [Math.pow(2, n), n] : [Math.pow(2, n), 2 * n - 1, n * n]),
    small ? 'El disco pequeño se mueve en cada segundo movimiento: $2^{' + (n - 1) + '}=' + h.small + '$ veces.' : 'Cumple $M(n)=2M(n-1)+1$, con solución $2^n-1=' + h.moves + '$.', rnd);
}
function traceFib(rnd) {
  var n = ri(rnd, 4, 9), c = fibCalls(n);
  return mc('Con esta función, ¿cuántas llamadas se hacen en total (contando la primera) al calcular `fib(' + n + ')`?\n\n' + code('def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)'),
    String(c), near(c, rnd, [fibCalls(n - 1), fibCalls(n + 1) - 1, Math.pow(2, n)]), 'Las llamadas cumplen $C(n)=C(n-1)+C(n-2)+1$ con $C(0)=C(1)=1$: $C(' + n + ')=' + c + '$.', rnd);
}
function traceMerge(rnd) {
  var n = ri(rnd, 5, 8), a = distinctArray(rnd, n, 1, 30), c = mergeCount(a);
  return mc('La ordenación por mezcla divide el vector por la mitad (la mitad izquierda tiene `n // 2` elementos), ordena cada parte y las mezcla comparando las cabezas hasta que una se vacía. ¿Cuántas comparaciones de elementos hace con `' + arr(a) + '`?',
    String(c), near(c, rnd, [n * Math.ceil(Math.log2(n)), n - 1]), 'Se suman las comparaciones de cada mezcla: cada una hace, como mucho, un número de comparaciones igual al total de elementos menos uno. Aquí salen ' + c + '.', rnd);
}
function traceBin(rnd) {
  var n = ri(rnd, 7, 31), a = []; for (var i = 0, v = ri(rnd, 1, 5); i < n; i++, v += ri(rnd, 1, 4)) a.push(v);
  var present = rnd() < 0.6, x = present ? a[ri(rnd, 0, n - 1)] : a[ri(rnd, 0, n - 1)] + 0.5 * (rnd() < 0.5 ? 1 : -1), s = binSteps(a, x);
  return mc('En la búsqueda binaria de abajo, ¿cuántas veces se calcula `mid` al buscar ' + x + ' en un vector ordenado de ' + n + ' elementos que contiene `' + arr(a) + '`?\n\n' + code('lo, hi = 0, len(v) - 1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if v[mid] == x: return mid\n    if v[mid] < x: lo = mid + 1\n    else: hi = mid - 1\nreturn -1'),
    String(s), near(s, rnd, [Math.ceil(Math.log2(n + 1)), Math.floor(Math.log2(n)) + 1]), 'Se simula la búsqueda: cada vuelta descarta la mitad del intervalo. Al buscar ' + x + ' se calcula `mid` ' + s + ' veces (como mucho $\\lfloor\\log_2 n\\rfloor+1=' + (Math.floor(Math.log2(n)) + 1) + '$).', rnd);
}
function traceActs(rnd) {
  var n = 6, acts = [], i, s, L = 'ABCDEF';
  for (i = 0; i < n; i++) { s = ri(rnd, 0, 12); acts.push([s, s + ri(rnd, 1, 5)]); }
  var byEnd = greedyActs(acts, function (a) { return a[1]; }), byStart = greedyActs(acts, function (a) { return a[0]; }), byLen = greedyActs(acts, function (a) { return a[1] - a[0]; });
  var name = function (set) { return '{' + set.map(function (k) { return L[k]; }).join(', ') + '}'; };
  var right = name(byEnd), wrongs = [name(byStart), name(byLen), name(byEnd.slice(0, -1)), name(byEnd.concat(byEnd.length < n ? [(byEnd[byEnd.length - 1] + 1) % n] : []))];
  if (uniq([right].concat(wrongs)).length < 3) return traceActs(rnd);
  return mc('Actividades (inicio, fin): ' + acts.map(function (a, k) { return L[k] + '=(' + a[0] + ', ' + a[1] + ')'; }).join(', ') + '. El algoritmo voraz las ordena **por hora de fin**, y va cogiendo cada una que empiece cuando o después de que acabe la última elegida. ¿Qué conjunto elige?',
    right, wrongs, 'Ordenadas por fin y cogiendo las compatibles sale ' + right + ' (' + byEnd.length + ' actividades).', rnd);
}
function traceCoins(rnd) {
  var cases = [[[1, 3, 4], 6], [[1, 3, 4], 10], [[1, 5, 6], 10], [[1, 5, 6], 15], [[1, 4, 6], 8], [[1, 2, 5], 13], [[1, 5, 10, 25], 41], [[1, 7, 10], 14]], c = pick(cases, rnd);
  var g = coinsGreedy(c[0], c[1]), best = coinsBest(c[0], c[1]);
  return mc('Para dar cambio de ' + c[1] + ' con monedas ' + arr(c[0]) + ', el algoritmo voraz coge siempre la moneda más grande que cabe. ¿Cuántas monedas usa?',
    String(g), uniq(nums([best, g + 1, g - 1, g + 2])).filter(function (x) { return +x > 0; }),
    g === best ? 'El voraz usa ' + g + ' monedas, y aquí coincide con el óptimo.' : 'El voraz usa ' + g + ' monedas, pero el óptimo es ' + best + ': con este sistema de monedas **la estrategia voraz no es óptima**.', rnd);
}
function traceQueens(rnd) {
  var n = ri(rnd, 4, 6);
  if (rnd() < 0.5) {
    var cnt = queens(n, true).length;
    return mc('¿Cuántas soluciones distintas tiene el problema de las ' + n + ' reinas (' + n + '×' + n + ')?', String(cnt), uniq(nums([cnt + 1, cnt - 1, cnt * 2, cnt + 2, n])).filter(function (x) { return +x > 0; }), 'Contando todas las soluciones por vuelta atrás salen ' + cnt + '.', rnd);
  }
  var first = queens(n, false)[0], right = arr(first), others = queens(n, true).slice(1).map(arr), perms = [];
  for (var t = 0; t < 12 && perms.length < 4; t++) perms.push(arr(shuffle(first, rnd)));
  return mc('Se colocan las ' + n + ' reinas fila a fila, probando en cada fila las columnas de izquierda a derecha y retrocediendo si no hay hueco. ¿Cuál es la primera solución que encuentra? (la columna de la reina de cada fila, empezando por la fila 0)',
    right, others.slice(0, 1).concat(perms), 'Con el orden pedido, la primera solución es ' + right + '.', rnd);
}
function tracePartition(rnd) {
  var a = distinctArray(rnd, 7, 1, 20), good = lomuto(a), right = arr(good);
  var wrongs = [arr(lomuto(a, false)), arr(a.slice().sort(function (x, y) { return x - y; })), arr(lomuto([a[a.length - 1]].concat(a.slice(0, -1)))), arr([a[a.length - 1]].concat(good.slice(0, -1)))];
  return mc('Con la partición de Lomuto (pivote = último elemento), ¿cómo queda `' + arr(a) + '` tras ejecutarla?\n\n' + code('def particion(v):\n    p = v[-1]\n    i = -1\n    for j in range(len(v) - 1):\n        if v[j] < p:\n            i += 1\n            v[i], v[j] = v[j], v[i]\n    v[i + 1], v[-1] = v[-1], v[i + 1]'),
    right, wrongs, 'Los menores que el pivote ' + a[a.length - 1] + ' se van acumulando al principio (sin reordenarse) y al final el pivote se intercambia con la posición `i + 1`: ' + right + '.', rnd);
}
function traceSubset(rnd) {
  var a = distinctArray(rnd, 6, 1, 9), target = ri(rnd, 8, 20), c = subsetCount(a, target);
  return mc('¿Cuántos subconjuntos de `' + arr(a) + '` suman exactamente ' + target + '? (el backtracking los recorre todos)', String(c), uniq(nums([c + 1, c - 1, c + 2, c === 0 ? 3 : c * 2])).filter(function (x) { return +x >= 0; }), 'Recorriendo los 2^6 = 64 subconjuntos hay ' + c + ' con suma ' + target + '.', rnd);
}
function traceDijkstra(rnd) {
  for (var tries = 0; tries < 30; tries++) {
    var n = 5, edges = [], i, j, W = {};
    for (i = 1; i < n; i++) edges.push([ri(rnd, 0, i - 1), i, ri(rnd, 1, 9)]);
    for (var e = 0; e < 3; e++) { i = ri(rnd, 0, n - 1); j = ri(rnd, 0, n - 1); if (i !== j && !edges.some(function (x) { return (x[0] === i && x[1] === j) || (x[0] === j && x[1] === i); })) edges.push([i, j, ri(rnd, 1, 9)]); }
    var d = dijkstra(n, edges, 0), tgt = ri(rnd, 1, n - 1), alt = bfsDist(n, edges, 0)[tgt];
    if (d[tgt] === alt) continue;
    var L = 'ABCDE', right = d[tgt];
    return mc('Grafo no dirigido con aristas ' + edges.map(function (x) { return L[x[0]] + '–' + L[x[1]] + ':' + x[2]; }).join(', ') + '. ¿Cuál es la distancia mínima de A a ' + L[tgt] + ' que calcula el algoritmo de Dijkstra?',
      String(right), uniq(nums([alt, right + 1, right - 1, right + 2])).filter(function (x) { return +x > 0; }), 'Dijkstra fija en cada paso el vértice no fijado más cercano y relaja sus aristas: la distancia a ' + L[tgt] + ' es ' + right + ' (no ' + alt + ', que es lo que sale al recorrer por menos aristas).', rnd);
  }
  return traceActs(rnd);
}
P.TRACES = [
  { id: 'hanoi', title: 'Torres de Hanoi', blurb: 'Movimientos totales o del disco pequeño para $n$ discos.', gen: traceHanoi },
  { id: 'fib', title: 'Llamadas de Fibonacci', blurb: 'Cuántas llamadas hace la versión recursiva ingenua.', gen: traceFib },
  { id: 'mezcla', title: 'Ordenación por mezcla', blurb: 'Comparaciones de elementos con un vector concreto.', gen: traceMerge },
  { id: 'binaria', title: 'Búsqueda binaria', blurb: 'Cuántas veces se calcula `mid` buscando un valor.', gen: traceBin },
  { id: 'particion', title: 'Partición de Lomuto', blurb: 'Cómo queda un vector tras una partición (quicksort).', gen: tracePartition },
  { id: 'actividades', title: 'Selección de actividades', blurb: 'Qué conjunto elige el algoritmo voraz por hora de fin.', gen: traceActs },
  { id: 'monedas', title: 'Cambio de monedas voraz', blurb: 'Cuántas monedas usa el voraz, y cuándo no es óptimo.', gen: traceCoins },
  { id: 'reinas', title: 'Reinas (vuelta atrás)', blurb: 'La primera solución encontrada, o cuántas soluciones hay.', gen: traceQueens },
  { id: 'subconjuntos', title: 'Suma de subconjuntos', blurb: 'Cuántos subconjuntos suman un valor dado.', gen: traceSubset },
  { id: 'dijkstra', title: 'Dijkstra', blurb: 'Distancia mínima en un grafo pequeño.', gen: traceDijkstra }
];

/* ---------- 3. complete the code ---------- */
function isBlankable(line) {
  var t = line.trim();
  return t.length >= 6 && t.indexOf('`') < 0 && !/^#/.test(t) && !/^(else|try|finally):?$/.test(t) && !/^(return|break|continue|pass)$/.test(t) && !/^[)\]}]+,?$/.test(t);
}
/* Every fenced code block of the lectures with enough lines to blank one. */
P.codeBlocks = function (lectures) {
  var out = [];
  lectures.forEach(function (lec) {
    lec.sections.forEach(function (sec, si) {
      var re = /```(\w*)\n([\s\S]*?)```/g, m, k = 0;
      while ((m = re.exec(sec.md || ''))) {
        var lines = m[2].replace(/\s+$/, '').split('\n'), real = lines.filter(function (l) { return l.trim(); });
        var count = {}; real.forEach(function (l) { count[l.trim()] = (count[l.trim()] || 0) + 1; });
        var ok = lines.map(function (l, i) { return isBlankable(l) && count[l.trim()] === 1 ? i : -1; }).filter(function (i) { return i >= 0; });
        if (real.length >= 5 && ok.length >= 2) out.push({ id: lec.id + '#' + si + '#' + k, lecture: lec.id, lectureTitle: lec.title, title: sec.title, lines: lines, blankable: ok, lang: m[1] || 'python' });
        k++;
      }
    });
  });
  return out;
};
function lineKind(l) {
  var t = l.trim();
  return /^def\b/.test(t) ? 'def' : /^return\b/.test(t) ? 'return' : /^(if|elif)\b/.test(t) ? 'if' : /^(for|while)\b/.test(t) ? 'loop' : /^[\w.\[\], ]+\s*[-+*\/]?=[^=]/.test(t) ? 'assign' : 'other';
}
function indentOf(l) { return l.length - l.replace(/^\s+/, '').length; }
/* Plausible wrong versions of a line: an operator, a bound or a constant changed (the slips that really happen). */
var MUTATIONS = [[/<=/, '<'], [/(^|[^<=!>])<(?!=)/, '$1<='], [/>=/, '>'], [/(^|[^<=!>-])>(?!=)/, '$1>='], [/==/, '!='], [/\+(?!=)/, '-'], [/-(?!=)/, '+'], [/\+=/, '-='], [/\bmin\b/, 'max'], [/\bmax\b/, 'min'],
  [/\band\b/, 'or'], [/\bor\b/, 'and'], [/\/\//, '/'], [/\b1\b/, '0'], [/\b0\b/, '1'], [/\b2\b/, '1'], [/\bn\b/, 'n-1'], [/\bi\b/, 'j'], [/\bm\b/, 'n']];
P.mutations = function (line) {
  var out = [];
  MUTATIONS.forEach(function (m) { if (m[0].test(line)) { var v = line.replace(m[0], m[1]); if (v !== line) out.push(v); } });
  return uniq(out);
};
/* One question from a block: a line is replaced by "???" and the options are that line, slips on it, and lines of the same kind from the same code. */
P.clozeQuestion = function (block, all, rnd, lineIdx) {
  var li = lineIdx != null ? lineIdx : pick(block.blankable, rnd), line = block.lines[li], right = line.trim(), kind = lineKind(line);
  var forbidden = {}; block.lines.forEach(function (l) { forbidden[l.trim()] = 1; });   // a slip that equals another line of the code would be confusing
  var slips = shuffle(P.mutations(right), rnd).filter(function (v) { return v.trim() !== right; }).slice(0, 2);
  var same = shuffle(block.blankable.filter(function (i) { return i !== li; }).map(function (i) { return block.lines[i]; }), rnd).sort(function (x, y) { return (lineKind(y) === kind) - (lineKind(x) === kind) || Math.abs(indentOf(x) - indentOf(line)) - Math.abs(indentOf(y) - indentOf(line)); }).map(function (l) { return l.trim(); });
  var other = [];
  (all || []).forEach(function (b) { if (b !== block && b.lecture === block.lecture) b.blankable.forEach(function (i) { if (lineKind(b.lines[i]) === kind) other.push(b.lines[i].trim()); }); });
  var wrongs = uniq(slips.concat(same.slice(0, 1), shuffle(other, rnd), same.slice(1))).filter(function (w) { return w !== right; }).slice(0, 3);
  if (wrongs.length < 2) return null;
  var shown = block.lines.map(function (l, i) { return i === li ? l.replace(/\S.*$/, '???') : l; }).join('\n');
  var opts = shuffle([right].concat(wrongs), rnd);
  return { type: 'mc', prompt: 'En **' + block.title + '** (' + block.lectureTitle.replace(/^(Tema [\d.]+).*$/, '$1') + '), ¿qué línea falta?\n\n```' + block.lang + '\n' + shown + '\n```', options: opts.map(function (o) { return '`' + o + '`'; }), answer: opts.indexOf(right),
    why: 'El código completo:\n\n```' + block.lang + '\n' + block.lines.join('\n') + '\n```' };
};

root.DYAA_PRACTICE = P;
if (typeof module !== 'undefined' && module.exports) module.exports = P;
})(typeof window !== 'undefined' ? window : this);
