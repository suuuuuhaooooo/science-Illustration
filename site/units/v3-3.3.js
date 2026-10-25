/* 第三冊 3-3 聲波的反射與超聲波：回聲、聲納測深 */
NB.unit({
 q:"漁船想知道海有多深，但沒有那麼長的尺。船上的「聲納」只要送出一聲超聲波、等它從海底反彈回來，就能算出深度。怎麼算？",
 sub:"改變海的深度，按下發射，看超聲波來回的時間",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,300,"聲納"),D=NB.slider(b,"海深",150,1500,50,600," 公尺",function(){run=0;draw(0)}),g=L.g(v),run=0,tm=0,V=1500;
  NB.btn(b,"發射超聲波",function(){run=1;tm=0},"go");
  function y(d){return 60+d/1500*220}
  function draw(u){L.clear(g);var sea=y(D.v);NB.mk("path",{d:"M0 60H660V300H0Z",fill:"var(--p2)","fill-opacity":.12,stroke:"none"},g);NB.mk("path",{d:"M0 60H660",fill:"none",stroke:"var(--p2)"},g,1.6);
   NB.mk("path",{d:"M0 "+sea+"Q160 "+(sea-12)+" 330 "+sea+"T660 "+sea+"V300H0Z",fill:"var(--p4b)","fill-opacity":.45},g,1.6);
   NB.mk("path",{d:"M270 60h120l-14 22H284z",fill:"var(--paper)"},g,2);NB.mk("path",{d:"M300 60V34h40v26",fill:"var(--paper)"},g,2);
   var T=2*D.v/V,tt=u*T,down=tt<T/2,depth=(down?tt:(T-tt))*V;
   if(run&&u<1){var py=y(Math.max(0,depth));for(var k=0;k<3;k++)NB.mk("path",{d:"M"+(300+k*8)+" "+(py-k*8)+"q30 "+(down?10:-10)+" 60 0",fill:"none",stroke:down?"var(--p1)":"var(--p3)"},g,2.4);
    NB.t(g,470,120,(down?"往下傳…":"反射回來…")+" "+NB.r(tt,2)+" 秒",{z:15,c:down?"var(--p1)":"var(--p3)",b:1})}
   L.arrow(g,560,62,560,sea-2,"var(--soft)",1.4,7);L.arrow(g,560,sea-2,560,62,"var(--soft)",1.4,7);NB.t(g,570,(60+sea)/2,D.v+" m",{z:13,a:"start"});
   eq.innerHTML="海水中聲速約 1500 m/s。超聲波<b>一來一回</b>走了 2 × "+D.v+" = "+2*D.v+" m<br>時間 = 2 × 深度 ÷ 聲速 = <b>"+NB.r(T,3)+"</b> 秒；反過來，深度 = 聲速 × 時間 ÷ 2"}
  L.loop(v,function(dt){if(!run)return;var T=2*D.v/V;tm+=dt/1000/(L.reduce?.01:Math.max(1,T/2.5)*1);var u=Math.min(1,tm/T);draw(u);if(u>=1){run=0;draw(0)}});draw(0)},
 steps:["聲音碰到障礙物會反射；聽到的反射聲叫<b>回聲</b>","人耳要分辨回聲，原聲和回聲至少要相隔約 0.1 秒（距離牆約 17 m 以上）","人耳可聽頻率約 20～20000 Hz；高於 20000 Hz 叫<b>超聲波</b>，低於 20 Hz 叫次聲波","超聲波方向性好，可用在聲納測深、超音波檢查、清洗眼鏡；蝙蝠、海豚用它定位","測距：距離 = 聲速 × 來回時間 ÷ 2"],
 key:["回聲測距一定要「除以 2」：聲音走了一去一回","吸音材料（布、海綿、多孔板）可以減少回聲"],
 ch:[{q:"聲納送出超聲波，0.8 秒後收到海底的回波。海水中聲速 1500 m/s，海深多少公尺？",a:600,u:"公尺",tol:.5,h:"1500 × 0.8 ÷ 2。"},
     {q:"下列哪一項「不是」超聲波的應用？",o:["醫院做超音波檢查","漁船用聲納找魚群","用擴音器在操場廣播","超音波清洗機洗眼鏡"],a:2}]
});
