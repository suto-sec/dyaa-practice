#!/usr/bin/env node
/* Prints the route as a table, one block per etapa: each reading with its minutes, its quiz questions and the exercises placed after it.
   Meant for reviewing how the route alternates reading and practice. Run: node tools/route-table.js [stage id] */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const w = {};
for (const f of ['data-lectures.js', 'data-exams.js']) { const p = path.join(__dirname, '..', 'app', f); if (fs.existsSync(p)) vm.runInNewContext(fs.readFileSync(p, 'utf8'), { window: w }); }
const L = require('../app/logic.js');
const P = L.annotateMinutes(L.buildPath(w.STAGES, w.STAGE_EX || {}, w.LECTURES, w.STAGE_AT || {}, w.QUIZZES || {}), w.LECTURES, w.EXAMS || []);
const ex = {}; (w.EXAMS || []).forEach(e => e.exercises.forEach(x => { ex[e.id + '/' + x.id] = x; }));
const only = process.argv[2];
w.STAGES.filter(g => !only || g.id === only).forEach(g => {
  console.log('\n== ' + g.title);
  let cur = null;
  P.filter(s => s.stage === g.id).forEach(s => {
    if (s.type === 'theory') { cur = s; console.log('  [' + String(s.min).padStart(2) + 'm] ' + s.label); }
    else if (s.type === 'quiz') console.log('        quiz: ' + s.n + ' preguntas');
    else if (s.type === 'ex') { const x = ex[s.key]; console.log('        ' + (x.src === 'adic' ? 'adic ' : 'EXAM ') + String(x.n || x.id).padEnd(5) + ' ' + String(x.statement).replace(/\s+/g, ' ').slice(0, 95)); }
    else console.log('  ' + s.label);
  });
});
