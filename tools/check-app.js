#!/usr/bin/env node
/* Headless integration check of app.js with a tiny DOM stub (no browser needed).
   Drives the real click/change handlers: rate an exercise, skip, read theory, run an exam.
   Run: node tools/check-app.js   (exam steps are skipped when data-exams.js is absent) */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const APP = path.join(__dirname, '..', 'app');
let fails = 0;
function ok(c, m) { if (!c) { fails++; console.log('FAIL:', m); } }

const root = { dataset: {}, style: { props: {}, setProperty(k, v) { this.props[k] = v; }, removeProperty(k) { delete this.props[k]; } } };
const els = { '#app': { innerHTML: '' }, '#stats': { innerHTML: '' }, '#sc': { value: '1' }, '#io': { textContent: '' },
  '#settings-pop': { innerHTML: '', hidden: true, querySelector: () => null }, '#settings': { setAttribute() {}, focus() {} }, '#logo': { innerHTML: '' }, '#tm': { textContent: '', style: {} }, '#sw': { textContent: '' } };
const handlers = {};
const store = {};
let hash = '#/hoy';
const win = {
  katex: { renderToString: (t) => '[math]' },
  scrollTo() {}, scrollY: 0,
  addEventListener: (n, f) => { (handlers[n] = handlers[n] || []).push(f); },
  confirm: () => true,
};
const location = {
  get hash() { return hash; },
  set hash(v) { if (v !== hash) { hash = v; (handlers.hashchange || []).forEach(f => f()); } },
};
const ctx = {
  window: win, location, console,
  document: {
    querySelector: (s) => els[s] || null,
    querySelectorAll: () => [],
    getElementById: () => null,
    documentElement: root,
    addEventListener: (n, f) => { (handlers[n] = handlers[n] || []).push(f); },
  },
  localStorage: { getItem: (k) => store[k] || null, setItem: (k, v) => { store[k] = v; }, removeItem: (k) => { delete store[k]; } },
  confirm: () => true, setInterval: () => 1, clearInterval() {}, setTimeout, clearTimeout, Promise, Date, Math, JSON, Array, Object, String, Number, parseFloat, decodeURIComponent, encodeURIComponent, isNaN,
};
ctx.window.window = win;
Object.assign(ctx, { window: win });
vm.createContext(ctx);
// the app reads globals like window.X; expose the same object as globalThis for logic.js
win.document = ctx.document; win.location = location; win.localStorage = ctx.localStorage;
function run(f) { vm.runInContext(fs.readFileSync(path.join(APP, f), 'utf8'), ctx); }
run('data-lectures.js');
const hasExams = fs.existsSync(path.join(APP, 'data-exams.js'));
if (hasExams) run('data-exams.js');
run('md.js'); run('logic.js'); run('logo.js'); run('theme.js');
run('app.js');

const app = () => els['#app'].innerHTML;
const popHtml = () => els['#settings-pop'].innerHTML;
const openMenu = (sec) => { click({ act: 'settings', open: sec }); return popHtml(); };
function go(h) { location.hash = h; if (hash === h) (handlers.hashchange || []).forEach(f => f()); }
function click(attrs, tag) {
  const b = { dataset: attrs, tagName: tag || 'BUTTON' };
  (handlers.click || []).forEach(f => f({ target: { closest: () => b } }));
}

for (const r of ['#/hoy', '#/ruta', '#/ejercicios', '#/examen', '#/teoria', '#/resumen', '#/registro', '#/progreso']) {
  go(r); ok(app().length > 100, 'view renders: ' + r);
  ok(!/locked|bloquead|&#128274;/i.test(app()), 'no lock text in ' + r);
}
ok(/Ruta de estudio|Siguiente en la ruta/.test((go('#/ruta'), app())), 'Ruta shows the next step');

// theory step -> marks read and moves on
const L = win.DYAA;
// the continue button comes after the last section the step covers (a step may span subsections) and before the next one
const PATHX = L.annotateMinutes(L.buildPath(win.STAGES, win.STAGE_EX || {}, win.LECTURES, win.STAGE_AT || {}, win.QUIZZES || {}), win.LECTURES, win.EXAMS || []);
const firstReading = (stage) => PATHX.find(x => x.type === 'theory' && x.stage === stage).id;   // ids of the readings are named, not numbered
const stepOf = (href) => PATHX.find(x => x.id === decodeURIComponent(href.split('/')[4]));
function atEndOfSpan(href, idx) {
  const to = stepOf(href).to, a = app(), b = a.indexOf('data-act="theorydone"');
  const nxt = a.indexOf('id="sec-' + (to + 1) + '"');
  return a.indexOf('id="sec-' + to + '"') >= 0 && a.indexOf('id="sec-' + to + '"') < b && (nxt < 0 || b < nxt) && a.split('data-act="theorydone"').length === 2;
}
go('#/hoy');
const m = app().match(/href="(#\/teoria\/[^"]+)"/);
ok(m, 'first path step is a theory link');
if (m) {
  go(m[1].replace(/&amp;/g, '&'));
  ok(/Le&iacute;do, continuar/.test(app()), 'theory step shows the continue button');
  const idx = m[1].split('/')[3];
  ok(atEndOfSpan(m[1], idx), 'continue button sits at the end of the step\'s sections, not above the lecture');
  const sid = decodeURIComponent(m[1].split('/')[4]);
  click({ act: 'theorydone', step: sid });
  go('#/ruta');
  ok(JSON.parse(store['dyaa-practice-v1']).theory[sid] === true, 'theory step saved as read');
  ok(!/Siguiente en la ruta[^<]*[^<]*<\/div><div class="big">&#128214; Leer: Suma de los primeros n naturales/.test(app()), 'path advanced after reading');
}

{
  const bs = win.STAGES.find(g => g.id === 'bucles'), t0 = bs.theory[0], href = '#/teoria/' + encodeURIComponent(t0.lecture) + '/' + t0.idx + '/' + encodeURIComponent(t0.id ? 't:' + t0.id : 't:bucles:0');
  go(href); ok(stepOf(href).to > t0.idx && atEndOfSpan(href, t0.idx), 'a reading with subsections puts the continue button after the last of them');
}
if (hasExams) {
  // open the next exercise from the path, rate it, check XP and the "next in route" button
  const exams = win.EXAMS, stageEx = win.STAGE_EX;
  const first = stageEx.sumatorios[0];
  go('#/ejercicios/' + encodeURIComponent(first));
  ok(/Etapa 2\. /.test(app()) && /ejercicio 1 de/.test(app()), 'exercise shows its place in the stage');
  ok(!/id="tm"/.test(app()) && !/cron&oacute;metro/.test(app()), 'the exercise page has no stopwatch');
  ok(/Resumen y f&oacute;rmulas/.test((click({ act: 'hint' }), app())), 'the first hint links to the summary sheet of the etapa');
  for (let i = 0; i < 6 && /data-act="hint"/.test(app()); i++) click({ act: 'hint' });
  if (!/data-act="rate"/.test(app())) click({ act: 'self' });
  ok(/Fallé/.test(app()) && /Dominado/.test(app()), 'rating buttons appear after checking');
  click({ act: 'rate', r: '2' });
  ok(/Registrado: <b>\+/.test(app()) && /Siguiente en la ruta/.test(app()), 'rating registers XP and offers next step');
  const S = JSON.parse(store['dyaa-practice-v1']);
  ok(S.ex[first] && S.ex[first].hist.length === 1 && S.xp >= 0, 'rating persisted');
  go('#/ruta'); ok(/chk">&#10003;/.test(app()), 'rated exercise shows as done in Ruta');
  // Fallé schedules a review for tomorrow, which shows up in Hoy only when due; rated item is not due today
  const second = stageEx.sumatorios[1];
  go('#/ejercicios/' + encodeURIComponent(second));
  click({ act: 'skip', step: 'e:' + second });
  ok(JSON.parse(store['dyaa-practice-v1']).skip['e:' + second] === true, 'skip saved');
  // finishing a stage by skipping its last steps still awards the one-time bonus
  const g0 = win.STAGES[0], xp0 = JSON.parse(store['dyaa-practice-v1']).xp;
  PATHX.filter(x => x.stage === g0.id).forEach(x => click(x.type === 'theory' ? { act: 'theorydone', step: x.id } : { act: 'skip', step: x.id }));
  const S1 = JSON.parse(store['dyaa-practice-v1']);
  ok(S1.bonus[g0.id] === true && S1.xp === Math.round((xp0 + 15) * 10) / 10, 'stage bonus awarded once when the stage completes');
  // any exercise in any stage can be opened directly (nothing locked)
  const late = stageEx.voraz[stageEx.voraz.length - 1];
  go('#/ejercicios/' + encodeURIComponent(late));
  ok(/class="card"><h2>/.test(app()), 'last-stage exercise opens straight away');
  // exam simulator end to end on the first design exam
  const ex = exams.find(e => e.kind === 'diseno');
  click({ act: 'exstart', id: ex.id });
  go('#/examen'); ok(/timer/.test(app()), 'exam runs with a timer');
  click({ act: 'exend' });
  for (let i = 0; i < ex.exercises.length; i++) click({ act: 'exnext' });
  ok(/Nota: /.test(app()), 'exam finishes with a grade');
  ok(JSON.parse(store['dyaa-practice-v1']).exams[ex.id], 'exam result saved');
  click({ act: 'exquit' }, 'A'); go('#/examen'); ok(/recomendado/.test(app()), 'exam list recommends a next exam');
  go('#/progreso'); ok(/Ruta por etapas/.test(app()), 'progress lists stages');
}

const change0 = (target) => (handlers.change || []).forEach(f => f({ target }));
// summary sheets: a tab, a row in every etapa of the route, a link from the exercises, and one sheet per etapa (a tema joins its etapas')
{
  go('#/resumen');
  const sh = app(), nStages = win.STAGES.length;
  ok(/<h2 class="ttitle">Resumen<\/h2>/.test(sh) && (sh.match(/<option value=/g) || []).length === nStages, 'Resumen has a picker with every etapa');
  // Teoría and Resumen are browsed the same way: picker, filter, outline of sections, prev/next, index button on phones
  const parts = (h) => ({ picker: /<select id="lsel" data-kind="(teoria|resumen)"/.test(h), filter: /id="tocq"/.test(h), outline: /<nav class="outline"/.test(h), btn: /class="tocbtn"/.test(h), top: /id="totop"/.test(h), head: /class="thead"/.test(h), foot: /class="thead foot"/.test(h) });
  go('#/teoria'); const pt = parts(app()); go('#/resumen/sumatorios'); const pr = parts(app());
  ok(Object.keys(pt).every(k => pt[k] && pr[k]), 'both pages have the same browsing parts: ' + JSON.stringify([pt, pr]));
  ok((app().match(/data-sec="/g) || []).length === (app().match(/<section class="sec" id="sec-/g) || []).length && /class="o l1" href="#\/resumen\/sumatorios\/0"/.test(app()), 'the outline of a summary lists its sections, like a lecture');
  ok(/class="lnav"><a class="btn" href="#\/resumen\/[^"]+">&larr;/.test(app()) && /&rarr;<\/a><\/div>/.test(app()), 'with the previous and next sheet at both ends');
  change0({ id: 'lsel', dataset: { kind: 'resumen' }, value: 'bucles' }); ok(hash === '#/resumen/bucles', 'the picker of Resumen goes to that sheet');
  change0({ id: 'lsel', dataset: { kind: 'teoria' }, value: win.LECTURES[3].id }); ok(hash === '#/teoria/' + encodeURIComponent(win.LECTURES[3].id), 'and the one of Teoría to that tema');
  go('#/resumen/sumatorios/1'); ok(/id="sec-1"/.test(app()), 'a section of a summary can be linked');
  ok(win.STAGES.every(g => (win.SUMMARIES || {})[g.id] && win.SUMMARIES[g.id].length > 300), 'every etapa has a summary sheet');
  go('#/resumen/sumatorios'); ok(/Sumatorios: reglas/.test(app()) && /\[math\]/.test(app()) && /leer la teor&iacute;a completa/.test(app()), 'a sheet shows its formulas and links to the theory');
  go('#/ruta'); ok((app().match(/&#128221; Resumen y f&oacute;rmulas/g) || []).length === (app().match(/<details class="stage"/g) || []).length, 'each etapa of the route has a sheet row');
  click({ act: 'org', v: 'temas' });
  go('#/resumen/t3.2_analisis_alg_recursivos');
  ok(/Recurrencias: expansi/.test(app()) && /Recurrencias: m&eacute;todo|Recurrencias: método/.test(app()), 'a tema with two etapas shows both sheets');
  go('#/resumen/no-existe'); ok(app().length > 200, 'an unknown sheet falls back to the first one');
  click({ act: 'org', v: 'etapas' });
}

if (hasExams) {
  // an unofficial solution written in steps is revealed one step at a time
  const key = win.STAGE_EX.bucles[0], ex = win.EXAMS.find(e => key.indexOf(e.id + '/') === 0), e = ex.exercises.find(x => ex.id + '/' + x.id === key), keep = [e.solution, e.own];
  e.solution = '**Paso 1.** primero\n\n**Paso 2.** segundo\n\n**Paso 3.** tercero'; e.own = true;
  go('#/ejercicios/' + encodeURIComponent(key));
  ok(/Mostrar pista/.test(app()) && !/primero/.test(app()), 'a stepped solution starts hidden');
  click({ act: 'hint' }); click({ act: 'hint' });
  ok(/primero/.test(app()) && !/segundo/.test(app()) && /Quedan 2 de 3 pasos/.test(app()) && /no es oficial/i.test(app()), 'the first step shows alone, marked as unofficial');
  ok(!/data-act="rate"/.test(app()), 'rating waits until every step has been shown');
  click({ act: 'allsteps' });
  ok(/primero/.test(app()) && /tercero/.test(app()) && /data-act="rate"/.test(app()), 'the full solution can be shown at once');
  go('#/ruta'); ok(/<span class="tag">soluci&oacute;n propuesta<\/span>/.test(app()), 'the route marks proposed solutions apart from official ones');
  e.solution = keep[0]; e.own = keep[1];
}

// quick checks after the readings: answer, get feedback, earn XP once, move on
{
  const qs0 = PATHX.filter(x => x.type === 'quiz'), q = qs0[0], other = qs0[qs0.length - 1];
  ok(qs0.length === win.STAGES.reduce((n, g) => n + g.theory.length, 0), 'every reading is followed by a quick check in the route');
  ok(PATHX.findIndex(x => x.id === q.id) === PATHX.findIndex(x => x.id === 't:' + q.tile) + 1, 'a quick check comes right after its reading');
  const S0 = () => JSON.parse(store['dyaa-practice-v1']);
  go('#/quiz/' + encodeURIComponent(q.id));
  ok(/Comprobaci&oacute;n r&aacute;pida/.test(app()) && (app().match(/data-act="qpick"/g) || []).length >= 4 && !/data-act="quizdone"/.test(app()), 'the check lists its questions and waits for every answer');
  const qs = win.QUIZZES[q.tile], xp0 = S0().xp;
  click({ act: 'qpick', q: '0', o: String((qs[0].answer + 1) % qs[0].options.length) });
  ok(/class="why miss"/.test(app()) && /opt ok/.test(app()) && /opt bad/.test(app()), 'a wrong answer shows the right one and why');
  click({ act: 'qpick', q: '0', o: String(qs[0].answer) });
  ok(!/class="why good"/.test(app()), 'an answered question cannot be changed');
  qs.slice(1).forEach((x, i) => click({ act: 'qpick', q: String(i + 1), o: String(x.answer) }));
  ok(new RegExp((qs.length - 1) + ' de ' + qs.length).test(app()) && /data-act="quizdone"/.test(app()), 'after the last answer the score and a continue button appear');
  click({ act: 'quizdone', step: q.id });
  ok(S0().quiz[q.id].score === qs.length - 1 && S0().xp === Math.round((xp0 + qs.length - 1) * 10) / 10, 'finishing records the score and gives 1 XP per right answer');
  ok(/quiz|teoria|ruta|ejercicios/.test(hash), 'it moves on to the next step');
  go('#/quiz/' + encodeURIComponent(q.id)); ok(/repetirla no suma XP/.test(app()), 'a repeated check says it gives no XP');
  qs.forEach((x, i) => click({ act: 'qpick', q: String(i), o: String(x.answer) })); const xp1 = S0().xp; click({ act: 'quizdone', step: q.id });
  ok(S0().xp === xp1 && S0().quiz[q.id].score === qs.length, 'repeating gives no XP but keeps the best score');
  go('#/ruta'); ok(/<span class="tag r2">\d+\/\d+<\/span>/.test(app()), 'the route shows the score of a finished check');
  // a check can be skipped
  go('#/quiz/' + encodeURIComponent(other.id)); ok(/Saltar esta comprobaci/.test(app()), 'a check offers to be skipped');
  click({ act: 'skip', step: other.id }); ok(S0().skip[other.id] === true, 'skipping a check counts it as done');
  go('#/quiz/nada'); ok(/no encontrada/.test(app()), 'an unknown check says so');
}

// time estimates are shown on the route, in lists, on the exercise page and in the theory sidebar
go('#/ruta'); ok(/~\d+ min/.test(app()) && /quedan ~/.test(app()) && /estimados/.test(app()), 'Ruta shows estimated times and time left');
ok(/Tiempo estimado de la etapa: ~/.test(app()) && /class="sub">Lecci&oacute;n 1\. [^<]*<span class="t">&middot; ~/.test(app()), 'stages and groups show their total time');
go('#/hoy'); ok((/Todo el plan de hoy: ~/.test(app()) || /Meta cumplida/.test(app())) && /quedan ~[^<]* en toda la ruta/.test(app()), 'Hoy shows the time of the plan and of the whole route');
// figures from the slides: block figures, inline figures and the alt text that stands in if a file is missing
go('#/teoria/t1_intro_algoritmia'); ok(/<figure class="fig"><img class="fig" src="img\/t1-p\d+\.png" alt="Figura: [^"]+" loading="lazy"><\/figure>/.test(app()) && !/\{\{fig/.test(app()), 'theory renders slide figures with alt text');
go('#/teoria/t7_algoritmos_voraces'); ok(/hallar arm[^<]*(<[^>]+>)*\s*<img class="fig" src="img\/t7-p48\.png"/.test(app()) || /<img class="fig" src="img\/t7-p48\.png"/.test(app()), 'an inline figure renders inside its bullet');
go('#/teoria'); ok(/id="lsel"/.test(app()) && /de lectura &middot; \d+ secciones/.test(app()), 'theory page shows the reading time of the tema and a switch of tema');
go('#/teoria/t4_intro_recursividad'); ok((app().match(/class="o l\d/g) || []).length >= 30 && /class="rd/.test(app()) && /data-sec="0"/.test(app()), 'the outline lists the sections of the tema and marks where each reading of the route starts');
ok(/id="tocq"/.test(app()) && /class="tocbtn"/.test(app()) && /id="totop"/.test(app()), 'filter, mobile index button and back-to-top are there');
ok(/href="#\/teoria\/t3\.2_analisis_alg_recursivos"/.test(app()) && /href="#\/teoria\/t5_divide_y_venceras"/.test(app()), 'previous and next tema links');
go('#/teoria/t1_intro_algoritmia'); ok(!/&larr; Tema/.test(app().split('class="thead foot"')[0].split('class="thead"')[1] || ''), 'the first tema has no previous link');
if (hasExams) {
  go('#/ejercicios'); ok(/~[\d ]+(h|min)[^<]*<\/span>/.test(app()) && / en total/.test(app()), 'exercise list shows times and the total');
  go('#/ejercicios/' + encodeURIComponent(win.STAGE_EX.recursion[0])); ok(/estimados<\/div>/.test(app()) && !/\d+ pts &middot; ~\d+ min<\/div>/.test(app()), 'exercise page shows the estimate, once');
}

// streak flame: off at the start, lit after doing something today
{
  const fresh = JSON.parse(store['dyaa-practice-v1']);
  ok(/class="streak (on|risk|off)"/.test(els['#stats'].innerHTML) && /class="flame"/.test(els['#stats'].innerHTML), 'top bar shows the streak flame');
  ok(hasExams ? /streak on/.test(els['#stats'].innerHTML) : true, 'flame is lit once something was done today');
}

// settings popover: theme and accent colour, saved apart from the progress
click({ act: 'settings' });
ok(els['#settings-pop'].hidden === false && /Color de acento/.test(els['#settings-pop'].innerHTML) && /Sistema/.test(els['#settings-pop'].innerHTML), 'settings popover opens with theme and accent controls');
click({ act: 'theme', m: 'dark' });
ok(root.dataset.theme === 'dark' && store['dyaa-practice-theme'] === 'dark', 'dark theme applied and remembered');
click({ act: 'theme', m: 'system' });
ok(root.dataset.theme === undefined && store['dyaa-practice-theme'] == null, 'system theme removes the override');
click({ act: 'accent-set', c: '#7c3aed' });
ok(root.style.props['--ac'] === '#7c3aed' && root.style.props['--ac-ink'] === '#ffffff' && store['dyaa-practice-accent'] === '#7c3aed', 'preset accent applied with a readable ink and remembered');
ok(/class="sw on"[^>]*data-c="#7c3aed"/.test(els['#settings-pop'].innerHTML), 'the chosen preset is marked');
(handlers.input || []).forEach(f => f({ target: { id: 'acc-text', value: '#fde047', classList: { toggle() {}, remove() {} } } }));
ok(root.style.props['--ac'] === '#fde047' && root.style.props['--ac-ink'] === '#1a0f08', 'typed light accent gets dark ink');
ok(win.DYAA_THEME.contrast(win.DYAA_THEME.parseHex(root.style.props['--ac-text']), win.DYAA_THEME.BG.light) >= 4.5, 'accent text colour is readable on the page');
(handlers.input || []).forEach(f => f({ target: { id: 'acc-text', value: 'not a colour', classList: { toggle() {}, remove() {} } } }));
ok(root.style.props['--ac'] === '#fde047', 'an invalid colour does not change the accent');
click({ act: 'accent-reset' });
ok(root.style.props['--ac'] === undefined && store['dyaa-practice-accent'] == null, 'automatic accent restores the theme default');
click({ act: 'settings-close' }); ok(els['#settings-pop'].hidden === true, 'popover closes');
(handlers.keydown || []).forEach(f => f({ key: 'Escape' }));
ok(/<svg/.test(els['#logo'].innerHTML), 'logo is drawn in the top bar');
click({ act: 'reset' }); ok(store['dyaa-practice-theme'] == null && store['dyaa-practice-accent'] == null, 'resetting progress leaves theme and accent alone');

// route preferences: the path (whole course or first exam) and the organisation (etapas or temas), kept apart from the progress
{
  const stages = (h) => (h.match(/<details class="stage"/g) || []).length;
  go('#/ruta');
  ok(/Temario completo/.test(app()) && /Etapa 2\. Sumatorios/.test(app()) && stages(app()) === win.STAGES.length, 'default route: the whole course, by etapas');
  click({ act: 'settings' });
  ok(/Primer examen \(temas 1 a 3\)/.test(els['#settings-pop'].innerHTML) && /data-act="org"/.test(els['#settings-pop'].innerHTML), 'settings offer the route and the organisation');
  click({ act: 'scope', v: 'parcial1' });
  ok(store['dyaa-practice-path'] === 'parcial1' && /choice on[^>]*data-v="parcial1"/.test(els['#settings-pop'].innerHTML), 'path choice is remembered and marked in the popover');
  go('#/ruta');
  const analysis = win.STAGES.filter(g => g.world === 'analisis').length;
  ok(/Primer examen/.test(app()) && stages(app()) === analysis && /Fuera de esta ruta/.test(app()), 'first-exam route lists only the analysis stages and mentions the rest');
  ok(!/Simulacro: un examen completo de dise/.test(app()) , 'first-exam route has no design checkpoint');
  click({ act: 'org', v: 'temas' });
  ok(store['dyaa-practice-org'] === 'temas', 'organisation choice is remembered');
  go('#/ruta');
  ok(/Tema 3\.2\. An&aacute;lisis|Tema 3\.2\. Análisis/.test(app()) && /Tiempo estimado del tema/.test(app()) && stages(app()) === 5, 'by temas: one block per tema (3.2 merges two etapas)');
  ok(/Recurrencias: expansi/.test(app()) && /Recurrencias: m&eacute;todo|Recurrencias: método/.test(app()), 'a tema made of several etapas names each one');
  go('#/progreso'); ok(/Ruta por temas/.test(app()) && /fuera de tu ruta/.test(app()), 'progress lists temas and marks those outside the route');
  go('#/ejercicios'); ok(/<span class="muted">Tema<\/span><select data-f="stage"/.test(app()), 'exercise filter speaks of temas');
  click({ act: 'reset' }); ok(store['dyaa-practice-path'] === 'parcial1' && store['dyaa-practice-org'] === 'temas', 'resetting progress keeps the route preferences');
  click({ act: 'scope', v: 'todo' }); click({ act: 'org', v: 'etapas' });
  go('#/ruta'); ok(stages(app()) === win.STAGES.length && /Etapa 2\. Sumatorios/.test(app()), 'back to the whole course by etapas');
  click({ act: 'settings-close' });
}

// settings, activity log, stopwatch, daily plan, exam realism, exercise filters
{
  const st = () => JSON.parse(store['dyaa-practice-v1']);
  const change = (target) => (handlers.change || []).forEach(f => f({ target }));
  // some activity to look at: a reading, a skipped exercise
  click({ act: 'theorydone', step: firstReading('intro') });
  const skipStep = PATHX.find(x => x.type === 'ex'); if (skipStep) click({ act: 'skip', step: skipStep.id });
  const cfgChange = (k, v) => change({ dataset: { cfg: k }, type: typeof v === 'boolean' ? 'checkbox' : 'number', checked: v, value: String(v) });
  // log
  ok(st().log.length > 0 && st().log.every(l => l.at > 0 && l.ty && l.t), 'every log entry has a time and a type');
  ok(st().log.some(l => l.ty === 'theory') && st().log.some(l => l.ty === 'skip'), 'readings and skipped steps are logged too');
  go('#/registro'); ok(/<h2>Registro<\/h2>/.test(app()) && (app().match(/class="item logrow"/g) || []).length > 0 && /class="logday"/.test(app()), 'the log page lists what was done, by day');
  ok(/>Hoy</.test(app()) && /\d\d:\d\d/.test(app()), 'with the day and the time of each entry');
  click({ act: 'logty', v: 'theory' }); ok(!/title="skip"/.test(app()) && /title="theory"/.test(app()), 'the log can be filtered by type');
  click({ act: 'logty', v: 'exam' }); ok(/Nada de este tipo|title="exam"/.test(app()), 'a type without entries says so');
  click({ act: 'logty', v: '' });
  ok(/nav|href="#\/registro"/.test(fs.readFileSync(path.join(APP, 'index.html'), 'utf8')) && /data-tab="registro"/.test(fs.readFileSync(path.join(APP, 'index.html'), 'utf8')), 'Registro has its tab');
  // settings page
  openMenu('study'); ok(/Ajustes<\/div>/.test(popHtml()) && /Meta diaria/.test(popHtml()) && /Simulador de examen/.test(popHtml()) && /Cron&oacute;metro en ejercicios/.test(popHtml()), 'the gear menu has the study, exam and data settings');
  ok(['look', 'route', 'study', 'exam', 'data'].every(id => popHtml().indexOf('<details class="pop-sec" data-id="' + id + '"') >= 0), 'the menu is split in sections: look, route, study, exam, data');
  ok(!/\bajustes\b.*<h2>|<h2>Ajustes/i.test(app()), 'there is no Ajustes page any more');
  for (const r of ['#/hoy', '#/ruta', '#/ejercicios', '#/examen', '#/teoria', '#/resumen', '#/registro', '#/progreso']) { go(r); ok(!/href="#\/ajustes"/.test(app()), 'no link to a settings page in ' + r); }
  click({ act: 'settings', open: 'x' }); click({ act: 'settings-close' });
  go('#/ajustes'); ok(els['#settings-pop'].hidden === false && /data-id="data" open/.test(popHtml()), 'the old settings address opens the menu at the data section');
  ok(/<h2>Misi&oacute;n de hoy/.test(app()), 'and shows Hoy behind it');
  click({ act: 'settings-close' });
  go('#/examen'); if (hasExams) { click({ act: 'settings', open: 'exam' }); ok(els['#settings-pop'].hidden === false && /data-id="exam" open/.test(popHtml()), 'the exam page opens the exam section of the menu'); }
  click({ act: 'settings-close' });
  (handlers.toggle || []).forEach(f => f({ target: { classList: { contains: () => true }, dataset: { id: 'look' }, open: true } })); openMenu('study');
  ok(/data-id="look" open/.test(popHtml()) && /data-id="study" open/.test(popHtml()), 'sections the user opened stay open');
  (handlers.toggle || []).forEach(f => f({ target: { classList: { contains: () => true }, dataset: { id: 'look' }, open: false } }));
  click({ act: 'settings-close' });
  ok(st().cfg.timer === false && st().cfg.extimer === true && st().cfg.daily === 30, 'defaults: no stopwatch on exercises, clock in exams, 30 minutes');
  openMenu('study');
  cfgChange('timer', true); ok(st().cfg.timer === true && /data-cfg="timer" checked/.test(popHtml()), 'the stopwatch can be turned on');
  cfgChange('daily', 45); ok(st().cfg.daily === 45, 'the daily goal can be typed');
  click({ act: 'cfgset', k: 'daily', v: '60' }); ok(st().cfg.daily === 60, 'or picked');
  cfgChange('daily', 2); ok(st().cfg.daily === 30, 'an absurd goal falls back to the default');
  cfgChange('extimer', false); ok(/data-cfg="exauto" disabled/.test(popHtml()), 'the automatic end needs the clock'); cfgChange('extimer', true);
  // stopwatch on an exercise: shown only when on, and the time goes to the log
  const unrated = win.EXAMS.length ? Object.keys(win.STAGE_EX).map(k => win.STAGE_EX[k]).reduce((a, b) => a.concat(b), []).find(k => !(st().ex[k] && st().ex[k].hist.length)) : null;
  if (unrated) {
    const RealDate = ctx.Date; let now = 1.8e12;
    ctx.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [now])); } static now() { return now; } };
    go('#/ejercicios/' + encodeURIComponent(unrated)); ok(/id="sw"/.test(app()), 'the stopwatch shows on an exercise when it is on');
    now += 95000; click({ act: 'rate', r: '2' });
    const e1 = st().log[st().log.length - 1];
    ok(e1.ty === 'ex' && e1.sec === 95 && e1.m > 0 && e1.xp > 0, 'the time taken is logged with the exercise: ' + JSON.stringify(e1));
    ok(/>1:35</.test(app()), 'and stays frozen on screen once rated');
    go('#/registro'); ok(/&#9201; 1:35/.test(app()) && /medido 1:35/.test(app()), 'the log shows the measured time, also in the day total');
    ctx.Date = RealDate;
    cfgChange('timer', false);
    const un2 = Object.keys(win.STAGE_EX).map(k => win.STAGE_EX[k]).reduce((a, b) => a.concat(b), []).find(k => !(st().ex[k] && st().ex[k].hist.length));
    go('#/ejercicios/' + encodeURIComponent(un2)); ok(!/id="sw"/.test(app()), 'no stopwatch when it is off');
    click({ act: 'rate', r: '1' }); ok(!('sec' in st().log[st().log.length - 1]), 'and no time is stored');
  }
  // daily plan
  cfgChange('daily', 480); go('#/hoy'); ok(/Tu meta de hoy: 480 min/.test(app()) && /Quedan \d+ min/.test(app()) && !/Meta cumplida/.test(app()), 'Hoy shows the daily goal and what is left');
  const big = (app().match(/class="item step/g) || []).length;
  cfgChange('daily', 15); go('#/hoy'); ok(/Tu meta de hoy: 15 min/.test(app()), 'the goal follows the setting');
  const doneMin = Math.round(st().log.filter(l => l.t === L.dstr() && l.ty !== 'skip').reduce((t, l) => t + L.logMinutes(l), 0));
  ok(doneMin >= 15 ? /Meta cumplida/.test(app()) : !/Meta cumplida/.test(app()), 'the goal is met when what was done today covers it (' + doneMin + ' min done)');
  cfgChange('daily', 480); go('#/hoy'); ok((app().match(/class="item step/g) || []).length >= big, 'a bigger goal never plans less');
  cfgChange('daily', 30);
  // exercise filters
  go('#/ejercicios'); ok(/class="chip on" data-act="fset" data-f="status" data-v=""/.test(app()) && !/Quitar filtros/.test(app()), 'filters start cleared');
  click({ act: 'fset', f: 'status', v: 'new' }); ok(/class="chip on" data-act="fset" data-f="status" data-v="new"/.test(app()) && /Quitar filtros \(1\)/.test(app()), 'a chip filters and says how many filters are on');
  change({ dataset: { f: 'kind' }, value: 'analisis' });
  click({ act: 'fclear' }); ok(!/Quitar filtros/.test(app()), 'all filters can be cleared at once');
  // exams: individual access and realism
  if (hasExams) {
    const ex = win.EXAMS.find(e => e.kind === 'diseno'), key = ex.id + '/' + ex.exercises[0].id;
    go('#/examen'); ok(/class="exparts"/.test(app()) && app().indexOf('href="#/ejercicios/' + encodeURIComponent(key) + '"') >= 0, 'each exam lists its exercises to do one by one');
    ok(/Hacer entero|Repetir entero/.test(app()) && /Realismo/.test(app()), 'and offers the whole exam, with the realism in force');
    go('#/ejercicios/' + encodeURIComponent(key)); ok(/data-act="hint"/.test(app()), 'an exercise of an exam has hints and solution like any other');
    // default realism: no help while sitting
    click({ act: 'exstart', id: ex.id }); go('#/examen');
    ok(/id="tm"/.test(app()) && !/data-act="exhint"/.test(app()) && !/data-act="exsol"/.test(app()), 'by default there is a clock and no help during the exam');
    click({ act: 'exquit' });
    // relaxed: help costs XP
    click({ act: 'expreset', v: 'relax' }); ok(st().cfg.exhints && st().cfg.exans && !st().cfg.exauto, 'the relaxed preset turns the help on');
    openMenu('exam'); ok(/choice on" data-act="expreset" data-v="relax"/.test(popHtml()), 'and shows which preset is active');
    click({ act: 'exstart', id: ex.id }); go('#/examen');
    ok((app().match(/data-act="exhint"/g) || []).length === ex.exercises.length && (app().match(/data-act="exsol"/g) || []).length === ex.exercises.length, 'every exercise has its own hint and solution buttons');
    const first = ex.exercises[0].id;
    click({ act: 'exhint', id: first }); ok(/class="help"><b>Pista\./.test(app()), 'a hint shows under that exercise');
    click({ act: 'exsol', id: ex.exercises[1] ? ex.exercises[1].id : first }); ok(/class="help">(<b>Soluci|Sin soluci)/.test(app()), 'and so does a solution');
    click({ act: 'exend' });
    const maxXp = 20;
    // the box with the mark is read from #sc: give each exercise its full points
    const realSc = els['#sc'];
    ex.exercises.forEach((e) => { els['#sc'] = { value: String(win.DYAA.examPts(ex)[e.id]) }; click({ act: 'exnext' }); });
    els['#sc'] = realSc;
    const done = st().log[st().log.length - 1], xpGot = done.xp;
    ok(done.ty === 'exam' && done.help === (ex.exercises.length > 1 ? 2 : 1) && xpGot < maxXp && xpGot > 0, 'help during the exam lowers the XP and is logged: ' + JSON.stringify(done));
    ok(/con ayudas en \d/.test(app()) && /Nota: 10\.0/.test(app()), 'the result says so, and the mark itself is left alone');
    click({ act: 'exquit' }, 'A');
    // strict: ends by itself when the time is up
    click({ act: 'expreset', v: 'real' }); ok(st().cfg.exauto && !st().cfg.exhints, 'the real exam preset turns the help off and the automatic end on');
    let tick = null; const RealSetInterval = ctx.setInterval; ctx.setInterval = (fn) => { tick = fn; return 1; };
    const RealDate2 = ctx.Date; let now2 = 1.9e12; ctx.Date = class extends RealDate2 { constructor(...a) { super(...(a.length ? a : [now2])); } static now() { return now2; } };
    click({ act: 'exstart', id: ex.id }); go('#/examen');
    ok(tick && /id="tm"/.test(app()), 'the clock ticks during the exam');
    now2 += 60000; tick(); ok(/id="tm"/.test(app()) && !/Tu nota/.test(app()), 'still sitting while there is time');
    now2 += win.DYAA.examMin(ex) * 60000; tick(); ok(/Tu nota/.test(app()), 'the exam passes to marking by itself when the time is up');
    click({ act: 'exquit' });
    cfgChange('extimer', false); click({ act: 'exstart', id: ex.id }); go('#/examen');
    ok(!/id="tm"/.test(app()) && /Sin l&iacute;mite de tiempo/.test(app()), 'without the clock there is no limit');
    click({ act: 'exquit' });
    ctx.Date = RealDate2; ctx.setInterval = RealSetInterval;
    cfgChange('extimer', true);
  }
  cfgChange('timer', true);   // the reset below must keep it
}

// study without paper: the mode, the practice activities, what Hoy and the route propose
{
  const st = () => JSON.parse(store['dyaa-practice-v1']);
  const change = (target) => (handlers.change || []).forEach(f => f({ target }));
  const navHtml = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
  ok(/<a href="#\/practica" data-tab="practica">Sin papel<\/a>/.test(navHtml), 'the practice without paper has its own tab in the top bar');
  go('#/hoy'); ok(!/#\/practica/.test(app()) && !/Pr&aacute;ctica en pantalla/.test(app()) && !/Hoy estudio/.test(app()), 'and nothing about it is added to Hoy');
  openMenu('study'); ok(/data-cfg="nopaper"/.test(popHtml()), 'the gear menu has the paperless setting too'); click({ act: 'settings-close' });
  go('#/ejercicios'); ok(!/Modo sin papel/.test(app()) && !/&#9998; papel/.test(app()), 'with paper nothing changes in the exercises');
  click({ act: 'cfgset', k: 'daily', v: '480' }); go('#/hoy'); ok(!hasExams || /href="#\/ejercicios\//.test(app()), 'with paper and a long day, Hoy does propose exercises');
  click({ act: 'cfgtoggle', k: 'nopaper', v: '1' }); ok(st().cfg.nopaper === true, 'the mode is saved with the settings');
  go('#/hoy'); ok(!/href="#\/ejercicios\//.test(app()), 'without paper Hoy proposes no exercise');
  openMenu('study'); ok(/data-cfg="nopaper" checked/.test(popHtml()), 'the gear menu shows the mode on'); click({ act: 'settings-close' });
  go('#/ejercicios'); ok(/Modo sin papel/.test(app()) && /&#9998; papel/.test(app()), 'the exercise list says they need paper and marks each one');
  if (hasExams) { go('#/examen'); ok(/Modo sin papel/.test(app()), 'and so does the exam list'); }
  const stepsNow = L.nextSteps(PATHX.filter(L.paperFree), st(), win.EXAMS || [], 3);
  go('#/ruta'); ok(stepsNow.length === 0 || (/Siguiente en la ruta/.test(app()) && !/class="big">[^<]*Ejercicios adicionales/.test(app())), 'the route proposes a reading or a check next');
  // practice menu
  go('#/practica'); ok(/Pr&aacute;ctica sin papel/.test(app()) && /href="#\/practica\/test"/.test(app()) && /Ordenar los pasos/.test(app()) && !/arjeta/.test(app()), 'the practice page offers the mixed test and the ordering');
  // mixed test
  const before = st().xp;
  go('#/practica/test'); const nq = (app().match(/class="card quiz"/g) || []).length;
  ok(nq === 8 && !/data-act="testdone"/.test(app()), 'a mixed test has eight questions');
  for (let i = 0; i < nq; i++) click({ act: 'qpick', q: String(i), o: '0' });
  const wrong = (app().match(/class="opt bad"/g) || []).length, right = nq - wrong;
  ok(/data-act="testdone"/.test(app()) && new RegExp(right + ' de 8').test(app()), 'answering all shows the score and offers to register it');
  click({ act: 'testdone' }); const logN = st().log.length;
  ok(st().log[logN - 1].ty === 'mix' && st().log[logN - 1].xp === right * 0.5 && Math.abs(st().xp - before - right * 0.5) < 0.01, 'the test is logged and gives half an XP per right answer (' + right + ' right)');
  click({ act: 'testdone' }); ok(st().log.length === logN, 'registering twice does not count twice');
  ok(/data-act="pnew" data-k="test"/.test(app()), 'and another test can be started');
  click({ act: 'pnew', k: 'test' }); ok((app().match(/class="card quiz"/g) || []).length === 8 && !/Registrado/.test(app()), 'a new test starts clean');
  // putting the steps in order (needs a proposed solution written in steps)
  if (hasExams) {
    const ex0 = win.EXAMS.find(e => e.kind === 'analisis') || win.EXAMS[0], e0 = ex0.exercises[0], keep = [e0.solution, e0.own];
    e0.solution = '**Paso 1.** primero\n\n**Paso 2.** segundo\n\n**Paso 3.** tercero\n\n**Paso 4.** cuarto'; e0.own = true;
    go('#/practica'); ok(/href="#\/practica\/pasos"/.test(app()), 'with such a solution the ordering exercise is available');
    go('#/practica/pasos'); const np = (app().match(/data-act="opick"/g) || []).length;
    ok(np >= 3 && /Toca los pasos/.test(app()), 'the steps come as buttons to tap');
    const lg = st().log.length;
    for (let i = 0; i < np; i++) click({ act: 'opick', i: String(i) });   // in the original order
    ok(new RegExp(np + ' de ' + np + ' pasos en su sitio').test(app()) && /perfecto/.test(app()), 'tapping them in the right order is a perfect score');
    ok(st().log.length === lg + 1 && st().log[lg].ty === 'order' && st().log[lg].xp === 2, 'it is logged, 2 XP for all in place');
    click({ act: 'opick', i: '0' }); ok(st().log.length === lg + 1, 'taps after the end do nothing');
    click({ act: 'pnew', k: 'pasos' }); const np2 = (app().match(/data-act="opick"/g) || []).length;
    for (let i = np2 - 1; i >= 0; i--) click({ act: 'opick', i: String(i) });   // backwards
    ok(/El orden de la soluci&oacute;n/.test(app()) && /class="miss"/.test(app()), 'a wrong order shows the right one');
    click({ act: 'pnew', k: 'pasos' }); const np3 = (app().match(/data-act="opick"/g) || []).length; click({ act: 'opick', i: '1' }); ok(/Deshacer/.test(app()) && (app().match(/data-act="opick"/g) || []).length === np3 - 1, 'a tapped step leaves the list'); click({ act: 'oundo' }); ok(!/Deshacer/.test(app()) && (app().match(/data-act="opick"/g) || []).length === np3, 'and a tap can be undone');
    e0.solution = keep[0]; e0.own = keep[1];
  }
  // the log can show only this kind of practice
  go('#/registro'); click({ act: 'logty', v: 'paperless' }); ok(/title="mix"|title="order"/.test(app()) && !/title="ex"|title="theory"/.test(app()), 'the log can be filtered to practice without paper');
  click({ act: 'logty', v: '' });
  // nothing left to read: say so instead of claiming the route is done
  click({ act: 'cfgtoggle', k: 'nopaper', v: '0' }); ok(st().cfg.nopaper === false, 'and back to paper');
  click({ act: 'cfgset', k: 'daily', v: '30' });
  go('#/ejercicios'); ok(!/Modo sin papel/.test(app()), 'the notes are gone with the mode');
}

// export/import round trip keeps state
const before = store['dyaa-practice-v1'];
click({ act: 'reset' }); ok(JSON.parse(store['dyaa-practice-v1']).xp === 0, 'reset clears progress');
ok(JSON.parse(store['dyaa-practice-v1']).cfg.timer === true && JSON.parse(store['dyaa-practice-v1']).log.length === 0, 'but keeps the settings');
{ const c = (handlers.change || []); c.forEach(f => f({ target: { dataset: { cfg: 'timer' }, type: 'checkbox', checked: false } })); }

// progress shared through a file, with a fake File System Access API and a tiny in-memory IndexedDB
const wait = (ms) => new Promise(r => setTimeout(r, ms || 15));
(async () => {
  openMenu('data'); ok(/D&oacute;nde se guarda el progreso/.test(popHtml()) && /no permite elegir un archivo/.test(popHtml()), 'without the File System Access API the settings explain it and point to export/import');
  const idbData = {}, req = (v) => { const q = { result: v }; setTimeout(() => q.onsuccess && q.onsuccess()); return q; };
  win.indexedDB = { open() { const r = {}; setTimeout(() => { r.result = { createObjectStore() {}, transaction: () => ({ objectStore: () => ({ put: (v, k) => { idbData[k] = v; return req(); }, get: (k) => req(idbData[k]), delete: (k) => { delete idbData[k]; return req(); } }) }) }; r.onupgradeneeded && r.onupgradeneeded(); r.onsuccess && r.onsuccess(); }); return r; } };
  const file = { text: '', perm: 'granted' };
  const handle = { name: 'dyaa-progreso.json', queryPermission: async () => file.perm, requestPermission: async () => (file.perm = 'granted'), getFile: async () => ({ text: async () => file.text }), createWritable: async () => { let buf = ''; return { write: async (t) => { buf += t; }, close: async () => { file.text = buf; } }; } };
  win.showSaveFilePicker = async () => handle; win.showOpenFilePicker = async () => [handle];
  const local = () => JSON.parse(store['dyaa-practice-v1']);
  click({ act: 'theorydone', step: firstReading('sumatorios') }); const xp0 = local().xp;
  go('#/hoy'); ok(/Guarda tu progreso en un archivo/.test(app()) && /Ya tengo uno/.test(app()), 'on the first page the offer to keep the progress in a file is shown');
  go('#/ruta'); ok(!/Guarda tu progreso en un archivo/.test(app()), 'and only there');
  click({ act: 'sync-later' }); await wait(20); go('#/hoy'); ok(!/Guarda tu progreso en un archivo/.test(app()), '"Ahora no" is remembered');
  openMenu('data'); ok(/Crear un archivo de progreso/.test(popHtml()) && /solo este perfil/.test(popHtml()), 'with the API the settings offer to create or pick a file');
  click({ act: 'sync-new' }); await wait(60);
  ok(file.text && JSON.parse(file.text).theory[firstReading('sumatorios')] === true && store['dyaa-practice-sync'] === 'file', 'creating the file writes this profile\'s progress into it');
  openMenu('data'); ok(/dyaa-progreso\.json/.test(popHtml()) && /al d&iacute;a/.test(popHtml()), 'settings show the shared file as up to date');
  // a change is written to the file shortly after
  click({ act: 'theorydone', step: firstReading('asintotica') }); await wait(450);
  ok(JSON.parse(file.text).theory[firstReading('asintotica')] === true, 'every change is written to the shared file');
  // the other profile moves on: this one picks it up when the tab gets the focus
  click({ act: 'cfgset', k: 'daily', v: '45' });
  const other = JSON.parse(file.text); delete other.cfg; other.theory[firstReading('bucles')] = true; other.theory['t:sumatorios:0'] = true; other.ver = 1; other.xp = 77; other.updated = Date.now() + 5000; file.text = JSON.stringify(other);   // progress saved by an older version: numbered readings
  (handlers.focus || []).forEach(f => f()); await wait(60);
  ok(local().xp === 77 && local().theory[firstReading('bucles')] === true, 'a newer file is adopted on focus');
  ok(local().cfg.daily === 45, 'a shared file from before the settings existed does not reset them');
  ok(local().theory['t:t21-sumas-basicas'] === true && !('t:sumatorios:0' in local().theory) && local().ver === 2, 'old numbered readings are moved to the named reading that contains their section');
  ok(JSON.parse(store['dyaa-practice-backup']).xp !== 77, 'the profile\'s own progress is kept as a backup before it is replaced');
  // both changed: the user chooses (here: keep this profile, which overwrites the file)
  click({ act: 'theorydone', step: firstReading('expansion') });   // changes before the debounce fires
  const theirs = JSON.parse(file.text); theirs.xp = 123; theirs.updated = Date.now() + 9000; file.text = JSON.stringify(theirs);
  ctx.confirm = () => false;
  (handlers.focus || []).forEach(f => f()); await wait(80);
  ok(local().theory[firstReading('expansion')] === true && JSON.parse(file.text).theory[firstReading('expansion')] === true, 'on a conflict, keeping this profile overwrites the file');
  ctx.confirm = () => true;
  // permission that has to be granted again (each new session): a banner, and one click fixes it
  file.perm = 'prompt'; click({ act: 'sync-now' }); await wait(60);
  ok(file.perm === 'granted', 'the permission is requested from the click');
  // a new session: the permission lapsed. The first click anywhere asks for it, no need to find a button
  file.perm = 'prompt'; (handlers.focus || []).forEach(f => f()); await wait(40);
  go('#/hoy'); ok(/Haz clic en cualquier parte/.test(app()), 'a lapsed permission shows a banner');
  click({ act: 'nothing' }); await wait(60);
  ok(file.perm === 'granted', 'the first click on the page asks for the permission');
  go('#/hoy'); ok(!/Haz clic en cualquier parte/.test(app()), 'and the banner is gone');
  // another profile saved while this one was changing: the pending write reads first and does not overwrite it
  const mine = local().xp; click({ act: 'theorydone', step: firstReading('bucles') });
  const rival = JSON.parse(file.text); rival.xp = 555; rival.theory['t:t21-sumas-basicas'] = true; rival.updated = Date.now() + 20000; file.text = JSON.stringify(rival);
  ctx.confirm = () => true; await wait(600);
  ok(local().xp === 555 && JSON.parse(file.text).xp === 555, 'a write that would overwrite a newer file asks first instead (' + mine + ' XP here)');
  // stop sharing
  click({ act: 'sync-off' }); await wait(40);
  ok(store['dyaa-practice-sync'] == null, 'stopping the sharing forgets the file');
  openMenu('data'); ok(/solo este perfil/.test(popHtml()), 'back to this profile only');
  console.log(fails ? fails + ' FAILURES' : 'app checks passed');
  process.exit(fails ? 1 : 0);
})();
