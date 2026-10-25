/* 第四冊 6-1 力與平衡：力的三要素、虎克定律（彈簧秤）、合力與平衡 */
NB.unit({
 q:"拔河比賽時，兩隊用力拉，繩子卻一動也不動；彈簧秤掛上越重的東西，彈簧就拉得越長。力要怎麼「量」和「加」？",
 sub:"在彈簧下掛砝碼；調整兩個方向相反的力",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["彈簧伸長量","合力與平衡"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var W=NB.slider(P1,"掛上的重量",0,100,10,40," gw",up1),v=L.stage(P1,640,280,"彈簧"),g=L.g(v),K=.2;/* 每 gw 伸長 0.2 cm，原長 8 cm */
  function up1(){L.clear(g);var x=W.v*K,len=80+x*10,top=30,d="M140 "+top;for(var i=0;i<=16;i++)d+="L"+(140+(i%2?14:-14)*(i&&i<16?1:0))+" "+(top+len*i/16).toFixed(1);NB.mk("path",{d:"M100 "+top+"H180",fill:"none"},g,4);NB.mk("path",{d:d,fill:"none",stroke:"var(--p2)"},g,2.2);
   if(W.v)NB.mk("rect",{x:120,y:top+len,width:40,height:10+W.v/4,rx:4,fill:"var(--p4b)"},g,1.6);
   var P=L.plot(g,300,30,290,200,{x0:0,x1:100,y0:0,y1:20,xt:20,yt:4,xl:"重量（gw）",yl:"伸長量（cm）"});P.line([[0,0],[100,20]],"var(--p2)",2);P.dot(W.v,x,"var(--p1)",6);
   eq.innerHTML="掛 "+W.v+" gw → 伸長 <b>"+NB.r(x,1)+"</b> cm，彈簧總長 "+NB.r(8+x,1)+" cm。<br>在彈性限度內，<b>伸長量與外力成正比</b>（虎克定律），所以彈簧秤的刻度是等距的。"}
  var F1=NB.slider(P2,"向右的力",0,10,1,6," kgw",up2),F2=NB.slider(P2,"向左的力",0,10,1,4," kgw",up2),v2=L.stage(P2,640,200,"合力"),g2=L.g(v2);
  function up2(){L.clear(g2);var R=F1.v-F2.v;NB.mk("rect",{x:290,y:80,width:60,height:50,rx:6,fill:"var(--paper2)"},g2,2);
   if(F1.v)L.arrow(g2,350,105,350+F1.v*24,105,"var(--p1)",3,12);if(F2.v)L.arrow(g2,290,105,290-F2.v*24,105,"var(--p2)",3,12);
   NB.t(g2,350+F1.v*12,92,F1.v+" kgw",{z:13,c:"var(--p1)"});NB.t(g2,290-F2.v*12,92,F2.v+" kgw",{z:13,c:"var(--p2)"});
   if(R)L.arrow(g2,320,170,320+R*24,170,"var(--p3)",3,12);NB.t(g2,320,195,R?"合力 "+Math.abs(R)+" kgw 向"+(R>0?"右":"左"):"合力 = 0",{z:13,b:1,c:"var(--p3)"});
   eq.innerHTML=R?"兩力方向相反，合力 = 大 − 小 = <b>"+Math.abs(R)+"</b> kgw，方向和較大的力相同；物體受力不平衡。":"兩力<b>大小相等、方向相反、作用在同一直線上</b> → 合力為 0，物體<b>力平衡</b>（靜止的保持靜止）。"}
  up1()},
 steps:["力的三要素：大小、方向、作用點；用箭頭表示（長度代表大小）","力的單位：公斤重（kgw）、公克重（gw）；1 kgw = 1000 gw","<b>虎克定律</b>：在彈性限度內，彈簧的伸長量與所受外力成正比","同一直線上：同方向的兩力，合力 = 相加；反方向，合力 = 相減，方向同較大者","兩力平衡：大小相等、方向相反、作用在同一直線上，合力為零"],
 key:["超過彈性限度，彈簧無法恢復原長，也不再遵守正比關係","伸長量 = 總長 − 原長，不是總長"],
 ch:[{q:"某彈簧原長 10 cm，掛 50 gw 時總長 12 cm。掛 100 gw（未超過彈性限度）時，總長是多少 cm？",a:14,u:"cm",tol:.01,h:"50 gw 伸長 2 cm，100 gw 伸長 4 cm。"},
     {q:"一個物體受到向右 8 kgw 和向左 3 kgw 的力（同一直線），合力為何？",o:["11 kgw 向右","5 kgw 向右","5 kgw 向左","11 kgw 向左"],a:1}]
});
