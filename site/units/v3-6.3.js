/* 第三冊 6-3 化合物與原子概念的發展：原子模型的演變、質子中子電子 */
NB.unit({
 q:"兩千多年前就有人猜「物質可以一直切下去，最後切到不能再切」。科學家花了好幾百年才慢慢看清原子的樣子，而且每一次都推翻前一個想法。原子到底長什麼樣？",
 sub:"看原子模型怎麼演變；組一個原子",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["模型演變","組合原子"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,240,"原子模型"),stp=NB.pick(P1,"",["道耳頓","湯姆森","拉塞福","波耳"],0,up1),g=L.g(v);
  var INFO=["<b>道耳頓（1803）</b>：原子是實心、不可分割的小球；同元素原子相同；化合物由不同原子以簡單整數比結合（原子說）。","<b>湯姆森（1897）</b>：發現帶負電的<b>電子</b>，提出「葡萄乾布丁」模型：電子散布在帶正電的球裡。","<b>拉塞福（1911）</b>：α 粒子散射實驗——大多數直接穿過，少數大角度反彈 → 原子中心有又小又重、帶正電的<b>原子核</b>，原子大部分是空的。","<b>波耳（1913）</b>：電子在原子核外特定的<b>軌域</b>上運動。之後發現原子核由質子與中子組成。"];
  function up1(){L.clear(g);var k=stp.v,cx=320,cy=120;
   if(k===0)NB.mk("circle",{cx:cx,cy:cy,r:70,fill:"var(--p4b)","fill-opacity":.7},g,2);
   if(k===1){NB.mk("circle",{cx:cx,cy:cy,r:80,fill:"var(--p1)","fill-opacity":.25},g,2);for(var i=0;i<10;i++){var a=i*2.4,r=20+(i*13)%55;NB.mk("circle",{cx:cx+r*Math.cos(a),cy:cy+r*Math.sin(a),r:7,fill:"var(--p2)"},g,1.2);NB.t(g,cx+r*Math.cos(a),cy+r*Math.sin(a)+4,"−",{z:11,c:"#fff"})}}
   if(k===2){NB.mk("circle",{cx:cx,cy:cy,r:95,fill:"none",stroke:"var(--soft)","stroke-dasharray":"3 4"},g,1.4);NB.mk("circle",{cx:cx,cy:cy,r:6,fill:"var(--p1)"},g,1.2);
    [-70,-40,-15,15,40,70].forEach(function(y){L.ray(g,120,cy+y,520,cy+y,"var(--p3)",1.4)});L.ray(g,120,cy+3,cx-8,cy+3,"var(--p1)",1.6);L.ray(g,cx-8,cy+3,140,cy+60,"var(--p1)",1.6);NB.t(g,120,30,"α 粒子",{z:12,c:"var(--p3)",a:"start"})}
   if(k===3){[45,80,110].forEach(function(r){NB.mk("circle",{cx:cx,cy:cy,r:r,fill:"none",stroke:"var(--soft)"},g,1.2)});NB.mk("circle",{cx:cx,cy:cy,r:16,fill:"var(--p1)","fill-opacity":.6},g,1.6);NB.t(g,cx,cy+5,"核",{z:12,b:1});
    [[45,0],[45,3.1],[80,1],[80,2.6],[80,4.2],[80,5.4],[110,.4],[110,2]].forEach(function(e){NB.mk("circle",{cx:cx+e[0]*Math.cos(e[1]),cy:cy+e[0]*Math.sin(e[1]),r:6,fill:"var(--p2)"},g,1.2)})}
   eq.innerHTML=INFO[k]}
  var v2=L.stage(P2,640,240,"組合原子"),pz=NB.slider(P2,"質子數",1,12,1,6,"",up2),nz=NB.slider(P2,"中子數",0,14,1,6,"",up2),ez=NB.slider(P2,"電子數",0,14,1,6,"",up2),g2=L.g(v2);
  var NM=["","氫 H","氦 He","鋰 Li","鈹 Be","硼 B","碳 C","氮 N","氧 O","氟 F","氖 Ne","鈉 Na","鎂 Mg"];
  function up2(){L.clear(g2);var cx=200,cy=120,i;for(i=0;i<pz.v+nz.v;i++){var a=i*2.39996,r=5*Math.sqrt(i);var isP=i%2===0?i/2<pz.v:Math.floor(i/2)>=nz.v;NB.mk("circle",{cx:cx+r*Math.cos(a),cy:cy+r*Math.sin(a),r:6,fill:isP?"var(--p1)":"#9aa7b4"},g2,1)}
   var shells=[2,8,8],left=ez.v;[50,80,105].forEach(function(r,j){NB.mk("circle",{cx:cx,cy:cy,r:r,fill:"none",stroke:"var(--soft)","stroke-dasharray":"3 4"},g2,1);var n=Math.min(left,shells[j]);left-=n;for(var k=0;k<n;k++){var a=k/n*Math.PI*2-Math.PI/2;NB.mk("circle",{cx:cx+r*Math.cos(a),cy:cy+r*Math.sin(a),r:5,fill:"var(--p2)"},g2,1)}});
   NB.mk("circle",{cx:420,cy:70,r:7,fill:"var(--p1)"},g2,1);NB.t(g2,435,75,"質子（+）",{z:12,a:"start"});NB.mk("circle",{cx:420,cy:95,r:7,fill:"#9aa7b4"},g2,1);NB.t(g2,435,100,"中子（不帶電）",{z:12,a:"start"});NB.mk("circle",{cx:420,cy:120,r:6,fill:"var(--p2)"},g2,1);NB.t(g2,435,125,"電子（−）",{z:12,a:"start"});
   var ch=pz.v-ez.v;NB.t(g2,500,175,NM[pz.v]+(ch?(Math.abs(ch)>1?Math.abs(ch):"")+(ch>0?"⁺":"⁻"):""),{z:20,b:1,c:"var(--p1)"});
   eq.innerHTML="質子數 "+pz.v+" → 原子序 "+pz.v+"，是<b>"+NM[pz.v]+"</b>（質子數決定是哪一種元素）<br>質量數 = 質子 + 中子 = <b>"+(pz.v+nz.v)+"</b>；"+(ch===0?"質子數 = 電子數，原子<b>電中性</b>":"電荷 = "+(ch>0?"+":"")+ch+" → 這是<b>"+(ch>0?"陽":"陰")+"離子</b>")}
  up1()},
 steps:["道耳頓原子說：物質由原子組成；同元素原子性質相同；化合物由不同原子以固定整數比結合","原子由原子核（質子＋中子）和核外電子組成；質子帶正電、電子帶負電、中子不帶電","原子序 = 質子數；一般原子質子數 = 電子數，所以呈電中性","質量數 = 質子數 + 中子數；電子質量極小，原子質量幾乎集中在原子核","原子得到電子變陰離子、失去電子變陽離子；質子數不會變"],
 key:["決定元素種類的是「質子數」","同一元素中子數可以不同（同位素），化學性質相同"],
 ch:[{q:"某原子有 11 個質子、12 個中子，它的質量數是多少？",a:23,tol:.01,h:"質量數 = 質子 + 中子。"},
     {q:"拉塞福的 α 粒子散射實驗，最重要的結論是什麼？",o:["原子是實心的小球","電子散布在正電的球中","原子中心有又小又重、帶正電的原子核","電子在固定軌域上運動"],a:2}]
});
