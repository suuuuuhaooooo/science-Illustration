/* 第五冊 3-3 槓桿原理與靜力平衡：力矩 = 力 × 力臂 */
NB.unit({
 q:"蹺蹺板上，體重比較輕的小孩，要坐在哪裡才能把爸爸「蹺」起來？用很長的鐵棍撬開箱子，為什麼特別省力？",
 sub:"拖動兩邊的重物位置，讓蹺蹺板平衡",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,260,"槓桿"),wL=NB.slider(b,"左邊重物",1,6,1,4," kgw",up),wR=NB.slider(b,"右邊重物",1,6,1,2," kgw",up),g=L.g(v),dl=3,dr=5,K=50;
  function up(){L.clear(g);var tl=wL.v*dl,tr=wR.v*dr,net=tr-tl,ang=NB.clamp(net*.025,-.25,.25),cx=330,cy=170,c=Math.cos(ang),s=Math.sin(ang);
   NB.mk("path",{d:"M"+(cx-16)+" 230L"+cx+" "+cy+"L"+(cx+16)+" 230Z",fill:"var(--p4b)"},g,1.6);NB.mk("path",{d:"M30 230H630",fill:"none"},g,2);
   var P=function(d){return[cx+d*K*c,cy+d*K*s]},A=P(-6),B=P(6);NB.mk("path",{d:"M"+A[0]+" "+A[1]+"L"+B[0]+" "+B[1],fill:"none"},g,6);
   for(var i=-6;i<=6;i++){var q=P(i);NB.mk("circle",{cx:q[0],cy:q[1],r:2.4,fill:"var(--paper)"},g,1)}
   [[-dl,wL.v,"var(--p2)",function(d){dl=d}],[dr,wR.v,"var(--p1)",function(d){dr=d}]].forEach(function(o,j){var q=P(o[0]),sz=14+o[1]*4,r=NB.mk("rect",{x:q[0]-sz/2,y:q[1]-sz-4,width:sz,height:sz,rx:3,fill:o[2],"fill-opacity":.8},g,1.6);NB.t(g,q[0],q[1]-sz/2,o[1],{z:12,b:1,c:"#fff"});
    NB.drag(v,r,function(x){var d=Math.round(Math.abs((x-cx)/K));o[3](NB.clamp(d,1,6));up()})});
   NB.t(g,330,30,"拖動方塊改變距離（每格 1 m）",{z:12,c:"var(--soft)"});
   eq.innerHTML="左邊力矩 = "+wL.v+" × "+dl+" = "+tl+"；右邊力矩 = "+wR.v+" × "+dr+" = "+tr+" → "+(net===0?"<b>力矩相等，平衡！</b>":"不平衡，往"+(net>0?"右":"左")+"邊傾斜。")+"<br>槓桿平衡：左邊的「力 × 力臂」= 右邊的「力 × 力臂」。"}
  up()},
 steps:["槓桿三要素：支點、施力點、抗力點；<b>力臂</b>是支點到力作用線的垂直距離","<b>力矩</b> = 力 × 力臂，使物體轉動的效果；順時針、逆時針兩種方向","槓桿平衡（不轉動）：順時針力矩總和 = 逆時針力矩總和","<b>靜力平衡</b>：物體不移動（合力為零）也不轉動（合力矩為零）","施力臂 > 抗力臂 → 省力（但費時、費距離）；施力臂 < 抗力臂 → 費力但省時（筷子、掃把）"],
 key:["力臂越長，同樣的力產生的力矩越大","剪刀、開瓶器、鑷子都是槓桿"],
 ch:[{q:"蹺蹺板左邊 30 kgw 的小孩坐在離支點 2 m 處，右邊 20 kgw 的小孩要坐在離支點幾公尺處才能平衡？",a:3,u:"m",tol:.01,h:"30 × 2 = 20 × d。"},
     {q:"下列哪一種工具是「費力」的槓桿？",o:["開瓶器","剪鐵皮的大剪刀","筷子","撬棍"],a:2}]
});
