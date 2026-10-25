/* 鑑往知來：單元頁「挑戰」下方的歷屆試題分析區塊（免費區，和情境、動手做、原理、挑戰一樣，不用登入）。資料在 assets/data/exam-trends.js。
   內容：這一節在歷屆會考出現的情形、常考題型、易錯陷阱、一題仿題（原創）。 */
(function(){
var X=window.NB_EXAM,M=window.NB_MAP||{};if(!X||!window.NB)return;
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function heat(n){return n>=10?["必考","h3"]:n>=5?["常考","h2"]:n>=1?["偶爾考","h1"]:["少見","h0"]}
function yr(y){return String(y).replace(/^(\d+)/,"$1 ").replace("基測題本一","基測").replace("基測題本二","基測")}
var OL="ABCD";
function card(id){
 var x=X[id];if(!x)return null;
 var hz=heat(x.n),last=x.y.length?yr(x.y[0]):"";
 var s=NB.h('<section class="sheet exam"><h2><span class="tag">鑑往知來</span>歷屆會考怎麼考這一節</h2></section>');
 s.appendChild(NB.h('<p class="ex-sum"><b class="ex-heat '+hz[1]+'">'+hz[0]+'</b> 教材題本收錄的歷屆試題中，這一節出現 <b>'+x.n+'</b> 題'+(last?"，最近一次是 <b>"+esc(last)+"</b>":"")+'。</p>'));
 var f=NB.h('<div class="ex-cols"><div><h3>常考題型</h3><ul class="ex-f"></ul></div><div><h3>易錯陷阱</h3><ul class="ex-t"></ul></div></div>');
 x.f.forEach(function(t){f.querySelector(".ex-f").appendChild(NB.h("<li>"+NB.tx(esc(t))+"</li>"))});
 x.t.forEach(function(t){f.querySelector(".ex-t").appendChild(NB.h("<li>"+NB.tx(esc(t))+"</li>"))});
 s.appendChild(f);
 /* 仿題：點選項就判對錯，看解析 */
 var q=x.q,qb=NB.h('<div class="ex-q"><h3>仿題練習 <small class="meta">（模仿會考的出題方式，不是原題）</small></h3><p>'+NB.tx(esc(q.q))+'</p><div class="opts"></div><div class="fb"></div></div>'),og=qb.querySelector(".opts"),fb=qb.querySelector(".fb");
 q.o.forEach(function(o,i){var b=NB.h('<button type="button" class="pen opt">('+OL[i]+") "+NB.tx(esc(o))+"</button>");b.onclick=function(){var ok=i===q.a;Array.prototype.forEach.call(og.children,function(c,k){c.disabled=true;c.classList.toggle("ok",k===q.a);c.classList.toggle("no",k===i&&!ok)});fb.className="fb "+(ok?"ok":"no");fb.innerHTML=(ok?"答對了！":"再想想：正確答案是 ("+OL[q.a]+")。")+"<br>"+NB.tx(esc(q.e))};og.appendChild(b)});
 s.appendChild(qb);
 return s}
NB.exam={card:card,data:X};
})();
