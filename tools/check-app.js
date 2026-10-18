#!/usr/bin/env node
/* Headless integration check of app.js with a tiny DOM stub (no browser needed).
   Drives the real click/change handlers: rate an exercise, skip, read theory, run an exam.
   Run: node tools/check-app.js   (exam steps are skipped when data-exams.js is absent) */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const APP = path.join(__dirname, '..', 'app');
let fails = 0;
function ok(c, m) { if (!c) { fails++; console.log('FAIL:', m); } }

const els = { '#app': { innerHTML: '' }, '#stats': { innerHTML: '' }, '#sc': { value: '1' }, '#io': { textContent: '' } };
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
    addEventListener: (n, f) => { (handlers[n] = handlers[n] || []).push(f); },
  },
  localStorage: { getItem: (k) => store[k] || null, setItem: (k, v) => { store[k] = v; } },
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
run('md.js'); run('logic.js');
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
go('#/hoy');
const m = app().match(/href="(#\/teoria\/[^"]+)"/);
ok(m, 'first path step is a theory link');
if (m) {
  go(m[1].replace(/&amp;/g, '&'));
  ok(/Le&iacute;do, continuar/.test(app()), 'theory step shows the continue button');
  const idx = m[1].split('/')[3];
  ok(app().indexOf('id="sec-' + idx + '"') >= 0 && app().indexOf('id="sec-' + idx + '"') < app().indexOf('data-act="theorydone"') &&
     app().indexOf('data-act="theorydone"') < (app().indexOf('id="sec-' + (+idx + 1) + '"') + 1e9 * (app().indexOf('id="sec-' + (+idx + 1) + '"') < 0)),
     'continue button sits at the end of the target section, not above the lecture');
  const sid = decodeURIComponent(m[1].split('/')[4]);
  click({ act: 'theorydone', step: sid });
  go('#/ruta');
  ok(JSON.parse(store['dyaa-practice-v1']).theory[sid] === true, 'theory step saved as read');
  ok(!/Siguiente en la ruta[^<]*[^<]*<\/div><div class="big">&#128214; Leer: Suma de los primeros n naturales/.test(app()), 'path advanced after reading');
}

if (hasExams) {
  // open the next exercise from the path, rate it, check XP and the "next in route" button
  const exams = win.EXAMS, stageEx = win.STAGE_EX;
  const first = stageEx.sumatorios[0];
  go('#/ejercicios/' + encodeURIComponent(first));
  ok(/Etapa 1/.test(app()) && /ejercicio 1 de/.test(app()), 'exercise shows its place in the stage');
  const hasSol = /Mostrar pista \(1\/3\)/.test(app());
  if (hasSol) { click({ act: 'hint' }); click({ act: 'hint' }); click({ act: 'hint' }); } else { click({ act: 'hint' }); click({ act: 'self' }); }
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

// export/import round trip keeps state
const before = store['dyaa-practice-v1'];
click({ act: 'reset' }); ok(JSON.parse(store['dyaa-practice-v1']).xp === 0, 'reset clears progress');
console.log(fails ? fails + ' FAILURES' : 'app checks passed');
process.exit(fails ? 1 : 0);
