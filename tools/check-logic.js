#!/usr/bin/env node
/* Sanity checks for the roadmap data and pure logic. Run: node tools/check-logic.js
   Needs app/data-lectures.js (always) and app/data-exams.js (exam checks are skipped without it). */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const APP = path.join(__dirname, '..', 'app');
const ctx = { window: {} };
vm.createContext(ctx);
const win = ctx.window;
function load(f) { vm.runInContext(fs.readFileSync(path.join(APP, f), 'utf8'), ctx); }
load('data-lectures.js');
const hasExams = fs.existsSync(path.join(APP, 'data-exams.js'));
if (hasExams) load('data-exams.js');
const L = require(path.join(APP, 'logic.js'));
let fails = 0;
function ok(c, m) { if (!c) { fails++; console.log('FAIL:', m); } }

const g = (k) => win[k];
const lectures = g('LECTURES'), stages = g('STAGES'), skills = g('SKILLS');
ok(lectures && lectures.length >= 9, 'lectures loaded (temas 1-7)');
ok(stages && stages.length, 'stages loaded');

// readings: every one is a range of sections of a lecture, the ranges of a lecture never overlap, and none is too long to read in one go
const lm = {}; lectures.forEach(l => lm[l.id] = l);
const tileIds = new Set(), covered = {};
stages.forEach(s => {
  ok((s.theory || []).length > 0, 'every etapa has at least one reading: ' + s.id);
  (s.theory || []).forEach(t => {
    const lec = lm[t.lecture];
    ok(t.id && !tileIds.has(t.id), 'reading has a unique id: ' + t.id); tileIds.add(t.id);
    ok(lec && t.idx >= 0 && t.upto >= t.idx && t.upto < lec.sections.length, 'reading is a valid range of its lecture: ' + t.id);
    if (!lec) return;
    for (let i = t.idx; i <= t.upto; i++) { const k = t.lecture + '#' + i; ok(!covered[k], 'section ' + i + ' of ' + t.lecture + ' is in two readings: ' + t.id + ' and ' + covered[k]); covered[k] = t.id; }
    ok(L.readMinutes(lec.sections, t.idx, t.upto) <= 15, 'a reading takes at most 15 minutes: ' + t.id + ' = ' + L.readMinutes(lec.sections, t.idx, t.upto));
  });
});
// readings follow the order of the lecture across etapas
{
  const lastIdx = {};
  stages.forEach(s => s.theory.forEach(t => { ok(!(t.lecture in lastIdx) || t.idx > lastIdx[t.lecture], 'readings go in lecture order: ' + t.id); lastIdx[t.lecture] = t.upto; }));
}
// quick checks: one per reading, each question well formed, and the right answer is not always in the same place
{
  const Q = win.QUIZZES || {}, pos = {};
  Object.keys(Q).forEach(id => {
    ok(tileIds.has(id), 'a quick check belongs to a reading: ' + id);
    ok(Q[id].length >= 2 && Q[id].length <= 5, 'a quick check has 2 to 5 questions: ' + id);
    Q[id].forEach(q => {
      ok(q.q && q.why && q.options.length >= 2 && q.options.length <= 5 && q.answer >= 0 && q.answer < q.options.length, 'well formed question in ' + id + ': ' + String(q.q).slice(0, 40));
      ok(new Set(q.options).size === q.options.length, 'no repeated options in ' + id + ': ' + String(q.q).slice(0, 40));
      pos[q.answer] = (pos[q.answer] || 0) + 1;
    });
  });
  const total = Object.keys(pos).reduce((t, k) => t + pos[k], 0);
  ok(Object.keys(pos).length >= 3 && Math.max.apply(null, Object.keys(pos).map(k => pos[k])) < total * 0.5, 'right answers are spread over the positions');
  ok(tileIds.size === Object.keys(Q).length, 'every reading has a quick check (' + Object.keys(Q).length + ' of ' + tileIds.size + ')');
}
const order = {}; stages.forEach((s, i) => order[s.id] = i);
const worldIdx = stages.map(s => s.world);
ok(worldIdx.indexOf('diseno') > worldIdx.lastIndexOf('analisis'), 'analysis stages precede design stages');
const skillStage = {}; stages.forEach(s => s.skills.forEach(k => skillStage[k] = order[s.id]));
skills.forEach(s => ok(skillStage[s.id] != null, 'skill belongs to a stage: ' + s.id));

if (hasExams) {
  const exams = g('EXAMS'), stageEx = g('STAGE_EX');
  const path_ = L.buildPath(stages, stageEx, lectures, g('STAGE_AT') || {}, g('QUIZZES') || {});
  const keys = [];
  exams.forEach(e => e.exercises.forEach(x => keys.push(e.id + '/' + x.id)));
  const inPath = path_.filter(s => s.type === 'ex').map(s => s.key);
  ok(inPath.length === keys.length, 'path has every exercise (' + inPath.length + ' vs ' + keys.length + ')');
  ok(new Set(inPath).size === inPath.length, 'no exercise appears twice in the path');
  keys.forEach(k => { if (inPath.indexOf(k) < 0) ok(false, 'exercise missing from path: ' + k); });
  // each exercise sits in a stage that is not earlier than any of its skills' stages (prerequisites come first)
  exams.forEach(e => e.exercises.forEach(x => {
    ok(order[x.stage] != null, 'exercise has a valid stage: ' + e.id + '/' + x.id);
    (x.skills || []).forEach(k => ok(skillStage[k] <= order[x.stage] || x.stage === 'recursion', 'skill ' + k + ' not after stage ' + x.stage + ' (' + e.id + '/' + x.id + ')'));
  }));
  // stage order in path follows curriculum order
  let lastO = -1; path_.forEach(s => { ok(order[s.stage] >= lastO, 'path is in stage order at ' + s.id); lastO = order[s.stage]; });
  // within a stage: a warm-up comes after the reading it needs, the exam-level exercises after the last reading, and the stage alternates reading and practice
  const at = g('STAGE_AT') || {};
  stages.forEach(s => {
    const steps = path_.filter(p => p.stage === s.id && p.type !== 'exam');
    const firstTh = steps.findIndex(p => p.type === 'theory'), lastTh = steps.map(p => p.type).lastIndexOf('theory');
    steps.forEach((p, i) => { if (p.type === 'ex') ok(i > firstTh, 'an exercise comes after the first reading of ' + s.id + ': ' + p.id); });
    const info = {}; exams.forEach(e => e.exercises.forEach(x => info[e.id + '/' + x.id] = x));
    steps.forEach((p, i) => { if (p.type === 'ex' && info[p.key].src !== 'adic') ok(i > lastTh, 'exam-level exercises come after the last reading of ' + s.id); });
    // the readings of a stage with practice are not all read before the first exercise
    const nWarm = steps.filter(p => p.type === 'ex' && info[p.key].src === 'adic').length, nTh = steps.filter(p => p.type === 'theory').length;
    if (nWarm >= 4 && nTh >= 3) ok(steps.findIndex(p => p.type === 'ex') < lastTh, 'practice starts before the last reading of ' + s.id);
    // no lesson (a reading and what follows it) drags on
    let run = 0; steps.forEach(p => { if (p.type === 'theory') run = 0; else if (p.type === 'ex' && info[p.key].src === 'adic') { run++; ok(run <= 8, 'a lesson has at most 8 warm-ups: ' + s.id + ' at ' + p.id); } });
  });
  // an exercise that builds on another one ("el ejercicio 4.10") comes after it
  {
    const adic = {}, info = {};
    exams.forEach(e => e.exercises.forEach(x => { const k = e.id + '/' + x.id; info[k] = x; if (x.src === 'adic') adic[x.n] = k; }));
    const pos = {}; path_.forEach((p, i) => { if (p.type === 'ex') pos[p.key] = i; });
    Object.keys(info).filter(k => info[k].src === 'adic').forEach(k => (info[k].statement.match(/[Ee]jercicio\s+\d+\.\d+/g) || []).forEach(m => {
      const d = adic[m.replace(/\D*(\d+\.\d+)/, '$1')];
      if (d && d !== k) ok(pos[d] < pos[k], 'exercise ' + info[k].n + ' comes after the exercise it builds on (' + m + ')');
    }));
  }
  // simulate: do the path step by step
  const S = { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: {}, exams: {}, bonus: {}, quiz: {} };
  let t = '2025-01-10', n = 0;
  const first = L.nextSteps(path_, S, exams, 1)[0];
  ok(first && first.type === 'theory', 'first step is a theory reading');
  while (true) {
    const nx = L.nextSteps(path_, S, exams, 1)[0];
    if (!nx) break;
    if (++n > path_.length + 5) { ok(false, 'path did not terminate'); break; }
    if (nx.type === 'theory') S.theory[nx.id] = true;
    else if (nx.type === 'quiz') S.quiz[nx.id] = { score: nx.n, n: nx.n, t };
    else if (nx.type === 'ex') {
      const r = n % 3;
      S.ex[nx.key] = L.applyRating(S.ex[nx.key], r, 0, 1, t);
      const after = L.nextSteps(path_, S, exams, 1)[0];
      ok(!after || after.id !== nx.id, 'next step advances after rating (' + nx.id + ')');
      if (r === 0) ok(S.ex[nx.key].due === L.addDays(t, 1), 'Fallé schedules review next day');
    } else S.exams[exams.find(e => e.kind === nx.world).id] = { grade: 5, t };
  }
  ok(n === path_.length, 'all ' + path_.length + ' steps completed in order (' + n + ')');
  ok(L.nextAfter(path_, S, exams, path_[0].id) === null, 'nextAfter is null when path complete');
  ok(L.dueKeys(keys, S, L.addDays(t, 400)).length === keys.length, 'all rated exercises become due eventually');
  // skipping a step counts as done, and nothing is ever blocked
  const S2 = { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: {}, exams: {}, bonus: {} };
  // time estimates: every step has a whole-minute estimate, stage totals add up, remaining time shrinks as steps are done
  L.annotateMinutes(path_, lectures, exams);
  path_.forEach(s => ok(Number.isInteger(s.min) && s.min >= 1 && s.min <= 240, 'step has a sane estimate: ' + s.id + ' = ' + s.min));
  // a reading covers its section and the deeper ones that follow, but never another step's section: spans are disjoint per lecture
  const byLec = {};
  path_.filter(s => s.type === 'theory').forEach(s => (byLec[s.lecture] = byLec[s.lecture] || []).push(s));
  Object.keys(byLec).forEach(l => {
    const cover = {};
    byLec[l].forEach(s => { ok(s.to >= s.idx, 'span is not empty: ' + s.id); for (let i = s.idx; i <= s.to; i++) { ok(!cover[i], 'section ' + i + ' of ' + l + ' is read by two steps: ' + s.id + ' and ' + cover[i]); cover[i] = s.id; } });
  });
  const bs = stages.find(s => s.id === 'bucles').theory.map(t => path_.find(p => p.id === 't:' + t.id));
  ok(bs.length > 1 && bs[0].to < bs[1].idx, 'bucles: the first reading stops before the second one starts');
  const blankS = { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: {}, exams: {}, bonus: {} };
  let sumStages = 0;
  stages.forEach(s => { const p = L.stageProgress(path_, blankS, exams, s.id); sumStages += p.min; ok(p.min === path_.filter(x => x.stage === s.id).reduce((t, x) => t + x.min, 0), 'stage total is the sum of its steps: ' + s.id); ok(p.left === p.min, 'nothing done: all time left in ' + s.id); });
  const pm = L.pathMinutes(path_, blankS, exams);
  ok(pm.total === sumStages && pm.left === pm.total, 'path total is the sum of the stage totals');
  const st0 = path_[0], Sdone = { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: { [st0.id]: true }, exams: {}, bonus: {} };
  ok(L.pathMinutes(path_, Sdone, exams).left === pm.total - st0.min, 'remaining time drops by the finished step');
  console.log('estimates: ' + stages.map(s => s.id + '=' + L.fmtMin(L.stageProgress(path_, blankS, exams, s.id).min)).join(' ') + ' | total ' + L.fmtMin(pm.total));
  const a = L.nextSteps(path_, S2, exams, 3);
  S2.skip[a[0].id] = true;
  ok(L.nextSteps(path_, S2, exams, 1)[0].id === a[1].id, 'skip advances path');
  ok(L.stageProgress(path_, S2, exams, a[0].stage).done === 1, 'stage progress counts skipped step');
  console.log('stages: ' + stages.map(s => s.id + '=' + path_.filter(p => p.stage === s.id).length).join(' '));
} else console.log('(data-exams.js missing: exam checks skipped)');

// pure helpers
ok(L.fmtMin(7) === '7 min' && L.fmtMin(60) === '1 h' && L.fmtMin(125) === '2 h 05 min' && L.fmtMin(700) === '12 h', 'fmtMin formats minutes');
ok(L.roundMin(0) === 1 && L.roundMin(7.4) === 7 && L.roundMin(12) === 10 && L.roundMin(13) === 15, 'roundMin: exact below 10, then multiples of 5');
ok(L.words('uno $x^2$ dos') === 2 + 3 && L.words('$$a$$') === 3, 'a formula counts as three words');
const secs = [{ level: 2, md: '' }, { level: 3, md: 'a' }, { level: 3, md: 'b' }, { level: 2, md: 'c' }];
ok(L.sectionSpan(secs, 0).to === 2 && L.sectionSpan(secs, 1).to === 1 && L.sectionSpan(secs, 3).to === 3, 'a step spans the section and its deeper children');
ok(L.readMinutes(secs, 0, 0) === 3, 'reading has a floor of 3 minutes');
// theory steps cover their children, so the estimate follows the span
const buc = lectures.find(l => l.id === (stages.find(s => s.id === 'bucles').theory[0] || {}).lecture);


// theme colour maths
const T = require(path.join(APP, 'theme.js'));
ok(T.hex(T.parseHex('#0D9')) === '#00dd99' && T.parseHex('nope') === null && T.parseHex('#12345') === null, 'parseHex: short and long forms, rejects the rest');
ok(T.hex(T.ink(T.parseHex('#fde047'))) === '#1a0f08' && T.hex(T.ink(T.parseHex('#1e3a8a'))) === '#ffffff', 'ink: dark text on light accents, white on dark ones');
T.PRESETS.concat([['auto-light', '#c2410c'], ['auto-dark', '#fb923c'], ['pale', '#fff3b0'], ['black', '#000000']]).forEach(([n, h]) => {
  const c = T.parseHex(h);
  ok(T.contrast(c, T.ink(c)) >= 3.5, 'button text is readable on accent ' + n);
  ok(T.contrast(T.readable(c, T.BG.light, false), T.BG.light) >= 4.5, 'accent text readable on the light page: ' + n);
  ok(T.contrast(T.readable(c, T.BG.dark, true), T.BG.dark) >= 4.5, 'accent text readable on the dark page: ' + n);
});
const css = fs.readFileSync(path.join(APP, 'style.css'), 'utf8');
ok(css.indexOf('--bg:#f6f7f9') >= 0 && css.indexOf('--bg:#12151c') >= 0, 'theme.js page colours match style.css');
const LG = require(path.join(APP, 'logo.js'));
{ const svg = LG.svg('#c2410c', '#ffffff'); ok(/^<svg[^>]*>.*<\/svg>$/.test(svg) && !/NaN|undefined/.test(svg), 'logo draws cleanly'); }

// route scope and organisation
{
  const scopes = win.SCOPES, p1 = scopes.find(x => x.id === 'parcial1'), all = scopes[0];
  ok(scopes.length >= 2 && all.worlds.length === 2 && p1.worlds.length === 1 && p1.worlds[0] === 'analisis', 'scopes: the whole course and the first exam (analysis only)');
  const path = L.annotateMinutes(L.buildPath(stages, win.STAGE_EX || {}, lectures), lectures, win.EXAMS || []);
  const world = {}; stages.forEach(x => { world[x.id] = x.world; });
  const part = L.scopeSteps(path, stages, p1);
  ok(part.length > 0 && part.every(x => world[x.stage] === 'analisis'), 'first-exam route holds only analysis steps');
  ok(part.some(x => x.id === 'x:analisis') && !part.some(x => x.id === 'x:diseno'), 'first-exam route ends with the analysis checkpoint only');
  ok(L.scopeSteps(path, stages, all).length === path.length, 'the whole-course scope keeps every step');
  ok(part.length === path.filter(x => world[x.stage] === 'analisis').length, 'scope keeps the order and does not drop analysis steps');
  const S0 = { ex: {}, theory: {}, skip: {}, exams: {} }; part.forEach(x => { S0.skip[x.id] = true; });
  ok(L.nextSteps(part, S0, win.EXAMS || [], 1).length === 0 && L.nextSteps(path, S0, win.EXAMS || [], 1).length === 1, 'when the first-exam route is done the full route still has steps');
  const last = part[part.length - 1];
  ok(L.nextAfter(path, S0, win.EXAMS || [], last.id, x => world[x.stage] === 'analisis') === null && L.nextAfter(path, S0, win.EXAMS || [], last.id) !== null, 'nextAfter can stay inside the route');
  const et = L.groups(stages, lectures, 'etapas'), te = L.groups(stages, lectures, 'temas');
  ok(et.length === stages.length && et.every(x => x.stages.length === 1 && /^Etapa \d+\. /.test(x.label)), 'etapas: one group per stage');
  ok(te.length === 9 && te.every(x => /^Tema [\d.]+\. /.test(x.label)), 'temas: one group per tema, labelled like the slides');
  ok(te.reduce((n, x) => n + x.stages.length, 0) === stages.length && te.some(x => x.stages.length === 2), 'temas merge the stages that share a tema and lose none');
  const tot = (gs) => gs.reduce((n, x) => n + L.groupSteps(path, x).length, 0);
  ok(tot(et) === path.filter(x => x.type !== 'exam').length + path.filter(x => x.type === 'exam').length && tot(te) === tot(et), 'every step belongs to exactly one group in both organisations');
  ok(path.filter(x => x.type === 'theory' && x.stage === 'intro').length >= 6 && path.find(x => x.stage === 'intro').upto != null, 'tema 1 is read in several short readings, each covering several sections');
}

// figures cut from the slides: every {{fig img/x.png | ...}} points at a file that exists, and no image is left unused
{
  const used = new Set(), have = fs.readdirSync(path.join(APP, 'img')).filter(f => f[0] !== '.').map(f => 'img/' + f);
  lectures.forEach(l => l.sections.forEach(s => { (s.md.match(/\{\{fig\s+\S+/g) || []).forEach(m => used.add(m.replace(/\{\{fig\s+/, ''))); }));
  used.forEach(f => ok(have.indexOf(f) >= 0, 'figure file exists: ' + f));
  have.forEach(f => ok(used.has(f), 'figure used by some lecture: ' + f));
  ok(!lectures.some(l => l.sections.some(s => /\[figura|\(figura/i.test(s.md))), 'no [figura: ...] placeholder is left in the lectures');
  const figs = JSON.parse(fs.readFileSync(path.join(__dirname, 'figures.json'), 'utf8')).map(f => f.file).sort();
  ok(JSON.stringify(figs) === JSON.stringify(have.slice().sort()), 'tools/figures.json lists exactly the images in app/img');
}

// no locking anywhere in the app sources
['app.js', 'index.html', 'style.css'].forEach(f => {
  const src = fs.readFileSync(path.join(APP, f), 'utf8');
  ok(!/locked|bloquead|designTaught|&#128274;/i.test(src), 'no lock logic left in ' + f);
});
// shared progress file: who wins
{
  const A = (u) => ({ updated: u });
  ok(L.syncPlan(A(5), A(5), 5) === 'same', 'same stamps: nothing to do');
  ok(L.syncPlan(A(0), A(9), 0) === 'pull', 'a blank profile takes the file');
  ok(L.syncPlan(A(9), A(0), 0) === 'push', 'an empty file gets the progress');
  ok(L.syncPlan(A(5), A(9), 5) === 'pull', 'the file moved on while this profile was idle: pull');
  ok(L.syncPlan(A(9), A(5), 5) === 'push', 'this profile moved on: push');
  ok(L.syncPlan(A(7), A(9), 5) === 'conflict', 'both changed since they last agreed: ask');
  ok(L.syncPlan(A(9), A(7), 5) === 'conflict', 'both changed (ours newer): ask');
  ok(L.syncPlan(A(7), A(9), 0) === 'conflict', 'two independent histories: ask');
}
// page metadata
{
  const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
  ['description', 'keywords', 'theme-color', 'color-scheme'].forEach(n => ok(new RegExp('<meta name="' + n + '" ').test(html), 'index.html has meta ' + n));
  ['og:title', 'og:description', 'og:type'].forEach(n => ok(html.indexOf('property="' + n + '"') >= 0, 'index.html has ' + n));
  ok(/<noscript>/.test(html), 'index.html tells people without JavaScript what to do');
  const T = require('../app/theme.js');
  ok(typeof T.chrome === 'function', 'theme.js updates the browser chrome colour');
}
// settings kept with the progress: defaults, repair of bad values
{
  const d = L.defaultCfg();
  ok(d.timer === false && d.extimer === true && d.daily === 30 && d.exhints === false && d.exans === false && d.exauto === false, 'default settings');
  const c = L.normCfg({ timer: true, daily: 45, exhints: 'yes', extimer: false, bogus: 1 });
  ok(c.timer === true && c.daily === 45 && c.extimer === false && c.exhints === false && !('bogus' in c), 'valid settings are kept, invalid ones fall back, unknown ones are dropped');
  ok(L.normCfg(null).daily === 30 && L.normCfg({ daily: 3 }).daily === 30 && L.normCfg({ daily: 9999 }).daily === 30 && L.normCfg({ daily: '60' }).daily === 60, 'the daily goal is a number of minutes between 5 and 480');
}
// activity log: old entries keep working
{
  ok(L.logKind({ k: 'exam/x' }) === 'exam' && L.logKind({ k: 'q:t21' }) === 'quiz' && L.logKind({ k: 'ex1/2' }) === 'ex' && L.logKind({ ty: 'theory', k: 'x' }) === 'theory', 'entry kinds, also for entries written before the type existed');
  ok(L.logMinutes({ m: 12 }) === 12 && L.logMinutes({}) === 10 && L.logMinutes({ m: 10, sec: 300 }) === 5 && L.logMinutes({ m: 10, sec: 99999 }) === 20, 'minutes of an entry: measured, capped at twice the estimate, else the estimate');
  const t = L.dayTotals([{ m: 10, xp: 3 }, { m: 10, xp: 2.5, sec: 120 }, { ty: 'skip', xp: 0 }]);
  ok(t.n === 2 && t.xp === 5.5 && Math.round(t.min) === 12 && t.timed === 1, 'day totals ignore skipped steps');
}
// plan for today
{
  const steps = [10, 10, 15, 15, 20].map((m, i) => ({ id: 's' + i, min: m })), due = [{ id: 'r1', min: 10 }, { id: 'r2', min: 10 }, { id: 'r3', min: 10 }];
  const log = (m) => [{ t: '2026-01-02', m: m }];
  let p = L.dailyPlan({ goal: 30, today: '2026-01-02', log: [], due: due, steps: steps });
  ok(!p.met && p.reviews.length === 1 && p.steps.length === 2 && p.min === 30, 'a 30 minute goal: one review (at most 40%) and steps up to the goal');
  p = L.dailyPlan({ goal: 60, today: '2026-01-02', log: [], due: due, steps: steps });
  ok(p.reviews.length === 2 && p.min >= 60 && p.min < 60 + 20, 'a 60 minute goal: more reviews, and the plan covers the goal without going far beyond');
  p = L.dailyPlan({ goal: 30, today: '2026-01-02', log: log(20), due: due, steps: steps });
  ok(p.done === 20 && p.left === 10 && p.min >= 10 && p.min <= 30, 'what was done today counts towards the goal');
  p = L.dailyPlan({ goal: 30, today: '2026-01-02', log: log(35), due: due, steps: steps });
  ok(p.met && !p.reviews.length && !p.steps.length, 'goal reached: nothing more is planned');
  p = L.dailyPlan({ goal: 30, today: '2026-01-02', log: [{ t: '2026-01-01', m: 99 }], due: [], steps: steps });
  ok(p.done === 0 && p.min >= 30 && p.steps.length === 3, 'yesterday does not count');
  p = L.dailyPlan({ goal: 30, today: '2026-01-02', log: [], due: [{ id: 'r', min: 45 }], steps: [] });
  ok(p.reviews.length === 1, 'a first review is always planned, even if it is longer than the goal');
  p = L.dailyPlan({ goal: 15, today: '2026-01-02', log: [], due: [], steps: [] });
  ok(!p.met && !p.steps.length, 'nothing left to plan is not the same as a goal reached');
  // the plan does not grow while the day goes on: finishing a step never adds more than the time left
  let planMin = L.dailyPlan({ goal: 45, today: '2026-01-02', log: [], due: [], steps: steps }).min, l2 = [];
  for (let i = 0; i < 3; i++) { l2.push({ t: '2026-01-02', m: steps[i].min }); const q = L.dailyPlan({ goal: 45, today: '2026-01-02', log: l2, due: [], steps: steps.slice(i + 1) }); ok(q.met || q.min < 45 + 20, 'plan stays within the goal as steps are completed'); }
}
// exam XP: hints and solutions seen while sitting the exam cost like in the exercises
{
  const ids = ['a', 'b'], pts = { a: 5, b: 5 }, sc = { a: 5, b: 5 };
  ok(L.examXp(ids, sc, pts, {}) === 20, 'full marks, no help: 20 XP');
  ok(L.examXp(ids, sc, pts, { a: { hint: true } }) === 17.5, 'a hint costs 25% of that exercise\'s share');
  ok(L.examXp(ids, sc, pts, { a: { sol: true } }) === 12.5 && L.examXp(ids, sc, pts, { a: { hint: true, sol: true } }) === 12.5, 'a solution costs 75% of that exercise\'s share, and an exercise never loses more than that');
  ok(L.examXp(ids, { a: 0, b: 0 }, pts, {}) === 0 && L.examXp([], {}, {}, {}) === 0, 'nothing obtained: 0 XP, no division by zero');
}
// study without paper
{
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const a = [1, 2, 3, 4, 5, 6];
  ok(L.shuffle(a, rnd).slice().sort().join() === a.join() && a.join() === '1,2,3,4,5,6', 'a shuffle keeps the items and leaves the original alone');
  for (let k = 0; k < 200; k++) { const b = L.shuffleNot([1, 2, 3], rnd); if (b.join() === '1,2,3') { ok(false, 'shuffleNot returned the original order'); break; } }
  ok(L.shuffleNot([9], rnd).join() === '9', 'one item stays as it is');
  // mixed test from the real quiz questions
  const quizzes = win.QUIZZES, ids = Object.keys(quizzes);
  const m = L.mixQuestions(quizzes, ids, 8, rnd);
  ok(m.length === 8 && new Set(m.map(x => x.rid)).size === 8, 'a mixed test takes one question from each of eight different readings');
  ok(m.every(x => x.options.length >= 2 && x.answer >= 0 && x.answer < x.options.length), 'every question has its right option');
  ok(m.every(x => { const q = quizzes[x.rid][x.i]; return x.options[x.answer] === q.options[q.answer] && x.options.slice().sort().join('|') === q.options.slice().sort().join('|'); }), 'the options are re-shuffled but the right one is still right');
  const small = L.mixQuestions(quizzes, [ids[0], ids[1]], 8, rnd);
  ok(small.length === quizzes[ids[0]].length + quizzes[ids[1]].length && small.length < 8, 'with few readings it gives what there is, never repeating a question');
  ok(L.mixQuestions(quizzes, [], 8, rnd).length === 0 && L.mixQuestions(quizzes, ['nope'], 8, rnd).length === 0, 'no readings, no questions');
  // ordering the steps of a solution
  const sol = '**Paso 1.** primero\n\n**Paso 2.** segundo\n\n**Paso 3.** tercero';
  ok(L.orderPieces(sol).join('|') === 'primero|segundo|tercero', 'the steps of a stepped solution, without their numbers');
  ok(L.orderPieces('**Paso 1. Reparte.** uno\n\n**Paso 2. Simplifica.** dos\n\n**Paso 3. Cierra.** tres').join('|') === '**Reparte.** uno|**Simplifica.** dos|**Cierra.** tres', 'a step with a title keeps the title, not the number');
  ok(L.orderPieces('**Paso 1.** a\n\n**Paso 2.** b') === null && L.orderPieces('una solución sin pasos') === null && L.orderPieces('') === null, 'fewer than three steps, or no steps: nothing to order');
  ok(L.orderScore([0, 1, 2]) === 3 && L.orderScore([1, 0, 2]) === 1 && L.orderScore([2, 1, 0]) === 1, 'how many steps are in place');
}
{
  // peldaños and additional exercises, in the order written for each reading
  const stg = [{ id: 'a', theory: [{ id: 'r0' }, { id: 'r1' }] }, { id: 'b', theory: [{ id: 'r2' }] }];
  const isR = (k) => /^p\//.test(k);
  const m = L.mergeLadder(stg, { a: ['x/1', 'x/2', 'x/3'], b: ['x/4'] }, { 'x/1': 0, 'x/3': 1, 'x/4': 0 },
    { a: { r0: ['p/1', 'x/2', 'p/2'], r1: ['p/3', 'x/1', 'p/gone2', 'p/2'] }, b: { r2: ['p/4', 'x/9'] } }, (k) => isR(k) && k !== 'p/gone2');
  ok(m.ex.a.join() === 'p/1,x/2,p/2,p/3,x/1,x/3', 'the named exercises come first, in the order written, each once; the rest keep their place after them (' + m.ex.a.join() + ')');
  ok(m.at['p/1'] === 0 && m.at['x/2'] === 0 && m.at['p/3'] === 1 && m.at['x/1'] === 1 && m.at['x/3'] === 1, 'each named exercise goes after the reading it is listed under; the others keep theirs');
  ok(m.ex.b.join() === 'p/4,x/4' && m.at['p/4'] === 0 && !('x/9' in m.at), 'an exercise that does not exist (exam data missing) is left out');
  ok(L.mergeLadder(stg, {}, {}, { a: { r0: ['p/1', 'x/2'] } }, isR).ex.a.join() === 'p/1', 'without exam data the peldaños are still there');
  const path2 = L.buildPath(stg, m.ex, [], m.at, {});
  ok(path2.filter((s) => s.stage === 'a' && s.type === 'ex').map((s) => s.key).join() === 'p/1,x/2,p/2,p/3,x/1,x/3', 'the route follows that order');
  const ri = (k) => path2.findIndex((s) => s.id === 'e:' + k), ti = (id) => path2.findIndex((s) => s.id === 't:' + id);
  ok(ti('r0') < ri('p/1') && ri('p/2') < ti('r1') && ti('r1') < ri('p/3'), 'and each one comes after its reading, before the next');
}
console.log(fails ? fails + ' FAILURES' : 'logic checks passed');
process.exit(fails ? 1 : 0);
