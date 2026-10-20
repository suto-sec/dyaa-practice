(function () {
'use strict';
var L = window.DYAA, mdRender = window.mdRender;
var LECT = window.LECTURES || [], SK = window.SKILLS || [], EXAMS = window.EXAMS || [];
var STAGES = window.STAGES || [], WORLDS = window.WORLDS || {}, STAGE_EX = window.STAGE_EX || {}, STAGE_AT = window.STAGE_AT || {}, SUMM = window.SUMMARIES || {}, QUIZ = window.QUIZZES || {};
var KEY = 'dyaa-practice-v1';
var RN = L.RN, RM = L.RM, BONUS = 15;
var $ = function (s) { return document.querySelector(s); };

/* ---------- utils ---------- */
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function today() { return L.dstr(); }
function fmt(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }
/* A length of time read by a person: 2:30, 21:40, 1 h 20 min. */
function dur(sec) { sec = Math.max(0, Math.round(sec)); if (sec < 3600) return fmt(sec); var m = Math.round(sec / 60); return Math.floor(m / 60) + ' h ' + ('0' + m % 60).slice(-2) + ' min'; }
function enc(s) { return encodeURIComponent(s); }

/* ---------- state ---------- */
function blank() { return { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: {}, exams: {}, bonus: {}, quiz: {}, prac: {}, notes: {}, ver: 2, updated: 0, cfg: L.defaultCfg() }; }
function norm(o) {
  var s = blank();
  if (o && typeof o === 'object') {
    s.ex = o.ex || {}; s.xp = +o.xp || 0; s.days = o.days || []; s.log = o.log || [];
    s.theory = o.theory || {}; s.skip = o.skip || {}; s.exams = o.exams || {}; s.bonus = o.bonus || {}; s.quiz = o.quiz || {}; s.prac = o.prac || {}; s.notes = o.notes || {}; s.ver = +o.ver || 1; s.updated = +o.updated || 0; s.cfg = L.normCfg(o.cfg);
  }
  return s;
}
var S = blank();
/* Progress coming from outside (an import, the shared file): its settings are kept only if it has some, so an older file does not reset them. */
function adopt(o) { var keep = S.cfg, n = norm(o); if (!(o && o.cfg)) n.cfg = keep; return n; }
function load() { try { S = norm(JSON.parse(localStorage.getItem(KEY))); } catch (e) { S = blank(); } }
function store() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
function save() { S.updated = Math.max(Date.now(), S.updated + 1); store(); syncSoon(); }   // never older than what was adopted from the shared file, even if the other machine's clock runs ahead
load();

/* ---------- progress shared between browser profiles ----------
   The progress lives in this browser profile's storage, so every Chrome profile (and every browser) starts from zero. To share it, the
   user picks one JSON file once (the File System Access API, Chrome and Edge): it is read when the page opens or gets the focus and
   written after every change (always after reading it again, so a profile that saved in between is never overwritten blindly). Which side
   wins is decided by L.syncPlan; before this profile's progress is replaced a copy is kept. A browser asks for permission to edit the file
   again in a new session: the first click anywhere on the page asks for it, so it is one click and not a hunt for a button. */
var SYK = { on: 'dyaa-practice-sync', last: 'dyaa-practice-lastsync', bak: 'dyaa-practice-backup', ask: 'dyaa-practice-syncask' };
var SYNC = { handle: null, name: '', state: 'off', msg: '', timer: null, asked: false };   // state: off | needs (permission) | ok | error
function syncCan() { return !!(window.showSaveFilePicker && window.showOpenFilePicker && window.indexedDB); }
function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { } }
function idb(fn) {
  return new Promise(function (res, rej) {
    var r = window.indexedDB.open('dyaa-practice-sync', 1);
    r.onupgradeneeded = function () { r.result.createObjectStore('kv'); };
    r.onerror = function () { rej(r.error); };
    r.onsuccess = function () { var q = fn(r.result.transaction('kv', 'readwrite').objectStore('kv')); q.onsuccess = function () { res(q.result); }; q.onerror = function () { rej(q.error); }; };
  });
}
function syncPerm(ask) {
  var h = SYNC.handle, o = { mode: 'readwrite' };
  return h.queryPermission(o).then(function (p) { return p === 'granted' || !ask ? p : h.requestPermission(o); });
}
function syncWrite() {
  return SYNC.handle.createWritable().then(function (w) { return w.write(JSON.stringify(S, null, 1)).then(function () { return w.close(); }); })
    .then(function () { lsSet(SYK.last, String(S.updated)); SYNC.state = 'ok'; SYNC.msg = ''; });
}
function syncSoon() {
  if (!SYNC.handle || SYNC.state !== 'ok') return;
  clearTimeout(SYNC.timer);
  SYNC.timer = setTimeout(function () { syncRun(false).then(function (changed) { if (changed) route(); }); }, 400);   // reads first: if another profile saved meanwhile, that is resolved instead of overwritten
}
/* Reads the file and applies L.syncPlan. ask = true when it comes from a click (the browser may then ask for permission). Resolves to true if the progress shown changed. */
function syncRun(ask) {
  if (!SYNC.handle) return Promise.resolve(false);
  return syncPerm(ask).then(function (p) {
    if (p !== 'granted') { SYNC.state = 'needs'; return false; }
    return SYNC.handle.getFile().then(function (f) { return f.text(); }).then(function (txt) {
      var remote = null;
      try { remote = JSON.parse(txt); } catch (e) { }
      if (txt.trim() && (!remote || typeof remote.ex !== 'object')) { SYNC.state = 'error'; SYNC.msg = 'El archivo elegido no contiene un progreso de DyAA Practice.'; return false; }
      var plan = remote ? L.syncPlan(S, remote, +lsGet(SYK.last) || 0) : 'push';
      if (plan === 'conflict') plan = confirm('El progreso de este perfil (' + S.xp + ' XP) y el del archivo compartido (' + (+remote.xp || 0) + ' XP) han cambiado por separado.\n\nAceptar: usar el del archivo (se guarda una copia del de este perfil).\nCancelar: usar el de este perfil y sobrescribir el archivo.') ? 'pull' : 'push';
      if (plan === 'pull') {
        lsSet(SYK.bak, JSON.stringify(S));
        S = adopt(remote); migrate(); store(); lsSet(SYK.last, String(S.updated)); SYNC.state = 'ok'; SYNC.msg = '';
        return true;
      }
      if (plan === 'push') return syncWrite().then(function () { return false; });
      lsSet(SYK.last, String(S.updated)); SYNC.state = 'ok'; SYNC.msg = '';
      return false;
    });
  }).catch(function (e) {
    if (e && e.name === 'NotFoundError') { SYNC.state = 'missing'; SYNC.msg = ''; return false; }   // the remembered path is gone: another computer, or the file was moved
    SYNC.state = 'error'; SYNC.msg = String(e && e.message || e); return false;
  });
}
function syncUse(h) {
  SYNC.handle = h; SYNC.name = h.name || 'progreso.json';
  return idb(function (st) { return st.put(h, 'handle'); }).catch(function () { }).then(function () { lsSet(SYK.on, 'file'); lsSet(SYK.last, null); return syncRun(true); }).then(route);
}
function syncOff() {
  clearTimeout(SYNC.timer); SYNC.handle = null; SYNC.name = ''; SYNC.state = 'off'; SYNC.msg = '';
  lsSet(SYK.on, null); lsSet(SYK.last, null); lsSet(SYK.ask, 'no');
  return idb(function (st) { return st.delete('handle'); }).catch(function () { });
}
function syncStart() {
  if (lsGet(SYK.on) !== 'file' || !syncCan()) return;
  idb(function (st) { return st.get('handle'); }).then(function (h) {
    if (!h) { lsSet(SYK.on, null); return false; }
    SYNC.handle = h; SYNC.name = h.name; SYNC.state = 'needs';
    return syncRun(false);
  }).then(function () { route(); }).catch(function () { });
}

/* ---------- model ---------- */
var skillById = {}; SK.forEach(function (s) { skillById[s.id] = s; });
var stageById = {}; STAGES.forEach(function (g, i) { g.n = i + 1; stageById[g.id] = g; });
var ALL = [];
EXAMS.forEach(function (ex) { (ex.exercises || []).forEach(function (e) { ALL.push({ key: ex.id + '/' + e.id, exam: ex, e: e }); }); });
var byKey = {}; ALL.forEach(function (a) { byKey[a.key] = a; });
var PATH = L.annotateMinutes(L.buildPath(STAGES, STAGE_EX, LECT, STAGE_AT, QUIZ), LECT, EXAMS);
var stepById = {}; PATH.forEach(function (s, i) { s.i = i; stepById[s.id] = s; });
/* Readings used to be numbered per etapa ("t:sumatorios:0"); they are now named. Progress saved with the old ids is moved to the reading that
   contains the section the old step started at (roadmap.json "legacy_theory"). Runs once per saved progress (ver 2). */
function migrate() {
  if ((S.ver || 1) >= 2) return;
  var LEG = window.LEGACY_THEORY || {};
  ['theory', 'skip'].forEach(function (f) {
    Object.keys(S[f]).forEach(function (k) {
      var m = /^t:([a-z0-9]+):(\d+)$/.exec(k);
      if (!m) return;
      var t = LEG[m[1]] && LEG[m[1]][+m[2]];
      if (t && stepById['t:' + t]) S[f]['t:' + t] = true;
      delete S[f][k];
    });
  });
  S.ver = 2; store();
}
migrate();
/* Study preferences, stored apart from the progress: which part of the course the route covers, and how it is organised. */
var PK = { org: 'dyaa-practice-org', scope: 'dyaa-practice-path' };
var SCOPES = window.SCOPES || [{ id: 'todo', title: 'Temario completo', blurb: '', worlds: ['analisis', 'diseno'] }];
var ORGS = [['etapas', 'Etapas', 'Bloques por técnica, de menos a más difícil.'], ['temas', 'Temas', 'Los temas del curso, como en las diapositivas.']];
function prefGet(k, ok, d) { try { var v = localStorage.getItem(PK[k]); return v != null && ok(v) ? v : d; } catch (e) { return d; } }
function prefSet(k, v) { try { localStorage.setItem(PK[k], v); } catch (e) { } }
var ORG, SCOPE, ACTIVE, GROUPS_ALL, GROUPS, groupOfStage = {}, inScope = {};
function refreshPrefs() {
  ORG = prefGet('org', function (v) { return v === 'etapas' || v === 'temas'; }, 'etapas');
  var sc = prefGet('scope', function (v) { return SCOPES.some(function (x) { return x.id === v; }); }, SCOPES[0].id);
  SCOPE = SCOPES.find(function (x) { return x.id === sc; });
  ACTIVE = L.scopeSteps(PATH, STAGES, SCOPE);                       // the steps of the chosen route
  GROUPS_ALL = L.groups(STAGES, LECT, ORG);                         // every etapa/tema, ...
  GROUPS = GROUPS_ALL.filter(function (g) { return SCOPE.worlds.indexOf(g.world) >= 0; });   // ...and those of the route
  groupOfStage = {}; GROUPS_ALL.forEach(function (g) { g.stages.forEach(function (id) { groupOfStage[id] = g; }); });
  inScope = {}; ACTIVE.forEach(function (st) { inScope[st.id] = true; });
}
function keepScope(st) { return !!inScope[st.id]; }
refreshPrefs();
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
function nextSteps(n) { return L.nextSteps(ACTIVE, S, EXAMS, n); }
function progress(stage) { return L.stageProgress(PATH, S, EXAMS, stage); }
function gprog(g) { return L.groupProgress(PATH, S, EXAMS, g); }
function doneWord() { return ORG === 'temas' ? '&iexcl;Bloque completado!' : '&iexcl;Etapa completada!'; }
function touchDay() { var t = today(); if (S.days.indexOf(t) < 0) S.days.push(t); }
/* Activity log (see L.logKind): what was done, when, how long it took if the stopwatch was on. */
var LOGMAX = 2000;
function logAdd(ty, k, label, r, xp, more) {
  var e = { t: today(), at: Date.now(), ty: ty, k: k, label: label, xp: xp || 0 };
  if (r != null) e.r = r;
  if (more) Object.keys(more).forEach(function (f) { if (more[f] != null) e[f] = more[f]; });
  S.log.push(e);
  while (S.log.length > LOGMAX) S.log.shift();
}
function stepPlain(st) {
  if (st.type === 'ex') { var a = byKey[st.key]; return a.exam.title + ' \u00b7 ' + (a.e.title || 'ejercicio ' + (a.e.n != null ? a.e.n : a.e.id)); }
  return (st.type === 'theory' ? 'Lectura: ' : st.type === 'quiz' ? 'Comprobaci\u00f3n: ' : '') + st.label;
}
/* Stopwatch of the exercise or quick check on screen (settings: timer). It only counts while the tab is visible and keeps its value across re-renders. */
var TM = null;
function tmStart(id) { if (!TM || TM.id !== id) TM = { id: id, ms: 0, since: document.hidden ? null : Date.now() }; }
function tmMs() { return TM ? TM.ms + (TM.since ? Date.now() - TM.since : 0) : 0; }
function tmPause() { if (TM && TM.since) { TM.ms += Date.now() - TM.since; TM.since = null; } }
function tmResume() { if (TM && !TM.since && !TM.stopped) TM.since = Date.now(); }
function tmStop() { tmPause(); if (TM) TM.stopped = true; }
function tmSec(id) { return S.cfg.timer && TM && TM.id === id ? Math.round(tmMs() / 1000) : null; }
function tmBox() { return S.cfg.timer ? ' <span class="swatch" title="Tiempo en este ejercicio (engranaje: cron&oacute;metro)">&#9201; <span class="timer" id="sw">' + fmt(tmMs() / 1000) + '</span></span>' : ''; }

var NOTE = '';
/* Awards the one-time stage bonus for every stage that is now fully done. Call after any change of progress. */
function awardAll() {
  var got = [];
  STAGES.forEach(function (g) {
    var p = progress(g.id);
    if (p.total && p.done === p.total && !S.bonus[g.id]) { S.bonus[g.id] = true; S.xp = Math.round((S.xp + BONUS) * 10) / 10; got.push(g); }
  });
  if (got.length) NOTE = flame('sm') + ' ' + doneWord() + ' ' + got.map(function (g) { return esc(g.title); }).join(', ') + ' (+' + BONUS * got.length + ' XP)';
  return got;
}

function rate(key, r, hints) {
  var a = byKey[key], t = today();
  var xp = L.xpFor(pts(a), hints, r);
  S.ex[key] = L.applyRating(S.ex[key], r, hints, xp, t);
  S.xp = Math.round((S.xp + xp) * 10) / 10; touchDay();
  logAdd('ex', key, a.exam.title + ' · ' + (a.e.title || 'ejercicio ' + (a.e.n != null ? a.e.n : a.e.id)), r, xp, { m: (stepById['e:' + key] || {}).min || L.exMinutes(a.e, a.exam), sec: tmSec(key), help: hints || null });
  tmStop();
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
function skillHint(e) {
  return 'Habilidad: ' + (e.skills || []).map(function (id) { return esc(skillById[id] ? skillById[id].label : id) + ' (' + (theoryLinks(id) || 'sin teor&iacute;a') + ')'; }).join('; ');
}
/* The notebook of an exercise: working written on screen, kept with the progress, with a preview that renders the formulas. */
var NB_SYMBOLS = [['\u03a3', '$\\sum_{i=1}^{n}$'], ['a/b', '$\\frac{a}{b}$'], ['\u0398', '$\\Theta(n)$'], ['O', '$O(n^{2})$'], ['log', '$\\log_{2} n$'], ['\u2264', '$\\le$'], ['\u221a', '$\\sqrt{n}$'], ['x\u207f', '$n^{k}$'], ['=\u21d2', '$\\Rightarrow$']];
function notebook(key) {
  var note = S.notes[key] || '';
  return '<details class="card nb" id="nbd"' + (note || V.nb ? ' open' : '') + '><summary><b>Cuaderno</b> <span class="muted">escribe aqu&iacute; tu desarrollo si no tienes papel; se guarda con tu progreso</span></summary>' +
    '<div class="chips nbsym">' + NB_SYMBOLS.map(function (x) { return '<button type="button" class="chip" data-act="nbins" data-t="' + esc(x[1]) + '" title="Inserta ' + esc(x[1]) + '">' + esc(x[0]) + '</button>'; }).join('') + '</div>' +
    '<textarea id="nb" rows="8" spellcheck="false" aria-label="Cuaderno del ejercicio" placeholder="Escribe aqu&iacute;. Las f&oacute;rmulas van entre $...$, por ejemplo $\\sum_{i=1}^{n} i$">' + esc(note) + '</textarea>' +
    '<div class="nbp" id="nbp">' + (note.trim() ? mdRender(note) : '') + '</div></details>';
}
var nbTimer = null;
function nbInput(v) {
  var k = V.key; if (!k) return;
  v = String(v).slice(0, 20000);
  if (v.trim()) S.notes[k] = v; else delete S.notes[k];
  save();
  clearTimeout(nbTimer);
  nbTimer = setTimeout(function () { var p = document.getElementById('nbp'); if (p) p.innerHTML = v.trim() ? mdRender(v) : ''; }, 250);
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
  if (st.type === 'quiz') return '#/quiz/' + enc(st.id);
  return '#/examen';
}
function stepLabel(st) {
  if (st.type === 'ex') return exTitle(byKey[st.key]);
  if (st.type === 'theory') return '&#128214; Leer: ' + esc(st.label);
  if (st.type === 'quiz') return '&#10067; Comprobaci&oacute;n r&aacute;pida: ' + esc(st.label);
  return '&#127937; ' + esc(st.label);
}
function stepRow(st, cur, inLesson) {
  var done = L.stepDone(st, S, EXAMS), mark = done ? '<span class="chk">&#10003;</span>' : '<span class="chk o">&#9675;</span>';
  var tags = '';
  if (st.type === 'ex') {
    var a = byKey[st.key];
    tags = (done ? status(st.key) : '') + dueTag(st.key) + (a.e.solution ? '<span class="tag">' + (a.e.own ? 'soluci&oacute;n propuesta' : 'con soluci&oacute;n') + '</span>' : '') + '<span class="tag">' + (a.e.src === 'adic' ? 'adicional' : 'examen') + '</span>';
  } else if (st.type === 'quiz' && S.quiz[st.id]) tags = '<span class="tag r' + (S.quiz[st.id].score === st.n ? 2 : S.quiz[st.id].score * 2 >= st.n ? 1 : 0) + '">' + S.quiz[st.id].score + '/' + st.n + '</span>';
  else if (S.skip[st.id]) tags = '<span class="tag">saltado</span>';
  tags += minTag(st.min);
  return '<a class="item step' + (done ? ' done' : '') + (cur ? ' cur' : '') + '" href="' + stepHref(st) + '"><span>' + mark + ' ' + (inLesson && st.type === 'theory' ? '&#128214; Leer' : inLesson && st.type === 'quiz' ? '&#10067; Comprobaci&oacute;n r&aacute;pida' : stepLabel(st)) + '</span><span>' + tags + '</span></a>';   // inside a lesson the heading already names the reading
}
function exRow(a) {
  return '<a class="item" href="#/ejercicios/' + enc(a.key) + '"><span><b>' + exTitle(a) + '</b> <span class="tag">' + esc(XKIND[a.e.kind] || a.e.kind) + '</span> <span class="tag">' + esc((groupOfStage[a.e.stage] || {}).short || '') + '</span></span><span>' + status(a.key) + dueTag(a.key) + (S.notes[a.key] ? '<span class="tag" title="Tienes notas en el cuaderno">&#9998; notas</span>' : '') + minTag((stepById['e:' + a.key] || {}).min || 15) + '</span></a>';
}
function nextCard(extra) {
  var n = nextSteps(1)[0];
  if (!n) return '<div class="card">&#127881; Has completado toda la ruta (' + esc(SCOPE.title) + '). Sigue repasando lo pendiente en <a href="#/hoy">Hoy</a>.</div>';
  var g = groupOfStage[n.stage];
  return '<div class="card next"><div class="muted">Siguiente en la ruta &middot; ' + esc(g.label) + '</div><div class="big">' + stepLabel(n) + '</div><div class="muted">' + mins(n.min) + ' estimados</div><div class="row"><a class="btn pri" href="' + stepHref(n) + '">Continuar &rarr;</a>' + (extra || '') + '</div></div>';
}

function vHoy() {
  var t = today(), C = S.cfg, h = '<h2>Misi&oacute;n de hoy</h2>' + missingBanner();
  var lv = level(), lo = (lv - 1) * (lv - 1) * 10, hi = lv * lv * 10, pct = Math.round((S.xp - lo) / (hi - lo) * 100);
  h += '<div class="card row"><span>Nivel <b>' + lv + '</b></span><div class="bar"><i style="width:' + pct + '%"></i></div><span class="muted">' + S.xp + ' / ' + hi + ' XP</span><span class="streakline">' + streakHtml() + '<span class="muted">d&iacute;as de racha</span></span></div>';
  var due = L.dueKeys(ALL.map(function (a) { return a.key; }), S, t);
  var dueItems = due.map(function (k) { return { id: k, min: (stepById['e:' + k] || {}).min || 15 }; });
  var plan = L.dailyPlan({ goal: C.daily, today: t, log: S.log, due: dueItems, steps: EXAMS.length || LECT.length ? nextSteps(80) : [] });
  var gp = Math.min(100, Math.round(plan.done / plan.goal * 100));
  h += '<div class="card"><div class="row"><b>Tu meta de hoy: ' + plan.goal + ' min</b><span class="grow"></span><button type="button" class="linkbtn" data-act="settings" data-open="study">Cambiar</button></div><div class="row"><div class="bar"><i style="width:' + gp + '%"></i></div><span class="muted">' + plan.done + ' de ' + plan.goal + ' min' + (plan.n ? ' &middot; ' + plan.n + (plan.n === 1 ? ' tarea hecha' : ' tareas hechas') : '') + '</span></div>' +
    (plan.met ? '<p>' + flame('sm') + ' <b>&iexcl;Meta cumplida!</b> Todo lo que hagas ahora es de propina.</p>' : '<p class="muted">Quedan ' + plan.left + ' min. Abajo tienes lo que te propongo para llenarlos' + (plan.min ? ' (' + mins(plan.min) + ')' : '') + '.</p>') + '</div>';
  if (plan.reviews.length) {
    h += '<h3>Repaso pendiente (' + due.length + ')</h3>';
    plan.reviews.forEach(function (r) { h += exRow(byKey[r.id]); });
    if (due.length > plan.reviews.length) h += '<p class="muted">Y ' + (due.length - plan.reviews.length) + ' m&aacute;s que caben otro d&iacute;a (<a href="#/ejercicios">Ejercicios</a>, estado &laquo;repasar hoy&raquo;).</p>';
  }
  if (EXAMS.length || LECT.length) {
    h += '<h3>' + (plan.met ? 'Si quieres seguir' : 'Ruta') + '</h3>' + nextCard();
    plan.steps.slice(1).forEach(function (st) { h += stepRow(st); });
    h += '<p class="muted">' + (plan.min ? 'Todo el plan de hoy: ' + mins(plan.min) + ' &middot; ' : '') + 'quedan ' + mins(L.pathMinutes(ACTIVE, S, EXAMS).left) + ' en toda la ruta.</p><p><a href="#/ruta">Ver toda la ruta &rarr;</a></p>';
  }
  return h;
}

function vRoad() {
  var unit = ORG === 'temas' ? 'tema' : 'etapa';
  var h = '<h2>Ruta de estudio</h2>' + missingBanner() + '<p class="muted">Un orden recomendado, sin bloqueos: puedes entrar en cualquier paso. Cada ' + unit + ' se recorre en lecciones: una lectura corta, una comprobaci&oacute;n r&aacute;pida y los ejercicios que la necesitan, de f&aacute;ciles a dif&iacute;ciles; al final, los ejercicios de ex&aacute;menes. Los de enunciado con soluci&oacute;n est&aacute;n marcados.</p>';
  var n = nextSteps(1)[0], tot = L.pathMinutes(ACTIVE, S, EXAMS);
  h += '<div class="card row pathbar"><span><b>' + esc(SCOPE.title) + '</b> &middot; por ' + (ORG === 'temas' ? 'temas' : 'etapas') + '</span><button type="button" class="btn" data-act="settings" data-open="route">Cambiar ruta u organizaci&oacute;n</button></div>';
  h += '<p class="muted">' + (SCOPE.id === SCOPES[0].id ? 'Ruta completa' : 'Esta ruta') + ': ' + mins(tot.total) + ' estimados &middot; quedan ' + mins(tot.left) + '. Son tiempos orientativos para estudiar y comprobar cada paso.</p>';
  h += nextCard();
  var world = null;
  GROUPS.forEach(function (g) {
    if (g.world !== world) { world = g.world; h += '<h3>' + esc(WORLDS[world] || world) + '</h3>'; }
    var p = gprog(g), pct = p.total ? Math.round(p.done / p.total * 100) : 0, open = n && g.stages.indexOf(n.stage) >= 0;
    h += '<details class="stage"' + (open ? ' open' : '') + '><summary><b>' + esc(g.label) + '</b> <span class="bar sm"><i style="width:' + pct + '%"></i></span> <span class="muted">' + p.done + '/' + p.total + (p.left ? ' &middot; quedan ' + mins(p.left) : '') + '</span>' + (g.stages.every(function (id) { return S.bonus[id]; }) ? ' ' + flame('sm') : '') + '</summary><p class="muted">' + esc(g.blurb) + ' Tiempo estimado ' + (ORG === 'temas' ? 'del tema' : 'de la etapa') + ': ' + mins(p.min) + '.</p>';
    var groups = [], cur = null, lesson = 0;
    /* A lesson = a reading, its quick check and the warm-ups that go with it; the exam-level exercises and the checkpoint close the etapa. */
    L.groupSteps(PATH, g).forEach(function (st) {
      var multi = g.stages.length > 1 ? esc(stageById[st.stage].title) + ' &middot; ' : '';
      if (st.type === 'theory') { cur = { name: multi + 'Lecci&oacute;n ' + (++lesson) + '. ' + esc(st.label), steps: [] }; groups.push(cur); }
      else if (st.type === 'exam') { cur = { name: 'Checkpoint', steps: [] }; groups.push(cur); }
      else if (st.type === 'ex' && byKey[st.key].e.src !== 'adic') {
        var nm = multi + 'Nivel examen: ejercicios de ex&aacute;menes anteriores';
        if (!cur || cur.name !== nm) { cur = { name: nm, steps: [] }; groups.push(cur); }
      } else if (!cur) { cur = { name: 'Ejercicios', steps: [] }; groups.push(cur); }
      cur.steps.push(st);
    });
    if (sheetStages(g).length) h += '<div class="sub">Resumen</div><a class="item" href="#/resumen/' + enc(g.id) + '"><span>&#128221; Resumen y f&oacute;rmulas: lo que hay que recordar</span><span><span class="tag">consulta</span></span></a>';
    groups.forEach(function (gr) {
      h += '<div class="sub">' + gr.name + ' <span class="t">&middot; ' + mins(minsOf(gr.steps)) + '</span></div>';
      gr.steps.forEach(function (st) { h += stepRow(st, n && n.id === st.id, true); });
    });
    h += '</details>';
  });
  var rest = GROUPS_ALL.filter(function (g) { return GROUPS.indexOf(g) < 0; });
  if (rest.length) h += '<p class="muted">Fuera de esta ruta: ' + rest.map(function (g) { return esc(g.label); }).join('; ') + '. Siguen disponibles en Ejercicios, Examen y Teor&iacute;a.</p>';
  return h;
}

function vList() {
  var h = '<h2>Ejercicios</h2>' + missingBanner();
  function sel(name, label, opts) {
    return '<label class="fsel"><span class="muted">' + label + '</span><select data-f="' + name + '"' + (F[name] ? ' class="set"' : '') + '><option value="">Todos</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (F[name] === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select></label>';
  }
  function chips(name, label, opts) {
    return '<div class="fchips"><span class="muted">' + label + '</span><div class="chips" role="group" aria-label="' + label + '">' + [['', 'Todos']].concat(opts).map(function (o) { return '<button type="button" class="chip' + (F[name] === o[0] ? ' on' : '') + '" data-act="fset" data-f="' + name + '" data-v="' + esc(o[0]) + '">' + o[1] + '</button>'; }).join('') + '</div></div>';
  }
  var t = today(), active = Object.keys(F).filter(function (k) { return F[k]; }).length;
  var list = ALL.filter(function (a) {
    if (F.stage && (groupOfStage[a.e.stage] || {}).id !== F.stage) return false;
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
  h += '<div class="card filters"><div class="fgrid">' + sel('stage', ORG === 'temas' ? 'Tema' : 'Etapa', GROUPS_ALL.map(function (g) { return [g.id, g.label]; })) + sel('exam', 'Examen', EXAMS.map(function (e) { return [e.id, e.title]; })) + sel('skill', 'Habilidad', SK.map(function (s) { return [s.id, s.label]; })) + '</div>' +
    chips('kind', 'Tipo', [['analisis', 'An&aacute;lisis'], ['diseno', 'Dise&ntilde;o'], ['ejs', 'Adicionales']]) +
    chips('status', 'Estado', [['new', 'Nuevo'], ['due', 'Repasar hoy'], ['0', 'Fall&eacute;'], ['1', 'Dudoso'], ['2', 'Dominado']]) +
    '<div class="frow"><span class="muted"><b>' + list.length + '</b> ' + (list.length === 1 ? 'ejercicio' : 'ejercicios') + ', en orden de ruta &middot; ' + mins(list.reduce(function (t, a) { return t + ((stepById['e:' + a.key] || {}).min || 0); }, 0)) + ' en total</span>' + (active ? '<button type="button" class="linkbtn" data-act="fclear">Quitar filtros (' + active + ')</button>' : '') + '</div></div>';
  h += list.map(exRow).join('') || '<p class="muted">Ning&uacute;n ejercicio cumple esos filtros.</p>';
  return h;
}

function vDetail(key) {
  var a = byKey[key];
  if (!a) return '<p>Ejercicio no encontrado. <a href="#/ejercicios">Volver</a></p>';
  if (V.key !== key) V = { key: key, hints: 0, self: false, done: null };
  if (S.cfg.timer) tmStart(key);
  var e = a.e, sol = e.solution, hasSol = sol != null && String(sol).trim() !== '', st = stepById['e:' + key], gp = st && groupOfStage[st.stage];
  var h = '<p><a href="#/ruta">&larr; Ruta</a> &middot; <a href="#/ejercicios">Ejercicios</a>' + (e.src === 'adic' ? '' : ' &middot; <a href="#/examen">Ex&aacute;menes</a>') + '</p>';
  if (gp) {
    var inG = PATH.filter(function (x) { return x.type === 'ex' && gp.stages.indexOf(x.stage) >= 0; });
    h += '<p class="muted">' + esc(gp.label) + ' &middot; ejercicio ' + (inG.indexOf(st) + 1) + ' de ' + inG.length + (inScope[st.id] ? '' : ' &middot; fuera de tu ruta (' + esc(SCOPE.title) + ')') + '</p>';
  }
  h += '<div class="card"><h2>' + exTitle(a) + '</h2>' +
    '<div class="muted">' + esc(XKIND[e.kind] || e.kind) + (e.points != null ? ' &middot; ' + e.points + ' pts' : '') + ' &middot; ' + mins(st ? st.min : L.exMinutes(e, a.exam)) + ' estimados' + tmBox() + '</div>' + mdRender(e.statement) + '</div>' + notebook(key);
  /* A proposed (unofficial) solution is written in steps ("**Paso 1.** ..."): they are shown one at a time. */
  var pieces = e.own && hasSol ? String(sol).split(/\n(?=\*\*Paso \d+)/) : null;
  if (V.hints >= 1) h += '<div class="card"><b>Pista 1.</b> ' + skillHint(e) + sheetLink(gp) + '</div>';
  if (pieces) {
    var shown = Math.min(Math.max(V.hints - 1, 0), pieces.length);
    if (shown) h += '<div class="card"><b>Soluci&oacute;n propuesta, paso a paso.</b> <span class="muted">No es oficial: el ejercicio no trae soluci&oacute;n, as&iacute; que la he escrito yo. Comp&aacute;rala con tus apuntes.</span>' + mdRender(pieces.slice(0, shown).join('\n\n')) + (shown < pieces.length ? '<p class="muted">Quedan ' + (pieces.length - shown) + ' de ' + pieces.length + ' pasos.</p>' : '') + '</div>';
  } else {
    if (V.hints >= 2 && hasSol) h += '<div class="card"><b>Pista 2.</b>' + mdRender(String(sol).split('\n').filter(function (l) { return l.trim(); }).slice(0, 3).join('\n')) + '</div>';
    if (V.hints >= 3) h += hasSol ? '<div class="card"><b>Soluci&oacute;n.</b>' + mdRender(sol) + '</div>' : '<div class="warnbox">Sin soluci&oacute;n oficial: compara con tus apuntes o con la teor&iacute;a.</div>';
  }
  var maxH = pieces ? 1 + pieces.length : hasSol ? 3 : 1, canRate = hasSol ? V.hints >= maxH : V.self;
  if (V.done != null) {
    var nx = st ? L.nextAfter(PATH, S, EXAMS, st.id, keepScope) : null;
    h += '<div class="card">Registrado: <b>+' + V.done.xp + ' XP</b>.' + (V.done.bonus ? ' ' + flame('sm') + ' <b>' + doneWord() + '</b> ' + esc(V.done.bonus.title) + ' (+' + BONUS + ' XP extra)' : '') + '</div>';
    h += '<div class="card row">' + (nx ? '<a class="btn pri" href="' + stepHref(nx) + '">Siguiente en la ruta &rarr;</a><span class="muted">' + stepLabel(nx) + '</span>' : '<span>&#127881; Ruta completada.</span>') + ' <a class="btn" href="#/ejercicios">Ver ejercicios</a></div>';
  } else if (canRate) {
    h += '<div class="card row">&iquest;C&oacute;mo te fue? ' + RN.map(function (n, i) { return '<button class="btn ' + ['bad', 'warn', 'ok'][i] + '" data-act="rate" data-r="' + i + '">' + n + '</button>'; }).join('') + '</div>';
  } else {
    h += '<div class="row">';
    if (V.hints < maxH) h += '<button class="btn" data-act="hint">' + (pieces ? (V.hints === 0 ? 'Mostrar pista' : 'Mostrar el paso ' + V.hints + ' de ' + pieces.length) : 'Mostrar pista (' + (V.hints + 1) + '/' + maxH + ')') + '</button>';
    if (pieces && V.hints < maxH - 1) h += '<button class="btn" data-act="allsteps">Ver la soluci&oacute;n completa</button>';
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

/* One exam, sat as a whole (timer, optional help, then you mark your own answers), or exercise by exercise like any other exercise. */
function examHelp(id) { return X.help[id] || (X.help[id] = {}); }
function examEnd() {
  if (!X || X.phase !== 'run') return;
  X.sec = S.cfg.extimer ? Math.round((Date.now() - X.start) / 1000) : null;
  X.phase = 'review'; X.i = 0;
}
function examRow(ex, rec) {
  var d = S.exams[ex.id], n = ex.exercises.length, done = ex.exercises.filter(function (e) { return last(ex.id + '/' + e.id) != null; }).length;
  var h = '<div class="card exam"><div class="row exhead"><span class="grow"><b>' + esc(ex.title) + '</b> <span class="muted">' + examMin(ex) + ' min &middot; ' + n + ' ejercicios &middot; ' + examSols(ex) + ' con soluci&oacute;n</span>' +
    (d ? ' <span class="tag r' + (d.grade >= 7 ? 2 : d.grade >= 4 ? 1 : 0) + '">' + d.grade.toFixed(1) + '/10</span>' : '') + (ex === rec ? ' <span class="tag due">recomendado</span>' : '') + '</span>' +
    '<button class="btn pri" data-act="exstart" data-id="' + esc(ex.id) + '">' + (d ? 'Repetir entero' : 'Hacer entero') + '</button></div>';
  h += '<details class="exparts"><summary>Hacerlo por ejercicios <span class="muted">&middot; ' + done + '/' + n + ' hechos, con pistas y soluci&oacute;n como en Ejercicios</span></summary>';
  ex.exercises.forEach(function (e) {
    var key = ex.id + '/' + e.id, a = byKey[key], st = stepById['e:' + key];
    h += '<a class="item" href="#/ejercicios/' + enc(key) + '"><span><b>' + esc((e.n != null ? e.n : e.id) + '. ' + (e.title && e.title !== 'Ejercicio ' + e.n ? e.title : 'Ejercicio')) + '</b> <span class="muted">' + pts(a) + ' pts</span></span><span>' + status(key) + dueTag(key) + minTag(st ? st.min : L.exMinutes(e, ex)) + '</span></a>';
  });
  return h + '</details></div>';
}

function vExam() {
  if (!EXAMS.length) return '<h2>Examen</h2>' + missingBanner();
  var C = S.cfg;
  if (!X) {
    var h = '<h2>Ex&aacute;menes</h2><p class="muted">Cualquier examen est&aacute; disponible, entero (como en el aula) o ejercicio a ejercicio. Los que tienen soluci&oacute;n oficial se auto-corrigen mejor; el recomendado es el siguiente sin hacer.</p>';
    h += '<div class="card row exset"><span class="grow"><b>Realismo</b> <span class="muted">' + (C.extimer ? (C.exauto ? 'con l&iacute;mite de tiempo' : 'con cuenta atr&aacute;s') : 'sin reloj') + ' &middot; pistas: ' + (C.exhints ? 's&iacute;' : 'no') + ' &middot; soluciones: ' + (C.exans ? 's&iacute;' : 'no') + '</span></span><button type="button" class="btn" data-act="settings" data-open="exam">Cambiar</button></div>';
    ['analisis', 'diseno', 'mixto'].forEach(function (kind) {
      var list = EXAMS.filter(function (e) { return e.kind === kind && (e.exercises || []).length; });
      list.sort(function (a, b) { return (!!S.exams[a.id] - !!S.exams[b.id]) || (examSols(b) / b.exercises.length - examSols(a) / a.exercises.length) || (a.id < b.id ? -1 : 1); });
      var rec = list.find(function (e) { return !S.exams[e.id] && examSols(e); }) || list.find(function (e) { return !S.exams[e.id]; });
      if (!list.length) return;
      h += '<h3>' + (kind === 'analisis' ? 'An&aacute;lisis' : kind === 'diseno' ? 'Dise&ntilde;o' : 'Completos (an&aacute;lisis y dise&ntilde;o)') + '</h3>';
      list.forEach(function (ex) { h += examRow(ex, rec); });
    });
    return h;
  }
  var ex = X.ex, hh = '<h2>' + esc(ex.title) + '</h2>';
  if (X.phase === 'run') {
    hh += '<div class="card row">' + (C.extimer ? '<span class="timer" id="tm"></span><span class="muted">de ' + examMin(ex) + ' min' + (C.exauto ? ' &middot; termina solo' : '') + '</span>' : '<span class="muted">Sin l&iacute;mite de tiempo</span>') + '<span class="grow"></span><button class="btn pri" data-act="exend">Terminar</button><button class="btn" data-act="exquit">Abandonar</button></div>';
    ex.exercises.forEach(function (e) {
      var hp = X.help[e.id] || {}, hasSol = e.solution != null && String(e.solution).trim() !== '';
      hh += '<div class="card"><b>' + esc(e.n != null ? e.n : e.id) + '. ' + esc(e.title || '') + '</b> <span class="muted">' + X.p[e.id].toFixed(1) + ' pts</span>' + mdRender(e.statement);
      if (C.exhints || C.exans) {
        if (hp.hint) hh += '<div class="help"><b>Pista.</b> ' + skillHint(e) + '</div>';
        if (hp.sol) hh += hasSol ? '<div class="help"><b>Soluci&oacute;n.</b>' + mdRender(e.solution) + '</div>' : '<div class="help">Sin soluci&oacute;n oficial.</div>';
        hh += '<div class="row">' + (C.exhints && !hp.hint ? '<button class="btn" data-act="exhint" data-id="' + esc(e.id) + '">Pista <span class="muted">(&minus;25 % de XP)</span></button>' : '') + (C.exans && !hp.sol ? '<button class="btn" data-act="exsol" data-id="' + esc(e.id) + '">Ver la soluci&oacute;n <span class="muted">(&minus;75 % de XP)</span></button>' : '') + '</div>';
      }
      hh += '</div>';
    });
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
  var g = Math.round(tot / mxs * 100) / 10, nx = nextSteps(1)[0], helped = Object.keys(X.help).length;
  return hh + '<div class="card"><h3>Nota: ' + g.toFixed(1) + ' / 10</h3><p>+' + X.xp + ' XP' + (helped ? ' <span class="muted">&middot; con ayudas en ' + helped + (helped === 1 ? ' ejercicio' : ' ejercicios') + ' (XP reducida)</span>' : '') + (X.sec != null ? ' <span class="muted">&middot; tiempo: ' + dur(X.sec) + ' de ' + examMin(ex) + ' min</span>' : '') + '</p><div class="row"><button class="btn" data-act="exquit">Cerrar</button>' + (nx ? '<a class="btn pri" href="' + stepHref(nx) + '" data-act="exquit">Siguiente en la ruta &rarr;</a>' : '') + '</div></div>';
}

/* ---------- quick checks: a few questions after each reading ---------- */
var Q = null;   // { id, pick: { question index: option index } } for the check on screen
function inlineMd(t) { return mdRender(t).replace(/^<div class="md"><p>/, '').replace(/<\/p><\/div>$/, ''); }
function quizCards(qs, pick) {
  var h = '';
  qs.forEach(function (q, i) {
    var done = pick[i] != null;
    h += '<div class="card quiz"><div><b>' + (i + 1) + '.</b> ' + inlineMd(q.q) + '</div><div class="opts">' + q.options.map(function (o, j) {
      var cls = done ? (j === q.answer ? ' ok' : j === pick[i] ? ' bad' : '') : '';
      return '<button type="button" class="opt' + cls + '" data-act="qpick" data-q="' + i + '" data-o="' + j + '"' + (done ? ' disabled' : '') + '>' + inlineMd(o) + '</button>';
    }).join('') + '</div>' + (done ? '<div class="why ' + (pick[i] === q.answer ? 'good' : 'miss') + '"><b>' + (pick[i] === q.answer ? 'Correcto.' : 'No exactamente.') + '</b> ' + inlineMd(q.why) + '</div>' : '') + '</div>';
  });
  return h;
}
function vQuiz(id) {
  var st = stepById[id], qs = st && st.type === 'quiz' ? QUIZ[st.tile] : null;
  if (!qs) return '<p>Comprobaci&oacute;n no encontrada. <a href="#/ruta">Volver</a></p>';
  if (!Q || Q.id !== id) Q = { id: id, pick: {} };
  if (S.cfg.timer) tmStart(id);
  var th = stepById['t:' + st.tile], answered = Object.keys(Q.pick).length, score = 0, prev = S.quiz[id];
  qs.forEach(function (q, i) { if (Q.pick[i] === q.answer) score++; });
  var h = '<p><a href="#/ruta">&larr; Ruta</a>' + (th ? ' &middot; <a href="' + stepHref(th) + '">Releer la teor&iacute;a</a>' : '') + '</p>';
  h += '<div class="card"><h2>Comprobaci&oacute;n r&aacute;pida</h2><div class="muted">' + esc(st.label) + ' &middot; ' + qs.length + ' preguntas &middot; ' + mins(st.min) + tmBox() + '</div><p class="muted">Sin nota ni penalizaci&oacute;n: sirve para fijar lo que acabas de leer. ' + (prev ? 'Ya la hiciste (' + prev.score + '/' + st.n + '); repetirla no suma XP.' : 'Cada acierto suma 1 XP, la primera vez.') + '</p></div>';
  h += quizCards(qs, Q.pick);
  if (answered === qs.length) {
    tmStop();
    var nx = L.nextAfter(PATH, S, EXAMS, id, keepScope);
    h += '<div class="card next"><div class="big">' + score + ' de ' + qs.length + (score === qs.length ? ' &middot; &iexcl;perfecto!' : score * 2 >= qs.length ? ' &middot; bien' : ' &middot; repasa la teor&iacute;a o el resumen') + '</div><div class="row"><button class="btn pri" data-act="quizdone" data-step="' + esc(id) + '">' + (nx ? 'Continuar &rarr;' : 'Terminar') + '</button>' + (th ? '<a class="btn" href="' + stepHref(th) + '">Releer la teor&iacute;a</a>' : '') + sheetLink(groupOfStage[st.stage]).replace(' &middot; ', '') + '</div></div>';
  } else if (!L.stepDone(st, S, EXAMS)) h += '<p><button class="btn" data-act="skip" data-step="' + esc(id) + '">Saltar esta comprobaci&oacute;n</button></p>';
  return h;
}

/* Summary sheets: what to remember of each etapa (formulas, schemes, typical mistakes). A tema shows the sheets of its etapas one after another.
   They are for looking things up, so they are not steps of the route and do not count towards progress. */
function sheetStages(g) { return g ? g.stages.filter(function (id) { return SUMM[id]; }) : []; }
function sheetLink(g) { return sheetStages(g).length ? ' &middot; <a href="#/resumen/' + enc(g.id) + '">Resumen y f&oacute;rmulas</a>' : ''; }
/* ---------- practice without paper ----------
   Besides the readings and quick checks of the route: questions made on the spot and checked by code (app/practice.js), a mixed test, and the
   notebook of each exercise. PR holds the session on screen. */
var PR = null;
function qstate() { return PR && PR.kind === 'test' ? PR : Q; }
var PAPERLESS = { mix: 1, drill: 1, trace: 1, cloze: 1, order: 1 };   // order: entries written by an earlier version
var PRAC = window.DYAA_PRACTICE, BLOCKS = PRAC ? PRAC.codeBlocks(LECT) : [], blockById = {};
BLOCKS.forEach(function (b) { blockById[b.id] = b; });
var CL = { lec: '' };   // tema chosen in the list of code blocks
var SESS = { ej: { n: 10, rate: 0.3, ty: 'drill', what: 'Ejercicios generados' }, traza: { n: 6, rate: 0.5, ty: 'trace', what: 'Trazar el algoritmo' }, codigo: { n: 5, rate: 0.3, ty: 'cloze', what: 'Completar el código' } };
function stageInRoute(id) { return GROUPS.some(function (g) { return g.stages.indexOf(id) >= 0; }); }
function pstat(id) { return S.prac[id] || { n: 0, ok: 0 }; }
function pstatSum(prefix) { var n = 0, ok = 0; Object.keys(S.prac).forEach(function (k) { if (k.indexOf(prefix) === 0) { n += S.prac[k].n; ok += S.prac[k].ok; } }); return { n: n, ok: ok }; }
function statTag(x) { return x.n ? '<span class="tag r' + (x.ok / x.n >= 0.8 ? 2 : x.ok / x.n >= 0.5 ? 1 : 0) + '" title="Aciertos hasta ahora">' + x.ok + ' de ' + x.n + '</span>' : '<span class="tag">nuevo</span>'; }
function practiceNote() { return '<p><a href="#/practica">&larr; Sin papel</a></p>'; }

function practiceStart(kind) {
  TM = null;
  if (kind === 'test') {
    var read = PATH.filter(function (x) { return x.type === 'quiz' && (S.theory['t:' + x.tile] || S.skip['t:' + x.tile] || S.quiz[x.id]); }).map(function (x) { return x.tile; });
    var pool = read.length >= 4 ? read : PATH.filter(function (x) { return x.type === 'quiz' && keepScope(x); }).map(function (x) { return x.tile; });
    PR = { kind: 'test', id: Date.now(), pick: {}, qs: L.mixQuestions(QUIZ, pool, 8, Math.random), fromRead: read.length >= 4, logged: null };
  }
}
/* A session of generated questions (kind: ej | traza | codigo; key: the drill, trace or code block, or "mezcla"). */
function sessionStart(kind, key) {
  TM = null;
  var def = SESS[kind], qs = [], title = '', i, q;
  if (kind === 'codigo') {
    var blk = blockById[key];
    if (key !== 'mezcla' && !blk) title = 'Fragmento no encontrado';
    else if (blk) {
      L.shuffle(blk.blankable, Math.random).slice(0, def.n).forEach(function (li) { q = PRAC.clozeQuestion(blk, BLOCKS, Math.random, li); if (q) { q.sid = 'cloze:' + blk.id; qs.push(q); } });
      title = blk.title;
    } else {
      title = 'Mezcla de código';
      for (i = 0; i < 40 && qs.length < 8 && BLOCKS.length; i++) { var b2 = BLOCKS[Math.floor(Math.random() * BLOCKS.length)]; q = PRAC.clozeQuestion(b2, BLOCKS, Math.random); if (q) { q.sid = 'cloze:' + b2.id; q.tag = b2.title; qs.push(q); } }
    }
  } else if (PRAC) {
    var list = kind === 'ej' ? PRAC.DRILLS : PRAC.TRACES, one = list.find(function (x) { return x.id === key; });
    title = one ? one.title : kind === 'ej' ? 'Mezcla de ejercicios generados' : 'Mezcla de trazas';
    for (i = 0; i < def.n; i++) { var g = one || list[Math.floor(Math.random() * list.length)]; q = g.gen(Math.random); q.sid = def.ty + ':' + g.id; q.tag = g.title; qs.push(q); }
  }
  PR = { kind: 'session', src: kind + ':' + key, key: key, skind: kind, title: title, qs: qs, i: 0, pick: null, placed: [], right: false, ok: 0, xp: 0, finished: false, logged: null, id: Date.now(), ty: def.ty, rate: def.rate };
}
function sessionAnswer(ok, pick) {
  var q = PR.qs[PR.i], st = S.prac[q.sid] = S.prac[q.sid] || { n: 0, ok: 0 };
  PR.pick = pick; PR.right = ok; st.n++; st.last = today();
  if (ok) { PR.ok++; st.ok++; PR.xp = Math.round((PR.xp + PR.rate) * 10) / 10; S.xp = Math.round((S.xp + PR.rate) * 10) / 10; }
  touchDay(); awardAll(); save();
}
function sessionFinish() {
  var n = PR.qs.length, f = PR.ok / n;
  logAdd(PR.ty, PR.ty + ':' + PR.id, SESS[PR.skind].what + ': ' + PR.title + ' (' + PR.ok + '/' + n + ')', f >= 0.8 ? 2 : f >= 0.5 ? 1 : 0, PR.xp, { m: Math.max(3, Math.round(n * 0.7)), sec: tmSec('p:' + PR.id) });
  PR.finished = true; PR.logged = true; tmStop(); save();
}

function vPractice() {
  var h = '<h2>Sin papel</h2><p class="muted">Pr&aacute;ctica que se hace solo con el port&aacute;til: las preguntas se generan al momento (no se acaban) y se corrigen al instante. Los ejercicios de la ruta, con su cuaderno, tambi&eacute;n se pueden hacer sin papel.</p>';
  if (!PRAC) return h + '<div class="warnbox">No se encontr&oacute; <code>practice.js</code>.</div>';
  function row(href, title, blurb, tag) { return '<a class="item" href="' + href + '"><span><b>' + title + '</b><br><span class="muted">' + blurb + '</span></span><span>' + tag + '</span></a>'; }
  h += '<h3>Ejercicios generados</h3><p class="muted">Lo mec&aacute;nico del an&aacute;lisis de algoritmos, con datos nuevos cada vez. 10 preguntas por tanda, 0,3 XP por acierto.</p>';
  h += row('#/practica/ej/mezcla', 'Mezcla de todos', 'Una de cada tipo, al azar.', statTag(pstatSum('drill:')));
  PRAC.DRILLS.forEach(function (d) { h += row('#/practica/ej/' + d.id, esc(d.title), inlineMd(d.blurb), statTag(pstat('drill:' + d.id))); });
  h += '<h3>Trazar el algoritmo</h3><p class="muted">Ejecuta mentalmente un algoritmo sobre una entrada peque&ntilde;a y responde qu&eacute; hace. 6 preguntas por tanda, 0,5 XP por acierto.</p>';
  h += row('#/practica/traza/mezcla', 'Mezcla de todos', 'Una de cada tipo, al azar.', statTag(pstatSum('trace:')));
  PRAC.TRACES.forEach(function (d) { h += row('#/practica/traza/' + d.id, esc(d.title), inlineMd(d.blurb), statTag(pstat('trace:' + d.id))); });
  var lecs = LECT.filter(function (l) { return BLOCKS.some(function (b) { return b.lecture === l.id; }); });
  h += '<h3>Completar el c&oacute;digo</h3><p class="muted">Una l&iacute;nea del c&oacute;digo de las clases est&aacute; tapada: elige la que falta. ' + BLOCKS.length + ' fragmentos, hasta 5 preguntas cada uno, 0,3 XP por acierto.</p>';
  h += '<div class="chips" role="group" aria-label="Tema">' + [['', 'Todos']].concat(lecs.map(function (l) { return [l.id, l.title.replace(/^(Tema [\d.]+).*$/, '$1')]; })).map(function (c) { return '<button type="button" class="chip' + (CL.lec === c[0] ? ' on' : '') + '" data-act="clfilter" data-v="' + esc(c[0]) + '">' + esc(c[1]) + '</button>'; }).join('') + '</div><div style="height:10px"></div>';
  h += row('#/practica/codigo/mezcla', 'Mezcla de fragmentos', '8 preguntas de fragmentos distintos.', statTag(pstatSum('cloze:')));
  BLOCKS.filter(function (b) { return !CL.lec || b.lecture === CL.lec; }).forEach(function (b) {
    h += row('#/practica/codigo/' + enc(b.id), esc(b.title), esc(b.lectureTitle.replace(/^(Tema [\d.]+).*$/, '$1')) + ' &middot; ' + b.lines.filter(function (l) { return l.trim(); }).length + ' l&iacute;neas', statTag(pstat('cloze:' + b.id)));
  });
  var nn = Object.keys(S.notes).length;
  h += '<h3>Cuaderno</h3><div class="card row"><span class="grow">Cada ejercicio tiene un <b>cuaderno</b> para escribir tu desarrollo en pantalla, con f&oacute;rmulas ($\\dots$) y vista previa; se guarda con tu progreso. Despu&eacute;s compara con las pistas y la soluci&oacute;n como siempre.' + (nn ? ' Tienes notas en ' + nn + (nn === 1 ? ' ejercicio.' : ' ejercicios.') : '') + '</span><a class="btn" href="#/ejercicios">Ir a Ejercicios</a></div>';
  h += '<h3>Repaso</h3>' + row('#/practica/test', 'Test mixto', '8 preguntas de las comprobaciones r&aacute;pidas, de lecturas distintas.', '');
  return h.replace('($\\dots$)', '(<code>$...$</code>)');
}

function vSession(kind, key) {
  if (!PR || PR.kind !== 'session' || PR.src !== kind + ':' + key) sessionStart(kind, key);
  if (S.cfg.timer) tmStart('p:' + PR.id);
  var n = PR.qs.length, h = practiceNote();
  if (!n) return h + '<div class="card"><h2>' + esc(PR.title || 'Sin papel') + '</h2><p>No hay preguntas disponibles.</p></div>';
  if (PR.finished) {
    var f = PR.ok / n;
    return h + '<div class="card next"><div class="big">' + esc(PR.title) + ': ' + PR.ok + ' de ' + n + (f === 1 ? ' &middot; &iexcl;perfecto!' : f >= 0.8 ? ' &middot; muy bien' : f >= 0.5 ? ' &middot; bien' : ' &middot; repasa la teor&iacute;a o el resumen') + '</div><p>Registrado: <b>+' + PR.xp + ' XP</b>.</p><div class="row"><button class="btn pri" data-act="pnew" data-k="' + PR.skind + '" data-key="' + esc(PR.key) + '">Otra tanda</button><a class="btn" href="#/practica">Volver</a></div></div>';
  }
  var q = PR.qs[PR.i], answered = PR.pick != null;
  h += '<div class="card"><div class="muted">' + esc(SESS[PR.skind].what) + ' &middot; ' + esc(PR.title) + (PR.key === 'mezcla' && q.tag ? ' &middot; ' + esc(q.tag) : '') + ' &middot; pregunta ' + (PR.i + 1) + ' de ' + n + tmBox() + '</div><div class="bar"><i style="width:' + Math.round(PR.i / n * 100) + '%"></i></div></div>';
  h += '<div class="card quiz">' + mdRender(q.prompt);
  if (q.type === 'mc') {
    h += '<div class="opts">' + q.options.map(function (o, j) {
      var cls = answered ? (j === q.answer ? ' ok' : j === PR.pick ? ' bad' : '') : '';
      return '<button type="button" class="opt' + cls + '" data-act="sopt" data-o="' + j + '"' + (answered ? ' disabled' : '') + '>' + inlineMd(o) + '</button>';
    }).join('') + '</div>';
  } else {
    h += '<ol class="placed">' + PR.placed.map(function (i) { return '<li>' + inlineMd(q.items[i]) + '</li>'; }).join('') + '</ol>';
    if (!answered) h += '<div class="rankpool">' + q.items.map(function (it, i) { return PR.placed.indexOf(i) < 0 ? '<button type="button" class="chip big" data-act="srank" data-i="' + i + '">' + inlineMd(it) + '</button>' : ''; }).join('') + '</div>' + (PR.placed.length ? '<div class="row"><button class="btn" data-act="sundo">Deshacer el &uacute;ltimo</button></div>' : '');
  }
  h += '</div>';
  if (answered) h += '<div class="why ' + (PR.right ? 'good' : 'miss') + '"><b>' + (PR.right ? 'Correcto.' : 'No exactamente.') + '</b> ' + mdRender(q.why) + '</div><div class="row" style="margin-top:12px"><button class="btn pri" data-act="snext">' + (PR.i + 1 < n ? 'Siguiente' : 'Ver el resultado') + '</button></div>';
  return h;
}

function vTest() {
  if (!PR || PR.kind !== 'test') practiceStart('test');
  if (S.cfg.timer) tmStart('p:' + PR.id);
  var qs = PR.qs, answered = Object.keys(PR.pick).length, score = 0;
  qs.forEach(function (q, i) { if (PR.pick[i] === q.answer) score++; });
  var h = practiceNote() + '<div class="card"><h2>Test mixto</h2><div class="muted">' + qs.length + ' preguntas de lecturas distintas' + (PR.fromRead ? ', de lo que ya has le&iacute;do' : ', de tu ruta') + tmBox() + '</div><p class="muted">Sin nota ni penalizaci&oacute;n. Cada acierto suma 0,5 XP.</p></div>';
  if (!qs.length) return h + '<p class="muted">No hay preguntas disponibles.</p>';
  h += quizCards(qs, PR.pick);
  if (answered === qs.length) {
    tmStop();
    h += '<div class="card next"><div class="big">' + score + ' de ' + qs.length + (score === qs.length ? ' &middot; &iexcl;perfecto!' : score * 2 >= qs.length ? ' &middot; bien' : ' &middot; repasa las lecturas o los res&uacute;menes') + '</div>' + (PR.logged ? '<p>Registrado: <b>+' + PR.logged.xp + ' XP</b>.</p><div class="row"><button class="btn pri" data-act="pnew" data-k="test">Otro test</button><a class="btn" href="#/practica">Volver</a></div>' : '<div class="row"><button class="btn pri" data-act="testdone">Registrar el resultado</button></div>') + '</div>';
  }
  return h;
}

/* Teoría and Resumen are read the same way: a picker for the tema (or etapa) at the top of the sidebar, a filter, the outline of what is on screen
   (it follows the reading, see startSpy), prev/next at both ends of the text. Only the things each page really has differ: the readings of the
   route in the outline of Teoría, the link to the full theory in the summaries. */
function readerShell(o) {
  var side = '<aside class="side" id="toc"><label class="lsel"><span class="muted">' + o.label + '</span><select id="lsel" data-kind="' + o.kind + '" aria-label="Cambiar de ' + o.label.toLowerCase() + '">' + o.options.map(function (x) {
    return '<option value="' + esc(x[0]) + '"' + (x[2] ? ' selected' : '') + '>' + x[1] + '</option>';
  }).join('') + '</select></label><input type="search" id="tocq" class="tocq" placeholder="Filtrar secciones&hellip;" aria-label="Filtrar las secciones" autocomplete="off"><nav class="outline" aria-label="Secciones">' + o.items + '</nav></aside>';
  return '<button type="button" class="tocbtn" data-act="toc" aria-label="Mostrar u ocultar el &iacute;ndice"><span>&#9776; &Iacute;ndice</span><b id="tocnow"></b></button><div class="theory">' + side + '<div class="tbody">' +
    '<div class="thead"><h2>' + o.title + '</h2><div class="muted">' + o.info + '</div>' + o.nav + '</div>' + o.body + '<div class="thead foot">' + o.nav + '</div></div></div><button type="button" class="totop" id="totop" data-act="totop" aria-label="Volver arriba" title="Volver arriba">&uarr;</button>';
}
function outlineItem(kind, key, i, sec) {
  var empty = !String(sec.md || '').trim();
  return '<a class="o l' + (sec.level || 2) + (empty ? ' grp' : '') + '" href="#/' + kind + '/' + enc(key) + '/' + i + '" data-sec="' + i + '" data-t="' + esc(String(sec.title).toLowerCase()) + '">' + inlineMd(sec.title) + '</a>';
}
function readerNav(kind, prev, next, name) {
  return '<div class="lnav">' + (prev ? '<a class="btn" href="#/' + kind + '/' + enc(prev.id) + '">&larr; ' + esc(name(prev)) + '</a>' : '') + (next ? '<a class="btn" href="#/' + kind + '/' + enc(next.id) + '">' + esc(name(next)) + ' &rarr;</a>' : '') + '</div>';
}

/* A summary, cut at its "## " headings into sections like a lecture. A tema (several etapas) puts the etapa titles in between. */
function sheetSections(cur) {
  var out = [], ids = sheetStages(cur);
  ids.forEach(function (id) {
    if (ids.length > 1) out.push({ title: stageById[id].title, level: 1, md: '' });
    String(SUMM[id]).split(/^(?=## )/m).forEach(function (chunk) {
      var m = /^## (.*)\n?([\s\S]*)$/.exec(chunk);
      if (m) out.push({ title: m[1].trim(), level: ids.length > 1 ? 2 : 1, md: m[2] });
    });
  });
  return out;
}
function vSheet(gid) {
  var h = '<h2 class="ttitle">Resumen</h2>';
  if (!Object.keys(SUMM).length) return h + '<div class="warnbox">No se encontraron los res&uacute;menes en <code>data-lectures.js</code>. Ejecuta <code>python3 tools/build.py</code>.</div>';
  var cur = GROUPS_ALL.find(function (g) { return g.id === gid; }) || groupOfStage[gid] || GROUPS[0] || GROUPS_ALL[0];
  var list = GROUPS_ALL.filter(function (g) { return sheetStages(g).length; }), gi = list.indexOf(cur), secs = sheetSections(cur);
  var th = cur.stages.map(function (id) { return PATH.find(function (x) { return x.type === 'theory' && x.stage === id; }); }).filter(Boolean)[0];
  var nm = function (g) { return g.short || g.label; };
  return h + readerShell({
    kind: 'resumen', label: ORG === 'temas' ? 'Tema' : 'Etapa',
    options: GROUPS_ALL.map(function (g) { return [g.id, esc(g.label) + (GROUPS.indexOf(g) < 0 ? ' (fuera de tu ruta)' : ''), g === cur]; }),
    items: secs.map(function (sec, i) { return outlineItem('resumen', cur.id, i, sec); }).join(''),
    title: esc(cur.label),
    info: 'lo que hay que recordar &middot; ' + secs.filter(function (x) { return String(x.md).trim(); }).length + ' secciones &middot; ' + (th ? '<a href="' + stepHref(th) + '">leer la teor&iacute;a completa</a> &middot; ' : '') + '<a href="#/ruta">volver a la ruta</a>',
    nav: readerNav('resumen', list[gi - 1], list[gi + 1], nm),
    body: secs.map(function (sec, i) {
      var lv = Math.min(6, 3 + Math.max(0, (sec.level || 1) - 1));
      return '<section class="sec" id="sec-' + i + '"><h' + lv + '>' + esc(sec.title) + '</h' + lv + '>' + mdRender(sec.md) + '</section>';
    }).join('') || '<p class="muted">Esta ' + (ORG === 'temas' ? 'tema' : 'etapa') + ' no tiene resumen.</p>'
  });
}

function vTheory(lid, idx, stepId) {
  var h = '<h2 class="ttitle">Teor&iacute;a</h2>';
  if (!LECT.length) return h + '<div class="warnbox">No se encontr&oacute; <code>data-lectures.js</code>.</div>';
  var cur = LECT.find(function (l) { return l.id === lid; }) || LECT[0], st = stepId && stepById[stepId];
  var li = LECT.indexOf(cur);
  var steps = PATH.filter(function (x) { return x.type === 'theory' && x.lecture === cur.id; }), startAt = {};
  steps.forEach(function (x) { startAt[x.idx] = x; });
  var nDone = steps.filter(function (x) { return L.stepDone(x, S, EXAMS); }).length;
  var items = '';
  cur.sections.forEach(function (sec, i) {
    var r = startAt[i];
    if (r) items += '<a class="rd' + (L.stepDone(r, S, EXAMS) ? ' done' : '') + '" href="#/teoria/' + enc(cur.id) + '/' + i + '" data-sec="' + i + '" title="Una lectura de la ruta">' + (L.stepDone(r, S, EXAMS) ? '&#10003;' : '&#128214;') + ' ' + esc(r.label.replace(/^Tema [\d.]+ &middot; |^Tema [\d.]+ · /, '')) + ' <span class="muted">' + mins(r.min) + '</span></a>';
    items += outlineItem('teoria', cur.id, i, sec);
  });
  var here = st && st.lecture === cur.id && String(st.idx) === String(idx), cardAt = here ? (st.to != null ? st.to : +idx) : -1;
  var body = cur.sections.map(function (sec, i) {
    var lv = Math.min(6, 3 + Math.max(0, (sec.level || 1) - 1));
    var card = '';
    if (i === cardAt) {   // after the last section the step covers, so it is not confirmed before reading it
      var done = L.stepDone(st, S, EXAMS);
      card = '<div class="card next row"><span>&#128214; Paso de la ruta (' + esc(groupOfStage[st.stage].label) + ') &middot; ' + mins(st.min) + ' de lectura: &iquest;lo has le&iacute;do?</span><button class="btn pri" data-act="theorydone" data-step="' + esc(st.id) + '">' + (done ? 'Continuar &rarr;' : 'Le&iacute;do, continuar &rarr;') + '</button></div>';
    }
    return '<section class="sec" id="sec-' + i + '">' + (i === 0 && sec.title === cur.title ? '' : '<h' + lv + '>' + esc(sec.title) + '</h' + lv + '>') + mdRender(sec.md) + card + '</section>';
  }).join('');
  var short = function (l) { return l.title.replace(/^(Tema [\d.]+)\.?\s.*$/, '$1'); };
  return h + readerShell({
    kind: 'teoria', label: 'Tema',
    options: LECT.map(function (l) {
      var ss = PATH.filter(function (x) { return x.type === 'theory' && x.lecture === l.id; }), d = ss.filter(function (x) { return L.stepDone(x, S, EXAMS); }).length;
      return [l.id, esc(l.title) + (ss.length ? ' (' + d + '/' + ss.length + ')' : ''), l === cur];
    }),
    items: items,
    title: esc(cur.title),
    info: '~' + L.fmtMin(LECMIN[cur.id]) + ' de lectura &middot; ' + cur.sections.length + ' secciones' + (steps.length ? ' &middot; lecturas de la ruta: ' + nDone + '/' + steps.length : ''),
    nav: readerNav('teoria', LECT[li - 1], LECT[li + 1], short),
    body: body
  });
}

/* While reading a tema: highlights the section on screen in the outline (and keeps it in view inside the sidebar), draws the reading progress
   under the top bar and shows the "back to top" button. Returns a function that removes it. */
var SPY = null;
function startSpy() {
  var secs = Array.prototype.slice.call(document.querySelectorAll('.sec')), items = {}, cur = -1, queued = false;
  Array.prototype.forEach.call(document.querySelectorAll('.outline [data-sec]'), function (a) { if (a.classList.contains('o')) items[a.dataset.sec] = a; });
  var raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) { return setTimeout(f, 16); };
  function update() {
    queued = false;
    var top = (document.getElementById('top') || {}).offsetHeight || 56, k = 0, y = top + 40;
    for (var i = 0; i < secs.length; i++) { if (secs[i].getBoundingClientRect().top <= y) k = i; else break; }
    var max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--read', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    var tt = document.getElementById('totop'); if (tt) tt.classList.toggle('show', window.scrollY > 700);
    if (k === cur) return;
    if (items[cur]) items[cur].classList.remove('on');
    cur = k;
    var a = items[k], toc = document.getElementById('toc'), now = document.getElementById('tocnow');
    if (a) {
      a.classList.add('on');
      if (toc && a.getBoundingClientRect) { var r = a.getBoundingClientRect(), t = toc.getBoundingClientRect(); if (r.top < t.top + 70 || r.bottom > t.bottom - 20) toc.scrollTop += r.top - t.top - t.height / 3; }
      if (now) now.textContent = a.textContent;
    }
  }
  function ask() { if (!queued) { queued = true; raf(update); } }
  window.addEventListener('scroll', ask); window.addEventListener('resize', ask);
  update();
  return function () { if (window.removeEventListener) { window.removeEventListener('scroll', ask); window.removeEventListener('resize', ask); } document.documentElement.style.removeProperty('--read'); };
}
/* Scrolls to a section of the tema on screen without re-rendering the page (and keeps the address in step, unless a route step is being read). */
function goSec(i) {
  var el = document.getElementById('sec-' + i); if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.classList.add('flash'); setTimeout(function () { el.classList.remove('flash'); }, 1600);
  var p = (location.hash || '').slice(2).split('/');
  if ((p[0] === 'teoria' || p[0] === 'resumen') && p[1] && !p[3] && window.history && history.replaceState) history.replaceState(null, '', '#/' + p[0] + '/' + p[1] + '/' + i);
  var t = document.querySelector('.theory'); if (t) t.classList.remove('tocopen');
}
function filterToc(q) {
  q = String(q || '').trim().toLowerCase();
  Array.prototype.forEach.call(document.querySelectorAll('.outline a'), function (a) {
    var hit = !q || (a.classList.contains('o') ? a.dataset.t.indexOf(q) >= 0 : false);
    a.hidden = !hit && !(a.classList.contains('rd') && !q);
  });
}

/* ---------- activity log page ---------- */
var R = { ty: '', days: 10 };
var LOGTY = [['', 'Todo'], ['ex', 'Ejercicios'], ['quiz', 'Comprobaciones'], ['theory', 'Lecturas'], ['exam', 'Ex&aacute;menes'], ['paperless', 'Sin papel'], ['skip', 'Saltados']];
var LOGICON = { ex: '&#9998;', quiz: '&#10067;', exam: '&#127937;', theory: '&#128214;', skip: '&#8631;', mix: '&#128187;', drill: '&#128290;', trace: '&#128269;', cloze: '&#128221;', order: '&#128187;' };
function dayLabel(d) {
  try { var p = d.split('-'), s = new Date(+p[0], p[1] - 1, +p[2]).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }); return (d === today() ? 'Hoy' : d === L.addDays(today(), -1) ? 'Ayer' : s.charAt(0).toUpperCase() + s.slice(1)); } catch (e) { return d; }
}
function clock(ms) { var d = new Date(ms); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
function logRow(l) {
  var ty = L.logKind(l), tags = '';
  if (l.r != null && ty !== 'theory' && ty !== 'skip') tags += '<span class="tag r' + l.r + '">' + (ty === 'quiz' || PAPERLESS[ty] ? ['Flojo', 'Bien', 'Perfecto'][l.r] : RN[l.r]) + '</span>';
  if (l.help) tags += '<span class="tag" title="Pistas o soluciones usadas">con ayudas</span>';
  if (l.xp) tags += '<span class="tag">+' + l.xp + ' XP</span>';
  tags += l.sec > 0 ? '<span class="tag min" title="Tiempo medido con el cron&oacute;metro">&#9201; ' + dur(l.sec) + '</span>' : '';
  return '<div class="item logrow"><span><span class="when">' + (l.at ? clock(l.at) : '&ndash;') + '</span> <span class="lty" title="' + ty + '">' + (LOGICON[ty] || '') + '</span> ' + esc(l.label) + '</span><span>' + tags + '</span></div>';
}
function vLog() {
  var h = '<h2>Registro</h2><p class="muted">Lo que has hecho, cu&aacute;ndo y cu&aacute;nto te llev&oacute;. El tiempo exacto solo se anota con el cron&oacute;metro activado en <button type="button" class="linkbtn" data-act="settings" data-open="study">Ajustes</button>; sin &eacute;l, cada tarea cuenta con su estimaci&oacute;n.</p>';
  var all = S.log.slice().reverse(), shown = R.ty ? all.filter(function (l) { return R.ty === 'paperless' ? PAPERLESS[L.logKind(l)] : L.logKind(l) === R.ty; }) : all;
  h += '<div class="chips" role="group" aria-label="Tipo de tarea">' + LOGTY.map(function (c) { return '<button type="button" class="chip' + (R.ty === c[0] ? ' on' : '') + '" data-act="logty" data-v="' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div>';
  if (!shown.length) return h + '<p class="muted">' + (all.length ? 'Nada de este tipo todav&iacute;a.' : 'A&uacute;n no hay nada. Cuando completes una lectura, una comprobaci&oacute;n, un ejercicio o un examen aparecer&aacute; aqu&iacute;.') + '</p>';
  var days = [], by = {};
  shown.forEach(function (l) { if (!by[l.t]) { by[l.t] = []; days.push(l.t); } by[l.t].push(l); });
  days.sort().reverse();
  days.slice(0, R.days).forEach(function (d) {
    var tt = L.dayTotals(by[d]);
    h += '<div class="logday"><div class="row"><b>' + esc(dayLabel(d)) + '</b><span class="muted">' + tt.n + (tt.n === 1 ? ' tarea' : ' tareas') + ' &middot; ' + tt.xp + ' XP &middot; ' + (tt.timed ? 'medido ' + dur(tt.sec) + (tt.timed < tt.n ? ' (+ estimaci&oacute;n del resto)' : '') : '~' + L.fmtMin(tt.min)) + '</span></div>' + by[d].map(logRow).join('') + '</div>';
  });
  if (days.length > R.days) h += '<p><button class="btn" data-act="logmore">Mostrar d&iacute;as anteriores (' + (days.length - R.days) + ')</button></p>';
  return h;
}

function vProgress() {
  var h = '<h2>Progreso</h2><div class="card row">XP <b>' + S.xp + '</b> &middot; Nivel <b>' + level() + '</b> &middot; <span class="streakline">' + streakHtml() + '<span>d&iacute;as de racha</span></span> &middot; quedan ' + mins(L.pathMinutes(ACTIVE, S, EXAMS).left) + ' de ruta</div><h3>Ruta por ' + (ORG === 'temas' ? 'temas' : 'etapas') + '</h3>';
  GROUPS_ALL.forEach(function (g) {
    var p = gprog(g), pct = p.total ? Math.round(p.done / p.total * 100) : 0, off = GROUPS.indexOf(g) < 0;
    h += '<div class="row prow' + (off ? ' off' : '') + '"><span class="plabel">' + esc(g.label) + (g.stages.every(function (id) { return S.bonus[id]; }) ? ' ' + flame('sm') : '') + (off ? ' <span class="tag">fuera de tu ruta</span>' : '') + '</span><div class="bar"><i style="width:' + pct + '%"></i></div><span class="muted pval">' + p.done + '/' + p.total + (p.left ? ' &middot; ' + mins(p.left) : '') + '</span></div>';
  });
  h += '<h3>Dominio por habilidad</h3><p class="muted">Porcentaje de ejercicios de la habilidad cuya &uacute;ltima valoraci&oacute;n fue Dominado (Dudoso cuenta la mitad).</p>';
  SK.forEach(function (s) {
    var m = mastery(s.id);
    h += '<div class="row prow"><span class="plabel">' + esc(s.label) + '</span><div class="bar"><i style="width:' + Math.round(m * 100) + '%"></i></div><span class="muted pval">' + Math.round(m * 100) + '%</span></div>';
  });
  var recent = S.log.slice(-5).reverse();
  h += '<h3>Lo &uacute;ltimo</h3>' + (recent.map(logRow).join('') || '<p class="muted">A&uacute;n nada.</p>') + (S.log.length ? '<p><a href="#/registro">Ver el registro completo &rarr;</a></p>' : '');
  return h;
}

/* Where the progress lives: only this browser profile, or a file shared between profiles. */
function syncBlock() {
  var h = '<div id="sync"><div class="pop-sub">D&oacute;nde se guarda el progreso</div>';
  h += '<p class="muted">Cada perfil de Chrome (y cada navegador) guarda su propio progreso. Para compartirlo, elige un archivo (por ejemplo en una carpeta que ya sincronices) y usa <b>el mismo archivo en cada perfil</b>.</p>';
  if (!syncCan()) return h + '<p class="muted">Este navegador no permite elegir un archivo compartido (hace falta Chrome o Edge, abriendo la p&aacute;gina desde un archivo local o un servidor). Usa Exportar e Importar para llevar el progreso de un sitio a otro.</p></div>';
  if (SYNC.handle) {
    var st = SYNC.state === 'ok' ? '<span class="tag r2">al d&iacute;a</span>' : SYNC.state === 'needs' ? '<span class="tag r1">falta permiso</span>' : SYNC.state === 'missing' ? '<span class="tag r1">no encontrado</span>' : '<span class="tag r0">error</span>';
    h += '<p>Progreso compartido mediante <b>' + esc(SYNC.name) + '</b> ' + st + '</p>' + (SYNC.msg ? '<p class="muted">' + esc(SYNC.msg) + '</p>' : '');
    if (SYNC.state === 'missing') h += '<p class="muted">El navegador recuerda la ruta del archivo, pero ya no existe en este ordenador (otra carpeta u otro usuario). Elige de nuevo el archivo.</p>';
    h += '<div class="row">' + (SYNC.state === 'needs' ? '<button class="btn pri" data-act="sync-now">Dar permiso al archivo</button>' : SYNC.state === 'missing' ? '<button class="btn pri" data-act="sync-open">Elegir el archivo</button><button class="btn" data-act="sync-new">Crear uno nuevo</button>' : '<button class="btn" data-act="sync-now">Sincronizar ahora</button>') + '<button class="btn" data-act="sync-off">Dejar de compartir</button></div>';
    h += '<p class="muted">Se escribe tras cada cambio y se lee al abrir la p&aacute;gina o volver a esta pesta&ntilde;a. Si dos perfiles cambian el progreso por separado se te pregunta cu&aacute;l conservar y se guarda una copia del otro.</p>';
  } else {
    h += '<p>Ahora mismo: <b>solo este perfil</b>.</p><div class="row"><button class="btn pri" data-act="sync-new">Crear un archivo de progreso</button><button class="btn" data-act="sync-open">Usar un archivo que ya existe</button></div>';
    h += '<p class="muted">En el primer perfil crea el archivo; en los dem&aacute;s elige ese mismo archivo. Chrome te pedir&aacute; permiso para editarlo al abrir la p&aacute;gina (con el primer clic). Si te ofrece <i>Permitir en cada visita</i>, elige esa opci&oacute;n y no volver&aacute; a preguntar.</p>';
  }
  return h + '</div>';
}
function syncBanner() {
  if (!SYNC.handle) {   // not set up: offer it once, on the first page
    if (!syncCan() || lsGet(SYK.ask) === 'no' || (location.hash || '#/hoy') !== '#/hoy') return '';
    return '<div class="card next"><b>Guarda tu progreso en un archivo</b><p>Ahora mismo solo existe en este perfil del navegador. Elige un archivo una vez (si lo dejas en una carpeta que ya sincronizas, mejor) y tus otros perfiles y ordenadores lo usar&aacute;n sin exportar ni importar nada.</p><div class="row"><button class="btn pri" data-act="sync-new">Crear el archivo</button><button class="btn" data-act="sync-open">Ya tengo uno</button><button class="btn" data-act="sync-later">Ahora no</button></div></div>';
  }
  if (SYNC.state === 'ok') return '';
  if (SYNC.state === 'missing') return '<div class="warnbox">No encuentro el archivo de progreso (<b>' + esc(SYNC.name) + '</b>) en la ruta que recuerda el navegador; seguramente es de otro ordenador. <button class="btn pri" data-act="sync-open">Elegir el archivo</button> <button type="button" class="linkbtn" data-act="sync-off">Dejar de compartir</button></div>';
  return '<div class="warnbox">' + (SYNC.state === 'needs' ? 'Haz clic en cualquier parte de la p&aacute;gina para dar permiso al archivo de progreso (<b>' + esc(SYNC.name) + '</b>); el navegador lo pide una vez por sesi&oacute;n. <button class="btn pri" data-act="sync-now">Dar permiso</button>' : 'No se pudo sincronizar el progreso con <b>' + esc(SYNC.name) + '</b>: ' + esc(SYNC.msg) + ' <button type="button" class="linkbtn" data-act="settings" data-open="data">Ver ajustes</button>') + '</div>';
}

/* Everything adjustable lives in the gear menu, in sections: look, route, study, exam simulator, data. */
function cfgSwitch(k, label, hint, disabled) {
  return '<label class="swrow' + (disabled ? ' dis' : '') + '"><input type="checkbox" data-cfg="' + k + '"' + (S.cfg[k] ? ' checked' : '') + (disabled ? ' disabled' : '') + '><span><b>' + label + '</b>' + (hint ? '<span class="muted">' + hint + '</span>' : '') + '</span></label>';
}
var EXPRESETS = { real: { label: 'Examen real', blurb: 'Cuenta atr&aacute;s, termina solo, sin pistas ni soluciones.', cfg: { extimer: true, exauto: true, exhints: false, exans: false } },
  relax: { label: 'Relajado', blurb: 'Cuenta atr&aacute;s, pero con pistas y soluciones (cuestan XP).', cfg: { extimer: true, exauto: false, exhints: true, exans: true } } };
function activePreset() {
  return Object.keys(EXPRESETS).find(function (id) { return Object.keys(EXPRESETS[id].cfg).every(function (k) { return S.cfg[k] === EXPRESETS[id].cfg[k]; }); }) || '';
}

/* ---------- settings menu (gear, top right) ---------- */
var TH = window.DYAA_THEME, LOGO = window.DYAA_LOGO;
var MODE_LABEL = { system: 'Sistema', light: 'Claro', dark: 'Oscuro' };
var POPSEC = {};   // which sections of the menu are open
function popSec(id, title, body) { return '<details class="pop-sec" data-id="' + id + '"' + (POPSEC[id] ? ' open' : '') + '><summary>' + title + '</summary><div class="pop-body">' + body + '</div></details>'; }
function popEl() { return $('#settings-pop'); }
function renderPop() {
  var pop = popEl(); if (!pop || !TH) return;
  var mode = TH.mode(), acc = TH.accent(), cur = TH.hex(TH.current()), keep = document.activeElement, C = S.cfg;
  var look = '<div class="pop-row"><span class="muted">Tema</span><div class="segs" role="radiogroup" aria-label="Tema">' +
    TH.MODES.map(function (m) { return '<button type="button" class="seg' + (m === mode ? ' on' : '') + '" role="radio" aria-checked="' + (m === mode) + '" data-act="theme" data-m="' + m + '">' + MODE_LABEL[m] + '</button>'; }).join('') + '</div></div>' +
    '<div class="pop-block"><div class="pop-row"><span class="muted">Color de acento</span><button type="button" class="linkbtn" data-act="accent-reset">Autom&aacute;tico</button></div>' +
    '<div class="swatches"><button type="button" class="sw auto' + (!acc ? ' on' : '') + '" data-act="accent-reset" title="Autom&aacute;tico (seg&uacute;n el tema)" aria-label="Autom&aacute;tico"></button>' +
    TH.PRESETS.map(function (p) { return '<button type="button" class="sw' + (acc && acc.toLowerCase() === p[1] ? ' on' : '') + '" style="background:' + p[1] + '" data-act="accent-set" data-c="' + p[1] + '" title="' + p[0] + '" aria-label="' + p[0] + '"></button>'; }).join('') + '</div>' +
    '<div class="accentrow"><input type="color" class="accentpick" id="acc-pick" value="' + cur + '" aria-label="Elegir el color de acento"><input type="text" class="accenttext" id="acc-text" value="' + (acc ? esc(acc) : '') + '" placeholder="#c2410c, rgb(194 65 12), tomato&hellip;" spellcheck="false" autocomplete="off" aria-label="Color de acento como texto" title="Cualquier color CSS: #hex, rgb(), hsl() o un nombre"></div>' +
    '<div class="pop-note bad" id="acc-msg" hidden>Eso no es un color que CSS entienda.</div></div>' +
    '<div class="pop-note">El acento colorea botones, barras, la llama, el logo y el icono de la pesta&ntilde;a.</div>';
  var route = '<div class="choices" role="radiogroup" aria-label="Ruta de estudio">' +
    SCOPES.map(function (sc) { var on = sc.id === SCOPE.id; return '<button type="button" class="choice' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" data-act="scope" data-v="' + esc(sc.id) + '"><b>' + esc(sc.title) + '</b><span class="muted">' + esc(sc.blurb) + '</span></button>'; }).join('') + '</div>' +
    '<div class="pop-row"><span class="muted">Organizar por</span><div class="segs" role="radiogroup" aria-label="Organizaci&oacute;n de la ruta">' +
    ORGS.map(function (o) { var on = o[0] === ORG; return '<button type="button" class="seg' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" title="' + esc(o[2]) + '" data-act="org" data-v="' + o[0] + '">' + o[1] + '</button>'; }).join('') + '</div></div>';
  var study = '<div class="setrow"><div><b>Meta diaria</b><span class="muted">Hoy propone repasos y pasos de la ruta hasta llenar ese tiempo, contando lo que ya hiciste.</span></div><div class="ctl"><div class="segs" role="radiogroup" aria-label="Meta diaria">' +
    L.DAILY.map(function (m) { return '<button type="button" class="seg' + (C.daily === m ? ' on' : '') + '" role="radio" aria-checked="' + (C.daily === m) + '" data-act="cfgset" data-k="daily" data-v="' + m + '">' + (m >= 60 && m % 60 === 0 ? m / 60 + ' h' : m) + '</button>'; }).join('') + '</div>' +
    '<label class="muted">minutos, u otra cifra: <input type="number" min="5" max="480" step="5" data-cfg="daily" value="' + C.daily + '" aria-label="Meta diaria en minutos"></label></div></div>' +
    cfgSwitch('timer', 'Cron&oacute;metro en ejercicios y comprobaciones', 'Muestra cu&aacute;nto tardas y lo guarda en el Registro. Solo cuenta con la pesta&ntilde;a a la vista.');
  var exam = '<p class="muted">Se aplica al hacer un examen entero. Los ejercicios sueltos siempre tienen pistas y soluci&oacute;n.</p><div class="presets">' +
    Object.keys(EXPRESETS).map(function (id) { var p = EXPRESETS[id]; return '<button type="button" class="choice' + (activePreset() === id ? ' on' : '') + '" data-act="expreset" data-v="' + id + '"><b>' + p.label + '</b><span class="muted">' + p.blurb + '</span></button>'; }).join('') + '</div>' +
    cfgSwitch('extimer', 'Reloj con el tiempo del examen', 'Cuenta atr&aacute;s con los minutos que da el examen. Sin &eacute;l, ni l&iacute;mite ni cron&oacute;metro.') +
    cfgSwitch('exauto', 'Terminar cuando se acabe el tiempo', 'Pasa solo a la correcci&oacute;n.', !C.extimer) +
    cfgSwitch('exhints', 'Permitir pistas durante el examen', 'Cada una quita el 25 % de la XP de ese ejercicio.') +
    cfgSwitch('exans', 'Permitir ver la soluci&oacute;n durante el examen', 'Quita el 75 % de la XP de ese ejercicio. La nota que te pones nunca cambia.');
  var data = '<p class="muted">' + (SYNC.handle ? 'Tu progreso se guarda en este perfil y en el archivo compartido.' : 'Tu progreso se guarda en este perfil del navegador.') + ' Los ajustes de este men&uacute; viajan con &eacute;l.</p><div class="row"><button type="button" class="btn" data-act="export">Exportar JSON</button><label class="btn">Importar JSON<input type="file" id="imp" accept="application/json" hidden></label><button type="button" class="btn bad" data-act="reset">Reiniciar progreso</button></div><div id="io" class="muted"></div>' + syncBlock();
  pop.innerHTML = '<div class="pop-title">Ajustes</div>' + popSec('look', 'Apariencia', look) + popSec('route', 'Ruta de estudio', route) + popSec('study', 'Estudio', study) + popSec('exam', 'Simulador de examen', exam) + popSec('data', 'Datos y progreso compartido', data);
  if (keep && keep.dataset && (keep.dataset.act || keep.dataset.cfg)) {
    var sel = keep.dataset.cfg ? '[data-cfg="' + keep.dataset.cfg + '"]' : '[data-act="' + keep.dataset.act + '"]' + (keep.dataset.m ? '[data-m="' + keep.dataset.m + '"]' : '') + (keep.dataset.v ? '[data-v="' + keep.dataset.v + '"]' : '') + (keep.dataset.c ? '[data-c="' + keep.dataset.c + '"]' : '') + (keep.dataset.k ? '[data-k="' + keep.dataset.k + '"]' : '');
    var again = pop.querySelector(sel); if (again && again.focus) again.focus();
  }
}
/* Opens the menu, with the given section open (and in view). */
function openSettings(sec) {
  if (sec) POPSEC[sec] = true;
  setPop(true);
  var pop = popEl(), d = pop && pop.querySelector ? pop.querySelector('[data-id="' + sec + '"]') : null;
  if (d && d.scrollIntoView) d.scrollIntoView({ block: 'nearest' });
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
  if (SPY) { SPY(); SPY = null; }
  var p = (location.hash || '#/hoy').slice(2).split('/').map(decodeURIComponent), tab = p[0] || 'hoy', h;
  if (tab === 'ajustes') { if (window.history && history.replaceState) history.replaceState(null, '', '#/hoy'); openSettings(p[1] || 'data'); tab = 'hoy'; }   // old address of the settings page: now the menu
  if (tab !== 'ejercicios') V = {};
  if (tab !== 'quiz') Q = null;
  if (tab !== 'practica' || !p[1]) PR = null;
  if (tab !== 'quiz' && tab !== 'practica' && !(tab === 'ejercicios' && p[1])) TM = null;
  if (tab === 'ejercicios') h = p[1] ? vDetail(p.slice(1).join('/')) : vList();
  else if (tab === 'ruta') h = vRoad();
  else if (tab === 'examen') h = vExam();
  else if (tab === 'teoria') h = vTheory(p[1], p[2], p[3]);
  else if (tab === 'resumen') h = vSheet(p[1]);
  else if (tab === 'quiz') h = vQuiz(p.slice(1).join('/'));
  else if (tab === 'progreso') h = vProgress();
  else if (tab === 'registro') h = vLog();
  else if (tab === 'practica') h = p[1] === 'test' ? vTest() : SESS[p[1]] ? vSession(p[1], p.slice(2).join('/')) : vPractice();
  else { tab = 'hoy'; h = vHoy(); }
  if (NOTE && tab !== 'ejercicios') { h = '<div class="card next">' + NOTE + '</div>' + h; NOTE = ''; }
  h = syncBanner() + h;
  $('#app').innerHTML = h; $('#app').className = tab === 'teoria' || tab === 'resumen' ? 'wide' : ''; stats();
  Array.prototype.forEach.call(document.querySelectorAll('#nav a'), function (a) { a.classList.toggle('on', a.dataset.tab === tab); });
  if (popOpen()) renderPop();
  if ((tab === 'teoria' || tab === 'resumen') && p[2] != null) { var el = document.getElementById('sec-' + p[2]); if (el) { el.scrollIntoView(); el.classList.add('flash'); } }
  else window.scrollTo(0, 0);
  if (tab === 'teoria' || tab === 'resumen') SPY = startSpy();
  if (tab === 'examen' && X && X.phase === 'run' && S.cfg.extimer) startTimer(function () {
    var t = $('#tm'); if (!t) return; var left = (X.end - Date.now()) / 1000; t.textContent = fmt(left);
    if (left <= 0) { t.style.color = 'var(--bad)'; if (S.cfg.exauto) { examEnd(); route(); } }
  });
  if ((tab === 'ejercicios' || tab === 'quiz' || tab === 'practica') && S.cfg.timer && TM) startTimer(function () { var t = $('#sw'); if (t) t.textContent = fmt(tmMs() / 1000); });
}
function rerender() { var y = window.scrollY; route(); window.scrollTo(0, y); }

/* ---------- events ---------- */
document.addEventListener('click', function (ev) {
  if (SYNC.handle && SYNC.state === 'needs' && !SYNC.asked) { SYNC.asked = true; syncRun(true).then(function () { route(); }); }   // the browser only shows its permission prompt after a click
  if (popOpen() && ev.target && ev.target.closest && !ev.target.closest('#settings-pop') && !ev.target.closest('#settings')) setPop(false);
  var sl = ev.target.closest && ev.target.closest('a[data-sec]');
  if (sl && sl.dataset && sl.dataset.sec != null && sl.getAttribute) { if (ev.preventDefault) ev.preventDefault(); goSec(+sl.dataset.sec); return; }
  var lk = ev.target.closest('a[href^="#/"]');
  if (lk && lk.getAttribute && lk.getAttribute('href') === location.hash) setTimeout(route, 0);
  var b = ev.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT') return;
  var act = b.dataset.act;
  if (act === 'settings') { if (b.dataset.open) openSettings(b.dataset.open); else setPop(!popOpen()); return; }
  if (act === 'settings-close') { setPop(false); return; }
  if (act === 'toc') { var th = document.querySelector('.theory'); if (th) th.classList.toggle('tocopen'); return; }
  if (act === 'totop') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (act === 'theme') { if (TH) TH.setMode(b.dataset.m); renderPop(); return; }
  if (act === 'scope') { prefSet('scope', b.dataset.v); refreshPrefs(); renderPop(); rerender(); return; }
  if (act === 'org') { prefSet('org', b.dataset.v); F.stage = ''; refreshPrefs(); renderPop(); rerender(); return; }
  if (act === 'accent-set') { if (TH) TH.setAccent(b.dataset.c); renderPop(); return; }
  if (act === 'accent-reset') { if (TH) TH.setAccent(null); renderPop(); return; }
  if (act === 'hint') { V.hints++; rerender(); }
  else if (act === 'allsteps') { V.hints = 1e3; rerender(); }
  else if (act === 'self') { V.self = true; rerender(); }
  else if (act === 'rate') { V.done = rate(V.key, +b.dataset.r, Math.min(3, V.hints)); rerender(); }
  else if (act === 'qpick') { var qp = qstate(); if (qp && qp.pick[+b.dataset.q] == null) { qp.pick[+b.dataset.q] = +b.dataset.o; rerender(); } }
  else if (act === 'quizdone') {
    var qid = b.dataset.step, qst = stepById[qid], qs2 = QUIZ[qst.tile], sc = 0;
    qs2.forEach(function (q, i) { if (Q && Q.pick[i] === q.answer) sc++; });
    var first = !S.quiz[qid];
    if (first || sc > S.quiz[qid].score) S.quiz[qid] = { score: sc, n: qs2.length, t: today() };
    if (first) { S.xp = Math.round((S.xp + sc) * 10) / 10; logAdd('quiz', qid, stepPlain(qst), sc === qs2.length ? 2 : sc * 2 >= qs2.length ? 1 : 0, sc, { m: qst.min, sec: tmSec(qid) }); }
    touchDay(); awardAll(); save();
    var nq = L.nextAfter(PATH, S, EXAMS, qid, keepScope);
    location.hash = nq ? stepHref(nq) : '#/ruta'; route();
  }
  else if (act === 'skip') {
    var sid = b.dataset.step, sst = stepById[sid]; if (sst && !S.skip[sid]) logAdd('skip', sid, 'Saltado: ' + stepPlain(sst), null, 0, { m: 0 }); S.skip[sid] = true; awardAll(); save();
    var nx = L.nextAfter(PATH, S, EXAMS, sid, keepScope);
    location.hash = nx ? stepHref(nx) : '#/ruta'; if (!nx) route();
  }
  else if (act === 'theorydone') {
    var tid = b.dataset.step, tst = stepById[tid]; if (tst && !S.theory[tid]) logAdd('theory', tid, stepPlain(tst), null, 0, { m: tst.min }); S.theory[tid] = true; touchDay(); awardAll(); save();
    var nt = L.nextAfter(PATH, S, EXAMS, tid, keepScope);
    location.hash = nt ? stepHref(nt) : '#/ruta'; route();
  }
  else if (act === 'exstart') {
    var ex = EXAMS.find(function (e) { return e.id === b.dataset.id; });
    X = { ex: ex, phase: 'run', start: Date.now(), end: Date.now() + examMin(ex) * 60000, p: examPts(ex), s: {}, i: 0, help: {}, sec: null }; route();
  }
  else if (act === 'exend') { examEnd(); route(); }
  else if (act === 'exhint' && X && S.cfg.exhints) { examHelp(b.dataset.id).hint = true; rerender(); }
  else if (act === 'exsol' && X && S.cfg.exans) { examHelp(b.dataset.id).sol = true; rerender(); }
  else if (act === 'exnext') {
    var e = X.ex.exercises[X.i], v = parseFloat($('#sc').value) || 0;
    X.s[e.id] = Math.max(0, Math.min(X.p[e.id], v));
    if (++X.i >= X.ex.exercises.length) {
      var tot = 0, mx = 0; X.ex.exercises.forEach(function (q) { tot += X.s[q.id] || 0; mx += X.p[q.id]; });
      X.xp = L.examXp(X.ex.exercises.map(function (q) { return q.id; }), X.s, X.p, X.help); X.phase = 'done'; S.xp = Math.round((S.xp + X.xp) * 10) / 10;
      var t = today(); touchDay();
      S.exams[X.ex.id] = { grade: Math.round(tot / mx * 100) / 10, t: t };
      if (X.sec != null) S.exams[X.ex.id].sec = X.sec;
      logAdd('exam', 'exam/' + X.ex.id, 'Examen ' + X.ex.title + ' (' + (tot / mx * 10).toFixed(1) + '/10)', tot / mx > 0.7 ? 2 : tot / mx > 0.4 ? 1 : 0, X.xp, { m: examMin(X.ex), sec: X.sec, help: Object.keys(X.help).length || null });
      awardAll(); save();
    }
    route();
  }
  else if (act === 'pnew') { if (SESS[b.dataset.k]) sessionStart(b.dataset.k, b.dataset.key || 'mezcla'); else practiceStart(b.dataset.k); route(); }
  else if (act === 'testdone' && PR && PR.kind === 'test' && !PR.logged) {
    var tsc = 0; PR.qs.forEach(function (q, i) { if (PR.pick[i] === q.answer) tsc++; });
    var txp = Math.round(tsc * 0.5 * 10) / 10; S.xp = Math.round((S.xp + txp) * 10) / 10;
    logAdd('mix', 'mix:' + PR.id, 'Test mixto (' + tsc + '/' + PR.qs.length + ')', tsc === PR.qs.length ? 2 : tsc * 2 >= PR.qs.length ? 1 : 0, txp, { m: 6, sec: tmSec('p:' + PR.id) });
    PR.logged = { xp: txp }; touchDay(); awardAll(); save(); rerender();
  }
  else if (act === 'sopt' && PR && PR.kind === 'session' && PR.pick == null && !PR.finished) { sessionAnswer(+b.dataset.o === PR.qs[PR.i].answer, +b.dataset.o); rerender(); }
  else if (act === 'srank' && PR && PR.kind === 'session' && PR.pick == null && !PR.finished) {
    var rq = PR.qs[PR.i], ri2 = +b.dataset.i;
    if (PR.placed.indexOf(ri2) < 0) { PR.placed.push(ri2); if (PR.placed.length === rq.items.length) sessionAnswer(PR.placed.join() === rq.order.join(), 'rank'); rerender(); }
  }
  else if (act === 'sundo' && PR && PR.kind === 'session' && PR.pick == null) { PR.placed.pop(); rerender(); }
  else if (act === 'snext' && PR && PR.kind === 'session' && PR.pick != null && !PR.finished) { PR.i++; PR.pick = null; PR.placed = []; if (PR.i >= PR.qs.length) sessionFinish(); route(); }
  else if (act === 'clfilter') { CL.lec = b.dataset.v; rerender(); }
  else if (act === 'nbins') {
    var ta = document.getElementById('nb');
    if (ta && V.key) { var s0 = ta.selectionStart || 0, e0 = ta.selectionEnd || 0, tx = b.dataset.t || ''; ta.value = ta.value.slice(0, s0) + tx + ta.value.slice(e0); ta.selectionStart = ta.selectionEnd = s0 + tx.length; if (ta.focus) ta.focus(); nbInput(ta.value); }
  }
  else if (act === 'fset') { F[b.dataset.f] = b.dataset.v; rerender(); }
  else if (act === 'fclear') { F = { stage: '', exam: '', skill: '', kind: '', status: '' }; rerender(); }
  else if (act === 'cfgset') { S.cfg[b.dataset.k] = +b.dataset.v; S.cfg = L.normCfg(S.cfg); save(); rerender(); }
  else if (act === 'expreset') { Object.assign(S.cfg, EXPRESETS[b.dataset.v].cfg); save(); rerender(); }
  else if (act === 'logty') { R.ty = b.dataset.v; R.days = 10; rerender(); }
  else if (act === 'logmore') { R.days += 10; rerender(); }
  else if (act === 'exquit') { X = null; if (b.tagName !== 'A') route(); }
  else if (act === 'export') {
    var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'dyaa-progress.json'; a.click();
  }
  else if (act === 'reset') { if (confirm('¿Borrar todo el progreso?' + (SYNC.handle ? ' También se borrará en el archivo compartido y, por tanto, en los demás perfiles que lo usen.' : ''))) { var keepCfg = S.cfg; S = blank(); S.cfg = keepCfg; save(); route(); } }
  else if (act === 'sync-new' || act === 'sync-open') {
    var pick = act === 'sync-new'
      ? window.showSaveFilePicker({ suggestedName: 'dyaa-progreso.json', types: [{ description: 'Progreso de DyAA Practice', accept: { 'application/json': ['.json'] } }] })
      : window.showOpenFilePicker({ multiple: false, types: [{ description: 'Progreso de DyAA Practice', accept: { 'application/json': ['.json'] } }] }).then(function (a) { return a[0]; });
    pick.then(syncUse).catch(function () { });
  }
  else if (act === 'sync-now') { syncRun(true).then(route); }
  else if (act === 'sync-off') { syncOff().then(route); }
  else if (act === 'sync-later') { lsSet(SYK.ask, 'no'); route(); }
});
document.addEventListener('input', function (ev) { if (ev.target && ev.target.id === 'tocq') { filterToc(ev.target.value); return; } if (ev.target && ev.target.id === 'nb') { nbInput(ev.target.value); return; } colorInput(ev); });
document.addEventListener('toggle', function (ev) { var d = ev.target; if (d && d.classList && d.classList.contains('pop-sec') && d.dataset) POPSEC[d.dataset.id] = !!d.open; if (d && d.id === 'nbd') V.nb = !!d.open; }, true);
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && popOpen()) { setPop(false); var b = $('#settings'); if (b && b.focus) b.focus(); } });
document.addEventListener('change', function (ev) {
  var t = ev.target;
  if (t.dataset && t.dataset.cfg) { S.cfg[t.dataset.cfg] = t.type === 'checkbox' ? !!t.checked : +t.value; S.cfg = L.normCfg(S.cfg); save(); rerender(); }
  else if (t.dataset && t.dataset.f) { F[t.dataset.f] = t.value; route(); }
  else if (t.id === 'lsel') { location.hash = '#/' + (t.dataset && t.dataset.kind === 'resumen' ? 'resumen' : 'teoria') + '/' + enc(t.value); }
  else if (t.id === 'imp' && t.files[0]) {
    var r = new FileReader();
    r.onload = function () {
      try { var o = JSON.parse(r.result); if (!o || typeof o.ex !== 'object') throw 0; S = adopt(o); save(); route(); $('#io').textContent = 'Importado.'; }
      catch (e) { $('#io').textContent = 'Archivo inválido.'; }
    };
    r.readAsText(t.files[0]);
  }
});
window.addEventListener('hashchange', route);
function syncRefresh() { if (SYNC.handle && SYNC.state === 'ok') syncRun(false).then(function (changed) { if (changed) route(); }); }
document.addEventListener('visibilitychange', function () { if (document.hidden) tmPause(); else { tmResume(); syncRefresh(); } });
window.addEventListener('focus', syncRefresh);
function setTopH() { var t = document.getElementById('top'); if (t && t.offsetHeight) document.documentElement.style.setProperty('--topH', t.offsetHeight + 'px'); }
window.addEventListener('resize', setTopH);
drawLogo();
setTopH();
route();
setTopH();
syncStart();
})();
