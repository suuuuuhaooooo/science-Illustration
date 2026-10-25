/* 第四冊 3-4 酸鹼中和：滴定、pH 變化、放熱、產生鹽和水 */
NB.unit({
 q:"被蚊子叮（酸性）可以塗一點弱鹼性的藥膏，胃酸過多可以吃制酸劑。酸和鹼混在一起會發生什麼事？要加多少才剛好「中和」？",
 sub:"一滴一滴把氫氧化鈉加入鹽酸（含酚酞），看 pH 和溫度",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,290,"酸鹼中和"),add=0,g=L.g(v),cA=NB.slider(b,"鹽酸體積（0.1 M）",10,40,5,20," mL",up);
  NB.btn(b,"加 1 mL 氫氧化鈉（0.1 M）",function(){add=Math.min(60,add+1);up()},"go");NB.btn(b,"加 5 mL",function(){add=Math.min(60,add+5);up()});NB.btn(b,"重來",function(){add=0;up()});
  function pHof(x){var a=cA.v*.1,bb=x*.1,V=(cA.v+x)/1000;if(Math.abs(a-bb)<1e-9)return 7;if(a>bb){return-Math.log10((a-bb)/1000/V)}return 14+Math.log10((bb-a)/1000/V)}
  function up(){L.clear(g);var p=pHof(add),pink=p>8.2,T=25+3*Math.min(add,cA.v)/cA.v;
   NB.mk("path",{d:"M120 20v130l-6 12",fill:"none"},g,3);NB.mk("rect",{x:110,y:20,width:20,height:120,fill:"var(--p2)","fill-opacity":.25},g,1.6);
   L.beaker(g,60,270,130,100,.3+add/200,pink?"#ec5aa8":"var(--p2)",{op:pink?.5:.15});
   var P=L.plot(g,280,30,330,200,{x0:0,x1:60,y0:0,y1:14,xt:10,yt:2,xl:"加入 NaOH（mL）",yl:"pH"}),pts=[];for(var x=0;x<=60;x+=.5)pts.push([x,pHof(x)]);P.line(pts,"var(--p5)",2.2);P.dot(add,p,"var(--p1)",6);
   NB.mk("path",{d:"M"+P.X(0)+" "+P.Y(7)+"H"+P.X(60),fill:"none",stroke:"var(--soft)","stroke-dasharray":"4 4"},g,1);
   var st=Math.abs(add-cA.v)<.01?"<b>恰好中和</b>：H⁺ 和 OH⁻ 莫耳數相等，溶液是食鹽水（pH 7）":add<cA.v?"酸還有剩，溶液仍是酸性":"鹼過量了，溶液變鹼性，酚酞變紅";
   eq.innerHTML="已加 "+add+" mL NaOH，pH ≈ <b>"+NB.r(p,1)+"</b>，溫度約 "+NB.r(T,1)+" °C。"+st+"。<br>HCl + NaOH → NaCl + H₂O（H⁺ + OH⁻ → H₂O），中和反應會<b>放熱</b>。"}
  up()},
 steps:["酸和鹼反應生成<b>鹽</b>和水，稱為<b>中和反應</b>：H⁺ + OH⁻ → H₂O","中和反應是放熱反應，溶液溫度會上升","恰好中和時：酸的 H⁺ 莫耳數 = 鹼的 OH⁻ 莫耳數","滴定時可加入酚酞：酸中無色，鹼稍過量即變紅，用來判斷終點","生活應用：制酸劑中和胃酸、石灰改良酸性土壤、被蜂螫塗弱鹼"],
 key:["「鹽」是酸鹼中和產物的統稱，不只是食鹽","滴定曲線在中和點附近 pH 變化非常劇烈"],
 ch:[{q:"20 mL、0.1 M 的鹽酸，要加入多少 mL、0.1 M 的氫氧化鈉才恰好中和？",a:20,u:"mL",tol:.01,h:"兩者濃度相同，H⁺ 和 OH⁻ 莫耳數相等時體積也相等。"},
     {q:"酸鹼中和反應過程中，溶液的溫度會如何變化？",o:["下降","上升","不變","先降後升"],a:1}]
});
