/* 第三冊 1-2 質量與密度的測量：天平、密度 D = M ÷ V、質量—體積圖、沉浮 */
NB.unit({
 q:"一塊 1 公斤的鐵和一大袋 1 公斤的棉花，誰比較重？為什麼大家還是覺得「鐵比棉花重」？",
 sub:"換材料、改體積，看質量和密度怎麼變",
 tool:function(b,eq){
  var L=NB.lab,MAT=[["水",1,"var(--p2)"],["沙拉油",0.9,"var(--p4)"],["木塊（松木）",0.5,"var(--p4b)"],["鋁",2.7,"#9aa7b4"],["鐵",7.9,"#6b7684"],["冰",0.92,"#a8d8ea"]];
  var v=L.stage(b,660,300,"密度"),g=L.g(v),mat=NB.pick(b,"材料",MAT.map(function(m){return m[0]}),3,up),vol=NB.slider(b,"體積",5,50,5,20," cm³",up);
  function up(){L.clear(g);var m=MAT[mat.v],M=m[1]*vol.v,P=L.plot(g,380,40,240,200,{x0:0,x1:50,y0:0,y1:400,xt:10,yt:100,xl:"體積 V（cm³）",yl:"質量 M（g）"});
   MAT.forEach(function(q,i){var x1=Math.min(50,400/q[1]);P.line([[0,0],[x1,x1*q[1]]],q[2],i===mat.v?3:1.2,i===mat.v?"":"4 4");NB.t(g,P.X(x1)+(x1<50?-4:-2),P.Y(x1*q[1])-6,q[0].replace(/（.*/,""),{z:11,c:"var(--soft)",a:"end"})});
   P.dot(vol.v,M,"var(--p1)",6);
   /* 天平 */
   var tilt=NB.clamp((M-0)/400,0,1)*0,bx=180;NB.mk("path",{d:"M"+bx+" 250V120M"+(bx-40)+" 260h80",fill:"none"},g,3);NB.mk("path",{d:"M"+(bx-120)+" 120H"+(bx+120),fill:"none"},g,3);
   NB.mk("path",{d:"M"+(bx-120)+" 120l-30 70h60zM"+(bx+120)+" 120l-30 70h60z",fill:"none",stroke:"var(--soft)"},g,1.2);
   NB.mk("path",{d:"M"+(bx-155)+" 190h70M"+(bx+85)+" 190h70",fill:"none"},g,3);
   var s=Math.cbrt(vol.v)*7;NB.mk("rect",{x:bx-120-s/2,y:190-s,width:s,height:s,fill:m[2],"fill-opacity":.8},g,1.8);
   NB.t(g,bx+120,182,NB.r(M,1)+" g",{z:15,b:1,c:"var(--p1)"});NB.t(g,bx-120,280,m[0],{z:13});
   var fl=m[1]<1?"會浮在水面上":m[1]>1?"會沉入水中":"在水中可以停在任何深度";
   eq.innerHTML="密度 = 質量 ÷ 體積："+NB.r(M,1)+" g ÷ "+vol.v+" cm³ = <b>"+m[1]+"</b> g/cm³<br>同一種材料，體積變大質量也變大，但<b>密度不變</b>；放進水（密度 1 g/cm³）裡"+fl+"。"}
  up()},
 steps:["質量：物體所含物質的多少，單位公克（g）、公斤（kg），用天平測量","密度 D = 質量 M ÷ 體積 V，單位 g/cm³","同一種物質（同溫同狀態）密度固定，是辨認物質的特性之一","M–V 圖是一條通過原點的直線，越陡的線密度越大","物體密度小於液體密度 → 浮；大於 → 沉"],
 key:["1 公斤的鐵和 1 公斤的棉花一樣重；鐵只是「密度」比較大","水的密度約 1 g/cm³；油、冰、木頭比水小所以浮","求質量：M = D × V；求體積：V = M ÷ D"],
 ch:[{q:"一塊金屬質量 54 g、體積 20 cm³，它的密度是多少 g/cm³？",a:2.7,u:"g/cm³",tol:.01,h:"D = M ÷ V = 54 ÷ 20。"},
     {q:"把一大塊冰切成兩半，每一半的密度會怎樣？",o:["變成原本的一半","變成原本的兩倍","不變","無法判斷"],a:2,h:"密度是物質的特性，和取多少無關。"}]
});
