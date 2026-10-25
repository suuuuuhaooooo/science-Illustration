/* 第四冊 6-4 浮力：阿基米德原理、彈簧秤讀數、沉浮 */
NB.unit({
 q:"在游泳池裡，同學可以輕鬆把你抱起來；大鐵船浮在海上，一小顆鐵釘卻會沉下去。水到底給了東西多少「往上推」的力？",
 sub:"把物體慢慢放進液體，看彈簧秤讀數和溢出的水",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,300,"浮力"),dep=NB.slider(b,"沒入液體的深度",0,10,.5,0," cm",up),M=NB.pick(b,"物體（體積 100 cm³）",["鋁塊（270 gw）","鐵塊（790 gw）","木塊（50 gw）"],0,up),liq=NB.pick(b,"液體",["水（1）","鹽水（1.2）"],0,up),g=L.g(v);
  function up(){L.clear(g);var W=[270,790,50][M.v],d=[1,1.2][liq.v],h=dep.v,Vin=100*h/10,B=Vin*d,float=W<=100*d,floatDepth=W/(d*10),hh=float?Math.min(h,floatDepth):h,Vsub=100*hh/10,Bf=Vsub*d,read=Math.max(0,W-Bf);
   NB.mk("rect",{x:200,y:150,width:220,height:130,fill:liq.v?"var(--p3)":"var(--p2)","fill-opacity":.18},g,2);NB.mk("path",{d:"M420 160h40v12",fill:"none"},g,2);
   var top=150-60+hh*6+(float&&h>floatDepth?0:0);NB.mk("path",{d:"M310 20V"+(top),fill:"none",stroke:"var(--soft)"},g,1.4);
   NB.mk("rect",{x:290,y:12,width:40,height:46,rx:6,fill:"var(--paper)"},g,1.8);NB.t(g,310,40,NB.r(read,0),{z:12,b:1});NB.t(g,310,72,"彈簧秤（gw）",{z:11,c:"var(--soft)"});
   NB.mk("rect",{x:280,y:top,width:60,height:60,fill:["#9aa7b4","#6b7684","#c99a5a"][M.v]},g,2);
   L.beaker(g,440,290,60,50,Math.min(1,Bf/d/150),liq.v?"var(--p3)":"var(--p2)",{op:.4,noTicks:true});NB.t(g,470,232,"溢出 "+NB.r(Vsub,0)+" cm³",{z:11,c:"var(--soft)"});
   if(Bf>0)L.arrow(g,350,top+50,350,top+50-Math.min(80,Bf/3),"var(--p3)",2.4,9);
   eq.innerHTML="物重 "+W+" gw，排開液體 "+NB.r(Vsub,0)+" cm³ → 浮力 = 排開體積 × 液體密度 = <b>"+NB.r(Bf,0)+"</b> gw<br>彈簧秤讀數 = 物重 − 浮力 = <b>"+NB.r(read,0)+"</b> gw"+(float&&h>=floatDepth?"。木塊<b>浮在水面</b>：浮力 = 物重，只沒入 "+NB.r(floatDepth,1)+" cm。":h>=10?"。完全沒入後，再往下浮力也不再增加。":"")}
  up()},
 steps:["<b>浮力</b>：液體（或氣體）對物體向上的力","阿基米德原理：浮力 = 物體排開液體的重量 = 排開體積 × 液體密度","物體在液體中，彈簧秤讀數變小：視重 = 物重 − 浮力","完全沒入後，排開體積不再變，浮力也不再隨深度改變","沉浮：物體密度 > 液體密度則下沉；小於則上浮，靜止漂浮時浮力 = 物重"],
 key:["浮力只和「排開的體積」與「液體密度」有關，和物體多重無關","鐵船浮得起來：做成中空，排開大量的水"],
 ch:[{q:"體積 50 cm³ 的石頭完全沒入水中（密度 1 g/cm³），受到的浮力是多少 gw？",a:50,u:"gw",tol:.01,h:"浮力 = 排開體積 × 液體密度。"},
     {q:"一塊 200 gw 的金屬完全沒入水中時，彈簧秤讀數為 150 gw，它受到的浮力是多少 gw？",a:50,u:"gw",tol:.01}]
});
