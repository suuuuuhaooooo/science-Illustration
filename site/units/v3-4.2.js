/* 第三冊 4-2 光的反射與面鏡：反射定律、平面鏡成像、凹面鏡與凸面鏡 */
NB.unit({
 q:"轉彎路口的反光鏡是向外凸的，化妝鏡卻是向內凹的。不同的鏡子為什麼有不同用途？光打到鏡子上，反彈的方向有規則嗎？",
 sub:"拖動雷射筆改變入射角；切換鏡子的種類",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["反射定律與平面鏡","凹面鏡與凸面鏡"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,330,"平面鏡反射"),g=L.g(v),sx=150,sy=80,cx=320,cy=180;
  function up1(){L.clear(g);NB.mk("path",{d:"M100 "+cy+"H540",fill:"none"},g,4);for(var x=110;x<540;x+=16)NB.mk("path",{d:"M"+x+" "+(cy+2)+"l-10 12",fill:"none",stroke:"var(--soft)"},g,1.2);
   L.dash(g,cx,cy,cx,30);NB.t(g,cx+6,28,"法線",{z:12,c:"var(--soft)",a:"start"});
   var ai=Math.atan2(cx-sx,cy-sy),deg=NB.r(ai*180/Math.PI,0),rx=cx+(cx-sx),ry=sy;L.ray(g,sx,sy,cx,cy,"var(--p1)",2.4);L.ray(g,cx,cy,rx,ry,"var(--p1)",2.4);
   L.arc(g,cx,cy,40,Math.PI/2,Math.PI/2+ai,"var(--p4b)","i");L.arc(g,cx,cy,52,Math.PI/2-ai,Math.PI/2,"var(--p3)","r");
   /* 鏡後的虛像 */
   var ix=sx,iy=2*cy-sy;NB.mk("path",{d:"M"+rx+" "+ry+"L"+ix+" "+iy,fill:"none",stroke:"var(--p1)","stroke-dasharray":"4 4","stroke-opacity":.5},g,1.4);
   NB.t(g,ix,iy+24,"虛像",{z:12,c:"var(--p1)"});NB.mk("circle",{cx:ix,cy:iy,r:7,fill:"var(--p1)","fill-opacity":.25,stroke:"var(--p1)","stroke-dasharray":"3 2"},g,1.4);
   var h=NB.mk("rect",{x:sx-16,y:sy-9,width:32,height:18,rx:5,fill:"var(--ink)"},g,1);NB.t(g,sx,sy-16,"拖我",{z:12,c:"var(--p1)"});
   NB.drag(v,h,function(x,y){sx=NB.clamp(x,110,cx-10);sy=NB.clamp(y,40,cy-40);up1()});
   eq.innerHTML="入射角 i = <b>"+deg+"°</b>，反射角 r = <b>"+deg+"°</b> → 入射角永遠等於反射角（都從<b>法線</b>量起）。<br>反射光線反向延長，交會在鏡後的虛像位置：像和物對稱於鏡面。"}
  var v2=L.stage(P2,640,280,"面鏡"),g2=L.g(v2),kind=NB.pick(P2,"鏡子",["凹面鏡","凸面鏡","平面鏡"],0,up2);
  function up2(){L.clear(g2);var mx=460,R=260,f=R/2,k=kind.v;
   if(k<2){var s=k?1:-1,d="";for(var y=40;y<=240;y+=4){var yy=y-140,x=mx+s*(R-Math.sqrt(R*R-yy*yy))*-1;d+=(y>40?"L":"M")+x.toFixed(1)+" "+y}NB.mk("path",{d:d,fill:"none"},g2,4)}
   else NB.mk("path",{d:"M"+mx+" 40V240",fill:"none"},g2,4);
   NB.mk("path",{d:"M40 140H620",fill:"none",stroke:"var(--soft)","stroke-dasharray":"3 5"},g2,1);
   [-80,-45,45,80].forEach(function(yy){var y=140+yy,hx;if(k===2){hx=mx;L.ray(g2,60,y,hx,y,"var(--p1)",2);L.ray(g2,hx,y,60,y,"var(--p2)",2,"6 3")}
    else{var sg=k?1:-1;hx=mx+sg*(R-Math.sqrt(R*R-yy*yy))*-1;L.ray(g2,60,y,hx,y,"var(--p1)",2);
     var Fx=mx-f;/* 凹：反射後經過焦點；凸：反射光的延長線經過鏡後焦點 */
     if(!k){var dx=Fx-hx,dy=140-y,t=1.8;L.ray(g2,hx,y,hx+dx*t,y+dy*t,"var(--p2)",2)}else{var Fv=mx+f,ex=hx-Fv,ey=y-140,n=Math.hypot(ex,ey);L.ray(g2,hx,y,hx+ex/n*170,y+ey/n*170,"var(--p2)",2);L.dash(g2,hx,y,Fv,140,"var(--p2)")}}});
   if(k<2){var F=k?mx+f:mx-f;NB.mk("circle",{cx:F,cy:140,r:4,fill:"var(--ink)"},g2,1);NB.t(g2,F,160,"焦點 F",{z:12})}
   eq.innerHTML=["<b>凹面鏡</b>：平行光反射後<b>會聚</b>在焦點。反過來，光源放在焦點，光會平行射出——手電筒、車燈、太陽爐；靠近時可成放大的正立虛像（化妝鏡）。","<b>凸面鏡</b>：平行光反射後<b>發散</b>，好像從鏡後的焦點射出。成正立縮小的虛像，視野廣——路口反光鏡、汽車後照鏡。","<b>平面鏡</b>：平行光反射後仍平行。成正立、等大、左右相反的虛像，像距 = 物距。"][k]}
  up1()},
 steps:["反射定律：入射角 = 反射角；入射線、反射線、法線在同一平面","鏡面反射：光滑表面，平行光反射後仍平行；漫反射：粗糙表面，反射到各方向（但每一條仍遵守反射定律）","我們能看見不發光的物體，是因為它把光<b>反射</b>進我們的眼睛","平面鏡成像：正立、等大、左右相反的<b>虛像</b>，像和物對稱於鏡面","凹面鏡會聚光線；凸面鏡發散光線、成縮小正立虛像，視野較廣"],
 key:["角度都從法線量，不是從鏡面量：和鏡面夾 30° 時入射角是 60°","虛像不能用屏幕接收；實像可以"],
 ch:[{q:"一道光和平面鏡的鏡面夾 25°射入，反射角是多少度？",a:65,u:"度",tol:.01,h:"入射角從法線量起：90 − 25。"},
     {q:"道路轉彎處架設的反光鏡是哪一種，為什麼？",o:["平面鏡，成像最清楚","凹面鏡，可以把像放大","凸面鏡，視野比較廣","凹面鏡，可以聚光"],a:2}]
});
