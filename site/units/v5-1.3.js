/* 第五冊 1-3 速率與速度：x–t 圖、平均速率與平均速度 */
NB.unit({
 q:"高鐵的告示寫「時速 300 公里」，但從台北到左營要停好幾站，平均起來沒有那麼快。「速率」和「速度」有什麼不一樣？",
 sub:"調整兩台車的速度，看位置—時間圖的斜率",
 tool:function(b,eq){
  var L=NB.lab,va=NB.slider(b,"甲車速度",-10,20,1,10," m/s",up),vb=NB.slider(b,"乙車速度",-10,20,1,4," m/s",up),t=NB.slider(b,"時間",0,10,.5,5," s",up),v=L.stage(b,660,300,"x-t 圖"),g=L.g(v);
  function up(){L.clear(g);NB.mk("path",{d:"M40 40H620",fill:"none",stroke:"var(--soft)"},g,6);var X=function(x){return 200+x*2};[[va.v,"var(--p1)","甲",30],[vb.v,"var(--p2)","乙",52]].forEach(function(c){var x=c[0]*t.v;NB.mk("rect",{x:X(x)-14,y:c[3]-8,width:28,height:14,rx:4,fill:c[1]},g,1.4);NB.t(g,X(x),c[3]+3,c[2],{z:10,c:"#fff",b:1})});NB.mk("path",{d:"M200 22v34",fill:"none",stroke:"var(--soft)","stroke-dasharray":"3 3"},g,1);NB.t(g,200,18,"起點",{z:10,c:"var(--soft)"});
   var P=L.plot(g,80,90,520,170,{x0:0,x1:10,y0:-100,y1:200,xt:2,yt:50,xl:"時間 t（s）",yl:"位置 x（m）"});P.line([[0,0],[10,va.v*10]],"var(--p1)",2.4);P.line([[0,0],[10,vb.v*10]],"var(--p2)",2.4);P.dot(t.v,va.v*t.v,"var(--p1)",5);P.dot(t.v,vb.v*t.v,"var(--p2)",5);
   eq.innerHTML="x–t 圖的<b>斜率 = 速度</b>：甲 "+va.v+" m/s、乙 "+vb.v+" m/s（負號表示往反方向）。"+t.v+" 秒時甲在 "+va.v*t.v+" m、乙在 "+vb.v*t.v+" m，相距 <b>"+Math.abs((va.v-vb.v)*t.v)+"</b> m。<br>速率只看快慢（"+Math.abs(va.v)+"、"+Math.abs(vb.v)+" m/s），速度還要加上方向。"}
  up()},
 steps:["<b>平均速率</b> = 路徑長 ÷ 時間；<b>平均速度</b> = 位移 ÷ 時間（有方向）","單位：m/s、km/h；1 m/s = 3.6 km/h","瞬時速率：極短時間內的速率，例如汽車儀表板顯示的數字","等速度運動：速度大小和方向都不變，x–t 圖是一條斜直線，斜率就是速度","斜率越陡速度越快；水平線表示靜止；斜率為負表示往反方向運動"],
 key:["繞一圈回到起點：平均速度 0，平均速率不為 0","km/h 換成 m/s：除以 3.6"],
 ch:[{q:"72 km/h 等於多少 m/s？",a:20,u:"m/s",tol:.01,h:"72 ÷ 3.6。"},
     {q:"小華跑操場一圈 400 m 回到起點，花了 80 秒，他的平均速度大小是多少 m/s？",a:0,u:"m/s",tol:.001,h:"位移是多少？"}]
});
