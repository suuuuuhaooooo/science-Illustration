/* 第三冊 5-2 熱量與比熱：H = m × s × ΔT、加熱曲線比較、冷熱水混合 */
NB.unit({
 q:"夏天中午，沙灘的沙子燙到不能踩，海水卻還是涼涼的；同樣曬了一個早上，為什麼溫度差那麼多？",
 sub:"用同一個熱源加熱不同物質；把熱水和冷水混在一起",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["加熱比較","冷熱水混合"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var MS=[["水",1,"var(--p2)"],["沙拉油",0.5,"var(--p4)"],["沙子",0.2,"var(--p4b)"],["鋁",0.22,"#8a97a6"],["鐵",0.11,"#5f6b78"]];
  var v=L.stage(P1,640,280,"加熱曲線"),A=NB.pick(P1,"物質甲",MS.map(function(m){return m[0]}),0,up1),B=NB.pick(P1,"物質乙",MS.map(function(m){return m[0]}),2,up1),m=NB.slider(P1,"兩者質量",100,500,50,200," g",up1),t=NB.slider(P1,"加熱時間",0,10,0.5,4," 分鐘",up1),g=L.g(v),Q=400;/* 熱源每分鐘供熱 400 cal */
  function up1(){L.clear(g);var P=L.plot(g,70,30,520,210,{x0:0,x1:10,y0:20,y1:100,xt:2,yt:20,xl:"加熱時間（分鐘）",yl:"溫度（°C）"});
   [A.v,B.v].forEach(function(k,j){var s=MS[k][1],pts=[];for(var x=0;x<=10;x+=.5)pts.push([x,Math.min(100,20+Q*x/(m.v*s))]);P.line(pts,MS[k][2],j?2:3.2,j?"6 4":"");var T=Math.min(100,20+Q*t.v/(m.v*s));P.dot(t.v,T,MS[k][2],6);NB.t(g,P.X(t.v)+10,P.Y(T)+(j?14:-6),MS[k][0]+" "+NB.r(T,1)+" °C",{z:12,a:"start"})});
   var H=Q*t.v,sa=MS[A.v][1],sb=MS[B.v][1];
   eq.innerHTML="兩者吸收的熱量相同：H = "+Q+" cal/分 × "+t.v+" 分 = <b>"+H+"</b> cal<br>升溫 ΔT = H ÷ (m × s)："+MS[A.v][0]+" 升 "+NB.r(H/(m.v*sa),1)+" °C、"+MS[B.v][0]+" 升 "+NB.r(H/(m.v*sb),1)+" °C → <b>比熱越小，升溫越快</b>。"}
  var v2=L.stage(P2,640,260,"冷熱水混合"),mh=NB.slider(P2,"熱水質量",50,400,10,100," g",up2),th=NB.slider(P2,"熱水溫度",40,100,1,80," °C",up2),mc=NB.slider(P2,"冷水質量",50,400,10,300," g",up2),tc=NB.slider(P2,"冷水溫度",0,30,1,20," °C",up2),g2=L.g(v2);
  function up2(){L.clear(g2);var T=(mh.v*th.v+mc.v*tc.v)/(mh.v+mc.v);
   L.beaker(g2,40,220,110,160,mh.v/400*.9,"var(--p1)");NB.t(g2,95,245,th.v+" °C",{z:13,c:"var(--p1)"});L.beaker(g2,200,220,110,160,mc.v/400*.9,"var(--p2)");NB.t(g2,255,245,tc.v+" °C",{z:13,c:"var(--p2)"});
   L.arrow(g2,330,140,380,140,"var(--ink)",2,10);L.beaker(g2,400,220,170,180,(mh.v+mc.v)/800*.95,"var(--p5)");NB.t(g2,485,245,"混合後 "+NB.r(T,1)+" °C",{z:14,b:1});
   eq.innerHTML="熱水放出的熱 = 冷水吸收的熱（不計散失）：<br>"+mh.v+" × 1 × ("+th.v+" − T) = "+mc.v+" × 1 × (T − "+tc.v+") → T = <b>"+NB.r(T,1)+"</b> °C"}
  up1()},
 steps:["熱是能量，從高溫物體傳向低溫物體，直到溫度相同（熱平衡）","熱量單位：卡（cal）；1 卡 = 使 1 g 水升高 1 °C 所需的熱量；1 卡 ≈ 4.2 焦耳","<b>比熱</b> s：使 1 g 物質升高 1 °C 所需的熱量（cal/g·°C）；水的比熱是 1，比大多數物質大","熱量公式：H = m × s × ΔT","混合：放熱 = 吸熱，例如 m₁(T₁ − T) = m₂(T − T₂)"],
 key:["吸收相同熱量時：比熱小、質量小的物體升溫多","水的比熱大，所以海邊氣溫變化比內陸小、水適合當冷卻劑"],
 ch:[{q:"要把 200 g 的水從 20 °C 加熱到 50 °C，需要多少卡的熱量？",a:6000,u:"cal",tol:.5,h:"H = 200 × 1 × (50 − 20)。"},
     {q:"100 g、80 °C 的熱水和 100 g、20 °C 的冷水混合（不計熱散失），最後溫度是幾 °C？",a:50,u:"°C",tol:.01}]
});
