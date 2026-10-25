/* 第五冊 3-2 動能、位能與能量守恆：雲霄飛車 */
NB.unit({
 q:"雲霄飛車沒有馬達推，卻能從高處衝下來、再爬上下一個坡。它的速度從哪裡來？為什麼第二個坡一定要比第一個低？",
 sub:"拖動車子的位置，看動能、位能怎麼互相轉換",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,300,"能量守恆"),fr=NB.pick(b,"軌道",["沒有摩擦","有摩擦（會變熱）"],0,up),m=NB.slider(b,"車的質量",100,400,50,200," kg",up),p=NB.slider(b,"車的位置",0,100,1,0," %",up),g=L.g(v);
  function H(u){return 30*(1+Math.cos(u*Math.PI*2.2))*(1-u*.25)+4}/* 高度（m） */
  function up(){L.clear(g);var pts="";for(var i=0;i<=100;i++){var u=i/100;pts+=(i?"L":"M")+(30+u*420)+" "+(250-H(u)*3)}NB.mk("path",{d:pts,fill:"none"},g,3);
   var u=p.v/100,h=H(u),h0=H(0),gx=9.8,E0=m.v*gx*h0,U=m.v*gx*h,lost=fr.v?E0*.25*u:0,K=Math.max(0,E0-U-lost),vel=Math.sqrt(2*K/m.v);
   var cx=30+u*420,cy=250-h*3;NB.mk("circle",{cx:cx,cy:cy-9,r:9,fill:"var(--p1)"},g,1.6);
   var bars=[["位能",U,"var(--p2)"],["動能",K,"var(--p1)"],["熱能",lost,"var(--p4)"]],sc=180/E0;bars.forEach(function(q,i){var x=500+i*50;NB.mk("rect",{x:x,y:250-q[1]*sc,width:34,height:q[1]*sc,fill:q[2],"fill-opacity":.7},g,1.4);NB.t(g,x+17,270,q[0],{z:11})});
   NB.mk("path",{d:"M495 "+(250-E0*sc)+"h160",fill:"none",stroke:"var(--soft)","stroke-dasharray":"4 4"},g,1.2);NB.t(g,575,(250-E0*sc)-6,"總能量",{z:11,c:"var(--soft)"});
   eq.innerHTML="高度 "+NB.r(h,1)+" m：位能 U = mgh ≈ <b>"+NB.r(U/1000,1)+"</b> kJ，動能 K = ½mv² ≈ <b>"+NB.r(K/1000,1)+"</b> kJ，速率約 "+NB.r(vel,1)+" m/s。"+(fr.v?"<br>有摩擦時，一部分力學能變成熱能，所以後面的坡不可能爬得比起點高。":"<br>沒有摩擦時，位能 + 動能 = 定值（<b>力學能守恆</b>）。")}
  up()},
 steps:["<b>動能</b>：運動中的物體具有的能量，K = ½ m v²；速度加倍，動能變 4 倍","<b>重力位能</b>：U = m g h（相對於參考高度），也可以用「重量 × 高度」計算","彈性位能：被壓縮或拉長的彈簧所儲存的能量","<b>力學能</b> = 動能 + 位能；只有重力作功時，力學能守恆","<b>能量守恆定律</b>：能量不會無中生有，也不會消失，只會從一種形式轉換成另一種"],
 key:["物體由高處自由落下：位能 → 動能","有摩擦時力學能減少，但總能量（含熱能）仍守恆"],
 ch:[{q:"質量 2 kg 的物體以 3 m/s 運動，動能是多少焦耳？",a:9,u:"J",tol:.01,h:"½ × 2 × 3²。"},
     {q:"質量 5 kg 的物體在 10 m 高處，以地面為參考，重力位能是多少焦耳？（g = 9.8 m/s²）",a:490,u:"J",tol:.01}]
});
