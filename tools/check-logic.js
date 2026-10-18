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
  const a = L.nextSteps(path_, S2, exams, 3);
  S2.skip[a[0].id] = true;
  ok(L.nextSteps(path_, S2, exams, 1)[0].id === a[1].id, 'skip advances path');
  ok(L.stageProgress(path_, S2, exams, a[0].stage).done === 1, 'stage progress counts skipped step');
  console.log('stages: ' + stages.map(s => s.id + '=' + path_.filter(p => p.stage === s.id).length).join(' '));
} else console.log('(data-exams.js missing: exam checks skipped)');

// no locking anywhere in the app sources
['app.js', 'index.html', 'style.css'].forEach(f => {
  const src = fs.readFileSync(path.join(APP, f), 'utf8');
  ok(!/locked|bloquead|designTaught|&#128274;/i.test(src), 'no lock logic left in ' + f);
});
console.log(fails ? fails + ' FAILURES' : 'logic checks passed');
process.exit(fails ? 1 : 0);
