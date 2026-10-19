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
  '#settings-pop': { innerHTML: '', hidden: true, querySelector: () => null }, '#settings': { setAttribute() {}, focus() {} }, '#logo': { innerHTML: '' } };
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
  confirm: () => true, setInterval: () => 1, clearInterval() {}, Date, Math, JSON, Array, Object, String, Number, parseFloat, decodeURIComponent, encodeURIComponent, isNaN,
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
function go(h) { location.hash = h; if (hash === h) (handlers.hashchange || []).forEach(f => f()); }
function click(attrs, tag) {
  const b = { dataset: attrs, tagName: tag || 'BUTTON' };
  (handlers.click || []).forEach(f => f({ target: { closest: () => b } }));
}

for (const r of ['#/hoy', '#/ruta', '#/ejercicios', '#/examen', '#/teoria', '#/progreso', '#/ajustes']) {
  go(r); ok(app().length > 100, 'view renders: ' + r);
  ok(!/locked|bloquead|&#128274;/i.test(app()), 'no lock text in ' + r);
}
ok(/Ruta de estudio|Siguiente en la ruta/.test((go('#/ruta'), app())), 'Ruta shows the next step');

// theory step -> marks read and moves on
const L = win.DYAA;
// the continue button comes after the last section the step covers (a step may span subsections) and before the next one
const PATHX = L.annotateMinutes(L.buildPath(win.STAGES, win.STAGE_EX || {}, win.LECTURES), win.LECTURES, win.EXAMS || []);
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
  const bs = win.STAGES.find(g => g.id === 'bucles'), t0 = bs.theory[0], href = '#/teoria/' + encodeURIComponent(t0.lecture) + '/' + t0.idx + '/' + encodeURIComponent('t:bucles:0');
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
  g0.theory.forEach((t, i) => click({ act: 'theorydone', step: 't:' + g0.id + ':' + i }));
  stageEx[g0.id].forEach(k => click({ act: 'skip', step: 'e:' + k }));
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

// summary sheets: a tab, a row in every etapa of the route, a link from the exercises, and one sheet per etapa (a tema joins its etapas')
{
  go('#/resumen');
  const sh = app(), nStages = win.STAGES.length;
  ok(/<h2>Resumen<\/h2>/.test(sh) && (sh.match(/href="#\/resumen\//g) || []).length >= nStages, 'Resumen lists every etapa');
  ok(win.STAGES.every(g => (win.SUMMARIES || {})[g.id] && win.SUMMARIES[g.id].length > 300), 'every etapa has a summary sheet');
  go('#/resumen/sumatorios'); ok(/Sumatorios: reglas/.test(app()) && /\[math\]/.test(app()) && /Leer la teor&iacute;a completa/.test(app()), 'a sheet shows its formulas and links to the theory');
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

// time estimates are shown on the route, in lists, on the exercise page and in the theory sidebar
go('#/ruta'); ok(/~\d+ min/.test(app()) && /quedan ~/.test(app()) && /estimados/.test(app()), 'Ruta shows estimated times and time left');
ok(/Tiempo estimado de la etapa: ~/.test(app()) && /class="sub">Teor&iacute;a <span class="t">&middot; ~/.test(app()), 'stages and groups show their total time');
go('#/hoy'); ok(/Estos \d+ pasos: ~/.test(app()) && /en toda la ruta/.test(app()), 'Hoy shows the time of the next steps and of the whole route');
// figures from the slides: block figures, inline figures and the alt text that stands in if a file is missing
go('#/teoria/t1_intro_algoritmia'); ok(/<figure class="fig"><img class="fig" src="img\/t1-p\d+\.png" alt="Figura: [^"]+" loading="lazy"><\/figure>/.test(app()) && !/\{\{fig/.test(app()), 'theory renders slide figures with alt text');
go('#/teoria/t7_algoritmos_voraces'); ok(/hallar arm[^<]*(<[^>]+>)*\s*<img class="fig" src="img\/t7-p48\.png"/.test(app()) || /<img class="fig" src="img\/t7-p48\.png"/.test(app()), 'an inline figure renders inside its bullet');
go('#/teoria'); ok(/de lectura<\/span><\/a>/.test(app()), 'theory sidebar shows the reading time of each tema');
if (hasExams) {
  go('#/ejercicios'); ok(/~[\d ]+(h|min)[^<]*<\/span>/.test(app()) && /en total\./.test(app()), 'exercise list shows times and the total');
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
  go('#/ejercicios'); ok(/tema: todos/.test(app()), 'exercise filter speaks of temas');
  click({ act: 'reset' }); ok(store['dyaa-practice-path'] === 'parcial1' && store['dyaa-practice-org'] === 'temas', 'resetting progress keeps the route preferences');
  click({ act: 'scope', v: 'todo' }); click({ act: 'org', v: 'etapas' });
  go('#/ruta'); ok(stages(app()) === win.STAGES.length && /Etapa 2\. Sumatorios/.test(app()), 'back to the whole course by etapas');
  click({ act: 'settings-close' });
}

// export/import round trip keeps state
const before = store['dyaa-practice-v1'];
click({ act: 'reset' }); ok(JSON.parse(store['dyaa-practice-v1']).xp === 0, 'reset clears progress');
console.log(fails ? fails + ' FAILURES' : 'app checks passed');
process.exit(fails ? 1 : 0);
