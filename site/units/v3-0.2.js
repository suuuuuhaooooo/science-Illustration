/* 第三冊 0-2 實驗器材與安全守則：認識器材、加熱試管的正確方式 */
NB.unit({
 q:"第一次走進理化實驗室，桌上擺著燒杯、量筒、試管、滴管……它們各有什麼用途？用酒精燈加熱試管時，試管口應該朝向哪裡？",
 sub:"點器材看名稱與用途；調整試管角度與方向，檢查安不安全",
 tool:function(b,eq){
  var L=NB.lab,tb=L.tabs(b,["認識器材","加熱試管"],function(i){i?heat():eq.innerHTML=cur?info(cur):"點一個器材看看。"}),P1=tb.panes[0],P2=tb.panes[1],cur=null;
  var v=L.stage(P1,660,250,"實驗器材"),g=L.g(v),M=NB.mk;
  var EQ=[
   {n:"燒杯",u:"裝液體、配製溶液，可隔著陶瓷纖維網加熱；刻度只是約略值，不能精確量體積。",d:function(x){L.beaker(g,x-28,200,56,70,.45,"var(--p2)")}},
   {n:"錐形瓶",u:"瓶口窄、搖晃時液體不易濺出，常用來進行反應或滴定。",d:function(x){M("path",{d:"M"+(x-8)+" 120v26l-26 46q-3 8 6 8h56q9 0 6-8l-26-46v-26",fill:"var(--paper)"},g,2);M("path",{d:"M"+(x-26)+" 186l-4 8q-2 6 5 6h54q7 0 5-6l-4-8z",fill:"var(--p3)","fill-opacity":.4,stroke:"none"},g)}},
   {n:"量筒",u:"精確量液體體積；不能加熱、不能在裡面配製溶液。讀數時視線與凹液面最低點同高。",d:function(x){L.cylinder(g,x-14,200,100,50,5,28,"var(--p2)",{w:28})}},
   {n:"試管",u:"少量液體反應或加熱；加熱時管口不可朝向任何人，液體不超過約 1/3。",d:function(x){M("path",{d:"M"+(x-9)+" 110v78a9 9 0 0 0 18 0v-78",fill:"var(--paper)"},g,2);M("path",{d:"M"+(x-8)+" 170v18a8 8 0 0 0 16 0v-18z",fill:"var(--p5)","fill-opacity":.45,stroke:"none"},g)}},
   {n:"滴管",u:"吸取、滴加少量液體；使用時保持管口朝下，不可平放或倒放，以免液體流入橡膠頭。",d:function(x){M("path",{d:"M"+(x-6)+" 112h12v22h-12z",fill:"var(--p1)"},g,2);M("path",{d:"M"+(x-4)+" 134h8v50l-4 12-4-12z",fill:"var(--paper)"},g,2)}},
   {n:"蒸發皿",u:"加熱使溶液中的水分蒸發，留下溶質（例如從食鹽水得到食鹽）。",d:function(x){M("path",{d:"M"+(x-34)+" 170q34 40 68 0z",fill:"var(--paper)"},g,2);M("path",{d:"M"+(x-34)+" 170h68",fill:"none"},g,2)}},
   {n:"酒精燈",u:"加熱用；用火柴點燃、用燈帽蓋熄，不可用嘴吹熄，也不可拿點燃的酒精燈去點另一盞。",d:function(x){L.lamp(g,x,200,true,.9)}}];
  function info(e){return "<b>"+e.n+"</b>："+e.u}
  function gal(){L.clear(g);EQ.forEach(function(e,i){var x=50+i*93,hit=NB.mk("rect",{x:x-44,y:96,width:88,height:150,rx:12,fill:cur===e?"var(--glow)":"transparent",stroke:cur===e?"var(--p3)":"transparent"},g,1.6);hit.style.cursor="pointer";
    e.d(x);NB.t(g,x,238,e.n,{z:14,b:cur===e});hit.addEventListener("click",function(){cur=e;gal();eq.innerHTML=info(e)})});
   NB.t(g,330,40,"點一個器材，看看它叫什麼、怎麼用",{z:15,c:"var(--soft)"})}
  /* 加熱試管 */
  var v2=L.stage(P2,640,280,"加熱試管"),g2=L.g(v2),an=NB.slider(P2,"試管傾斜角",0,90,5,45,"°",heat),fl=NB.slider(P2,"液體量（占試管）",10,80,5,25,"%",heat),dir=NB.pick(P2,"管口朝向",["朝向牆壁","朝向同學"],0,heat);
  function heat(){L.clear(g2);var a=an.v*Math.PI/180,s=dir.v?1:-1,bx=320,by=176,len=150;
   NB.mk("path",{d:"M60 250H580",fill:"none"},g2,2);L.lamp(g2,bx,250,true,.9);
   var ex=bx-s*len*Math.sin(a),ey=by-len*Math.cos(a);
   NB.mk("path",{d:"M"+bx+" "+by+"L"+ex.toFixed(1)+" "+ey.toFixed(1),fill:"none",stroke:"var(--ink)"},g2,22);NB.mk("path",{d:"M"+bx+" "+by+"L"+ex.toFixed(1)+" "+ey.toFixed(1),fill:"none",stroke:"var(--paper)"},g2,17);
   var fx=bx+(ex-bx)*fl.v/100,fy=by+(ey-by)*fl.v/100;NB.mk("path",{d:"M"+bx+" "+by+"L"+fx.toFixed(1)+" "+fy.toFixed(1),fill:"none",stroke:"var(--p5)","stroke-opacity":.55},g2,17);
   NB.person(g2,90,250,"var(--p2)",1.4);NB.t(g2,90,188,"同學",{z:12,c:"var(--soft)"});NB.mk("path",{d:"M600 40V250M600 60l14-14M600 100l14-14M600 140l14-14M600 180l14-14M600 220l14-14",fill:"none",stroke:"var(--soft)"},g2,1.6);NB.t(g2,585,34,"牆壁",{z:12,c:"var(--soft)"});
   if(dir.v)NB.mk("path",{d:"M"+(ex-10)+" "+(ey-6)+"l-30-14M"+(ex-12)+" "+(ey+2)+"l-34 0",fill:"none",stroke:"var(--p1)"},g2,2);
   var ok=[],bad=[];if(an.v<20||an.v>70)bad.push("試管約傾斜 45° 比較安全（太直容易沸騰噴出，太平液體會流出）");else ok.push("傾斜角適當");
   if(fl.v>35)bad.push("液體太多，不要超過試管的 1/3");else ok.push("液體量適當");
   if(dir.v)bad.push("管口不可以朝向任何人！");else ok.push("管口朝向無人的方向");
   eq.innerHTML=(bad.length?"<b>不安全</b>："+bad.join("；"):"<b>安全</b>：")+(ok.length?"<br>做得好："+ok.join("、"):"")+"<br>加熱時用試管夾夾在試管口附近，並先均勻預熱、輕輕搖動。"}
  gal();eq.innerHTML="點一個器材看看。"},
 steps:["實驗前先讀步驟、認識器材，穿實驗衣，必要時戴護目鏡","量筒用來精確量體積；燒杯、錐形瓶用來裝液體與反應，燒杯刻度只是約略值","加熱試管：試管夾夾在管口附近、傾斜約 45°、液體不超過 1/3、管口不可對人","酒精燈用燈帽蓋熄，不可用嘴吹；酒精不可添加超過燈壺的 2/3","聞氣體用手搧聞；藥品不可品嚐；廢液依老師指示分類回收"],
 key:["器材「做什麼」比「長什麼樣」更重要：量體積用量筒、蒸乾用蒸發皿","任何意外（燙傷、藥品濺到）先用大量清水沖洗，並立刻報告老師"],
 ch:[{q:"下列哪一項實驗操作是正確的？",o:["用嘴吹熄酒精燈","在量筒中直接加熱溶液","加熱試管時，管口朝向沒有人的方向","把鼻子湊近試管口用力聞氣味"],a:2,h:"想想看哪一個動作最不會傷到自己和別人。"},
     {q:"要從食鹽水中得到食鹽晶體，最適合使用哪一個器材加熱？",o:["量筒","蒸發皿","滴管","錐形瓶"],a:1}]
});
