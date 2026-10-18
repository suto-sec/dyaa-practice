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
      path.push({ id: 't:' + g.id + ':' + i, type: 'theory', stage: g.id, label: title, lecture: t.lecture, idx: t.idx });
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
L.nextAfter = function (path, S, exams, stepId) {
  var at = path.findIndex(function (s) { return s.id === stepId; });
  for (var j = 1; j <= path.length; j++) {
    var s = path[(at + j) % path.length];
    if (s.id !== stepId && !L.stepDone(s, S, exams)) return s;
  }
  return null;
};
L.stageProgress = function (path, S, exams, stageId) {
  var steps = path.filter(function (s) { return s.stage === stageId; }), done = 0;
  steps.forEach(function (s) { if (L.stepDone(s, S, exams)) done++; });
  return { done: done, total: steps.length };
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

if (typeof module !== 'undefined' && module.exports) module.exports = L; else root.DYAA = L;
})(typeof window !== 'undefined' ? window : this);
