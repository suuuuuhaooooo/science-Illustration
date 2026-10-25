/* 第五冊 2-2 牛頓第二運動定律：F = m a */
NB.unit({
 q:"推空的購物車很輕鬆就加速，推裝滿的購物車就很吃力。力、質量和加速度之間有什麼關係？",
 sub:"改變拉力和質量，看小車的加速度",
 tool:function(b,eq){
  var L=NB.lab,F=NB.slider(b,"合力",0,20,1,10," N",up),m=NB.slider(b,"小車質量",1,10,1,2," kg",up),v=L.stage(b,660,280,"F=ma"),g=L.g(v),t=0;
  function up(){t=0}
  L.loop(v,function(dt){t+=L.reduce?0:dt/1000;if(t>3)t=0;L.clear(g);var a=F.v/m.v,x=Math.min(440,.5*a*t*t*20);NB.mk("path",{d:"M40 100H640",fill:"none"},g,3);
   var w=30+m.v*6;NB.mk("rect",{x:60+x,y:100-w*.6-8,width:w,height:w*.6,rx:4,fill:"var(--p2)","fill-opacity":.7},g,1.8);NB.t(g,60+x+w/2,100-w*.3-3,m.v+" kg",{z:12,b:1});if(F.v)L.arrow(g,60+x+w,100-w*.3-8,60+x+w+F.v*4,100-w*.3-8,"var(--p1)",3,10);
   var P=L.plot(g,90,140,480,110,{x0:0,x1:20,y0:0,y1:20,xt:5,yt:5,xl:"合力 F（N）",yl:"加速度 a（m/s²）"});P.line([[0,0],[20,20/m.v]],"var(--p2)",2.2);P.dot(F.v,a,"var(--p1)",6)});
  function txt(){var a=F.v/m.v;eq.innerHTML="a = F ÷ m = "+F.v+" ÷ "+m.v+" = <b>"+NB.r(a,2)+"</b> m/s²<br>質量固定時，加速度和合力<b>成正比</b>；合力固定時，加速度和質量<b>成反比</b>。1 牛頓（N）= 使 1 kg 物體產生 1 m/s² 加速度的力。"}
  F.el.addEventListener("input",txt);m.el.addEventListener("input",txt);txt()},
 steps:["<b>牛頓第二運動定律</b>：物體的加速度與所受合力成正比、與質量成反比，方向和合力相同","公式：F = m × a；單位：牛頓（N）= kg·m/s²","重量是地球對物體的引力：W = m × g，1 kgw ≈ 9.8 N","合力為零時 a = 0，回到第一定律的情形","同樣的力推質量大的物體，加速度小（慣性大）"],
 key:["F 是「合力」，要把摩擦力等其他力一起算進去","質量（kg）不隨地點改變；重量（N 或 kgw）會隨重力加速度改變"],
 ch:[{q:"用 12 N 的合力推 4 kg 的物體，加速度是多少 m/s²？",a:3,u:"m/s²",tol:.01},
     {q:"要使 50 kg 的物體產生 2 m/s² 的加速度，需要多少牛頓的合力？",a:100,u:"N",tol:.01}]
});
