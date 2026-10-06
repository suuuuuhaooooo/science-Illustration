// assets/js/core.js

document.addEventListener("DOMContentLoaded", function() {
    /* =========================================
       1. 防拷貝與保護機制
       ========================================= */
    // 禁用滑鼠右鍵選單
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 禁用鍵盤複製快捷鍵 (Ctrl+C, Cmd+C)
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
        }
    });

    // 禁用拷貝事件
    document.addEventListener('copy', e => e.preventDefault());

    /* =========================================
       2. 初始化 KaTeX 數學與物理公式渲染
       ========================================= */
    // 確保頁面中有引入 KaTeX 的 auto-render
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '\\[', right: '\\]', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false}
            ],
            throwOnError: false
        });
    }
});