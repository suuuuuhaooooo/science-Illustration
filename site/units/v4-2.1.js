/* 第四冊 2-1 氧化反應：燃燒三要素與滅火、金屬對氧的活性 */
NB.unit({
 q:"同樣放在空氣中，鎂帶一點就發出刺眼的白光，鐵釘卻要好幾天才慢慢生鏽，金子放了幾千年還是亮晶晶。為什麼不同的金屬，和氧結合的難易差那麼多？",
 sub:"試試看缺少哪一個條件就燒不起來；比較金屬和氧的反應",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["燃燒三要素","金屬與氧"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,280,"燃燒三要素"),g=L.g(v),F={f:1,o:1,t:1},bs=[["f","可燃物"],["o","助燃物（氧氣）"],["t","溫度達到燃點"]];
  var row=NB.h('<div class="ctl btns"></div>');bs.forEach(function(k){var x=NB.h('<button type="button" class="pen on" aria-pressed="true">'+k[1]+'</button>');x.onclick=function(){F[k[0]]=!F[k[0]];x.classList.toggle("on",!!F[k[0]]);x.setAttribute("aria-pressed",!!F[k[0]]);up1()};row.appendChild(x)});P1.appendChild(row);
  function up1(){L.clear(g);var P=[[320,40],[170,210],[470,210]];NB.mk("polygon",{points:P.map(function(p){return p.join(",")}).join(" "),fill:"none",stroke:"var(--soft)","stroke-dasharray":"5 5"},g,1.6);
   bs.forEach(function(k,i){var on=F[k[0]],p=P[[2,1,0][i]];NB.mk("circle",{cx:p[0],cy:p[1],r:30,fill:on?"var(--p3)":"var(--paper2)","fill-opacity":on?.35:1},g,2);if(i===2)NB.t(g,p[0]+40,p[1]+5,k[1],{z:13,b:on,a:"start"});else NB.t(g,p[0],p[1]+52,k[1],{z:13,b:on})});
   var all=F.f&&F.o&&F.t;if(all)NB.mk("path",{d:"M320 175q-30-40-6-80q8 28 16 30q14-24 4-52q40 50 8 102z",fill:"var(--p4)"},g,1.8);else NB.t(g,320,160,"燒不起來",{z:16,c:"var(--soft)"});
   var miss=bs.filter(function(k){return!F[k[0]]}).map(function(k){return k[1]});
   eq.innerHTML=all?"三個條件都有 → <b>燃燒</b>（劇烈的氧化反應，發光發熱）。":"缺少了「"+miss.join("、")+"」 → 火會熄滅。滅火就是破壞其中一個條件："+(!F.f?"移走可燃物（森林防火線）":!F.o?"隔絕氧氣（蓋鍋蓋、滅火毯）":"降低溫度到燃點以下（灑水）")+"。"}
  var M=[["鎂",5,"燃燒發出強烈白光，生成白色氧化鎂"],["鋁",4,"表面生成緻密氧化鋁薄膜，保護內部"],["鋅",3,"加熱可燃燒，生成白色氧化鋅"],["鐵",2,"在潮濕空氣中慢慢生鏽；鐵絲在純氧中可燃燒、火星四射"],["銅",1,"加熱後表面變黑（氧化銅），不易燃燒"],["金",0,"幾乎不和氧反應，永保光澤"]];
  var v2=L.stage(P2,640,290,"金屬活性"),mt=NB.pick(P2,"加熱的金屬",M.map(function(m){return m[0]}),0,up2),g2=L.g(v2);
  function up2(){L.clear(g2);var k=M[mt.v];M.forEach(function(m,i){var x=60+i*100,on=i===mt.v;NB.mk("rect",{x:x-36,y:30,width:72,height:40,rx:8,fill:on?"var(--p4)":"var(--paper)","fill-opacity":on?.4:1},g2,on?2.4:1.4);NB.t(g2,x,56,m[0],{z:15,b:on})});
   L.arrow(g2,30,92,610,92,"var(--soft)",1.4,8);NB.t(g2,320,112,"活性：大 → 小（越左邊越容易和氧結合）",{z:12,c:"var(--soft)"});
   L.lamp(g2,320,285,true,.9);NB.mk("path",{d:"M260 195h120",fill:"none",stroke:"#9aa7b4"},g2,8);if(k[1]>=3)NB.mk("circle",{cx:320,cy:195,r:10+k[1]*7,fill:"#fff8d0","fill-opacity":.7,stroke:"var(--p4)"},g2,1.4);
   eq.innerHTML="<b>"+k[0]+"</b>："+k[2]+"。<br>金屬對氧的活性：鎂 > 鋁 > 鋅 > 鐵 > 銅 > 金。活性越大，越容易和氧結合，氧化物也越不容易被還原。"}
  up1()},
 steps:["物質和氧結合的反應叫<b>氧化反應</b>；劇烈、發光發熱的叫燃燒，緩慢的例如生鏽、呼吸作用","燃燒三要素：可燃物、助燃物（氧）、溫度達到燃點，缺一不可","滅火：移除可燃物、隔絕氧氣、降低溫度","金屬活性（對氧）：K > Na > Ca > Mg > Al > Zn > Fe > Pb > Cu > Hg > Ag > Pt > Au","非金屬氧化物溶於水多呈酸性（CO₂、SO₂），金屬氧化物溶於水多呈鹼性（MgO）"],
 key:["鋁的活性比鐵大，卻不容易鏽蝕：表面緻密的氧化鋁保護膜","鐵生鏽需要水和氧，塗漆、鍍鋅可以防鏽"],
 ch:[{q:"油鍋起火時，最適當的處理方式是什麼？",o:["立刻倒水","蓋上鍋蓋並關火","用電扇吹","加更多油"],a:1,h:"想想三要素中哪一個最容易移除。"},
     {q:"鎂、鐵、銅三種金屬對氧的活性，由大到小排列是？",o:["鐵 > 鎂 > 銅","鎂 > 鐵 > 銅","銅 > 鐵 > 鎂","鎂 > 銅 > 鐵"],a:1}]
});
