/* 第三冊 5-3 熱對物質的影響：水的加熱曲線（三態變化與潛熱）、熱脹冷縮 */
NB.unit({
 q:"把冰塊放在鍋裡持續加熱，溫度計的讀數卻在 0 °C 停了好一陣子，等冰全部融化後才開始上升。熱跑到哪裡去了？",
 sub:"拖動供熱量，看水從 −20 °C 的冰變成 120 °C 的水蒸氣",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,300,"加熱曲線"),Hs=NB.slider(b,"已供給的熱量",0,740,5,0," 千卡",up),g=L.g(v);
  /* 1 kg 的冰：冰比熱 0.5、熔化熱 80 kcal/kg、水比熱 1、汽化熱 540 kcal/kg、水蒸氣比熱 0.5（簡化） */
  var SEG=[[10,"冰升溫"],[80,"融化（0 °C）"],[100,"水升溫"],[540,"沸騰（100 °C）"],[10,"水蒸氣升溫"]];
  function state(H){var a=H,T,ph,fr=0;if(a<=10){T=-20+a/.5;ph=0}else if((a-=10)<=80){T=0;ph=1;fr=a/80}else if((a-=80)<=100){T=a;ph=2}else if((a-=100)<=540){T=100;ph=3;fr=a/540}else{a-=540;T=100+a/.5;ph=4}return{T:T,ph:ph,fr:fr}}
  function up(){L.clear(g);var P=L.plot(g,70,30,360,220,{x0:0,x1:740,y0:-20,y1:120,xt:100,yt:20,xl:"熱量（千卡）",yl:"溫度（°C）"}),pts=[];for(var h=0;h<=740;h+=5)pts.push([h,state(h).T]);P.line(pts,"var(--p2)",2.4);
   var s=state(Hs.v);P.dot(Hs.v,s.T,"var(--p1)",6);
   var cx=560,cy=170;NB.mk("rect",{x:cx-60,y:cy-70,width:120,height:130,rx:10,fill:"var(--paper)"},g,2);
   if(s.ph<=1){var n=Math.round((1-s.fr)*9);for(var i=0;i<n;i++)NB.mk("rect",{x:cx-48+(i%3)*32,y:cy+30-Math.floor(i/3)*30,width:26,height:24,rx:3,fill:"#bfe3f2"},g,1.4)}
   if(s.ph>=1&&s.ph<=3){var lv=s.ph===1?s.fr:s.ph===3?1-s.fr:1;NB.mk("rect",{x:cx-58,y:cy+58-58*lv,width:116,height:58*lv,fill:"var(--p2)","fill-opacity":.35,stroke:"none"},g)}
   if(s.ph>=3)for(var k=0;k<(s.ph===3?Math.round(s.fr*12)+2:14);k++)NB.mk("circle",{cx:cx-50+(k*29)%100,cy:cy-60+(k*17)%70,r:4,fill:"none",stroke:"var(--soft)"},g,1.4);
   NB.t(g,cx,cy-82,["固態（冰）","固液共存","液態（水）","液氣共存","氣態（水蒸氣）"][s.ph],{z:15,b:1,c:"var(--p1)"});
   eq.innerHTML="現在："+SEG[s.ph][1]+"，溫度 <b>"+NB.r(s.T,1)+" °C</b>。"+(s.ph===1||s.ph===3?"<br>正在<b>"+(s.ph===1?"熔化":"沸騰")+"</b>：吸收的熱用來改變狀態（拆開粒子間的吸引），所以<b>溫度不變</b>。":"<br>吸收的熱讓粒子運動變快，所以溫度上升。")}
  up()},
 steps:["物質吸熱或放熱，可能改變<b>溫度</b>，也可能改變<b>狀態</b>","熔化、汽化、昇華要吸熱；凝固、凝結（液化）、凝華要放熱","純物質在熔化、沸騰的過程中溫度保持不變（熔點、沸點）","熱脹冷縮：大多數物質受熱體積變大；水在 0～4 °C 反常（4 °C 時密度最大）","應用：鐵軌留伸縮縫、電線夏天比較鬆、雙金屬片做溫度開關"],
 key:["加熱曲線的「平台」= 狀態改變中，溫度不變","汽化需要的熱比熔化多很多，所以平台比較長"],
 ch:[{q:"冰水混合物持續加熱、冰還沒融完之前，溫度計讀數會怎樣？",o:["持續上升","維持 0 °C","持續下降","先降後升"],a:1},
     {q:"下列哪一個過程會「放出」熱量？",o:["冰融化成水","水蒸發","水蒸氣在冷玻璃上凝結成水珠","乾冰昇華"],a:2}]
});
