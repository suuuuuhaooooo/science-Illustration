/* 第六冊 2-3 電流與磁場的交互作用：載流導線受力、直流馬達 */
NB.unit({
 q:"電風扇、吹風機、電動車都有一個會轉的「馬達」。通電之後線圈為什麼會轉？轉的方向可以改變嗎？",
 sub:"改變電流方向與磁場方向，看導線受力；打開直流馬達",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["導線受力","直流馬達"],function(i){i?0:up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var Id=NB.pick(P1,"電流方向",["流出紙面 ⊙","流入紙面 ⊗"],0,up1),Bd=NB.pick(P1,"磁場方向",["由左向右（左 N 右 S）","由右向左（左 S 右 N）"],0,up1),v=L.stage(P1,640,240,"受力"),g=L.g(v);
  function up1(){L.clear(g);var i=Id.v?-1:1,bb=Bd.v?-1:1,F=i*bb;/* 磁場 +x、電流 +z(出紙面) → F = I×B = +y（向上，畫面座標向上） */
   NB.mk("rect",{x:60,y:60,width:70,height:120,fill:bb>0?"var(--p1)":"var(--p2)","fill-opacity":.8},g,1.6);NB.t(g,95,128,bb>0?"N":"S",{z:22,b:1,c:"#fff"});NB.mk("rect",{x:510,y:60,width:70,height:120,fill:bb>0?"var(--p2)":"var(--p1)","fill-opacity":.8},g,1.6);NB.t(g,545,128,bb>0?"S":"N",{z:22,b:1,c:"#fff"});
   for(var k=0;k<4;k++)L.arrow(g,bb>0?150:490,80+k*27,bb>0?490:150,80+k*27,"var(--p2)",1,7);
   NB.mk("circle",{cx:320,cy:120,r:18,fill:"var(--paper)"},g,2.4);if(i>0)NB.mk("circle",{cx:320,cy:120,r:4,fill:"var(--ink)"},g,1);else NB.mk("path",{d:"M308 108l24 24M332 108l-24 24",fill:"none"},g,2.4);
   L.arrow(g,320,F>0?96:144,320,F>0?20:220,"var(--p1)",3.4,12);NB.t(g,340,F>0?40:205,"受力 F",{z:14,b:1,c:"var(--p1)",a:"start"});
   eq.innerHTML="載流導線在磁場中會受力，方向和<b>電流</b>、<b>磁場</b>都垂直：現在向<b>"+(F>0?"上":"下")+"</b>。<br>只改變電流方向或只改變磁場方向，受力方向就反過來；兩個都改，受力方向不變。（右手開掌定則：四指磁場、拇指電流、掌心推出方向即受力）"}
  var v2=L.stage(P2,640,260,"直流馬達"),on=NB.pick(P2,"開關",["關","開"],1,function(){}),rev=NB.pick(P2,"電池方向",["正接","反接"],0,function(){}),g2=L.g(v2),ang=0,w=0;
  L.loop(v2,function(dt){if(P2.hidden)return;var tgt=on.v?(rev.v?-1:1):0;w+=(tgt-w)*Math.min(1,dt/400);if(!L.reduce)ang+=w*dt*.004;L.clear(g2);
   NB.mk("rect",{x:80,y:60,width:80,height:140,fill:"var(--p1)","fill-opacity":.8},g2,1.6);NB.t(g2,120,135,"N",{z:20,b:1,c:"#fff"});NB.mk("rect",{x:480,y:60,width:80,height:140,fill:"var(--p2)","fill-opacity":.8},g2,1.6);NB.t(g2,520,135,"S",{z:20,b:1,c:"#fff"});
   var c=Math.cos(ang),s=Math.sin(ang);NB.mk("path",{d:"M"+(320-110*c)+" "+(130-40*s)+"L"+(320-110*c)+" "+(130-40*s-0)+"M"+(320-110*c)+" "+(80)+"V180M"+(320+110*c)+" 80V180M"+(320-110*c)+" 80H"+(320+110*c),fill:"none",stroke:"#c46a3a"},g2,4);
   NB.mk("circle",{cx:320,cy:225,r:16,fill:"var(--paper2)"},g2,2);NB.mk("path",{d:"M304 225h32",fill:"none"},g2,2);NB.t(g2,320,256,"換向器（電刷）",{z:11,c:"var(--soft)"});
   eq.innerHTML=on.v?"線圈兩邊電流方向相反，在磁場中受力方向也相反，形成力矩使線圈<b>轉動</b>；<b>換向器</b>每轉半圈改變一次電流方向，讓線圈持續往同一方向轉。"+(rev.v?"電池反接 → 轉向相反。":""):"開關關閉，沒有電流，馬達不轉。"});
  up1()},
 steps:["載流導線在磁場中會受到<b>磁力</b>作用，方向和電流方向、磁場方向都垂直","電流與磁場平行時不受力；垂直時受力最大","改變電流方向或磁場方向，受力方向相反","<b>直流馬達</b>：線圈在磁場中受力而轉動，換向器每半圈改變電流方向，使線圈持續轉動","馬達的能量轉換：電能 → 動能；揚聲器（喇叭）也是利用此原理"],
 key:["電流越大、磁場越強，受力越大，馬達轉得越快","馬達和發電機構造類似，作用相反"],
 ch:[{q:"直流馬達中「換向器」的功能是什麼？",o:["增加電壓","每半圈改變線圈中的電流方向","產生磁場","使線圈停下來"],a:1},
     {q:"直流馬達運轉時，主要的能量轉換是什麼？",o:["動能 → 電能","電能 → 動能","化學能 → 光能","熱能 → 電能"],a:1}]
});
