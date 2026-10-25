/* 第四冊 1-2 化學反應的微觀世界：平衡化學反應式、原子量與莫耳 */
NB.unit({
 q:"化學反應式「H₂ + O₂ → H₂O」看起來沒錯，可是左邊有 2 個氧原子、右邊只有 1 個。怎麼讓它符合質量守恆？另外，一杯水裡到底有幾個水分子？",
 sub:"調整係數平衡反應式；用莫耳換算質量與粒子數",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["平衡反應式","莫耳換算"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var RX=[{n:"氫氣燃燒",l:[["H₂",{H:2}],["O₂",{O:2}]],r:[["H₂O",{H:2,O:1}]],a:[2,1,2]},{n:"甲烷燃燒",l:[["CH₄",{C:1,H:4}],["O₂",{O:2}]],r:[["CO₂",{C:1,O:2}],["H₂O",{H:2,O:1}]],a:[1,2,1,2]},{n:"雙氧水分解",l:[["H₂O₂",{H:2,O:2}]],r:[["H₂O",{H:2,O:1}],["O₂",{O:2}]],a:[2,2,1]},{n:"鎂燃燒",l:[["Mg",{Mg:1}],["O₂",{O:2}]],r:[["MgO",{Mg:1,O:1}]],a:[2,1,2]},{n:"合成氨",l:[["N₂",{N:2}],["H₂",{H:2}]],r:[["NH₃",{N:1,H:3}]],a:[1,3,2]}];
  var rx=NB.pick(P1,"反應",RX.map(function(x){return x.n}),0,function(){co=RX[rx.v].l.concat(RX[rx.v].r).map(function(){return 1});up1()}),co=[1,1,1],row=NB.h('<div class="ctl coef"></div>');P1.appendChild(row);var v=L.stage(P1,640,200,"原子數"),g=L.g(v);
  function up1(){var R=RX[rx.v],sp=R.l.concat(R.r);row.innerHTML="";sp.forEach(function(s,i){if(i===R.l.length)row.appendChild(NB.h('<span class="arr">→</span>'));else if(i>0)row.appendChild(NB.h('<span class="arr">+</span>'));
     var w=NB.h('<span class="cf"><button type="button" class="pen" aria-label="減少">−</button><b>'+co[i]+'</b><button type="button" class="pen" aria-label="增加">＋</button><span class="fm">'+s[0]+'</span></span>');w.children[0].onclick=function(){co[i]=Math.max(1,co[i]-1);up1()};w.children[2].onclick=function(){co[i]=Math.min(9,co[i]+1);up1()};row.appendChild(w)});
   L.clear(g);var cnt=function(side,off){var c={};side.forEach(function(s,i){for(var k in s[1])c[k]=(c[k]||0)+s[1][k]*co[i+off]});return c},A=cnt(R.l,0),B=cnt(R.r,R.l.length),el=Object.keys(Object.assign({},A,B)),ok=el.every(function(k){return A[k]===B[k]});
   NB.t(g,170,24,"反應物",{z:14,b:1});NB.t(g,470,24,"生成物",{z:14,b:1});
   el.forEach(function(k,j){var y=56+j*44;NB.t(g,320,y+5,k,{z:15,b:1});[[A,170],[B,470]].forEach(function(q){var n=q[0][k]||0;for(var t=0;t<n;t++)L.atom(g,q[1]-((n-1)*13)+t*26,y,k,.9)});NB.t(g,320,y+22,(A[k]||0)+" ： "+(B[k]||0),{z:11,c:A[k]===B[k]?"var(--p3)":"var(--p1)"})});
   var f=function(side,off){return side.map(function(s,i){return(co[i+off]>1?co[i+off]:"")+s[0]}).join(" + ")};
   eq.innerHTML=f(R.l,0)+" → "+f(R.r,R.l.length)+"<br>"+(ok?"<b>平衡了！</b>每一種原子在兩邊的數目都相同。"+(co.join()===R.a.join()?"":"（係數還可以約成最簡整數比）"):"還沒平衡：紅色數字表示兩邊原子數不相等，調整前面的係數（不能改右下角的小數字）。")}
  var S=[["水 H₂O",18],["二氧化碳 CO₂",44],["氧氣 O₂",32],["食鹽 NaCl",58.5],["葡萄糖 C₆H₁₂O₆",180]],sub=NB.pick(P2,"物質",S.map(function(s){return s[0]}),0,up2),m=NB.slider(P2,"質量",1,360,1,36," g",up2),v2=L.stage(P2,640,150,"莫耳"),g2=L.g(v2);
  function up2(){L.clear(g2);var M=S[sub.v][1],n=m.v/M,N=n*6;
   [["質量",m.v+" g"],["÷ 分子量 "+M,""],["莫耳數",NB.r(n,3)+" mol"],["× 6×10²³",""],["粒子數",NB.r(N,2)+" × 10²³ 個"]].forEach(function(c,i){var x=70+i*125;if(c[1]){NB.mk("rect",{x:x-55,y:45,width:110,height:60,rx:10,fill:"var(--paper)"},g2,1.8);NB.t(g2,x,68,c[0],{z:12,c:"var(--soft)"});NB.t(g2,x,92,c[1],{z:13,b:1})}else{L.arrow(g2,x-50,75,x+50,75,"var(--p2)",1.6,8);NB.t(g2,x,62,c[0],{z:11,c:"var(--p2)"})}});
   eq.innerHTML=m.v+" g 的"+S[sub.v][0].split(" ")[0]+"：莫耳數 = 質量 ÷ 分子量 = "+m.v+" ÷ "+M+" = <b>"+NB.r(n,3)+"</b> mol，約有 <b>"+NB.r(N,2)+" × 10²³</b> 個分子（1 莫耳 ≈ 6 × 10²³ 個）。"}
  co=[1,1,1];up1()},
 steps:["化學反應式：反應物寫左邊、生成物寫右邊，中間用「→」，必要時標示反應條件","平衡：在化學式<b>前面</b>加係數，使兩邊各種原子數目相等；不可更改右下角的數字","係數比 = 分子數比 = 莫耳數比（例如 2H₂ + O₂ → 2H₂O）","原子量：以碳-12 = 12 為標準的相對質量；分子量 = 分子中各原子量的總和","1 莫耳 = 6 × 10²³ 個粒子；莫耳數 = 質量 ÷ 分子量（或原子量）"],
 key:["H=1、C=12、N=14、O=16、Na=23、Cl=35.5（常用原子量）","係數比不是質量比：2H₂ + O₂ → 2H₂O 的質量比是 4：32：36"],
 ch:[{q:"36 公克的水（H₂O，分子量 18）是多少莫耳？",a:2,u:"mol",tol:.01,h:"莫耳數 = 質量 ÷ 分子量。"},
     {q:"平衡反應式 □CH₄ + □O₂ → □CO₂ + □H₂O，係數（最簡整數）依序是？",o:["1、1、1、2","1、2、1、2","2、3、2、4","1、2、2、1"],a:1}]
});
