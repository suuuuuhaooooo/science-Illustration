/* 單元：3冊 1.1 長度與體積的測量 */
(function () {
  var C = SK.C, s = SK.s;
 
  /* --- 啟發區小圖：日常測量 --- */
  function hookVisual(el) {
    var svg = SK.svg(el, 360, 200, "用尺測量鉛筆");
    // 【RWD 適應螢幕】
    svg.style.width = "100%";
    svg.style.maxWidth = "360px";
    svg.style.height = "auto";

    s("rect", { x: 40, y: 120, width: 280, height: 40, rx: 4, fill: C.paper, stroke: C.line, "stroke-width": 2 }, svg);
    for(var i=0; i<=10; i++) {
        s("line", { x1: 50 + i*25, y1: 120, x2: 50 + i*25, y2: 130, stroke: C.ink, "stroke-width": 2 }, svg);
    }
    var penPath = "M 50 80 L 220 80 L 250 95 L 220 110 L 50 110 Z";
    s("path", { d: penPath, fill: C.gold.f, stroke: C.gold.s, "stroke-width": 2 }, svg);
    s("path", { d: "M 220 80 L 220 110", stroke: C.gold.s, "stroke-width": 2 }, svg); 
    s("circle", { cx: 250, cy: 95, r: 3, fill: C.ink }, svg); 
    
    s("line", { x1: 250, y1: 95, x2: 250, y2: 150, stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4 4" }, svg);
    SK.label(svg, 250, 170, "?", { size: 24, color: C.orange.s, bold: true });
  }

  /* --- 核心推導：滑桿控制測量值解析 --- */
  function measureDerive(ctx) {
    var svg = SK.svg(ctx.stage, 500, 260, "測量值動態解析圖");
    // 【RWD 適應螢幕】確保直尺圖解在手機上不會被截斷
    svg.style.width = "100%";
    svg.style.height = "auto";

    var g = s("g", {}, svg);
    var read = SK.h("div", { class: "readout" });
    ctx.extra.appendChild(read);

    var lenSl = SK.slider({ 
        label: "拖曳改變物體長度", min: 3, max: 8, step: 0.05, value: 5.65, color: "blue",
        onInput: function() { draw(); } 
    });
    ctx.sliders.appendChild(lenSl.el);

    function draw() {
      var f = ctx.frame; 
      var L = lenSl.value;
      
      while (g.firstChild) { g.removeChild(g.firstChild); }
      
      var unitPx = 40; 
      var startX = 50;
      var baseY = 140;

      // 畫尺
      s("rect", { x: startX - 10, y: baseY, width: 420, height: 60, rx: 5, fill: C.paper, stroke: C.line, "stroke-width": 2 }, g);
      for(var i=0; i<=10; i++) {
        var vx = startX + i * unitPx;
        s("line", { x1: vx, y1: baseY, x2: vx, y2: baseY + 15, stroke: C.ink, "stroke-width": 2 }, g);
        SK.label(g, vx, baseY + 30, i, { size: 14, color: C.soft });
        if(i < 10) {
          for(var j=1; j<10; j++) {
            var mx = vx + j * (unitPx/10);
            s("line", { x1: mx, y1: baseY, x2: mx, y2: baseY + 8, stroke: C.line, "stroke-width": 1 }, g);
          }
        }
      }

      // 畫物體
      var objW = L * unitPx;
      s("rect", { x: startX, y: baseY - 50, width: objW, height: 50, rx: 4, fill: C.blue.f, stroke: C.blue.s, "stroke-width": 2 }, g);

      // 對齊線
      var endX = startX + objW;
      s("line", { x1: endX, y1: baseY - 60, x2: endX, y2: baseY + 40, stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "5 4" }, g);

      var exactValStr = L.toFixed(2).slice(0, -1); 
      var estVal = Math.round((L * 100)) % 10;     
      var exactVal = parseFloat(exactValStr);      

      if (f === 1 || f === 3) {
        var exX = startX + exactVal * unitPx;
        s("line", { x1: exX, y1: baseY - 10, x2: exX, y2: baseY + 45, stroke: C.green.s, "stroke-width": 3 }, g);
        SK.label(g, exX, baseY + 65, exactVal.toFixed(1) + " (準確)", { size: 14, color: C.green.s, bold: true });
      }

      if (f === 2 || f === 3) {
        SK.label(g, endX + 10, baseY - 20, "估: " + estVal, { size: 14, color: C.orange.s, bold: true });
        s("circle", { cx: endX, cy: baseY, r: 18, fill: "none", stroke: C.orange.s, "stroke-width": 2 }, g);
      }

      if (f === 0) read.innerHTML = "目前長度落在 " + exactVal.toFixed(1) + " 到 " + (exactVal + 0.1).toFixed(1) + " 之間。";
      if (f === 1) read.innerHTML = "儀器能確實讀出的數字稱為<b style='color:#7A8B76'>準確值</b>：" + exactVal.toFixed(1) + " cm。";
      if (f === 2) read.innerHTML = "肉眼猜測的下一位數稱為<b style='color:#C28C6E'>估計值</b>，這裡我們估計為 " + estVal + "。";
      if (f === 3) read.innerHTML = "完整測量值 = 準確值 + 估計值 = <b>" + L.toFixed(2) + " cm</b>";
    }

    return { show: draw };
  }

  /* --- 換個角度看 1：互動式排水法 (沉體) --- */
  function sinkingVolume(el) {
    var wrap = SK.h("div", { style: "text-align:center; padding: 10px 0;" });
    el.appendChild(wrap);
    var svg = SK.svg(wrap, 300, 250, "排水法示意圖");
    
    // 【RWD 適應螢幕】限制最大寬度並自動等比縮放
    svg.style.maxWidth = "220px";
    svg.style.width = "100%";
    svg.style.height = "auto";
    
    var sl = SK.slider({ label: "慢慢將石頭放入水中", min: 0, max: 100, step: 1, value: 0, color: "blue", onInput: function(){ draw(); } });
    wrap.appendChild(sl.el);

    function draw() {
        var v = sl.value; 
        while (svg.firstChild) { svg.removeChild(svg.firstChild); }
        
        var baseWaterY = 170;
        var stoneVol = 50; 
        var currentWaterY = baseWaterY - (v / 100) * stoneVol;
        var stoneY = 50 + (v / 100) * 140; 

        s("path", { d: "M 100 40 L 100 220 L 200 220 L 200 40", fill: "none", stroke: C.line, "stroke-width": 3 }, svg);
        for(var i=0; i<5; i++){
            s("line", { x1: 100, y1: 80 + i*30, x2: 115, y2: 80 + i*30, stroke: C.line, "stroke-width": 2 }, svg);
        }
        
        s("rect", { x: 102, y: currentWaterY, width: 96, height: 218 - currentWaterY, fill: C.blue.f }, svg);
        
        s("line", { x1: 80, y1: 170, x2: 100, y2: 170, stroke: C.line, "stroke-width": 2, "stroke-dasharray":"3 3" }, svg);
        SK.label(svg, 65, 170, "V1", { size: 16, color: C.soft }); 

        s("path", { d: "M 130 " + stoneY + " Q 150 " + (stoneY-15) + " 170 " + stoneY + " Q 180 " + (stoneY+15) + " 150 " + (stoneY+25) + " Q 120 " + (stoneY+15) + " 130 " + stoneY + " Z", fill: C.ink, stroke: "none" }, svg);

        if (v > 0) {
            s("line", { x1: 80, y1: currentWaterY, x2: 100, y2: currentWaterY, stroke: C.blue.s, "stroke-width": 2, "stroke-dasharray":"3 3" }, svg);
            SK.label(svg, 65, currentWaterY, "V2", { size: 16, color: C.blue.s, bold: true }); 
        }
    }
    draw(); 
  }

  /* --- 換個角度看 2：互動式重捶法 (浮體) --- */
  function floatingVolume(el) {
    var wrap = SK.h("div", { style: "text-align:center; padding: 10px 0;" });
    el.appendChild(wrap);
    var svg = SK.svg(wrap, 300, 260, "重物沉水法示意圖");
    
    // 【RWD 適應螢幕】限制最大寬度並自動等比縮放
    svg.style.maxWidth = "220px";
    svg.style.width = "100%";
    svg.style.height = "auto";
    
    var sl = SK.slider({ label: "步驟：1.先放鐵塊 → 2.綁上木塊", min: 0, max: 100, step: 1, value: 0, color: "orange", onInput: function(){ draw(); } });
    wrap.appendChild(sl.el);

    function draw() {
        var v = sl.value; 
        while (svg.firstChild) { svg.removeChild(svg.firstChild); }
        
        s("path", { d: "M 100 40 L 100 240 L 200 240 L 200 40", fill: "none", stroke: C.line, "stroke-width": 3 }, svg);
        
        var baseWater = 190;
        var ironVol = 25; 
        var woodVol = 45; 
        
        var waterY = baseWater;
        var ironY = 50;
        var woodY = 20;

        if (v <= 50) {
            var p = v / 50;
            waterY = baseWater - p * ironVol;
            ironY = 50 + p * 150;
            woodY = 20; 
        } else {
            var p = (v - 50) / 50;
            waterY = baseWater - ironVol - p * woodVol;
            ironY = 200;
            woodY = 20 + p * 140; 
        }

        s("rect", { x: 102, y: waterY, width: 96, height: 238 - waterY, fill: C.blue.f }, svg);
        
        s("line", { x1: 80, y1: baseWater, x2: 100, y2: baseWater, stroke: C.line, "stroke-width": 2, "stroke-dasharray":"3 3" }, svg);
        SK.label(svg, 65, baseWater, "V1", { size: 14, color: C.soft }); 

        if (v >= 50) {
            var v2Y = baseWater - ironVol;
            s("line", { x1: 80, y1: v2Y, x2: 100, y2: v2Y, stroke: C.line, "stroke-width": 2, "stroke-dasharray":"3 3" }, svg);
            SK.label(svg, 65, v2Y, "V2", { size: 14, color: C.soft }); 
        }

        if (v > 50) {
            s("line", { x1: 80, y1: waterY, x2: 100, y2: waterY, stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray":"3 3" }, svg);
            SK.label(svg, 65, waterY, "V3", { size: 14, color: C.orange.s, bold: true }); 
        }

        if (v > 50) {
            s("line", { x1: 150, y1: woodY+25, x2: 150, y2: ironY, stroke: C.line, "stroke-width": 2 }, svg);
        }

        s("rect", { x: 135, y: ironY, width: 30, height: 20, rx:2, fill: C.ink }, svg);
        s("rect", { x: 125, y: woodY, width: 50, height: 35, rx: 3, fill: C.orange.f, stroke: C.orange.s, "stroke-width":2 }, svg);
    }
    draw(); 
  }

  SK.mountUnit({
    slug: "vol3-1-1",
    en: "Measurement of Length and Volume",
    formula: "\\text{測量值} = \\text{準確值} + \\text{估計值}",

    hook: {
      html: "科學的核心建立在「精準」之上，但只要是人類使用儀器測量，就一定會有極限與誤差。當物體的長度剛好卡在兩個刻度之間時，我們該怎麼記錄，才能讓其他科學家看懂你的數據？",
      ask: "試著回想看看，如果拿一般的直尺量橡皮擦，長度介於 4.2 公分和 4.3 公分之間，你會怎麼記錄？",
      visual: hookVisual
    },

    guess: {
      q: "為什麼在記錄測量結果時，除了儀器上的刻度，我們還必須自己「猜」一位數字（估計值）？",
      options: [
        { t: "為了讓數據看起來比較精準，小數點越多越好。", explain: "錯誤。隨便亂加小數點只會讓數據失去可信度。估計值只能有一位，再往下猜就沒有物理意義了。" },
        { t: "因為儀器有最小刻度限制，猜一位可以盡量逼近真實長度。", truth: true, explain: "完全正確！任何儀器都有極限（最小刻度），物體末端通常不會剛好壓在刻度線上，因此我們需要用肉眼將最小刻度再平分為十等分，猜測一個數字來逼近真實值。" },
        { t: "是為了消除人為操作時產生的測量誤差。", explain: "不對喔。估計值本身就帶有誤差，要減少誤差的方法是「多次測量求平均值」，而不是靠估計值來消除。" }
      ]
    },

    derive: {
      intro: "讓我們用一把最小刻度為 **0.1 cm (1 mm)** 的直尺來測量物體。試著拖曳上方的滑桿，改變物體的實際長度，觀察下方的紀錄規則如何跟著變化。",
      frames: [
        { cap: "測量時，物體末端經常落在兩個刻度之間。此時不能只記錄大約值，必須遵守科學記錄規範。", tex: "\\text{尋找末端位置}" },
        { cap: "首先，讀出儀器上能清楚看見的最小刻度數字，這部分毫無爭議，我們稱為「準確值」。", tex: "\\text{準確值（到最小刻度）}" },
        { cap: "接著，在最小刻度與下一個刻度之間，用肉眼假想分為 10 等分，猜測物體落在哪個位置，這就是「估計值」。", tex: "\\text{估計值（必為1位）}" },
        { cap: "完整的測量值必須包含：數字（準確值 + 一位估計值）以及測量單位。兩者缺一不可。", tex: "4.2 \\; (準確) + 0.05 \\; (估計) = 4.25 \\; \\text{cm}" }
      ],
      setup: measureDerive
    },

    angles: [
      { title: "不規則沉體怎麼測？（排水法）",
        html: "直尺只能測量規則物體。如果是一塊不規則的石頭（會沉入水中），我們必須利用「排水法」。<br><br><b>石頭體積 = 投入後水位 (V2) - 原本水位 (V1)</b>",
        render: sinkingVolume
      },
      { title: "不規則浮體怎麼測？（重捶法）",
        html: "如果是會浮在水面上的木塊，就算丟進去也無法完全排開同體積的水。這時必須綁上一個重物（如鐵塊）把它強行拉入水中。<br><br>⚠️ 注意：這裡的測量基準是指<b>「已經放入鐵塊的水位 (V2)」</b>，所以：<br><b>木塊體積 = 鐵+木的水位 (V3) - 只有鐵塊的水位 (V2)</b>",
        render: floatingVolume
      }
    ],

    where: {
      codes: [["N-8-2", "長度、體積與質量的測量。"], ["n-IV-1", "理解科學測量中的誤差與估計值。"]],
      exam: "會考超常出現「給一個測量值，反推該尺的最小刻度」的題型。秘訣是：把最後一個數字遮起來（那是估計值），倒數第二個數字所在的單位，就是該儀器的最小刻度！",
      stop: "只需熟練「準確值 + 1位估計值」的規則。不用去鑽牛角尖探討游標卡尺或螺旋測微器等高中才會學到的精密儀器用法。"
    }
  });
})();
