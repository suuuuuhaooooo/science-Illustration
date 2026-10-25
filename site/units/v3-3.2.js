/* 第三冊 3-2 聲波的產生與傳播：真空不能傳聲、介質與溫度影響聲速、打雷估距離 */
NB.unit({
 q:"看到閃電之後，過了幾秒才聽到雷聲。只要數一數秒數，就能估算打雷的地方離我們多遠，這是怎麼做到的？",
 sub:"抽掉鐘罩裡的空氣；換介質、改溫度、數秒數",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["真空鐘罩","聲速與打雷"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,260,"真空鐘罩"),air=NB.slider(P1,"罩內空氣",0,100,5,100," %",up1),g=L.g(v),ph=0;
  function up1(){eq.innerHTML=air.v>0?"罩內還有 "+air.v+"% 的空氣，鬧鐘的聲音聽起來 "+(air.v>60?"很清楚":air.v>20?"變小了":"非常微弱")+"。":"空氣抽光了：鐘錘還在敲（看得到振動），但<b>聽不到聲音</b>——聲音需要介質才能傳播。"}
  L.loop(v,function(dt){ph+=L.reduce?0:dt/40;L.clear(g);NB.mk("path",{d:"M150 230H490",fill:"none"},g,3);NB.mk("path",{d:"M190 230V90q0-60 130-60t130 60v140",fill:"var(--p2)","fill-opacity":air.v/100*.15},g,2);
   NB.mk("path",{d:"M470 230v14h60",fill:"none",stroke:"var(--soft)"},g,3);NB.t(g,560,250,"接抽氣機",{z:12,c:"var(--soft)"});
   NB.mk("circle",{cx:320,cy:150,r:42,fill:"var(--paper)"},g,2.4);NB.mk("path",{d:"M320 150V122M320 150l18 10",fill:"none"},g,2);
   var sh=Math.sin(ph)*5;NB.mk("circle",{cx:292+sh,cy:102,r:12,fill:"var(--p4)"},g,2);NB.mk("circle",{cx:348-sh,cy:102,r:12,fill:"var(--p4)"},g,2);NB.mk("path",{d:"M300 196l-12 26M340 196l12 26",fill:"none"},g,2.4);
   for(var i=1;i<=3;i++){var r=60+((ph*4+i*30)%90),op=air.v/100*(1-(r-60)/90);if(op>.02)NB.mk("path",{d:"M"+(320+r*.7)+" "+(150-r*.7)+"A"+r+" "+r+" 0 0 1 "+(320+r*.7)+" "+(150+r*.7),fill:"none",stroke:"var(--p1)","stroke-opacity":op},g,2)}});
  var v2=L.stage(P2,640,220,"打雷"),g2=L.g(v2),med=NB.pick(P2,"介質",["空氣","水","鋼鐵"],0,up2),T=NB.slider(P2,"氣溫",0,40,1,15," °C",up2),dt=NB.slider(P2,"看到閃電後幾秒聽到雷聲",1,10,0.5,3," 秒",up2);
  function sp(){return med.v===0?331+0.6*T.v:med.v===1?1500:5000}
  function up2(){L.clear(g2);var s=sp(),d=s*dt.v;
   NB.mk("path",{d:"M60 20l-18 46h16l-12 44 34-58H62l14-32z",fill:"var(--p4)"},g2,1.8);NB.person(g2,560,190,"var(--p2)",1.3);NB.mk("path",{d:"M40 190H600",fill:"none"},g2,2);
   L.arrow(g2,90,150,540,150,"var(--p1)",1.8,9);NB.t(g2,315,140,"距離 ≈ "+NB.r(d,0).toLocaleString()+" 公尺",{z:16,b:1,c:"var(--p1)"});
   NB.t(g2,315,176,med.v?"（想像聲音在"+["空氣","水","鋼鐵"][med.v]+"裡傳）":"光速很快，閃電幾乎是立刻看到",{z:12,c:"var(--soft)"});
   eq.innerHTML=(med.v===0?"空氣中聲速 ≈ 331 + 0.6 × "+T.v+" = <b>"+NB.r(s,1)+"</b> m/s":(["","水中","鋼鐵中"][med.v]+"聲速約 <b>"+s+"</b> m/s（固體 > 液體 > 氣體）"))+"<br>距離 = 聲速 × 時間 = "+NB.r(s,1)+" × "+dt.v+" ≈ <b>"+NB.r(d,0)+"</b> m"}
  up1()},
 steps:["聲音由物體<b>振動</b>產生；振動停止，聲音就停止","聲音要靠介質（固體、液體、氣體）傳播，真空中不能傳聲","一般情況下聲速：固體 > 液體 > 氣體","空氣中溫度越高聲速越快：v ≈ 331 + 0.6 T（m/s，T 為 °C）","光速遠大於聲速，所以先看到閃電再聽到雷聲；距離 = 聲速 × 時間差"],
 key:["太空中聽不到爆炸聲：沒有空氣當介質","15 °C 空氣中聲速約 340 m/s"],
 ch:[{q:"看到閃電後 3 秒聽到雷聲，聲速以 340 m/s 計算，打雷處大約離你幾公尺？",a:1020,u:"公尺",tol:.5,h:"距離 = 340 × 3。"},
     {q:"氣溫 25 °C 時，空氣中的聲速約為多少 m/s？（用 v = 331 + 0.6T）",a:346,u:"m/s",tol:.1,h:"331 + 0.6 × 25。"}]
});
