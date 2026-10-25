/* 第四冊 6-2 摩擦力：靜摩擦力、最大靜摩擦力、動摩擦力 */
NB.unit({
 q:"推一台很重的書櫃，一開始怎麼推都不動，用力到某個程度它突然滑了出去，之後推起來反而比較輕鬆。為什麼？",
 sub:"慢慢加大拉力，看木塊什麼時候開始滑動；換接觸面、加重量",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,300,"摩擦力"),F=NB.slider(b,"拉力",0,12,.5,0," kgw",up),sf=NB.pick(b,"接觸面",["玻璃（光滑）","木板","砂紙（粗糙）"],1,function(){mv=false;up()}),Wt=NB.slider(b,"木塊重量",2,10,1,5," kgw",function(){mv=false;up()}),g=L.g(v),mv=false;
  function up(){L.clear(g);var mu=[.15,.4,.7][sf.v],fsmax=mu*1.25*Wt.v,fk=mu*Wt.v;if(F.v>fsmax)mv=true;if(F.v<fk)mv=false;var f=mv?fk:Math.min(F.v,fsmax);
   var gy=110;NB.mk("rect",{x:40,y:gy,width:580,height:14,fill:["#cfe6f2","#d8b48a","#b9a68c"][sf.v]},g,1.6);var bx=mv?250:210,bh=24+Wt.v*3;NB.mk("rect",{x:bx,y:gy-bh,width:90,height:bh,rx:4,fill:"var(--p4b)","fill-opacity":.8},g,2);
   if(F.v)L.arrow(g,bx+90,gy-bh/2,bx+90+F.v*14,gy-bh/2,"var(--p1)",3,10);if(f)L.arrow(g,bx,gy-3,bx-f*14,gy-3,"var(--p2)",3,10);
   NB.t(g,bx+90+F.v*7,gy-bh/2-10,F.v?"拉力 "+F.v:"",{z:12,c:"var(--p1)"});if(f)NB.t(g,bx-f*7,gy+28,"摩擦力 "+NB.r(f,2),{z:12,c:"var(--p2)"});
   var G=L.plot(g,100,185,440,80,{x0:0,x1:12,y0:0,y1:9,xt:2,yt:3,xl:"拉力（kgw）",yl:"摩擦力（kgw）"});G.line([[0,0],[Math.min(12,fsmax),Math.min(12,fsmax)]],"var(--p2)",2.2);if(fsmax<12)G.line([[fsmax,fsmax],[fsmax,fk],[12,fk]],"var(--p2)",2.2,"5 4");G.dot(F.v,f,"var(--p1)",6);
   eq.innerHTML=(mv?"木塊<b>滑動</b>中：受<b>動摩擦力</b> "+NB.r(fk,2)+" kgw（大小幾乎固定，比最大靜摩擦力小）。":F.v===0?"沒有拉力，也就沒有摩擦力。":"木塊<b>靜止</b>：靜摩擦力 = 拉力 = "+NB.r(f,2)+" kgw（會隨拉力變大）。")+"<br>最大靜摩擦力約 "+NB.r(fsmax,2)+" kgw：接觸面越粗糙、壓在接觸面上的力（重量）越大，摩擦力越大。"}
  up()},
 steps:["摩擦力：兩物體接觸面之間阻礙相對運動的力，方向和運動（或運動趨勢）相反","<b>靜摩擦力</b>：物體靜止時，大小等於外力，會隨外力增加","<b>最大靜摩擦力</b>：物體將要開始滑動時的靜摩擦力","<b>動摩擦力</b>：物體滑動時的摩擦力，大小固定，通常小於最大靜摩擦力","摩擦力和接觸面性質、正向力（垂直壓在接觸面的力）有關，和接觸面積大小幾乎無關"],
 key:["增加摩擦：鞋底刻紋、輪胎紋路；減少摩擦：潤滑油、滾珠軸承、氣墊","滾動摩擦通常比滑動摩擦小很多"],
 ch:[{q:"用 3 kgw 的力水平推一個箱子，箱子靜止不動，此時箱子受到的靜摩擦力是多少 kgw？",a:3,u:"kgw",tol:.01,h:"靜止 → 力平衡。"},
     {q:"下列哪一個做法是為了「減少」摩擦力？",o:["球鞋底的紋路","在門的鉸鏈加潤滑油","雪地輪胎加鏈條","下雨天在樓梯貼止滑條"],a:1}]
});
