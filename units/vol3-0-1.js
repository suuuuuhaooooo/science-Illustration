/* 單元：3冊 0.1 科學方法與實驗守則 */
(function () {
  var C = SK.C, s = SK.s;

  // ===== 完全採用您提供的完美 RWD CSS =====
  var style = document.createElement("style");
  style.innerHTML =
  /* ===== 所有內容最基本的 RWD 防溢出 ===== */
  ".unit-card, .card, .section, .content, .main, #main, article, section {" +
    "max-width: 100%;" +
    "min-width: 0;" +
    "box-sizing: border-box;" +
  "}" +

  /* ===== 表格：手機可左右滑，電腦正常顯示 ===== */
  ".table-scroll-box {" +
    "width: 100%;" +
    "max-width: 100%;" +
    "min-width: 0;" +
    "overflow-x: auto;" +
    "overflow-y: hidden;" +
    "-webkit-overflow-scrolling: touch;" +
    "margin: 10px 0;" +
    "border: 1px solid #E3D4AC;" +
    "border-radius: 6px;" +
    "background: #FFF;" +
    "box-sizing: border-box;" +
  "}" +

  ".rwd-tb { width: 100%; min-width: 520px; border-collapse: collapse; text-align: center; font-size: clamp(0.78rem, 2.5vw, 0.9rem); table-layout: auto; }" +

  ".rwd-tb th {" +
    "background: #F8F5EE;" +
    "padding: 8px 6px;" +
    "border-bottom: 2px solid #E3D4AC;" +
    "color: #4A3F37;" +
    "font-weight: bold;" +
    "white-space: nowrap;" +
  "}" +

  ".rwd-tb td {" +
    "padding: 8px 6px;" +
    "border-bottom: 1px solid #E3D4AC;" +
    "color: #6F645A;" +
    "background: #FFF;" +
    "word-break: break-word;" +
  "}" +

  /* ===== 選項 ===== */
  ".opt-list {" +
    "display: flex;" +
    "flex-direction: column;" +
    "gap: 8px;" +
    "margin-top: 10px;" +
    "width: 100%;" +
    "max-width: 100%;" +
    "min-width: 0;" +
    "box-sizing: border-box;" +
  "}" +

  ".opt-box {" +
    "background: #FFF;" +
    "border: 1px solid #E3D4AC;" +
    "border-radius: 6px;" +
    "padding: 10px 12px;" +
    "font-size: clamp(0.82rem, 2.5vw, 0.95rem);" +
    "line-height: 1.6;" +
    "color: #4A3F37;" +
    "width: 100%;" +
    "max-width: 100%;" +
    "min-width: 0;" +
    "box-sizing: border-box;" +
    "text-align: left;" +
    "overflow-wrap: anywhere;" +
    "word-break: break-word;" +
  "}" +

  /* ===== 題目圖片 ===== */
  ".q-img-box {" +
    "text-align: center;" +
    "margin: 10px 0;" +
    "padding: 6px;" +
    "background: #FAF7F2;" +
    "border-radius: 6px;" +
    "border: 1px solid #EFE6D5;" +
    "width: 100%;" +
    "max-width: 100%;" +
    "min-width: 0;" +
    "box-sizing: border-box;" +
    "overflow: hidden;" +
  "}" +

  ".q-img-box svg {" +
  "display: block;" +
  "width: 100%;" +
  "max-width: 100%;" +
  "height: auto;" +
  "margin: 0 auto;" +
  "box-sizing: border-box;" +
  "}" +

  /* ===== 圖片裡的 flex 排版 ===== */
  ".q-img-box > div {" +
  "width: 100%;" +
  "max-width: 100%;" +
  "min-width: 0;" +
  "box-sizing: border-box;" +
  "display: flex;" +
  "justify-content: center;" +
  "align-items: center;" +
  "flex-wrap: wrap;" +
  "gap: 10px;" +
  "}" +

  ".q-img-box > div > div {" +
  "min-width: 0 !important;" +
  "max-width: 100%;" +
  "box-sizing: border-box;" +
  "}" +

  "html, body {" +
  "width: 100%;" +
  "max-width: 100%;" +
  "overflow-x: hidden;" +
  "box-sizing: border-box;" +
  "}" +
  
  "*, *::before, *::after {" +
    "box-sizing: border-box;" +
  "}" +
    
  /* ===== 小螢幕 ===== */
  "@media (max-width: 600px) {" +
    ".q-img-box {" +
      "padding: 4px;" +
      "margin: 8px 0;" +
    "}" +
    ".rwd-tb {" +
      "font-size: 0.78rem;" +
    "}" +
    ".rwd-tb th, .rwd-tb td {" +
      "padding: 7px 5px;" +
    "}" +
    ".opt-box {" +
      "padding: 9px 10px;" +
      "font-size: 0.84rem;" +
    "}" +
  "}";
  document.head.appendChild(style);

  /* --- 啟發區小圖 --- */
  function hookVisual(el) {
    var svg = SK.svg(el, 360, 200, "實驗室常見的燒杯與注意標示");
    var beakerPath = "M 130 50 L 130 140 A 10 10 0 0 0 140 150 L 220 150 A 10 10 0 0 0 230 140 L 230 50";
    s("path", { d: beakerPath, fill: "none", stroke: C.line, "stroke-width": 3 }, svg);
    s("line", { x1: 120, y1: 50, x2: 240, y2: 50, stroke: C.line, "stroke-width": 3 }, svg); 
    var liquidPath = "M 130 90 L 130 140 A 10 10 0 0 0 140 150 L 220 150 A 10 10 0 0 0 230 140 L 230 90 Z";
    s("path", { d: liquidPath, fill: C.blue.f, stroke: "none" }, svg);
    s("line", { x1: 130, y1: 70, x2: 145, y2: 70, stroke: C.line, "stroke-width": 2 }, svg);
    s("line", { x1: 130, y1: 110, x2: 145, y2: 110, stroke: C.line, "stroke-width": 2 }, svg);
    s("polygon", { points: "290,140 320,80 350,140", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 3, "stroke-linejoin": "round" }, svg);
    SK.label(svg, 320, 130, "!", { size: 30, color: C.gold.s, bold: true });
    SK.label(svg, 180, 175, "未知強酸液體", { size: 15, color: C.soft });
  }

  function dangerMini(el) {
    var svg = SK.svg(el, 300, 150, "錯誤的聞氣體方式");
    s("rect", { x: 120, y: 70, width: 60, height: 60, rx: 5, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("path", { d: "M 140 60 Q 150 40 140 20", fill: "none", stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4 4" }, svg);
    s("path", { d: "M 160 60 Q 170 30 160 10", fill: "none", stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4 4" }, svg);
    SK.label(svg, 150, 145, "直接吸入可能中毒", { size: 13, color: C.orange.s });
  }

  /* --- 核心推導：科學方法流程圖 --- */
  function methodDerive(ctx) {
    var svg = SK.svg(ctx.stage, 480, 420, "科學方法步驟流程圖");
    svg.style.display = "block";
    svg.style.width = "100%";
    svg.style.maxWidth = "480px";
    svg.style.height = "auto";
    svg.style.margin = "0 auto";
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    var g = s("g", {}, svg);
    var read = SK.h("div", { class: "readout" });
    ctx.extra.appendChild(read);

    var steps = [
      { text: "觀察現象", desc: "發現自然界中奇特的事件" },
      { text: "提出問題", desc: "針對觀察到的現象產生疑問" },
      { text: "提出假說", desc: "根據現有知識，猜測一個合理的解答" },
      { text: "設計實驗", desc: "確立操縱、控制與應變變因，進行測試" },
      { text: "分析數據", desc: "整理實驗結果，尋找規律" },
      { text: "得出結論", desc: "驗證假說是否成立。若不成立則修正假說" }
    ];

    function draw() {
      var f = ctx.frame;
      g.innerHTML = "";
      var boxWidth = 140, boxHeight = 40, startX = 170, startY = 30, gapY = 60;
      for (var i = 0; i < steps.length; i++) {
        var on = f >= i, yPos = startY + i * gapY;
        var bgCol = on ? C.green.f : C.paper, strokeCol = on ? C.green.s : C.line;
        s("rect", { x: startX, y: yPos, width: boxWidth, height: boxHeight, rx: 6, fill: bgCol, stroke: strokeCol, "stroke-width": 2 }, g);
        SK.label(g, startX + boxWidth / 2, yPos + boxHeight / 2 + 2, steps[i].text, { size: 16, color: (on ? C.ink : C.line), bold: on });
        if (i < steps.length - 1) {
          var arrowOn = f > i, aColor = arrowOn ? C.green.s : C.line;
          s("line", { x1: startX + boxWidth / 2, y1: yPos + boxHeight, x2: startX + boxWidth / 2, y2: yPos + gapY - 5, stroke: aColor, "stroke-width": 2, "marker-end": "url(#arrow)" }, g);
        }
      }
      if (f === steps.length - 1) {
        var pathData = "M " + startX + " " + (startY + 5 * gapY + boxHeight / 2) + " L " + (startX - 50) + " " + (startY + 5 * gapY + boxHeight / 2) + " L " + (startX - 50) + " " + (startY + 2 * gapY + boxHeight / 2) + " L " + (startX - 5) + " " + (startY + 2 * gapY + boxHeight / 2);
        s("path", { d: pathData, fill: "none", stroke: C.pink.s, "stroke-width": 2, "stroke-dasharray": "6 4", "marker-end": "url(#arrow)" }, g);
        SK.label(g, startX - 70, startY + 3.5 * gapY, "假說錯誤", { size: 13, color: C.pink.s });
      }
      read.innerHTML = "目前步驟：" + (f < steps.length ? steps[f].desc : "完成完整的科學探究循環");
    }
    return { show: draw };
  }

  // ==== 輔助產生器 (加入 CSS Grid 終極阻斷撐開效應) ====
  function genTb(headers, rows) {
    // 這裡的 display:grid; grid-template-columns:minmax(0,1fr) 是一堵死牆，強制表格絕對不能撐破外層！
    var h = '<div style="display:grid; grid-template-columns:minmax(0,1fr); width:100%;"><div class="table-scroll-box"><table class="rwd-tb"><tr>';
    headers.forEach(function(th){ h += '<th>' + th + '</th>'; });
    h += '</tr>';
    rows.forEach(function(row){
      h += '<tr>';
      row.forEach(function(td){ h += '<td>' + td + '</td>'; });
      h += '</tr>';
    });
    return h + '</table></div></div>';
  }
  
  function genOpts(opts) {
    var h = '<div class="opt-list">';
    opts.forEach(function(o){ 
      h += '<div style="display:grid; grid-template-columns:minmax(0,1fr); width:100%;"><div class="opt-box">' + o + '</div></div>'; 
    });
    return h + '</div>';
  }

  var imgBox = function(svgContent, maxWidth) {
    // 同樣加入 grid 防護罩
    return '<div style="display:grid; grid-template-columns:minmax(0,1fr); width:100%;"><div class="q-img-box"><div style="margin:0 auto; width:100%; max-width:' + (maxWidth || 300) + 'px;">' + svgContent + '</div></div></div>';
  };

  // ============================================
  // 表格變數宣告區
  // ============================================
  var t_105A = genTb(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "白", "白", "白"], ["浸泡時間(s)", "20", "40", "60", "80"], ["粉筆長度(cm)", "8", "8", "8", "8"], ["最小外力(kgw)", "", "", "", ""]]);
  var t_105B = genTb(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "紅", "藍", "黃"], ["浸泡時間(s)", "20", "40", "60", "80"], ["粉筆長度(cm)", "5", "6", "7", "8"], ["最小外力(kgw)", "", "", "", ""]]);
  var t_105C = genTb(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "紅", "藍", "黃"], ["浸泡時間(s)", "20", "20", "20", "20"], ["粉筆長度(cm)", "8", "8", "8", "8"], ["最小外力(kgw)", "", "", "", ""]]);
  var t_105D = genTb(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "紅", "紅", "紅", "紅"], ["浸泡時間(s)", "40", "40", "40", "40"], ["粉筆長度(cm)", "5", "6", "7", "8"], ["最小外力(kgw)", "", "", "", ""]]);
  var t_115 = genTb(["組別", "拖地的水"], [["第一組", "熱水加食鹽"], ["第二組", "熱水沒加食鹽"], ["第三組", "冷水加食鹽"], ["第四組", "冷水沒加食鹽"]]);
  var t_114_fan = genTb(["年度", "電扇樣品位置"], [["81年", "沒有規定"], ["105年", "中心距離1.5m，前緣距牆1.2m以上"], ["106年", "中心軸線平行，前緣距牆1.2m以上"]]);
  var t_111_evap = genTb(["容器編號", "一", "二", "三", "四", "五"], [["球顏色", "不放球", "白", "紅", "藍", "黑"], ["第一天", "16.00", "16.10", "16.10", "16.10", "16.10"], ["第七天", "14.20", "15.50", "15.80", "15.90", "15.95"]]);
  var t_111_land = genTb(["實驗編號", "夾角(θ)", "斜面長度", "石塊重量"], [["1", "20°", "100 cm", "2 kgw"], ["2", "20°", "50 cm", "2 kgw"], ["3", "40°", "100 cm", "4 kgw"], ["4", "40°", "50 cm", "4 kgw"]]);
  var t_90_enzyme = genTb(["試管", "酵素<br>體積", "作用<br>溫度", "反應前的<br>待作用物質", "反應後生<br>成的物質"], [["甲", "3 mL", "15°C", "100 g", "50 g"], ["乙", "6 mL", "15°C", "100 g", "50 g"], ["丙", "3 mL", "30°C", "100 g", "25 g"], ["丁", "6 mL", "30°C", "100 g", "25 g"]]);
  var t_113_1 = genTb(["時間(分)", "0", "3", "5", "10", "30", "60", "120", "240"], [["溫度(°C)", "25", "25", "25", "25", "25", "25", "25", "25"], ["餘氣量(ppm)", "0.39", "0.33", "0.28", "0.22", "0.18", "0.15", "0.13", "0.09"]]);
  var t_113_2 = genTb(["時間(分)", "0", "3", "5", "10", ""], [["溫度(°C)", "25", "27", "31", "37", "沸騰"], ["餘氣量(ppm)", "0.39", "0.30", "0.20", "0.03", "0.00"]]);
  var t_115_acid = genTb(["組別", "甲", "甲", "乙", "乙"], [["測站所在地區", "臺北", "宜蘭", "雲林", "嘉義"], ["雨水pH值的平均", "5.63", "5.52", "6.33", "6.29"]]);

  // ============================================
  // 圖片變數宣告區 (依原題精細重繪)
  // ============================================
  var svgDropper = '<svg viewBox="0 0 30 100" style="width:100%; max-width:20px; height:auto; display:block; margin:0 auto;"><path d="M12 30 L12 85 L14 95 L16 95 L18 85 L18 30 Z" fill="#FFF" stroke="#4A3F37" stroke-width="2"/><rect x="8" y="5" width="14" height="25" rx="5" fill="#888"/></svg>';
  var svgGradCyl = '<svg viewBox="0 0 60 120" style="width:100%; max-width:35px; height:auto; display:block; margin:0 auto;"><path d="M15 20 L15 110 L45 110 L45 20" fill="none" stroke="#4A3F37" stroke-width="2"/><line x1="5" y1="110" x2="55" y2="110" stroke="#4A3F37" stroke-width="2"/><line x1="15" y1="40" x2="25" y2="40" stroke="#4A3F37" stroke-width="1"/><text x="28" y="44" font-size="12" fill="#4A3F37">50</text><line x1="15" y1="60" x2="20" y2="60" stroke="#4A3F37" stroke-width="1"/><line x1="15" y1="80" x2="20" y2="80" stroke="#4A3F37" stroke-width="1"/><rect x="17" y="60" width="26" height="48" fill="rgba(164,185,200,.5)"/></svg>';
  var svgSpatula = '<svg viewBox="0 0 20 80" style="width:100%; max-width:15px; height:auto; display:block; margin:0 auto;"><path d="M8 5 L12 5 L11 65 L14 72 C 15 76 13 78 10 78 C 7 78 5 76 6 72 L9 65 Z" fill="#4A3F37"/></svg>';

  // 103會考 
  var img103Tools = imgBox('<div style="display:flex; justify-content:center; gap:15px; align-items:flex-end;">' +
    '<div style="text-align:center; padding:10px; border:1px solid #CCC; background:#FFF; min-width:80px; width:45%;">' + svgDropper + '<br><b style="font-size:0.8rem">器材一</b></div>' +
    '<div style="text-align:center; padding:10px; border:1px solid #CCC; background:#FFF; min-width:80px; width:45%;">' + svgGradCyl + '<br><b style="font-size:0.8rem">器材二</b></div>' +
    '</div>', 250);

  // 104會考 (甲廣口瓶、乙細頸瓶)
  var img104Bot = imgBox('<div style="display:flex; justify-content:space-around; align-items:flex-end;">' +
    '<div style="text-align:center; min-width:60px; width:45%;"><b>甲</b><br><svg viewBox="0 0 60 80" style="width:100%; max-width:45px; height:auto; display:block; margin:0 auto;"><rect x="12" y="25" width="36" height="50" rx="2" fill="#FFF" stroke="#333" stroke-width="2"/><rect x="18" y="15" width="24" height="10" fill="#FFF" stroke="#333" stroke-width="2"/><rect x="16" y="8" width="28" height="7" rx="1" fill="#CCC" stroke="#333" stroke-width="2"/><rect x="12" y="45" width="36" height="15" fill="#EEE" stroke="#333" stroke-width="1"/><text x="30" y="55" font-size="10" text-anchor="middle" fill="#333" font-weight="bold">碳酸鈣</text></svg></div>' +
    '<div style="text-align:center; min-width:60px; width:45%;"><b>乙</b><br><svg viewBox="0 0 60 80" style="width:100%; max-width:45px; height:auto; display:block; margin:0 auto;"><path d="M15 35 L15 75 A 3 3 0 0 0 18 78 L42 78 A 3 3 0 0 0 45 75 L45 35 C 45 25 35 20 35 15 L35 10 L25 10 L25 15 C 25 20 15 25 15 35 Z" fill="#999" stroke="#333" stroke-width="2"/><rect x="23" y="4" width="14" height="6" rx="1" fill="#333"/><rect x="15" y="45" width="30" height="15" fill="#FFF" stroke="#333" stroke-width="1"/><text x="30" y="55" font-size="10" text-anchor="middle" fill="#333" font-weight="bold">鹽酸</text></svg></div>' +
    '</div>', 200);
  
  var opt104A = '<b>(A)</b> <div style="display:flex; flex-wrap:wrap; gap:15px; margin-top:5px; align-items:center;"><div style="text-align:center; font-size:0.8rem; width:40%;">甲<br>' + svgDropper + '</div><div style="text-align:center; font-size:0.8rem; width:40%;">乙<br>' + svgDropper + '</div></div>';
  var opt104B = '<b>(B)</b> <div style="display:flex; flex-wrap:wrap; gap:15px; margin-top:5px; align-items:center;"><div style="text-align:center; font-size:0.8rem; width:40%;">甲<br>' + svgSpatula + '</div><div style="text-align:center; font-size:0.8rem; width:40%;">乙<br>' + svgSpatula + '</div></div>';
  var opt104C = '<b>(C)</b> <div style="display:flex; flex-wrap:wrap; gap:15px; margin-top:5px; align-items:center;"><div style="text-align:center; font-size:0.8rem; width:40%;">甲<br>' + svgSpatula + '</div><div style="text-align:center; font-size:0.8rem; width:40%;">乙<br>' + svgDropper + '</div></div>';
  var opt104D = '<b>(D)</b> <div style="display:flex; flex-wrap:wrap; gap:15px; margin-top:5px; align-items:center;"><div style="text-align:center; font-size:0.8rem; width:40%;">甲<br>' + svgDropper + '</div><div style="text-align:center; font-size:0.8rem; width:40%;">乙<br>' + svgSpatula + '</div></div>';

  // 109會考
  var img109Pour = imgBox('<svg viewBox="0 0 100 120" style="width:100%; max-width:80px; height:auto; display:block; margin:0 auto;"><rect x="45" y="40" width="10" height="70" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="42" y="90" width="16" height="4" fill="#5B778C"/><path d="M20 10 L50 40 L50 10 Z" fill="none" stroke="#4A3F37" stroke-width="2"/><path d="M45 35 Q40 45 50 50 Q55 45 45 35" fill="rgba(164,185,200,.5)"/><text x="10" y="20" font-size="12" fill="#4A3F37">燒杯</text><text x="65" y="80" font-size="12" fill="#4A3F37">滴定管</text></svg>', 140);
  var opt109A = '<b>(A)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 50 40" style="width:100%; max-width:35px; height:auto; display:block; margin:0 auto;"><path d="M10 10 L40 10 L28 30 L28 40" fill="none" stroke="#C28C6E" stroke-width="2"/><ellipse cx="25" cy="10" rx="15" ry="4" fill="rgba(224,189,173,.6)" stroke="#C28C6E" stroke-width="1"/></svg></div>';
  var opt109B = '<b>(B)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 50 40" style="width:100%; max-width:35px; height:auto; display:block; margin:0 auto;"><line x1="15" y1="35" x2="35" y2="5" stroke="#7A8B76" stroke-width="3" stroke-linecap="round"/></svg></div>';
  var opt109C = '<b>(C)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 50 40" style="width:100%; max-width:35px; height:auto; display:block; margin:0 auto;"><rect x="15" y="5" width="20" height="30" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="10" y1="35" x2="40" y2="35" stroke="#5B778C" stroke-width="2"/><line x1="15" y1="15" x2="22" y2="15" stroke="#5B778C" stroke-width="1"/><line x1="15" y1="25" x2="22" y2="25" stroke="#5B778C" stroke-width="1"/></svg></div>';
  var opt109D = '<b>(D)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 50 40" style="width:100%; max-width:35px; height:auto; display:block; margin:0 auto;"><path d="M5 20 Q25 40 45 20" fill="none" stroke="#847C96" stroke-width="2"/></svg></div>';

  // 107會考 (放大鏡)
  var img107Cyl = imgBox('<svg viewBox="0 0 160 140" style="width:100%; max-width:180px; height:auto; display:block; margin:0 auto;"><path d="M20 20 L20 120 L50 120 L50 20" fill="none" stroke="#333" stroke-width="2"/><line x1="10" y1="120" x2="60" y2="120" stroke="#333" stroke-width="2"/><line x1="20" y1="40" x2="25" y2="40" stroke="#333" stroke-width="1"/><text x="28" y="44" font-size="10" fill="#333">40</text><line x1="20" y1="70" x2="25" y2="70" stroke="#333" stroke-width="1"/><text x="28" y="74" font-size="10" fill="#333">30</text><line x1="20" y1="100" x2="25" y2="100" stroke="#333" stroke-width="1"/><text x="28" y="104" font-size="10" fill="#333">20</text><rect x="22" y="70" width="26" height="50" fill="#ccc"/><path d="M35 5 L35 15 L30 15 L35 25 L40 15 L35 15 Z" fill="#333"/><text x="22" y="5" font-size="12" fill="#333">再加入</text><circle cx="110" cy="70" r="35" fill="none" stroke="#333" stroke-width="1.5"/><line x1="20" y1="70" x2="75" y2="70" stroke="#333" stroke-width="1" stroke-dasharray="2 2"/><path d="M80 60 Q110 80 140 60" fill="none" stroke="#333" stroke-width="2"/><line x1="75" y1="70" x2="145" y2="70" stroke="#333" stroke-width="1" stroke-dasharray="2 2"/><text x="85" y="65" font-size="14" fill="#333">30.</text></svg>', 200);
  
  var opt107A = '<b>(A)</b><div style="text-align:center; margin-top:5px;">' + svgDropper + '</div>';
  var opt107B = '<b>(B)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 30 100" style="width:100%; max-width:18px; height:auto; display:block; margin:0 auto;"><path d="M10 10 L10 80 A 5 5 0 0 0 20 80 L20 10" fill="none" stroke="#333" stroke-width="2"/></svg></div>';
  var opt107C = '<b>(C)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 50 100" style="width:100%; max-width:30px; height:auto; display:block; margin:0 auto;"><path d="M20 10 L20 40 L5 90 L45 90 L30 40 L30 10" fill="none" stroke="#333" stroke-width="2"/></svg></div>';
  var opt107D = '<b>(D)</b><div style="text-align:center; margin-top:5px;"><svg viewBox="0 0 50 100" style="width:100%; max-width:30px; height:auto; display:block; margin:0 auto;"><path d="M5 30 L5 90 L45 90 L45 30" fill="none" stroke="#333" stroke-width="2"/><path d="M5 30 L0 25 L5 25" fill="none" stroke="#333" stroke-width="2"/></svg></div>';

  // 111會考 (山崩)
  var img111Slope = imgBox('<svg viewBox="0 0 200 100" style="width:100%; height:auto; display:block; margin:0 auto;"><path d="M20 80 L180 80" stroke="#333" stroke-width="2"/><path d="M20 80 L140 20" stroke="#333" stroke-width="2"/><text x="145" y="85" font-size="12" fill="#333">水平面</text><text x="70" y="35" font-size="12" fill="#333" transform="rotate(-26 70 35)">斜面</text><path d="M40 80 A 40 40 0 0 0 45 68" fill="none" stroke="#333" stroke-width="1"/><text x="48" y="76" font-size="12" fill="#333">θ</text><rect x="100" y="30" width="15" height="15" fill="#333" transform="rotate(-26 100 30)"/><text x="110" y="25" font-size="12" fill="#333">石塊</text><rect x="10" y="60" width="15" height="20" fill="#999"/><text x="0" y="55" font-size="10" fill="#333">模型房屋</text></svg>', 220);

  // 106會考 (精細重繪甲乙丙)
  var img106Method = imgBox('<div style="display:flex; justify-content:space-around; align-items:flex-end; gap:10px;">' +
    '<div style="text-align:center; min-width:60px; width:30%;"><svg viewBox="0 0 100 120" style="width:100%; max-width:65px; height:auto; display:block; margin:0 auto;"><path d="M35 110 L65 110 L65 95 C 65 90 35 90 35 95 Z" fill="#ccc" stroke="#333" stroke-width="1.5"/><path d="M48 95 L52 95 L52 85 L48 85 Z" fill="#333"/><path d="M45 85 Q50 70 55 85 Z" fill="#E86A33"/><g transform="rotate(30 40 50)"><rect x="30" y="10" width="20" height="70" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="40" width="16" height="30" fill="rgba(164,185,200,.5)"/><path d="M 25 35 L 75 35 L 75 45 L 25 45 Z" fill="#C28C6E" stroke="#333" stroke-width="1.5"/><path d="M 5 37 L 25 37 L 25 43 L 5 43 Z" fill="#C28C6E" stroke="#333" stroke-width="1.5"/></g></svg><br><b style="font-size:0.75rem">方法甲</b></div>' +
    '<div style="text-align:center; min-width:60px; width:30%;"><svg viewBox="0 0 100 120" style="width:100%; max-width:65px; height:auto; display:block; margin:0 auto;"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#333" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#333" stroke-width="2"/><rect x="42" y="60" width="16" height="50" fill="rgba(164,185,200,.3)"/><line x1="65" y1="10" x2="45" y2="90" stroke="#333" stroke-width="3" stroke-linecap="round"/><text x="65" y="15" font-size="10" fill="#333">小蘇打</text><circle cx="53" cy="20" r="1.5" fill="#333"/><circle cx="50" cy="25" r="1.5" fill="#333"/><circle cx="48" cy="30" r="1.5" fill="#333"/></svg><br><b style="font-size:0.75rem">方法乙</b></div>' +
    '<div style="text-align:center; min-width:60px; width:30%;"><svg viewBox="0 0 100 120" style="width:100%; max-width:65px; height:auto; display:block; margin:0 auto;"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#333" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#333" stroke-width="2"/><rect x="42" y="70" width="16" height="40" fill="rgba(164,185,200,.3)"/><line x1="50" y1="10" x2="50" y2="80" stroke="#333" stroke-width="1" stroke-dasharray="2 2"/><circle cx="50" cy="85" r="6" fill="#333"/></svg><br><b style="font-size:0.75rem">方法丙</b></div>' +
    '</div>', 320);

  // 經典常考 (濃硫酸)
  function genQ60(letter, bottomText, topText, hasRod) {
    let rod = hasRod ? '<line x1="60" y1="30" x2="45" y2="90" stroke="#7A8B76" stroke-width="3" stroke-linecap="round"/>' : '';
    let drops = hasRod ? '' : '<circle cx="45" cy="50" r="2" fill="#5B778C"/><circle cx="45" cy="65" r="2" fill="#5B778C"/>';
    let flow = hasRod ? '<path d="M45 40 Q55 60 45 90" fill="none" stroke="rgba(164,185,200,.7)" stroke-width="3"/>' : '';
    return '<b>(' + letter + ')</b>' +
           '<div style="text-align:center; margin-top:5px; width:100%; max-width:70px; display:inline-block;"><svg viewBox="0 0 100 120" style="width:100%; height:auto; display:block; margin:0 auto;">' +
           '<rect x="25" y="70" width="50" height="40" fill="none" stroke="#333" stroke-width="2"/>' +
           '<rect x="27" y="80" width="46" height="30" fill="rgba(164,185,200,.3)"/>' +
           '<text x="50" y="100" font-size="12" text-anchor="middle" fill="#333">' + bottomText + '</text>' +
           rod + drops + flow +
           '<g transform="rotate(-45 45 30)"><rect x="35" y="0" width="20" height="40" rx="4" fill="none" stroke="#333" stroke-width="2"/><text x="45" y="25" font-size="10" text-anchor="middle" fill="#333">' + topText + '</text></g>' +
           '</svg></div>';
  }
  var opt60A = genQ60('A', '濃硫酸', '水', true);
  var opt60B = genQ60('B', '濃硫酸', '水', false);
  var opt60C = genQ60('C', '水', '濃硫酸', true);
  var opt60D = genQ60('D', '水', '濃硫酸', false);

  // ============================================
  // 單元掛載
  // ============================================
  SK.mountUnit({
    slug: "vol3-0-1",
    en: "Scientific Method and Lab Safety",
    formula: "\\text{觀察} \\rightarrow \\text{假說} \\rightarrow \\text{實驗}",

    hook: {
      html: "當你走進理化實驗室，桌上擺滿了各式各樣的儀器與未知的化學藥品。在動手操作之前，我們必須先了解科學家是如何思考的，以及實驗室裡有哪些絕對不能打破的規矩。",
      ask: "試著回想看看，如果實驗中需要稀釋一杯濃度極高的「濃硫酸」，你覺得最安全的做法是什麼？",
      visual: hookVisual
    },

    guess: {
      q: "請憑直覺選擇一個最安全的做法：",
      options: [
        { t: "將大量的水直接倒入濃硫酸中稀釋", explain: "這是非常危險的動作！濃硫酸遇水會放出大量的熱，且水的密度較小，將水倒入硫酸中會讓水沸騰並帶著酸液劇烈噴濺，造成嚴重灼傷。", mini: dangerMini },
        { t: "將濃硫酸沿著玻璃棒，緩緩倒入水中", truth: true, explain: "完全正確。稀釋濃酸溶液時，必須將濃酸緩緩加入水中，並使用玻璃棒輔助攪拌，讓產生的熱量可以被大量的水吸收分散，避免燒杯破裂或酸液濺射。" },
        { t: "在量筒裡面直接把濃硫酸和水混合", explain: "絕對不行。量筒只能用來「測量液體體積」，絕對不可以用來配製溶液或進行化學反應。" },
        { t: "先用舌頭嘗嘗看有多酸，再決定加多少水", explain: "這太瘋狂了！在實驗室絕對不可以用舌頭嘗任何藥品的味道。如果想確認氣味，也只能用手在杯口輕揮，將少量氣體搧向鼻子（搧聞法）。" }
      ]
    },

    derive: {
      intro: "學習理化不僅是背誦知識，更重要的是學習「科學方法」。這是一套科學家為了解決問題所發展出來的系統化邏輯步驟。",
      frames: [
        { cap: "第一步是「觀察」，透過視覺、聽覺等感官或是儀器，發現自然界中奇特的現象。", tex: "\\text{第一步：觀察}" },
        { cap: "有了現象後，我們會「提出問題」，例如：為什麼蘋果會往下掉？", tex: "\\text{第二步：提出問題}" },
        { cap: "接著，根據已知的知識背景，我們提出一個可能解釋這現象的「假說」。假說是待驗證的猜測。", tex: "\\text{第三步：假說}" },
        { cap: "為了解答，必須嚴謹地「設計實驗」。在實驗中要仔細控制各種變因，確保結果準確。", tex: "\\text{第四步：實驗}" },
        { cap: "收集實驗數據後進行「分析」，找出隱藏在數據背後的規律性。", tex: "\\text{第五步：分析}" },
        { cap: "最後「得出結論」。如果結論支持假說，假說可能成為理論；如果不支持，就必須回去修改假說，重新實驗。", tex: "\\text{第六步：結論}" }
      ],
      setup: methodDerive
    },

    angles: [
      { title: "認識變因的三種身分",
        html: "在設計實驗時，我們必須控制各種條件。變因分為三種：<br>1. <b>操縱變因</b>：實驗中唯一改變的條件，一次只能有一個（例如：每天運動的時間）。<br>2. <b>控制變因</b>：實驗中必須保持不變的條件（例如：每天的飲食量、睡眠時間）。<br>3. <b>應變變因</b>：因為操縱變因改變，而跟著產生變化的結果（例如：體重的變化）。"
      },
      { title: "實驗器材的禁忌指南",
        html: "除了科學方法，大考極度重視你是否能正確且安全地使用儀器：<br><br>• <b>量筒</b>：只能測量體積。禁止加熱、禁止配製溶液、禁止進行化學反應。讀取刻度時，視線須平視液面中央的凹下最低處。<br>• <b>滴管</b>：吸取液體後必須保持尖嘴朝下，絕對不可倒置，以免液體倒流腐蝕橡皮頭。<br>• <b>溫度計</b>：只能測量溫度，絕對不可用來代替玻璃棒攪拌溶液。底部不可接觸容器。<br>• <b>加熱</b>：燒杯不可直接在火焰上加熱，必須墊上<b>陶瓷纖維網</b>使其受熱均勻，避免器皿破裂。<br>• <b>酒精燈</b>：酒精量維持 1/2 到 2/3。不可用已點燃的酒精燈去引燃另一盞。熄滅時必須用燈罩蓋熄，絕對不可用口吹熄；若不慎打翻起火，應迅速用溼抹布蓋熄。"
      }
    ],

    challenges: [
      {
        lv: "115 教育會考",
        q: "網路流傳一種說法：「使用加食鹽的熱水拖地，地板會比較快乾。」小綺想要找出影響地板乾燥速率的變因，使用附表中四組的水來拖地，當中的哪兩組相互比較，最不可能達到他的目的？" + t_115 + genOpts(["(A) 第一組和第二組", "(B) 第一組和第三組", "(C) 第二組和第三組", "(D) 第二組和第四組"]),
        idea: "【正確解答】 (C)<br>【詳細解析】 第二組(熱水沒加食鹽)與第三組(冷水加食鹽)同時改變了「水溫」和「是否加食鹽」兩個變因，因此無法判斷是哪一個變因影響地板的乾燥速率。"
      },
      {
        lv: "90 基測",
        q: "夏琳做了一個酵素反應的實驗，得到數據如下表。由此實驗結果推論，下列何者是使此實驗反應後生成物質的質量增加之主要關鍵？" + t_90_enzyme + genOpts(["(A) 酵素的多寡", "(B) 作用溫度的高低", "(C) 反應前反應溶液之總體積", "(D) 反應前待作用物的質量"]),
        idea: "【正確解答】 (B)<br>【詳細解析】 比較甲、丙(或乙、丁)兩組數據，在「酵素體積」與「待作用物質量」皆相同(控制變因)的情況下，只要「作用溫度」(操縱變因)由 30°C 降為 15°C，反應後生成物質的質量就會從 25g 增加為 50g。"
      },
      {
        lv: "103 教育會考",
        q: "附圖為兩項實驗器材，其使用說明如下：<br><br>器材一：多用於吸取少量的液體，吸取液體後應將其顛倒放置，以防止其內液體流出。<br>器材二：常用於測量液體的體積，但不可在其內進行化學反應，也不可用於加熱。<br><br>關於這兩項器材的使用說明，下列判斷何者正確？" + img103Tools + genOpts(["(A) 兩項器材的說明皆正確", "(B) 兩項器材的說明皆錯誤", "(C) 只有器材一的說明正確", "(D) 只有器材二的說明正確"]),
        idea: "【正確解答】 (D)<br>【詳細解析】 器材一(滴管)吸取液體後應將尖嘴朝下放置，「絕對不可倒置」，以免液體倒流而腐蝕橡皮頭。器材二(量筒)的使用說明則完全正確。"
      },
      {
        lv: "104 教育會考",
        q: "小琪要從附圖的甲、乙兩罐藥瓶中取出適量藥品進行實驗，根據藥品名稱判斷，最適合取用此兩種藥品的器材分別為下列何者？" + img104Bot + genOpts([opt104A, opt104B, opt104C, opt104D]),
        idea: "【正確解答】 (C)<br>【詳細解析】 甲瓶標示「碳酸鈣」，為固體粉末狀藥品，須以刮勺舀取；乙瓶標示「鹽酸」，為液態藥品，須先倒入燒杯中，再以滴管吸取。"
      },
      {
        lv: "105 教育會考",
        q: "老師要求同學設計一個有關粉筆在水中浸泡時間與粉筆斷裂難易度關係的實驗，實驗方法為先將粉筆浸泡水中一段時間，再以相同的方法量出折斷粉筆所需要的最小外力。由下列選項的實驗紀錄表，推測何者的實驗設計最符合前述的實驗目的？" + genOpts(["<b>(A)</b>" + t_105A, "<b>(B)</b>" + t_105B, "<b>(C)</b>" + t_105C, "<b>(D)</b>" + t_105D]),
        idea: "【正確解答】 (A)<br>【詳細解析】 欲了解浸泡時間與斷裂難易度的關係，「浸泡時間」為操縱變因(每次要改變數值)，其他因素(粉筆顏色、長度)皆為控制變因(必須保持一樣)，最小外力則是應變變因，故只有(A)的設計符合。"
      },
      {
        lv: "109 教育會考",
        q: "如附圖所示，美美想把燒杯中的液體倒入滴定管中，她搭配下列哪一項器材來使用，最適合且最能避免在傾倒液體時灑出？" + img109Pour + genOpts([opt109A, opt109B, opt109C, opt109D]),
        idea: "【正確解答】 (A)<br>【詳細解析】 滴定管的管口非常狹小，欲添加液體時，應先將(A)漏斗尖端插入滴定管中再倒入液體，才可避免液體灑出。(B)玻棒/刮勺；(C)量筒；(D)蒸發皿。"
      },
      {
        lv: "107 教育會考 (1)",
        q: "小瑩想以量筒量取 30.0 mL 的溶液，附圖虛線箭頭所指的位置為量筒中目前已量取的溶液體積。小瑩使用下列哪一種器材裝取溶液後，再加入量筒內，最能避免體積超出 30.0 mL？" + img107Cyl + genOpts([opt107A, opt107B, opt107C, opt107D]),
        idea: "【正確解答】 (A)<br>【詳細解析】 滴管(A)為吸取少量液體，適合在接近刻度時一滴一滴精準加入，最能避免超過 30.0 mL。(B)試管、(C)錐形瓶、(D)燒杯皆可能一次倒太多。"
      },
      {
        lv: "107 教育會考 (2)",
        q: "瑋婷觀察爸爸在家中利用茶壺煮水時，茶壺內水量的多少似乎會影響水煮沸所需的時間，他假設當茶壺內水量越多，將水煮沸所需的時間也越多。若要驗證他的假設是否合理，下列哪一種實驗設計可直接用來驗證他的假設？" + genOpts(["(A) 在完全相同的茶壺中，分別裝入不同水量，以同一個瓦斯爐的相同火力加熱，測量水從室溫加熱到沸騰所需時間", "(B) 使用不同大小的茶壺，分別裝入等量的水，以同一個瓦斯爐的相同火力加熱，測量水從室溫加熱到沸騰所需時間", "(C) 在完全相同的茶壺中，分別裝入不同水量，以同一個瓦斯爐的相同火力加熱，將水加熱5分鐘，測量瓦斯桶減輕的重量", "(D) 在完全相同的茶壺中，分別裝入等量的水，以同一個瓦斯爐的大、中、小不同的火力加熱，測量水從室溫加熱到沸騰所需時間"]),
        idea: "【正確解答】 (A)<br>【詳細解析】 要探討「水量」對「煮沸時間」的影響，水量必須是操縱變因，煮沸時間是應變變因；其餘因素如茶壺大小、火力大小則必須是控制變因(完全相同)，故選(A)。"
      },
      {
        lv: "113 教育會考",
        q: "在自來水中加入氯氣雖然可以消毒，但氯氣可能會進一步反應產生致癌物。下列實驗，想知道將自來水靜置一段時間或加熱能否降低餘氯量，實驗結果如表(一)和表(二)：<br><b style='font-size:0.9rem; color:#7A8B76;'>表(一)</b>" + t_113_1 + "<b style='font-size:0.9rem; color:#7A8B76;'>表(二)</b>" + t_113_2 + "依據表中結果判斷，下列說明何者最合理？" + genOpts(["(A) 僅由表(一)的結果，可以判斷溫度高低與能否降低餘氯量有關", "(B) 僅由表(二)的結果，可以判斷靜置時間長短與能否降低餘氯量有關", "(C) 由表(一)結果可以做出在 10°C 時，餘氯量也會隨靜置時間增加而下降的結論", "(D) 以表(一)數據做為參照，可使用表(二)的結果來判斷加熱能否降低餘氯量。"]),
        idea: "【正確解答】 (D)<br>【詳細解析】 表(一)的溫度固定在 25°C (控制變因)，探討的是時間；表(二)則探討加熱(溫度上升)的影響。以表(一)不加熱的情況做為對照組參照，對比表(二)，即可判斷「加熱」能否降低餘氯量。"
      },
      {
        lv: "111 教育會考",
        q: "小蘭想了解山坡地發生山崩時，不同因素對建築物破壞程度的影響，而設計以下實驗，裝置如附圖所示。θ為斜面與水平面間的夾角，實驗方式是讓石塊從斜面上滑落撞擊下方的模型房屋。附表則是小蘭 4 次實驗的一些參數。下列有關此實驗的敘述，何者正確？" + img111Slope + t_111_land + genOpts(["(A) 在實驗編號 1、2 中，石塊重量控制不變", "(B) 在實驗編號 3、4 中，斜面長度控制不變", "(C) 若要了解夾角θ的影響，可參考實驗編號 2、4 的結果", "(D) 若要了解斜面長度的影響，可參考實驗編號 1、3 的結果。"]),
        idea: "【正確解答】 (A)<br>【詳細解析】 觀察表格，編號1與2的石塊重量都是 2 kgw (控制變因)，而斜面長度分別是 100cm 與 50cm (操縱變因)。"
      },
      {
        lv: "114 教育會考",
        q: "在核發節能標章時須檢測不同品牌、型號的產品是否符合標準，其檢測方式也隨年代而改進。附表為 81 年至 106 年期間檢測某類電扇的風速時，針對電扇樣品位置條件所做的改變，關於這項改變的目的，最可能為下列何者？" + t_114_fan + genOpts(["(A) 設立可觀察的對照組", "(B) 增加不同變因的實驗組", "(C) 增加電扇樣品位置的控制變因", "(D) 訂立電扇樣品位置的操作(縱)變因"]),
        idea: "【正確解答】 (C)<br>【詳細解析】 電扇的風速會受到其品牌、型號及位置等變因影響，故應使電扇樣品位置保持不變，即增加此「控制變因」，才能排除位置對風速測量的干擾。"
      },
      {
        lv: "106 教育會考",
        q: "附圖為某實驗器材的三種使用方法，哪幾種使用方法不恰當？" + img106Method + genOpts(["(A) 方法甲和方法乙", "(B) 方法甲和方法丙", "(C) 方法乙和方法丙", "(D) 三種方法都不恰當"]),
        idea: "【正確解答】 (A)<br>【詳細解析】 量筒只能用來「測量體積」(方法丙)！量筒底部狹窄且玻璃厚度不均，拿去火上加熱(方法甲)極易破裂；直接在裡面加粉末攪拌配製溶液(方法乙)也極易因摩擦或放熱導致破裂。"
      },
      {
        lv: "115 教育會考 (題組 1/2)",
        q: "科學家定義酸雨為受到人為汙染物影響，且pH值小於5.0的雨水。小洲在報紙上閱讀到兩則對同一事件描述的報導，如圖(一)與圖(二)。<br><br><div style='padding:10px; background:#F8F5EE; border-radius:6px; font-size:0.9rem;'><b>圖(一)</b> 環保署在全臺分布有14個測站，根據2020年的調查，全臺雨水最酸發生在某市，該測站雨水pH值的平均為4.96，且酸雨發生的機率達63%。環保署認為該市酸雨較嚴重的原因，主要是受到東北季風影響，加上鄰近地區有大量汽機車的廢氣排放所致。</div><br><div style='padding:10px; background:#F8F5EE; border-radius:6px; font-size:0.9rem;'><b>圖(二)</b> 對於環保署的調查結果，該市環保局有不同看法。環保局在該市自行設立多個測站，測量結果顯示其多個測站的雨水pH值的平均為5.86，並沒有環保署說的這麼嚴重。專家認為，排除人為或儀器上的誤差，會有這兩種結果差異，可能與其他原因有關。</div><br>他閱讀完這兩則報導後，想了解某個問題，因此另外收集了部分地區的數據並分為甲、乙兩組，如表(一)。" + t_115_acid + "<br>(1) 圖(二)中，造成兩種結果差異的其他原因，最可能為下列何者？" + genOpts(["(A) 該市酸雨的發生機率高，超過50%", "(B) 環保署與該市環保局對於酸雨的定義不同", "(C) 環保署所測出的該市雨水pH 值太接近5.0", "(D) 單一測站的測量結果會與多個測站平均值有差異。"]),
        idea: "【正確解答】 (D)<br>【詳細解析】 圖(一)是依「單一測站」判斷酸雨情形，圖(二)則是以「多個測站的平均」判斷，故兩者結果的差異最可能是單一測站的結果與多個測站的平均值不同。"
      },
      {
        lv: "115 教育會考 (題組 2/2)",
        q: "(承上題)<br>(2) 將表(一)的資料分成甲、乙兩組，最可能是想用來了解下列哪一個問題？" + genOpts(["(A) 位於東北季風迎、背風面是否會影響判定酸雨的標準", "(B) 位於東北季風迎、背風面是否會影響雨水pH值的平均", "(C) 各地區雨水pH值的平均高低是否影響酸雨發生的機率", "(D) 各地區雨水pH值的平均高低是否影響人為汙染物的種類。"]),
        idea: "【正確解答】 (B)<br>【詳細解析】 甲組的臺北、宜蘭位於東北季風的迎風面，乙組的雲林、嘉義位於東北季風的背風面，故分類是想探討迎、背風面是否會影響雨水pH值的平均。"
      },
      {
        lv: "111 教育會考補考 (題組 1/2)",
        q: "阿璇想要探究水面上放置遮蔽物如何影響水量的蒸發。她在形狀為長方體的五個相同容器內裝入40L的水，並將五個容器分別編號，一號不放球，二~五號分別以不同顏色、相同大小的乒乓球鋪滿整個水面，她依照所觀測到球的顏色深淺排列二~五號，由淺至深依序為白→紅→藍→黑。接著在每個容器上方相同的高度設置相同的白熾燈泡，持續照射7天，並每兩天於同一時間測量水面高度，測量結果如附表所示。<br>" + t_111_evap + "<br>(1) 根據附表記錄的結果所提出的推論，下列哪一個最合理？" + genOpts(["(A) 水面上鋪滿乒乓球對水的蒸發沒有影響", "(B) 水面上乒乓球的數量越多，減少水蒸發的效果越好", "(C) 水面上乒乓球的顏色越深，減少水蒸發的效果越好", "(D) 水面上鋪滿乒乓球可以減少水的蒸發，但是乒乓球的顏色對水的蒸發完全沒有影響。"]),
        idea: "【正確解答】 (C)<br>【詳細解析】 容器剩餘的水面高度越高，代表蒸發掉的水越少。由數據可知黑球(15.95) > 藍球(15.90) > 紅球(15.80) > 白球(15.50)，證明顏色越深，減少水蒸發的效果越好。"
      },
      {
        lv: "111 教育會考補考 (題組 2/2)",
        q: "(承上題)<br>(2) 若阿璇想要將實驗裝置從室內移至戶外，以陽光代替白熾燈泡，來探討相同的問題，下列何者最不可能是她需要考慮的變因？" + genOpts(["(A) 午後雷陣雨", "(B) 乒乓球的價格", "(C) 四處飄散的落葉及灰塵", "(D) 容器位置與附近建築物的距離。"]),
        idea: "【正確解答】 (B)<br>【詳細解析】 (B)乒乓球的價格不會影響物理蒸發現象；而(A)降雨、(C)落葉遮蔽、(D)建築物遮陽等皆可能影響水分蒸發速率，是必須考慮的變因。"
      },
      {
        lv: "各校常考",
        q: "實驗室中想要稀釋濃硫酸，下列操作方法何者最安全？" + genOpts([opt60A, opt60B, opt60C, opt60D]),
        idea: "【正確解答】 (C)<br>【詳細解析】 口訣：「流(硫)入水中」稀釋濃硫酸時，須沿著玻璃棒將濃酸緩緩加入「水」中。若以水直接倒入濃硫酸中(如A或B)，會因為強烈放熱反應，使少量的水瞬間沸騰，導致酸液飛濺傷人。"
      }
    ],

    where: {
      codes: [["N-8-1", "科學方法：觀察、假說、實驗、結論等步驟"], ["n-IV-2", "了解並遵守實驗室安全守則與儀器操作。"]],
      exam: "本單元是所有理化實驗的基石。大考極常在題幹中考驗學生判斷「操縱變因」與「控制變因」的能力，並頻繁出現「量筒不能配製溶液」與「稀釋濃酸要將酸入水」等實驗安全禁忌考題。",
      stop: "只需理解科學探究的邏輯思維，並熟記上述常見儀器的「不可做之事（禁忌）」各種化學藥品的詳細性質，在後續章節會再深入探討。"
    }
  });

  // --- 前往下一節按鈕 ---
  setTimeout(function() {
      var mainContainer = document.getElementById("main");
      if (mainContainer && !document.getElementById("btn-next-unit")) {
          var nextNav = SK.h("nav", { class: "unit-foot", id:"btn-next-unit", "aria-label": "前往下一節", style: "margin-top: 30px; text-align:center; border:none; background:transparent;" });
          nextNav.innerHTML = '<a class="btn" href="vol3-1-1.html" style="background:#CDE0DB; color:#4F7479; border-color:#CDE0DB; font-size:1.1rem; padding: 12px 24px; box-shadow: 0 4px 12px rgba(79,116,121,0.15);">進入下一節：1.1 長度與體積的測量 ' + SK.icon("arrow") + '</a>';
          mainContainer.appendChild(nextNav);
      }
  }, 500);

})();
