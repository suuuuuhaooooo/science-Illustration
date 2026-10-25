/* 第四冊 3-1 認識電解質：導電度測試、解離成離子 */
NB.unit({
 q:"純水幾乎不導電，可是浴室裡濕濕的手碰到插座卻很危險。為什麼加了鹽的水、自來水就能導電，糖水卻不行？",
 sub:"把導電度測試器放進不同的水溶液，看燈泡亮不亮",
 tool:function(b,eq){
  var L=NB.lab,S=[["純水",0,"非電解質（幾乎不導電）",[]],["糖水",0,"非電解質：糖溶解後以分子存在",[]],["酒精水溶液",0,"非電解質",[]],["食鹽水",1,"強電解質：NaCl → Na⁺ + Cl⁻",["Na⁺","Cl⁻"]],["稀鹽酸",1,"強電解質：HCl → H⁺ + Cl⁻",["H⁺","Cl⁻"]],["氫氧化鈉溶液",1,"強電解質：NaOH → Na⁺ + OH⁻",["Na⁺","OH⁻"]],["醋酸（食醋）",.35,"弱電解質：只有少部分解離成 H⁺ 和 CH₃COO⁻",["H⁺","CH₃COO⁻"]]];
  var v=L.stage(b,640,280,"導電度"),s=NB.pick(b,"水溶液",S.map(function(x){return x[0]}),3,up),g=L.g(v),t=0;
  function up(){eq.innerHTML="<b>"+S[s.v][0]+"</b>："+S[s.v][2]+"。"+(S[s.v][1]?"<br>溶液中有可以自由移動的<b>離子</b>：陽離子往負極、陰離子往正極移動，形成電流，燈泡"+(S[s.v][1]<1?"微亮":"亮起")+"。":"<br>溶液中沒有自由移動的離子，燈泡不亮。")}
  L.loop(v,function(dt){t+=L.reduce?0:dt;L.clear(g);var k=S[s.v],br=k[1];
   L.beaker(g,180,260,280,170,.8,"var(--p2)",{op:.12});NB.mk("rect",{x:240,y:60,width:12,height:180,fill:"var(--ink)"},g,1);NB.mk("rect",{x:388,y:60,width:12,height:180,fill:"var(--p1)"},g,1);NB.t(g,246,52,"−",{z:18,b:1});NB.t(g,394,52,"+",{z:18,b:1,c:"var(--p1)"});
   NB.mk("path",{d:"M246 60V30H262M286 30H304M336 30H394V60",fill:"none"},g,2);NB.mk("circle",{cx:320,cy:30,r:16,fill:br?"#ffe27a":"var(--paper)","fill-opacity":br?.4+br*.6:1},g,2);if(br>.3)for(var i=0;i<8;i++){var a=i*Math.PI/4;NB.mk("path",{d:"M"+(320+22*Math.cos(a))+" "+(30+22*Math.sin(a))+"l"+8*Math.cos(a)+" "+8*Math.sin(a),fill:"none",stroke:"var(--p4)"},g,2)}
   NB.mk("rect",{x:262,y:18,width:24,height:24,rx:3,fill:"var(--paper2)"},g,1.6);NB.mk("path",{d:"M270 24v12M278 20v20",fill:"none"},g,2);NB.t(g,274,12,"電池",{z:11,c:"var(--soft)"});
   if(k[3].length){for(var j=0;j<14;j++){var pos=j%2===0,lab=pos?k[3][0]:k[3][1],ph=((t/4000*(br)+j*.13)%1),x=pos?380-ph*120:260+ph*120,y=120+(j*29)%110;if(br<1&&j%3)continue;
     NB.mk("circle",{cx:x,cy:y,r:12,fill:pos?"#f6c7bd":"#c3dbf2"},g,1.2);NB.t(g,x,y+4,lab.length>3?(pos?"+":"−"):lab,{z:lab.length>3?13:9,b:1,c:"#142530"})}}
   else for(var q=0;q<10;q++)NB.mk("ellipse",{cx:270+(q*37)%110,cy:130+(q*23)%90,rx:10,ry:6,fill:"var(--paper)"},g,1.2)});
  up()},
 steps:["<b>電解質</b>：溶於水後能導電的物質，例如酸、鹼、鹽類（NaCl、HCl、NaOH）","<b>非電解質</b>：溶於水後不導電，例如糖、酒精、尿素（以分子形式存在）","電解質溶於水會<b>解離</b>成帶正電的陽離子和帶負電的陰離子；通電時陽離子往負極、陰離子往正極移動","溶液中正電荷總量 = 負電荷總量，所以溶液仍是電中性","強電解質幾乎完全解離；弱電解質（醋酸）只部分解離，導電性較弱"],
 key:["固態食鹽不導電：離子不能自由移動；溶於水或熔融時才導電","電解質導電靠的是「離子」，金屬導電靠的是「電子」"],
 ch:[{q:"下列哪一種水溶液不能導電？",o:["食鹽水","稀硫酸","蔗糖水","氫氧化鈉溶液"],a:2},
     {q:"氯化鈣（CaCl₂）溶於水完全解離，0.1 莫耳的氯化鈣可產生多少莫耳的氯離子？",a:.2,u:"mol",tol:.001,h:"CaCl₂ → Ca²⁺ + 2Cl⁻。"}]
});
