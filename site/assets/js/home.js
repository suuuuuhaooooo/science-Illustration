/* 見微群島（單元目錄）：3D 群島；瀏覽器畫不出 WebGL 時，退回依冊別列出的清單。 */
(function(){
var app=document.getElementById("app"),CN="一二三四五六七八九十",probed={},rows={},grade=3;
try{var sg=parseInt(localStorage.getItem("li-vol"));if([3,4,5,6].indexOf(sg)>=0)grade=sg}catch(e){}
function chapText(c){return"共 "+c.secs.length+" 小節"}
function semText(S){var t=0,n=0,u=NB.trail.all();S.chs.forEach(function(c){t+=c.secs.length;c.secs.forEach(function(o){if(u[o.id]&&u[o.id].v)n++})});return"共 "+t+" 小節"+(n?"・已玩 "+n:"")}
/* ---- 見微群島（3D） ---- */
var ISLE=null;
function isReady(id){return(window.READY||[]).some(function(p){return id.indexOf(p)===0})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var VN={3:"第三冊",4:"第四冊",5:"第五冊",6:"第六冊"},VL={3:"八上",4:"八下",5:"九上",6:"九下"},DM=NB_MAP&&NB_MAP.dom||{};
function topBar(){var bar=NB.h('<nav class="bar"><a class="brand" href="../" title="回到導覽頁" style="text-decoration:none;color:inherit">'+NB.deco.logo()+'見微理畫</a></nav>');bar.appendChild(NB.memberChip());bar.appendChild(NB.themeBar());return bar}
function render3d(){
 app.innerHTML="";app.classList.add("i3page");app.appendChild(topBar());
 var NI=Object.keys(NB_MAP.th).length,st=NB.h('<section class="i3" aria-label="見微群島：'+NI+' 座主題島">'+
  '<div class="i3-intro"><h1>見微群島</h1><p>國中理化 '+NI+' 座主題島，每間小房子是一個小節，越高的房子冊數越後面。<span class="i3-hint">拖曳轉動・滾輪或雙指縮放・點島看小節・戳戳島民</span></p>'+
  '<ul class="i3-leg">'+["N","S","R","D"].map(function(k){return DM[k]?'<li><i style="background:'+DM[k].top+'"></i>'+DM[k].name+'</li>':""}).join("")+'</ul></div>'+
  '<div class="i3-tools"><div class="i3-find"><input type="search" placeholder="找單元，例如：密度、透鏡、比熱" aria-label="搜尋單元"><div class="i3-res" hidden></div></div>'+
  '<div class="i3-row i3-grades" role="group" aria-label="只看某一冊"></div>'+
  '<div class="i3-row i3-tb" role="toolbar" aria-label="群島工具列">'+
   '<button type="button" class="pen i3-b-idx" aria-expanded="false">☰ 主題索引</button>'+
   '<button type="button" class="pen on i3-b-lab" aria-pressed="true">名牌</button>'+
   '<button type="button" class="pen on i3-links" aria-pressed="true">先備線</button>'+
   '<button type="button" class="pen on i3-b-folk" aria-pressed="true">島民</button>'+
   '<button type="button" class="pen i3-b-pause" aria-pressed="false">暫停</button>'+
   '<button type="button" class="pen i3-b-bird" aria-pressed="false">鳥瞰</button>'+
   '<button type="button" class="pen on i3-b-log" aria-pressed="true">日誌</button>'+
   '<a class="pen i3-b-map" href="map.html" title="領域、課綱學習內容、認知層次、知識類型、主題線">學習地圖</a>'+
   '<button type="button" class="pen i3-b-tools" title="週期表、公式卡、單位換算" onclick="window.SciTools&&SciTools.open()">小工具</button></div></div>'+
  '<aside class="i3-idx" hidden aria-label="主題索引"></aside>'+
  '<aside class="i3-panel" hidden aria-live="polite"></aside>'+
  '<div class="i3-clock"><span class="i3-ck-t">00:00</span><input type="range" min="0" max="24" step="0.25" aria-label="時間 00:00～24:00"><span class="i3-ck-e">24:00</span><button type="button" class="pen on i3-ck-auto" aria-pressed="true">自動</button></div>'+
  '<div class="i3-play" hidden><p class="i3-pl-cap" aria-live="polite"></p><div class="i3-pl-c"><b class="i3-pl-n">00 / 00</b><span class="i3-pl-bar"><i></i></span><button type="button" class="pen i3-pl-pause">暫停</button><button type="button" class="pen i3-pl-re">重播</button><button type="button" class="pen i3-pl-x">離開</button><button type="button" class="pen i3-pl-skip">略過</button><button type="button" class="pen on i3-pl-next">下一步 →</button></div></div>'+
  '<div class="i3-log"><div class="i3-log-top"><button type="button" class="i3-log-h" aria-expanded="true"><i class="i3-live"></i>群島日誌 <b>LIVE</b></button><button type="button" class="i3-x i3-log-x" aria-label="關閉日誌">×</button></div>'+
   '<div class="i3-log-tabs" role="tablist"><button type="button" role="tab" class="on" data-k="sum" aria-selected="true">群島概況</button><button type="button" role="tab" data-k="log" aria-selected="false">日誌</button></div>'+
   '<div class="i3-log-sum"><p class="i3-guide"><span class="i3-gface" aria-hidden="true"></span><span>點一座島，開始探索！或選一段導覽，讓我帶你逛。</span></p><ol class="i3-tours"></ol></div>'+
   '<ol class="i3-log-l" aria-live="polite" hidden></ol></div>'+
  '<div class="i3-sr"><p>用鍵盤或螢幕閱讀器：選一座島，就會列出這座島的小節。</p><ul></ul></div></section>');
 app.appendChild(st);
 /* 手機：上方導覽列比較高，讓群島剛好填滿螢幕剩下的高度（工具列才不會跑到畫面外） */
 var fitH=0;function fit(){if(innerWidth>=640){st.style.height="";return}var top=st.getBoundingClientRect().top+scrollY,h=Math.max(460,innerHeight-top);if(Math.abs(h-fitH)>20){fitH=h;st.style.height=h+"px"}}fit();setTimeout(fit,600);setTimeout(fit,2000);addEventListener("resize",fit);addEventListener("orientationchange",function(){fitH=0;setTimeout(fit,300)});
 var panel=st.querySelector(".i3-panel"),srl=st.querySelector(".i3-sr ul"),logl=st.querySelector(".i3-log-l"),idx=st.querySelector(".i3-idx"),TOUR=null;
 function hm(){var d=new Date();return("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)}
 function addLog(m){var li=NB.h('<li><time></time><span></span></li>');li.firstChild.textContent=hm();li.lastChild.textContent=m;logl.insertBefore(li,logl.firstChild);while(logl.children.length>(innerWidth<640?3:6))logl.removeChild(logl.lastChild)}
 ISLE=NB.isle3d.mount(st,{onPick:function(t,cid){if(TOUR&&!TOUR.busy)tourStop();if(!TOUR)show(t,cid);markIdx(t)},onLog:addLog,onFail:function(){ISLE=null;st.remove();renderList();homeTour()}});
 if(!ISLE){st.remove();renderList();homeTour();return}
 /* 探索進度：看過任一小節的章、有章被看過的島（只記在這台裝置） */
 var pg=ISLE.progress(),hud=NB.h('<div class="i3-hud"><span>探索進度</span><b>'+pg.islands+"／"+pg.total+'</b> 島<span class="i3-bar"><i style="width:'+Math.round(pg.chapters/Math.max(1,pg.chTotal)*100)+'%"></i></span><b>'+pg.chapters+"／"+pg.chTotal+"</b> 節</div>");st.querySelector(".i3-intro").appendChild(hud);
 /* 冊別篩選 */
 var gr=st.querySelector(".i3-grades");[0,3,4,5,6].forEach(function(g){var b=NB.h('<button type="button" class="pen'+(g===0?" on":"")+'" data-g="'+g+'">'+(g?VN[g]:"全部")+"</button>");b.onclick=function(){Array.prototype.forEach.call(gr.children,function(x){x.classList.toggle("on",x===b)});ISLE.setGrade(g);if(panel.dataset.t)show(panel.dataset.t)};gr.appendChild(b)});
 var GSEL=function(){var on=gr.querySelector(".on");return on?+on.dataset.g:0};
 /* 工具列：名牌／先備線／暫停／鳥瞰 */
 function tog(sel,get,set,txt){var b=st.querySelector(sel);b.onclick=function(){var on=!get();set(on);b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);if(txt)b.textContent=txt(on)};return b}
 tog(".i3-b-lab",ISLE.labelsOn,ISLE.setLabels);tog(".i3-links",ISLE.links,ISLE.setLinks);
 tog(".i3-b-pause",ISLE.paused,ISLE.setPaused,function(on){return on?"繼續":"暫停"});
 var bb=tog(".i3-b-bird",ISLE.bird,function(on){ISLE.birdsEye(on);if(on)show(null)});
 /* 時間軸 00:00～24:00；「自動」跟著現在的時間 */
 var rg=st.querySelector(".i3-clock input"),ct=st.querySelector(".i3-ck-t"),au=st.querySelector(".i3-ck-auto");
 function clk(){var h=ISLE.hour();if(ISLE.auto())rg.value=h;ct.textContent=ISLE.hourText()}clk();setInterval(clk,30000);
 rg.addEventListener("input",function(){ISLE.setHour(+rg.value);au.classList.remove("on");au.setAttribute("aria-pressed",false);clk()});
 au.onclick=function(){ISLE.setHour(null);au.classList.add("on");au.setAttribute("aria-pressed",true);clk()};
 tog(".i3-b-folk",ISLE.folksOn,ISLE.setFolks);
 /* 群島日誌：「群島概況」（導覽清單）和「日誌」（即時紀錄）兩個分頁；手機上預設收起來 */
 var LOG=st.querySelector(".i3-log"),lh=st.querySelector(".i3-log-h"),blog=st.querySelector(".i3-b-log");
 function logOpen(on){LOG.hidden=!on;blog.classList.toggle("on",on);blog.setAttribute("aria-pressed",on)}
 blog.onclick=function(){logOpen(LOG.hidden)};st.querySelector(".i3-log-x").onclick=function(){logOpen(false)};
 if(innerWidth<640){LOG.classList.add("shut");lh.setAttribute("aria-expanded",false)}
 lh.onclick=function(){var sh=LOG.classList.toggle("shut");lh.setAttribute("aria-expanded",!sh)};
 Array.prototype.forEach.call(st.querySelectorAll(".i3-log-tabs button"),function(b,_,all){b.onclick=function(){Array.prototype.forEach.call(st.querySelectorAll(".i3-log-tabs button"),function(x){x.classList.toggle("on",x===b);x.setAttribute("aria-selected",x===b)});st.querySelector(".i3-log-sum").hidden=b.dataset.k!=="sum";logl.hidden=b.dataset.k!=="log";LOG.classList.remove("shut")}});
 /* 導覽：像一段短片，一步一步飛到各座島，時間也跟著走 */
 var D0=ISLE.data,TOURS=buildTours();
 function buildTours(){
  var cnt=function(t,g){return ISLE.info[t].filter(function(c){return c.grade===g})},out=[];
  var a=[];for(var g=3;g<=6;g++){var best=D0.themes.map(function(t){return{t:t,cs:cnt(t,g)}}).filter(function(o){return o.cs.length}).sort(function(x,y){return y.cs.length-x.cs.length}).slice(0,2);
   best.forEach(function(o,k){a.push({t:o.t,cid:o.cs[0].id,grade:g,text:VN[g]+"（"+VL[g]+"）"+(k?"，也會到":"，先到")+"「"+o.t+"」島："+o.cs.map(function(c){return c.name}).slice(0,2).join("、")+(o.cs.length>2?"⋯":"")})})}
  a.forEach(function(st,i){st.hour=7+i/(a.length-1)*11});out.push({name:"國中理化四冊",desc:"從八上到九下，每一冊會去哪些島",steps:a});
  var b=[],cur="科學方法與測量",seen={};if(!ISLE.info[cur])cur=D0.themes[0];
  var from=null;while(cur&&b.length<8){seen[cur]=1;b.push({t:cur,text:b.length?"接著是「"+cur+"」島（"+ISLE.info[cur].length+" 節），會用到「"+from+"」島學過的東西":"從「"+cur+"」島出發：觀察、測量是一切實驗的起點"});
   var best=null;Object.keys(seen).forEach(function(v){ISLE.neighbors(v).post.forEach(function(e){if(!seen[e.b]&&(!best||e.n>best.n))best=e})});from=best&&best.a;cur=best&&best.b}
  b.forEach(function(st,i){st.hour=8+i*1.5});b.push({t:null,bird:1,hour:20,text:"從上面看：光管就是剛剛走過的先備路線"});out.push({name:"一條先備路線",desc:"順著光管，一座接一座",steps:b});
  var c=[],DN={};["N","S","R","D"].forEach(function(k){DN[k]=DM[k]?DM[k].name:k});["N","S","R","D"].forEach(function(k,i){var L=D0.groups[k]||[];if(!L.length)return;var top=L.slice().sort(function(x,y){return ISLE.info[y].length-ISLE.info[x].length})[0];c.push({t:top,dom:k,hour:9+i*3,text:DN[k]+"："+L.length+" 座島，最大的是「"+top+"」島（"+ISLE.info[top].length+" 節）"})});
  out.push({name:"四大領域",desc:["N","S","R","D"].map(function(k){return DN[k]}).join("、"),steps:c});return out}
 var tl=st.querySelector(".i3-tours");TOURS.forEach(function(T,i){var li=NB.h('<li><button type="button"><span class="i3-tn">0'+(i+1)+'</span><b></b><small></small><span class="i3-tp" aria-hidden="true">▶</span></button></li>');li.querySelector("b").textContent=T.name;li.querySelector("small").textContent=T.desc+"・"+T.steps.length+" 站";li.firstChild.onclick=function(){tourStart(i)};tl.appendChild(li)});
 var PL=st.querySelector(".i3-play"),CK=st.querySelector(".i3-clock"),pcap=PL.querySelector(".i3-pl-cap"),pn=PL.querySelector(".i3-pl-n"),pbar=PL.querySelector(".i3-pl-bar i"),ppause=PL.querySelector(".i3-pl-pause");
 function tourStart(i){tourStop(true);TOUR={i:i,k:-1,T:TOURS[i],paused:false,tm:0};show(null);openIdx(false);PL.hidden=false;CK.hidden=true;st.classList.add("touring");ISLE.setInset(innerWidth<640?[0,-.12]:[0,.08]);addLog("開始導覽「"+TOUR.T.name+"」");tourGo(0)}
 function tourGo(k){if(!TOUR)return;clearTimeout(TOUR.tm);var S=TOUR.T.steps;if(k>=S.length){var nm=TOUR.T.name;tourStop();addLog("導覽「"+nm+"」結束");return}
  TOUR.k=k;var x=S[k];pn.textContent=("0"+(k+1)).slice(-2)+" / "+("0"+S.length).slice(-2);pcap.textContent=x.text;pbar.style.width=((k+1)/S.length*100)+"%";
  ISLE.setHour(x.hour);ISLE.setGrade(x.grade||0);ISLE.setDomains(x.dom?[x.dom]:null);
  TOUR.busy=true;if(x.bird)ISLE.birdsEye(true);else if(x.t)ISLE.select(x.t,x.cid);TOUR.busy=false;
  var end=k===S.length-1;PL.querySelector(".i3-pl-next").textContent=end?"完成 ✓":"下一步 →";
  if(!TOUR.paused&&!end)TOUR.tm=setTimeout(function(){tourGo(k+1)},5200)}
 function tourStop(quiet){if(!TOUR)return;clearTimeout(TOUR.tm);TOUR=null;PL.hidden=true;CK.hidden=false;st.classList.remove("touring");ISLE.setInset(null);ISLE.setGrade(GSEL());ISLE.setDomains(domSel());if(au.classList.contains("on"))ISLE.setHour(null);else ISLE.setHour(+rg.value);clk();if(!quiet&&ISLE.bird())ISLE.birdsEye(false)}
 ppause.onclick=function(){if(!TOUR)return;TOUR.paused=!TOUR.paused;ppause.textContent=TOUR.paused?"繼續":"暫停";if(TOUR.paused)clearTimeout(TOUR.tm);else if(TOUR.k<TOUR.T.steps.length-1)TOUR.tm=setTimeout(function(){tourGo(TOUR.k+1)},2500)};
 PL.querySelector(".i3-pl-re").onclick=function(){if(TOUR){ISLE.birdsEye(false);tourGo(0)}};
 PL.querySelector(".i3-pl-x").onclick=function(){tourStop();ISLE.select(null)};
 PL.querySelector(".i3-pl-skip").onclick=function(){if(TOUR)tourGo(TOUR.T.steps.length-1)};
 PL.querySelector(".i3-pl-next").onclick=function(){if(TOUR){if(ISLE.bird())ISLE.birdsEye(false);tourGo(TOUR.k+1)}};
 /* 主題索引：4 個領域，每座島列出小節數、探索過打勾，點了就飛過去 */
 var bi=st.querySelector(".i3-b-idx");
 (function(){var D=ISLE.data;idx.appendChild(NB.h('<div class="i3-idx-h"><b>主題索引</b><button type="button" class="i3-x" aria-label="關閉">×</button></div>'));
  var pg0=ISLE.progress();idx.appendChild(NB.h('<p class="meta i3-idx-s">'+pg0.total+' 座主題島、'+pg0.chTotal+' 個小節。選一座島就會飛過去；下面的領域可以複選，只看那幾區。</p>'));
  var fl=NB.h('<div class="i3-idx-f" role="group" aria-label="只看某些領域（可複選）"></div>');["N","S","R","D"].filter(function(k){return DM[k]}).map(function(k){return[k,DM[k].name]}).forEach(function(k){if(!(D.groups[k[0]]||[]).length)return;var b=NB.h('<button type="button" class="i3-dom i3-d'+k[0]+'" aria-pressed="false"></button>');b.dataset.k=k[0];b.textContent=k[1];b.onclick=function(){var on=b.getAttribute("aria-pressed")!=="true";b.setAttribute("aria-pressed",on);b.classList.toggle("sel",on);if(!TOUR)ISLE.setDomains(domSel())};fl.appendChild(b)});idx.appendChild(fl);
  ["N","S","R","D"].filter(function(k){return DM[k]}).map(function(k){return[k,DM[k].name]}).forEach(function(k){var list=D.groups[k[0]];if(!list||!list.length)return;
   var sec=NB.h('<div class="i3-idx-d"><p class="i3-dom i3-d'+k[0]+'"></p><div></div></div>');sec.firstChild.textContent=k[1]+"（"+list.length+" 島）";
   list.forEach(function(t){var b=NB.h('<button type="button" class="i3-idx-i"><span></span><small></small></button>');b.dataset.t=t;b.firstChild.textContent=(ISLE.explored(t)?"✓ ":"")+t;b.lastChild.textContent=ISLE.info[t].length+" 節";b.onclick=function(){ISLE.select(t);if(innerWidth<900)openIdx(false)};sec.lastChild.appendChild(b)});idx.appendChild(sec)});
  idx.querySelector(".i3-x").onclick=function(){openIdx(false)}})();
 function domSel(){return Array.prototype.filter.call(idx.querySelectorAll(".i3-idx-f button"),function(b){return b.getAttribute("aria-pressed")==="true"}).map(function(b){return b.dataset.k})}
 function openIdx(on){idx.hidden=!on;bi.classList.toggle("on",on);bi.setAttribute("aria-expanded",on);st.classList.toggle("idx-on",on)}
 function markIdx(t){Array.prototype.forEach.call(idx.querySelectorAll(".i3-idx-i"),function(b){b.classList.toggle("on",b.dataset.t===t)});if(t&&ISLE.bird()){bb.classList.remove("on");bb.setAttribute("aria-pressed",false)}}
 bi.onclick=function(){openIdx(idx.hidden)};
 /* 搜尋 */
 var inp=st.querySelector(".i3-find input"),res=st.querySelector(".i3-res"),tmr=0;
 inp.addEventListener("input",function(){clearTimeout(tmr);tmr=setTimeout(function(){var r=ISLE.search(inp.value);res.innerHTML="";if(!inp.value.trim()){res.hidden=true;return}
  res.hidden=false;if(!r.length){res.appendChild(NB.h('<p class="meta">找不到「'+esc(inp.value.trim())+'」</p>'));return}
  r.slice(0,12).forEach(function(x){var b=NB.h('<button type="button"><b></b><small></small></button>');b.querySelector("b").textContent=(x.c.num||"")+" "+x.c.name;b.querySelector("small").textContent=x.t+"島・"+x.c.sem+" "+NB.chName(x.c.ch)+" "+x.c.ch.name;b.onclick=function(){res.hidden=true;ISLE.select(x.t,x.c.id)};res.appendChild(b)});
  if(r.length>12)res.appendChild(NB.h('<p class="meta">還有 '+(r.length-12)+' 筆，請再打得精確一點</p>'))},180)});
 inp.addEventListener("keydown",function(e){if(e.key==="Escape"){inp.value="";ISLE.search("");res.hidden=true}});
 /* 螢幕閱讀器與鍵盤用的島嶼清單 */
 ISLE.data.themes.slice().sort(function(a,b){return ISLE.domKey(a).localeCompare(ISLE.domKey(b))}).forEach(function(t){var li=NB.h('<li><button type="button"></button></li>');li.firstChild.textContent=t+"島（"+ISLE.domName(t)+"，"+ISLE.info[t].length+" 節）";li.firstChild.onclick=function(){ISLE.select(t)};srl.appendChild(li)});
 var pk=NB.h('<li><button type="button">戳戳島民（他會說話）</button></li>'),said=NB.h('<li aria-live="polite"></li>');pk.firstChild.onclick=function(){said.textContent="島民說："+ISLE.poke()};srl.appendChild(pk);srl.appendChild(said);
 /* 島的面板：小節依冊別、章排好；下面是先學／接著學的島 */
 function show(t,cid){
  if(!t){panel.hidden=true;delete panel.dataset.t;return}
  panel.dataset.t=t;panel.hidden=false;var cs=ISLE.info[t],g=GSEL(),tr=NB.trail.all(),nb=ISLE.neighbors(t);
  panel.innerHTML='<button type="button" class="i3-x" aria-label="關閉">×</button><p class="i3-dom i3-d'+ISLE.domKey(t)+'">'+esc(ISLE.domName(t))+'</p><h2>'+esc(t)+'島</h2><p class="meta">'+cs.length+' 個小節'+(g?"・目前只看"+VN[g]:"")+'</p><div class="i3-chs"></div><div class="i3-nb"></div>';
  panel.querySelector(".i3-x").onclick=function(){ISLE.select(null)};
  var box=panel.querySelector(".i3-chs"),groups=[];
  cs.filter(function(c){return!g||c.grade===g}).forEach(function(c){var last=groups[groups.length-1];if(!last||last.ch!==c.ch)groups.push(last={ch:c.ch,grade:c.grade,sem:c.sem,items:[]});last.items.push(c)});
  groups.forEach(function(G){
   var d=NB.h('<div class="i3-ch i3-chg"><p class="i3-cht"><span class="i3-g" style="background:rgb('+NB.isle3d.GRADE_COL[G.grade].join(",")+')">'+VL[G.grade]+'</span><b></b></p><div class="secs"></div></div>');
   d.querySelector("b").textContent=NB.chName(G.ch)+" "+G.ch.name;
   var ul=d.querySelector(".secs");G.items.forEach(function(c){var o=c.secs[0],x=tr[o.id],rd=isReady(o.id),a=NB.h('<a class="'+(rd?"lnk":"todo")+(x&&x.d?" fin":x&&x.v?" seen":"")+(c.id===cid?" here":"")+'" href="'+NB.link(o)+'"'+(rd?"":' title="建置中"')+'></a>');a.textContent=o.num+" "+o.title;var sm=NB_MAP.sec&&NB_MAP.sec[o.id],cc=(NB_MAP.ch[o.id]&&NB_MAP.ch[o.id].c||[]);if(sm){var tg=NB.h('<small class="i3-tag"></small>');tg.textContent=sm[0]+"・"+sm[1];a.appendChild(tg);a.title=(rd?"":"建置中・")+"認知層次："+sm[0]+"・知識類型："+sm[1]+(cc.length?"・學習內容："+cc.map(function(x){return x.replace("-IV-","-Ⅳ-")}).join("、"):"")}ul.appendChild(a);if(c.id===cid)setTimeout(function(){a.scrollIntoView({block:"nearest"});a.focus({preventScroll:true})},60)});
   box.appendChild(d)});
  if(!box.children.length)box.appendChild(NB.h('<p class="meta">這座島沒有這一冊的小節。</p>'));
  var nbx=panel.querySelector(".i3-nb");
  nbx.appendChild(NB.h('<p class="meta"><a class="lnk" href="map.html">在學習地圖上看前後關係、課綱對照 →</a></p>'));
  function chips(title,list,key){if(!list.length)return;var w=NB.h('<div><p class="i3-nbt">'+title+'</p></div>');list.slice(0,6).forEach(function(e){var b=NB.h('<button type="button" class="i3-chip"></button>');b.textContent=e[key]+"島";b.title="有 "+e.n+" 組小節的先後關係";b.onclick=function(){ISLE.select(e[key])};w.appendChild(b)});nbx.appendChild(w)}
  chips("先學這些島（藍色光弧）",nb.pre,"a");chips("接著可以去（黃色光弧）",nb.post,"b");
  panel.scrollTop=0}
 /* 繼續上次 */
 var lt=NB.trail.last();if(lt){var li=NB.info(lt),rs=NB.h('<a class="i3-resume"><small>繼續上次</small><b></b></a>');rs.href=NB.link(NB.flat.filter(function(o){return o.id===lt})[0]);rs.querySelector("b").textContent=li.title;st.appendChild(rs)}
 if(NB.tour)NB.tour.setup("isle3d",[{title:"歡迎來到見微群島",text:"每座島是一條理化主題線（光、溫度與熱、化學反應⋯），島上的小房子是各冊的小節。想再看一次，按左下角的 i 圓形按鈕。"},
  {sel:".i3-cv",title:"轉一轉、點一點",text:"拖曳可以轉動群島，滾輪或雙指可以縮放。點一座島，就會看到這座島上的小節。"},
  {sel:".i3-find",title:"找單元",text:"輸入關鍵字，例如「密度」「透鏡」，相關的島和房子會亮起來。"},
  {sel:".i3-grades",title:"只看某一冊",text:"選一冊後，其他冊的房子會變灰。"},
  {sel:".i3-tb",title:"工具列",text:"「主題索引」列出所有島；「名牌」開關島名；「島民」開關走來走去的小島民；「日誌」開關右下角的群島日誌；「先備線」是島與島之間的光管（藍色先學、黃色接著學）；「暫停」讓時間停下來；「鳥瞰」從正上方看整片群島。"},
  {sel:".i3-clock",title:"時間軸",text:"拖動可以看群島從清晨到深夜的樣子，晚上房子會亮燈；按「自動」就跟著現在的時間。"},
  {sel:".i3-log",title:"群島日誌",text:"「群島概況」裡有三段導覽，按 ▶ 就會自動帶你逛；「日誌」會即時記下島民跳島、說話和天色變化。"}])}

/* 3D 引擎是 module，會比這支程式晚到：等它準備好（最多 4 秒），沒來就用清單 */
function canGL(){try{var c=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(c.getContext("webgl2")||c.getContext("webgl")))}catch(e){return false}}
function render(){
 if(!window.NB_MAP||!canGL()){renderList();homeTour();return}
 if(NB.isle3d)return render3d();
 app.innerHTML='<p class="meta" style="text-align:center;padding:3em 0">群島浮出海面中⋯⋯</p>';
 var done=false,go=function(ok){if(done)return;done=true;if(ok&&NB.isle3d)render3d();else{renderList();homeTour()}};
 window.addEventListener("isle3d-ready",function(){go(true)});setTimeout(function(){go(!!NB.isle3d)},4000)}
function renderList(){
 app.innerHTML="";app.classList.remove("i3page");
 app.appendChild(topBar());app.appendChild(NB.h('<div class="ruler"></div>'));
 app.appendChild(NB.h('<h1 class="title"><mark>單元目錄</mark></h1>'));app.appendChild(NB.h('<p class="meta">這台裝置畫不出 3D 群島，先用清單瀏覽。<a class="lnk" href="map.html">看學習地圖</a></p>'));if(window.SciTools)SciTools.button();
 var lt=NB.trail.last();
 if(lt){var li=NB.info(lt),rs=NB.h('<div class="resume"><b>繼續上次</b><a class="lnk"></a></div>');rs.querySelector("a").href=NB.link(NB.flat.filter(function(o){return o.id===lt})[0]);rs.querySelector("a").textContent=li.title;app.appendChild(rs)}
 var tabs=NB.h('<div class="tabs"></div>');
 [3,4,5,6].forEach(function(g){var b=NB.h('<button class="pen'+(grade===g?" on":"")+'">'+VN[g]+'（'+VL[g]+'）</button>');b.onclick=function(){grade=g;try{localStorage.setItem("li-vol",g)}catch(e){}renderList()};tabs.appendChild(b)});
 app.appendChild(tabs);
 NB.cat.filter(function(S){return S.grade===grade}).forEach(function(S){
  var d=NB.h('<section class="sheet"></section>');
  S.chs.forEach(function(c){
   var p=NB.h('<div class="chap"><span class="no">'+NB.chName(c)+'</span><b></b><span class="dots"></span><span class="cnt">共 '+c.secs.length+' 小節</span></div>'),ul=NB.h('<div class="secs"></div>');p.querySelector("b").textContent=c.name;
   c.secs.forEach(function(o){var x=NB.trail.get(o.id),t=NB.h('<a class="'+(isReady(o.id)?"lnk":"todo")+(x&&x.d?" fin":x&&x.v?" seen":"")+'" href="'+NB.link(o)+'"></a>');t.textContent=o.num+" "+o.title;ul.appendChild(t)});
   d.appendChild(p);d.appendChild(ul)});
  app.appendChild(d)});
}
function homeTour(){if(NB.tour)NB.tour.setup("home",[{title:"歡迎來到見微理畫",text:"選一冊，點小節就能開始。想再看一次，隨時按左下角的 i 圓形按鈕。"},
 {sel:".tabs",title:"選冊別",text:"第三冊到第六冊的目錄都在這裡，按一下就切換。"},
 {sel:".secs .lnk",title:"選一個小節",text:"每個小節都是一頁：先看情境，再動手做模擬實驗，接著看原理，最後挑戰一題。"},
 {sel:".themes",title:"外觀",text:"可以切換永晝、永夜或跟隨系統。"}])}
render();
})();
