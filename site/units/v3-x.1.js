/* 第三冊 跨科：物質的分離（過濾、蒸發、蒸餾、層析、磁鐵） */
NB.unit({
 q:"沙子不小心掉進鹽水裡，要怎麼把沙子、鹽和水分開？酒精和水混在一起、黑色墨水裡藏著好幾種顏色，又要怎麼分？",
 sub:"選一種混合物，再選一種分離方法",
 tool:function(b,eq){
  var L=NB.lab,MIX=[["沙子＋食鹽水",[0,1]],["酒精＋水",[2]],["黑色水性墨水",[3]],["鐵粉＋硫粉",[4]]],ME=["過濾","蒸發","蒸餾","濾紙層析","磁鐵吸引"];
  var v=L.stage(b,660,280,"分離"),mx=NB.pick(b,"混合物",MIX.map(function(x){return x[0]}),0,up),me=NB.pick(b,"方法",ME,0,up),g=L.g(v);
  var WHY=["利用<b>顆粒大小</b>不同：不溶的沙子留在濾紙上，食鹽水穿過濾紙。","利用溶劑會<b>蒸發</b>：加熱蒸乾後，溶解的食鹽留在蒸發皿裡。","利用<b>沸點</b>不同：酒精沸點約 78 °C 先汽化，經冷凝管冷卻收集。","利用不同色素在濾紙上<b>移動速率</b>不同，分出好幾條色帶。","利用<b>磁性</b>：鐵會被磁鐵吸引，硫不會。"];
  function up(){L.clear(g);var k=me.v,ok=MIX[mx.v][1].indexOf(k)>=0;
   if(k===0){NB.mk("path",{d:"M260 40h140l-60 90v60h-20v-60z",fill:"var(--paper)"},g,2);NB.mk("path",{d:"M268 46h124l-56 82h-12z",fill:"#f1ece0"},g,1.4);if(mx.v===0)for(var i=0;i<12;i++)NB.mk("circle",{cx:300+(i*13)%60,cy:72+(i*7)%40,r:3,fill:"var(--p4b)"},g,1);L.beaker(g,280,270,100,70,.45,"var(--p2)")}
   else if(k===1){NB.mk("path",{d:"M250 150q80 60 160 0z",fill:"var(--paper)"},g,2);if(mx.v===0)for(var j=0;j<14;j++)NB.mk("rect",{x:290+(j*11)%80,y:158+(j%3)*5,width:5,height:5,fill:"#fff"},g,1);L.lamp(g,330,280,true,.8)}
   else if(k===2){NB.mk("circle",{cx:180,cy:180,r:45,fill:"var(--p2)","fill-opacity":.12},g,2);NB.mk("path",{d:"M180 135V80H360l120 90",fill:"none"},g,6);NB.mk("path",{d:"M330 80l120 90",fill:"none",stroke:"var(--p2)","stroke-opacity":.35},g,16);NB.t(g,400,105,"冷凝管",{z:12,c:"var(--soft)"});L.thermo(g,180,128,70,0,100,mx.v===1?78:100,{step:50});L.beaker(g,470,265,70,70,.3,"var(--p3)");L.lamp(g,180,280,true,.5)}
   else if(k===3){NB.mk("rect",{x:290,y:30,width:80,height:220,fill:"#fbf8f0"},g,1.6);NB.mk("path",{d:"M270 230h120",fill:"none",stroke:"var(--p2)"},g,3);var cols=mx.v===2?["#e2b33a","#d64d6b","#3a6fd6"]:["#555"];cols.forEach(function(c,i){NB.mk("ellipse",{cx:330,cy:200-i*50,rx:22,ry:10,fill:c,"fill-opacity":.75,stroke:"none"},g)})}
   else{NB.mk("path",{d:"M300 40V110a30 30 0 0 0 60 0V40h-16v70a14 14 0 0 1-28 0V40z",fill:"var(--paper)"},g,2);NB.mk("path",{d:"M300 40h16v18h-16zM344 40h16v18h-16z",fill:"var(--p1)"},g,1.4);for(var q=0;q<30;q++){var fe=q%2===0,stuck=ok&&fe;NB.mk("circle",{cx:stuck?310+(q*5)%40:240+(q*23)%180,cy:stuck?145+(q%4)*4:230+(q*7)%30,r:3.5,fill:fe?"#444":"#e8c53a"},g,1)}}
   NB.t(g,560,40,ME[k],{z:18,b:1,c:"var(--p1)"});
   eq.innerHTML=ok?"適合！"+WHY[k]+(mx.v===0?"<br>沙子＋食鹽水要分成三樣：先<b>過濾</b>出沙子，再把濾液<b>蒸發</b>得到食鹽（要回收水則用蒸餾）。":""):"這個方法不太適合分離「"+MIX[mx.v][0]+"」。想想看：兩種成分在哪一個性質上<b>不一樣</b>？"}
  up()},
 steps:["分離混合物的原則：找出成分之間<b>不同的性質</b>，例如顆粒大小、溶解度、沸點、磁性","過濾：分離不溶固體與液體（濾紙留下固體）","蒸發：從溶液中得到溶質；蒸餾：利用沸點不同分離液體，可回收溶劑","層析：利用成分在濾紙上移動速率不同，分離色素","磁鐵：分離有磁性的物質（鐵、鈷、鎳）"],
 key:["過濾無法分離食鹽和水：食鹽溶在水裡，會穿過濾紙","蒸餾時溫度計的液球放在支管口附近，量的是蒸氣溫度"],
 ch:[{q:"要從海水中得到純水，最適合的方法是什麼？",o:["過濾","蒸餾","層析","磁鐵吸引"],a:1},
     {q:"要分離黑色水性墨水中的各種色素，最適合用哪一種方法？",o:["蒸發","過濾","濾紙層析","蒸餾"],a:2}]
});
