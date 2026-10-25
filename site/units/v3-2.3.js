/* 第三冊 2-3 空氣的組成：成分比例、氧氣與二氧化碳的檢驗 */
NB.unit({
 q:"空氣看不見也摸不到，它其實是好幾種氣體混在一起的混合物。哪一種最多？要怎麼分辨一瓶氣體是氧氣還是二氧化碳？",
 sub:"看空氣的成分；選一瓶氣體、選一種檢驗方法",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["空氣成分","氣體檢驗"],function(i){i?test():pie()}),P1=tb.panes[0],P2=tb.panes[1];
  var v=L.stage(P1,640,260,"空氣成分"),g=L.g(v),C=[["氮氣",78,"var(--p2)"],["氧氣",21,"var(--p1)"],["氬氣",0.93,"var(--p5)"],["二氧化碳",0.04,"var(--p3)"],["其他（含水氣）",0.03,"var(--p4)"]];
  function pie(){L.clear(g);var a=-Math.PI/2,cx=170,cy=130,r=105;C.forEach(function(c,i){var da=Math.max(.02,c[1]/100*Math.PI*2),x1=cx+r*Math.cos(a),y1=cy+r*Math.sin(a),x2=cx+r*Math.cos(a+da),y2=cy+r*Math.sin(a+da);
    NB.mk("path",{d:"M"+cx+" "+cy+"L"+x1+" "+y1+"A"+r+" "+r+" 0 "+(da>Math.PI?1:0)+" 1 "+x2+" "+y2+"Z",fill:c[2],"fill-opacity":.7},g,1.6);a+=da;
    NB.mk("rect",{x:330,y:40+i*38,width:18,height:18,rx:4,fill:c[2],"fill-opacity":.7},g,1.4);NB.t(g,358,55+i*38,c[0]+"　約 "+c[1]+"%",{z:15,a:"start"})});
   eq.innerHTML="乾燥空氣中<b>氮氣約 78%</b>、<b>氧氣約 21%</b>，其餘約 1%（主要是氬氣）。二氧化碳雖然只有約 0.04%，卻和光合作用、溫室效應息息相關。"}
  var v2=L.stage(P2,640,280,"氣體檢驗"),g2=L.g(v2),gas=NB.pick(P2,"瓶中氣體",["氧氣","二氧化碳","氮氣","空氣"],0,test),how=NB.pick(P2,"檢驗方法",["放入點燃的線香","放入有餘燼的線香","通入澄清石灰水"],1,test);
  function test(){L.clear(g2);var G=gas.v,H=how.v,res,txt;
   NB.mk("path",{d:"M120 90h70v8q22 6 22 30v120q0 12-12 12h-90q-12 0-12-12v-120q0-24 22-30z",fill:"var(--p2)","fill-opacity":.06},g2,2);NB.t(g2,155,80,"集氣瓶",{z:12,c:"var(--soft)"});
   if(H<2){var burn=G===0?2:G===3?1:0,on=H===0;NB.mk("path",{d:"M300 40L170 200",fill:"none",stroke:"var(--p4b)"},g2,4);
    if(burn===2||(on&&burn===1)){NB.mk("path",{d:"M170 200q-14-20-2-44q6 16 10 20q8-12 2-28q18 24 2 52z",fill:burn===2?"var(--p4)":"var(--p4)","fill-opacity":burn===2?.95:.6},g2,1.6);if(burn===2)NB.mk("circle",{cx:170,cy:180,r:34,fill:"var(--p4)","fill-opacity":.18,stroke:"none"},g2)}
    else if(!on||burn===0)NB.mk("circle",{cx:170,cy:200,r:4,fill:burn===0&&on?"var(--soft)":"var(--p1)"},g2,1);
    res=G===0?(H?"有餘燼的線香<b>復燃</b>，燒得更旺":"線香燒得<b>更旺、更亮</b>"):G===3?(H?"餘燼只是微微發紅，不會復燃":"線香繼續正常燃燒"):"線香<b>熄滅</b>";
    txt=G===0?"氧氣有<b>助燃性</b>（本身不會燃燒）。":G===3?"空氣中的氧氣只有約 21%，不夠讓餘燼復燃。":(G===1?"二氧化碳不可燃也不助燃。":"氮氣性質穩定，不助燃。")}
   else{var milky=G===1||G===3;NB.mk("path",{d:"M300 40V140H230",fill:"none",stroke:"var(--soft)"},g2,3);NB.mk("path",{d:"M380 120v120q0 12 12 12h40q12 0 12-12V120",fill:"none"},g2,2);
    NB.mk("rect",{x:382,y:170,width:60,height:80,fill:milky?"var(--paper)":"var(--p2)","fill-opacity":milky?.95:.12,stroke:"none"},g2);NB.mk("path",{d:"M300 140h60l10 70",fill:"none",stroke:"var(--soft)"},g2,3);
    for(var i=0;i<6;i++)NB.mk("circle",{cx:400+(i*9)%40,cy:240-i*11,r:3,fill:"none",stroke:"var(--soft)"},g2,1);NB.t(g2,412,275,"澄清石灰水",{z:12,c:"var(--soft)"});
    res=G===1?"石灰水<b>明顯變混濁</b>（白色沉澱）":G===3?"要通很久才會<b>微微</b>混濁（空氣中二氧化碳很少）":"石灰水<b>沒有變化</b>，保持澄清";txt="二氧化碳會使澄清石灰水變混濁，可用來檢驗二氧化碳。"}
   eq.innerHTML="結果："+res+"。"+txt}
  pie()},
 steps:["空氣是混合物：氮氣約 78%、氧氣約 21%、氬氣等約 1%，二氧化碳約 0.04%","氧氣：無色無味，本身不可燃但有<b>助燃性</b>，能使有餘燼的線香復燃","製氧：雙氧水加二氧化錳（催化劑），用排水集氣法收集（氧氣不易溶於水）","二氧化碳：不可燃、不助燃、能使澄清石灰水變混濁，密度比空氣大","製二氧化碳：大理石（碳酸鈣）加稀鹽酸，可用向上排氣法收集"],
 key:["氧氣 → 線香餘燼復燃；二氧化碳 → 石灰水變混濁","二氧化錳是催化劑：加快反應，本身反應前後不變"],
 ch:[{q:"一瓶無色氣體能使有餘燼的線香復燃，這瓶氣體最可能是什麼？",o:["氮氣","二氧化碳","氧氣","氬氣"],a:2},
     {q:"用雙氧水製造氧氣時加入二氧化錳，二氧化錳的作用是什麼？",o:["提供氧氣","加快反應速率，本身不消耗","吸收水分","讓氧氣變得可燃"],a:1,h:"它叫做「催化劑」。"}]
});
