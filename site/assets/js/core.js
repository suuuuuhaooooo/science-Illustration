/* 核心：SVG 手繪工具、主題切換、單元頁樣板（情境 → 動手做 → 原理 → 挑戰）、目錄解析、學習軌跡 */
(function(){
var NS="http://www.w3.org/2000/svg",KEY="nb-theme",root=document.body.getAttribute("data-root")||"./";
var NB=window.NB={root:root,site:"見微理畫"},INK="var(--ink)";
function h(html){var d=document.createElement("div");d.innerHTML=html.trim();if(d.childNodes.length>1){d.style.display="contents";return d}return d.firstChild}
function s(tag,a,p){var e=document.createElementNS(NS,tag);for(var k in a){if(k==="fill"||k==="stroke")e.style.setProperty(k,a[k]);else e.setAttribute(k,a[k])}if(p)p.appendChild(e);return e}
function t(p,x,y,str,o){o=o||{};var e=s("text",{x:x,y:y,"text-anchor":o.a||"middle","font-size":o.z||16},p);if(o.c)e.style.fill=o.c;if(o.b)e.style.fontWeight=700;e.textContent=str;return e}
function svg(p,w,hh){return s("svg",{viewBox:"0 0 "+w+" "+hh,class:"sk",role:"img"},p)}
NB.h=h;NB.s=s;NB.t=t;NB.svg=svg;
function mk(tag,a,p,w){var o={stroke:INK,"stroke-width":w||2,"stroke-linecap":"round","stroke-linejoin":"round"};for(var k in a)o[k]=a[k];return s(tag,o,p)}
NB.mk=mk;
NB.person=function(p,x,y,col,k){k=k||1;mk("circle",{cx:x,cy:y-30*k,r:7*k,fill:"var(--paper)"},p);mk("path",{d:"M"+x+" "+(y-23*k)+"V"+y+"M"+(x-9*k)+" "+(y-15*k)+"L"+x+" "+(y-19*k)+"L"+(x+9*k)+" "+(y-15*k)+"M"+x+" "+y+"L"+(x-7*k)+" "+(y+16*k)+"M"+x+" "+y+"L"+(x+7*k)+" "+(y+16*k),fill:"none",stroke:col||"var(--p1)"},p,3)};

/* ---- 主題：永晝 / 永夜 / 跟隨系統（和數光島筆記本共用設定） ---- */
function mode(){try{return localStorage.getItem(KEY)||"system"}catch(e){return"system"}}
function apply(m){var r=document.documentElement;if(m==="light"||m==="dark")r.setAttribute("data-theme",m);else r.removeAttribute("data-theme");var bs=document.querySelectorAll(".themes button");for(var i=0;i<bs.length;i++)bs[i].classList.toggle("on",bs[i].dataset.m===m)}
NB.themeBar=function(){
 var I={light:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',dark:'<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',system:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'};
 var L={light:"永晝",dark:"永夜",system:"系統"},d=h('<div class="themes" role="group" aria-label="主題"></div>');
 ["light","dark","system"].forEach(function(m){var b=h('<button data-m="'+m+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+I[m]+'</svg>'+L[m]+'</button>');
  b.onclick=function(){try{localStorage.setItem(KEY,m)}catch(e){}apply(m)};d.appendChild(b)});
 setTimeout(function(){apply(mode())},0);return d};
apply(mode());

/* ---- 滑桿、按鈕列、拖曳 ---- */
NB.slider=function(box,label,min,max,step,val,unit,fn){
 var w=h('<div class="ctl"><label>'+label+'</label><input type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" aria-label="'+label+'"><output></output></div>'),i=w.querySelector("input"),o=w.querySelector("output");
 function up(){o.textContent=(+i.value).toLocaleString("zh-TW",{maximumFractionDigits:3})+unit}i.oninput=function(){up();fn()};up();box.appendChild(w);
 return{el:i,get v(){return+i.value},set v(x){i.value=x;up()}}};
/* 一排互斥按鈕：NB.pick(box,"標籤",["甲","乙"],0,fn) → {v:目前索引} */
NB.pick=function(box,label,opts,val,fn){var w=h('<div class="ctl">'+(label?'<label>'+label+'</label>':"")+'<span class="seg" role="group"></span></div>'),g=w.querySelector(".seg"),cur=val||0,bs=[];
 opts.forEach(function(o,i){var b=h('<button type="button" class="pen">'+o+'</button>');b.onclick=function(){cur=i;mark();fn&&fn(i)};g.appendChild(b);bs.push(b)});
 function mark(){bs.forEach(function(b,i){b.classList.toggle("on",i===cur);b.setAttribute("aria-pressed",i===cur)})}mark();box.appendChild(w);
 return{get v(){return cur},set v(i){cur=i;mark()}}};
NB.btn=function(box,label,fn,cls){var b=h('<button type="button" class="pen '+(cls||"")+'">'+label+'</button>');b.onclick=fn;var row=box.lastElementChild&&box.lastElementChild.classList.contains("btns")?box.lastElementChild:box.appendChild(h('<div class="ctl btns"></div>'));row.appendChild(b);return b};
/* SVG 座標：把滑鼠／手指位置換成 viewBox 座標 */
NB.pt=function(v,e){var p=v.createSVGPoint(),c=e.touches?e.touches[0]:e;p.x=c.clientX;p.y=c.clientY;var m=v.getScreenCTM();return m?p.matrixTransform(m.inverse()):{x:0,y:0}};
/* 讓 SVG 裡的元素可以拖：fn(x,y) 回傳要不要接受 */
NB.drag=function(v,el,fn,end){el.style.cursor="grab";el.style.touchAction="none";el.setAttribute("data-drag","1");var on=false;
 el.addEventListener("pointerdown",function(e){on=true;el.setPointerCapture&&el.setPointerCapture(e.pointerId);el.style.cursor="grabbing";e.preventDefault()});
 el.addEventListener("pointermove",function(e){if(!on)return;var p=NB.pt(v,e);fn(p.x,p.y)});
 function stop(){if(!on)return;on=false;el.style.cursor="grab";end&&end()}el.addEventListener("pointerup",stop);el.addEventListener("pointercancel",stop)};
NB.clamp=function(x,a,b){return Math.max(a,Math.min(b,x))};
NB.r=function(x,d){var k=Math.pow(10,d===undefined?2:d);return Math.round(x*k)/k};

/* ---- 原創點綴（全部向量 SVG，不用 emoji） ---- */
var M=mk,D=NB.deco={};
D.icon=function(n){var P={"情境":'<path d="M2 12c2-6 10-6 12 0"/><circle cx="8" cy="6" r="2.4"/>',"動手做":'<path d="M6 2v4L2.5 13a1 1 0 0 0 .9 1.5h9.2a1 1 0 0 0 .9-1.5L10 6V2"/><path d="M5 2h6M4.5 10h7"/>',"原理":'<path d="M2 13h4V9h4V5h4"/><path d="M2 13V2"/>',"重點":'<path d="M8 1.5l1.9 4 4.3.5-3.2 3 .9 4.3L8 11.1l-3.9 2.2.9-4.3-3.2-3 4.3-.5z"/>',"挑戰":'<path d="M4 14V2"/><path d="M4 3h9l-2 3 2 3H4"/>'}[n];return P?'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P+'</svg>':""};
/* 標誌：燒瓶小島民 */
D.logo=function(){return'<svg viewBox="-20 -30 40 42" aria-hidden="true"><path d="M-4-26h8M-3-26v9C-12-13-15-6-13 0C-10 7 10 7 13 0C15-6 12-13 3-17v-9" fill="#bfe6dc" stroke="#142530" stroke-width="1.7" stroke-linejoin="round"/><path d="M-12.6-3C-6-6 6 0 12.6-3C12 5-12 5-12.6-3Z" fill="#2f8f7a" stroke="none"/><path d="M-6 6v5M6 6v5" stroke="#142530" stroke-width="1.7" stroke-linecap="round"/><circle cx="-4.5" cy="-8" r="3.6" fill="#fff" stroke="#142530" stroke-width="1.2"/><circle cx="4.5" cy="-8.6" r="3.6" fill="#fff" stroke="#142530" stroke-width="1.2"/><circle cx="-3.8" cy="-7.4" r="1.6" fill="#142530"/><circle cx="5.2" cy="-8" r="1.6" fill="#142530"/><circle cx="7" cy="-22" r="1.6" fill="none" stroke="#2a6f97" stroke-width="1.1"/><circle cx="10" cy="-27" r="1.1" fill="none" stroke="#2a6f97" stroke-width="1"/></svg>'};
D.rule=function(){var v=NB.s("svg",{viewBox:"0 0 520 18",class:"orn","aria-hidden":"true"});M("path",{d:"M0 9H214M306 9H520",fill:"none",stroke:"var(--soft)"},v,1);M("path",{d:"M226 9q8-9 16 0t16 0t16 0",fill:"none",stroke:"var(--p2)"},v,1.6);M("circle",{cx:288,cy:9,r:3.5,fill:"var(--p3)"},v,1);M("path",{d:"M296 9h4",fill:"none"},v,1.3);return v};
/* 首頁插圖：燒杯、三稜鏡分光、磁鐵、波形、原子模型 */
D.hero=function(){var v=NB.s("svg",{viewBox:"0 0 380 280",class:"hero-art",role:"img","aria-label":"燒杯、三稜鏡、磁鐵與原子模型"}),i;
 M("path",{d:"M14 140H366",fill:"none",stroke:"var(--soft)","stroke-dasharray":"2 5"},v,1);
 /* 三稜鏡與光 */
 M("path",{d:"M40 96L150 118",fill:"none",stroke:"var(--ink)"},v,2.4);
 M("polygon",{points:"176,58 214,134 138,134",fill:"var(--p2)","fill-opacity":.16},v,1.8);
 ["#d8453b","#e98a2e","#e6c232","#3fa35b","#2f7fc4","#6a4fb5"].forEach(function(c,i){M("path",{d:"M"+(170)+" "+(116+i*.6)+"L"+(330)+" "+(66+i*13),fill:"none",stroke:c,"stroke-opacity":.9},v,2.2)});
 M("path",{d:"M150 118L170 116",fill:"none",stroke:"var(--ink)"},v,2);
 /* 燒杯 */
 M("path",{d:"M40 168h70M44 168v86q0 8 8 8h46q8 0 8-8v-86",fill:"var(--paper2)"},v,2);
 M("path",{d:"M45 212h60v42q0 7-7 7H52q-7 0-7-7z",fill:"var(--p3)","fill-opacity":.45,stroke:"none"},v);
 for(i=0;i<4;i++)M("path",{d:"M46 "+(186+i*18)+"h10",fill:"none"},v,1.2);
 [[62,236,4],[80,224,3],[92,244,5],[70,198,2.5]].forEach(function(b){M("circle",{cx:b[0],cy:b[1],r:b[2],fill:"none",stroke:"var(--paper)"},v,1.4)});
 /* 磁鐵與磁力線 */
 M("path",{d:"M150 250V200a30 30 0 0 1 60 0v50h-18v-50a12 12 0 0 0-24 0v50z",fill:"var(--paper)"},v,2);
 M("path",{d:"M150 250v-16h18v16zM192 250v-16h18v16z",fill:"var(--p1)"},v,1.6);
 NB.t(v,159,247,"N",{z:11,c:"#fff",b:1});NB.t(v,201,247,"S",{z:11,c:"#fff",b:1});
 [24,40].forEach(function(r){M("path",{d:"M159 256q21 "+r+" 42 0",fill:"none",stroke:"var(--p1)","stroke-dasharray":"3 4"},v,1.2)});
 /* 波形 */
 var d="M236 190";for(i=0;i<=48;i++)d+="L"+(236+i*2.6)+" "+(190-18*Math.sin(i/48*Math.PI*4)).toFixed(1);M("path",{d:d,fill:"none",stroke:"var(--p2)"},v,2.2);
 /* 原子 */
 [0,60,120].forEach(function(a){M("ellipse",{cx:300,cy:242,rx:46,ry:14,fill:"none",stroke:"var(--soft)",transform:"rotate("+a+" 300 242)"},v,1.3)});
 M("circle",{cx:300,cy:242,r:7,fill:"var(--p4)"},v,1.6);[[346,242],[277,222],[277,262]].forEach(function(p){M("circle",{cx:p[0],cy:p[1],r:3.5,fill:"var(--p2)"},v,1.2)});
 return v};
D.bg=function(){if(document.querySelector(".bgdeco"))return;var v=NB.s("svg",{viewBox:"0 0 1000 1000",preserveAspectRatio:"xMidYMid slice",class:"bgdeco","aria-hidden":"true"}),i;document.body.insertBefore(v,document.body.firstChild);
 for(i=0;i<6;i++){var a=i*Math.PI/3;M("path",{d:"M"+(880+120*Math.cos(a)).toFixed(1)+" "+(120+120*Math.sin(a)).toFixed(1)+"L"+(880+120*Math.cos(a+Math.PI/3)).toFixed(1)+" "+(120+120*Math.sin(a+Math.PI/3)).toFixed(1),fill:"none",stroke:"currentColor"},v,1.2)}
 M("path",{d:"M880 0V40M984 60L1000 50M776 60L760 50",fill:"none",stroke:"currentColor"},v,1);
 var d="M0 880";for(i=0;i<=60;i++)d+="L"+(i*6)+" "+(880-26*Math.sin(i/60*Math.PI*5)).toFixed(1);M("path",{d:d,fill:"none",stroke:"currentColor"},v,1.2);
 [60,110,160].forEach(function(r){M("circle",{cx:0,cy:1000,r:r,fill:"none",stroke:"currentColor","stroke-dasharray":"4 7"},v,1)})};
D.bg();

/* ---- 數學式（KaTeX）：寫法同數光島（$...$ 或自動轉換含 × ÷ ＝ 的算式） ---- */
var RUN=/[0-9A-Za-zπΔ.,()+\-−×÷＝=<>≤≥≈²³⁰¹⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉°\/／ ]+/g,OPS=/[×÷＝=+−<>≤≥≈²³π]|\d\s*\/\s*\d/;
function kx(t,d){if(!window.katex)return t;try{return katex.renderToString(t,{displayMode:!!d,throwOnError:false,strict:false})}catch(e){return t}}
var SUP="⁰¹²³⁴⁵⁶⁷⁸⁹",SUB="₀₁₂₃₄₅₆₇₈₉";
function toTex(r){var chem=/[₀-₉]/.test(r);return r.replace(/(\d\s*)?([A-Za-z]+)/g,function(m,d,w){return d||w.length>1||chem?(d?d.trim()+"\\,":"")+"\\text{"+w+"}":w}).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,function(x){return"^{"+x.split("").map(function(c){return SUP.indexOf(c)}).join("")+"}"}).replace(/[₀-₉]+/g,function(x){return"_{"+x.split("").map(function(c){return SUB.indexOf(c)}).join("")+"}"}).replace(/×/g,"\\times ").replace(/÷/g,"\\div ").replace(/＝/g,"=").replace(/−/g,"-").replace(/≤/g,"\\le ").replace(/≥/g,"\\ge ").replace(/≈/g,"\\approx ").replace(/π/g,"\\pi ").replace(/Δ/g,"\\Delta ").replace(/°/g,"^\\circ ").replace(/（/g,"(").replace(/）/g,")").replace(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g,"\\frac{$1}{$2}")}
NB.tx=function(html){return String(html).split(/(<[^>]*>|&[#\w]+;)/).map(function(p,i){return i%2?p:p.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/).map(function(q,j){
 if(j%2)return q.slice(0,2)==="$$"?kx(q.slice(2,-2),1):kx(q.slice(1,-1));
 return q.replace(RUN,function(m){var t=m.trim();return OPS.test(t)&&/[0-9A-Za-z]/.test(t)?m.replace(t,function(){return kx(toTex(t))}):m})}).join("")}).join("")};

/* ---- 單元頁樣板 ----
   NB.unit({ q:情境例題, tool:function(box,eq){...動手做...}, steps:[原理], key:[重點（可省略）],
             ch: 挑戰（一題或陣列）：數字題 {q,a,u:"單位",tol:容許誤差,h:提示}／選擇題 {q,o:["選項",...],a:正確索引,h} }) */
function sheet(tag,sub,body){var d=h('<section class="sheet"><h2><span class="tag">'+D.icon(tag)+tag+'</span>'+(sub||"")+'</h2></section>');if(body)d.appendChild(body);return d}
var OL="ABCDEFGH";
function challenge(list,onAll){var box=h('<div class="chs"></div>'),done=list.map(function(){return false});
 list.forEach(function(c,k){var w=h('<div class="chq"><div class="q">'+(list.length>1?'<span class="chn">'+(k+1)+'</span>':"")+NB.tx(c.q)+'</div><div class="fb" aria-live="polite"></div></div>'),fb=w.querySelector(".fb");
  function res(ok){fb.className="fb "+(ok?"ok":"no");fb.innerHTML=ok?(c.ok?NB.tx(c.ok):"答對了！觀念很清楚。"):"再想想看，可以按「提示」喔。";if(ok){done[k]=true;if(done.every(Boolean))onAll()}}
  if(c.o){var g=h('<div class="opts"></div>');c.o.forEach(function(o,i){var b=h('<button type="button" class="pen opt">('+OL[i]+') '+NB.tx(o)+'</button>');b.onclick=function(){g.querySelectorAll(".pen").forEach(function(x){x.classList.remove("sel","right","wrong")});b.classList.add(i===c.a?"right":"wrong");res(i===c.a)};g.appendChild(b)});w.insertBefore(g,fb)}
  else{var r=h('<div class="ctl"><input class="num" type="number" inputmode="decimal" step="any" placeholder="答案" aria-label="答案">'+(c.u?'<span class="unit">'+NB.tx(c.u)+'</span>':"")+'<button class="pen go">檢查</button></div>'),inp=r.querySelector("input");
   r.querySelector("button").onclick=function(){if(inp.value==="")return;var tol=c.tol===undefined?Math.max(1e-6,Math.abs(c.a)*1e-3):c.tol;res(Math.abs(+inp.value-c.a)<=tol)};inp.onkeydown=function(e){if(e.key==="Enter")r.querySelector("button").click()};w.insertBefore(r,fb)}
  if(c.h){var hb=h('<button type="button" class="pen hint">提示</button>');hb.onclick=function(){fb.className="fb";fb.innerHTML=NB.tx("提示："+c.h)};(w.querySelector(".ctl")||w.querySelector(".opts")).appendChild(hb)}
  box.appendChild(w)});return box}
function mount(c){
 var app=document.getElementById("app"),I=NB.info(NB.cur)||{};c.title=c.title||I.title||"單元";c.ref=c.ref||I.ref||"";document.title=c.title+"｜見微理畫";
 var bar=h('<nav class="bar"><a class="back" href="'+root+'island.html">← 回到群島</a></nav>');bar.appendChild(NB.themeBar());app.appendChild(bar);
 app.appendChild(h('<h1 class="title"><mark>'+c.title+'</mark></h1>'));app.appendChild(h('<p class="meta">'+c.ref+'</p>'));app.appendChild(D.rule());
 app.appendChild(sheet("情境","",h('<div class="q">'+NB.tx(c.q)+'</div>')));
 var box=h('<div class="lab"></div>'),eq=h('<div class="eq"></div>');var d0=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");Object.defineProperty(eq,"innerHTML",{configurable:true,get:function(){return d0.get.call(eq)},set:function(x){d0.set.call(eq,NB.tx(x))}});
 c.tool(box,eq);box.appendChild(eq);app.appendChild(sheet("動手做",c.sub||"調整條件，觀察變化",box));
 var pr=h('<div><ol class="steps">'+c.steps.map(function(x){return"<li>"+NB.tx(x)+"</li>"}).join("")+"</ol></div>");
 if(c.key&&c.key.length)pr.appendChild(h('<div class="keyb"><b>'+D.icon("重點")+'重點</b><ul>'+c.key.map(function(x){return"<li>"+NB.tx(x)+"</li>"}).join("")+'</ul></div>'));
 app.appendChild(sheet("原理","一步一步想",pr));
 app.appendChild(sheet("挑戰","換你試試",challenge([].concat(c.ch),function(){NB.trail.done(NB.cur)})));
 NB.trail.visit(NB.cur);if(NB.map&&NB.map.card)NB.map.card(app,NB.cur);
 if(NB.tour){function sh(t){return function(){return[].filter.call(app.querySelectorAll(".sheet"),function(e){var g=e.querySelector("h2 .tag");return g&&g.textContent===t})[0]||null}}
  NB.tour.setup("unit",[{title:"這一頁怎麼玩",text:"每個小節都是四步：情境、動手做、原理、挑戰。想再看一次，按左下角的 i。"},
  {sel:sh("情境"),title:"情境",text:"先讀生活裡的一個問題，想想看你會怎麼回答。"},
  {sel:sh("動手做"),title:"動手做",text:"這是一個小小的模擬實驗：拖拉滑桿、按按鈕，或直接拖圖上的東西，看結果怎麼變。"},
  {sel:sh("原理"),title:"原理",text:"把剛剛看到的現象整理成觀念與公式，最下面的「重點」是考前要記的。"},
  {sel:sh("挑戰"),title:"挑戰",text:"選擇題直接點選項；計算題輸入答案按「檢查」。卡住了可以按「提示」。"}])}
 var nv=h('<nav class="bar"></nav>');if(I.prev)nv.appendChild(h('<a class="back" href="'+NB.link(I.prev)+'">← '+I.prev.title+'</a>'));else nv.appendChild(h("<span></span>"));if(I.next)nv.appendChild(h('<a class="back" href="'+NB.link(I.next)+'">'+I.next.title+' →</a>'));app.appendChild(nv);
}
NB.mount=mount;

/* ---- 目錄解析、單元載入（放一個 units/<id>.js 就會自動出現） ---- */
var CN="零一二三四五六七八九十".split(""),FLAT=[],BYID={};
NB.cat=(window.CATALOG||[]).map(function(S){var n=S.start===undefined?1:S.start;return{sem:S.sem,label:S.label,id:S.id,grade:S.grade,chs:S.ch.map(function(row){var a=row.split("|"),x=/^跨科[:：]/.test(a[0]),key=x?"x":String(n),c={no:x?null:n,key:key,cross:x,name:a[0].replace(/^跨科[:：]/,""),secs:[]};if(!x)n++;
  a.slice(1).forEach(function(tl,j){var num=x?(a.length>2?"跨科"+(j+1):"跨科"):key+"-"+(j+1),o={id:S.id+"-"+key+"."+(j+1),num:num,title:tl,sem:S.sem,label:S.label,ch:c};c.secs.push(o);FLAT.push(o);BYID[o.id]=o});return c})}});
NB.flat=FLAT;
NB.chName=function(c){return c.cross?"跨科主題":"第"+CN[c.no]+"章"};
NB.link=function(o){return root+"unit.html?u="+o.id};
NB.sortIds=function(a){var ix={};FLAT.forEach(function(o,i){ix[o.id]=i});return a.slice().sort(function(x,y){var i=x in ix?ix[x]:1e6,j=y in ix?ix[y]:1e6;return i-j||(x<y?-1:x>y?1:0)})};
NB.info=function(id){var o=BYID[id];if(!o)return null;var i=FLAT.indexOf(o),tt=function(q){return q.num+" "+q.title};return{title:tt(o),ref:o.sem+"（"+o.label+"）・"+NB.chName(o.ch)+" "+o.ch.name+"・"+tt(o),prev:FLAT[i-1]&&{id:FLAT[i-1].id,title:tt(FLAT[i-1])},next:FLAT[i+1]&&{id:FLAT[i+1].id,title:tt(FLAT[i+1])}}};
/* 學習軌跡：只存在這個瀏覽器（localStorage），不需登入。u[id]={v:最近開啟,d:答對挑戰時間} */
var TK="li-trail";function trR(){try{var o=JSON.parse(localStorage.getItem(TK));return o&&typeof o==="object"?o:{}}catch(e){return{}}}
function trW(o){try{localStorage.setItem(TK,JSON.stringify(o))}catch(e){}}
function trM(id,k){if(!id||!BYID[id])return;var o=trR(),u=o.u||(o.u={}),x=u[id]||(u[id]={});x[k]=Date.now();if(k==="v")o.last=id;trW(o)}
NB.trail={all:function(){return trR().u||{}},get:function(id){return(trR().u||{})[id]||null},last:function(){var l=trR().last;return l&&BYID[l]?l:""},visit:function(id){trM(id,"v")},done:function(id){trM(id,"d")},clear:function(){try{localStorage.removeItem(TK)}catch(e){}}};
NB.page=document.body.getAttribute("data-page")||"unit";NB.cur=null;NB.built={};
NB.unit=function(c){var sc=document.currentScript,id=sc&&sc.dataset.id;if(NB.page==="home"){NB.built[id]=true;if(NB.onProbe)NB.onProbe(id);return}mount(c)};
NB.load=function(id,ok,no){var e=document.createElement("script");e.src=root+"units/"+id+".js";e.dataset.id=id;e.onload=function(){e.remove();ok&&ok()};e.onerror=function(){e.remove();no&&no()};document.head.appendChild(e)};
NB.boot=function(){var id=new URLSearchParams(location.search).get("u");NB.cur=id;var app=document.getElementById("app");
 NB.load(id,null,function(){var I=NB.info(id),bar=h('<nav class="bar"><a class="back" href="'+root+'island.html">← 回到群島</a></nav>');bar.appendChild(NB.themeBar());app.appendChild(bar);
  app.appendChild(h('<h1 class="title"><mark>'+(I?I.title:"找不到單元")+'</mark></h1>'));if(I)app.appendChild(h('<p class="meta">'+I.ref+'</p>'));
  app.appendChild(sheet("情境","",h('<p>這一節還在實驗室裡準備中，先回群島看看其他小節吧。</p>')))})};
/* 學員專區：登入、測驗都在數光島筆記本（同一個網域，登入狀態共用） */
NB.memberURL="https://suuuuuhaooooo.github.io/math-Illustration/site/member.html";
NB.memberChip=function(){return h('<a class="chip" href="'+NB.memberURL+'" title="學員專區在數光島筆記本登入">學員專區・登入</a>')};
})();
