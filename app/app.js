(function () {
'use strict';
var L = window.DYAA, mdRender = window.mdRender;
var LECT = window.LECTURES || [], SK = window.SKILLS || [], EXAMS = window.EXAMS || [];
var STAGES = window.STAGES || [], WORLDS = window.WORLDS || {}, STAGE_EX = window.STAGE_EX || {};
var KEY = 'dyaa-practice-v1';
var RN = L.RN, RM = L.RM, BONUS = 15;
var $ = function (s) { return document.querySelector(s); };

/* ---------- utils ---------- */
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function today() { return L.dstr(); }
function fmt(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }
function enc(s) { return encodeURIComponent(s); }

/* ---------- state ---------- */
function blank() { return { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: {}, exams: {}, bonus: {} }; }
function norm(o) {
  var s = blank();
  if (o && typeof o === 'object') {
    s.ex = o.ex || {}; s.xp = +o.xp || 0; s.days = o.days || []; s.log = o.log || [];
    s.theory = o.theory || {}; s.skip = o.skip || {}; s.exams = o.exams || {}; s.bonus = o.bonus || {};
  }
  return s;
}
var S = blank();
function load() { try { S = norm(JSON.parse(localStorage.getItem(KEY))); } catch (e) { S = blank(); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
load();

/* ---------- model ---------- */
var skillById = {}; SK.forEach(function (s) { skillById[s.id] = s; });
var stageById = {}; STAGES.forEach(function (g, i) { g.n = i + 1; stageById[g.id] = g; });
var ALL = [];
EXAMS.forEach(function (ex) { (ex.exercises || []).forEach(function (e) { ALL.push({ key: ex.id + '/' + e.id, exam: ex, e: e }); }); });
var byKey = {}; ALL.forEach(function (a) { byKey[a.key] = a; });
var PATH = L.annotateMinutes(L.buildPath(STAGES, STAGE_EX, LECT), LECT, EXAMS);
var stepById = {}; PATH.forEach(function (s, i) { s.i = i; stepById[s.id] = s; });
var LECMIN = {}; LECT.forEach(function (l) { LECMIN[l.id] = L.readMinutes(l.sections, 0, l.sections.length - 1); });
var XKIND = { analisis: 'análisis', diseno: 'diseño', adic: 'adicional', ejs: 'adicional' };

function pts(a) { return a.e.points == null ? 2 : a.e.points; }
function last(key) { return L.lastRating(S, key); }
function mastery(sid) {
  var list = ALL.filter(function (a) { return (a.e.skills || []).indexOf(sid) >= 0; });
  if (!list.length) return 0;
  var t = 0; list.forEach(function (a) { var r = last(a.key); if (r != null) t += RM[r]; });
  return t / list.length;
}
function level() { return L.level(S.xp); }
function streak() { return L.streak(S.days, today()); }
/* Streak flame: lit (accent colour) once something was done today, dim while the streak is at risk, off at zero. */
var FLAME = '<svg viewBox="0 0 24 24"><path d="M12 2C12.3 5 15.5 6.6 15.6 10.4 16.9 9.5 17.7 8.2 17.8 6.8 19.9 8.8 21 11.2 21 13.8 21 18.3 17 22 12 22 7 22 3 18.3 3 13.8 3 10.7 4.7 8.3 6.6 6.6 6.8 8.2 7.6 9.4 8.9 10.2 8.4 7 9.8 4 12 2Z"/><path class="core" d="M12 22C9.6 22 8 20.4 8 18.4 8 16.5 9.4 15.4 10.5 13.6 11.3 14.8 11.9 15 12.6 14.3 13.9 15.4 16 16.4 16 18.4 16 20.4 14.4 22 12 22Z"/></svg>';
function flame(cls) { return '<span class="flame' + (cls ? ' ' + cls : '') + '" aria-hidden="true">' + FLAME + '</span>'; }
function streakState() { var n = streak(); return S.days.indexOf(today()) >= 0 ? 'on' : n > 0 ? 'risk' : 'off'; }
function streakTitle() {
  var n = streak(), d = n + (n === 1 ? ' d\u00eda' : ' d\u00edas'), st = streakState();
  return st === 'on' ? 'Racha: ' + d + '. Hoy ya has estudiado.' : st === 'risk' ? 'Racha: ' + d + '. Haz algo hoy para no perderla.' : 'Sin racha. Haz un paso de la ruta para empezarla.';
}
function streakHtml() { return '<span class="streak ' + streakState() + '" title="' + streakTitle() + '">' + flame() + '<b>' + streak() + '</b></span>'; }
/* Estimated time ("~12 min"), in a tag. */
function mins(m) { return '~' + L.fmtMin(m); }
function minTag(m) { return '<span class="tag min" title="Estimaci&oacute;n orientativa para estudiar y comprobar, no para el examen">' + mins(m) + '</span>'; }
function minsOf(steps) { return steps.reduce(function (t, x) { return t + (x.min || 0); }, 0); }
function nextSteps(n) { return L.nextSteps(PATH, S, EXAMS, n); }
function progress(stage) { return L.stageProgress(PATH, S, EXAMS, stage); }
function touchDay() { var t = today(); if (S.days.indexOf(t) < 0) S.days.push(t); }

var NOTE = '';
/* Awards the one-time stage bonus for every stage that is now fully done. Call after any change of progress. */
function awardAll() {
  var got = [];
  STAGES.forEach(function (g) {
    var p = progress(g.id);
    if (p.total && p.done === p.total && !S.bonus[g.id]) { S.bonus[g.id] = true; S.xp = Math.round((S.xp + BONUS) * 10) / 10; got.push(g); }
  });
  if (got.length) NOTE = flame('sm') + ' &iexcl;Etapa completada! ' + got.map(function (g) { return esc(g.title); }).join(', ') + ' (+' + BONUS * got.length + ' XP)';
  return got;
}

function rate(key, r, hints) {
  var a = byKey[key], t = today();
  var xp = L.xpFor(pts(a), hints, r);
  S.ex[key] = L.applyRating(S.ex[key], r, hints, xp, t);
  S.xp = Math.round((S.xp + xp) * 10) / 10; touchDay();
  S.log.push({ t: t, k: key, label: a.exam.title + ' · ' + a.e.title, r: r, xp: xp });
  if (S.log.length > 300) S.log.shift();
  var got = awardAll();
  save();
  NOTE = '';
  return { xp: xp, bonus: got[0] || null };
}

/* ---------- views ---------- */
var timerId = null, V = {}, F = { stage: '', exam: '', skill: '', kind: '', status: '' }, X = null;
function stopTimers() { if (timerId) clearInterval(timerId); timerId = null; }
function startTimer(fn) { stopTimers(); fn(); timerId = setInterval(fn, 1000); }
function missingBanner() {
  return window.EXAMS_MISSING || !EXAMS.length ? '<div class="warnbox">Datos de examen no encontrados (<code>data-exams.js</code>). Ejecuta <code>python3 tools/build.py</code>. Solo la teor&iacute;a est&aacute; disponible.</div>' : '';
}
function theoryLinks(sid) {
  var s = skillById[sid]; if (!s) return '';
  return (s.theory || []).map(function (t) {
    var li = LECT.findIndex(function (l) { return l.id === t.lecture; });
    if (li < 0) return '';
    var si = LECT[li].sections.findIndex(function (x) { return x.title.indexOf(t.section) >= 0; });
    return '<a href="#/teoria/' + enc(t.lecture) + '/' + Math.max(0, si) + '">' + esc(t.section) + '</a>';
  }).filter(Boolean).join(' · ');
}
function exTitle(a) {
  var n = a.e.n != null ? a.e.n : a.e.id, t = a.e.title || '', same = !t || t === 'Ejercicio ' + n;
  return esc(a.exam.title) + ' &middot; ' + (same ? 'ejercicio ' : '') + esc(n) + (same ? '' : ' ' + esc(t));
}
function status(key) { var r = last(key); return r == null ? '<span class="tag">nuevo</span>' : '<span class="tag r' + r + '">' + RN[r] + '</span>'; }
function dueTag(key) { var x = S.ex[key]; return x && x.due && x.due <= today() ? '<span class="tag due">repasar</span>' : ''; }
function stepHref(st) {
  if (st.type === 'ex') return '#/ejercicios/' + enc(st.key);
  if (st.type === 'theory') return '#/teoria/' + enc(st.lecture) + '/' + st.idx + '/' + enc(st.id);
  return '#/examen';
}
function stepLabel(st) {
  if (st.type === 'ex') return exTitle(byKey[st.key]);
  if (st.type === 'theory') return '&#128214; Leer: ' + esc(st.label);
  return '&#127937; ' + esc(st.label);
}
function stepRow(st, cur) {
  var done = L.stepDone(st, S, EXAMS), mark = done ? '<span class="chk">&#10003;</span>' : '<span class="chk o">&#9675;</span>';
  var tags = '';
  if (st.type === 'ex') {
    var a = byKey[st.key];
    tags = (done ? status(st.key) : '') + dueTag(st.key) + (a.e.solution ? '<span class="tag">con soluci&oacute;n</span>' : '') + '<span class="tag">' + (a.e.src === 'adic' ? 'adicional' : 'examen') + '</span>';
  } else if (S.skip[st.id]) tags = '<span class="tag">saltado</span>';
  tags += minTag(st.min);
  return '<a class="item step' + (done ? ' done' : '') + (cur ? ' cur' : '') + '" href="' + stepHref(st) + '"><span>' + mark + ' ' + stepLabel(st) + '</span><span>' + tags + '</span></a>';
}
function exRow(a) {
  return '<a class="item" href="#/ejercicios/' + enc(a.key) + '"><span><b>' + exTitle(a) + '</b> <span class="tag">' + esc(XKIND[a.e.kind] || a.e.kind) + '</span> <span class="tag">' + esc((stageById[a.e.stage] || {}).title || '') + '</span></span><span>' + status(a.key) + dueTag(a.key) + minTag((stepById['e:' + a.key] || {}).min || 15) + '</span></a>';
}
function nextCard(extra) {
  var n = nextSteps(1)[0];
  if (!n) return '<div class="card">&#127881; Has completado toda la ruta. Sigue repasando lo pendiente en <a href="#/hoy">Hoy</a>.</div>';
  var g = stageById[n.stage];
  return '<div class="card next"><div class="muted">Siguiente en la ruta &middot; Etapa ' + g.n + ': ' + esc(g.title) + '</div><div class="big">' + stepLabel(n) + '</div><div class="muted">' + mins(n.min) + ' estimados</div><div class="row"><a class="btn pri" href="' + stepHref(n) + '">Continuar &rarr;</a>' + (extra || '') + '</div></div>';
}

function vHoy() {
  var t = today(), h = '<h2>Misi&oacute;n de hoy</h2>' + missingBanner();
  var lv = level(), lo = (lv - 1) * (lv - 1) * 10, hi = lv * lv * 10, pct = Math.round((S.xp - lo) / (hi - lo) * 100);
  h += '<div class="card row"><span>Nivel <b>' + lv + '</b></span><div class="bar"><i style="width:' + pct + '%"></i></div><span class="muted">' + S.xp + ' / ' + hi + ' XP</span><span>' + streakHtml() + ' <span class="muted">d&iacute;as de racha</span></span></div>';
  var due = L.dueKeys(ALL.map(function (a) { return a.key; }), S, t);
  if (due.length) {
    h += '<h3>Repaso pendiente (' + due.length + ')</h3>';
    due.slice(0, 3).forEach(function (k) { h += exRow(byKey[k]); });
  }
  if (EXAMS.length || LECT.length) {
    h += '<h3>Ruta</h3>' + nextCard();
    var more = nextSteps(4).slice(1);
    more.forEach(function (st) { h += stepRow(st); });
    var four = nextSteps(4), all = L.pathMinutes(PATH, S, EXAMS);
    h += '<p class="muted">Estos ' + four.length + ' pasos: ' + mins(minsOf(four)) + ' &middot; quedan ' + mins(all.left) + ' en toda la ruta.</p>';
    h += '<p><a href="#/ruta">Ver toda la ruta &rarr;</a></p>';
  }
  return h;
}

function vRoad() {
  var h = '<h2>Ruta de estudio</h2>' + missingBanner() + '<p class="muted">Un orden recomendado, sin bloqueos: puedes entrar en cualquier paso. Cada etapa empieza con la teor&iacute;a, sigue con ejercicios de f&aacute;ciles a dif&iacute;ciles y los de enunciado con soluci&oacute;n est&aacute;n marcados.</p>';
  var n = nextSteps(1)[0], tot = L.pathMinutes(PATH, S, EXAMS);
  h += '<p class="muted">Ruta completa: ' + mins(tot.total) + ' estimados &middot; quedan ' + mins(tot.left) + '. Son tiempos orientativos para estudiar y comprobar cada paso.</p>';
  h += nextCard();
  var world = null;
  STAGES.forEach(function (g) {
    if (g.world !== world) { world = g.world; h += '<h3>' + esc(WORLDS[world] || world) + '</h3>'; }
    var p = progress(g.id), pct = p.total ? Math.round(p.done / p.total * 100) : 0, open = n && n.stage === g.id;
    h += '<details class="stage"' + (open ? ' open' : '') + '><summary><b>Etapa ' + g.n + '. ' + esc(g.title) + '</b> <span class="bar sm"><i style="width:' + pct + '%"></i></span> <span class="muted">' + p.done + '/' + p.total + (p.left ? ' &middot; quedan ' + mins(p.left) : '') + '</span>' + (S.bonus[g.id] ? ' ' + flame('sm') : '') + '</summary><p class="muted">' + esc(g.blurb) + ' Tiempo estimado de la etapa: ' + mins(p.min) + '.</p>';
    var groups = [], cur = null;
    PATH.filter(function (s) { return s.stage === g.id; }).forEach(function (st) {
      var grp = st.type === 'theory' ? 'Teor&iacute;a' : st.type === 'exam' ? 'Checkpoint' : byKey[st.key].e.src === 'adic' ? 'Calentamiento: ejercicios adicionales' : 'Nivel examen: ejercicios de ex&aacute;menes anteriores';
      if (!cur || cur.name !== grp) { cur = { name: grp, steps: [] }; groups.push(cur); }
      cur.steps.push(st);
    });
    groups.forEach(function (gr) {
      h += '<div class="sub">' + gr.name + ' <span class="t">&middot; ' + mins(minsOf(gr.steps)) + '</span></div>';
      gr.steps.forEach(function (st) { h += stepRow(st, n && n.id === st.id); });
    });
    h += '</details>';
  });
  return h;
}

function vList() {
  var h = '<h2>Ejercicios</h2>' + missingBanner();
  function sel(name, opts) { return '<select data-f="' + name + '"><option value="">' + name + ': todos</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (F[name] === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  h += '<div class="row card">' + sel('stage', STAGES.map(function (g) { return [g.id, g.n + '. ' + g.title]; })) + sel('exam', EXAMS.map(function (e) { return [e.id, e.title]; })) + sel('skill', SK.map(function (s) { return [s.id, s.label]; })) +
    sel('kind', [['analisis', 'análisis'], ['diseno', 'diseño'], ['ejs', 'adicionales']]) +
    sel('status', [['new', 'nuevo'], ['due', 'repasar hoy'], ['0', 'Fallé'], ['1', 'Dudoso'], ['2', 'Dominado']]) + '</div>';
  var t = today();
  var list = ALL.filter(function (a) {
    if (F.stage && a.e.stage !== F.stage) return false;
    if (F.exam && a.exam.id !== F.exam) return false;
    if (F.skill && (a.e.skills || []).indexOf(F.skill) < 0) return false;
    if (F.kind && a.e.kind !== F.kind) return false;
    var s = F.status, r = last(a.key);
    if (s === 'new') return r == null;
    if (s === 'due') return S.ex[a.key] && S.ex[a.key].due <= t;
    if (s) return r === +s;
    return true;
  });
  list.sort(function (a, b) { var x = stepById['e:' + a.key], y = stepById['e:' + b.key]; return (x ? x.i : 1e9) - (y ? y.i : 1e9); });
  h += '<p class="muted">' + list.length + ' ejercicios, en orden de ruta &middot; ' + mins(list.reduce(function (t, a) { return t + ((stepById['e:' + a.key] || {}).min || 0); }, 0)) + ' en total.</p>';
  h += list.map(exRow).join('') || '<p class="muted">Sin resultados.</p>';
  return h;
}

function vDetail(key) {
  var a = byKey[key];
  if (!a) return '<p>Ejercicio no encontrado. <a href="#/ejercicios">Volver</a></p>';
  if (V.key !== key) V = { key: key, hints: 0, started: null, self: false, done: null };
  var e = a.e, sol = e.solution, hasSol = sol != null && String(sol).trim() !== '', st = stepById['e:' + key], pos = L.posInStage(PATH, key);
  var h = '<p><a href="#/ruta">&larr; Ruta</a> &middot; <a href="#/ejercicios">Ejercicios</a></p>';
  if (pos) h += '<p class="muted">Etapa ' + stageById[pos.stage].n + ': ' + esc(stageById[pos.stage].title) + ' &middot; ejercicio ' + pos.n + ' de ' + pos.of + '</p>';
  h += '<div class="card"><h2>' + exTitle(a) + '</h2>' +
    '<div class="muted">' + esc(XKIND[e.kind] || e.kind) + (e.points != null ? ' &middot; ' + e.points + ' pts' : '') + ' &middot; ' + mins(st ? st.min : L.exMinutes(e, a.exam)) + ' estimados</div>' + mdRender(e.statement) + '</div>';
  h += '<div class="card row"><span class="timer" id="tm"></span> <button class="btn" data-act="timer">' + (V.started ? 'Reiniciar cron&oacute;metro' : 'Iniciar cron&oacute;metro') + '</button></div>';
  if (V.hints >= 1) h += '<div class="card"><b>Pista 1.</b> Habilidad: ' + (e.skills || []).map(function (id) { return esc(skillById[id] ? skillById[id].label : id) + ' (' + (theoryLinks(id) || 'sin teor&iacute;a') + ')'; }).join('; ') + '</div>';
  if (V.hints >= 2 && hasSol) h += '<div class="card"><b>Pista 2.</b>' + mdRender(String(sol).split('\n').filter(function (l) { return l.trim(); }).slice(0, 3).join('\n')) + '</div>';
  if (V.hints >= 3) h += hasSol ? '<div class="card"><b>Soluci&oacute;n.</b>' + mdRender(sol) + '</div>' : '<div class="warnbox">Sin soluci&oacute;n oficial: compara con tus apuntes o con la teor&iacute;a.</div>';
  var maxH = hasSol ? 3 : 1, canRate = hasSol ? V.hints >= 3 : V.self;
  if (V.done != null) {
    var nx = st ? L.nextAfter(PATH, S, EXAMS, st.id) : null;
    h += '<div class="card">Registrado: <b>+' + V.done.xp + ' XP</b>.' + (V.done.bonus ? ' ' + flame('sm') + ' <b>&iexcl;Etapa completada!</b> ' + esc(V.done.bonus.title) + ' (+' + BONUS + ' XP extra)' : '') + '</div>';
    h += '<div class="card row">' + (nx ? '<a class="btn pri" href="' + stepHref(nx) + '">Siguiente en la ruta &rarr;</a><span class="muted">' + stepLabel(nx) + '</span>' : '<span>&#127881; Ruta completada.</span>') + ' <a class="btn" href="#/ejercicios">Ver ejercicios</a></div>';
  } else if (canRate) {
    h += '<div class="card row">&iquest;C&oacute;mo te fue? ' + RN.map(function (n, i) { return '<button class="btn ' + ['bad', 'warn', 'ok'][i] + '" data-act="rate" data-r="' + i + '">' + n + '</button>'; }).join('') + '</div>';
  } else {
    h += '<div class="row">';
    if (V.hints < maxH) h += '<button class="btn" data-act="hint">Mostrar pista (' + (V.hints + 1) + '/' + maxH + ')</button>';
    if (!hasSol) h += '<span class="muted">Sin soluci&oacute;n oficial.</span>';
    if (!hasSol && V.hints >= 1) h += '<button class="btn pri" data-act="self">Ya lo comprob&eacute; por mi cuenta</button>';
    h += '</div>';
  }
  if (st && V.done == null && !L.stepDone(st, S, EXAMS)) h += '<p><button class="btn" data-act="skip" data-step="' + esc(st.id) + '">Saltar este ejercicio por ahora</button></p>';
  return h;
}

function examPts(ex) { return L.examPts(ex); }
function examMin(ex) { return L.examMin(ex); }
function examSols(ex) { return ex.exercises.filter(function (e) { return e.solution; }).length; }

function vExam() {
  if (!EXAMS.length) return '<h2>Examen</h2>' + missingBanner();
  if (!X) {
    var h = '<h2>Simulador de examen</h2><p class="muted">Cualquier examen est&aacute; disponible. Los que tienen soluci&oacute;n oficial se auto-corrigen mejor; el recomendado es el siguiente sin hacer.</p>';
    ['analisis', 'diseno', 'mixto'].forEach(function (kind) {
      var list = EXAMS.filter(function (e) { return e.kind === kind && (e.exercises || []).length; });
      list.sort(function (a, b) { return (!!S.exams[a.id] - !!S.exams[b.id]) || (examSols(b) / b.exercises.length - examSols(a) / a.exercises.length) || (a.id < b.id ? -1 : 1); });
      var rec = list.find(function (e) { return !S.exams[e.id] && examSols(e); }) || list.find(function (e) { return !S.exams[e.id]; });
      if (!list.length) return;
      h += '<h3>' + (kind === 'analisis' ? 'An&aacute;lisis' : kind === 'diseno' ? 'Dise&ntilde;o' : 'Completos (an&aacute;lisis y dise&ntilde;o)') + '</h3>';
      list.forEach(function (ex) {
        var d = S.exams[ex.id];
        h += '<div class="item"><span>' + esc(ex.title) + ' <span class="muted">' + examMin(ex) + ' min &middot; ' + examSols(ex) + '/' + ex.exercises.length + ' con soluci&oacute;n</span>' + (d ? ' <span class="tag r' + (d.grade >= 7 ? 2 : d.grade >= 4 ? 1 : 0) + '">' + d.grade.toFixed(1) + '/10</span>' : '') + (ex === rec ? ' <span class="tag due">recomendado</span>' : '') + '</span><button class="btn pri" data-act="exstart" data-id="' + esc(ex.id) + '">' + (d ? 'Repetir' : 'Empezar') + '</button></div>';
      });
    });
    return h;
  }
  var ex = X.ex, hh = '<h2>' + esc(ex.title) + '</h2>';
  if (X.phase === 'run') {
    hh += '<div class="card row"><span class="timer" id="tm"></span><button class="btn pri" data-act="exend">Terminar</button><button class="btn" data-act="exquit">Abandonar</button></div>';
    ex.exercises.forEach(function (e) { hh += '<div class="card"><b>' + esc(e.n != null ? e.n : e.id) + '. ' + esc(e.title || '') + '</b> <span class="muted">' + X.p[e.id].toFixed(1) + ' pts</span>' + mdRender(e.statement) + '</div>'; });
    return hh;
  }
  if (X.phase === 'review') {
    var e = ex.exercises[X.i], mx = X.p[e.id];
    hh += '<p class="muted">Ejercicio ' + (X.i + 1) + ' de ' + ex.exercises.length + '</p><div class="card"><b>' + esc(e.title || '') + '</b>' + mdRender(e.statement) + '</div>';
    hh += e.solution ? '<div class="card"><b>Soluci&oacute;n</b>' + mdRender(e.solution) + '</div>' : '<div class="warnbox">Sin soluci&oacute;n oficial.</div>';
    hh += '<div class="card row">Tu nota (0 a ' + mx.toFixed(1) + '): <input type="number" id="sc" min="0" max="' + mx + '" step="0.25" value="0"> <button class="btn pri" data-act="exnext">' + (X.i + 1 < ex.exercises.length ? 'Siguiente' : 'Finalizar') + '</button></div>';
    return hh;
  }
  var tot = 0, mxs = 0; ex.exercises.forEach(function (e) { tot += X.s[e.id] || 0; mxs += X.p[e.id]; });
  var g = Math.round(tot / mxs * 100) / 10, nx = nextSteps(1)[0];
  return hh + '<div class="card"><h3>Nota: ' + g.toFixed(1) + ' / 10</h3><p>+' + X.xp + ' XP</p><div class="row"><button class="btn" data-act="exquit">Cerrar</button>' + (nx ? '<a class="btn pri" href="' + stepHref(nx) + '" data-act="exquit">Siguiente en la ruta &rarr;</a>' : '') + '</div></div>';
}

function vTheory(lid, idx, stepId) {
  var h = '<h2>Teor&iacute;a</h2>';
  if (!LECT.length) return h + '<div class="warnbox">No se encontr&oacute; <code>data-lectures.js</code>.</div>';
  var cur = LECT.find(function (l) { return l.id === lid; }) || LECT[0], st = stepId && stepById[stepId];
  h += '<div class="theory"><div class="side">' + LECT.map(function (l) { return '<a href="#/teoria/' + enc(l.id) + '"' + (l === cur ? ' class="on"' : '') + '>' + esc(l.title) + '<br><span class="muted">~' + L.fmtMin(LECMIN[l.id]) + ' de lectura</span></a>'; }).join('') + '</div><div>';
  h += '<h2>' + esc(cur.title) + '</h2>';
  var here = st && st.lecture === cur.id && String(st.idx) === String(idx), cardAt = here ? (st.to != null ? st.to : +idx) : -1;
  cur.sections.forEach(function (s, i) {
    var lv = Math.min(6, 3 + Math.max(0, (s.level || 1) - 1));
    var card = '';
    if (i === cardAt) {   // after the last section the step covers, so it is not confirmed before reading it
      var done = L.stepDone(st, S, EXAMS);
      card = '<div class="card next row"><span>&#128214; Paso de la ruta (etapa ' + stageById[st.stage].n + ') &middot; ' + mins(st.min) + ' de lectura: &iquest;lo has le&iacute;do?</span><button class="btn pri" data-act="theorydone" data-step="' + esc(st.id) + '">' + (done ? 'Continuar &rarr;' : 'Le&iacute;do, continuar &rarr;') + '</button></div>';
    }
    h += '<section class="sec" id="sec-' + i + '">' + (i === 0 && s.title === cur.title ? '' : '<h' + lv + '>' + esc(s.title) + '</h' + lv + '>') + mdRender(s.md) + card + '</section>';
  });
  return h + '</div></div>';
}

function vProgress() {
  var h = '<h2>Progreso</h2><div class="card row">XP <b>' + S.xp + '</b> &middot; Nivel <b>' + level() + '</b> &middot; ' + streakHtml() + ' d&iacute;as de racha &middot; quedan ' + mins(L.pathMinutes(PATH, S, EXAMS).left) + ' de ruta</div><h3>Ruta por etapas</h3>';
  STAGES.forEach(function (g) {
    var p = progress(g.id), pct = p.total ? Math.round(p.done / p.total * 100) : 0;
    h += '<div class="row" style="margin-bottom:8px"><span style="width:300px;max-width:100%">' + g.n + '. ' + esc(g.title) + (S.bonus[g.id] ? ' ' + flame('sm') : '') + '</span><div class="bar"><i style="width:' + pct + '%"></i></div><span class="muted">' + p.done + '/' + p.total + (p.left ? ' &middot; ' + mins(p.left) : '') + '</span></div>';
  });
  h += '<h3>Dominio por habilidad</h3><p class="muted">Porcentaje de ejercicios de la habilidad cuya &uacute;ltima valoraci&oacute;n fue Dominado (Dudoso cuenta la mitad).</p>';
  SK.forEach(function (s) {
    var m = mastery(s.id);
    h += '<div class="row" style="margin-bottom:8px"><span style="width:300px;max-width:100%">' + esc(s.label) + '</span><div class="bar"><i style="width:' + Math.round(m * 100) + '%"></i></div><span class="muted">' + Math.round(m * 100) + '%</span></div>';
  });
  h += '<h3>Historial</h3>' + (S.log.slice(-30).reverse().map(function (l) { return '<div class="item"><span>' + esc(l.label) + '</span><span><span class="tag r' + l.r + '">' + RN[l.r] + '</span> +' + l.xp + ' XP &middot; ' + esc(l.t) + '</span></div>'; }).join('') || '<p class="muted">A&uacute;n nada.</p>');
  return h;
}

function vSettings() {
  return '<h2>Datos</h2><div class="card"><p>El tema y el color de acento se cambian con el engranaje de la barra superior.</p><p>Tu progreso se guarda en este navegador. Exporta una copia para no perderlo o llevarlo a otro navegador.</p><div class="row"><button class="btn" data-act="export">Exportar JSON</button><label class="btn">Importar JSON<input type="file" id="imp" accept="application/json" hidden></label><button class="btn bad" data-act="reset">Reiniciar progreso</button></div><div id="io"></div></div>';
}

/* ---------- settings popover (top bar, right): theme and accent colour ---------- */
var TH = window.DYAA_THEME, LOGO = window.DYAA_LOGO;
var MODE_LABEL = { system: 'Sistema', light: 'Claro', dark: 'Oscuro' };
function popEl() { return $('#settings-pop'); }
function renderPop() {
  var pop = popEl(); if (!pop || !TH) return;
  var mode = TH.mode(), acc = TH.accent(), cur = TH.hex(TH.current()), keep = document.activeElement;
  pop.innerHTML = '<div class="pop-title">Ajustes</div>' +
    '<div class="pop-row"><span class="muted">Tema</span><div class="segs" role="radiogroup" aria-label="Tema">' +
    TH.MODES.map(function (m) { return '<button type="button" class="seg' + (m === mode ? ' on' : '') + '" role="radio" aria-checked="' + (m === mode) + '" data-act="theme" data-m="' + m + '">' + MODE_LABEL[m] + '</button>'; }).join('') + '</div></div>' +
    '<div class="pop-block"><div class="pop-row"><span class="muted">Color de acento</span><button type="button" class="linkbtn" data-act="accent-reset">Autom&aacute;tico</button></div>' +
    '<div class="swatches"><button type="button" class="sw auto' + (!acc ? ' on' : '') + '" data-act="accent-reset" title="Autom&aacute;tico (seg&uacute;n el tema)" aria-label="Autom&aacute;tico"></button>' +
    TH.PRESETS.map(function (p) { return '<button type="button" class="sw' + (acc && acc.toLowerCase() === p[1] ? ' on' : '') + '" style="background:' + p[1] + '" data-act="accent-set" data-c="' + p[1] + '" title="' + p[0] + '" aria-label="' + p[0] + '"></button>'; }).join('') + '</div>' +
    '<div class="accentrow"><input type="color" class="accentpick" id="acc-pick" value="' + cur + '" aria-label="Elegir el color de acento"><input type="text" class="accenttext" id="acc-text" value="' + (acc ? esc(acc) : '') + '" placeholder="#c2410c, rgb(194 65 12), tomato&hellip;" spellcheck="false" autocomplete="off" aria-label="Color de acento como texto" title="Cualquier color CSS: #hex, rgb(), hsl() o un nombre"></div>' +
    '<div class="pop-note bad" id="acc-msg" hidden>Eso no es un color que CSS entienda.</div></div>' +
    '<div class="pop-note">El acento colorea botones, barras, la llama, el logo y el icono de la pesta&ntilde;a.</div>' +
    '<div class="pop-block"><a href="#/ajustes" data-act="settings-close">Datos: exportar, importar o reiniciar el progreso &rarr;</a></div>';
  if (keep && keep.dataset && keep.dataset.act) { var again = pop.querySelector('[data-act="' + keep.dataset.act + '"]' + (keep.dataset.m ? '[data-m="' + keep.dataset.m + '"]' : '') + (keep.dataset.c ? '[data-c="' + keep.dataset.c + '"]' : '')); if (again && again.focus) again.focus(); }
}
function setPop(open) {
  var pop = popEl(), btn = $('#settings'); if (!pop || !btn) return;
  if (open) renderPop();
  pop.hidden = !open; btn.setAttribute('aria-expanded', String(open));
}
function popOpen() { var pop = popEl(); return !!pop && !pop.hidden; }
function drawLogo() { var el = $('#logo'); if (el && LOGO) el.innerHTML = LOGO.svg('var(--ac)', 'var(--ac-ink)'); }
function colorInput(ev) {
  var t = ev.target, TH_ = TH; if (!TH_ || !t) return false;
  if (t.id === 'acc-pick') { TH_.setAccent(t.value); var x = document.getElementById('acc-text'); if (x) { x.value = t.value; x.classList.remove('bad'); } return true; }
  if (t.id === 'acc-text') {
    var v = String(t.value).trim(), msg = document.getElementById('acc-msg');
    if (!v) { TH_.setAccent(null); if (msg) msg.hidden = true; t.classList.remove('bad'); return true; }
    var c = TH_.parse(v);
    t.classList.toggle('bad', !c); if (msg) msg.hidden = !!c;
    if (c) { TH_.setAccent(v); var p = document.getElementById('acc-pick'); if (p) p.value = TH_.hex(c); }
    return true;
  }
  return false;
}

/* ---------- router ---------- */
function stats() { $('#stats').innerHTML = streakHtml() + '<span>XP <b>' + S.xp + '</b> &middot; Nv <b>' + level() + '</b></span>'; }
function route() {
  stopTimers();
  var p = (location.hash || '#/hoy').slice(2).split('/').map(decodeURIComponent), tab = p[0] || 'hoy', h;
  if (tab !== 'ejercicios') V = {};
  if (tab === 'ejercicios') h = p[1] ? vDetail(p.slice(1).join('/')) : vList();
  else if (tab === 'ruta') h = vRoad();
  else if (tab === 'examen') h = vExam();
  else if (tab === 'teoria') h = vTheory(p[1], p[2], p[3]);
  else if (tab === 'progreso') h = vProgress();
  else if (tab === 'ajustes') h = vSettings();
  else { tab = 'hoy'; h = vHoy(); }
  if (NOTE && tab !== 'ejercicios') { h = '<div class="card next">' + NOTE + '</div>' + h; NOTE = ''; }
  $('#app').innerHTML = h; stats();
  Array.prototype.forEach.call(document.querySelectorAll('#nav a'), function (a) { a.classList.toggle('on', a.dataset.tab === tab); });
  if (tab === 'teoria' && p[2] != null) { var el = document.getElementById('sec-' + p[2]); if (el) { el.scrollIntoView(); el.classList.add('flash'); } }
  else window.scrollTo(0, 0);
  if (tab === 'ejercicios' && p[1] && V.started) startTimer(function () { var t = $('#tm'); if (t) t.textContent = fmt((Date.now() - V.started) / 1000); });
  if (tab === 'examen' && X && X.phase === 'run') startTimer(function () { var t = $('#tm'); if (!t) return; var left = (X.end - Date.now()) / 1000; t.textContent = fmt(left); if (left <= 0) t.style.color = 'var(--bad)'; });
}
function rerender() { var y = window.scrollY; route(); window.scrollTo(0, y); }

/* ---------- events ---------- */
document.addEventListener('click', function (ev) {
  if (popOpen() && ev.target && ev.target.closest && !ev.target.closest('#settings-pop') && !ev.target.closest('#settings')) setPop(false);
  var lk = ev.target.closest('a[href^="#/"]');
  if (lk && lk.getAttribute && lk.getAttribute('href') === location.hash) setTimeout(route, 0);
  var b = ev.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT') return;
  var act = b.dataset.act;
  if (act === 'settings') { setPop(!popOpen()); return; }
  if (act === 'settings-close') { setPop(false); return; }
  if (act === 'theme') { if (TH) TH.setMode(b.dataset.m); renderPop(); return; }
  if (act === 'accent-set') { if (TH) TH.setAccent(b.dataset.c); renderPop(); return; }
  if (act === 'accent-reset') { if (TH) TH.setAccent(null); renderPop(); return; }
  if (act === 'hint') { V.hints++; rerender(); }
  else if (act === 'self') { V.self = true; rerender(); }
  else if (act === 'timer') { V.started = Date.now(); rerender(); }
  else if (act === 'rate') { V.done = rate(V.key, +b.dataset.r, Math.min(3, V.hints)); rerender(); }
  else if (act === 'skip') {
    var sid = b.dataset.step; S.skip[sid] = true; awardAll(); save();
    var nx = L.nextAfter(PATH, S, EXAMS, sid);
    location.hash = nx ? stepHref(nx) : '#/ruta'; if (!nx) route();
  }
  else if (act === 'theorydone') {
    var tid = b.dataset.step; S.theory[tid] = true; touchDay(); awardAll(); save();
    var nt = L.nextAfter(PATH, S, EXAMS, tid);
    location.hash = nt ? stepHref(nt) : '#/ruta'; route();
  }
  else if (act === 'exstart') {
    var ex = EXAMS.find(function (e) { return e.id === b.dataset.id; });
    X = { ex: ex, phase: 'run', end: Date.now() + examMin(ex) * 60000, p: examPts(ex), s: {}, i: 0 }; route();
  }
  else if (act === 'exend') { X.phase = 'review'; X.i = 0; route(); }
  else if (act === 'exnext') {
    var e = X.ex.exercises[X.i], v = parseFloat($('#sc').value) || 0;
    X.s[e.id] = Math.max(0, Math.min(X.p[e.id], v));
    if (++X.i >= X.ex.exercises.length) {
      var tot = 0, mx = 0; X.ex.exercises.forEach(function (q) { tot += X.s[q.id] || 0; mx += X.p[q.id]; });
      X.xp = Math.round(tot / mx * 20 * 10) / 10; X.phase = 'done'; S.xp = Math.round((S.xp + X.xp) * 10) / 10;
      var t = today(); touchDay();
      S.exams[X.ex.id] = { grade: Math.round(tot / mx * 100) / 10, t: t };
      S.log.push({ t: t, k: 'exam/' + X.ex.id, label: 'Examen ' + X.ex.title + ' (' + (tot / mx * 10).toFixed(1) + '/10)', r: tot / mx > 0.7 ? 2 : tot / mx > 0.4 ? 1 : 0, xp: X.xp });
      awardAll(); save();
    }
    route();
  }
  else if (act === 'exquit') { X = null; if (b.tagName !== 'A') route(); }
  else if (act === 'export') {
    var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'dyaa-progress.json'; a.click();
  }
  else if (act === 'reset') { if (confirm('¿Borrar todo el progreso?')) { S = blank(); save(); route(); } }
});
document.addEventListener('input', function (ev) { colorInput(ev); });
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && popOpen()) { setPop(false); var b = $('#settings'); if (b && b.focus) b.focus(); } });
document.addEventListener('change', function (ev) {
  var t = ev.target;
  if (t.dataset && t.dataset.f) { F[t.dataset.f] = t.value; route(); }
  else if (t.id === 'imp' && t.files[0]) {
    var r = new FileReader();
    r.onload = function () {
      try { var o = JSON.parse(r.result); if (!o || typeof o.ex !== 'object') throw 0; S = norm(o); save(); route(); $('#io').textContent = 'Importado.'; }
      catch (e) { $('#io').textContent = 'Archivo inválido.'; }
    };
    r.readAsText(t.files[0]);
  }
});
window.addEventListener('hashchange', route);
drawLogo();
route();
})();
