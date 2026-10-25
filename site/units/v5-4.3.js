/* 第五冊 4-3 電壓：電池串聯與並聯、伏特計、水位類比 */
NB.unit({
 q:"遙控器要放兩顆 1.5 V 的電池，手電筒有的放三顆。電池的「伏特」到底是什麼？電池怎麼接，電壓才會變大？",
 sub:"改變電池的數量和接法，看伏特計讀數",
 tool:function(b,eq){
  var L=NB.lab,n=NB.slider(b,"電池數量（每顆 1.5 V）",1,4,1,2," 顆",up),mode=NB.pick(b,"電池接法",["串聯","並聯"],0,up),v=L.stage(b,640,250,"電壓"),g=L.g(v);
  function up(){L.clear(g);var ser=mode.v===0,V=ser?1.5*n.v:1.5;
   for(var i=0;i<n.v;i++){var x=ser?80+i*70:200,y=ser?120:50+i*48;NB.mk("rect",{x:x,y:y,width:56,height:28,rx:4,fill:"var(--paper2)"},g,1.8);NB.mk("rect",{x:x+56,y:y+8,width:6,height:12,fill:"var(--ink)"},g,1);NB.t(g,x+28,y+19,"1.5V",{z:11})}
   if(ser){var xe=80+n.v*70-8;NB.mk("path",{d:"M80 134H50V40H525V80M"+xe+" 134H440V200H525V160",fill:"none"},g,2);for(var j=1;j<n.v;j++)NB.mk("path",{d:"M"+(80+j*70-8)+" 134H"+(80+j*70),fill:"none"},g,2)}
   else{var yb=50+(n.v-1)*48+14;NB.mk("path",{d:"M180 64V"+yb+"M290 64V"+yb+"M180 64V30H525V80M290 "+yb+"V"+(yb+30)+"H440V200H525V160",fill:"none"},g,2);for(var j2=0;j2<n.v;j2++){var yy=50+j2*48+14;NB.mk("path",{d:"M180 "+yy+"H200M262 "+yy+"H290",fill:"none"},g,2)}}
   NB.mk("rect",{x:470,y:80,width:110,height:80,rx:10,fill:"var(--paper)"},g,2);NB.t(g,525,108,"伏特計",{z:12,c:"var(--soft)"});NB.t(g,525,140,NB.r(V,1)+" V",{z:20,b:1,c:"var(--p1)"});
   /* 水位類比 */
   NB.mk("rect",{x:60,y:200,width:40,height:40,fill:"var(--p2)","fill-opacity":.25},g,1.4);NB.mk("rect",{x:60,y:240-V*4,width:40,height:V*4,fill:"var(--p2)","fill-opacity":.6,stroke:"none"},g);NB.t(g,170,230,"像水位差：電壓越大，推動電流的力量越大",{z:11,c:"var(--soft)",a:"start"});
   eq.innerHTML=(ser?"<b>串聯</b>：總電壓 = 各電池電壓相加 = "+n.v+" × 1.5 = <b>"+NB.r(V,1)+"</b> V。":"<b>並聯</b>：總電壓仍是 <b>1.5</b> V，但電池可以用比較久。")+"<br>伏特計要和被測的元件<b>並聯</b>。"}
  up()},
 steps:["<b>電壓</b>（電位差）：推動電荷流動的原因，單位伏特（V）；像水位差推動水流","電池提供電壓；一般乾電池 1.5 V，家用插座 110 V","電池<b>串聯</b>：總電壓 = 各電池電壓之和；電池<b>並聯</b>（相同電池）：總電壓不變，使用時間較長","<b>伏特計</b>要<b>並聯</b>在待測元件兩端，正端接高電位","串聯電路：總電壓 = 各元件電壓之和；並聯電路：各分路電壓都相等"],
 key:["安培計串聯、伏特計並聯","伏特計內電阻很大，接上去幾乎不影響電路"],
 ch:[{q:"四顆 1.5 V 的乾電池串聯，總電壓是多少伏特？",a:6,u:"V",tol:.01},
     {q:"量燈泡兩端的電壓時，伏特計應該怎麼接？",o:["和燈泡串聯","和燈泡並聯","直接接在電池正極","接在電路任何地方都可以"],a:1}]
});
