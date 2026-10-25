/* 第三冊 4-3 光的折射與透鏡：入射角與折射角、凸透鏡成像 */
NB.unit({
 q:"把吸管插進水杯，吸管在水面處好像「折斷」了；用放大鏡可以把陽光聚成一個小亮點。這兩件事都和光「轉彎」有關，光為什麼會轉彎？",
 sub:"改變入射角與介質；移動蠟燭，看凸透鏡成的像",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["光的折射","凸透鏡成像"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,300,"折射"),ia=NB.slider(P1,"入射角",0,80,1,40,"°",up1),md=NB.pick(P1,"光的路徑",["空氣 → 水","空氣 → 玻璃","水 → 空氣"],0,up1),g=L.g(v);
  function up1(){L.clear(g);var n1=[1,1,1.33][md.v],n2=[1.33,1.5,1][md.v],a=ia.v*Math.PI/180,cx=320,cy=150,s=Math.sin(a)*n1/n2;
   NB.mk("rect",{x:60,y:cy,width:520,height:140,fill:md.v===1?"var(--p3)":"var(--p2)","fill-opacity":md.v===2?.0:.16,stroke:"none"},g);NB.mk("rect",{x:60,y:10,width:520,height:140,fill:"var(--p2)","fill-opacity":md.v===2?.16:0,stroke:"none"},g);
   NB.mk("path",{d:"M60 "+cy+"H580",fill:"none"},g,2);L.dash(g,cx,20,cx,285);
   NB.t(g,80,40,["空氣","空氣","水"][md.v],{z:13,a:"start",c:"var(--soft)"});NB.t(g,80,276,["水","玻璃","空氣"][md.v],{z:13,a:"start",c:"var(--soft)"});
   var r=120,x0=cx-r*Math.sin(a),y0=cy-r*Math.cos(a);L.ray(g,x0,y0,cx,cy,"var(--p1)",2.4);
   if(s<=1){var b2=Math.asin(s);L.ray(g,cx,cy,cx+130*Math.sin(b2),cy+130*Math.cos(b2),"var(--p1)",2.4);L.arc(g,cx,cy,42,Math.PI/2,Math.PI/2+a,"var(--p4b)",ia.v+"°");L.arc(g,cx,cy,46,-Math.PI/2-b2,-Math.PI/2,"var(--p3)",NB.r(b2*180/Math.PI,0)+"°");
    L.ray(g,cx,cy,cx+r*Math.sin(a),y0,"var(--p1)",1,"3 4");
    eq.innerHTML="入射角 "+ia.v+"° → 折射角 <b>"+NB.r(b2*180/Math.PI,1)+"°</b>。"+(n2>n1?"光從光速快的介質進入光速慢的介質，折射線<b>偏向法線</b>（折射角 < 入射角）。":"光從水進入空氣，折射線<b>偏離法線</b>（折射角 > 入射角）。")+(ia.v===0?"<br>垂直入射時不偏折。":"")}
   else{L.ray(g,cx,cy,cx+r*Math.sin(a),y0,"var(--p1)",2.4);eq.innerHTML="入射角太大，光完全反射回水中，沒有折射光——這叫<b>全反射</b>（光纖就是利用全反射傳光）。"}}
  var v2=L.stage(P2,660,300,"凸透鏡成像"),u=NB.slider(P2,"物距（蠟燭到透鏡）",30,250,5,170," mm",up2),g2=L.g(v2),f=60;
  function up2(){L.clear(g2);var lx=330,ay=150,K=1,ox=lx-u.v,oh=50;
   NB.mk("path",{d:"M10 "+ay+"H650",fill:"none",stroke:"var(--soft)"},g2,1);NB.mk("path",{d:"M"+lx+" 40q22 110 0 220q-22-110 0-220z",fill:"var(--p2)","fill-opacity":.18},g2,2);
   [-2,-1,1,2].forEach(function(m){var x=lx+m*f;NB.mk("circle",{cx:x,cy:ay,r:3.5,fill:"var(--ink)"},g2,1);NB.t(g2,x,ay+20,(Math.abs(m)===2?"2F":"F"),{z:12,c:"var(--soft)"})});
   NB.mk("path",{d:"M"+ox+" "+ay+"V"+(ay-oh),fill:"none",stroke:"var(--p4b)"},g2,6);NB.mk("path",{d:"M"+ox+" "+(ay-oh-14)+"q-7 8 0 13q7-5 0-13z",fill:"var(--p4)"},g2,1.4);
   var real=u.v>f+0.01,vv=u.v===f?Infinity:f*u.v/(u.v-f),mag=vv/u.v,ix=lx+vv,ih=-oh*mag;
   var tY=ay-oh;L.ray(g2,ox,tY,lx,tY,"var(--p1)",1.8);
   if(isFinite(vv)){if(real){L.ray(g2,lx,tY,ix,ay-ih,"var(--p1)",1.8);L.ray(g2,ox,tY,ix,ay-ih,"var(--p3)",1.8)}
    else{var ex=lx+f,dx=ex-lx,dy=ay-tY;L.ray(g2,lx,tY,lx+dx*4,tY+dy*4,"var(--p1)",1.8);L.ray(g2,ox,tY,lx+(lx-ox)*2.5,tY+(ay-tY)*2.5,"var(--p3)",1.8);L.dash(g2,lx,tY,ix,ay-ih,"var(--p1)");L.dash(g2,ox,tY,ix,ay-ih,"var(--p3)")}
    if(Math.abs(ix)<1400&&ix>-400){NB.mk("path",{d:"M"+ix+" "+ay+"V"+(ay-ih),fill:"none",stroke:real?"var(--p1)":"var(--p5)","stroke-dasharray":real?"none":"5 4"},g2,5)}}
   else{L.ray(g2,lx,tY,lx+300,tY+300*(ay-tY)/f,"var(--p1)",1.8);L.ray(g2,ox,tY,lx+300,tY+300*(ay-tY)/f*(f/(lx-ox))*0+tY*0+(300*(ay-tY)/f),"var(--p3)",1.8)}
   var z=u.v>2*f?["倒立","縮小","實像","照相機"]:u.v===2*f?["倒立","等大","實像","（物、像都在 2F）"]:u.v>f?["倒立","放大","實像","投影機"]:u.v===f?["","","不成像（光線平行射出）","聚光燈"]:["正立","放大","虛像","放大鏡"];
   eq.innerHTML="物距 "+u.v+" mm（焦距 "+f+" mm）"+(u.v>2*f?"，在 2F 外":u.v>f&&u.v<2*f?"，在 F 與 2F 之間":u.v<f?"，在焦點內":"")+" → <b>"+z.slice(0,3).join("")+"</b>"+(isFinite(vv)&&real?"，像距 "+NB.r(vv,0)+" mm":"")+"。應用："+z[3]}
  up1()},
 steps:["光從一種介質斜射入另一種介質，前進方向改變，叫<b>折射</b>；原因是光在不同介質中速率不同","光由空氣斜射入水或玻璃：折射角 < 入射角（偏向法線）；由水射入空氣則相反","垂直入射不偏折；光從水射向空氣、入射角夠大時會<b>全反射</b>","凸透鏡（中間厚）會聚光線；凹透鏡（中間薄）發散光線","凸透鏡成像：物在 2F 外 → 倒立縮小實像；F～2F → 倒立放大實像；焦點內 → 正立放大虛像"],
 key:["水中的魚看起來比實際淺：光從水射入空氣時偏折","凸透鏡的實像都是倒立的；虛像是正立的"],
 ch:[{q:"蠟燭放在凸透鏡的焦點與兩倍焦距之間，成像的性質是什麼？",o:["正立縮小虛像","倒立縮小實像","倒立放大實像","正立放大虛像"],a:2},
     {q:"光從空氣斜射進入水中時，折射角和入射角的大小關係是什麼？",o:["折射角 > 入射角","折射角 < 入射角","兩者相等","不一定"],a:1}]
});
