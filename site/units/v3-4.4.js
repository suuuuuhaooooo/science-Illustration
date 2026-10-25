/* 第三冊 4-4 光學儀器：眼睛、近視與遠視的矯正、放大鏡與相機 */
NB.unit({
 q:"小安上課看黑板越來越模糊，配了一副眼鏡就清楚了；爺爺看報紙要拿得很遠，戴上老花眼鏡才看得清。兩副眼鏡用的透鏡一樣嗎？",
 sub:"選一種眼睛，再選一種鏡片，看光線有沒有聚在視網膜上",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,280,"眼睛成像"),eye=NB.pick(b,"眼睛",["正常眼","近視眼","遠視眼"],1,up),lens=NB.pick(b,"眼鏡",["不戴","凹透鏡","凸透鏡"],0,up),g=L.g(v);
  function up(){L.clear(g);var cx=420,cy=140,ret=520,len=[0,40,-36][eye.v],focus0=ret-len,corr=[0,60,-60][lens.v],fpt=focus0+corr*1.1;
   NB.mk("ellipse",{cx:cx+50,cy:cy,rx:110,ry:100,fill:"var(--paper)"},g,2.4);NB.mk("path",{d:"M"+ret+" "+(cy-70)+"q30 70 0 140",fill:"none",stroke:"var(--p1)"},g,4);NB.t(g,ret+20,cy-80,"視網膜",{z:12,c:"var(--p1)"});
   NB.mk("path",{d:"M"+(cx-38)+" "+(cy-40)+"q-22 40 0 80q22-40 0-80z",fill:"var(--p2)","fill-opacity":.3},g,2);NB.t(g,cx-38,cy-50,"水晶體",{z:12,c:"var(--soft)"});
   if(lens.v){var gx=cx-120;if(lens.v===1)NB.mk("path",{d:"M"+(gx-10)+" "+(cy-60)+"h20q-12 60 0 120h-20q12-60 0-120z",fill:"var(--p3)","fill-opacity":.25},g,2);else NB.mk("path",{d:"M"+gx+" "+(cy-60)+"q20 60 0 120q-20-60 0-120z",fill:"var(--p4)","fill-opacity":.3},g,2)}
   [-30,30].forEach(function(d){var y0=cy+d;L.ray(g,60,y0,cx-38,y0*(1)+(lens.v===1?d*.25:lens.v===2?-d*.2:0),"var(--p4b)",2);
    var y1=y0+(lens.v===1?d*.25:lens.v===2?-d*.2:0),sl=(cy-y1)/(fpt-(cx-38));var xe=Math.max(fpt,ret)+10;L.ray(g,cx-38,y1,xe,y1+sl*(xe-(cx-38)),"var(--p4b)",2)});
   NB.mk("circle",{cx:fpt,cy:cy,r:5,fill:"var(--p4)"},g,1.5);
   var ok=Math.abs(fpt-ret)<12;var nm=["正常眼","近視眼","遠視眼"][eye.v];
   eq.innerHTML=nm+(lens.v?"＋"+["","凹透鏡","凸透鏡"][lens.v]:"")+"：遠方的光聚在視網膜"+(fpt<ret-11?"<b>前方</b>，看起來模糊":fpt>ret+11?"<b>後方</b>，看起來模糊":"<b>上</b>，看得清楚！")+
    (eye.v===1?"<br>近視：眼球太長或水晶體太凸，要用<b>凹透鏡</b>先把光發散。":eye.v===2?"<br>遠視：成像落在視網膜後，要用<b>凸透鏡</b>幫忙會聚。":"")}
  up()},
 steps:["眼睛像一台相機：水晶體相當於凸透鏡，視網膜相當於底片（感光元件），成倒立縮小的實像","睫狀肌改變水晶體的厚薄來調焦；瞳孔大小調節進光量","<b>近視</b>：成像在視網膜前 → 戴<b>凹透鏡</b>矯正","<b>遠視</b>（含老花）：成像在視網膜後 → 戴<b>凸透鏡</b>矯正","放大鏡：物體放在凸透鏡焦點內，成正立放大虛像；相機：物在 2 倍焦距外，成倒立縮小實像"],
 key:["近視凹、遠視凸","相機和眼睛都成倒立縮小的實像，是大腦把影像「轉正」"],
 ch:[{q:"小安看遠處模糊、看近處清楚，他應該配戴哪一種鏡片？",o:["凸透鏡","凹透鏡","平面玻璃","稜鏡"],a:1},
     {q:"用放大鏡看書上的小字時，書本應該放在放大鏡的哪個位置？",o:["兩倍焦距以外","焦點和兩倍焦距之間","焦點以內","剛好在焦點上"],a:2}]
});
