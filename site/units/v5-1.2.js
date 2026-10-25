/* 第五冊 1-2 位移與路徑長：在地圖上走一走 */
NB.unit({
 q:"從家裡出發，先往東走 400 m 到超商，再往北走 300 m 到學校。你一共走了多少路？學校離家又有多遠、在哪個方向？",
 sub:"點地圖上的格點，畫出你走的路線",
 tool:function(b,eq){
  var L=NB.lab,v=L.stage(b,640,320,"位移"),g=L.g(v),pts=[[0,0]],S=50;/* 每格 100 m */
  NB.btn(b,"退一步",function(){if(pts.length>1)pts.pop();up()});NB.btn(b,"清除",function(){pts=[[0,0]];up()});NB.btn(b,"範例：東 4 格、北 3 格",function(){pts=[[0,0],[4,0],[4,3]];up()},"go");
  function X(i){return 130+i*S}function Y(j){return 250-j*S}
  function up(){L.clear(g);for(var i=-2;i<=8;i++)for(var j=-1;j<=4;j++){var c=NB.mk("circle",{cx:X(i),cy:Y(j),r:4,fill:"var(--soft)","fill-opacity":.5},g,0);c.style.cursor="pointer";(function(i,j){c.addEventListener("click",function(){var l=pts[pts.length-1];if(l[0]!==i&&l[1]!==j)return;if(l[0]===i&&l[1]===j)return;pts.push([i,j]);up()})})(i,j)}
   NB.t(g,600,30,"N",{z:14,b:1});L.arrow(g,600,70,600,38,"var(--ink)",1.6,7);NB.t(g,X(0),Y(0)+24,"家",{z:13,b:1});
   var d=0;for(var k=1;k<pts.length;k++){d+=Math.abs(pts[k][0]-pts[k-1][0])+Math.abs(pts[k][1]-pts[k-1][1]);L.arrow(g,X(pts[k-1][0]),Y(pts[k-1][1]),X(pts[k][0]),Y(pts[k][1]),"var(--p2)",3,10)}
   var e=pts[pts.length-1],disp=Math.hypot(e[0],e[1]);if(disp)L.arrow(g,X(0),Y(0),X(e[0]),Y(e[1]),"var(--p1)",2.4,11);
   NB.mk("circle",{cx:X(e[0]),cy:Y(e[1]),r:8,fill:"var(--p4)"},g,1.6);NB.t(g,30,24,"每格 100 m；只能沿格線走（點同一行或同一列的點）",{z:11,c:"var(--soft)",a:"start"});
   var ang=Math.atan2(e[1],e[0])*180/Math.PI,dir=disp?(e[0]>=0?"東":"西")+(e[1]?(e[1]>0?"偏北":"偏南")+" "+NB.r(Math.abs(e[0]?Math.atan(Math.abs(e[1]/e[0]))*180/Math.PI:90),0)+"°":""):"";
   eq.innerHTML="<b>路徑長</b>（藍色走過的總長）= <b>"+d*100+"</b> m；<b>位移</b>（紅色，從起點直接指向終點）大小 = <b>"+NB.r(disp*100,0)+"</b> m"+(disp?"，方向 "+dir:"")+"。<br>"+(disp===0&&d>0?"回到原點：路徑長不為 0，但位移是 0！":"路徑長 ≥ 位移大小；只有沿直線一直往同一方向走時兩者才相等。")}
  up()},
 steps:["<b>位置</b>：要先選定參考點（原點）和方向，例如「家的東方 400 m」","<b>路徑長</b>：物體實際走過的路線長度，只有大小，沒有方向","<b>位移</b>：由起點指向終點的有向線段，有大小也有方向（向量）","位移大小 ≤ 路徑長；繞一圈回到原點，位移為 0","直線運動中可用正負號表示方向，例如向東為正、向西為負"],
 key:["跑操場一圈 400 m：路徑長 400 m，位移 0","直角三角形求位移大小：用畢氏定理（3、4、5）"],
 ch:[{q:"小明先向東走 6 m，再向西走 2 m，他的位移大小是幾 m？",a:4,u:"m",tol:.01},
     {q:"同上題，小明走的路徑長是幾 m？",a:8,u:"m",tol:.01}]
});
