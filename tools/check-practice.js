#!/usr/bin/env node
/* Checks the practice generators (app/practice.js): every question has exactly one right option, the answers are verified by independent computation,
   and the code-completion questions work on every block of the lectures. Run: node tools/check-practice.js */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const APP = path.join(__dirname, '..', 'app');
const P = require(path.join(APP, 'practice.js'));
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(APP, 'data-lectures.js'), 'utf8'), ctx);
let fails = 0; const ok = (c, m) => { if (!c) { fails++; if (fails < 40) console.log('FAIL:', m); } };
let seed = 12345; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function valid(q, tag) {
  if (q.type === 'mc') {
    ok(q.options.length >= 3 && q.options.length <= 4, tag + ': 3 or 4 options, got ' + q.options.length);
    ok(new Set(q.options).size === q.options.length, tag + ': options are all different: ' + JSON.stringify(q.options));
    ok(q.answer >= 0 && q.answer < q.options.length, tag + ': the answer is one of the options');
    ok(q.prompt && q.why && q.options.every(o => o && !/undefined|NaN|\[object/.test(o)), tag + ': complete text');
  } else {
    ok(q.items.length === q.order.length && new Set(q.order).size === q.items.length && q.order.every(i => i >= 0 && i < q.items.length), tag + ': a valid ranking');
  }
  ok(!/undefined|NaN|Infinity|\[object/.test(q.prompt + q.why), tag + ': no broken text in ' + q.prompt.slice(0, 60));
}

// ---- drills
const N = 1500;
for (const d of P.DRILLS) for (let i = 0; i < N; i++) valid(d.gen(rnd), d.id);

// master theorem: the answer agrees with comparing log_b a and k in floating point
{
  const seen = { 1: 0, 2: 0, 3: 0 };
  for (let i = 0; i < 3000; i++) {
    const q = P.DRILLS[0].gen(rnd), m = /T\(n\)=(\d*)(?:\\,)?T\(n\/(\d+)\)\+(n\^\{(\d)\}|n|1)/.exec(q.prompt);
    ok(m, 'master prompt parses: ' + q.prompt); if (!m) continue;
    const a = m[1] === '' ? 1 : +m[1], b = +m[2], k = m[3] === '1' ? 0 : m[3] === 'n' ? 1 : +m[4], e = Math.log(a) / Math.log(b);
    const cs = Math.abs(e - k) < 1e-9 ? 2 : e > k ? 1 : 3; seen[cs]++;
    const right = q.options[q.answer];
    const want = cs === 2 ? (k === 0 ? '\\log n' : k === 1 ? 'n\\log n' : 'n^{' + k + '}\\log n') : cs === 3 ? (k === 1 ? 'n' : 'n^{' + k + '}') : null;
    if (cs === 1) ok(/^\$\\Theta\(n(\^\{.*\})?\)\$$/.test(right) && !/\\log n\)/.test(right.replace(/\\log_/g, '')), 'master case 1 answer ' + right + ' for ' + q.prompt);
    else ok(right === '$\\Theta(' + want + ')$', 'master case ' + cs + ' answer ' + right + ' for ' + q.prompt);
    if (cs === 1 && /^\$\\Theta\(n\^\{\d+\}\)\$$/.test(right)) ok(+/\{(\d+)\}/.exec(right)[1] === Math.round(e), 'master integer exponent ' + right + ' vs ' + e);
  }
  ok(seen[1] > 500 && seen[2] > 500 && seen[3] > 500, 'the three cases are all common: ' + JSON.stringify(seen));
}
// loops: run every template and fit the exponent
{
  const exp = (f, n) => Math.log(f(2 * n) / f(n)) / Math.log(2);
  const want = { n2: [1.9, 2.1], n3: [2.9, 3.1], n: [0.95, 1.05], nlog: [1.0, 1.2], n15: [1.4, 1.6], log: [0.0, 0.2], loglog: [0, 0.1], sqrt: [0.45, 0.55] };
  for (const t of P.LOOPS) {
    const n = t.cls === 'n3' ? 128 : 1024, e = t.cls === 'log' || t.cls === 'loglog' ? Math.log(t.run(1 << 20) / t.run(1 << 10)) / Math.log(1 << 10) : exp(t.run, n);
    const [lo, hi] = want[t.cls]; ok(e >= lo && e <= hi, 'loop template of class ' + t.cls + ' grows like n^' + e.toFixed(2) + ': ' + t.code(0.1).replace(/\n/g, ' / '));
  }
  ok(P.LOOPS.length >= 10, 'enough loop templates');
}
// growth: the canonical order is the real order at a huge n (in logs)
{
  const n = 1e30; let prev = -Infinity;
  P.GROWTH.forEach(g => { const l = g.ln(n); ok(l > prev, 'growth order: ' + g.tex + ' should exceed the previous (' + l + ' vs ' + prev + ')'); prev = l; });
  for (let i = 0; i < 300; i++) { const q = P.DRILLS[3].gen(rnd), idx = q.order.map(k => P.GROWTH.findIndex(g => '$' + g.tex + '$' === q.items[k])); ok(idx.every((v, j) => j === 0 || v > idx[j - 1]), 'ranking answer is increasing'); }
}
// sums: the right form equals the sum for several n, the wrong ones do not
{
  for (let i = 0; i < 400; i++) for (const t of P.sumTemplates(rnd)) {
    const ns = [1, 2, 3, 4, 5, 6, 7, 10].filter(n => n >= (t.minN || 1));
    ok(ns.every(n => Math.abs(t.right.fn(n) - t.truth(n)) < 1e-9 * Math.max(1, Math.abs(t.truth(n)))), 'closed form ' + t.right.tex + ' for ' + t.sum);
  }
  for (let i = 0; i < N; i++) { const q = P.DRILLS[4].gen(rnd); ok(q.options.length >= 3, 'sums: enough distinct options'); }
}

// ---- traces: known values
{
  const S = P.sim;
  ok(S.hanoi(3).moves === 7 && S.hanoi(5).moves === 31 && S.hanoi(4).small === 8, 'hanoi counts');
  ok(S.fibCalls(5) === 15 && S.fibCalls(2) === 3 && S.fibCalls(0) === 1, 'fib calls');
  ok(S.mergeCount([2, 1]) === 1 && S.mergeCount([1, 2, 3, 4]) === 4 && S.mergeCount([4, 3, 2, 1]) === 4, 'merge comparisons');
  ok(S.binSteps([1, 3, 5, 7, 9, 11, 13], 7) === 1 && S.binSteps([1, 3, 5, 7, 9, 11, 13], 13) === 3 && S.binSteps([1, 3, 5, 7, 9, 11, 13], 6) === 3, 'binary search steps');
  ok(S.lomuto([3, 8, 1, 5, 4]).join() === '3,1,4,5,8' && S.lomuto([1, 2, 3]).join() === '1,2,3', 'Lomuto partition');
  ok(S.greedyActs([[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]], a => a[1]).join() === '0,3,7,10', 'activity selection by finish (the textbook example)');
  ok(S.coinsGreedy([1, 3, 4], 6) === 3 && S.coinsBest([1, 3, 4], 6) === 2 && S.coinsGreedy([1, 5, 10, 25], 41) === 4 && S.coinsBest([1, 5, 10, 25], 41) === 4, 'coins');
  ok(S.queens(4, true).length === 2 && S.queens(5, true).length === 10 && S.queens(6, true).length === 4 && S.queens(8, true).length === 92, 'queens solution counts');
  ok(S.queens(4, false)[0].join() === '1,3,0,2' && S.queens(5, false)[0].join() === '0,2,4,1,3', 'first queens solutions');
  ok(S.subsetCount([1, 2, 3, 4], 5) === 2 && S.subsetCount([1, 2, 3], 7) === 0 && S.subsetCount([1, 2], 0) === 1, 'subset counts');
  ok(S.dijkstra(4, [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 5]], 0).join() === '0,3,1,8', 'dijkstra');
  for (const d of P.TRACES) for (let i = 0; i < 600; i++) valid(d.gen(rnd), d.id);
}

// ---- complete the code
{
  const blocks = P.codeBlocks(ctx.window.LECTURES);
  ok(blocks.length >= 50, 'the lectures give enough code blocks (' + blocks.length + ')');
  ok(new Set(blocks.map(b => b.id)).size === blocks.length, 'block ids are unique');
  let asked = 0;
  for (const b of blocks) for (let i = 0; i < 25; i++) {
    const q = P.clozeQuestion(b, blocks, rnd); if (!q) continue; asked++; valid(q, 'cloze ' + b.id);
    const rightLine = q.options[q.answer].replace(/^`|`$/g, '');
    ok(q.prompt.split('???').length === 2, 'one gap in ' + b.id);
    ok(b.lines.some(l => l.trim() === rightLine), 'the right option is a line of the block ' + b.id);
    ok(!q.prompt.split('\n').some(l => l.trim() === rightLine), 'the answer is not left in the code shown ' + b.id);
  }
  ok(asked > blocks.length * 20, 'almost every block can be asked about (' + asked + ' questions)');
  const b0 = blocks.find(b => b.blankable.length >= 3), li = b0.blankable[1], q0 = P.clozeQuestion(b0, blocks, rnd, li);
  ok(q0.options[q0.answer] === '`' + b0.lines[li].trim() + '`', 'a given line can be asked');
}

console.log(fails ? fails + ' FAILURES' : 'practice checks passed');
process.exit(fails ? 1 : 0);
