/* 學習地圖（見微理畫）：單元頁底部的「前後連貫」卡片，以及 map.html 的學習地圖。資料在 assets/data/learning-map.js。
   和數光島筆記本同一套邏輯：領域、學習內容（108 課綱代碼）、學習表現、認知層次、知識類型、主題線（主題島）。
   理化的先備關係是以「小節」為單位；地圖上每一座小島是一章，章與章的弧線由小節的先備關係合成。 */
(function(){
var M=window.NB_MAP;if(!M||!window.NB)return;
var DM=M.dom||{},DOM={},COG=["知識","理解","應用","分析","評鑑","創造"],KNOW=["事實性","概念性","程序性","後設認知"],CNZ="零一二三四五六七八九十",
 root=document.body.getAttribute("data-root")||"./";Object.keys(DM).forEach(function(k){DOM[k]=DM[k].name});
function roman(c){return String(c).replace("-IV-","-Ⅳ-")}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
/* ---- 章（地圖上的小島）：由小節合成 ---- */
var chInfo={},secCh={},cp={},csucc={},succ={},used={};
Object.keys(M.sec||{}).forEach(function(k){used[M.sec[k][0]]=1});
NB.cat.forEach(function(S){S.chs.forEach(function(c){var k=S.id+"-"+c.key,nm=c.cross?"跨科 "+c.name:"第"+CNZ[c.no]+"章 "+c.name;
 chInfo[k]={key:k,S:S,c:c,label:S.sem+" "+nm,short:c.name};c.secs.forEach(function(o){secCh[o.id]=k})})});
function ckey(id){return secCh[id]||String(id).replace(/\.\d+$/,"")}
Object.keys(M.ch).forEach(function(s){(M.ch[s].p||[]).forEach(function(p){(succ[p]=succ[p]||[]).push(s);var a=ckey(p),b=ckey(s);if(a!==b){(cp[b]=cp[b]||{})[a]=1}})});
Object.keys(cp).forEach(function(b){Object.keys(cp[b]).forEach(function(a){(csucc[a]=csucc[a]||{})[b]=1})});
function chP(k){return Object.keys(cp[k]||{})}function chS(k){return Object.keys(csucc[k]||{})}
function chDom(k){var i=chInfo[k];if(!i)return"N";var n={};i.c.secs.forEach(function(o){var d=M.ch[o.id]&&M.ch[o.id].d;if(d)n[d]=(n[d]||0)+1});return Object.keys(n).sort(function(a,b){return n[b]-n[a]})[0]||"N"}
function chTh(k){var t={};(chInfo[k]?chInfo[k].c.secs:[]).forEach(function(o){(M.ch[o.id].t||[]).forEach(function(x){t[x]=1})});return Object.keys(t)}
function order(list){var all=NB.flat.map(function(o){return o.id});return list.slice().sort(function(a,b){return all.indexOf(a)-all.indexOf(b)})}
function chOrder(list){var keys=Object.keys(chInfo);return list.slice().sort(function(a,b){return keys.indexOf(a)-keys.indexOf(b)})}
function secLabel(id){var o=NB.flat.filter(function(x){return x.id===id})[0];return o?o.sem+" "+o.num+" "+o.title:id}
function secLink(id){var a=el("a","lnk",secLabel(id));a.href=root+"unit.html?u="+id;return a}
/* ---- 課綱對照小標籤（單元頁與地圖共用） ---- */
function chips(parent,sid){
 var m=M.ch[sid];if(!m)return;var thm={};(m.c||[]).forEach(function(c){var t=c.charAt(0);if(M.cth&&M.cth[t])thm[t]=t+" "+M.cth[t]});
 var g=[["領域",(DOM[m.d]||m.d)],["課綱主題",Object.keys(thm).map(function(k){return thm[k]}).join("、")||"（以探究能力為主）"],["學習表現",(m.pf||[]).map(function(x){return x+"-Ⅳ "+((M.pfn||{})[x]||"")}).join("、")],["主題線",(m.t||[]).join("、")]];
 if(M.sec&&M.sec[sid]){g.push(["認知層次",M.sec[sid][0]]);g.push(["知識類型",M.sec[sid][1]])}
 var d=el("div","lm-tags");g.forEach(function(x){if(!x[1])return;var r=el("span","lm-tag");r.appendChild(el("small",null,x[0]));r.appendChild(el("b",null,x[1]));d.appendChild(r)});parent.appendChild(d);
 if((m.c||[]).length){var ul=el("ul","lm-codes");m.c.forEach(function(c){var li=el("li");li.appendChild(el("b",null,roman(c)));li.appendChild(document.createTextNode(" "+((M.cc||{})[c]||"")));ul.appendChild(li)});var cap=el("p","meta","學習內容（十二年國教自然科學領域・第四學習階段）");parent.appendChild(cap);parent.appendChild(ul)}}
/* ---- 單元頁底部 ---- */
function card(app,id){
 var m=M.ch[id];if(!m)return;
 var s=el("section","sheet lmap"),h=el("h2");h.appendChild(el("span","tag","學習地圖"));h.appendChild(document.createTextNode("前後連貫"));s.appendChild(h);
 function row(t,list){if(!list.length)return;var r=el("div","lm-row");r.appendChild(el("b",null,t));list.forEach(function(x){r.appendChild(secLink(x))});s.appendChild(r)}
 row("先學過",order(m.p||[]));row("接著學",order(succ[id]||[]));
 if(!(m.p||[]).length&&!(succ[id]||[]).length)s.appendChild(el("p","meta","這一節是獨立的起點。"));
 var d=el("details","lm-det"),sm=el("summary",null,"課綱對照（領域、學習內容、學習表現、認知層次、知識類型、主題線）");d.appendChild(sm);chips(d,id);
 d.appendChild(el("p","meta","認知層次與知識類型是依小節內容的建議標記，供備課與出卷參考。"));s.appendChild(d);
 var a=el("a","lnk lm-all","看整張學習地圖");a.href=root+"map.html?c="+encodeURIComponent(ckey(id));s.appendChild(a);
 var nv=app.querySelector("nav.bar:last-of-type");if(nv&&nv.parentNode===app&&app.lastElementChild===nv)app.insertBefore(s,nv);else app.appendChild(s)}
/* ---- map.html：橫軸是冊別，縱軸是領域，每一章是一座小島 ---- */
var SVGNS="http://www.w3.org/2000/svg";
function DCOL(d){return DM[d]?DM[d].top:"var(--p2)"}
function S_(tag,a,p){var e=document.createElementNS(SVGNS,tag);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function closure(k,dir){var seen={},q=[k];while(q.length){var x=q.pop();(dir<0?chP(x):chS(x)).forEach(function(y){if(!seen[y]){seen[y]=1;q.push(y)}})}return seen}
function trailOf(k){var u=NB.trail.all(),c=chInfo[k].c.secs,seen=0,done=0;c.forEach(function(o){var x=u[o.id];if(x){if(x.v)seen++;if(x.d)done++}});return{seen:seen,done:done,n:c.length}}
function page(){
 var app=document.getElementById("app");app.innerHTML="";
 var bar=NB.h('<nav class="bar"><a class="back" href="'+root+'island.html">← 回到群島</a></nav>');NB.barR?NB.barR(bar,{cur:"map",noFocus:true}):bar.appendChild(NB.themeBar());app.appendChild(bar);
 app.appendChild(NB.h('<h1 class="title"><mark>學習地圖</mark></h1>'));
 app.appendChild(NB.h('<p class="lead">一座島是一章，弧線是「先學這個，才學得會那個」。點一個領域，整片島群就會亮起那個領域；點一座島，會亮出它前後的整條路，小島民還會跳著帶你走一遍。</p>'));
 app.appendChild(NB.deco.rule());
 var f={dom:"",th:"",cog:"",know:"",code:""},sel="",want=new URLSearchParams(location.search).get("c")||"";
 var fb=el("div","lm-filter");app.appendChild(fb);
 var grid=el("div","lm-grid");app.appendChild(grid);var left=el("div");grid.appendChild(left);var wrap=el("div","lm-map");left.appendChild(wrap);left.appendChild(el("p","meta lm-hint","可以上下左右滑動；點島看細節，再點一次取消。"));
 var info=el("div","lm-info");grid.appendChild(info);info.appendChild(el("p","meta","點一座島，這裡會顯示它的小節、先備與接續。"));
 var keys=Object.keys(chInfo),dk={};keys.forEach(function(k){dk[k]=chDom(k)});
 var vols=NB.cat.map(function(x){return x.id}),CW=150,X0=104,doms=["N","S","R","D"].filter(function(d){return DOM[d]}),pos={},bandTop={},bandH={},cnt={};
 keys.forEach(function(k){var d=dk[k],c=vols.indexOf(chInfo[k].S.id);(cnt[d]=cnt[d]||{});(cnt[d][c]=cnt[d][c]||[]).push(k)});
 var y=52;doms.forEach(function(d){var mx=1;Object.keys(cnt[d]||{}).forEach(function(c){mx=Math.max(mx,cnt[d][c].length)});bandTop[d]=y;bandH[d]=mx*56+60;y+=bandH[d]+22});
 var Wd=X0+vols.length*CW+30,Hd=y;
 doms.forEach(function(d){Object.keys(cnt[d]||{}).forEach(function(c){var arr=cnt[d][c],off=(bandH[d]-60-arr.length*56)/2;arr.forEach(function(k,i){pos[k]={x:X0+(+c)*CW+CW/2-10,y:bandTop[d]+40+off+i*56+20}})})});
 var svg=S_("svg",{viewBox:"0 0 "+Wd+" "+Hd,width:Wd,height:Hd,"class":"mapsvg",role:"img","aria-label":"學習地圖：各領域各章的先備關係"});wrap.appendChild(svg);
 var defs=S_("defs",{},svg);var gl=S_("filter",{id:"lmglow",x:"-60%",y:"-60%",width:"220%",height:"220%"},defs);S_("feGaussianBlur",{stdDeviation:"5",result:"b"},gl);var mg=S_("feMerge",{},gl);S_("feMergeNode",{"in":"b"},mg);S_("feMergeNode",{"in":"SourceGraphic"},mg);
 S_("rect",{x:0,y:0,width:Wd,height:Hd,"class":"lm-sea"},svg);
 var wv=S_("g",{"class":"lm-waves"},svg);for(var wy=70;wy<Hd;wy+=46){for(var wx=((wy/46)%2)*60+20;wx<Wd;wx+=120){S_("path",{d:"M"+wx+" "+wy+"q10 -7 20 0t20 0","class":"wv"},wv)}}
 var sp=S_("g",{"class":"lm-spark","aria-hidden":"true"},svg);for(var q=0;q<40;q++)S_("circle",{cx:(q*173)%Wd,cy:(q*97)%Hd,r:1.6,style:"animation-delay:"+((q*0.37)%4).toFixed(2)+"s"},sp);
 NB.cat.forEach(function(S,i){var t=S_("text",{x:X0+i*CW+CW/2-10,y:30,"text-anchor":"middle","class":"lm-sem"},svg);t.textContent=S.sem+"（"+S.label+"）";if(i)S_("path",{d:"M"+(X0+i*CW-10)+" 40V"+(Hd-8),"class":"lm-gl"},svg)});
 var bands={};doms.forEach(function(d){var g=S_("g",{"class":"lm-band d"+d},svg),t=bandTop[d],h=bandH[d],w=Wd-24;
  var path="M14 "+(t+18)+"Q40 "+t+" 80 "+(t+10)+"T170 "+(t+14)+"T300 "+(t+8)+"T"+(w*.6)+" "+(t+14)+"T"+w+" "+(t+10)+"V"+(t+h-14)+"Q"+(w-40)+" "+(t+h+4)+" "+(w-90)+" "+(t+h-8)+"T"+(w*.55)+" "+(t+h-4)+"T200 "+(t+h-10)+"T14 "+(t+h-6)+"Z";
  S_("path",{d:path,"class":"bd",fill:DCOL(d)},g);var lb=S_("text",{x:20,y:t+30,"class":"lm-dn"},g);lb.textContent=DOM[d];bands[d]=g});
 var edges=[],eg=S_("g",{"class":"lm-edges"},svg);
 keys.forEach(function(k){chP(k).forEach(function(p){if(!pos[p]||!pos[k])return;var a=pos[p],b=pos[k],dx=b.x-a.x,d;
   if(Math.abs(dx)<4){var yy=(a.y+b.y)/2;d="M"+(a.x+16)+" "+a.y+"Q"+(a.x+70)+" "+yy+" "+(b.x+16)+" "+b.y}
   else{var c=Math.min(70,30+Math.abs(b.y-a.y)*.25)+Math.abs(dx)*.06;d="M"+(a.x+16)+" "+a.y+"C"+(a.x+dx*.45)+" "+(a.y-c)+" "+(b.x-dx*.45)+" "+(b.y-c)+" "+(b.x-16)+" "+b.y}
   var pe=S_("path",{d:d,"class":"lm-e d"+dk[k],fill:"none"},eg);edges.push({p:p,k:k,el:pe})})});
 var nodes={},ng=S_("g",{"class":"lm-nodes"},svg),last=NB.trail.last(),lastK=last?ckey(last):"";
 keys.forEach(function(k){if(!pos[k])return;var P=pos[k],d=dk[k],t=trailOf(k),g=S_("g",{"class":"lm-n d"+d+(t.seen?" seen":"")+(k===lastK?" here":""),transform:"translate("+P.x+","+P.y+")",tabindex:0,role:"button","aria-label":chInfo[k].label},ng);
  S_("ellipse",{cx:0,cy:11,rx:25,ry:8,"class":"rip"},g);
  S_("path",{d:"M-19 8C-19 1-9 -1 0 -1C10 -1 19 1 19 8C19 14 9 16 0 16C-9 16-19 14-19 8Z","class":"sand"},g);
  S_("path",{d:"M-13 3C-13-7-5-12 1-12C9-12 13-6 13 3C7 6-7 6-13 3Z","class":"isl",fill:DCOL(d)},g);
  S_("path",{d:"M7 3Q9 -4 8 -12","class":"trk"},g);["M8 -12Q1 -21 -5 -13Q2 -16 8 -12Z","M8 -12Q15 -21 21 -13Q14 -16 8 -12Z","M8 -12Q4 -22 11 -24Q10 -18 8 -12Z"].forEach(function(dd){S_("path",{d:dd,"class":"plm"},g)});
  if(t.done)S_("path",{d:"M-6 2l4 4 8-9","class":"ck"},g);
  var tx=S_("text",{y:30,"text-anchor":"middle","class":"lm-nl"},g);var nm=chInfo[k].short;tx.textContent=nm.length>8?nm.slice(0,7)+"…":nm;
  var ti=S_("title",{},g);ti.textContent=chInfo[k].label;
  g.addEventListener("click",function(){choose(k)});g.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(k)}});nodes[k]=g});
 var hop=S_("g",{"class":"lm-hop",transform:"translate(-100,-100)"},svg),hb=S_("g",{},hop);
 S_("path",{d:"M-12 0C-16-12-6-24 1-22C11-24 16-10 12 0C6 3-7 3-12 0Z",fill:"var(--p1)",stroke:"var(--ink)","stroke-width":1.6,"stroke-linejoin":"round"},hb);
 [[-4,-14],[5,-15]].forEach(function(e){S_("circle",{cx:e[0],cy:e[1],r:4,fill:"#fff",stroke:"var(--ink)","stroke-width":1.2},hb);S_("circle",{cx:e[0]+1,cy:e[1]+1,r:1.7,fill:"var(--ink)"},hb)});
 S_("path",{d:"M-3 -7q3 3 7 0",fill:"none",stroke:"var(--ink)","stroke-width":1.4,"stroke-linecap":"round"},hb);
 var cur=lastK&&pos[lastK]?lastK:"",anim=0;
 function place(x,y){hop.setAttribute("transform","translate("+x+","+y+")")}
 function reduce(){return window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches}
 function jump(to,done,ms){var from=cur&&pos[cur]?pos[cur]:{x:pos[to].x-60,y:pos[to].y-80},T=pos[to],t0=null,dur=ms||(reduce()?1:650);cancelAnimationFrame(anim);
  function step(t){if(!t0)t0=t;var k=Math.min(1,Math.max(0,(t-t0)/dur)),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;place(from.x+(T.x-from.x)*e,from.y+(T.y-from.y)*e-14-Math.sin(Math.PI*k)*(34+Math.abs(T.x-from.x)*.12));if(k<1)anim=requestAnimationFrame(step);else{cur=to;place(T.x,T.y-14);done&&done()}}
  anim=requestAnimationFrame(step)}
 if(cur)place(pos[cur].x,pos[cur].y-14);
 function match(sid){var m=M.sec[sid]||[],c=M.ch[sid]||{};return(!f.cog||m[0]===f.cog)&&(!f.know||m[1]===f.know)&&(!f.code||(c.c||[]).some(function(x){return x.charAt(0)===f.code}))}
 var thSet={};
 function paint(){
  thSet={};if(f.th)keys.forEach(function(k){if(chTh(k).indexOf(f.th)>=0)thSet[k]=1});
  var up=sel?closure(sel,-1):{},dn=sel?closure(sel,1):{};if(sel){up[sel]=1;dn[sel]=1}
  doms.forEach(function(d){bands[d].classList.toggle("on",f.dom===d);bands[d].classList.toggle("off",!!f.dom&&f.dom!==d)});
  Object.keys(nodes).forEach(function(k){var g=nodes[k],lit=true;
   if(f.dom&&dk[k]!==f.dom)lit=false;if(f.th&&!thSet[k])lit=false;if((f.cog||f.know||f.code)&&!chInfo[k].c.secs.some(function(o){return match(o.id)}))lit=false;
   if(sel&&!(up[k]||dn[k]))lit=false;
   g.classList.toggle("dim",!lit);g.classList.toggle("glow",lit&&(!!f.dom||!!sel||!!f.th||!!f.code));g.classList.toggle("sel",k===sel)});
  edges.forEach(function(e){var on=true,hi=false;
   if(f.dom)on=dk[e.p]===f.dom||dk[e.k]===f.dom;if(f.th)on=on&&thSet[e.p]&&thSet[e.k];
   if(sel){hi=!!((up[e.k]&&up[e.p])||(dn[e.p]&&dn[e.k]));on=on&&hi}
   e.el.classList.toggle("dim",!on);e.el.classList.toggle("hi",on&&(hi||!!f.dom||!!f.th))})}
 function choose(k){
  if(sel===k){sel="";info.innerHTML="";info.appendChild(el("p","meta","點一座島，這裡會顯示它的小節、先備與接續。"));paint();return}
  sel=k;paint();jump(k);wrap.scrollTo&&wrap.scrollTo({left:Math.max(0,pos[k].x-wrap.clientWidth/2),top:Math.max(0,pos[k].y-wrap.clientHeight/2),behavior:reduce()?"auto":"smooth"});info.innerHTML="";info.appendChild(detail(k));if(innerWidth<1000)setTimeout(function(){info.scrollIntoView({behavior:"smooth",block:"start"})},350);
  var nb=info.querySelector(".lm-tour");if(nb)nb.onclick=function(){tour(k)}}
 function tour(k){var path=[k],x=k,guard=0;while(chP(x).length&&guard++<20){x=chOrder(chP(x))[0];if(path.indexOf(x)>=0)break;path.unshift(x)}
  var i=0;(function go(){if(i>=path.length)return;var kk=path[i++];wrap.scrollTo&&wrap.scrollTo({left:Math.max(0,pos[kk].x-wrap.clientWidth/2),top:Math.max(0,pos[kk].y-wrap.clientHeight/2),behavior:reduce()?"auto":"smooth"});jump(kk,function(){setTimeout(go,260)},reduce()?1:560)})()}
 function detail(k){
  var i=chInfo[k],d=el("div","lm-detail");d.appendChild(el("h3",null,i.label));
  var tg=el("div","lm-tags");[["領域",DOM[dk[k]]],["主題線",chTh(k).join("、")]].forEach(function(x){var r=el("span","lm-tag");r.appendChild(el("small",null,x[0]));r.appendChild(el("b",null,x[1]));tg.appendChild(r)});d.appendChild(tg);
  var ul=el("div","lm-secs");i.c.secs.forEach(function(o){var r=el("div","lm-sec"+(match(o.id)?"":" dim")),a=el("a","lnk",o.num+" "+o.title);a.href=root+"unit.html?u="+o.id;r.appendChild(a);var x=NB.trail.get(o.id);if(x&&x.d)r.appendChild(el("span","lm-st","答對過"));else if(x&&x.v)r.appendChild(el("span","lm-st","看過"));
   var m=M.sec[o.id]||["",""],cs=(M.ch[o.id].c||[]).map(roman).join("、");r.appendChild(el("small",null,m[0]+"・"+m[1]+(cs?"・"+cs:"")));ul.appendChild(r)});d.appendChild(ul);
  function row(t,list){if(!list.length)return;var r=el("div","lm-row");r.appendChild(el("b",null,t));list.forEach(function(x){var a=el("a","lnk",chInfo[x].label);a.href="#";a.onclick=function(ev){ev.preventDefault();choose(x)};r.appendChild(a)});d.appendChild(r)}
  row("先學過",chOrder(chP(k)));row("接著學",chOrder(chS(k)));
  var tb=el("button","pen go lm-tour","跳島導覽：從起點走到這裡");tb.type="button";d.appendChild(tb);return d}
 function group(label,key,vals){var g=el("div","lm-fg");g.appendChild(el("span","lm-fl",label));[["","全部"]].concat(vals.map(function(v){return Array.isArray(v)?v:[v,v]})).forEach(function(v){var b=el("button","pen"+(f[key]===v[0]?" on":""),v[1]);b.type="button";b.onclick=function(){f[key]=v[0];Array.prototype.forEach.call(g.querySelectorAll(".pen"),function(x){x.classList.toggle("on",x===b)});paint()};g.appendChild(b)});fb.appendChild(g)}
 group("領域","dom",doms.map(function(k){return[k,DOM[k]]}));
 var tset={};Object.keys(M.ch).forEach(function(s){(M.ch[s].c||[]).forEach(function(c){tset[c.charAt(0)]=1})});
 group("課綱主題","code",Object.keys(M.cth||{}).filter(function(t){return tset[t]}).map(function(t){return[t,t+" "+M.cth[t]]}));
 group("認知層次","cog",COG.filter(function(v){return used[v]}));group("知識類型","know",KNOW);
 var tg=el("div","lm-fg");tg.appendChild(el("span","lm-fl","主題線"));var se=el("select");se.setAttribute("aria-label","主題線");se.appendChild(new Option("全部主題島",""));Object.keys(M.th).forEach(function(n){se.appendChild(new Option(n,n))});se.onchange=function(){f.th=se.value;paint()};tg.appendChild(se);fb.appendChild(tg);
 paint();
 if(want&&pos[want]){setTimeout(function(){choose(want)},80)}
 else if(cur){setTimeout(function(){wrap.scrollTo&&wrap.scrollTo({left:Math.max(0,pos[cur].x-wrap.clientWidth/2)})},80)}}
NB.map={card:card,page:page,chips:chips,info:function(id){return M.ch[id]?{ch:M.ch[id],sec:M.sec[id]}:null}};
})();
