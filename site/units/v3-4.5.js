/* 第三冊 4-5 光與顏色：色散、色光三原色混合、色光照在色紙上 */
NB.unit({
 q:"在舞台上，紅色的衣服被綠色燈光照到，竟然變成黑色！物體的顏色到底是物體本身的，還是光給的？",
 sub:"混合三原色光；換燈光、換物體的顏色",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["色光混合","燈光照物體"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,270,"色光三原色"),R=NB.slider(P1,"紅光",0,255,15,255,"",up1),G=NB.slider(P1,"綠光",0,255,15,255,"",up1),B=NB.slider(P1,"藍光",0,255,15,0,"",up1),g=L.g(v);
  function up1(){L.clear(g);NB.mk("rect",{x:0,y:0,width:640,height:270,fill:"#0b0f14",stroke:"none"},g);
   var cs=[[250,110,"rgb("+R.v+",0,0)"],[330,110,"rgb(0,"+G.v+",0)"],[290,175,"rgb(0,0,"+B.v+")"]],gg=NB.s("g",{},g);gg.style.isolation="isolate";
   cs.forEach(function(c){var e=NB.s("circle",{cx:c[0],cy:c[1],r:78,fill:c[2]},gg);e.style.mixBlendMode="screen"});
   NB.mk("rect",{x:500,y:80,width:100,height:100,rx:12,fill:"rgb("+R.v+","+G.v+","+B.v+")",stroke:"#fff"},g,1.5);NB.t(g,550,205,"混合後",{z:13,c:"#fff"});
   var nm=R.v>200&&G.v>200&&B.v>200?"白光":R.v>200&&G.v>200&&B.v<60?"黃光":R.v>200&&B.v>200&&G.v<60?"洋紅光":G.v>200&&B.v>200&&R.v<60?"青光":R.v+G.v+B.v===0?"沒有光（黑）":"";
   eq.innerHTML="紅 "+R.v+"、綠 "+G.v+"、藍 "+B.v+(nm?" → <b>"+nm+"</b>":"")+"。<br>色光的三原色是<b>紅、綠、藍</b>：紅＋綠＝黃、紅＋藍＝洋紅、綠＋藍＝青、三色全加＝白（手機螢幕就是這樣顯示顏色）。"}
  var v2=L.stage(P2,640,270,"燈光照物體"),light=NB.pick(P2,"燈光",["白光","紅光","綠光","藍光"],2,up2),obj=NB.pick(P2,"物體",["紅色蘋果","綠色葉子","藍色衣服","白紙","黑紙"],0,up2),g2=L.g(v2);
  var LC=[[1,1,1],[1,0,0],[0,1,0],[0,0,1]],OC=[[1,0,0],[0,1,0],[0,0,1],[1,1,1],[0,0,0]],ON=["紅","綠","藍","白","黑"];
  function up2(){L.clear(g2);var l=LC[light.v],o=OC[obj.v],c=[l[0]*o[0],l[1]*o[1],l[2]*o[2]],col="rgb("+c.map(function(x){return Math.round(x*235+10)}).join(",")+")",lcol="rgb("+l.map(function(x){return x*255}).join(",")+")";
   NB.mk("rect",{x:0,y:0,width:640,height:270,fill:"#14181f",stroke:"none"},g2);NB.mk("path",{d:"M70 40l40-20 20 30-40 20z",fill:"#666"},g2,1.5);NB.mk("path",{d:"M120 50L380 120L380 250L80 70Z",fill:lcol,"fill-opacity":.18,stroke:"none"},g2);
   if(obj.v===0){NB.mk("circle",{cx:380,cy:185,r:55,fill:col,stroke:"#8a94a6"},g2,2);NB.mk("path",{d:"M380 132q4-18 18-24",fill:"none",stroke:"#7a5236"},g2,4)}
   else if(obj.v===1)NB.mk("path",{d:"M320 200q60-110 130-70q-40 100-130 70z",fill:col,stroke:"#8a94a6"},g2,2);
   else NB.mk("rect",{x:320,y:130,width:120,height:110,rx:obj.v===2?20:2,fill:col,stroke:"#8a94a6"},g2,2);
   var seen=c[0]+c[1]+c[2]===0?"黑色":c[0]&&c[1]&&c[2]?"白色":c[0]?"紅色":c[1]?"綠色":"藍色";NB.t(g2,540,140,"看起來是",{z:14,c:"#cfd8ea"});NB.t(g2,540,170,seen,{z:22,c:"#fff",b:1});
   eq.innerHTML=ON[obj.v]+"色物體只<b>反射"+ON[obj.v]+"光</b>"+(obj.v===3?"（白色反射所有色光）":obj.v===4?"（黑色吸收所有色光）":"、吸收其他色光")+"。照"+["白","紅","綠","藍"][light.v]+"光時 → 看起來是<b>"+seen+"</b>。"}
  up1()},
 steps:["白光（太陽光）經過三稜鏡會分散成紅、橙、黃、綠、藍、靛、紫等色光，叫<b>色散</b>；彩虹也是色散","色光三原色：紅、綠、藍；三種色光適當混合可以得到各種顏色，全部混合成白光","不透明物體的顏色＝它<b>反射</b>的色光；其他色光被吸收","白色物體反射所有色光，黑色物體吸收所有色光","透明物體（濾光片）的顏色＝它<b>讓哪種色光通過</b>"],
 key:["紅蘋果在綠光下是黑的：沒有紅光可以反射","色光混合越混越亮（加色）；顏料混合越混越暗（減色），兩者不一樣"],
 ch:[{q:"在只有藍光照射的房間裡，一張白紙看起來是什麼顏色？",o:["白色","藍色","黑色","黃色"],a:1,h:"白紙會反射照到它的所有色光。"},
     {q:"紅光和綠光照在白色牆上同一處，看起來是什麼顏色？",o:["咖啡色","白色","黃色","藍色"],a:2}]
});
