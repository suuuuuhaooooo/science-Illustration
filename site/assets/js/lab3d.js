/* 3D 實驗室（three.js／WebGL）：光學與電學的立體模擬。單元頁「動手做」下面多一個「3D 實驗室」區塊。
   物理都用正確的公式算，不是動畫特效：
   - 透鏡光學台：薄透鏡公式 1/p + 1/q = 1/f；紙屏上的像依「離清楚成像位置多遠」算出模糊程度。
   - 面鏡光學台：光線打在真正的球面上，用反射定律逐條追跡（邊緣光線會看到球面像差）；像的位置用面鏡公式。
   - 電流的磁效應：直導線 B = μ₀I／2πr；螺線管用必歐－沙伐定律把每一小段導線的磁場加起來；羅盤指向「電流磁場＋地磁」的合磁場。
   - 載流導線受力：F = I L × B，導線擺角 tanθ = F／mg。
   - 電磁感應：線圈每一匝的磁通量用磁偶極在軸上的公式積分，感應電動勢 ε = −N dΦ/dt。
   - 串聯／並聯電路：歐姆定律解電流，燈泡亮度依電功率，電子流動速度依電流大小（方向和電流相反）。
   用法：NB.lab3d.mount(容器, 單元代號)；沒有 WebGL 時顯示說明文字。 */
import * as THREE from "../vendor/three/three.module.min.js";

const TAU = Math.PI * 2, MU0 = 4e-7 * Math.PI;
const css = (n, d) => (getComputedStyle(document.documentElement).getPropertyValue(n) || d).trim() || d;
const fmt = (x, d = 2) => (Math.abs(x) >= 1e4 || (Math.abs(x) < 1e-2 && x !== 0) ? x.toExponential(d - 1).replace("e", "×10^").replace(/\^\+?(-?\d+)/, (m, e) => "^" + e) : (+x.toFixed(d)).toString());
const sup = (s) => String(s).replace(/\^(-?\d+)/g, (m, e) => e.split("").map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"["0123456789".indexOf(c)] || "⁻").join(""));
const nice = (x, d) => { const t = fmt(x, d), m = /^(-?[\d.]+)×10\^(-?\d+)$/.exec(t); return m ? "$" + m[1] + "\\times 10^{" + m[2] + "}$" : t; }; /* 科學記號交給 KaTeX 排版 */

/* ---------- 共用：場景、相機（拖曳旋轉、滾輪縮放）、標籤 ---------- */
function stage(box, opt) {
  const wrap = document.createElement("div"); wrap.className = "l3-wrap"; box.appendChild(wrap);
  const cv = document.createElement("canvas"); cv.className = "l3-cv"; cv.setAttribute("aria-label", opt.aria || "3D 模擬"); wrap.appendChild(cv);
  const lay = document.createElement("div"); lay.className = "l3-lab"; wrap.appendChild(lay);
  const hint = document.createElement("p"); hint.className = "meta l3-hint"; hint.textContent = "拖曳旋轉視角、滾輪或雙指縮放；下方調整條件。"; box.appendChild(hint);
  let R;
  try { R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch (e) { wrap.innerHTML = '<p class="meta">這台裝置無法顯示 3D 畫面（WebGL），請改用上面的「動手做」。</p>'; return null; }
  R.setPixelRatio(Math.min(2, devicePixelRatio || 1));
  const S = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 2000);
  S.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.1)); const dl = new THREE.DirectionalLight(0xffffff, 1.2); dl.position.set(30, 60, 40); S.add(dl);
  const T = opt.target ? new THREE.Vector3(...opt.target) : new THREE.Vector3();
  let az = opt.az ?? 0.35, el = opt.el ?? 0.38, dist = opt.dist ?? 80, dirty = true, labels = [], live = false, raf = 0, tick = null;
  function place() { cam.position.set(T.x + dist * Math.cos(el) * Math.sin(az), T.y + dist * Math.sin(el), T.z + dist * Math.cos(el) * Math.cos(az)); cam.lookAt(T); }
  function size() { const w = wrap.clientWidth || 600, h = Math.round(Math.min(520, Math.max(300, w * 0.56))); R.setSize(w, h, false); cv.style.height = h + "px"; cam.aspect = w / h; cam.updateProjectionMatrix(); dirty = true; }
  let drag = null;
  cv.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, az, el }; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener("pointermove", (e) => { if (!drag) return; az = drag.az - (e.clientX - drag.x) * 0.008; el = Math.max(-0.2, Math.min(1.45, drag.el + (e.clientY - drag.y) * 0.006)); dirty = true; });
  cv.addEventListener("pointerup", () => (drag = null)); cv.addEventListener("pointercancel", () => (drag = null));
  cv.addEventListener("wheel", (e) => { e.preventDefault(); dist = Math.max(opt.min || 20, Math.min(opt.max || 220, dist * (1 + Math.sign(e.deltaY) * 0.08))); dirty = true; }, { passive: false });
  let pinch = null; cv.addEventListener("touchmove", (e) => { if (e.touches.length !== 2) return; const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); if (pinch) { dist = Math.max(opt.min || 20, Math.min(opt.max || 220, dist * pinch / d)); dirty = true; } pinch = d; }, { passive: true });
  cv.addEventListener("touchend", () => (pinch = null));
  const v = new THREE.Vector3();
  function drawLabels() { const w = cv.clientWidth, h = cv.clientHeight; labels.forEach((L) => { v.copy(L.p).project(cam); const vis = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1; L.el.style.display = vis && L.on ? "" : "none"; if (vis) L.el.style.transform = "translate(" + ((v.x + 1) / 2 * w).toFixed(1) + "px," + ((1 - v.y) / 2 * h).toFixed(1) + "px) translate(-50%,-50%)"; }); }
  function frame(t) { raf = requestAnimationFrame(frame); if (tick && live) { if (tick(t) !== false) dirty = true; } if (!dirty) return; dirty = false; place(); R.render(S, cam); drawLabels(); }
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => { live = es[0].isIntersecting; }) : null; if (io) io.observe(wrap); else live = true;
  addEventListener("resize", size); size(); raf = requestAnimationFrame(frame);
  return {
    S, cam, R, wrap,
    redraw() { dirty = true; },
    loop(fn) { tick = fn; },
    label(text, p, cls) { const el = document.createElement("span"); el.className = "l3-t" + (cls ? " " + cls : ""); el.textContent = text; lay.appendChild(el); const L = { el, p: p.clone ? p.clone() : new THREE.Vector3(...p), on: true, set(t) { el.textContent = t; }, at(q) { L.p.set(...q); }, show(b) { L.on = b; } }; labels.push(L); return L; },
    clearLabels(tag) { labels = labels.filter((L) => { if (L.el.dataset.tag === tag) { L.el.remove(); return false; } return true; }); },
  };
}
const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.1, ...o });
function line(pts, color, o = {}) { const g = new THREE.BufferGeometry().setFromPoints(pts.map((p) => (p.isVector3 ? p : new THREE.Vector3(p[0], p[1], p[2] || 0)))); const m = o.dash ? new THREE.LineDashedMaterial({ color, dashSize: o.dash, gapSize: o.dash * 0.8, transparent: true, opacity: o.op ?? 0.9 }) : new THREE.LineBasicMaterial({ color, transparent: true, opacity: o.op ?? 1 }); const L = new THREE.Line(g, m); if (o.dash) L.computeLineDistances(); return L; }
function clearGroup(g) { while (g.children.length) { const c = g.children.pop(); c.traverse((x) => { if (x.geometry) x.geometry.dispose(); if (x.material) (Array.isArray(x.material) ? x.material : [x.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); }); }); } }
function arrow(dir, origin, len, color, hl = 0.25) { return new THREE.ArrowHelper(dir.clone().normalize(), origin, len, color, Math.min(len * 0.4, len * hl + 0.6), Math.min(len * 0.25, 0.9)); }
/* 控制列：滑桿、按鈕組 */
function controls(box) { const c = document.createElement("div"); c.className = "l3-ctl"; box.appendChild(c); return c; }
function slider(c, label, min, max, step, val, fmtv, on) {
  const w = document.createElement("label"); w.className = "l3-sl"; w.innerHTML = "<span></span><input type=range><b></b>"; const [sp, inp, b] = w.children; sp.textContent = label; inp.min = min; inp.max = max; inp.step = step; inp.value = val; inp.setAttribute("aria-label", label);
  const show = () => (b.textContent = fmtv(+inp.value)); inp.addEventListener("input", () => { show(); on(+inp.value); }); show(); c.appendChild(w); return { get: () => +inp.value, set(v) { inp.value = v; show(); } };
}
function choice(c, label, opts, val, on) {
  const w = document.createElement("div"); w.className = "l3-ch"; w.setAttribute("role", "group"); w.setAttribute("aria-label", label); const s = document.createElement("span"); s.textContent = label; w.appendChild(s);
  let cur = val; const bs = opts.map(([k, t]) => { const b = document.createElement("button"); b.type = "button"; b.className = "pen" + (k === val ? " go" : ""); b.textContent = t; b.onclick = () => { cur = k; bs.forEach((x, i) => x.classList.toggle("go", opts[i][0] === k)); on(k); }; w.appendChild(b); return b; });
  c.appendChild(w); return { get: () => cur };
}
function readout(box) { const r = document.createElement("div"); r.className = "eq l3-out"; box.appendChild(r); return (html) => (r.innerHTML = window.NB && NB.tx ? NB.tx(html) : html); }

/* ---------- 光學台（透鏡／面鏡） ---------- */
function bench(box, kind) {
  const isLens = kind === "lens", K = stage(box, { aria: isLens ? "3D 透鏡成像光學台" : "3D 面鏡成像光學台", dist: isLens ? 66 : 58, el: 0.2, az: isLens ? 0.5 : -0.55, target: [isLens ? 4 : -16, 1, 0] });
  if (!K) return;
  const { S } = K, G = new THREE.Group(), RAY = new THREE.Group(); S.add(G); S.add(RAY);
  /* 光具座 */
  const rail = new THREE.Mesh(new THREE.BoxGeometry(isLens ? 130 : 110, 0.8, 3), mat(0x8a8f98, { metalness: 0.5, roughness: 0.35 })); rail.position.set(isLens ? 0 : -45, -7.4, 0); S.add(rail);
  for (let x = -60; x <= 60; x += 10) { if (!isLens && x > 5) break; const tk = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 3.05), mat(0x222222)); tk.position.set(x, -6.95, 0); S.add(tk); }
  const axis = line([[-70, 0, 0], [isLens ? 70 : 10, 0, 0]], 0x7a8aa0, { dash: 1.2, op: 0.7 }); S.add(axis);
  const A = 6; /* 鏡片半徑（公分） */
  const st = { type: isLens ? "convex" : "concave", f: 10, p: 25, h: 3, s: 30 };
  const optic = new THREE.Group(); S.add(optic);
  const candle = (h, col) => { const g = new THREE.Group(); const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, Math.abs(h) * 0.82, 20), mat(col)); body.position.y = h * 0.41; g.add(body); const fl = new THREE.Mesh(new THREE.ConeGeometry(0.42, Math.abs(h) * 0.18, 16), mat(0xffb020, { emissive: 0xff8a00, emissiveIntensity: 0.9 })); fl.position.y = h * 0.91; if (h < 0) fl.rotation.z = Math.PI; g.add(fl); return g; };
  let obj = null, img = null;
  /* 紙屏（只有透鏡）：像用畫布畫，離清楚位置越遠越模糊 */
  let screen = null, sctx = null, stex = null;
  if (isLens) { const c = document.createElement("canvas"); c.width = 256; c.height = 256; sctx = c.getContext("2d"); stex = new THREE.CanvasTexture(c); stex.colorSpace = THREE.SRGBColorSpace; screen = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), new THREE.MeshBasicMaterial({ map: stex, side: THREE.DoubleSide })); screen.rotation.y = -Math.PI / 2; S.add(screen); const st2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 6.5, 0.6), mat(0x666666)); st2.position.y = -4; screen.add(st2); st2.rotation.y = Math.PI / 2; }
  const LF = K.label("F", [0, -1.6, 0], "l3-s"), LF2 = K.label("F", [0, -1.6, 0], "l3-s"), L2F = K.label("2F", [0, -1.6, 0], "l3-s"), LC = K.label("C", [0, -1.6, 0], "l3-s"), LIMG = K.label("像", [0, 0, 0], "l3-img");
  function buildOptic() {
    clearGroup(optic); const t = st.type;
    if (isLens) {
      const f = Math.abs(st.f), k = Math.min(2.4, 28 / f), pts = [];
      for (let i = 0; i <= 24; i++) { const r = (A * i) / 24, s = t === "convex" ? 0.35 + k * (1 - (r / A) ** 2) : 0.35 + k * 0.9 * (r / A) ** 2; pts.push(new THREE.Vector2(r, -s)); }
      for (let i = 24; i >= 0; i--) { const r = (A * i) / 24, s = t === "convex" ? 0.35 + k * (1 - (r / A) ** 2) : 0.35 + k * 0.9 * (r / A) ** 2; pts.push(new THREE.Vector2(r, s)); }
      const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), new THREE.MeshPhysicalMaterial({ color: 0xbfe6ff, transmission: 0.6, transparent: true, opacity: 0.55, roughness: 0.05, thickness: 1, side: THREE.DoubleSide })); m.rotation.z = -Math.PI / 2; optic.add(m);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(A, 0.22, 8, 48), mat(0x555a66, { metalness: 0.6 })); ring.rotation.y = Math.PI / 2; optic.add(ring);
    } else {
      const R = 2 * Math.abs(st.f), pts = [];
      for (let i = 0; i <= 24; i++) { const r = (A * i) / 24; const sag = t === "plane" ? 0 : t === "concave" ? -(R - Math.sqrt(R * R - r * r)) : R - Math.sqrt(R * R - r * r); pts.push(new THREE.Vector2(r, sag)); }
      const m = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), new THREE.MeshStandardMaterial({ color: 0xd8e9f4, metalness: 0.35, roughness: 0.2, emissive: 0x6d8aa0, emissiveIntensity: 0.35, side: THREE.DoubleSide })); m.rotation.z = -Math.PI / 2; optic.add(m);
      const back = new THREE.Mesh(new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p.x, p.y + 0.35)), 48), mat(0x4a4f5a, { side: THREE.DoubleSide })); back.rotation.z = -Math.PI / 2; optic.add(back);
    }
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 7 - A + 0.4, 12), mat(0x666666)); post.position.y = -A - (7 - A) / 2 + 0.2; optic.add(post);
  }
  /* 面鏡：光線和球面的交點、法線（真正的球面，不是近軸近似） */
  function sag(y) { const R = 2 * Math.abs(st.f); return st.type === "plane" ? 0 : st.type === "concave" ? -(R - Math.sqrt(R * R - y * y)) : R - Math.sqrt(R * R - y * y); }
  function hitMirror(o, d) {
    if (st.type === "plane") { const t = -o.x / d.x; return { p: o.clone().addScaledVector(d, t), n: new THREE.Vector3(-1, 0, 0) }; }
    const R = 2 * Math.abs(st.f), C = new THREE.Vector3(st.type === "concave" ? -R : R, 0, 0), oc = o.clone().sub(C), b = oc.dot(d), c = oc.lengthSq() - R * R, disc = b * b - c;
    if (disc < 0) return null; const s = Math.sqrt(disc), t1 = -b - s, t2 = -b + s;
    const P1 = o.clone().addScaledVector(d, t1), P2 = o.clone().addScaledVector(d, t2);
    const P = st.type === "concave" ? (P1.x > P2.x ? P1 : P2) : (P1.x < P2.x ? P1 : P2); /* 凹面鏡：靠近頂點的右半球；凸面鏡：左半球 */
    if (Math.hypot(P.y, P.z) > A + 1e-6) return null;
    return { p: P, n: P.clone().sub(C).normalize() };
  }
  function solve() { /* 近軸公式：透鏡 1/p+1/q=1/f（凹透鏡 f<0）；面鏡 1/p+1/q=1/f（凸面鏡 f<0、平面鏡 q=−p） */
    const f = st.type === "plane" ? Infinity : (st.type === "convex" && isLens) || st.type === "concave" && !isLens ? st.f : -st.f;
    if (!isFinite(f)) return { f, q: -st.p, m: 1 };
    const inv = 1 / f - 1 / st.p; if (Math.abs(inv) < 1e-9) return { f, q: Infinity, m: Infinity };
    const q = 1 / inv; return { f, q, m: -q / st.p };
  }
  const YEL = 0xffc23a, RED = 0xe0523a, BLU = 0x3a8fe0, GRN = 0x2fa37a;
  function rays(sol) {
    clearGroup(RAY); const T = new THREE.Vector3(-st.p, st.h, 0), far = 75;
    const imgP = isFinite(sol.q) ? new THREE.Vector3(isLens ? sol.q : -sol.q, sol.m * st.h, 0) : null;
    const fan = [];
    if (isLens) {
      const f = sol.f, yF = isFinite(f) && Math.abs(st.p - Math.abs(f)) > 1e-6 ? -st.h * (f > 0 ? f : f) / (st.p - f) : null;
      /* 三條主要光線：平行主軸、通過光心、通過（或指向）焦點；另外幾條細光線填滿鏡面 */
      fan.push([st.h, RED, 2]); fan.push([0, BLU, 2]); if (yF !== null && Math.abs(yF) < A) fan.push([yF, GRN, 2]);
      for (let k = -4; k <= 4; k++) fan.push([(k / 4) * (A - 0.3), YEL, 1]);
      fan.forEach(([y, col, w]) => {
        if (Math.abs(y) > A) return; const H = new THREE.Vector3(0, y, 0); RAY.add(line([T, H], col, { op: w > 1 ? 1 : 0.55 }));
        let dir; if (imgP && sol.q > 0) dir = imgP.clone().sub(H); else if (imgP) dir = H.clone().sub(imgP); else dir = new THREE.Vector3(st.p, -st.h, 0); /* 物在焦點上：出射光平行（方向同通過光心的光） */
        dir.normalize(); RAY.add(line([H, H.clone().addScaledVector(dir, far)], col, { op: w > 1 ? 1 : 0.55 }));
        if (imgP && sol.q < 0 && w > 1) RAY.add(line([H, imgP], col, { dash: 0.9, op: 0.65 })); /* 虛像：反向延長線 */
      });
    } else {
      const R = 2 * Math.abs(st.f), f = sol.f;
      const aim = []; aim.push([st.h, RED, 2]); aim.push([0, BLU, 2]); /* 平行主軸；射向鏡面頂點 */
      if (isFinite(f)) { const yF = -st.h * f / (st.p - f); if (Math.abs(st.p - f) > 1e-6 && Math.abs(yF) < A) aim.push([yF, GRN, 2]); }
      for (let k = -4; k <= 4; k++) aim.push([(k / 4) * (A - 0.3), YEL, 1]);
      aim.forEach(([y, col, w]) => {
        const target = new THREE.Vector3(sag(y), y, 0), d = target.clone().sub(T).normalize();
        if (y === st.h) d.set(1, 0, 0); /* 平行主軸的光線 */
        const hit = hitMirror(T, d); if (!hit) return;
        const r = d.clone().addScaledVector(hit.n, -2 * d.dot(hit.n)).normalize();
        RAY.add(line([T, hit.p], col, { op: w > 1 ? 1 : 0.55 })); RAY.add(line([hit.p, hit.p.clone().addScaledVector(r, far)], col, { op: w > 1 ? 1 : 0.55 }));
        if (imgP && sol.q < 0 && w > 1) RAY.add(line([hit.p, imgP], col, { dash: 0.9, op: 0.65 }));
      });
    }
  }
  function drawScreen(sol) {
    if (!isLens) return; screen.position.set(st.s, 0, 0);
    const c = sctx, W = 256; c.clearRect(0, 0, W, W); c.fillStyle = "#fbf8ef"; c.fillRect(0, 0, W, W); c.strokeStyle = "#c9c2ae"; c.lineWidth = 4; c.strokeRect(2, 2, W - 4, W - 4);
    if (sol.q > 0 && isFinite(sol.q)) {
      /* 模糊圈直徑 = 鏡片直徑 × |紙屏位置 − 像距| ÷ 像距（相似三角形） */
      const blurCm = (2 * A * Math.abs(st.s - sol.q)) / sol.q, px = W / 16, hh = sol.m * st.h * px, cx = W / 2, cy = W / 2;
      c.save(); c.filter = "blur(" + Math.min(40, blurCm * px * 0.5).toFixed(1) + "px)"; c.globalAlpha = Math.max(0.12, Math.min(1, 1 / (1 + blurCm * 0.6)));
      c.fillStyle = "#d9534f"; const w = Math.max(2, 1.1 * px * Math.abs(sol.m)); c.fillRect(cx - w / 2, cy - hh * 0.82, w, hh * 0.82);
      c.fillStyle = "#ffae1a"; c.beginPath(); c.ellipse(cx, cy - hh * 0.91, w * 0.45, Math.abs(hh) * 0.09 + 1, 0, 0, TAU); c.fill(); c.restore();
    }
    c.fillStyle = "#777"; c.font = "18px sans-serif"; c.fillText("紙屏", 12, 28); stex.needsUpdate = true;
  }
  function update() {
    buildOptic(); if (obj) S.remove(obj); obj = candle(st.h, 0xd9534f); obj.position.x = -st.p; S.add(obj);
    const sol = solve(); if (img) { S.remove(img); img = null; }
    const virt = sol.q < 0;
    if (isFinite(sol.q) && Math.abs(sol.m * st.h) < 40) { img = candle(sol.m * st.h, virt ? 0x9aa6b8 : 0xd9534f); img.traverse((x) => { if (x.material) { x.material.transparent = true; x.material.opacity = virt ? 0.45 : 0.85; } }); img.position.x = isLens ? sol.q : -sol.q; S.add(img); }
    LIMG.show(!!img); if (img) { LIMG.at([img.position.x, sol.m * st.h + (sol.m > 0 ? 1.6 : -1.6), 0]); LIMG.set(virt ? "虛像" : "實像"); }
    const f = Math.abs(st.f); LF.at([-f, -1.6, 0]); LF.show(st.type !== "plane"); LF2.at([isLens ? f : -f, -1.6, 0]); LF2.show(isLens);
    L2F.at([-2 * f, -1.6, 0]); L2F.show(isLens); LC.at([-2 * f, -1.6, 0]); LC.show(!isLens && st.type === "concave");
    if (!isLens && st.type === "convex") { LF.at([f, -1.6, 0]); }
    rays(sol); drawScreen(sol); out(sol); K.redraw();
  }
  const c = controls(box);
  if (isLens) choice(c, "透鏡", [["convex", "凸透鏡"], ["concave", "凹透鏡"]], st.type, (k) => { st.type = k; update(); });
  else choice(c, "面鏡", [["concave", "凹面鏡"], ["convex", "凸面鏡"], ["plane", "平面鏡"]], st.type, (k) => { st.type = k; update(); });
  slider(c, "物距 p", 3, 60, 0.5, st.p, (v) => v + " cm", (v) => { st.p = v; update(); });
  slider(c, "焦距 f", 5, 20, 0.5, st.f, (v) => v + " cm", (v) => { st.f = v; update(); });
  if (isLens) slider(c, "紙屏位置", 2, 65, 0.5, st.s, (v) => v + " cm", (v) => { st.s = v; drawScreen(solve()); out(solve()); K.redraw(); });
  const out = (() => { const R = readout(box); return (sol) => {
    const t = st.type, f = Math.abs(st.f);
    if (t === "plane") return R("平面鏡：像距 = 物距 = " + st.p + " cm（在鏡後），正立、等大、虛像，左右相反。");
    if (!isFinite(sol.q)) return R("物體正好在焦點上（p = f）：出射光互相平行，<b>不成像</b>。");
    const m = sol.m, kind = sol.q > 0 ? "實像" : "虛像", up = m > 0 ? "正立" : "倒立", big = Math.abs(m) > 1.001 ? "放大" : Math.abs(m) < 0.999 ? "縮小" : "等大";
    const where = isLens ? (sol.q > 0 ? "在透鏡另一側 " + fmt(sol.q, 1) + " cm" : "和物體同側，離透鏡 " + fmt(-sol.q, 1) + " cm") : (sol.q > 0 ? "在鏡前 " + fmt(sol.q, 1) + " cm" : "在鏡後 " + fmt(-sol.q, 1) + " cm");
    let s = "$\\frac{1}{p}+\\frac{1}{q}=\\frac{1}{f}$：p = " + st.p + " cm、f = " + (sol.f > 0 ? "" : "−") + f + " cm → q = " + fmt(sol.q, 1) + " cm，放大率 " + fmt(Math.abs(m), 2) + " 倍。<br><b>" + up + big + kind + "</b>，" + where + "。";
    if (isLens && sol.q > 0) s += Math.abs(st.s - sol.q) < 0.6 ? "<br>紙屏上的像<b>最清楚</b>！" : "<br>紙屏離清楚成像的位置差 " + fmt(Math.abs(st.s - sol.q), 1) + " cm，所以像是模糊的；慢慢移動紙屏找找看。";
    if (isLens && sol.q < 0) s += "<br>虛像不能用紙屏接到，要從紙屏這一側透過透鏡用眼睛看。";
    if (!isLens && t === "concave") s += "<br>細的黃色光線打在真正的球面上：靠近鏡緣的光線交點會稍微偏離，這就是「球面像差」。";
    R(s); }; })();
  update();
}

/* ---------- 電流的磁效應：直導線／螺線管 + 羅盤 ---------- */
function magField(box) {
  const K = stage(box, { aria: "3D 電流磁效應：導線與羅盤", dist: 70, el: 0.75, az: 0.2 }); if (!K) return;
  const { S } = K, st = { mode: "wire", I: 6, dir: 1, earth: true }, BE = 3.5e-5; /* 臺灣附近地磁水平分量約 $3.5\\times 10^{-5}$ T，指向北方（畫面 −z） */
  const table = new THREE.Mesh(new THREE.BoxGeometry(60, 1, 44), mat(0xe9dfc8, { roughness: 0.9 })); table.position.y = -0.6; S.add(table);
  K.label("北 N", [0, 0.2, -23.5], "l3-s");
  const WG = new THREE.Group(), FL = new THREE.Group(); S.add(WG); S.add(FL);
  /* 羅盤：格子點上的小磁針（紅色是 N 極） */
  const comp = [], step = 5;
  for (let x = -25; x <= 25; x += step) for (let z = -15; z <= 15; z += step) {
    const g = new THREE.Group(); g.position.set(x, 0.6, z);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.25, 24), mat(0xffffff, { transparent: true, opacity: 0.55 })); g.add(base);
    const nd = new THREE.Group(); const n1 = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.5, 10), mat(0xd84a3a)); n1.rotation.z = -Math.PI / 2; n1.position.x = 0.75; const n2 = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.5, 10), mat(0x3d4d63)); n2.rotation.z = Math.PI / 2; n2.position.x = -0.75; nd.add(n1, n2); nd.position.y = 0.35; g.add(nd);
    S.add(g); comp.push({ g, nd, x, z, ang: -Math.PI / 2 });
  }
  /* 螺線管：沿 x 軸，半徑 3 cm、長 14 cm、20 匝；用小線段做必歐－沙伐積分（單位：公分 → 公尺） */
  const SOL = { r: 3, L: 14, N: 20, segs: [] };
  (function () { const n = SOL.N * 24, pts = []; for (let i = 0; i <= n; i++) { const t = i / n, a = t * SOL.N * TAU; pts.push(new THREE.Vector3(-SOL.L / 2 + SOL.L * t, SOL.r * Math.sin(a) + SOL.r + 0.3, SOL.r * Math.cos(a))); } for (let i = 0; i < n; i++) SOL.segs.push([pts[i], pts[i + 1]]); SOL.pts = pts; })();
  const tmp = new THREE.Vector3(), dl = new THREE.Vector3(), rr = new THREE.Vector3();
  function B(p) { /* 回傳磁場（特斯拉），座標單位公分 */
    const out = new THREE.Vector3(), I = st.I * st.dir;
    if (st.mode === "wire") { /* 鉛直長直導線在原點，電流 +y 時磁場逆時針（從上往下看） */
      const rx = p.x, rz = p.z, r = Math.hypot(rx, rz) / 100; if (r < 0.004) return out; const b = (MU0 * I) / (TAU * r); out.set(-rz, 0, rx).normalize().multiplyScalar(b).multiplyScalar(-1); /* ŷ×r̂ = (r_z, 0, −r_x)/r */
      out.set(rz, 0, -rx).normalize().multiplyScalar(b); return out;
    }
    for (const [a, b2] of SOL.segs) { dl.subVectors(b2, a).multiplyScalar(0.01); tmp.addVectors(a, b2).multiplyScalar(0.5); rr.subVectors(p, tmp).multiplyScalar(0.01); const r3 = Math.pow(rr.length(), 3); if (r3 < 1e-12) continue; out.add(dl.clone().cross(rr).multiplyScalar((MU0 * I) / (4 * Math.PI * r3))); }
    return out;
  }
  function build() {
    clearGroup(WG); clearGroup(FL); const red = 0xd84a3a;
    if (st.mode === "wire") {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 30, 16), mat(0xc77b30, { metalness: 0.7, roughness: 0.3 })); w.position.y = 10; WG.add(w);
      WG.add(arrow(new THREE.Vector3(0, st.dir, 0), new THREE.Vector3(0, st.dir > 0 ? 18 : 24, 0), 5, red));
      /* 磁力線：同心圓（越外面越疏：半徑依 1/B 等差） */
      [3, 6, 10, 15].forEach((r) => { const pts = []; for (let i = 0; i <= 64; i++) { const a = (i / 64) * TAU; pts.push(new THREE.Vector3(r * Math.cos(a), 1.2, r * Math.sin(a))); } FL.add(line(pts, 0x3a8fe0, { op: 0.8 })); const p = new THREE.Vector3(r, 1.2, 0), d = B(p).normalize(); FL.add(arrow(d, p, 1.6, 0x3a8fe0, 0.6)); });
    } else {
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(SOL.pts), SOL.N * 24, 0.22, 6, false), mat(0xc77b30, { metalness: 0.7, roughness: 0.3 })); WG.add(tube);
      const core = new THREE.Mesh(new THREE.CylinderGeometry(SOL.r - 0.4, SOL.r - 0.4, SOL.L, 24, 1, true), mat(0xf3efe6, { transparent: true, opacity: 0.35, side: THREE.DoubleSide })); core.rotation.z = Math.PI / 2; core.position.y = SOL.r + 0.3; WG.add(core);
      /* 從管內往兩端追磁力線（水平面 y = 管軸高度） */
      const y0 = SOL.r + 0.3;
      [-2.2, -1.1, 0, 1.1, 2.2].forEach((z0) => { [1, -1].forEach((sg) => { const pts = []; const p = new THREE.Vector3(0, y0, z0); for (let i = 0; i < 520; i++) { pts.push(p.clone()); const b = B(p); if (b.lengthSq() < 1e-16) break; p.addScaledVector(b.normalize(), 0.35 * sg); if (Math.abs(p.x) > 29 || Math.abs(p.z) > 21) break; if (i > 30 && p.distanceTo(pts[0]) < 0.5) break; } FL.add(line(pts, 0x3a8fe0, { op: 0.75 })); }); });
      const bE = B(new THREE.Vector3(SOL.L / 2 + 2, y0, 0)).x > 0; /* 右端磁場往外 → 右端是 N 極 */
      LN.at([bE ? SOL.L / 2 + 3.5 : -SOL.L / 2 - 3.5, y0 + 4, 0]); LS.at([bE ? -SOL.L / 2 - 3.5 : SOL.L / 2 + 3.5, y0 + 4, 0]);
      const a0 = SOL.pts[12], a1 = SOL.pts[13]; WG.add(arrow(a1.clone().sub(a0).multiplyScalar(st.dir), a0.clone().add(new THREE.Vector3(0, 0.8, 0)), 2.6, red, 0.5));
    }
    LN.show(st.mode === "sol"); LS.show(st.mode === "sol"); WG.position.y = 0; K.redraw();
  }
  const LN = K.label("N", [0, 0, 0], "l3-n"), LS = K.label("S", [0, 0, 0], "l3-sp");
  let tAnim = 0;
  function target(c) { const b = B(new THREE.Vector3(c.x, st.mode === "sol" ? SOL.r + 0.3 : 0.9, c.z)); if (st.earth) b.z -= BE; const h = Math.hypot(b.x, b.z); return h < 1e-12 ? c.ang : Math.atan2(-b.z, b.x); }
  K.loop((t) => { let mv = false; comp.forEach((c) => { if (st.mode === "sol" && Math.abs(c.z) < SOL.r + 0.5 && Math.abs(c.x) < SOL.L / 2 + 1) { c.g.visible = false; return; } c.g.visible = !(st.mode === "wire" && c.x === 0 && c.z === 0); const a = target(c); let d = a - c.ang; d = Math.atan2(Math.sin(d), Math.cos(d)); if (Math.abs(d) > 1e-3) { c.ang += d * 0.12; mv = true; } c.nd.rotation.y = c.ang; }); return mv || tAnim++ < 2; });
  const c = controls(box);
  choice(c, "導線", [["wire", "長直導線"], ["sol", "螺線管"]], st.mode, (k) => { st.mode = k; build(); out(); });
  slider(c, "電流 I", 0, 10, 0.5, st.I, (v) => v + " A", (v) => { st.I = v; build(); out(); });
  choice(c, "電流方向", [[1, st.mode === "wire" ? "向上 / 正向" : "正向"], [-1, "反向"]], 1, (k) => { st.dir = k; build(); out(); });
  choice(c, "地磁", [[true, "考慮地磁"], [false, "忽略地磁"]], true, (k) => { st.earth = k; out(); });
  const R = readout(box);
  function out() {
    const p5 = new THREE.Vector3(5, st.mode === "sol" ? SOL.r + 0.3 : 0.9, 0), b5 = B(p5).length(), bc = st.mode === "sol" ? B(new THREE.Vector3(0, SOL.r + 0.3, 0)).length() : 0;
    let s = st.mode === "wire" ? "長直導線：$B=\\frac{\\mu_0 I}{2\\pi r}$。離導線 5 cm 處 B = " + nice(b5, 2) + " T；地磁水平分量約 $3.5\\times 10^{-5}$ T。<br>電流越大、離導線越近，羅盤偏得越明顯；右手大拇指指電流方向，四指彎曲的方向就是磁場方向。"
      : "螺線管（20 匝、長 14 cm）：管內中心 B = " + nice(bc, 2) + " T（理想長螺線管 $B=\\mu_0 n I$ = " + nice(MU0 * (SOL.N / 0.14) * st.I, 2) + " T）。<br>右手四指順著電流方向握住螺線管，大拇指指的那一端是 N 極。";
    if (st.I === 0) s = "沒有電流時，羅盤只受地磁影響，全部指向北方。"; R(s);
  }
  build(); out();
}

/* ---------- 載流導線在磁場中受力 ---------- */
function wireForce(box) {
  const K = stage(box, { aria: "3D 載流導線在磁場中受力", dist: 42, el: 0.3, az: 0.75, target: [0, 3.5, 0] }); if (!K) return;
  const { S } = K, st = { I: 3, flip: 1 }, Bm = 0.12, Lw = 0.06, mkg = 0.008, g = 9.8, Lh = 10; /* 磁場 0.12 T、導線在磁場中的長度 6 cm、質量 8 g、懸線長 10 cm */
  const mag = new THREE.Group(); S.add(mag);
  function horseshoe() { clearGroup(mag); const nCol = 0xd84a3a, sCol = 0x3d6fb0; const top = st.flip > 0 ? nCol : sCol, bot = st.flip > 0 ? sCol : nCol;
    const a = new THREE.Mesh(new THREE.BoxGeometry(8, 3, 9), mat(top)); a.position.set(0, 8.5, 0); const b = new THREE.Mesh(new THREE.BoxGeometry(8, 3, 9), mat(bot)); b.position.set(0, -2.5, 0); const back = new THREE.Mesh(new THREE.BoxGeometry(8, 14, 2), mat(0x8c8c8c)); back.position.set(0, 3, -5.5); mag.add(a, b, back);
    LT.set(st.flip > 0 ? "N" : "S"); LB.set(st.flip > 0 ? "S" : "N"); }
  const LT = K.label("N", [0, 11, 3], "l3-n"), LB = K.label("S", [0, -5, 3], "l3-sp");
  const sw = new THREE.Group(); sw.position.set(0, 3 + Lh, 0); S.add(sw); /* 擺動支點在上方 */
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 14, 12), mat(0xc77b30, { metalness: 0.7, roughness: 0.3 })); rod.rotation.x = Math.PI / 2; rod.position.y = -Lh; sw.add(rod);
  [-7, 7].forEach((z) => { const h = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, Lh, 6), mat(0x333333)); h.position.set(0, -Lh / 2, z); sw.add(h); });
  const AR = new THREE.Group(); S.add(AR);
  let ang = 0, tgt = 0;
  function calc() { /* F = I L × B；電流沿 +z（st.I>0），磁場由上（N）往下（S）＝ −y 方向（flip 反過來） */
    const I = new THREE.Vector3(0, 0, Math.sign(st.I) || 1), B = new THREE.Vector3(0, -st.flip, 0), F = I.clone().cross(B).multiplyScalar(Math.abs(st.I) * Lw * Bm);
    return { F, Fm: F.length(), dir: Math.sign(F.x), I, B };
  }
  function arrows() { clearGroup(AR); const r = calc(); const p = new THREE.Vector3(Math.sin(ang) * Lh, 3 + Lh - Math.cos(ang) * Lh, 0);
    if (st.I !== 0) { AR.add(arrow(r.I, p.clone().add(new THREE.Vector3(0, 0, -9)), 4, 0xe0523a)); AR.add(arrow(r.F, p.clone().add(new THREE.Vector3(0, 0, 0)), 3 + r.Fm * 120, 0x2fa37a)); }
    AR.add(arrow(r.B, new THREE.Vector3(-3, 6.5, 2.5), 6, 0x3a8fe0)); LI.at([p.x, p.y + 0.5, -11.5]); LF.at([p.x + r.dir * (4 + r.Fm * 120), p.y + 1.5, 0]); LI.show(st.I !== 0); LF.show(st.I !== 0); }
  const LI = K.label("I", [0, 0, 0], "l3-i"), LF = K.label("F", [0, 0, 0], "l3-f"); K.label("B", [-3, 3.2, 2.5], "l3-b");
  function update() { const r = calc(); tgt = r.dir * Math.atan(r.Fm / (mkg * g)); horseshoe(); out(r); K.redraw(); }
  K.loop(() => { const d = tgt - ang; if (Math.abs(d) < 1e-4) return false; ang += d * 0.08; sw.rotation.z = ang; arrows(); });
  const c = controls(box);
  slider(c, "電流 I", -5, 5, 0.5, st.I, (v) => (v > 0 ? "+" : "") + v + " A", (v) => { st.I = v; update(); });
  choice(c, "磁鐵", [[1, "上 N 下 S"], [-1, "上 S 下 N"]], 1, (k) => { st.flip = k; update(); });
  const R = readout(box);
  function out(r) { R(st.I === 0 ? "沒有電流，導線不受磁力。" : "$F = I L B$ = " + Math.abs(st.I) + " A × 0.06 m × 0.12 T = " + fmt(r.Fm, 3) + " N；導線重量 mg = 0.078 N，擺角 θ = tan⁻¹(F/mg) ≈ " + fmt(Math.abs(Math.atan(r.Fm / (mkg * g))) * 180 / Math.PI, 1) + "°。<br>電流（紅）、磁場（藍）、受力（綠）三者互相垂直：把電流或磁鐵任一個反過來，受力方向就反過來；兩個都反過來，方向不變。"); }
  update(); arrows();
}

/* ---------- 電磁感應：磁鐵穿過線圈 ---------- */
function induction(box) {
  const K = stage(box, { aria: "3D 電磁感應：磁鐵與線圈", dist: 46, el: 0.28, az: 0.35, target: [0, -2, 0] }); if (!K) return;
  const { S } = K, a = 2.5, N = 40, Lc = 6, Rc = 2, m0 = 1.2; /* 線圈半徑 2.5 cm、40 匝、長 6 cm、電阻 2 Ω；磁鐵磁矩 1.2 A·m² */
  const st = { auto: true, speed: 1, x: -22, v: 0, flip: 1, hist: [] };
  const pts = []; for (let i = 0; i <= N * 32; i++) { const t = i / (N * 32), q = t * N * TAU; pts.push(new THREE.Vector3(-Lc / 2 + Lc * t, a * Math.sin(q), a * Math.cos(q))); }
  S.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), N * 32, 0.14, 6), mat(0xc77b30, { metalness: 0.7, roughness: 0.3 })));
  const mag = new THREE.Group(); const mN = new THREE.Mesh(new THREE.BoxGeometry(4, 1.6, 1.6), mat(0xd84a3a)), mS = new THREE.Mesh(new THREE.BoxGeometry(4, 1.6, 1.6), mat(0x3d6fb0)); mN.position.x = 2; mS.position.x = -2; mag.add(mN, mS); S.add(mag);
  const LN = K.label("N", [0, 0, 0], "l3-n"), LS = K.label("S", [0, 0, 0], "l3-sp"), LE = K.label("", [0, 0, 0], "l3-f");
  /* 檢流計 */
  const gal = new THREE.Group(); gal.position.set(0, -9, 6); S.add(gal);
  const face = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.6, 40), mat(0xf7f3e8)); face.rotation.x = Math.PI / 2; gal.add(face);
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.2, 0.2), mat(0xd84a3a)); needle.geometry.translate(0, 2.1, 0); needle.position.z = 0.45; gal.add(needle);
  for (let k = -4; k <= 4; k++) { const tk = new THREE.Mesh(new THREE.BoxGeometry(0.12, k ? 0.6 : 1, 0.1), mat(0x333333)); const q = (k / 4) * 1.1; tk.position.set(Math.sin(q) * 4.3, Math.cos(q) * 4.3, 0.4); tk.rotation.z = -q; gal.add(tk); }
  [[-Lc / 2, 1], [Lc / 2, -1]].forEach(([x]) => S.add(line([[x, -a, 0], [x, -6, 0], [0, -6, 6]], 0x8a5a2b)));
  const IA = new THREE.Group(); S.add(IA);
  function flux(xm) { /* 每一匝：磁偶極在軸上距離 z 的磁通量 Φ = μ₀ m a² / 2(a²+z²)^{3/2}（單位公尺）；N 極朝 +x 時 m 為正 */
    let F = 0; const A = a / 100; for (let i = 0; i < N; i++) { const xl = (-Lc / 2 + (Lc * (i + 0.5)) / N) / 100, z = xl - xm / 100; F += (MU0 * m0 * st.flip * A * A) / (2 * Math.pow(A * A + z * z, 1.5)); } return F; }
  let last = null, emf = 0, t0 = null, R;
  K.loop((t) => {
    if (t0 === null) t0 = t; const dt = Math.min(0.05, (t - (last ? last.t : t)) / 1000 || 0.016);
    if (st.auto) { const w = 0.9 * st.speed; st.x = -14 * Math.cos(((t - t0) / 1000) * w); }
    mag.position.x = st.x; LN.at([st.x + st.flip * 3.5, 2.2, 0]); LS.at([st.x - st.flip * 3.5, 2.2, 0]);
    const F = flux(st.x); if (last && dt > 0) { const e = -(F - last.F) / dt; emf = emf * 0.6 + e * 0.4; } last = { F, t };
    const I = emf / Rc; needle.rotation.z = -Math.max(-1.15, Math.min(1.15, I * 250));
    st.hist.push(emf); if (st.hist.length > 240) st.hist.shift(); drawPlot();
    clearGroup(IA); if (Math.abs(emf) > 2e-5) { const s = Math.sign(emf); for (let k = 0; k < 3; k++) { const q = k * TAU / 3, p = new THREE.Vector3(Lc / 2 + 0.6, a * Math.sin(q), a * Math.cos(q)), tdir = new THREE.Vector3(0, -Math.cos(q), Math.sin(q)).multiplyScalar(s); /* 右手：電動勢為正 → 電流的磁場沿 +x */ IA.add(arrow(tdir, p, 1.8, 0x2fa37a, 0.5)); } }
    const nEnd = emf > 2e-5 ? "右" : emf < -2e-5 ? "左" : ""; /* ε>0：感應電流的磁場沿 +x，磁力線從右端出來 → 右端是 N 極（冷次定律） */
    LE.at([0, a + 3.2, 0]); LE.set(nEnd ? "線圈" + nEnd + "端變成 N 極" : ""); LE.show(!!nEnd);
    if (!st.auto) { /* 手動：時間不動就沒有變化 */ }
    if ((t | 0) % 6 === 0) out(I);
  });
  const pc = document.createElement("canvas"); pc.className = "l3-plot"; pc.width = 640; pc.height = 120; box.appendChild(pc); const g = pc.getContext("2d");
  function drawPlot() { const W = pc.width, H = pc.height; g.clearRect(0, 0, W, H); g.strokeStyle = "#999"; g.beginPath(); g.moveTo(0, H / 2); g.lineTo(W, H / 2); g.stroke(); g.strokeStyle = "#2fa37a"; g.lineWidth = 2; g.beginPath(); const mx = Math.max(1e-4, ...st.hist.map(Math.abs)); st.hist.forEach((e, i) => { const x = (i / 240) * W, y = H / 2 - (e / mx) * (H / 2 - 6); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); g.fillStyle = "#777"; g.font = "13px sans-serif"; g.fillText("感應電動勢 ε（隨時間）", 8, 16); }
  const c = controls(box);
  choice(c, "移動", [[true, "自動進出"], [false, "用滑桿拖"]], true, (k) => { st.auto = k; });
  slider(c, "速度", 0.2, 3, 0.1, st.speed, (v) => v + " 倍", (v) => (st.speed = v));
  const pos = slider(c, "磁鐵位置", -22, 22, 0.2, st.x, (v) => v + " cm", (v) => { st.auto = false; st.x = v; });
  choice(c, "磁鐵", [[1, "N 極朝右"], [-1, "N 極朝左"]], 1, (k) => (st.flip = k));
  R = readout(box);
  let lastOut = 0;
  function out(I) { const now = performance.now(); if (now - lastOut < 250) return; lastOut = now; pos.set(st.x.toFixed(1));
    R("感應電動勢 $\\varepsilon = -N\\frac{\\Delta \\Phi}{\\Delta t}$ ≈ " + nice(emf, 2) + " V，電流 ≈ " + nice(I * 1000, 2) + " mA（線圈 40 匝、電阻 2 Ω）。<br>磁鐵越快、匝數越多，電流越大；磁鐵停住時穿過線圈的磁通量不變，就沒有感應電流。感應電流產生的磁場總是<b>阻止</b>磁通量的變化（冷次定律）：磁鐵靠近時互相排斥，離開時互相吸引。"); }
}

/* ---------- 串聯／並聯電路 ---------- */
function circuit(box) {
  const K = stage(box, { aria: "3D 串聯與並聯電路", dist: 56, el: 0.7, az: 0.15, target: [0, 0, 1] }); if (!K) return;
  const { S } = K, st = { mode: "series", cells: 2, Rb: 6, broken: false }, W = new THREE.Group(), E = new THREE.Group(); S.add(W); S.add(E);
  const board = new THREE.Mesh(new THREE.BoxGeometry(56, 1, 38), mat(0xd7c9a6, { roughness: 0.9 })); board.position.y = -0.8; S.add(board);
  const bulbs = []; let paths = [], dots = [];
  function bulb(p, name) { const g = new THREE.Group(); g.position.copy(p); const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 1.4, 16), mat(0x8c8c8c, { metalness: 0.7 })); base.position.y = 0.7; const glass = new THREE.Mesh(new THREE.SphereGeometry(1.7, 24, 16), new THREE.MeshStandardMaterial({ color: 0xfff6d8, emissive: 0xffc94a, emissiveIntensity: 0, transparent: true, opacity: 0.85 })); glass.position.y = 2.9; const light = new THREE.PointLight(0xffd36a, 0, 30); light.position.y = 3; g.add(base, glass, light); W.add(g); const L = K.label(name, [p.x, p.y + 6, p.z], "l3-s"); return { g, glass, light, L }; }
  function wire(pts) { const v = pts.map((p) => new THREE.Vector3(p[0], 0.3, p[1])); for (let i = 0; i < v.length - 1; i++) { const a = v[i], b = v[i + 1], len = a.distanceTo(b), m = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, len, 8), mat(0xb5652b, { metalness: 0.6 })); m.position.copy(a).add(b).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); W.add(m); } return v; }
  function battery() { for (let i = 0; i < st.cells; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 5, 20), mat(i % 2 ? 0x2b2b2b : 0x3a3a3a)); b.rotation.x = Math.PI / 2; b.position.set(-22, 1.4, -6 + i * 5.2 - (st.cells - 1) * 2.6 + 6); const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.6, 12), mat(0xcfa64a, { metalness: 0.8 })); cap.rotation.x = Math.PI / 2; cap.position.set(-22, 1.4, b.position.z - 2.8); W.add(b, cap); } }
  const labels = [];
  function build() {
    clearGroup(W); clearGroup(E); bulbs.forEach((b) => b.L.show(false)); bulbs.length = 0; labels.forEach((l) => l.show(false)); battery(); paths = [];
    /* 電流方向：從電池正極（−z 端）出發。路徑寫成 xz 平面上的折線 */
    if (st.mode === "series") {
      const p = wire([[-22, -12], [-22, -15], [-6, -15], [6, -15], [22, -15], [22, 15], [-22, 15], [-22, 12]]);
      bulbs.push(bulb(new THREE.Vector3(-6, 0, -15), "燈泡甲"), bulb(new THREE.Vector3(22, 0, 0), "燈泡乙"));
      paths.push({ pts: p, branch: "all" });
    } else {
      const top = wire([[-22, -12], [-22, -15], [22, -15], [22, 15], [-22, 15], [-22, 12]]);
      const mid = wire([[-10, -15], [-10, 15]]);
      bulbs.push(bulb(new THREE.Vector3(-10, 0, 0), "燈泡甲"), bulb(new THREE.Vector3(22, 0, 0), "燈泡乙"));
      paths.push({ pts: [top[0], top[1], new THREE.Vector3(-10, 0.3, -15)], branch: "all" }, { pts: [new THREE.Vector3(-10, 0.3, -15), new THREE.Vector3(-10, 0.3, 15)], branch: "A" }, { pts: [new THREE.Vector3(-10, 0.3, -15), top[2], top[3], new THREE.Vector3(-10, 0.3, 15)], branch: "B" }, { pts: [new THREE.Vector3(-10, 0.3, 15), top[4], top[5]], branch: "all" });
      void mid;
    }
    if (st.broken) { const b = bulbs[1]; b.glass.material.color.set(0x777777); b.L.set("燈泡乙（燒斷）"); }
    dots = []; paths.forEach((P, k) => { const segs = []; let tot = 0; for (let i = 0; i < P.pts.length - 1; i++) { const l = P.pts[i].distanceTo(P.pts[i + 1]); segs.push(l); tot += l; } P.len = tot; P.segs = segs; const n = Math.max(2, Math.round(tot / 3)); for (let i = 0; i < n; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 6), mat(0x3a8fe0, { emissive: 0x1a4f90, emissiveIntensity: 0.6 })); E.add(d); dots.push({ d, P, s: (i / n) * tot }); } });
    calc(); K.redraw();
  }
  let cur = {};
  function calc() { const V = 1.5 * st.cells, R = st.Rb;
    if (st.mode === "series") { const I = st.broken ? 0 : V / (2 * R); cur = { all: I, A: I, B: I, VA: I * R, VB: I * R, V }; }
    else { const IA = V / R, IB = st.broken ? 0 : V / R; cur = { all: IA + IB, A: IA, B: IB, VA: V, VB: st.broken ? V : V, V }; }
    const Pmax = (1.5 * 3) ** 2 / st.Rb; [["A", 0], ["B", 1]].forEach(([k, i]) => { const P = cur[k] * cur[k] * R, b = bulbs[i], x = Math.min(1, P / Pmax); b.glass.material.emissiveIntensity = st.broken && i === 1 ? 0 : 0.15 + 2.2 * x; b.light.intensity = st.broken && i === 1 ? 0 : 60 * x; if (!(st.broken && i === 1)) b.L.set((i ? "燈泡乙" : "燈泡甲") + " " + fmt(cur[k], 2) + " A"); });
    out(); }
  function posOn(P, s) { let r = ((s % P.len) + P.len) % P.len; for (let i = 0; i < P.segs.length; i++) { if (r <= P.segs[i]) return P.pts[i].clone().lerp(P.pts[i + 1], r / P.segs[i]); r -= P.segs[i]; } return P.pts[P.pts.length - 1].clone(); }
  K.loop(() => { dots.forEach((o) => { const I = cur[o.P.branch] || 0; o.s -= I * 0.9; /* 電子流動方向和電流相反 */ o.d.position.copy(posOn(o.P, o.s)); o.d.visible = I > 1e-9 || true; }); });
  const c = controls(box);
  choice(c, "接法", [["series", "串聯"], ["parallel", "並聯"]], st.mode, (k) => { st.mode = k; build(); });
  slider(c, "電池（1.5 V）", 1, 3, 1, st.cells, (v) => v + " 個（" + (1.5 * v) + " V）", (v) => { st.cells = v; build(); });
  choice(c, "燈泡乙", [[false, "正常"], [true, "燒斷"]], false, (k) => { st.broken = k; build(); });
  const R = readout(box);
  function out() { const s = st.mode === "series" ? "串聯：總電阻 = 6 + 6 = 12 Ω，電流處處相等 I = V/R = " + fmt(cur.V, 1) + "/12 = " + fmt(cur.A, 3) + " A；每顆燈泡分到 " + fmt(cur.VA, 2) + " V。" : "並聯：每顆燈泡兩端都是 " + fmt(cur.V, 1) + " V，各自的電流 = V/6；總電流 = " + fmt(cur.all, 3) + " A（各支路相加）。";
    R(s + (st.broken ? (st.mode === "series" ? "<br>燈泡乙燒斷 → 整個電路斷路，兩顆都不亮。" : "<br>燈泡乙燒斷 → 只有乙那條支路斷掉，甲照常發亮、亮度不變。") : "") + "<br>藍色小點是電子，移動方向和電流方向相反；跑得越快表示電流越大。燈泡亮度依電功率 P = I²R（這裡把燈絲電阻當成固定 6 Ω）。"); }
  build();
}

const LABS = { "v3-4.2": (b) => bench(b, "mirror"), "v3-4.3": (b) => bench(b, "lens"), "v3-4.4": (b) => bench(b, "lens"), "v5-4.2": circuit, "v5-4.4": circuit, "v6-2.2": magField, "v6-2.3": wireForce, "v6-2.4": induction };
window.NB = window.NB || {};
NB.lab3d = { ids: Object.keys(LABS), mount(box, id) { const f = LABS[id]; if (f) f(box); } };
