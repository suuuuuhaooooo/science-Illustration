/* 理化小工具：週期表、公式卡、單位換算。見微理畫的每一頁都有；學員專區（國中理化）作答時，依老師／管理員的設定決定能不能用。
   用法：SciTools.button() 在右下角放一個「小工具」按鈕；SciTools.open("pt"|"fx"|"cv") 直接打開。不依賴其他程式（有 KaTeX 就用來排公式）。 */
(function () {
  "use strict";
  if (window.SciTools) return;
  /* 週期表：原子序、符號、中文名、原子量（取四位有效數字左右；[ ] 表示最穩定同位素的質量數）、族、週期 */
  var E = "1 H 氫 1.008 1 1|2 He 氦 4.003 18 1|3 Li 鋰 6.94 1 2|4 Be 鈹 9.012 2 2|5 B 硼 10.81 13 2|6 C 碳 12.01 14 2|7 N 氮 14.01 15 2|8 O 氧 16.00 16 2|9 F 氟 19.00 17 2|10 Ne 氖 20.18 18 2|" +
    "11 Na 鈉 22.99 1 3|12 Mg 鎂 24.31 2 3|13 Al 鋁 26.98 13 3|14 Si 矽 28.09 14 3|15 P 磷 30.97 15 3|16 S 硫 32.06 16 3|17 Cl 氯 35.45 17 3|18 Ar 氬 39.95 18 3|" +
    "19 K 鉀 39.10 1 4|20 Ca 鈣 40.08 2 4|21 Sc 鈧 44.96 3 4|22 Ti 鈦 47.87 4 4|23 V 釩 50.94 5 4|24 Cr 鉻 52.00 6 4|25 Mn 錳 54.94 7 4|26 Fe 鐵 55.85 8 4|27 Co 鈷 58.93 9 4|28 Ni 鎳 58.69 10 4|29 Cu 銅 63.55 11 4|30 Zn 鋅 65.38 12 4|31 Ga 鎵 69.72 13 4|32 Ge 鍺 72.63 14 4|33 As 砷 74.92 15 4|34 Se 硒 78.97 16 4|35 Br 溴 79.90 17 4|36 Kr 氪 83.80 18 4|" +
    "37 Rb 銣 85.47 1 5|38 Sr 鍶 87.62 2 5|39 Y 釔 88.91 3 5|40 Zr 鋯 91.22 4 5|41 Nb 鈮 92.91 5 5|42 Mo 鉬 95.95 6 5|43 Tc 鎝 [98] 7 5|44 Ru 釕 101.1 8 5|45 Rh 銠 102.9 9 5|46 Pd 鈀 106.4 10 5|47 Ag 銀 107.9 11 5|48 Cd 鎘 112.4 12 5|49 In 銦 114.8 13 5|50 Sn 錫 118.7 14 5|51 Sb 銻 121.8 15 5|52 Te 碲 127.6 16 5|53 I 碘 126.9 17 5|54 Xe 氙 131.3 18 5|" +
    "55 Cs 銫 132.9 1 6|56 Ba 鋇 137.3 2 6|72 Hf 鉿 178.5 4 6|73 Ta 鉭 180.9 5 6|74 W 鎢 183.8 6 6|75 Re 錸 186.2 7 6|76 Os 鋨 190.2 8 6|77 Ir 銥 192.2 9 6|78 Pt 鉑 195.1 10 6|79 Au 金 197.0 11 6|80 Hg 汞 200.6 12 6|81 Tl 鉈 204.4 13 6|82 Pb 鉛 207.2 14 6|83 Bi 鉍 209.0 15 6|84 Po 釙 [209] 16 6|85 At 砈 [210] 17 6|86 Rn 氡 [222] 18 6|" +
    "87 Fr 鍅 [223] 1 7|88 Ra 鐳 [226] 2 7";
  var NONMETAL = "H He C N O F Ne P S Cl Ar Se Br Kr I Xe Rn".split(" "), SEMI = "B Si Ge As Sb Te At".split(" "), NOBLE = "He Ne Ar Kr Xe Rn".split(" ");
  var ELS = E.split("|").map(function (r) { var a = r.split(" "); return { z: +a[0], s: a[1], n: a[2], m: a[3], g: +a[4], p: +a[5] }; });
  /* 公式卡（依冊別） */
  var FX = [
    ["第三冊", [["密度", "D=\\dfrac{M}{V}", "單位 g/cm³；水約 1 g/cm³"], ["重量百分濃度", "P\\%=\\dfrac{\\text{溶質質量}}{\\text{溶液質量}}\\times100\\%", "溶液＝溶質＋溶劑"], ["百萬分點", "\\text{ppm}=\\dfrac{\\text{溶質質量}}{\\text{溶液質量}}\\times10^6", ""], ["波速", "v=f\\lambda=\\dfrac{\\lambda}{T}", "頻率 f（Hz）、波長 λ、週期 T"], ["回聲測距", "d=\\dfrac{vt}{2}", "t 是來回的時間"], ["聲速（空氣）", "v\\approx331+0.6\\,T", "T 為攝氏溫度，單位 m/s"], ["反射定律", "\\theta_\\text{入}=\\theta_\\text{反}", "角度從法線量起"], ["熱量", "H=ms\\Delta T", "水的比熱 1 cal/g℃"], ["熱平衡", "m_1s_1(T_1-T)=m_2s_2(T-T_2)", "不計熱量散失"]]],
    ["第四冊", [["質量守恆", "\\text{反應物總質量}=\\text{生成物總質量}", "密閉系統"], ["莫耳數", "n=\\dfrac{\\text{質量}}{\\text{分子量}}", "1 莫耳 ≈ 6×10²³ 個粒子"], ["體積莫耳濃度", "C_M=\\dfrac{n}{V(\\text{L})}", "單位 M（mol/L）"], ["pH", "[\\text{H}^+]=10^{-\\text{pH}}\\ \\text{M}", "pH 每差 1，[H⁺] 差 10 倍"], ["彈簧", "F=kx", "x 是伸長量（彈性限度內）"], ["壓力", "P=\\dfrac{F}{A}", ""], ["液體壓力", "P=hd", "h 深度、d 密度（gw/cm²）"], ["浮力", "B=Vd", "排開液體的體積 × 液體密度；漂浮時 B＝物重"]]],
    ["第五冊", [["平均速率", "\\bar v=\\dfrac{\\text{路徑長}}{t}", ""], ["平均速度", "\\vec v=\\dfrac{\\text{位移}}{t}", "有方向"], ["加速度", "a=\\dfrac{v-v_0}{t}", ""], ["等加速度", "v=v_0+at,\\ \\ s=v_0t+\\tfrac12at^2", ""], ["牛頓第二定律", "F=ma", "1 N＝1 kg·m/s²；1 kgw≈9.8 N"], ["萬有引力", "F=\\dfrac{GMm}{r^2}", "與距離平方成反比"], ["功、功率", "W=Fs,\\ \\ P=\\dfrac{W}{t}", "1 J＝1 N·m；1 W＝1 J/s"], ["動能、位能", "E_k=\\tfrac12mv^2,\\ \\ U=mgh", ""], ["力矩", "\\tau=F\\times d", "d：支點到力作用線的垂直距離"], ["庫侖定律", "F=\\dfrac{kq_1q_2}{r^2}", "基本電荷 1.6×10⁻¹⁹ C"], ["電流", "I=\\dfrac{Q}{t}", "1 A＝1 C/s"], ["歐姆定律", "V=IR", ""], ["串聯", "R=R_1+R_2,\\ \\ I \\text{ 相同}", ""], ["並聯", "\\dfrac1R=\\dfrac1{R_1}+\\dfrac1{R_2},\\ \\ V \\text{ 相同}", ""]]],
    ["第六冊", [["電功率", "P=IV=I^2R=\\dfrac{V^2}{R}", ""], ["電能", "E=Pt", "1 度＝1 kWh＝3.6×10⁶ J"], ["電解水", "2\\text{H}_2\\text{O}\\rightarrow2\\text{H}_2+\\text{O}_2", "體積比 2：1"], ["安培右手定則", "\\text{拇指：電流；四指：磁場}", "螺線管：四指電流、拇指 N 極"], ["電磁感應", "\\varepsilon=-N\\dfrac{\\Delta\\Phi}{\\Delta t}", "感應電流阻止磁通量變化"]]]
  ];
  /* 單位換算：每一類寫成「單位 → 換成基本單位的倍數」 */
  var CV = {
    "長度": [["m", 1], ["cm", 0.01], ["mm", 0.001], ["km", 1000], ["μm", 1e-6], ["nm", 1e-9]],
    "質量": [["kg", 1], ["g", 0.001], ["mg", 1e-6], ["公噸", 1000]],
    "體積": [["L", 1e-3], ["mL", 1e-6], ["cm³", 1e-6], ["m³", 1]],
    "密度": [["g/cm³", 1000], ["kg/m³", 1], ["g/mL", 1000]],
    "時間": [["s", 1], ["min", 60], ["h", 3600]],
    "速度": [["m/s", 1], ["km/h", 1 / 3.6], ["cm/s", 0.01]],
    "力": [["N", 1], ["kgw", 9.8], ["gw", 0.0098]],
    "壓力": [["Pa", 1], ["atm", 101325], ["cmHg", 1333.2], ["gw/cm²", 98], ["kgw/cm²", 98000]],
    "能量": [["J", 1], ["kJ", 1000], ["cal", 4.186], ["kcal", 4186], ["kWh（度）", 3.6e6]],
    "功率": [["W", 1], ["kW", 1000]],
    "電流": [["A", 1], ["mA", 0.001]],
    "電壓": [["V", 1], ["mV", 0.001], ["kV", 1000]],
    "溫度": "T"
  };
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function tex(s) { try { if (window.katex) return window.katex.renderToString(s, { throwOnError: false }); } catch (e) {} return s; }
  function fmt(x) { if (!isFinite(x)) return "—"; if (x !== 0 && (Math.abs(x) >= 1e6 || Math.abs(x) < 1e-3)) { var e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e); return (+m.toPrecision(4)) + " × 10^" + e; } return String(+x.toPrecision(6)); }
  var ov = null;
  function close() { if (ov) { ov.remove(); ov = null; document.removeEventListener("keydown", key); } }
  function key(e) { if (e.key === "Escape") close(); }
  function open(tab) {
    if (ov) return; ov = el("div", "stov"); var box = el("div", "stbox"); ov.appendChild(box); ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "理化小工具");
    box.innerHTML = '<div class="sthd"><b>理化小工具</b><div class="sttabs" role="tablist"><button type="button" data-t="pt">週期表</button><button type="button" data-t="fx">公式卡</button><button type="button" data-t="cv">單位換算</button></div><button type="button" class="stx" aria-label="關閉">×</button></div><div class="stbody"></div>';
    document.body.appendChild(ov); document.addEventListener("keydown", key);
    box.querySelector(".stx").onclick = close; ov.addEventListener("mousedown", function (e) { if (e.target === ov) close(); });
    var body = box.querySelector(".stbody");
    function show(t) { Array.prototype.forEach.call(box.querySelectorAll(".sttabs button"), function (b) { b.classList.toggle("on", b.dataset.t === t); b.setAttribute("aria-selected", b.dataset.t === t); }); body.innerHTML = ""; ({ pt: pt, fx: fx, cv: cv })[t](body); }
    box.querySelector(".sttabs").onclick = function (e) { var b = e.target.closest("button"); if (b) show(b.dataset.t); };
    show(tab || "pt");
  }
  function pt(body) {
    var g = el("div", "stpt"), info = el("p", "stinfo", "點一個元素看名稱與原子量。灰底是非金屬、斜線底是類金屬、其餘是金屬。"); body.appendChild(info);
    for (var p = 1; p <= 7; p++) for (var gg = 1; gg <= 18; gg++) {
      var e = ELS.filter(function (x) { return x.p === p && x.g === gg; })[0], c;
      if (!e) { c = el("div", "stc stv"); if (gg === 3 && p >= 6) { c.className = "stc stln"; c.textContent = p === 6 ? "57–71" : "89–103"; c.title = p === 6 ? "鑭系元素" : "錒系元素"; } }
      else { var kind = NONMETAL.indexOf(e.s) >= 0 ? (NOBLE.indexOf(e.s) >= 0 ? " noble" : " non") : SEMI.indexOf(e.s) >= 0 ? " semi" : " metal"; c = el("button", "stc" + kind, "<small>" + e.z + "</small><b>" + e.s + "</b><i>" + e.n + "</i>"); c.type = "button"; (function (e) { c.onclick = function () { info.innerHTML = "<b>" + e.n + "（" + e.s + "）</b>　原子序 " + e.z + "・原子量 " + e.m + "・第 " + e.p + " 週期、第 " + e.g + " 族" + (e.g === 1 && e.s !== "H" ? "（鹼金屬，遇水劇烈反應）" : e.g === 2 ? "（鹼土金屬）" : e.g === 17 ? "（鹵素）" : e.g === 18 ? "（鈍氣，化學性質穩定）" : ""); }; })(e); }
      c.style.gridRow = p; c.style.gridColumn = gg; g.appendChild(c);
    }
    var hd = el("div", "stgh"); for (var k = 1; k <= 18; k++) { var x = el("span", null, k); x.style.gridColumn = k; hd.appendChild(x); }
    body.appendChild(hd); body.appendChild(g); body.appendChild(el("p", "meta", "國中常用的原子量可取整數或一位小數（例如 Cl 35.5、Cu 63.5）；考試時以題目給的數值為準。"));
  }
  function fx(body) {
    FX.forEach(function (v) { var d = el("details", "stfx"); if (v[0] === "第三冊") d.open = true; d.appendChild(el("summary", null, v[0])); var ul = el("div", "stfl"); v[1].forEach(function (f) { ul.appendChild(el("div", "stf", "<b>" + f[0] + "</b><span>" + tex(f[1]) + "</span>" + (f[2] ? "<small>" + f[2] + "</small>" : ""))); }); d.appendChild(ul); body.appendChild(d); });
  }
  function cv(body) {
    var w = el("div", "stcv"); body.appendChild(w);
    var cat = el("select"); Object.keys(CV).forEach(function (k) { cat.appendChild(new Option(k, k)); });
    var v = el("input"); v.type = "text"; v.inputMode = "decimal"; v.value = "1"; v.setAttribute("aria-label", "數值");
    var a = el("select"), b = el("select"), out = el("p", "stout");
    w.appendChild(el("label", null, "種類 ")).appendChild(cat); var r = el("div", "strow"); r.appendChild(v); r.appendChild(a); r.appendChild(el("span", null, " → ")); r.appendChild(b); w.appendChild(r); w.appendChild(out);
    function units() { a.innerHTML = ""; b.innerHTML = ""; var L = CV[cat.value]; if (L === "T") L = [["℃"], ["K"], ["℉"]]; L.forEach(function (u, i) { a.appendChild(new Option(u[0], i)); b.appendChild(new Option(u[0], i)); }); b.selectedIndex = Math.min(1, L.length - 1); calc(); }
    function calc() { var x = parseFloat(String(v.value).replace(/[×x]\s*10\^?/i, "e")), L = CV[cat.value], y;
      if (!isFinite(x)) { out.textContent = "請輸入數字，例如 2.5 或 1.6e-19"; return; }
      if (L === "T") { var c = [x, x - 273.15, (x - 32) * 5 / 9][a.selectedIndex]; y = [c, c + 273.15, c * 9 / 5 + 32][b.selectedIndex]; }
      else y = (x * L[a.selectedIndex][1]) / L[b.selectedIndex][1];
      out.innerHTML = "<b>" + fmt(x) + " " + a.options[a.selectedIndex].text + " = " + fmt(y) + " " + b.options[b.selectedIndex].text + "</b>"; }
    cat.onchange = units; a.onchange = b.onchange = calc; v.oninput = calc; units();
  }
  function button(where) {
    if (document.querySelector(".stbtn")) return; var b = el("button", "stbtn noprint", "小工具"); b.type = "button"; b.title = "週期表、公式卡、單位換算"; b.onclick = function () { open(); }; (where || document.body).appendChild(b); return b;
  }
  window.SciTools = { open: open, close: close, button: button, remove: function () { var b = document.querySelector(".stbtn"); if (b) b.remove(); close(); } };
  /* 小工具的樣式（兩個網站共用，所以寫在這裡） */
  var css = ".stbtn{position:fixed;right:14px;bottom:calc(62px + env(safe-area-inset-bottom,0px));z-index:50;padding:8px 14px;border:1.5px solid var(--line,#ccc);border-radius:999px;background:var(--paper,#fff);color:var(--ink,#222);font:inherit;font-size:.9rem;cursor:pointer;box-shadow:0 6px 18px -10px rgba(0,0,0,.4)}" +
    ".stov{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:12px}" +
    ".stbox{width:min(980px,100%);max-height:92vh;overflow:auto;background:var(--paper,#fff);color:var(--ink,#222);border-radius:16px;padding:12px 14px;box-shadow:0 20px 50px -20px rgba(0,0,0,.6)}" +
    ".sthd{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}.sttabs{display:flex;gap:6px;flex:1}.sttabs button{font:inherit;padding:2px 12px;border:1.5px solid var(--line,#ccc);border-radius:999px;background:none;color:inherit;cursor:pointer}.sttabs button.on{background:var(--ink,#222);color:var(--paper,#fff)}" +
    ".stx{font-size:1.4rem;border:0;background:none;color:inherit;cursor:pointer}" +
    ".stgh,.stpt{display:grid;grid-template-columns:repeat(18,minmax(0,1fr));gap:2px}.stgh span{text-align:center;font-size:.65rem;opacity:.6}" +
    ".stc{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:46px;padding:1px;border:1px solid var(--line,#ccc);border-radius:5px;background:#fbe6c8;color:#222;font:inherit;cursor:pointer;line-height:1.05}" +
    ".stc small{font-size:.55rem;opacity:.7}.stc b{font-size:.85rem}.stc i{font-style:normal;font-size:.6rem}.stc.non{background:#dfe8ef}.stc.noble{background:#e6dcf3}.stc.semi{background:repeating-linear-gradient(45deg,#e9f0d8,#e9f0d8 4px,#dbe6c3 4px,#dbe6c3 8px)}.stc.stv{visibility:hidden}.stc.stln{background:none;border-style:dashed;font-size:.6rem;color:var(--soft,#777);cursor:default}" +
    ".stinfo{min-height:1.6em;margin:2px 0 6px}.stfx summary{cursor:pointer;font-weight:700;margin:6px 0}.stfl{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px}" +
    ".stf{border:1px dashed var(--line,#ccc);border-radius:10px;padding:6px 10px;display:flex;flex-direction:column;gap:2px}.stf small{opacity:.7}" +
    ".stcv label{display:block;margin:6px 0}.stcv select,.stcv input{font:inherit;padding:3px 6px}.strow{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.stcv input{width:9em}.stout{font-size:1.1rem;margin-top:10px}" +
    "@media (max-width:640px){.stc{min-height:34px}.stc i{display:none}.stc b{font-size:.7rem}}@media print{.stbtn,.stov{display:none!important}}";
  var auto = document.currentScript && document.currentScript.dataset.auto === "1"; /* 見微理畫的頁面：自動放按鈕 */
  if (auto) { if (document.body) button(); else document.addEventListener("DOMContentLoaded", function () { button(); }); }
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();
