/* 第五冊 2-4 圓周運動與萬有引力 */
NB.unit({
 q:"用繩子綁著小球甩圈，手一放，小球會往哪裡飛？月球一直繞著地球轉，是什麼「繩子」在拉著它？",
 sub:"甩動小球再放手；調整兩個物體的質量與距離，看萬有引力",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["圓周運動","萬有引力"],function(i){i?up2():0}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,280,"圓周運動"),g=L.g(v),ang=0,free=null;NB.btn(P1,"放手",function(){if(!free){var r=100,x=320+r*Math.cos(ang),y=140+r*Math.sin(ang);free={x:x,y:y,vx:-Math.sin(ang),vy:Math.cos(ang)}}},"go");NB.btn(P1,"重來",function(){free=null});
  L.loop(v,function(dt){if(P1.hidden)return;if(L.reduce)dt=0;L.clear(g);var r=100;if(!free){ang+=dt*.004;var x=320+r*Math.cos(ang),y=140+r*Math.sin(ang);NB.mk("circle",{cx:320,cy:140,r:r,fill:"none",stroke:"var(--soft)","stroke-dasharray":"4 5"},g,1.2);NB.mk("path",{d:"M320 140L"+x+" "+y,fill:"none"},g,2);NB.mk("circle",{cx:x,cy:y,r:12,fill:"var(--p1)"},g,1.6);L.arrow(g,x,y,x-Math.sin(ang)*50,y+Math.cos(ang)*50,"var(--p2)",2,8);L.arrow(g,x,y,x+(320-x)*.35,y+(140-y)*.35,"var(--p3)",2,8);
    eq.innerHTML="繩子的拉力一直指向圓心（<b>向心力</b>，綠色），不斷改變小球的方向；藍色是當下的速度方向（切線）。"}
   else{free.x+=free.vx*dt*.4;free.y+=free.vy*dt*.4;NB.mk("circle",{cx:320,cy:140,r:5,fill:"var(--ink)"},g,1);NB.mk("circle",{cx:free.x,cy:free.y,r:12,fill:"var(--p1)"},g,1.6);
    eq.innerHTML="放手後沒有向心力，小球沿著<b>切線方向</b>直線飛出（慣性）——不是往外直直甩出去。"}});
  var m1=NB.slider(P2,"甲的質量",1,4,1,2," 倍",up2),m2=NB.slider(P2,"乙的質量",1,4,1,2," 倍",up2),r=NB.slider(P2,"兩者距離",1,4,1,2," 倍",up2),v2=L.stage(P2,640,200,"萬有引力"),g2=L.g(v2);
  function up2(){L.clear(g2);var F=m1.v*m2.v/(r.v*r.v),d=r.v*90,x1=320-d/2,x2=320+d/2;NB.mk("circle",{cx:x1,cy:100,r:12+m1.v*7,fill:"var(--p2)","fill-opacity":.7},g2,1.6);NB.mk("circle",{cx:x2,cy:100,r:12+m2.v*7,fill:"var(--p4)","fill-opacity":.8},g2,1.6);
   var al=Math.min(d/2-10,14+F*22);L.arrow(g2,x1,160,x1+al,160,"var(--p1)",2.4,9);L.arrow(g2,x2,160,x2-al,160,"var(--p1)",2.4,9);
   eq.innerHTML="F ∝ (m₁ × m₂) ÷ r²：引力是基準情形（質量各 1、距離 1）的 <b>"+NB.r(F,3)+"</b> 倍。<br>質量越大引力越大；距離加倍，引力變成 1/4。兩物體受到的引力大小相等、方向相反。"}
  },
 steps:["<b>等速圓周運動</b>：速率不變，但方向一直改變，所以有加速度，需要指向圓心的<b>向心力</b>","向心力消失時，物體沿<b>切線</b>方向飛出（慣性）","<b>萬有引力</b>：任兩物體之間都有互相吸引的力，F = G × m₁m₂ ÷ r²","萬有引力提供月球繞地球、地球繞太陽的向心力","物體的重量就是地球對它的萬有引力；月球表面重力約為地球的 1/6"],
 key:["距離變 2 倍，引力變 1/4（平方反比）","雨傘轉動時，水滴沿切線方向甩出"],
 ch:[{q:"兩物體之間的距離變為原來的 3 倍（質量不變），萬有引力變為原來的幾倍？",o:["3 倍","1/3 倍","9 倍","1/9 倍"],a:3},
     {q:"甩繩子使小球作圓周運動，突然放手，小球會沿什麼方向飛出？",o:["沿半徑向外","沿圓周的切線方向","朝圓心","垂直往上"],a:1}]
});
