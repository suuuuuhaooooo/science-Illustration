/* 第三冊 4-1 光的傳播與光速：光的直進、針孔成像、影子 */
NB.unit({
 q:"用一個鞋盒，前面戳一個小洞、後面貼一張描圖紙，對著窗外的大樹，紙上竟然出現一棵「倒過來」的小樹。為什麼會倒過來？",
 sub:"移動物體、改變盒子長度，看針孔成像的大小",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,280,"針孔成像"),dO=NB.slider(b,"物體到針孔的距離",100,300,10,200," cm",up),dI=NB.slider(b,"針孔到屏幕（盒子深度）",20,120,5,60," cm",up),H=NB.slider(b,"物體高度",40,100,5,80," cm",up),g=L.g(v);
  function up(){L.clear(g);var k=1.2,px=360,cy=140,ox=px-dO.v*k,sx=px+dI.v*k*1.6,h=H.v*1.1,hi=h*dI.v*1.6/(dO.v);
   /* 物體：蠟燭 */
   NB.mk("rect",{x:ox-8,y:cy-h/2+14,width:16,height:h-14,fill:"var(--paper)"},g,2);NB.mk("path",{d:"M"+ox+" "+(cy-h/2)+"q-8 10 0 16q8-6 0-16z",fill:"var(--p4)"},g,1.6);
   NB.mk("path",{d:"M"+px+" 30V"+(cy-4)+"M"+px+" "+(cy+4)+"V250",fill:"none"},g,4);NB.mk("path",{d:"M"+px+" 30H"+sx+"V250H"+px,fill:"none",stroke:"var(--soft)","stroke-dasharray":"4 4"},g,1.2);
   NB.mk("path",{d:"M"+sx+" 30V250",fill:"none",stroke:"var(--p2)"},g,3);
   var top=cy-h/2,bot=cy+h/2,it=cy+hi/2,ib=cy-hi/2;
   L.ray(g,ox,top,sx,it,"var(--p1)",1.8);L.ray(g,ox,bot,sx,ib,"var(--p3)",1.8);
   NB.mk("rect",{x:sx+6,y:ib+(hi>14?0:0),width:10,height:Math.max(2,hi-hi*14/h),fill:"var(--paper)",transform:""},g,1.4);NB.mk("path",{d:"M"+(sx+11)+" "+it+"q-5-6 0-"+(hi*14/h)+"q5 "+(hi*7/h)+" 0 "+(hi*14/h)+"z",fill:"var(--p4)"},g,1);
   NB.t(g,ox,262,"物體",{z:13});NB.t(g,px,22,"針孔",{z:12,c:"var(--soft)"});NB.t(g,sx+30,262,"屏幕上的像",{z:13,c:"var(--p2)"});
   var ratio=dI.v/dO.v;eq.innerHTML="光沿<b>直線</b>前進：物體上方的光穿過針孔打到屏幕下方，所以像是<b>上下左右顛倒</b>的實像。<br>像高 ÷ 物高 = 像距 ÷ 物距 → 像高 = "+H.v+" × "+dI.v+" ÷ "+dO.v+" = <b>"+NB.r(H.v*ratio,1)+"</b> cm"}
  up()},
 steps:["光在同一種均勻介質中沿<b>直線</b>前進（光的直進性）","影子、日食、月食、針孔成像都是光直進造成的","針孔成像：倒立實像，像的形狀和孔的形狀無關","像高 ÷ 物高 = 像距（孔到屏）÷ 物距（物到孔）；屏幕離孔越遠像越大","光速：真空中約 3 × 10⁸ m/s（每秒 30 萬公里），是自然界最快的速度；光在水、玻璃中較慢"],
 key:["針孔成像一定是倒立的，孔換成三角形，像還是物體的形狀","光年是「距離」單位：光走一年的距離"],
 ch:[{q:"用針孔盒看 2 m 高、距離 10 m 的路燈，盒子深 0.2 m，屏幕上的像高幾公分？",a:4,u:"cm",tol:.01,h:"像高 = 物高 × 像距 ÷ 物距 = 2 × 0.2 ÷ 10 公尺，再換成公分。"},
     {q:"把針孔盒的圓孔換成三角形的小孔，屏幕上的蠟燭像會怎樣？",o:["變成三角形","仍是倒立的蠟燭形狀","變成正立","消失"],a:1}]
});
