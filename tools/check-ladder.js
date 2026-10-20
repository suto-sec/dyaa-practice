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
  S35: () => { eq('S35', n => sum(0, n, i => 2 ** i + i), n => 2 ** (n + 1) - 1 + n * (n + 1) / 2, 0, 40); },
  /* ---- Notación asintótica ---- */
  A01: () => {
    const T1 = n => n * n / 2 + 2000 * n + 50000;
    ok(close(T1(10) / 100, 700.5) && close(T1(100) / 1e4, 25.5) && close(T1(1e4) / 1e8, 0.7005) && Math.abs(T1(1e6) / 1e12 - 0.502) < 1e-6, 'A01 ratios');
    let n0 = 1; while (!(n0 * n0 / 2 > 2000 * n0 + 50000)) n0++; ok(n0 === 4025, 'A01 crossing is 4025 (got ' + n0 + ')');
    ok(!(4024 * 4024 / 2 > 2000 * 4024 + 50000), 'A01 4024 does not cross yet');
  },
  A02: () => {
    const lg = Math.log2; for (const n of [1e6, 1e9]) { ok(n / n ** 2 < 1e-5, 'A02 a'); ok(n * lg(n) / n > 10, 'A02 b'); ok(Math.abs((3 * n * n + n) / (n * n) - 3) < 1e-5, 'A02 c'); ok(close(lg(n) / (Math.log10(n)), 1 / Math.log10(2)), 'A02 e'); }
    ok(100 * Math.log(2000) - 2000 * Math.log(2) < -100, 'A02 d: n^100/2^n is already tiny at n=2000');
  },
  A03: () => { const f = [n => Math.log(Math.log2(n)), n => 0.5 * Math.log(n), n => Math.log(n), n => Math.log(n * Math.log2(n)), n => 2 * Math.log(n), n => 3 * Math.log(n), n => n * Math.log(2), n => n * Math.log(n) - n]; for (const n of [1e4, 1e6, 1e9]) for (let i = 0; i + 1 < f.length; i++) ok(f[i](n) < f[i + 1](n), 'A03 order at n=' + n + ' position ' + i); ok(Math.log2(32) === 5 && 2 ** 32 === 4294967296, 'A03 values'); },
  A04: () => { const f = [n => Math.log(n * Math.log2(n)), n => 1.5 * Math.log(n), n => 2 * Math.log(n), n => 2 * Math.log(n) + Math.log(Math.log2(n)), n => 2.5 * Math.log(n)]; for (const n of [1e12, 1e18, 1e30]) for (let i = 0; i + 1 < f.length; i++) ok(f[i](n) < f[i + 1](n), 'A04 order at n=' + n); },
  A05: () => { let c4 = 0; for (let n = 1; n < 200; n++) { if (3 * n + 5 <= 4 * n) { c4 = c4 || n; } else ok(!c4, 'A05 a stays true after the first n'); ok(!(3 * n + 5 <= 3 * n), 'A05 b'); } ok(c4 === 5, 'A05 a n0=5'); let c35 = 0; for (let n = 1; n < 200; n++) if (3 * n + 5 <= 3.5 * n && !c35) c35 = n; ok(c35 === 10, 'A05 b c=3.5'); for (let n = 1; n < 200; n++) ok(3 * n + 5 <= 8 * n, 'A05 c'); },
  A06: () => { for (let n = 10; n < 500; n++) ok(2 * n + 10 <= 3 * n, 'A06 a'); ok(!(2 * 9 + 10 <= 27), 'A06 a n=9 fails'); for (let n = 5; n < 500; n++) ok(2 * n + 10 <= n * n, 'A06 b'); ok(!(2 * 4 + 10 <= 16), 'A06 b n=4 fails'); },
  A07: () => { for (let n = 1; n < 2000; n++) { ok(3 * n * n + 4 * n <= 7 * n * n, 'A07 a'); ok(n * n + n * Math.log2(n) + 5 <= 7 * n * n, 'A07 b'); } },
  A08: () => { ok(!(2 * 2 + 6 <= 8), 'A08 n=2 fails'); for (let n = 3; n < 500; n++) ok(n * n + 3 * n <= 2 * n * n, 'A08 a'); for (let n = 1; n < 500; n++) { ok(n * n + 3 * n <= 4 * n * n, 'A08 c'); ok(!(n * n + 3 * n <= n * n), 'A08 b'); } },
  A09: () => { for (let n = 1; n < 3000; n++) ok(Math.log2(n) <= n && n < 2 ** Math.min(n, 1000), 'A09'); ok([1, 2, 4, 8, 16].map(Math.log2).join() === '0,1,2,3,4', 'A09 a'); },
  A10: () => { for (const n of [1e6, 1e9]) { ok(Math.abs((n * n + 5 * n) / (n * n) - 1) < 1e-5, 'A10 a'); ok(Math.log2(n) / n < 1e-4, 'A10 b'); ok(n / Math.log2(n) > 1e4, 'A10 c'); } ok(5 * (2 / 3) ** 200 < 1e-30, 'A10 d'); },
  A11: () => { ok(20 * 20 - 200 === 200 && 0.5 * 400 === 200, 'A11 n=20'); ok(!(19 * 19 - 190 >= 0.5 * 19 * 19), 'A11 n=19 fails'); for (let n = 20; n < 1000; n++) ok(n * n - 10 * n >= 0.5 * n * n, 'A11'); },
  A12: () => { for (const c of [1, 5, 50]) { ok(!((c + 1) ** 3 <= c * (c + 1) ** 2), 'A12 a c=' + c); ok(!(2 * (c + 1) ** 2 + 5 <= c * (c + 1)), 'A12 b c=' + c); } },
  A13: () => { for (let n = 1; n < 2000; n++) ok(2 * n * n <= 2 * n * n + 3 * n && 2 * n * n + 3 * n <= 5 * n * n, 'A13'); },
  A14: () => { for (let m = 2; m <= 60; m++) for (let n = 2; n <= 60; n++) { ok(n <= m * n && m * Math.log2(n) <= m * n && n * Math.log2(m) <= m * n, 'A14 a/b'); } const nd = (f, g) => { let fg = false, gf = false; for (let m = 2; m <= 400; m++) for (let n = 2; n <= 400; n++) { if (f(m, n) > 5 * g(m, n)) fg = true; if (g(m, n) > 5 * f(m, n)) gf = true; } return fg && gf; }; ok(nd((m, n) => m ** 3, (m, n) => m * m * n) && nd((m, n) => m * m * n, (m, n) => n * n) && nd((m, n) => m ** 3, (m, n) => n * n), 'A14 c: no term dominates another'); ok(nd((m, n) => m * m, (m, n) => m * n), 'A14 a: m^2 and mn are not comparable'); },
  A15: () => { const n = 50; ok(close(2 ** (n + 1) / 2 ** n, 2) && close(2 ** (2 * n) / 2 ** n, 2 ** n) && close(n * Math.log2(n) / (n * n), Math.log2(n) / n) && Math.sqrt(1e6) / Math.log2(1e6) > 40, 'A15'); let f = 1, g = 1; for (let i = 1; i <= 20; i++) { g = f; f *= i; } ok(close(f * 21 / f, 21), 'A15 e'); },
  A16: () => { },
  A17: () => { const A = [3, 1, 3, 0, 2], k = 3, C = new Array(k + 1).fill(0); A.forEach(v => C[v]++); ok(C.join() === '1,1,1,2', 'A17 counts'); for (let i = 1; i <= k; i++) C[i] += C[i - 1]; ok(C.join() === '1,2,3,5', 'A17 prefix'); const B = new Array(A.length); for (let j = A.length - 1; j >= 0; j--) { B[C[A[j]] - 1] = A[j]; C[A[j]]--; } ok(B.join() === '0,1,2,3,3', 'A17 output'); },
  A18: () => { const fact = n => n <= 1 ? 1 : n * fact(n - 1), h = n => Math.ceil(Math.log2(fact(n))); ok(fact(3) === 6 && h(3) === 3 && fact(4) === 24 && h(4) === 5 && fact(5) === 120 && h(5) === 7 && fact(8) === 40320 && h(8) === 16, 'A18'); },
  A19: () => { let lf = 0; for (let n = 1; n <= 80; n++) { lf += Math.log2(n); if (n % 2 === 0) ok((n / 2) * Math.log2(n / 2) <= lf + 1e-9 && lf <= n * Math.log2(n) + 1e-9, 'A19 n=' + n); } ok(Math.abs(Math.log2(40320) - 15.3) < 0.05 && 4 * Math.log2(4) === 8, 'A19 n=8'); },
  A20: () => { const L2 = Math.LN2, f = [n => 3 * Math.log(n), n => Math.log(n) * Math.log2(n), n => (n / 2) * Math.log(3), n => n * L2, n => n * Math.log(n) - n]; for (const n of [1e3, 1e4, 1e6]) for (let i = 0; i + 1 < f.length; i++) ok(f[i](n) < f[i + 1](n), 'A20 order at n=' + n + ' position ' + i); ok(Math.abs(0.5 * Math.log2(3) - 0.79) < 0.005 && Math.abs(Math.sqrt(3) - 1.73) < 0.005, 'A20 constants'); },
  A21: () => { ok(2 ** 11 === 2 * 2 ** 10, 'A21 a'); ok(1.5 ** 60 > 1e10 && 1.5 ** 120 > 1e20, 'A21 b grows without bound'); ok(50 * 2 ** 50 > 49 * 2 ** 50, 'A21 c'); },
  /* ---- Coste de algoritmos iterativos: los bucles se ejecutan de verdad ---- */
  B01: () => {
    const range = (a, b, st = 1) => { const r = []; for (let i = a; st > 0 ? i < b : i > b; i += st) r.push(i); return r; };
    for (const n of [2, 4, 8, 16, 64]) {
      let w = 0; for (let i = 1; i < n; i *= 2) w++;
      ok(range(0, n).length === n && range(1, n).length === n - 1 && range(2, n + 1).length === n - 1 && range(0, n, 2).length === n / 2 && w === Math.log2(n), 'B01 n=' + n);
    }
    ok(range(0, 5).join() === '0,1,2,3,4' && range(1, 8).join() === '1,2,3,4,5,6,7' && range(2, 9).length === 7 && range(0, 8, 2).join() === '0,2,4,6', 'B01 n=8 lists');
  },
  B02: () => {
    const cost = (iters, body) => 1 + iters * (1 + body + 1) + 1;
    for (let n = 2; n < 50; n++) { ok(cost(n, 1) === 3 * n + 2 && cost(n, 2) === 4 * n + 2 && cost(n - 1, 1) === 3 * n - 1, 'B02 n=' + n); }
    ok(cost(3, 2) === 14 && cost(2, 1) === 8, 'B02 n=3');
  },
  B03: () => {
    for (let n = 1; n < 40; n++) {
      let a = 0, b = 0, c = 0;
      for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) a++; for (let j = 0; j < i; j++) b++; for (let j = i; j < n; j++) c++; }
      ok(a === n * n && b === n * (n - 1) / 2 && c === n * (n + 1) / 2, 'B03 n=' + n);
    }
  },
  B04: () => {
    const tj = v => { const a = v.slice(), t = []; for (let j = 1; j < a.length; j++) { const val = a[j]; let i = j - 1, c = 0; while (i >= 0 && a[i] > val) { a[i + 1] = a[i]; i--; c++; } a[i + 1] = val; t.push(c); } return t; };
    ok(tj([2, 5, 1, 4, 3]).join() === '0,2,1,2' && tj([1, 2, 3, 4, 5]).join() === '0,0,0,0' && tj([5, 4, 3, 2, 1]).join() === '1,2,3,4', 'B04 traces');
  },
  B05: () => {
    const lines = v => { const a = v.slice(), n = a.length; let l1 = n, l2 = 0, l4 = 0, l5 = 0, l6 = 0, l7 = 0, l8 = 0; for (let j = 1; j < n; j++) { const val = a[j]; l2++; let i = j - 1; l4++; for (;;) { l5++; if (!(i >= 0 && a[i] > val)) break; a[i + 1] = a[i]; l6++; i--; l7++; } a[i + 1] = val; l8++; } return l1 + l2 + l4 + l5 + l6 + l7 + l8; };
    for (let n = 1; n <= 30; n++) { const asc = Array.from({ length: n }, (_, i) => i), desc = asc.slice().reverse(); ok(lines(asc) === 5 * n - 4, 'B05 best n=' + n); ok(lines(desc) === 1.5 * n * n + 3.5 * n - 4, 'B05 worst n=' + n); }
    ok(5 * 5 - 4 === 21 && 1.5 * 25 + 17.5 - 4 === 51 && 5 + 4 + 4 + 14 + 10 + 10 + 4 === 51, 'B05 n=5 values');
  },
  B06: () => {
    for (let n = 1; n <= 40; n++) { let ops = 1; for (let i = 0; i < n; i++) { ops += 1; ops += 1; for (let j = 0; j < i; j++) ops += 3; ops += 1; ops += 1; } ops += 1; ok(ops === (3 * n * n + 5 * n + 4) / 2, 'B06 n=' + n + ' counted ' + ops); }
  },
  B07: () => {
    const fits = (f, p) => { const r = [64, 128, 256, 512, 1024].map(n => f(n) / p(n)); return Math.max(...r) / Math.min(...r) < 1.6; };
    const A = n => n * n, Bf = n => { let c = 0; for (let i = 0; i < n; i++) for (let j = 1; j < n; j *= 2) c++; return c; }, C = n => n ** 3, D = n => { let c = 0; for (let i = 0; i < n; i++) c += i * i; return c; }, E = n => n + n * n, F = n => 5 * n;
    ok(fits(A, n => n * n) && fits(Bf, n => n * Math.log2(n)) && fits(C, n => n ** 3) && fits(D, n => n ** 3) && fits(E, n => n * n) && fits(F, n => n), 'B07 orders');
    for (const n of [8, 16, 32]) { ok(Bf(n) === n * Math.log2(n), 'B07 b exact'); ok(D(n) === (n - 1) * n * (2 * n - 1) / 6, 'B07 d exact'); }
  },
  B08: () => {
    const run = v => { const a = v.slice(), n = a.length; let cmp = 0, sw = 0; for (let i = 0; i < n - 1; i++) for (let j = n - 1; j > i; j--) { cmp++; if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; sw++; } } return [cmp, sw]; };
    for (let n = 2; n <= 25; n++) { const asc = Array.from({ length: n }, (_, i) => i), desc = asc.slice().reverse(); ok(run(asc)[0] === n * (n - 1) / 2 && run(asc)[1] === 0 && run(desc)[0] === n * (n - 1) / 2 && run(desc)[1] === n * (n - 1) / 2, 'B08 n=' + n); }
    ok(run([1, 2, 3, 4, 5])[0] === 10 && run([5, 4, 3, 2, 1])[1] === 10, 'B08 n=5');
  },
  B09: () => {
    const cont = (a, x) => { let c = 0; for (let i = 0; i < a.length; i++) { c++; if (a[i] === x) return c; } return c; };
    const rep = a => { let c = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) { c++; if (a[i] === a[j]) return c; } return c; };
    for (let n = 2; n <= 30; n++) { const d = Array.from({ length: n }, (_, i) => i); ok(cont(d, 0) === 1 && cont(d, -1) === n && rep(d) === n * (n - 1) / 2 && rep([7, 7].concat(d.slice(2))) === 1, 'B09 n=' + n); }
    ok(((n) => n * (n - 1) / 2)(5) === 10, 'B09 n=5');
  },
  B10: () => {
    const total = n => { let c = 0, m = n; while (m >= 1) { for (let i = 0; i < m; i++) c++; m = Math.floor(m / 2); } return c; };
    for (let k = 0; k <= 14; k++) ok(total(2 ** k) === 2 * 2 ** k - 1, 'B10 n=2^' + k);
    ok(total(8) === 15, 'B10 n=8');
  },
  B11: () => {
    const total = n => { let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j <= n; j++) for (let k = 0; k < j; k++) c++; return c; };
    for (let n = 1; n <= 40; n++) ok(total(n) === n * (n + 1) * (2 * n + 1) / 6, 'B11 n=' + n);
    ok(total(2) === 5 && total(3) === 14, 'B11 values');
  }
};
Object.keys(T).forEach(id => { ok(byN[id], id + ' exists'); T[id](); });
/* every peldaño of the stage has been looked at: a new one has to bring its own check or be listed as "no numbers" */
const NO_NUMBERS = new Set(['S01', 'S02', 'S03', 'S05', 'S06', 'S07', 'S09']);   // sumatorios:   // powers, logarithms, derivatives, limits, integrals and constants: checked by hand
rungs.forEach(e => ok(T[e.n] || NO_NUMBERS.has(e.n), e.n + ' has a numeric check'));

console.log(fails ? fails + ' FAILURES' : 'ladder checks passed (' + rungs.length + ' peldaños, ' + spans + ' formulas)');
process.exit(fails ? 1 : 0);
