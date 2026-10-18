#!/usr/bin/env node
/* Sanity checks for the roadmap data and pure logic. Run: node tools/check-logic.js
   Needs app/data-lectures.js (always) and app/data-exams.js (local only; exam checks are skipped without it). */
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

// theory refs resolve
const lm = {}; lectures.forEach(l => lm[l.id] = l);
stages.forEach(s => (s.theory || []).forEach(t => {
  ok(lm[t.lecture] && lm[t.lecture].sections[t.idx], 'theory ref resolves: ' + s.id + ' / ' + t.section);
  if (lm[t.lecture] && lm[t.lecture].sections[t.idx]) ok(lm[t.lecture].sections[t.idx].title.indexOf(t.section.replace(/\s+/g, ' ').slice(0, 12)) >= 0 || lm[t.lecture].sections[t.idx].title === t.section, 'theory title matches: ' + t.section);
}));
const order = {}; stages.forEach((s, i) => order[s.id] = i);
const worldIdx = stages.map(s => s.world);
ok(worldIdx.indexOf('diseno') > worldIdx.lastIndexOf('analisis'), 'analysis stages precede design stages');
const skillStage = {}; stages.forEach(s => s.skills.forEach(k => skillStage[k] = order[s.id]));
skills.forEach(s => ok(skillStage[s.id] != null, 'skill belongs to a stage: ' + s.id));

if (hasExams) {
  const exams = g('EXAMS'), stageEx = g('STAGE_EX');
  const path_ = L.buildPath(stages, stageEx, lectures);
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
  // within a stage, theory comes before exercises
  stages.forEach(s => {
    const steps = path_.filter(p => p.stage === s.id && p.type !== 'exam');
    const firstEx = steps.findIndex(p => p.type === 'ex'), lastTh = steps.map(p => p.type).lastIndexOf('theory');
    ok(lastTh < firstEx || firstEx < 0, 'theory before exercises in stage ' + s.id);
  });
  // simulate: do the path step by step
  const S = { ex: {}, xp: 0, days: [], log: [], theory: {}, skip: {}, exams: {}, bonus: {} };
  let t = '2025-01-10', n = 0;
  const first = L.nextSteps(path_, S, exams, 1)[0];
  ok(first && first.type === 'theory', 'first step is a theory reading');
  while (true) {
    const nx = L.nextSteps(path_, S, exams, 1)[0];
    if (!nx) break;
    if (++n > path_.length + 5) { ok(false, 'path did not terminate'); break; }
    if (nx.type === 'theory') S.theory[nx.id] = true;
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
  const bs = stages.find(s => s.id === 'bucles').theory.map((t, i) => path_.find(p => p.id === 't:bucles:' + i));
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
if (buc) { const t0 = stages.find(s => s.id === 'bucles').theory[0], sp = L.sectionSpan(buc.sections, t0.idx); ok(sp.to > sp.from, 'bucles step spans its subsections (its own section is empty)'); }

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
  ok(path.filter(x => x.type === 'theory' && x.stage === 'intro').length === 4 && path.find(x => x.stage === 'intro').upto != null, 'tema 1 has its readings, each covering several sections');
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
// page metadata
{
  const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
  ['description', 'keywords', 'theme-color', 'color-scheme'].forEach(n => ok(new RegExp('<meta name="' + n + '" ').test(html), 'index.html has meta ' + n));
  ['og:title', 'og:description', 'og:type'].forEach(n => ok(html.indexOf('property="' + n + '"') >= 0, 'index.html has ' + n));
  ok(/<noscript>/.test(html), 'index.html tells people without JavaScript what to do');
  const T = require('../app/theme.js');
  ok(typeof T.chrome === 'function', 'theme.js updates the browser chrome colour');
}
console.log(fails ? fails + ' FAILURES' : 'logic checks passed');
process.exit(fails ? 1 : 0);
