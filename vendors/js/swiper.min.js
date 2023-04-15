function ne(e) {
    return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object
}

function R(e = {}, t = {}) {
    Object.keys(t).forEach(s => {
        typeof e[s] == "undefined" ? e[s] = t[s] : ne(t[s]) && ne(e[s]) && Object.keys(t[s]).length > 0 && R(e[s], t[s])
    })
}
const re = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() {}
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};

function D() {
    const e = typeof document != "undefined" ? document : {};
    return R(e, re), e
}
const ye = {
    document: re,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {}
    },
    requestAnimationFrame(e) {
        return typeof setTimeout == "undefined" ? (e(), null) : setTimeout(e, 0)
    },
    cancelAnimationFrame(e) {
        typeof setTimeout != "undefined" && clearTimeout(e)
    }
};

function O() {
    const e = typeof window != "undefined" ? window : {};
    return R(e, ye), e
}

function we(e) {
    const t = e;
    Object.keys(t).forEach(s => {
        try {
            t[s] = null
        } catch {}
        try {
            delete t[s]
        } catch {}
    })
}

function W(e, t = 0) {
    return setTimeout(e, t)
}

function V() {
    return Date.now()
}

function xe(e) {
    const t = O();
    let s;
    return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s
}

function Ee(e, t = "x") {
    const s = O();
    let i, r, n;
    const a = xe(e);
    return s.WebKitCSSMatrix ? (r = a.transform || a.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(d => d.replace(",", ".")).join(", ")), n = new s.WebKitCSSMatrix(r === "none" ? "" : r)) : (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = n.toString().split(",")), t === "x" && (s.WebKitCSSMatrix ? r = n.m41 : i.length === 16 ? r = parseFloat(i[12]) : r = parseFloat(i[4])), t === "y" && (s.WebKitCSSMatrix ? r = n.m42 : i.length === 16 ? r = parseFloat(i[13]) : r = parseFloat(i[5])), r || 0
}

function F(e) {
    return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object"
}

function Ce(e) {
    return typeof window != "undefined" && typeof window.HTMLElement != "undefined" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11)
}

function I(...e) {
    const t = Object(e[0]),
        s = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < e.length; i += 1) {
        const r = e[i];
        if (r != null && !Ce(r)) {
            const n = Object.keys(Object(r)).filter(a => s.indexOf(a) < 0);
            for (let a = 0, d = n.length; a < d; a += 1) {
                const l = n[a],
                    c = Object.getOwnPropertyDescriptor(r, l);
                c !== void 0 && c.enumerable && (F(t[l]) && F(r[l]) ? r[l].__swiper__ ? t[l] = r[l] : I(t[l], r[l]) : !F(t[l]) && F(r[l]) ? (t[l] = {}, r[l].__swiper__ ? t[l] = r[l] : I(t[l], r[l])) : t[l] = r[l])
            }
        }
    }
    return t
}

function N(e, t, s) {
    e.style.setProperty(t, s)
}

function ae({
    swiper: e,
    targetPosition: t,
    side: s
}) {
    const i = O(),
        r = -e.translate;
    let n = null,
        a;
    const d = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(e.cssModeFrameID);
    const l = t > r ? "next" : "prev",
        c = (p, S) => l === "next" && p >= S || l === "prev" && p <= S,
        v = () => {
            a = new Date().getTime(), n === null && (n = a);
            const p = Math.max(Math.min((a - n) / d, 1), 0),
                S = .5 - Math.cos(p * Math.PI) / 2;
            let u = r + S * (t - r);
            if (c(u, t) && (u = t), e.wrapperEl.scrollTo({
                    [s]: u
                }), c(u, t)) {
                e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
                        [s]: u
                    })
                }), i.cancelAnimationFrame(e.cssModeFrameID);
                return
            }
            e.cssModeFrameID = i.requestAnimationFrame(v)
        };
    v()
}

function q(e) {
    return e.querySelector(".swiper-slide-transform") || e.shadowEl && e.shadowEl.querySelector(".swiper-slide-transform") || e
}

function $(e, t = "") {
    return [...e.children].filter(s => s.matches(t))
}

function X(e, t = []) {
    const s = document.createElement(e);
    return s.classList.add(...Array.isArray(t) ? t : [t]), s
}

function Me(e, t) {
    const s = [];
    for (; e.previousElementSibling;) {
        const i = e.previousElementSibling;
        t ? i.matches(t) && s.push(i) : s.push(i), e = i
    }
    return s
}

function Pe(e, t) {
    const s = [];
    for (; e.nextElementSibling;) {
        const i = e.nextElementSibling;
        t ? i.matches(t) && s.push(i) : s.push(i), e = i
    }
    return s
}

function B(e, t) {
    return O().getComputedStyle(e, null).getPropertyValue(t)
}

function G(e) {
    let t = e,
        s;
    if (t) {
        for (s = 0;
            (t = t.previousSibling) !== null;) t.nodeType === 1 && (s += 1);
        return s
    }
}

function le(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i;) t ? i.matches(t) && s.push(i) : s.push(i), i = i.parentElement;
    return s
}

function Le(e, t) {
    function s(i) {
        i.target === e && (t.call(e, i), e.removeEventListener("transitionend", s))
    }
    t && e.addEventListener("transitionend", s)
}

function Y(e, t, s) {
    const i = O();
    return s ? e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth
}
let U;

function ke() {
    const e = O(),
        t = D();
    return {
        smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
        touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
    }
}

function oe() {
    return U || (U = ke()), U
}
let K;

function Oe({
    userAgent: e
} = {}) {
    const t = oe(),
        s = O(),
        i = s.navigator.platform,
        r = e || s.navigator.userAgent,
        n = {
            ios: !1,
            android: !1
        },
        a = s.screen.width,
        d = s.screen.height,
        l = r.match(/(Android);?[\s\/]+([\d.]+)?/);
    let c = r.match(/(iPad).*OS\s([\d_]+)/);
    const v = r.match(/(iPod)(.*OS\s([\d_]+))?/),
        p = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
        S = i === "Win32";
    let u = i === "MacIntel";
    const g = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !c && u && t.touch && g.indexOf(`${a}x${d}`) >= 0 && (c = r.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), u = !1), l && !S && (n.os = "android", n.android = !0), (c || p || v) && (n.os = "ios", n.ios = !0), n
}

function Ie(e = {}) {
    return K || (K = Oe(e)), K
}
let Z;

function ze() {
    const e = O();
    let t = !1;

    function s() {
        const i = e.navigator.userAgent.toLowerCase();
        return i.indexOf("safari") >= 0 && i.indexOf("chrome") < 0 && i.indexOf("android") < 0
    }
    if (s()) {
        const i = String(e.navigator.userAgent);
        if (i.includes("Version/")) {
            const [r, n] = i.split("Version/")[1].split(" ")[0].split(".").map(a => Number(a));
            t = r < 16 || r === 16 && n < 2
        }
    }
    return {
        isSafari: t || s(),
        needPerspectiveFix: t,
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
    }
}

function Ae() {
    return Z || (Z = ze()), Z
}

function $e({
    swiper: e,
    on: t,
    emit: s
}) {
    const i = O();
    let r = null,
        n = null;
    const a = () => {
            !e || e.destroyed || !e.initialized || (s("beforeResize"), s("resize"))
        },
        d = () => {
            !e || e.destroyed || !e.initialized || (r = new ResizeObserver(v => {
                n = i.requestAnimationFrame(() => {
                    const {
                        width: p,
                        height: S
                    } = e;
                    let u = p,
                        g = S;
                    v.forEach(({
                        contentBoxSize: m,
                        contentRect: b,
                        target: o
                    }) => {
                        o && o !== e.el || (u = b ? b.width : (m[0] || m).inlineSize, g = b ? b.height : (m[0] || m).blockSize)
                    }), (u !== p || g !== S) && a()
                })
            }), r.observe(e.el))
        },
        l = () => {
            n && i.cancelAnimationFrame(n), r && r.unobserve && e.el && (r.unobserve(e.el), r = null)
        },
        c = () => {
            !e || e.destroyed || !e.initialized || s("orientationchange")
        };
    t("init", () => {
        if (e.params.resizeObserver && typeof i.ResizeObserver != "undefined") {
            d();
            return
        }
        i.addEventListener("resize", a), i.addEventListener("orientationchange", c)
    }), t("destroy", () => {
        l(), i.removeEventListener("resize", a), i.removeEventListener("orientationchange", c)
    })
}

function Ge({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
}) {
    const r = [],
        n = O(),
        a = (c, v = {}) => {
            const p = n.MutationObserver || n.WebkitMutationObserver,
                S = new p(u => {
                    if (u.length === 1) {
                        i("observerUpdate", u[0]);
                        return
                    }
                    const g = function() {
                        i("observerUpdate", u[0])
                    };
                    n.requestAnimationFrame ? n.requestAnimationFrame(g) : n.setTimeout(g, 0)
                });
            S.observe(c, {
                attributes: typeof v.attributes == "undefined" ? !0 : v.attributes,
                childList: typeof v.childList == "undefined" ? !0 : v.childList,
                characterData: typeof v.characterData == "undefined" ? !0 : v.characterData
            }), r.push(S)
        },
        d = () => {
            if (!!e.params.observer) {
                if (e.params.observeParents) {
                    const c = le(e.el);
                    for (let v = 0; v < c.length; v += 1) a(c[v])
                }
                a(e.el, {
                    childList: e.params.observeSlideChildren
                }), a(e.wrapperEl, {
                    attributes: !1
                })
            }
        },
        l = () => {
            r.forEach(c => {
                c.disconnect()
            }), r.splice(0, r.length)
        };
    t({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }), s("init", d), s("destroy", l)
}
var Be = {
    on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;
        const r = s ? "unshift" : "push";
        return e.split(" ").forEach(n => {
            i.eventsListeners[n] || (i.eventsListeners[n] = []), i.eventsListeners[n][r](t)
        }), i
    },
    once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;

        function r(...n) {
            i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, n)
        }
        return r.__emitterProxy = t, i.on(e, r, s)
    },
    onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed || typeof e != "function") return s;
        const i = t ? "unshift" : "push";
        return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
    },
    offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t
    },
    off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed || !s.eventsListeners || e.split(" ").forEach(i => {
            typeof t == "undefined" ? s.eventsListeners[i] = [] : s.eventsListeners[i] && s.eventsListeners[i].forEach((r, n) => {
                (r === t || r.__emitterProxy && r.__emitterProxy === t) && s.eventsListeners[i].splice(n, 1)
            })
        }), s
    },
    emit(...e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
        let s, i, r;
        return typeof e[0] == "string" || Array.isArray(e[0]) ? (s = e[0], i = e.slice(1, e.length), r = t) : (s = e[0].events, i = e[0].data, r = e[0].context || t), i.unshift(r), (Array.isArray(s) ? s : s.split(" ")).forEach(a => {
            t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach(d => {
                d.apply(r, [a, ...i])
            }), t.eventsListeners && t.eventsListeners[a] && t.eventsListeners[a].forEach(d => {
                d.apply(r, i)
            })
        }), t
    }
};

function De() {
    const e = this;
    let t, s;
    const i = e.el;
    typeof e.params.width != "undefined" && e.params.width !== null ? t = e.params.width : t = i.clientWidth, typeof e.params.height != "undefined" && e.params.height !== null ? s = e.params.height : s = i.clientHeight, !(t === 0 && e.isHorizontal() || s === 0 && e.isVertical()) && (t = t - parseInt(B(i, "padding-left") || 0, 10) - parseInt(B(i, "padding-right") || 0, 10), s = s - parseInt(B(i, "padding-top") || 0, 10) - parseInt(B(i, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, {
        width: t,
        height: s,
        size: e.isHorizontal() ? t : s
    }))
}

function Ve() {
    const e = this;

    function t(w) {
        return e.isHorizontal() ? w : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[w]
    }

    function s(w, x) {
        return parseFloat(w.getPropertyValue(t(x)) || 0)
    }
    const i = e.params,
        {
            wrapperEl: r,
            slidesEl: n,
            size: a,
            rtlTranslate: d,
            wrongRTL: l
        } = e,
        c = e.virtual && i.virtual.enabled,
        v = c ? e.virtual.slides.length : e.slides.length,
        p = $(n, `.${e.params.slideClass}, swiper-slide`),
        S = c ? e.virtual.slides.length : p.length;
    let u = [];
    const g = [],
        m = [];
    let b = i.slidesOffsetBefore;
    typeof b == "function" && (b = i.slidesOffsetBefore.call(e));
    let o = i.slidesOffsetAfter;
    typeof o == "function" && (o = i.slidesOffsetAfter.call(e));
    const f = e.snapGrid.length,
        h = e.slidesGrid.length;
    let y = i.spaceBetween,
        T = -b,
        C = 0,
        P = 0;
    if (typeof a == "undefined") return;
    typeof y == "string" && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * a), e.virtualSize = -y, p.forEach(w => {
        d ? w.style.marginLeft = "" : w.style.marginRight = "", w.style.marginBottom = "", w.style.marginTop = ""
    }), i.centeredSlides && i.cssMode && (N(r, "--swiper-centered-offset-before", ""), N(r, "--swiper-centered-offset-after", ""));
    const L = i.grid && i.grid.rows > 1 && e.grid;
    L && e.grid.initSlides(S);
    let M;
    const A = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter(w => typeof i.breakpoints[w].slidesPerView != "undefined").length > 0;
    for (let w = 0; w < S; w += 1) {
        M = 0;
        let x;
        if (p[w] && (x = p[w]), L && e.grid.updateSlide(w, x, S, t), !(p[w] && B(x, "display") === "none")) {
            if (i.slidesPerView === "auto") {
                A && (p[w].style[t("width")] = "");
                const E = getComputedStyle(x),
                    k = x.style.transform,
                    j = x.style.webkitTransform;
                if (k && (x.style.transform = "none"), j && (x.style.webkitTransform = "none"), i.roundLengths) M = e.isHorizontal() ? Y(x, "width", !0) : Y(x, "height", !0);
                else {
                    const ee = s(E, "width"),
                        ve = s(E, "padding-left"),
                        Se = s(E, "padding-right"),
                        te = s(E, "margin-left"),
                        se = s(E, "margin-right"),
                        ie = E.getPropertyValue("box-sizing");
                    if (ie && ie === "border-box") M = ee + te + se;
                    else {
                        const {
                            clientWidth: be,
                            offsetWidth: Te
                        } = x;
                        M = ee + ve + Se + te + se + (Te - be)
                    }
                }
                k && (x.style.transform = k), j && (x.style.webkitTransform = j), i.roundLengths && (M = Math.floor(M))
            } else M = (a - (i.slidesPerView - 1) * y) / i.slidesPerView, i.roundLengths && (M = Math.floor(M)), p[w] && (p[w].style[t("width")] = `${M}px`);
            p[w] && (p[w].swiperSlideSize = M), m.push(M), i.centeredSlides ? (T = T + M / 2 + C / 2 + y, C === 0 && w !== 0 && (T = T - a / 2 - y), w === 0 && (T = T - a / 2 - y), Math.abs(T) < 1 / 1e3 && (T = 0), i.roundLengths && (T = Math.floor(T)), P % i.slidesPerGroup == 0 && u.push(T), g.push(T)) : (i.roundLengths && (T = Math.floor(T)), (P - Math.min(e.params.slidesPerGroupSkip, P)) % e.params.slidesPerGroup == 0 && u.push(T), g.push(T), T = T + M + y), e.virtualSize += M + y, C = M, P += 1
        }
    }
    if (e.virtualSize = Math.max(e.virtualSize, a) + o, d && l && (i.effect === "slide" || i.effect === "coverflow") && (r.style.width = `${e.virtualSize+i.spaceBetween}px`), i.setWrapperSize && (r.style[t("width")] = `${e.virtualSize+i.spaceBetween}px`), L && e.grid.updateWrapperSize(M, u, t), !i.centeredSlides) {
        const w = [];
        for (let x = 0; x < u.length; x += 1) {
            let E = u[x];
            i.roundLengths && (E = Math.floor(E)), u[x] <= e.virtualSize - a && w.push(E)
        }
        u = w, Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - a)
    }
    if (c && i.loop) {
        const w = m[0] + y;
        if (i.slidesPerGroup > 1) {
            const x = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup),
                E = w * i.slidesPerGroup;
            for (let k = 0; k < x; k += 1) u.push(u[u.length - 1] + E)
        }
        for (let x = 0; x < e.virtual.slidesBefore + e.virtual.slidesAfter; x += 1) i.slidesPerGroup === 1 && u.push(u[u.length - 1] + w), g.push(g[g.length - 1] + w), e.virtualSize += w
    }
    if (u.length === 0 && (u = [0]), i.spaceBetween !== 0) {
        const w = e.isHorizontal() && d ? "marginLeft" : t("marginRight");
        p.filter((x, E) => !i.cssMode || i.loop ? !0 : E !== p.length - 1).forEach(x => {
            x.style[w] = `${y}px`
        })
    }
    if (i.centeredSlides && i.centeredSlidesBounds) {
        let w = 0;
        m.forEach(E => {
            w += E + (i.spaceBetween ? i.spaceBetween : 0)
        }), w -= i.spaceBetween;
        const x = w - a;
        u = u.map(E => E < 0 ? -b : E > x ? x + o : E)
    }
    if (i.centerInsufficientSlides) {
        let w = 0;
        if (m.forEach(x => {
                w += x + (i.spaceBetween ? i.spaceBetween : 0)
            }), w -= i.spaceBetween, w < a) {
            const x = (a - w) / 2;
            u.forEach((E, k) => {
                u[k] = E - x
            }), g.forEach((E, k) => {
                g[k] = E + x
            })
        }
    }
    if (Object.assign(e, {
            slides: p,
            snapGrid: u,
            slidesGrid: g,
            slidesSizesGrid: m
        }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
        N(r, "--swiper-centered-offset-before", `${-u[0]}px`), N(r, "--swiper-centered-offset-after", `${e.size/2-m[m.length-1]/2}px`);
        const w = -e.snapGrid[0],
            x = -e.slidesGrid[0];
        e.snapGrid = e.snapGrid.map(E => E + w), e.slidesGrid = e.slidesGrid.map(E => E + x)
    }
    if (S !== v && e.emit("slidesLengthChange"), u.length !== f && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), g.length !== h && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !c && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
        const w = `${i.containerModifierClass}backface-hidden`,
            x = e.el.classList.contains(w);
        S <= i.maxBackfaceHiddenSlides ? x || e.el.classList.add(w) : x && e.el.classList.remove(w)
    }
}

function He(e) {
    const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
    let r = 0,
        n;
    typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
    const a = d => i ? t.slides.filter(l => parseInt(l.getAttribute("data-swiper-slide-index"), 10) === d)[0] : t.slides[d];
    if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)(t.visibleSlides || []).forEach(d => {
            s.push(d)
        });
        else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                const d = t.activeIndex + n;
                if (d > t.slides.length && !i) break;
                s.push(a(d))
            } else s.push(a(t.activeIndex));
    for (n = 0; n < s.length; n += 1)
        if (typeof s[n] != "undefined") {
            const d = s[n].offsetHeight;
            r = d > r ? d : r
        }(r || r === 0) && (t.wrapperEl.style.height = `${r}px`)
}

function Fe() {
    const e = this,
        t = e.slides,
        s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
    for (let i = 0; i < t.length; i += 1) t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s
}

function Ne(e = this && this.translate || 0) {
    const t = this,
        s = t.params,
        {
            slides: i,
            rtlTranslate: r,
            snapGrid: n
        } = t;
    if (i.length === 0) return;
    typeof i[0].swiperSlideOffset == "undefined" && t.updateSlidesOffset();
    let a = -e;
    r && (a = e), i.forEach(d => {
        d.classList.remove(s.slideVisibleClass)
    }), t.visibleSlidesIndexes = [], t.visibleSlides = [];
    for (let d = 0; d < i.length; d += 1) {
        const l = i[d];
        let c = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset);
        const v = (a + (s.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + s.spaceBetween),
            p = (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + s.spaceBetween),
            S = -(a - c),
            u = S + t.slidesSizesGrid[d];
        (S >= 0 && S < t.size - 1 || u > 1 && u <= t.size || S <= 0 && u >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(d), i[d].classList.add(s.slideVisibleClass)), l.progress = r ? -v : v, l.originalProgress = r ? -p : p
    }
}

function _e(e) {
    const t = this;
    if (typeof e == "undefined") {
        const v = t.rtlTranslate ? -1 : 1;
        e = t && t.translate && t.translate * v || 0
    }
    const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
    let {
        progress: r,
        isBeginning: n,
        isEnd: a,
        progressLoop: d
    } = t;
    const l = n,
        c = a;
    if (i === 0) r = 0, n = !0, a = !0;
    else {
        r = (e - t.minTranslate()) / i;
        const v = Math.abs(e - t.minTranslate()) < 1,
            p = Math.abs(e - t.maxTranslate()) < 1;
        n = v || r <= 0, a = p || r >= 1, v && (r = 0), p && (r = 1)
    }
    if (s.loop) {
        const v = G(t.slides.filter(b => b.getAttribute("data-swiper-slide-index") === "0")[0]),
            p = G(t.slides.filter(b => b.getAttribute("data-swiper-slide-index") * 1 == t.slides.length - 1)[0]),
            S = t.slidesGrid[v],
            u = t.slidesGrid[p],
            g = t.slidesGrid[t.slidesGrid.length - 1],
            m = Math.abs(e);
        m >= S ? d = (m - S) / g : d = (m + g - u) / g, d > 1 && (d -= 1)
    }
    Object.assign(t, {
        progress: r,
        progressLoop: d,
        isBeginning: n,
        isEnd: a
    }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), n && !l && t.emit("reachBeginning toEdge"), a && !c && t.emit("reachEnd toEdge"), (l && !n || c && !a) && t.emit("fromEdge"), t.emit("progress", r)
}

function je() {
    const e = this,
        {
            slides: t,
            params: s,
            slidesEl: i,
            activeIndex: r
        } = e,
        n = e.virtual && s.virtual.enabled,
        a = l => $(i, `.${s.slideClass}${l}, swiper-slide${l}`)[0];
    t.forEach(l => {
        l.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
    });
    let d;
    if (n)
        if (s.loop) {
            let l = r - e.virtual.slidesBefore;
            l < 0 && (l = e.virtual.slides.length + l), l >= e.virtual.slides.length && (l -= e.virtual.slides.length), d = a(`[data-swiper-slide-index="${l}"]`)
        } else d = a(`[data-swiper-slide-index="${r}"]`);
    else d = t[r];
    if (d) {
        d.classList.add(s.slideActiveClass);
        let l = Pe(d, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !l && (l = t[0]), l && l.classList.add(s.slideNextClass);
        let c = Me(d, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !c === 0 && (c = t[t.length - 1]), c && c.classList.add(s.slidePrevClass)
    }
    e.emitSlidesClasses()
}

function Re(e) {
    const {
        slidesGrid: t,
        params: s
    } = e, i = e.rtlTranslate ? e.translate : -e.translate;
    let r;
    for (let n = 0; n < t.length; n += 1) typeof t[n + 1] != "undefined" ? i >= t[n] && i < t[n + 1] - (t[n + 1] - t[n]) / 2 ? r = n : i >= t[n] && i < t[n + 1] && (r = n + 1) : i >= t[n] && (r = n);
    return s.normalizeSlideIndex && (r < 0 || typeof r == "undefined") && (r = 0), r
}

function We(e) {
    const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
            snapGrid: i,
            params: r,
            activeIndex: n,
            realIndex: a,
            snapIndex: d
        } = t;
    let l = e,
        c;
    const v = S => {
        let u = S - t.virtual.slidesBefore;
        return u < 0 && (u = t.virtual.slides.length + u), u >= t.virtual.slides.length && (u -= t.virtual.slides.length), u
    };
    if (typeof l == "undefined" && (l = Re(t)), i.indexOf(s) >= 0) c = i.indexOf(s);
    else {
        const S = Math.min(r.slidesPerGroupSkip, l);
        c = S + Math.floor((l - S) / r.slidesPerGroup)
    }
    if (c >= i.length && (c = i.length - 1), l === n) {
        c !== d && (t.snapIndex = c, t.emit("snapIndexChange")), t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = v(l));
        return
    }
    let p;
    t.virtual && r.virtual.enabled && r.loop ? p = v(l) : t.slides[l] ? p = parseInt(t.slides[l].getAttribute("data-swiper-slide-index") || l, 10) : p = l, Object.assign(t, {
        snapIndex: c,
        realIndex: p,
        previousIndex: n,
        activeIndex: l
    }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), a !== p && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
}

function qe(e) {
    const t = this,
        s = t.params,
        i = e.closest(`.${s.slideClass}, swiper-slide`);
    let r = !1,
        n;
    if (i) {
        for (let a = 0; a < t.slides.length; a += 1)
            if (t.slides[a] === i) {
                r = !0, n = a;
                break
            }
    }
    if (i && r) t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = n;
    else {
        t.clickedSlide = void 0, t.clickedIndex = void 0;
        return
    }
    s.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
}
var Xe = {
    updateSize: De,
    updateSlides: Ve,
    updateAutoHeight: He,
    updateSlidesOffset: Fe,
    updateSlidesProgress: Ne,
    updateProgress: _e,
    updateSlidesClasses: je,
    updateActiveIndex: We,
    updateClickedSlide: qe
};

function Ye(e = this.isHorizontal() ? "x" : "y") {
    const t = this,
        {
            params: s,
            rtlTranslate: i,
            translate: r,
            wrapperEl: n
        } = t;
    if (s.virtualTranslate) return i ? -r : r;
    if (s.cssMode) return r;
    let a = Ee(n, e);
    return i && (a = -a), a || 0
}

function Ue(e, t) {
    const s = this,
        {
            rtlTranslate: i,
            params: r,
            wrapperEl: n,
            progress: a
        } = s;
    let d = 0,
        l = 0;
    const c = 0;
    s.isHorizontal() ? d = i ? -e : e : l = e, r.roundLengths && (d = Math.floor(d), l = Math.floor(l)), r.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -l : r.virtualTranslate || (n.style.transform = `translate3d(${d}px, ${l}px, ${c}px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? d : l;
    let v;
    const p = s.maxTranslate() - s.minTranslate();
    p === 0 ? v = 0 : v = (e - s.minTranslate()) / p, v !== a && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
}

function Ke() {
    return -this.snapGrid[0]
}

function Ze() {
    return -this.snapGrid[this.snapGrid.length - 1]
}

function Je(e = 0, t = this.params.speed, s = !0, i = !0, r) {
    const n = this,
        {
            params: a,
            wrapperEl: d
        } = n;
    if (n.animating && a.preventInteractionOnTransition) return !1;
    const l = n.minTranslate(),
        c = n.maxTranslate();
    let v;
    if (i && e > l ? v = l : i && e < c ? v = c : v = e, n.updateProgress(v), a.cssMode) {
        const p = n.isHorizontal();
        if (t === 0) d[p ? "scrollLeft" : "scrollTop"] = -v;
        else {
            if (!n.support.smoothScroll) return ae({
                swiper: n,
                targetPosition: -v,
                side: p ? "left" : "top"
            }), !0;
            d.scrollTo({
                [p ? "left" : "top"]: -v,
                behavior: "smooth"
            })
        }
        return !0
    }
    return t === 0 ? (n.setTransition(0), n.setTranslate(v), s && (n.emit("beforeTransitionStart", t, r), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(v), s && (n.emit("beforeTransitionStart", t, r), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(S) {
        !n || n.destroyed || S.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, s && n.emit("transitionEnd"))
    }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0
}
var Qe = {
    getTranslate: Ye,
    setTranslate: Ue,
    minTranslate: Ke,
    maxTranslate: Ze,
    translateTo: Je
};

function et(e, t) {
    const s = this;
    s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`), s.emit("setTransition", e, t)
}

function de({
    swiper: e,
    runCallbacks: t,
    direction: s,
    step: i
}) {
    const {
        activeIndex: r,
        previousIndex: n
    } = e;
    let a = s;
    if (a || (r > n ? a = "next" : r < n ? a = "prev" : a = "reset"), e.emit(`transition${i}`), t && r !== n) {
        if (a === "reset") {
            e.emit(`slideResetTransition${i}`);
            return
        }
        e.emit(`slideChangeTransition${i}`), a === "next" ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`)
    }
}

function tt(e = !0, t) {
    const s = this,
        {
            params: i
        } = s;
    i.cssMode || (i.autoHeight && s.updateAutoHeight(), de({
        swiper: s,
        runCallbacks: e,
        direction: t,
        step: "Start"
    }))
}

function st(e = !0, t) {
    const s = this,
        {
            params: i
        } = s;
    s.animating = !1, !i.cssMode && (s.setTransition(0), de({
        swiper: s,
        runCallbacks: e,
        direction: t,
        step: "End"
    }))
}
var it = {
    setTransition: et,
    transitionStart: tt,
    transitionEnd: st
};

function nt(e = 0, t = this.params.speed, s = !0, i, r) {
    typeof e == "string" && (e = parseInt(e, 10));
    const n = this;
    let a = e;
    a < 0 && (a = 0);
    const {
        params: d,
        snapGrid: l,
        slidesGrid: c,
        previousIndex: v,
        activeIndex: p,
        rtlTranslate: S,
        wrapperEl: u,
        enabled: g
    } = n;
    if (n.animating && d.preventInteractionOnTransition || !g && !i && !r) return !1;
    const m = Math.min(n.params.slidesPerGroupSkip, a);
    let b = m + Math.floor((a - m) / n.params.slidesPerGroup);
    b >= l.length && (b = l.length - 1);
    const o = -l[b];
    if (d.normalizeSlideIndex)
        for (let h = 0; h < c.length; h += 1) {
            const y = -Math.floor(o * 100),
                T = Math.floor(c[h] * 100),
                C = Math.floor(c[h + 1] * 100);
            typeof c[h + 1] != "undefined" ? y >= T && y < C - (C - T) / 2 ? a = h : y >= T && y < C && (a = h + 1) : y >= T && (a = h)
        }
    if (n.initialized && a !== p && (!n.allowSlideNext && o < n.translate && o < n.minTranslate() || !n.allowSlidePrev && o > n.translate && o > n.maxTranslate() && (p || 0) !== a)) return !1;
    a !== (v || 0) && s && n.emit("beforeSlideChangeStart"), n.updateProgress(o);
    let f;
    if (a > p ? f = "next" : a < p ? f = "prev" : f = "reset", S && -o === n.translate || !S && o === n.translate) return n.updateActiveIndex(a), d.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), d.effect !== "slide" && n.setTranslate(o), f !== "reset" && (n.transitionStart(s, f), n.transitionEnd(s, f)), !1;
    if (d.cssMode) {
        const h = n.isHorizontal(),
            y = S ? o : -o;
        if (t === 0) {
            const T = n.virtual && n.params.virtual.enabled;
            T && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), T && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
                u[h ? "scrollLeft" : "scrollTop"] = y
            })) : u[h ? "scrollLeft" : "scrollTop"] = y, T && requestAnimationFrame(() => {
                n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1
            })
        } else {
            if (!n.support.smoothScroll) return ae({
                swiper: n,
                targetPosition: y,
                side: h ? "left" : "top"
            }), !0;
            u.scrollTo({
                [h ? "left" : "top"]: y,
                behavior: "smooth"
            })
        }
        return !0
    }
    return n.setTransition(t), n.setTranslate(o), n.updateActiveIndex(a), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, i), n.transitionStart(s, f), t === 0 ? n.transitionEnd(s, f) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(y) {
        !n || n.destroyed || y.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(s, f))
    }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0
}

function rt(e = 0, t = this.params.speed, s = !0, i) {
    typeof e == "string" && (e = parseInt(e, 10));
    const r = this;
    let n = e;
    return r.params.loop && (r.virtual && r.params.virtual.enabled ? n = n + r.virtual.slidesBefore : n = G(r.slides.filter(a => a.getAttribute("data-swiper-slide-index") * 1 === n)[0])), r.slideTo(n, t, s, i)
}

function at(e = this.params.speed, t = !0, s) {
    const i = this,
        {
            enabled: r,
            params: n,
            animating: a
        } = i;
    if (!r) return i;
    let d = n.slidesPerGroup;
    n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (d = Math.max(i.slidesPerViewDynamic("current", !0), 1));
    const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : d,
        c = i.virtual && n.virtual.enabled;
    if (n.loop) {
        if (a && !c && n.loopPreventsSliding) return !1;
        i.loopFix({
            direction: "next"
        }), i._clientLeft = i.wrapperEl.clientLeft
    }
    return n.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
}

function lt(e = this.params.speed, t = !0, s) {
    const i = this,
        {
            params: r,
            snapGrid: n,
            slidesGrid: a,
            rtlTranslate: d,
            enabled: l,
            animating: c
        } = i;
    if (!l) return i;
    const v = i.virtual && r.virtual.enabled;
    if (r.loop) {
        if (c && !v && r.loopPreventsSliding) return !1;
        i.loopFix({
            direction: "prev"
        }), i._clientLeft = i.wrapperEl.clientLeft
    }
    const p = d ? i.translate : -i.translate;

    function S(o) {
        return o < 0 ? -Math.floor(Math.abs(o)) : Math.floor(o)
    }
    const u = S(p),
        g = n.map(o => S(o));
    let m = n[g.indexOf(u) - 1];
    if (typeof m == "undefined" && r.cssMode) {
        let o;
        n.forEach((f, h) => {
            u >= f && (o = h)
        }), typeof o != "undefined" && (m = n[o > 0 ? o - 1 : o])
    }
    let b = 0;
    if (typeof m != "undefined" && (b = a.indexOf(m), b < 0 && (b = i.activeIndex - 1), r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (b = b - i.slidesPerViewDynamic("previous", !0) + 1, b = Math.max(b, 0))), r.rewind && i.isBeginning) {
        const o = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
        return i.slideTo(o, e, t, s)
    }
    return i.slideTo(b, e, t, s)
}

function ot(e = this.params.speed, t = !0, s) {
    const i = this;
    return i.slideTo(i.activeIndex, e, t, s)
}

function dt(e = this.params.speed, t = !0, s, i = .5) {
    const r = this;
    let n = r.activeIndex;
    const a = Math.min(r.params.slidesPerGroupSkip, n),
        d = a + Math.floor((n - a) / r.params.slidesPerGroup),
        l = r.rtlTranslate ? r.translate : -r.translate;
    if (l >= r.snapGrid[d]) {
        const c = r.snapGrid[d],
            v = r.snapGrid[d + 1];
        l - c > (v - c) * i && (n += r.params.slidesPerGroup)
    } else {
        const c = r.snapGrid[d - 1],
            v = r.snapGrid[d];
        l - c <= (v - c) * i && (n -= r.params.slidesPerGroup)
    }
    return n = Math.max(n, 0), n = Math.min(n, r.slidesGrid.length - 1), r.slideTo(n, e, t, s)
}

function ct() {
    const e = this,
        {
            params: t,
            slidesEl: s
        } = e,
        i = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
    let r = e.clickedIndex,
        n;
    const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
    if (t.loop) {
        if (e.animating) return;
        n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), r = G($(s, `${a}[data-swiper-slide-index="${n}"]`)[0]), W(() => {
            e.slideTo(r)
        })) : e.slideTo(r) : r > e.slides.length - i ? (e.loopFix(), r = G($(s, `${a}[data-swiper-slide-index="${n}"]`)[0]), W(() => {
            e.slideTo(r)
        })) : e.slideTo(r)
    } else e.slideTo(r)
}
var ft = {
    slideTo: nt,
    slideToLoop: rt,
    slideNext: at,
    slidePrev: lt,
    slideReset: ot,
    slideToClosest: dt,
    slideToClickedSlide: ct
};

function ut(e) {
    const t = this,
        {
            params: s,
            slidesEl: i
        } = t;
    if (!s.loop || t.virtual && t.params.virtual.enabled) return;
    $(i, `.${s.slideClass}, swiper-slide`).forEach((n, a) => {
        n.setAttribute("data-swiper-slide-index", a)
    }), t.loopFix({
        slideRealIndex: e,
        direction: s.centeredSlides ? void 0 : "next"
    })
}

function pt({
    slideRealIndex: e,
    slideTo: t = !0,
    direction: s,
    setTranslate: i,
    activeSlideIndex: r,
    byController: n
} = {}) {
    const a = this;
    if (!a.params.loop) return;
    a.emit("beforeLoopFix");
    const {
        slides: d,
        allowSlidePrev: l,
        allowSlideNext: c,
        slidesEl: v,
        params: p
    } = a;
    if (a.allowSlidePrev = !0, a.allowSlideNext = !0, a.virtual && p.virtual.enabled) {
        t && (!p.centeredSlides && a.snapIndex === 0 ? a.slideTo(a.virtual.slides.length, 0, !1, !0) : p.centeredSlides && a.snapIndex < p.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0)), a.allowSlidePrev = l, a.allowSlideNext = c, a.emit("loopFix");
        return
    }
    const S = p.slidesPerView === "auto" ? a.slidesPerViewDynamic() : Math.ceil(parseFloat(p.slidesPerView, 10));
    let u = p.loopedSlides || S;
    u % p.slidesPerGroup != 0 && (u += p.slidesPerGroup - u % p.slidesPerGroup), a.loopedSlides = u;
    const g = [],
        m = [];
    let b = a.activeIndex;
    typeof r == "undefined" ? r = G(a.slides.filter(T => T.classList.contains("swiper-slide-active"))[0]) : b = r;
    const o = s === "next" || !s,
        f = s === "prev" || !s;
    let h = 0,
        y = 0;
    if (r < u) {
        h = u - r;
        for (let T = 0; T < u - r; T += 1) {
            const C = T - Math.floor(T / d.length) * d.length;
            g.push(d.length - C - 1)
        }
    } else if (r > a.slides.length - u * 2) {
        y = r - (a.slides.length - u * 2);
        for (let T = 0; T < y; T += 1) {
            const C = T - Math.floor(T / d.length) * d.length;
            m.push(C)
        }
    }
    if (f && g.forEach(T => {
            v.prepend(a.slides[T])
        }), o && m.forEach(T => {
            v.append(a.slides[T])
        }), a.recalcSlides(), p.watchSlidesProgress && a.updateSlidesOffset(), t) {
        if (g.length > 0 && f)
            if (typeof e == "undefined") {
                const T = a.slidesGrid[b],
                    P = a.slidesGrid[b + h] - T;
                a.slideTo(b + h, 0, !1, !0), i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += P)
            } else i && a.slideToLoop(e, 0, !1, !0);
        else if (m.length > 0 && o)
            if (typeof e == "undefined") {
                const T = a.slidesGrid[b],
                    P = a.slidesGrid[b - y] - T;
                a.slideTo(b - y, 0, !1, !0), i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += P)
            } else a.slideToLoop(e, 0, !1, !0)
    }
    if (a.allowSlidePrev = l, a.allowSlideNext = c, a.controller && a.controller.control && !n) {
        const T = {
            slideRealIndex: e,
            slideTo: !1,
            direction: s,
            setTranslate: i,
            activeSlideIndex: r,
            byController: !0
        };
        Array.isArray(a.controller.control) ? a.controller.control.forEach(C => {
            C.params.loop && C.loopFix(T)
        }) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix(T)
    }
    a.emit("loopFix")
}

function mt() {
    const e = this,
        {
            slides: t,
            params: s,
            slidesEl: i
        } = e;
    if (!s.loop || e.virtual && e.params.virtual.enabled) return;
    e.recalcSlides();
    const r = [];
    t.forEach(n => {
        const a = typeof n.swiperSlideIndex == "undefined" ? n.getAttribute("data-swiper-slide-index") * 1 : n.swiperSlideIndex;
        r[a] = n
    }), t.forEach(n => {
        n.removeAttribute("data-swiper-slide-index")
    }), r.forEach(n => {
        i.append(n)
    }), e.recalcSlides(), e.slideTo(e.realIndex, 0)
}
var ht = {
    loopCreate: ut,
    loopFix: pt,
    loopDestroy: mt
};

function gt(e) {
    const t = this;
    if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
    const s = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
    s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab"
}

function vt() {
    const e = this;
    e.params.watchOverflow && e.isLocked || e.params.cssMode || (e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "")
}
var St = {
    setGrabCursor: gt,
    unsetGrabCursor: vt
};

function bt(e, t = this) {
    function s(i) {
        if (!i || i === D() || i === O()) return null;
        i.assignedSlot && (i = i.assignedSlot);
        const r = i.closest(e);
        return !r && !i.getRootNode ? null : r || s(i.getRootNode().host)
    }
    return s(t)
}

function Tt(e) {
    const t = this,
        s = D(),
        i = O(),
        r = t.touchEventsData;
    r.evCache.push(e);
    const {
        params: n,
        touches: a,
        enabled: d
    } = t;
    if (!d || !n.simulateTouch && e.pointerType === "mouse" || t.animating && n.preventInteractionOnTransition) return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let c = l.target;
    if (n.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(c) || "which" in l && l.which === 3 || "button" in l && l.button > 0 || r.isTouched && r.isMoved) return;
    const v = !!n.noSwipingClass && n.noSwipingClass !== "",
        p = e.composedPath ? e.composedPath() : e.path;
    v && l.target && l.target.shadowRoot && p && (c = p[0]);
    const S = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`,
        u = !!(l.target && l.target.shadowRoot);
    if (n.noSwiping && (u ? bt(S, c) : c.closest(S))) {
        t.allowClick = !0;
        return
    }
    if (n.swipeHandler && !c.closest(n.swipeHandler)) return;
    a.currentX = l.pageX, a.currentY = l.pageY;
    const g = a.currentX,
        m = a.currentY,
        b = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
        o = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
    if (b && (g <= o || g >= i.innerWidth - o))
        if (b === "prevent") e.preventDefault();
        else return;
    Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }), a.startX = g, a.startY = m, r.touchStartTime = V(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (r.allowThresholdMove = !1);
    let f = !0;
    c.matches(r.focusableElements) && (f = !1, c.nodeName === "SELECT" && (r.isTouched = !1)), s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== c && s.activeElement.blur();
    const h = f && t.allowTouchMove && n.touchStartPreventDefault;
    (n.touchStartForcePreventDefault || h) && !c.isContentEditable && l.preventDefault(), t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !n.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", l)
}

function yt(e) {
    const t = D(),
        s = this,
        i = s.touchEventsData,
        {
            params: r,
            touches: n,
            rtlTranslate: a,
            enabled: d
        } = s;
    if (!d || !r.simulateTouch && e.pointerType === "mouse") return;
    let l = e;
    if (l.originalEvent && (l = l.originalEvent), !i.isTouched) {
        i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", l);
        return
    }
    const c = i.evCache.findIndex(C => C.pointerId === l.pointerId);
    c >= 0 && (i.evCache[c] = l);
    const v = i.evCache.length > 1 ? i.evCache[0] : l,
        p = v.pageX,
        S = v.pageY;
    if (l.preventedByNestedSwiper) {
        n.startX = p, n.startY = S;
        return
    }
    if (!s.allowTouchMove) {
        l.target.matches(i.focusableElements) || (s.allowClick = !1), i.isTouched && (Object.assign(n, {
            startX: p,
            startY: S,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: p,
            currentY: S
        }), i.touchStartTime = V());
        return
    }
    if (r.touchReleaseOnEdges && !r.loop) {
        if (s.isVertical()) {
            if (S < n.startY && s.translate <= s.maxTranslate() || S > n.startY && s.translate >= s.minTranslate()) {
                i.isTouched = !1, i.isMoved = !1;
                return
            }
        } else if (p < n.startX && s.translate <= s.maxTranslate() || p > n.startX && s.translate >= s.minTranslate()) return
    }
    if (t.activeElement && l.target === t.activeElement && l.target.matches(i.focusableElements)) {
        i.isMoved = !0, s.allowClick = !1;
        return
    }
    if (i.allowTouchCallbacks && s.emit("touchMove", l), l.targetTouches && l.targetTouches.length > 1) return;
    n.currentX = p, n.currentY = S;
    const u = n.currentX - n.startX,
        g = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(u ** 2 + g ** 2) < s.params.threshold) return;
    if (typeof i.isScrolling == "undefined") {
        let C;
        s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : u * u + g * g >= 25 && (C = Math.atan2(Math.abs(g), Math.abs(u)) * 180 / Math.PI, i.isScrolling = s.isHorizontal() ? C > r.touchAngle : 90 - C > r.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", l), typeof i.startMoving == "undefined" && (n.currentX !== n.startX || n.currentY !== n.startY) && (i.startMoving = !0), i.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && i.evCache.length > 1) {
        i.isTouched = !1;
        return
    }
    if (!i.startMoving) return;
    s.allowClick = !1, !r.cssMode && l.cancelable && l.preventDefault(), r.touchMoveStopPropagation && !r.nested && l.stopPropagation();
    let m = s.isHorizontal() ? u : g,
        b = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    r.oneWayMovement && (m = Math.abs(m) * (a ? 1 : -1), b = Math.abs(b) * (a ? 1 : -1)), n.diff = m, m *= r.touchRatio, a && (m = -m, b = -b);
    const o = s.touchesDirection;
    s.swipeDirection = m > 0 ? "prev" : "next", s.touchesDirection = b > 0 ? "prev" : "next";
    const f = s.params.loop && !(s.virtual && s.params.virtual.enabled) && !r.cssMode;
    if (!i.isMoved) {
        if (f && s.loopFix({
                direction: s.swipeDirection
            }), i.startTranslate = s.getTranslate(), s.setTransition(0), s.animating) {
            const C = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(C)
        }
        i.allowMomentumBounce = !1, r.grabCursor && (s.allowSlideNext === !0 || s.allowSlidePrev === !0) && s.setGrabCursor(!0), s.emit("sliderFirstMove", l)
    }
    let h;
    i.isMoved && o !== s.touchesDirection && f && Math.abs(m) >= 1 && (s.loopFix({
        direction: s.swipeDirection,
        setTranslate: !0
    }), h = !0), s.emit("sliderMove", l), i.isMoved = !0, i.currentTranslate = m + i.startTranslate;
    let y = !0,
        T = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (T = 0), m > 0 ? (f && !h && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }), i.currentTranslate > s.minTranslate() && (y = !1, r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** T))) : m < 0 && (f && !h && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - (r.slidesPerView === "auto" ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
        }), i.currentTranslate < s.maxTranslate() && (y = !1, r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** T))), y && (l.preventedByNestedSwiper = !0), !s.allowSlideNext && s.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && s.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), !s.allowSlidePrev && !s.allowSlideNext && (i.currentTranslate = i.startTranslate), r.threshold > 0)
        if (Math.abs(m) > r.threshold || i.allowThresholdMove) {
            if (!i.allowThresholdMove) {
                i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
                return
            }
        } else {
            i.currentTranslate = i.startTranslate;
            return
        }!r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(i.currentTranslate), s.setTranslate(i.currentTranslate))
}

function wt(e) {
    const t = this,
        s = t.touchEventsData,
        i = s.evCache.findIndex(h => h.pointerId === e.pointerId);
    if (i >= 0 && s.evCache.splice(i, 1), ["pointercancel", "pointerout", "pointerleave"].includes(e.type)) return;
    const {
        params: r,
        touches: n,
        rtlTranslate: a,
        slidesGrid: d,
        enabled: l
    } = t;
    if (!l || !r.simulateTouch && e.pointerType === "mouse") return;
    let c = e;
    if (c.originalEvent && (c = c.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", c), s.allowTouchCallbacks = !1, !s.isTouched) {
        s.isMoved && r.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, s.startMoving = !1;
        return
    }
    r.grabCursor && s.isMoved && s.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
    const v = V(),
        p = v - s.touchStartTime;
    if (t.allowClick) {
        const h = c.path || c.composedPath && c.composedPath();
        t.updateClickedSlide(h && h[0] || c.target), t.emit("tap click", c), p < 300 && v - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", c)
    }
    if (s.lastClickTime = V(), W(() => {
            t.destroyed || (t.allowClick = !0)
        }), !s.isTouched || !s.isMoved || !t.swipeDirection || n.diff === 0 || s.currentTranslate === s.startTranslate) {
        s.isTouched = !1, s.isMoved = !1, s.startMoving = !1;
        return
    }
    s.isTouched = !1, s.isMoved = !1, s.startMoving = !1;
    let S;
    if (r.followFinger ? S = a ? t.translate : -t.translate : S = -s.currentTranslate, r.cssMode) return;
    if (t.params.freeMode && r.freeMode.enabled) {
        t.freeMode.onTouchEnd({
            currentPos: S
        });
        return
    }
    let u = 0,
        g = t.slidesSizesGrid[0];
    for (let h = 0; h < d.length; h += h < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
        const y = h < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        typeof d[h + y] != "undefined" ? S >= d[h] && S < d[h + y] && (u = h, g = d[h + y] - d[h]) : S >= d[h] && (u = h, g = d[d.length - 1] - d[d.length - 2])
    }
    let m = null,
        b = null;
    r.rewind && (t.isBeginning ? b = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (m = 0));
    const o = (S - d[u]) / g,
        f = u < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (p > r.longSwipesMs) {
        if (!r.longSwipes) {
            t.slideTo(t.activeIndex);
            return
        }
        t.swipeDirection === "next" && (o >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? m : u + f) : t.slideTo(u)), t.swipeDirection === "prev" && (o > 1 - r.longSwipesRatio ? t.slideTo(u + f) : b !== null && o < 0 && Math.abs(o) > r.longSwipesRatio ? t.slideTo(b) : t.slideTo(u))
    } else {
        if (!r.shortSwipes) {
            t.slideTo(t.activeIndex);
            return
        }
        t.navigation && (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl) ? c.target === t.navigation.nextEl ? t.slideTo(u + f) : t.slideTo(u) : (t.swipeDirection === "next" && t.slideTo(m !== null ? m : u + f), t.swipeDirection === "prev" && t.slideTo(b !== null ? b : u))
    }
}
let ce;

function fe() {
    const e = this,
        {
            params: t,
            el: s
        } = e;
    if (s && s.offsetWidth === 0) return;
    t.breakpoints && e.setBreakpoint();
    const {
        allowSlideNext: i,
        allowSlidePrev: r,
        snapGrid: n
    } = e, a = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
    const d = a && t.loop;
    (t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !d ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.params.loop && !a ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(ce), ce = setTimeout(() => {
        e.autoplay.resume()
    }, 500)), e.allowSlidePrev = r, e.allowSlideNext = i, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow()
}

function xt(e) {
    const t = this;
    !t.enabled || t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
}

function Et() {
    const e = this,
        {
            wrapperEl: t,
            rtlTranslate: s,
            enabled: i
        } = e;
    if (!i) return;
    e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
    let r;
    const n = e.maxTranslate() - e.minTranslate();
    n === 0 ? r = 0 : r = (e.translate - e.minTranslate()) / n, r !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
}
const _ = (e, t) => {
    const s = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
        i = t.closest(s());
    if (i) {
        const r = i.querySelector(`.${e.params.lazyPreloaderClass}`);
        r && r.remove()
    }
};

function Ct(e) {
    const t = this;
    _(t, e.target), t.update()
}
let ue = !1;

function Mt() {}
const pe = (e, t) => {
    const s = D(),
        {
            params: i,
            el: r,
            wrapperEl: n,
            device: a
        } = e,
        d = !!i.nested,
        l = t === "on" ? "addEventListener" : "removeEventListener",
        c = t;
    r[l]("pointerdown", e.onTouchStart, {
        passive: !1
    }), s[l]("pointermove", e.onTouchMove, {
        passive: !1,
        capture: d
    }), s[l]("pointerup", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointercancel", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointerout", e.onTouchEnd, {
        passive: !0
    }), s[l]("pointerleave", e.onTouchEnd, {
        passive: !0
    }), (i.preventClicks || i.preventClicksPropagation) && r[l]("click", e.onClick, !0), i.cssMode && n[l]("scroll", e.onScroll), i.updateOnWindowResize ? e[c](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", fe, !0) : e[c]("observerUpdate", fe, !0), r[l]("load", e.onLoad, {
        capture: !0
    })
};

function Pt() {
    const e = this,
        t = D(),
        {
            params: s
        } = e;
    e.onTouchStart = Tt.bind(e), e.onTouchMove = yt.bind(e), e.onTouchEnd = wt.bind(e), s.cssMode && (e.onScroll = Et.bind(e)), e.onClick = xt.bind(e), e.onLoad = Ct.bind(e), ue || (t.addEventListener("touchstart", Mt), ue = !0), pe(e, "on")
}

function Lt() {
    pe(this, "off")
}
var kt = {
    attachEvents: Pt,
    detachEvents: Lt
};
const me = (e, t) => e.grid && t.grid && t.grid.rows > 1;

function Ot() {
    const e = this,
        {
            realIndex: t,
            initialized: s,
            params: i,
            el: r
        } = e,
        n = i.breakpoints;
    if (!n || n && Object.keys(n).length === 0) return;
    const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
    if (!a || e.currentBreakpoint === a) return;
    const l = (a in n ? n[a] : void 0) || e.originalParams,
        c = me(e, i),
        v = me(e, l),
        p = i.enabled;
    c && !v ? (r.classList.remove(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`), e.emitContainerClasses()) : !c && v && (r.classList.add(`${i.containerModifierClass}grid`), (l.grid.fill && l.grid.fill === "column" || !l.grid.fill && i.grid.fill === "column") && r.classList.add(`${i.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(m => {
        const b = i[m] && i[m].enabled,
            o = l[m] && l[m].enabled;
        b && !o && e[m].disable(), !b && o && e[m].enable()
    });
    const S = l.direction && l.direction !== i.direction,
        u = i.loop && (l.slidesPerView !== i.slidesPerView || S);
    S && s && e.changeDirection(), I(e.params, l);
    const g = e.params.enabled;
    Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev
    }), p && !g ? e.disable() : !p && g && e.enable(), e.currentBreakpoint = a, e.emit("_beforeBreakpoint", l), u && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()), e.emit("breakpoint", l)
}

function It(e, t = "window", s) {
    if (!e || t === "container" && !s) return;
    let i = !1;
    const r = O(),
        n = t === "window" ? r.innerHeight : s.clientHeight,
        a = Object.keys(e).map(d => {
            if (typeof d == "string" && d.indexOf("@") === 0) {
                const l = parseFloat(d.substr(1));
                return {
                    value: n * l,
                    point: d
                }
            }
            return {
                value: d,
                point: d
            }
        });
    a.sort((d, l) => parseInt(d.value, 10) - parseInt(l.value, 10));
    for (let d = 0; d < a.length; d += 1) {
        const {
            point: l,
            value: c
        } = a[d];
        t === "window" ? r.matchMedia(`(min-width: ${c}px)`).matches && (i = l) : c <= s.clientWidth && (i = l)
    }
    return i || "max"
}
var zt = {
    setBreakpoint: Ot,
    getBreakpoint: It
};

function At(e, t) {
    const s = [];
    return e.forEach(i => {
        typeof i == "object" ? Object.keys(i).forEach(r => {
            i[r] && s.push(t + r)
        }) : typeof i == "string" && s.push(t + i)
    }), s
}

function $t() {
    const e = this,
        {
            classNames: t,
            params: s,
            rtl: i,
            el: r,
            device: n
        } = e,
        a = At(["initialized", s.direction, {
            "free-mode": e.params.freeMode && s.freeMode.enabled
        }, {
            autoheight: s.autoHeight
        }, {
            rtl: i
        }, {
            grid: s.grid && s.grid.rows > 1
        }, {
            "grid-column": s.grid && s.grid.rows > 1 && s.grid.fill === "column"
        }, {
            android: n.android
        }, {
            ios: n.ios
        }, {
            "css-mode": s.cssMode
        }, {
            centered: s.cssMode && s.centeredSlides
        }, {
            "watch-progress": s.watchSlidesProgress
        }], s.containerModifierClass);
    t.push(...a), r.classList.add(...t), e.emitContainerClasses()
}

function Gt() {
    const e = this,
        {
            el: t,
            classNames: s
        } = e;
    t.classList.remove(...s), e.emitContainerClasses()
}
var Bt = {
    addClasses: $t,
    removeClasses: Gt
};

function Dt() {
    const e = this,
        {
            isLocked: t,
            params: s
        } = e,
        {
            slidesOffsetBefore: i
        } = s;
    if (i) {
        const r = e.slides.length - 1,
            n = e.slidesGrid[r] + e.slidesSizesGrid[r] + i * 2;
        e.isLocked = e.size > n
    } else e.isLocked = e.snapGrid.length === 1;
    s.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), s.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
}
var Vt = {
        checkOverflow: Dt
    },
    he = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopedSlides: null,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };

function Ht(e, t) {
    return function(i = {}) {
        const r = Object.keys(i)[0],
            n = i[r];
        if (typeof n != "object" || n === null) {
            I(t, i);
            return
        }
        if (["navigation", "pagination", "scrollbar"].indexOf(r) >= 0 && e[r] === !0 && (e[r] = {
                auto: !0
            }), !(r in e && "enabled" in n)) {
            I(t, i);
            return
        }
        e[r] === !0 && (e[r] = {
            enabled: !0
        }), typeof e[r] == "object" && !("enabled" in e[r]) && (e[r].enabled = !0), e[r] || (e[r] = {
            enabled: !1
        }), I(t, i)
    }
}
const J = {
        eventsEmitter: Be,
        update: Xe,
        translate: Qe,
        transition: it,
        slide: ft,
        loop: ht,
        grabCursor: St,
        events: kt,
        breakpoints: zt,
        checkOverflow: Vt,
        classes: Bt
    },
    Q = {};
class z {
    constructor(...t) {
        let s, i;
        t.length === 1 && t[0].constructor && Object.prototype.toString.call(t[0]).slice(8, -1) === "Object" ? i = t[0] : [s, i] = t, i || (i = {}), i = I({}, i), s && !i.el && (i.el = s);
        const r = D();
        if (i.el && typeof i.el == "string" && r.querySelectorAll(i.el).length > 1) {
            const l = [];
            return r.querySelectorAll(i.el).forEach(c => {
                const v = I({}, i, {
                    el: c
                });
                l.push(new z(v))
            }), l
        }
        const n = this;
        n.__swiper__ = !0, n.support = oe(), n.device = Ie({
            userAgent: i.userAgent
        }), n.browser = Ae(), n.eventsListeners = {}, n.eventsAnyListeners = [], n.modules = [...n.__modules__], i.modules && Array.isArray(i.modules) && n.modules.push(...i.modules);
        const a = {};
        n.modules.forEach(l => {
            l({
                params: i,
                swiper: n,
                extendParams: Ht(i, a),
                on: n.on.bind(n),
                once: n.once.bind(n),
                off: n.off.bind(n),
                emit: n.emit.bind(n)
            })
        });
        const d = I({}, he, a);
        return n.params = I({}, d, Q, i), n.originalParams = I({}, n.params), n.passedParams = I({}, i), n.params && n.params.on && Object.keys(n.params.on).forEach(l => {
            n.on(l, n.params.on[l])
        }), n.params && n.params.onAny && n.onAny(n.params.onAny), Object.assign(n, {
            enabled: n.params.enabled,
            el: s,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal() {
                return n.params.direction === "horizontal"
            },
            isVertical() {
                return n.params.direction === "vertical"
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: n.params.allowSlideNext,
            allowSlidePrev: n.params.allowSlidePrev,
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: n.params.focusableElements,
                lastClickTime: V(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                evCache: []
            },
            allowClick: !0,
            allowTouchMove: n.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }), n.emit("_swiper"), n.params.init && n.init(), n
    }
    recalcSlides() {
        const t = this,
            {
                slidesEl: s,
                params: i
            } = t;
        t.slides = $(s, `.${i.slideClass}, swiper-slide`)
    }
    enable() {
        const t = this;
        t.enabled || (t.enabled = !0, t.params.grabCursor && t.setGrabCursor(), t.emit("enable"))
    }
    disable() {
        const t = this;
        !t.enabled || (t.enabled = !1, t.params.grabCursor && t.unsetGrabCursor(), t.emit("disable"))
    }
    setProgress(t, s) {
        const i = this;
        t = Math.min(Math.max(t, 0), 1);
        const r = i.minTranslate(),
            a = (i.maxTranslate() - r) * t + r;
        i.translateTo(a, typeof s == "undefined" ? 0 : s), i.updateActiveIndex(), i.updateSlidesClasses()
    }
    emitContainerClasses() {
        const t = this;
        if (!t.params._emitClasses || !t.el) return;
        const s = t.el.className.split(" ").filter(i => i.indexOf("swiper") === 0 || i.indexOf(t.params.containerModifierClass) === 0);
        t.emit("_containerClasses", s.join(" "))
    }
    getSlideClasses(t) {
        const s = this;
        return s.destroyed ? "" : t.className.split(" ").filter(i => i.indexOf("swiper-slide") === 0 || i.indexOf(s.params.slideClass) === 0).join(" ")
    }
    emitSlidesClasses() {
        const t = this;
        if (!t.params._emitClasses || !t.el) return;
        const s = [];
        t.slides.forEach(i => {
            const r = t.getSlideClasses(i);
            s.push({
                slideEl: i,
                classNames: r
            }), t.emit("_slideClass", i, r)
        }), t.emit("_slideClasses", s)
    }
    slidesPerViewDynamic(t = "current", s = !1) {
        const i = this,
            {
                params: r,
                slides: n,
                slidesGrid: a,
                slidesSizesGrid: d,
                size: l,
                activeIndex: c
            } = i;
        let v = 1;
        if (r.centeredSlides) {
            let p = n[c].swiperSlideSize,
                S;
            for (let u = c + 1; u < n.length; u += 1) n[u] && !S && (p += n[u].swiperSlideSize, v += 1, p > l && (S = !0));
            for (let u = c - 1; u >= 0; u -= 1) n[u] && !S && (p += n[u].swiperSlideSize, v += 1, p > l && (S = !0))
        } else if (t === "current")
            for (let p = c + 1; p < n.length; p += 1)(s ? a[p] + d[p] - a[c] < l : a[p] - a[c] < l) && (v += 1);
        else
            for (let p = c - 1; p >= 0; p -= 1) a[c] - a[p] < l && (v += 1);
        return v
    }
    update() {
        const t = this;
        if (!t || t.destroyed) return;
        const {
            snapGrid: s,
            params: i
        } = t;
        i.breakpoints && t.setBreakpoint(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach(a => {
            a.complete && _(t, a)
        }), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses();

        function r() {
            const a = t.rtlTranslate ? t.translate * -1 : t.translate,
                d = Math.min(Math.max(a, t.maxTranslate()), t.minTranslate());
            t.setTranslate(d), t.updateActiveIndex(), t.updateSlidesClasses()
        }
        let n;
        t.params.freeMode && t.params.freeMode.enabled ? (r(), t.params.autoHeight && t.updateAutoHeight()) : ((t.params.slidesPerView === "auto" || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? n = t.slideTo(t.slides.length - 1, 0, !1, !0) : n = t.slideTo(t.activeIndex, 0, !1, !0), n || r()), i.watchOverflow && s !== t.snapGrid && t.checkOverflow(), t.emit("update")
    }
    changeDirection(t, s = !0) {
        const i = this,
            r = i.params.direction;
        return t || (t = r === "horizontal" ? "vertical" : "horizontal"), t === r || t !== "horizontal" && t !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${r}`), i.el.classList.add(`${i.params.containerModifierClass}${t}`), i.emitContainerClasses(), i.params.direction = t, i.slides.forEach(n => {
            t === "vertical" ? n.style.width = "" : n.style.height = ""
        }), i.emit("changeDirection"), s && i.update()), i
    }
    changeLanguageDirection(t) {
        const s = this;
        s.rtl && t === "rtl" || !s.rtl && t === "ltr" || (s.rtl = t === "rtl", s.rtlTranslate = s.params.direction === "horizontal" && s.rtl, s.rtl ? (s.el.classList.add(`${s.params.containerModifierClass}rtl`), s.el.dir = "rtl") : (s.el.classList.remove(`${s.params.containerModifierClass}rtl`), s.el.dir = "ltr"), s.update())
    }
    mount(t) {
        const s = this;
        if (s.mounted) return !0;
        let i = t || s.params.el;
        if (typeof i == "string" && (i = document.querySelector(i)), !i) return !1;
        i.swiper = s, i.shadowEl && (s.isElement = !0);
        const r = () => `.${(s.params.wrapperClass||"").trim().split(" ").join(".")}`;
        let a = (() => i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(r()) : $(i, r())[0])();
        return !a && s.params.createElements && (a = X("div", s.params.wrapperClass), i.append(a), $(i, `.${s.params.slideClass}`).forEach(d => {
            a.append(d)
        })), Object.assign(s, {
            el: i,
            wrapperEl: a,
            slidesEl: s.isElement ? i : a,
            mounted: !0,
            rtl: i.dir.toLowerCase() === "rtl" || B(i, "direction") === "rtl",
            rtlTranslate: s.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || B(i, "direction") === "rtl"),
            wrongRTL: B(a, "display") === "-webkit-box"
        }), !0
    }
    init(t) {
        const s = this;
        return s.initialized || s.mount(t) === !1 || (s.emit("beforeInit"), s.params.breakpoints && s.setBreakpoint(), s.addClasses(), s.updateSize(), s.updateSlides(), s.params.watchOverflow && s.checkOverflow(), s.params.grabCursor && s.enabled && s.setGrabCursor(), s.params.loop && s.virtual && s.params.virtual.enabled ? s.slideTo(s.params.initialSlide + s.virtual.slidesBefore, 0, s.params.runCallbacksOnInit, !1, !0) : s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit, !1, !0), s.params.loop && s.loopCreate(), s.attachEvents(), [...s.el.querySelectorAll('[loading="lazy"]')].forEach(r => {
            r.complete ? _(s, r) : r.addEventListener("load", n => {
                _(s, n.target)
            })
        }), s.initialized = !0, s.emit("init"), s.emit("afterInit")), s
    }
    destroy(t = !0, s = !0) {
        const i = this,
            {
                params: r,
                el: n,
                wrapperEl: a,
                slides: d
            } = i;
        return typeof i.params == "undefined" || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), r.loop && i.loopDestroy(), s && (i.removeClasses(), n.removeAttribute("style"), a.removeAttribute("style"), d && d.length && d.forEach(l => {
            l.classList.remove(r.slideVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), l.removeAttribute("style"), l.removeAttribute("data-swiper-slide-index")
        })), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(l => {
            i.off(l)
        }), t !== !1 && (i.el.swiper = null, we(i)), i.destroyed = !0), null
    }
    static extendDefaults(t) {
        I(Q, t)
    }
    static get extendedDefaults() {
        return Q
    }
    static get defaults() {
        return he
    }
    static installModule(t) {
        z.prototype.__modules__ || (z.prototype.__modules__ = []);
        const s = z.prototype.__modules__;
        typeof t == "function" && s.indexOf(t) < 0 && s.push(t)
    }
    static use(t) {
        return Array.isArray(t) ? (t.forEach(s => z.installModule(s)), z) : (z.installModule(t), z)
    }
}
Object.keys(J).forEach(e => {
    Object.keys(J[e]).forEach(t => {
        z.prototype[t] = J[e][t]
    })
});
z.use([$e, Ge]);

function ge(e, t, s, i) {
    return e.params.createElements && Object.keys(i).forEach(r => {
        if (!s[r] && s.auto === !0) {
            let n = $(e.el, `.${i[r]}`)[0];
            n || (n = X("div", i[r]), n.className = i[r], e.el.append(n)), s[r] = n, t[r] = n
        }
    }), s
}

function Rt({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
}) {
    t({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }), e.navigation = {
        nextEl: null,
        prevEl: null
    };
    const r = g => (Array.isArray(g) || (g = [g].filter(m => !!m)), g);

    function n(g) {
        let m;
        return g && typeof g == "string" && e.isElement && (m = e.el.shadowRoot.querySelector(g), m) ? m : (g && (typeof g == "string" && (m = [...document.querySelectorAll(g)]), e.params.uniqueNavElements && typeof g == "string" && m.length > 1 && e.el.querySelectorAll(g).length === 1 && (m = e.el.querySelector(g))), g && !m ? g : m)
    }

    function a(g, m) {
        const b = e.params.navigation;
        g = r(g), g.forEach(o => {
            o && (o.classList[m ? "add" : "remove"](b.disabledClass), o.tagName === "BUTTON" && (o.disabled = m), e.params.watchOverflow && e.enabled && o.classList[e.isLocked ? "add" : "remove"](b.lockClass))
        })
    }

    function d() {
        const {
            nextEl: g,
            prevEl: m
        } = e.navigation;
        if (e.params.loop) {
            a(m, !1), a(g, !1);
            return
        }
        a(m, e.isBeginning && !e.params.rewind), a(g, e.isEnd && !e.params.rewind)
    }

    function l(g) {
        g.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), i("navigationPrev"))
    }

    function c(g) {
        g.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), i("navigationNext"))
    }

    function v() {
        const g = e.params.navigation;
        if (e.params.navigation = ge(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }), !(g.nextEl || g.prevEl)) return;
        let m = n(g.nextEl),
            b = n(g.prevEl);
        Object.assign(e.navigation, {
            nextEl: m,
            prevEl: b
        }), m = r(m), b = r(b);
        const o = (f, h) => {
            f && f.addEventListener("click", h === "next" ? c : l), !e.enabled && f && f.classList.add(g.lockClass)
        };
        m.forEach(f => o(f, "next")), b.forEach(f => o(f, "prev"))
    }

    function p() {
        let {
            nextEl: g,
            prevEl: m
        } = e.navigation;
        g = r(g), m = r(m);
        const b = (o, f) => {
            o.removeEventListener("click", f === "next" ? c : l), o.classList.remove(e.params.navigation.disabledClass)
        };
        g.forEach(o => b(o, "next")), m.forEach(o => b(o, "prev"))
    }
    s("init", () => {
        e.params.navigation.enabled === !1 ? u() : (v(), d())
    }), s("toEdge fromEdge lock unlock", () => {
        d()
    }), s("destroy", () => {
        p()
    }), s("enable disable", () => {
        let {
            nextEl: g,
            prevEl: m
        } = e.navigation;
        g = r(g), m = r(m), [...g, ...m].filter(b => !!b).forEach(b => b.classList[e.enabled ? "remove" : "add"](e.params.navigation.lockClass))
    }), s("click", (g, m) => {
        let {
            nextEl: b,
            prevEl: o
        } = e.navigation;
        b = r(b), o = r(o);
        const f = m.target;
        if (e.params.navigation.hideOnClick && !o.includes(f) && !b.includes(f)) {
            if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === f || e.pagination.el.contains(f))) return;
            let h;
            b.length ? h = b[0].classList.contains(e.params.navigation.hiddenClass) : o.length && (h = o[0].classList.contains(e.params.navigation.hiddenClass)), i(h === !0 ? "navigationShow" : "navigationHide"), [...b, ...o].filter(y => !!y).forEach(y => y.classList.toggle(e.params.navigation.hiddenClass))
        }
    });
    const S = () => {
            e.el.classList.remove(e.params.navigation.navigationDisabledClass), v(), d()
        },
        u = () => {
            e.el.classList.add(e.params.navigation.navigationDisabledClass), p()
        };
    Object.assign(e.navigation, {
        enable: S,
        disable: u,
        update: d,
        init: v,
        destroy: p
    })
}

function H(e = "") {
    return `.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`
}

function Wt({
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
}) {
    const r = "swiper-pagination";
    t({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: o => o,
            formatFractionTotal: o => o,
            bulletClass: `${r}-bullet`,
            bulletActiveClass: `${r}-bullet-active`,
            modifierClass: `${r}-`,
            currentClass: `${r}-current`,
            totalClass: `${r}-total`,
            hiddenClass: `${r}-hidden`,
            progressbarFillClass: `${r}-progressbar-fill`,
            progressbarOppositeClass: `${r}-progressbar-opposite`,
            clickableClass: `${r}-clickable`,
            lockClass: `${r}-lock`,
            horizontalClass: `${r}-horizontal`,
            verticalClass: `${r}-vertical`,
            paginationDisabledClass: `${r}-disabled`
        }
    }), e.pagination = {
        el: null,
        bullets: []
    };
    let n, a = 0;
    const d = o => (Array.isArray(o) || (o = [o].filter(f => !!f)), o);

    function l() {
        return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0
    }

    function c(o, f) {
        const {
            bulletActiveClass: h
        } = e.params.pagination;
        !o || (o = o[`${f==="prev"?"previous":"next"}ElementSibling`], o && (o.classList.add(`${h}-${f}`), o = o[`${f==="prev"?"previous":"next"}ElementSibling`], o && o.classList.add(`${h}-${f}-${f}`)))
    }

    function v(o) {
        if (!o.target.matches(H(e.params.pagination.bulletClass))) return;
        o.preventDefault();
        const h = G(o.target) * e.params.slidesPerGroup;
        e.params.loop ? e.slideToLoop(h) : e.slideTo(h)
    }

    function p() {
        const o = e.rtl,
            f = e.params.pagination;
        if (l()) return;
        let h = e.pagination.el;
        h = d(h);
        let y;
        const T = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            C = e.params.loop ? Math.ceil(T / e.params.slidesPerGroup) : e.snapGrid.length;
        if (e.params.loop ? y = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex : typeof e.snapIndex != "undefined" ? y = e.snapIndex : y = e.activeIndex || 0, f.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
            const P = e.pagination.bullets;
            let L, M, A;
            if (f.dynamicBullets && (n = Y(P[0], e.isHorizontal() ? "width" : "height", !0), h.forEach(w => {
                    w.style[e.isHorizontal() ? "width" : "height"] = `${n*(f.dynamicMainBullets+4)}px`
                }), f.dynamicMainBullets > 1 && e.previousIndex !== void 0 && (a += y - (e.previousIndex || 0), a > f.dynamicMainBullets - 1 ? a = f.dynamicMainBullets - 1 : a < 0 && (a = 0)), L = Math.max(y - a, 0), M = L + (Math.min(P.length, f.dynamicMainBullets) - 1), A = (M + L) / 2), P.forEach(w => {
                    w.classList.remove(...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(x => `${f.bulletActiveClass}${x}`))
                }), h.length > 1) P.forEach(w => {
                const x = G(w);
                x === y && w.classList.add(f.bulletActiveClass), f.dynamicBullets && (x >= L && x <= M && w.classList.add(`${f.bulletActiveClass}-main`), x === L && c(w, "prev"), x === M && c(w, "next"))
            });
            else {
                const w = P[y];
                if (w && w.classList.add(f.bulletActiveClass), f.dynamicBullets) {
                    const x = P[L],
                        E = P[M];
                    for (let k = L; k <= M; k += 1) P[k].classList.add(`${f.bulletActiveClass}-main`);
                    c(x, "prev"), c(E, "next")
                }
            }
            if (f.dynamicBullets) {
                const w = Math.min(P.length, f.dynamicMainBullets + 4),
                    x = (n * w - n) / 2 - A * n,
                    E = o ? "right" : "left";
                P.forEach(k => {
                    k.style[e.isHorizontal() ? E : "top"] = `${x}px`
                })
            }
        }
        h.forEach((P, L) => {
            if (f.type === "fraction" && (P.querySelectorAll(H(f.currentClass)).forEach(M => {
                    M.textContent = f.formatFractionCurrent(y + 1)
                }), P.querySelectorAll(H(f.totalClass)).forEach(M => {
                    M.textContent = f.formatFractionTotal(C)
                })), f.type === "progressbar") {
                let M;
                f.progressbarOpposite ? M = e.isHorizontal() ? "vertical" : "horizontal" : M = e.isHorizontal() ? "horizontal" : "vertical";
                const A = (y + 1) / C;
                let w = 1,
                    x = 1;
                M === "horizontal" ? w = A : x = A, P.querySelectorAll(H(f.progressbarFillClass)).forEach(E => {
                    E.style.transform = `translate3d(0,0,0) scaleX(${w}) scaleY(${x})`, E.style.transitionDuration = `${e.params.speed}ms`
                })
            }
            f.type === "custom" && f.renderCustom ? (P.innerHTML = f.renderCustom(e, y + 1, C), L === 0 && i("paginationRender", P)) : (L === 0 && i("paginationRender", P), i("paginationUpdate", P)), e.params.watchOverflow && e.enabled && P.classList[e.isLocked ? "add" : "remove"](f.lockClass)
        })
    }

    function S() {
        const o = e.params.pagination;
        if (l()) return;
        const f = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length;
        let h = e.pagination.el;
        h = d(h);
        let y = "";
        if (o.type === "bullets") {
            let T = e.params.loop ? Math.ceil(f / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && T > f && (T = f);
            for (let C = 0; C < T; C += 1) o.renderBullet ? y += o.renderBullet.call(e, C, o.bulletClass) : y += `<${o.bulletElement} class="${o.bulletClass}"></${o.bulletElement}>`
        }
        o.type === "fraction" && (o.renderFraction ? y = o.renderFraction.call(e, o.currentClass, o.totalClass) : y = `<span class="${o.currentClass}"></span> / <span class="${o.totalClass}"></span>`), o.type === "progressbar" && (o.renderProgressbar ? y = o.renderProgressbar.call(e, o.progressbarFillClass) : y = `<span class="${o.progressbarFillClass}"></span>`), h.forEach(T => {
            o.type !== "custom" && (T.innerHTML = y || ""), o.type === "bullets" && (e.pagination.bullets = [...T.querySelectorAll(H(o.bulletClass))])
        }), o.type !== "custom" && i("paginationRender", h[0])
    }

    function u() {
        e.params.pagination = ge(e, e.originalParams.pagination, e.params.pagination, {
            el: "swiper-pagination"
        });
        const o = e.params.pagination;
        if (!o.el) return;
        let f;
        typeof o.el == "string" && e.isElement && (f = e.el.shadowRoot.querySelector(o.el)), !f && typeof o.el == "string" && (f = [...document.querySelectorAll(o.el)]), f || (f = o.el), !(!f || f.length === 0) && (e.params.uniqueNavElements && typeof o.el == "string" && Array.isArray(f) && f.length > 1 && (f = [...e.el.querySelectorAll(o.el)], f.length > 1 && (f = f.filter(h => le(h, ".swiper")[0] === e.el)[0])), Array.isArray(f) && f.length === 1 && (f = f[0]), Object.assign(e.pagination, {
            el: f
        }), f = d(f), f.forEach(h => {
            o.type === "bullets" && o.clickable && h.classList.add(o.clickableClass), h.classList.add(o.modifierClass + o.type), h.classList.add(e.isHorizontal() ? o.horizontalClass : o.verticalClass), o.type === "bullets" && o.dynamicBullets && (h.classList.add(`${o.modifierClass}${o.type}-dynamic`), a = 0, o.dynamicMainBullets < 1 && (o.dynamicMainBullets = 1)), o.type === "progressbar" && o.progressbarOpposite && h.classList.add(o.progressbarOppositeClass), o.clickable && h.addEventListener("click", v), e.enabled || h.classList.add(o.lockClass)
        }))
    }

    function g() {
        const o = e.params.pagination;
        if (l()) return;
        let f = e.pagination.el;
        f && (f = d(f), f.forEach(h => {
            h.classList.remove(o.hiddenClass), h.classList.remove(o.modifierClass + o.type), h.classList.remove(e.isHorizontal() ? o.horizontalClass : o.verticalClass), o.clickable && h.removeEventListener("click", v)
        })), e.pagination.bullets && e.pagination.bullets.forEach(h => h.classList.remove(o.bulletActiveClass))
    }
    s("init", () => {
        e.params.pagination.enabled === !1 ? b() : (u(), S(), p())
    }), s("activeIndexChange", () => {
        typeof e.snapIndex == "undefined" && p()
    }), s("snapIndexChange", () => {
        p()
    }), s("snapGridLengthChange", () => {
        S(), p()
    }), s("destroy", () => {
        g()
    }), s("enable disable", () => {
        let {
            el: o
        } = e.pagination;
        o && (o = d(o), o.forEach(f => f.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)))
    }), s("lock unlock", () => {
        p()
    }), s("click", (o, f) => {
        const h = f.target;
        let {
            el: y
        } = e.pagination;
        if (Array.isArray(y) || (y = [y].filter(T => !!T)), e.params.pagination.el && e.params.pagination.hideOnClick && y && y.length > 0 && !h.classList.contains(e.params.pagination.bulletClass)) {
            if (e.navigation && (e.navigation.nextEl && h === e.navigation.nextEl || e.navigation.prevEl && h === e.navigation.prevEl)) return;
            const T = y[0].classList.contains(e.params.pagination.hiddenClass);
            i(T === !0 ? "paginationShow" : "paginationHide"), y.forEach(C => C.classList.toggle(e.params.pagination.hiddenClass))
        }
    });
    const m = () => {
            e.el.classList.remove(e.params.pagination.paginationDisabledClass);
            let {
                el: o
            } = e.pagination;
            o && (o = d(o), o.forEach(f => f.classList.remove(e.params.pagination.paginationDisabledClass))), u(), S(), p()
        },
        b = () => {
            e.el.classList.add(e.params.pagination.paginationDisabledClass);
            let {
                el: o
            } = e.pagination;
            o && (o = d(o), o.forEach(f => f.classList.add(e.params.pagination.paginationDisabledClass))), g()
        };
    Object.assign(e.pagination, {
        enable: m,
        disable: b,
        render: S,
        update: p,
        init: u,
        destroy: g
    })
}

function Ft(e) {
    const {
        effect: t,
        swiper: s,
        on: i,
        setTranslate: r,
        setTransition: n,
        overwriteParams: a,
        perspective: d,
        recreateShadows: l,
        getEffectParams: c
    } = e;
    i("beforeInit", () => {
        if (s.params.effect !== t) return;
        s.classNames.push(`${s.params.containerModifierClass}${t}`), d && d() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const p = a ? a() : {};
        Object.assign(s.params, p), Object.assign(s.originalParams, p)
    }), i("setTranslate", () => {
        s.params.effect === t && r()
    }), i("setTransition", (p, S) => {
        s.params.effect === t && n(S)
    }), i("transitionEnd", () => {
        if (s.params.effect === t && l) {
            if (!c || !c().slideShadows) return;
            s.slides.forEach(p => {
                p.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(S => S.remove())
            }), l()
        }
    });
    let v;
    i("virtualUpdate", () => {
        s.params.effect === t && (s.slides.length || (v = !0), requestAnimationFrame(() => {
            v && s.slides && s.slides.length && (r(), v = !1)
        }))
    })
}

function Nt(e, t) {
    const s = q(t);
    return s !== t && (s.style.backfaceVisibility = "hidden", s.style["-webkit-backface-visibility"] = "hidden"), s
}

function _t({
    swiper: e,
    duration: t,
    transformElements: s,
    allSlides: i
}) {
    const {
        activeIndex: r
    } = e, n = a => a.parentElement ? a.parentElement : e.slides.filter(l => l.shadowEl && l.shadowEl === a.parentNode)[0];
    if (e.params.virtualTranslate && t !== 0) {
        let a = !1,
            d;
        i ? d = s : d = s.filter(l => {
            const c = l.classList.contains("swiper-slide-transform") ? n(l) : l;
            return G(c) === r
        }), d.forEach(l => {
            Le(l, () => {
                if (a || !e || e.destroyed) return;
                a = !0, e.animating = !1;
                const c = new window.CustomEvent("transitionend", {
                    bubbles: !0,
                    cancelable: !0
                });
                e.wrapperEl.dispatchEvent(c)
            })
        })
    }
}

function jt(e, t, s) {
    const i = `swiper-slide-shadow${s?`-${s}`:""}`,
        r = q(t);
    let n = r.querySelector(`.${i}`);
    return n || (n = X("div", `swiper-slide-shadow${s?`-${s}`:""}`), r.append(n)), n
}

function qt({
    swiper: e,
    extendParams: t,
    on: s
}) {
    t({
        creativeEffect: {
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1
            },
            next: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1
            }
        }
    });
    const i = a => typeof a == "string" ? a : `${a}px`;
    Ft({
        effect: "creative",
        swiper: e,
        on: s,
        setTranslate: () => {
            const {
                slides: a,
                wrapperEl: d,
                slidesSizesGrid: l
            } = e, c = e.params.creativeEffect, {
                progressMultiplier: v
            } = c, p = e.params.centeredSlides;
            if (p) {
                const S = l[0] / 2 - e.params.slidesOffsetBefore || 0;
                d.style.transform = `translateX(calc(50% - ${S}px))`
            }
            for (let S = 0; S < a.length; S += 1) {
                const u = a[S],
                    g = u.progress,
                    m = Math.min(Math.max(u.progress, -c.limitProgress), c.limitProgress);
                let b = m;
                p || (b = Math.min(Math.max(u.originalProgress, -c.limitProgress), c.limitProgress));
                const o = u.swiperSlideOffset,
                    f = [e.params.cssMode ? -o - e.translate : -o, 0, 0],
                    h = [0, 0, 0];
                let y = !1;
                e.isHorizontal() || (f[1] = f[0], f[0] = 0);
                let T = {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    scale: 1,
                    opacity: 1
                };
                m < 0 ? (T = c.next, y = !0) : m > 0 && (T = c.prev, y = !0), f.forEach((x, E) => {
                    f[E] = `calc(${x}px + (${i(T.translate[E])} * ${Math.abs(m*v)}))`
                }), h.forEach((x, E) => {
                    h[E] = T.rotate[E] * Math.abs(m * v)
                }), u.style.zIndex = -Math.abs(Math.round(g)) + a.length;
                const C = f.join(", "),
                    P = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                    L = b < 0 ? `scale(${1+(1-T.scale)*b*v})` : `scale(${1-(1-T.scale)*b*v})`,
                    M = b < 0 ? 1 + (1 - T.opacity) * b * v : 1 - (1 - T.opacity) * b * v,
                    A = `translate3d(${C}) ${P} ${L}`;
                if (y && T.shadow || !y) {
                    let x = u.querySelector(".swiper-slide-shadow");
                    if (!x && T.shadow && (x = jt(c, u)), x) {
                        const E = c.shadowPerProgress ? m * (1 / c.limitProgress) : m;
                        x.style.opacity = Math.min(Math.max(Math.abs(E), 0), 1)
                    }
                }
                const w = Nt(c, u);
                w.style.transform = A, w.style.opacity = M, T.origin && (w.style.transformOrigin = M)
            }
        },
        setTransition: a => {
            const d = e.slides.map(l => q(l));
            d.forEach(l => {
                l.style.transitionDuration = `${a}ms`, l.querySelectorAll(".swiper-slide-shadow").forEach(c => {
                    c.style.transitionDuration = `${a}ms`
                })
            }), _t({
                swiper: e,
                duration: a,
                transformElements: d,
                allSlides: !0
            })
        },
        perspective: () => e.params.creativeEffect.perspective,
        overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
export {
    qt as E, Rt as N, Wt as P, z as S
};