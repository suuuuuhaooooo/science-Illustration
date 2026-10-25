/* 第四冊 2-2 氧化與還原反應：誰得到氧、誰失去氧；氧化劑與還原劑；煉鐵 */
NB.unit({
 q:"黑色的氧化銅粉末和碳粉混合加熱，竟然變出紅色的銅！古代的人用木炭煉鐵也是同樣的道理。碳在這裡扮演什麼角色？",
 sub:"選一組反應物，加熱，看氧從誰身上跑到誰身上",
 tool:function(b,eq){
  var L=NB.lab,R=[{n:"碳＋氧化銅",a:"C",o:"CuO",eqn:"2CuO + C → 2Cu + CO₂",ox:"碳",rd:"氧化銅",p:"紅色的銅＋二氧化碳（使石灰水混濁）",c0:"#2b2b2b",c1:"#c46a3a"},{n:"氫氣＋氧化銅",a:"H₂",o:"CuO",eqn:"CuO + H₂ → Cu + H₂O",ox:"氫氣",rd:"氧化銅",p:"紅色的銅＋水",c0:"#2b2b2b",c1:"#c46a3a"},{n:"鎂＋二氧化碳",a:"Mg",o:"CO₂",eqn:"2Mg + CO₂ → 2MgO + C",ox:"鎂",rd:"二氧化碳",p:"白色氧化鎂＋黑色碳粒（鎂在 CO₂ 中也能燃燒）",c0:"#bfc6cf",c1:"#f2f2f2"},{n:"一氧化碳＋氧化鐵（煉鐵）",a:"CO",o:"Fe₂O₃",eqn:"Fe₂O₃ + 3CO → 2Fe + 3CO₂",ox:"一氧化碳",rd:"氧化鐵",p:"鐵＋二氧化碳",c0:"#8a3a26",c1:"#6b7280"}];
  var v=L.stage(b,640,260,"氧化還原"),rx=NB.pick(b,"反應",R.map(function(r){return r.n}),0,function(){p.v=0;up()}),p=NB.slider(b,"加熱程度",0,100,5,0," %",up),g=L.g(v);
  function mix(a,b2,u){var A=parseInt(a.slice(1),16),B=parseInt(b2.slice(1),16),c=[16,8,0].map(function(s){var x=(A>>s)&255,y=(B>>s)&255;return Math.round(x+(y-x)*u)});return"rgb("+c.join(",")+")"}
  function up(){L.clear(g);var r=R[rx.v],u=p.v/100;NB.mk("path",{d:"M120 160h300q14 0 14 14t-14 14H120q-20 0-20-14t20-14z",fill:"var(--paper)"},g,2);
   NB.mk("path",{d:"M140 176h170",fill:"none",stroke:mix(r.c0,r.c1,u)},g,14);L.lamp(g,230,258,u>0,.6);
   NB.mk("path",{d:"M434 174h80v40",fill:"none",stroke:"var(--soft)"},g,3);L.beaker(g,480,250,70,60,.7,"var(--p2)",{op:r.eqn.indexOf("CO₂")>0&&rx.v!==2?.15+u*.6:.15});
   /* 氧原子搬家示意 */
   var ox=170+u*120,oy=100-Math.sin(u*Math.PI)*40;NB.t(g,170,70,r.o,{z:15,b:1});NB.t(g,300,70,r.a,{z:15,b:1});L.atom(g,ox,oy,"O",1);if(u>0)L.arrow(g,180,100,290,100,"var(--p1)",1.4,7);
   NB.t(g,470,40,r.eqn,{z:16,b:1,c:"var(--p1)"});
   eq.innerHTML=u<.05?"還沒加熱。":"<b>"+r.ox+"</b>搶走了"+r.rd+"中的氧 → "+r.ox+"被<b>氧化</b>（是<b>還原劑</b>）；"+r.rd+"失去氧，被<b>還原</b>（是<b>氧化劑</b>）。<br>產物："+r.p+"。氧化和還原<b>同時發生</b>。"}
  up()},
 steps:["<b>氧化</b>：物質得到氧；<b>還原</b>：物質失去氧，兩者一定同時發生","搶走別人氧的物質是<b>還原劑</b>（自己被氧化）；提供氧的物質是<b>氧化劑</b>（自己被還原）","活性大的元素可以把活性小的元素從它的氧化物中還原出來（例：碳 > 銅、鎂 > 碳）","煉鐵：在高爐中以焦炭產生的一氧化碳還原氧化鐵","生活中的漂白水、雙氧水消毒，也都利用氧化反應"],
 key:["判斷誰被氧化：看誰「拿到」氧","鎂可以在二氧化碳中燃燒，所以鎂著火不能用 CO₂ 滅火器"],
 ch:[{q:"反應 2CuO + C → 2Cu + CO₂ 中，哪一個物質是還原劑？",o:["CuO","C","Cu","CO₂"],a:1,h:"誰搶到了氧？"},
     {q:"鎂帶可以在二氧化碳中燃燒，這表示鎂和碳對氧的活性關係是？",o:["鎂 > 碳","碳 > 鎂","一樣大","無法判斷"],a:0}]
});
