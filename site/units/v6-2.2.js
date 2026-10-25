/* 第六冊 2-2 電流的磁效應：直導線（安培右手定則）、螺線管電磁鐵 */
NB.unit({
 q:"1820 年，厄斯特上課時發現：導線一通電，旁邊的指北針竟然轉動了。電和磁原來是有關係的！廢鐵場的大吊車也用「電」來吸起整台汽車。怎麼做到的？",
 sub:"改變電流方向、大小和線圈圈數",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["直導線","螺線管電磁鐵"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var dir=NB.pick(P1,"電流方向",["由下往上","由上往下"],0,up1),v=L.stage(P1,640,260,"直導線"),g=L.g(v);
  function up1(){L.clear(g);var s=dir.v?-1:1;NB.mk("path",{d:"M320 20V240",fill:"none",stroke:"var(--p4b)"},g,5);L.arrow(g,340,s>0?170:90,340,s>0?90:170,"var(--p1)",2.4,9);NB.t(g,356,130,"I",{z:16,b:1,c:"var(--p1)",a:"start"});
   [50,90].forEach(function(r){NB.mk("ellipse",{cx:320,cy:130,rx:r*1.6,ry:r*.45,fill:"none",stroke:"var(--p2)","stroke-dasharray":"5 4"},g,1.4)});
   [[0,1],[1,0],[0,-1],[-1,0]].forEach(function(q,k){var x=320+q[0]*90*1.6,y=130+q[1]*90*.45,tx=q[1]*s,ty=-q[0]*s*.3;NB.mk("circle",{cx:x,cy:y,r:14,fill:"var(--paper)"},g,1.6);var a=Math.atan2(ty,tx);NB.mk("path",{d:"M"+(x+11*Math.cos(a))+" "+(y+11*Math.sin(a))+"L"+(x-4*Math.sin(a))+" "+(y+4*Math.cos(a))+"L"+(x+4*Math.sin(a))+" "+(y-4*Math.cos(a))+"Z",fill:"var(--p1)"},g,1)});
   eq.innerHTML="通電直導線周圍產生<b>同心圓</b>形狀的磁場。<b>安培右手定則</b>：右手大拇指指向電流方向，四指彎曲的方向就是磁場方向（俯視為"+(s>0?"逆":"順")+"時針）。電流反向，磁場也反向。"}
  var I=NB.slider(P2,"電流",0,3,.5,1.5," A",up2),N=NB.slider(P2,"線圈圈數",10,100,10,50," 圈",up2),core=NB.pick(P2,"線圈中間",["空心","放入鐵棒"],1,up2),v2=L.stage(P2,640,240,"電磁鐵"),g2=L.g(v2);
  function up2(){L.clear(g2);var Bv=I.v*N.v*(core.v?8:1),cl=Math.min(20,Math.floor(Bv/40));if(core.v)NB.mk("rect",{x:200,y:100,width:240,height:36,fill:"#8a94a6"},g2,1.6);
   var turns=Math.max(4,Math.round(N.v/7));for(var k=0;k<turns;k++){var x=210+k*220/turns;NB.mk("ellipse",{cx:x,cy:118,rx:8,ry:34,fill:"none",stroke:"#c46a3a"},g2,2)}
   NB.t(g2,190,124,"S",{z:16,b:1,c:"var(--p2)"});NB.t(g2,452,124,"N",{z:16,b:1,c:"var(--p1)"});for(var c=0;c<cl;c++)NB.mk("path",{d:"M"+(470+(c%5)*28)+" "+(90+Math.floor(c/5)*18)+"h18",fill:"none",stroke:"var(--soft)"},g2,4);
   NB.t(g2,540,200,"吸起 "+cl+" 根迴紋針",{z:13,b:1});
   eq.innerHTML="螺線管通電後像一根條形磁鐵（用右手握住線圈，四指順著電流方向，大拇指指向 N 極）。<br>電流越大、圈數越多、中間放<b>鐵芯</b>，磁性越強。關掉電流磁性就消失——這就是<b>電磁鐵</b>。"}
  up1()},
 steps:["<b>電流的磁效應</b>：電流會在周圍產生磁場（厄斯特發現）","直導線：磁場是以導線為圓心的同心圓，離導線越近越強","<b>安培右手定則</b>：大拇指 = 電流方向，四指彎曲 = 磁場方向","螺線管：通電後像條形磁鐵；右手四指沿電流方向握住線圈，大拇指指向 N 極","電磁鐵：可控制磁性有無與強弱，用於電鈴、揚聲器、磁浮列車、廢鐵吊車"],
 key:["電磁鐵磁性：電流大、圈數多、加鐵芯 → 越強","改變電流方向，電磁鐵的 N、S 極對調"],
 ch:[{q:"下列哪一個做法「不能」增強電磁鐵的磁性？",o:["增加電流","增加線圈圈數","在線圈中放入鐵棒","把鐵棒換成塑膠棒"],a:3},
     {q:"第一位發現電流會使指北針偏轉的科學家是誰？",o:["法拉第","厄斯特","牛頓","歐姆"],a:1}]
});
