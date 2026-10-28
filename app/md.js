(function () {
'use strict';
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
/* ---------- markdown + math ---------- */
function mdRender(src) {
  var st = [];
  function put(h, block) { st.push({ h: h, b: block }); return '' + (st.length - 1) + ''; }
  function tex(t, disp) {
    try { return window.katex.renderToString(t, { displayMode: disp, throwOnError: false }); }
    catch (e) { return '<code>' + esc(t) + '</code>'; }
  }
  var s = String(src || '').replace(/\r/g, '');
  /* {{fig img/x.png | description}}: a figure cut from the slides. The description is the alt text, shown if the image is missing. */
  function figImg(path, d) {
    return '<img class="fig" src="' + esc(path) + '" alt="' + esc('Figura: ' + d.replace(/[$\\{}`]/g, '').replace(/\s+/g, ' ').trim()) + '" loading="lazy">';
  }
  s = s.replace(/^[ \t]*(?:[-*+][ \t]+)?\{\{fig\s+(\S+)\s*\|([\s\S]*?)\}\}[ \t]*$/gm, function (m, path, d) { return '\n' + put('<figure class="fig">' + figImg(path, d) + '</figure>', true) + '\n'; });
  s = s.replace(/\{\{fig\s+(\S+)\s*\|([\s\S]*?)\}\}/g, function (m, path, d) { return put(figImg(path, d)); });
  s = s.replace(/```[^\n]*\n([\s\S]*?)```/g, function (m, c) { return '\n' + put('<pre><code>' + esc(c.replace(/\n$/, '')) + '</code></pre>', true) + '\n'; });
  s = s.replace(/`([^`\n]+)`/g, function (m, c) { return put('<code>' + esc(c) + '</code>'); });
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, function (m, c) { return put(tex(c, true)); });
  s = s.replace(/\$([^$\n]+?)\$/g, function (m, c) { return put(tex(c, false)); });
  function inl(t) {
    return esc(t).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>').replace(/==([^=\s]|[^=\s][^=]*[^=\s])==/g, '<mark>$1</mark>');
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
window.mdRender = mdRender;
})();
