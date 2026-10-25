/* 實驗器材工具箱：單元檔共用的 SVG 器材、箭頭、光線、座標圖、表格、動畫迴圈、聲音。
   全部畫在 NB.lab.stage() 回傳的 SVG 上；顏色用 CSS 變數，永晝／永夜都好看。 */
(function(){
var NB=window.NB,M=NB.mk,T=NB.t,S=NB.s,L=NB.lab={};
/* 舞台：方格紙底的 SVG */
L.stage=function(box,w,h,label){var d=NB.h('<div class="stage"></div>');box.appendChild(d);var v=NB.svg(d,w,h);if(label)v.setAttribute("aria-label",label);return v};
L.clear=function(v){while(v.firstChild)v.removeChild(v.firstChild)};
L.g=function(p,a){return S("g",a||{},p)};
/* 箭頭（實線），回傳 path */
L.arrow=function(p,x1,y1,x2,y2,col,w,head){col=col||"var(--ink)";w=w||2;head=head||9;var a=Math.atan2(y2-y1,x2-x1),hx=x2-head*Math.cos(a),hy=y2-head*Math.sin(a);
 var g=S("g",{},p);M("path",{d:"M"+x1+" "+y1+"L"+hx+" "+hy,fill:"none",stroke:col},g,w);
 M("path",{d:"M"+x2+" "+y2+"L"+(hx+head*.5*Math.sin(a))+" "+(hy-head*.5*Math.cos(a))+"L"+(hx-head*.5*Math.sin(a))+" "+(hy+head*.5*Math.cos(a))+"Z",fill:col,stroke:col},g,1);return g};
/* 光線：從 (x1,y1) 到 (x2,y2)，中間畫一個方向箭頭 */
L.ray=function(p,x1,y1,x2,y2,col,w,dash){col=col||"var(--p1)";var g=S("g",{},p);M("path",{d:"M"+x1+" "+y1+"L"+x2+" "+y2,fill:"none",stroke:col,"stroke-dasharray":dash||"none"},g,w||2.2);
 var mx=(x1+x2)/2,my=(y1+y2)/2,a=Math.atan2(y2-y1,x2-x1),k=7;M("path",{d:"M"+(mx+k*Math.cos(a))+" "+(my+k*Math.sin(a))+"L"+(mx-k*Math.cos(a)+k*.6*Math.sin(a))+" "+(my-k*Math.sin(a)-k*.6*Math.cos(a))+"L"+(mx-k*Math.cos(a)-k*.6*Math.sin(a))+" "+(my-k*Math.sin(a)+k*.6*Math.cos(a))+"Z",fill:col,stroke:col},g,1);return g};
L.dash=function(p,x1,y1,x2,y2,col){return M("path",{d:"M"+x1+" "+y1+"L"+x2+" "+y2,fill:"none",stroke:col||"var(--soft)","stroke-dasharray":"5 5"},p,1.4)};
/* 角度弧：圓心 (cx,cy)、半徑 r、從角 a1 到 a2（弧度，數學座標：右為 0，往上為正） */
L.arc=function(p,cx,cy,r,a1,a2,col,txt){var x1=cx+r*Math.cos(a1),y1=cy-r*Math.sin(a1),x2=cx+r*Math.cos(a2),y2=cy-r*Math.sin(a2),big=Math.abs(a2-a1)>Math.PI?1:0,sw=a2>a1?0:1;
 M("path",{d:"M"+x1+" "+y1+"A"+r+" "+r+" 0 "+big+" "+sw+" "+x2+" "+y2,fill:"none",stroke:col||"var(--p4)"},p,1.8);
 if(txt){var am=(a1+a2)/2;T(p,cx+(r+13)*Math.cos(am),cy-(r+13)*Math.sin(am)+5,txt,{z:13,c:col||"var(--ink)"})}};
/* 燒杯：左下角 (x,y-h)…，(x,y) 是杯底左邊；level 0～1；回傳 {water} */
L.beaker=function(p,x,y,w,h,level,col,o){o=o||{};var g=S("g",{},p),lv=Math.max(0,Math.min(1,level||0));
 if(lv>0)M("path",{d:"M"+(x+2)+" "+(y-h*lv)+"H"+(x+w-2)+"V"+(y-4)+"q0 4-4 4H"+(x+6)+"q-4 0-4-4Z",fill:col||"var(--p2)","fill-opacity":o.op||.35,stroke:"none"},g);
 M("path",{d:"M"+(x-5)+" "+(y-h)+"h5V"+(y-5)+"q0 5 5 5H"+(x+w-5)+"q5 0 5-5V"+(y-h),fill:"none"},g,2);
 if(!o.noTicks)for(var i=1;i<5;i++)M("path",{d:"M"+(x+3)+" "+(y-h*i/5)+"h"+(i%2?7:11),fill:"none",stroke:"var(--soft)"},g,1.1);
 return g};
/* 量筒：可讀刻度，max 毫升、每格 step；value 目前液面（毫升）；回傳 {y(mL)} */
L.cylinder=function(p,x,y,h,max,step,value,col,o){o=o||{};var w=o.w||46,g=S("g",{},p),yy=function(ml){return y-12-(h-22)*ml/max};
 M("path",{d:"M"+(x-10)+" "+y+"h"+(w+20),fill:"none"},g,2.4);
 if(value>0){var ly=yy(value);M("path",{d:"M"+(x+2)+" "+ly+"q"+(w/2-2)+" 6 "+(w-4)+" 0V"+(y-6)+"H"+(x+2)+"Z",fill:col||"var(--p2)","fill-opacity":.35,stroke:"none"},g)}
 M("path",{d:"M"+x+" "+(y-h)+"V"+(y-4)+"M"+(x+w)+" "+(y-h)+"V"+(y-4)+"M"+(x-4)+" "+(y-h)+"h"+(w+8),fill:"none"},g,2);
 for(var m=0;m<=max+1e-9;m+=step){var big=Math.abs(m/(step*5)-Math.round(m/(step*5)))<1e-6,yk=yy(m);M("path",{d:"M"+x+" "+yk+"h"+(big?14:7),fill:"none",stroke:"var(--soft)"},g,1);if(big&&m>0)T(g,x+w+14,yk+4,NB.r(m,2),{z:11,c:"var(--soft)",a:"start"})}
 if(o.unit)T(g,x+w/2,y-h-8,o.unit,{z:12,c:"var(--soft)"});return{g:g,y:yy}};
/* 溫度計：底部 (x,y)，高 h，範圍 lo～hi，目前 t */
L.thermo=function(p,x,y,h,lo,hi,t,o){o=o||{};var g=S("g",{},p),yy=function(v){return y-18-(h-30)*(v-lo)/(hi-lo)};
 M("rect",{x:x-7,y:y-h,width:14,height:h-12,rx:7,fill:"var(--paper)"},g,2);M("circle",{cx:x,cy:y,r:12,fill:o.col||"var(--p1)"},g,2);
 M("rect",{x:x-3,y:yy(Math.max(lo,Math.min(hi,t))),width:6,height:y-yy(Math.max(lo,Math.min(hi,t))),fill:o.col||"var(--p1)",stroke:"none"},g);
 var st=o.step||(hi-lo)/10;for(var v=lo;v<=hi+1e-9;v+=st){M("path",{d:"M"+(x+8)+" "+yy(v)+"h7",fill:"none",stroke:"var(--soft)"},g,1);T(g,x+19,yy(v)+4,NB.r(v,1),{z:10,c:"var(--soft)",a:"start"})}return{g:g,y:yy}};
/* 酒精燈與火焰 */
L.lamp=function(p,x,y,on,k){k=k||1;var g=S("g",{},p);
 M("path",{d:"M"+(x-22*k)+" "+y+"q0-30 22-34q22 4 22 34z",fill:"var(--paper2)"},g,2);M("rect",{x:x-5*k,y:y-44*k,width:10*k,height:10*k,fill:"var(--p4b)"},g,1.6);
 if(on){M("path",{d:"M"+x+" "+(y-80*k)+"q-12 22-7 30q7 6 14 0q5-8-7-30z",fill:"var(--p4)","fill-opacity":.85},g,1.6);M("path",{d:"M"+x+" "+(y-66*k)+"q-5 10-3 14q3 3 6 0q2-4-3-14z",fill:"var(--p1)","fill-opacity":.8,stroke:"none"},g)}return g};
/* 座標圖：回傳 {X(x),Y(y),g}；o={x0,x1,y0,y1,xl,yl,xt,yt}（xt、yt 是格線間距） */
L.plot=function(p,x,y,w,h,o){var g=S("g",{},p),X=function(v){return x+(v-o.x0)/(o.x1-o.x0)*w},Y=function(v){return y+h-(v-o.y0)/(o.y1-o.y0)*h},v;
 if(o.xt)for(v=o.x0;v<=o.x1+1e-9;v+=o.xt){M("path",{d:"M"+X(v)+" "+y+"V"+(y+h),fill:"none",stroke:"var(--line)"},g,.8);T(g,X(v),y+h+15,NB.r(v,2),{z:10,c:"var(--soft)"})}
 if(o.yt)for(v=o.y0;v<=o.y1+1e-9;v+=o.yt){M("path",{d:"M"+x+" "+Y(v)+"H"+(x+w),fill:"none",stroke:"var(--line)"},g,.8);T(g,x-5,Y(v)+4,NB.r(v,2),{z:10,c:"var(--soft)",a:"end"})}
 L.arrow(g,x,y+h,x+w+12,y+h,"var(--ink)",1.6,7);L.arrow(g,x,y+h,x,y-12,"var(--ink)",1.6,7);
 if(o.xl)T(g,x+w+10,y+h+30,o.xl,{z:12,a:"end"});if(o.yl)T(g,x+4,y-18,o.yl,{z:12,a:"start"});
 return{g:g,X:X,Y:Y,line:function(pts,col,wd,dash){return M("path",{d:pts.map(function(q,i){return(i?"L":"M")+X(q[0]).toFixed(1)+" "+Y(q[1]).toFixed(1)}).join(""),fill:"none",stroke:col||"var(--p2)","stroke-dasharray":dash||"none"},g,wd||2.2)},dot:function(a,b,col,r){return M("circle",{cx:X(a),cy:Y(b),r:r||5,fill:col||"var(--p1)"},g,1.4)}}};
/* 紀錄表 */
L.table=function(box,heads){var w=NB.h('<div class="ltbl"><table class="tb"><thead><tr>'+heads.map(function(x){return"<th>"+x+"</th>"}).join("")+'</tr></thead><tbody></tbody></table></div>'),tb=w.querySelector("tbody");box.appendChild(w);
 return{add:function(cells){var tr=document.createElement("tr");tr.innerHTML=cells.map(function(c){return"<td>"+NB.tx(String(c))+"</td>"}).join("");tb.appendChild(tr);while(tb.children.length>8)tb.removeChild(tb.firstChild);return tr},clear:function(){tb.innerHTML=""},get rows(){return tb.children.length},el:w}};
/* 分頁：同一個動手做裡的兩三個小實驗 */
L.tabs=function(box,names,fn){var panes=names.map(function(){return NB.h('<div class="lpane"></div>')}),p=NB.pick(box,"",names,0,function(i){panes.forEach(function(x,j){x.hidden=j!==i});fn&&fn(i)});panes.forEach(function(x,j){x.hidden=j!==0;box.appendChild(x)});return{panes:panes,get v(){return p.v}}};
/* 動畫迴圈：元素離開畫面（換頁）就停；分頁看不到時暫停；減少動態效果時只畫一次 */
var RED=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;L.reduce=RED;
L.loop=function(el,fn){var last=performance.now(),id=0;function f(now){if(!el.isConnected)return;var dt=Math.max(0,Math.min(60,now-last));last=now;if(!document.hidden)fn(dt,now);id=requestAnimationFrame(f)}id=requestAnimationFrame(f);return{stop:function(){cancelAnimationFrame(id)}}};
/* 聲音：短短一聲（頻率 Hz、音量 0～1、波形） */
var AC=null;L.tone=function(f,amp,type,dur){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain(),t0=AC.currentTime;dur=dur||.8;
 if(type&&typeof type==="object"){o.setPeriodicWave(AC.createPeriodicWave(new Float32Array(type.real),new Float32Array(type.imag)))}else o.type=type||"sine";
 o.frequency.value=f;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(.25*(amp===undefined?1:amp),t0+.03);g.gain.setValueAtTime(.25*(amp===undefined?1:amp),t0+dur-.15);g.gain.linearRampToValueAtTime(0,t0+dur);o.connect(g);g.connect(AC.destination);o.start(t0);o.stop(t0+dur+.05)}catch(e){}};
/* 粒子盒：n 個粒子在矩形內跑，速度 sp（每毫秒像素）；回傳 {step(dt,sp,mode)} mode: solid／liquid／gas */
L.particles=function(p,x,y,w,h,n,col,r){var g=S("g",{},p),P=[],i;r=r||6;
 for(i=0;i<n;i++){var c=i%Math.ceil(Math.sqrt(n)),q=Math.floor(i/Math.ceil(Math.sqrt(n)));P.push({hx:x+r+8+c*(r*2.4),hy:y+h-r-4-q*(r*2.4),x:0,y:0,vx:Math.random()-.5,vy:Math.random()-.5,e:M("circle",{r:r,fill:col||"var(--p2)"},g,1.3)});P[i].x=P[i].hx;P[i].y=P[i].hy}
 return{g:g,P:P,step:function(dt,sp,mode){P.forEach(function(o,k){
  if(mode==="solid"){o.x=o.hx+(Math.random()-.5)*sp*14;o.y=o.hy+(Math.random()-.5)*sp*14}
  else{var lim=mode==="liquid"?y+h*.45:y;o.vy+=mode==="liquid"?.0006*dt:0;var vv=Math.hypot(o.vx,o.vy)||1;o.vx=o.vx/vv*sp;o.vy=o.vy/vv*sp;
   o.x+=o.vx*dt;o.y+=o.vy*dt;if(o.x<x+r){o.x=x+r;o.vx=Math.abs(o.vx)}if(o.x>x+w-r){o.x=x+w-r;o.vx=-Math.abs(o.vx)}if(o.y<lim+r){o.y=lim+r;o.vy=Math.abs(o.vy)}if(o.y>y+h-r){o.y=y+h-r;o.vy=-Math.abs(o.vy)}
   if(Math.random()<.02){var a=Math.random()*Math.PI*2;o.vx=Math.cos(a);o.vy=Math.sin(a)}}
  o.e.setAttribute("cx",o.x.toFixed(1));o.e.setAttribute("cy",o.y.toFixed(1))})}}};
/* 原子球：元素符號＋顏色（分子模型用） */
L.ATOM={H:["#ffffff",9],O:["#e5534b",13],C:["#4a4f5a",13],N:["#5b7fe0",13],Cl:["#5fbf5a",14],Na:["#a878e0",15],S:["#e8c53a",14],Fe:["#c88a5a",15],Cu:["#d9884a",15],Mg:["#9aa7b4",14],Ca:["#b9c4cf",15],K:["#b48ee0",15],He:["#f5c6e0",10],Ne:["#f0a080",11],Ar:["#86c7d8",12]};
L.atom=function(p,x,y,sym,k){var a=L.ATOM[sym]||["#cccccc",12],r=a[1]*(k||1),g=S("g",{},p);M("circle",{cx:x,cy:y,r:r,fill:a[0]},g,1.6);T(g,x,y+4.5*(k||1),sym,{z:12*(k||1),c:sym==="C"?"#fff":"#142530",b:1});return g};
})();
