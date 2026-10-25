/* 第四冊 1-1 質量守恆：密閉與開放容器中的反應、天平讀數 */
NB.unit({
 q:"小柏把大理石放進稀鹽酸，冒出很多氣泡，放在電子秤上的讀數一直變小。難道反應會讓東西「消失」嗎？如果把瓶子密封起來再做一次呢？",
 sub:"選開放或密閉容器，讓反應進行，看電子秤的讀數",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,640,290,"質量守恆"),box=NB.pick(b,"容器",["開放（燒杯）","密閉（錐形瓶加氣球）"],0,up),rx=NB.pick(b,"反應",["大理石＋稀鹽酸","鋼絲絨燃燒（加熱）"],0,up),p=NB.slider(b,"反應進行",0,100,5,0," %",up),g=L.g(v);
  function up(){L.clear(g);var u=p.v/100,closed=box.v===1,m0=rx.v?200:250,gas=rx.v?6*u:4.4*u,read;
   if(rx.v===0)read=closed?m0:m0-gas;else read=closed?m0:m0+gas;/* 鋼絲絨在空氣中燃燒會吸收氧氣，開放時變重 */
   NB.mk("rect",{x:170,y:240,width:300,height:30,rx:6,fill:"var(--paper2)"},g,2);NB.mk("rect",{x:330,y:248,width:120,height:16,rx:3,fill:"#0f2a2a"},g,1);NB.t(g,390,261,NB.r(read,1).toFixed(1)+" g",{z:13,c:"#7cf0c4"});
   if(rx.v===0){if(closed){NB.mk("path",{d:"M300 110v26l-40 76q-4 12 8 14h104q12-2 8-14l-40-76v-26",fill:"var(--paper)"},g,2);var bs=12+u*30;NB.mk("ellipse",{cx:320,cy:110-bs*.8,rx:bs*.8,ry:bs,fill:"var(--p1)","fill-opacity":.35},g,1.8)}
    else L.beaker(g,265,238,110,110,0,"",{});
    NB.mk("path",{d:(closed?"M268 222":"M270 236")+"h104",fill:"none",stroke:"var(--p2)"},g,1);NB.mk("rect",{x:272,y:205,width:96,height:30,fill:"var(--p2)","fill-opacity":.25,stroke:"none"},g);
    for(var i=0;i<Math.round((1-u)*5);i++)NB.mk("path",{d:"M"+(285+i*16)+" 232l6-8 7 2 3 7z",fill:"#ddd"},g,1.2);
    if(u>0&&u<1)for(var k=0;k<6;k++)NB.mk("circle",{cx:285+(k*13)%70,cy:200-k*(closed?6:14),r:3,fill:"none",stroke:"var(--soft)"},g,1);
    if(!closed&&u>0)L.arrow(g,320,150,320,70,"var(--p1)",1.6,8)}
   else{if(closed){NB.mk("path",{d:"M260 236V90q0-30 60-30t60 30v146",fill:"var(--p2)","fill-opacity":.06},g,2)}NB.mk("path",{d:"M280 236h80",fill:"none"},g,3);
    for(var j=0;j<14;j++)NB.mk("path",{d:"M"+(282+j*5)+" 232q3-26 8-40",fill:"none",stroke:j<u*14?"#5a4632":"#a9b1bb"},g,1.4);if(u>0&&u<1)NB.mk("path",{d:"M320 200q-12-20 0-36q12 16 0 36z",fill:"var(--p4)"},g,1.4)}
   var txt=rx.v===0?(closed?"密閉：產生的二氧化碳被困在瓶內（氣球鼓起），總質量<b>不變</b>。":"開放：產生的二氧化碳<b>逸散到空氣中</b>，所以讀數減少了 "+NB.r(gas,1)+" g。"):(closed?"密閉：鐵和瓶內的氧結合成氧化鐵，總質量<b>不變</b>。":"開放：鐵和空氣中的氧結合，生成物多了氧的質量，讀數<b>增加</b> "+NB.r(gas,1)+" g。");
   eq.innerHTML="反應前 "+m0+" g → 現在 <b>"+NB.r(read,1)+"</b> g。"+txt+"<br>原子只是重新排列，種類和數目都不變，所以反應前後總質量一定相等。"}
  up()},
 steps:["化學反應前後，反應物的總質量 = 生成物的總質量，這就是<b>質量守恆定律</b>（拉瓦節）","原因：反應只是原子重新排列組合，原子的種類與數目都不改變","開放容器裡，生成氣體逸散，看起來變輕；吸收空氣中的氧，看起來變重——其實都遵守質量守恆","要驗證質量守恆，有氣體參與的反應必須在<b>密閉</b>容器中進行","物理變化也遵守質量守恆（例如冰融化成水，質量不變）"],
 key:["質量守恆：原子不會無中生有，也不會憑空消失","分子數目「不一定」守恆，原子數目一定守恆"],
 ch:[{q:"6 g 的碳和 16 g 的氧恰好完全反應，生成二氧化碳多少公克？",a:22,u:"g",tol:.01,h:"反應物總質量 = 生成物總質量。"},
     {q:"在開放的燒杯中讓大理石和鹽酸反應，反應後電子秤讀數變小，原因是什麼？",o:["質量守恆不成立","生成的二氧化碳逸散到空氣中","大理石消失了","鹽酸蒸發變成氧氣"],a:1}]
});
