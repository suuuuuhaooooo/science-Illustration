/* 第三冊 5-4 熱的傳播方式：傳導、對流、輻射 */
NB.unit({
 q:"煮湯時，鐵湯匙放在鍋裡一會兒，握把就燙手；鍋裡的湯從底部熱到上面；站在火爐旁，臉也覺得熱。這三種「熱」傳過來的方式一樣嗎？",
 sub:"選一種傳熱方式，開始加熱觀察",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,300,"熱的傳播"),mode=NB.pick(b,"方式",["傳導","對流","輻射"],0,function(){t=0;show()}),g=L.g(v),t=0;
  NB.btn(b,"重新開始",function(){t=0},"go");
  var RODS=[["銅",1],["鋁",.6],["鐵",.2],["玻璃",.03]];
  function show(){eq.innerHTML=["<b>傳導</b>：熱沿著物體由高溫處傳到低溫處，粒子本身不移動。金屬是熱的良導體，銅最快、玻璃最慢（熱的不良導體）。","<b>對流</b>：液體或氣體受熱膨脹、密度變小而上升，冷的部分下沉，形成循環。暖氣裝在低處、冷氣裝在高處就是這個道理。","<b>輻射</b>：熱以電磁波直接傳送，不需要介質（太陽的熱穿過真空到地球）。黑色、粗糙表面吸收輻射熱比較快，白色、光亮表面會反射。"][mode.v]}
  L.loop(v,function(dt){t+=L.reduce?3000:dt;L.clear(g);var s=t/1000;
   if(mode.v===0){RODS.forEach(function(r,i){var y=60+i*55;NB.mk("rect",{x:150,y:y,width:420,height:14,rx:4,fill:"var(--paper2)"},g,1.6);
     var reach=Math.min(400,Math.sqrt(s*r[1])*90);NB.mk("rect",{x:151,y:y+1,width:reach,height:12,fill:"var(--p1)","fill-opacity":.6,stroke:"none"},g);
     for(var k=1;k<=5;k++){var x=150+k*75,dropped=reach>k*75;NB.mk("circle",{cx:x,cy:dropped?y+40:y+20,r:6,fill:"var(--p4)","fill-opacity":dropped?.35:1},g,1.2)}
     NB.t(g,120,y+12,r[0],{z:14,a:"end"})});L.lamp(g,150,290,true,.7);NB.t(g,400,290,"蠟球（熱傳到就掉下來）",{z:12,c:"var(--soft)"})}
   else if(mode.v===1){L.beaker(g,180,260,300,220,.92,"var(--p2)",{op:.15,noTicks:true});L.lamp(g,240,300,true,.5);
    for(var i=0;i<26;i++){var u=((s*.18+i/26)%1),a=u*Math.PI*2,x=330-120*Math.cos(a),y=160-80*Math.sin(a)*-1;x=330+120*Math.cos(a+Math.PI);y=160+85*Math.sin(a+Math.PI);var hot=Math.cos(a)>0;NB.mk("circle",{cx:x,cy:y,r:5,fill:hot?"var(--p1)":"var(--p2)"},g,1)}
    L.arrow(g,215,200,215,100,"var(--p1)",2,9);L.arrow(g,445,100,445,200,"var(--p2)",2,9);NB.t(g,560,110,"熱水上升",{z:13,c:"var(--p1)"});NB.t(g,560,210,"冷水下沉",{z:13,c:"var(--p2)"})}
   else{NB.mk("circle",{cx:120,cy:150,r:40,fill:"var(--p4)"},g,2);for(var k=0;k<8;k++){var a2=k*Math.PI/4;NB.mk("path",{d:"M"+(120+50*Math.cos(a2))+" "+(150+50*Math.sin(a2))+"l"+12*Math.cos(a2)+" "+12*Math.sin(a2),fill:"none",stroke:"var(--p4)"},g,3)}
    [[380,"黑色罐子",.9,"#2a2f38"],[540,"白色亮面罐子",.35,"#f4f6f8"]].forEach(function(c){NB.mk("rect",{x:c[0]-40,y:110,width:80,height:110,rx:8,fill:c[3]},g,2);var T=20+40*(1-Math.exp(-s*c[2]/8));L.thermo(g,c[0],200,90,20,60,T,{step:20});NB.t(g,c[0],250,c[1],{z:13});NB.t(g,c[0],272,NB.r(T,1)+" °C",{z:14,b:1,c:"var(--p1)"})});
    for(var w=0;w<3;w++){var x0=170+((s*90+w*60)%160);NB.mk("path",{d:"M"+x0+" 140q6-8 12 0t12 0t12 0",fill:"none",stroke:"var(--p1)"},g,1.8)}}});
  show()},
 steps:["<b>傳導</b>：熱經由物體內粒子的碰撞，從高溫處傳到低溫處；固體（尤其金屬）主要靠傳導","熱的良導體：金屬；不良導體：木頭、塑膠、空氣、保麗龍（可用來保溫或隔熱）","<b>對流</b>：液體、氣體受熱上升、冷的下沉形成循環；海陸風、燒開水都是對流","<b>輻射</b>：以電磁波傳熱，不需要介質；黑色粗糙表面吸收、放出輻射都較快","保溫瓶：真空夾層阻斷傳導與對流，瓶膽鍍銀反射輻射"],
 key:["真空可以擋住傳導和對流，但擋不住輻射","夏天穿淺色衣服比較涼：淺色反射較多輻射熱"],
 ch:[{q:"保溫瓶的瓶膽內壁鍍上一層亮亮的銀，主要是為了減少哪一種熱的傳播？",o:["傳導","對流","輻射","蒸發"],a:2},
     {q:"冬天用的暖氣機最好放在房間的哪裡，才能讓整個房間比較快暖起來？",o:["靠近天花板","靠近地板","不影響","放在門外"],a:1,h:"熱空氣會上升。"}]
});
