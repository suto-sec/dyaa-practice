/* Pure logic (no DOM): roadmap path, scheduling, XP. Loaded by the app and by tools/check-logic.js. */
(function (root) {
'use strict';
var L = {};
L.RN = ['Fallé', 'Dudoso', 'Dominado'];
L.RM = [0, 0.5, 1];

/* ---------- dates ---------- */
function pad(n) { return ('0' + n).slice(-2); }
L.dstr = function (d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
L.addDays = function (s, n) { var p = s.split('-'); return L.dstr(new Date(+p[0], p[1] - 1, +p[2] + n, 12)); };

/* ---------- scoring ---------- */
L.xpFor = function (points, hints, r) {
  var xp = points * Math.max(0.25, 1 - 0.25 * hints) * L.RM[r];
  return Math.round(xp * 10) / 10;
};
L.level = function (xp) { return Math.floor(Math.sqrt(xp / 10)) + 1; };
L.streak = function (days, t) {
  var d = t, n = 0;
  if (days.indexOf(d) < 0) d = L.addDays(d, -1);
  while (days.indexOf(d) >= 0) { n++; d = L.addDays(d, -1); }
  return n;
};
/* Spaced-repetition item update. r: 0 fallé, 1 dudoso, 2 dominado. */
L.applyRating = function (x, r, hints, xp, t) {
  x = x || { hist: [], interval: 0, ease: 2.3 };
  if (r === 0) { x.interval = 0; x.due = L.addDays(t, 1); }
  else if (r === 1) { x.interval = Math.max(2, (x.interval || 1) * 1.2); x.due = L.addDays(t, Math.ceil(x.interval)); }
  else { x.interval = x.interval ? x.interval * x.ease : 3; x.due = L.addDays(t, Math.ceil(x.interval)); }
  x.hist.push({ r: r, t: t, h: hints, xp: xp });
  x.lastSeen = t;
  return x;
};
L.lastRating = function (S, key) { var x = S.ex[key]; return x && x.hist.length ? x.hist[x.hist.length - 1].r : null; };
L.dueKeys = function (keys, S, t) {
  return keys.filter(function (k) { var x = S.ex[k]; return x && x.due && x.due <= t; })
    .sort(function (a, b) { return S.ex[a].due < S.ex[b].due ? -1 : S.ex[a].due > S.ex[b].due ? 1 : 0; });
};

/* ---------- roadmap path ----------
   Steps in curriculum order. A step is a theory reading, an exercise, or a mock-exam checkpoint.
   Nothing is ever locked: the path only says what to do next. */
L.buildPath = function (stages, stageEx, lectures, at, quizzes) {
  var path = [];
  var lastOfWorld = {};
  stages.forEach(function (g) { lastOfWorld[g.world] = g.id; });
  stages.forEach(function (g) {
    var ex = stageEx[g.id] || [], placed = {};
    (g.theory || []).forEach(function (t, i) {
      var li = (lectures || []).findIndex(function (l) { return l.id === t.lecture; });
      var title = li >= 0 && lectures[li].sections[t.idx] ? lectures[li].sections[t.idx].title : t.section;
      var tid = t.id || g.id + ':' + i;
      path.push({ id: 't:' + tid, type: 'theory', stage: g.id, tile: tid, label: t.label || title, lecture: t.lecture, idx: t.idx, upto: t.upto });
      var qs = quizzes && quizzes[tid];
      if (qs && qs.length) path.push({ id: 'q:' + tid, type: 'quiz', stage: g.id, tile: tid, label: t.label || title, n: qs.length });
      ex.forEach(function (k) { if (at && at[k] === i) { path.push({ id: 'e:' + k, type: 'ex', stage: g.id, key: k }); placed[k] = true; } });   // the warm-ups that go with this reading
    });
    ex.forEach(function (k) { if (!placed[k]) path.push({ id: 'e:' + k, type: 'ex', stage: g.id, key: k }); });   // the rest (exam level) closes the stage
    if (lastOfWorld[g.world] === g.id) {
      path.push({ id: 'x:' + g.world, type: 'exam', stage: g.id, world: g.world,
        label: g.world === 'analisis' ? 'Simulacro: un examen completo de análisis' : 'Simulacro: un examen completo de diseño' });
    }
  });
  return path;
};
/* Puts the peldaños (short graded exercises, see content/peldanos) and the additional exercises in the order written for each reading.
   order: {stage: {reading id: [keys]}}. Exercises that the lists do not name keep their place after the named ones. Keys that do not exist
   (the exam data is not there) are left out. Returns the new per-stage lists and the reading each named exercise goes after. */
L.mergeLadder = function (stages, stageEx, at, order, isRung) {
  var ex = {}, at2 = {}, k;
  for (k in at) at2[k] = at[k];
  stages.forEach(function (g) {
    var list = (stageEx[g.id] || []), tiles = (order && order[g.id]) || {}, front = [];
    (g.theory || []).forEach(function (t, i) {
      (tiles[t.id] || []).forEach(function (key) {
        if (front.indexOf(key) >= 0 || !(isRung(key) || list.indexOf(key) >= 0)) return;
        front.push(key); at2[key] = i;
      });
    });
    ex[g.id] = front.concat(list.filter(function (key) { return front.indexOf(key) < 0; }));
  });
  return { ex: ex, at: at2 };
};
L.stepDone = function (step, S, exams) {
  if (S.skip && S.skip[step.id]) return true;
  if (step.type === 'theory') return !!(S.theory && S.theory[step.id]);
  if (step.type === 'quiz') return !!(S.quiz && S.quiz[step.id]);
  if (step.type === 'ex') return !!(S.ex[step.key] && S.ex[step.key].hist.length);
  var done = S.exams || {};
  return (exams || []).some(function (e) { return (e.kind === step.world || e.kind === 'mixto') && done[e.id]; });
};
L.nextSteps = function (path, S, exams, n) {
  var out = [];
  for (var i = 0; i < path.length && out.length < n; i++) if (!L.stepDone(path[i], S, exams)) out.push(path[i]);
  return out;
};
/* Next undone step after the given step id; wraps around; null if the whole path is done. */
L.nextAfter = function (path, S, exams, stepId, keep) {
  var at = path.findIndex(function (s) { return s.id === stepId; });
  for (var j = 1; j <= path.length; j++) {
    var s = path[(at + j) % path.length];
    if (s.id !== stepId && !L.stepDone(s, S, exams) && (!keep || keep(s))) return s;
  }
  return null;
};
L.stageProgress = function (path, S, exams, stageId) {
  var steps = path.filter(function (s) { return s.stage === stageId; }), done = 0, min = 0, left = 0;
  steps.forEach(function (s) {
    var d = L.stepDone(s, S, exams), m = s.min || 0;
    if (d) done++; else left += m;
    min += m;
  });
  return { done: done, total: steps.length, min: min, left: left };
};
/* Minutes of the whole path (or of a subset): total and still to do. Sums the per-step values, so the numbers shown add up. */
L.pathMinutes = function (path, S, exams, steps) {
  var tot = 0, left = 0;
  (steps || path).forEach(function (s) { var m = s.min || 0; tot += m; if (!L.stepDone(s, S, exams)) left += m; });
  return { total: tot, left: left };
};
/* ---------- which part of the course the route covers, and how it is organised ----------
   scope = one of window.SCOPES ({id, title, worlds}): the route of a student who only sits the first exam stops after the analysis stages. */
L.scopeSteps = function (path, stages, scope) {
  if (!scope || !scope.worlds) return path.slice();
  var w = {}; stages.forEach(function (g) { w[g.id] = g.world; });
  return path.filter(function (s) { return scope.worlds.indexOf(w[s.stage]) >= 0; });
};
/* The units the route is shown in: one per etapa, or (org 'temas') one per lecture, which merges the stages that read the same tema. */
L.groups = function (stages, lectures, org) {
  var title = {}, out = [];
  (lectures || []).forEach(function (l) { title[l.id] = l.title; });
  stages.forEach(function (g, i) {
    if (org === 'temas') {
      var t = g.theory && g.theory.length ? g.theory[0].lecture : g.id, last = out[out.length - 1];
      if (last && last.id === t) { last.stages.push(g.id); last.blurb += ' ' + g.blurb; return; }
      var lab = String(title[t] || g.title).replace(/^(Tema [\d.]*\d)\.?\s+/, '$1. ');
      out.push({ id: t, label: lab, short: lab, world: g.world, stages: [g.id], blurb: g.blurb });
    } else out.push({ id: g.id, label: 'Etapa ' + (i + 1) + '. ' + g.title, short: g.title, world: g.world, stages: [g.id], blurb: g.blurb });
  });
  out.forEach(function (g, i) { g.n = i + 1; });
  return out;
};
L.groupSteps = function (path, grp) { return path.filter(function (s) { return grp.stages.indexOf(s.stage) >= 0; }); };
L.groupProgress = function (path, S, exams, grp) {
  var r = { done: 0, total: 0, min: 0, left: 0 };
  grp.stages.forEach(function (id) { var p = L.stageProgress(path, S, exams, id); r.done += p.done; r.total += p.total; r.min += p.min; r.left += p.left; });
  return r;
};
L.stepOfKey = function (path, key) {
  return path.find(function (s) { return s.type === 'ex' && s.key === key; }) || null;
};
/* Position of an exercise inside its stage (1-based among that stage's exercises). */
L.posInStage = function (path, key) {
  var st = L.stepOfKey(path, key);
  if (!st) return null;
  var list = path.filter(function (s) { return s.type === 'ex' && s.stage === st.stage; });
  return { n: list.indexOf(st) + 1, of: list.length, stage: st.stage };
};

/* ---------- progress shared through a file ----------
   Every state carries `updated` (ms since the epoch, 0 = never saved). `last` is the `updated` both sides had when they last agreed (0 = never).
   Returns what to do with this browser's progress (local) and the one in the shared file (remote):
   'same' nothing, 'pull' take the file's, 'push' write ours, 'conflict' both changed since they last agreed (the user decides). */
L.syncPlan = function (local, remote, last) {
  var l = +local.updated || 0, r = +remote.updated || 0;
  last = +last || 0;
  if (l === r) return 'same';
  if (r > l) return (l === 0 || l <= last) ? 'pull' : 'conflict';
  return (r === 0 || r <= last) ? 'push' : 'conflict';
};

/* ---------- time estimates (minutes) ----------
   Orientative, meant for planning a session. Reading is a study pace (slides are dense and the examples are worked through),
   not a skim. Exercises start from the time the exam gives them and add the time to check the answer. */
L.STUDY_WPM = 35;
L.words = function (md) {
  var math = 0;
  md = String(md || '').replace(/```[\s\S]*?```/g, function (m) { return ' code '.repeat(Math.ceil(m.split('\n').length / 2)); });
  md = md.replace(/\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g, function () { math++; return ' '; });   // a formula takes about as long as three words
  return md.split(/\s+/).filter(Boolean).length + math * 3;
};
/* Round for display: exact below 10 minutes, then to the nearest 5. */
L.roundMin = function (m) { m = Math.max(1, m); return m < 10 ? Math.round(m) : Math.round(m / 5) * 5; };
/* Sections a theory step covers: the section itself and the deeper-level sections that follow it. */
L.sectionSpan = function (sections, idx) {
  var s = sections[idx]; if (!s) return { from: idx, to: idx };
  var to = idx;
  while (to + 1 < sections.length && (sections[to + 1].level || 1) > (s.level || 1)) to++;
  return { from: idx, to: to };
};
L.readMinutes = function (sections, from, to) {
  var w = 0;
  for (var i = from; i <= to; i++) if (sections[i]) w += L.words(sections[i].md);
  return L.roundMin(Math.max(3, w / L.STUDY_WPM));
};
/* Points each exercise of an exam is worth; exercises without a mark share what is left of 10. */
L.examPts = function (ex) {
  var n = ex.exercises.length, known = ex.exercises.filter(function (e) { return e.points != null; }), sum = known.reduce(function (t, e) { return t + e.points; }, 0), p = {};
  var fill = known.length ? (known.length < n ? sum / known.length : 0) : 10 / n;
  ex.exercises.forEach(function (e) { p[e.id] = e.points != null ? e.points : fill; });
  return p;
};
L.examMin = function (ex) {
  if (ex.durationMin) return ex.durationMin;
  var p = L.examPts(ex), t = 0; for (var k in p) t += p[k];
  return Math.round(t * 9);
};
/* Time to do one exercise and check it: exam pace x 1.25, plus the time to compare with the solution (or with your notes). */
L.exMinutes = function (e, exam) {
  var m;
  if (e.src === 'adic' || exam.kind === 'adic') m = 5 + 5 * (e.diff || 1);   // warm-ups: no marks, so go by difficulty
  else {
    var p = L.examPts(exam), tot = 0, k; for (k in p) tot += p[k];
    var budget = e.durationMin || (exam.durationMin && tot ? exam.durationMin * p[e.id] / tot : p[e.id] * 9);
    m = budget * 1.25 + (e.solution ? 3 : 5);
  }
  return L.roundMin(Math.min(90, Math.max(5, m)));
};
/* Fill step.min (and, for readings, step.to = last section covered) on every path step. */
L.annotateMinutes = function (path, lectures, exams) {
  var lm = {}, ex = {}, sum = {}, cnt = {};
  (lectures || []).forEach(function (l) { lm[l.id] = l; });
  (exams || []).forEach(function (x) {
    x.exercises.forEach(function (e) { ex[x.id + '/' + e.id] = { e: e, exam: x }; });
    if (x.kind === 'analisis' || x.kind === 'diseno') { sum[x.kind] = (sum[x.kind] || 0) + L.examMin(x); cnt[x.kind] = (cnt[x.kind] || 0) + 1; }
  });
  var starts = {};   // section indexes where some theory step begins, per lecture: a span stops before the next one
  path.forEach(function (s) { if (s.type === 'theory') (starts[s.lecture] = starts[s.lecture] || []).push(s.idx); });
  path.forEach(function (s) {
    if (s.type === 'theory') {
      var secs = lm[s.lecture] ? lm[s.lecture].sections : [], sp = s.upto != null ? { from: s.idx, to: s.upto } : L.sectionSpan(secs, s.idx), to = sp.to;
      (starts[s.lecture] || []).forEach(function (i) { if (i > s.idx && i <= to) to = i - 1; });
      s.to = to; s.min = secs.length ? L.readMinutes(secs, sp.from, to) : 3;
    } else if (s.type === 'quiz') s.min = L.roundMin(Math.max(2, (s.n || 3) * 0.7));
    else if (s.type === 'ex') s.min = ex[s.key] ? L.exMinutes(ex[s.key].e, ex[s.key].exam) : 15;
    else s.min = L.roundMin((cnt[s.world] ? sum[s.world] / cnt[s.world] : 90) + 20);   // an exam of that world plus 20 min to mark it
  });
  return path;
};
/* "45 min", "2 h 05 min", "12 h". */
L.fmtMin = function (m) {
  m = Math.round(m);
  if (m < 60) return m + ' min';
  if (m >= 600) return Math.round(m / 60) + ' h';
  var h = Math.floor(m / 60), r = m % 60;
  return h + ' h' + (r ? ' ' + (r < 10 ? '0' : '') + r + ' min' : '');
};

/* ---------- settings kept with the progress ----------
   They live inside the progress, so a shared progress file carries them to the other profiles too. Anything missing or invalid gets its default. */
L.DAILY = [15, 30, 45, 60, 90, 120];
L.defaultCfg = function () {
  return {
    timer: false,     // stopwatch on exercises and quick checks
    extimer: true,    // clock in exams: countdown with the time the exam gives
    exauto: false,    // the exam ends by itself when the time is up
    exhints: false,   // hints while sitting an exam
    exans: false,     // solutions while sitting an exam
    daily: 30         // minutes of study a day
  };
};
L.normCfg = function (c) {
  var d = L.defaultCfg(); c = c && typeof c === 'object' ? c : {};
  Object.keys(d).forEach(function (k) {
    if (typeof d[k] === 'boolean') { if (typeof c[k] === 'boolean') d[k] = c[k]; }
    else { var n = Math.round(+c[k]); if (n >= 5 && n <= 480) d[k] = n; }
  });
  return d;
};

/* ---------- activity log ----------
   Entries: { t: 'YYYY-MM-DD', at: ms, ty: ex|quiz|exam|theory|skip, k: id, label, r?: 0-2, xp, m: estimated minutes, sec?: seconds (stopwatch on), help?: n }.
   Older entries only have t, k, label, r and xp. */
L.logKind = function (l) {
  if (l.ty) return l.ty;
  var k = String(l.k || '');
  return k.indexOf('exam/') === 0 ? 'exam' : k.indexOf('q:') === 0 ? 'quiz' : k.indexOf('t:') === 0 ? 'theory' : 'ex';
};
/* Minutes an entry counts for: the time measured when there is one (at most twice the estimate, so a forgotten tab does not count for hours), else the estimate. */
L.logMinutes = function (l) {
  var est = +l.m || 10;
  return l.sec > 0 ? Math.min(l.sec / 60, 2 * est) : est;
};
L.dayTotals = function (entries) {
  var t = { n: 0, xp: 0, min: 0, sec: 0, timed: 0 };
  entries.forEach(function (l) { if (l.ty === 'skip') return; t.n++; t.xp += +l.xp || 0; t.min += L.logMinutes(l); if (l.sec > 0) { t.sec += l.sec; t.timed++; } });
  t.xp = Math.round(t.xp * 10) / 10;
  return t;
};

/* ---------- plan for today ----------
   o = { goal: minutes, today: 'YYYY-MM-DD', log, due: [{ id, min }] reviews due, steps: [step with .min] next undone steps of the route, in order }.
   What was already done today counts towards the goal. The rest is filled with a few reviews (at most ~40%, at least one) and then the next
   steps of the route until the time is covered. When the goal is reached the plan is empty (met). */
L.dailyPlan = function (o) {
  var done = 0, n = 0;
  (o.log || []).forEach(function (l) { if (l.t === o.today && l.ty !== 'skip') { done += L.logMinutes(l); n++; } });
  done = Math.round(done);
  var left = o.goal - done;
  if (left <= 0) return { goal: o.goal, done: done, n: n, left: 0, met: true, reviews: [], steps: [], min: 0 };
  var reviews = [], steps = [], used = 0, revCap = left * 0.4;
  (o.due || []).forEach(function (d) { if (!reviews.length || used + d.min <= revCap) { reviews.push(d); used += d.min; } });
  (o.steps || []).forEach(function (s) { if (used < left) { steps.push(s); used += s.min || 0; } });
  return { goal: o.goal, done: done, n: n, left: left, met: false, reviews: reviews, steps: steps, min: used };
};

/* ---------- exams ----------
   XP of a sitting: up to 20, in proportion to the points obtained. Help used while sitting costs like in the exercises: a hint 25%, a solution 75% of that exercise's share. */
L.HELP_COST = { hint: 1, sol: 3 };
L.examXp = function (ids, scores, points, help) {
  var got = 0, mx = 0;
  ids.forEach(function (id) {
    var h = help && help[id] ? (help[id].hint ? L.HELP_COST.hint : 0) + (help[id].sol ? L.HELP_COST.sol : 0) : 0;
    got += (scores[id] || 0) * Math.max(0.25, 1 - 0.25 * h); mx += points[id];
  });
  return mx ? Math.round(got / mx * 20 * 10) / 10 : 0;
};

/* ---------- study without paper ----------
   What a laptop alone can do besides the route's readings and quick checks: a mixed test drawn from the quick-check questions, and putting the
   steps of a worked solution back in order. */
L.shuffle = function (arr, rnd) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
};
/* A shuffle that is never the original order (when there is more than one item). */
L.shuffleNot = function (arr, rnd) {
  var a = L.shuffle(arr, rnd), same = function () { return a.every(function (x, i) { return x === arr[i]; }); };
  for (var k = 0; arr.length > 1 && same() && k < 20; k++) a = L.shuffle(arr, rnd);
  if (arr.length > 1 && same()) a = arr.slice(1).concat(arr.slice(0, 1));
  return a;
};
/* n questions for a mixed test: one from each reading in turn (readings in random order), so no reading dominates. Options are re-shuffled. */
L.mixQuestions = function (quizzes, readings, n, rnd) {
  var per = L.shuffle(readings.filter(function (r) { return (quizzes[r] || []).length; }), rnd).map(function (r) {
    return { rid: r, qs: L.shuffle(quizzes[r].map(function (q, i) { return i; }), rnd) };
  }), out = [];
  for (var round = 0; out.length < n; round++) {
    var any = false;
    per.forEach(function (p) {
      if (out.length >= n || round >= p.qs.length) return;
      any = true;
      var q = quizzes[p.rid][p.qs[round]], idx = L.shuffle(q.options.map(function (o, i) { return i; }), rnd);
      out.push({ rid: p.rid, i: p.qs[round], q: q.q, why: q.why, options: idx.map(function (i) { return q.options[i]; }), answer: idx.indexOf(q.answer) });
    });
    if (!any) break;
  }
  return out;
};
/* Steps of a proposed solution written as "**Paso k.** text" or "**Paso k. Title.** text", without the number. null when there are fewer than 3 (nothing to order). */
L.orderPieces = function (sol) {
  var parts = String(sol || '').split(/\n(?=\*\*Paso \d+)/);
  if (parts.length < 3 || !parts.every(function (p) { return /^\*\*Paso \d+/.test(p); })) return null;
  return parts.map(function (p) { return p.replace(/^\*\*Paso \d+\.?\s*\*\*\s*/, '').replace(/^\*\*Paso \d+\.?\s+/, '**').trim(); });   // "**Paso 2.** text" -> "text"; "**Paso 2. Title.** text" -> "**Title.** text"
};
/* order[k] = the original position of the piece placed k-th. How many are where they belong. */
L.orderScore = function (order) { return order.filter(function (o, k) { return o === k; }).length; };

if (typeof module !== 'undefined' && module.exports) module.exports = L; else root.DYAA = L;
})(typeof window !== 'undefined' ? window : this);
