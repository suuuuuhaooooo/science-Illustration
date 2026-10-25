/* 第四冊 3-3 水溶液的酸鹼性：pH 值、[H⁺] 濃度、稀釋 */
NB.unit({
 q:"游泳池要定期檢測 pH 值，洗髮精標榜「弱酸性」。pH 值差 1 代表什麼？pH 2 的溶液比 pH 4 的酸多少倍？",
 sub:"拖動 pH，看廣用試劑的顏色和氫離子濃度；把溶液稀釋 10 倍",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,260,"pH"),pH=NB.slider(b,"pH 值",0,14,1,3,"",up),g=L.g(v);
  NB.btn(b,"加水稀釋 10 倍",function(){var x=pH.v;pH.v=x<7?Math.min(7,x+1):x>7?Math.max(7,x-1):7;up()},"go");
  var COL=["#c0182a","#e0302e","#ef5a2b","#f5862b","#f8b334","#f6d93b","#d9e23e","#7cc04a","#3fa35b","#2f9a8f","#2f7fc4","#3b5fbf","#5b48b0","#6b3aa0","#5e2a86"];
  var ITEMS=[[1,"胃酸"],[2.5,"檸檬汁"],[3,"食醋"],[5.6,"雨水"],[7,"純水"],[7.4,"血液"],[8.3,"小蘇打水"],[11,"氨水"],[12.5,"漂白水"],[13.5,"通樂"]];
  function up(){L.clear(g);for(var i=0;i<=14;i++){NB.mk("rect",{x:40+i*40,y:40,width:40,height:44,fill:COL[i],stroke:i===pH.v?"var(--ink)":"none"},g,i===pH.v?3:0);NB.t(g,60+i*40,100,i,{z:12})}
   ITEMS.forEach(function(it,j){var x=40+it[0]*40;NB.mk("path",{d:"M"+x+" 108v"+(j%2?40:16),fill:"none",stroke:"var(--soft)"},g,1);NB.t(g,x,j%2?162:138,it[1],{z:11,c:"var(--soft)"})});
   NB.t(g,60,26,"強酸",{z:12,c:"#c0182a"});NB.t(g,320,26,"中性",{z:12,c:"var(--soft)"});NB.t(g,600,26,"強鹼",{z:12,c:"#5e2a86"});
   L.beaker(g,250,250,160,70,.8,COL[pH.v],{op:.6,noTicks:true});
   var h=pH.v,t=h<7?"酸性":h>7?"鹼性":"中性";
   eq.innerHTML="pH = <b>"+h+"</b>（"+t+"）：[H⁺] = 10<sup>−"+h+"</sup> M"+(h!==7?"，比純水的 [H⁺] "+(h<7?"大":"小")+" 10<sup>"+Math.abs(7-h)+"</sup> 倍":"")+"。<br>pH 每差 1，[H⁺] 差 <b>10 倍</b>。酸性溶液加水稀釋，pH 會往 7 靠近，但不會超過 7。"}
  up()},
 steps:["25 °C 時，純水 [H⁺] = [OH⁻] = 10⁻⁷ M，pH = 7（中性）","pH < 7 酸性、pH = 7 中性、pH > 7 鹼性；pH 越小酸性越強","若 [H⁺] = 10⁻ⁿ M，則 pH = n；pH 每減 1，[H⁺] 變成 10 倍","廣用試劑（或 pH 試紙）可以用顏色判斷大約的 pH 值","酸性溶液稀釋後 pH 變大（接近 7）；鹼性溶液稀釋後 pH 變小（接近 7）"],
 key:["pH 2 的酸，[H⁺] 是 pH 4 的 100 倍","酸性溶液中也有 OH⁻，只是 [H⁺] > [OH⁻]"],
 ch:[{q:"某溶液 [H⁺] = 0.001 M，它的 pH 值是多少？",a:3,tol:.01,h:"0.001 = 10⁻³。"},
     {q:"pH 2 的溶液，[H⁺] 是 pH 5 的溶液的幾倍？",a:1000,u:"倍",tol:.5,h:"差 3，就是 10³ 倍。"}]
});
