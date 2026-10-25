/* 第三冊 0-1 科學方法與探究：單擺實驗（操作變因、控制變因、應變變因） */
NB.unit({
 q:"阿哲覺得「擺錘越重，擺動得越慢」。要怎麼設計實驗，才能公平地檢驗他的想法？一次可以同時改變好幾個條件嗎？",
 sub:"一次只改一個條件，記錄擺動 10 次的時間",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,640,270,"單擺實驗"),len=NB.slider(b,"擺長",20,100,10,50," 公分",draw),ms=NB.slider(b,"擺錘質量",50,200,50,100," 公克",draw),ang=NB.slider(b,"起始擺角",5,15,5,10," 度",draw);
  var tb=L.table(b,["擺長（cm）","質量（g）","擺角（°）","擺動 10 次（秒）"]),g=L.g(v),t0=0,run=false,ph=0,last=null;
  NB.btn(b,"開始計時：擺 10 次",function(){run=true;ph=0},"go");NB.btn(b,"清空紀錄",function(){tb.clear();last=null;eq.innerHTML=hint()});
  function T(){return 2*Math.PI*Math.sqrt(len.v/100/9.8)}
  function hint(){return "先固定兩個條件，只改一個（操作變因），看擺動 10 次的時間（應變變因）會不會跟著變。"}
  function draw(){L.clear(g);var Lp=len.v*2.1,a=ang.v*2*Math.PI/180*Math.cos(ph),px=320+Lp*Math.sin(a),py=30+Lp*Math.cos(a),r=7+ms.v/25;
   NB.mk("path",{d:"M220 30H420",fill:"none"},g,4);NB.mk("path",{d:"M320 30V"+(30+Lp),fill:"none",stroke:"var(--soft)","stroke-dasharray":"3 5"},g,1);
   NB.mk("path",{d:"M320 30L"+px.toFixed(1)+" "+py.toFixed(1),fill:"none"},g,1.6);NB.mk("circle",{cx:px,cy:py,r:r,fill:"var(--p2)"},g,2);
   NB.t(g,540,60,"擺長 "+len.v+" cm",{z:13,c:"var(--soft)"});NB.t(g,540,80,"質量 "+ms.v+" g",{z:13,c:"var(--soft)"});NB.t(g,540,100,"擺角 "+ang.v+"°",{z:13,c:"var(--soft)"});
   if(run)NB.t(g,540,150,"計時中 "+(ph/(2*Math.PI)*T()).toFixed(1)+" 秒",{z:15,c:"var(--p1)",b:1})}
  L.loop(v,function(dt){if(!run){if(!L.reduce){ph+=dt/1000*2*Math.PI/T();ph%=2*Math.PI*1000}draw();return}
   ph+=dt/1000*2*Math.PI/T()*(L.reduce?50:4);/* 計時時播放 4 倍速 */
   if(ph>=20*Math.PI){run=false;ph=0;var t10=NB.r(10*T()+(Math.random()-.5)*.16,1),row=[len.v,ms.v,ang.v,t10];tb.add(row);
    eq.innerHTML=judge(row);last=row}draw()});
  function judge(r){if(!last)return "第一筆紀錄："+r[3]+" 秒。接著只改「一個」條件再量一次。";
   var ch=[0,1,2].filter(function(i){return r[i]!==last[i]}),nm=["擺長","質量","擺角"];
   if(ch.length===0)return "條件都一樣，量到 "+r[3]+" 秒：重複測量可以檢查誤差。";
   if(ch.length>1)return "這次同時改了"+ch.map(function(i){return nm[i]}).join("、")+"，時間變了也分不出是誰造成的——一次只改一個！";
   var i=ch[0],d=Math.abs(r[3]-last[3]);return "只改了<b>"+nm[i]+"</b>："+last[3]+" 秒 → "+r[3]+" 秒。"+(d>.4?"時間明顯改變，"+nm[i]+"會影響擺動快慢。":"幾乎沒變（差異只是測量誤差），"+nm[i]+"不影響擺動快慢。")}
  eq.innerHTML=hint();draw()},
 steps:["科學方法：觀察 → 提出問題 → 形成假說 → 設計實驗 → 收集數據 → 分析與結論","<b>操作變因</b>：實驗中刻意改變的條件（例如擺長）","<b>控制變因</b>：要保持相同的條件（例如質量、擺角）","<b>應變變因</b>：跟著操作變因改變、要測量的結果（例如擺動 10 次的時間）","量 10 次再除以 10，比只量 1 次更準確；多做幾次取平均也能減少誤差"],
 key:["一次只改變一個操作變因，其他條件都要控制相同","單擺擺動快慢只和擺長有關：擺長越長，擺動越慢","結論要根據數據，不能只憑感覺"],
 ch:[{q:"想知道「擺長是否影響單擺週期」，下列哪一項應該是控制變因？",o:["擺長","擺動 10 次的時間","擺錘的質量","實驗者的身高"],a:2,h:"控制變因＝要保持相同、不讓它影響結果的條件。"},
     {q:"某單擺擺動 10 次共花 14.2 秒，擺動一次大約是幾秒？",a:1.42,u:"秒",tol:.005,h:"14.2 ÷ 10。"}]
});
