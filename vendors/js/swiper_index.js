var E = Object.defineProperty,
    w = Object.defineProperties;
var D = Object.getOwnPropertyDescriptors;
var S = Object.getOwnPropertySymbols;
var L = Object.prototype.hasOwnProperty,
    N = Object.prototype.propertyIsEnumerable;
var b = (s, e, o) => e in s ? E(s, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
}) : s[e] = o,
    p = (s, e) => {
        for (var o in e || (e = {})) L.call(e, o) && b(s, o, e[o]);
        if (S)
            for (var o of S(e)) N.call(e, o) && b(s, o, e[o]);
        return s
    },
    d = (s, e) => w(s, D(e));
import {
    S as q,
    E as O,
    N as V,
    P as F
} from "./swiper.min.js";
const $ = function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) a(t);
    new MutationObserver(t => {
        for (const r of t)
            if (r.type === "childList")
                for (const i of r.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && a(i)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(t) {
        const r = {};
        return t.integrity && (r.integrity = t.integrity), t.referrerpolicy && (r.referrerPolicy = t.referrerpolicy), t.crossorigin === "use-credentials" ? r.credentials = "include" : t.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function a(t) {
        if (t.ep) return;
        t.ep = !0;
        const r = o(t);
        fetch(t.href, r)
    }
};
$();

function A(s, e = {}) {
    const o = s.querySelector(".swiper");
    let a = 0,
        t = !1;
    const r = n => {
        n.slides.forEach(u => {
            u.style.transitionDelay = "0ms"
        })
    },
        i = new q(o, d(p({
            effect: "creative",
            speed: 720,
            followFinger: !1
        }, e), {
            modules: [O, ...e.modules || []],
            creativeEffect: {
                limitProgress: 100,
                prev: {
                    translate: ["-100%", 0, 0]
                },
                next: {
                    translate: ["100%", 0, 0]
                }
            },
            on: d(p({}, e.on || {}), {
                touchStart(...n) {
                    t = !0, e.on && e.on.touchStart && e.on.touchStart(...n)
                },
                touchEnd(...n) {
                    t = !1, e.on && e.on.touchStart && e.on.touchEnd(...n)
                },
                progress(n, u) {
                    if (t) return;
                    e.on && e.on.progress && e.on.progress(n, u);
                    const g = n.progress > a ? "next" : "prev";
                    a = n.progress;
                    const y = n.params.speed / 16,
                        f = n.visibleSlidesIndexes,
                        h = f[0],
                        m = f[f.length - 1],
                        v = (l, c) => {
                            g === "next" && c >= h ? l.style.transitionDelay = `${(c - h + 1) * y}ms` : g === "prev" && c <= m + 1 ? l.style.transitionDelay = `${(m - c + 1) * y}ms` : l.style.transitionDelay = `${0}ms`
                        };
                    n.slides.forEach((l, c) => {
                        n.animating ? (l.style.transitionDelay = "0ms", requestAnimationFrame(() => {
                            v(l, c)
                        })) : v(l, c)
                    })
                }
            })
        }));
    return i.on("transitionEnd resize touchStart", () => {
        r(i)
    }), i
}
const j = document.querySelector(".spring-slider");
A(j, {
    modules: [V, F],
    loop: !0,
    slidesPerView: 1,
    navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
    },
    pagination: {
        el: ".swiper-pagination"
    },
    breakpoints: {
        640: {
            slidesPerView: 2
        },
        800: {
            slidesPerView: 3
        },
        1100: {
            slidesPerView: 4
        }
    }
});