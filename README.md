# 見微理畫（國中理化）

國中理化（第三～六冊，共 70 節）的手繪圖解與模擬實驗網站，和「數光島筆記本」（國小數學）同系列、同一套架構。
純 HTML／CSS／JavaScript，放上 GitHub Pages 即可（網址：`https://suuuuuhaooooo.github.io/science-illustration/`）。

## 結構
- `index.html`：導覽頁
- `site/island.html`：見微群島（3D 單元目錄，three.js）；瀏覽器不支援 WebGL 時自動改成清單
- `site/unit.html`：所有單元共用的頁面，用 `unit.html?u=v3-4.2` 載入對應檔案
- `site/assets/js/catalog.js`：目錄（四冊、每章一行）；`READY` 列出已完成的冊別（目前四冊都完成；新增一冊時才需要改）
- `site/assets/js/core.js`：手繪 SVG 工具、主題、單元樣板（情境 → 動手做 → 原理 → 挑戰）、學習軌跡
- `site/assets/js/labkit.js`：實驗器材工具箱（燒杯、量筒、溫度計、酒精燈、光線、座標圖、紀錄表、粒子、原子球、聲音）
- `site/assets/js/isle3d.js`：群島 3D 引擎（和數光島共用，島與領域由資料決定）
- `site/assets/data/learning-map.js`：群島資料（主題島、領域、小節之間的先備關係）
- `site/units/`：每個小節一個 `.js`

## 新增一個小節＝新增一個檔案
1. 檔名：`units/v<冊>-<章>.<節>.js`，例如第四冊 6-4 浮力 → `v4-6.4.js`；跨科主題用 `x`，例如 `v3-x.1.js`
2. 內容：
```js
NB.unit({
 q:"情境例題",
 sub:"動手做的副標（可省略）",
 tool:function(box,eq){ /* 用 NB.lab 畫模擬實驗，結果寫進 eq.innerHTML */ },
 steps:["原理 1","原理 2"],
 key:["重點（可省略）"],
 ch:[{q:"選擇題",o:["選項A","選項B"],a:1,h:"提示"},{q:"計算題",a:3.5,u:"cm³",tol:0.01,h:"提示"}]
});
```
3. 那一冊做完後，把冊別加進 `catalog.js` 的 `READY`（例如 `["v3-","v4-"]`）。

## 數學式
寫法同數光島：`$...$` 或含 × ÷ ＝ 的算式自動轉成 KaTeX；數字後面的單位（g、cm³、m/s）會自動用正體。

## 學員專區
目前連到數光島筆記本登入（同一個網域 suuuuuhaooooo.github.io，登入狀態共用）。
之後會在同一個後端／資料庫加上「科目」：學生帳號分國小數學或國中理化，老師不分科目。

## 授權
公開的單元圖解依 CC BY-NC-ND 4.0；three.js 為 MIT 授權（`site/assets/vendor/three/LICENSE`）；KaTeX 為 MIT 授權。
