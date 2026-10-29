/* 全站漢堡選單：見微群島、學習地圖、學員專區……
   之後要加新功能，只要在 NB.NAV 加一筆 { g:"分組", id, href, t:"名稱", d:"一句說明", ic:"圖示名" } 就好。
   NB.menu() 回傳按鈕元素；NB.barR(bar) 會把主題列、學員小卡和選單一起塞進導覽列右邊。 */
(function () {
  "use strict";
  var NB = window.NB = window.NB || {}, root = document.body.getAttribute("data-root") || "./";
  /* 導覽頁在 repo 根目錄、其他頁在 site/，所以「回導覽頁」的相對路徑要分開算 */
  function up() { return root === "./" ? "../" : "./"; }
  var IC = {
    member: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.2-7 8-7s7 2.5 8 7"/>',
    isle: '<path d="M2 19c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.2 1.6 4.8 0"/><path d="M4 15l4.5-8 4.5 8"/><path d="M13.5 15l3-5.5 3 5.5"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6.4L4.9 18A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.7-3L14 9.4V3"/><path d="M7.6 15h8.8"/>',
    link: '<path d="M10.5 13.5a4.5 4.5 0 0 0 6.4 0l2-2a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M13.5 10.5a4.5 4.5 0 0 0-6.4 0l-2 2a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    cup: '<path d="M6 8h12l-1.5 12a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2z"/><path d="M5 8h14M14 3l-2 5"/><circle cx="10" cy="17" r="1"/><circle cx="13.5" cy="15.5" r="1"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'
  };
  function cfg() { return window.NB_CONFIG || {}; }
  NB.NAV = NB.NAV || [
    { g: "學習", id: "member", href: "", t: "學員專區", d: "小測驗、每日一題、模擬卷與錯題本", ic: "member", ext: 1 },
    { g: "逛逛", id: "island", href: "island.html", t: "見微群島", d: "照主題分島，點島看小節", ic: "isle" },
    { g: "逛逛", id: "map", href: "map.html", t: "學習地圖", d: "先學什麼、接著學什麼，對照 108 課綱", ic: "map" },
    { g: "逛逛", id: "tools", href: "", t: "小工具", d: "週期表、公式卡、單位換算", ic: "flask", act: 1 },
    { g: "其他", id: "intro", href: "", t: "導覽頁", d: "見微理畫介紹", ic: "home" },
    { g: "其他", id: "sister", href: "https://suuuuuhaooooo.github.io/math-Illustration/", t: "數光島筆記本", d: "姊妹站：國小數學", ic: "link", ext: 1 },
    { g: "其他", id: "plans", href: "https://suuuuuhaooooo.github.io/math-Illustration/site/plans.html#sci", t: "方案與價格", d: "班級與個人方案", ic: "tag", ext: 1 },
    { g: "其他", id: "donate", href: "", t: "贊助島民", d: "小額贊助，支持網站持續更新", ic: "cup", ext: 1 }
  ];
  function svg(k) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[k] || "") + "</svg>"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var uid = 0;
  NB.menu = function (o) {
    o = o || {}; var id = "nbm" + ++uid, cur = o.cur || "";
    var wrap = document.createElement("div"); wrap.className = "nbm";
    wrap.innerHTML = '<button type="button" class="nbm-btn" aria-expanded="false" aria-controls="' + id + '" aria-label="開啟選單"><span class="nbm-ic" aria-hidden="true"><i></i><i></i><i></i></span><span class="nbm-tx">選單</span></button>' +
      '<div class="nbm-pan" id="' + id + '" role="menu" hidden></div>';
    var btn = wrap.firstChild, pan = wrap.lastChild;
    function build() {
      var dn = (cfg().donate || {}), groups = {}, order = [], html = "";
      NB.NAV.forEach(function (it) {
        if (it.id === "donate" && !dn.url) return;
        /* 小工具是 scitools.js 掛上去的，導覽頁沒載就不要放這一項 */
        if (it.id === "tools" && !window.SciTools) return;
        if (!groups[it.g]) { groups[it.g] = []; order.push(it.g); }
        groups[it.g].push(it);
      });
      order.forEach(function (g) {
        html += '<div class="nbm-g"><p class="nbm-gh">' + esc(g) + "</p>";
        groups[g].forEach(function (it) {
          var href = it.href, t = it.t, d = it.d;
          if (it.id === "donate") href = dn.url, t = dn.label || t;
          else if (it.id === "member") href = NB.memberURL || href;
          else if (it.id === "intro") href = up();
          else if (it.id === "tools") href = "#tools";
          else if (!/^(https?:|\.\.\/|\/|#)/.test(href)) href = root + href;
          var on = cur && it.id === cur ? " on" : "";
          html += '<a role="menuitem" class="nbm-it' + on + (it.id === "donate" ? " nbm-dn" : "") + '" href="' + esc(href) + '"' +
            (it.act ? ' data-act="' + esc(it.id) + '"' : "") + (it.ext ? ' target="_blank" rel="noopener"' : "") + ">" +
            svg(it.ic) + "<span><b>" + esc(t) + "</b><small>" + esc(d) + "</small></span></a>";
        });
        html += "</div>";
      });
      pan.innerHTML = html;
    }
    function open(v) {
      if (v) build();
      wrap.classList.toggle("open", v); btn.setAttribute("aria-expanded", v ? "true" : "false"); btn.setAttribute("aria-label", v ? "關閉選單" : "開啟選單");
      if (v) { pan.hidden = false; requestAnimationFrame(function () { pan.classList.add("in"); var f = pan.querySelector("a"); if (f && !o.noFocus) f.focus({ preventScroll: true }); }); }
      else { pan.classList.remove("in"); setTimeout(function () { if (!wrap.classList.contains("open")) pan.hidden = true; }, 220); }
    }
    btn.onclick = function (e) { e.stopPropagation(); open(!wrap.classList.contains("open")); };
    document.addEventListener("click", function (e) { if (wrap.classList.contains("open") && !wrap.contains(e.target)) open(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && wrap.classList.contains("open")) { open(false); btn.focus(); } });
    pan.addEventListener("click", function (e) {
      var a = e.target.closest("a"); if (!a) return;
      if (a.getAttribute("data-act") === "tools") { e.preventDefault(); window.SciTools && SciTools.open(); }
      open(false);
    });
    return wrap;
  };
  /* 導覽列右半邊：學員小卡（可選）＋ 主題切換 ＋ 漢堡選單 */
  NB.barR = function (bar, o) {
    o = o || {};
    var r = document.createElement("div"); r.className = "bar-r";
    if (o.chip && NB.memberChip) r.appendChild(NB.memberChip());
    if (NB.themeBar) r.appendChild(NB.themeBar());
    r.appendChild(NB.menu({ cur: o.cur || "", noFocus: o.noFocus }));
    bar.appendChild(r);
    return r;
  };
  /* 贊助按鈕：頁面上有 [data-donate] 的元素就填入（沒設定網址就保持隱藏） */
  NB.donate = function () {
    var dn = cfg().donate || {}; if (!dn.url) return;
    var els = document.querySelectorAll("[data-donate]");
    for (var i = 0; i < els.length; i++) {
      var a = els[i]; a.href = dn.url; a.target = "_blank"; a.rel = "noopener";
      if (!a.textContent.trim()) a.innerHTML = svg("cup") + "<span>" + esc(dn.label || "贊助島民") + "</span>";
      a.hidden = false;
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", NB.donate); else NB.donate();
})();
