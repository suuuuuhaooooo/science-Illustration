/* 第三冊 3-1 波的傳播：橫波與縱波、振幅、波長、頻率、波速 v = f × λ */
NB.unit({
 q:"運動會時，觀眾席做「人浪」：每個人只是站起來又坐下，但「浪」卻從看台這一頭跑到另一頭。到底是什麼東西在前進？",
 sub:"改變頻率、振幅和介質，看波怎麼跑；紅點只在原地上下動",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,250,"波的傳播"),kind=NB.pick(b,"波的種類",["橫波（繩波）","縱波（彈簧波）"],0,info),med=NB.pick(b,"介質",["鬆的繩子（波速 2 m/s）","緊的繩子（波速 4 m/s）"],0,info),f=NB.slider(b,"頻率",0.5,4,0.5,1," Hz",info),A=NB.slider(b,"振幅",10,50,5,30," 像素",info);
  var g=L.g(v),t=0,PX=120;/* 每公尺 120 像素 */
  function info(){var vs=med.v?4:2,lam=vs/f.v;eq.innerHTML="波速 v = 頻率 f × 波長 λ → "+vs+" = "+f.v+" × <b>"+NB.r(lam,2)+"</b> m<br>"+(kind.v?"縱波：介質振動方向和波前進方向<b>平行</b>，形成疏密相間（聲波就是縱波）。":"橫波：介質振動方向和波前進方向<b>垂直</b>，形成波峰與波谷。")+"同一介質中波速固定，<b>頻率加倍、波長減半</b>。"}
  L.loop(v,function(dt){t+=L.reduce?0:dt/1000;L.clear(g);var vs=med.v?4:2,lam=vs/f.v,k=2*Math.PI/(lam*PX),w=2*Math.PI*f.v,front=Math.min(640,20+vs*PX*t%((640)+vs*PX*3)),y0=120;
   NB.mk("path",{d:"M20 "+y0+"H640",fill:"none",stroke:"var(--soft)","stroke-dasharray":"3 5"},g,1);
   NB.mk("path",{d:"M14 60v120",fill:"none"},g,5);
   if(!kind.v){var d="M20 "+y0;for(var x=20;x<=640;x+=4){var y=y0-A.v*Math.sin(w*t-k*(x-20));d+="L"+x+" "+y.toFixed(1)}NB.mk("path",{d:d,fill:"none",stroke:"var(--p2)"},g,3);
    var mx=320,my=y0-A.v*Math.sin(w*t-k*(mx-20));NB.mk("circle",{cx:mx,cy:my,r:7,fill:"var(--p1)"},g,1.5);NB.mk("path",{d:"M"+mx+" "+(y0-A.v-8)+"V"+(y0+A.v+8),fill:"none",stroke:"var(--p1)","stroke-dasharray":"2 3"},g,1);
    var x1=20+lam*PX*(Math.ceil((w*t)/(2*Math.PI)-0.25)-(w*t)/(2*Math.PI)+.25);/* 一個波峰 */
    var crest=20+((w*t/k-Math.PI/2/k)%(lam*PX)+lam*PX)%(lam*PX);if(crest+lam*PX<640){L.arrow(g,crest,y0-A.v-24,crest+lam*PX,y0-A.v-24,"var(--p3)",1.6,7);L.arrow(g,crest+lam*PX,y0-A.v-24,crest,y0-A.v-24,"var(--p3)",1.6,7);NB.t(g,crest+lam*PX/2,y0-A.v-30,"波長 λ",{z:13,c:"var(--p3)"})}
    L.arrow(g,600,y0,600,y0-A.v,"var(--p4b)",1.4,6);NB.t(g,615,y0-A.v/2,"振幅",{z:12,c:"var(--p4b)",a:"start"})}
   else{for(var i=0;i<62;i++){var x0=24+i*10,dx=A.v*.35*Math.sin(w*t-k*(x0-20)),xx=x0+dx;NB.mk("path",{d:"M"+xx.toFixed(1)+" "+(y0-30)+"V"+(y0+30),fill:"none",stroke:i===30?"var(--p1)":"var(--p2)"},g,i===30?3:2)}
    NB.t(g,330,y0+56,"密部（線擠在一起）與疏部（線分開）輪流出現",{z:13,c:"var(--soft)"})}
   L.arrow(g,520,220,630,220,"var(--ink)",1.6,8);NB.t(g,510,225,"波前進方向",{z:12,a:"end",c:"var(--soft)"})});
  info()},
 steps:["波：振動在介質中傳播的現象；傳遞的是<b>能量</b>，介質本身只在原地振動","橫波：振動方向 ⊥ 傳播方向（繩波、水面波）；縱波：振動方向 ∥ 傳播方向（彈簧疏密波、聲波）","振幅：離開平衡位置的最大距離；波長 λ：相鄰兩波峰（或兩密部）的距離","週期 T：振動一次的時間；頻率 f = 1 ÷ T（單位赫茲 Hz）","波速 v = f × λ；波速由介質決定，頻率由波源決定"],
 key:["v = f λ：同一介質頻率變大，波長變短","波傳的是能量和振動的形式，不是介質本身"],
 ch:[{q:"一條繩子上的波，頻率是 5 Hz、波長是 0.8 m，波速是多少 m/s？",a:4,u:"m/s",tol:.01,h:"v = f × λ = 5 × 0.8。"},
     {q:"聲波在空氣中傳播時，空氣分子的振動方向和聲波前進方向的關係是什麼？",o:["互相垂直","互相平行","沒有固定關係","分子不會振動"],a:1,h:"聲波是縱波。"}]
});
