/* 第三冊 2-1 認識物質：三態粒子模型、物理變化與化學變化 */
NB.unit({
 q:"冰塊融化成水、蠟燭燃燒變短、鐵釘生鏽……這些變化都讓東西「變了」，它們有什麼不一樣？",
 sub:"調溫度看粒子怎麼動；把變化拖進正確的類別",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["三態粒子模型","物理或化學變化"],function(i){i?game():0}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,260,"三態粒子"),T=NB.slider(P1,"溫度",-20,120,1,-10," °C",function(){}),bx=L.g(v);
  NB.mk("rect",{x:60,y:30,width:300,height:210,rx:10,fill:"var(--paper)"},bx,2);
  var pt=L.particles(v,62,32,296,206,36,"var(--p2)",8),th=L.g(v),last="";
  L.loop(v,function(dt){var t=T.v,mode=t<0?"solid":t<100?"liquid":"gas",sp=mode==="solid"?.15+.02*(t+20)/20:mode==="liquid"?.05+t/1000:.25+(t-100)/200;
   pt.step(dt,mode==="solid"?sp*.5:sp,mode);
   if(mode+Math.round(t)!==last){last=mode+Math.round(t);L.clear(th);L.thermo(th,420,240,210,-20,120,t,{step:20});
    var nm={solid:"固態（冰）",liquid:"液態（水）",gas:"氣態（水蒸氣）"}[mode];NB.t(th,540,90,nm,{z:18,b:1,c:"var(--p1)"});
    NB.t(th,540,120,{solid:"粒子排列整齊",liquid:"粒子可以流動",gas:"粒子距離很大"}[mode],{z:13,c:"var(--soft)"});NB.t(th,540,140,{solid:"只在原地振動",liquid:"彼此仍靠近",gas:"快速向四面八方運動"}[mode],{z:13,c:"var(--soft)"});
    eq.innerHTML=nm+"：溫度 "+t+" °C。水分子本身沒有變，只是<b>排列與運動方式</b>改變——這是<b>物理變化</b>。"}});
  /* 分類小遊戲 */
  var CARDS=[["冰融化成水",0],["鐵釘生鏽",1],["紙張燃燒",1],["糖溶在水裡",0],["雞蛋煎熟",1],["玻璃杯摔破",0],["牛奶放久變酸",1],["水沸騰變成水蒸氣",0],["鞭炮爆炸",1],["把木頭鋸成兩段",0]],sc=0,done={},pv=NB.h('<div class="sortg"></div>');P2.appendChild(pv);
  function game(){pv.innerHTML='<p class="note">點一張卡片，再點它屬於哪一類。</p><div class="cards"></div><div class="bins"><div class="bin" data-k="0"><b>物理變化</b><small>沒有產生新物質</small><div></div></div><div class="bin" data-k="1"><b>化學變化</b><small>產生了新物質</small><div></div></div></div>';
   var cards=pv.querySelector(".cards"),sel=null;
   CARDS.forEach(function(c,i){var e=NB.h('<button type="button" class="pen card"></button>');e.textContent=c[0];if(done[i]!==undefined){pv.querySelector('.bin[data-k="'+c[1]+'"] div').appendChild(e);e.disabled=true;e.classList.add("right");return}
    e.onclick=function(){sel=i;cards.querySelectorAll(".card").forEach(function(x){x.classList.toggle("sel",x===e)})};cards.appendChild(e)});
   pv.querySelectorAll(".bin").forEach(function(bn){bn.onclick=function(){if(sel===null)return;var c=CARDS[sel],k=+bn.dataset.k;
    if(k===c[1]){done[sel]=1;sc++;eq.innerHTML="答對！「"+c[0]+"」是<b>"+(k?"化學":"物理")+"變化</b>"+(k?"：產生了新的物質。":"：只是形狀、狀態改變，物質本身沒變。")+"（"+Object.keys(done).length+"／"+CARDS.length+"）";game()}
    else eq.innerHTML="再想想：「"+c[0]+"」之後，有沒有變出<b>原本沒有的新物質</b>？"}})}
  eq.innerHTML="拖動溫度滑桿，觀察粒子。"},
 steps:["物質有固態、液態、氣態三種狀態；溫度改變時可以互相轉換","粒子觀點：固態排列緊密只在原地振動；液態可流動；氣態粒子距離大、運動快","<b>物理變化</b>：形狀、大小或狀態改變，沒有產生新物質（融化、溶解、摔破）","<b>化學變化</b>：產生新物質，常伴隨顏色改變、產生氣體、沉澱、發光發熱（燃燒、生鏽、腐敗）","物理性質：顏色、密度、熔點、沸點；化學性質：可燃性、會不會生鏽等"],
 key:["判斷關鍵只有一個：有沒有產生新物質","三態變化（融化、凝固、汽化、凝結、昇華）都是物理變化"],
 ch:[{q:"下列哪一個是化學變化？",o:["酒精揮發","食鹽溶於水","木炭燃燒","冰塊融化"],a:2,h:"哪一個變化後產生了新的物質？"},
     {q:"水從液態變成氣態時，水分子會怎樣？",o:["分子變大","分子分解成氫和氧","分子本身不變，彼此距離變大","分子數目變多"],a:2}]
});
