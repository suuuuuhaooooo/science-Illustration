/* 第六冊 2-4 電磁感應：磁鐵插入線圈、感應電流、發電機 */
NB.unit({
 q:"腳踏車的發電燈，騎越快燈越亮；發電廠裡巨大的渦輪一轉就能供應整座城市用電。把「動」變成「電」的祕密是什麼？",
 sub:"把磁鐵拖進、拖出線圈，看檢流計的指針",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,280,"電磁感應"),N=NB.slider(b,"線圈圈數",10,60,10,30," 圈",function(){}),g=L.g(v),mx=80,last=80,vel=0,needle=0,hist=[];
  var mg=null;function draw(){L.clear(g);var turns=Math.round(N.v/5);for(var k=0;k<turns;k++){var x=380+k*120/turns;NB.mk("ellipse",{cx:x,cy:130,rx:9,ry:46,fill:"none",stroke:"#c46a3a"},g,2)}
   NB.mk("path",{d:"M380 176V240H470M540 240H560V176",fill:"none"},g,2);NB.mk("circle",{cx:505,cy:240,r:32,fill:"var(--paper)"},g,2);NB.mk("path",{d:"M505 240L"+(505+26*Math.sin(needle))+" "+(240-26*Math.cos(needle)),fill:"none",stroke:"var(--p1)"},g,2.4);NB.t(g,505,268,"檢流計",{z:11,c:"var(--soft)"});
   mg=NB.s("g",{},g);NB.mk("rect",{x:mx-70,y:112,width:70,height:36,fill:"var(--p2)","fill-opacity":.85},mg,1.6);NB.mk("rect",{x:mx,y:112,width:70,height:36,fill:"var(--p1)","fill-opacity":.85},mg,1.6);NB.t(mg,mx-35,136,"S",{z:16,b:1,c:"#fff"});NB.t(mg,mx+35,136,"N",{z:16,b:1,c:"#fff"});
   NB.drag(v,mg,function(x){mx=NB.clamp(x,80,520)});NB.t(g,200,40,"拖動磁鐵（快一點、慢一點都試試）",{z:12,c:"var(--soft)"})}
  L.loop(v,function(dt){if(dt<=0)return;vel=(mx-last)/dt;last=mx;var inside=mx>330&&mx<560,emf=inside||Math.abs(mx-380)<90?vel*N.v*.02:0;needle+=(NB.clamp(emf,-1.2,1.2)-needle)*.25;draw();
   if(Math.abs(emf)>.05)eq.innerHTML="磁鐵"+(vel>0?"<b>插入</b>":"<b>拔出</b>")+"線圈：穿過線圈的磁場在改變，產生<b>感應電流</b>，指針偏向"+(emf>0?"右":"左")+"。移動越快、圈數越多，電流越大。";
   else if(Math.abs(vel)<.01&&inside)eq.innerHTML="磁鐵<b>靜止</b>在線圈裡：磁場沒有變化，<b>沒有</b>感應電流，指針回到中間。"});
  draw();eq.innerHTML="把磁鐵往右拖進線圈看看。"},
 steps:["<b>電磁感應</b>：通過線圈的磁場發生變化時，線圈中產生感應電流（法拉第發現）","磁鐵插入、拔出線圈時有感應電流，方向相反；磁鐵靜止不動時沒有電流","磁場變化越快、線圈圈數越多，感應電流越大","<b>發電機</b>：線圈在磁場中轉動（或磁鐵轉動），把動能轉換成電能","應用：發電廠、腳踏車發電燈、變壓器、電磁爐、悠遊卡感應"],
 key:["「變化」才會感應：靜止不變的磁場不產生電流","發電機：動能 → 電能；馬達：電能 → 動能"],
 ch:[{q:"磁鐵靜止放在線圈中不動，線圈中會不會有感應電流？",o:["會，而且很大","會，但很小","不會","看磁鐵大小"],a:2},
     {q:"發電機的主要能量轉換是什麼？",o:["電能 → 動能","動能 → 電能","光能 → 電能","化學能 → 電能"],a:1}]
});
