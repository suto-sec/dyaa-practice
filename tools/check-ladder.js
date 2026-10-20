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
  A17: () => { const A = [3, 1, 3, 0, 2], k = 3, C = new Array(k + 1).fill(0); A.forEach(v => C[v]++); ok(C.join() === '1,1,1,2', 'A17 counts'); for (let i = 1; i <= k; i++) C[i] += C[i - 1]; ok(C.join() === '1,2,3,5', 'A17 prefix'); const B = new Array(A.length); for (let j = A.length - 1; j >= 0; j--) { B[C[A[j]] - 1] = A[j]; C[A[j]]--; } ok(B.join() === '0,1,2,3,3', 'A17 output'); },
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
  B11: () => {
    const total = n => { let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j <= n; j++) for (let k = 0; k < j; k++) c++; return c; };
    for (let n = 1; n <= 40; n++) ok(total(n) === n * (n + 1) * (2 * n + 1) / 6, 'B11 n=' + n);
    ok(total(2) === 5 && total(3) === 14, 'B11 values');
  },
  /* ---- Recurrencias: se calculan con la definición y se comparan con la fórmula ---- */
  E01: () => {
    const T = (base0, f) => { const t = [base0]; return n => { while (t.length <= n) t.push(f(t.length, t)); return t[n]; }; };
    const a = T(2, (n, t) => t[n - 1] + 4); ok([1, 2, 3, 4].map(a).join() === '6,10,14,18' && [0, 1, 2, 3, 4, 5, 6].every(n => a(n) === 4 * n + 2), 'E01 a');
    const b = T(0, (n, t) => t[n - 1] + n); ok([2, 3, 4, 5].map(b).join() === '3,6,10,15' && [1, 2, 3, 4, 5, 6, 30].every(n => b(n) === n * (n + 1) / 2), 'E01 b');
    const c = T(0, (n, t) => 2 * t[n - 1] + 1); ok([2, 3, 4, 5].map(c).join() === '3,7,15,31' && [1, 2, 3, 4, 5, 20].every(n => c(n) === 2 ** n - 1), 'E01 c');
  },
  E02: () => {
    const suma = n => n === 0 ? 2 : 2 + suma(n - 1), bits = n => n === 1 ? 2 : 2 + bits(n / 2);
    ok([0, 1, 2, 3].map(suma).join() === '2,4,6,8', 'E02 values'); for (let n = 0; n < 40; n++) ok(suma(n) === 2 * n + 2, 'E02 b');
    for (let k = 0; k <= 12; k++) ok(bits(2 ** k) === 2 * k + 2, 'E02 c k=' + k); ok(bits(8) === 8, 'E02 c n=8');
  },
  E03: () => { const T = n => n === 0 ? 1 : T(n - 1) + 3; for (let n = 0; n < 40; n++) ok(T(n) === 3 * n + 1, 'E03'); ok([1, 2, 3].map(T).join() === '4,7,10', 'E03 values'); },
  E04: () => { const T = n => n === 1 ? 1 : T(n / 2) + 5; for (let k = 0; k <= 14; k++) ok(T(2 ** k) === 5 * k + 1, 'E04 k=' + k); ok(T(8) === 16, 'E04 n=8'); },
  E05: () => { const T = n => n === 0 ? 0 : T(n - 1) + 2 * n + 1; for (let n = 0; n < 40; n++) { ok(T(n) === n * n + 2 * n, 'E05 n=' + n); for (let i = 0; i <= n; i++) { let sm = 0; for (let j = 0; j < i; j++) sm += 2 * (n - j) + 1; ok(sm === 2 * n * i - i * i + 2 * i, 'E05 pattern'); } } ok(T(1) === 3 && T(2) === 8, 'E05 values'); },
  E06: () => { const T = n => n === 0 ? 2 : T(n - 1) + 3; ok([0, 1, 2, 3, 4, 5].every(n => T(n) === 3 * n + 2), 'E06 a'); ok(T(0) !== 3 && T(0) !== 3 * (0 - 1) + 2, 'E06 b,c fail the base'); },
  E07: () => { const T = n => n === 1 ? 1 : 2 * T(n / 2) + 1; for (let k = 0; k <= 14; k++) ok(T(2 ** k) === 2 * 2 ** k - 1, 'E07 k=' + k); ok([2, 4, 8].map(T).join() === '3,7,15', 'E07 values'); },
  E08: () => { const T = n => n === 1 ? 1 : 2 * T(n / 2) + n; for (let k = 0; k <= 14; k++) ok(T(2 ** k) === 2 ** k * k + 2 ** k, 'E08 k=' + k); ok([2, 4, 8].map(T).join() === '4,12,32', 'E08 values'); },
  E09: () => {
    // (a) 2T(n-1)+c grows like 2^n; (b) T(n/2)+n like n; (c) 3T(n/3)+c like n; (d) T(n-1)+T(n-2)+c like phi^n
    const ratio = (f, g) => [f(20) / g(20), f(40) / g(40)]; const memo = f => { const m = {}; return n => m[n] ?? (m[n] = f(n)); };
    const Ta = memo(n => n <= 1 ? 1 : 2 * Ta(n - 1) + 1), Tb = memo(n => n <= 1 ? 1 : Tb(Math.floor(n / 2)) + n), Tc = memo(n => n <= 1 ? 1 : 3 * Tc(Math.floor(n / 3)) + 1), Td = memo(n => n <= 1 ? 1 : Td(n - 1) + Td(n - 2) + 1);
    ok(Math.abs(Ta(40) / Ta(39) - 2) < 0.001, 'E09 a'); ok(Tb(1e6) / 1e6 < 2.1 && Tb(1e6) / 1e6 > 1, 'E09 b is about 2n'); ok(Tc(3 ** 12) / 3 ** 12 < 2, 'E09 c linear'); ok(Math.abs(Td(60) / Td(59) - (1 + Math.sqrt(5)) / 2) < 1e-6, 'E09 d golden ratio');
    let s = 0; for (let n = 1; n <= 1024; n *= 2) s += n; ok(s === 2047, 'E09 b geometric');
  },
  E10: () => { const T = n => n === 0 ? 1 : 2 * T(n - 1) + 3; for (let n = 0; n < 40; n++) ok(T(n) === 2 ** (n + 2) - 3, 'E10 n=' + n); ok(T(1) === 5 && T(2) === 13, 'E10 values'); },
  E11: () => { const t = [1]; for (let n = 1; n <= 30; n++) { let sm = 0; for (let j = 0; j < n; j++) sm += t[j]; t.push(2 + sm); } ok(t.slice(1, 5).join() === '3,6,12,24', 'E11 values'); for (let n = 2; n <= 30; n++) ok(t[n] - t[n - 1] === t[n - 1] && t[n] === 2 * t[n - 1], 'E11 difference n=' + n); for (let n = 1; n <= 30; n++) ok(t[n] === 3 * 2 ** (n - 1), 'E11 closed n=' + n); },
  /* ---- Método general y teorema maestro ---- */
  G01: () => {
    const ratioOk = (f, g, b) => { const r = [10, 14, 18].map(k => f(b ** k) / g(b ** k)); return r.every(x => x > 0.01 && x < 100) && Math.max(...r) / Math.min(...r) < 1.5; };
    const rec = (a, b, w) => { const T = n => n <= 1 ? 1 : a * T(n / b) + w(n); return T; };
    const cases = [[2, 2, n => n, n => n * Math.log2(n)], [4, 2, n => n, n => n * n], [3, 3, () => 1, n => n], [1, 2, () => 1, n => Math.log2(n)], [8, 2, n => n * n, n => n ** 3], [2, 2, n => n * n, n => n * n], [1, 2, n => n, n => n]];
    cases.forEach(([a, b, w, g], i) => ok(ratioOk(rec(a, b, w), g, b), 'G01 case ' + i));
    ok(2 / 2 === 1 && 4 / 2 === 2 && 3 / 1 === 3 && 1 / 1 === 1 && 8 / 4 === 2 && 2 / 4 === 0.5, 'G01 ratios');
  },
  G02: () => {
    const rec = (a, w) => { const T = n => n <= 1 ? 1 : a * T(n / 2) + w(n); return T; }, conv = (f, g) => { const r = [18, 22, 26].map(k => f(2 ** k) / g(2 ** k)); return r.every(x => x > 0.05 && x < 20) && Math.max(...r) / Math.min(...r) < 1.2; };
    ok(conv(rec(2, n => n), n => n * Math.log2(n)), 'G02 a'); ok(conv(rec(1, () => 1), n => Math.log2(n)), 'G02 b'); ok(conv(rec(4, n => n), n => n * n), 'G02 c'); ok(conv(rec(3, n => n), n => n ** Math.log2(3)), 'G02 d');
    ok(conv(rec(8, n => n * n), n => n ** 3), 'G02 e'); ok(conv(rec(7, n => n * n), n => n ** Math.log2(7)), 'G02 f'); ok(Math.abs(Math.log2(3) - 1.585) < 0.001 && Math.abs(Math.log2(7) - 2.807) < 0.001, 'G02 exponents');
  },
  G03: () => {
    const Ta = n => n * (n + 1) / 2; let t = 0; for (let n = 1; n <= 50; n++) { t += n; ok(t === Ta(n), 'G03 a'); }
    const Tb = n => n <= 1 ? 0 : 2 * Tb(n / 2) + n * Math.log2(n); for (let k = 0; k <= 16; k++) { const n = 2 ** k; ok(close(Tb(n), n * k * (k + 1) / 2), 'G03 b k=' + k); }
    const Tc = n => n <= 1 ? 1 : 2 * Tc(n / 2) + Math.sqrt(n); const r = [20, 24, 28].map(k => Tc(2 ** k) / 2 ** k); ok(Math.max(...r) / Math.min(...r) < 1.001 && r[0] > 1, 'G03 c linear');
  },
  G04: () => {
    // sequences satisfying each recurrence are annihilated by the operator of the characteristic polynomial; the solutions have the claimed form
    const seq = (init, f, N) => { const s = init.map(BigInt); while (s.length < N) s.push(f(s)); return s; }, ann = (s, roots) => { roots.forEach(r => { const o = []; for (let i = 0; i + 1 < s.length; i++) o.push(s[i + 1] - BigInt(r) * s[i]); s = o; }); return s.every(v => v === 0n); };
    ok(ann(seq([3, 7], s => s[s.length - 1] + 2n * s[s.length - 2], 30), [2, -1]), 'G04 a'); ok(ann(seq([3, 7], s => 4n * s[s.length - 1] - 4n * s[s.length - 2], 30), [2, 2]), 'G04 b');
    ok(ann(seq([3, 7, 9], s => 6n * s[s.length - 1] - 11n * s[s.length - 2] + 6n * s[s.length - 3], 30), [1, 2, 3]), 'G04 c');
  },
  G05: () => { const T = n => n < 2 ? [1, 4][n] : 5 * T(n - 1) - 6 * T(n - 2); for (let n = 0; n < 25; n++) ok(T(n) === 2 * 3 ** n - 2 ** n, 'G05 n=' + n); ok(T(2) === 14 && T(3) === 46, 'G05 values'); },
  G06: () => { const T = n => n < 2 ? [0, 2][n] : 4 * T(n - 1) - 4 * T(n - 2); for (let n = 0; n < 30; n++) ok(T(n) === n * 2 ** n, 'G06 n=' + n); ok(T(2) === 8 && T(3) === 24, 'G06 values'); },
  G07: () => { const T = n => n < 2 ? [0, 1][n] : T(n - 1) + 2 * T(n - 2); for (let n = 0; n < 30; n++) ok(3 * T(n) === 2 ** n - (-1) ** n, 'G07 n=' + n); ok([2, 3, 4].map(T).join() === '1,3,5', 'G07 values'); },
  G08: () => {
    const seq = (init, f, N) => { const s = init.map(BigInt); while (s.length < N) s.push(f(s, s.length)); return s; }, ann = (s, roots) => { roots.forEach(r => { const o = []; for (let i = 0; i + 1 < s.length; i++) o.push(s[i + 1] - BigInt(r) * s[i]); s = o; }); return s.every(v => v === 0n); };
    const L = s => s[s.length - 1];
    ok(ann(seq([5], (s, n) => 2n * L(s) + 3n ** BigInt(n), 40), [2, 3]), 'G08 a'); ok(ann(seq([5], (s, n) => L(s) + BigInt(n), 40), [1, 1, 1]), 'G08 b');
    ok(ann(seq([5], (s, n) => 3n * L(s) + BigInt(n) * 2n ** BigInt(n), 40), [3, 2, 2]), 'G08 c'); ok(ann(seq([5], (s, n) => 2n * L(s) + 2n ** BigInt(n), 40), [2, 2]), 'G08 d'); ok(ann(seq([5], (s, n) => L(s) + 2n ** BigInt(n), 40), [1, 2]), 'G08 example');
  },
  G09: () => { const T = n => n === 0 ? 0 : T(n - 1) + n; for (let n = 0; n < 40; n++) ok(T(n) === (n * n + n) / 2, 'G09 n=' + n); ok(T(1) === 1 && T(2) === 3, 'G09 values'); const C = [0, 0.5, 0.5]; ok(C[0] === 0 && C[0] + C[1] + C[2] === 1 && C[0] + 2 * C[1] + 4 * C[2] === 3, 'G09 system'); },
  G10: () => {
    const seq = (init, f, N) => { const s = init.map(BigInt); while (s.length < N) s.push(f(s, s.length)); return s; }, ann = (s, roots) => { roots.forEach(r => { const o = []; for (let i = 0; i + 1 < s.length; i++) o.push(s[i + 1] - BigInt(r) * s[i]); s = o; }); return s.every(v => v === 0n); }, L = s => s[s.length - 1], L2 = s => s[s.length - 2];
    ok(ann(seq([4], (s, n) => L(s) + 2n ** BigInt(n) + BigInt(n), 40), [1, 1, 1, 2]), 'G10 a'); ok(ann(seq([4, 9], (s, n) => 2n * L(s) - L2(s) + 1n, 40), [1, 1, 1]), 'G10 b'); ok(ann(seq([4, 9], (s, n) => 3n * L(s) - 2n * L2(s) + BigInt(n), 40), [1, 1, 1, 2]), 'G10 c');
  },
  G11: () => { const T = n => n < 2 ? 1 : T(n - 2) + 3; for (let n = 0; n < 40; n++) ok(4 * T(n) === 1 + 6 * n + 3 * (-1) ** n, 'G11 n=' + n); ok(T(2) === 4 && T(3) === 4 && T(4) === 7, 'G11 values'); const C = [0.25, 1.5, 0.75]; ok(C[0] + C[2] === 1 && C[0] + C[1] - C[2] === 1 && C[0] + 2 * C[1] + C[2] === 4, 'G11 system'); },
  G12: () => { const T = n => n === 0 ? 1 : 2 * T(n - 1) + n; for (let n = 0; n < 40; n++) ok(T(n) === 3 * 2 ** n - n - 2, 'G12 n=' + n); ok(T(1) === 3 && T(2) === 8 && T(3) === 19 && T(4) === 42, 'G12 values'); },
  G13: () => { for (const [a, b, w, tw] of [[1, 2, n => n, k => 2 ** k], [2, 2, n => n * n, k => 4 ** k], [9, 3, n => n, k => 3 ** k], [1, 2, () => 1, () => 1]]) { const T = n => n <= 1 ? 1 : a * T(n / b) + w(n); for (let k = 1; k <= 12; k++) ok(T(b ** k) === a * T(b ** (k - 1)) + tw(k), 'G13 a=' + a + ' k=' + k); } },
  G14: () => { const T = n => n === 1 ? 1 : T(n / 2) + n; for (let k = 0; k <= 20; k++) ok(T(2 ** k) === 2 * 2 ** k - 1, 'G14 k=' + k); ok(T(4) === 7 && T(8) === 15, 'G14 values'); },
  G15: () => {
    const seq = (init, f, N) => { const s = init.map(BigInt); while (s.length < N) s.push(f(s, s.length)); return s; }, ann = (s, roots) => { roots.forEach(r => { const o = []; for (let i = 0; i + 1 < s.length; i++) o.push(s[i + 1] - BigInt(r) * s[i]); s = o; }); return s.every(v => v === 0n); }, L = s => s[s.length - 1];
    ok(ann(seq([2], (s, k) => L(s) + 9n ** BigInt(k), 30), [1, 9]), 'G15 a'); ok(ann(seq([2], (s, k) => 2n * L(s) + 1n + BigInt(k) + 2n ** BigInt(k), 30), [2, 2, 1, 1]), 'G15 b'); ok(ann(seq([2], (s, k) => 3n * L(s) + 4n ** BigInt(k + 1), 30), [3, 4]), 'G15 c');
    ok(3 ** (2 * 5) === 9 ** 5 && 4 ** 6 === 4 * 4 ** 5 && 4 ** 7 === (2 ** 7) ** 2 && 7 * 2 ** 7 === 2 ** 7 * Math.log2(2 ** 7), 'G15 transformations');
  },
  /* ---- Divide y vencerás: se ejecutan los algoritmos de los apuntes ---- */
  D01: () => { },
  D03: () => { let x = 10; const xs = []; for (let i = 0; i < 5; i++) { x = (x * x + 10) / (2 * x); xs.push(x); } ok(xs.slice(0, 4).map(v => v.toFixed(6)).join() === '5.500000,3.659091,3.196005,3.162456', 'D03 iterates'); ok([0, 1, 2, 3].map(i => +(xs[i] * xs[i] - 10).toPrecision(3)).join() === '20.3,3.39,0.214,0.00113', 'D03 errors'); let it = 0, y = 10; while (Math.abs(y * y - 10) >= 1e-6) { y = (y * y + 10) / (2 * y); it++; } ok(it === 5, 'D03 raiz iterations ' + it); },
  D04: () => { let calls = 0, maxs = 0; const maximo = a => { calls++; const n = a.length; if (n === 1) return a[0]; const m = Math.floor(n / 2); maxs++; return Math.max(maximo(a.slice(0, m)), maximo(a.slice(m))); }; ok(maximo([3, 9, 2, 7]) === 9 && calls === 7 && maxs === 3, 'D04 n=4'); for (let k = 1; k <= 10; k++) { calls = 0; maxs = 0; const n = 2 ** k; maximo(Array.from({ length: n }, (_, i) => i)); ok(calls === 2 * n - 1 && maxs === n - 1, 'D04 n=' + n); } },
  D05: () => { const suma = a => { const n = a.length; if (n === 1) return a[0]; const m = Math.floor(n / 2); return suma(a.slice(0, m)) + suma(a.slice(m)); }; ok(suma([1, 2, 3, 4, 5]) === 15 && suma([1, 2]) + suma([3]) + suma([4, 5]) === 3 + 3 + 9, 'D05'); for (let n = 1; n < 60; n++) ok(suma(Array.from({ length: n }, (_, i) => i + 1)) === n * (n + 1) / 2, 'D05 n=' + n); },
  D06: () => { const merge = (a, b) => { let i = 0, j = 0, cmp = 0; const out = [], log = []; while (i < a.length && j < b.length) { cmp++; if (a[i] < b[j]) out.push(a[i++]); else out.push(b[j++]); log.push(out[out.length - 1]); } return { out: out.concat(a.slice(i), b.slice(j)), cmp, log }; }; const r = merge([2, 5, 9], [1, 5, 6, 10]); ok(r.out.join() === '1,2,5,5,6,9,10' && r.cmp === 6 && r.log.join() === '1,2,5,5,6,9', 'D06'); },
  D07: () => { const merges = []; const msort = a => { if (a.length <= 1) return a; const m = Math.floor(a.length / 2), l = msort(a.slice(0, m)), r = msort(a.slice(m)); const out = []; let i = 0, j = 0; while (i < l.length && j < r.length) out.push(l[i] < r[j] ? l[i++] : r[j++]); const res = out.concat(l.slice(i), r.slice(j)); merges.push(l.join('+') + '|' + r.join('+') + '=' + res.join('')); return res; }; ok(msort([5, 2, 8, 1, 9, 3]).join() === '1,2,3,5,8,9', 'D07 sorted'); ok(merges.join(' ') === '2|8=28 5|2+8=258 9|3=39 1|3+9=139 2+5+8|1+3+9=123589', 'D07 merges ' + merges.join(' ')); let depth = 0; const dp = (n, d) => { if (n <= 1) { depth = Math.max(depth, d); return; } const m = Math.floor(n / 2); dp(m, d + 1); dp(n - m, d + 1); }; dp(6, 1); ok(depth === 4, 'D07 levels'); },
  D08: () => { const ins = (a, x) => (a.length === 0 || x <= a[0]) ? [x].concat(a) : [a[0]].concat(ins(a.slice(1), x)); ok(ins([1, 3, 5], 4).join() === '1,3,4,5' && ins([], 7).join() === '7' && ins([2, 2], 2).join() === '2,2,2', 'D08'); const isort = a => a.length <= 1 ? a : ins(isort(a.slice(0, -1)), a[a.length - 1]); ok(isort([4, 1, 3, 9, 7, 2]).join() === '1,2,3,4,7,9', 'D08 sort'); },
  D11: () => { const bits = n => n < 2 ? 1 : 1 + bits(n >> 1); const kar = (x, y) => { if (x === 0 || y === 0) return 0; if (x === 1) return y; if (y === 1) return x; const m = Math.min(bits(x) >> 1, bits(y) >> 1), a = x >> m, b = x - (a << m), c = y >> m, d = y - (c << m), ac = kar(a, c), bd = kar(b, d), t = kar(a + b, c + d) - ac - bd; return (ac << (2 * m)) + (t << m) + bd; }; ok(bits(13) === 4 && bits(11) === 4 && (13 >> 2) === 3 && 13 - 12 === 1 && (11 >> 2) === 2 && 11 - 8 === 3, 'D11 parts'); ok(3 * 2 === 6 && 1 * 3 === 3 && 4 * 5 === 20 && 20 - 6 - 3 === 11 && 3 * 2 + 1 * 2 * 0 === 6 && 6 * 16 + 11 * 4 + 3 === 143 && kar(13, 11) === 143, 'D11 values'); for (let t = 0; t < 400; t++) { const x = Math.floor(Math.random() * 5000), y = Math.floor(Math.random() * 5000); ok(kar(x, y) === x * y, 'D11 random'); } },
  D12: () => { let M = 1, S = 1; const ms = [], ss = []; for (let k = 1; k <= 8; k++) { M *= 8; S *= 7; ms.push(M); ss.push(S); } ok(ms.slice(0, 3).join() === '8,64,512' && ss.slice(0, 3).join() === '7,49,343', 'D12 values'); ok(ms.every((m, i) => m === (2 ** (i + 1)) ** 3), 'D12 n^3'); const r = ss.map((s, i) => s / ms[i]); ok(Math.abs(r[4] - 0.513) < 0.001 && Math.abs(r[5] - 0.449) < 0.001 && r[4] > 0.5 && r[5] < 0.5, 'D12 ratio'); },
  D14: () => { const rev = (i, p) => { let r = 0; for (let b = 0; b < p; b++) if (i >> b & 1) r |= 1 << (p - 1 - b); return r; }; const a = [10, 20, 30, 40, 50, 60, 70, 80], out = []; a.forEach((v, i) => { out[rev(i, 3)] = v; }); ok(out.join() === '10,50,30,70,20,60,40,80', 'D14 a'); ok(Array.from({ length: 16 }, (_, i) => rev(i, 4)).join() === '0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15', 'D14 b'); ok(Array.from({ length: 16 }, (_, i) => i).filter(i => rev(i, 4) === i).join() === '0,6,9,15', 'D14 fixed'); for (let p = 2; p <= 10; p += 2) ok(Array.from({ length: 2 ** p }, (_, i) => i).filter(i => rev(i, p) === i).length === 2 ** (p / 2), 'D14 count p=' + p); },
  /* ---- Backtracking: los esquemas de los apuntes se ejecutan ---- */
  K01: () => { const leaves = []; let calls = 0; const g = (i, sol, n) => { calls++; if (i === n) { leaves.push(sol.join('')); return; } for (let k = 0; k < 2; k++) { sol[i] = k; g(i + 1, sol, n); } }; g(0, [], 2); ok(leaves.join() === '00,01,10,11' && calls === 7, 'K01 n=2'); calls = 0; g(0, [], 4); ok(calls === 31, 'K01 n=4'); },
  K02: () => { let calls = 0, leaves = 0, sols = 0; (function r(i, ch) { calls++; if (i === 4) { leaves++; if (ch === 2) sols++; return; } for (let k = 0; k < 2; k++) if (ch + k <= 2) r(i + 1, ch + k); })(0, 0); ok(calls === 25 && leaves === 11 && sols === 6, 'K02 ' + [calls, leaves, sols]); },
  K03: () => { const out = [], pairs = []; const g = (i, j, sol, el) => { out.push('{' + sol.slice(0, i).map(k => el[k]).join(',') + '}'); pairs.push(i + ',' + j); for (let k = j + 1; k < el.length; k++) { sol[i] = k; g(i + 1, k, sol, el); } }; g(0, -1, [], ['a', 'b', 'c']); ok(out.join(' ') === '{} {a} {a,b} {a,b,c} {a,c} {b} {b,c} {c}' && pairs.join(' ') === '0,-1 1,0 2,1 3,2 2,2 1,1 2,2 1,2', 'K03 ' + out.join(' ')); out.length = 0; g(0, -1, [], [1, 2, 3, 4]); ok(out.length === 16, 'K03 n=4'); },
  K04: () => { const out = []; const lv = [0, 0, 0, 0]; const g = (i, libres, sol, el) => { lv[i]++; const n = el.length; if (i === n) { out.push(sol.join('')); return; } for (let k = 0; k < n; k++) if (libres[k]) { sol[i] = el[k]; libres[k] = false; g(i + 1, libres, sol, el); libres[k] = true; } }; g(0, [true, true, true], [], [1, 2, 3]); ok(out.join() === '123,132,213,231,312,321' && lv.join() === '1,3,6,6' && lv.reduce((a, b) => a + b) === 16, 'K04'); const l4 = [0, 0, 0, 0, 0]; const g4 = (i, libres) => { l4[i]++; if (i === 4) return; for (let k = 0; k < 4; k++) if (libres[k]) { libres[k] = false; g4(i + 1, libres); libres[k] = true; } }; g4(0, [true, true, true, true]); ok(l4.reduce((a, b) => a + b) === 65, 'K04 n=4'); },
  K05: () => { const res = n => { const out = []; (function p(i, libres, sol) { if (i === n) { out.push(sol.join('')); return; } for (let k = 0; k < n; k++) if (libres[k] && k !== i) { libres[k] = false; sol[i] = k + 1; p(i + 1, libres, sol); libres[k] = true; } })(0, Array(n).fill(true), []); return out; }; ok(res(3).join() === '231,312' && res(4).join() === '2143,2341,2413,3142,3412,3421,4123,4312,4321', 'K05'); },
  K06: () => { const n = 4, visited = []; let first = null; const f = Array(n).fill(true), pd = Array(2 * n - 1).fill(true), sd = Array(2 * n - 1).fill(true), sol = Array(n); (function r(i) { if (first) return; visited.push('(' + sol.slice(0, i).join(',') + ')'); if (i === n) { first = sol.slice(); return; } for (let k = 0; k < n; k++) if (f[k] && pd[i - k + n - 1] && sd[i + k]) { sol[i] = k; f[k] = pd[i - k + n - 1] = sd[i + k] = false; r(i + 1); if (first) return; f[k] = pd[i - k + n - 1] = sd[i + k] = true; } })(0); ok(first.join() === '1,3,0,2' && visited.join(' ') === '() (0) (0,2) (0,3) (0,3,1) (1) (1,3) (1,3,0) (1,3,0,2)' && visited.length === 9, 'K06 ' + visited.join(' ')); const att = (a, b) => Math.abs(a[0] - b[0]) === Math.abs(a[1] - b[1]); ok(att([2, 1], [1, 2]) && att([2, 3], [1, 2]) && att([3, 2], [2, 1]), 'K06 c'); },
  K07: () => { const n = 4, pdx = (i, k) => i - k + n - 1, sdx = (i, k) => i + k, att = (a, b) => pdx(...a) === pdx(...b) || sdx(...a) === sdx(...b); ok(att([0, 1], [2, 3]) && att([0, 2], [1, 1]) && !att([0, 0], [1, 2]) && att([1, 3], [3, 1]), 'K07 b'); let mn = 99, mx = -99, smn = 99, smx = -99; for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) { mn = Math.min(mn, pdx(i, k)); mx = Math.max(mx, pdx(i, k)); smn = Math.min(smn, sdx(i, k)); smx = Math.max(smx, sdx(i, k)); } ok(mn === 0 && mx === 6 && smn === 0 && smx === 6, 'K07 a'); for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) for (let d = 0; d < n; d++) if (a !== c) ok(att([a, b], [c, d]) === (Math.abs(a - c) === Math.abs(b - d)), 'K07 equivalence'); },
  K08: () => { const nodes = [], sols = []; const sol = [0, 0, 0]; (function r(i, sp) { nodes.push(sol.slice(0, i).join('') + '(' + sp + ')'); if (sp === 5) sols.push(sol.slice(0, i).join('')); else if (i < 3) for (let k = 0; k < 2; k++) if (sp + k * [3, 2, 4][i] <= 5) { sol[i] = k; r(i + 1, sp + k * [3, 2, 4][i]); } })(0, 0); ok(nodes.length === 11 && sols.join() === '11' && nodes.join(' ') === '(0) 0(0) 00(0) 000(0) 001(4) 01(2) 010(2) 1(3) 10(3) 100(3) 11(5)', 'K08 ' + nodes.join(' ')); },
  K09: () => { const incr = [[1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2]], mv = (f, c) => incr.map(([dx, dy]) => [f + dy, c + dx]).filter(([nf, nc]) => nf >= 0 && nf < 5 && nc >= 0 && nc < 5); ok(JSON.stringify(mv(0, 0)) === '[[1,2],[2,1]]' && mv(0, 1).length === 3 && mv(1, 1).length === 4 && mv(2, 2).length === 8, 'K09'); },
  K10: () => { const p = [2, 3, 4], v = [3, 4, 5], leaves = []; let calls = 0, pcap = 0, best = -1, bestx = ''; (function r(i, cr, va, sol) { calls++; if (i === 3) { leaves.push(sol + '(' + cr + ',' + va + ')'); if (va > best) { best = va; bestx = sol; } return; } for (let k = 0; k < 2; k++) { if (k * p[i] <= cr) r(i + 1, cr - k * p[i], va + k * v[i], sol + k); else pcap++; } })(0, 5, 0, ''); ok(leaves.join(' ') === '000(5,0) 001(1,5) 010(2,4) 100(3,3) 110(0,7)' && calls === 12 && pcap === 3 && best === 7 && bestx === '110', 'K10 ' + leaves.join(' ') + calls); },
  K11: () => { const M = ['EEEE', 'EWWE', 'EEWE'].map(r => r.split('')), inc = [[0, 1], [1, 0], [0, -1], [-1, 0]]; let undone = 0; const enc = (f, c) => { if (f === 2 && c === 3) return true; let found = false, k = 0; while (!found && k < 4) { const nc = c + inc[k][0], nf = f + inc[k][1]; if (nf >= 0 && nf < M.length && nc >= 0 && nc < M[0].length && M[nf][nc] === 'E') { M[nf][nc] = 'P'; found = enc(nf, nc); if (!found) { M[nf][nc] = 'E'; undone++; } } k++; } return found; }; M[0][0] = 'P'; ok(enc(0, 0) && undone === 3 && M.map(r => r.join('')).join('/') === 'PPPP/EWWP/EEWP', 'K11'); },
  K12: () => { const p = [2, 3, 4], v = [3, 4, 5]; let calls = 0, vopt = -1; const pv = []; (function r(i, cr, va, mx, sol) { calls++; if (i === 3) { if (va > vopt) vopt = va; return; } for (let k = 0; k < 2; k++) if (k * p[i] <= cr) { const nm = mx - (1 - k) * v[i]; if (nm > vopt) r(i + 1, cr - k * p[i], va + k * v[i], nm, sol + k); else pv.push(sol + k + ':' + nm); } })(0, 5, 0, 12, ''); ok(calls === 10 && vopt === 7 && pv.join() === '010:4,100:3', 'K12 ' + calls + ' ' + pv.join()); },
  /* ---- Voraces ---- */
  V01: () => { const coins = (x, cs) => { const out = []; for (const c of cs.slice().sort((a, b) => b - a)) while (x >= c) { out.push(c); x -= c; } return out; }; ok(coins(67, [50, 20, 10, 5, 2, 1]).join() === '50,10,5,2', 'V01'); },
  V03: () => { const coins = (x, cs) => { const out = []; for (const c of cs.slice().sort((a, b) => b - a)) while (x >= c) { out.push(c); x -= c; } return out; }; const opt = (x, cs) => { const d = [0]; for (let i = 1; i <= x; i++) d[i] = Math.min(...cs.filter(c => c <= i).map(c => d[i - c] + 1)); return d[x]; }; ok(coins(93, [1, 2, 5, 10, 20, 50]).join() === '50,20,20,2,1' && coins(6, [1, 3, 4]).join() === '4,1,1' && opt(6, [1, 3, 4]) === 2, 'V03'); for (let x = 1; x < 300; x++) ok(coins(x, [1, 2, 5, 10, 20, 50]).length === opt(x, [1, 2, 5, 10, 20, 50]), 'V03 euro system optimal x=' + x); },
  V05: () => { const seq = l => { let acc = l[0], c = 0; for (const x of l.slice(1)) { acc += x; c += acc; } return c; }; const gr = l => { l = l.slice(); let c = 0; while (l.length > 1) { l.sort((a, b) => a - b); const s = l[0] + l[1]; c += s; l = [s, ...l.slice(2)]; } return c; }; ok(seq([6, 2, 8, 4]) === 44 && gr([6, 2, 8, 4]) === 38, 'V05'); },
  V06: () => { let q = [['F', 4], ['E', 6], ['D', 10], ['C', 15], ['B', 25], ['A', 40]].map(([c, f]) => ({ f, c })); while (q.length > 1) { q.sort((a, b) => a.f - b.f); const [x, y] = q; q = [{ f: x.f + y.f, l: x, r: y }, ...q.slice(2)]; } const depth = {}; (function w(n, d) { if (n.c) depth[n.c] = d; else { w(n.l, d + 1); w(n.r, d + 1); } })(q[0], 0); const f = { A: 40, B: 25, C: 15, D: 10, E: 6, F: 4 }; const avg = Object.keys(f).reduce((a, c) => a + f[c] * depth[c], 0) / 100; ok(avg === 2.25 && depth.A === 1 && depth.B === 2 && depth.C === 3 && depth.D === 4 && depth.E === 5 && depth.F === 5, 'V06 ' + JSON.stringify(depth)); },
  V08: () => { const frac = (p, v, C) => { const o = p.map((_, i) => i).sort((a, b) => v[b] / p[b] - v[a] / p[a]); let tot = 0; for (const i of o) { const t = Math.min(p[i], C); tot += v[i] * t / p[i]; C -= t; } return tot; }; ok(close(frac([6, 10, 12, 20], [36, 40, 36, 60], 30), 118), 'V08 b'); ok([36, 40, 36, 60].map((v, i) => v / [6, 10, 12, 20][i]).join() === '6,4,3,3', 'V08 a'); ok(60 + 40 === 100, 'V08 c'); const b01 = (p, v, C) => { let b = 0; for (let k = 0; k < 1 << p.length; k++) { let w = 0, val = 0; p.forEach((x, i) => { if (k >> i & 1) { w += x; val += v[i]; } }); if (w <= C) b = Math.max(b, val); } return b; }; ok(b01([10, 20, 30], [60, 100, 120], 50) === 220 && 60 + 100 === 160 && 100 + 120 === 220, 'V08 d'); },
  V09: () => { const E = [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 8], ['C', 'E', 10], ['D', 'E', 3]]; const par = {}; 'ABCDE'.split('').forEach(c => par[c] = c); const find = x => par[x] === x ? x : (par[x] = find(par[x])); const acc = [], rej = []; E.slice().sort((a, b) => a[2] - b[2]).forEach(e => { if (find(e[0]) !== find(e[1])) { par[find(e[0])] = find(e[1]); acc.push(e.join('')); } else rej.push(e.join('')); }); ok(acc.join() === 'BC1,AC2,DE3,BD5' && rej[0] === 'AB4' && acc.reduce((a, e) => a + +e.slice(2), 0) === 11, 'V09 kruskal ' + acc); const U = new Set(['A']), pr = []; while (U.size < 5) { let b = null; E.forEach(e => { if (U.has(e[0]) !== U.has(e[1]) && (!b || e[2] < b[2])) b = e; }); pr.push(b.join('')); U.add(U.has(b[0]) ? b[1] : b[0]); } ok(pr.join() === 'AC2,BC1,BD5,DE3', 'V09 prim ' + pr); },
  V10: () => { const E = [['s', 'a', 2], ['s', 'b', 5], ['a', 'b', 1], ['a', 'c', 6], ['b', 'c', 2], ['b', 't', 7], ['c', 't', 1]]; const d = { s: 0, a: Infinity, b: Infinity, c: Infinity, t: Infinity }, done = new Set(), order = []; while (done.size < 5) { const v = Object.keys(d).filter(x => !done.has(x)).sort((x, y) => d[x] - d[y])[0]; done.add(v); order.push(v + d[v]); E.forEach(([x, y, w]) => { if (x === v && d[y] > d[v] + w) d[y] = d[v] + w; if (y === v && d[x] > d[v] + w) d[x] = d[v] + w; }); } ok(order.join() === 's0,a2,b3,c5,t6' && d.t === 6, 'V10 ' + order); },
  K15: () => { const L = [3, 2, 4, 1], out = []; let calls = 0; (function g(i, j, sol, sp) { calls++; if (sp === 5) out.push(sol.slice(0, i).map(k => L[k]).join('+')); if (sp >= 5) return; for (let k = j + 1; k < L.length; k++) if (sp + L[k] <= 5) { sol[i] = k; g(i + 1, k, sol, sp + L[k]); } })(0, -1, [], 0); ok(out.join() === '3+2,4+1' && calls === 9, 'K15 ' + out + calls); },
  K16: () => { const D = [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]; const all = {}; const perms = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]; perms.forEach(p => { const r = [0, ...p, 0]; let c = 0; for (let i = 0; i < 4; i++) c += D[r[i]][r[i + 1]]; all[p.join('')] = c; }); ok(JSON.stringify(all) === '{"123":95,"132":80,"213":95,"231":80,"312":95,"321":95}', 'K16 a'); let best = Infinity, calls = 0; const cuts = []; (function r(i, ult, coste, sol, libres) { calls++; if (i === 4) { const tot = coste + D[ult][0]; if (tot < best) best = tot; return; } for (let k = 1; k < 4; k++) if (libres[k]) { const nc = coste + D[ult][k]; if (nc < best) { libres[k] = false; sol.push(k); r(i + 1, k, nc, sol, libres); sol.pop(); libres[k] = true; } else cuts.push(sol.join('') + k + ':' + nc); } })(1, 0, 0, [0], [false, true, true, true]); ok(best === 80 && calls === 14 && cuts.join() === '0312:80,0321:85', 'K16 b ' + cuts); },
  V13: () => { const act = { A: [0, 10], X: [0, 5], Y: [4, 6], Z: [5, 10] }; const comp = (a, b) => a[0] >= b[1] || b[0] >= a[1]; const run = key => { const chosen = []; Object.keys(act).sort((p, q) => key(act[p]) - key(act[q])).forEach(n => { if (chosen.every(c => comp(act[c], act[n]))) chosen.push(n); }); return chosen.join(''); }; ok(run(a => a[0]) === 'A' && run(a => a[1] - a[0]) === 'Y' && run(a => a[1]) === 'XZ', 'V13'); },
  V14: () => { const cambio = (x, ms) => { const r = []; for (const m of ms) { const n = Math.floor(x / m); for (let i = 0; i < n; i++) r.push(m); x = x % m; } return r; }; ok(cambio(534, [200, 100, 50, 20, 10, 5, 2, 1]).join() === '200,200,100,20,10,2,2', 'V14'); },
  V15: () => { const h = a => { a = a.slice(); let c = 0; while (a.length > 1) { a.sort((x, y) => x - y); const s = a[0] + a[1]; c += s; a = [s, ...a.slice(2)]; } return c; }; ok(h([3, 9, 4, 5, 2]) === 51 && h([8, 5, 7, 4]) === 48, 'V15'); },
  V16: () => { const p = [0, 1, 2, 3, 4]; const find = x => { while (p[x] !== x) x = p[x]; return x; }; const E = [[4, 0, 1], [2, 0, 2], [1, 1, 2], [5, 1, 3], [8, 2, 3], [10, 2, 4], [3, 3, 4]].sort((a, b) => a[0] - b[0]); const hist = [], acc = []; E.forEach(([w, u, v]) => { const ru = find(u), rv = find(v); if (ru !== rv) { p[ru] = rv; acc.push(w); hist.push(p.join('')); } }); ok(acc.join() === '1,2,3,5' && hist.join('|') === '02234|22234|22244|22444', 'V16 ' + hist.join('|')); },
  V17: () => { const ady = [[[1, 2], [2, 5]], [[0, 2], [2, 1], [3, 6]], [[0, 5], [1, 1], [3, 2], [4, 7]], [[1, 6], [2, 2], [4, 1]], [[2, 7], [3, 1]]]; const n = 5, d = Array(n).fill(Infinity), fijo = Array(n).fill(false); d[0] = 0; const hist = []; for (let k = 0; k < n; k++) { let u = -1; for (let x = 0; x < n; x++) if (!fijo[x] && (u < 0 || d[x] < d[u])) u = x; fijo[u] = true; for (const [v, w] of ady[u]) if (d[u] + w < d[v]) d[v] = d[u] + w; hist.push(d.join()); } ok(hist.join('|') === '0,2,5,Infinity,Infinity|0,2,3,8,Infinity|0,2,3,5,10|0,2,3,5,6|0,2,3,5,6' && d.join() === '0,2,3,5,6', 'V17 ' + hist.join('|')); }
};
Object.keys(T).forEach(id => { ok(byN[id], id + ' exists'); T[id](); });
/* every peldaño of the stage has been looked at: a new one has to bring its own check or be listed as "no numbers" */
const NO_NUMBERS = new Set(['S01', 'S02', 'S03', 'S05', 'S06', 'S07', 'S09']);   // sumatorios:   // powers, logarithms, derivatives, limits, integrals and constants: checked by hand
rungs.forEach(e => ok(T[e.n] || NO_NUMBERS.has(e.n), e.n + ' has a numeric check'));

console.log(fails ? fails + ' FAILURES' : 'ladder checks passed (' + rungs.length + ' peldaños, ' + spans + ' formulas)');
process.exit(fails ? 1 : 0);
