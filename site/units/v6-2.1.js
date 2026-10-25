/* 第六冊 2-1 磁鐵與磁場：磁力線、指北針 */
NB.unit({
 q:"指北針為什麼總是指向北方？把指北針拿到磁鐵旁邊，它又會怎麼轉？磁鐵周圍看不見的「磁場」長什麼樣子？",
 sub:"拖動指北針，看它在磁鐵附近怎麼轉",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,660,320,"磁場"),two=NB.pick(b,"磁鐵",["一根條形磁鐵","兩根：N 對 N","兩根：N 對 S"],0,up),lines=NB.pick(b,"磁力線",["顯示","隱藏"],0,up),g=L.g(v),cp=[480,90];
  function poles(){return two.v===0?[[260,160,1],[400,160,-1]]:two.v===1?[[150,160,-1],[290,160,1],[370,160,1],[510,160,-1]]:[[150,160,-1],[290,160,1],[370,160,-1],[510,160,1]]}
  function B(x,y){var bx=0,by=0;poles().forEach(function(p){var dx=x-p[0],dy=y-p[1],r=Math.max(12,Math.hypot(dx,dy));bx+=p[2]*dx/(r*r*r);by+=p[2]*dy/(r*r*r)});return[bx,by]}
  function up(){L.clear(g);var P=poles();
   if(!lines.v)P.forEach(function(p){if(p[2]<0)return;for(var k=0;k<14;k++){var a=k/14*Math.PI*2,x=p[0]+14*Math.cos(a),y=p[1]+14*Math.sin(a),d="M"+x+" "+y;for(var s=0;s<260;s++){var f=B(x,y),m=Math.hypot(f[0],f[1]);if(!m)break;x+=f[0]/m*3;y+=f[1]/m*3;d+="L"+x.toFixed(1)+" "+y.toFixed(1);if(x<0||x>660||y<0||y>320)break;if(P.some(function(q){return q[2]<0&&Math.hypot(x-q[0],y-q[1])<12}))break}NB.mk("path",{d:d,fill:"none",stroke:"var(--p2)","stroke-opacity":.45},g,1.2)}});
   for(var i=0;i<P.length;i+=2){var a=P[i],c=P[i+1];NB.mk("rect",{x:a[0]-10,y:145,width:(c[0]-a[0])/2+10,height:30,fill:a[2]>0?"var(--p1)":"var(--p2)","fill-opacity":.85},g,1.6);NB.mk("rect",{x:(a[0]+c[0])/2,y:145,width:(c[0]-a[0])/2+10,height:30,fill:c[2]>0?"var(--p1)":"var(--p2)","fill-opacity":.85},g,1.6);NB.t(g,a[0]+8,165,a[2]>0?"N":"S",{z:14,b:1,c:"#fff"});NB.t(g,c[0]-8,165,c[2]>0?"N":"S",{z:14,b:1,c:"#fff"})}
   var f=B(cp[0],cp[1]),ang=Math.atan2(f[1],f[0]),cg=NB.s("g",{},g);NB.mk("circle",{cx:cp[0],cy:cp[1],r:22,fill:"var(--paper)"},cg,2);
   NB.mk("path",{d:"M"+(cp[0]+18*Math.cos(ang))+" "+(cp[1]+18*Math.sin(ang))+"L"+(cp[0]+5*Math.sin(ang))+" "+(cp[1]-5*Math.cos(ang))+"L"+(cp[0]-5*Math.sin(ang))+" "+(cp[1]+5*Math.cos(ang))+"Z",fill:"var(--p1)"},cg,1);NB.mk("path",{d:"M"+(cp[0]-18*Math.cos(ang))+" "+(cp[1]-18*Math.sin(ang))+"L"+(cp[0]+5*Math.sin(ang))+" "+(cp[1]-5*Math.cos(ang))+"L"+(cp[0]-5*Math.sin(ang))+" "+(cp[1]+5*Math.cos(ang))+"Z",fill:"var(--paper2)"},cg,1);
   NB.drag(v,cg,function(x,y){cp=[NB.clamp(x,25,635),NB.clamp(y,25,295)];up()});NB.t(g,330,20,"拖動指北針（紅色端是 N 極）",{z:12,c:"var(--soft)"});
   eq.innerHTML="指北針的 N 極指向該處<b>磁場的方向</b>，也就是磁力線的切線方向：磁鐵外部由 N 極出發、回到 S 極。"+(two.v===1?"N 對 N：同極相斥，中間磁力線互相推開。":two.v===2?"N 對 S：異極相吸，中間磁力線直接相連。":"")+"磁力線越密，磁場越強。"}
  up()},
 steps:["磁鐵有 N、S 兩極：<b>同極相斥、異極相吸</b>；兩極磁性最強，中間最弱","磁鐵能吸引鐵、鈷、鎳等物質；把磁鐵切斷，每一段仍有 N、S 兩極","<b>磁場</b>：磁力作用的空間；方向 = 指北針 N 極所指的方向","<b>磁力線</b>：在磁鐵外由 N 出發回到 S，不相交；越密磁場越強","地球是一個大磁鐵：地理北極附近是地磁的 S 極，所以指北針的 N 極指北"],
 key:["鐵粉排列可以看出磁力線的形狀","磁力線是假想的線，用來表示磁場"],
 ch:[{q:"把指北針放在條形磁鐵的 N 極正右方，指北針的 N 極會指向哪裡？",o:["指向磁鐵","遠離磁鐵（向右）","垂直向上","不會轉動"],a:1,h:"磁場在磁鐵外由 N 極向外出發。"},
     {q:"地理北極附近，其實是地球磁場的哪一極？",o:["N 極","S 極","沒有磁極","兩極都有"],a:1}]
});
