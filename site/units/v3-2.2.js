/* 第三冊 2-2 水溶液：溶解度、飽和、重量百分濃度 */
NB.unit({
 q:"泡冰紅茶時，糖加到一定程度就怎麼攪都溶不完；但泡熱紅茶時，同樣的糖卻全部溶了。這是為什麼？",
 sub:"在 100 公克的水裡一匙一匙加入溶質，改變水溫",
 tool:function(b,eq){
  var L=NB.lab,S0=[13,21,32,46,64,85,110,138,169],T=NB.slider(b,"水溫",0,80,5,20," °C",up),ad=0,v=L.stage(b,660,300,"溶解"),g=L.g(v);
  NB.btn(b,"加入 10 公克溶質",function(){ad=Math.min(200,ad+10);up()},"go");NB.btn(b,"加入 1 公克",function(){ad=Math.min(200,ad+1);up()});NB.btn(b,"倒掉重來",function(){ad=0;up()});
  function sol(t){var i=Math.min(7,Math.floor(t/10)),u=t/10-i;return S0[i]+(S0[i+1]-S0[i])*u}/* 自訂的某種鹽類（數值為示意） */
  function up(){L.clear(g);var s=sol(T.v),dis=Math.min(ad,s),left=ad-dis,lv=.55+dis/600;
   L.beaker(g,60,260,170,200,lv,"var(--p5)",{op:.12+Math.min(.55,dis/250)});
   for(var i=0;i<Math.min(60,Math.round(left/2));i++)NB.mk("circle",{cx:70+(i*37)%150,cy:252-Math.floor(i/15)*7,r:3.2,fill:"var(--paper)"},g,1.2);
   var P=L.plot(g,340,40,280,200,{x0:0,x1:80,y0:0,y1:180,xt:20,yt:40,xl:"水溫（°C）",yl:"溶解度（g／100 g 水）"});
   P.line(S0.map(function(y,i){return[i*10,y]}),"var(--p5)",2.4);P.dot(T.v,Math.min(ad,180),left>0?"var(--p1)":"var(--p3)",6);
   var c=dis/(100+dis)*100,st=ad<s-1e-9?"未飽和":"飽和";
   eq.innerHTML=T.v+" °C 時，100 g 水最多溶 <b>"+NB.r(s,1)+"</b> g。已加 "+ad+" g，溶了 "+NB.r(dis,1)+" g"+(left>0?"，杯底剩 <b>"+NB.r(left,1)+"</b> g 溶不完":"")+" → <b>"+st+"溶液</b>"+
    "<br>重量百分濃度 = 溶質 ÷ 溶液 × 100% = "+NB.r(dis,1)+" ÷ "+NB.r(100+dis,1)+" × 100% ≈ <b>"+NB.r(c,1)+"%</b>"}
  up()},
 steps:["溶液 = 溶質 + 溶劑；水是最常見的溶劑，形成的叫水溶液","溶液均勻透明、各處濃度相同，靜置也不會沉澱","<b>溶解度</b>：一定溫度下，100 g 水最多能溶解的溶質克數","溶質溶到不能再溶 → 飽和溶液；大多數固體溫度越高溶解度越大","重量百分濃度 = 溶質質量 ÷ 溶液質量 × 100%（溶液質量 = 溶質 + 溶劑）"],
 key:["溶液質量要把溶質也算進去，分母不是只有水","加熱可以讓更多固體溶解；氣體則相反，溫度越高溶解度越小"],
 ch:[{q:"把 20 公克的糖完全溶在 80 公克的水中，這杯糖水的重量百分濃度是多少 %？",a:20,u:"%",tol:.01,h:"20 ÷ (20 + 80) × 100%。"},
     {q:"一杯飽和食鹽水，杯底還有食鹽晶體。在溫度不變下再加入一些食鹽，濃度會怎樣？",o:["變大","變小","不變","先變大再變小"],a:2,h:"已經飽和，再加也溶不進去。"}]
});
