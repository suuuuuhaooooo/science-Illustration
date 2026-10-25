/* 第六冊 1-2 電與生活：家用並聯電路、總電流與無熔絲開關、用電安全 */
NB.unit({
 q:"冬天開著電暖器，又打開吹風機和電熱水壺，家裡突然「跳電」了。為什麼會跳電？跳電其實是在保護我們嗎？",
 sub:"在同一個迴路上打開電器，看總電流有沒有超過開關的額定電流",
 tool:function(b,eq){
  var L=NB.lab,A=[["電燈",60],["電視",120],["電鍋",800],["吹風機",1200],["電暖器",1300],["電熱水壺",1800]],on=[1,1,0,0,0,0],lim=NB.pick(b,"無熔絲開關",["15 A","20 A"],1,up),row=NB.h('<div class="ctl btns"></div>');b.appendChild(row);
  var bs=A.map(function(x,i){var e=NB.h('<button type="button" class="pen">'+x[0]+'</button>');e.onclick=function(){on[i]=on[i]?0:1;up()};row.appendChild(e);return e});NB.btn(b,"重設開關",function(){trip=false;up()},"go");
  var v=L.stage(b,660,240,"家用電路"),g=L.g(v),trip=false;
  function up(){bs.forEach(function(e,i){e.classList.toggle("on",!!on[i]);e.setAttribute("aria-pressed",!!on[i])});L.clear(g);var I=0;A.forEach(function(x,i){if(on[i])I+=x[1]/110});var lm=[15,20][lim.v];if(I>lm)trip=true;
   NB.mk("path",{d:"M60 60H620M60 200H620",fill:"none"},g,2.4);NB.t(g,40,64,"火線",{z:11,a:"end"});NB.t(g,40,204,"中性線",{z:11,a:"end"});
   NB.mk("rect",{x:70,y:44,width:40,height:32,rx:4,fill:trip?"var(--p1)":"var(--p3)","fill-opacity":.6},g,1.6);NB.t(g,90,100,trip?"跳脫！":"開關",{z:11,b:1,c:trip?"var(--p1)":"var(--soft)"});
   A.forEach(function(x,i){var cx=170+i*82,lit=on[i]&&!trip;NB.mk("path",{d:"M"+cx+" 60V105M"+cx+" 155V200",fill:"none",stroke:on[i]?"var(--ink)":"var(--line)"},g,1.8);NB.mk("rect",{x:cx-30,y:105,width:60,height:50,rx:8,fill:lit?"#ffe27a":"var(--paper)","fill-opacity":lit?.5:1},g,1.6);NB.t(g,cx,128,x[0],{z:11,b:1});NB.t(g,cx,146,x[1]+"W",{z:10,c:"var(--soft)"})});
   eq.innerHTML=trip?"總電流約 "+NB.r(I,1)+" A，超過 "+lm+" A：<b>無熔絲開關跳脫</b>，切斷電路，避免電線過熱引起火災。關掉一些電器再按「重設開關」。":"家用電器都是<b>並聯</b>，電壓都是 110 V。總電流 = 各電器電流相加 ≈ <b>"+NB.r(I,1)+"</b> A（上限 "+lm+" A）。"}
  up()},
 steps:["家用電路是<b>並聯</b>：每個電器都得到相同電壓（110 V 或 220 V），可以各自開關","開越多電器，總電流越大：I總 = I₁ + I₂ + ⋯","總電流超過額定值時，保險絲熔斷或<b>無熔絲開關</b>跳脫，切斷電路","<b>短路</b>：電流不經過電器直接回到電源，電阻極小、電流極大，非常危險","用電安全：不用濕手碰插頭、延長線不超載、三孔插座的接地線可防止漏電觸電"],
 key:["保險絲不能用銅絲代替：銅絲熔點高，起不了保護作用","跳電是保護裝置在工作，不是故障"],
 ch:[{q:"110 V 的家用電路上同時使用 1100 W 的吹風機和 550 W 的電鍋，總電流是多少安培？",a:15,u:"A",tol:.01,h:"P = IV，各自算電流再相加。"},
     {q:"家中電器採用並聯的主要原因是什麼？",o:["可以省電","每個電器都能得到相同電壓、可獨立開關","電流比較小","電線比較短"],a:1}]
});
