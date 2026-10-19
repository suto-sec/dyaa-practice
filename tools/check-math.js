const katex = require(__dirname + '/../app/vendor/katex/katex.min.js');
const vm = require('vm'), fs = require('fs');
const w = {}; for (const f of ['data-lectures.js','data-exams.js']) vm.runInNewContext(fs.readFileSync(__dirname+'/../app/'+f,'utf8'), {window:w});
const texts = [];
(w.LECTURES||[]).forEach(l=>l.sections.forEach(s=>texts.push(['L:'+l.id+'/'+s.title, s.md])));
Object.entries(w.SUMMARIES||{}).forEach(([id,md])=>texts.push(['S:'+id, md]));
(w.EXAMS||[]).forEach(e=>e.exercises.forEach(x=>{texts.push(['E:'+x.id+' stmt',x.statement]); if(x.solution) texts.push(['E:'+x.id+' sol',x.solution]);}));
let n=0, bad=[];
for (const [id,t0] of texts) {
  const t = t0.replace(/```[\s\S]*?```/g,'').replace(/`[^`\n]*`/g,'');
  for (const m of t.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g)) {
    n++; const src = m[1] ?? m[2];
    try { katex.renderToString(src,{throwOnError:true,displayMode:m[1]!==undefined}); } catch(e){ bad.push([id, src.slice(0,70), e.message.slice(0,80)]); }
  }
}
console.log('math spans:', n, 'failures:', bad.length);
bad.slice(0,15).forEach(b=>console.log(b.join(' | ')));
