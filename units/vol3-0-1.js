/* 單元：3冊 0.1 科學方法與實驗守則 (會考實戰完整收錄版) */
(function () {
  var C = SK.C, s = SK.s;

  // 注入專門為會考題設計的手機相容排版 (RWD CSS)
  var style = document.createElement("style");
  style.innerHTML = 
    ".rwd-tb-wrap { width: 100%; overflow-x: auto; margin: 15px 0; border: 1px solid #E3D4AC; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }" +
    ".rwd-tb { width: 100%; min-width: 320px; border-collapse: collapse; text-align: center; font-size: 0.95rem; }" +
    ".rwd-tb th { background: #F8F5EE; padding: 8px; border-bottom: 2px solid #E3D4AC; color: #4A3F37; font-weight: bold; }" +
    ".rwd-tb td { padding: 8px; border-bottom: 1px solid #E3D4AC; color: #6F645A; background: #FFF; }" +
    ".opt-wrap { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }" +
    ".opt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 15px; }" +
    ".opt-item { background: #FFF; border: 1px solid #E3D4AC; border-radius: 6px; padding: 12px; font-size: 0.95rem; color: #4A3F37; display: flex; align-items: center; gap: 10px; transition: background 0.2s; }" +
    ".opt-item:hover { background: #FDF9F6; }" +
    ".opt-col { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }" +
    ".q-img-wrap { max-width: 100%; text-align: center; margin: 15px 0; overflow-x: auto; }" +
    ".q-img-wrap svg { max-width: 100%; height: auto; }";
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
    var svg = SK.svg(el, 300, 150, "錯誤的稀釋方式");
    s("rect", { x: 120, y: 70, width: 60, height: 60, rx: 5, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("circle", { cx: 150, cy: 50, r: 4, fill: C.orange.s }, svg);
    s("circle", { cx: 130, cy: 30, r: 3, fill: C.orange.s }, svg);
    s("circle", { cx: 170, cy: 40, r: 5, fill: C.orange.s }, svg);
    SK.label(svg, 150, 145, "強烈放熱導致酸液沸騰飛濺", { size: 13, color: C.orange.s });
  }

  /* --- 核心推導：科學方法流程圖 --- */
  function methodDerive(ctx) {
    var svg = SK.svg(ctx.stage, 480, 420, "科學方法步驟流程圖");
    svg.style.width = "100%";
    svg.style.height = "auto";
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

  // ==== 輔助產生器 ====
  function genTb(headers, rows) {
    var h = '<div class="rwd-tb-wrap"><table class="rwd-tb"><tr>';
    headers.forEach(function(th){ h += '<th>' + th + '</th>'; });
    h += '</tr>';
    rows.forEach(function(row){
      h += '<tr>';
      row.forEach(function(td){ h += '<td>' + td + '</td>'; });
      h += '</tr>';
    });
    return h + '</table></div>';
  }
  function genOpts(opts, isGrid) {
    var h = '<div class="' + (isGrid ? 'opt-grid' : 'opt-wrap') + '">';
    opts.forEach(function(o){ h += '<div class="opt-item">' + o + '</div>'; });
    return h + '</div>';
  }

  // ==== 歷屆會考題專屬素材 (純手工繪製) ====
  
  // 111 山崩實驗圖解
  var img111Slope = '<div class="q-img-wrap"><svg viewBox="0 0 200 100" width="200"><path d="M20 80 L180 80" stroke="#5B778C" stroke-width="2"/><path d="M20 80 L140 20" stroke="#5B778C" stroke-width="2"/><text x="145" y="85" font-size="12" fill="#4A3F37">水平面</text><text x="70" y="35" font-size="12" fill="#4A3F37" transform="rotate(-26 70 35)">斜面</text><path d="M40 80 A 40 40 0 0 0 45 68" fill="none" stroke="#C28C6E" stroke-width="1.5"/><text x="48" y="76" font-size="12" fill="#C28C6E">θ</text><rect x="100" y="30" width="15" height="15" fill="#4A3F37" transform="rotate(-26 100 30)"/><text x="110" y="25" font-size="12" fill="#4A3F37">石塊</text><rect x="10" y="60" width="15" height="20" fill="#7A8B76"/><text x="0" y="55" font-size="10" fill="#7A8B76">模型房屋</text></svg></div>';
  
  // 109 滴定管傾倒圖解
  var img109Pour = '<div class="q-img-wrap"><svg viewBox="0 0 100 120" width="100"><rect x="45" y="40" width="10" height="70" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="42" y="90" width="16" height="4" fill="#5B778C"/><path d="M20 10 L50 40 L50 10 Z" fill="none" stroke="#4A3F37" stroke-width="2"/><path d="M45 35 Q40 45 50 50 Q55 45 45 35" fill="rgba(164,185,200,.5)"/><text x="10" y="20" font-size="12" fill="#4A3F37">燒杯</text><text x="65" y="80" font-size="12" fill="#4A3F37">滴定管</text></svg></div>';
  var opt109A = '<div class="opt-col"><b>(A)</b><svg viewBox="0 0 50 60" width="40"><path d="M10 10 L40 10 L28 30 L28 50" fill="none" stroke="#C28C6E" stroke-width="2"/><ellipse cx="25" cy="10" rx="15" ry="4" fill="rgba(224,189,173,.6)" stroke="#C28C6E" stroke-width="1"/></svg></div>';
  var opt109B = '<div class="opt-col"><b>(B)</b><svg viewBox="0 0 50 60" width="40"><path d="M10 50 L35 15" stroke="#7A8B76" stroke-width="3"/><circle cx="37" cy="13" r="3" fill="#7A8B76"/></svg></div>';
  var opt109C = '<div class="opt-col"><b>(C)</b><svg viewBox="0 0 50 60" width="40"><rect x="15" y="10" width="20" height="40" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="10" y1="50" x2="40" y2="50" stroke="#5B778C" stroke-width="2"/><line x1="15" y1="20" x2="20" y2="20" stroke="#5B778C" stroke-width="1"/><line x1="15" y1="30" x2="25" y2="30" stroke="#5B778C" stroke-width="1"/><line x1="15" y1="40" x2="20" y2="40" stroke="#5B778C" stroke-width="1"/></svg></div>';
  var opt109D = '<div class="opt-col"><b>(D)</b><svg viewBox="0 0 50 60" width="40"><path d="M5 30 Q25 50 45 30" fill="rgba(196,189,207,.5)" stroke="#847C96" stroke-width="2"/></svg></div>';

  // 107 量筒 30mL 圖解
  var img107Cyl = '<div class="q-img-wrap"><svg viewBox="0 0 150 150" width="130"><path d="M30 20 L30 130 L70 130 L70 20" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="20" y1="130" x2="80" y2="130" stroke="#5B778C" stroke-width="2"/><line x1="30" y1="40" x2="35" y2="40" stroke="#5B778C" stroke-width="1"/><text x="40" y="44" font-size="10" fill="#4A3F37">40</text><line x1="30" y1="70" x2="35" y2="70" stroke="#5B778C" stroke-width="1"/><text x="40" y="74" font-size="10" fill="#4A3F37">30</text><line x1="30" y1="100" x2="35" y2="100" stroke="#5B778C" stroke-width="1"/><text x="40" y="104" font-size="10" fill="#4A3F37">20</text><rect x="32" y="72" width="36" height="58" fill="rgba(164,185,200,.5)"/><path d="M50 10 L50 20 L45 20 L50 30 Z" fill="#4A3F37"/><text x="35" y="10" font-size="12" fill="#4A3F37">再加入</text><circle cx="110" cy="70" r="30" fill="none" stroke="#C28C6E" stroke-width="2"/><path d="M85 85 Q110 95 135 85" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="110" y1="90" x2="140" y2="90" stroke="#C28C6E" stroke-width="2" stroke-dasharray="4 4"/><text x="90" y="70" font-size="14" fill="#4A3F37">30.</text><line x1="65" y1="70" x2="80" y2="70" stroke="#C28C6E" stroke-width="1" stroke-dasharray="2 2"/></svg></div>';
  var opt107A = '<div class="opt-col"><b>(A)</b><svg viewBox="0 0 40 60" width="30"><path d="M15 15 L15 50 L18 55 L22 55 L25 50 L25 15 Z" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="10" y="0" width="20" height="15" rx="5" fill="#EBCDCB" stroke="#B57E83" stroke-width="2"/></svg></div>';
  var opt107B = '<div class="opt-col"><b>(B)</b><svg viewBox="0 0 40 60" width="30"><path d="M15 10 L15 45 A 5 5 0 0 0 25 45 L25 10" fill="none" stroke="#5B778C" stroke-width="2"/></svg></div>';
  var opt107C = '<div class="opt-col"><b>(C)</b><svg viewBox="0 0 40 60" width="30"><path d="M15 10 L15 25 L5 50 L35 50 L25 25 L25 10" fill="none" stroke="#5B778C" stroke-width="2"/></svg></div>';
  var opt107D = '<div class="opt-col"><b>(D)</b><svg viewBox="0 0 40 60" width="30"><path d="M5 20 L5 50 L35 50 L35 20" fill="none" stroke="#5B778C" stroke-width="2"/><path d="M5 20 L0 15 L5 15" fill="none" stroke="#5B778C" stroke-width="2"/></svg></div>';

  // 106 錯誤方法圖解
  var img106Method = '<div class="q-img-wrap"><div style="display:flex; justify-content:space-around; align-items:flex-end;">' +
    '<div class="opt-col"><svg viewBox="0 0 100 120" width="80"><rect x="35" y="90" width="30" height="20" fill="#EBCDCB" /><path d="M50 70 Q55 85 50 90 Q45 85 50 70" fill="#C28C6E" /><g transform="rotate(30 50 50)"><rect x="40" y="10" width="20" height="70" rx="10" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="40" y1="20" x2="45" y2="20" stroke="#5B778C" stroke-width="1"/><line x1="40" y1="30" x2="50" y2="30" stroke="#5B778C" stroke-width="1"/><line x1="40" y1="40" x2="45" y2="40" stroke="#5B778C" stroke-width="1"/><rect x="42" y="40" width="16" height="35" fill="rgba(164,185,200,.5)"/><rect x="30" y="30" width="10" height="20" fill="#4A3F37"/></g></svg><br><span style="font-size:0.9rem">來回均勻加熱溶液<br><b>方法甲</b></span></div>' +
    '<div class="opt-col"><svg viewBox="0 0 100 120" width="80"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="42" y="70" width="16" height="40" fill="rgba(189,203,184,.5)"/><line x1="60" y1="10" x2="45" y2="90" stroke="#C28C6E" stroke-width="3"/><text x="45" y="15" font-size="12" fill="#4A3F37">小蘇打</text></svg><br><span style="font-size:0.9rem">加入後攪拌配成溶液<br><b>方法乙</b></span></div>' +
    '<div class="opt-col"><svg viewBox="0 0 100 120" width="80"><rect x="20" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="10" y1="110" x2="50" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="22" y="70" width="16" height="40" fill="rgba(164,185,200,.5)"/><path d="M 50 60 L 60 60 L 55 70 Z" fill="#4A3F37"/><rect x="70" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="60" y1="110" x2="100" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="72" y="50" width="16" height="60" fill="rgba(164,185,200,.5)"/><circle cx="80" cy="90" r="8" fill="#4A3F37"/></svg><br><span style="font-size:0.9rem">測量不溶於水物質的體積<br><b>方法丙</b></span></div>' +
    '</div></div>';

  // 104 取藥圖解
  var img104Bot = '<div class="q-img-wrap"><div style="display:flex; justify-content:space-around; align-items:center;">' +
    '<div class="opt-col"><b>甲</b><svg viewBox="0 0 60 80" width="50"><rect x="10" y="20" width="40" height="50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="15" y="10" width="30" height="10" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="10" y="40" width="40" height="20" fill="rgba(189,203,184,.5)"/><text x="30" y="54" font-size="10" fill="#4A3F37" text-anchor="middle">碳酸鈣</text></svg></div>' +
    '<div class="opt-col"><b>乙</b><svg viewBox="0 0 60 80" width="50"><path d="M20 20 L40 20 L45 30 L45 70 L15 70 L15 30 Z" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="25" y="10" width="10" height="10" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="15" y="40" width="30" height="20" fill="rgba(164,185,200,.5)"/><text x="30" y="54" font-size="10" fill="#4A3F37" text-anchor="middle">鹽酸</text></svg></div>' +
    '</div></div>';
  var opt104A = '<div class="opt-col"><b>(A)</b> <div style="display:flex; gap:10px;"><div class="opt-col">甲<svg viewBox="0 0 20 60" width="20"><line x1="15" y1="10" x2="5" y2="50" stroke="#4A3F37" stroke-width="2"/><circle cx="5" cy="50" r="3" fill="#4A3F37"/></svg></div><div class="opt-col">乙<svg viewBox="0 0 20 60" width="20"><line x1="15" y1="10" x2="5" y2="50" stroke="#4A3F37" stroke-width="2"/><circle cx="5" cy="50" r="3" fill="#4A3F37"/></svg></div></div></div>';
  var opt104B = '<div class="opt-col"><b>(B)</b> <div style="display:flex; gap:10px;"><div class="opt-col">甲<svg viewBox="0 0 20 60" width="20"><path d="M10 20 L10 50 L12 55 L8 55 Z" fill="none" stroke="#4A3F37" stroke-width="2"/><rect x="7" y="10" width="6" height="10" rx="3" fill="#4A3F37"/></svg></div><div class="opt-col">乙<svg viewBox="0 0 20 60" width="20"><path d="M10 20 L10 50 L12 55 L8 55 Z" fill="none" stroke="#4A3F37" stroke-width="2"/><rect x="7" y="10" width="6" height="10" rx="3" fill="#4A3F37"/></svg></div></div></div>';
  var opt104C = '<div class="opt-col"><b>(C)</b> <div style="display:flex; gap:10px;"><div class="opt-col">甲<svg viewBox="0 0 20 60" width="20"><line x1="15" y1="10" x2="5" y2="50" stroke="#4A3F37" stroke-width="2"/><circle cx="5" cy="50" r="3" fill="#4A3F37"/></svg></div><div class="opt-col">乙<svg viewBox="0 0 20 60" width="20"><path d="M10 20 L10 50 L12 55 L8 55 Z" fill="none" stroke="#4A3F37" stroke-width="2"/><rect x="7" y="10" width="6" height="10" rx="3" fill="#4A3F37"/></svg></div></div></div>';
  var opt104D = '<div class="opt-col"><b>(D)</b> <div style="display:flex; gap:10px;"><div class="opt-col">甲<svg viewBox="0 0 20 60" width="20"><path d="M10 20 L10 50 L12 55 L8 55 Z" fill="none" stroke="#4A3F37" stroke-width="2"/><rect x="7" y="10" width="6" height="10" rx="3" fill="#4A3F37"/></svg></div><div class="opt-col">乙<svg viewBox="0 0 20 60" width="20"><line x1="15" y1="10" x2="5" y2="50" stroke="#4A3F37" stroke-width="2"/><circle cx="5" cy="50" r="3" fill="#4A3F37"/></svg></div></div></div>';

  // 110 (Q60) 稀釋硫酸圖解
  var opt60A = '<div class="opt-col"><b>(A)</b><svg viewBox="0 0 100 120" width="70"><path d="M30 50 L30 110 L90 110 L90 50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="70" width="56" height="38" fill="rgba(217,175,180,.5)"/><text x="60" y="95" text-anchor="middle" font-size="12" fill="#4A3F37">濃硫酸</text><line x1="75" y1="20" x2="60" y2="100" stroke="#C28C6E" stroke-width="2"/><g transform="rotate(-45 60 20)"><rect x="50" y="-10" width="20" height="40" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/><text x="60" y="15" text-anchor="middle" font-size="10" fill="#4A3F37">水</text></g><circle cx="50" cy="50" r="2" fill="rgba(164,185,200,.5)"/><circle cx="55" cy="60" r="3" fill="rgba(164,185,200,.5)"/></svg></div>';
  var opt60B = '<div class="opt-col"><b>(B)</b><svg viewBox="0 0 100 120" width="70"><path d="M30 50 L30 110 L90 110 L90 50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="70" width="56" height="38" fill="rgba(217,175,180,.5)"/><text x="60" y="95" text-anchor="middle" font-size="12" fill="#4A3F37">濃硫酸</text><g transform="rotate(-45 60 20)"><rect x="50" y="-10" width="20" height="40" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/><text x="60" y="15" text-anchor="middle" font-size="10" fill="#4A3F37">水</text></g><circle cx="50" cy="50" r="2" fill="rgba(164,185,200,.5)"/><circle cx="55" cy="60" r="3" fill="rgba(164,185,200,.5)"/></svg></div>';
  var opt60C = '<div class="opt-col"><b>(C)</b><svg viewBox="0 0 100 120" width="70"><path d="M30 50 L30 110 L90 110 L90 50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="70" width="56" height="38" fill="rgba(164,185,200,.5)"/><text x="60" y="95" text-anchor="middle" font-size="12" fill="#4A3F37">水</text><line x1="75" y1="20" x2="60" y2="100" stroke="#C28C6E" stroke-width="2"/><g transform="rotate(-45 60 20)"><rect x="50" y="-10" width="20" height="40" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/><text x="60" y="15" text-anchor="middle" font-size="10" fill="#4A3F37">酸</text></g><circle cx="50" cy="50" r="2" fill="rgba(217,175,180,.5)"/><circle cx="55" cy="60" r="3" fill="rgba(217,175,180,.5)"/></svg></div>';
  var opt60D = '<div class="opt-col"><b>(D)</b><svg viewBox="0 0 100 120" width="70"><path d="M30 50 L30 110 L90 110 L90 50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="70" width="56" height="38" fill="rgba(164,185,200,.5)"/><text x="60" y="95" text-anchor="middle" font-size="12" fill="#4A3F37">水</text><g transform="rotate(-45 60 20)"><rect x="50" y="-10" width="20" height="40" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/><text x="60" y="15" text-anchor="middle" font-size="10" fill="#4A3F37">酸</text></g><circle cx="50" cy="50" r="2" fill="rgba(217,175,180,.5)"/><circle cx="55" cy="60" r="3" fill="rgba(217,175,180,.5)"/></svg></div>';

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
        lv: "115 會考 (變因判斷)",
        q: "網路流傳一種說法：「使用加食鹽的熱水拖地，地板會比較快乾。」小綺想要找出影響地板乾燥速率的變因，使用附表中四組的水來拖地，當中的哪兩組相互比較，最不可能達到他的目的？" + t_115 + genOpts(["(A) 第一組和第二組", "(B) 第一組和第三組", "(C) 第二組和第三組", "(D) 第二組和第四組"]),
        idea: "【正確解答】 (C) 第二組和第三組<br>【詳細解析】 第二組(熱水無鹽)與第三組(冷水加鹽)同時改變了「水溫」和「是否加食鹽」兩個變因，因此無法判斷是哪一個變因影響地板的乾燥速率。科學方法中，每次只能改變一個「操縱變因」。"
      },
      {
        lv: "114 會考 (對照組設計)",
        q: "在核發節能標章時須檢測不同品牌、型號的產品是否符合標準，其檢測方式也隨年代而改進。附表為 81 年至 106 年期間檢測某類電扇的風速時，針對電扇樣品位置條件所做的改變，關於這項改變的目的，最可能為下列何者？" + t_114_fan + genOpts(["(A) 設立可觀察的對照組", "(B) 增加不同變因的實驗組", "(C) 增加電扇樣品位置的控制變因", "(D) 訂立電扇樣品位置的操作(縱)變因"]),
        idea: "【正確解答】 (C) 增加電扇樣品位置的控制變因<br>【詳細解析】 電扇的風速(應變變因)會受到其品牌、型號及位置等變因影響，故應使電扇樣品位置保持不變，即增加此「控制變因」，才能排除電扇樣品位置對風速測量的干擾。"
      },
      {
        lv: "113 會考 (表格判讀)",
        q: "在自來水中加入氯氣雖然可以消毒，但氯氣可能會進一步反應產生致癌物。下列實驗，想知道將自來水靜置一段時間或加熱能否降低餘氯量，實驗結果如表(一)和表(二)：<br><b style='font-size:0.9rem'>表(一) 溫度皆為 25°C</b>" + makeTable(["時間(分)", "0", "3", "5", "10", "30", "60", "120", "240"], [["餘氣量", "0.39", "0.33", "0.28", "0.22", "0.18", "0.15", "0.13", "0.09"]]) + "<b style='font-size:0.9rem'>表(二) 加熱過程</b>" + makeTable(["時間(分)", "0", "3", "5", "10"], [["溫度(°C)", "25", "27", "31", "沸騰"], ["餘氣量", "0.39", "0.30", "0.20", "0.00"]]) + "依據表中結果判斷，下列說明何者最合理？" + genOpts(["(A) 僅由表(一)的結果，可以判斷溫度高低與能否降低餘氯量有關", "(B) 僅由表(二)的結果，可以判斷靜置時間長短與能否降低餘氯量有關", "(C) 由表(一)結果可以做出在 10°C 時，餘氯量也會隨靜置時間增加而下降的結論", "(D) 以表(一)數據做為參照，可使用表(二)的結果來判斷加熱能否降低餘氯量。"]),
        idea: "【正確解答】 (D)<br>【詳細解析】 表(一)的溫度固定在 25°C (控制變因)，探討的是時間；表(二)則探討加熱(溫度上升)的影響。以表(一)不加熱的情況做為對照組參照，對比表(二)，即可判斷「加熱」這個操縱變因能否降低餘氯量。"
      },
      {
        lv: "111 會考 (變因控制)",
        q: "小蘭想了解山坡地發生山崩時，不同因素對建築物破壞程度的影響，而設計以下實驗，讓石塊從斜面上滑落撞擊下方的模型房屋。附表則是小蘭 4 次實驗的一些參數。下列有關此實驗的敘述，何者正確？" + img111Slope + t_111_land + genOpts(["(A) 在實驗編號 1、2 中，石塊重量控制不變", "(B) 在實驗編號 3、4 中，斜面長度控制不變", "(C) 若要了解夾角θ的影響，可參考實驗編號 2、4 的結果", "(D) 若要了解斜面長度的影響，可參考實驗編號 1、3 的結果。"]),
        idea: "【正確解答】 (A) 在實驗編號 1、2 中，石塊重量控制不變<br>【詳細解析】 觀察表格，編號1與2的石塊重量都是 2 kgw (控制變因)，而斜面長度分別是 100cm 與 50cm (操縱變因)。"
      },
      {
        lv: "111 會考補考 (蒸發實驗)",
        q: "阿璇想要探究水面上放置遮蔽物如何影響水量的蒸發。一號不放球，二~五號分別以不同顏色、相同大小的乒乓球鋪滿整個水面。持續照射 7 天後測量水面高度，測量結果如附表所示。根據附表記錄的結果所提出的推論，下列哪一個最合理？" + t_111_evap + genOpts(["(A) 水面上鋪滿乒乓球對水的蒸發沒有影響", "(B) 水面上乒乓球的數量越多，減少水蒸發的效果越好", "(C) 水面上乒乓球的顏色越深，減少水蒸發的效果越好", "(D) 水面上鋪滿乒乓球可以減少水的蒸發，但是乒乓球的顏色對水的蒸發完全沒有影響。"]),
        idea: "【正確解答】 (C) 水面上乒乓球的顏色越深，減少水蒸發的效果越好<br>【詳細解析】 容器剩餘的水面高度越高，代表蒸發掉的水越少。由數據可知：黑球 (15.95) > 藍球 (15.90) > 紅球 (15.80) > 白球 (15.50)，證明顏色越深，減少水蒸發的效果越好。"
      },
      {
        lv: "109 會考 (器材搭配)",
        q: "如附圖所示，美美想把燒杯中的液體倒入滴定管中，她搭配下列哪一項器材來使用，最適合且最能避免在傾倒液體時灑出？" + img109Pour + genOpts([opt109A, opt109B, opt109C, opt109D], true),
        idea: "【正確解答】 (A) 漏斗<br>【詳細解析】 滴定管的管口非常狹小，欲添加液體時，應先將(A)漏斗尖端插入滴定管中再倒入液體，才可避免液體灑出。(B)刮勺用於舀取粉末；(C)量筒測量體積；(D)蒸發皿用於加熱蒸發。"
      },
      {
        lv: "107 會考 (精準量取)",
        q: "小瑩想以量筒量取 30.0 mL 的溶液，附圖虛線箭頭所指的位置為量筒中目前已量取的溶液體積。小瑩使用下列哪一種器材裝取溶液後，再加入量筒內，最能避免體積超出 30.0 mL？" + img107Cyl + genOpts([opt107A, opt107B, opt107C, opt107D], true),
        idea: "【正確解答】 (A) 滴管<br>【詳細解析】 滴管(A)為吸取少量液體、轉移至其他容器的工具，適合在接近刻度時一滴一滴精準加入，最能避免超過 30.0 mL。(B)試管、(C)錐形瓶、(D)燒杯皆可能一次倒太多。"
      },
      {
        lv: "107 會考 (假設驗證)",
        q: "瑋婷觀察爸爸在家中利用茶壺煮水時，茶壺內水量的多少似乎會影響水煮沸所需的時間，他假設當茶壺內水量越多，將水煮沸所需的時間也越多。若要驗證他的假設是否合理，下列哪一種實驗設計可直接用來驗證他的假設？" + genOpts(["(A) 在完全相同的茶壺中，分別裝入不同水量，以同一個瓦斯爐的相同火力加熱，測量水從室溫加熱到沸騰所需時間", "(B) 使用不同大小的茶壺，分別裝入等量的水，以同一個瓦斯爐的相同火力加熱，測量水從室溫加熱到沸騰所需時間", "(C) 在完全相同的茶壺中，分別裝入不同水量，以同一個瓦斯爐的相同火力加熱，將水加熱5分鐘，測量瓦斯桶減輕的重量", "(D) 在完全相同的茶壺中，分別裝入等量的水，以同一個瓦斯爐的大、中、小不同的火力加熱，測量水從室溫加熱到沸騰所需時間"]),
        idea: "【正確解答】 (A)<br>【詳細解析】 要探討「水量」對「煮沸時間」的影響，水量必須是操縱變因(不同水量)，煮沸時間是應變變因(要測量的數據)；其餘因素如茶壺大小、火力大小則必須是控制變因(完全相同)，故選(A)。"
      },
      {
        lv: "106 會考 (器材禁忌)",
        q: "附圖為某實驗器材的三種使用方法，哪幾種使用方法不恰當？" + img106Method + genOpts(["(A) 方法甲和方法乙", "(B) 方法甲和方法丙", "(C) 方法乙和方法丙", "(D) 三種方法都不恰當"]),
        idea: "【正確解答】 (A) 方法甲和方法乙<br>【詳細解析】 量筒只能用來「測量體積」(方法丙)！量筒底部狹窄且玻璃厚度不均，拿去火上加熱(方法甲)極易破裂；直接在裡面加粉末攪拌配製溶液(方法乙)也極易因摩擦或放熱導致破裂。"
      },
      {
        lv: "105 會考 (變因判斷)",
        q: "老師要求同學設計一個有關粉筆在水中浸泡時間與粉筆斷裂難易度關係的實驗，實驗方法為先將粉筆浸泡水中一段時間，再以相同的方法量出折斷粉筆所需要的最小外力。由下列選項的實驗紀錄表，推測何者的實驗設計最符合前述的實驗目的？" + genOpts(["<b>(A)</b>" + makeTable(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "白", "白", "白"], ["浸泡時間", "20", "40", "60", "80"], ["粉筆長度", "8", "8", "8", "8"], ["最小外力", "", "", "", ""]]), "<b>(B)</b>" + makeTable(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "紅", "藍", "黃"], ["浸泡時間", "20", "40", "60", "80"], ["粉筆長度", "5", "6", "7", "8"], ["最小外力", "", "", "", ""]]), "<b>(C)</b>" + makeTable(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "紅", "藍", "黃"], ["浸泡時間", "20", "20", "20", "20"], ["粉筆長度", "8", "8", "8", "8"], ["最小外力", "", "", "", ""]]), "<b>(D)</b>" + makeTable(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "紅", "紅", "紅", "紅"], ["浸泡時間", "40", "40", "40", "40"], ["粉筆長度", "5", "6", "7", "8"], ["最小外力", "", "", "", ""]])]),
        idea: "【正確解答】 (A)<br>【詳細解析】 欲了解浸泡時間與斷裂難易度的關係，「浸泡時間」為操縱變因(每次要改變數值：20, 40, 60, 80)，其他因素(粉筆顏色、粉筆長度)皆為控制變因(必須保持一樣)，最小外力則是應變變因(實驗結果)，故只有(A)的設計符合科學方法。"
      },
      {
        lv: "104 會考 (器材選擇)",
        q: "小琪要從附圖的甲、乙兩罐藥瓶中取出適量藥品進行實驗，根據藥品名稱判斷，最適合取用此兩種藥品的器材分別為下列何者？" + img104Bot + genOpts([opt104A, opt104B, opt104C, opt104D], true),
        idea: "【正確解答】 (C) 甲用刮勺、乙用滴管<br>【詳細解析】 甲瓶標示「碳酸鈣」，為固體粉末狀藥品，須以刮勺舀取；乙瓶標示「鹽酸」，為液態藥品，須先倒入燒杯中，再以滴管吸取。"
      },
      {
        lv: "103 會考 (器材規範)",
        q: "附圖為兩項實驗器材，其使用說明如下：<br><br>器材一：多用於吸取少量的液體，吸取液體後應將其顛倒放置，以防止其內液體流出。<br>器材二：常用於測量液體的體積，但不可在其內進行化學反應，也不可用於加熱。<br><br>關於這兩項器材的使用說明，下列判斷何者正確？" + genOpts(["(A) 兩項器材的說明皆正確", "(B) 兩項器材的說明皆錯誤", "(C) 只有器材一的說明正確", "(D) 只有器材二的說明正確"]),
        idea: "【正確解答】 (D) 只有器材二的說明正確<br>【詳細解析】 器材一(滴管)吸取液體後應將尖嘴朝下放置，「絕對不可倒置」，以免液體倒流而腐蝕橡皮頭。器材二(量筒)的使用說明則完全正確。"
      },
      {
        lv: "90 基測 (酵素實驗)",
        q: "夏琳做了一個酵素反應的實驗，得到數據如下表。由此實驗結果推論，下列何者是使此實驗反應後生成物質的質量增加之主要關鍵？" + t_90_enzyme + genOpts(["(A) 酵素的多寡", "(B) 作用溫度的高低", "(C) 反應前反應溶液之總體積", "(D) 反應前待作用物的質量"]),
        idea: "【正確解答】 (B) 作用溫度的高低<br>【詳細解析】 比較甲、丙(或乙、丁)兩組數據，在「酵素體積」與「待作用物質量」皆相同(控制變因)的情況下，只要「作用溫度」(操縱變因)由 30°C 降為 15°C，反應後生成物質的質量就會從 25g 增加為 50g。"
      },
      {
        lv: "各校常考",
        q: "在實驗室中想要稀釋濃硫酸，下列操作方法何者最安全？" + imgQ60 + genOpts([opt60A, opt60B, opt60C, opt60D], true),
        idea: "【正確解答】 (C) 酸沿玻棒入水<br>【詳細解析】 稀釋濃硫酸時，須沿著玻璃棒將濃酸緩緩加入「水」中。若以水直接倒入濃硫酸中(如A或B)，會因為強烈放熱反應，使少量的水瞬間沸騰，導致酸液飛濺傷人。"
      }
    ],

    where: {
      codes: [["N-8-1", "科學方法：觀察、假說、實驗、結論等步驟"], ["n-IV-2", "了解並遵守實驗室安全守則與儀器操作。"]],
      exam: "本單元是所有理化實驗的基石。教育會考極常在題幹中考驗學生判斷「操縱變因」與「控制變因」的能力，並頻繁出現「量筒不能配製溶液」與「稀釋濃酸要將酸入水」等實驗安全禁忌考題。",
      stop: "只需理解科學探究的邏輯思維，並熟記上述常見儀器的「不可做之事（禁忌）」。各種化學藥品的詳細性質，在後續章節會再深入探討。"
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
