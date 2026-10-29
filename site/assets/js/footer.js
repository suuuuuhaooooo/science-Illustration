/* 全站版權列：所有頁面共用，改 NB_CONFIG.copyright 就全站更新 */
(function(){
var M="https://suuuuuhaooooo.github.io/math-Illustration/site/";
var C=Object.assign({owner:"suuuuuhaooooo",year:new Date().getFullYear(),license:"CC BY-NC-ND 4.0"},(window.NB_CONFIG||{}).copyright||{});
var f=document.querySelector("footer.foot")||document.body.appendChild(document.createElement("footer"));f.className="foot";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var DN=(window.NB_CONFIG||{}).donate||{};
/* 導覽頁最後一區已經有贊助按鈕，頁尾就不再放一顆 */
var dn=DN.url&&!document.getElementById("dn-fin")?'<a class="dn-foot" href="'+esc(DN.url)+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1.5 12a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2z"/><path d="M5 8h14M14 3l-2 5"/><circle cx="10" cy="17" r="1"/><circle cx="13.5" cy="15.5" r="1"/></svg>'+esc(DN.label||"贊助島民")+"</a>":"";
f.innerHTML=dn+'<a rel="license noopener" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hant" target="_blank"><img alt="創用 CC 姓名標示-非商業性-禁止改作" width="88" height="31" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.svg"></a><p>© '+esc(C.year)+' '+esc(C.owner)+'　公開的單元圖解依 '+esc(C.license)+' 授權；題庫與付費內容保留所有權利</p><p><a href="https://suuuuuhaooooo.github.io/math-Illustration/">姊妹站：數光島筆記本（國小數學）</a>　<a href="'+M+'terms.html">使用者條款</a>　<a href="'+M+'privacy.html">隱私權政策</a>　<a href="'+M+'plans.html#sci">方案與價格</a></p><p><span>made by suuuuuhaooooo</span></p>';
})();
