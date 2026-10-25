/* 第五冊 3-4 簡單機械：定滑輪、動滑輪、斜面、輪軸 */
NB.unit({
 q:"工地用滑輪把很重的建材吊上樓，殘障坡道讓輪椅可以推上去。這些「簡單機械」真的讓工作變輕鬆了嗎？功有沒有變少？",
 sub:"選一種機械，看施力、拉繩距離和功",
 tool:function(b,eq){
  var L=NB.lab,k=NB.pick(b,"機械",["定滑輪","動滑輪","斜面","輪軸"],0,up),W=NB.slider(b,"物重",20,200,10,100," N",up),h=NB.slider(b,"上升高度",1,4,.5,2," m",up),v=L.stage(b,640,260,"簡單機械"),g=L.g(v);
  function up(){L.clear(g);var F,d,txt;NB.mk("path",{d:"M30 30H610",fill:"none"},g,4);
   if(k.v===0){F=W.v;d=h.v;NB.mk("circle",{cx:320,cy:60,r:24,fill:"var(--paper)"},g,2);NB.mk("path",{d:"M296 60V170M344 60V200",fill:"none",stroke:"var(--p4b)"},g,2);NB.mk("rect",{x:276,y:170,width:40,height:36,fill:"var(--p2)","fill-opacity":.7},g,1.6);L.arrow(g,344,200,344,240,"var(--p1)",3,10);txt="定滑輪只<b>改變施力方向</b>，不省力"}
   else if(k.v===1){F=W.v/2;d=h.v*2;NB.mk("circle",{cx:320,cy:140,r:22,fill:"var(--paper)"},g,2);NB.mk("path",{d:"M298 30V140M342 140V70",fill:"none",stroke:"var(--p4b)"},g,2);L.arrow(g,342,90,342,50,"var(--p1)",3,10);NB.mk("rect",{x:300,y:170,width:40,height:36,fill:"var(--p2)","fill-opacity":.7},g,1.6);NB.mk("path",{d:"M320 162V170",fill:"none"},g,2);txt="動滑輪由兩段繩子分擔重量，<b>省一半的力</b>，但繩子要拉兩倍長"}
   else if(k.v===2){var len=h.v*2.5;F=W.v*h.v/len;d=len;NB.mk("path",{d:"M100 230H520V"+(230-h.v*40)+"Z",fill:"var(--paper2)"},g,2);NB.mk("rect",{x:300,y:230-(230-(230-h.v*40))*.5-26,width:30,height:24,fill:"var(--p2)","fill-opacity":.7,transform:"rotate("+(-Math.atan(h.v*40/420)*180/Math.PI)+" 315 "+(230-h.v*20-14)+")"},g,1.6);txt="斜面長 "+NB.r(len,1)+" m：斜面越長越省力，但移動距離變長"}
   else{F=W.v/4;d=h.v*4;NB.mk("circle",{cx:320,cy:110,r:80,fill:"none"},g,2);NB.mk("circle",{cx:320,cy:110,r:20,fill:"var(--paper)"},g,2);NB.mk("path",{d:"M300 110V200M400 110V180",fill:"none",stroke:"var(--p4b)"},g,2);NB.mk("rect",{x:280,y:200,width:40,height:30,fill:"var(--p2)","fill-opacity":.7},g,1.6);L.arrow(g,400,180,400,225,"var(--p1)",3,10);txt="輪半徑是軸的 4 倍：施力在輪上，省力 4 倍，但要轉更多圈"}
   eq.innerHTML=txt+"。<br>施力 <b>"+NB.r(F,1)+"</b> N × 施力移動距離 "+NB.r(d,1)+" m = <b>"+NB.r(F*d,1)+"</b> J；直接抬起：物重 "+W.v+" N × "+h.v+" m = "+NB.r(W.v*h.v,1)+" J。<b>功一樣</b>（不計摩擦）——省力就費距離。"}
  up()},
 steps:["簡單機械：槓桿、滑輪、輪軸、斜面、螺旋、劈等，可以省力、省時或改變施力方向","定滑輪：等臂槓桿，不省力，只改變施力方向（升旗）","動滑輪：省一半的力，但施力距離是物體移動距離的 2 倍","斜面：施力 × 斜面長 = 物重 × 高（不計摩擦）；螺絲就是繞起來的斜面","<b>功的原理</b>：使用任何機械都不能省功；省力必費距離，省距離必費力"],
 key:["輪軸：施力在輪上省力（門把、方向盤）；施力在軸上省時（腳踏車後輪）","有摩擦時，實際作的功會比理想值多"],
 ch:[{q:"用動滑輪（不計滑輪重和摩擦）提起 400 N 的重物，至少需要多少牛頓的力？",a:200,u:"N",tol:.01},
     {q:"沿 5 m 長、1 m 高的光滑斜面，把 500 N 的箱子推上去，需要多少牛頓的推力？",a:100,u:"N",tol:.01,h:"F × 5 = 500 × 1。"}]
});
