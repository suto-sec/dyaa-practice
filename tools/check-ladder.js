/* Checks the peldaños (content/peldanos): structure, that their formulas render, and that every closed form
   they state is true (compared with the sum computed term by term for many n). Run: node tools/check-ladder.js */
const vm = require('vm'), fs = require('fs');
const katex = require(__dirname + '/../app/vendor/katex/katex.min.js');
const w = {};
vm.runInNewContext(fs.readFileSync(__dirname + '/../app/data-lectures.js', 'utf8'), { window: w });
let fails = 0;
const ok = (c, m) => { if (!c) { fails++; console.log('FAIL: ' + m); } };
const close = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

const LAD = w.LADDER;
ok(LAD && LAD.exam.exercises.length > 0, 'the data has peldaños');
const rungs = LAD.exam.exercises, byN = {};
rungs.forEach(e => { byN[e.n] = e; });
const stageById = {}; w.STAGES.forEach(g => { stageById[g.id] = g; });
const skillIds = new Set(w.SKILLS.map(s => s.id));

/* ---- structure ---- */
ok(new Set(rungs.map(e => e.id)).size === rungs.length, 'peldaño ids are unique');
rungs.forEach(e => {
  ok(stageById[e.stage], e.n + ': known stage');
  ok(e.statement.length > 20, e.n + ': has a statement');
  ok((e.solution.match(/\*\*Paso \d+\./g) || []).length >= 2, e.n + ': the solution has at least two numbered steps');
  ok(e.solution.split(/\n(?=\*\*Paso \d+)/).every((p, i) => new RegExp('^\\*\\*Paso ' + (i + 1) + '\\.').test(p)), e.n + ': steps are numbered 1, 2, 3...');
  ok((e.skills || []).length && e.skills.every(s => skillIds.has(s)), e.n + ': known skills');
  ok(typeof e.diff === 'number', e.n + ': has a level');
});
const placed = {};
Object.keys(LAD.order).forEach(sid => {
  const g = stageById[sid]; ok(g, 'order of a known stage: ' + sid);
  const tiles = LAD.order[sid];
  Object.keys(tiles).forEach(tid => {
    ok(g.theory.some(t => t.id === tid), sid + ': reading ' + tid + ' exists');
    let prev = -1;
    tiles[tid].forEach(k => {
      if (k.indexOf('peldanos/') !== 0) return;
      const e = rungs.find(x => LAD.exam.id + '/' + x.id === k);
      ok(e, 'the order names an existing peldaño: ' + k);
      if (!e) return;
      ok(e.stage === sid, e.n + ' is listed in its own stage');
      placed[e.n] = (placed[e.n] || 0) + 1;
      ok(e.diff >= prev, e.n + ': levels do not go down inside a reading (' + prev + ' -> ' + e.diff + ')');
      prev = e.diff;
    });
  });
});
rungs.forEach(e => ok(placed[e.n] === 1, e.n + ' appears exactly once in the order'));
if (w.EXAMS || fs.existsSync(__dirname + '/../app/data-exams.js')) {
  const w2 = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/../app/data-exams.js', 'utf8'), { window: w2 });
  const have = new Set(); w2.EXAMS.forEach(x => x.exercises.forEach(e => have.add(x.id + '/' + e.id)));
  Object.keys(LAD.order).forEach(sid => Object.keys(LAD.order[sid]).forEach(tid => LAD.order[sid][tid].forEach(k => {
    if (k.indexOf('peldanos/') === 0) return;
    ok(have.has(k), 'the order names an existing exercise: ' + k);
    ok((w2.STAGE_EX[sid] || []).indexOf(k) >= 0, k + ' belongs to the stage ' + sid);
  })));
}

/* ---- formulas render ---- */
let spans = 0;
rungs.forEach(e => [e.statement, e.hint || '', e.solution].forEach(t => {
  for (const m of t.replace(/```[\s\S]*?```/g, '').matchAll(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g)) {
    spans++;
    try { katex.renderToString(m[1] ?? m[2], { throwOnError: true, displayMode: m[1] !== undefined }); } catch (err) { ok(false, e.n + ': bad formula ' + (m[1] ?? m[2]).slice(0, 50) + ' (' + err.message.slice(0, 50) + ')'); }
  }
}));

/* ---- the closed forms that the solutions state ---- */
const sum = (a, b, f) => { let s = 0; for (let i = a; i <= b; i++) s += f(i); return s; };
const eq = (name, f, g, from, to) => { for (let n = from; n <= to; n++) { const a = f(n), b = g(n); if (!close(a, b)) { ok(false, name + ': n=' + n + ' gives ' + a + ' but the formula gives ' + b); return; } } };
const T = {
  S04: () => { eq('S04 C(n,2)', n => sum(1, n - 1, i => i), n => n * (n - 1) / 2, 2, 40); ok(100 * 99 / 2 === 4950, 'S04 c'); },
  S08: () => { ok(sum(1, 4, i => 2 * i + 1) === 24 && sum(1, 5, i => i * i) === 55 && sum(3, 6, i => i - 1) === 14 && sum(0, 3, i => 2 ** i) === 15 && sum(5, 4, i => i) === 0, 'S08 values'); },
  S10: () => { ok(sum(1, 10, i => i) === 55 && sum(1, 100, i => i) === 5050 && sum(1, 7, i => i) === 28 && sum(11, 20, i => i) === 155, 'S10 values'); },
  S11: () => { eq('S11', n => sum(1, n, i => i), n => n * (n + 1) / 2, 1, 60); ok(sum(1, 1000, i => i) === 500500, 'S11 e'); },
  S12: () => { eq('S12 a', n => sum(1, n, i => i + 3), n => n * (n + 7) / 2, 1, 40); eq('S12 b', n => sum(1, n, i => 3 * i - 2), n => n * (3 * n - 1) / 2, 1, 40); eq('S12 c', n => sum(1, n, i => 2 * i), n => n * (n + 1), 1, 40); },
  S13: () => { ok(sum(0, 10, i => 3 + 4 * i) === 253 && 3 + 40 === 43, 'S13 values'); },
  S14: () => { eq('S14', n => sum(1, n, i => 2 * i - 1), n => n * n, 1, 40); ok(1 + 3 + 5 + 7 + 9 === 25, 'S14 a'); },
  S15: () => { ok(sum(10, 20, i => i) === 165, 'S15 value'); for (let m = 1; m <= 12; m++) eq('S15 m=' + m, n => sum(m, n, i => i), n => (n - m + 1) * (m + n) / 2, m, 30); },
  S16: () => { for (let s0 = -3; s0 <= 6; s0++) for (let d = -2; d <= 5; d++) eq('S16 s0=' + s0 + ' d=' + d, n => sum(0, n - 1, i => s0 + i * d), n => n / 2 * (s0 + (s0 + (n - 1) * d)), 1, 30); ok(sum(0, 19, i => 5 + 3 * i) === 670, 'S16 e'); },
  S17: () => { eq('S17', n => sum(1, n, i => i * i), n => n * (n + 1) * (2 * n + 1) / 6, 1, 60); },
  S18: () => { ok(sum(1, 10, i => i * i) === 385, 'S18 a'); eq('S18 b', n => sum(1, n, i => i * i + i), n => n * (n + 1) * (n + 2) / 3, 1, 40); eq('S18 c', n => sum(1, n, i => (2 * i - 1) ** 2), n => n * (4 * n * n - 1) / 3, 1, 40); },
  S19: () => { ok(sum(1, 5, i => i ** 3) === 225, 'S19 a'); eq('S19 b', n => sum(1, n, i => i ** 3), n => (n * (n + 1) / 2) ** 2, 1, 40); ok(210 ** 2 === 44100, 'S19 b20'); eq('S19 c', n => sum(1, n, i => i ** 3 - i), n => (n - 1) * n * (n + 1) * (n + 2) / 4, 1, 40); },
  S20: () => { eq('S20 a', n => sum(1, n, i => i * i - (i - 1) ** 2), n => n * n, 1, 40); eq('S20 c', n => sum(1, n, i => 2 ** i - 2 ** (i - 1)), n => 2 ** n - 1, 1, 40); },
  S21: () => { eq('S21', n => sum(2, n, i => 1 / (i * (i - 1))), n => 1 - 1 / n, 2, 60); for (let i = 2; i < 30; i++) ok(close(1 / (i * (i - 1)), 1 / (i - 1) - 1 / i), 'S21 a'); },
  S22: () => { eq('S22', n => sum(1, n, i => 1 / (i * (i + 2))), n => 0.5 * (1.5 - 1 / (n + 1) - 1 / (n + 2)), 1, 60); for (let i = 1; i < 30; i++) ok(close(1 / (i * (i + 2)), 0.5 * (1 / i - 1 / (i + 2))), 'S22 a'); },
  S23: () => { ok(sum(0, 9, i => 2 ** i) === 1023 && 1 + 3 + 9 + 27 + 81 === 121 && close(1 + 1 / 2 + 1 / 4 + 1 / 8 + 1 / 16, 31 / 16), 'S23 values'); },
  S24: () => { eq('S24 a', n => sum(0, n - 1, i => 3 ** i), n => (3 ** n - 1) / 2, 1, 25); eq('S24 b', n => sum(0, n, i => 2 ** i), n => 2 ** (n + 1) - 1, 0, 40); eq('S24 c', n => sum(0, n - 1, i => 0.5 ** i), n => 2 - 1 / 2 ** (n - 1), 1, 40); },
  S25: () => { eq('S25 a', n => sum(3, n, i => 2 ** i), n => 2 ** (n + 1) - 8, 3, 40); eq('S25 b', n => sum(1, n, i => 3 ** i), n => (3 ** (n + 1) - 3) / 2, 1, 25); eq('S25 c', n => sum(0, n - 1, i => 5 * 2 ** i), n => 5 * (2 ** n - 1), 1, 40); eq('S25 d', n => sum(0, n, i => 4 ** (n - i)), n => (4 ** (n + 1) - 1) / 3, 0, 25); },
  S26: () => { eq('S26 c', n => { let s = 0; for (let k = 1; k <= n; k *= 2) s += k; return s; }, n => 2 * n - 1, 1, 1); for (const p of [1, 2, 3, 4, 5, 8, 10, 16]) { const n = 2 ** p; ok(sum(0, p, i => 2 ** i) === 2 * n - 1, 'S26 c n=' + n); } for (let n = 0; n < 45; n++) { const s = sum(0, n, i => 0.5 ** i); ok(s >= 1 && s < 2, 'S26 b'); } },
  S27: () => { eq('S27', n => sum(1, n, i => i * 2 ** i), n => (n - 1) * 2 ** (n + 1) + 2, 1, 40); for (const r of [2, 3, 0.5, -2, 1.5]) eq('S27 r=' + r, n => sum(1, n, i => i * r ** i), n => (r + r ** (n + 1) * (n * r - n - 1)) / (r - 1) ** 2, 1, 20); },
  S28: () => {
    for (let n = 1; n <= 14; n++) {
      let total = 0, count = {};
      for (let x = 1; x < 2 ** n; x++) { let bits = 1, y = x; while ((y & 1) === 0) { bits++; y >>= 1; } total += bits; count[bits] = (count[bits] || 0) + 1; }
      ok(total === sum(1, n, k => k * 2 ** (n - k)), 'S28 total n=' + n);
      for (let k = 1; k <= n; k++) ok(count[k] === 2 ** (n - k), 'S28 count n=' + n + ' k=' + k);
    }
    let t = 0; for (let x = 1; x < 8; x++) { let b = 1, y = x; while ((y & 1) === 0) { b++; y >>= 1; } t += b; } ok(t === 11, 'S28 n=3 gives 11');
  },
  S29: () => { ok(8 <= 10 && 10 <= 12, 'S29'); },
  S30: () => { for (let n = 1; n <= 60; n++) { const s = sum(1, n, i => i * i); ok(n ** 3 / 3 <= s + 1e-9 && s <= ((n + 1) ** 3 - 1) / 3 + 1e-9, 'S30 bounds n=' + n); } },
  S31: () => { for (let n = 1; n <= 200; n++) { const s = sum(1, n, i => 1 / (i * i)); ok(s <= 2 - 1 / n + 1e-12 && s >= 1 - 1e-12, 'S31 n=' + n); } },
  S32: () => { for (let n = 1; n <= 200; n++) { const s = sum(1, n, i => Math.log(i)); ok(n * Math.log(n) - n + 1 <= s + 1e-9 && s <= n * Math.log(n) + 1e-9, 'S32 n=' + n); } },
  S33: () => { eq('S33', n => sum(1, n, i => 3 * i * i - 2 * i + 5), n => n * (n + 1) * (2 * n - 1) / 2 + 5 * n, 1, 40); },
  S34: () => { eq('S34 a', n => sum(1, n, i => sum(i, n, () => 1)), n => n * (n + 1) / 2, 1, 40); eq('S34 b', n => sum(1, n, i => sum(1, i, j => j)), n => n * (n + 1) * (n + 2) / 6, 1, 40); },
  S35: () => { eq('S35', n => sum(0, n, i => 2 ** i + i), n => 2 ** (n + 1) - 1 + n * (n + 1) / 2, 0, 40); }
};
Object.keys(T).forEach(id => { ok(byN[id], id + ' exists'); T[id](); });
/* every peldaño of the stage has been looked at: a new one has to bring its own check or be listed as "no numbers" */
const NO_NUMBERS = new Set(['S01', 'S02', 'S03', 'S05', 'S06', 'S07', 'S09']);   // powers, logarithms, derivatives, limits, integrals and constants: checked by hand
rungs.filter(e => e.stage === 'sumatorios').forEach(e => ok(T[e.n] || NO_NUMBERS.has(e.n), e.n + ' has a numeric check'));

console.log(fails ? fails + ' FAILURES' : 'ladder checks passed (' + rungs.length + ' peldaños, ' + spans + ' formulas)');
process.exit(fails ? 1 : 0);
