/* 第六冊 1-3 電池：鋅銅電池（化學能 → 電能）、電子流向 */
NB.unit({
 q:"在檸檬上插一片鋅、一片銅，接上導線就能點亮小 LED。沒有插頭也沒有發電機，電是從哪裡來的？",
 sub:"選兩種金屬當電極，看電子怎麼流",
 tool:function(b,eq){
  var L=NB.lab,M=[["鎂",2.4],["鋅",.76],["鐵",.44],["銅",-.34],["銀",-.8]],A=NB.pick(b,"電極甲",M.map(function(m){return m[0]}),1,up),B=NB.pick(b,"電極乙",M.map(function(m){return m[0]}),3,up),v=L.stage(b,660,280,"化學電池"),g=L.g(v),t=0;
  function up(){var a=M[A.v],c=M[B.v],V=Math.abs(a[1]-c[1]);eq.innerHTML=A.v===B.v?"兩極是同一種金屬，沒有電位差，<b>不會產生電流</b>。":"活性大的<b>"+(a[1]>c[1]?a[0]:c[0])+"</b>失去電子（被氧化）是<b>負極</b>；活性小的<b>"+(a[1]>c[1]?c[0]:a[0])+"</b>是<b>正極</b>。電子由負極經導線流向正極，電壓約 "+NB.r(V,2)+" V（兩金屬活性差越大，電壓越大）。"}
  L.loop(v,function(dt){t+=L.reduce?0:dt;L.clear(g);var a=M[A.v],c=M[B.v],neg=a[1]>c[1]?0:1,same=A.v===B.v;
   L.beaker(g,140,260,380,150,.75,"var(--p2)",{op:.15,noTicks:true});NB.mk("path",{d:"M330 110V258",fill:"none",stroke:"var(--soft)","stroke-dasharray":"4 4"},g,2);NB.t(g,330,104,"鹽橋／多孔隔板",{z:10,c:"var(--soft)"});
   NB.mk("rect",{x:200,y:70,width:20,height:170,fill:["#bfc6cf","#9aa7b4","#6b7684","#c46a3a","#d9dde3"][A.v]},g,1.6);NB.mk("rect",{x:440,y:70,width:20,height:170,fill:["#bfc6cf","#9aa7b4","#6b7684","#c46a3a","#d9dde3"][B.v]},g,1.6);
   NB.t(g,210,62,a[0]+(same?"":neg===0?"（−）":"（＋）"),{z:13,b:1});NB.t(g,450,62,c[0]+(same?"":neg===1?"（−）":"（＋）"),{z:13,b:1});
   NB.mk("path",{d:"M210 70V30H450V70",fill:"none"},g,2);NB.mk("circle",{cx:330,cy:30,r:14,fill:same?"var(--paper)":"#ffe27a","fill-opacity":same?1:.7},g,1.8);
   if(!same){var dir=neg===0?1:-1;for(var k=0;k<5;k++){var u=((t/1500+k/5)%1),x=dir>0?210+u*240:450-u*240,y=30;if(x>226&&x<434||1)NB.mk("circle",{cx:x,cy:y,r:4,fill:"var(--p2)"},g,1)}NB.t(g,330,60,"電子 e⁻ →".replace("→",dir>0?"→":"←"),{z:11,c:"var(--p2)"})}});
  up()},
 steps:["<b>化學電池</b>：利用氧化還原反應，把<b>化學能轉換成電能</b>","兩種活性不同的金屬放入電解質溶液：活性大的金屬失去電子當<b>負極</b>，活性小的當<b>正極</b>","鋅銅電池：鋅極 Zn → Zn²⁺ + 2e⁻（鋅片變薄）；銅極 Cu²⁺ + 2e⁻ → Cu（銅片變厚）","外電路中電子由負極流向正極，電流方向則相反（正極 → 負極）","乾電池、鹼性電池用完即丟；鋰電池、鉛蓄電池可以充電（充電時電能 → 化學能）"],
 key:["電極活性差越大，電池電壓越大","廢電池含重金屬，要分類回收"],
 ch:[{q:"鋅銅電池中，哪一個電極是負極？",o:["銅","鋅","兩者都是","鹽橋"],a:1,h:"活性大、容易失去電子的是負極。"},
     {q:"化學電池放電時的能量轉換是？",o:["電能 → 化學能","化學能 → 電能","熱能 → 電能","光能 → 電能"],a:1}]
});
