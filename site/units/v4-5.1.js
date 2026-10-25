/* 第四冊 5-1 認識有機化合物：有機與無機的分類、加熱碳化 */
NB.unit({
 q:"糖、木頭、塑膠、蛋白質加熱過頭都會變黑，鹽和沙子卻不會。這些「會燒焦」的東西有什麼共同點？",
 sub:"加熱不同物質看會不會碳化；把物質分成有機或無機",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["加熱看看","分類遊戲"],function(i){if(i){game();eq.innerHTML="把每一張卡片放進正確的類別。"}else up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var S=[["砂糖",1],["麵粉",1],["食鹽",0],["沙子",0],["保麗龍",1],["小蘇打",0]],s=NB.pick(P1,"放入蒸發皿",S.map(function(x){return x[0]}),0,up1),h=NB.slider(P1,"加熱時間",0,10,1,0," 分鐘",up1),v=L.stage(P1,640,240,"碳化"),g=L.g(v);
  function up1(){L.clear(g);var o=S[s.v][1],u=h.v/10;NB.mk("path",{d:"M220 120q100 70 200 0z",fill:"var(--paper)"},g,2);
   var col=o?"rgb("+[250,245,230].map(function(c){return Math.round(c*(1-u*.9))}).join(",")+")":"#f6f3ea";for(var i=0;i<16;i++)NB.mk("circle",{cx:270+(i*13)%100,cy:132+(i%3)*6,r:6,fill:col},g,1);
   if(o&&u>.3)for(var k=0;k<4;k++)NB.mk("path",{d:"M"+(290+k*20)+" 110q-8-14 0-26q8-12 0-24",fill:"none",stroke:"var(--soft)","stroke-opacity":.6},g,1.6);L.lamp(g,320,235,h.v>0,.7);
   eq.innerHTML=h.v===0?"選一種物質，開始加熱。":o?"<b>"+S[s.v][0]+"</b>受熱後逐漸變焦變黑（碳化），冒出煙和水氣——它含有<b>碳</b>，是<b>有機物</b>。":"<b>"+S[s.v][0]+"</b>加熱後沒有變黑——它屬於<b>無機物</b>。"+(s.v===5?"（小蘇打含碳，但碳酸鹽類習慣上歸為無機物）":"")}
  var C=[["葡萄糖",1],["酒精",1],["甲烷",1],["蛋白質",1],["塑膠袋",1],["水",0],["食鹽",0],["二氧化碳",0],["大理石（碳酸鈣）",0],["一氧化碳",0]],done={},pv=NB.h('<div class="sortg"></div>');P2.appendChild(pv);
  function game(){pv.innerHTML='<p class="note">點一張卡片，再點它屬於哪一類。</p><div class="cards"></div><div class="bins"><div class="bin" data-k="1"><b>有機化合物</b><small>含碳（大多也含氫）</small><div></div></div><div class="bin" data-k="0"><b>無機物</b><small>包括 CO、CO₂、碳酸鹽</small><div></div></div></div>';
   var cards=pv.querySelector(".cards"),sel=null;C.forEach(function(c,i){var e=NB.h('<button type="button" class="pen card"></button>');e.textContent=c[0];if(done[i]){pv.querySelector('.bin[data-k="'+c[1]+'"] div').appendChild(e);e.disabled=true;e.classList.add("right");return}e.onclick=function(){sel=i;cards.querySelectorAll(".card").forEach(function(x){x.classList.toggle("sel",x===e)})};cards.appendChild(e)});
   pv.querySelectorAll(".bin").forEach(function(bn){bn.onclick=function(){if(sel===null)return;var c=C[sel];if(+bn.dataset.k===c[1]){done[sel]=1;eq.innerHTML="答對！「"+c[0]+"」是"+(c[1]?"有機化合物":"無機物")+"。（"+Object.keys(done).length+"／"+C.length+"）";game()}else eq.innerHTML="再想想：「"+c[0]+"」"+(c[1]?"含有碳和氫。":"雖然可能含碳，但屬於例外的無機物（或根本不含碳）。")}})}
  up1()},
 steps:["<b>有機化合物</b>：含碳的化合物（大多也含氫），但一氧化碳、二氧化碳、碳酸鹽等例外，屬於無機物","過去認為有機物只能由生物體產生；1828 年<b>烏勒</b>在實驗室合成出尿素，打破了這個想法","有機物受熱容易<b>碳化</b>（變黑），燃燒後常產生二氧化碳和水","有機物種類非常多：碳原子可以互相連成長鏈、分支或環狀","常見有機物：糖類、澱粉、蛋白質、油脂、酒精、塑膠、石油"],
 key:["含碳 ≠ 一定是有機物（CO₂、CaCO₃ 是無機物）","乾餾木材可以得到木炭"],
 ch:[{q:"下列哪一個物質屬於有機化合物？",o:["二氧化碳","碳酸鈣","乙醇（酒精）","一氧化碳"],a:2},
     {q:"第一位在實驗室中以無機物合成出有機物（尿素）的科學家是誰？",o:["拉瓦節","道耳頓","烏勒","牛頓"],a:2}]
});
