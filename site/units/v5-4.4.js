/* 第五冊 4-4 電阻與歐姆定律：V = I × R、V–I 圖、電阻串並聯 */
NB.unit({
 q:"同樣接上 3 V 電池，有的燈泡很亮、有的很暗；電線越細越長越容易發燙。什麼東西在「阻擋」電流？電壓、電流、電阻有什麼關係？",
 sub:"改變電壓和電阻，看電流；把兩個電阻串聯或並聯",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["歐姆定律","電阻串並聯"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var V=NB.slider(P1,"電壓",0,12,1,6," V",up1),R=NB.slider(P1,"電阻",2,20,1,10," Ω",up1),v=L.stage(P1,640,250,"V-I 圖"),g=L.g(v);
  function up1(){L.clear(g);var I=V.v/R.v,P=L.plot(g,70,40,500,170,{x0:0,x1:12,y0:0,y1:3,xt:2,yt:.5,xl:"電壓 V（伏特）",yl:"電流 I（安培）"});
   [5,10,20].forEach(function(r){P.line([[0,0],[Math.min(12,3*r),Math.min(12,3*r)/r]],"var(--soft)",1.2,"4 4");NB.t(g,P.X(12)+4,P.Y(12/r)+4,r+" Ω",{z:10,c:"var(--soft)",a:"start"})});
   P.line([[0,0],[12,12/R.v]],"var(--p2)",2.6);P.dot(V.v,I,"var(--p1)",6);
   eq.innerHTML="I = V ÷ R = "+V.v+" ÷ "+R.v+" = <b>"+NB.r(I,3)+"</b> A<br>電阻固定時電流和電壓成正比（V–I 圖是過原點的直線）；直線越平，電阻越大。"}
  var r1=NB.slider(P2,"R₁",2,20,1,6," Ω",up2),r2=NB.slider(P2,"R₂",2,20,1,3," Ω",up2),mode=NB.pick(P2,"接法",["串聯","並聯"],0,up2),v2=L.stage(P2,640,200,"電阻組合"),g2=L.g(v2),VV=12;
  function zig(x,y){var d="M"+x+" "+y;for(var i=0;i<6;i++)d+="l6 "+(i%2?12:-12);d+="l6 0";return d}
  function up2(){L.clear(g2);var ser=mode.v===0,Rt=ser?r1.v+r2.v:r1.v*r2.v/(r1.v+r2.v),It=VV/Rt;
   NB.mk("rect",{x:40,y:80,width:26,height:50,fill:"var(--paper2)"},g2,1.8);NB.t(g2,53,150,"12 V",{z:11});
   if(ser){NB.mk("path",{d:"M53 80V40H200M242 40H360M402 40H560V170H53V130",fill:"none"},g2,2);NB.mk("path",{d:zig(200,40),fill:"none",stroke:"var(--p1)"},g2,2.4);NB.mk("path",{d:zig(360,40),fill:"none",stroke:"var(--p2)"},g2,2.4);NB.t(g2,221,70,"R₁ "+r1.v+"Ω",{z:12});NB.t(g2,381,70,"R₂ "+r2.v+"Ω",{z:12})}
   else{NB.mk("path",{d:"M53 80V40H300M342 40H460V120H342M300 120H200V40M460 120V170H53V130",fill:"none"},g2,2);NB.mk("path",{d:zig(300,40),fill:"none",stroke:"var(--p1)"},g2,2.4);NB.mk("path",{d:zig(300,120),fill:"none",stroke:"var(--p2)"},g2,2.4);NB.t(g2,321,26,"R₁ "+r1.v+"Ω",{z:12});NB.t(g2,321,150,"R₂ "+r2.v+"Ω",{z:12})}
   eq.innerHTML=(ser?"串聯：R = R₁ + R₂ = "+r1.v+" + "+r2.v+" = <b>"+Rt+"</b> Ω（越串越大）":"並聯：1/R = 1/R₁ + 1/R₂ → R = <b>"+NB.r(Rt,2)+"</b> Ω（比任何一個都小）")+"<br>接 12 V 電池，總電流 = 12 ÷ "+NB.r(Rt,2)+" = <b>"+NB.r(It,2)+"</b> A"+(ser?"；R₁ 分到 "+NB.r(It*r1.v,2)+" V、R₂ 分到 "+NB.r(It*r2.v,2)+" V。":"；R₁ 分到 "+NB.r(VV/r1.v,2)+" A、R₂ 分到 "+NB.r(VV/r2.v,2)+" A。")}
  up1()},
 steps:["<b>電阻</b>：導體阻礙電流的程度，單位歐姆（Ω）","<b>歐姆定律</b>：在溫度不變時，V = I × R（R = V ÷ I 為定值）","影響導線電阻：長度越長、截面積越小、溫度越高，電阻越大；材料不同電阻也不同（銅、銀電阻小）","電阻串聯：R = R₁ + R₂；電流相同，電阻大的分到的電壓大","電阻並聯：1/R = 1/R₁ + 1/R₂；電壓相同，電阻小的分到的電流大"],
 key:["V–I 圖斜率越小，電阻越大（R = V ÷ I）","燈泡燈絲變熱後電阻變大，所以不完全遵守歐姆定律"],
 ch:[{q:"一個電阻兩端電壓 6 V，通過的電流 0.3 A，電阻是多少歐姆？",a:20,u:"Ω",tol:.01},
     {q:"6 Ω 和 3 Ω 的電阻並聯，總電阻是多少歐姆？",a:2,u:"Ω",tol:.01,h:"6 × 3 ÷ (6 + 3)。"}]
});
