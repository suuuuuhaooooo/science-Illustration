/* 單元：3冊 0.1 科學方法與實驗守則 (歷屆會考全收錄版) */
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

  // ==== 歷屆會考專用圖表產生器 ====
  function makeTable(headers, rows) {
    var h = '<div style="overflow-x:auto;"><table style="width:100%; min-width:280px; text-align:center; border-collapse:collapse; margin: 15px 0; font-size:0.95rem; border: 2px solid #E3D4AC; border-radius:6px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">';
    h += '<tr style="background:#F8F5EE; border-bottom: 2px solid #E3D4AC; color:#4A3F37;">';
    for(var i=0; i<headers.length; i++) {
      h += '<th style="padding:10px 8px;">' + headers[i] + '</th>';
    }
    h += '</tr>';
    for(var j=0; j<rows.length; j++) {
      h += '<tr style="border-bottom: 1px solid #E3D4AC; background:#FFF; color:#6F645A;">';
      for(var k=0; k<rows[j].length; k++) {
        h += '<td style="padding:10px 8px;">' + rows[j][k] + '</td>';
      }
      h += '</tr>';
    }
    h += '</table></div>';
    return h;
  }

  var t_105 = makeTable(["實驗組別", "一", "二", "三", "四"], [["粉筆顏色", "白", "白", "白", "白"], ["浸泡時間(s)", "20", "40", "60", "80"], ["粉筆長度(cm)", "8", "8", "8", "8"]]);
  var t_115 = makeTable(["組別", "拖地的水"], [["第一組", "熱水加食鹽"], ["第二組", "熱水沒加食鹽"], ["第三組", "冷水加食鹽"], ["第四組", "冷水沒加食鹽"]]);
  var t_111_land = makeTable(["實驗編號", "夾角", "斜面長度", "石塊重量"], [["1", "20°", "100 cm", "2 kgw"], ["2", "20°", "50 cm", "2 kgw"], ["3", "40°", "100 cm", "4 kgw"], ["4", "40°", "50 cm", "4 kgw"]]);
  var t_114_fan = makeTable(["年度", "電扇樣品位置"], [["81年", "沒有規定"], ["105年", "中心距離1.5m，前緣距牆1.2m以上"], ["106年", "中心軸線平行，前緣距牆1.2m以上"]]);
  var t_111_evap = makeTable(["容器編號", "一", "二", "三", "四", "五"], [["球顏色", "不放球", "白", "紅", "藍", "黑"], ["第七天水位", "14.20", "15.50", "15.80", "15.90", "15.95"]]);
  var t_90_enzyme = makeTable(["試管", "作用溫度", "待作用物質", "反應後生成物質"], [["甲 / 乙", "15°C", "100 g", "50 g"], ["丙 / 丁", "30°C", "100 g", "25 g"]]);

  var img106 = '<div style="display:flex; justify-content:space-around; align-items:flex-end; margin: 15px 0;">' +
    '<div style="text-align:center;"><svg viewBox="0 0 100 120" width="70"><rect x="35" y="90" width="30" height="20" fill="#EBCDCB" /><path d="M50 70 Q55 85 50 90 Q45 85 50 70" fill="#C28C6E" /><g transform="rotate(30 50 50)"><rect x="40" y="10" width="20" height="70" rx="10" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="42" y="40" width="16" height="35" fill="rgba(164,185,200,.5)"/></g></svg><br><b style="font-size:0.9rem">方法甲(加熱)</b></div>' +
    '<div style="text-align:center;"><svg viewBox="0 0 100 120" width="70"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="42" y="70" width="16" height="40" fill="rgba(189,203,184,.5)"/><line x1="60" y1="10" x2="45" y2="90" stroke="#C28C6E" stroke-width="3"/></svg><br><b style="font-size:0.9rem">方法乙(配溶液)</b></div>' +
    '<div style="text-align:center;"><svg viewBox="0 0 100 120" width="70"><rect x="40" y="30" width="20" height="80" fill="none" stroke="#5B778C" stroke-width="2"/><line x1="30" y1="110" x2="70" y2="110" stroke="#5B778C" stroke-width="2"/><rect x="42" y="70" width="16" height="40" fill="rgba(164,185,200,.5)"/><path d="M 10 70 Q 20 60 30 70 Q 20 80 10 70" fill="none" stroke="#4A3F37" stroke-width="2"/><circle cx="20" cy="70" r="3" fill="#4A3F37"/><line x1="32" y1="70" x2="42" y2="70" stroke="#4A3F37" stroke-dasharray="2 2" stroke-width="1"/></svg><br><b style="font-size:0.9rem">方法丙(測體積)</b></div>' +
    '</div>';

  var img109 = '<div style="display:flex; justify-content:center; align-items:flex-end; margin: 15px 0;">' +
    '<div style="text-align:center;"><svg viewBox="0 0 120 180" width="100">' +
    '<path d="M40 50 L40 150 L80 150 L80 50" fill="none" stroke="#5B778C" stroke-width="2"/>' +
    '<line x1="30" y1="150" x2="90" y2="150" stroke="#5B778C" stroke-width="2"/>' +
    '<line x1="40" y1="60" x2="45" y2="60" stroke="#5B778C" stroke-width="1"/>' +
    '<line x1="40" y1="80" x2="50" y2="80" stroke="#5B778C" stroke-width="1"/>' +
    '<line x1="40" y1="100" x2="45" y2="100" stroke="#5B778C" stroke-width="1"/>' +
    '<line x1="40" y1="120" x2="50" y2="120" stroke="#5B778C" stroke-width="1"/>' +
    '<line x1="40" y1="140" x2="45" y2="140" stroke="#5B778C" stroke-width="1"/>' +
    '<rect x="42" y="100" width="36" height="48" fill="rgba(164,185,200,.5)"/>' +
    '<circle cx="80" cy="80" r="30" fill="none" stroke="#C28C6E" stroke-width="2"/>' +
    '<path d="M60 90 Q70 100 80 90" fill="none" stroke="#5B778C" stroke-width="2" />' + 
    '<line x1="80" y1="95" x2="110" y2="95" stroke="#C28C6E" stroke-width="2" stroke-dasharray="4 4" />' +
    '<text x="50" y="80" font-size="12" fill="#4A3F37">30</text>' +
    '<path d="M55 10 L65 10 L65 25 L62 35 L62 45 L58 45 L58 35 L55 25 Z" fill="#7A8B76" stroke="#4A3F37" stroke-width="1"/>' +
    '<rect x="52" y="0" width="16" height="10" rx="3" fill="#C28C6E" stroke="#4A3F37" stroke-width="1"/>' +
    '<path d="M60 48 Q 58 55 60 60 Q 62 55 60 48" fill="rgba(164,185,200,.5)"/>' +
    '</svg><br><b>滴管</b></div>' +
    '</div>';

  var img104 = '<div style="display:flex; justify-content:space-around; align-items:center; margin: 15px 0; background:#F8F5EE; padding:15px; border-radius:8px; border:2px dashed #E3D4AC;">' +
    '<div style="text-align:center;"><b>甲：碳酸鈣(固體)</b><br><svg viewBox="0 0 100 40" width="80"><path d="M10 20 Q 20 30 30 20 L 90 20" fill="none" stroke="#7A8B76" stroke-width="4" stroke-linecap="round"/></svg><br><span style="font-size:0.9rem; color:#7A8B76; font-weight:bold;">刮勺</span></div>' +
    '<div style="text-align:center;"><b>乙：鹽酸(液體)</b><br><svg viewBox="0 0 40 100" width="30"><path d="M15 30 L15 80 L18 95 L22 95 L25 80 L25 30 Z" fill="none" stroke="#5B778C" stroke-width="2"/><rect x="10" y="10" width="20" height="20" rx="10" fill="#EBCDCB" stroke="#B57E83" stroke-width="2"/></svg><br><span style="font-size:0.9rem; color:#5B778C; font-weight:bold;">滴管</span></div>' +
    '</div>';

  var imgFunnel = '<div style="text-align:center; margin:15px 0;"><svg viewBox="0 0 100 120" width="70"><path d="M20 20 L80 20 L55 60 L55 100" fill="none" stroke="#C28C6E" stroke-width="3"/><ellipse cx="50" cy="20" rx="30" ry="8" fill="rgba(224,189,173,.6)" stroke="#C28C6E" stroke-width="2"/></svg><br><b style="font-size:1rem; color:#C28C6E;">漏斗</b></div>';

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
        html: "除了科學方法，大考極度重視你是否能正確且安全地使用儀器：<br><br>• <b>量筒</b>：只能測量體積。禁止加熱、禁止配製溶液、禁止進行化學反應。讀取刻度時，視線須平視液面中央的凹下最低處。<br>• <b>滴管</b>：吸取液體後必須保持尖嘴朝下，絕對不可倒置，以免液體倒流腐蝕橡皮頭。<br>• <b>溫度計</b>：只能測量溫度，絕對不可用來代替玻璃棒攪拌溶液。底部不可接觸容器。<br>• <b>加熱</b>：燒杯不可直接在火焰上加熱，必須墊上<b>陶瓷纖維網</b>使其受熱均勻，避免器皿破裂。<br>• <b>酒精燈</b>：酒精量維持 1/2 到 2/3。不可用已點燃的酒精燈去引燃另一盞。熄滅時必須用燈罩蓋熄，絕對不可用口吹熄；若不慎打翻起火，應迅速用溼抹布蓋熄。"
      }
    ],

    // 【完全依照 PDF 原汁原味收錄的歷屆會考題】
    challenges: [
      {
        lv: "115 會考 (變因判斷)",
        q: "網路流傳一種說法：「使用加食鹽的熱水拖地，地板會比較快乾。」小綺想要找出影響地板乾燥速率的變因，使用附表中四組的水來拖地，當中的哪兩組相互比較，最不可能達到他的目的？" + t_115,
        idea: "答案是 第二組和第三組。<br>因為第二組(熱水無鹽)與第三組(冷水加鹽)同時改變了「水溫」和「是否加鹽」兩個變因，因此無法判斷到底是哪一個變因影響了乾燥速率。實驗時，操縱變因一次只能有一個。"
      },
      {
        lv: "114 會考 (對照組設計)",
        q: "在核發節能標章時須檢測不同品牌、型號的產品是否符合標準，其檢測方式也隨年代而改進。附表為期間檢測某類電扇的風速時，針對電扇樣品位置條件所做的改變，關於這項改變的目的，最可能為下列何者？" + t_114_fan,
        idea: "答案是 (C) 增加電扇樣品位置的控制變因。<br>電扇的風速(應變變因)會受到位置等變因影響，因此將位置標準化保持不變(增加控制變因)，才能排除位置的干擾，準確測量真正的風速差異。"
      },
      {
        lv: "113 會考 (表格判讀)",
        q: "在自來水中加入氯氣雖然可以消毒，但氯氣可能會進一步反應產生致癌物。想知道將自來水靜置一段時間或加熱能否降低餘氯量。表(一)為不同靜置時間(溫度固定25°C)的餘氯量；表(二)為不同加熱溫度(溫度上升至沸騰)的餘氯量。依據結果判斷何者最合理？",
        idea: "答案是 (D) 以表(一)數據做為參照，可使用表(二)的結果來判斷加熱能否降低餘氯量。<br>表(一)溫度固定，可視為不加熱的「控制組」；表(二)有加熱，兩者比對即可得知「加熱」這個操縱變因對降低餘氯量的影響。"
      },
      {
        lv: "111 會考 (變因控制)",
        q: "小蘭想了解山坡地發生山崩時，不同因素對建築物破壞程度的影響，讓石塊從斜面上滑落撞擊下方的模型房屋。下列有關此實驗的敘述，何者正確？" + t_111_land,
        idea: "答案是 (A) 在實驗編號 1、2 中，石塊重量控制不變。<br>觀察表格，編號1與2的石塊重量都是 2 kgw，因此重量是控制變因；而斜面長度不同 (100cm vs 50cm)，是操縱變因。"
      },
      {
        lv: "111 會考補考 (蒸發實驗)",
        q: "阿璇探究水面上放置遮蔽物如何影響水量的蒸發。一號不放球，二~五號鋪滿不同顏色的乒乓球(白、紅、藍、黑)。結果顯示黑球的水面高度最高，不放球最低。根據附表推論，下列哪一個最合理？" + t_111_evap,
        idea: "答案是 (C) 水面上乒乓球的顏色越深，減少水蒸發的效果越好。<br>水面高度越高代表蒸發越少。由數據得知，鋪球比不鋪球好，且水面高度 黑球 > 藍球 > 紅球 > 白球，證明顏色越深減少蒸發效果越好。"
      },
      {
        lv: "109 會考 (器材搭配)",
        q: "如圖所示，美美想把燒杯中的液體倒入滴定管中，她搭配下列哪一項器材來使用，最適合且最能避免在傾倒液體時灑出？" + imgFunnel,
        idea: "答案是 (A) 漏斗。<br>滴定管的管口非常狹窄，直接傾倒極易灑出，必須將漏斗尖端插入管口再倒入液體作為輔助。"
      },
      {
        lv: "107 會考 (精準量取)",
        q: "小瑩想以量筒量取 30.0 mL 的溶液，附圖虛線箭頭所指的位置為目前已量取的體積。小瑩使用下列哪一種器材裝取溶液後，再加入量筒內，最能避免體積超出 30.0 mL？" + img109,
        idea: "答案是 (A) 滴管。<br>從放大鏡可以看到，溶液體積已非常接近 30.0 mL 刻度。為了精準地把液體加到 30.0 mL 而不超過，必須使用滴管吸取少量液體，一滴一滴慢慢加入量筒中觀察。"
      },
      {
        lv: "107 會考 (假設驗證)",
        q: "瑋婷觀察爸爸利用茶壺煮水時，茶壺內水量的多少似乎會影響水煮沸所需的時間。他假設「茶壺內水量越多，煮沸所需時間越多」。下列哪種實驗設計可驗證假設？",
        idea: "答案是 在完全相同的茶壺中，裝入不同水量，以相同火力加熱，測量沸騰所需時間。<br>水量是操縱變因，煮沸時間是應變變因；茶壺大小與火力必須維持一樣（控制變因）。"
      },
      {
        lv: "106 會考 (器材禁忌)",
        q: "附圖為某實驗器材的三種使用方法，哪幾種使用方法是不恰當的？" + img106,
        idea: "答案是 (A) 方法甲和方法乙。<br>量筒只能用來「測量體積」(方法丙)！量筒拿去火上均勻加熱(方法甲)極易破裂；直接在裡面攪拌配製溶液(方法乙)也容易導致破裂。正確做法是：在燒杯內配製或加熱。"
      },
      {
        lv: "105 會考 (變因判斷)",
        q: "老師要求同學設計一個有關粉筆在水中浸泡時間與粉筆斷裂難易度關係的實驗。由下列選項的實驗紀錄表，推測何者的實驗設計最符合前述的實驗目的？" + t_105,
        idea: "答案是 表格(A)。<br>要測量「浸泡時間」對結果的影響，所以「浸泡時間」是操縱變因（每次實驗要設定不同時間，如 20, 40, 60, 80）。而為了公平，粉筆顏色、長度都必須保持一樣(控制變因)。最小外力則是應變變因。"
      },
      {
        lv: "104 會考 (器材選擇)",
        q: "小琪要從附圖的甲、乙兩罐藥瓶中取出適量藥品進行實驗，最適合取用此兩種藥品的器材分別為下列何者？" + img104,
        idea: "答案是 甲用刮勺、乙用滴管。<br>碳酸鈣是固體粉末，必須使用刮勺舀取；鹽酸是液體，應倒入燒杯後使用滴管吸取。"
      },
      {
        lv: "103 會考 (器材規範)",
        q: "器材一：多用於吸取少量的液體，吸取後應將其顛倒放置以防流出。器材二：測量液體的體積，不可在內進行化學反應，也不可用於加熱。關於這兩項的說明，何者正確？",
        idea: "答案是 (D) 只有器材二的說明正確。<br>器材一是滴管，吸取液體後「絕對不可倒置」，否則液體倒流會腐蝕橡皮頭；器材二是量筒，不可加熱與反應的說明完全正確。"
      },
      {
        lv: "90 基測 (酵素實驗)",
        q: "夏琳做了一個酵素反應實驗，得到數據如下表。由此實驗結果推論，下列何者是使此實驗反應後生成物質質量增加的主要關鍵？" + t_90_enzyme,
        idea: "答案是 (B) 作用溫度的高低。<br>觀察數據可知，當溫度由 30°C 降為 15°C 時，生成物質的質量從 25g 增加到了 50g，而其他條件（如待作用物質100g）皆維持相同。"
      }
    ],

    where: {
      codes: [["N-8-1", "科學方法：觀察、假說、實驗、結論等步驟"], ["n-IV-2", "了解並遵守實驗室安全守則與儀器操作。"]],
      exam: "本單元是所有理化實驗的基石。教育會考極常在題幹中考驗學生判斷「操縱變因」與「控制變因」的能力，並頻繁出現「量筒不能配製溶液」與「稀釋濃酸要將酸入水」等實驗安全禁忌考題。",
      stop: "只需理解科學探究的邏輯思維，並熟記上述常見儀器的「不可做之事（禁忌）」。各種化學藥品的詳細性質，在後續章節會再深入探討。"
    }
  });

  // --- 新增：前往下一節按鈕 ---
  setTimeout(function() {
      var mainContainer = document.getElementById("main");
      if (mainContainer && !document.getElementById("btn-next-unit")) {
          var nextNav = SK.h("nav", { class: "unit-foot", id:"btn-next-unit", "aria-label": "前往下一節", style: "margin-top: 30px; text-align:center; border:none; background:transparent;" });
          nextNav.innerHTML = '<a class="btn" href="vol3-1-1.html" style="background:#CDE0DB; color:#4F7479; border-color:#CDE0DB; font-size:1.1rem; padding: 12px 24px; box-shadow: 0 4px 12px rgba(79,116,121,0.15);">進入下一節：1.1 長度與體積的測量 ' + SK.icon("arrow") + '</a>';
          mainContainer.appendChild(nextNav);
      }
  }, 500);

})();
