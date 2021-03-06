(function () {
    var a = {},
        d = {
            en: {}
        };
    d["default"] = d.en;
    a.extend = function (g) {
        for (var c = arguments[1] || {}, f = 2, i = arguments.length; f < i; f++) {
            var e = arguments[f];
            if (e) for (var d in e) {
                var a = e[d];
                if (typeof a !== "undefined") if (g && (w(a) || h(a))) {
                    var b = c[d];
                    b = b && (w(b) || h(b)) ? b : h(a) ? [] : {};
                    c[d] = this.extend(true, b, a)
                } else c[d] = a
            }
        }
        return c
    };
    a.findClosestCulture = function (a) {
        var d;
        if (!a) return this.culture || this.cultures["default"];
        if (G(a)) a = a.split(",");
        if (h(a)) {
            for (var c, k = this.cultures, m = a, j = m.length, g = [], b = 0; b < j; b++) {
                a = e(m[b]);
                var f, i = a.split(";");
                c = e(i[0]);
                if (i.length === 1) f = 1;
                else {
                    a = e(i[1]);
                    if (a.indexOf("q=") === 0) {
                        a = a.substr(2);
                        f = parseFloat(a, 10);
                        f = isNaN(f) ? 0 : f
                    } else f = 1
                }
                g.push({
                    lang: c,
                    pri: f
                })
            }
            g.sort(function (a, b) {
                return a.pri < b.pri ? 1 : -1
            });
            for (b = 0; b < j; b++) {
                c = g[b].lang;
                d = k[c];
                if (d) return d
            }
            for (b = 0; b < j; b++) {
                c = g[b].lang;
                do {
                    var l = c.lastIndexOf("-");
                    if (l === -1) break;
                    c = c.substr(0, l);
                    d = k[c];
                    if (d) return d
                } while (1)
            }
        } else if (typeof a === "object") return a;
        return d || null
    };
    a.preferCulture = function (a) {
        this.culture = this.findClosestCulture(a) || this.cultures["default"]
    };
    a.localize = function (e, a, b) {
        if (typeof a === "string") {
            a = a || "default";
            a = this.cultures[a] || {
                name: a
            }
        }
        var c = d[a.name];
        if (arguments.length === 3) {
            if (!c) c = d[a.name] = {};
            c[e] = b
        } else {
            if (c) b = c[e];
            if (typeof b === "undefined") {
                var f = d[a.language];
                if (f) b = f[e];
                if (typeof b === "undefined") b = d["default"][e]
            }
        }
        return typeof b === "undefined" ? null : b
    };
    a.format = function (a, c, b) {
        b = this.findClosestCulture(b);
        if (typeof a === "number") a = C(a, c, b);
        else if (a instanceof Date) a = u(a, c, b);
        return a
    };
    a.parseInt = function (c, b, a) {
        return Math.floor(this.parseFloat(c, b, a))
    };
    a.parseFloat = function (a, u, q) {
        q = this.findClosestCulture(q);
        var m = NaN,
            c = q.numberFormat;
        a = e(a);
        if (A.test(a)) m = parseFloat(a, u);
        else if (!u && H.test(a)) m = parseInt(a, 16);
        else {
            var h = l(a, c, c.pattern[0]),
                i = h[0],
                f = h[1];
            if (i === "" && c.pattern[0] !== "-n") {
                h = l(a, c, "-n");
                i = h[0];
                f = h[1]
            }
            i = i || "+";
            var j, d, g = f.indexOf("e");
            if (g < 0) g = f.indexOf("E");
            if (g < 0) {
                d = f;
                j = null
            } else {
                d = f.substr(0, g);
                j = f.substr(g + 1)
            }
            var b, k, t = c["."],
                o = d.indexOf(t);
            if (o < 0) {
                b = d;
                k = null
            } else {
                b = d.substr(0, o);
                k = d.substr(o + t.length)
            }
            var p = c[","];
            b = b.split(p).join("");
            var r = p.replace(/\u00A0/g, " ");
            if (p !== r) b = b.split(r).join("");
            var n = i + b;
            if (k !== null) n += "." + k;
            if (j !== null) {
                var s = l(j, c, "-n");
                n += "e" + (s[0] || "+") + s[1]
            }
            if (x.test(n)) m = parseFloat(n)
        }
        return m
    };
    a.parseDate = function (g, a, b) {
        b = this.findClosestCulture(b);
        var c, h, d;
        if (a) {
            if (typeof a === "string") a = [a];
            if (a.length) for (var e = 0, i = a.length; e < i; e++) {
                var f = a[e];
                if (f) {
                    c = v(g, f, b);
                    if (c) break
                }
            }
        } else {
            d = b.calendar.patterns;
            for (h in d) {
                c = v(g, d[h], b);
                if (c) break
            }
        }
        return c || null
    };
    var n = a.cultures = a.cultures || {},
        r = n["default"] = n.en = a.extend(true, {
            name: "en",
            englishName: "English",
            nativeName: "English",
            isRTL: false,
            language: "en",
            numberFormat: {
                pattern: ["-n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSizes: [3],
                "+": "+",
                "-": "-",
                percent: {
                    pattern: ["-n %", "n %"],
                    decimals: 2,
                    groupSizes: [3],
                    ",": ",",
                    ".": ".",
                    symbol: "%"
                },
                currency: {
                    pattern: ["($n)", "$n"],
                    decimals: 2,
                    groupSizes: [3],
                    ",": ",",
                    ".": ".",
                    symbol: "$"
                }
            },
            calendars: {
                standard: {
                    name: "Gregorian_USEnglish",
                    "/": "/",
                    ":": ":",
                    firstDay: 0,
                    days: {
                        names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                    },
                    months: {
                        names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
                        namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
                    },
                    AM: ["AM", "am", "AM"],
                    PM: ["PM", "pm", "PM"],
                    eras: [{
                        name: "A.D.",
                        start: null,
                        offset: 0
                    }],
                    twoDigitYearMax: 2029,
                    patterns: {
                        d: "M/d/yyyy",
                        D: "dddd, MMMM dd, yyyy",
                        t: "h:mm tt",
                        T: "h:mm:ss tt",
                        f: "dddd, MMMM dd, yyyy h:mm tt",
                        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                        M: "MMMM dd",
                        Y: "yyyy MMMM",
                        S: "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
                    }
                }
            }
        }, n.en);
    r.calendar = r.calendar || r.calendars.standard;
    var F = /^\s+|\s+$/g,
        A = /^[+-]?infinity$/i,
        H = /^0x[a-f0-9]+$/i,
        x = /^[+-]?\d*\.?\d*(e[+-]?\d+)?$/,
        p = Object.prototype.toString;

    function g(b, a) {
        return b.indexOf(a) === 0
    }
    function o(b, a) {
        return b.substr(b.length - a.length) === a
    }
    function e(a) {
        return (a + "").replace(F, "")
    }
    function i(a, c, d) {
        for (var b = a.length; b < c; b++) a = d ? "0""+a:a+"
        a : a + "0"";return a}function h(a){return p.call(a)==="
        return a
    }
    function h(a) {
        return p.call(a) === "[object Array]"
        object Array]"}function G(a){return p.call(a)==="
    function G(a) {
        return p.call(a) === "[object String]"
        object String]"}function w(a){return p.call(a)==="
    function w(a) {
        return p.call(a) === "[object Object]"
        object Object]"}function f(a,c){if(a.indexOf)return a.indexOf(c);for(var b=0,d=a.length;b<d;b++)if(a[b]===c)return b;return-1}function B(j,g,l){var m=l.groupSizes,h=m[0],k=1,p=Math.pow(10,g),n=Math.round(j*p)/p;if(!isFinite(n))n=j;j=n;var b=j+"
    function f(a, c) {
        if (a.indexOf) return a.indexOf(c);
        for (var b = 0, d = a.length; b < d; b++) if (a[b] === c) return b;
        return -1
    }
    function B(j, g, l) {
        var m = l.groupSizes,
            h = m[0],
            k = 1,
            p = Math.pow(10, g),
            n = Math.round(j * p) / p;
        if (!isFinite(n)) n = j;
        j = n;
        var b = j + "",
            a = "",
            e = b.split(/e/i),
            c = e.length > 1 ? parseInt(e[1], 10) : 0;
        b = e[0];
        e = b.split(".");
        b = e[0];
        a = e.length > 1 ? e[1] : "";
        var q;
        if (c > 0) {
            a = i(a, c, false);
            b += a.slice(0, c);
            a = a.substr(c)
        } else if (c < 0) {
            c = -c;
            b = i(b, c + 1);
            a = b.slice(-c, b.length) + a;
            b = b.slice(0, -c)
        }
        if (g > 0) a = l["."] + (a.length > g ? a.slice(0, g) : i(a, g));
        else a = "";
        var d = b.length - 1,
            o = l[",""],f=", f = "";
            while (d >= 0) {
                if (h === 0 || h > d) return b.slice(0, d + 1) + (f.length ? o + f + a : a);
                f = b.slice(d - h + 1, d + 1) + (f.length ? o + f : "");
                d -= h;
                if (k < m.length) {
                    h = m[k];
                    k++
                }
            }
            return b.slice(0, d + 1) + o + f + a
            }
        function l(a, e, f) {
            var b = e["-""],c=e[", c = e["+""],d;switch(f){case", d;
            switch (f) {
            case "n -" - ":b="
                b = " ""+b;c="
                b;
                c = " ""+c;case"
                c;
            case "n-" - ":if(o(a,b))d=["
                if (o(a, b)) d = ["-"",a.substr(0,a.length-b.length)];else if(o(a,c))d=["
                a.substr(0, a.length - b.length)];
                else if (o(a, c)) d = ["+"",a.substr(0,a.length-c.length)];break;case"
                a.substr(0, a.length - c.length)];
                break;
            case "- n"
                n ":b+="
                b += " "";c+="
                c += " "";case"
            case "-n"
                n ":if(g(a,b))d=["
                if (g(a, b)) d = ["-"",a.substr(b.length)];else if(g(a,c))d=["
                a.substr(b.length)];
                else if (g(a, c)) d = ["+"",a.substr(c.length)];break;case"
                a.substr(c.length)];
                break;
            case "(n)"
                n)":if(g(a,"
            if (g(a, "("")&&o(a," && o(a, ")""))d=[") d = ["-"",a.substr(1,a.length-2)]}return d||["
            a.substr(1, a.length - 2)]
            }
            return d || ["", a]
            }
            function C(h, c, m) {
                if (!c || c === "i"")return m.name.length?h.toLocaleString():h.toString();c=c||"
                return m.name.length ? h.toLocaleString() : h.toString(); c = c || "D"";var f=m.numberFormat,b=Math.abs(h),d=-1,g;if(c.length>1)d=parseInt(c.slice(1),10);var k=c.charAt(0).toUpperCase(),a;switch(k){case"
                var f = m.numberFormat, b = Math.abs(h), d = -1, g;
                if (c.length > 1) d = parseInt(c.slice(1), 10);
                var k = c.charAt(0).toUpperCase(), a;
                switch (k) {
                case "D"":g="
                    g = "n"";if(d!==-1)b=i("
                    if (d !== -1) b = i("" + b, d, true);
                    if (h < 0) b = -b;
                    break;
                case "N"":a=f;case"
                    a = f;
                case "C"":a=a||f.currency;case"
                    a = a || f.currency;
                case "P"":a=a||f.percent;g=h<0?a.pattern[0]:a.pattern[1]||"
                    a = a || f.percent;
                    g = h < 0 ? a.pattern[0]:
                    a.pattern[1] || "n"";if(d===-1)d=a.decimals;b=B(b*(k==="
                    if (d === -1) d = a.decimals;
                    b = B(b * (k === "P""?100:1),d,a);break;default:throw"
                    100: 1), d, a);
                    break;
                default:
                    throw "Bad number format specifier: "
                    ad number format specifier : "+k;}for(var l=/n|\$|-|%/g,e="
                    k;
                }
                for (var l = /n|\$|-|%/ | \$ | - | % /g,e="";true;){var n=l.lastIndex,j=l.exec(g);e+=g.slice(n,j?j.index:g.length);if(!j)break;switch(j[0]){case"n":e+=b;break;case"$":e+=f.currency.symbol;break;case"-":if(/, e = ""; true;) {
                    var n = l.lastIndex,
                        j = l.exec(g);
                    e += g.slice(n, j ? j.index : g.length);
                    if (!j) break;
                    switch (j[0]) {
                    case "n"":e+=b;break;case"
                        e += b;
                        break;
                    case "$"":e+=f.currency.symbol;break;case"
                        e += f.currency.symbol;
                        break;
                    case "-"":if(/[1-9]/.test(b))e+=f["
                        if (/[1-9]/1 - 9] / .test(b)) e += f["-""];break;case";
                    break;
                case "%"":e+=f.percent.symbol}}return e}function b(a,c,b){return a<c||a>b}function E(d,b){var e=new Date,f=j(e);if(b<100){var a=d.twoDigitYearMax;a=typeof a==="
                    e += f.percent.symbol
                    }
                }
                return e
                }
                function b(a, c, b) {
                    return a < c || a > b
                }
                function E(d, b) {
                    var e = new Date,
                        f = j(e);
                    if (b < 100) {
                        var a = d.twoDigitYearMax;
                        a = typeof a === "string"
                        tring "?(new Date).getFullYear()%100+parseInt(a,10):a;var c=m(e,d,f);b+=c-c%100;if(b>a)b-=100}return b}function j(e,c){if(!c)return 0;for(var b,d=e.getTime(),a=0,f=c.length;a<f;a++){b=c[a].start;if(b===null||d>=b)return a}return 0}function q(a){return a.split(" (new Date).getFullYear() % 100 + parseInt(a, 10): a;
                        var c = m(e, d, f);
                        b += c - c % 100;
                        if (b > a) b -= 100
                    }
                    return b
                }
                function j(e, c) {
                    if (!c) return 0;
                    for (var b, d = e.getTime(), a = 0, f = c.length; a < f; a++) {
                        b = c[a].start;
                        if (b === null || d >= b) return a
                    }
                    return 0
                }
                function q(a) {
                    return a.split("\u00a0"
                    u00a0 ").join(".join(" "").toUpperCase()}function c(c){for(var b=[],a=0,d=c.length;a<d;a++)b[a]=q(c[a]);return b}function m(d,b,e,c){var a=d.getFullYear();if(!c&&b.eras)a-=b.eras[e].offset;return a}function D(g,b,h){var d,e=g.days,a=g._upperDays;if(!a)g._upperDays=a=[c(e.names),c(e.namesAbbr),c(e.namesShort)];b=q(b);if(h){d=f(a[1],b);if(d===-1)d=f(a[2],b)}else d=f(a[0],b);return d}function z(a,d,j){var i=a.months,h=a.monthsGenitive||a.months,b=a._upperMonths,e=a._upperMonthsGen;if(!b){a._upperMonths=b=[c(i.names),c(i.namesAbbr)];a._upperMonthsGen=e=[c(h.names),c(h.namesAbbr)]}d=q(d);var g=f(j?b[1]:b[0],d);if(g<0)g=f(j?e[1]:e[0],d);return g}function k(e,b){for(var d=0,a=false,c=0,g=e.length;c<g;c++){var f=e.charAt(c);switch(f){case".toUpperCase()
                    }
                    function c(c) {
                        for (var b = [], a = 0, d = c.length; a < d; a++) b[a] = q(c[a]);
                        return b
                    }
                    function m(d, b, e, c) {
                        var a = d.getFullYear();
                        if (!c && b.eras) a -= b.eras[e].offset;
                        return a
                    }
                    function D(g, b, h) {
                        var d, e = g.days,
                            a = g._upperDays;
                        if (!a) g._upperDays = a = [c(e.names), c(e.namesAbbr), c(e.namesShort)];
                        b = q(b);
                        if (h) {
                            d = f(a[1], b);
                            if (d === -1) d = f(a[2], b)
                        } else d = f(a[0], b);
                        return d
                    }
                    function z(a, d, j) {
                        var i = a.months,
                            h = a.monthsGenitive || a.months,
                            b = a._upperMonths,
                            e = a._upperMonthsGen;
                        if (!b) {
                            a._upperMonths = b = [c(i.names), c(i.namesAbbr)];
                            a._upperMonthsGen = e = [c(h.names), c(h.namesAbbr)]
                        }
                        d = q(d);
                        var g = f(j ? b[1] : b[0], d);
                        if (g < 0) g = f(j ? e[1] : e[0], d);
                        return g
                    }
                    function k(e, b) {
                        for (var d = 0, a = false, c = 0, g = e.length; c < g; c++) {
                            var f = e.charAt(c);
                            switch (f) {
                            case "'"":if(a)b.push("
                                if (a) b.push("'"");else d++;a=false;break;case";
                                else d++; a = false;
                                break;
                            case "\\"\":a&&b.push("
                                a && b.push("\\"\");a=!a;break;default:b.push(f);a=false}}return d}function t(e,a){a=a||"; a = !a;
                                break;
                            default:
                                b.push(f); a = false
                                }
                                }
                                return d
                            }
                            function t(e, a) {
                                a = a || "F"";var b,d=e.patterns,c=a.length;if(c===1){b=d[a];if(!b)throw"
                                var b, d = e.patterns,
                                    c = a.length;
                                if (c === 1) {
                                    b = d[a];
                                    if (!b) throw "Invalid date format string '"
                                    nvalid date format string '"+a+"' + a + "'.".";a=b}else if(c===2&&a.charAt(0)==="
                                    a = b
                                } else if (c === 2 && a.charAt(0) === "%"")a=a.charAt(1);return a}function y(d,g){var e=d._parseRegExp;if(!e)d._parseRegExp=e={};else{var m=e[g];if(m)return m}var f=t(d,g).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"
                                a = a.charAt(1);
                                return a
                                }
                                function y(d, g) {
                                    var e = d._parseRegExp;
                                    if (!e) d._parseRegExp = e = {};
                                    else {
                                        var m = e[g];
                                        if (m) return m
                                    }
                                    var f = t(d, g).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/ [\ ^ \$\.\ * \ + \ ? \ | \ [\]\ (\)\ {\
                                    }]) / g,
                                        "\\\\$1"\\\$1 "),b=[", b = ["^""],n=[],h=0,l=0,j=s(),c;while((c=j.exec(f))!==null){var q=f.slice(h,c.index);h=j.lastIndex;l+=k(q,b);if(l%2){b.push(c[0]);continue}var i=c[0],r=i.length,a;switch(i){case", n = [], h = 0, l = 0, j = s(), c;
                                        while ((c = j.exec(f)) !== null) {
                                            var q = f.slice(h, c.index);
                                            h = j.lastIndex;
                                            l += k(q, b);
                                            if (l % 2) {
                                                b.push(c[0]);
                                                continue
                                            }
                                            var i = c[0],
                                                r = i.length,
                                                a;
                                            switch (i) {
                                            case "dddd"
                                                ddd ":case"
                                            case "ddd"
                                                dd ":case"
                                            case "MMMM"
                                                MMM ":case"
                                            case "MMM"
                                                MM ":case"
                                            case "gg"
                                                g ":case"
                                            case "g"":a="
                                                a = "(\\D+)"\\D + )";break;case"
                                            break;
                                        case "tt"
                                            t ":case"
                                        case "t"":a="
                                            a = "(\\D*)"\\D * )";break;case"
                                        break;
                                    case "yyyy"
                                        yyy ":case"
                                    case "fff"
                                        ff ":case"
                                    case "ff"
                                        f ":case"
                                    case "f"":a="
                                        a = "(\\d{"\\d {
                                            "+r+"
                                            r + "})")";break;case"
                                        break;
                                    case "dd"
                                        d ":case"
                                    case "d"":case"
                                    case "MM"
                                        M ":case"
                                    case "M"":case"
                                    case "yy"
                                        y ":case"
                                    case "y"":case"
                                    case "HH"
                                        H ":case"
                                    case "H"":case"
                                    case "hh"
                                        h ":case"
                                    case "h"":case"
                                    case "mm"
                                        m ":case"
                                    case "m"":case"
                                    case "ss"
                                        s ":case"
                                    case "s"":a="
                                        a = "(\\d\\d?)"\\d\\d ? )";break;case"
                                    break;
                                case "zzz"
                                    zz ":a="
                                    a = "([+-]?\\d\\d?:\\d{2})" [+-] ? \\d\\d ? :
                                    \\d {
                                        2
                                    })";break;case"
                                break;
                            case "zz"
                                z ":case"
                            case "z"":a="
                                a = "([+-]?\\d\\d?)" [+-] ? \\d\\d ? )";break;case"
                            break;
                        case "/"":a="
                            a = "(\\"\\"+d["
                            d["/""]+" + ")"";break;default:throw"
                            break;
                        default:
                            throw "Invalid date format pattern '"
                            nvalid date format pattern '"+i+"' + i + "'.".";}a&&b.push(a);n.push(c[0])}k(f.slice(h),b);b.push("
                            }
                            a && b.push(a);
                            n.push(c[0])
                        }
                        k(f.slice(h), b);
                        b.push("$"");var p=b.join(";
                        var p = b.join("").replace(/\s+/s + /g,"\\s+"),o={regExp:p,groups:n};return e[g]=o}function s(){return/, "\\s+"\s + "),o={regExp:p,groups:n};return e[g]=o}function s(){return/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g}function v(w,M,L){w=e(w);var a=L.calendar,H=y(a,M),K=(new RegExp(H.regExp)).exec(w);if(K===null)return null;for(var J=H.groups,A=null,k=null,i=null,j=null,q=null,h=0,l,B=0,C=0,x=0,m=null,v=false,s=0,N=J.length;s<N;s++){var c=K[s+1];if(c){var I=J[s],n=I.length,f=parseInt(c,10);switch(I){case", o = {
                            regExp: p,
                            groups: n
                        };
                        return e[g] = o
                        }
                        function s() {
                            return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/ / | dddd | ddd | dd | d | MMMM | MMM | MM | M | yyyy | yy | y | hh | h | HH | H | mm | m | ss | s | tt | t | fff | ff | f | zzz | zz | z | gg | g / g
                        }
                        function v(w, M, L) {
                            w = e(w);
                            var a = L.calendar,
                                H = y(a, M),
                                K = (new RegExp(H.regExp)).exec(w);
                            if (K === null) return null;
                            for (var J = H.groups, A = null, k = null, i = null, j = null, q = null, h = 0, l, B = 0, C = 0, x = 0, m = null, v = false, s = 0, N = J.length; s < N; s++) {
                                var c = K[s + 1];
                                if (c) {
                                    var I = J[s],
                                        n = I.length,
                                        f = parseInt(c, 10);
                                    switch (I) {
                                    case "dd"
                                        d ":case"
                                    case "d"":j=f;if(b(j,1,31))return null;break;case"
                                        j = f;
                                        if (b(j, 1, 31)) return null;
                                        break;
                                    case "MMM"
                                        MM ":case"
                                    case "MMMM"
                                        MMM ":i=z(a,c,n===3);if(b(i,0,11))return null;break;case"
                                        i = z(a, c, n === 3);
                                        if (b(i, 0, 11)) return null;
                                        break;
                                    case "M"":case"
                                    case "MM"
                                        M ":i=f-1;if(b(i,0,11))return null;break;case"
                                        i = f - 1;
                                        if (b(i, 0, 11)) return null;
                                        break;
                                    case "y"":case"
                                    case "yy"
                                        y ":case"
                                    case "yyyy"
                                        yyy ":k=n<4?E(a,f):f;if(b(k,0,9999))return null;break;case"
                                        k = n < 4 ? E(a, f):
                                        f;
                                        if (b(k, 0, 9999)) return null;
                                        break;
                                    case "h"":case"
                                    case "hh"
                                        h ":h=f;if(h===12)h=0;if(b(h,0,11))return null;break;case"
                                        h = f;
                                        if (h === 12) h = 0;
                                        if (b(h, 0, 11)) return null;
                                        break;
                                    case "H"":case"
                                    case "HH"
                                        H ":h=f;if(b(h,0,23))return null;break;case"
                                        h = f;
                                        if (b(h, 0, 23)) return null;
                                        break;
                                    case "m"":case"
                                    case "mm"
                                        m ":B=f;if(b(B,0,59))return null;break;case"
                                        B = f;
                                        if (b(B, 0, 59)) return null;
                                        break;
                                    case "s"":case"
                                    case "ss"
                                        s ":C=f;if(b(C,0,59))return null;break;case"
                                        C = f;
                                        if (b(C, 0, 59)) return null;
                                        break;
                                    case "tt"
                                        t ":case"
                                    case "t"":v=a.PM&&(c===a.PM[0]||c===a.PM[1]||c===a.PM[2]);if(!v&&(!a.AM||c!==a.AM[0]&&c!==a.AM[1]&&c!==a.AM[2]))return null;break;case"
                                        v = a.PM && (c === a.PM[0] || c === a.PM[1] || c === a.PM[2]);
                                        if (!v && (!a.AM || c !== a.AM[0] && c !== a.AM[1] && c !== a.AM[2])) return null;
                                        break;
                                    case "f"":case"
                                    case "ff"
                                        f ":case"
                                    case "fff"
                                        ff ":x=f*Math.pow(10,3-n);if(b(x,0,999))return null;break;case"
                                        x = f * Math.pow(10, 3 - n);
                                        if (b(x, 0, 999)) return null;
                                        break;
                                    case "ddd"
                                        dd ":case"
                                    case "dddd"
                                        ddd ":q=D(a,c,n===3);if(b(q,0,6))return null;break;case"
                                        q = D(a, c, n === 3);
                                        if (b(q, 0, 6)) return null;
                                        break;
                                    case "zzz"
                                        zz ":var u=c.split(/:/);if(u.length!==2)return null;l=parseInt(u[0],10);if(b(l,-12,13))return null;var t=parseInt(u[1],10);if(b(t,0,59))return null;m=l*60+(g(c,"
                                        var u = c.split(/:/ / );
                                        if (u.length !== 2) return null;
                                        l = parseInt(u[0], 10);
                                        if (b(l, -12, 13)) return null;
                                        var t = parseInt(u[1], 10);
                                        if (b(t, 0, 59)) return null;
                                        m = l * 60 + (g(c, "-"")?-t:t);break;case" ? -t : t);
                                        break;
                                    case "z"":case"
                                    case "zz"
                                        z ":l=f;if(b(l,-12,13))return null;m=l*60;break;case"
                                        l = f;
                                        if (b(l, -12, 13)) return null; m = l * 60;
                                        break;
                                    case "g"":case"
                                    case "gg"
                                        g ":var p=c;if(!p||!a.eras)return null;p=e(p.toLowerCase());for(var r=0,O=a.eras.length;r<O;r++)if(p===a.eras[r].name.toLowerCase()){A=r;break}if(A===null)return null}}}var d=new Date,G,o=a.convert;G=o?o.fromGregorian(d)[0]:d.getFullYear();if(k===null)k=G;else if(a.eras)k+=a.eras[A||0].offset;if(i===null)i=0;if(j===null)j=1;if(o){d=o.toGregorian(k,i,j);if(d===null)return null}else{d.setFullYear(k,i,j);if(d.getDate()!==j)return null;if(q!==null&&d.getDay()!==q)return null}if(v&&h<12)h+=12;d.setHours(h,B,C,x);if(m!==null){var F=d.getMinutes()-(m+d.getTimezoneOffset());d.setHours(d.getHours()+parseInt(F/60,10),F%60)}return d}function u(b,f,o){var c=o.calendar,p=c.convert;if(!f||!f.length||f==="
                                        var p = c;
                                        if (!p || !a.eras) return null; p = e(p.toLowerCase());
                                        for (var r = 0, O = a.eras.length; r < O; r++) if (p === a.eras[r].name.toLowerCase()) {
                                            A = r;
                                            break
                                        }
                                        if (A === null) return null
                                        }
                                    }
                                }
                                var d = new Date,
                                    G, o = a.convert;
                                G = o ? o.fromGregorian(d)[0] : d.getFullYear();
                                if (k === null) k = G;
                                else if (a.eras) k += a.eras[A || 0].offset;
                                if (i === null) i = 0;
                                if (j === null) j = 1;
                                if (o) {
                                    d = o.toGregorian(k, i, j);
                                    if (d === null) return null
                                } else {
                                    d.setFullYear(k, i, j);
                                    if (d.getDate() !== j) return null;
                                    if (q !== null && d.getDay() !== q) return null
                                }
                                if (v && h < 12) h += 12;
                                d.setHours(h, B, C, x);
                                if (m !== null) {
                                    var F = d.getMinutes() - (m + d.getTimezoneOffset());
                                    d.setHours(d.getHours() + parseInt(F / 60, 10), F % 60)
                                }
                                return d
                            }
                            function u(b, f, o) {
                                var c = o.calendar,
                                    p = c.convert;
                                if (!f || !f.length || f === "i""){var a;if(o&&o.name.length)if(p)a=u(b,c.patterns.F,o);else{var z=new Date(b.getTime()),G=j(b,c.eras);z.setFullYear(m(b,c,G));a=z.toLocaleString()}else a=b.toString();return a}var A=c.eras,y=f===" {
                                    var a;
                                    if (o && o.name.length) if (p) a = u(b, c.patterns.F, o);
                                    else {
                                        var z = new Date(b.getTime()),
                                            G = j(b, c.eras);
                                        z.setFullYear(m(b, c, G));
                                        a = z.toLocaleString()
                                    } else a = b.toString();
                                    return a
                                }
                                var A = c.eras, y = f === "s"";f=t(c,f);a=[];var g,F=["
                                f = t(c, f); a = [];
                                var g, F = ["0"",""00"
                                0 ",""000"
                                00 "],l,w,B=/([^d]|^)(d|dd)([^d]|$)/g,x=0,v=s(),i;function e(d,a){var b,c=d+", l, w, B = /([^d]|^)(d|dd)([^d]|$)/ [ ^ d] | ^ )(d | dd)([ ^ d] | $) / g, x = 0, v = s(), i;

                                function e(d, a) {
                                    var b, c = d + "";
                                    if (a > 1 && c.length < a) {
                                        b = F[a - 2] + c;
                                        return b.substr(b.length - a, a)
                                    } else b = c;
                                    return b
                                }
                                function D() {
                                    if (l || w) return l;
                                    l = B.test(f);
                                    w = true;
                                    return l
                                }
                                function r(a, b) {
                                    if (i) return i[b];
                                    switch (b) {
                                    case 0:
                                        return a.getFullYear();
                                    case 1:
                                        return a.getMonth();
                                    case 2:
                                        return a.getDate()
                                    }
                                }
                                if (!y && p) i = p.fromGregorian(b);
                                for (; true;) {
                                    var E = v.lastIndex,
                                        n = v.exec(f),
                                        C = f.slice(E, n ? n.index : f.length);
                                    x += k(C, a);
                                    if (!n) break;
                                    if (x % 2) {
                                        a.push(n[0]);
                                        continue
                                    }
                                    var q = n[0],
                                        d = q.length;
                                    switch (q) {
                                    case "ddd"
                                        dd ":case"
                                    case "dddd"
                                        ddd ":names=d===3?c.days.namesAbbr:c.days.names;a.push(names[b.getDay()]);break;case"
                                        names = d === 3 ? c.days.namesAbbr:
                                        c.days.names;
                                        a.push(names[b.getDay()]);
                                        break;
                                    case "d"":case"
                                    case "dd"
                                        d ":l=true;a.push(e(r(b,2),d));break;case"
                                        l = true;
                                        a.push(e(r(b, 2), d));
                                        break;
                                    case "MMM"
                                        MM ":case"
                                    case "MMMM"
                                        MMM ":var h=r(b,1);a.push(c.monthsGenitive&&D()?c.monthsGenitive[d===3?"
                                        var h = r(b, 1);
                                        a.push(c.monthsGenitive && D() ? c.monthsGenitive[d === 3 ? "namesAbbr"
                                        amesAbbr ":""names"
                                        ames "][h]:c.months[d===3?" [h] : c.months[d === 3 ? "namesAbbr"
                                        amesAbbr ":""names"
                                        ames "][h]);break;case" [h]);
                                        break;
                                    case "M"":case"
                                    case "MM"
                                        M ":a.push(e(r(b,1)+1,d));break;case"
                                        a.push(e(r(b, 1) + 1, d));
                                        break;
                                    case "y"":case"
                                    case "yy"
                                        y ":case"
                                    case "yyyy"
                                        yyy ":h=i?i[0]:m(b,c,j(b,A),y);if(d<4)h=h%100;a.push(e(h,d));break;case"
                                        h = i ? i[0]:
                                        m(b, c, j(b, A), y);
                                        if (d < 4) h = h % 100; a.push(e(h, d));
                                        break;
                                    case "h"":case"
                                    case "hh"
                                        h ":g=b.getHours()%12;if(g===0)g=12;a.push(e(g,d));break;case"
                                        g = b.getHours() % 12;
                                        if (g === 0) g = 12; a.push(e(g, d));
                                        break;
                                    case "H"":case"
                                    case "HH"
                                        H ":a.push(e(b.getHours(),d));break;case"
                                        a.push(e(b.getHours(), d));
                                        break;
                                    case "m"":case"
                                    case "mm"
                                        m ":a.push(e(b.getMinutes(),d));break;case"
                                        a.push(e(b.getMinutes(), d));
                                        break;
                                    case "s"":case"
                                    case "ss"
                                        s ":a.push(e(b.getSeconds(),d));break;case"
                                        a.push(e(b.getSeconds(), d));
                                        break;
                                    case "t"":case"
                                    case "tt"
                                        t ":h=b.getHours()<12?c.AM?c.AM[0]:"
                                        h = b.getHours() < 12 ? c.AM ? c.AM[0]:
                                        " "":c.PM?c.PM[0]:"
                                        c.PM ? c.PM[0] : " "";a.push(d===1?h.charAt(0):h);break;case"
                                        a.push(d === 1 ? h.charAt(0) : h);
                                        break;
                                    case "f"":case"
                                    case "ff"
                                        f ":case"
                                    case "fff"
                                        ff ":a.push(e(b.getMilliseconds(),3).substr(0,d));break;case"
                                        a.push(e(b.getMilliseconds(), 3).substr(0, d));
                                        break;
                                    case "z"":case"
                                    case "zz"
                                        z ":g=b.getTimezoneOffset()/60;a.push((g<=0?"
                                        g = b.getTimezoneOffset() / 60; a.push((g <= 0 ? "+"":""-"")+e(Math.floor(Math.abs(g)),d));break;case" + e(Math.floor(Math.abs(g)), d));
                                        break;
                                    case "zzz"
                                        zz ":g=b.getTimezoneOffset()/60;a.push((g<=0?"
                                        g = b.getTimezoneOffset() / 60; a.push((g <= 0 ? "+"":""-"")+e(Math.floor(Math.abs(g)),2)+" + e(Math.floor(Math.abs(g)), 2) + ":""+e(Math.abs(b.getTimezoneOffset()%60),2));break;case"
                                        e(Math.abs(b.getTimezoneOffset() % 60), 2));
                                        break;
                                    case "g"":case"
                                    case "gg"
                                        g ":c.eras&&a.push(c.eras[j(b,A)].name);break;case"
                                        c.eras && a.push(c.eras[j(b, A)].name);
                                        break;
                                    case "/"":a.push(c["
                                        a.push(c["/""]);break;default:throw");
                                        break;
                                    default:
                                        throw "Invalid date format pattern '"
                                        nvalid date format pattern '"+q+"' + q + "'.".";}}return a.join("
                                        }
                                        }
                                        return a.join("")
                                        }
                                        jQuery.findClosestCulture = a.findClosestCulture; jQuery.culture = a.culture; jQuery.cultures = a.cultures; jQuery.preferCulture = a.preferCulture; jQuery.localize = a.localize; jQuery.format = a.format; jQuery.parseInt = a.parseInt; jQuery.parseFloat = a.parseFloat; jQuery.parseDate = a.parseDate
                                        })()