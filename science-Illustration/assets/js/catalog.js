const scienceCatalog = [
    {
        book: "第三冊 (八年級上)",
        chapters: [
            {
                ch: "ch0 緒論",
                sections: [
                    { id: "vol3-0-1", title: "0.1 科學方法與實驗守則", path: "/units/vol3-0-1-intro.html" }
                ]
            },
            {
                ch: "ch1 基本測量",
                sections: [
                    { id: "vol3-1-1", title: "1.1 長度與體積的測量", path: "/units/vol3-1-1-measurement.html" },
                    { id: "vol3-1-2", title: "1.2 質量與密度的測量", path: "/units/vol3-1-2-density.html" }
                ]
            }
            // ... (後續可依序補上第三冊 ch2 到 ch6)
        ]
    },
    {
        book: "第四冊 (八年級下)",
        chapters: [
            // ... (省略 ch1 到 ch5)
            {
                ch: "ch6 力與壓力",
                sections: [
                    { id: "vol4-6-1", title: "6.1 力與平衡", path: "/units/vol4-6-1-force.html" },
                    { id: "vol4-6-2", title: "6.2 摩擦力", path: "/units/vol4-6-2-friction.html" },
                    { id: "vol4-6-3", title: "6.3 壓力", path: "/units/vol4-6-3-pressure.html" },
                    { id: "vol4-6-4", title: "6.4 浮力", path: "/units/vol4-6-4-buoyancy.html" }
                ]
            }
        ]
    }
    // ... (第五冊、第六冊依此類推)
];
