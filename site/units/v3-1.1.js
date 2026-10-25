/* 第三冊 1-1 長度與體積的測量：直尺讀數（準確值＋估計值）、排水法 */
NB.unit({
 q:"小芸用兩把尺量同一支鉛筆：一把只有公分刻度，另一把有毫米刻度。兩把尺量出來的紀錄，應該寫到小數點後第幾位才合理？如果要量一顆小石頭的體積，又該怎麼做？",
 sub:"拖鉛筆的筆尖，讀出長度；把石頭放進量筒看水位",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["直尺讀數","排水法"],function(i){i?up2():up1()}),P1=tb.panes[0],P2=tb.panes[1];
  /* ---- 直尺 ---- */
  var v=L.stage(P1,640,166,"直尺與鉛筆"),fine=NB.pick(P1,"直尺",["最小刻度 1 公分","最小刻度 1 毫米"],1,up1),len=8.37,X0=40,K=56;
  var g=L.g(v),tip=null;
  function up1(){L.clear(g);var mm=fine.v===1;
   NB.mk("rect",{x:X0-14,y:96,width:10*K+28,height:58,rx:6,fill:"var(--paper)"},g,2);
   for(var i=0;i<=100;i++){if(!mm&&i%10)continue;var x=X0+i*K/10,l=i%10===0?24:i%5===0?16:9;NB.mk("path",{d:"M"+x+" 96v"+l,fill:"none"},g,i%10?1:1.5);if(i%10===0)NB.t(g,x,138,i/10,{z:13})}
   NB.t(g,X0+10*K+6,150,"公分",{z:11,c:"var(--soft)",a:"end"});
   var ex=X0+len*K;NB.mk("path",{d:"M"+X0+" 60H"+(ex-22)+"l22 12-22 12H"+X0+"Z",fill:"var(--p4)","fill-opacity":.75},g,2);NB.mk("path",{d:"M"+(ex-22)+" 60l22 12-22 12",fill:"var(--paper2)"},g,2);NB.mk("path",{d:"M"+(ex-6)+" 69l6 3-6 3",fill:"var(--ink)"},g,1);
   NB.mk("path",{d:"M"+X0+" 56v30M"+ex+" 52v44",fill:"none",stroke:"var(--p1)","stroke-dasharray":"3 3"},g,1.4);
   tip=NB.mk("circle",{cx:ex,cy:46,r:11,fill:"var(--p1)","fill-opacity":.25,stroke:"var(--p1)"},g,1.6);NB.t(g,ex,24,"拖我",{z:12,c:"var(--p1)"});
   NB.drag(v,tip,function(x){len=NB.clamp((x-X0)/K,1,9.9);up1()});
   var unit=mm?0.1:1,acc=Math.floor(len/unit+1e-9)*unit,est=NB.r(len,mm?2:1),digits=mm?2:1;
   eq.innerHTML="最小刻度 "+(mm?"1 毫米（0.1 公分）":"1 公分")+"：準確值讀到 <b>"+acc.toFixed(mm?1:0)+"</b> 公分，再往下<b>估計一位</b> → 紀錄 <b>"+est.toFixed(digits)+" 公分</b>"+"<br>最後一位「"+est.toFixed(digits).slice(-1)+"」是估計值；刻度越精細，可以記錄的位數越多。"}
  /* ---- 排水法 ---- */
  var v2=L.stage(P2,640,300,"量筒排水法"),w0=NB.slider(P2,"原本的水",20,60,1,40," mL",up2),sv=NB.slider(P2,"石頭體積",2,25,0.5,12," cm³",up2),inn=false,g2=L.g(v2);
  NB.btn(P2,"放入／拿出石頭",function(){inn=!inn;up2()},"go");
  function up2(){L.clear(g2);var lv=w0.v+(inn?sv.v:0),C=L.cylinder(g2,250,280,250,100,2,lv,"var(--p2)",{unit:"mL"}),r=Math.cbrt(sv.v)*6;
   var cy=inn?Math.min(280-14-r,C.y(w0.v)+r+4):40;NB.mk("path",{d:"M273 "+(inn?C.y(lv)-30:8)+"V"+(cy-r),fill:"none",stroke:"var(--soft)"},g2,1.2);
   NB.mk("path",{d:"M"+(273-r)+" "+cy+"q"+r*.3+" "+(-r*1.1)+" "+r+" "+(-r)+"q"+r*.9+" "+r*.1+" "+r+" "+r+"q-"+r*.2+" "+r*.9+" -"+r+" "+r+"q-"+r*.8+" 0 -"+r+" -"+r+"z",fill:"var(--p4b)","fill-opacity":.85},g2,1.8);
   NB.mk("path",{d:"M226 "+C.y(lv)+"h-30",fill:"none",stroke:"var(--p1)"},g2,1.6);NB.t(g2,190,C.y(lv)+5,NB.r(lv,1)+" mL",{z:14,c:"var(--p1)",b:1,a:"end"});
   if(inn){NB.mk("path",{d:"M226 "+C.y(w0.v)+"h-30",fill:"none",stroke:"var(--soft)","stroke-dasharray":"4 3"},g2,1.4);NB.t(g2,190,C.y(w0.v)+5,w0.v+" mL",{z:13,c:"var(--soft)",a:"end"})}
   NB.t(g2,470,120,"讀數時，眼睛要和",{z:13,c:"var(--soft)"});NB.t(g2,470,140,"凹液面的最低點同高",{z:13,c:"var(--soft)"});
   eq.innerHTML=inn?"石頭體積 = 放入後 − 放入前 = "+NB.r(lv,1)+" − "+w0.v+" = <b>"+NB.r(sv.v,1)+"</b> mL = <b>"+NB.r(sv.v,1)+"</b> cm³（1 mL = 1 cm³）":"先記下原本的水位 "+w0.v+" mL，再把石頭放進去。"}
  up1()},
 steps:["測量值 = <b>準確值＋一位估計值</b>：讀到最小刻度，再往下估一位","最小刻度 1 公分的尺 → 記錄到 0.1 公分；最小刻度 1 毫米的尺 → 記錄到 0.01 公分","同一個量要量好幾次、取平均，可以減少誤差（但不能完全消除誤差）","不規則固體用排水法：體積 = 放入後水位 − 放入前水位","1 毫升（mL）= 1 立方公分（cm³），1 公升 = 1000 毫升"],
 key:["紀錄最後一位一定是估計值，例如 12.36 公分的「6」","排水法只適用不溶於水、不和水反應、會沉下去的物體","讀量筒：視線與凹液面最低點同高"],
 ch:[{q:"用最小刻度為 1 毫米的直尺量一張卡片的長度，下列哪一個紀錄最適當？",o:["9 公分","9.4 公分","9.43 公分","9.432 公分"],a:2,h:"1 毫米 = 0.1 公分，準確值讀到 0.1 公分，再估一位。"},
     {q:"量筒裡原本有 32.0 mL 的水，放入一顆螺帽後水面升到 35.5 mL。螺帽的體積是多少 cm³？",a:3.5,u:"cm³",tol:.01,h:"35.5 − 32.0。"}]
});
