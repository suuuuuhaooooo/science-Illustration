/* 單元：3冊 0.1 科學方法與實驗守則 */
(function () {
  var C = SK.C, s = SK.s;

  /* 啟發區 (Hook) 視覺化：畫一個燒杯與危險標示 */
  function hookVisual(el) {
    var svg = SK.svg(el, 360, 200, "實驗室常見的燒杯與注意標示");
    
    // 繪製燒杯輪廓
    var beakerPath = "M 130 50 L 130 140 A 10 10 0 0 0 140 150 L 220 150 A 10 10 0 0 0 230 140 L 230 50";
    s("path", { d: beakerPath, fill: "none", stroke: C.line, "stroke-width": 3 }, svg);
    s("line", { x1: 120, y1: 50, x2: 240, y2: 50, stroke: C.line, "stroke-width": 3 }, svg); // 杯口
    
    // 繪製液體 (莫蘭迪藍)
    var liquidPath = "M 130 90 L 130 140 A 10 10 0 0 0 140 150 L 220 150 A 10 10 0 0 0 230 140 L 230 90 Z";
    s("path", { d: liquidPath, fill: C.blue.f, stroke: "none" }, svg);
    
    // 刻度線
    s("line", { x1: 130, y1: 70, x2: 145, y2: 70, stroke: C.line, "stroke-width": 2 }, svg);
    s("line", { x1: 130, y1: 110, x2: 145, y2: 110, stroke: C.line, "stroke-width": 2 }, svg);

    // 繪製危險警告標示 (使用莫蘭迪芥末黃 gold)
    s("polygon", { points: "290,140 320,80 350,140", fill: C.gold.f, stroke: C.gold.s, "stroke-width": 3, "stroke-linejoin": "round" }, svg);
    SK.label(svg, 320, 130, "!", { size: 30, color: C.gold.s, bold: true });

    // 標籤說明
    SK.label(svg, 180, 175, "未知化學液體", { size: 15, color: C.soft });
  }

  /* 錯誤解析小圖：直接聞氣體的危險性 */
  function dangerMini(el) {
    var svg = SK.svg(el, 300, 150, "錯誤的聞氣體方式");
    
    // 使用陶土橘 orange
    s("rect", { x: 120, y: 70, width: 60, height: 60, rx: 5, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    s("path", { d: "M 140 60 Q 150 40 140 20", fill: "none", stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4 4" }, svg);
    s("path", { d: "M 160 60 Q 170 30 160 10", fill: "none", stroke: C.orange.s, "stroke-width": 2, "stroke-dasharray": "4 4" }, svg);
    
    SK.label(svg, 150, 145, "直接吸入可能中毒", { size: 13, color: C.orange.s });
  }

  /* 核心推導 (Derive)：科學方法的流程圖 */
  function methodDerive(ctx) {
    var svg = SK.svg(ctx.stage, 480, 420, "科學方法步驟流程圖");
    var g = s("g", {}, svg);
    var read = SK.h("div", { class: "readout" });
    ctx.extra.appendChild(read);

    // 定義步驟資料
    var steps = [
      { text: "觀察現象", desc: "發現自然界中奇特的事件" },
      { text: "提出問題", desc: "針對觀察到的現象產生疑問" },
      { text: "提出假說", desc: "根據現有知識，猜測一個合理的解答" },
      { text: "設計實驗", desc: "控制變因，進行測試" },
      { text: "分析數據", desc: "整理實驗結果，尋找規律" },
      { text: "得出結論", desc: "驗證假說是否成立。若不成立則修正假說" }
    ];

    function draw() {
      var f = ctx.frame;
      g.innerHTML = "";
      
      var boxWidth = 140;
      var boxHeight = 40;
      var startX = 170;
      var startY = 30;
      var gapY = 60;

      for (var i = 0; i < steps.length; i++) {
        var on = f >= i;
        var yPos = startY + i * gapY;
        
        // 使用鼠尾草綠 green
        var bgCol = on ? C.green.f : C.paper;
        var strokeCol = on ? C.green.s : C.line;
        s("rect", { x: startX, y: yPos, width: boxWidth, height: boxHeight, rx: 6, fill: bgCol, stroke: strokeCol, "stroke-width": 2 }, g);
        
        // 繪製文字
        var textColor = on ? C.ink : C.line;
        SK.label(g, startX + boxWidth / 2, yPos + boxHeight / 2 + 2, steps[i].text, { size: 16, color: textColor, bold: on });

        // 繪製箭頭
        if (i < steps.length - 1) {
          var arrowOn = f > i;
          var aColor = arrowOn ? C.green.s : C.line;
          s("line", { x1: startX + boxWidth / 2, y1: yPos + boxHeight, x2: startX + boxWidth / 2, y2: yPos + gapY - 5, stroke: aColor, "stroke-width": 2, "marker-end": "url(#arrow)" }, g);
        }
      }

      // 如果進行到結論且發現不符合，畫一條返回假說的虛線 (使用藕粉 pink)
      if (f === steps.length - 1) {
        var pathData = "M " + startX + " " + (startY + 5 * gapY + boxHeight / 2) + " L " + (startX - 50) + " " + (startY + 5 * gapY + boxHeight / 2) + " L " + (startX - 50) + " " + (startY + 2 * gapY + boxHeight / 2) + " L " + (startX - 5) + " " + (startY + 2 * gapY + boxHeight / 2);
        s("path", { d: pathData, fill: "none", stroke: C.pink.s, "stroke-width": 2, "stroke-dasharray": "6 4", "marker-end": "url(#arrow)" }, g);
        SK.label(g, startX - 70, startY + 3.5 * gapY, "假說錯誤", { size: 13, color: C.pink.s });
      }

      // 下方文字說明
      read.innerHTML = "目前步驟：" + (f < steps.length ? steps[f].desc : "完成完整的科學探究循環");
    }

    return { show: draw };
  }

  /* 組合並掛載單元 */
  SK.mountUnit({
    slug: "vol3-0-1",
    en: "Scientific Method and Lab Safety",
    formula: "\\text{觀察} \\rightarrow \\text{假說} \\rightarrow \\text{實驗}",

    hook: {
      html: "當你走進理化實驗室，桌上擺滿了各式各樣的儀器與未知的透明液體。在動手操作之前，我們必須先了解科學家是如何思考的，以及實驗室裡有哪些絕對不能打破的規矩。",
      ask: "試著回想看看，如果實驗中需要確認某杯未知液體的氣味，你覺得最安全的做法是什麼？",
      visual: hookVisual
    },

    guess: {
      q: "請憑直覺選擇一個最安全的做法：",
      options: [
        { t: "直接把鼻子湊到杯口深深吸氣", explain: "這是非常危險的動作！如果液體是強酸或有毒揮發物，會直接灼傷呼吸道或造成中毒。", mini: dangerMini },
        { t: "用手在杯口上方輕輕揮動，將少量氣體搧向鼻子", truth: true, explain: "正確。這被稱為「搧聞法」。透過手掌輕撥，可以讓極少量的氣體飄向鼻子，避免一次吸入過多未知氣體。" },
        { t: "倒一點點在手背上，靠近鼻子聞", explain: "絕對不行。化學藥品可能有強烈腐蝕性或毒性，未經確認的液體絕對不能接觸皮膚。" },
        { t: "用酒精燈加熱，讓氣味變濃烈一點再聞", explain: "加熱會加速藥品揮發，甚至引發未知的化學反應或爆炸，非常危險。" }
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
        html: "在設計實驗時，我們必須控制各種條件。變因分為三種：<br>1. <b>操縱變因</b>：實驗中唯一改變的條件（例如：光照強度）。<br>2. <b>控制變因</b>：實驗中必須保持不變的條件（例如：水量、土壤）。<br>3. <b>應變變因</b>：因為操縱變因改變，而跟著產生變化的結果（例如：植物生長的高度）。"
      }
    ],

    where: {
      codes: [["N-8-1", "科學方法：觀察、假說、實驗、結論等步驟"]],
      exam: "本單元是所有理化實驗與探究題型的基石，教育會考極常在題幹中考驗學生判斷「操縱變因」與「控制變因」的能力。",
      stop: "只需理解這套邏輯思維與基本安全守則即可，不需死記硬背所有實驗器材的規格細節，器材的用法會在後續章節實際使用時慢慢熟悉。"
    }
  });
})();
