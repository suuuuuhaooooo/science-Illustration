/* 第三冊 6-4 分子與化學式：分子模型、化學式的意義、數原子 */
NB.unit({
 q:"「2H₂O」和「H₂O₂」看起來都是 H 和 O，差一點點，卻是完全不同的東西：一個是兩個水分子，一個是雙氧水。化學式裡的大數字、小數字各代表什麼？",
 sub:"選分子、調整分子數，數一數有幾個原子",
 tool:function(b,eq){
  var L=NB.lab,MOL=[["H₂O","水",[["O",0,0],["H",-26,18],["H",26,18]]],["CO₂","二氧化碳",[["C",0,0],["O",-32,0],["O",32,0]]],["O₂","氧氣",[["O",-14,0],["O",14,0]]],["H₂O₂","過氧化氫",[["O",-14,0],["O",14,0],["H",-34,16],["H",34,-16]]],["NH₃","氨",[["N",0,0],["H",-26,14],["H",26,14],["H",0,-28]]],["CH₄","甲烷",[["C",0,0],["H",-26,-18],["H",26,-18],["H",-26,18],["H",26,18]]]];
  var v=L.stage(b,660,260,"分子模型"),m=NB.pick(b,"分子",MOL.map(function(x){return x[0]}),0,up),n=NB.slider(b,"分子個數（係數）",1,4,1,2,"",up),g=L.g(v);
  function up(){L.clear(g);var M=MOL[m.v],cnt={};for(var i=0;i<n.v;i++){var cx=110+i*140,cy=110;M[2].forEach(function(a){if(a[0]==="H")return;}); 
    M[2].forEach(function(a){NB.mk("path",{d:"M"+cx+" "+cy+"L"+(cx+a[1])+" "+(cy+a[2]),fill:"none"},g,3)});
    M[2].slice().sort(function(a,b2){return(a[0]==="H")-(b2[0]==="H")}).reverse().forEach(function(a){L.atom(g,cx+a[1],cy+a[2],a[0],1.1)});
    M[2].forEach(function(a){cnt[a[0]]=(cnt[a[0]]||0)+1})}
   var f=(n.v>1?n.v:"")+M[0];NB.t(g,330,215,f,{z:30,b:1,c:"var(--p1)"});
   var parts=Object.keys(cnt).map(function(k){return k+" 原子 "+cnt[k]*n.v+" 個"}),tot=0;Object.keys(cnt).forEach(function(k){tot+=cnt[k]*n.v});
   eq.innerHTML="<b>"+f+"</b>："+n.v+" 個"+M[1]+"分子，每個分子有 "+M[2].length+" 個原子。<br>共有 "+parts.join("、")+"，總共 <b>"+tot+"</b> 個原子。"}
  up()},
 steps:["<b>分子</b>：保有物質性質的最小粒子，由原子結合而成（例如水分子 = 2 個 H + 1 個 O）","化學式：用元素符號與數字表示物質的組成","右下角的小數字：一個分子中該原子的個數（1 省略不寫）","前面的大數字（係數）：分子的個數","金屬、離子化合物等沒有分子，用最簡單的原子比例表示，例如 Fe、NaCl"],
 key:["2H₂O：2 個分子，共 4 個 H、2 個 O","H₂O 和 H₂O₂ 組成不同，是不同的物質"],
 ch:[{q:"「3CO₂」中共有幾個氧原子？",a:6,u:"個",tol:.01,h:"每個 CO₂ 有 2 個 O，再乘以 3。"},
     {q:"化學式 NH₃ 代表的意義，下列何者正確？",o:["由 1 個氮分子和 3 個氫分子組成","每個分子由 1 個氮原子和 3 個氫原子組成","是一種元素","氮和氫的質量比是 1：3"],a:1}]
});
