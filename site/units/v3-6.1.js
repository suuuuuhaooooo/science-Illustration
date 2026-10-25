/* 第三冊 6-1 元素的探索：電解水（氫：氧 = 2：1）、元素・化合物・混合物的粒子圖 */
NB.unit({
 q:"水看起來是一種很單純的東西，但通電之後，竟然可以分成兩種完全不同的氣體。水到底是由什麼組成的？",
 sub:"通電電解水；判斷粒子圖是元素、化合物還是混合物",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["電解水","粒子圖分類"],function(i){if(i){quiz();eq.innerHTML="判斷這一盒粒子是元素、化合物還是混合物。"}else up()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,300,"電解水"),T=NB.slider(P1,"通電時間",0,10,0.5,0," 分鐘",up),g=L.g(v),test=-1;
  NB.btn(P1,"用點燃的火柴測負極氣體",function(){test=0;up()});NB.btn(P1,"用有餘燼的線香測正極氣体".replace("体","體"),function(){test=1;up()});
  function up(){L.clear(g);var h2=T.v*4,o2=h2/2;NB.mk("path",{d:"M140 270H500V160H140Z",fill:"var(--p2)","fill-opacity":.12},g,2);
   [[220,"負極（−）",h2,"氫氣"],[420,"正極（＋）",o2,"氧氣"]].forEach(function(c,i){var top=40,gas=c[2]*4.2;NB.mk("path",{d:"M"+(c[0]-18)+" 250V"+top+"q18-16 36 0V250",fill:"var(--p2)","fill-opacity":.12},g,2);
    if(gas>0)NB.mk("path",{d:"M"+(c[0]-16)+" "+(top+gas)+"V"+(top+4)+"q16-13 32 0V"+(top+gas)+"Z",fill:"var(--paper)",stroke:"none"},g);
    NB.mk("path",{d:"M"+(c[0]-16)+" "+(top+gas)+"h32",fill:"none",stroke:"var(--p2)"},g,1.5);
    NB.mk("rect",{x:c[0]-4,y:200,width:8,height:60,fill:i?"var(--p1)":"var(--ink)"},g,1);NB.t(g,c[0],290,c[1],{z:12});
    if(T.v>0)NB.t(g,c[0]+30,top+20,NB.r(c[2],1)+" mL",{z:13,a:"start",c:"var(--p1)",b:1});
    for(var k=0;k<(T.v>0?4:0);k++)NB.mk("circle",{cx:c[0]+((k*7)%10)-5,cy:190-k*14,r:2.5,fill:"none",stroke:"var(--soft)"},g,1)});
   NB.mk("path",{d:"M220 270v20H140M420 270v20h80",fill:"none",stroke:"var(--soft)"},g,1.4);
   var r=test<0?"":test===0?(T.v?"負極的氣體被點燃，發出「啵」的爆鳴聲 → <b>氫氣</b>（可燃）。":"還沒有氣體，先通電吧！"):(T.v?"正極的氣體使線香餘燼復燃 → <b>氧氣</b>（助燃）。":"還沒有氣體，先通電吧！");
   eq.innerHTML="水（加少量氫氧化鈉幫助導電）通電後分解：負極產生氫氣 "+NB.r(h2,1)+" mL、正極產生氧氣 "+NB.r(o2,1)+" mL，體積比 <b>2：1</b>。"+(r?"<br>"+r:"")}
  var v2=L.stage(P2,640,230,"粒子圖"),g2=L.g(v2),qs=[],qi=0,ans=null;
  var KIND=["元素","化合物","混合物"];
  function mol(p,x,y,spec){var o=[["H","H"],["O","O"],["H","O","H"],["C","O","O"],["He"],["Na","Cl"]][spec];var K=1.15;if(o.length===1)L.atom(p,x,y,o[0],K*1.2);else if(o.length===2){L.atom(p,x-11*K,y,o[0],K);L.atom(p,x+11*K,y,o[1],K)}else{L.atom(p,x-15*K,y+7,o[0],K*.85);L.atom(p,x,y-5,o[1],K);L.atom(p,x+15*K,y+7,o[2],K*.85)}}
  var SETS=[{s:[0],k:0},{s:[1],k:0},{s:[4],k:0},{s:[2],k:1},{s:[3],k:1},{s:[5],k:1},{s:[0,1],k:2},{s:[2,3],k:2},{s:[1,4],k:2},{s:[2,5],k:2}];
  function quiz(){L.clear(g2);var Q=SETS[qi%SETS.length];NB.mk("rect",{x:150,y:20,width:340,height:190,rx:12,fill:"var(--paper)"},g2,2);
   for(var i=0;i<8;i++){var sp=Q.s[i%Q.s.length];mol(g2,190+(i%4)*80,70+Math.floor(i/4)*90+(i%2)*10,sp)}
   NB.t(g2,570,110,"這一盒是？",{z:15,c:"var(--soft)"});NB.t(g2,570,135,"第 "+(qi%SETS.length+1)+" 題",{z:12,c:"var(--soft)"})}
  var row=NB.h('<div class="ctl btns"></div>');KIND.forEach(function(k,i){var bt=NB.h('<button type="button" class="pen">'+k+'</button>');bt.onclick=function(){var Q=SETS[qi%SETS.length];
   if(i===Q.k){eq.innerHTML="答對！這一盒是<b>"+k+"</b>："+["只有一種原子（可以兩個原子連在一起）。","只有一種分子，而且分子由兩種以上的原子組成。","裡面有兩種以上不同的粒子。"][i];qi++;setTimeout(quiz,500)}else eq.innerHTML="再看一次：盒子裡有<b>幾種</b>不同的粒子？每種粒子由<b>幾種</b>原子組成？"};row.appendChild(bt)});P2.appendChild(row);
  up()},
 steps:["<b>元素</b>：無法用化學方法再分解成更簡單物質的純物質，例如氫、氧、鐵","<b>化合物</b>：由兩種以上元素以固定比例結合的純物質，可用化學方法分解，例如水、二氧化碳","<b>混合物</b>：兩種以上物質混在一起、沒有固定組成，例如空氣、食鹽水","電解水：2 水 → 2 氫氣 + 氧氣；負極氫氣、正極氧氣，體積比 2：1","氫氣：可燃、點火有爆鳴聲；氧氣：助燃、使餘燼復燃"],
 key:["純物質＝元素＋化合物；混合物不是純物質","電解水證明水不是元素，而是由氫和氧組成的化合物"],
 ch:[{q:"電解水時，正極收集到 12 mL 氧氣，負極大約會收集到多少 mL 氫氣？",a:24,u:"mL",tol:.01,h:"氫：氧 = 2：1。"},
     {q:"下列哪一個是化合物？",o:["氧氣","空氣","二氧化碳","銅"],a:2}]
});
