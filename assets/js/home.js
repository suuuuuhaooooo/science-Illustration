// assets/js/home.js
(function () {
    "use strict";
    try {
        var SK = window.SK;
        if (!SK) throw new Error("找不到 SK 核心物件！請確認 core.js 是否有正確載入。");
        
        var cat = window.catalog || [];
        if (cat.length === 0) console.warn("找不到目錄資料，請確認 catalog.js 是否正確載入。");
      
        if (SK.injectFilters) SK.injectFilters();
      
        // 掛載頂部導覽列
        document.body.appendChild(SK.topbar("", false));
        var main = SK.h("main", { id: "home-main" });
        document.body.appendChild(main);
      
        // 建立首頁主視覺 (Hero Section)
        var hero = SK.h("section", { class: "unit-hero", style: "display:flex; justify-content:space-between; align-items:center; max-width:1000px; margin:60px auto; padding:0 20px;" });
        
        var heroText = SK.h("div", { style: "max-width:500px; z-index:2; position:relative;" });
        heroText.innerHTML = 
          "<p style='color:#9C8038; font-size:1.15rem; margin-bottom:10px; font-weight:bold; letter-spacing:2px;'>見微知著 ‧ 理化如畫</p>" +
          "<h1 style='font-family:\"LXGW WenKai TC\", serif; font-size:3.8rem; color:#4A3F37; margin:0 0 20px;'>見微理畫</h1>" +
          "<p style='color:#6F645A; font-size:1.15rem; line-height:1.7; margin-bottom:30px;'>「見微知著」是科學探究的本質。在這裡，微觀的粒子運動與隱形的物理受力，都被轉化為清晰可見的互動圖解。不需死背公式，親手拖曳變因，就能從微觀的畫面中，看透宏觀的理化法則。</p>" +
          "<div style='display:flex; gap:15px;'>" +
          "<a href='#catalog' class='btn' style='background:#E3D4AC; color:#4A3F37; border:2px solid #4A3F37; font-weight:bold;'>走進實驗室 " + SK.icon("arrow") + "</a>" +
          "</div>";
        
        var heroVisual = SK.h("div", { style: "position:relative; width:400px; height:350px;" });
        heroVisual.innerHTML = SK.bouquet(); 
      
        hero.appendChild(heroText);
        hero.appendChild(heroVisual);
        main.appendChild(hero);
      
        // 建立章節目錄區塊 (Catalog Section)
        var catSec = SK.h("section", { id: "catalog", class: "wrap", style: "max-width:1050px; margin:80px auto; padding:0 20px 80px;" });
        catSec.innerHTML = "<h2 style='font-family:\"LXGW WenKai TC\", serif; color:#4A3F37; border-bottom:2px dashed #D3C9BE; padding-bottom:10px; margin-bottom:40px; display:flex; align-items:center; gap:10px; font-size:1.5rem;'>" +
          SK.icon("map").replace("<svg", "<svg style='width:28px;height:28px;'") + " 理化總覽 / Curriculum</h2>";
      
        var grid = SK.h("div", { style: "display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:30px;" });
      
        // 定義莫蘭迪色卡片輪替
        var themes = [
          { bg: "#F8F5EE", border: "#E3D4AC", text: "#9C8038", dark: "#B8A369", iconId: 1 }, 
          { bg: "#F4F8F7", border: "#CDE0DB", text: "#4F7479", dark: "#5B778C", iconId: 0 }, 
          { bg: "#FDF9F6", border: "#F3C3A8", text: "#B8674A", dark: "#C28C6E", iconId: 2 }, 
          { bg: "#FCF6F5", border: "#EBCDCB", text: "#A85E66", dark: "#B57E83", iconId: 3 }  
        ];
      
        var colorIdx = 0;
      
        if (cat && cat.length > 0) {
            cat.forEach(function (bookData) {
              if (!bookData || !bookData.chapters) return;
              bookData.chapters.forEach(function (chapter) {
                if (!chapter || !chapter.sections) return;
                var t = themes[colorIdx % themes.length];
                colorIdx++;
          
                var card = SK.h("div", {
                  class: "sk-card",
                  style: "position:relative; overflow:hidden; background:#ffffff; border:2px solid " + t.border + "; border-radius:16px; padding:25px; transition:transform 0.2s, box-shadow 0.2s;"
                });
          
                // 處理背景浮水印，將描邊顏色動態轉為卡片專屬的深色
                var bgDeco = SK.h("div", {
                  style: "position:absolute; right:-20px; bottom:-20px; opacity:0.1; width:140px; height:140px; pointer-events:none;"
                });
                var svgStr = SK.botanical(t.iconId) || "";
                svgStr = svgStr.replace(/stroke="#4A3F37"/g, 'stroke="' + t.dark + '"');
                svgStr = svgStr.replace(/fill="[^"]*"/g, 'fill="none"');
                bgDeco.innerHTML = svgStr;
                card.appendChild(bgDeco);
          
                var head = SK.h("div", { style: "position:relative; z-index:2; margin-bottom:20px;" });
                head.innerHTML = "<div style='font-size:0.9rem; font-weight:bold; color:" + t.text + "; margin-bottom:4px; letter-spacing:1px;'>" + bookData.book + "</div>" +
                                 "<h3 style='margin:0; font-size:1.35rem; color:#3A302A; font-family:\"LXGW WenKai TC\", serif;'>" + chapter.ch + "</h3>";
                card.appendChild(head);
          
                var ul = SK.h("ul", { style: "list-style:none; padding:0; margin:0; position:relative; z-index:2;" });
                chapter.sections.forEach(function (sec) {
                  var li = SK.h("li", { style: "margin-bottom:10px;" });
                  var a = SK.h("a", { href: sec.path, style: "display:flex; align-items:center; text-decoration:none; color:#6F645A; padding:10px 14px; border-radius:8px; background:" + t.bg + "; transition:all 0.2s; font-size:1.05rem;" });
                  
                  a.innerHTML = "<span style='flex:1;'>" + sec.title + "</span><span style='color:" + t.text + "; opacity:0.7; font-size:1.2rem; transform:translateX(-5px); transition:transform 0.2s;' class='arrow-icon'>›</span>";
                  
                  a.addEventListener("mouseover", function() { 
                      a.style.backgroundColor = "#ffffff";
                      a.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                      a.style.color = t.dark; 
                      var arrow = a.querySelector('.arrow-icon');
                      if(arrow) arrow.style.transform = "translateX(2px)";
                  });
                  a.addEventListener("mouseout", function() { 
                      a.style.backgroundColor = t.bg;
                      a.style.boxShadow = "none";
                      a.style.color = "#6F645A"; 
                      var arrow = a.querySelector('.arrow-icon');
                      if(arrow) arrow.style.transform = "translateX(-5px)";
                  });
                  
                  li.appendChild(a);
                  ul.appendChild(li);
                });
                
                card.appendChild(ul);
                
                card.addEventListener("mouseover", function() { 
                    card.style.transform = "translateY(-4px)"; 
                    card.style.boxShadow = "0 8px 24px rgba(74,63,55,0.06)"; 
                });
                card.addEventListener("mouseout", function() { 
                    card.style.transform = "translateY(0)"; 
                    card.style.boxShadow = "none"; 
                });
                
                grid.appendChild(card);
              });
            });
        }
      
        catSec.appendChild(grid);
        main.appendChild(catSec);
      
        document.body.appendChild(SK.footer());

    } catch (err) {
        // 如果再遇到錯誤，會直接以紅框顯示在畫面上
        var errorBox = document.createElement("div");
        errorBox.style.cssText = "background:#fee2e2; color:#991b1b; padding:20px; margin:40px auto; max-width:800px; border:2px solid #ef4444; border-radius:8px; font-family:sans-serif;";
        errorBox.innerHTML = "<h2>[警告] 首頁載入發生錯誤</h2><p>錯誤訊息：" + err.message + "</p><p>請按 F12 開啟 Console 查看詳細狀況，或將此畫面截圖回報。</p>";
        document.body.appendChild(errorBox);
        console.error(err);
    }
})();
