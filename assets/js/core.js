/* =========================================================
   見微理畫 — 共用元件庫 (SK) 
   (防斷行報錯安全版，已展開所有長字串)
   ========================================================= */
(function () {
    "use strict";
    var SK = (window.SK = {});
    var NS = "http://www.w3.org/2000/svg";
    
    /* ---------- 顏色 (莫蘭迪理化色系) ---------- */
    SK.C = {
      blue:   { s: "#5B778C", f: "rgba(164,185,200,.5)" },
      green:  { s: "#7A8B76", f: "rgba(189,203,184,.5)" },
      orange: { s: "#C28C6E", f: "rgba(224,189,173,.6)" },
      pink:   { s: "#B57E83", f: "rgba(217,175,180,.5)" },
      gold:   { s: "#B8A369", f: "rgba(227,212,172,.6)" },
      purple: { s: "#847C96", f: "rgba(196,189,207,.5)" },
      ink: "#3A302A", soft: "#6F645A", line: "#BBAE9E", paper: "#FDFBF6", cocoa: "#4A3F37"
    };
  
    var MACROS = {
      "\\cb": "\\textcolor{5B778C}{#1}",
      "\\cg": "\\textcolor{7A8B76}{#1}",
      "\\co": "\\textcolor{C28C6E}{#1}",
      "\\cp": "\\textcolor{B57E83}{#1}",
      "\\cy": "\\textcolor{B8A369}{#1}",
      "\\cv": "\\textcolor{847C96}{#1}"
    };
    
    SK.tex = function (src, display) {
      if (!window.katex) return src;
      return katex.renderToString(src, { displayMode: !!display, throwOnError: false, strict: false, macros: Object.assign({}, MACROS) });
    };
    
    SK.md = function (str) {
      if (str == null) return "";
      return String(str)
        .replace(/`([^`]+)`/g, '<span class="code">$1</span>')
        .replace(/\$\$([\s\S]+?)\$\$/g, function (m, t) { return SK.tex(t, true); })
        .replace(/\$([^$\n]+?)\$/g, function (m, t) { return SK.tex(t, false); });
    };
  
    SK.h = function (tag, attrs, html) {
      var e = document.createElement(tag);
      if (attrs) for (var k in attrs) {
        if (k === "class") e.className = attrs[k];
        else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), attrs[k]);
        else e.setAttribute(k, attrs[k]);
      }
      if (html != null) e.innerHTML = html;
      return e;
    };
    
    SK.s = function (tag, attrs, parent) {
      var e = document.createElementNS(NS, tag);
      if (attrs) SK.attr(e, attrs);
      if (parent) parent.appendChild(e);
      return e;
    };
    
    SK.attr = function (e, attrs) {
      for (var k in attrs) {
        if (k === "text") e.textContent = attrs[k];
        else if (attrs[k] == null) e.removeAttribute(k);
        else e.setAttribute(k, attrs[k]);
      }
      return e;
    };
    
    SK.svg = function (parent, w, h, label) {
      return SK.s("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": label || "圖解" }, parent);
    };
    
    SK.label = function (g, x, y, text, opts) {
      opts = opts || {};
      var t = SK.s("text", {
        x: x, y: y, "text-anchor": opts.anchor || "middle", "dominant-baseline": "middle",
        class: "m-label" + (opts.it ? " it" : ""), fill: opts.color || null,
        "font-size": opts.size || null, "font-weight": opts.bold ? 700 : null
      }, g);
      t.textContent = text;
      if (opts.color) t.style.fill = opts.color;
      if (opts.size) t.style.fontSize = opts.size + "px";
      return t;
    };
    
    SK.fmt = function (x, d) {
      d = d == null ? 2 : d;
      var v = Math.abs(x) < 1e-9 ? 0 : x;
      var s = v.toFixed(d);
      if (d > 0) s = s.replace(/\.?0+$/, "");
      return s === "-0" ? "0" : s.replace("-", "−");
    };
    
    SK.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
    SK.deg = function (r) { return r * 180 / Math.PI; };
    SK.rad = function (d) { return d * Math.PI / 180; };
  
    SK.rightMark = function (g, x, y, ux, uy, vx, vy, size, color) {
      size = size || 12;
      var p1 = [x + ux * size, y + uy * size], p2 = [x + ux * size + vx * size, y + uy * size + vy * size], p3 = [x + vx * size, y + vy * size];
      return SK.s("path", { d: "M" + p1 + " L" + p2 + " L" + p3, fill: "none", stroke: color || SK.C.soft, "stroke-width": 1.5 }, g);
    };
    
    SK.arcPath = function (cx, cy, r, a0, a1) {
      var x0 = cx + r * Math.cos(a0), y0 = cy - r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy - r * Math.sin(a1);
      var large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
      var sweep = a1 > a0 ? 0 : 1;
      return "M" + x0 + " " + y0 + " A" + r + " " + r + " 0 " + large + " " + sweep + " " + x1 + " " + y1;
    };
    
    SK.brace = function (g, x1, y1, x2, y2, depth, color) {
      var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
      var ux = dx / L, uy = dy / L, nx = -uy * depth, ny = ux * depth;
      var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      var d = "M" + x1 + " " + y1 +
        " Q" + (x1 + nx) + " " + (y1 + ny) + " " + (x1 + nx + ux * L * .12) + " " + (y1 + ny + uy * L * .12) +
        " L" + (mx + nx - ux * 8) + " " + (my + ny - uy * 8) +
        " Q" + (mx + nx) + " " + (my + ny) + " " + (mx + nx * 1.7) + " " + (my + ny * 1.7) +
        " Q" + (mx + nx) + " " + (my + ny) + " " + (mx + nx + ux * 8) + " " + (my + ny + uy * 8) +
        " L" + (x2 + nx - ux * L * .12) + " " + (y2 + ny - uy * L * .12) +
        " Q" + (x2 + nx) + " " + (y2 + ny) + " " + x2 + " " + y2;
      return SK.s("path", { d: d, fill: "none", stroke: color || SK.C.soft, "stroke-width": 1.6, "stroke-linecap": "round" }, g);
    };
    
    SK.arrow = function (g, x1, y1, x2, y2, color, width) {
      var grp = SK.s("g", {}, g);
      var line = SK.s("line", { stroke: color, "stroke-width": width || 3.5, "stroke-linecap": "round" }, grp);
      var head = SK.s("path", { fill: color }, grp);
      grp.update = function (a, b, c, d) {
        var L = Math.hypot(c - a, d - b) || 1, ux = (c - a) / L, uy = (d - b) / L, hs = Math.min(14, L * .45);
        SK.attr(line, { x1: a, y1: b, x2: c - ux * hs * .7, y2: d - uy * hs * .7 });
        var bx = c - ux * hs, by = d - uy * hs;
        head.setAttribute("d", "M" + c + " " + d + " L" + (bx - uy * hs * .5) + " " + (by + ux * hs * .5) + " L" + (bx + uy * hs * .5) + " " + (by - ux * hs * .5) + "Z");
      };
      grp.update(x1, y1, x2, y2);
      return grp;
    };
  
    /* ---------- 線性小圖示 ---------- */
    var INK = "#4A3F37";
    function ic(fillPath, linePath, fill, extra) {
      var html = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round">';
      if (fillPath) {
          html += '<path d="' + fillPath + '" fill="' + fill + '" stroke="none" transform="translate(1.2 1.1)"/>';
      }
      html += '<path d="' + linePath + '" fill="none" stroke="' + INK + '" stroke-width="1.35"/>';
      if (extra) html += extra;
      html += '</svg>';
      return html;
    }
    
    SK.icons = {
      sparkle: ic("M12 3c.6 4.6 2.6 7 7.5 9-4.9 1.4-6.9 3.6-7.5 9-.7-5.4-2.7-7.6-7.5-9 4.8-2 6.8-4.4 7.5-9z", "M12 3c.6 4.6 2.6 7 7.5 9-4.9 1.4-6.9 3.6-7.5 9-.7-5.4-2.7-7.6-7.5-9 4.8-2 6.8-4.4 7.5-9z", "#F1E2B8"),
      star: ic("M12 3.4l2.5 5.3 5.6.7-4.1 3.9 1.1 5.6L12 16.2l-5.1 2.7 1.1-5.6-4.1-3.9 5.6-.7z", "M12 3.4l2.5 5.3 5.6.7-4.1 3.9 1.1 5.6L12 16.2l-5.1 2.7 1.1-5.6-4.1-3.9 5.6-.7z", "#F1E2B8"),
      sprig: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"><g fill="#C9D4BC" transform="translate(1 1)"><path d="M12 8c-2.6-.4-4-2-4.3-4.6 2.6.3 4 1.9 4.3 4.6zM12 12.5c2.6-.4 4-2 4.3-4.6-2.6.3-4 1.9-4.3 4.6zM12 16.8c-2.6-.4-4-2-4.3-4.6 2.6.3 4 1.9 4.3 4.6z"/></g><path d="M12 21.5V3.5M12 8c-2.6-.4-4-2-4.3-4.6 2.6.3 4 1.9 4.3 4.6zM12 12.5c2.6-.4 4-2 4.3-4.6-2.6.3-4 1.9-4.3 4.6zM12 16.8c-2.6-.4-4-2-4.3-4.6 2.6.3 4 1.9 4.3 4.6z" fill="none" stroke="' + INK + '" stroke-width="1.25"/></svg>',
      bulb: ic("M12 3a6 6 0 0 0-3.5 10.9c.7.5 1.1 1.3 1.1 2.1v.8h4.8V16c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z", "M12 3a6 6 0 0 0-3.5 10.9c.7.5 1.1 1.3 1.1 2.1v.8h4.8V16c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3zM10 19.5h4M10.8 21.5h2.4", "#F1E2B8"),
      map: ic("M3.5 6.5l5.5-2.2 6 2.2 5.5-2.2v13.2L15 19.7l-6-2.2-5.5 2.2z", "M3.5 6.5l5.5-2.2 6 2.2 5.5-2.2v13.2L15 19.7l-6-2.2-5.5 2.2zM9 4.3v13.2M15 6.5v13.2", "#CFDDDA"),
      teach: ic("M3.5 4.5h17v11h-17z", "M3.5 4.5h17v11h-17zM12 15.5v4M8 20.5h8M7 12l3-3 2.5 2 4-4", "#F4EBD6"),
      stop: ic("M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3z", "M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3zM8 12h8", "#EBCDCB"),
      path: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="M4 20c4-2 2-6 6-8s6 1 10-8" stroke="' + INK + '" stroke-width="1.4" stroke-dasharray="1.5 3.2" stroke-linecap="round"/><circle cx="4" cy="20" r="2.2" fill="#F3C3A8" stroke="' + INK + '" stroke-width="1.1"/><circle cx="20" cy="4" r="2.2" fill="#CFDDDA" stroke="' + INK + '" stroke-width="1.1"/></svg>',
      arrow: '<svg class="arrow" viewBox="0 0 24 14" aria-hidden="true"><path d="M1.5 7.4c6-.5 13-.3 19.5-.2M15.8 2.4c1.9 1.7 3.7 3.2 5.6 4.8-2 1.5-3.8 3-5.4 4.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      arrowL: '<svg class="arrow" viewBox="0 0 24 14" aria-hidden="true" style="transform:scaleX(-1)"><path d="M1.5 7.4c6-.5 13-.3 19.5-.2M15.8 2.4c1.9 1.7 3.7 3.2 5.6 4.8-2 1.5-3.8 3-5.4 4.8" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    
    SK.icon = function (name) { return SK.icons[name] || ""; };
    function innerSvg(svg) { return svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, ""); }
    SK.innerSvg = innerSvg;
  
    /* ---------- 植物圖騰 ---------- */
    SK.botanical = function (k) {
      var L = 'stroke="' + INK + '" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"';
      var v = [
        '<svg viewBox="0 0 60 60" aria-hidden="true"><g fill="#C9D4BC" transform="translate(1.4 1.2)"><path d="M30 20c-5-1-8-4-8.5-9 5 .5 8 3.6 8.5 9zM30 30c5-1 8-4 8.5-9-5 .5-8 3.6-8.5 9zM30 40c-5-1-8-4-8.5-9 5 .5 8 3.6 8.5 9z"/></g><path ' + L + ' d="M30 56C29 40 31 22 30 6M30 20c-5-1-8-4-8.5-9 5 .5 8 3.6 8.5 9zM30 30c5-1 8-4 8.5-9-5 .5-8 3.6-8.5 9zM30 40c-5-1-8-4-8.5-9 5 .5 8 3.6 8.5 9z"/></svg>',
        '<svg viewBox="0 0 60 60" aria-hidden="true"><g fill="#F3C3A8" transform="translate(1.3 1.2)"><circle cx="20" cy="18" r="7"/><circle cx="42" cy="30" r="5.5"/></g><path ' + L + ' d="M20 25c1 10 3 20 6 31M42 35.5c-2 7-6 14-11 20.5M20 11a7 7 0 1 1-.01 0M42 24.5a5.5 5.5 0 1 1-.01 0"/><circle cx="20" cy="18" r="2" fill="' + INK + '"/><circle cx="42" cy="30" r="1.6" fill="' + INK + '"/></svg>',
        '<svg viewBox="0 0 60 60" aria-hidden="true"><path fill="#CFE0D3" transform="translate(1.3 1.2)" d="M14 46c2-14 10-22 26-24-2 15-11 23-26 24z"/><path ' + L + ' d="M14 46c2-14 10-22 26-24-2 15-11 23-26 24zM15 45c7-6 14-13 22-20"/><circle cx="46" cy="44" r="2.2" fill="#F3C3A8"/><circle cx="50" cy="36" r="1.4" fill="' + INK + '" opacity=".5"/><circle cx="10" cy="20" r="1.8" fill="#A9B79A"/><circle cx="18" cy="12" r="1.2" fill="' + INK + '" opacity=".5"/></svg>',
        '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="42" cy="16" r="7" fill="#F1E2B8" transform="translate(1.3 1.2)"/><circle ' + L + ' cx="42" cy="16" r="7"/><path ' + L + ' d="M16 54c0-9-2-17-7-23M22 54c0-11 1-20 5-27M28 54c-1-7 1-13 5-17"/></svg>'
      ];
      return v[((k % v.length) + v.length) % v.length];
    };
  
    /* ---------- 拱形裝飾 ---------- */
    SK.bouquet = function (tint) {
      var cols = tint || ["#CFE0D3", "#F3D5C3", "#D9E2D2"];
      var html = '<svg class="deco" viewBox="0 0 210 170" aria-hidden="true">';
      html += '<defs><pattern id="spk-h" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="6" cy="9" r=".7" fill="#4A3F37" opacity=".3"/><circle cx="27" cy="21" r=".5" fill="#4A3F37" opacity=".25"/><circle cx="17" cy="35" r=".8" fill="#B8674A" opacity=".25"/><circle cx="35" cy="4" r=".5" fill="#4A3F37" opacity=".3"/></pattern></defs>';
      html += '<path d="M20 170V58a32 32 0 0 1 64 0v112z" fill="' + cols[0] + '"/>';
      html += '<path d="M92 170V34a30 30 0 0 1 60 0v136z" fill="' + cols[1] + '"/>';
      html += '<path d="M160 170V78a22 22 0 0 1 44 0v92z" fill="' + cols[2] + '"/>';
      html += '<rect width="210" height="170" fill="url(#spk-h)"/>';
      html += '<g transform="translate(26 70) scale(.95)">' + innerSvg(SK.botanical(0)) + "</g>";
      html += '<g transform="translate(96 40) scale(1.05)">' + innerSvg(SK.botanical(1)) + "</g>";
      html += '<g transform="translate(158 92) scale(.8)">' + innerSvg(SK.botanical(3)) + "</g>";
      html += '<path d="M8 168h196" stroke="#4A3F37" stroke-width="1.3" stroke-linecap="round"/></svg>';
      return html;
    };
    
    /* ---------- 濾鏡 ---------- */
    function injectFilters() {
      if (document.getElementById("sk-filters")) return;
      var d = SK.h("div", { id: "sk-filters", "aria-hidden": "true", style: "position:absolute;width:0;height:0;overflow:hidden" });
      var svgHtml = '<svg width="0" height="0"><defs>';
      svgHtml += '<filter id="sk-wobble" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter>';
      svgHtml += '<filter id="sk-soft" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter>';
      svgHtml += '</defs></svg>';
      d.innerHTML = svgHtml;
      document.body.insertBefore(d, document.body.firstChild);
    }
    
    SK.slider = function (o) {
      var id = "sl-" + Math.random().toString(36).slice(2, 8);
      var wrap = SK.h("div", { class: "slider" + (o.color ? " c-" + o.color : "") });
      var lab = SK.h("label", { for: id }, SK.md(o.label));
      var inp = SK.h("input", { type: "range", id: id, min: o.min, max: o.max, step: o.step || 1, value: o.value });
      var out = SK.h("output", { for: id });
      wrap.appendChild(lab); wrap.appendChild(inp); wrap.appendChild(out);
      var fmt = o.fmt || function (v) { return SK.fmt(v, 2); };
      function sync() { out.textContent = fmt(+inp.value); }
      inp.addEventListener("input", function () { sync(); if (o.onInput) o.onInput(+inp.value); });
      sync();
      return { el: wrap, input: inp, get value() { return +inp.value; }, set: function (v, silent) { inp.value = v; sync(); if (!silent && o.onInput) o.onInput(+inp.value); } };
    };
    
    SK.handle = function (parent, x, y, color, label) {
      var g = SK.s("g", { class: "handle", tabindex: 0, role: "slider", "aria-label": label || "拖曳點" }, parent);
      SK.s("circle", { class: "hit", r: 22 }, g);
      var k = SK.s("circle", { class: "knob", r: 9 }, g);
      if (color) k.style.fill = color;
      SK.s("circle", { r: 15, fill: "none", stroke: color || "#B8674A", "stroke-width": 1.2, "stroke-dasharray": "2 3", class: "pulse" }, g);
      g.moveTo = function (px, py) { g.setAttribute("transform", "translate(" + px + " " + py + ")"); };
      g.moveTo(x, y);
      return g;
    };
    
    SK.drag = function (svg, handle, onMove, getPos, step) {
      step = step || 6;
      function toSvg(ev) {
        var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }
      var dragging = false;
      handle.addEventListener("pointerdown", function (ev) { dragging = true; handle.setPointerCapture(ev.pointerId); ev.preventDefault(); });
      handle.addEventListener("pointermove", function (ev) { if (!dragging) return; var p = toSvg(ev); onMove(p.x, p.y); });
      function end() { dragging = false; }
      handle.addEventListener("pointerup", end);
      handle.addEventListener("pointercancel", end);
      handle.addEventListener("keydown", function (ev) {
        if (!getPos) return;
        var p = getPos(), dx = 0, dy = 0;
        if (ev.key === "ArrowLeft") dx = -step; else if (ev.key === "ArrowRight") dx = step;
        else if (ev.key === "ArrowUp") dy = -step; else if (ev.key === "ArrowDown") dy = step; else return;
        ev.preventDefault(); ev.stopPropagation(); onMove(p[0] + dx, p[1] + dy);
      });
    };
    
    /* ---------- 步驟播放器 ---------- */
    SK.players = [];
    SK.StepPlayer = function (root, frames, onShow) {
      var self = this;
      this.i = 0; this.n = frames.length;
      var card = root.querySelector(".step-card");
      var dots = root.querySelector(".dots");
      var prev = root.querySelector(".prev"), next = root.querySelector(".next");
      var seen = {};
      frames.forEach(function (f, i) {
        var d = SK.h("button", { class: "dot", type: "button", "aria-label": "第 " + (i + 1) + " 步" });
        d.addEventListener("click", function () { self.go(i); });
        dots.appendChild(d);
      });
      this.go = function (i) {
        i = SK.clamp(i, 0, self.n - 1);
        self.i = i; seen[i] = true;
        var f = frames[i];
        
        var cardHtml = '<div class="step-anim">';
        cardHtml += '<div class="step-no">Step ' + (i + 1) + " / " + self.n + "</div>";
        cardHtml += '<p class="caption">' + SK.md(f.cap) + "</p>";
        if (f.tex) cardHtml += '<div class="formula">' + SK.tex(f.tex, true) + "</div>";
        cardHtml += '</div>';
        card.innerHTML = cardHtml;
        
        Array.prototype.forEach.call(dots.children, function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); d.classList.toggle("seen", !!seen[k]); });
        prev.disabled = i === 0;
        next.disabled = i === self.n - 1;
        next.innerHTML = i === self.n - 2 ? "最後一步 " + SK.icon("arrow") : "下一步 " + SK.icon("arrow");
        if (onShow) onShow(i);
      };
      prev.addEventListener("click", function () { self.go(self.i - 1); });
      next.addEventListener("click", function () { self.go(self.i + 1); });
      this.next = function () { if (self.i < self.n - 1) { self.go(self.i + 1); return true; } return false; };
      this.prev = function () { if (self.i > 0) { self.go(self.i - 1); return true; } return false; };
      SK.players.push(this);
    };
    
    SK.note = function (text, en) { 
        var n = '<div class="note">' + SK.icon("sparkle") + "<div>" + SK.md(text);
        if (en) n += "<small>" + en + "</small>";
        n += "</div></div>";
        return n;
    };
    
    var NOTES = {
      hook: ["「我沒有特別的天賦，我只是極度的好奇。」", "— 阿爾伯特·愛因斯坦 (Albert Einstein)"],
      guess: ["「任何未曾犯錯的人，一定不曾嘗試新事物。」", "— 阿爾伯特·愛因斯坦 (Albert Einstein)"],
      derive: ["「科學的真理不應在蒙滿灰塵的書報上找，而應在實驗中尋找。」", "— 伽利略 (Galileo Galilei)"],
      angles: ["「我們所知道的只是一滴水，我們不知道的是一個海洋。」", "— 艾薩克·牛頓 (Isaac Newton)"],
      challenge: ["「第一原則是不能欺騙自己，因為自己是最容易被欺騙的人。」", "— 理查·費曼 (Richard Feynman)"]
    };
    
    /* ---------- 頁首／頁尾 ---------- */
    SK.topbar = function (base, isUnit) {
      var bar = SK.h("header", { class: "topbar" });
      var hrefBase = (base === ".") ? "" : base; 
      var html = '<div class="wrap">';
      html += '<a class="brand" href="' + hrefBase + 'index.html">' + SK.icon("sprig") + "見微理畫</a><nav>";
      html += '<a class="nav-link" href="' + hrefBase + 'index.html#catalog">' + SK.icon("map") + '<span>目錄</span></a>';
      if (isUnit) {
          html += '<button class="nav-link teach-toggle" type="button" aria-pressed="false" title="投影用：一次顯示一段，鍵盤 ← → 逐步">' + SK.icon("teach") + "<span>上課模式</span></button>";
      }
      html += "</nav></div>";
      bar.innerHTML = html;
      return bar;
    };
    
    SK.footer = function () {
      var f = SK.h("footer", { class: "site-foot" });
      var html = '<div class="wrap"><div class="foot-row" aria-hidden="true">';
      html += [0, 1, 2, 3, 1, 0].map(function (k) { return SK.botanical(k); }).join("");
      html += "</div>";
      html += '<p class="latin-hand">See it, then understand it · A visual way to explore science</p>';
      html += "<p>內容依據 108 課綱國中自然科學領域整理；本網站圖文與動畫內容採用創用 CC 姓名標示-非商業性-相同方式分享 4.0 國際授權條款授權。</p></div>";
      f.innerHTML = html;
      return f;
    };
  
    var teach = { on: false, slides: [], idx: 0, hud: null };
    SK.teach = teach;
    
    function teachShow(i) {
        teach.idx = SK.clamp(i, 0, teach.slides.length - 1);
        teach.slides.forEach(function (s, k) { s.classList.toggle("slide-active", k === teach.idx); });
        teach.hud.querySelector(".pos").textContent = (teach.idx + 1) + " / " + teach.slides.length;
        window.scrollTo(0, 0);
    }
    
    function playerIn(slide) {
        for (var k = 0; k < SK.players.length; k++) if (slide.contains(SK.players[k].root)) return SK.players[k];
        return null;
    }
    
    function teachStep(dir) {
        var p = playerIn(teach.slides[teach.idx]);
        if (p && (dir > 0 ? p.next() : p.prev())) return;
        var ni = teach.idx + dir;
        if (ni < 0 || ni >= teach.slides.length) return;
        teachShow(ni);
        var np = playerIn(teach.slides[teach.idx]);
        if (np) np.go(dir > 0 ? 0 : np.n - 1);
    }
    
    function setTeach(on) {
        teach.on = on;
        document.body.classList.toggle("teach", on);
        var btn = document.querySelector(".teach-toggle");
        if (btn) btn.setAttribute("aria-pressed", on ? "true" : "false");
        if (on) {
            teach.slides = Array.prototype.slice.call(document.querySelectorAll(".unit-hero, .unit-sec"));
            teachShow(0);
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        } else {
            teach.slides.forEach(function (s) { s.classList.remove("slide-active"); });
        }
    }
    
    function initTeach() {
        var btn = document.querySelector(".teach-toggle");
        if (!btn) return;
        teach.hud = SK.h("div", { class: "teach-hud", role: "toolbar", "aria-label": "上課模式控制" });
        teach.hud.innerHTML = '<span class="pos"></span><button class="btn small ghost t-prev" type="button">' + SK.icon("arrowL") + '</button><button class="btn small t-next" type="button">' + SK.icon("arrow") + '</button><button class="btn small ghost t-exit" type="button">離開</button>';
        document.body.appendChild(teach.hud);
        teach.hud.querySelector(".t-prev").onclick = function () { teachStep(-1); };
        teach.hud.querySelector(".t-next").onclick = function () { teachStep(1); };
        teach.hud.querySelector(".t-exit").onclick = function () { setTeach(false); };
        btn.addEventListener("click", function () { setTeach(!teach.on); });
        document.addEventListener("keydown", function (ev) {
            if (!teach.on) return;
            var t = ev.target, tag = ((t && t.tagName) || "").toLowerCase();
            if (tag === "input" || (t && t.getAttribute && t.getAttribute("role") === "slider")) return;
            if (ev.key === "ArrowRight" || ev.key === "PageDown" || ev.key === " ") { ev.preventDefault(); teachStep(1); }
            else if (ev.key === "ArrowLeft" || ev.key === "PageUp") { ev.preventDefault(); teachStep(-1); }
            else if (ev.key === "Escape") setTeach(false);
        });
    }
  
    /* =========================================================
       mountUnit：嚴格比對 Slug 掛載單元頁
       ========================================================= */
    SK.mountUnit = function (cfg) {
      injectFilters();
      var cat = window.catalog || [];
      var meta = { title: "理化單元", book: "國中理化", slug: cfg.slug };
      var found = false;
  
      for(var i=0; i<cat.length; i++){
          for(var j=0; j<cat[i].chapters.length; j++){
              for(var k=0; k<cat[i].chapters[j].sections.length; k++){
                  if(cat[i].chapters[j].sections[k].id === cfg.slug || cat[i].chapters[j].sections[k].slug === cfg.slug){
                      meta.title = cat[i].chapters[j].sections[k].title;
                      meta.book = cat[i].book;
                      found = true;
                      break;
                  }
              }
              if(found) break;
          }
          if(found) break;
      }
  
      document.title = meta.title + "｜見微理畫";
      document.body.appendChild(SK.topbar("../", true));
      var main = SK.h("main", { class: "wrap", id: "main" });
      document.body.appendChild(main);
  
      var hero = SK.h("section", { class: "unit-hero" });
      var hHtml = '<div class="crumb"><a href="../index.html#catalog">單元總覽</a><span>›</span><span>' + meta.book + "</span></div>";
      hHtml += "<h1>" + meta.title + "</h1><p class=\"en-sub\">" + cfg.en + "</p>";
      if (cfg.formula) {
          hHtml += '<div class="hero-formula sk-frame">' + SK.tex(cfg.formula, true) + "</div>";
      }
      hHtml += '<div class="hero-deco">' + SK.bouquet() + "</div>";
      hero.innerHTML = hHtml;
      main.appendChild(hero);
  
      var steps = [
          ["01", "生活情境", "Context"], 
          ["02", "先猜猜看", "Make a Guess"], 
          ["03", "觀察推導", "Observation"], 
          ["04", "換個角度看", "Another Way"], 
          ["05", "延伸探究", "Go Further"], 
          ["06", "觀念定位", "Where It Lives"]
      ];
      
      function section(k, id) {
        var s = SK.h("section", { class: "unit-sec sk-card sk-frame", id: id });
        var secHtml = '<span class="corner-bot" aria-hidden="true">' + SK.botanical(k) + "</span>";
        secHtml += '<h2 class="sec-title"><span class="num">' + steps[k][0] + "</span>" + steps[k][1];
        secHtml += '<span class="en">/ ' + steps[k][2] + "</span></h2>";
        s.innerHTML = secHtml;
        main.appendChild(s);
        return s;
      }
  
      var s1 = section(0, "wonder");
      var hookBody = SK.h("div", { class: cfg.hook.visual ? "two-col" : "" });
      var hookHtml = '<p class="lead">' + SK.md(cfg.hook.html) + "</p>";
      if (cfg.hook.ask) {
          var bIcon = SK.icon("bulb").replace("<svg", '<svg style="width:22px;height:22px;vertical-align:-4px"');
          hookHtml += '<p class="hand" style="font-size:1.2rem">' + bIcon + " " + SK.md(cfg.hook.ask) + "</p>";
      }
      hookHtml += SK.note(NOTES.hook[0], NOTES.hook[1]);
      var hookText = SK.h("div", {}, hookHtml);
      hookBody.appendChild(hookText);
      if (cfg.hook.visual) { 
          var hv = SK.h("div", { class: "stage sk-frame dashed" }); 
          hookBody.appendChild(hv); 
          cfg.hook.visual(hv); 
      }
      s1.appendChild(hookBody);
  
      if (cfg.guess) {
        var s2 = section(1, "guess");
        var g = cfg.guess;
        var qEl = SK.h("div", {}, '<p class="q-text">' + SK.md(g.q) + "</p>");
        if (g.visual) { 
            var gv = SK.h("div", { class: "stage", style: "max-width:520px;margin:0 auto 16px" }); 
            qEl.appendChild(gv); 
            g.visual(gv); 
        }
        var opts = SK.h("div", { class: "opts", role: "group" });
        var explain = SK.h("div", { "aria-live": "polite" });
        var letters = "ABCD";
        g.options.forEach(function (o, i) {
          var bHtml = '<span class="letter">' + letters[i] + "</span>" + SK.md(o.t);
          bHtml += '<span class="tag t-truth">✓ 真相</span><span class="tag t-mine">你的判斷</span>';
          var b = SK.h("button", { class: "opt" + (o.truth ? " is-truth" : ""), type: "button" }, bHtml);
          b.addEventListener("click", function () {
            opts.classList.add("revealed");
            Array.prototype.forEach.call(opts.children, function (x, k) { 
                x.classList.toggle("truth", !!g.options[k].truth); 
                x.classList.toggle("chosen", k === i); 
            });
            var head = o.truth ? "✦ 邏輯正確！" : (o.common ? "✦ 很多人都會這樣誤解！" : "✦ 有趣的想法！");
            var exHtml = '<div class="explain"><h4>' + (o.head || head) + "</h4>" + SK.md(o.explain);
            exHtml += '<div class="mini"></div>';
            if (!o.truth) {
                exHtml += '<p class="muted" style="margin:10px 0 0;font-size:.92rem">點擊其他選項，比較不同變因的影響。</p>';
            }
            exHtml += "</div>";
            explain.innerHTML = exHtml;
            if (o.mini) o.mini(explain.querySelector(".mini"));
          });
          opts.appendChild(b);
        });
        qEl.appendChild(opts);
        var skip = SK.h("button", { class: "skip", type: "button" }, "先跳過，進入實驗觀察 ↓");
        skip.addEventListener("click", function () { document.getElementById("derive").scrollIntoView({ behavior: "smooth" }); });
        qEl.appendChild(skip); 
        qEl.appendChild(explain); 
        s2.appendChild(qEl);
        var gNote = SK.note(NOTES.guess[0], NOTES.guess[1]);
        s2.insertAdjacentHTML("beforeend", '<div style="margin-top:18px">' + gNote + "</div>");
      }
  
      if (cfg.derive) {
        var s3 = section(2, "derive");
        if (cfg.derive.intro) {
            s3.insertAdjacentHTML("beforeend", '<p class="lead">' + SK.md(cfg.derive.intro) + "</p>");
        }
        var pl = SK.h("div", { class: "player" });
        var pHtml = '<div class="stage sk-frame' + (cfg.derive.tall ? " tall" : "") + '"></div>';
        pHtml += '<div class="player-side"><div class="step-card" aria-live="polite"></div>';
        pHtml += '<div class="controls"><button class="btn small ghost prev" type="button">' + SK.icon("arrowL") + ' 上一步</button>';
        pHtml += '<div class="dots"></div><button class="btn small next" type="button">下一步 ' + SK.icon("arrow") + '</button></div>';
        pHtml += '<div class="sliders"></div><div class="extra"></div>';
        pHtml += '<p class="hint-line">' + SK.icon("sparkle") + SK.md(cfg.derive.hint || "拖動物理滑桿，觀察現象與數值的同步變化。") + "</p></div>";
        pl.innerHTML = pHtml;
        s3.appendChild(pl);
        
        var ctx = { stage: pl.querySelector(".stage"), sliders: pl.querySelector(".sliders"), extra: pl.querySelector(".extra"), frame: 0 };
        var api = cfg.derive.setup(ctx) || {};
        var player = new SK.StepPlayer(pl, cfg.derive.frames, function (i) { ctx.frame = i; if (api.show) api.show(i); });
        player.root = pl; 
        player.go(0);
        
        var dNote = SK.note(NOTES.derive[0], NOTES.derive[1]);
        s3.insertAdjacentHTML("beforeend", '<div style="margin-top:20px">' + dNote + "</div>");
      }
  
      if (cfg.angles && cfg.angles.length > 0) {
        var s4 = section(3, "angles");
        var angles = SK.h("div", { class: "angles" });
        cfg.angles.forEach(function (a) {
          var box = SK.h("div", { class: "angle sk-frame" });
          box.innerHTML = "<h3>" + SK.icon(a.icon || "bulb") + SK.md(a.title) + "</h3>" + (a.html ? "<div>" + SK.md(a.html) + "</div>" : "");
          var body = SK.h("div", {}); 
          box.appendChild(body);
          if (a.render) a.render(body);
          if (a.after) box.insertAdjacentHTML("beforeend", "<div>" + SK.md(a.after) + "</div>");
          angles.appendChild(box);
        });
        s4.appendChild(angles);
        var aNote = SK.note(NOTES.angles[0], NOTES.angles[1]);
        s4.insertAdjacentHTML("beforeend", '<div style="margin-top:20px">' + aNote + "</div>");
      }
  
      if (cfg.challenges && cfg.challenges.length > 0) {
        var s5 = section(4, "challenge");
        s5.insertAdjacentHTML("beforeend", '<p class="muted">從微觀到巨觀的延伸思考。卡住的話，可以點開提示尋找靈感。</p>');
        var chs = SK.h("div", { class: "challenges" });
        cfg.challenges.forEach(function (c, i) {
          var d = SK.h("div", { class: "challenge" });
          var lv = c.lv || ["觀念驗證", "變因探索", "深度推導"][Math.min(i, 2)];
          var dHtml = '<span class="lv">' + lv + "</span>";
          dHtml += '<p class="q">' + SK.md(c.q) + "</p>";
          if (c.hint) dHtml += "<details><summary>給我一點提示</summary><div>" + SK.md(c.hint) + "</div></details>";
          if (c.idea) dHtml += "<details><summary>看一種科學觀點（並非唯一解答）</summary><div>" + SK.md(c.idea) + "</div></details>";
          d.innerHTML = dHtml;
          chs.appendChild(d);
        });
        s5.appendChild(chs);
        var cNote = SK.note(NOTES.challenge[0], NOTES.challenge[1]);
        s5.insertAdjacentHTML("beforeend", '<div style="margin-top:20px">' + cNote + "</div>");
      }
  
      if (cfg.where) {
        var s6 = section(5, "where");
        var w = cfg.where;
        var wHtml = '<div class="where"><div class="where-box sk-frame"><h4>' + SK.icon("map") + "課綱對應</h4><ul>";
        wHtml += w.codes.map(function (c) { return '<li><span class="code">' + c[0] + "</span> " + SK.md(c[1]) + "</li>"; }).join("");
        wHtml += "</ul></div>";
        wHtml += '<div class="where-box sk-frame"><h4>' + SK.icon("star") + "會考重要性</h4><p>" + SK.md(w.exam) + "</p></div>";
        wHtml += '<div class="where-box stopline"><h4>' + SK.icon("stop") + "知識停止線：不需過度鑽牛角尖</h4><p>" + SK.md(w.stop) + "</p></div></div>";
        s6.insertAdjacentHTML("beforeend", wHtml);
      }
  
      var foot = SK.h("nav", { class: "unit-foot", "aria-label": "單元導覽" });
      foot.innerHTML = '<a class="btn" href="../index.html#catalog">回到章節目錄 ' + SK.icon("arrow") + "</a>";
      main.appendChild(foot);
  
      document.body.appendChild(SK.footer());
      initTeach();
  
      document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
      document.addEventListener('keydown', function(e) { if ((e.ctrlKey || e.metaKey) && e.key === 'c') e.preventDefault(); });
      document.addEventListener('copy', function(e) { e.preventDefault(); });
    };
  
    SK.injectFilters = injectFilters;
})();
