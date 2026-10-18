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
L.buildPath = function (stages, stageEx, lectures) {
  var path = [];
  var lastOfWorld = {};
  stages.forEach(function (g) { lastOfWorld[g.world] = g.id; });
  stages.forEach(function (g) {
    (g.theory || []).forEach(function (t, i) {
      var li = (lectures || []).findIndex(function (l) { return l.id === t.lecture; });
      var title = li >= 0 && lectures[li].sections[t.idx] ? lectures[li].sections[t.idx].title : t.section;
      path.push({ id: 't:' + g.id + ':' + i, type: 'theory', stage: g.id, label: t.label || title, lecture: t.lecture, idx: t.idx, upto: t.upto });
    });
    (stageEx[g.id] || []).forEach(function (k) {
      path.push({ id: 'e:' + k, type: 'ex', stage: g.id, key: k });
    });
    if (lastOfWorld[g.world] === g.id) {
      path.push({ id: 'x:' + g.world, type: 'exam', stage: g.id, world: g.world,
        label: g.world === 'analisis' ? 'Simulacro: un examen completo de análisis' : 'Simulacro: un examen completo de diseño' });
    }
  });
  return path;
};
L.stepDone = function (step, S, exams) {
  if (S.skip && S.skip[step.id]) return true;
  if (step.type === 'theory') return !!(S.theory && S.theory[step.id]);
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
    } else if (s.type === 'ex') s.min = ex[s.key] ? L.exMinutes(ex[s.key].e, ex[s.key].exam) : 15;
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

if (typeof module !== 'undefined' && module.exports) module.exports = L; else root.DYAA = L;
})(typeof window !== 'undefined' ? window : this);
