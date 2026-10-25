/* 第四冊 5-3 肥皂與清潔劑：皂化反應、肥皂分子（親水端、親油端）、微胞去污、硬水 */
NB.unit({
 q:"盤子上的油光用清水怎麼沖都沖不掉，加一點肥皂就輕鬆洗淨。肥皂分子到底對油做了什麼？",
 sub:"加入肥皂，看肥皂分子怎麼把油包起來帶走",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,260,"肥皂去污"),sp=NB.slider(b,"加入的肥皂量",0,100,10,0," %",up),hw=NB.pick(b,"用水",["軟水（自來水）","硬水（含大量鈣、鎂離子）"],0,up),g=L.g(v),t=0;
  function up(){eq.innerHTML=sp.v===0?"只有水：油不溶於水，水分子沒辦法把油帶走。":hw.v?"硬水裡的 Ca²⁺、Mg²⁺ 和肥皂結合成<b>不溶的沉澱（皂垢）</b>，肥皂被消耗掉，起泡少、去污差。合成清潔劑不怕硬水。":"肥皂分子的<b>親油端</b>（長長的碳鏈）鑽進油滴，<b>親水端</b>朝外和水結合，把油包成一顆顆小球（微胞），再被水沖走。"}
  L.loop(v,function(dt){t+=L.reduce?0:dt;L.clear(g);NB.mk("rect",{x:20,y:20,width:620,height:220,rx:12,fill:"var(--p2)","fill-opacity":.1},g,1.6);NB.mk("path",{d:"M40 230H620",fill:"none",stroke:"var(--soft)"},g,6);
   var eff=hw.v?sp.v*.2:sp.v,nm=Math.round(eff/100*4),lift=nm?Math.min(1,t/3000):0;
   for(var k=0;k<4;k++){var cx=110+k*140,cy=k<nm?150-lift*50+Math.sin(t/600+k)*4:210,r=26;NB.mk("circle",{cx:cx,cy:cy,r:r,fill:"var(--p4)","fill-opacity":.75},g,1.4);
    if(k<nm)for(var j=0;j<12;j++){var a=j/12*Math.PI*2,x1=cx+(r-6)*Math.cos(a),y1=cy+(r-6)*Math.sin(a),x2=cx+(r+16)*Math.cos(a),y2=cy+(r+16)*Math.sin(a);NB.mk("path",{d:"M"+x1+" "+y1+"L"+x2+" "+y2,fill:"none",stroke:"var(--soft)"},g,1.6);NB.mk("circle",{cx:x2,cy:y2,r:5,fill:"var(--p1)"},g,1)}}
   if(hw.v&&sp.v)for(var q=0;q<Math.round(sp.v/8);q++)NB.mk("rect",{x:60+(q*47)%540,y:222-(q%3)*4,width:8,height:5,fill:"#eee"},g,1);
   NB.mk("path",{d:"M520 40h60",fill:"none",stroke:"var(--soft)"},g,1.6);NB.mk("circle",{cx:585,cy:40,r:6,fill:"var(--p1)"},g,1);NB.t(g,550,62,"親油端　親水端",{z:11,c:"var(--soft)"})});
  up()},
 steps:["<b>皂化反應</b>：油脂 + 氫氧化鈉（強鹼）→ 肥皂（脂肪酸鈉）+ 甘油","肥皂分子一端是長長的碳鏈（<b>親油端</b>），另一端帶電（<b>親水端</b>）","去污原理：親油端鑽入油污，親水端朝外，形成微胞，油污就能隨水沖走","肥皂水呈弱鹼性；在硬水中會和鈣、鎂離子形成沉澱，降低去污力","合成清潔劑在硬水中也能使用，但有些含磷配方會造成水質優養化"],
 key:["親油（疏水）端在內、親水端在外","製肥皂時加入飽和食鹽水，可使肥皂析出（鹽析）"],
 ch:[{q:"肥皂分子能去除油污，是因為它具有什麼結構？",o:["只有親水端","只有親油端","同時具有親水端和親油端","含有大量氧氣"],a:2},
     {q:"油脂加入氫氧化鈉溶液共煮，生成肥皂和哪一種物質？",o:["酒精","甘油","醋酸","葡萄糖"],a:1}]
});
