module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Documents/tiku/lib/seasons.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentSeason",
    ()=>getCurrentSeason,
    "getSeasonFromDate",
    ()=>getSeasonFromDate,
    "getTheme",
    ()=>getTheme
]);
const themes = {
    spring: {
        key: "spring",
        label: "Spring",
        bg: [
            "#fdf2f8",
            "#ecfdf5"
        ],
        accent: "#ec4899",
        textAccent: "#be185d",
        dotColor: "#f472b6",
        cardBg: "rgba(255,255,255,0.85)",
        cardBorder: "rgba(236,72,153,0.15)"
    },
    summer: {
        key: "summer",
        label: "Summer",
        bg: [
            "#fffbeb",
            "#fef3c7"
        ],
        accent: "#f59e0b",
        textAccent: "#b45309",
        dotColor: "#fbbf24",
        cardBg: "rgba(255,255,255,0.85)",
        cardBorder: "rgba(245,158,11,0.15)"
    },
    fall: {
        key: "fall",
        label: "Fall",
        bg: [
            "#fff7ed",
            "#ffedd5"
        ],
        accent: "#f97316",
        textAccent: "#c2410c",
        dotColor: "#fb923c",
        cardBg: "rgba(255,255,255,0.85)",
        cardBorder: "rgba(249,115,22,0.15)"
    },
    winter: {
        key: "winter",
        label: "Winter",
        bg: [
            "#eff6ff",
            "#e0e7ff"
        ],
        accent: "#6366f1",
        textAccent: "#4338ca",
        dotColor: "#818cf8",
        cardBg: "rgba(255,255,255,0.85)",
        cardBorder: "rgba(99,102,241,0.15)"
    }
};
function getSeasonFromDate(dateStr) {
    const date = new Date(dateStr + "T00:00:00");
    const month = date.getMonth(); // 0-indexed
    const day = date.getDate();
    // Spring: March 20 - June 20
    if (month === 2 && day >= 20 || month === 3 || month === 4 || month === 5 && day <= 20) {
        return "spring";
    }
    // Summer: June 21 - September 22
    if (month === 5 && day >= 21 || month === 6 || month === 7 || month === 8 && day <= 22) {
        return "summer";
    }
    // Fall: September 23 - December 20
    if (month === 8 && day >= 23 || month === 9 || month === 10 || month === 11 && day <= 20) {
        return "fall";
    }
    // Winter: December 21 - March 19
    return "winter";
}
function getCurrentSeason() {
    const now = new Date();
    return getSeasonFromDate(now.toISOString().split("T")[0]);
}
function getTheme(season) {
    return themes[season];
}
}),
"[project]/Documents/tiku/components/SeasonalBackground.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeasonalBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/lib/seasons.ts [app-ssr] (ecmascript)");
"use client";
;
;
function SeasonalBackground({ season, children }) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTheme"])(season);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen transition-all duration-[1500ms] ease-in-out",
        style: {
            background: `linear-gradient(170deg, ${theme.bg[0]} 0%, ${theme.bg[1]} 100%)`
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Documents/tiku/components/SeasonalBackground.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/components/PhotoCarousel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PhotoCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function PhotoCarousel({ photos, accentColor }) {
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loadedImages, setLoadedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const container = scrollRef.current;
        if (!container) return;
        const handleScroll = ()=>{
            const scrollLeft = container.scrollLeft;
            const width = container.clientWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        };
        container.addEventListener("scroll", handleScroll, {
            passive: true
        });
        return ()=>container.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollTo = (index)=>{
        const container = scrollRef.current;
        if (!container) return;
        const width = container.clientWidth;
        container.scrollTo({
            left: width * index,
            behavior: "smooth"
        });
    };
    // Keyboard navigation for photos (left/right)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKey = (e)=>{
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollTo(Math.max(0, activeIndex - 1));
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollTo(Math.min(photos.length - 1, activeIndex + 1));
            }
        };
        // Only add if this carousel is in the active section
        // We'll handle this at the parent level instead
        return ()=>{};
    }, [
        activeIndex,
        photos.length
    ]);
    if (photos.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full aspect-[4/3] max-w-md mx-auto rounded-2xl bg-white/50 border-2 border-dashed border-current/10 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm opacity-40",
                children: "No photos yet"
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this);
    }
    const markLoaded = (index)=>{
        setLoadedImages((prev)=>new Set(prev).add(index));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-md mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                className: "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide rounded-2xl",
                style: {
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                },
                children: photos.map((photo, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-none w-full snap-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[4/3] bg-black/5 rounded-2xl overflow-hidden",
                            children: [
                                !loadedImages.has(index) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 animate-pulse bg-gradient-to-r from-black/5 via-black/10 to-black/5"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                                    lineNumber: 84,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: photo.url,
                                    alt: "",
                                    loading: index === 0 ? "eager" : "lazy",
                                    className: `w-full h-full object-cover transition-opacity duration-500 ${loadedImages.has(index) ? "opacity-100" : "opacity-0"}`,
                                    onLoad: ()=>markLoaded(index)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this)
                    }, photo.id, false, {
                        fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            photos.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-1.5 mt-3",
                children: photos.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>scrollTo(index),
                        className: "transition-all duration-300 rounded-full",
                        style: {
                            width: activeIndex === index ? 20 : 6,
                            height: 6,
                            backgroundColor: activeIndex === index ? accentColor : `${accentColor}33`
                        },
                        "aria-label": `Photo ${index + 1}`
                    }, index, false, {
                        fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/tiku/components/PhotoCarousel.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/components/EventSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$PhotoCarousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/PhotoCarousel.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function EventSection({ event, theme, onEdit }) {
    const formatDate = (dateStr)=>{
        const date = new Date(dateStr + "T00:00:00");
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-full px-6 py-16 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 transition-colors duration-700",
                style: {
                    backgroundColor: `${theme.accent}15`,
                    color: theme.textAccent
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-3 h-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    formatDate(event.date)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl md:text-4xl font-bold text-center mb-6 transition-colors duration-700 max-w-lg",
                style: {
                    color: theme.textAccent
                },
                children: event.title
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$PhotoCarousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                photos: event.photos,
                accentColor: theme.accent
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onEdit(event),
                className: "mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95",
                style: {
                    backgroundColor: `${theme.accent}12`,
                    color: theme.textAccent
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-3.5 h-3.5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    "Edit"
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/tiku/components/EventSection.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/tiku/components/EventSection.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/components/DatingCounter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DatingCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function computeDuration(start, now) {
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    const hours = now.getHours() - start.getHours();
    const minutes = now.getMinutes() - start.getMinutes();
    const seconds = now.getSeconds() - start.getSeconds();
    // Normalize negative values
    let totalMonths = years * 12 + months;
    if (days < 0) {
        totalMonths -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (totalMonths < 0) totalMonths = 0;
    years = Math.floor(totalMonths / 12);
    months = totalMonths % 12;
    return {
        years,
        months,
        days: Math.max(0, days),
        hours: (hours % 24 + 24) % 24,
        minutes: (minutes % 60 + 60) % 60,
        seconds: (seconds % 60 + 60) % 60
    };
}
function DatingCounter({ startDate, accentColor = "#e11d48" }) {
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const start = new Date(startDate + "T00:00:00");
        const update = ()=>setDuration(computeDuration(start, new Date()));
        update();
        const interval = setInterval(update, 1000);
        return ()=>clearInterval(interval);
    }, [
        startDate
    ]);
    if (!duration) return null;
    const parts = [];
    if (duration.years > 0) parts.push({
        value: duration.years,
        label: duration.years === 1 ? "year" : "years"
    });
    if (duration.months > 0) parts.push({
        value: duration.months,
        label: duration.months === 1 ? "month" : "months"
    });
    parts.push({
        value: duration.days,
        label: duration.days === 1 ? "day" : "days"
    });
    const pad = (n)=>n.toString().padStart(2, "0");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center select-none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-1.5 flex-wrap",
                children: parts.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-baseline gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl md:text-3xl font-bold tabular-nums",
                                style: {
                                    color: accentColor
                                },
                                children: p.value
                            }, void 0, false, {
                                fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs md:text-sm font-medium opacity-60",
                                children: p.label
                            }, void 0, false, {
                                fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            i < parts.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "opacity-30 mx-0.5",
                                children: ","
                            }, void 0, false, {
                                fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xl md:text-2xl font-mono font-bold tabular-nums mt-1 tracking-wider",
                style: {
                    color: accentColor
                },
                children: [
                    pad(duration.hours),
                    ":",
                    pad(duration.minutes),
                    ":",
                    pad(duration.seconds)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/tiku/components/DatingCounter.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/components/NavigationDots.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NavigationDots
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function NavigationDots({ total, activeIndex, accentColor, onDotClick }) {
    if (total <= 1) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2",
        "aria-label": "Timeline navigation",
        children: Array.from({
            length: total
        }, (_, i)=>{
            const isActive = i === activeIndex;
            const isNow = i === total - 1;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onDotClick(i),
                className: "group relative flex items-center justify-center transition-all duration-300",
                "aria-label": i === 0 ? "Start" : isNow ? "Now" : `Event ${i}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block rounded-full transition-all duration-300",
                        style: {
                            width: isActive ? 10 : 6,
                            height: isActive ? 10 : 6,
                            backgroundColor: isActive ? accentColor : `${accentColor}40`,
                            boxShadow: isActive ? `0 0 8px ${accentColor}60` : "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/components/NavigationDots.tsx",
                        lineNumber: 35,
                        columnNumber: 13
                    }, this),
                    isNow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute block rounded-full animate-ping",
                        style: {
                            width: 10,
                            height: 10,
                            backgroundColor: `${accentColor}30`
                        }
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/components/NavigationDots.tsx",
                        lineNumber: 50,
                        columnNumber: 15
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/Documents/tiku/components/NavigationDots.tsx",
                lineNumber: 27,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Documents/tiku/components/NavigationDots.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/components/Timeline.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Timeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/lib/seasons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$EventSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/EventSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$DatingCounter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/DatingCounter.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$NavigationDots$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/NavigationDots.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Timeline({ events, startDate, currentSeason, onSeasonChange, onEditEvent, onCreateEvent }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sectionRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Total sections: hero + events + now
    const totalSections = events.length + 2;
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTheme"])(currentSeason);
    // IntersectionObserver to detect active section
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observers = [];
        sectionRefs.current.forEach((ref, index)=>{
            if (!ref) return;
            const observer = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if (entry.isIntersecting) {
                        setActiveIndex(index);
                        // Determine season
                        if (index === 0) {
                            // Hero section — use season of start date
                            onSeasonChange((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSeasonFromDate"])(startDate));
                        } else if (index <= events.length) {
                            // Event section
                            const event = events[index - 1];
                            onSeasonChange((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSeasonFromDate"])(event.date));
                        } else {
                            // Now section
                            onSeasonChange((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentSeason"])());
                        }
                    }
                });
            }, {
                threshold: 0.55
            });
            observer.observe(ref);
            observers.push(observer);
        });
        return ()=>observers.forEach((o)=>o.disconnect());
    }, [
        events,
        startDate,
        onSeasonChange
    ]);
    // Scroll to section
    const scrollToSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index)=>{
        const clamped = Math.max(0, Math.min(index, totalSections - 1));
        sectionRefs.current[clamped]?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        totalSections
    ]);
    // Keyboard navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            // Don't capture if user is typing in an input
            const tag = e.target?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
            if (e.key === "ArrowDown" || e.key === "j") {
                e.preventDefault();
                scrollToSection(activeIndex + 1);
            } else if (e.key === "ArrowUp" || e.key === "k") {
                e.preventDefault();
                scrollToSection(activeIndex - 1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        activeIndex,
        scrollToSection
    ]);
    const setRef = (index)=>(el)=>{
            sectionRefs.current[index] = el;
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$NavigationDots$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                total: totalSections,
                activeIndex: activeIndex,
                accentColor: theme.accent,
                onDotClick: scrollToSection
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed left-5 md:left-8 top-0 bottom-0 w-px z-20 pointer-events-none transition-colors duration-700",
                style: {
                    backgroundColor: `${theme.accent}25`
                }
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide",
                style: {
                    scrollbarWidth: "none"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        ref: setRef(0),
                        className: "h-screen snap-start flex flex-col items-center justify-center relative px-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-5 md:left-8 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-30 transition-colors duration-700",
                                style: {
                                    backgroundColor: theme.accent
                                }
                            }, void 0, false, {
                                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center max-w-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-5xl mb-4 transition-colors duration-700",
                                        style: {
                                            color: theme.accent
                                        },
                                        children: "♥"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl md:text-6xl font-bold mb-3 transition-colors duration-700",
                                        style: {
                                            color: theme.textAccent
                                        },
                                        children: "Our Story"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 146,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-sm mb-8 tracking-wide",
                                        children: "Every moment together is a memory worth keeping"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$DatingCounter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        startDate: startDate,
                                        accentColor: theme.accent
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-12 animate-bounce",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5 mx-auto opacity-30",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    events.map((event, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            ref: setRef(i + 1),
                            className: "h-screen snap-start relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-5 md:left-8 top-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-30 transition-all duration-700",
                                    style: {
                                        backgroundColor: theme.accent,
                                        boxShadow: activeIndex === i + 1 ? `0 0 12px ${theme.accent}60` : "none",
                                        transform: activeIndex === i + 1 ? "translateX(-50%) scale(1.3)" : "translateX(-50%) scale(1)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$EventSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    event: event,
                                    theme: theme,
                                    onEdit: onEditEvent
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, event.id, true, {
                            fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        ref: setRef(totalSections - 1),
                        className: "h-screen snap-start flex flex-col items-center justify-center relative px-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-5 md:left-8 top-1/2 -translate-x-1/2 z-30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-3 h-3 rounded-full transition-colors duration-700",
                                        style: {
                                            backgroundColor: theme.accent
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 w-3 h-3 rounded-full animate-ping transition-colors duration-700",
                                        style: {
                                            backgroundColor: `${theme.accent}40`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 218,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center max-w-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold tracking-[0.3em] uppercase mb-4 transition-colors duration-700",
                                        style: {
                                            color: `${theme.accent}80`
                                        },
                                        children: "Right Now"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$DatingCounter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        startDate: startDate,
                                        accentColor: theme.accent
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 text-sm mt-4 mb-8",
                                        children: "...and still counting"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onCreateEvent,
                                        className: "inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95",
                                        style: {
                                            backgroundColor: theme.accent,
                                            boxShadow: `0 8px 24px ${theme.accent}30`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-5 h-5",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 4v16m8-8H4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this),
                                            "Add a Memory"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/tiku/components/Timeline.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/tiku/components/Timeline.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/components/EventModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EventModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function EventModal({ isOpen, event, accentColor, onClose, onSave, onAddPhoto, onRemovePhoto, onDelete }) {
    const isEditing = !!event;
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(event?.title || "");
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(event?.date || new Date().toISOString().split("T")[0]);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadingPhotos, setUploadingPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dragActive, setDragActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localPhotos, setLocalPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(event?.photos || []);
    const [savedEventId, setSavedEventId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(event?.id || null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Reset state when modal opens/event changes
    const resetState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setTitle(event?.title || "");
        setDate(event?.date || new Date().toISOString().split("T")[0]);
        setLocalPhotos(event?.photos || []);
        setSavedEventId(event?.id || null);
        setSaving(false);
        setUploadingPhotos(false);
    }, [
        event
    ]);
    // Reset when event changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        resetState();
    });
    const handleSave = async ()=>{
        if (!title.trim() || !date) return;
        setSaving(true);
        try {
            const savedEvent = await onSave(title.trim(), date);
            setSavedEventId(savedEvent.id);
            setLocalPhotos(savedEvent.photos || []);
            if (!isEditing) {
            // After creating, switch to edit mode so photos can be added
            // Don't close — let user add photos
            }
        } catch (error) {
            console.error("Failed to save event:", error);
        } finally{
            setSaving(false);
        }
    };
    const handleFiles = async (files)=>{
        if (!savedEventId) {
            // Need to save the event first
            if (!title.trim() || !date) return;
            setSaving(true);
            try {
                const savedEvent = await onSave(title.trim(), date);
                setSavedEventId(savedEvent.id);
                await uploadFiles(savedEvent.id, files);
            } catch (error) {
                console.error("Failed to save event:", error);
            } finally{
                setSaving(false);
            }
            return;
        }
        await uploadFiles(savedEventId, files);
    };
    const uploadFiles = async (eventId, files)=>{
        setUploadingPhotos(true);
        try {
            for (const file of Array.from(files)){
                await onAddPhoto(eventId, file);
            }
            // Refresh photos by re-fetching event
            const res = await fetch(`/api/events/${eventId}`);
            const data = await res.json();
            if (data.event) {
                setLocalPhotos(data.event.photos);
            }
        } catch (error) {
            console.error("Failed to upload photos:", error);
        } finally{
            setUploadingPhotos(false);
        }
    };
    const handleRemovePhoto = async (photo)=>{
        if (!savedEventId) return;
        try {
            await onRemovePhoto(savedEventId, photo);
            setLocalPhotos((prev)=>prev.filter((p)=>p.id !== photo.id));
        } catch (error) {
            console.error("Failed to remove photo:", error);
        }
    };
    const handleDelete = async ()=>{
        if (!savedEventId || !onDelete) return;
        if (!confirm("Delete this event and all its photos?")) return;
        try {
            await onDelete(savedEventId);
            onClose();
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };
    const handleDrag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.length) {
            handleFiles(e.dataTransfer.files);
        }
    }, [
        savedEventId,
        title,
        date
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-t-3xl md:rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-10 flex items-center justify-between p-5 pb-3 bg-white rounded-t-3xl md:rounded-t-2xl border-b border-black/5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold",
                            style: {
                                color: accentColor
                            },
                            children: isEditing ? "Edit Event" : "New Event"
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-700 mb-1.5",
                                    children: "Event title"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: title,
                                    onChange: (e)=>setTitle(e.target.value),
                                    placeholder: "e.g. Our First Date",
                                    className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-current focus:ring-2 focus:ring-current/10 outline-none text-gray-800 text-sm transition-all",
                                    style: {
                                        "--tw-ring-color": `${accentColor}20`
                                    },
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-700 mb-1.5",
                                    children: "Date"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: date,
                                    onChange: (e)=>setDate(e.target.value),
                                    className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-current focus:ring-2 focus:ring-current/10 outline-none text-gray-800 text-sm transition-all"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this),
                        (!savedEventId || title !== event?.title || date !== event?.date) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSave,
                            disabled: saving || !title.trim() || !date,
                            className: "w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                            style: {
                                backgroundColor: accentColor
                            },
                            children: saving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4 animate-spin",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                className: "opacity-25",
                                                cx: "12",
                                                cy: "12",
                                                r: "10",
                                                stroke: "currentColor",
                                                strokeWidth: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                lineNumber: 224,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                className: "opacity-75",
                                                fill: "currentColor",
                                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                lineNumber: 225,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                        lineNumber: 223,
                                        columnNumber: 19
                                    }, this),
                                    "Saving..."
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: savedEventId ? "Update Event" : "Create Event"
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                    children: [
                                        "Photos",
                                        !savedEventId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-normal text-gray-400 ml-2",
                                            children: "(save the event first, or just drop photos below)"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this),
                                localPhotos.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-3 gap-2 mb-3",
                                    children: localPhotos.map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative group aspect-square rounded-xl overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: photo.url,
                                                    alt: "",
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleRemovePhoto(photo),
                                                    className: "absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M6 18L18 6M6 6l12 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, photo.id, true, {
                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                            lineNumber: 250,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragActive ? "border-current bg-current/5 scale-[1.02]" : "border-gray-200 hover:border-gray-300"}`,
                                    onClick: ()=>fileInputRef.current?.click(),
                                    onDragEnter: handleDrag,
                                    onDragLeave: handleDrag,
                                    onDragOver: handleDrag,
                                    onDrop: handleDrop,
                                    style: dragActive ? {
                                        borderColor: accentColor,
                                        backgroundColor: `${accentColor}08`
                                    } : {},
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileInputRef,
                                            type: "file",
                                            accept: "image/*",
                                            multiple: true,
                                            className: "hidden",
                                            onChange: (e)=>{
                                                if (e.target.files?.length) handleFiles(e.target.files);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                            lineNumber: 283,
                                            columnNumber: 15
                                        }, this),
                                        uploadingPhotos ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center gap-2 text-sm text-gray-500",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 animate-spin",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "opacity-25",
                                                            cx: "12",
                                                            cy: "12",
                                                            r: "10",
                                                            stroke: "currentColor",
                                                            strokeWidth: "4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            className: "opacity-75",
                                                            fill: "currentColor",
                                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                            lineNumber: 297,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 19
                                                }, this),
                                                "Uploading..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-8 h-8 mx-auto text-gray-300",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 1.5,
                                                        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-400",
                                                    children: [
                                                        "Drop photos here or ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: accentColor
                                                            },
                                                            children: "browse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                            lineNumber: 302,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        isEditing && onDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDelete,
                            className: "w-full py-2.5 rounded-xl text-red-500 text-xs font-medium hover:bg-red-50 transition-colors",
                            children: "Delete this event"
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 316,
                            columnNumber: 13
                        }, this),
                        savedEventId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90",
                            style: {
                                backgroundColor: `${accentColor}12`,
                                color: accentColor
                            },
                            children: "Done"
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/tiku/components/EventModal.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/tiku/components/EventModal.tsx",
            lineNumber: 164,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/tiku/components/EventModal.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/lib/seasons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$SeasonalBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/SeasonalBackground.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$Timeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/Timeline.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$EventModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/tiku/components/EventModal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const DATING_START_DATE = process.env.NEXT_PUBLIC_DATING_START_DATE || "2024-01-01";
function Home() {
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [season, setSeason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentSeason"])());
    // Modal state
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingEvent, setEditingEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$lib$2f$seasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTheme"])(season);
    const fetchEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            if (data.error) {
                setError(data.error);
                setEvents([]);
            } else {
                setEvents(data.events || []);
                setError(null);
            }
        } catch (err) {
            console.error("Failed to fetch events:", err);
            setError("Could not connect to the database. Check your configuration.");
        } finally{
            setLoading(false);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchEvents();
    }, [
        fetchEvents
    ]);
    // Event CRUD handlers
    const handleSaveEvent = async (title, date)=>{
        if (editingEvent) {
            // Update existing
            const res = await fetch(`/api/events/${editingEvent.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    date
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            await fetchEvents();
            return data.event;
        } else {
            // Create new
            const res = await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    date
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            await fetchEvents();
            return data.event;
        }
    };
    const handleAddPhoto = async (eventId, file)=>{
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`/api/events/${eventId}/photos`, {
            method: "POST",
            body: formData
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error);
        }
        await fetchEvents();
    };
    const handleRemovePhoto = async (eventId, photo)=>{
        const res = await fetch(`/api/events/${eventId}/photos`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                photoId: photo.id,
                url: photo.url
            })
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error);
        }
        await fetchEvents();
    };
    const handleDeleteEvent = async (eventId)=>{
        const res = await fetch(`/api/events/${eventId}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error);
        }
        await fetchEvents();
    };
    const openCreateModal = ()=>{
        setEditingEvent(null);
        setModalOpen(true);
    };
    const openEditModal = (event)=>{
        setEditingEvent(event);
        setModalOpen(true);
    };
    const closeModal = ()=>{
        setModalOpen(false);
        setEditingEvent(null);
        fetchEvents();
    };
    // Loading state
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$SeasonalBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            season: season,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-screen flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-full border-2 border-t-transparent animate-spin",
                            style: {
                                borderColor: `${theme.accent}30`,
                                borderTopColor: theme.accent
                            }
                        }, void 0, false, {
                            fileName: "[project]/Documents/tiku/app/page.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/app/page.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm",
                        style: {
                            color: `${theme.accent}80`
                        },
                        children: "Loading your story..."
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/app/page.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/tiku/app/page.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/tiku/app/page.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this);
    }
    // Error state — still show the app, just with a banner
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$SeasonalBackground$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        season: season,
        children: [
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-amber-50 border-b border-amber-200 text-amber-800 text-xs text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Setup needed:"
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/app/page.tsx",
                        lineNumber: 156,
                        columnNumber: 11
                    }, this),
                    " ",
                    error,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://vercel.com/docs/storage/vercel-postgres/quickstart",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "underline",
                        children: "Learn more"
                    }, void 0, false, {
                        fileName: "[project]/Documents/tiku/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/tiku/app/page.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$Timeline$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                events: events,
                startDate: DATING_START_DATE,
                currentSeason: season,
                onSeasonChange: setSeason,
                onEditEvent: openEditModal,
                onCreateEvent: openCreateModal
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/app/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$tiku$2f$components$2f$EventModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: modalOpen,
                event: editingEvent,
                accentColor: theme.accent,
                onClose: closeModal,
                onSave: handleSaveEvent,
                onAddPhoto: handleAddPhoto,
                onRemovePhoto: handleRemovePhoto,
                onDelete: editingEvent ? handleDeleteEvent : undefined
            }, void 0, false, {
                fileName: "[project]/Documents/tiku/app/page.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/tiku/app/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/tiku/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__af5c878d._.js.map