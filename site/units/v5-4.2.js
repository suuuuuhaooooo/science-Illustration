/* 第五冊 4-2 電流：電路、電流方向、安培計、串聯與並聯 */
NB.unit({
 q:"家裡的電燈一盞壞了，其他的照樣亮；但有些舊式聖誕燈串，一顆燒掉就全部熄滅。這兩種接法有什麼不同？電流到底怎麼流？",
 sub:"切換串聯、並聯，看每顆燈泡的電流",
 tool:function(b,eq){
  var L=NB.lab,mode=NB.pick(b,"接法",["串聯","並聯"],0,up),V=NB.slider(b,"電池電壓",1.5,9,1.5,3," V",up),bad=NB.pick(b,"燈泡乙",["正常","壞掉（斷路）"],0,up),v=L.stage(b,640,280,"電路"),g=L.g(v),t=0,R=10;
  function up(){var ser=mode.v===0,brk=bad.v===1,I1,I2,It;if(ser){It=brk?0:V.v/(2*R);I1=I2=It}else{I1=V.v/R;I2=brk?0:V.v/R;It=I1+I2}
   eq.innerHTML=(ser?"<b>串聯</b>：電流只有一條路，每一處電流都相等 I = "+NB.r(It,3)+" A。"+(brk?"乙斷了，整條電路沒有電流，<b>全部熄滅</b>。":""):"<b>並聯</b>：電流分成兩條路，總電流 = "+NB.r(I1,3)+" + "+NB.r(I2,3)+" = <b>"+NB.r(It,3)+"</b> A。"+(brk?"乙斷了，甲那一條仍然通，甲<b>照樣亮</b>。":""))+"<br>電流方向：從電池<b>正極</b>流出，經外電路回到負極（電子流方向相反）。";return[I1,I2,It]}
  L.loop(v,function(dt){t+=L.reduce?0:dt;L.clear(g);var I=up(),ser=mode.v===0;
   function bulb(x,y,i,lab){NB.mk("circle",{cx:x,cy:y,r:18,fill:i>0?"#ffe27a":"var(--paper)","fill-opacity":i>0?.3+Math.min(.7,i*1.5):1},g,2);NB.t(g,x,y+5,lab,{z:13,b:1});NB.t(g,x,y+36,NB.r(i,2)+" A",{z:11,c:"var(--p1)"})}
   NB.mk("rect",{x:60,y:120,width:30,height:60,fill:"var(--paper2)"},g,2);NB.t(g,75,110,"+",{z:16,b:1,c:"var(--p1)"});NB.t(g,75,200,"−",{z:16,b:1});
   var path;if(ser){path="M75 120V50H560V230H75V180";NB.mk("path",{d:path,fill:"none"},g,2.4);bulb(250,50,I[0],"甲");bulb(420,50,I[1],"乙");if(bad.v)NB.mk("path",{d:"M410 30l20 40",fill:"none",stroke:"var(--p1)"},g,3)}
   else{NB.mk("path",{d:"M75 120V50H520V230H75V180M200 50V140H520V230",fill:"none"},g,2.4);NB.mk("path",{d:"M520 50V140",fill:"none"},g,2.4);bulb(360,50,I[0],"甲");bulb(360,140,I[1],"乙");if(bad.v)NB.mk("path",{d:"M350 120l20 40",fill:"none",stroke:"var(--p1)"},g,3)}
   if(I[2]>0){var n=12,pts=ser?[[75,120],[75,50],[560,50],[560,230],[75,230],[75,180]]:[[75,120],[75,50],[520,50],[520,230],[75,230],[75,180]],tot=0,seg=[];for(var k=1;k<pts.length;k++){var d=Math.hypot(pts[k][0]-pts[k-1][0],pts[k][1]-pts[k-1][1]);seg.push(d);tot+=d}
    for(var j=0;j<n;j++){var s=((t*I[2]*.15+j*tot/n)%tot),q=0;while(s>seg[q]){s-=seg[q];q++}var A=pts[q],B=pts[q+1],u=s/seg[q];NB.mk("circle",{cx:A[0]+(B[0]-A[0])*u,cy:A[1]+(B[1]-A[1])*u,r:3.5,fill:"var(--p1)"},g,0)}}
   NB.mk("circle",{cx:140,cy:230,r:14,fill:"var(--paper)"},g,1.8);NB.t(g,140,235,"A",{z:12,b:1});NB.t(g,140,262,"總電流 "+NB.r(I[2],2)+" A",{z:11,c:"var(--soft)"})});
  up()},
 steps:["<b>電流</b>：單位時間內通過導線某截面的電量，I = Q ÷ t，單位安培（A）；1 A = 1 庫侖／秒","電流方向規定為從電源正極流出，經外電路回到負極；金屬導線中實際移動的是電子，方向相反","<b>安培計</b>要<b>串聯</b>在電路中，正端接近電源正極那一側","<b>串聯</b>：各處電流相等，一處斷路全部不通","<b>並聯</b>：總電流 = 各分路電流之和，一條分路斷了其他仍能運作（家用電路都是並聯）"],
 key:["安培計內電阻很小，絕不能直接接在電池兩端","1 A = 1000 mA"],
 ch:[{q:"5 秒內有 10 庫侖的電量通過導線，電流是多少安培？",a:2,u:"A",tol:.01,h:"I = Q ÷ t。"},
     {q:"兩個燈泡並聯，分別通過 0.3 A 和 0.5 A 的電流，總電流是多少安培？",a:.8,u:"A",tol:.001}]
});
