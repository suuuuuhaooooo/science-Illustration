/* 第四冊 6-3 壓力：P = F ÷ A、液體壓力 P = h × d、大氣壓力 */
NB.unit({
 q:"同一塊磚頭，平放、側放、立放，對地面的「壓力」一樣嗎？潛水越深耳朵越痛，又是為什麼？",
 sub:"換磚頭的擺法；改變水深與液體",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["固體壓力","液體壓力"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var o=NB.pick(P1,"磚頭擺法",["平放","側放","立放"],0,up1),v=L.stage(P1,640,240,"磚頭"),g=L.g(v),D=[[20,10,5],[20,5,10],[10,5,20]],W=2000;/* 磚重 2000 gw，尺寸 20×10×5 cm */
  function up1(){L.clear(g);var d=D[o.v],k=6,x=320-d[0]*k/2,y=200-d[2]*k;NB.mk("path",{d:"M40 200H600",fill:"none"},g,2.4);
   NB.mk("rect",{x:x,y:y,width:d[0]*k,height:d[2]*k,fill:"#c46a4a","fill-opacity":.8},g,2);NB.mk("path",{d:"M"+x+" "+y+"l"+d[1]*2.2+" -"+d[1]*2.2+"h"+d[0]*k+"v"+d[2]*k+"l-"+d[1]*2.2+" "+d[1]*2.2,fill:"#e08a6a","fill-opacity":.7},g,2);
   var A=d[0]*d[1],P=W/A;for(var i=0;i<6;i++)L.arrow(g,x+8+i*(d[0]*k-16)/5,200,x+8+i*(d[0]*k-16)/5,200+Math.min(30,P*.6),"var(--p1)",1.6,6);
   eq.innerHTML="接觸面積 "+d[0]+" × "+d[1]+" = "+A+" cm²，壓力 P = F ÷ A = "+W+" ÷ "+A+" = <b>"+NB.r(P,1)+"</b> gw/cm²<br>重量（正向力）一樣，接觸面積越小，壓力越大。"}
  var h=NB.slider(P2,"深度",0,100,5,40," cm",up2),liq=NB.pick(P2,"液體",["水（1 g/cm³）","食鹽水（1.2 g/cm³）","酒精（0.8 g/cm³）"],0,up2),v2=L.stage(P2,640,260,"液體壓力"),g2=L.g(v2);
  function up2(){L.clear(g2);var d=[1,1.2,.8][liq.v],P=h.v*d;NB.mk("rect",{x:120,y:30,width:240,height:220,fill:["var(--p2)","var(--p3)","var(--p5)"][liq.v],"fill-opacity":.18},g2,2);
   var y=30+h.v*2.2;NB.mk("circle",{cx:240,cy:y,r:7,fill:"var(--p1)"},g2,1.4);[[0,-1],[1,0],[0,1],[-1,0]].forEach(function(q){L.arrow(g2,240+q[0]*10,y+q[1]*10,240+q[0]*(14+P*.3),y+q[1]*(14+P*.3),"var(--p1)",1.6,6)});
   L.arrow(g2,400,30,400,y,"var(--soft)",1.4,7);NB.t(g2,410,(30+y)/2,"h = "+h.v+" cm",{z:13,a:"start"});
   eq.innerHTML="液體壓力 P = 深度 × 密度 = "+h.v+" × "+d+" = <b>"+NB.r(P,1)+"</b> gw/cm²（不含大氣壓力）<br>同一深度，各方向的壓力都相等；越深、液體密度越大，壓力越大，和容器形狀無關。"}
  up1()},
 steps:["<b>壓力</b> = 垂直作用力 ÷ 受力面積：P = F ÷ A，單位 gw/cm²、kgw/m²，國際單位帕（Pa = N/m²）","同樣的力，面積越小壓力越大：刀磨利、圖釘尖；面積大壓力小：雪鞋、坦克履帶","液體壓力 P = h × d（深度 × 液體密度），同深度各方向壓力相等，和容器形狀無關","連通管：靜止時各管液面等高；帕斯卡原理：密閉液體一處受壓，壓力等量傳到各處","<b>大氣壓力</b>：1 大氣壓 ≈ 76 cmHg ≈ 1033.6 gw/cm²；托里切利用水銀柱測出"],
 key:["深度 h 從液面往下量","高山上大氣壓力較小，水的沸點較低"],
 ch:[{q:"重 3000 gw 的木箱，底面積 150 cm²，對地面的壓力是多少 gw/cm²？",a:20,u:"gw/cm²",tol:.01,h:"P = F ÷ A。"},
     {q:"水深 30 cm 處，水所造成的壓力是多少 gw/cm²？（水的密度 1 g/cm³）",a:30,u:"gw/cm²",tol:.01}]
});
