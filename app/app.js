(function () {
'use strict';
var LECT = window.LECTURES || [], SK = window.SKILLS || [], EXAMS = window.EXAMS || [];
var KEY = 'dyaa-practice-v1';
var RN = ['Fallé', 'Dudoso', 'Dominado'], RM = [0, 0.5, 1];
var $ = function (s) { return document.querySelector(s); };

/* ---------- utils ---------- */
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function dstr(d) { d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
function today() { return dstr(); }
function addDays(s, n) { var p = s.split('-'); return dstr(new Date(+p[0], p[1] - 1, +p[2] + n, 12)); }
function fmt(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }

/* ---------- markdown + math ---------- */
function mdRender(src) {
  var st = [];
  function put(h, block) { st.push({ h: h, b: block }); return '' + (st.length - 1) + ''; }
  function tex(t, disp) {
    try { return window.katex.renderToString(t, { displayMode: disp, throwOnError: false }); }
    catch (e) { return '<code>' + esc(t) + '</code>'; }
  }
  var s = String(src || '').replace(/\r/g, '');
  s = s.replace(/```[^\n]*\n([\s\S]*?)```/g, function (m, c) { return '\n' + put('<pre><code>' + esc(c.replace(/\n$/, '')) + '</code></pre>', true) + '\n'; });
  s = s.replace(/`([^`\n]+)`/g, function (m, c) { return put('<code>' + esc(c) + '</code>'); });
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, function (m, c) { return put(tex(c, true)); });
  s = s.replace(/\$([^$\n]+?)\$/g, function (m, c) { return put(tex(c, false)); });
  function inl(t) {
    return esc(t).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  }
  var L = s.split('\n'), out = [], para = [], i = 0;
  var LI = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
  function flush() { if (para.length) { out.push('<p>' + inl(para.join(' ')) + '</p>'); para = []; } }
  function cells(r) { return r.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return inl(c.trim()); }); }
  while (i < L.length) {
    var ln = L[i], m;
    if (!ln.trim()) { flush(); i++; continue; }
    if ((m = ln.match(/^(#{1,6})\s+(.*)/))) { flush(); var lv = Math.min(6, m[1].length + 2); out.push('<h' + lv + '>' + inl(m[2]) + '</h' + lv + '>'); i++; continue; }
    if ((m = ln.trim().match(/^(\d+)$/)) && st[m[1]].b) { flush(); out.push(st[m[1]].h); i++; continue; }
    if (ln.indexOf('|') >= 0 && L[i + 1] && /^\s*\|?\s*:?-{2,}[\s:|-]*$/.test(L[i + 1])) {
      flush();
      var h = '<table><thead><tr>' + cells(ln).map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>';
      i += 2;
      while (i < L.length && L[i].indexOf('|') >= 0 && L[i].trim()) { h += '<tr>' + cells(L[i]).map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; i++; }
      out.push(h + '</tbody></table>'); continue;
    }
    if (LI.test(ln)) {
      flush();
      var stack = [], html = '';
      while (i < L.length) {
        var l2 = L[i], mm = l2.match(LI);
        if (mm) {
          var ind = mm[1].replace(/\t/g, '  ').length, tag = /\d/.test(mm[2]) ? 'ol' : 'ul';
          while (stack.length && ind < stack[stack.length - 1].ind) html += '</li></' + stack.pop().tag + '>';
          if (stack.length && ind === stack[stack.length - 1].ind) html += '</li>';
          else { html += '<' + tag + '>'; stack.push({ ind: ind, tag: tag }); }
          html += '<li>' + inl(mm[3]); i++;
        } else if (!l2.trim()) {
          var j = i + 1; while (j < L.length && !L[j].trim()) j++;
          if (j < L.length && LI.test(L[j])) i = j; else break;
        } else if (/^\s{2,}/.test(l2)) { html += ' ' + inl(l2.trim()); i++; }
        else break;
      }
      while (stack.length) html += '</li></' + stack.pop().tag + '>';
      out.push(html); continue;
    }
    para.push(ln.trim()); i++;
  }
  flush();
  var res = out.join('\n');
  for (var k = 0; k < 3 && //.test(res); k++) res = res.replace(/(\d+)/g, function (m, n) { return st[n].h; });
  return '<div class="md">' + res + '</div>';
}

/* ---------- state ---------- */
var S = { settings: { designTaught: false }, ex: {}, xp: 0, days: [], log: [] };
function load() {
  try { var r = JSON.parse(localStorage.getItem(KEY)); if (r && typeof r === 'object') { S.settings = Object.assign(S.settings, r.settings || {}); S.ex = r.ex || {}; S.xp = +r.xp || 0; S.days = r.days || []; S.log = r.log || []; } } catch (e) { }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
load();

/* ---------- model ---------- */
var skillById = {}; SK.forEach(function (s) { skillById[s.id] = s; });
var ALL = [];
EXAMS.forEach(function (ex) {
  (ex.exercises || []).forEach(function (e) { ALL.push({ key: ex.id + '/' + e.id, exam: ex, e: e }); });
});
var byKey = {}; ALL.forEach(function (a) { byKey[a.key] = a; });
function locked(a) {
  if (S.settings.designTaught) return false;
  if (a.e.kind === 'diseno') return true;
  return (a.e.skills || []).some(function (id) { return skillById[id] && skillById[id].tema === 'diseno'; });
}
function pts(a) { return a.e.points == null ? 2 : a.e.points; }
function last(key) { var x = S.ex[key]; return x && x.hist.length ? x.hist[x.hist.length - 1].r : null; }
function mastery(sid) {
  var list = ALL.filter(function (a) { return (a.e.skills || []).indexOf(sid) >= 0; });
  if (!list.length) return 0;
  var t = 0; list.forEach(function (a) { var r = last(a.key); if (r != null) t += RM[r]; });
  return t / list.length;
}
function exMastery(a) { var s = a.e.skills || []; if (!s.length) return 0; return Math.min.apply(null, s.map(mastery)); }
function level() { return Math.floor(Math.sqrt(S.xp / 10)) + 1; }
function streak() {
  var d = today(), n = 0;
  if (S.days.indexOf(d) < 0) d = addDays(d, -1);
  while (S.days.indexOf(d) >= 0) { n++; d = addDays(d, -1); }
  return n;
}
function rate(key, r, hints) {
  var a = byKey[key], x = S.ex[key] || (S.ex[key] = { hist: [], interval: 0, ease: 2.3 }), t = today();
  var xp = pts(a) * Math.max(0.25, 1 - 0.25 * hints) * RM[r];
  xp = Math.round(xp * 10) / 10;
  if (r === 0) { x.interval = 0; x.due = addDays(t, 1); }
  else if (r === 1) { x.interval = Math.max(2, (x.interval || 1) * 1.2); x.due = addDays(t, Math.ceil(x.interval)); }
  else { x.interval = x.interval ? x.interval * x.ease : 3; x.due = addDays(t, Math.ceil(x.interval)); }
  x.hist.push({ r: r, t: t, h: hints, xp: xp }); x.lastSeen = t;
  S.xp = Math.round((S.xp + xp) * 10) / 10;
  if (S.days.indexOf(t) < 0) S.days.push(t);
  S.log.push({ t: t, k: key, label: a.exam.title + ' · ' + a.e.title, r: r, xp: xp });
  if (S.log.length > 300) S.log.shift();
  save(); return xp;
}

/* ---------- views ---------- */
var timerId = null, V = {}, F = { exam: '', skill: '', kind: '', status: '' }, X = null;
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
    return '<a href="#/teoria/' + encodeURIComponent(t.lecture) + '/' + Math.max(0, si) + '">' + esc(t.section) + '</a>';
  }).filter(Boolean).join(' · ');
}
function status(a) {
  if (locked(a)) return '<span class="tag">bloqueado</span>';
  var r = last(a.key); return r == null ? '<span class="tag">nuevo</span>' : '<span class="tag r' + r + '">' + RN[r] + '</span>';
}
function exRow(a) {
  var t = '<b>' + esc(a.exam.title) + ' · ' + esc(a.e.n != null ? a.e.n : a.e.id) + '</b> ' + esc(a.e.title || '') + ' <span class="tag">' + esc(a.e.kind) + '</span>';
  if (locked(a)) return '<div class="item locked" title="Tema de diseño no impartido"><span>&#128274; ' + t + '</span></div>';
  return '<a class="item" href="#/ejercicios/' + encodeURIComponent(a.key) + '"><span>' + t + '</span><span>' + status(a) + '</span></a>';
}

function vHoy() {
  var t = today(), q = [];
  var due = ALL.filter(function (a) { var x = S.ex[a.key]; return !locked(a) && x && x.due && x.due <= t; });
  q = due.slice(0, 3);
  if (q.length < 3) {
    var fresh = ALL.filter(function (a) { return !locked(a) && !S.ex[a.key]; });
    fresh.sort(function (a, b) { return exMastery(a) - exMastery(b); });
    q = q.concat(fresh.slice(0, 3 - q.length));
  }
  var h = '<h2>Misión de hoy</h2>' + missingBanner();
  if (!q.length && EXAMS.length) h += '<div class="card">Nada pendiente por hoy. Buen trabajo.</div>';
  q.forEach(function (a) { h += exRow(a); });
  h += '<p class="muted">' + due.length + ' ejercicios pendientes de repaso. ' + ALL.filter(function (a) { return !locked(a); }).length + ' desbloqueados de ' + ALL.length + '.</p>';
  return h;
}

function vList() {
  var h = '<h2>Ejercicios</h2>' + missingBanner();
  function sel(name, opts) { return '<select data-f="' + name + '"><option value="">' + name + ': todos</option>' + opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (F[name] === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') + '</select>'; }
  h += '<div class="row card">' + sel('exam', EXAMS.map(function (e) { return [e.id, e.title]; })) + sel('skill', SK.map(function (s) { return [s.id, s.label]; })) +
    sel('kind', [['analisis', 'análisis'], ['diseno', 'diseño'], ['ejs', 'ejs']]) +
    sel('status', [['new', 'nuevo'], ['due', 'pendiente hoy'], ['0', 'Fallé'], ['1', 'Dudoso'], ['2', 'Dominado'], ['locked', 'bloqueado']]) + '</div>';
  var t = today();
  var list = ALL.filter(function (a) {
    if (F.exam && a.exam.id !== F.exam) return false;
    if (F.skill && (a.e.skills || []).indexOf(F.skill) < 0) return false;
    if (F.kind && a.e.kind !== F.kind) return false;
    var s = F.status, r = last(a.key);
    if (s === 'new') return r == null && !locked(a);
    if (s === 'due') return S.ex[a.key] && S.ex[a.key].due <= t && !locked(a);
    if (s === 'locked') return locked(a);
    if (s) return r === +s;
    return true;
  });
  h += list.map(exRow).join('') || '<p class="muted">Sin resultados.</p>';
  return h;
}

function vDetail(key) {
  var a = byKey[key];
  if (!a) return '<p>Ejercicio no encontrado. <a href="#/ejercicios">Volver</a></p>';
  if (locked(a)) return '<p>&#128274; Ejercicio bloqueado (tema de diseño). Actívalo en <a href="#/ajustes">Ajustes</a>. <a href="#/ejercicios">Volver</a></p>';
  if (V.key !== key) V = { key: key, hints: 0, started: null, self: false, done: null };
  var e = a.e, sol = e.solution, hasSol = sol != null && String(sol).trim() !== '';
  var h = '<p><a href="#/ejercicios">&larr; Ejercicios</a></p><div class="card"><h2>' + esc(a.exam.title) + ' · ' + esc(e.n != null ? e.n : e.id) + ' ' + esc(e.title || '') + '</h2>' +
    '<div class="muted">' + esc(e.kind) + (e.points != null ? ' · ' + e.points + ' pts' : '') + (e.durationMin ? ' · ~' + e.durationMin + ' min' : '') + '</div>' + mdRender(e.statement) + '</div>';
  h += '<div class="card row"><span class="timer" id="tm"></span> <button class="btn" data-act="timer">' + (V.started ? 'Reiniciar cronómetro' : 'Iniciar cronómetro') + '</button></div>';
  if (V.hints >= 1) h += '<div class="card"><b>Pista 1.</b> Habilidad: ' + (e.skills || []).map(function (id) { return esc(skillById[id] ? skillById[id].label : id) + ' (' + (theoryLinks(id) || 'sin teoría') + ')'; }).join('; ') + '</div>';
  if (V.hints >= 2 && hasSol) h += '<div class="card"><b>Pista 2.</b>' + mdRender(String(sol).split('\n').filter(function (l) { return l.trim(); }).slice(0, 3).join('\n')) + '</div>';
  if (V.hints >= 3) h += hasSol ? '<div class="card"><b>Solución.</b>' + mdRender(sol) + '</div>' : '<div class="warnbox">Sin solución oficial: compara con tus apuntes o con la teoría.</div>';
  var maxH = hasSol ? 3 : 1, canRate = hasSol ? V.hints >= 3 : V.self;
  if (V.done != null) {
    h += '<div class="card">Registrado: <b>+' + V.done + ' XP</b>. <a class="btn pri" href="#/hoy">Volver a Hoy</a> <a class="btn" href="#/ejercicios">Más ejercicios</a></div>';
  } else if (canRate) {
    h += '<div class="card row">¿Cómo te fue? ' + RN.map(function (n, i) { return '<button class="btn ' + ['bad', 'warn', 'ok'][i] + '" data-act="rate" data-r="' + i + '">' + n + '</button>'; }).join('') + '</div>';
  } else {
    h += '<div class="row">';
    if (V.hints < maxH) h += '<button class="btn" data-act="hint">Mostrar pista (' + (V.hints + 1) + '/' + maxH + ')</button>';
    if (!hasSol) h += '<span class="muted">Sin solución oficial.</span>';
    if (!hasSol && V.hints >= 1) h += '<button class="btn pri" data-act="self">Ya lo comprobé por mi cuenta</button>';
    h += '</div>';
  }
  return h;
}

function examPts(ex) {
  var n = ex.exercises.length, known = ex.exercises.filter(function (e) { return e.points != null; }), sum = known.reduce(function (t, e) { return t + e.points; }, 0), p = {};
  var fill = known.length ? (known.length < n ? sum / known.length : 0) : 10 / n;
  ex.exercises.forEach(function (e) { p[e.id] = e.points != null ? e.points : fill; });
  return p;
}
function examMin(ex) { if (ex.durationMin) return ex.durationMin; var p = examPts(ex), t = 0; for (var k in p) t += p[k]; return Math.round(t * 9); }

function vExam() {
  if (!EXAMS.length) return '<h2>Examen</h2>' + missingBanner();
  if (!X) {
    var h = '<h2>Simulador de examen</h2>';
    EXAMS.forEach(function (ex) {
      var ok = (ex.exercises || []).length && !ex.exercises.some(function (e) { return locked({ e: e }); });
      h += '<div class="item' + (ok ? '' : ' locked') + '"><span>' + (ok ? '' : '&#128274; ') + esc(ex.title) + ' <span class="muted">' + (ok ? examMin(ex) + ' min' : '') + '</span></span>' + (ok ? '<button class="btn pri" data-act="exstart" data-id="' + esc(ex.id) + '">Empezar</button>' : '') + '</div>';
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
    hh += e.solution ? '<div class="card"><b>Solución</b>' + mdRender(e.solution) + '</div>' : '<div class="warnbox">Sin solución oficial.</div>';
    hh += '<div class="card row">Tu nota (0 a ' + mx.toFixed(1) + '): <input type="number" id="sc" min="0" max="' + mx + '" step="0.25" value="0"> <button class="btn pri" data-act="exnext">' + (X.i + 1 < ex.exercises.length ? 'Siguiente' : 'Finalizar') + '</button></div>';
    return hh;
  }
  var tot = 0, mxs = 0; ex.exercises.forEach(function (e) { tot += X.s[e.id] || 0; mxs += X.p[e.id]; });
  var g = Math.round(tot / mxs * 100) / 10;
  return hh + '<div class="card"><h3>Nota: ' + g.toFixed(1) + ' / 10</h3><p>+' + X.xp + ' XP</p><button class="btn pri" data-act="exquit">Cerrar</button></div>';
}

function vTheory(lid) {
  var h = '<h2>Teoría</h2>';
  if (!LECT.length) return h + '<div class="warnbox">No se encontró <code>data-lectures.js</code>.</div>';
  var cur = LECT.find(function (l) { return l.id === lid; }) || LECT[0];
  h += '<div class="theory"><div class="side">' + LECT.map(function (l) { return '<a href="#/teoria/' + encodeURIComponent(l.id) + '"' + (l === cur ? ' class="on"' : '') + '>' + esc(l.title) + '</a>'; }).join('') + '</div><div>';
  h += '<h2>' + esc(cur.title) + '</h2>';
  cur.sections.forEach(function (s, i) {
    var lv = Math.min(6, 3 + Math.max(0, (s.level || 1) - 1));
    h += '<section class="sec" id="sec-' + i + '"><h' + lv + '>' + esc(s.title) + '</h' + lv + '>' + mdRender(s.md) + '</section>';
  });
  return h + '</div></div>';
}

function vProgress() {
  var h = '<h2>Progreso</h2><div class="card">XP <b>' + S.xp + '</b> · Nivel <b>' + level() + '</b> · Racha <b>' + streak() + '</b> d&iacute;as</div><h3>Dominio por habilidad</h3>';
  if (!SK.length) h += '<p class="muted">Sin habilidades.</p>';
  SK.forEach(function (s) {
    var m = mastery(s.id), lk = !S.settings.designTaught && s.tema === 'diseno';
    h += '<div class="row" style="margin-bottom:8px;' + (lk ? 'opacity:.5' : '') + '"><span style="width:260px;max-width:100%">' + (lk ? '&#128274; ' : '') + esc(s.label) + '</span><div class="bar"><i style="width:' + Math.round(m * 100) + '%"></i></div><span class="muted">' + Math.round(m * 100) + '%</span></div>';
  });
  h += '<h3>Historial</h3>' + (S.log.slice(-30).reverse().map(function (l) { return '<div class="item"><span>' + esc(l.label) + '</span><span><span class="tag r' + l.r + '">' + RN[l.r] + '</span> +' + l.xp + ' XP · ' + esc(l.t) + '</span></div>'; }).join('') || '<p class="muted">Aún nada.</p>');
  return h;
}

function vSettings() {
  return '<h2>Ajustes</h2><div class="card"><label><input type="checkbox" data-act="design"' + (S.settings.designTaught ? ' checked' : '') + '> Tema de diseño impartido</label><p class="muted">Desbloquea ejercicios de diseño (por defecto solo análisis).</p></div>' +
    '<div class="card row"><button class="btn" data-act="export">Exportar JSON</button><label class="btn">Importar JSON<input type="file" id="imp" accept="application/json" hidden></label><button class="btn bad" data-act="reset">Reiniciar progreso</button></div><div id="io"></div>';
}

/* ---------- router ---------- */
function stats() { $('#stats').innerHTML = 'XP <b>' + S.xp + '</b> · Nv <b>' + level() + '</b> · Racha <b>' + streak() + '</b>'; }
function route() {
  stopTimers();
  var p = (location.hash || '#/hoy').slice(2).split('/').map(decodeURIComponent), tab = p[0] || 'hoy', h;
  if (tab !== 'ejercicios') V = {};
  if (tab === 'ejercicios') h = p[1] ? vDetail(p.slice(1).join('/')) : vList();
  else if (tab === 'examen') h = vExam();
  else if (tab === 'teoria') h = vTheory(p[1]);
  else if (tab === 'progreso') h = vProgress();
  else if (tab === 'ajustes') h = vSettings();
  else { tab = 'hoy'; h = vHoy(); }
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
  var b = ev.target.closest('[data-act]'); if (!b || b.tagName === 'INPUT') return;
  var act = b.dataset.act;
  if (act === 'hint') { V.hints++; rerender(); }
  else if (act === 'self') { V.self = true; rerender(); }
  else if (act === 'timer') { V.started = Date.now(); rerender(); }
  else if (act === 'rate') { V.done = rate(V.key, +b.dataset.r, Math.min(3, V.hints)); rerender(); }
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
      var t = today(); if (S.days.indexOf(t) < 0) S.days.push(t);
      S.log.push({ t: t, k: 'exam/' + X.ex.id, label: 'Examen ' + X.ex.title + ' (' + (tot / mx * 10).toFixed(1) + '/10)', r: tot / mx > 0.7 ? 2 : tot / mx > 0.4 ? 1 : 0, xp: X.xp });
      save();
    }
    route();
  }
  else if (act === 'exquit') { X = null; route(); }
  else if (act === 'export') {
    var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'dyaa-progress.json'; a.click();
  }
  else if (act === 'reset') { if (confirm('¿Borrar todo el progreso?')) { S = { settings: S.settings, ex: {}, xp: 0, days: [], log: [] }; save(); route(); } }
});
document.addEventListener('change', function (ev) {
  var t = ev.target;
  if (t.dataset && t.dataset.f) { F[t.dataset.f] = t.value; route(); }
  else if (t.dataset && t.dataset.act === 'design') { S.settings.designTaught = t.checked; save(); route(); }
  else if (t.id === 'imp' && t.files[0]) {
    var r = new FileReader();
    r.onload = function () {
      try { var o = JSON.parse(r.result); if (!o || typeof o.ex !== 'object') throw 0; S = { settings: Object.assign({ designTaught: false }, o.settings), ex: o.ex, xp: +o.xp || 0, days: o.days || [], log: o.log || [] }; save(); route(); $('#io').textContent = 'Importado.'; }
      catch (e) { $('#io').textContent = 'Archivo inválido.'; }
    };
    r.readAsText(t.files[0]);
  }
});
window.addEventListener('hashchange', route);
route();
})();
