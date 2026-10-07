/* 單元：3冊 0.1 科學方法與實驗守則 (會考實戰與純淨版) */
(function () {
  var C = SK.C, s = SK.s;

  /* --- 啟發區小圖：化學試劑 --- */
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

  /* --- 猜猜看選項迷你圖：錯誤示範 --- */
  function dangerMini(el) {
    var svg = SK.svg(el, 300, 150, "錯誤的稀釋方式");
    s("rect", { x: 120, y: 70, width: 60, height: 60, rx: 5, fill: C.orange.f, stroke: C.orange.s, "stroke-width": 2 }, svg);
    
    // 噴濺的水滴
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
      
      var boxWidth = 140;
      var boxHeight = 40;
      var startX = 170;
      var startY = 30;
      var gapY = 60;

      for (var i = 0; i < steps.length; i++) {
        var on = f >= i;
        var yPos = startY + i * gapY;
        
        var bgCol = on ? C.green.f : C.paper;
        var strokeCol = on ? C.green.s : C.line;
        s("rect", { x: startX, y: yPos, width: boxWidth, height: boxHeight, rx: 6, fill: bgCol, stroke: strokeCol, "stroke-width": 2 }, g);
        
        var textColor = on ? C.ink : C.line;
        SK.label(g, startX + boxWidth / 2, yPos + boxHeight / 2 + 2, steps[i].text, { size: 16, color: textColor, bold: on });

        if (i < steps.length - 1) {
          var arrowOn = f > i;
          var aColor = arrowOn ? C.green.s : C.line;
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

  // ==== 歷屆會考自己畫的圖表 ====
  
  // 105 會考：以 HTML 表格重現實驗紀錄表
  var table105 = '<div style="overflow-x:auto;"><table style="width:100%; min-width:300px; text-align:center; border-collapse:collapse; margin: 15px 0; font-size:0.95rem; border: 2px solid #E3D4AC;">' +
    '<tr style="background:#F8F5EE; border-bottom: 2px solid #E3D4AC;"><th>實驗組別</th><th>一</th><th>二</th><th>三</th><th>四</th></tr>' +
    '<tr style="border-bottom: 1px solid #E3D4AC;"><td>粉筆顏色</td><td>白</td><td>白</td><td>白</td><td>白</td></tr>' +
    '<tr style="border-bottom: 1px solid #E3D4AC;"><td>浸泡時間 (s)</td><td>20</td><td>40</td><td>60</td><td>80</td></tr>' +
    '<tr style="border-bottom: 1px solid #E3D4AC;"><td>粉筆長度 (cm)</td><td>8</td><td>8</td><td>8</td><td>8</td></tr>' +
    '<tr><td>最小外力 (kgw)</td><td></td><td></td><td></td><td></td></tr>' +
    '</table></div>';

  // 106 會考：以 SVG 繪製三種儀器錯誤/正確操作示意圖
  var img106 = '<div style="display:flex; justify-content:space-around; align-items:flex-end; margin: 15px 0;">' +
    '<div style="text-align:center;"><svg viewBox="0 0 100 120" width="80"><rect x="35" y="90" width="30" height="20" fill="#EBCDCB" /><path d="M50 70 Q55 85 50 90 Q45 85 50 70" fill="#C28C6E" /><g transform="rotate(30 50 50)"><rect x="40" y="10" width="20" height="70" rx="10" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="42" y="40" width="16" height="35" fill="rgba(164,185,200,.5)"/></g></svg><br><b style="font-size:0.9rem">方法甲</b></div>' +
    '<div style="text-align:center;"><svg viewBox="0 0 100 120" width="80"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="42" y="70" width="16" height="40" fill="rgba(189,203,184,.5)"/><line x1="60" y1="10" x2="45" y2="90" stroke="#C28C6E" stroke-width="3"/></svg><br><b style="font-size:0.9rem">方法乙</b></div>' +
    '<div style="text-align:center;"><svg viewBox="0 0 100 120" width="80"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="42" y="70" width="16" height="40" fill="rgba(164,185,200,.5)"/><path d="M 10 70 Q 20 60 30 70 Q 20 80 10 70" fill="none" stroke="#4A3F37" stroke-width="2"/><circle cx="20" cy="70" r="3" fill="#4A3F37"/><line x1="32" y1="70" x2="42" y2="70" stroke="#4A3F37" stroke-dasharray="2 2" stroke-width="1"/></svg><br><b style="font-size:0.9rem">方法丙</b></div>' +
    '</div>';

  // 110 會考 (濃酸稀釋)：以 SVG 繪製危險與安全作法
  var imgAcid = '<div style="display:flex; justify-content:space-around; align-items:flex-end; margin: 15px 0;">' +
    '<div style="text-align:center;"><svg viewBox="0 0 120 120" width="90"><path d="M30 50 L30 110 L90 110 L90 50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="70" width="56" height="38" fill="rgba(217,175,180,.5)"/><text x="60" y="95" text-anchor="middle" font-size="14" fill="#4A3F37">濃硫酸</text><g transform="rotate(-45 50 30)"><rect x="40" y="0" width="20" height="50" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/></g><circle cx="60" cy="50" r="4" fill="rgba(164,185,200,.5)"/><path d="M40 60 L30 40 M80 60 L90 40" stroke="#C28C6E" stroke-width="2"/></svg><br><b style="font-size:0.9rem; color:#B57E83;">(A) 水倒入酸</b></div>' +
    '<div style="text-align:center;"><svg viewBox="0 0 120 120" width="90"><path d="M30 50 L30 110 L90 110 L90 50" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="32" y="70" width="56" height="38" fill="rgba(164,185,200,.5)"/><text x="60" y="95" text-anchor="middle" font-size="14" fill="#4A3F37">水</text><line x1="75" y1="20" x2="60" y2="100" stroke="#C28C6E" stroke-width="3"/><g transform="rotate(-45 60 20)"><rect x="50" y="-10" width="20" height="50" rx="5" fill="none" stroke="#5B778C" stroke-width="2"/></g></svg><br><b style="font-size:0.9rem; color:#7A8B76;">(B) 酸沿玻棒入水</b></div>' +
    '</div>';

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
        { t: "先用舌頭嘗嘗看有多酸，再決定加多少水", explain: "這太瘋狂了！在實驗室絕對不可以用舌頭嘗任何藥品的味道。如果想確認氣味，也只能用手在杯口輕輕揮動，將少量氣體搧向鼻子（搧聞法）。" }
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
        html: "除了科學方法，會考極度重視你是否能正確且安全地使用儀器：<br><br>• <b>量筒</b>：只能測量體積。禁止加熱、禁止配製溶液、禁止進行化學反應。讀取刻度時，視線須平視液面中央的凹下最低處。<br>• <b>滴管</b>：吸取液體後必須保持尖嘴朝下，絕對不可倒置，以免液體倒流腐蝕橡皮頭。<br>• <b>溫度計</b>：只能測量溫度，絕對不可用來代替玻璃棒攪拌溶液。底部不可接觸容器。<br>• <b>加熱</b>：燒杯不可直接在火焰上加熱，必須墊上<b>陶瓷纖維網</b>使其受熱均勻，避免器皿破裂。<br>• <b>酒精燈</b>：酒精量維持 1/2 到 2/3。不可用已點燃的酒精燈去引燃另一盞。熄滅時必須用燈罩蓋熄，絕對不可用口吹熄；若不慎打翻起火，應迅速用溼抹布蓋熄。"
      }
    ],

    challenges: [
      {
        lv: "105 會考 (變因判斷)",
        q: "同學設計了「粉筆在水中浸泡時間，與粉筆斷裂難易度關係」的實驗。在挑選實驗條件時，請從下方設計表推測，哪一個條件必須是「操縱變因」，哪些又是「控制變因」？" + table105,
        hint: "回想一下，操縱變因是實驗中「唯一改變」的條件，而控制變因是「必須保持相同」的條件。",
        idea: "因為要測量「浸泡時間」對結果的影響，所以「浸泡時間」是操縱變因（每次實驗要設定不同時間，如 20s, 40s, 60s）。而為了公平，粉筆的顏色、長度、品牌都必須保持一樣，這些就是控制變因。最後測量出的「折斷最小外力」則是應變變因。"
      },
      {
        lv: "106 會考 (器材禁忌)",
        q: "附圖為某實驗器材的三種使用方法，請問這三種操作中，哪幾種使用方法是不恰當的？" + img106,
        idea: "答案是方法甲與方法乙皆不恰當。<br><br>量筒只能用來測量體積（如方法丙）！量筒的玻璃厚度不均勻，拿去火上加熱（方法甲）極易破裂；且底部狹窄，直接在裡面攪拌配製溶液（方法乙）也容易因為摩擦或放熱導致破裂。正確做法是：在「燒杯」內配製或加熱，需要量體積時才倒進量筒測量。"
      },
      {
        lv: "110 會考 (安全守則)",
        q: "在實驗室中想要稀釋濃硫酸，請問下列兩種常見的操作方法，何者才是最安全的？" + imgAcid,
        idea: "答案是 (B) 酸沿玻棒入水！<br><br>必須將「濃硫酸沿著玻璃棒緩緩倒入水中」。因為濃硫酸遇水會放出大量的熱，如果像 (A) 一樣把水直接倒進濃硫酸裡，少量的水會因為瞬間沸騰，帶著強酸四處飛濺，非常危險。"
      }
    ],

    where: {
      codes: [["N-8-1", "科學方法：觀察、假說、實驗、結論等步驟"], ["n-IV-2", "了解並遵守實驗室安全守則與儀器操作。"]],
      exam: "本單元是所有理化實驗的基石。教育會考極常在題幹中考驗學生判斷「操縱變因」與「控制變因」的能力，並頻繁出現「量筒不能配製溶液」與「稀釋濃酸要將酸入水」等實驗安全禁忌考題。",
      stop: "只需理解科學探究的邏輯思維，並熟記上述常見儀器的「不可做之事（禁忌）」。各種化學藥品的詳細性質，在後續章節會再深入探討。"
    }
  });
})();
