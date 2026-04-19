/* Bootstrap */
if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function (a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap")
            , b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c])
                return {
                    end: b[c]
                };
        return !1
    }
    a.fn.emulateTransitionEnd = function (b) {
        var c = !1
            , d = this;
        a(this).one(a.support.transition.end, function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b),
            this
    }
        ,
        a(function () {
            a.support.transition = b()
        })
}(jQuery),
    +function (a) {
        "use strict";
        var b = '[data-dismiss="alert"]'
            , c = function (c) {
                a(c).on("click", b, this.close)
            };
        c.prototype.close = function (b) {
            function c() {
                f.trigger("closed.bs.alert").remove()
            }
            var d = a(this)
                , e = d.attr("data-target");
            e || (e = d.attr("href"),
                e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
            var f = a(e);
            b && b.preventDefault(),
                f.length || (f = d.hasClass("alert") ? d : d.parent()),
                f.trigger(b = a.Event("close.bs.alert")),
                b.isDefaultPrevented() || (f.removeClass("in"),
                    a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c())
        }
            ;
        var d = a.fn.alert;
        a.fn.alert = function (b) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.alert");
                e || d.data("bs.alert", e = new c(this)),
                    "string" == typeof b && e[b].call(d)
            })
        }
            ,
            a.fn.alert.Constructor = c,
            a.fn.alert.noConflict = function () {
                return a.fn.alert = d,
                    this
            }
            ,
            a(document).on("click.bs.alert.data-api", b, c.prototype.close)
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (c, d) {
            this.$element = a(c),
                this.options = a.extend({}, b.DEFAULTS, d),
                this.isLoading = !1
        };
        b.DEFAULTS = {
            loadingText: "loading..."
        },
            b.prototype.setState = function (b) {
                var c = "disabled"
                    , d = this.$element
                    , e = d.is("input") ? "val" : "html"
                    , f = d.data();
                b += "Text",
                    f.resetText || d.data("resetText", d[e]()),
                    d[e](f[b] || this.options[b]),
                    setTimeout(a.proxy(function () {
                        "loadingText" == b ? (this.isLoading = !0,
                            d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1,
                                d.removeClass(c).removeAttr(c))
                    }, this), 0)
            }
            ,
            b.prototype.toggle = function () {
                var a = !0
                    , b = this.$element.closest('[data-toggle="buttons"]');
                if (b.length) {
                    var c = this.$element.find("input");
                    "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")),
                        a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
                }
                a && this.$element.toggleClass("active")
            }
            ;
        var c = a.fn.button;
        a.fn.button = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.button")
                    , f = "object" == typeof c && c;
                e || d.data("bs.button", e = new b(this, f)),
                    "toggle" == c ? e.toggle() : c && e.setState(c)
            })
        }
            ,
            a.fn.button.Constructor = b,
            a.fn.button.noConflict = function () {
                return a.fn.button = c,
                    this
            }
            ,
            a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) {
                var c = a(b.target);
                c.hasClass("btn") || (c = c.closest(".btn")),
                    c.button("toggle"),
                    b.preventDefault()
            })
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (b, c) {
            this.$element = a(b),
                this.$indicators = this.$element.find(".carousel-indicators"),
                this.options = c,
                this.paused = this.sliding = this.interval = this.$active = this.$items = null,
                "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
        };
        b.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0
        },
            b.prototype.cycle = function (b) {
                return b || (this.paused = !1),
                    this.interval && clearInterval(this.interval),
                    this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)),
                    this
            }
            ,
            b.prototype.getActiveIndex = function () {
                return this.$active = this.$element.find(".item.active"),
                    this.$items = this.$active.parent().children(),
                    this.$items.index(this.$active)
            }
            ,
            b.prototype.to = function (b) {
                var c = this
                    , d = this.getActiveIndex();
                return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
                    c.to(b)
                }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
            }
            ,
            b.prototype.pause = function (b) {
                return b || (this.paused = !0),
                    this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end),
                        this.cycle(!0)),
                    this.interval = clearInterval(this.interval),
                    this
            }
            ,
            b.prototype.next = function () {
                return this.sliding ? void 0 : this.slide("next")
            }
            ,
            b.prototype.prev = function () {
                return this.sliding ? void 0 : this.slide("prev")
            }
            ,
            b.prototype.slide = function (b, c) {
                var d = this.$element.find(".item.active")
                    , e = c || d[b]()
                    , f = this.interval
                    , g = "next" == b ? "left" : "right"
                    , h = "next" == b ? "first" : "last"
                    , i = this;
                if (!e.length) {
                    if (!this.options.wrap)
                        return;
                    e = this.$element.find(".item")[h]()
                }
                if (e.hasClass("active"))
                    return this.sliding = !1;
                var j = a.Event("slide.bs.carousel", {
                    relatedTarget: e[0],
                    direction: g
                });
                return this.$element.trigger(j),
                    j.isDefaultPrevented() ? void 0 : (this.sliding = !0,
                        f && this.pause(),
                        this.$indicators.length && (this.$indicators.find(".active").removeClass("active"),
                            this.$element.one("slid.bs.carousel", function () {
                                var b = a(i.$indicators.children()[i.getActiveIndex()]);
                                b && b.addClass("active")
                            })),
                        a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b),
                            e[0].offsetWidth,
                            d.addClass(g),
                            e.addClass(g),
                            d.one(a.support.transition.end, function () {
                                e.removeClass([b, g].join(" ")).addClass("active"),
                                    d.removeClass(["active", g].join(" ")),
                                    i.sliding = !1,
                                    setTimeout(function () {
                                        i.$element.trigger("slid.bs.carousel")
                                    }, 0)
                            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"),
                                e.addClass("active"),
                                this.sliding = !1,
                                this.$element.trigger("slid.bs.carousel")),
                        f && this.cycle(),
                        this)
            }
            ;
        var c = a.fn.carousel;
        a.fn.carousel = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.carousel")
                    , f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c)
                    , g = "string" == typeof c ? c : f.slide;
                e || d.data("bs.carousel", e = new b(this, f)),
                    "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
            })
        }
            ,
            a.fn.carousel.Constructor = b,
            a.fn.carousel.noConflict = function () {
                return a.fn.carousel = c,
                    this
            }
            ,
            a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
                var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to");
                g && (f.interval = !1),
                    e.carousel(f),
                    (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g),
                    b.preventDefault()
            }),
            a(window).on("load", function () {
                a('[data-ride="carousel"]').each(function () {
                    var b = a(this);
                    b.carousel(b.data())
                })
            })
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (c, d) {
            this.$element = a(c),
                this.options = a.extend({}, b.DEFAULTS, d),
                this.transitioning = null,
                this.options.parent && (this.$parent = a(this.options.parent)),
                this.options.toggle && this.toggle()
        };
        b.DEFAULTS = {
            toggle: !0
        },
            b.prototype.dimension = function () {
                var a = this.$element.hasClass("width");
                return a ? "width" : "height"
            }
            ,
            b.prototype.show = function () {
                if (!this.transitioning && !this.$element.hasClass("in")) {
                    var b = a.Event("show.bs.collapse");
                    if (this.$element.trigger(b),
                        !b.isDefaultPrevented()) {
                        var c = this.$parent && this.$parent.find("> .panel > .in");
                        if (c && c.length) {
                            var d = c.data("bs.collapse");
                            if (d && d.transitioning)
                                return;
                            c.collapse("hide"),
                                d || c.data("bs.collapse", null)
                        }
                        var e = this.dimension();
                        this.$element.removeClass("collapse").addClass("collapsing")[e](0),
                            this.transitioning = 1;
                        var f = function () {
                            this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),
                                this.transitioning = 0,
                                this.$element.trigger("shown.bs.collapse")
                        };
                        if (!a.support.transition)
                            return f.call(this);
                        var g = a.camelCase(["scroll", e].join("-"));
                        this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g])
                    }
                }
            }
            ,
            b.prototype.hide = function () {
                if (!this.transitioning && this.$element.hasClass("in")) {
                    var b = a.Event("hide.bs.collapse");
                    if (this.$element.trigger(b),
                        !b.isDefaultPrevented()) {
                        var c = this.dimension();
                        this.$element[c](this.$element[c]())[0].offsetHeight,
                            this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                            this.transitioning = 1;
                        var d = function () {
                            this.transitioning = 0,
                                this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                        };
                        return a.support.transition ? void this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
                    }
                }
            }
            ,
            b.prototype.toggle = function () {
                this[this.$element.hasClass("in") ? "hide" : "show"]()
            }
            ;
        var c = a.fn.collapse;
        a.fn.collapse = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.collapse")
                    , f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
                !e && f.toggle && "show" == c && (c = !c),
                    e || d.data("bs.collapse", e = new b(this, f)),
                    "string" == typeof c && e[c]()
            })
        }
            ,
            a.fn.collapse.Constructor = b,
            a.fn.collapse.noConflict = function () {
                return a.fn.collapse = c,
                    this
            }
            ,
            a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) {
                var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i);
                g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"),
                    d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
                    f.collapse(h)
            })
    }(jQuery),
    +function (a) {
        "use strict";
        function b(b) {
            a(d).remove(),
                a(e).each(function () {
                    var d = c(a(this))
                        , e = {
                            relatedTarget: this
                        };
                    d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)),
                        b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
                })
        }
        function c(b) {
            var c = b.attr("data-target");
            c || (c = b.attr("href"),
                c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
            var d = c && a(c);
            return d && d.length ? d : b.parent()
        }
        var d = ".dropdown-backdrop"
            , e = "[data-toggle=dropdown]"
            , f = function (b) {
                a(b).on("click.bs.dropdown", this.toggle)
            };
        f.prototype.toggle = function (d) {
            var e = a(this);
            if (!e.is(".disabled, :disabled")) {
                var f = c(e)
                    , g = f.hasClass("open");
                if (b(),
                    !g) {
                    "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                    var h = {
                        relatedTarget: this
                    };
                    if (f.trigger(d = a.Event("show.bs.dropdown", h)),
                        d.isDefaultPrevented())
                        return;
                    f.toggleClass("open").trigger("shown.bs.dropdown", h),
                        e.focus()
                }
                return !1
            }
        }
            ,
            f.prototype.keydown = function (b) {
                if (/(38|40|27)/.test(b.keyCode)) {
                    var d = a(this);
                    if (b.preventDefault(),
                        b.stopPropagation(),
                        !d.is(".disabled, :disabled")) {
                        var f = c(d)
                            , g = f.hasClass("open");
                        if (!g || g && 27 == b.keyCode)
                            return 27 == b.which && f.find(e).focus(),
                                d.click();
                        var h = " li:not(.divider):visible a"
                            , i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
                        if (i.length) {
                            var j = i.index(i.filter(":focus"));
                            38 == b.keyCode && j > 0 && j--,
                                40 == b.keyCode && j < i.length - 1 && j++,
                                ~j || (j = 0),
                                i.eq(j).focus()
                        }
                    }
                }
            }
            ;
        var g = a.fn.dropdown;
        a.fn.dropdown = function (b) {
            return this.each(function () {
                var c = a(this)
                    , d = c.data("bs.dropdown");
                d || c.data("bs.dropdown", d = new f(this)),
                    "string" == typeof b && d[b].call(c)
            })
        }
            ,
            a.fn.dropdown.Constructor = f,
            a.fn.dropdown.noConflict = function () {
                return a.fn.dropdown = g,
                    this
            }
            ,
            a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
                a.stopPropagation()
            }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu], [role=listbox]", f.prototype.keydown)
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (b, c) {
            this.options = c,
                this.$element = a(b),
                this.$backdrop = this.isShown = null,
                this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function () {
                    this.$element.trigger("loaded.bs.modal")
                }, this))
        };
        b.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        },
            b.prototype.toggle = function (a) {
                return this[this.isShown ? "hide" : "show"](a)
            }
            ,
            b.prototype.show = function (b) {
                var c = this
                    , d = a.Event("show.bs.modal", {
                        relatedTarget: b
                    });
                this.$element.trigger(d),
                    this.isShown || d.isDefaultPrevented() || (this.isShown = !0,
                        this.escape(),
                        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)),
                        this.backdrop(function () {
                            var d = a.support.transition && c.$element.hasClass("fade");
                            c.$element.parent().length || c.$element.appendTo(document.body),
                                c.$element.show().scrollTop(0),
                                d && c.$element[0].offsetWidth,
                                c.$element.addClass("in").attr("aria-hidden", !1),
                                c.enforceFocus();
                            var e = a.Event("shown.bs.modal", {
                                relatedTarget: b
                            });
                            d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () {
                                c.$element.focus().trigger(e)
                            }).emulateTransitionEnd(300) : c.$element.focus().trigger(e)
                        }))
            }
            ,
            b.prototype.hide = function (b) {
                b && b.preventDefault(),
                    b = a.Event("hide.bs.modal"),
                    this.$element.trigger(b),
                    this.isShown && !b.isDefaultPrevented() && (this.isShown = !1,
                        this.escape(),
                        a(document).off("focusin.bs.modal"),
                        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
                        a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
            }
            ,
            b.prototype.enforceFocus = function () {
                a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) {
                    this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus()
                }, this))
            }
            ,
            b.prototype.escape = function () {
                this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) {
                    27 == a.which && this.hide()
                }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
            }
            ,
            b.prototype.hideModal = function () {
                var a = this;
                this.$element.hide(),
                    this.backdrop(function () {
                        a.removeBackdrop(),
                            a.$element.trigger("hidden.bs.modal")
                    })
            }
            ,
            b.prototype.removeBackdrop = function () {
                this.$backdrop && this.$backdrop.remove(),
                    this.$backdrop = null
            }
            ,
            b.prototype.backdrop = function (b) {
                var c = this.$element.hasClass("fade") ? "fade" : "";
                if (this.isShown && this.options.backdrop) {
                    var d = a.support.transition && c;
                    if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body),
                        this.$element.on("click.dismiss.bs.modal", a.proxy(function (a) {
                            a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                        }, this)),
                        d && this.$backdrop[0].offsetWidth,
                        this.$backdrop.addClass("in"),
                        !b)
                        return;
                    d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()
                } else
                    !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"),
                        a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b()
            }
            ;
        var c = a.fn.modal;
        a.fn.modal = function (c, d) {
            return this.each(function () {
                var e = a(this)
                    , f = e.data("bs.modal")
                    , g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
                f || e.data("bs.modal", f = new b(this, g)),
                    "string" == typeof c ? f[c](d) : g.show && f.show(d)
            })
        }
            ,
            a.fn.modal.Constructor = b,
            a.fn.modal.noConflict = function () {
                return a.fn.modal = c,
                    this
            }
            ,
            a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) {
                var c = a(this)
                    , d = c.attr("href")
                    , e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, ""))
                    , f = e.data("bs.modal") ? "toggle" : a.extend({
                        remote: !/#/.test(d) && d
                    }, e.data(), c.data());
                c.is("a") && b.preventDefault(),
                    e.modal(f, this).one("hide", function () {
                        c.is(":visible") && c.focus()
                    })
            }),
            a(document).on("show.bs.modal", ".modal", function () {
                a(document.body).addClass("modal-open")
            }).on("hidden.bs.modal", ".modal", function () {
                a(document.body).removeClass("modal-open")
            })
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (a, b) {
            this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
                this.init("tooltip", a, b)
        };
        b.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1
        },
            b.prototype.init = function (b, c, d) {
                this.enabled = !0,
                    this.type = b,
                    this.$element = a(c),
                    this.options = this.getOptions(d);
                for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
                    var g = e[f];
                    if ("click" == g)
                        this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
                    else if ("manual" != g) {
                        var h = "hover" == g ? "mouseenter" : "focusin"
                            , i = "hover" == g ? "mouseleave" : "focusout";
                        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)),
                            this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
                    }
                }
                this.options.selector ? this._options = a.extend({}, this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            }
            ,
            b.prototype.getDefaults = function () {
                return b.DEFAULTS
            }
            ,
            b.prototype.getOptions = function (b) {
                return b = a.extend({}, this.getDefaults(), this.$element.data(), b),
                    b.delay && "number" == typeof b.delay && (b.delay = {
                        show: b.delay,
                        hide: b.delay
                    }),
                    b
            }
            ,
            b.prototype.getDelegateOptions = function () {
                var b = {}
                    , c = this.getDefaults();
                return this._options && a.each(this._options, function (a, d) {
                    c[a] != d && (b[a] = d)
                }),
                    b
            }
            ,
            b.prototype.enter = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
                return clearTimeout(c.timeout),
                    c.hoverState = "in",
                    c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function () {
                        "in" == c.hoverState && c.show()
                    }, c.options.delay.show)) : c.show()
            }
            ,
            b.prototype.leave = function (b) {
                var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
                return clearTimeout(c.timeout),
                    c.hoverState = "out",
                    c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function () {
                        "out" == c.hoverState && c.hide()
                    }, c.options.delay.hide)) : c.hide()
            }
            ,
            b.prototype.show = function () {
                var b = a.Event("show.bs." + this.type);
                if (this.hasContent() && this.enabled) {
                    if (this.$element.trigger(b),
                        b.isDefaultPrevented())
                        return;
                    var c = this
                        , d = this.tip();
                    this.setContent(),
                        this.options.animation && d.addClass("fade");
                    var e = "function" == typeof this.options.placement ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement
                        , f = /\s?auto?\s?/i
                        , g = f.test(e);
                    g && (e = e.replace(f, "") || "top"),
                        d.detach().css({
                            top: 0,
                            left: 0,
                            display: "block"
                        }).addClass(e),
                        this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
                    var h = this.getPosition()
                        , i = d[0].offsetWidth
                        , j = d[0].offsetHeight;
                    if (g) {
                        var k = this.$element.parent()
                            , l = e
                            , m = document.documentElement.scrollTop || document.body.scrollTop
                            , n = "body" == this.options.container ? window.innerWidth : k.outerWidth()
                            , o = "body" == this.options.container ? window.innerHeight : k.outerHeight()
                            , p = "body" == this.options.container ? 0 : k.offset().left;
                        e = "bottom" == e && h.top + h.height + j - m > o ? "top" : "top" == e && h.top - m - j < 0 ? "bottom" : "right" == e && h.right + i > n ? "left" : "left" == e && h.left - i < p ? "right" : e,
                            d.removeClass(l).addClass(e)
                    }
                    var q = this.getCalculatedOffset(e, h, i, j);
                    this.applyPlacement(q, e),
                        this.hoverState = null;
                    var r = function () {
                        c.$element.trigger("shown.bs." + c.type)
                    };
                    a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r()
                }
            }
            ,
            b.prototype.applyPlacement = function (b, c) {
                var d, e = this.tip(), f = e[0].offsetWidth, g = e[0].offsetHeight, h = parseInt(e.css("margin-top"), 10), i = parseInt(e.css("margin-left"), 10);
                isNaN(h) && (h = 0),
                    isNaN(i) && (i = 0),
                    b.top = b.top + h,
                    b.left = b.left + i,
                    a.offset.setOffset(e[0], a.extend({
                        using: function (a) {
                            e.css({
                                top: Math.round(a.top),
                                left: Math.round(a.left)
                            })
                        }
                    }, b), 0),
                    e.addClass("in");
                var j = e[0].offsetWidth
                    , k = e[0].offsetHeight;
                if ("top" == c && k != g && (d = !0,
                    b.top = b.top + g - k),
                    /bottom|top/.test(c)) {
                    var l = 0;
                    b.left < 0 && (l = -2 * b.left,
                        b.left = 0,
                        e.offset(b),
                        j = e[0].offsetWidth,
                        k = e[0].offsetHeight),
                        this.replaceArrow(l - f + j, j, "left")
                } else
                    this.replaceArrow(k - g, k, "top");
                d && e.offset(b)
            }
            ,
            b.prototype.replaceArrow = function (a, b, c) {
                this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
            }
            ,
            b.prototype.setContent = function () {
                var a = this.tip()
                    , b = this.getTitle();
                a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
                    a.removeClass("fade in top bottom left right")
            }
            ,
            b.prototype.hide = function () {
                function b() {
                    "in" != c.hoverState && d.detach(),
                        c.$element.trigger("hidden.bs." + c.type)
                }
                var c = this
                    , d = this.tip()
                    , e = a.Event("hide.bs." + this.type);
                return this.$element.trigger(e),
                    e.isDefaultPrevented() ? void 0 : (d.removeClass("in"),
                        a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(),
                        this.hoverState = null,
                        this)
            }
            ,
            b.prototype.fixTitle = function () {
                var a = this.$element;
                (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
            }
            ,
            b.prototype.hasContent = function () {
                return this.getTitle()
            }
            ,
            b.prototype.getPosition = function () {
                var b = this.$element[0];
                return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                    width: b.offsetWidth,
                    height: b.offsetHeight
                }, this.$element.offset())
            }
            ,
            b.prototype.getCalculatedOffset = function (a, b, c, d) {
                return "bottom" == a ? {
                    top: b.top + b.height,
                    left: b.left + b.width / 2 - c / 2
                } : "top" == a ? {
                    top: b.top - d,
                    left: b.left + b.width / 2 - c / 2
                } : "left" == a ? {
                    top: b.top + b.height / 2 - d / 2,
                    left: b.left - c
                } : {
                                top: b.top + b.height / 2 - d / 2,
                                left: b.left + b.width
                            }
            }
            ,
            b.prototype.getTitle = function () {
                var a, b = this.$element, c = this.options;
                return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
            }
            ,
            b.prototype.tip = function () {
                return this.$tip = this.$tip || a(this.options.template)
            }
            ,
            b.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            }
            ,
            b.prototype.validate = function () {
                this.$element[0].parentNode || (this.hide(),
                    this.$element = null,
                    this.options = null)
            }
            ,
            b.prototype.enable = function () {
                this.enabled = !0
            }
            ,
            b.prototype.disable = function () {
                this.enabled = !1
            }
            ,
            b.prototype.toggleEnabled = function () {
                this.enabled = !this.enabled
            }
            ,
            b.prototype.toggle = function (b) {
                var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
                c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
            }
            ,
            b.prototype.destroy = function () {
                clearTimeout(this.timeout),
                    this.hide().$element.off("." + this.type).removeData("bs." + this.type)
            }
            ;
        var c = a.fn.tooltip;
        a.fn.tooltip = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.tooltip")
                    , f = "object" == typeof c && c;
                (e || "destroy" != c) && (e || d.data("bs.tooltip", e = new b(this, f)),
                    "string" == typeof c && e[c]())
            })
        }
            ,
            a.fn.tooltip.Constructor = b,
            a.fn.tooltip.noConflict = function () {
                return a.fn.tooltip = c,
                    this
            }
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (a, b) {
            this.init("popover", a, b)
        };
        if (!a.fn.tooltip)
            throw new Error("Popover requires tooltip.js");
        b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }),
            b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype),
            b.prototype.constructor = b,
            b.prototype.getDefaults = function () {
                return b.DEFAULTS
            }
            ,
            b.prototype.setContent = function () {
                var a = this.tip()
                    , b = this.getTitle()
                    , c = this.getContent();
                a.find(".popover-title")[this.options.html ? "html" : "text"](b),
                    a.find(".popover-content")[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c),
                    a.removeClass("fade top bottom left right in"),
                    a.find(".popover-title").html() || a.find(".popover-title").hide()
            }
            ,
            b.prototype.hasContent = function () {
                return this.getTitle() || this.getContent()
            }
            ,
            b.prototype.getContent = function () {
                var a = this.$element
                    , b = this.options;
                return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
            }
            ,
            b.prototype.arrow = function () {
                return this.$arrow = this.$arrow || this.tip().find(".arrow")
            }
            ,
            b.prototype.tip = function () {
                return this.$tip || (this.$tip = a(this.options.template)),
                    this.$tip
            }
            ;
        var c = a.fn.popover;
        a.fn.popover = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.popover")
                    , f = "object" == typeof c && c;
                (e || "destroy" != c) && (e || d.data("bs.popover", e = new b(this, f)),
                    "string" == typeof c && e[c]())
            })
        }
            ,
            a.fn.popover.Constructor = b,
            a.fn.popover.noConflict = function () {
                return a.fn.popover = c,
                    this
            }
    }(jQuery),
    +function (a) {
        "use strict";
        function b(c, d) {
            var e, f = a.proxy(this.process, this);
            this.$element = a(a(c).is("body") ? window : c),
                this.$body = a("body"),
                this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f),
                this.options = a.extend({}, b.DEFAULTS, d),
                this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a",
                this.offsets = a([]),
                this.targets = a([]),
                this.activeTarget = null,
                this.refresh(),
                this.process()
        }
        b.DEFAULTS = {
            offset: 10
        },
            b.prototype.refresh = function () {
                var b = this.$element[0] == window ? "offset" : "position";
                this.offsets = a([]),
                    this.targets = a([]);
                {
                    var c = this;
                    this.$body.find(this.selector).map(function () {
                        var d = a(this)
                            , e = d.data("target") || d.attr("href")
                            , f = /^#./.test(e) && a(e);
                        return f && f.length && f.is(":visible") && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null
                    }).sort(function (a, b) {
                        return a[0] - b[0]
                    }).each(function () {
                        c.offsets.push(this[0]),
                            c.targets.push(this[1])
                    })
                }
            }
            ,
            b.prototype.process = function () {
                var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
                if (b >= d)
                    return g != (a = f.last()[0]) && this.activate(a);
                if (g && b <= e[0])
                    return g != (a = f[0]) && this.activate(a);
                for (a = e.length; a--;)
                    g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
            }
            ,
            b.prototype.activate = function (b) {
                this.activeTarget = b,
                    a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
                var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]'
                    , d = a(c).parents("li").addClass("active");
                d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")),
                    d.trigger("activate.bs.scrollspy")
            }
            ;
        var c = a.fn.scrollspy;
        a.fn.scrollspy = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.scrollspy")
                    , f = "object" == typeof c && c;
                e || d.data("bs.scrollspy", e = new b(this, f)),
                    "string" == typeof c && e[c]()
            })
        }
            ,
            a.fn.scrollspy.Constructor = b,
            a.fn.scrollspy.noConflict = function () {
                return a.fn.scrollspy = c,
                    this
            }
            ,
            a(window).on("load", function () {
                a('[data-spy="scroll"]').each(function () {
                    var b = a(this);
                    b.scrollspy(b.data())
                })
            })
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (b) {
            this.element = a(b)
        };
        b.prototype.show = function () {
            var b = this.element
                , c = b.closest("ul:not(.dropdown-menu)")
                , d = b.data("target");
            if (d || (d = b.attr("href"),
                d = d && d.replace(/.*(?=#[^\s]*$)/, "")),
                !b.parent("li").hasClass("active")) {
                var e = c.find(".active:last a")[0]
                    , f = a.Event("show.bs.tab", {
                        relatedTarget: e
                    });
                if (b.trigger(f),
                    !f.isDefaultPrevented()) {
                    var g = a(d);
                    this.activate(b.parent("li"), c),
                        this.activate(g, g.parent(), function () {
                            b.trigger({
                                type: "shown.bs.tab",
                                relatedTarget: e
                            })
                        })
                }
            }
        }
            ,
            b.prototype.activate = function (b, c, d) {
                function e() {
                    f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
                        b.addClass("active"),
                        g ? (b[0].offsetWidth,
                            b.addClass("in")) : b.removeClass("fade"),
                        b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"),
                        d && d()
                }
                var f = c.find("> .active")
                    , g = d && a.support.transition && f.hasClass("fade");
                g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(),
                    f.removeClass("in")
            }
            ;
        var c = a.fn.tab;
        a.fn.tab = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.tab");
                e || d.data("bs.tab", e = new b(this)),
                    "string" == typeof c && e[c]()
            })
        }
            ,
            a.fn.tab.Constructor = b,
            a.fn.tab.noConflict = function () {
                return a.fn.tab = c,
                    this
            }
            ,
            a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
                b.preventDefault(),
                    a(this).tab("show")
            })
    }(jQuery),
    +function (a) {
        "use strict";
        var b = function (c, d) {
            this.options = a.extend({}, b.DEFAULTS, d),
                this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)),
                this.$element = a(c),
                this.affixed = this.unpin = this.pinnedOffset = null,
                this.checkPosition()
        };
        b.RESET = "affix affix-top affix-bottom",
            b.DEFAULTS = {
                offset: 0
            },
            b.prototype.getPinnedOffset = function () {
                if (this.pinnedOffset)
                    return this.pinnedOffset;
                this.$element.removeClass(b.RESET).addClass("affix");
                var a = this.$window.scrollTop()
                    , c = this.$element.offset();
                return this.pinnedOffset = c.top - a
            }
            ,
            b.prototype.checkPositionWithEventLoop = function () {
                setTimeout(a.proxy(this.checkPosition, this), 1)
            }
            ,
            b.prototype.checkPosition = function () {
                if (this.$element.is(":visible")) {
                    var c = a(document).height()
                        , d = this.$window.scrollTop()
                        , e = this.$element.offset()
                        , f = this.options.offset
                        , g = f.top
                        , h = f.bottom;
                    "top" == this.affixed && (e.top += d),
                        "object" != typeof f && (h = g = f),
                        "function" == typeof g && (g = f.top(this.$element)),
                        "function" == typeof h && (h = f.bottom(this.$element));
                    var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
                    if (this.affixed !== i) {
                        this.unpin && this.$element.css("top", "");
                        var j = "affix" + (i ? "-" + i : "")
                            , k = a.Event(j + ".bs.affix");
                        this.$element.trigger(k),
                            k.isDefaultPrevented() || (this.affixed = i,
                                this.unpin = "bottom" == i ? this.getPinnedOffset() : null,
                                this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))),
                                "bottom" == i && this.$element.offset({
                                    top: c - h - this.$element.height()
                                }))
                    }
                }
            }
            ;
        var c = a.fn.affix;
        a.fn.affix = function (c) {
            return this.each(function () {
                var d = a(this)
                    , e = d.data("bs.affix")
                    , f = "object" == typeof c && c;
                e || d.data("bs.affix", e = new b(this, f)),
                    "string" == typeof c && e[c]()
            })
        }
            ,
            a.fn.affix.Constructor = b,
            a.fn.affix.noConflict = function () {
                return a.fn.affix = c,
                    this
            }
            ,
            a(window).on("load", function () {
                a('[data-spy="affix"]').each(function () {
                    var b = a(this)
                        , c = b.data();
                    c.offset = c.offset || {},
                        c.offsetBottom && (c.offset.bottom = c.offsetBottom),
                        c.offsetTop && (c.offset.top = c.offsetTop),
                        b.affix(c)
                })
            })
    }(jQuery);
/* rangeslider */
(function (f) {
    "function" === typeof define && define.amd ? define(["jquery"], function (n) {
        return f(n, document, window, navigator)
    }) : "object" === typeof exports ? f(require("jquery"), document, window, navigator) : f(jQuery, document, window, navigator)
}
)(function (f, n, k, r, p) {
    var t = 0
        , m = function () {
            var a = r.userAgent
                , b = /msie\s\d+/i;
            return 0 < a.search(b) && (a = b.exec(a).toString(),
                a = a.split(" ")[1],
                9 > a) ? (f("html").addClass("lt-ie9"),
                    !0) : !1
        }();
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this
            , d = [].slice;
        if ("function" != typeof b)
            throw new TypeError;
        var c = d.call(arguments, 1)
            , e = function () {
                if (this instanceof e) {
                    var g = function () { };
                    g.prototype = b.prototype;
                    var g = new g
                        , l = b.apply(g, c.concat(d.call(arguments)));
                    return Object(l) === l ? l : g
                }
                return b.apply(a, c.concat(d.call(arguments)))
            };
        return e
    }
    );
    Array.prototype.indexOf || (Array.prototype.indexOf = function (a, b) {
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var d = Object(this)
            , c = d.length >>> 0;
        if (0 === c)
            return -1;
        var e = +b || 0;
        Infinity === Math.abs(e) && (e = 0);
        if (e >= c)
            return -1;
        for (e = Math.max(0 <= e ? e : c - Math.abs(e), 0); e < c;) {
            if (e in d && d[e] === a)
                return e;
            e++
        }
        return -1
    }
    );
    var q = function (a, b, d) {
        this.VERSION = "2.2.0";
        this.input = a;
        this.plugin_count = d;
        this.old_to = this.old_from = this.update_tm = this.calc_count = this.current_plugin = 0;
        this.raf_id = this.old_min_interval = null;
        this.no_diapason = this.force_redraw = this.dragging = !1;
        this.has_tab_index = !0;
        this.is_update = this.is_key = !1;
        this.is_start = !0;
        this.is_click = this.is_resize = this.is_active = this.is_finish = !1;
        b = b || {};
        this.$cache = {
            win: f(k),
            body: f(n.body),
            input: f(a),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            edge: null,
            grid: null,
            grid_labels: []
        };
        this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };
        this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };
        var c = this.$cache.input;
        a = c.prop("value");
        var e;
        d = {
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !0,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " \u2014 ",
            input_values_separator: ";",
            disable: !1,
            block: !1,
            extra_classes: "",
            scope: null,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        };
        "INPUT" !== c[0].nodeName && console && console.warn && console.warn("Base element should be <input>!", c[0]);
        c = {
            type: c.data("type"),
            min: c.data("min"),
            max: c.data("max"),
            from: c.data("from"),
            to: c.data("to"),
            step: c.data("step"),
            min_interval: c.data("minInterval"),
            max_interval: c.data("maxInterval"),
            drag_interval: c.data("dragInterval"),
            values: c.data("values"),
            from_fixed: c.data("fromFixed"),
            from_min: c.data("fromMin"),
            from_max: c.data("fromMax"),
            from_shadow: c.data("fromShadow"),
            to_fixed: c.data("toFixed"),
            to_min: c.data("toMin"),
            to_max: c.data("toMax"),
            to_shadow: c.data("toShadow"),
            prettify_enabled: c.data("prettifyEnabled"),
            prettify_separator: c.data("prettifySeparator"),
            force_edges: c.data("forceEdges"),
            keyboard: c.data("keyboard"),
            grid: c.data("grid"),
            grid_margin: c.data("gridMargin"),
            grid_num: c.data("gridNum"),
            grid_snap: c.data("gridSnap"),
            hide_min_max: c.data("hideMinMax"),
            hide_from_to: c.data("hideFromTo"),
            prefix: c.data("prefix"),
            postfix: c.data("postfix"),
            max_postfix: c.data("maxPostfix"),
            decorate_both: c.data("decorateBoth"),
            values_separator: c.data("valuesSeparator"),
            input_values_separator: c.data("inputValuesSeparator"),
            disable: c.data("disable"),
            block: c.data("block"),
            extra_classes: c.data("extraClasses")
        };
        c.values = c.values && c.values.split(",");
        for (e in c)
            c.hasOwnProperty(e) && (c[e] !== p && "" !== c[e] || delete c[e]);
        a !== p && "" !== a && (a = a.split(c.input_values_separator || b.input_values_separator || ";"),
            a[0] && a[0] == +a[0] && (a[0] = +a[0]),
            a[1] && a[1] == +a[1] && (a[1] = +a[1]),
            b && b.values && b.values.length ? (d.from = a[0] && b.values.indexOf(a[0]),
                d.to = a[1] && b.values.indexOf(a[1])) : (d.from = a[0] && +a[0],
                    d.to = a[1] && +a[1]));
        f.extend(d, b);
        f.extend(d, c);
        this.options = d;
        this.update_check = {};
        this.validate();
        this.result = {
            input: this.$cache.input,
            slider: null,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        };
        this.init()
    };
    q.prototype = {
        init: function (a) {
            this.no_diapason = !1;
            this.coords.p_step = this.convertToPercent(this.options.step, !0);
            this.target = "base";
            this.toggleInput();
            this.append();
            this.setMinMax();
            a ? (this.force_redraw = !0,
                this.calc(!0),
                this.callOnUpdate()) : (this.force_redraw = !0,
                    this.calc(!0),
                    this.callOnStart());
            this.updateScene()
        },
        append: function () {
            this.$cache.input.before('<span class="irs js-irs-' + this.plugin_count + " " + this.options.extra_classes + '"></span>');
            this.$cache.input.prop("readonly", !0);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;
            this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="0"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>');
            this.$cache.rs = this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");
            "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'),
                this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"),
                this.$cache.s_single = this.$cache.cont.find(".single"),
                this.$cache.from[0].style.visibility = "hidden",
                this.$cache.to[0].style.visibility = "hidden",
                this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'),
                    this.$cache.s_from = this.$cache.cont.find(".from"),
                    this.$cache.s_to = this.$cache.cont.find(".to"),
                    this.$cache.shad_from = this.$cache.cont.find(".shadow-from"),
                    this.$cache.shad_to = this.$cache.cont.find(".shadow-to"),
                    this.setTopHandler());
            this.options.hide_from_to && (this.$cache.from[0].style.display = "none",
                this.$cache.to[0].style.display = "none",
                this.$cache.single[0].style.display = "none");
            this.appendGrid();
            this.options.disable ? (this.appendDisableMask(),
                this.$cache.input[0].disabled = !0) : (this.$cache.input[0].disabled = !1,
                    this.removeDisableMask(),
                    this.bindEvents());
            this.options.disable || (this.options.block ? this.appendDisableMask() : this.removeDisableMask());
            this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
        },
        setTopHandler: function () {
            var a = this.options.max
                , b = this.options.to;
            this.options.from > this.options.min && b === a ? this.$cache.s_from.addClass("type_last") : b < a && this.$cache.s_to.addClass("type_last")
        },
        changeLevel: function (a) {
            switch (a) {
                case "single":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                    this.$cache.s_single.addClass("state_hover");
                    break;
                case "from":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                    this.$cache.s_from.addClass("state_hover");
                    this.$cache.s_from.addClass("type_last");
                    this.$cache.s_to.removeClass("type_last");
                    break;
                case "to":
                    this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
                    this.$cache.s_to.addClass("state_hover");
                    this.$cache.s_to.addClass("type_last");
                    this.$cache.s_from.removeClass("type_last");
                    break;
                case "both":
                    this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake),
                        this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer),
                        this.$cache.s_to.removeClass("type_last"),
                        this.$cache.s_from.removeClass("type_last")
            }
        },
        appendDisableMask: function () {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>');
            this.$cache.cont.addClass("irs-disabled")
        },
        removeDisableMask: function () {
            this.$cache.cont.remove(".irs-disable-mask");
            this.$cache.cont.removeClass("irs-disabled")
        },
        remove: function () {
            this.$cache.cont.remove();
            this.$cache.cont = null;
            this.$cache.line.off("keydown.irs_" + this.plugin_count);
            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
            this.$cache.body.off("mousemove.irs_" + this.plugin_count);
            this.$cache.win.off("touchend.irs_" + this.plugin_count);
            this.$cache.win.off("mouseup.irs_" + this.plugin_count);
            m && (this.$cache.body.off("mouseup.irs_" + this.plugin_count),
                this.$cache.body.off("mouseleave.irs_" + this.plugin_count));
            this.$cache.grid_labels = [];
            this.coords.big = [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];
            cancelAnimationFrame(this.raf_id)
        },
        bindEvents: function () {
            if (!this.no_diapason) {
                this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this));
                this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")),
                    this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                        this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")));
                "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                    this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                    this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                    this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                    this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                    this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                    this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)),
                        this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)),
                        this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                        this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                        this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                        this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                        this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                        this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                        this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                        this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                        this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                        this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                        this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                        this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")));
                if (this.options.keyboard)
                    this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
                m && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)),
                    this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this)))
            }
        },
        pointerFocus: function (a) {
            if (!this.target) {
                var b = "single" === this.options.type ? this.$cache.single : this.$cache.from;
                a = b.offset().left;
                a += b.width() / 2 - 1;
                this.pointerClick("single", {
                    preventDefault: function () { },
                    pageX: a
                })
            }
        },
        pointerMove: function (a) {
            this.dragging && (this.coords.x_pointer = (a.pageX || a.originalEvent.touches && a.originalEvent.touches[0].pageX) - this.coords.x_gap,
                this.calc())
        },
        pointerUp: function (a) {
            this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1,
                this.$cache.cont.find(".state_hover").removeClass("state_hover"),
                this.force_redraw = !0,
                m && f("*").prop("unselectable", !1),
                this.updateScene(),
                this.restoreOriginalMinInterval(),
                (f.contains(this.$cache.cont[0], a.target) || this.dragging) && this.callOnFinish(),
                this.dragging = !1)
        },
        pointerDown: function (a, b) {
            b.preventDefault();
            var d = b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX;
            2 !== b.button && ("both" === a && this.setTempMinInterval(),
                a || (a = this.target || "from"),
                this.current_plugin = this.plugin_count,
                this.target = a,
                this.dragging = this.is_active = !0,
                this.coords.x_gap = this.$cache.rs.offset().left,
                this.coords.x_pointer = d - this.coords.x_gap,
                this.calcPointerPercent(),
                this.changeLevel(a),
                m && f("*").prop("unselectable", !0),
                this.$cache.line.trigger("focus"),
                this.updateScene())
        },
        pointerClick: function (a, b) {
            b.preventDefault();
            var d = b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX;
            2 !== b.button && (this.current_plugin = this.plugin_count,
                this.target = a,
                this.is_click = !0,
                this.coords.x_gap = this.$cache.rs.offset().left,
                this.coords.x_pointer = +(d - this.coords.x_gap).toFixed(),
                this.force_redraw = !0,
                this.calc(),
                this.$cache.line.trigger("focus"))
        },
        key: function (a, b) {
            if (!(this.current_plugin !== this.plugin_count || b.altKey || b.ctrlKey || b.shiftKey || b.metaKey)) {
                switch (b.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        b.preventDefault();
                        this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        b.preventDefault(),
                            this.moveByKey(!0)
                }
                return !0
            }
        },
        moveByKey: function (a) {
            var b = this.coords.p_pointer
                , d = (this.options.max - this.options.min) / 100
                , d = this.options.step / d;
            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * (a ? b + d : b - d));
            this.is_key = !0;
            this.calc()
        },
        setMinMax: function () {
            if (this.options)
                if (this.options.hide_min_max)
                    this.$cache.min[0].style.display = "none",
                        this.$cache.max[0].style.display = "none";
                else {
                    if (this.options.values.length)
                        this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])),
                            this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
                    else {
                        var a = this._prettify(this.options.min)
                            , b = this._prettify(this.options.max);
                        this.result.min_pretty = a;
                        this.result.max_pretty = b;
                        this.$cache.min.html(this.decorate(a, this.options.min));
                        this.$cache.max.html(this.decorate(b, this.options.max))
                    }
                    this.labels.w_min = this.$cache.min.outerWidth(!1);
                    this.labels.w_max = this.$cache.max.outerWidth(!1)
                }
        },
        setTempMinInterval: function () {
            var a = this.result.to - this.result.from;
            null === this.old_min_interval && (this.old_min_interval = this.options.min_interval);
            this.options.min_interval = a
        },
        restoreOriginalMinInterval: function () {
            null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval,
                this.old_min_interval = null)
        },
        calc: function (a) {
            if (this.options) {
                this.calc_count++;
                if (10 === this.calc_count || a)
                    this.calc_count = 0,
                        this.coords.w_rs = this.$cache.rs.outerWidth(!1),
                        this.calcHandlePercent();
                if (this.coords.w_rs) {
                    this.calcPointerPercent();
                    a = this.getHandleX();
                    "both" === this.target && (this.coords.p_gap = 0,
                        a = this.getHandleX());
                    "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2,
                        a = this.getHandleX(),
                        this.target = this.options.drag_interval ? "both_one" : this.chooseHandle(a));
                    switch (this.target) {
                        case "base":
                            var b = (this.options.max - this.options.min) / 100;
                            a = (this.result.from - this.options.min) / b;
                            b = (this.result.to - this.options.min) / b;
                            this.coords.p_single_real = this.toFixed(a);
                            this.coords.p_from_real = this.toFixed(a);
                            this.coords.p_to_real = this.toFixed(b);
                            this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            this.target = null;
                            break;
                        case "single":
                            if (this.options.from_fixed)
                                break;
                            this.coords.p_single_real = this.convertToRealPercent(a);
                            this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
                            this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                            this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                            break;
                        case "from":
                            if (this.options.from_fixed)
                                break;
                            this.coords.p_from_real = this.convertToRealPercent(a);
                            this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                            this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                            this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            break;
                        case "to":
                            if (this.options.to_fixed)
                                break;
                            this.coords.p_to_real = this.convertToRealPercent(a);
                            this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                            this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                            this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            break;
                        case "both":
                            if (this.options.from_fixed || this.options.to_fixed)
                                break;
                            a = this.toFixed(a + .001 * this.coords.p_handle);
                            this.coords.p_from_real = this.convertToRealPercent(a) - this.coords.p_gap_left;
                            this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            this.coords.p_to_real = this.convertToRealPercent(a) + this.coords.p_gap_right;
                            this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                            break;
                        case "both_one":
                            if (!this.options.from_fixed && !this.options.to_fixed) {
                                var d = this.convertToRealPercent(a);
                                a = this.result.to_percent - this.result.from_percent;
                                var c = a / 2
                                    , b = d - c
                                    , d = d + c;
                                0 > b && (b = 0,
                                    d = b + a);
                                100 < d && (d = 100,
                                    b = d - a);
                                this.coords.p_from_real = this.calcWithStep(b);
                                this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                                this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                                this.coords.p_to_real = this.calcWithStep(d);
                                this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                                this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                            }
                    }
                    "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2,
                        this.coords.p_bar_w = this.coords.p_single_fake,
                        this.result.from_percent = this.coords.p_single_real,
                        this.result.from = this.convertToValue(this.coords.p_single_real),
                        this.result.from_pretty = this._prettify(this.result.from),
                        this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2),
                            this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake),
                            this.result.from_percent = this.coords.p_from_real,
                            this.result.from = this.convertToValue(this.coords.p_from_real),
                            this.result.from_pretty = this._prettify(this.result.from),
                            this.result.to_percent = this.coords.p_to_real,
                            this.result.to = this.convertToValue(this.coords.p_to_real),
                            this.result.to_pretty = this._prettify(this.result.to),
                            this.options.values.length && (this.result.from_value = this.options.values[this.result.from],
                                this.result.to_value = this.options.values[this.result.to]));
                    this.calcMinMax();
                    this.calcLabels()
                }
            }
        },
        calcPointerPercent: function () {
            this.coords.w_rs ? (0 > this.coords.x_pointer || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs),
                this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0
        },
        convertToRealPercent: function (a) {
            return a / (100 - this.coords.p_handle) * 100
        },
        convertToFakePercent: function (a) {
            return a / 100 * (100 - this.coords.p_handle)
        },
        getHandleX: function () {
            var a = 100 - this.coords.p_handle
                , b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
            0 > b ? b = 0 : b > a && (b = a);
            return b
        },
        calcHandlePercent: function () {
            this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1);
            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100)
        },
        chooseHandle: function (a) {
            return "single" === this.options.type ? "single" : a >= this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from"
        },
        calcMinMax: function () {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100,
                this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        },
        calcLabels: function () {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1),
                this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100,
                this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1),
                    this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100,
                    this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2,
                    this.labels.p_from_left = this.toFixed(this.labels.p_from_left),
                    this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake),
                    this.labels.w_to = this.$cache.to.outerWidth(!1),
                    this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100,
                    this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2,
                    this.labels.p_to_left = this.toFixed(this.labels.p_to_left),
                    this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake),
                    this.labels.w_single = this.$cache.single.outerWidth(!1),
                    this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100,
                    this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2,
                    this.labels.p_single_left = this.toFixed(this.labels.p_single_left)),
                this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake))
        },
        updateScene: function () {
            this.raf_id && (cancelAnimationFrame(this.raf_id),
                this.raf_id = null);
            clearTimeout(this.update_tm);
            this.update_tm = null;
            this.options && (this.drawHandles(),
                this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300))
        },
        drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1);
            if (this.coords.w_rs) {
                this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base",
                    this.is_resize = !0);
                if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw)
                    this.setMinMax(),
                        this.calc(!0),
                        this.drawLabels(),
                        this.options.grid && (this.calcGridMargin(),
                            this.calcGridLabels()),
                        this.force_redraw = !0,
                        this.coords.w_rs_old = this.coords.w_rs,
                        this.drawShadow();
                if (this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key)) {
                    if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
                        this.drawLabels();
                        this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                        this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";
                        if ("single" === this.options.type)
                            this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%";
                        else {
                            this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
                            this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";
                            if (this.old_from !== this.result.from || this.force_redraw)
                                this.$cache.from[0].style.left = this.labels.p_from_left + "%";
                            if (this.old_to !== this.result.to || this.force_redraw)
                                this.$cache.to[0].style.left = this.labels.p_to_left + "%"
                        }
                        this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                        this.writeToInput();
                        this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || (this.$cache.input.trigger("change"),
                            this.$cache.input.trigger("input"));
                        this.old_from = this.result.from;
                        this.old_to = this.result.to;
                        this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange();
                        if (this.is_key || this.is_click)
                            this.is_click = this.is_key = !1,
                                this.callOnFinish();
                        this.is_finish = this.is_resize = this.is_update = !1
                    }
                    this.force_redraw = this.is_click = this.is_key = this.is_start = !1
                }
            }
        },
        drawLabels: function () {
            if (this.options) {
                var a = this.options.values.length
                    , b = this.options.p_values;
                if (!this.options.hide_from_to)
                    if ("single" === this.options.type) {
                        if (a)
                            a = this.decorate(b[this.result.from]);
                        else {
                            var d = this._prettify(this.result.from);
                            a = this.decorate(d, this.result.from)
                        }
                        this.$cache.single.html(a);
                        this.calcLabels();
                        this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible";
                        this.$cache.max[0].style.visibility = this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                    } else {
                        a ? (this.options.decorate_both ? (a = this.decorate(b[this.result.from]),
                            a += this.options.values_separator,
                            a += this.decorate(b[this.result.to])) : a = this.decorate(b[this.result.from] + this.options.values_separator + b[this.result.to]),
                            d = this.decorate(b[this.result.from]),
                            b = this.decorate(b[this.result.to])) : (d = this._prettify(this.result.from),
                                b = this._prettify(this.result.to),
                                this.options.decorate_both ? (a = this.decorate(d, this.result.from),
                                    a += this.options.values_separator,
                                    a += this.decorate(b, this.result.to)) : a = this.decorate(d + this.options.values_separator + b, this.result.to),
                                d = this.decorate(d, this.result.from),
                                b = this.decorate(b, this.result.to));
                        this.$cache.single.html(a);
                        this.$cache.from.html(d);
                        this.$cache.to.html(b);
                        this.calcLabels();
                        a = Math.min(this.labels.p_single_left, this.labels.p_from_left);
                        d = this.labels.p_single_left + this.labels.p_single_fake;
                        var b = this.labels.p_to_left + this.labels.p_to_fake
                            , c = Math.max(d, b);
                        this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden",
                            this.$cache.to[0].style.visibility = "hidden",
                            this.$cache.single[0].style.visibility = "visible",
                            this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"),
                                this.$cache.single[0].style.visibility = "hidden",
                                c = b) : (this.$cache.from[0].style.visibility = "hidden",
                                    this.$cache.to[0].style.visibility = "hidden",
                                    this.$cache.single[0].style.visibility = "visible",
                                    c = Math.max(d, b))) : (this.$cache.from[0].style.visibility = "visible",
                                        this.$cache.to[0].style.visibility = "visible",
                                        this.$cache.single[0].style.visibility = "hidden");
                        this.$cache.min[0].style.visibility = a < this.labels.p_min + 1 ? "hidden" : "visible";
                        this.$cache.max[0].style.visibility = c > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                    }
            }
        },
        drawShadow: function () {
            var a = this.options
                , b = this.$cache
                , d = "number" === typeof a.from_min && !isNaN(a.from_min)
                , c = "number" === typeof a.from_max && !isNaN(a.from_max)
                , e = "number" === typeof a.to_min && !isNaN(a.to_min)
                , g = "number" === typeof a.to_max && !isNaN(a.to_max);
            "single" === a.type ? a.from_shadow && (d || c) ? (d = this.convertToPercent(d ? a.from_min : a.min),
                c = this.convertToPercent(c ? a.from_max : a.max) - d,
                d = this.toFixed(d - this.coords.p_handle / 100 * d),
                c = this.toFixed(c - this.coords.p_handle / 100 * c),
                d += this.coords.p_handle / 2,
                b.shad_single[0].style.display = "block",
                b.shad_single[0].style.left = d + "%",
                b.shad_single[0].style.width = c + "%") : b.shad_single[0].style.display = "none" : (a.from_shadow && (d || c) ? (d = this.convertToPercent(d ? a.from_min : a.min),
                    c = this.convertToPercent(c ? a.from_max : a.max) - d,
                    d = this.toFixed(d - this.coords.p_handle / 100 * d),
                    c = this.toFixed(c - this.coords.p_handle / 100 * c),
                    d += this.coords.p_handle / 2,
                    b.shad_from[0].style.display = "block",
                    b.shad_from[0].style.left = d + "%",
                    b.shad_from[0].style.width = c + "%") : b.shad_from[0].style.display = "none",
                    a.to_shadow && (e || g) ? (e = this.convertToPercent(e ? a.to_min : a.min),
                        a = this.convertToPercent(g ? a.to_max : a.max) - e,
                        e = this.toFixed(e - this.coords.p_handle / 100 * e),
                        a = this.toFixed(a - this.coords.p_handle / 100 * a),
                        e += this.coords.p_handle / 2,
                        b.shad_to[0].style.display = "block",
                        b.shad_to[0].style.left = e + "%",
                        b.shad_to[0].style.width = a + "%") : b.shad_to[0].style.display = "none")
        },
        writeToInput: function () {
            "single" === this.options.type ? (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from),
                this.$cache.input.data("from", this.result.from)) : (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to),
                    this.$cache.input.data("from", this.result.from),
                    this.$cache.input.data("to", this.result.to))
        },
        callOnStart: function () {
            this.writeToInput();
            if (this.options.onStart && "function" === typeof this.options.onStart)
                if (this.options.scope)
                    this.options.onStart.call(this.options.scope, this.result);
                else
                    this.options.onStart(this.result)
        },
        callOnChange: function () {
            this.writeToInput();
            if (this.options.onChange && "function" === typeof this.options.onChange)
                if (this.options.scope)
                    this.options.onChange.call(this.options.scope, this.result);
                else
                    this.options.onChange(this.result)
        },
        callOnFinish: function () {
            this.writeToInput();
            if (this.options.onFinish && "function" === typeof this.options.onFinish)
                if (this.options.scope)
                    this.options.onFinish.call(this.options.scope, this.result);
                else
                    this.options.onFinish(this.result)
        },
        callOnUpdate: function () {
            this.writeToInput();
            if (this.options.onUpdate && "function" === typeof this.options.onUpdate)
                if (this.options.scope)
                    this.options.onUpdate.call(this.options.scope, this.result);
                else
                    this.options.onUpdate(this.result)
        },
        toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input");
            this.has_tab_index ? this.$cache.input.prop("tabindex", -1) : this.$cache.input.removeProp("tabindex");
            this.has_tab_index = !this.has_tab_index
        },
        convertToPercent: function (a, b) {
            var d = this.options.max - this.options.min;
            return d ? this.toFixed((b ? a : a - this.options.min) / (d / 100)) : (this.no_diapason = !0,
                0)
        },
        convertToValue: function (a) {
            var b = this.options.min, d = this.options.max, c = b.toString().split(".")[1], e = d.toString().split(".")[1], g, l, f = 0, h = 0;
            if (0 === a)
                return this.options.min;
            if (100 === a)
                return this.options.max;
            c && (f = g = c.length);
            e && (f = l = e.length);
            g && l && (f = g >= l ? g : l);
            0 > b && (h = Math.abs(b),
                b = +(b + h).toFixed(f),
                d = +(d + h).toFixed(f));
            a = (d - b) / 100 * a + b;
            (b = this.options.step.toString().split(".")[1]) ? a = +a.toFixed(b.length) : (a /= this.options.step,
                a *= this.options.step,
                a = +a.toFixed(0));
            h && (a -= h);
            h = b ? +a.toFixed(b.length) : this.toFixed(a);
            h < this.options.min ? h = this.options.min : h > this.options.max && (h = this.options.max);
            return h
        },
        calcWithStep: function (a) {
            var b = Math.round(a / this.coords.p_step) * this.coords.p_step;
            100 < b && (b = 100);
            100 === a && (b = 100);
            return this.toFixed(b)
        },
        checkMinInterval: function (a, b, d) {
            var c = this.options;
            if (!c.min_interval)
                return a;
            a = this.convertToValue(a);
            b = this.convertToValue(b);
            "from" === d ? b - a < c.min_interval && (a = b - c.min_interval) : a - b < c.min_interval && (a = b + c.min_interval);
            return this.convertToPercent(a)
        },
        checkMaxInterval: function (a, b, d) {
            var c = this.options;
            if (!c.max_interval)
                return a;
            a = this.convertToValue(a);
            b = this.convertToValue(b);
            "from" === d ? b - a > c.max_interval && (a = b - c.max_interval) : a - b > c.max_interval && (a = b + c.max_interval);
            return this.convertToPercent(a)
        },
        checkDiapason: function (a, b, d) {
            a = this.convertToValue(a);
            var c = this.options;
            "number" !== typeof b && (b = c.min);
            "number" !== typeof d && (d = c.max);
            a < b && (a = b);
            a > d && (a = d);
            return this.convertToPercent(a)
        },
        toFixed: function (a) {
            a = a.toFixed(20);
            return +a
        },
        _prettify: function (a) {
            return this.options.prettify_enabled ? this.options.prettify && "function" === typeof this.options.prettify ? this.options.prettify(a) : this.prettify(a) : a
        },
        prettify: function (a) {
            return a.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator)
        },
        checkEdges: function (a, b) {
            if (!this.options.force_edges)
                return this.toFixed(a);
            0 > a ? a = 0 : a > 100 - b && (a = 100 - b);
            return this.toFixed(a)
        },
        validate: function () {
            var a = this.options, b = this.result, d = a.values, c = d.length, e;
            "string" === typeof a.min && (a.min = +a.min);
            "string" === typeof a.max && (a.max = +a.max);
            "string" === typeof a.from && (a.from = +a.from);
            "string" === typeof a.to && (a.to = +a.to);
            "string" === typeof a.step && (a.step = +a.step);
            "string" === typeof a.from_min && (a.from_min = +a.from_min);
            "string" === typeof a.from_max && (a.from_max = +a.from_max);
            "string" === typeof a.to_min && (a.to_min = +a.to_min);
            "string" === typeof a.to_max && (a.to_max = +a.to_max);
            "string" === typeof a.grid_num && (a.grid_num = +a.grid_num);
            a.max < a.min && (a.max = a.min);
            if (c)
                for (a.p_values = [],
                    a.min = 0,
                    a.max = c - 1,
                    a.step = 1,
                    a.grid_num = a.max,
                    a.grid_snap = !0,
                    e = 0; e < c; e++) {
                    var g = +d[e];
                    isNaN(g) ? g = d[e] : (d[e] = g,
                        g = this._prettify(g));
                    a.p_values.push(g)
                }
            if ("number" !== typeof a.from || isNaN(a.from))
                a.from = a.min;
            if ("number" !== typeof a.to || isNaN(a.to))
                a.to = a.max;
            "single" === a.type ? (a.from < a.min && (a.from = a.min),
                a.from > a.max && (a.from = a.max)) : (a.from < a.min && (a.from = a.min),
                    a.from > a.max && (a.from = a.max),
                    a.to < a.min && (a.to = a.min),
                    a.to > a.max && (a.to = a.max),
                    this.update_check.from && (this.update_check.from !== a.from && a.from > a.to && (a.from = a.to),
                        this.update_check.to !== a.to && a.to < a.from && (a.to = a.from)),
                    a.from > a.to && (a.from = a.to),
                    a.to < a.from && (a.to = a.from));
            if ("number" !== typeof a.step || isNaN(a.step) || !a.step || 0 > a.step)
                a.step = 1;
            "number" === typeof a.from_min && a.from < a.from_min && (a.from = a.from_min);
            "number" === typeof a.from_max && a.from > a.from_max && (a.from = a.from_max);
            "number" === typeof a.to_min && a.to < a.to_min && (a.to = a.to_min);
            "number" === typeof a.to_max && a.from > a.to_max && (a.to = a.to_max);
            if (b) {
                b.min !== a.min && (b.min = a.min);
                b.max !== a.max && (b.max = a.max);
                if (b.from < b.min || b.from > b.max)
                    b.from = a.from;
                if (b.to < b.min || b.to > b.max)
                    b.to = a.to
            }
            if ("number" !== typeof a.min_interval || isNaN(a.min_interval) || !a.min_interval || 0 > a.min_interval)
                a.min_interval = 0;
            if ("number" !== typeof a.max_interval || isNaN(a.max_interval) || !a.max_interval || 0 > a.max_interval)
                a.max_interval = 0;
            a.min_interval && a.min_interval > a.max - a.min && (a.min_interval = a.max - a.min);
            a.max_interval && a.max_interval > a.max - a.min && (a.max_interval = a.max - a.min)
        },
        decorate: function (a, b) {
            var d = ""
                , c = this.options;
            c.prefix && (d += c.prefix);
            d += a;
            c.max_postfix && (c.values.length && a === c.p_values[c.max] ? (d += c.max_postfix,
                c.postfix && (d += " ")) : b === c.max && (d += c.max_postfix,
                    c.postfix && (d += " ")));
            c.postfix && (d += c.postfix);
            return d
        },
        updateFrom: function () {
            this.result.from = this.options.from;
            this.result.from_percent = this.convertToPercent(this.result.from);
            this.result.from_pretty = this._prettify(this.result.from);
            this.options.values && (this.result.from_value = this.options.values[this.result.from])
        },
        updateTo: function () {
            this.result.to = this.options.to;
            this.result.to_percent = this.convertToPercent(this.result.to);
            this.result.to_pretty = this._prettify(this.result.to);
            this.options.values && (this.result.to_value = this.options.values[this.result.to])
        },
        updateResult: function () {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo()
        },
        appendGrid: function () {
            if (this.options.grid) {
                var a = this.options, b;
                var d = a.max - a.min;
                var c = a.grid_num
                    , e = 4
                    , g = "";
                this.calcGridMargin();
                if (a.grid_snap)
                    if (50 < d) {
                        c = 50 / a.step;
                        var f = this.toFixed(a.step / .5)
                    } else
                        c = d / a.step,
                            f = this.toFixed(a.step / (d / 100));
                else
                    f = this.toFixed(100 / c);
                4 < c && (e = 3);
                7 < c && (e = 2);
                14 < c && (e = 1);
                28 < c && (e = 0);
                for (d = 0; d < c + 1; d++) {
                    var k = e;
                    var h = this.toFixed(f * d);
                    100 < h && (h = 100);
                    this.coords.big[d] = h;
                    var m = (h - f * (d - 1)) / (k + 1);
                    for (b = 1; b <= k && 0 !== h; b++) {
                        var n = this.toFixed(h - m * b);
                        g += '<span class="irs-grid-pol small" style="left: ' + n + '%"></span>'
                    }
                    g += '<span class="irs-grid-pol" style="left: ' + h + '%"></span>';
                    b = this.convertToValue(h);
                    b = a.values.length ? a.p_values[b] : this._prettify(b);
                    g += '<span class="irs-grid-text js-grid-text-' + d + '" style="left: ' + h + '%">' + b + "</span>"
                }
                this.coords.big_num = Math.ceil(c + 1);
                this.$cache.cont.addClass("irs-with-grid");
                this.$cache.grid.html(g);
                this.cacheGridLabels()
            }
        },
        cacheGridLabels: function () {
            var a, b = this.coords.big_num;
            for (a = 0; a < b; a++) {
                var d = this.$cache.grid.find(".js-grid-text-" + a);
                this.$cache.grid_labels.push(d)
            }
            this.calcGridLabels()
        },
        calcGridLabels: function () {
            var a;
            var b = [];
            var d = []
                , c = this.coords.big_num;
            for (a = 0; a < c; a++)
                this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(!1),
                    this.coords.big_p[a] = this.toFixed(this.coords.big_w[a] / this.coords.w_rs * 100),
                    this.coords.big_x[a] = this.toFixed(this.coords.big_p[a] / 2),
                    b[a] = this.toFixed(this.coords.big[a] - this.coords.big_x[a]),
                    d[a] = this.toFixed(b[a] + this.coords.big_p[a]);
            this.options.force_edges && (b[0] < -this.coords.grid_gap && (b[0] = -this.coords.grid_gap,
                d[0] = this.toFixed(b[0] + this.coords.big_p[0]),
                this.coords.big_x[0] = this.coords.grid_gap),
                d[c - 1] > 100 + this.coords.grid_gap && (d[c - 1] = 100 + this.coords.grid_gap,
                    b[c - 1] = this.toFixed(d[c - 1] - this.coords.big_p[c - 1]),
                    this.coords.big_x[c - 1] = this.toFixed(this.coords.big_p[c - 1] - this.coords.grid_gap)));
            this.calcGridCollision(2, b, d);
            this.calcGridCollision(4, b, d);
            for (a = 0; a < c; a++)
                b = this.$cache.grid_labels[a][0],
                    this.coords.big_x[a] !== Number.POSITIVE_INFINITY && (b.style.marginLeft = -this.coords.big_x[a] + "%")
        },
        calcGridCollision: function (a, b, d) {
            var c, e = this.coords.big_num;
            for (c = 0; c < e; c += a) {
                var g = c + a / 2;
                if (g >= e)
                    break;
                var f = this.$cache.grid_labels[g][0];
                f.style.visibility = d[c] <= b[g] ? "visible" : "hidden"
            }
        },
        calcGridMargin: function () {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1),
                this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1),
                    this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100),
                    this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1),
                    this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%",
                    this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        },
        update: function (a) {
            this.input && (this.is_update = !0,
                this.options.from = this.result.from,
                this.options.to = this.result.to,
                this.update_check.from = this.result.from,
                this.update_check.to = this.result.to,
                this.options = f.extend(this.options, a),
                this.validate(),
                this.updateResult(a),
                this.toggleInput(),
                this.remove(),
                this.init(!0))
        },
        reset: function () {
            this.input && (this.updateResult(),
                this.update())
        },
        destroy: function () {
            this.input && (this.toggleInput(),
                this.$cache.input.prop("readonly", !1),
                f.data(this.input, "ionRangeSlider", null),
                this.remove(),
                this.options = this.input = null)
        }
    };
    f.fn.ionRangeSlider = function (a) {
        return this.each(function () {
            f.data(this, "ionRangeSlider") || f.data(this, "ionRangeSlider", new q(this, a, t++))
        })
    }
        ;
    (function () {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0; d < b.length && !k.requestAnimationFrame; ++d)
            k.requestAnimationFrame = k[b[d] + "RequestAnimationFrame"],
                k.cancelAnimationFrame = k[b[d] + "CancelAnimationFrame"] || k[b[d] + "CancelRequestAnimationFrame"];
        k.requestAnimationFrame || (k.requestAnimationFrame = function (b, d) {
            var c = (new Date).getTime()
                , e = Math.max(0, 16 - (c - a))
                , f = k.setTimeout(function () {
                    b(c + e)
                }, e);
            a = c + e;
            return f
        }
        );
        k.cancelAnimationFrame || (k.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        }
        )
    }
    )()
})
/* flickity */
!function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";
    function i(i, o, a) {
        function l(t, e, n) {
            var s, o = "$()." + i + '("' + e + '")';
            return t.each(function (t, l) {
                var h = a.data(l, i);
                if (!h)
                    return void r(i + " not initialized. Cannot call methods, i.e. " + o);
                var c = h[e];
                if (!c || "_" == e.charAt(0))
                    return void r(o + " is not a valid method");
                var d = c.apply(h, n);
                s = void 0 === s ? d : s
            }),
                void 0 !== s ? s : t
        }
        function h(t, e) {
            t.each(function (t, n) {
                var s = a.data(n, i);
                s ? (s.option(e),
                    s._init()) : (s = new o(n, e),
                        a.data(n, i, s))
            })
        }
        a = a || e || t.jQuery,
            a && (o.prototype.option || (o.prototype.option = function (t) {
                a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
            }
            ),
                a.fn[i] = function (t) {
                    if ("string" == typeof t) {
                        var e = s.call(arguments, 1);
                        return l(this, t, e)
                    }
                    return h(this, t),
                        this
                }
                ,
                n(a))
    }
    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var s = Array.prototype.slice
        , o = t.console
        , r = "undefined" == typeof o ? function () { }
            : function (t) {
                o.error(t)
            }
        ;
    return n(e || t.jQuery),
        i
}),
    function (t, e) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
    }("undefined" != typeof window ? window : this, function () {
        function t() { }
        var e = t.prototype;
        return e.on = function (t, e) {
            if (t && e) {
                var i = this._events = this._events || {}
                    , n = i[t] = i[t] || [];
                return n.indexOf(e) == -1 && n.push(e),
                    this
            }
        }
            ,
            e.once = function (t, e) {
                if (t && e) {
                    this.on(t, e);
                    var i = this._onceEvents = this._onceEvents || {}
                        , n = i[t] = i[t] || {};
                    return n[e] = !0,
                        this
                }
            }
            ,
            e.off = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    var n = i.indexOf(e);
                    return n != -1 && i.splice(n, 1),
                        this
                }
            }
            ,
            e.emitEvent = function (t, e) {
                var i = this._events && this._events[t];
                if (i && i.length) {
                    i = i.slice(0),
                        e = e || [];
                    for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
                        var o = i[s]
                            , r = n && n[o];
                        r && (this.off(t, o),
                            delete n[o]),
                            o.apply(this, e)
                    }
                    return this
                }
            }
            ,
            e.allOff = function () {
                delete this._events,
                    delete this._onceEvents
            }
            ,
            t
    }),
    function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
            return e()
        }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
    }(window, function () {
        "use strict";
        function t(t) {
            var e = parseFloat(t)
                , i = t.indexOf("%") == -1 && !isNaN(e);
            return i && e
        }
        function e() { }
        function i() {
            for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
                var i = l[e];
                t[i] = 0
            }
            return t
        }
        function n(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
                e
        }
        function s() {
            if (!c) {
                c = !0;
                var e = document.createElement("div");
                e.style.width = "200px",
                    e.style.padding = "1px 2px 3px 4px",
                    e.style.borderStyle = "solid",
                    e.style.borderWidth = "1px 2px 3px 4px",
                    e.style.boxSizing = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var s = n(e);
                o.isBoxSizeOuter = r = 200 == t(s.width),
                    i.removeChild(e)
            }
        }
        function o(e) {
            if (s(),
                "string" == typeof e && (e = document.querySelector(e)),
                e && "object" == typeof e && e.nodeType) {
                var o = n(e);
                if ("none" == o.display)
                    return i();
                var a = {};
                a.width = e.offsetWidth,
                    a.height = e.offsetHeight;
                for (var c = a.isBorderBox = "border-box" == o.boxSizing, d = 0; d < h; d++) {
                    var u = l[d]
                        , f = o[u]
                        , p = parseFloat(f);
                    a[u] = isNaN(p) ? 0 : p
                }
                var g = a.paddingLeft + a.paddingRight
                    , v = a.paddingTop + a.paddingBottom
                    , m = a.marginLeft + a.marginRight
                    , y = a.marginTop + a.marginBottom
                    , b = a.borderLeftWidth + a.borderRightWidth
                    , E = a.borderTopWidth + a.borderBottomWidth
                    , S = c && r
                    , x = t(o.width);
                x !== !1 && (a.width = x + (S ? 0 : g + b));
                var C = t(o.height);
                return C !== !1 && (a.height = C + (S ? 0 : v + E)),
                    a.innerWidth = a.width - (g + b),
                    a.innerHeight = a.height - (v + E),
                    a.outerWidth = a.width + m,
                    a.outerHeight = a.height + y,
                    a
            }
        }
        var r, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        }
            , l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], h = l.length, c = !1;
        return o
    }),
    function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
    }(window, function () {
        "use strict";
        var t = function () {
            var t = window.Element.prototype;
            if (t.matches)
                return "matches";
            if (t.matchesSelector)
                return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i]
                    , s = n + "MatchesSelector";
                if (t[s])
                    return s
            }
        }();
        return function (e, i) {
            return e[t](i)
        }
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
    }(window, function (t, e) {
        var i = {};
        i.extend = function (t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        }
            ,
            i.modulo = function (t, e) {
                return (t % e + e) % e
            }
            ;
        var n = Array.prototype.slice;
        i.makeArray = function (t) {
            if (Array.isArray(t))
                return t;
            if (null === t || void 0 === t)
                return [];
            var e = "object" == typeof t && "number" == typeof t.length;
            return e ? n.call(t) : [t]
        }
            ,
            i.removeFrom = function (t, e) {
                var i = t.indexOf(e);
                i != -1 && t.splice(i, 1)
            }
            ,
            i.getParent = function (t, i) {
                for (; t.parentNode && t != document.body;)
                    if (t = t.parentNode,
                        e(t, i))
                        return t
            }
            ,
            i.getQueryElement = function (t) {
                return "string" == typeof t ? document.querySelector(t) : t
            }
            ,
            i.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }
            ,
            i.filterFindElements = function (t, n) {
                t = i.makeArray(t);
                var s = [];
                return t.forEach(function (t) {
                    if (t instanceof HTMLElement) {
                        if (!n)
                            return void s.push(t);
                        e(t, n) && s.push(t);
                        for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++)
                            s.push(i[o])
                    }
                }),
                    s
            }
            ,
            i.debounceMethod = function (t, e, i) {
                i = i || 100;
                var n = t.prototype[e]
                    , s = e + "Timeout";
                t.prototype[e] = function () {
                    var t = this[s];
                    clearTimeout(t);
                    var e = arguments
                        , o = this;
                    this[s] = setTimeout(function () {
                        n.apply(o, e),
                            delete o[s]
                    }, i)
                }
            }
            ,
            i.docReady = function (t) {
                var e = document.readyState;
                "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
            }
            ,
            i.toDashed = function (t) {
                return t.replace(/(.)([A-Z])/g, function (t, e, i) {
                    return e + "-" + i
                }).toLowerCase()
            }
            ;
        var s = t.console;
        return i.htmlInit = function (e, n) {
            i.docReady(function () {
                var o = i.toDashed(n)
                    , r = "data-" + o
                    , a = document.querySelectorAll("[" + r + "]")
                    , l = document.querySelectorAll(".js-" + o)
                    , h = i.makeArray(a).concat(i.makeArray(l))
                    , c = r + "-options"
                    , d = t.jQuery;
                h.forEach(function (t) {
                    var i, o = t.getAttribute(r) || t.getAttribute(c);
                    try {
                        i = o && JSON.parse(o)
                    } catch (a) {
                        return void (s && s.error("Error parsing " + r + " on " + t.className + ": " + a))
                    }
                    var l = new e(t, i);
                    d && d.data(t, n, l)
                })
            })
        }
            ,
            i
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {},
            t.Flickity.Cell = e(t, t.getSize))
    }(window, function (t, e) {
        function i(t, e) {
            this.element = t,
                this.parent = e,
                this.create()
        }
        var n = i.prototype;
        return n.create = function () {
            this.element.style.position = "absolute",
                this.element.setAttribute("aria-selected", "false"),
                this.x = 0,
                this.shift = 0
        }
            ,
            n.destroy = function () {
                this.element.style.position = "";
                var t = this.parent.originSide;
                this.element.removeAttribute("aria-selected"),
                    this.element.style[t] = ""
            }
            ,
            n.getSize = function () {
                this.size = e(this.element)
            }
            ,
            n.setPosition = function (t) {
                this.x = t,
                    this.updateTarget(),
                    this.renderPosition(t)
            }
            ,
            n.updateTarget = n.setDefaultTarget = function () {
                var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
                this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
            }
            ,
            n.renderPosition = function (t) {
                var e = this.parent.originSide;
                this.element.style[e] = this.parent.getPositionValue(t)
            }
            ,
            n.wrapShift = function (t) {
                this.shift = t,
                    this.renderPosition(this.x + this.parent.slideableWidth * t)
            }
            ,
            n.remove = function () {
                this.element.parentNode.removeChild(this.element)
            }
            ,
            i
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {},
            t.Flickity.Slide = e())
    }(window, function () {
        "use strict";
        function t(t) {
            this.parent = t,
                this.isOriginLeft = "left" == t.originSide,
                this.cells = [],
                this.outerWidth = 0,
                this.height = 0
        }
        var e = t.prototype;
        return e.addCell = function (t) {
            if (this.cells.push(t),
                this.outerWidth += t.size.outerWidth,
                this.height = Math.max(t.size.outerHeight, this.height),
                1 == this.cells.length) {
                this.x = t.x;
                var e = this.isOriginLeft ? "marginLeft" : "marginRight";
                this.firstMargin = t.size[e]
            }
        }
            ,
            e.updateTarget = function () {
                var t = this.isOriginLeft ? "marginRight" : "marginLeft"
                    , e = this.getLastCell()
                    , i = e ? e.size[t] : 0
                    , n = this.outerWidth - (this.firstMargin + i);
                this.target = this.x + this.firstMargin + n * this.parent.cellAlign
            }
            ,
            e.getLastCell = function () {
                return this.cells[this.cells.length - 1]
            }
            ,
            e.select = function () {
                this.changeSelected(!0)
            }
            ,
            e.unselect = function () {
                this.changeSelected(!1)
            }
            ,
            e.changeSelected = function (t) {
                var e = t ? "add" : "remove";
                this.cells.forEach(function (i) {
                    i.element.classList[e]("is-selected"),
                        i.element.setAttribute("aria-selected", t.toString())
                })
            }
            ,
            e.getCellElements = function () {
                return this.cells.map(function (t) {
                    return t.element
                })
            }
            ,
            t
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {},
            t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
    }(window, function (t, e) {
        var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame
            , n = 0;
        i || (i = function (t) {
            var e = (new Date).getTime()
                , i = Math.max(0, 16 - (e - n))
                , s = setTimeout(t, i);
            return n = e + i,
                s
        }
        );
        var s = {};
        s.startAnimation = function () {
            this.isAnimating || (this.isAnimating = !0,
                this.restingFrames = 0,
                this.animate())
        }
            ,
            s.animate = function () {
                this.applyDragForce(),
                    this.applySelectedAttraction();
                var t = this.x;
                if (this.integratePhysics(),
                    this.positionSlider(),
                    this.settle(t),
                    this.isAnimating) {
                    var e = this;
                    i(function () {
                        e.animate()
                    })
                }
            }
            ;
        var o = function () {
            var t = document.documentElement.style;
            return "string" == typeof t.transform ? "transform" : "WebkitTransform"
        }();
        return s.positionSlider = function () {
            var t = this.x;
            this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth),
                t -= this.slideableWidth,
                this.shiftWrapCells(t)),
                t += this.cursorPosition,
                t = this.options.rightToLeft && o ? -t : t;
            var i = this.getPositionValue(t);
            this.slider.style[o] = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
            var n = this.slides[0];
            if (n) {
                var s = -this.x - n.target
                    , r = s / this.slidesWidth;
                this.dispatchEvent("scroll", null, [r, s])
            }
        }
            ,
            s.positionSliderAtSelected = function () {
                this.cells.length && (this.x = -this.selectedSlide.target,
                    this.velocity = 0,
                    this.positionSlider())
            }
            ,
            s.getPositionValue = function (t) {
                return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
            }
            ,
            s.settle = function (t) {
                this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++,
                    this.restingFrames > 2 && (this.isAnimating = !1,
                        delete this.isFreeScrolling,
                        this.positionSlider(),
                        this.dispatchEvent("settle", null, [this.selectedIndex]))
            }
            ,
            s.shiftWrapCells = function (t) {
                var e = this.cursorPosition + t;
                this._shiftCells(this.beforeShiftCells, e, -1);
                var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
                this._shiftCells(this.afterShiftCells, i, 1)
            }
            ,
            s._shiftCells = function (t, e, i) {
                for (var n = 0; n < t.length; n++) {
                    var s = t[n]
                        , o = e > 0 ? i : 0;
                    s.wrapShift(o),
                        e -= s.size.outerWidth
                }
            }
            ,
            s._unshiftCells = function (t) {
                if (t && t.length)
                    for (var e = 0; e < t.length; e++)
                        t[e].wrapShift(0)
            }
            ,
            s.integratePhysics = function () {
                this.x += this.velocity,
                    this.velocity *= this.getFrictionFactor()
            }
            ,
            s.applyForce = function (t) {
                this.velocity += t
            }
            ,
            s.getFrictionFactor = function () {
                return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
            }
            ,
            s.getRestingPosition = function () {
                return this.x + this.velocity / (1 - this.getFrictionFactor())
            }
            ,
            s.applyDragForce = function () {
                if (this.isDraggable && this.isPointerDown) {
                    var t = this.dragX - this.x
                        , e = t - this.velocity;
                    this.applyForce(e)
                }
            }
            ,
            s.applySelectedAttraction = function () {
                var t = this.isDraggable && this.isPointerDown;
                if (!t && !this.isFreeScrolling && this.slides.length) {
                    var e = this.selectedSlide.target * -1 - this.x
                        , i = e * this.options.selectedAttraction;
                    this.applyForce(i)
                }
            }
            ,
            s
    }),
    function (t, e) {
        if ("function" == typeof define && define.amd)
            define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (i, n, s, o, r, a) {
                return e(t, i, n, s, o, r, a)
            });
        else if ("object" == typeof module && module.exports)
            module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
        else {
            var i = t.Flickity;
            t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
        }
    }(window, function (t, e, i, n, s, o, r) {
        function a(t, e) {
            for (t = n.makeArray(t); t.length;)
                e.appendChild(t.shift())
        }
        function l(t, e) {
            var i = n.getQueryElement(t);
            if (!i)
                return void (d && d.error("Bad element for Flickity: " + (i || t)));
            if (this.element = i,
                this.element.flickityGUID) {
                var s = f[this.element.flickityGUID];
                return s.option(e),
                    s
            }
            h && (this.$element = h(this.element)),
                this.options = n.extend({}, this.constructor.defaults),
                this.option(e),
                this._create()
        }
        var h = t.jQuery
            , c = t.getComputedStyle
            , d = t.console
            , u = 0
            , f = {};
        l.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: .075,
            friction: .28,
            namespaceJQueryEvents: !0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: .025,
            setGallerySize: !0
        },
            l.createMethods = [];
        var p = l.prototype;
        n.extend(p, e.prototype),
            p._create = function () {
                var e = this.guid = ++u;
                this.element.flickityGUID = e,
                    f[e] = this,
                    this.selectedIndex = 0,
                    this.restingFrames = 0,
                    this.x = 0,
                    this.velocity = 0,
                    this.originSide = this.options.rightToLeft ? "right" : "left",
                    this.viewport = document.createElement("div"),
                    this.viewport.className = "flickity-viewport",
                    this._createSlider(),
                    (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this);
                for (var i in this.options.on) {
                    var n = this.options.on[i];
                    this.on(i, n)
                }
                l.createMethods.forEach(function (t) {
                    this[t]()
                }, this),
                    this.options.watchCSS ? this.watchCSS() : this.activate()
            }
            ,
            p.option = function (t) {
                n.extend(this.options, t)
            }
            ,
            p.activate = function () {
                if (!this.isActive) {
                    this.isActive = !0,
                        this.element.classList.add("flickity-enabled"),
                        this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
                        this.getSize();
                    var t = this._filterFindCellElements(this.element.children);
                    a(t, this.slider),
                        this.viewport.appendChild(this.slider),
                        this.element.appendChild(this.viewport),
                        this.reloadCells(),
                        this.options.accessibility && (this.element.tabIndex = 0,
                            this.element.addEventListener("keydown", this)),
                        this.emitEvent("activate");
                    var e, i = this.options.initialIndex;
                    e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0,
                        this.select(e, !1, !0),
                        this.isInitActivated = !0,
                        this.dispatchEvent("ready")
                }
            }
            ,
            p._createSlider = function () {
                var t = document.createElement("div");
                t.className = "flickity-slider",
                    t.style[this.originSide] = 0,
                    this.slider = t
            }
            ,
            p._filterFindCellElements = function (t) {
                return n.filterFindElements(t, this.options.cellSelector)
            }
            ,
            p.reloadCells = function () {
                this.cells = this._makeCells(this.slider.children),
                    this.positionCells(),
                    this._getWrapShiftCells(),
                    this.setGallerySize()
            }
            ,
            p._makeCells = function (t) {
                var e = this._filterFindCellElements(t)
                    , i = e.map(function (t) {
                        return new s(t, this)
                    }, this);
                return i
            }
            ,
            p.getLastCell = function () {
                return this.cells[this.cells.length - 1]
            }
            ,
            p.getLastSlide = function () {
                return this.slides[this.slides.length - 1]
            }
            ,
            p.positionCells = function () {
                this._sizeCells(this.cells),
                    this._positionCells(0)
            }
            ,
            p._positionCells = function (t) {
                t = t || 0,
                    this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
                var e = 0;
                if (t > 0) {
                    var i = this.cells[t - 1];
                    e = i.x + i.size.outerWidth
                }
                for (var n = this.cells.length, s = t; s < n; s++) {
                    var o = this.cells[s];
                    o.setPosition(e),
                        e += o.size.outerWidth,
                        this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight)
                }
                this.slideableWidth = e,
                    this.updateSlides(),
                    this._containSlides(),
                    this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
            }
            ,
            p._sizeCells = function (t) {
                t.forEach(function (t) {
                    t.getSize()
                })
            }
            ,
            p.updateSlides = function () {
                if (this.slides = [],
                    this.cells.length) {
                    var t = new o(this);
                    this.slides.push(t);
                    var e = "left" == this.originSide
                        , i = e ? "marginRight" : "marginLeft"
                        , n = this._getCanCellFit();
                    this.cells.forEach(function (e, s) {
                        if (!t.cells.length)
                            return void t.addCell(e);
                        var r = t.outerWidth - t.firstMargin + (e.size.outerWidth - e.size[i]);
                        n.call(this, s, r) ? t.addCell(e) : (t.updateTarget(),
                            t = new o(this),
                            this.slides.push(t),
                            t.addCell(e))
                    }, this),
                        t.updateTarget(),
                        this.updateSelectedSlide()
                }
            }
            ,
            p._getCanCellFit = function () {
                var t = this.options.groupCells;
                if (!t)
                    return function () {
                        return !1
                    }
                        ;
                if ("number" == typeof t) {
                    var e = parseInt(t, 10);
                    return function (t) {
                        return t % e !== 0
                    }
                }
                var i = "string" == typeof t && t.match(/^(\d+)%$/)
                    , n = i ? parseInt(i[1], 10) / 100 : 1;
                return function (t, e) {
                    return e <= (this.size.innerWidth + 1) * n
                }
            }
            ,
            p._init = p.reposition = function () {
                this.positionCells(),
                    this.positionSliderAtSelected()
            }
            ,
            p.getSize = function () {
                this.size = i(this.element),
                    this.setCellAlign(),
                    this.cursorPosition = this.size.innerWidth * this.cellAlign
            }
            ;
        var g = {
            center: {
                left: .5,
                right: .5
            },
            left: {
                left: 0,
                right: 1
            },
            right: {
                right: 0,
                left: 1
            }
        };
        return p.setCellAlign = function () {
            var t = g[this.options.cellAlign];
            this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
        }
            ,
            p.setGallerySize = function () {
                if (this.options.setGallerySize) {
                    var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                    this.viewport.style.height = t + "px"
                }
            }
            ,
            p._getWrapShiftCells = function () {
                if (this.options.wrapAround) {
                    this._unshiftCells(this.beforeShiftCells),
                        this._unshiftCells(this.afterShiftCells);
                    var t = this.cursorPosition
                        , e = this.cells.length - 1;
                    this.beforeShiftCells = this._getGapCells(t, e, -1),
                        t = this.size.innerWidth - this.cursorPosition,
                        this.afterShiftCells = this._getGapCells(t, 0, 1)
                }
            }
            ,
            p._getGapCells = function (t, e, i) {
                for (var n = []; t > 0;) {
                    var s = this.cells[e];
                    if (!s)
                        break;
                    n.push(s),
                        e += i,
                        t -= s.size.outerWidth
                }
                return n
            }
            ,
            p._containSlides = function () {
                if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                    var t = this.options.rightToLeft
                        , e = t ? "marginRight" : "marginLeft"
                        , i = t ? "marginLeft" : "marginRight"
                        , n = this.slideableWidth - this.getLastCell().size[i]
                        , s = n < this.size.innerWidth
                        , o = this.cursorPosition + this.cells[0].size[e]
                        , r = n - this.size.innerWidth * (1 - this.cellAlign);
                    this.slides.forEach(function (t) {
                        s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o),
                            t.target = Math.min(t.target, r))
                    }, this)
                }
            }
            ,
            p.dispatchEvent = function (t, e, i) {
                var n = e ? [e].concat(i) : i;
                if (this.emitEvent(t, n),
                    h && this.$element) {
                    t += this.options.namespaceJQueryEvents ? ".flickity" : "";
                    var s = t;
                    if (e) {
                        var o = h.Event(e);
                        o.type = t,
                            s = o
                    }
                    this.$element.trigger(s, i)
                }
            }
            ,
            p.select = function (t, e, i) {
                if (this.isActive && (t = parseInt(t, 10),
                    this._wrapSelect(t),
                    (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)),
                    this.slides[t])) {
                    var s = this.selectedIndex;
                    this.selectedIndex = t,
                        this.updateSelectedSlide(),
                        i ? this.positionSliderAtSelected() : this.startAnimation(),
                        this.options.adaptiveHeight && this.setGallerySize(),
                        this.dispatchEvent("select", null, [t]),
                        t != s && this.dispatchEvent("change", null, [t]),
                        this.dispatchEvent("cellSelect")
                }
            }
            ,
            p._wrapSelect = function (t) {
                var e = this.slides.length
                    , i = this.options.wrapAround && e > 1;
                if (!i)
                    return t;
                var s = n.modulo(t, e)
                    , o = Math.abs(s - this.selectedIndex)
                    , r = Math.abs(s + e - this.selectedIndex)
                    , a = Math.abs(s - e - this.selectedIndex);
                !this.isDragSelect && r < o ? t += e : !this.isDragSelect && a < o && (t -= e),
                    t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
            }
            ,
            p.previous = function (t, e) {
                this.select(this.selectedIndex - 1, t, e)
            }
            ,
            p.next = function (t, e) {
                this.select(this.selectedIndex + 1, t, e)
            }
            ,
            p.updateSelectedSlide = function () {
                var t = this.slides[this.selectedIndex];
                t && (this.unselectSelectedSlide(),
                    this.selectedSlide = t,
                    t.select(),
                    this.selectedCells = t.cells,
                    this.selectedElements = t.getCellElements(),
                    this.selectedCell = t.cells[0],
                    this.selectedElement = this.selectedElements[0])
            }
            ,
            p.unselectSelectedSlide = function () {
                this.selectedSlide && this.selectedSlide.unselect()
            }
            ,
            p.selectCell = function (t, e, i) {
                var n = this.queryCell(t);
                if (n) {
                    var s = this.getCellSlideIndex(n);
                    this.select(s, e, i)
                }
            }
            ,
            p.getCellSlideIndex = function (t) {
                for (var e = 0; e < this.slides.length; e++) {
                    var i = this.slides[e]
                        , n = i.cells.indexOf(t);
                    if (n != -1)
                        return e
                }
            }
            ,
            p.getCell = function (t) {
                for (var e = 0; e < this.cells.length; e++) {
                    var i = this.cells[e];
                    if (i.element == t)
                        return i
                }
            }
            ,
            p.getCells = function (t) {
                t = n.makeArray(t);
                var e = [];
                return t.forEach(function (t) {
                    var i = this.getCell(t);
                    i && e.push(i)
                }, this),
                    e
            }
            ,
            p.getCellElements = function () {
                return this.cells.map(function (t) {
                    return t.element
                })
            }
            ,
            p.getParentCell = function (t) {
                var e = this.getCell(t);
                return e ? e : (t = n.getParent(t, ".flickity-slider > *"),
                    this.getCell(t))
            }
            ,
            p.getAdjacentCellElements = function (t, e) {
                if (!t)
                    return this.selectedSlide.getCellElements();
                e = void 0 === e ? this.selectedIndex : e;
                var i = this.slides.length;
                if (1 + 2 * t >= i)
                    return this.getCellElements();
                for (var s = [], o = e - t; o <= e + t; o++) {
                    var r = this.options.wrapAround ? n.modulo(o, i) : o
                        , a = this.slides[r];
                    a && (s = s.concat(a.getCellElements()))
                }
                return s
            }
            ,
            p.queryCell = function (t) {
                return "number" == typeof t ? this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)),
                    this.getCell(t))
            }
            ,
            p.uiChange = function () {
                this.emitEvent("uiChange")
            }
            ,
            p.childUIPointerDown = function (t) {
                this.emitEvent("childUIPointerDown", [t])
            }
            ,
            p.onresize = function () {
                this.watchCSS(),
                    this.resize()
            }
            ,
            n.debounceMethod(l, "onresize", 150),
            p.resize = function () {
                if (this.isActive) {
                    this.getSize(),
                        this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)),
                        this.positionCells(),
                        this._getWrapShiftCells(),
                        this.setGallerySize(),
                        this.emitEvent("resize");
                    var t = this.selectedElements && this.selectedElements[0];
                    this.selectCell(t, !1, !0)
                }
            }
            ,
            p.watchCSS = function () {
                var t = this.options.watchCSS;
                if (t) {
                    var e = c(this.element, ":after").content;
                    e.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
                }
            }
            ,
            p.onkeydown = function (t) {
                var e = document.activeElement && document.activeElement != this.element;
                if (this.options.accessibility && !e) {
                    var i = l.keyboardHandlers[t.keyCode];
                    i && i.call(this)
                }
            }
            ,
            l.keyboardHandlers = {
                37: function () {
                    var t = this.options.rightToLeft ? "next" : "previous";
                    this.uiChange(),
                        this[t]()
                },
                39: function () {
                    var t = this.options.rightToLeft ? "previous" : "next";
                    this.uiChange(),
                        this[t]()
                }
            },
            p.focus = function () {
                var e = t.pageYOffset;
                this.element.focus(),
                    t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
            }
            ,
            p.deactivate = function () {
                this.isActive && (this.element.classList.remove("flickity-enabled"),
                    this.element.classList.remove("flickity-rtl"),
                    this.unselectSelectedSlide(),
                    this.cells.forEach(function (t) {
                        t.destroy()
                    }),
                    this.element.removeChild(this.viewport),
                    a(this.slider.children, this.element),
                    this.options.accessibility && (this.element.removeAttribute("tabIndex"),
                        this.element.removeEventListener("keydown", this)),
                    this.isActive = !1,
                    this.emitEvent("deactivate"))
            }
            ,
            p.destroy = function () {
                this.deactivate(),
                    t.removeEventListener("resize", this),
                    this.emitEvent("destroy"),
                    h && this.$element && h.removeData(this.element, "flickity"),
                    delete this.element.flickityGUID,
                    delete f[this.guid]
            }
            ,
            n.extend(p, r),
            l.data = function (t) {
                t = n.getQueryElement(t);
                var e = t && t.flickityGUID;
                return e && f[e]
            }
            ,
            n.htmlInit(l, "flickity"),
            h && h.bridget && h.bridget("flickity", l),
            l.setJQuery = function (t) {
                h = t
            }
            ,
            l.Cell = s,
            l
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
    }(window, function (t, e) {
        function i() { }
        function n() { }
        var s = n.prototype = Object.create(e.prototype);
        s.bindStartEvent = function (t) {
            this._bindStartEvent(t, !0)
        }
            ,
            s.unbindStartEvent = function (t) {
                this._bindStartEvent(t, !1)
            }
            ,
            s._bindStartEvent = function (e, i) {
                i = void 0 === i || !!i;
                var n = i ? "addEventListener" : "removeEventListener";
                t.PointerEvent ? e[n]("pointerdown", this) : (e[n]("mousedown", this),
                    e[n]("touchstart", this))
            }
            ,
            s.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }
            ,
            s.getTouch = function (t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    if (i.identifier == this.pointerIdentifier)
                        return i
                }
            }
            ,
            s.onmousedown = function (t) {
                var e = t.button;
                e && 0 !== e && 1 !== e || this._pointerDown(t, t)
            }
            ,
            s.ontouchstart = function (t) {
                this._pointerDown(t, t.changedTouches[0])
            }
            ,
            s.onpointerdown = function (t) {
                this._pointerDown(t, t)
            }
            ,
            s._pointerDown = function (t, e) {
                t.button || this.isPointerDown || (this.isPointerDown = !0,
                    this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
                    this.pointerDown(t, e))
            }
            ,
            s.pointerDown = function (t, e) {
                this._bindPostStartEvents(t),
                    this.emitEvent("pointerDown", [t, e])
            }
            ;
        var o = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"]
        };
        return s._bindPostStartEvents = function (e) {
            if (e) {
                var i = o[e.type];
                i.forEach(function (e) {
                    t.addEventListener(e, this)
                }, this),
                    this._boundPointerEvents = i
            }
        }
            ,
            s._unbindPostStartEvents = function () {
                this._boundPointerEvents && (this._boundPointerEvents.forEach(function (e) {
                    t.removeEventListener(e, this)
                }, this),
                    delete this._boundPointerEvents)
            }
            ,
            s.onmousemove = function (t) {
                this._pointerMove(t, t)
            }
            ,
            s.onpointermove = function (t) {
                t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
            }
            ,
            s.ontouchmove = function (t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerMove(t, e)
            }
            ,
            s._pointerMove = function (t, e) {
                this.pointerMove(t, e)
            }
            ,
            s.pointerMove = function (t, e) {
                this.emitEvent("pointerMove", [t, e])
            }
            ,
            s.onmouseup = function (t) {
                this._pointerUp(t, t)
            }
            ,
            s.onpointerup = function (t) {
                t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
            }
            ,
            s.ontouchend = function (t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerUp(t, e)
            }
            ,
            s._pointerUp = function (t, e) {
                this._pointerDone(),
                    this.pointerUp(t, e)
            }
            ,
            s.pointerUp = function (t, e) {
                this.emitEvent("pointerUp", [t, e])
            }
            ,
            s._pointerDone = function () {
                this.isPointerDown = !1,
                    delete this.pointerIdentifier,
                    this._unbindPostStartEvents(),
                    this.pointerDone()
            }
            ,
            s.pointerDone = i,
            s.onpointercancel = function (t) {
                t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
            }
            ,
            s.ontouchcancel = function (t) {
                var e = this.getTouch(t.changedTouches);
                e && this._pointerCancel(t, e)
            }
            ,
            s._pointerCancel = function (t, e) {
                this._pointerDone(),
                    this.pointerCancel(t, e)
            }
            ,
            s.pointerCancel = function (t, e) {
                this.emitEvent("pointerCancel", [t, e])
            }
            ,
            n.getPointerPoint = function (t) {
                return {
                    x: t.pageX,
                    y: t.pageY
                }
            }
            ,
            n
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
    }(window, function (t, e) {
        function i() { }
        var n = i.prototype = Object.create(e.prototype);
        return n.bindHandles = function () {
            this._bindHandles(!0)
        }
            ,
            n.unbindHandles = function () {
                this._bindHandles(!1)
            }
            ,
            n._bindHandles = function (e) {
                e = void 0 === e || !!e;
                for (var i = e ? "addEventListener" : "removeEventListener", n = 0; n < this.handles.length; n++) {
                    var s = this.handles[n];
                    this._bindStartEvent(s, e),
                        s[i]("click", this),
                        t.PointerEvent && (s.style.touchAction = e ? this._touchActionValue : "")
                }
            }
            ,
            n._touchActionValue = "none",
            n.pointerDown = function (t, e) {
                if ("INPUT" == t.target.nodeName && "range" == t.target.type)
                    return this.isPointerDown = !1,
                        void delete this.pointerIdentifier;
                this._dragPointerDown(t, e);
                var i = document.activeElement;
                i && i.blur && i.blur(),
                    this._bindPostStartEvents(t),
                    this.emitEvent("pointerDown", [t, e])
            }
            ,
            n._dragPointerDown = function (t, i) {
                this.pointerDownPoint = e.getPointerPoint(i);
                var n = this.canPreventDefaultOnPointerDown(t, i);
                n && t.preventDefault()
            }
            ,
            n.canPreventDefaultOnPointerDown = function (t) {
                return "SELECT" != t.target.nodeName
            }
            ,
            n.pointerMove = function (t, e) {
                var i = this._dragPointerMove(t, e);
                this.emitEvent("pointerMove", [t, e, i]),
                    this._dragMove(t, e, i)
            }
            ,
            n._dragPointerMove = function (t, i) {
                var n = e.getPointerPoint(i)
                    , s = {
                        x: n.x - this.pointerDownPoint.x,
                        y: n.y - this.pointerDownPoint.y
                    };
                return !this.isDragging && this.hasDragStarted(s) && this._dragStart(t, i),
                    s
            }
            ,
            n.hasDragStarted = function (t) {
                return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
            }
            ,
            n.pointerUp = function (t, e) {
                this.emitEvent("pointerUp", [t, e]),
                    this._dragPointerUp(t, e)
            }
            ,
            n._dragPointerUp = function (t, e) {
                this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
            }
            ,
            n._dragStart = function (t, i) {
                this.isDragging = !0,
                    this.dragStartPoint = e.getPointerPoint(i),
                    this.isPreventingClicks = !0,
                    this.dragStart(t, i)
            }
            ,
            n.dragStart = function (t, e) {
                this.emitEvent("dragStart", [t, e])
            }
            ,
            n._dragMove = function (t, e, i) {
                this.isDragging && this.dragMove(t, e, i)
            }
            ,
            n.dragMove = function (t, e, i) {
                t.preventDefault(),
                    this.emitEvent("dragMove", [t, e, i])
            }
            ,
            n._dragEnd = function (t, e) {
                this.isDragging = !1,
                    setTimeout(function () {
                        delete this.isPreventingClicks
                    }
                        .bind(this)),
                    this.dragEnd(t, e)
            }
            ,
            n.dragEnd = function (t, e) {
                this.emitEvent("dragEnd", [t, e])
            }
            ,
            n.onclick = function (t) {
                this.isPreventingClicks && t.preventDefault()
            }
            ,
            n._staticClick = function (t, e) {
                if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
                    var i = t.target.nodeName;
                    "INPUT" != i && "TEXTAREA" != i || t.target.focus(),
                        this.staticClick(t, e),
                        "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
                            setTimeout(function () {
                                delete this.isIgnoringMouseUp
                            }
                                .bind(this), 400))
                }
            }
            ,
            n.staticClick = function (t, e) {
                this.emitEvent("staticClick", [t, e])
            }
            ,
            i.getPointerPoint = e.getPointerPoint,
            i
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (i, n, s) {
            return e(t, i, n, s)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
    }(window, function (t, e, i, n) {
        function s(t) {
            var e = "touchstart" == t.type
                , i = "touch" == t.pointerType
                , n = d[t.target.nodeName];
            return e || i || n
        }
        function o() {
            return {
                x: t.pageXOffset,
                y: t.pageYOffset
            }
        }
        n.extend(e.defaults, {
            draggable: ">1",
            dragThreshold: 3
        }),
            e.createMethods.push("_createDrag");
        var r = e.prototype;
        n.extend(r, i.prototype),
            r._touchActionValue = "pan-y";
        var a = "createTouch" in document
            , l = !1;
        r._createDrag = function () {
            this.on("activate", this.onActivateDrag),
                this.on("uiChange", this._uiChangeDrag),
                this.on("childUIPointerDown", this._childUIPointerDownDrag),
                this.on("deactivate", this.unbindDrag),
                this.on("cellChange", this.updateDraggable),
                a && !l && (t.addEventListener("touchmove", function () { }),
                    l = !0)
        }
            ,
            r.onActivateDrag = function () {
                this.handles = [this.viewport],
                    this.bindHandles(),
                    this.updateDraggable()
            }
            ,
            r.onDeactivateDrag = function () {
                this.unbindHandles(),
                    this.element.classList.remove("is-draggable")
            }
            ,
            r.updateDraggable = function () {
                ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable,
                    this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
            }
            ,
            r.bindDrag = function () {
                this.options.draggable = !0,
                    this.updateDraggable()
            }
            ,
            r.unbindDrag = function () {
                this.options.draggable = !1,
                    this.updateDraggable()
            }
            ,
            r._uiChangeDrag = function () {
                delete this.isFreeScrolling
            }
            ,
            r._childUIPointerDownDrag = function (t) {
                this.isDraggable && (t.preventDefault(),
                    this.pointerDownFocus(t))
            }
            ;
        var h = {
            TEXTAREA: !0,
            INPUT: !0,
            OPTION: !0
        }
            , c = {
                radio: !0,
                checkbox: !0,
                button: !0,
                submit: !0,
                image: !0,
                file: !0
            };
        r.pointerDown = function (e, i) {
            if (!this.isDraggable)
                return void this._pointerDownDefault(e, i);
            var n = h[e.target.nodeName] && !c[e.target.type];
            if (n)
                return this.isPointerDown = !1,
                    void delete this.pointerIdentifier;
            var s = document.activeElement
                , r = s && s.blur && s != this.element && s != document.body;
            r && s.blur(),
                this.pointerDownFocus(e),
                this.dragX = this.x,
                this.viewport.classList.add("is-pointer-down"),
                this.pointerDownScroll = o(),
                t.addEventListener("scroll", this),
                this._pointerDownDefault(e, i)
        }
            ,
            r._pointerDownDefault = function (t, e) {
                this._dragPointerDown(t, e),
                    this._bindPostStartEvents(t),
                    this.dispatchEvent("pointerDown", t, [e])
            }
            ,
            r.pointerDownFocus = function (t) {
                var e = s(t);
                e || this.focus()
            }
            ;
        var d = {
            INPUT: !0,
            SELECT: !0
        };
        return r.canPreventDefaultOnPointerDown = function (t) {
            var e = s(t);
            return this.isDraggable && !e
        }
            ,
            r.hasDragStarted = function (t) {
                return Math.abs(t.x) > this.options.dragThreshold
            }
            ,
            r.pointerUp = function (t, e) {
                delete this.isTouchScrolling,
                    this.viewport.classList.remove("is-pointer-down"),
                    this.dispatchEvent("pointerUp", t, [e]),
                    this._dragPointerUp(t, e)
            }
            ,
            r.pointerDone = function () {
                t.removeEventListener("scroll", this),
                    delete this.pointerDownScroll
            }
            ,
            r.dragStart = function (e, i) {
                this.isDraggable && (this.dragStartPosition = this.x,
                    this.startAnimation(),
                    t.removeEventListener("scroll", this),
                    this.dispatchEvent("dragStart", e, [i]))
            }
            ,
            r.pointerMove = function (t, e) {
                var i = this._dragPointerMove(t, e);
                this.dispatchEvent("pointerMove", t, [e, i]),
                    this._dragMove(t, e, i)
            }
            ,
            r.dragMove = function (t, e, i) {
                if (this.isDraggable) {
                    t.preventDefault(),
                        this.previousDragX = this.dragX;
                    var n = this.options.rightToLeft ? -1 : 1;
                    this.options.wrapAround && (i.x = i.x % this.slideableWidth);
                    var s = this.dragStartPosition + i.x * n;
                    if (!this.options.wrapAround && this.slides.length) {
                        var o = Math.max(-this.slides[0].target, this.dragStartPosition);
                        s = s > o ? .5 * (s + o) : s;
                        var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                        s = s < r ? .5 * (s + r) : s
                    }
                    this.dragX = s,
                        this.dragMoveTime = new Date,
                        this.dispatchEvent("dragMove", t, [e, i])
                }
            }
            ,
            r.dragEnd = function (t, e) {
                if (this.isDraggable) {
                    this.options.freeScroll && (this.isFreeScrolling = !0);
                    var i = this.dragEndRestingSelect();
                    if (this.options.freeScroll && !this.options.wrapAround) {
                        var n = this.getRestingPosition();
                        this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
                    } else
                        this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
                    delete this.previousDragX,
                        this.isDragSelect = this.options.wrapAround,
                        this.select(i),
                        delete this.isDragSelect,
                        this.dispatchEvent("dragEnd", t, [e])
                }
            }
            ,
            r.dragEndRestingSelect = function () {
                var t = this.getRestingPosition()
                    , e = Math.abs(this.getSlideDistance(-t, this.selectedIndex))
                    , i = this._getClosestResting(t, e, 1)
                    , n = this._getClosestResting(t, e, -1)
                    , s = i.distance < n.distance ? i.index : n.index;
                return s
            }
            ,
            r._getClosestResting = function (t, e, i) {
                for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function (t, e) {
                    return t <= e
                }
                    : function (t, e) {
                        return t < e
                    }
                    ; o(e, s) && (n += i,
                        s = e,
                        e = this.getSlideDistance(-t, n),
                        null !== e);)
                    e = Math.abs(e);
                return {
                    distance: s,
                    index: n - i
                }
            }
            ,
            r.getSlideDistance = function (t, e) {
                var i = this.slides.length
                    , s = this.options.wrapAround && i > 1
                    , o = s ? n.modulo(e, i) : e
                    , r = this.slides[o];
                if (!r)
                    return null;
                var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
                return t - (r.target + a)
            }
            ,
            r.dragEndBoostSelect = function () {
                if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100)
                    return 0;
                var t = this.getSlideDistance(-this.dragX, this.selectedIndex)
                    , e = this.previousDragX - this.dragX;
                return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
            }
            ,
            r.staticClick = function (t, e) {
                var i = this.getParentCell(t.target)
                    , n = i && i.element
                    , s = i && this.cells.indexOf(i);
                this.dispatchEvent("staticClick", t, [e, n, s])
            }
            ,
            r.onscroll = function () {
                var t = o()
                    , e = this.pointerDownScroll.x - t.x
                    , i = this.pointerDownScroll.y - t.y;
                (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
            }
            ,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
    }(window, function (t, e) {
        function i(t) {
            this.bindTap(t)
        }
        var n = i.prototype = Object.create(e.prototype);
        return n.bindTap = function (t) {
            t && (this.unbindTap(),
                this.tapElement = t,
                this._bindStartEvent(t, !0))
        }
            ,
            n.unbindTap = function () {
                this.tapElement && (this._bindStartEvent(this.tapElement, !0),
                    delete this.tapElement)
            }
            ,
            n.pointerUp = function (i, n) {
                if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
                    var s = e.getPointerPoint(n)
                        , o = this.tapElement.getBoundingClientRect()
                        , r = t.pageXOffset
                        , a = t.pageYOffset
                        , l = s.x >= o.left + r && s.x <= o.right + r && s.y >= o.top + a && s.y <= o.bottom + a;
                    if (l && this.emitEvent("tap", [i, n]),
                        "mouseup" != i.type) {
                        this.isIgnoringMouseUp = !0;
                        var h = this;
                        setTimeout(function () {
                            delete h.isIgnoringMouseUp
                        }, 400)
                    }
                }
            }
            ,
            n.destroy = function () {
                this.pointerDone(),
                    this.unbindTap()
            }
            ,
            i
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function (i, n, s) {
            return e(t, i, n, s)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
    }(window, function (t, e, i, n) {
        "use strict";
        function s(t, e) {
            this.direction = t,
                this.parent = e,
                this._create()
        }
        function o(t) {
            return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
        }
        var r = "http://www.w3.org/2000/svg";
        s.prototype = Object.create(i.prototype),
            s.prototype._create = function () {
                this.isEnabled = !0,
                    this.isPrevious = this.direction == -1;
                var t = this.parent.options.rightToLeft ? 1 : -1;
                this.isLeft = this.direction == t;
                var e = this.element = document.createElement("button");
                e.className = "flickity-button flickity-prev-next-button",
                    e.className += this.isPrevious ? " previous" : " next",
                    e.setAttribute("type", "button"),
                    this.disable(),
                    e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
                var i = this.createSVG();
                e.appendChild(i),
                    this.on("tap", this.onTap),
                    this.parent.on("select", this.update.bind(this)),
                    this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
            }
            ,
            s.prototype.activate = function () {
                this.bindTap(this.element),
                    this.element.addEventListener("click", this),
                    this.parent.element.appendChild(this.element)
            }
            ,
            s.prototype.deactivate = function () {
                this.parent.element.removeChild(this.element),
                    i.prototype.destroy.call(this),
                    this.element.removeEventListener("click", this)
            }
            ,
            s.prototype.createSVG = function () {
                var t = document.createElementNS(r, "svg");
                t.setAttribute("class", "flickity-button-icon"),
                    t.setAttribute("viewBox", "0 0 100 100");
                var e = document.createElementNS(r, "path")
                    , i = o(this.parent.options.arrowShape);
                return e.setAttribute("d", i),
                    e.setAttribute("class", "arrow"),
                    this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "),
                    t.appendChild(e),
                    t
            }
            ,
            s.prototype.onTap = function () {
                if (this.isEnabled) {
                    this.parent.uiChange();
                    var t = this.isPrevious ? "previous" : "next";
                    this.parent[t]()
                }
            }
            ,
            s.prototype.handleEvent = n.handleEvent,
            s.prototype.onclick = function () {
                var t = document.activeElement;
                t && t == this.element && this.onTap()
            }
            ,
            s.prototype.enable = function () {
                this.isEnabled || (this.element.disabled = !1,
                    this.isEnabled = !0)
            }
            ,
            s.prototype.disable = function () {
                this.isEnabled && (this.element.disabled = !0,
                    this.isEnabled = !1)
            }
            ,
            s.prototype.update = function () {
                var t = this.parent.slides;
                if (this.parent.options.wrapAround && t.length > 1)
                    return void this.enable();
                var e = t.length ? t.length - 1 : 0
                    , i = this.isPrevious ? 0 : e
                    , n = this.parent.selectedIndex == i ? "disable" : "enable";
                this[n]()
            }
            ,
            s.prototype.destroy = function () {
                this.deactivate()
            }
            ,
            n.extend(e.defaults, {
                prevNextButtons: !0,
                arrowShape: {
                    x0: 10,
                    x1: 60,
                    y1: 50,
                    x2: 70,
                    y2: 40,
                    x3: 30
                }
            }),
            e.createMethods.push("_createPrevNextButtons");
        var a = e.prototype;
        return a._createPrevNextButtons = function () {
            this.options.prevNextButtons && (this.prevButton = new s((-1), this),
                this.nextButton = new s(1, this),
                this.on("activate", this.activatePrevNextButtons))
        }
            ,
            a.activatePrevNextButtons = function () {
                this.prevButton.activate(),
                    this.nextButton.activate(),
                    this.on("deactivate", this.deactivatePrevNextButtons)
            }
            ,
            a.deactivatePrevNextButtons = function () {
                this.prevButton.deactivate(),
                    this.nextButton.deactivate(),
                    this.off("deactivate", this.deactivatePrevNextButtons)
            }
            ,
            e.PrevNextButton = s,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function (i, n, s) {
            return e(t, i, n, s)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
    }(window, function (t, e, i, n) {
        function s(t) {
            this.parent = t,
                this._create()
        }
        s.prototype = new i,
            s.prototype._create = function () {
                this.holder = document.createElement("ol"),
                    this.holder.className = "flickity-page-dots",
                    this.dots = [],
                    this.on("tap", this.onTap),
                    this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
            }
            ,
            s.prototype.activate = function () {
                this.setDots(),
                    this.bindTap(this.holder),
                    this.parent.element.appendChild(this.holder)
            }
            ,
            s.prototype.deactivate = function () {
                this.parent.element.removeChild(this.holder),
                    i.prototype.destroy.call(this)
            }
            ,
            s.prototype.setDots = function () {
                var t = this.parent.slides.length - this.dots.length;
                t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
            }
            ,
            s.prototype.addDots = function (t) {
                for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
                    var r = document.createElement("li");
                    r.className = "dot",
                        r.setAttribute("aria-label", "Page dot " + (o + 1)),
                        e.appendChild(r),
                        i.push(r)
                }
                this.holder.appendChild(e),
                    this.dots = this.dots.concat(i)
            }
            ,
            s.prototype.removeDots = function (t) {
                var e = this.dots.splice(this.dots.length - t, t);
                e.forEach(function (t) {
                    this.holder.removeChild(t)
                }, this)
            }
            ,
            s.prototype.updateSelected = function () {
                this.selectedDot && (this.selectedDot.className = "dot",
                    this.selectedDot.removeAttribute("aria-current")),
                    this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
                        this.selectedDot.className = "dot is-selected",
                        this.selectedDot.setAttribute("aria-current", "step"))
            }
            ,
            s.prototype.onTap = function (t) {
                var e = t.target;
                if ("LI" == e.nodeName) {
                    this.parent.uiChange();
                    var i = this.dots.indexOf(e);
                    this.parent.select(i)
                }
            }
            ,
            s.prototype.destroy = function () {
                this.deactivate()
            }
            ,
            e.PageDots = s,
            n.extend(e.defaults, {
                pageDots: !0
            }),
            e.createMethods.push("_createPageDots");
        var o = e.prototype;
        return o._createPageDots = function () {
            this.options.pageDots && (this.pageDots = new s(this),
                this.on("activate", this.activatePageDots),
                this.on("select", this.updateSelectedPageDots),
                this.on("cellChange", this.updatePageDots),
                this.on("resize", this.updatePageDots),
                this.on("deactivate", this.deactivatePageDots))
        }
            ,
            o.activatePageDots = function () {
                this.pageDots.activate()
            }
            ,
            o.updateSelectedPageDots = function () {
                this.pageDots.updateSelected()
            }
            ,
            o.updatePageDots = function () {
                this.pageDots.setDots()
            }
            ,
            o.deactivatePageDots = function () {
                this.pageDots.deactivate()
            }
            ,
            e.PageDots = s,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, i, n) {
            return e(t, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
    }(window, function (t, e, i) {
        function n(t) {
            this.parent = t,
                this.state = "stopped",
                o && (this.onVisibilityChange = function () {
                    this.visibilityChange()
                }
                    .bind(this),
                    this.onVisibilityPlay = function () {
                        this.visibilityPlay()
                    }
                        .bind(this))
        }
        var s, o;
        "hidden" in document ? (s = "hidden",
            o = "visibilitychange") : "webkitHidden" in document && (s = "webkitHidden",
                o = "webkitvisibilitychange"),
            n.prototype = Object.create(t.prototype),
            n.prototype.play = function () {
                if ("playing" != this.state) {
                    var t = document[s];
                    if (o && t)
                        return void document.addEventListener(o, this.onVisibilityPlay);
                    this.state = "playing",
                        o && document.addEventListener(o, this.onVisibilityChange),
                        this.tick()
                }
            }
            ,
            n.prototype.tick = function () {
                if ("playing" == this.state) {
                    var t = this.parent.options.autoPlay;
                    t = "number" == typeof t ? t : 3e3;
                    var e = this;
                    this.clear(),
                        this.timeout = setTimeout(function () {
                            e.parent.next(!0),
                                e.tick()
                        }, t)
                }
            }
            ,
            n.prototype.stop = function () {
                this.state = "stopped",
                    this.clear(),
                    o && document.removeEventListener(o, this.onVisibilityChange)
            }
            ,
            n.prototype.clear = function () {
                clearTimeout(this.timeout)
            }
            ,
            n.prototype.pause = function () {
                "playing" == this.state && (this.state = "paused",
                    this.clear())
            }
            ,
            n.prototype.unpause = function () {
                "paused" == this.state && this.play()
            }
            ,
            n.prototype.visibilityChange = function () {
                var t = document[s];
                this[t ? "pause" : "unpause"]()
            }
            ,
            n.prototype.visibilityPlay = function () {
                this.play(),
                    document.removeEventListener(o, this.onVisibilityPlay)
            }
            ,
            e.extend(i.defaults, {
                pauseAutoPlayOnHover: !0
            }),
            i.createMethods.push("_createPlayer");
        var r = i.prototype;
        return r._createPlayer = function () {
            this.player = new n(this),
                this.on("activate", this.activatePlayer),
                this.on("uiChange", this.stopPlayer),
                this.on("pointerDown", this.stopPlayer),
                this.on("deactivate", this.deactivatePlayer)
        }
            ,
            r.activatePlayer = function () {
                this.options.autoPlay && (this.player.play(),
                    this.element.addEventListener("mouseenter", this))
            }
            ,
            r.playPlayer = function () {
                this.player.play()
            }
            ,
            r.stopPlayer = function () {
                this.player.stop()
            }
            ,
            r.pausePlayer = function () {
                this.player.pause()
            }
            ,
            r.unpausePlayer = function () {
                this.player.unpause()
            }
            ,
            r.deactivatePlayer = function () {
                this.player.stop(),
                    this.element.removeEventListener("mouseenter", this)
            }
            ,
            r.onmouseenter = function () {
                this.options.pauseAutoPlayOnHover && (this.player.pause(),
                    this.element.addEventListener("mouseleave", this))
            }
            ,
            r.onmouseleave = function () {
                this.player.unpause(),
                    this.element.removeEventListener("mouseleave", this)
            }
            ,
            i.Player = n,
            i
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (i, n) {
            return e(t, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
    }(window, function (t, e, i) {
        function n(t) {
            var e = document.createDocumentFragment();
            return t.forEach(function (t) {
                e.appendChild(t.element)
            }),
                e
        }
        var s = e.prototype;
        return s.insert = function (t, e) {
            var i = this._makeCells(t);
            if (i && i.length) {
                var s = this.cells.length;
                e = void 0 === e ? s : e;
                var o = n(i)
                    , r = e == s;
                if (r)
                    this.slider.appendChild(o);
                else {
                    var a = this.cells[e].element;
                    this.slider.insertBefore(o, a)
                }
                if (0 === e)
                    this.cells = i.concat(this.cells);
                else if (r)
                    this.cells = this.cells.concat(i);
                else {
                    var l = this.cells.splice(e, s - e);
                    this.cells = this.cells.concat(i).concat(l)
                }
                this._sizeCells(i),
                    this.cellChange(e, !0)
            }
        }
            ,
            s.append = function (t) {
                this.insert(t, this.cells.length)
            }
            ,
            s.prepend = function (t) {
                this.insert(t, 0)
            }
            ,
            s.remove = function (t) {
                var e = this.getCells(t);
                if (e && e.length) {
                    var n = this.cells.length - 1;
                    e.forEach(function (t) {
                        t.remove();
                        var e = this.cells.indexOf(t);
                        n = Math.min(e, n),
                            i.removeFrom(this.cells, t)
                    }, this),
                        this.cellChange(n, !0)
                }
            }
            ,
            s.cellSizeChange = function (t) {
                var e = this.getCell(t);
                if (e) {
                    e.getSize();
                    var i = this.cells.indexOf(e);
                    this.cellChange(i)
                }
            }
            ,
            s.cellChange = function (t, e) {
                var i = this.selectedElement;
                this._positionCells(t),
                    this._getWrapShiftCells(),
                    this.setGallerySize();
                var n = this.getCell(i);
                n && (this.selectedIndex = this.getCellSlideIndex(n)),
                    this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
                    this.emitEvent("cellChange", [t]),
                    this.select(this.selectedIndex),
                    e && this.positionSliderAtSelected()
            }
            ,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (i, n) {
            return e(t, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
    }(window, function (t, e, i) {
        "use strict";
        function n(t) {
            if ("IMG" == t.nodeName) {
                var e = t.getAttribute("data-flickity-lazyload")
                    , n = t.getAttribute("data-flickity-lazyload-src")
                    , s = t.getAttribute("data-flickity-lazyload-srcset");
                if (e || n || s)
                    return [t]
            }
            var o = "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"
                , r = t.querySelectorAll(o);
            return i.makeArray(r)
        }
        function s(t, e) {
            this.img = t,
                this.flickity = e,
                this.load()
        }
        e.createMethods.push("_createLazyload");
        var o = e.prototype;
        return o._createLazyload = function () {
            this.on("select", this.lazyLoad)
        }
            ,
            o.lazyLoad = function () {
                var t = this.options.lazyLoad;
                if (t) {
                    var e = "number" == typeof t ? t : 0
                        , i = this.getAdjacentCellElements(e)
                        , o = [];
                    i.forEach(function (t) {
                        var e = n(t);
                        o = o.concat(e)
                    }),
                        o.forEach(function (t) {
                            new s(t, this)
                        }, this)
                }
            }
            ,
            s.prototype.handleEvent = i.handleEvent,
            s.prototype.load = function () {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this);
                var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src")
                    , e = this.img.getAttribute("data-flickity-lazyload-srcset");
                this.img.src = t,
                    e && this.img.setAttribute("srcset", e),
                    this.img.removeAttribute("data-flickity-lazyload"),
                    this.img.removeAttribute("data-flickity-lazyload-src"),
                    this.img.removeAttribute("data-flickity-lazyload-srcset")
            }
            ,
            s.prototype.onload = function (t) {
                this.complete(t, "flickity-lazyloaded")
            }
            ,
            s.prototype.onerror = function (t) {
                this.complete(t, "flickity-lazyerror")
            }
            ,
            s.prototype.complete = function (t, e) {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this);
                var i = this.flickity.getParentCell(this.img)
                    , n = i && i.element;
                this.flickity.cellSizeChange(n),
                    this.img.classList.add(e),
                    this.flickity.dispatchEvent("lazyLoad", t, n)
            }
            ,
            e.LazyLoader = s,
            e
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
    }(window, function (t) {
        return t
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
    }(window, function (t, e) {
        function i(t, e, i) {
            return (e - t) * i + t
        }
        t.createMethods.push("_createAsNavFor");
        var n = t.prototype;
        return n._createAsNavFor = function () {
            this.on("activate", this.activateAsNavFor),
                this.on("deactivate", this.deactivateAsNavFor),
                this.on("destroy", this.destroyAsNavFor);
            var t = this.options.asNavFor;
            if (t) {
                var e = this;
                setTimeout(function () {
                    e.setNavCompanion(t)
                })
            }
        }
            ,
            n.setNavCompanion = function (i) {
                i = e.getQueryElement(i);
                var n = t.data(i);
                if (n && n != this) {
                    this.navCompanion = n;
                    var s = this;
                    this.onNavCompanionSelect = function () {
                        s.navCompanionSelect()
                    }
                        ,
                        n.on("select", this.onNavCompanionSelect),
                        this.on("staticClick", this.onNavStaticClick),
                        this.navCompanionSelect(!0)
                }
            }
            ,
            n.navCompanionSelect = function (t) {
                if (this.navCompanion) {
                    var e = this.navCompanion.selectedCells[0]
                        , n = this.navCompanion.cells.indexOf(e)
                        , s = n + this.navCompanion.selectedCells.length - 1
                        , o = Math.floor(i(n, s, this.navCompanion.cellAlign));
                    if (this.selectCell(o, !1, t),
                        this.removeNavSelectedElements(),
                        !(o >= this.cells.length)) {
                        var r = this.cells.slice(n, s + 1);
                        this.navSelectedElements = r.map(function (t) {
                            return t.element
                        }),
                            this.changeNavSelectedClass("add")
                    }
                }
            }
            ,
            n.changeNavSelectedClass = function (t) {
                this.navSelectedElements.forEach(function (e) {
                    e.classList[t]("is-nav-selected")
                })
            }
            ,
            n.activateAsNavFor = function () {
                this.navCompanionSelect(!0)
            }
            ,
            n.removeNavSelectedElements = function () {
                this.navSelectedElements && (this.changeNavSelectedClass("remove"),
                    delete this.navSelectedElements)
            }
            ,
            n.onNavStaticClick = function (t, e, i, n) {
                "number" == typeof n && this.navCompanion.selectCell(n)
            }
            ,
            n.deactivateAsNavFor = function () {
                this.removeNavSelectedElements()
            }
            ,
            n.destroyAsNavFor = function () {
                this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
                    this.off("staticClick", this.onNavStaticClick),
                    delete this.navCompanion)
            }
            ,
            t
    }),
    function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }("undefined" != typeof window ? window : this, function (t, e) {
        function i(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        }
        function n(t) {
            if (Array.isArray(t))
                return t;
            var e = "object" == typeof t && "number" == typeof t.length;
            return e ? h.call(t) : [t]
        }
        function s(t, e, o) {
            if (!(this instanceof s))
                return new s(t, e, o);
            var r = t;
            return "string" == typeof t && (r = document.querySelectorAll(t)),
                r ? (this.elements = n(r),
                    this.options = i({}, this.options),
                    "function" == typeof e ? o = e : i(this.options, e),
                    o && this.on("always", o),
                    this.getImages(),
                    a && (this.jqDeferred = new a.Deferred),
                    void setTimeout(this.check.bind(this))) : void l.error("Bad element for imagesLoaded " + (r || t))
        }
        function o(t) {
            this.img = t
        }
        function r(t, e) {
            this.url = t,
                this.element = e,
                this.img = new Image
        }
        var a = t.jQuery
            , l = t.console
            , h = Array.prototype.slice;
        s.prototype = Object.create(e.prototype),
            s.prototype.options = {},
            s.prototype.getImages = function () {
                this.images = [],
                    this.elements.forEach(this.addElementImages, this)
            }
            ,
            s.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t),
                    this.options.background === !0 && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && c[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var s = i[n];
                        this.addImage(s)
                    }
                    if ("string" == typeof this.options.background) {
                        var o = t.querySelectorAll(this.options.background);
                        for (n = 0; n < o.length; n++) {
                            var r = o[n];
                            this.addElementBackgroundImages(r)
                        }
                    }
                }
            }
            ;
        var c = {
            1: !0,
            9: !0,
            11: !0
        };
        return s.prototype.addElementBackgroundImages = function (t) {
            var e = getComputedStyle(t);
            if (e)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                    var s = n && n[2];
                    s && this.addBackground(s, t),
                        n = i.exec(e.backgroundImage)
                }
        }
            ,
            s.prototype.addImage = function (t) {
                var e = new o(t);
                this.images.push(e)
            }
            ,
            s.prototype.addBackground = function (t, e) {
                var i = new r(t, e);
                this.images.push(i)
            }
            ,
            s.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n)
                    })
                }
                var e = this;
                return this.progressedCount = 0,
                    this.hasAnyBroken = !1,
                    this.images.length ? void this.images.forEach(function (e) {
                        e.once("progress", t),
                            e.check()
                    }) : void this.complete()
            }
            ,
            s.prototype.progress = function (t, e, i) {
                this.progressedCount++,
                    this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && l && l.log("progress: " + i, t, e)
            }
            ,
            s.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0,
                    this.emitEvent(t, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this)
                }
            }
            ,
            o.prototype = Object.create(e.prototype),
            o.prototype.check = function () {
                var t = this.getIsImageComplete();
                return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                    this.proxyImage.addEventListener("load", this),
                    this.proxyImage.addEventListener("error", this),
                    this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    void (this.proxyImage.src = this.img.src))
            }
            ,
            o.prototype.getIsImageComplete = function () {
                return this.img.complete && this.img.naturalWidth
            }
            ,
            o.prototype.confirm = function (t, e) {
                this.isLoaded = t,
                    this.emitEvent("progress", [this, this.img, e])
            }
            ,
            o.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }
            ,
            o.prototype.onload = function () {
                this.confirm(!0, "onload"),
                    this.unbindEvents()
            }
            ,
            o.prototype.onerror = function () {
                this.confirm(!1, "onerror"),
                    this.unbindEvents()
            }
            ,
            o.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
            }
            ,
            r.prototype = Object.create(o.prototype),
            r.prototype.check = function () {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    this.img.src = this.url;
                var t = this.getIsImageComplete();
                t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents())
            }
            ,
            r.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
            }
            ,
            r.prototype.confirm = function (t, e) {
                this.isLoaded = t,
                    this.emitEvent("progress", [this, this.element, e])
            }
            ,
            s.makeJQueryPlugin = function (e) {
                e = e || t.jQuery,
                    e && (a = e,
                        a.fn.imagesLoaded = function (t, e) {
                            var i = new s(this, t, e);
                            return i.jqDeferred.promise(a(this))
                        }
                    )
            }
            ,
            s.makeJQueryPlugin(),
            s
    }),
    function (t, e) {
        "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (i, n) {
            return e(t, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
    }(window, function (t, e, i) {
        "use strict";
        e.createMethods.push("_createImagesLoaded");
        var n = e.prototype;
        return n._createImagesLoaded = function () {
            this.on("activate", this.imagesLoaded)
        }
            ,
            n.imagesLoaded = function () {
                function t(t, i) {
                    var n = e.getParentCell(i.img);
                    e.cellSizeChange(n && n.element),
                        e.options.freeScroll || e.positionSliderAtSelected()
                }
                if (this.options.imagesLoaded) {
                    var e = this;
                    i(this.slider).on("progress", t)
                }
            }
            ,
            e
    });
/* imagesloaded */
!function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() { }
    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
                , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
                this
        }
    }
        ,
        e.once = function (t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {}
                    , n = i[t] = i[t] || {};
                return n[e] = !0,
                    this
            }
        }
        ,
        e.off = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1),
                    this
            }
        }
        ,
        e.emitEvent = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0
                    , o = i[n];
                e = e || [];
                for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                    var s = r && r[o];
                    s && (this.off(t, o),
                        delete r[o]),
                        o.apply(this, e),
                        n += s ? 0 : 1,
                        o = i[n]
                }
                return this
            }
        }
        ,
        t
}),
    function (t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
            return e(t, i)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
    }("undefined" != typeof window ? window : this, function (t, e) {
        function i(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        }
        function n(t) {
            var e = [];
            if (Array.isArray(t))
                e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++)
                    e.push(t[i]);
            else
                e.push(t);
            return e
        }
        function o(t, e, r) {
            return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)),
                this.elements = n(t),
                this.options = i({}, this.options),
                "function" == typeof e ? r = e : i(this.options, e),
                r && this.on("always", r),
                this.getImages(),
                h && (this.jqDeferred = new h.Deferred),
                void setTimeout(function () {
                    this.check()
                }
                    .bind(this))) : new o(t, e, r)
        }
        function r(t) {
            this.img = t
        }
        function s(t, e) {
            this.url = t,
                this.element = e,
                this.img = new Image
        }
        var h = t.jQuery
            , a = t.console;
        o.prototype = Object.create(e.prototype),
            o.prototype.options = {},
            o.prototype.getImages = function () {
                this.images = [],
                    this.elements.forEach(this.addElementImages, this)
            }
            ,
            o.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t),
                    this.options.background === !0 && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && d[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o)
                    }
                    if ("string" == typeof this.options.background) {
                        var r = t.querySelectorAll(this.options.background);
                        for (n = 0; n < r.length; n++) {
                            var s = r[n];
                            this.addElementBackgroundImages(s)
                        }
                    }
                }
            }
            ;
        var d = {
            1: !0,
            9: !0,
            11: !0
        };
        return o.prototype.addElementBackgroundImages = function (t) {
            var e = getComputedStyle(t);
            if (e)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                    var o = n && n[2];
                    o && this.addBackground(o, t),
                        n = i.exec(e.backgroundImage)
                }
        }
            ,
            o.prototype.addImage = function (t) {
                var e = new r(t);
                this.images.push(e)
            }
            ,
            o.prototype.addBackground = function (t, e) {
                var i = new s(t, e);
                this.images.push(i)
            }
            ,
            o.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n)
                    })
                }
                var e = this;
                return this.progressedCount = 0,
                    this.hasAnyBroken = !1,
                    this.images.length ? void this.images.forEach(function (e) {
                        e.once("progress", t),
                            e.check()
                    }) : void this.complete()
            }
            ,
            o.prototype.progress = function (t, e, i) {
                this.progressedCount++,
                    this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
                    this.emitEvent("progress", [this, t, e]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && a && a.log("progress: " + i, t, e)
            }
            ,
            o.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0,
                    this.emitEvent(t, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this)
                }
            }
            ,
            r.prototype = Object.create(e.prototype),
            r.prototype.check = function () {
                var t = this.getIsImageComplete();
                return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                    this.proxyImage.addEventListener("load", this),
                    this.proxyImage.addEventListener("error", this),
                    this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    void (this.proxyImage.src = this.img.src))
            }
            ,
            r.prototype.getIsImageComplete = function () {
                return this.img.complete && void 0 !== this.img.naturalWidth
            }
            ,
            r.prototype.confirm = function (t, e) {
                this.isLoaded = t,
                    this.emitEvent("progress", [this, this.img, e])
            }
            ,
            r.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }
            ,
            r.prototype.onload = function () {
                this.confirm(!0, "onload"),
                    this.unbindEvents()
            }
            ,
            r.prototype.onerror = function () {
                this.confirm(!1, "onerror"),
                    this.unbindEvents()
            }
            ,
            r.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
            }
            ,
            s.prototype = Object.create(r.prototype),
            s.prototype.check = function () {
                this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    this.img.src = this.url;
                var t = this.getIsImageComplete();
                t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents())
            }
            ,
            s.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
            }
            ,
            s.prototype.confirm = function (t, e) {
                this.isLoaded = t,
                    this.emitEvent("progress", [this, this.element, e])
            }
            ,
            o.makeJQueryPlugin = function (e) {
                e = e || t.jQuery,
                    e && (h = e,
                        h.fn.imagesLoaded = function (t, e) {
                            var i = new o(this, t, e);
                            return i.jqDeferred.promise(h(this))
                        }
                    )
            }
            ,
            o.makeJQueryPlugin(),
            o
    });
/* Carousel */
!function (t, e, i, s) {
    function n(e, i) {
        this.settings = null,
            this.options = t.extend({}, n.Defaults, i),
            this.$element = t(e),
            this.drag = t.extend({}, p),
            this.state = t.extend({}, u),
            this.e = t.extend({}, g),
            this._plugins = {},
            this._supress = {},
            this._current = null,
            this._speed = null,
            this._coordinates = [],
            this._breakpoint = null,
            this._width = null,
            this._items = [],
            this._clones = [],
            this._mergers = [],
            this._invalidated = {},
            this._pipe = [],
            t.each(n.Plugins, t.proxy(function (t, e) {
                this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
            }, this)),
            t.each(n.Pipe, t.proxy(function (e, i) {
                this._pipe.push({
                    filter: i.filter,
                    run: t.proxy(i.run, this)
                })
            }, this)),
            this.setup(),
            this.initialize()
    }
    function o(t) {
        if (t.touches !== s)
            return {
                x: t.touches[0].pageX,
                y: t.touches[0].pageY
            };
        if (t.touches === s) {
            if (t.pageX !== s)
                return {
                    x: t.pageX,
                    y: t.pageY
                };
            if (t.pageX === s)
                return {
                    x: t.clientX,
                    y: t.clientY
                }
        }
    }
    function r(t) {
        var e, s, n = i.createElement("div"), o = t;
        for (e in o)
            if (s = o[e],
                "undefined" != typeof n.style[s])
                return n = null,
                    [s, e];
        return [!1]
    }
    function a() {
        return r(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }
    function h() {
        return r(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }
    function l() {
        return r(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }
    function c() {
        return "ontouchstart" in e || !!navigator.msMaxTouchPoints
    }
    function d() {
        return e.navigator.msPointerEnabled
    }
    var p, u, g;
    p = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    },
        u = {
            isTouch: !1,
            isScrolling: !1,
            isSwiping: !1,
            direction: !1,
            inMotion: !1
        },
        g = {
            _onDragStart: null,
            _onDragMove: null,
            _onDragEnd: null,
            _transitionEnd: null,
            _resizer: null,
            _responsiveCall: null,
            _goToLoop: null,
            _checkVisibile: null
        },
        n.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            responsiveClass: !1,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            themeClass: "owl-theme",
            baseClass: "owl-carousel",
            itemClass: "owl-item",
            centerClass: "center",
            activeClass: "active"
        },
        n.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        },
        n.Plugins = {},
        n.Pipe = [{
            filter: ["width", "items", "settings"],
            run: function (t) {
                t.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function () {
                var t = this._clones
                    , e = this.$stage.children(".cloned");
                (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(),
                    this._clones = [])
            }
        }, {
            filter: ["items", "settings"],
            run: function () {
                var t, e, i = this._clones, s = this._items, n = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
                for (t = 0,
                    e = Math.abs(n / 2); e > t; t++)
                    n > 0 ? (this.$stage.children().eq(s.length + i.length - 1).remove(),
                        i.pop(),
                        this.$stage.children().eq(0).remove(),
                        i.pop()) : (i.push(i.length / 2),
                            this.$stage.append(s[i[i.length - 1]].clone().addClass("cloned")),
                            i.push(s.length - 1 - (i.length - 1) / 2),
                            this.$stage.prepend(s[i[i.length - 1]].clone().addClass("cloned")))
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function () {
                var t, e, i, s = this.settings.rtl ? 1 : -1, n = (this.width() / this.settings.items).toFixed(3), o = 0;
                for (this._coordinates = [],
                    e = 0,
                    i = this._clones.length + this._items.length; i > e; e++)
                    t = this._mergers[this.relative(e)],
                        t = this.settings.mergeFit && Math.min(t, this.settings.items) || t,
                        o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : n * t) * s,
                        this._coordinates.push(o)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function () {
                var e, i, s = (this.width() / this.settings.items).toFixed(3), n = {
                    width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                    "padding-left": this.settings.stagePadding || "",
                    "padding-right": this.settings.stagePadding || ""
                };
                if (this.$stage.css(n),
                    n = {
                        width: this.settings.autoWidth ? "auto" : s - this.settings.margin
                    },
                    n[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin,
                    !this.settings.autoWidth && t.grep(this._mergers, function (t) {
                        return t > 1
                    }).length > 0)
                    for (e = 0,
                        i = this._coordinates.length; i > e; e++)
                        n.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin,
                            this.$stage.children().eq(e).css(n);
                else
                    this.$stage.children().css(n)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function (t) {
                t.current && this.reset(this.$stage.children().index(t.current))
            }
        }, {
            filter: ["position"],
            run: function () {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function () {
                var t, e, i, s, n = this.settings.rtl ? 1 : -1, o = 2 * this.settings.stagePadding, r = this.coordinates(this.current()) + o, a = r + this.width() * n, h = [];
                for (i = 0,
                    s = this._coordinates.length; s > i; i++)
                    t = this._coordinates[i - 1] || 0,
                        e = Math.abs(this._coordinates[i]) + o * n,
                        (this.op(t, "<=", r) && this.op(t, ">", a) || this.op(e, "<", r) && this.op(e, ">", a)) && h.push(i);
                this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass),
                    this.$stage.children(":eq(" + h.join("), :eq(") + ")").addClass(this.settings.activeClass),
                    this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass),
                        this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
            }
        }],
        n.prototype.initialize = function () {
            if (this.trigger("initialize"),
                this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl),
                this.browserSupport(),
                this.settings.autoWidth && this.state.imagesLoaded !== !0) {
                var e, i, n;
                if (e = this.$element.find("img"),
                    i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : s,
                    n = this.$element.children(i).width(),
                    e.length && 0 >= n)
                    return this.preloadAutoWidthImages(e),
                        !1
            }
            this.$element.addClass("owl-loading"),
                this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),
                this.$element.append(this.$stage.parent()),
                this.replace(this.$element.children().not(this.$stage.parent())),
                this._width = this.$element.width(),
                this.refresh(),
                this.$element.removeClass("owl-loading").addClass("owl-loaded"),
                this.eventsCall(),
                this.internalEvents(),
                this.addTriggerableEvents(),
                this.trigger("initialized")
        }
        ,
        n.prototype.setup = function () {
            var e = this.viewport()
                , i = this.options.responsive
                , s = -1
                , n = null;
            i ? (t.each(i, function (t) {
                e >= t && t > s && (s = Number(t))
            }),
                n = t.extend({}, this.options, i[s]),
                delete n.responsive,
                n.responsiveClass && this.$element.attr("class", function (t, e) {
                    return e.replace(/\b owl-responsive-\S+/g, "")
                }).addClass("owl-responsive-" + s)) : n = t.extend({}, this.options),
                null !== this.settings && this._breakpoint === s || (this.trigger("change", {
                    property: {
                        name: "settings",
                        value: n
                    }
                }),
                    this._breakpoint = s,
                    this.settings = n,
                    this.invalidate("settings"),
                    this.trigger("changed", {
                        property: {
                            name: "settings",
                            value: this.settings
                        }
                    }))
        }
        ,
        n.prototype.optionsLogic = function () {
            this.$element.toggleClass("owl-center", this.settings.center),
                this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1),
                this.settings.autoWidth && (this.settings.stagePadding = !1,
                    this.settings.merge = !1)
        }
        ,
        n.prototype.prepare = function (e) {
            var i = this.trigger("prepare", {
                content: e
            });
            return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)),
                this.trigger("prepared", {
                    content: i.data
                }),
                i.data
        }
        ,
        n.prototype.update = function () {
            for (var e = 0, i = this._pipe.length, s = t.proxy(function (t) {
                return this[t]
            }, this._invalidated), n = {}; i > e;)
                (this._invalidated.all || t.grep(this._pipe[e].filter, s).length > 0) && this._pipe[e].run(n),
                    e++;
            this._invalidated = {}
        }
        ,
        n.prototype.width = function (t) {
            switch (t = t || n.Width.Default) {
                case n.Width.Inner:
                case n.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }
        ,
        n.prototype.refresh = function () {
            if (0 === this._items.length)
                return !1;
            (new Date).getTime();
            this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$stage.addClass("owl-refresh"),
                this.update(),
                this.$stage.removeClass("owl-refresh"),
                this.state.orientation = e.orientation,
                this.watchVisibility(),
                this.trigger("refreshed")
        }
        ,
        n.prototype.eventsCall = function () {
            this.e._onDragStart = t.proxy(function (t) {
                this.onDragStart(t)
            }, this),
                this.e._onDragMove = t.proxy(function (t) {
                    this.onDragMove(t)
                }, this),
                this.e._onDragEnd = t.proxy(function (t) {
                    this.onDragEnd(t)
                }, this),
                this.e._onResize = t.proxy(function (t) {
                    this.onResize(t)
                }, this),
                this.e._transitionEnd = t.proxy(function (t) {
                    this.transitionEnd(t)
                }, this),
                this.e._preventClick = t.proxy(function (t) {
                    this.preventClick(t)
                }, this)
        }
        ,
        n.prototype.onThrottledResize = function () {
            e.clearTimeout(this.resizeTimer),
                this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
        }
        ,
        n.prototype.onResize = function () {
            return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(),
                this.invalidate("width"),
                this.refresh(),
                void this.trigger("resized")) : !1
        }
        ,
        n.prototype.eventsRouter = function (t) {
            var e = t.type;
            "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
        }
        ,
        n.prototype.internalEvents = function () {
            var i = (c(),
                d());
            this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function (t) {
                this.eventsRouter(t)
            }, this)),
                this.$stage.on("dragstart", function () {
                    return !1
                }),
                this.$stage.get(0).onselectstart = function () {
                    return !1
                }
            ) : this.$element.addClass("owl-text-select-on"),
                this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function (t) {
                    this.eventsRouter(t)
                }, this)),
                this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1),
                this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
        }
        ,
        n.prototype.onDragStart = function (s) {
            var n, r, a, h;
            if (n = s.originalEvent || s || e.event,
                3 === n.which || this.state.isTouch)
                return !1;
            if ("mousedown" === n.type && this.$stage.addClass("owl-grab"),
                this.trigger("drag"),
                this.drag.startTime = (new Date).getTime(),
                this.speed(0),
                this.state.isTouch = !0,
                this.state.isScrolling = !1,
                this.state.isSwiping = !1,
                this.drag.distance = 0,
                r = o(n).x,
                a = o(n).y,
                this.drag.offsetX = this.$stage.position().left,
                this.drag.offsetY = this.$stage.position().top,
                this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin),
                this.state.inMotion && this.support3d)
                h = this.getTransformProperty(),
                    this.drag.offsetX = h,
                    this.animate(h),
                    this.state.inMotion = !0;
            else if (this.state.inMotion && !this.support3d)
                return this.state.inMotion = !1,
                    !1;
            this.drag.startX = r - this.drag.offsetX,
                this.drag.startY = a - this.drag.offsetY,
                this.drag.start = r - this.drag.startX,
                this.drag.targetEl = n.target || n.srcElement,
                this.drag.updatedX = this.drag.start,
                "IMG" !== this.drag.targetEl.tagName && "A" !== this.drag.targetEl.tagName || (this.drag.targetEl.draggable = !1),
                t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function (t) {
                    this.eventsRouter(t)
                }, this))
        }
        ,
        n.prototype.onDragMove = function (t) {
            var i, n, r, a, h, l;
            this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event,
                n = o(i).x,
                r = o(i).y,
                this.drag.currentX = n - this.drag.startX,
                this.drag.currentY = r - this.drag.startY,
                this.drag.distance = this.drag.currentX - this.drag.offsetX,
                this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"),
                this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (a = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
                    h = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
                    l = this.settings.pullDrag ? this.drag.distance / 5 : 0,
                    this.drag.currentX = Math.max(Math.min(this.drag.currentX, a + l), h + l)),
                (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== s ? i.preventDefault() : i.returnValue = !1,
                    this.state.isSwiping = !0),
                this.drag.updatedX = this.drag.currentX,
                (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0,
                    this.drag.updatedX = this.drag.start),
                this.animate(this.drag.updatedX)))
        }
        ,
        n.prototype.onDragEnd = function (e) {
            var s, n, o;
            if (this.state.isTouch) {
                if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"),
                    this.trigger("dragged"),
                    this.drag.targetEl.removeAttribute("draggable"),
                    this.state.isTouch = !1,
                    this.state.isScrolling = !1,
                    this.state.isSwiping = !1,
                    0 === this.drag.distance && this.state.inMotion !== !0)
                    return this.state.inMotion = !1,
                        !1;
                this.drag.endTime = (new Date).getTime(),
                    s = this.drag.endTime - this.drag.startTime,
                    n = Math.abs(this.drag.distance),
                    (n > 3 || s > 300) && this.removeClick(this.drag.targetEl),
                    o = this.closest(this.drag.updatedX),
                    this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
                    this.current(o),
                    this.invalidate("position"),
                    this.update(),
                    this.settings.pullDrag || this.drag.updatedX !== this.coordinates(o) || this.transitionEnd(),
                    this.drag.distance = 0,
                    t(i).off(".owl.dragEvents")
            }
        }
        ,
        n.prototype.removeClick = function (i) {
            this.drag.targetEl = i,
                t(i).on("click.preventClick", this.e._preventClick),
                e.setTimeout(function () {
                    t(i).off("click.preventClick")
                }, 300)
        }
        ,
        n.prototype.preventClick = function (e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                e.stopPropagation && e.stopPropagation(),
                t(e.target).off("click.preventClick")
        }
        ,
        n.prototype.getTransformProperty = function () {
            var t, i;
            return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"),
                t = t.replace(/matrix(3d)?\(|\)/g, "").split(","),
                i = 16 === t.length,
                i !== !0 ? t[4] : t[12]
        }
        ,
        n.prototype.closest = function (e) {
            var i = -1
                , s = 30
                , n = this.width()
                , o = this.coordinates();
            return this.settings.freeDrag || t.each(o, t.proxy(function (t, r) {
                return e > r - s && r + s > e ? i = t : this.op(e, "<", r) && this.op(e, ">", o[t + 1] || r - n) && (i = "left" === this.state.direction ? t + 1 : t),
                    -1 === i
            }, this)),
                this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (i = e = this.maximum())),
                i
        }
        ,
        n.prototype.animate = function (e) {
            this.trigger("translate"),
                this.state.inMotion = this.speed() > 0,
                this.support3d ? this.$stage.css({
                    transform: "translate3d(" + e + "px,0px, 0px)",
                    transition: this.speed() / 1e3 + "s"
                }) : this.state.isTouch ? this.$stage.css({
                    left: e + "px"
                }) : this.$stage.animate({
                    left: e
                }, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function () {
                    this.state.inMotion && this.transitionEnd()
                }, this))
        }
        ,
        n.prototype.current = function (t) {
            if (t === s)
                return this._current;
            if (0 === this._items.length)
                return s;
            if (t = this.normalize(t),
                this._current !== t) {
                var e = this.trigger("change", {
                    property: {
                        name: "position",
                        value: t
                    }
                });
                e.data !== s && (t = this.normalize(e.data)),
                    this._current = t,
                    this.invalidate("position"),
                    this.trigger("changed", {
                        property: {
                            name: "position",
                            value: this._current
                        }
                    })
            }
            return this._current
        }
        ,
        n.prototype.invalidate = function (t) {
            this._invalidated[t] = !0
        }
        ,
        n.prototype.reset = function (t) {
            t = this.normalize(t),
                t !== s && (this._speed = 0,
                    this._current = t,
                    this.suppress(["translate", "translated"]),
                    this.animate(this.coordinates(t)),
                    this.release(["translate", "translated"]))
        }
        ,
        n.prototype.normalize = function (e, i) {
            var n = i ? this._items.length : this._items.length + this._clones.length;
            return !t.isNumeric(e) || 1 > n ? s : e = this._clones.length ? (e % n + n) % n : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
        }
        ,
        n.prototype.relative = function (t) {
            return t = this.normalize(t),
                t -= this._clones.length / 2,
                this.normalize(t, !0)
        }
        ,
        n.prototype.maximum = function (t) {
            var e, i, s, n = 0, o = this.settings;
            if (t)
                return this._items.length - 1;
            if (!o.loop && o.center)
                e = this._items.length - 1;
            else if (o.loop || o.center)
                if (o.loop || o.center)
                    e = this._items.length + o.items;
                else {
                    if (!o.autoWidth && !o.merge)
                        throw "Can not detect maximum absolute position.";
                    for (revert = o.rtl ? 1 : -1,
                        i = this.$stage.width() - this.$element.width(); (s = this.coordinates(n)) && !(s * revert >= i);)
                        e = ++n
                }
            else
                e = this._items.length - o.items;
            return e
        }
        ,
        n.prototype.minimum = function (t) {
            return t ? 0 : this._clones.length / 2
        }
        ,
        n.prototype.items = function (t) {
            return t === s ? this._items.slice() : (t = this.normalize(t, !0),
                this._items[t])
        }
        ,
        n.prototype.mergers = function (t) {
            return t === s ? this._mergers.slice() : (t = this.normalize(t, !0),
                this._mergers[t])
        }
        ,
        n.prototype.clones = function (e) {
            var i = this._clones.length / 2
                , n = i + this._items.length
                , o = function (t) {
                    return t % 2 === 0 ? n + t / 2 : i - (t + 1) / 2
                };
            return e === s ? t.map(this._clones, function (t, e) {
                return o(e)
            }) : t.map(this._clones, function (t, i) {
                return t === e ? o(i) : null
            })
        }
        ,
        n.prototype.speed = function (t) {
            return t !== s && (this._speed = t),
                this._speed
        }
        ,
        n.prototype.coordinates = function (e) {
            var i = null;
            return e === s ? t.map(this._coordinates, t.proxy(function (t, e) {
                return this.coordinates(e)
            }, this)) : (this.settings.center ? (i = this._coordinates[e],
                i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0,
                i)
        }
        ,
        n.prototype.duration = function (t, e, i) {
            return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
        }
        ,
        n.prototype.to = function (i, s) {
            if (this.settings.loop) {
                var n = i - this.relative(this.current())
                    , o = this.current()
                    , r = this.current()
                    , a = this.current() + n
                    , h = 0 > r - a
                    , l = this._clones.length + this._items.length;
                a < this.settings.items && h === !1 ? (o = r + this._items.length,
                    this.reset(o)) : a >= l - this.settings.items && h === !0 && (o = r - this._items.length,
                        this.reset(o)),
                    e.clearTimeout(this.e._goToLoop),
                    this.e._goToLoop = e.setTimeout(t.proxy(function () {
                        this.speed(this.duration(this.current(), o + n, s)),
                            this.current(o + n),
                            this.update()
                    }, this), 30)
            } else
                this.speed(this.duration(this.current(), i, s)),
                    this.current(i),
                    this.update()
        }
        ,
        n.prototype.next = function (t) {
            t = t || !1,
                this.to(this.relative(this.current()) + 1, t)
        }
        ,
        n.prototype.prev = function (t) {
            t = t || !1,
                this.to(this.relative(this.current()) - 1, t)
        }
        ,
        n.prototype.transitionEnd = function (t) {
            return t !== s && (t.stopPropagation(),
                (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1,
                    void this.trigger("translated"))
        }
        ,
        n.prototype.viewport = function () {
            var s;
            if (this.options.responsiveBaseElement !== e)
                s = t(this.options.responsiveBaseElement).width();
            else if (e.innerWidth)
                s = e.innerWidth;
            else {
                if (!i.documentElement || !i.documentElement.clientWidth)
                    throw "Can not detect viewport width.";
                s = i.documentElement.clientWidth
            }
            return s
        }
        ,
        n.prototype.replace = function (e) {
            this.$stage.empty(),
                this._items = [],
                e && (e = e instanceof jQuery ? e : t(e)),
                this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)),
                e.filter(function () {
                    return 1 === this.nodeType
                }).each(t.proxy(function (t, e) {
                    e = this.prepare(e),
                        this.$stage.append(e),
                        this._items.push(e),
                        this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
                }, this)),
                this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0),
                this.invalidate("items")
        }
        ,
        n.prototype.add = function (t, e) {
            e = e === s ? this._items.length : this.normalize(e, !0),
                this.trigger("add", {
                    content: t,
                    position: e
                }),
                0 === this._items.length || e === this._items.length ? (this.$stage.append(t),
                    this._items.push(t),
                    this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t),
                        this._items.splice(e, 0, t),
                        this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)),
                this.invalidate("items"),
                this.trigger("added", {
                    content: t,
                    position: e
                })
        }
        ,
        n.prototype.remove = function (t) {
            t = this.normalize(t, !0),
                t !== s && (this.trigger("remove", {
                    content: this._items[t],
                    position: t
                }),
                    this._items[t].remove(),
                    this._items.splice(t, 1),
                    this._mergers.splice(t, 1),
                    this.invalidate("items"),
                    this.trigger("removed", {
                        content: null,
                        position: t
                    }))
        }
        ,
        n.prototype.addTriggerableEvents = function () {
            var e = t.proxy(function (e, i) {
                return t.proxy(function (t) {
                    t.relatedTarget !== this && (this.suppress([i]),
                        e.apply(this, [].slice.call(arguments, 1)),
                        this.release([i]))
                }, this)
            }, this);
            t.each({
                next: this.next,
                prev: this.prev,
                to: this.to,
                destroy: this.destroy,
                refresh: this.refresh,
                replace: this.replace,
                add: this.add,
                remove: this.remove
            }, t.proxy(function (t, i) {
                this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
            }, this))
        }
        ,
        n.prototype.watchVisibility = function () {
            function i(t) {
                return t.offsetWidth > 0 && t.offsetHeight > 0
            }
            function s() {
                i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"),
                    this.refresh(),
                    e.clearInterval(this.e._checkVisibile))
            }
            i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"),
                e.clearInterval(this.e._checkVisibile),
                this.e._checkVisibile = e.setInterval(t.proxy(s, this), 500))
        }
        ,
        n.prototype.preloadAutoWidthImages = function (e) {
            var i, s, n, o;
            i = 0,
                s = this,
                e.each(function (r, a) {
                    n = t(a),
                        o = new Image,
                        o.onload = function () {
                            i++,
                                n.attr("src", o.src),
                                n.css("opacity", 1),
                                i >= e.length && (s.state.imagesLoaded = !0,
                                    s.initialize())
                        }
                        ,
                        o.src = n.attr("src") || n.attr("data-src") || n.attr("data-src-retina")
                })
        }
        ,
        n.prototype.destroy = function () {
            this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass),
                this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"),
                this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
            for (var s in this._plugins)
                this._plugins[s].destroy();
            (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"),
                t(i).off(".owl.dragEvents"),
                this.$stage.get(0).onselectstart = function () { }
                ,
                this.$stage.off("dragstart", function () {
                    return !1
                })),
                this.$element.off(".owl"),
                this.$stage.children(".cloned").remove(),
                this.e = null,
                this.$element.removeData("owlCarousel"),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.unwrap()
        }
        ,
        n.prototype.op = function (t, e, i) {
            var s = this.settings.rtl;
            switch (e) {
                case "<":
                    return s ? t > i : i > t;
                case ">":
                    return s ? i > t : t > i;
                case ">=":
                    return s ? i >= t : t >= i;
                case "<=":
                    return s ? t >= i : i >= t
            }
        }
        ,
        n.prototype.on = function (t, e, i, s) {
            t.addEventListener ? t.addEventListener(e, i, s) : t.attachEvent && t.attachEvent("on" + e, i)
        }
        ,
        n.prototype.off = function (t, e, i, s) {
            t.removeEventListener ? t.removeEventListener(e, i, s) : t.detachEvent && t.detachEvent("on" + e, i)
        }
        ,
        n.prototype.trigger = function (e, i, s) {
            var n = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            }
                , o = t.camelCase(t.grep(["on", e, s], function (t) {
                    return t
                }).join("-").toLowerCase())
                , r = t.Event([e, "owl", s || "carousel"].join(".").toLowerCase(), t.extend({
                    relatedTarget: this
                }, n, i));
            return this._supress[e] || (t.each(this._plugins, function (t, e) {
                e.onTrigger && e.onTrigger(r)
            }),
                this.$element.trigger(r),
                this.settings && "function" == typeof this.settings[o] && this.settings[o].apply(this, r)),
                r
        }
        ,
        n.prototype.suppress = function (e) {
            t.each(e, t.proxy(function (t, e) {
                this._supress[e] = !0
            }, this))
        }
        ,
        n.prototype.release = function (e) {
            t.each(e, t.proxy(function (t, e) {
                delete this._supress[e]
            }, this))
        }
        ,
        n.prototype.browserSupport = function () {
            if (this.support3d = l(),
                this.support3d) {
                this.transformVendor = h();
                var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
                this.transitionEndVendor = t[a()],
                    this.vendorName = this.transformVendor.replace(/Transform/i, ""),
                    this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
            }
            this.state.orientation = e.orientation
        }
        ,
        t.fn.owlCarousel = function (e) {
            return this.each(function () {
                t(this).data("owlCarousel") || t(this).data("owlCarousel", new n(this, e))
            })
        }
        ,
        t.fn.owlCarousel.Constructor = n
}(window.Zepto || window.jQuery, window, document),
    function (t, e) {
        var i = function (e) {
            this._core = e,
                this._loaded = [],
                this._handlers = {
                    "initialized.owl.carousel change.owl.carousel": t.proxy(function (e) {
                        if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type))
                            for (var i = this._core.settings, s = i.center && Math.ceil(i.items / 2) || i.items, n = i.center && -1 * s || 0, o = (e.property && e.property.value || this._core.current()) + n, r = this._core.clones().length, a = t.proxy(function (t, e) {
                                this.load(e)
                            }, this); n++ < s;)
                                this.load(r / 2 + this._core.relative(o)),
                                    r && t.each(this._core.clones(this._core.relative(o++)), a)
                    }, this)
                },
                this._core.options = t.extend({}, i.Defaults, this._core.options),
                this._core.$element.on(this._handlers)
        };
        i.Defaults = {
            lazyLoad: !1
        },
            i.prototype.load = function (i) {
                var s = this._core.$stage.children().eq(i)
                    , n = s && s.find(".owl-lazy");
                !n || t.inArray(s.get(0), this._loaded) > -1 || (n.each(t.proxy(function (i, s) {
                    var n, o = t(s), r = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
                    this._core.trigger("load", {
                        element: o,
                        url: r
                    }, "lazy"),
                        o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
                            o.css("opacity", 1),
                                this._core.trigger("loaded", {
                                    element: o,
                                    url: r
                                }, "lazy")
                        }, this)).attr("src", r) : (n = new Image,
                            n.onload = t.proxy(function () {
                                o.css({
                                    "background-image": "url(" + r + ")",
                                    opacity: "1"
                                }),
                                    this._core.trigger("loaded", {
                                        element: o,
                                        url: r
                                    }, "lazy")
                            }, this),
                            n.src = r)
                }, this)),
                    this._loaded.push(s.get(0)))
            }
            ,
            i.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers)
                    this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null)
            }
            ,
            t.fn.owlCarousel.Constructor.Plugins.Lazy = i
    }(window.Zepto || window.jQuery, window, document),
    function (t) {
        var e = function (i) {
            this._core = i,
                this._handlers = {
                    "initialized.owl.carousel": t.proxy(function () {
                        this._core.settings.autoHeight && this.update()
                    }, this),
                    "changed.owl.carousel": t.proxy(function (t) {
                        this._core.settings.autoHeight && "position" == t.property.name && this.update()
                    }, this),
                    "loaded.owl.lazy": t.proxy(function (t) {
                        this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
                    }, this)
                },
                this._core.options = t.extend({}, e.Defaults, this._core.options),
                this._core.$element.on(this._handlers)
        };
        e.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        },
            e.prototype.update = function () {
                this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
            }
            ,
            e.prototype.destroy = function () {
                var t, e;
                for (t in this._handlers)
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null)
            }
            ,
            t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i) {
        var s = function (e) {
            this._core = e,
                this._videos = {},
                this._playing = null,
                this._fullscreen = !1,
                this._handlers = {
                    "resize.owl.carousel": t.proxy(function (t) {
                        this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
                    }, this),
                    "refresh.owl.carousel changed.owl.carousel": t.proxy(function () {
                        this._playing && this.stop()
                    }, this),
                    "prepared.owl.carousel": t.proxy(function (e) {
                        var i = t(e.content).find(".owl-video");
                        i.length && (i.css("display", "none"),
                            this.fetch(i, t(e.content)))
                    }, this)
                },
                this._core.options = t.extend({}, s.Defaults, this._core.options),
                this._core.$element.on(this._handlers),
                this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
                    this.play(t)
                }, this))
        };
        s.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        },
            s.prototype.fetch = function (t, e) {
                var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube"
                    , s = t.attr("data-vimeo-id") || t.attr("data-youtube-id")
                    , n = t.attr("data-width") || this._core.settings.videoWidth
                    , o = t.attr("data-height") || this._core.settings.videoHeight
                    , r = t.attr("href");
                if (!r)
                    throw new Error("Missing video URL.");
                if (s = r.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),
                    s[3].indexOf("youtu") > -1)
                    i = "youtube";
                else {
                    if (!(s[3].indexOf("vimeo") > -1))
                        throw new Error("Video URL not supported.");
                    i = "vimeo"
                }
                s = s[6],
                    this._videos[r] = {
                        type: i,
                        id: s,
                        width: n,
                        height: o
                    },
                    e.attr("data-video", r),
                    this.thumbnail(t, this._videos[r])
            }
            ,
            s.prototype.thumbnail = function (e, i) {
                var s, n, o, r = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "", a = e.find("img"), h = "src", l = "", c = this._core.settings, d = function (t) {
                    n = '<div class="owl-video-play-icon"></div>',
                        s = c.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + h + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>',
                        e.after(s),
                        e.after(n)
                };
                return e.wrap('<div class="owl-video-wrapper"' + r + "></div>"),
                    this._core.settings.lazyLoad && (h = "data-src",
                        l = "owl-lazy"),
                    a.length ? (d(a.attr(h)),
                        a.remove(),
                        !1) : void ("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg",
                            d(o)) : "vimeo" === i.type && t.ajax({
                                type: "GET",
                                url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
                                jsonp: "callback",
                                dataType: "jsonp",
                                success: function (t) {
                                    o = t[0].thumbnail_large,
                                        d(o)
                                }
                            }))
            }
            ,
            s.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    this._playing = null
            }
            ,
            s.prototype.play = function (e) {
                this._core.trigger("play", null, "video"),
                    this._playing && this.stop();
                var i, s, n = t(e.target || e.srcElement), o = n.closest("." + this._core.settings.itemClass), r = this._videos[o.attr("data-video")], a = r.width || "100%", h = r.height || this._core.$stage.height();
                "youtube" === r.type ? i = '<iframe width="' + a + '" height="' + h + '" src="http://www.youtube.com/embed/' + r.id + "?autoplay=1&v=" + r.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === r.type && (i = '<iframe src="http://player.vimeo.com/video/' + r.id + '?autoplay=1" width="' + a + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
                    o.addClass("owl-video-playing"),
                    this._playing = o,
                    s = t('<div style="height:' + h + "px; width:" + a + 'px" class="owl-video-frame">' + i + "</div>"),
                    n.after(s)
            }
            ,
            s.prototype.isInFullScreen = function () {
                var s = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
                return s && t(s).parent().hasClass("owl-video-frame") && (this._core.speed(0),
                    this._fullscreen = !0),
                    s && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1,
                        !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation,
                            !1) : !0
            }
            ,
            s.prototype.destroy = function () {
                var t, e;
                this._core.$element.off("click.owl.video");
                for (t in this._handlers)
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null)
            }
            ,
            t.fn.owlCarousel.Constructor.Plugins.Video = s
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i, s) {
        var n = function (e) {
            this.core = e,
                this.core.options = t.extend({}, n.Defaults, this.core.options),
                this.swapping = !0,
                this.previous = s,
                this.next = s,
                this.handlers = {
                    "change.owl.carousel": t.proxy(function (t) {
                        "position" == t.property.name && (this.previous = this.core.current(),
                            this.next = t.property.value)
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                        this.swapping = "translated" == t.type
                    }, this),
                    "translate.owl.carousel": t.proxy(function () {
                        this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                    }, this)
                },
                this.core.$element.on(this.handlers)
        };
        n.Defaults = {
            animateOut: !1,
            animateIn: !1
        },
            n.prototype.swap = function () {
                if (1 === this.core.settings.items && this.core.support3d) {
                    this.core.speed(0);
                    var e, i = t.proxy(this.clear, this), s = this.core.$stage.children().eq(this.previous), n = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn, r = this.core.settings.animateOut;
                    this.core.current() !== this.previous && (r && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
                        s.css({
                            left: e + "px"
                        }).addClass("animated owl-animated-out").addClass(r).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)),
                        o && n.addClass("animated owl-animated-in").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
                }
            }
            ,
            n.prototype.clear = function (e) {
                t(e.target).css({
                    left: ""
                }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),
                    this.core.transitionEnd()
            }
            ,
            n.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers)
                    this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    "function" != typeof this[e] && (this[e] = null)
            }
            ,
            t.fn.owlCarousel.Constructor.Plugins.Animate = n
    }(window.Zepto || window.jQuery, window, document),
    function (t, e, i) {
        var s = function (e) {
            this.core = e,
                this.core.options = t.extend({}, s.Defaults, this.core.options),
                this.handlers = {
                    "translated.owl.carousel refreshed.owl.carousel": t.proxy(function () {
                        this.autoplay()
                    }, this),
                    "play.owl.autoplay": t.proxy(function (t, e, i) {
                        this.play(e, i)
                    }, this),
                    "stop.owl.autoplay": t.proxy(function () {
                        this.stop()
                    }, this),
                    "mouseover.owl.autoplay": t.proxy(function () {
                        this.core.settings.autoplayHoverPause && this.pause()
                    }, this),
                    "mouseleave.owl.autoplay": t.proxy(function () {
                        this.core.settings.autoplayHoverPause && this.autoplay()
                    }, this)
                },
                this.core.$element.on(this.handlers)
        };
        s.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        },
            s.prototype.autoplay = function () {
                this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval),
                    this.interval = e.setInterval(t.proxy(function () {
                        this.play()
                    }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
            }
            ,
            s.prototype.play = function () {
                return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
            }
            ,
            s.prototype.stop = function () {
                e.clearInterval(this.interval)
            }
            ,
            s.prototype.pause = function () {
                e.clearInterval(this.interval)
            }
            ,
            s.prototype.destroy = function () {
                var t, i;
                e.clearInterval(this.interval);
                for (t in this.handlers)
                    this.core.$element.off(t, this.handlers[t]);
                for (i in Object.getOwnPropertyNames(this))
                    "function" != typeof this[i] && (this[i] = null)
            }
            ,
            t.fn.owlCarousel.Constructor.Plugins.autoplay = s
    }(window.Zepto || window.jQuery, window, document),
    function (t) {
        "use strict";
        var e = function (i) {
            this._core = i,
                this._initialized = !1,
                this._pages = [],
                this._controls = {},
                this._templates = [],
                this.$element = this._core.$element,
                this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to
                },
                this._handlers = {
                    "prepared.owl.carousel": t.proxy(function (e) {
                        this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                    }, this),
                    "add.owl.carousel": t.proxy(function (e) {
                        this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
                    }, this),
                    "remove.owl.carousel prepared.owl.carousel": t.proxy(function (t) {
                        this._core.settings.dotsData && this._templates.splice(t.position, 1)
                    }, this),
                    "change.owl.carousel": t.proxy(function (t) {
                        if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                            var e = this._core.current()
                                , i = this._core.maximum()
                                , s = this._core.minimum();
                            t.data = t.property.value > i ? e >= i ? s : i : t.property.value < s ? i : t.property.value
                        }
                    }, this),
                    "changed.owl.carousel": t.proxy(function (t) {
                        "position" == t.property.name && this.draw()
                    }, this),
                    "refreshed.owl.carousel": t.proxy(function () {
                        this._initialized || (this.initialize(),
                            this._initialized = !0),
                            this._core.trigger("refresh", null, "navigation"),
                            this.update(),
                            this.draw(),
                            this._core.trigger("refreshed", null, "navigation")
                    }, this)
                },
                this._core.options = t.extend({}, e.Defaults, this._core.options),
                this.$element.on(this._handlers)
        };
        e.Defaults = {
            nav: !1,
            navRewind: !0,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
            controlsClass: "owl-controls"
        },
            e.prototype.initialize = function () {
                var e, i, s = this._core.settings;
                s.dotsData || (this._templates = [t("<div>").addClass(s.dotClass).append(t("<span>")).prop("outerHTML")]),
                    s.navContainer && s.dotsContainer || (this._controls.$container = t("<div>").addClass(s.controlsClass).appendTo(this.$element)),
                    this._controls.$indicators = s.dotsContainer ? t(s.dotsContainer) : t("<div>").hide().addClass(s.dotsClass).appendTo(this._controls.$container),
                    this._controls.$indicators.on("click", "div", t.proxy(function (e) {
                        var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
                        e.preventDefault(),
                            this.to(i, s.dotsSpeed)
                    }, this)),
                    e = s.navContainer ? t(s.navContainer) : t("<div>").addClass(s.navContainerClass).prependTo(this._controls.$container),
                    this._controls.$next = t("<" + s.navElement + ">"),
                    this._controls.$previous = this._controls.$next.clone(),
                    this._controls.$previous.addClass(s.navClass[0]).html(s.navText[0]).hide().prependTo(e).on("click", t.proxy(function () {
                        this.prev(s.navSpeed)
                    }, this)),
                    this._controls.$next.addClass(s.navClass[1]).html(s.navText[1]).hide().appendTo(e).on("click", t.proxy(function () {
                        this.next(s.navSpeed)
                    }, this));
                for (i in this._overrides)
                    this._core[i] = t.proxy(this[i], this)
            }
            ,
            e.prototype.destroy = function () {
                var t, e, i, s;
                for (t in this._handlers)
                    this.$element.off(t, this._handlers[t]);
                for (e in this._controls)
                    this._controls[e].remove();
                for (s in this.overides)
                    this._core[s] = this._overrides[s];
                for (i in Object.getOwnPropertyNames(this))
                    "function" != typeof this[i] && (this[i] = null)
            }
            ,
            e.prototype.update = function () {
                var t, e, i, s = this._core.settings, n = this._core.clones().length / 2, o = n + this._core.items().length, r = s.center || s.autoWidth || s.dotData ? 1 : s.dotsEach || s.items;
                if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)),
                    s.dots || "page" == s.slideBy)
                    for (this._pages = [],
                        t = n,
                        e = 0,
                        i = 0; o > t; t++)
                        (e >= r || 0 === e) && (this._pages.push({
                            start: t - n,
                            end: t - n + r - 1
                        }),
                            e = 0,
                            ++i),
                            e += this._core.mergers(this._core.relative(t))
            }
            ,
            e.prototype.draw = function () {
                var e, i, s = "", n = this._core.settings, o = (this._core.$stage.children(),
                    this._core.relative(this._core.current()));
                if (!n.nav || n.loop || n.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= o),
                    this._controls.$next.toggleClass("disabled", o >= this._core.maximum())),
                    this._controls.$previous.toggle(n.nav),
                    this._controls.$next.toggle(n.nav),
                    n.dots) {
                    if (e = this._pages.length - this._controls.$indicators.children().length,
                        n.dotData && 0 !== e) {
                        for (i = 0; i < this._controls.$indicators.children().length; i++)
                            s += this._templates[this._core.relative(i)];
                        this._controls.$indicators.html(s)
                    } else
                        e > 0 ? (s = new Array(e + 1).join(this._templates[0]),
                            this._controls.$indicators.append(s)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
                    this._controls.$indicators.find(".active").removeClass("active"),
                        this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
                }
                this._controls.$indicators.toggle(n.dots)
            }
            ,
            e.prototype.onTrigger = function (e) {
                var i = this._core.settings;
                e.page = {
                    index: t.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
                }
            }
            ,
            e.prototype.current = function () {
                var e = this._core.relative(this._core.current());
                return t.grep(this._pages, function (t) {
                    return t.start <= e && t.end >= e
                }).pop()
            }
            ,
            e.prototype.getPosition = function (e) {
                var i, s, n = this._core.settings;
                return "page" == n.slideBy ? (i = t.inArray(this.current(), this._pages),
                    s = this._pages.length,
                    e ? ++i : --i,
                    i = this._pages[(i % s + s) % s].start) : (i = this._core.relative(this._core.current()),
                        s = this._core.items().length,
                        e ? i += n.slideBy : i -= n.slideBy),
                    i
            }
            ,
            e.prototype.next = function (e) {
                t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
            }
            ,
            e.prototype.prev = function (e) {
                t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
            }
            ,
            e.prototype.to = function (e, i, s) {
                var n;
                s ? t.proxy(this._overrides.to, this._core)(e, i) : (n = this._pages.length,
                    t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i))
            }
            ,
            t.fn.owlCarousel.Constructor.Plugins.Navigation = e
    }(window.Zepto || window.jQuery, window, document);
!function (t, s) {
    "use strict";
    var e = function (n) {
        this._core = n,
            this._hashes = {},
            this.$element = this._core.$element,
            this._handlers = {
                "initialized.owl.carousel": t.proxy(function () {
                    "URLHash" == this._core.settings.startPosition && t(s).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": t.proxy(function (s) {
                    var e = t(s.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                    this._hashes[e] = s.content
                }, this)
            },
            this._core.options = t.extend({}, e.Defaults, this._core.options),
            this.$element.on(this._handlers),
            t(s).on("hashchange.owl.navigation", t.proxy(function () {
                var t = s.location.hash.substring(1)
                    , e = this._core.$stage.children()
                    , n = this._hashes[t] && e.index(this._hashes[t]) || 0;
                return t ? void this._core.to(n, !1, !0) : !1
            }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    },
        e.prototype.destroy = function () {
            var e, n;
            t(s).off("hashchange.owl.navigation");
            for (e in this._handlers)
                this._core.$element.off(e, this._handlers[e]);
            for (n in Object.getOwnPropertyNames(this))
                "function" != typeof this[n] && (this[n] = null)
        }
        ,
        t.fn.owlCarousel.Constructor.Plugins.Hash = e
}(window.Zepto || window.jQuery, window, document);
/* js_main */
window.debounce = function (e, i, t) {
    var s;
    return function () {
        var l = this
            , a = arguments
            , o = t && !s;
        clearTimeout(s),
            s = setTimeout(function () {
                s = null,
                    t || e.apply(l, a)
            }, i),
            o && e.apply(l, a)
    }
}
    ,
    window.blockStickyHeader = !1,
    function (e) {
        window.CUBER = {
            Nav: {
                $siteHeader: null,
                $siteNav: null,
                $siteOverlay: null,
                mount: function () {
                    this.$siteHeader = e("#site-header"),
                        this.$siteNav = e("#site-nav--mobile"),
                        this.$siteOverlay = e("#site-overlay"),
                        e("#site-menu-handle").on("click focusin", function () {
                            this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"),
                                this.$siteNav.removeClass("show-filters").removeClass("show-cart").removeClass("show-search"),
                                this.$siteOverlay.addClass("active"),
                                e(".main-body").addClass("sidebar-move"))
                        }
                            .bind(this)),
                        e("#site-cart-handle a").on("click", function (i) {
                            i.preventDefault(),
                                getCartModal(),
                                this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"),
                                    this.$siteNav.removeClass("show-filters").removeClass("show-search").addClass("show-cart"),
                                    this.$siteOverlay.addClass("active"),
                                    e(".main-body").addClass("sidebar-move"))
                        }
                            .bind(this)),
                        e("#site-search-handle a").on("click", function (i) {
                            i.preventDefault(),
                                this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"),
                                    this.$siteNav.removeClass("show-filters").removeClass("show-cart").addClass("show-search"),
                                    this.$siteOverlay.addClass("active"),
                                    e(".main-body").addClass("sidebar-move"))
                        }
                            .bind(this)),
                        0 < e("#site-filter-handle").length && e("#site-filter-handle").on("click", function () {
                            this.$siteNav.hasClass("active") || (this.$siteNav.addClass("active"),
                                this.$siteNav.removeClass("show-cart").removeClass("show-search").addClass("show-filters"),
                                this.$siteOverlay.addClass("active"),
                                e(".main-body").addClass("sidebar-move"))
                        }
                            .bind(this)),
                        e(".site-close-handle, #site-overlay").on("click", function () {
                            this.$siteNav.hasClass("active") && (this.$siteNav.removeClass("active"),
                                this.$siteOverlay.removeClass("active"),
                                e(".main-body").removeClass("sidebar-move"))
                        }
                            .bind(this))
                },
                unmount: function () {
                    e("#site-menu-handle").off("click"),
                        e("#site-cart-handle a").off("click"),
                        e("#site-filter-handle").off("click"),
                        this.$siteNav.removeClass("active"),
                        this.$siteOverlay.removeClass("active"),
                        e(".main-body").removeClass("sidebar-move")
                }
            },
            Product: {
                $productGallery: null,
                $productGalleryButton: null,
                $productGalleryItem: null,
                $productGalleryIndex: null,
                $productCarousel: null,
                $productCarouselImgs: null,
                mount: function (i) {
                    var t = {};
                    i.data("po", t),
                        t.$productGallery = i.find(".box__product-gallery"),
                        t.$productGalleryButton = i.find(".box__product-gallery .product-image__button"),
                        t.$productGalleryItem = i.find(".box__product-gallery .gallery-item"),
                        t.$productGalleryButton.append('<div class="gallery-index icon-pr-fix"><span class="current">' + (null != window.CuberProductImageIndex ? window.CuberProductImageIndex + 1 : 1) + '</span> / <span class="total">' + t.$productGalleryItem.length + "</span></div>"),
                        t.$productGalleryIndex = t.$productGallery.find(".gallery-index .current"),
                        t.$productCarousel = t.$productGallery.children(".site-box-content"),
                        t.$productGallery.hasClass("scroll") && e(window).on("scroll.product-gallery", function () {
                            t.$productCarousel.hasClass("flickity-enabled") || t.$productGalleryItem.each(function (i, s) {
                                e(window).scrollTop() + e(window).height() > e(s).offset().top + e(window).height() / 2 && !e(s).hasClass("current") ? (e(s).addClass("current"),
                                    t.$productGalleryIndex.html(e(s).index() + 1),
                                    $(".product-gallery__thumb").removeClass("active"),
                                    $('.product-gallery__thumb img[data-image="' + e(s).find("img").attr("src") + '"]').parents(".product-gallery__thumb").addClass("active")) : e(window).scrollTop() + e(window).height() < e(s).offset().top + e(window).height() / 2 && e(s).hasClass("current") && (e(s).removeClass("current"),
                                        t.$productGalleryIndex.html(e(s).index()),
                                        $(".product-gallery__thumb").removeClass("active"),
                                        $('.product-gallery__thumb img[data-image="' + e(s).find("img").attr("src") + '"]').parents(".product-gallery__thumb").prev().addClass("active"))
                            }
                                .bind(t))
                        }
                            .bind(t)).trigger("scroll.product-gallery"),
                        t.$productCarousel.flickity({
                            cellSelector: ".gallery-item",
                            adaptiveHeight: !0,
                            initialIndex: null != window.CuberProductImageIndex ? window.CuberProductImageIndex : 0,
                            wrapAround: !0,
                            prevNextButtons: !1,
                            pageDots: !0,
                            watchCSS: !!t.$productGallery.hasClass("scroll"),
                            resize: !1
                        })
                },
                unmount: function (i) {
                    i = i.data("po"),
                        e(window).off("scroll.product-gallery"),
                        i.$productCarousel.off("scroll.flickity")
                }
            },
            Main: {
                _mountScrollMovers: function (i) {
                    var t = i.parent
                        , s = !1;
                    setTimeout(function () {
                        i.items.removeClass("out-with-you")
                    }, 1e3),
                        i.items.addClass("icon-pr-fix"),
                        e(window).on("scroll.scroll-movers", function () {
                            !s && e(window).scrollTop() + e(window).height() > t.offset().top + t.height() ? (i.items.addClass("out-with-you"),
                                s = !0) : s && e(window).scrollTop() + e(window).height() <= t.offset().top + t.height() && (s = !1,
                                    i.items.removeClass("out-with-you"))
                        }
                            .bind(this))
                }
            },
            SplitSlider: {
                _mountFlickity: function () {
                    e(".responsive-flickity").flickity({
                        cellSelector: ".slideshow-item",
                        wrapAround: !0,
                        prevNextButtons: !1,
                        pageDots: !1,
                        watchCSS: !0,
                        resize: !0
                    });
                    var i = e(".box__slideshow-split")
                        , t = e(".responsive-flickity").data("flickity");
                    i.find(".slideshow-item"),
                        0 >= i.find(".slider-meta").length && (i.find(".slider-meta").remove(),
                            i.append('<div class="slider-meta hide lap--show"><div class="slider-index"><span class="current">1</span> / <span class="total">' + sliderT + '</span></div><div class="slider-nav"><span class="go-prev">' + e.themeAssets.arrowRight + '</span><span class="go-next">' + e.themeAssets.arrowRight + "</span></div>"),
                            i.find(".go-prev").on("click", function () {
                                t.previous()
                            }
                                .bind(this)),
                            i.find(".go-next").on("click", function () {
                                t.next()
                            }
                                .bind(this)),
                            e(".responsive-flickity").on("select.flickity", function () {
                                i.find(".slider-index .current").html(t.selectedIndex + 1)
                            }),
                            setTimeout(function () {
                                i.find(".slider-meta").addClass("active")
                            }, 1e3))
                },
                mount: function (i) {
                    var t = e(".box__slideshow-split")
                        , s = t.find(".slideshow-item")
                        , l = t.find(".site-box-background-container").children("div")
                        , a = [];
                    currentScroll = e(window).scrollTop(),
                        sliderI = Math.min(Math.ceil(currentScroll / e(window).height()), s.length - 1),
                        sliderJ = sliderI - 1,
                        sliderT = s.length,
                        i && this._mountFlickity(),
                        e(".responsive-flickity").hasClass("flickity-enabled") ? (t.height(e(window).height() - e("#site-header").outerHeight()),
                            t.addClass("remove-min-height")) : (t.css("height", "auto"),
                                t.removeClass("remove-min-height")),
                        l.each(function (t) {
                            0 < t ? t < sliderI ? e(this).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + e(window).height() + "px 0)") : t == sliderI ? e(this).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + Math.ceil(e(window).scrollTop() - e(window).height() * sliderJ) + "px 0)") : e(this).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px 0 0)") : 0 == t & i && (e(this).css({
                                clip: "rect(0 " + Math.ceil(e(window).width() / 2) + "px 0 0)",
                                opacity: 0
                            }),
                                e(this).addClass("clip-transition"),
                                setTimeout(function () {
                                    e(this).css({
                                        clip: "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + e(window).height() + "px 0)",
                                        opacity: 1
                                    })
                                }
                                    .bind(this), 10),
                                setTimeout(function () {
                                    e(this).removeClass("clip-transition")
                                }
                                    .bind(this), 650)),
                                e(this).addClass("active"),
                                0 >= e(this).find(".site-box-black-overlay").length && e(this).append('<span class="site-box-black-overlay" />'),
                                a.push(e(this).find(".site-box-black-overlay"))
                        }),
                        e(window).on("scroll.split-slider", function (i) {
                            if (currentScroll < e(window).scrollTop())
                                0 < s.eq(sliderI + 1).length && e(window).scrollTop() + e(window).height() >= s.eq(sliderI + 1).offset().top ? (0 != sliderI && (l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + e(window).height() + "px 0)"),
                                    a[sliderJ] && a[sliderJ].css("opacity", .5)),
                                    sliderJ = sliderI,
                                    sliderI++,
                                    down = !0) : e(window).scrollTop() + e(window).height() >= t.height() && !t.hasClass("back-to-normal") && (t.addClass("back-to-normal"),
                                        l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + e(window).height() + "px 0)"));
                            else if (0 < s.eq(sliderI).length && 0 < s.eq(sliderI - 1).length && e(window).scrollTop() + e(window).height() < s.eq(sliderI).offset().top) {
                                var o = l.eq(sliderI).hasClass("obs") ? 1 : 0;
                                l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + o + "px 0)"),
                                    a[sliderJ] && a[sliderJ].css("opacity", 0),
                                    sliderI--,
                                    sliderJ = sliderI - 1,
                                    down = !1
                            } else
                                e(window).scrollTop() + e(window).height() <= t.height() && t.hasClass("back-to-normal") && t.removeClass("back-to-normal");
                            t.hasClass("back-to-normal") || (i = Math.ceil(e(window).scrollTop() - e(window).height() * sliderJ),
                                o = l.eq(sliderI).hasClass("obs") ? 1 : 0,
                                l.eq(sliderI).css("clip", "rect(0 " + Math.ceil(e(window).width() / 2) + "px " + Math.max(o, i) + "px 0)"),
                                a[sliderJ] && a[sliderJ].css("opacity", Math.ceil(50 * i / e(window).height()) / 100),
                                o = Math.round(e(window).height() / 6),
                                s.eq(sliderJ).find(".caption").css("transform", "translateY(" + (0 - Math.ceil(1 * i * o / e(window).height())) + "px)"),
                                s.eq(sliderJ).find(".title").css("transform", "translateY(" + (0 - Math.ceil(.75 * i * o / e(window).height())) + "px)"),
                                s.eq(sliderJ).find(".subtitle").css("transform", "translateY(" + (0 - Math.ceil(.5 * i * o / e(window).height())) + "px)"),
                                s.eq(sliderJ).find(".button").css("transform", "translateY(" + (0 - Math.ceil(.25 * i * o / e(window).height())) + "px)"),
                                s.eq(sliderI).find(".caption").css("transform", "translateY(" + (Math.ceil(1 * i * o / e(window).height()) - 1 * o) + "px)"),
                                s.eq(sliderI).find(".title").css("transform", "translateY(" + (Math.ceil(.75 * i * o / e(window).height()) - .75 * o) + "px)"),
                                s.eq(sliderI).find(".subtitle").css("transform", "translateY(" + (Math.ceil(.5 * i * o / e(window).height()) - .5 * o) + "px)"),
                                s.eq(sliderI).find(".button").css("transform", "translateY(" + (Math.ceil(.25 * i * o / e(window).height()) - .25 * o) + "px)")),
                                currentScroll = e(window).scrollTop()
                        }).trigger("scroll.split-slider"),
                        e(window).on("resize.split-slider", window.debounce(function () {
                            this.unmount(),
                                this.mount(!1)
                        }
                            .bind(this), 250))
                },
                unmount: function () {
                    e(window).off("scroll.split-slider")
                }
            }
        },
            e(document).on("ready", function () {
                window.CUBER.Nav.mount(),
                    0 < e(".productDetail-page").length && e(".productDetail-page").each(function () {
                        window.CUBER.Product.mount(e(this))
                    }),
                    0 < e(".box__slideshow-split").length && window.CUBER.SplitSlider.mount(!0),
                    e(window).on("resize", function () {
                        e(window).width()
                    })
            })
    }(jQuery);
/* Slick slide */
!function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function (i) {
    "use strict";
    var e = window.Slick || {};
    (e = function () {
        var e = 0;
        return function (t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            },
                n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                },
                i.extend(n, n.initials),
                n.activeBreakpoint = null,
                n.animType = null,
                n.animProp = null,
                n.breakpoints = [],
                n.breakpointSettings = [],
                n.cssTransitions = !1,
                n.focussed = !1,
                n.interrupted = !1,
                n.hidden = "hidden",
                n.paused = !0,
                n.positionProp = null,
                n.respondTo = null,
                n.rowCount = 1,
                n.shouldClick = !0,
                n.$slider = i(t),
                n.$slidesCache = null,
                n.transformType = null,
                n.transitionType = null,
                n.visibilityChange = "visibilitychange",
                n.windowWidth = 0,
                n.windowTimer = null,
                s = i(t).data("slick") || {},
                n.options = i.extend({}, n.defaults, o, s),
                n.currentSlide = n.options.initialSlide,
                n.originalSettings = n.options,
                void 0 !== document.mozHidden ? (n.hidden = "mozHidden",
                    n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden",
                        n.visibilityChange = "webkitvisibilitychange"),
                n.autoPlay = i.proxy(n.autoPlay, n),
                n.autoPlayClear = i.proxy(n.autoPlayClear, n),
                n.autoPlayIterator = i.proxy(n.autoPlayIterator, n),
                n.changeSlide = i.proxy(n.changeSlide, n),
                n.clickHandler = i.proxy(n.clickHandler, n),
                n.selectHandler = i.proxy(n.selectHandler, n),
                n.setPosition = i.proxy(n.setPosition, n),
                n.swipeHandler = i.proxy(n.swipeHandler, n),
                n.dragHandler = i.proxy(n.dragHandler, n),
                n.keyHandler = i.proxy(n.keyHandler, n),
                n.instanceUid = e++,
                n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
                n.registerBreakpoints(),
                n.init(!0)
        }
    }()).prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }
        ,
        e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
            var s = this;
            if ("boolean" == typeof t)
                o = t,
                    t = null;
            else if (t < 0 || t >= s.slideCount)
                return !1;
            s.unload(),
                "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack),
                s.$slides = s.$slideTrack.children(this.options.slide),
                s.$slideTrack.children(this.options.slide).detach(),
                s.$slideTrack.append(s.$slides),
                s.$slides.each(function (e, t) {
                    i(t).attr("data-slick-index", e)
                }),
                s.$slidesCache = s.$slides,
                s.reinit()
        }
        ,
        e.prototype.animateHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({
                    height: e
                }, i.options.speed)
            }
        }
        ,
        e.prototype.animateSlide = function (e, t) {
            var o = {}
                , s = this;
            s.animateHeight(),
                !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
                !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
                    left: e
                }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                    top: e
                }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
                    i({
                        animStart: s.currentLeft
                    }).animate({
                        animStart: e
                    }, {
                        duration: s.options.speed,
                        easing: s.options.easing,
                        step: function (i) {
                            i = Math.ceil(i),
                                !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)",
                                    s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)",
                                        s.$slideTrack.css(o))
                        },
                        complete: function () {
                            t && t.call()
                        }
                    })) : (s.applyTransition(),
                        e = Math.ceil(e),
                        !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)",
                        s.$slideTrack.css(o),
                        t && setTimeout(function () {
                            s.disableTransition(),
                                t.call()
                        }, s.options.speed))
        }
        ,
        e.prototype.getNavTarget = function () {
            var e = this
                , t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)),
                t
        }
        ,
        e.prototype.asNavFor = function (e) {
            var t = this.getNavTarget();
            null !== t && "object" == typeof t && t.each(function () {
                var t = i(this).slick("getSlick");
                t.unslicked || t.slideHandler(e, !0)
            })
        }
        ,
        e.prototype.applyTransition = function (i) {
            var e = this
                , t = {};
            !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
                !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        }
        ,
        e.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(),
                i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
        }
        ,
        e.prototype.autoPlayClear = function () {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer)
        }
        ,
        e.prototype.autoPlayIterator = function () {
            var i = this
                , e = i.currentSlide + i.options.slidesToScroll;
            i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
                i.currentSlide - 1 == 0 && (i.direction = 1))),
                i.slideHandler(e))
        }
        ,
        e.prototype.buildArrows = function () {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"),
                e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"),
                e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                    e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                    e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                    e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                    !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                        "aria-disabled": "true",
                        tabindex: "-1"
                    }))
        }
        ,
        e.prototype.buildDots = function () {
            var e, t, o = this;
            if (!0 === o.options.dots) {
                for (o.$slider.addClass("slick-dotted"),
                    t = i("<ul />").addClass(o.options.dotsClass),
                    e = 0; e <= o.getDotCount(); e += 1)
                    t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                o.$dots = t.appendTo(o.options.appendDots),
                    o.$dots.find("li").first().addClass("slick-active")
            }
        }
        ,
        e.prototype.buildOut = function () {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
                e.slideCount = e.$slides.length,
                e.$slides.each(function (e, t) {
                    i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
                }),
                e.$slider.addClass("slick-slider"),
                e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
                e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
                e.$slideTrack.css("opacity", 0),
                !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                !0 === e.options.draggable && e.$list.addClass("draggable")
        }
        ,
        e.prototype.buildRows = function () {
            var i, e, t, o, s, n, r, l = this;
            if (o = document.createDocumentFragment(),
                n = l.$slider.children(),
                l.options.rows > 1) {
                for (r = l.options.slidesPerRow * l.options.rows,
                    s = Math.ceil(n.length / r),
                    i = 0; i < s; i++) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c))
                        }
                        d.appendChild(a)
                    }
                    o.appendChild(d)
                }
                l.$slider.empty().append(o),
                    l.$slider.children().children().children().css({
                        width: 100 / l.options.slidesPerRow + "%",
                        display: "inline-block"
                    })
            }
        }
        ,
        e.prototype.checkResponsive = function (e, t) {
            var o, s, n, r = this, l = !1, d = r.$slider.width(), a = window.innerWidth || i(window).width();
            if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)),
                r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                s = null;
                for (o in r.breakpoints)
                    r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s,
                    "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
                        !0 === e && (r.currentSlide = r.options.initialSlide),
                        r.refresh(e)),
                    l = s) : (r.activeBreakpoint = s,
                        "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
                            !0 === e && (r.currentSlide = r.options.initialSlide),
                            r.refresh(e)),
                        l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
                            r.options = r.originalSettings,
                            !0 === e && (r.currentSlide = r.options.initialSlide),
                            r.refresh(e),
                            l = s),
                    e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
            }
        }
        ,
        e.prototype.changeSlide = function (e, t) {
            var o, s, n, r = this, l = i(e.currentTarget);
            switch (l.is("a") && e.preventDefault(),
            l.is("li") || (l = l.closest("li")),
            n = r.slideCount % r.options.slidesToScroll != 0,
            o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
            e.data.message) {
                case "previous":
                    s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
                        r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 === o ? r.options.slidesToScroll : o,
                        r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t),
                        l.children().trigger("focus");
                    break;
                default:
                    return
            }
        }
        ,
        e.prototype.checkNavigable = function (i) {
            var e, t;
            if (e = this.getNavigableIndexes(),
                t = 0,
                i > e[e.length - 1])
                i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break
                    }
                    t = e[o]
                }
            return i
        }
        ,
        e.prototype.cleanUpEvents = function () {
            var e = this;
            e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                    !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
                        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
        }
        ,
        e.prototype.cleanUpSlideEvents = function () {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
        }
        ,
        e.prototype.cleanUpRows = function () {
            var i, e = this;
            e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"),
                e.$slider.empty().append(i))
        }
        ,
        e.prototype.clickHandler = function (i) {
            !1 === this.shouldClick && (i.stopImmediatePropagation(),
                i.stopPropagation(),
                i.preventDefault())
        }
        ,
        e.prototype.destroy = function (e) {
            var t = this;
            t.autoPlayClear(),
                t.touchObject = {},
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
                    t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
                    t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                    i(this).attr("style", i(this).data("originalStyling"))
                }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                t.unslicked = !0,
                e || t.$slider.trigger("destroy", [t])
        }
        ,
        e.prototype.disableTransition = function (i) {
            var e = this
                , t = {};
            t[e.transitionType] = "",
                !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        }
        ,
        e.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions ? (t.$slides.eq(i).css({
                zIndex: t.options.zIndex
            }),
                t.$slides.eq(i).animate({
                    opacity: 1
                }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
                    t.$slides.eq(i).css({
                        opacity: 1,
                        zIndex: t.options.zIndex
                    }),
                    e && setTimeout(function () {
                        t.disableTransition(i),
                            e.call()
                    }, t.options.speed))
        }
        ,
        e.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(i).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }, e.options.speed, e.options.easing) : (e.applyTransition(i),
                e.$slides.eq(i).css({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }))
        }
        ,
        e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
            var e = this;
            null !== i && (e.$slidesCache = e.$slides,
                e.unload(),
                e.$slideTrack.children(this.options.slide).detach(),
                e.$slidesCache.filter(i).appendTo(e.$slideTrack),
                e.reinit())
        }
        ,
        e.prototype.focusHandler = function () {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
                t.stopImmediatePropagation();
                var o = i(this);
                setTimeout(function () {
                    e.options.pauseOnFocus && (e.focussed = o.is(":focus"),
                        e.autoPlay())
                }, 0)
            })
        }
        ,
        e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
            return this.currentSlide
        }
        ,
        e.prototype.getDotCount = function () {
            var i = this
                , e = 0
                , t = 0
                , o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow)
                    ++o;
                else
                    for (; e < i.slideCount;)
                        ++o,
                            e = t + i.options.slidesToScroll,
                            t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            else if (!0 === i.options.centerMode)
                o = i.slideCount;
            else if (i.options.asNavFor)
                for (; e < i.slideCount;)
                    ++o,
                        e = t + i.options.slidesToScroll,
                        t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            else
                o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
            return o - 1
        }
        ,
        e.prototype.getLeft = function (i) {
            var e, t, o, s, n = this, r = 0;
            return n.slideOffset = 0,
                t = n.$slides.first().outerHeight(!0),
                !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
                    s = -1,
                    !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
                    r = t * n.options.slidesToShow * s),
                    n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
                        r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
                            r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
                                r = (i + n.options.slidesToShow - n.slideCount) * t),
                n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
                    r = 0),
                !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0,
                    n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
                e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r,
                !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
                    e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
                    !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
                        e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0,
                        e += (n.$list.width() - o.outerWidth()) / 2)),
                e
        }
        ,
        e.prototype.getOption = e.prototype.slickGetOption = function (i) {
            return this.options[i]
        }
        ,
        e.prototype.getNavigableIndexes = function () {
            var i, e = this, t = 0, o = 0, s = [];
            for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll,
                o = -1 * e.options.slidesToScroll,
                i = 2 * e.slideCount); t < i;)
                s.push(t),
                    t = o + e.options.slidesToScroll,
                    o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return s
        }
        ,
        e.prototype.getSlick = function () {
            return this
        }
        ,
        e.prototype.getSlideCount = function () {
            var e, t, o = this;
            return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0,
                !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                    if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                        return e = n,
                            !1
                }),
                    Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
        }
        ,
        e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(i)
                }
            }, e)
        }
        ,
        e.prototype.init = function (e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"),
                t.buildRows(),
                t.buildOut(),
                t.setProps(),
                t.startLoad(),
                t.loadSlider(),
                t.initializeEvents(),
                t.updateArrows(),
                t.updateDots(),
                t.checkResponsive(!0),
                t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                !0 === t.options.accessibility && t.initADA(),
                t.options.autoplay && (t.paused = !1,
                    t.autoPlay())
        }
        ,
        e.prototype.initADA = function () {
            var e = this
                , t = Math.ceil(e.slideCount / e.options.slidesToShow)
                , o = e.getNavigableIndexes().filter(function (i) {
                    return i >= 0 && i < e.slideCount
                });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }),
                null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
                    var s = o.indexOf(t);
                    i(this).attr({
                        role: "tabpanel",
                        id: "slick-slide" + e.instanceUid + t,
                        tabindex: -1
                    }),
                        -1 !== s && i(this).attr({
                            "aria-describedby": "slick-slide-control" + e.instanceUid + s
                        })
                }),
                    e.$dots.attr("role", "tablist").find("li").each(function (s) {
                        var n = o[s];
                        i(this).attr({
                            role: "presentation"
                        }),
                            i(this).find("button").first().attr({
                                role: "tab",
                                id: "slick-slide-control" + e.instanceUid + s,
                                "aria-controls": "slick-slide" + e.instanceUid + n,
                                "aria-label": s + 1 + " of " + t,
                                "aria-selected": null,
                                tabindex: "-1"
                            })
                    }).eq(e.currentSlide).find("button").attr({
                        "aria-selected": "true",
                        tabindex: "0"
                    }).end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
                e.$slides.eq(s).attr("tabindex", 0);
            e.activateADA()
        }
        ,
        e.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, i.changeSlide),
                i.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, i.changeSlide),
                !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler),
                    i.$nextArrow.on("keydown.slick", i.keyHandler)))
        }
        ,
        e.prototype.initDotEvents = function () {
            var e = this;
            !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide),
                !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)),
                !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
        }
        ,
        e.prototype.initSlideEvents = function () {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
        }
        ,
        e.prototype.initializeEvents = function () {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, e.swipeHandler),
                e.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, e.swipeHandler),
                e.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, e.swipeHandler),
                e.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, e.swipeHandler),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
                i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                i(e.setPosition)
        }
        ,
        e.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
                i.$nextArrow.show()),
                !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
        }
        ,
        e.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                data: {
                    message: !0 === e.options.rtl ? "next" : "previous"
                }
            }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
                data: {
                    message: !0 === e.options.rtl ? "previous" : "next"
                }
            }))
        }
        ,
        e.prototype.lazyLoad = function () {
            function e(e) {
                i("img[data-lazy]", e).each(function () {
                    var e = i(this)
                        , t = i(this).attr("data-lazy")
                        , o = i(this).attr("data-srcset")
                        , s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes")
                        , r = document.createElement("img");
                    r.onload = function () {
                        e.animate({
                            opacity: 0
                        }, 100, function () {
                            o && (e.attr("srcset", o),
                                s && e.attr("sizes", s)),
                                e.attr("src", t).animate({
                                    opacity: 1
                                }, 200, function () {
                                    e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                }),
                                n.$slider.trigger("lazyLoaded", [n, e, t])
                        })
                    }
                        ,
                        r.onerror = function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                                n.$slider.trigger("lazyLoadError", [n, e, t])
                        }
                        ,
                        r.src = t
                })
            }
            var t, o, s, n = this;
            if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)),
                s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide,
                    s = Math.ceil(o + n.options.slidesToShow),
                    !0 === n.options.fade && (o > 0 && o--,
                        s <= n.slideCount && s++)),
                t = n.$slider.find(".slick-slide").slice(o, s),
                "anticipated" === n.options.lazyLoad)
                for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++)
                    r < 0 && (r = n.slideCount - 1),
                        t = (t = t.add(d.eq(r))).add(d.eq(l)),
                        r--,
                        l++;
            e(t),
                n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
        }
        ,
        e.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(),
                i.$slideTrack.css({
                    opacity: 1
                }),
                i.$slider.removeClass("slick-loading"),
                i.initUI(),
                "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
        }
        ,
        e.prototype.next = e.prototype.slickNext = function () {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }
        ,
        e.prototype.orientationChange = function () {
            var i = this;
            i.checkResponsive(),
                i.setPosition()
        }
        ,
        e.prototype.pause = e.prototype.slickPause = function () {
            var i = this;
            i.autoPlayClear(),
                i.paused = !0
        }
        ,
        e.prototype.play = e.prototype.slickPlay = function () {
            var i = this;
            i.autoPlay(),
                i.options.autoplay = !0,
                i.paused = !1,
                i.focussed = !1,
                i.interrupted = !1
        }
        ,
        e.prototype.postSlide = function (e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]),
                t.animating = !1,
                t.slideCount > t.options.slidesToShow && t.setPosition(),
                t.swipeLeft = null,
                t.options.autoplay && t.autoPlay(),
                !0 === t.options.accessibility && (t.initADA(),
                    t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
        }
        ,
        e.prototype.prev = e.prototype.slickPrev = function () {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }
        ,
        e.prototype.preventDefault = function (i) {
            i.preventDefault()
        }
        ,
        e.prototype.progressiveLazyLoad = function (e) {
            e = e || 1;
            var t, o, s, n, r, l = this, d = i("img[data-lazy]", l.$slider);
            d.length ? (t = d.first(),
                o = t.attr("data-lazy"),
                s = t.attr("data-srcset"),
                n = t.attr("data-sizes") || l.$slider.attr("data-sizes"),
                (r = document.createElement("img")).onload = function () {
                    s && (t.attr("srcset", s),
                        n && t.attr("sizes", n)),
                        t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                        !0 === l.options.adaptiveHeight && l.setPosition(),
                        l.$slider.trigger("lazyLoaded", [l, t, o]),
                        l.progressiveLazyLoad()
                }
                ,
                r.onerror = function () {
                    e < 3 ? setTimeout(function () {
                        l.progressiveLazyLoad(e + 1)
                    }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                        l.$slider.trigger("lazyLoadError", [l, t, o]),
                        l.progressiveLazyLoad())
                }
                ,
                r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
        }
        ,
        e.prototype.refresh = function (e) {
            var t, o, s = this;
            o = s.slideCount - s.options.slidesToShow,
                !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                t = s.currentSlide,
                s.destroy(!0),
                i.extend(s, s.initials, {
                    currentSlide: t
                }),
                s.init(),
                e || s.changeSlide({
                    data: {
                        message: "index",
                        index: t
                    }
                }, !1)
        }
        ,
        e.prototype.registerBreakpoints = function () {
            var e, t, o, s = this, n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (o = s.breakpoints.length - 1,
                        n.hasOwnProperty(e)) {
                        for (t = n[e].breakpoint; o >= 0;)
                            s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1),
                                o--;
                        s.breakpoints.push(t),
                            s.breakpointSettings[t] = n[e].settings
                    }
                s.breakpoints.sort(function (i, e) {
                    return s.options.mobileFirst ? i - e : e - i
                })
            }
        }
        ,
        e.prototype.reinit = function () {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
                e.slideCount = e.$slides.length,
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.setPosition(),
                e.focusHandler(),
                e.paused = !e.options.autoplay,
                e.autoPlay(),
                e.$slider.trigger("reInit", [e])
        }
        ,
        e.prototype.resize = function () {
            var e = this;
            i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
                e.windowDelay = window.setTimeout(function () {
                    e.windowWidth = i(window).width(),
                        e.checkResponsive(),
                        e.unslicked || e.setPosition()
                }, 50))
        }
        ,
        e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
            var o = this;
            if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i,
                o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
                return !1;
            o.unload(),
                !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
                o.$slides = o.$slideTrack.children(this.options.slide),
                o.$slideTrack.children(this.options.slide).detach(),
                o.$slideTrack.append(o.$slides),
                o.$slidesCache = o.$slides,
                o.reinit()
        }
        ,
        e.prototype.setCSS = function (i) {
            var e, t, o = this, s = {};
            !0 === o.options.rtl && (i = -i),
                e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
                t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
                s[o.positionProp] = i,
                !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {},
                    !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")",
                        o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)",
                            o.$slideTrack.css(s)))
        }
        ,
        e.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
                padding: "0px " + i.options.centerPadding
            }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
                !0 === i.options.centerMode && i.$list.css({
                    padding: i.options.centerPadding + " 0px"
                })),
                i.listWidth = i.$list.width(),
                i.listHeight = i.$list.height(),
                !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
                    i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
                        i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
        }
        ,
        e.prototype.setFade = function () {
            var e, t = this;
            t.$slides.each(function (o, s) {
                e = t.slideWidth * o * -1,
                    !0 === t.options.rtl ? i(s).css({
                        position: "relative",
                        right: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    }) : i(s).css({
                        position: "relative",
                        left: e,
                        top: 0,
                        zIndex: t.options.zIndex - 2,
                        opacity: 0
                    })
            }),
                t.$slides.eq(t.currentSlide).css({
                    zIndex: t.options.zIndex - 1,
                    opacity: 1
                })
        }
        ,
        e.prototype.setHeight = function () {
            var i = this;
            if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e)
            }
        }
        ,
        e.prototype.setOption = e.prototype.slickSetOption = function () {
            var e, t, o, s, n, r = this, l = !1;
            if ("object" === i.type(arguments[0]) ? (o = arguments[0],
                l = arguments[1],
                n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0],
                    s = arguments[1],
                    l = arguments[2],
                    "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")),
                "single" === n)
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function (i, e) {
                    r.options[i] = e
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive))
                        r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0;)
                            r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1),
                                e--;
                        r.options.responsive.push(s[t])
                    }
            l && (r.unload(),
                r.reinit())
        }
        ,
        e.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(),
                i.setHeight(),
                !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
                i.$slider.trigger("setPosition", [i])
        }
        ,
        e.prototype.setProps = function () {
            var i = this
                , e = document.body.style;
            i.positionProp = !0 === i.options.vertical ? "top" : "left",
                "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
                void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0),
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
                void 0 !== e.OTransform && (i.animType = "OTransform",
                    i.transformType = "-o-transform",
                    i.transitionType = "OTransition",
                    void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.MozTransform && (i.animType = "MozTransform",
                    i.transformType = "-moz-transform",
                    i.transitionType = "MozTransition",
                    void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
                void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
                    i.transformType = "-webkit-transform",
                    i.transitionType = "webkitTransition",
                    void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.msTransform && (i.animType = "msTransform",
                    i.transformType = "-ms-transform",
                    i.transitionType = "msTransition",
                    void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform",
                    i.transformType = "transform",
                    i.transitionType = "transition"),
                i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
        }
        ,
        e.prototype.setSlideClasses = function (i) {
            var e, t, o, s, n = this;
            if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
                n.$slides.eq(i).addClass("slick-current"),
                !0 === n.options.centerMode) {
                var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                e = Math.floor(n.options.slidesToShow / 2),
                    !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
                        t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
                        0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center")
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow,
                    o = !0 === n.options.infinite ? n.options.slidesToShow + i : i,
                    n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
        }
        ,
        e.prototype.setupInfinite = function () {
            var e, t, o, s = this;
            if (!0 === s.options.fade && (s.options.centerMode = !1),
                !0 === s.options.infinite && !1 === s.options.fade && (t = null,
                    s.slideCount > s.options.slidesToShow)) {
                for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow,
                    e = s.slideCount; e > s.slideCount - o; e -= 1)
                    t = e - 1,
                        i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    t = e,
                        i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                    i(this).attr("id", "")
                })
            }
        }
        ,
        e.prototype.interrupt = function (i) {
            var e = this;
            i || e.autoPlay(),
                e.interrupted = i
        }
        ,
        e.prototype.selectHandler = function (e) {
            var t = this
                , o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide")
                , s = parseInt(o.attr("data-slick-index"));
            s || (s = 0),
                t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
        }
        ,
        e.prototype.slideHandler = function (i, e, t) {
            var o, s, n, r, l, d = null, a = this;
            if (e = e || !1,
                !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
                if (!1 === e && a.asNavFor(i),
                    o = i,
                    d = a.getLeft(o),
                    r = a.getLeft(a.currentSlide),
                    a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft,
                    !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
                    !1 === a.options.fade && (o = a.currentSlide,
                        !0 !== t ? a.animateSlide(r, function () {
                            a.postSlide(o)
                        }) : a.postSlide(o));
                else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll))
                    !1 === a.options.fade && (o = a.currentSlide,
                        !0 !== t ? a.animateSlide(r, function () {
                            a.postSlide(o)
                        }) : a.postSlide(o));
                else {
                    if (a.options.autoplay && clearInterval(a.autoPlayTimer),
                        s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o,
                        a.animating = !0,
                        a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                        n = a.currentSlide,
                        a.currentSlide = s,
                        a.setSlideClasses(a.currentSlide),
                        a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide),
                        a.updateDots(),
                        a.updateArrows(),
                        !0 === a.options.fade)
                        return !0 !== t ? (a.fadeSlideOut(n),
                            a.fadeSlide(s, function () {
                                a.postSlide(s)
                            })) : a.postSlide(s),
                            void a.animateHeight();
                    !0 !== t ? a.animateSlide(d, function () {
                        a.postSlide(s)
                    }) : a.postSlide(s)
                }
        }
        ,
        e.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
                i.$nextArrow.hide()),
                !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
                i.$slider.addClass("slick-loading")
        }
        ,
        e.prototype.swipeDirection = function () {
            var i, e, t, o, s = this;
            return i = s.touchObject.startX - s.touchObject.curX,
                e = s.touchObject.startY - s.touchObject.curY,
                t = Math.atan2(e, i),
                (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
        }
        ,
        e.prototype.swipeEnd = function (i) {
            var e, t, o = this;
            if (o.dragging = !1,
                o.swiping = !1,
                o.scrolling)
                return o.scrolling = !1,
                    !1;
            if (o.interrupted = !1,
                o.shouldClick = !(o.touchObject.swipeLength > 10),
                void 0 === o.touchObject.curX)
                return !1;
            if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]),
                o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                switch (t = o.swipeDirection()) {
                    case "left":
                    case "down":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                            o.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                            o.currentDirection = 1
                }
                "vertical" != t && (o.slideHandler(e),
                    o.touchObject = {},
                    o.$slider.trigger("swipe", [o, t]))
            } else
                o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
                    o.touchObject = {})
        }
        ,
        e.prototype.swipeHandler = function (i) {
            var e = this;
            if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse")))
                switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
                e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
                !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                i.data.action) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i)
                }
        }
        ,
        e.prototype.swipeMove = function (i) {
            var e, t, o, s, n, r, l = this;
            return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null,
                !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide),
                    l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX,
                    l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY,
                    l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
                    r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))),
                    !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0,
                        !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
                            t = l.swipeDirection(),
                            void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0,
                                i.preventDefault()),
                            s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
                            !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                            o = l.touchObject.swipeLength,
                            l.touchObject.edgeHit = !1,
                            !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
                                l.touchObject.edgeHit = !0),
                            !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
                            !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
                            !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null,
                                !1) : void l.setCSS(l.swipeLeft))))
        }
        ,
        e.prototype.swipeStart = function (i) {
            var e, t = this;
            if (t.interrupted = !0,
                1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow)
                return t.touchObject = {},
                    !1;
            void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
                t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
                t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
                t.dragging = !0
        }
        ,
        e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
            var i = this;
            null !== i.$slidesCache && (i.unload(),
                i.$slideTrack.children(this.options.slide).detach(),
                i.$slidesCache.appendTo(i.$slideTrack),
                i.reinit())
        }
        ,
        e.prototype.unload = function () {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }
        ,
        e.prototype.unslick = function (i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]),
                e.destroy()
        }
        ,
        e.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2),
                !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                        i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                            i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                                i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }
        ,
        e.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
        }
        ,
        e.prototype.visibility = function () {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
        }
        ,
        i.fn.slick = function () {
            var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
            for (i = 0; i < r; i++)
                if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n),
                    void 0 !== t)
                    return t;
            return o
        }
});
/* Sweet */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Sweetalert2 = t()
}(this, function () {
    "use strict";
    var q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    }
        : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        , s = function (e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        , o = function () {
            function o(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1,
                        o.configurable = !0,
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o)
                }
            }
            return function (e, t, n) {
                return t && o(e.prototype, t),
                    n && o(e, n),
                    e
            }
        }()
        , r = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n)
                    Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        }
        , i = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === r) {
                var i = Object.getPrototypeOf(t);
                return null === i ? void 0 : e(i, n, o)
            }
            if ("value" in r)
                return r.value;
            var a = r.get;
            return void 0 !== a ? a.call(o) : void 0
        }
        , a = function (e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        , u = function (e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        , t = "SweetAlert2:"
        , c = function (e) {
            return Array.prototype.slice.call(e)
        }
        , d = function (e) {
            console.warn(t + " " + e)
        }
        , V = function (e) {
            console.error(t + " " + e)
        }
        , n = []
        , l = function (e) {
            -1 === n.indexOf(e) && (n.push(e),
                d(e))
        }
        , M = function (e) {
            return "function" == typeof e ? e() : e
        }
        , H = function (e) {
            return "object" === (void 0 === e ? "undefined" : q(e)) && "function" == typeof e.then
        }
        , e = Object.freeze({
            cancel: "cancel",
            backdrop: "overlay",
            close: "close",
            esc: "esc",
            timer: "timer"
        })
        , p = function (e) {
            var t = {};
            for (var n in e)
                t[e[n]] = "swal2-" + e[n];
            return t
        }
        , I = p(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "toast", "toast-shown", "toast-column", "fade", "show", "hide", "noanimation", "close", "title", "header", "content", "actions", "confirm", "cancel", "footer", "icon", "icon-text", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen"])
        , f = p(["success", "warning", "info", "question", "error"])
        , m = {
            previousBodyPadding: null
        }
        , h = function (e, t) {
            return e.classList.contains(t)
        }
        , D = function (e) {
            if (e.focus(),
                "file" !== e.type) {
                var t = e.value;
                e.value = "",
                    e.value = t
            }
        }
        , g = function (e, t, n) {
            e && t && ("string" == typeof t && (t = t.split(/\s+/).filter(Boolean)),
                t.forEach(function (t) {
                    e.forEach ? e.forEach(function (e) {
                        n ? e.classList.add(t) : e.classList.remove(t)
                    }) : n ? e.classList.add(t) : e.classList.remove(t)
                }))
        }
        , R = function (e, t) {
            g(e, t, !0)
        }
        , N = function (e, t) {
            g(e, t, !1)
        }
        , W = function (e, t) {
            for (var n = 0; n < e.childNodes.length; n++)
                if (h(e.childNodes[n], t))
                    return e.childNodes[n]
        }
        , z = function (e) {
            e.style.opacity = "",
                e.style.display = e.id === I.content ? "block" : "flex"
        }
        , U = function (e) {
            e.style.opacity = "",
                e.style.display = "none"
        }
        , F = function (e) {
            return e && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }
        , b = function () {
            return document.body.querySelector("." + I.container)
        }
        , v = function (e) {
            var t = b();
            return t ? t.querySelector("." + e) : null
        }
        , y = function () {
            return v(I.popup)
        }
        , w = function () {
            var e = y();
            return c(e.querySelectorAll("." + I.icon))
        }
        , C = function () {
            return v(I.title)
        }
        , k = function () {
            return v(I.content)
        }
        , x = function () {
            return v(I.image)
        }
        , A = function () {
            return v(I.progresssteps)
        }
        , B = function () {
            return v(I.confirm)
        }
        , P = function () {
            return v(I.cancel)
        }
        , S = function () {
            return v(I.actions)
        }
        , E = function () {
            return v(I.footer)
        }
        , O = function () {
            return v(I.close)
        }
        , K = function () {
            var e = c(y().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function (e, t) {
                return e = parseInt(e.getAttribute("tabindex")),
                    (t = parseInt(t.getAttribute("tabindex"))) < e ? 1 : e < t ? -1 : 0
            })
                , t = c(y().querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]')).filter(function (e) {
                    return "-1" !== e.getAttribute("tabindex")
                });
            return function (e) {
                for (var t = [], n = 0; n < e.length; n++)
                    -1 === t.indexOf(e[n]) && t.push(e[n]);
                return t
            }(e.concat(t)).filter(function (e) {
                return F(e)
            })
        }
        , L = function () {
            return !T() && !document.body.classList.contains(I["no-backdrop"])
        }
        , T = function () {
            return document.body.classList.contains(I["toast-shown"])
        }
        , j = function () {
            return "undefined" == typeof window || "undefined" == typeof document
        }
        , _ = ('\n <div aria-labelledby="' + I.title + '" aria-describedby="' + I.content + '" class="' + I.popup + '" tabindex="-1">\n   <div class="' + I.header + '">\n     <ul class="' + I.progresssteps + '"></ul>\n     <div class="' + I.icon + " " + f.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + I.icon + " " + f.question + '">\n       <span class="' + I["icon-text"] + '">?</span>\n      </div>\n     <div class="' + I.icon + " " + f.warning + '">\n       <span class="' + I["icon-text"] + '">!</span>\n      </div>\n     <div class="' + I.icon + " " + f.info + '">\n       <span class="' + I["icon-text"] + '">i</span>\n      </div>\n     <div class="' + I.icon + " " + f.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + I.image + '" />\n     <h2 class="' + I.title + '" id="' + I.title + '"></h2>\n     <button type="button" class="' + I.close + '">×</button>\n   </div>\n   <div class="' + I.content + '">\n     <div id="' + I.content + '"></div>\n     <input class="' + I.input + '" />\n     <input type="file" class="' + I.file + '" />\n     <div class="' + I.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + I.select + '"></select>\n     <div class="' + I.radio + '"></div>\n     <label for="' + I.checkbox + '" class="' + I.checkbox + '">\n       <input type="checkbox" />\n       <span class="' + I.label + '"></span>\n     </label>\n     <textarea class="' + I.textarea + '"></textarea>\n     <div class="' + I.validationerror + '" id="' + I.validationerror + '"></div>\n   </div>\n   <div class="' + I.actions + '">\n     <button type="button" class="' + I.confirm + '">OK</button>\n     <button type="button" class="' + I.cancel + '">Cancel</button>\n   </div>\n   <div class="' + I.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, "")
        , Z = function (e) {
            var t = b();
            if (t && (t.parentNode.removeChild(t),
                N([document.documentElement, document.body], [I["no-backdrop"], I["toast-shown"], I["has-column"]])),
                !j()) {
                var n = document.createElement("div");
                n.className = I.container,
                    n.innerHTML = _,
                    ("string" == typeof e.target ? document.querySelector(e.target) : e.target).appendChild(n);
                var o = y()
                    , r = k()
                    , i = W(r, I.input)
                    , a = W(r, I.file)
                    , s = r.querySelector("." + I.range + " input")
                    , u = r.querySelector("." + I.range + " output")
                    , c = W(r, I.select)
                    , l = r.querySelector("." + I.checkbox + " input")
                    , d = W(r, I.textarea);
                o.setAttribute("role", e.toast ? "alert" : "dialog"),
                    o.setAttribute("aria-live", e.toast ? "polite" : "assertive"),
                    e.toast || o.setAttribute("aria-modal", "true");
                var p = void 0
                    , f = function (e) {
                        Ee.isVisible() && p !== e.target.value && Ee.resetValidationError(),
                            p = e.target.value
                    };
                return i.oninput = f,
                    a.onchange = f,
                    c.onchange = f,
                    l.onchange = f,
                    d.oninput = f,
                    s.oninput = function (e) {
                        f(e),
                            u.value = s.value
                    }
                    ,
                    s.onchange = function (e) {
                        f(e),
                            s.nextSibling.value = s.value
                    }
                    ,
                    o
            }
            V("SweetAlert2 requires document to initialize")
        }
        , Q = function (e, t) {
            if (!e)
                return U(t);
            if ("object" === (void 0 === e ? "undefined" : q(e)))
                if (t.innerHTML = "",
                    0 in e)
                    for (var n = 0; n in e; n++)
                        t.appendChild(e[n].cloneNode(!0));
                else
                    t.appendChild(e.cloneNode(!0));
            else
                e && (t.innerHTML = e);
            z(t)
        }
        , Y = function () {
            if (j())
                return !1;
            var e = document.createElement("div")
                , t = {
                    WebkitAnimation: "webkitAnimationEnd",
                    OAnimation: "oAnimationEnd oanimationend",
                    animation: "animationend"
                };
            for (var n in t)
                if (t.hasOwnProperty(n) && void 0 !== e.style[n])
                    return t[n];
            return !1
        }()
        , $ = function (e) {
            var t, n, o = S(), r = B(), i = P();
            if (e.showConfirmButton || e.showCancelButton ? z(o) : U(o),
                e.showCancelButton ? i.style.display = "inline-block" : U(i),
                e.showConfirmButton ? (n = "display",
                    (t = r).style.removeProperty ? t.style.removeProperty(n) : t.style.removeAttribute(n)) : U(r),
                r.innerHTML = e.confirmButtonText,
                i.innerHTML = e.cancelButtonText,
                r.setAttribute("aria-label", e.confirmButtonAriaLabel),
                i.setAttribute("aria-label", e.cancelButtonAriaLabel),
                r.className = I.confirm,
                R(r, e.confirmButtonClass),
                i.className = I.cancel,
                R(i, e.cancelButtonClass),
                e.buttonsStyling) {
                R([r, i], I.styled),
                    e.confirmButtonColor && (r.style.backgroundColor = e.confirmButtonColor),
                    e.cancelButtonColor && (i.style.backgroundColor = e.cancelButtonColor);
                var a = window.getComputedStyle(r).getPropertyValue("background-color");
                r.style.borderLeftColor = a,
                    r.style.borderRightColor = a
            } else
                N([r, i], I.styled),
                    r.style.backgroundColor = r.style.borderLeftColor = r.style.borderRightColor = "",
                    i.style.backgroundColor = i.style.borderLeftColor = i.style.borderRightColor = ""
        }
        , J = function (e) {
            var t = k().querySelector("#" + I.content);
            e.html ? Q(e.html, t) : e.text ? (t.textContent = e.text,
                z(t)) : U(t)
        }
        , X = function (e) {
            for (var t = w(), n = 0; n < t.length; n++)
                U(t[n]);
            if (e.type)
                if (-1 !== Object.keys(f).indexOf(e.type)) {
                    var o = Ee.getPopup().querySelector("." + I.icon + "." + f[e.type]);
                    z(o),
                        e.animation && R(o, "swal2-animate-" + e.type + "-icon")
                } else
                    V('Unknown type! Expected "success", "error", "warning", "info" or "question", got "' + e.type + '"')
        }
        , G = function (e) {
            var t = x();
            e.imageUrl ? (t.setAttribute("src", e.imageUrl),
                t.setAttribute("alt", e.imageAlt),
                z(t),
                e.imageWidth ? t.setAttribute("width", e.imageWidth) : t.removeAttribute("width"),
                e.imageHeight ? t.setAttribute("height", e.imageHeight) : t.removeAttribute("height"),
                t.className = I.image,
                e.imageClass && R(t, e.imageClass)) : U(t)
        }
        , ee = function (r) {
            var i = A()
                , a = parseInt(null === r.currentProgressStep ? Ee.getQueueStep() : r.currentProgressStep, 10);
            r.progressSteps && r.progressSteps.length ? (z(i),
                i.innerHTML = "",
                a >= r.progressSteps.length && d("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),
                r.progressSteps.forEach(function (e, t) {
                    var n = document.createElement("li");
                    if (R(n, I.progresscircle),
                        n.innerHTML = e,
                        t === a && R(n, I.activeprogressstep),
                        i.appendChild(n),
                        t !== r.progressSteps.length - 1) {
                        var o = document.createElement("li");
                        R(o, I.progressline),
                            r.progressStepsDistance && (o.style.width = r.progressStepsDistance),
                            i.appendChild(o)
                    }
                })) : U(i)
        }
        , te = function (e) {
            var t = C();
            e.titleText ? t.innerText = e.titleText : e.title && ("string" == typeof e.title && (e.title = e.title.split("\n").join("<br />")),
                Q(e.title, t))
        }
        , ne = function () {
            null === m.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (m.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),
                document.body.style.paddingRight = m.previousBodyPadding + function () {
                    if ("ontouchstart" in window || navigator.msMaxTouchPoints)
                        return 0;
                    var e = document.createElement("div");
                    e.style.width = "50px",
                        e.style.height = "50px",
                        e.style.overflow = "scroll",
                        document.body.appendChild(e);
                    var t = e.offsetWidth - e.clientWidth;
                    return document.body.removeChild(e),
                        t
                }() + "px")
        }
        , oe = {}
        , re = function (e, n) {
            var o = b()
                , t = y();
            if (t) {
                null !== e && "function" == typeof e && e(t),
                    N(t, I.show),
                    R(t, I.hide);
                var r = function () {
                    var e, t;
                    T() || (e = window.scrollX,
                        t = window.scrollY,
                        oe.restoreFocusTimeout = setTimeout(function () {
                            oe.previousActiveElement && oe.previousActiveElement.focus ? (oe.previousActiveElement.focus(),
                                oe.previousActiveElement = null) : document.body && document.body.focus()
                        }, 100),
                        void 0 !== e && void 0 !== t && window.scrollTo(e, t),
                        oe.keydownTarget.removeEventListener("keydown", oe.keydownHandler, {
                            capture: oe.keydownListenerCapture
                        }),
                        oe.keydownHandlerAdded = !1),
                        o.parentNode && o.parentNode.removeChild(o),
                        N([document.documentElement, document.body], [I.shown, I["height-auto"], I["no-backdrop"], I["toast-shown"], I["toast-column"]]),
                        L() && (null !== m.previousBodyPadding && (document.body.style.paddingRight = m.previousBodyPadding,
                            m.previousBodyPadding = null),
                            function () {
                                if (h(document.body, I.iosfix)) {
                                    var e = parseInt(document.body.style.top, 10);
                                    N(document.body, I.iosfix),
                                        document.body.style.top = "",
                                        document.body.scrollTop = -1 * e
                                }
                            }(),
                            c(document.body.children).forEach(function (e) {
                                e.hasAttribute("data-previous-aria-hidden") ? (e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden")),
                                    e.removeAttribute("data-previous-aria-hidden")) : e.removeAttribute("aria-hidden")
                            })),
                        null !== n && "function" == typeof n && setTimeout(function () {
                            n()
                        })
                };
                Y && !h(t, I.noanimation) ? t.addEventListener(Y, function e() {
                    t.removeEventListener(Y, e),
                        h(t, I.hide) && r()
                }) : r()
            }
        };
    function ie(e) {
        var t = function e() {
            for (var t = arguments.length, n = Array(t), o = 0; o < t; o++)
                n[o] = arguments[o];
            if (!(this instanceof e))
                return new (Function.prototype.bind.apply(e, [null].concat(n)));
            Object.getPrototypeOf(e).apply(this, n)
        };
        return t.prototype = r(Object.create(e.prototype), {
            constructor: t
        }),
            "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e,
            t
    }
    var ae = {
        title: "",
        titleText: "",
        text: "",
        html: "",
        footer: "",
        type: null,
        toast: !1,
        customClass: "",
        target: "body",
        backdrop: !0,
        animation: !0,
        heightAuto: !0,
        allowOutsideClick: !0,
        allowEscapeKey: !0,
        allowEnterKey: !0,
        stopKeydownPropagation: !0,
        keydownListenerCapture: !1,
        showConfirmButton: !0,
        showCancelButton: !1,
        preConfirm: null,
        confirmButtonText: "OK",
        confirmButtonAriaLabel: "",
        confirmButtonColor: null,
        confirmButtonClass: null,
        cancelButtonText: "Cancel",
        cancelButtonAriaLabel: "",
        cancelButtonColor: null,
        cancelButtonClass: null,
        buttonsStyling: !0,
        reverseButtons: !1,
        focusConfirm: !0,
        focusCancel: !1,
        showCloseButton: !1,
        closeButtonAriaLabel: "Close this dialog",
        showLoaderOnConfirm: !1,
        imageUrl: null,
        imageWidth: null,
        imageHeight: null,
        imageAlt: "",
        imageClass: null,
        timer: null,
        width: null,
        padding: null,
        background: null,
        input: null,
        inputPlaceholder: "",
        inputValue: "",
        inputOptions: {},
        inputAutoTrim: !0,
        inputClass: null,
        inputAttributes: {},
        inputValidator: null,
        grow: !1,
        position: "center",
        progressSteps: [],
        currentProgressStep: null,
        progressStepsDistance: null,
        onBeforeOpen: null,
        onAfterClose: null,
        onOpen: null,
        onClose: null,
        useRejections: !1,
        expectRejections: !1
    }
        , se = ["useRejections", "expectRejections"]
        , ue = function (e) {
            return ae.hasOwnProperty(e) || "extraParams" === e
        }
        , ce = function (e) {
            return -1 !== se.indexOf(e)
        }
        , le = function (e) {
            for (var t in e)
                ue(t) || d('Unknown parameter "' + t + '"'),
                    e.toast && -1 !== ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"].indexOf(t) && d('The parameter "' + t + '" is incompatible with toasts'),
                    ce(t) && l('The parameter "' + t + '" is deprecated and will be removed in the next major release.')
        }
        , de = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.'
        , pe = {};
    var fe = []
        , me = function () {
            var e = y();
            e || Ee(""),
                e = y();
            var t = S()
                , n = B()
                , o = P();
            z(t),
                z(n),
                R([e, t], I.loading),
                n.disabled = !0,
                o.disabled = !0,
                e.setAttribute("data-loading", !0),
                e.setAttribute("aria-busy", !0),
                e.focus()
        }
        , he = Object.freeze({
            isValidParameter: ue,
            isDeprecatedParameter: ce,
            argsToParams: function (n) {
                var o = {};
                switch (q(n[0])) {
                    case "string":
                        ["title", "html", "type"].forEach(function (e, t) {
                            switch (q(n[t])) {
                                case "string":
                                    o[e] = n[t];
                                    break;
                                case "undefined":
                                    break;
                                default:
                                    V("Unexpected type of " + e + '! Expected "string", got ' + q(n[t]))
                            }
                        });
                        break;
                    case "object":
                        r(o, n[0]);
                        break;
                    default:
                        V('Unexpected type of argument! Expected "string" or "object", got "' + q(n[0]) + '"')
                }
                return o
            },
            adaptInputValidator: function (n) {
                return function (e, t) {
                    return n.call(this, e, t).then(function () { }, function (e) {
                        return e
                    })
                }
            },
            close: re,
            closePopup: re,
            closeModal: re,
            closeToast: re,
            isVisible: function () {
                return !!y()
            },
            clickConfirm: function () {
                return B().click()
            },
            clickCancel: function () {
                return P().click()
            },
            getContainer: b,
            getPopup: y,
            getTitle: C,
            getContent: k,
            getImage: x,
            getIcons: w,
            getCloseButton: O,
            getButtonsWrapper: function () {
                return l("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"),
                    v(I.actions)
            },
            getActions: S,
            getConfirmButton: B,
            getCancelButton: P,
            getFooter: E,
            getFocusableElements: K,
            isLoading: function () {
                return y().hasAttribute("data-loading")
            },
            fire: function () {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                    t[n] = arguments[n];
                return new (Function.prototype.bind.apply(this, [null].concat(t)))
            },
            mixin: function (n) {
                return ie(function (e) {
                    function t() {
                        return s(this, t),
                            u(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return a(t, e),
                        o(t, [{
                            key: "_main",
                            value: function (e) {
                                return i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_main", this).call(this, r({}, n, e))
                            }
                        }]),
                        t
                }(this))
            },
            queue: function (e) {
                var i = this;
                fe = e;
                var a = function () {
                    fe = [],
                        document.body.removeAttribute("data-swal2-queue-step")
                }
                    , s = [];
                return new Promise(function (r) {
                    !function t(n, o) {
                        n < fe.length ? (document.body.setAttribute("data-swal2-queue-step", n),
                            i(fe[n]).then(function (e) {
                                void 0 !== e.value ? (s.push(e.value),
                                    t(n + 1, o)) : (a(),
                                        r({
                                            dismiss: e.dismiss
                                        }))
                            })) : (a(),
                                r({
                                    value: s
                                }))
                    }(0)
                }
                )
            },
            getQueueStep: function () {
                return document.body.getAttribute("data-swal2-queue-step")
            },
            insertQueueStep: function (e, t) {
                return t && t < fe.length ? fe.splice(t, 0, e) : fe.push(e)
            },
            deleteQueueStep: function (e) {
                void 0 !== fe[e] && fe.splice(e, 1)
            },
            showLoading: me,
            enableLoading: me,
            getTimerLeft: function () {
                return oe.timeout && oe.timeout.getTimerLeft()
            }
        })
        , ge = "function" == typeof Symbol ? Symbol : function () {
            var t = 0;
            function e(e) {
                return "__" + e + "_" + Math.floor(1e9 * Math.random()) + "_" + ++t + "__"
            }
            return e.iterator = e("Symbol.iterator"),
                e
        }()
        , be = "function" == typeof WeakMap ? WeakMap : function (n, o, t) {
            function e() {
                o(this, n, {
                    value: ge("WeakMap")
                })
            }
            return e.prototype = {
                delete: function (e) {
                    delete e[this[n]]
                },
                get: function (e) {
                    return e[this[n]]
                },
                has: function (e) {
                    return t.call(e, this[n])
                },
                set: function (e, t) {
                    o(e, this[n], {
                        configurable: !0,
                        value: t
                    })
                }
            },
                e
        }(ge("WeakMap"), Object.defineProperty, {}.hasOwnProperty)
        , ve = {
            promise: new be,
            innerParams: new be,
            domCache: new be
        };
    function ye() {
        var e = ve.innerParams.get(this)
            , t = ve.domCache.get(this);
        e.showConfirmButton || (U(t.confirmButton),
            e.showCancelButton || U(t.actions)),
            N([t.popup, t.actions], I.loading),
            t.popup.removeAttribute("aria-busy"),
            t.popup.removeAttribute("data-loading"),
            t.confirmButton.disabled = !1,
            t.cancelButton.disabled = !1
    }
    var we = function e(t, n) {
        s(this, e);
        var o = void 0
            , r = void 0
            , i = void 0
            , a = n;
        this.start = function () {
            i = !0,
                r = new Date,
                o = setTimeout(t, a)
        }
            ,
            this.stop = function () {
                i = !1,
                    clearTimeout(o),
                    a -= new Date - r
            }
            ,
            this.getTimerLeft = function () {
                return i && (this.stop(),
                    this.start()),
                    a
            }
            ,
            this.start()
    }
        , Ce = {
            email: function (e, t) {
                return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid email address")
            },
            url: function (e, t) {
                return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e) ? Promise.resolve() : Promise.reject(t && t.validationMessage ? t.validationMessage : "Invalid URL")
            }
        };
    var ke = function (e) {
        var t = b()
            , n = y();
        null !== e.onBeforeOpen && "function" == typeof e.onBeforeOpen && e.onBeforeOpen(n),
            e.animation ? (R(n, I.show),
                R(t, I.fade),
                N(n, I.hide)) : N(n, I.fade),
            z(n),
            t.style.overflowY = "hidden",
            Y && !h(n, I.noanimation) ? n.addEventListener(Y, function e() {
                n.removeEventListener(Y, e),
                    t.style.overflowY = "auto"
            }) : t.style.overflowY = "auto",
            R([document.documentElement, document.body, t], I.shown),
            e.heightAuto && e.backdrop && !e.toast && R([document.documentElement, document.body], I["height-auto"]),
            L() && (ne(),
                function () {
                    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !h(document.body, I.iosfix)) {
                        var e = document.body.scrollTop;
                        document.body.style.top = -1 * e + "px",
                            R(document.body, I.iosfix)
                    }
                }(),
                c(document.body.children).forEach(function (e) {
                    e === b() || e.contains(b()) || (e.hasAttribute("aria-hidden") && e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden")),
                        e.setAttribute("aria-hidden", "true"))
                })),
            T() || oe.previousActiveElement || (oe.previousActiveElement = document.activeElement),
            null !== e.onOpen && "function" == typeof e.onOpen && setTimeout(function () {
                e.onOpen(n)
            })
    };
    var xe = Object.freeze({
        hideLoading: ye,
        disableLoading: ye,
        getInput: function (e) {
            var t = ve.innerParams.get(this)
                , n = ve.domCache.get(this);
            if (!(e = e || t.input))
                return null;
            switch (e) {
                case "select":
                case "textarea":
                case "file":
                    return W(n.content, I[e]);
                case "checkbox":
                    return n.popup.querySelector("." + I.checkbox + " input");
                case "radio":
                    return n.popup.querySelector("." + I.radio + " input:checked") || n.popup.querySelector("." + I.radio + " input:first-child");
                case "range":
                    return n.popup.querySelector("." + I.range + " input");
                default:
                    return W(n.content, I.input)
            }
        },
        enableButtons: function () {
            var e = ve.domCache.get(this);
            e.confirmButton.disabled = !1,
                e.cancelButton.disabled = !1
        },
        disableButtons: function () {
            var e = ve.domCache.get(this);
            e.confirmButton.disabled = !0,
                e.cancelButton.disabled = !0
        },
        enableConfirmButton: function () {
            ve.domCache.get(this).confirmButton.disabled = !1
        },
        disableConfirmButton: function () {
            ve.domCache.get(this).confirmButton.disabled = !0
        },
        enableInput: function () {
            var e = this.getInput();
            if (!e)
                return !1;
            if ("radio" === e.type)
                for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++)
                    t[n].disabled = !1;
            else
                e.disabled = !1
        },
        disableInput: function () {
            var e = this.getInput();
            if (!e)
                return !1;
            if (e && "radio" === e.type)
                for (var t = e.parentNode.parentNode.querySelectorAll("input"), n = 0; n < t.length; n++)
                    t[n].disabled = !0;
            else
                e.disabled = !0
        },
        showValidationError: function (e) {
            var t = ve.domCache.get(this);
            t.validationError.innerHTML = e;
            var n = window.getComputedStyle(t.popup);
            t.validationError.style.marginLeft = "-" + n.getPropertyValue("padding-left"),
                t.validationError.style.marginRight = "-" + n.getPropertyValue("padding-right"),
                z(t.validationError);
            var o = this.getInput();
            o && (o.setAttribute("aria-invalid", !0),
                o.setAttribute("aria-describedBy", I.validationerror),
                D(o),
                R(o, I.inputerror))
        },
        resetValidationError: function () {
            var e = ve.domCache.get(this);
            e.validationError && U(e.validationError);
            var t = this.getInput();
            t && (t.removeAttribute("aria-invalid"),
                t.removeAttribute("aria-describedBy"),
                N(t, I.inputerror))
        },
        getProgressSteps: function () {
            return ve.innerParams.get(this).progressSteps
        },
        setProgressSteps: function (e) {
            var t = ve.innerParams.get(this)
                , n = r({}, t, {
                    progressSteps: e
                });
            ve.innerParams.set(this, n),
                ee(n)
        },
        showProgressSteps: function () {
            var e = ve.domCache.get(this);
            z(e.progressSteps)
        },
        hideProgressSteps: function () {
            var e = ve.domCache.get(this);
            U(e.progressSteps)
        },
        _main: function (e) {
            var L = this;
            le(e);
            var T = r({}, ae, e);
            !function (t) {
                t.inputValidator || Object.keys(Ce).forEach(function (e) {
                    t.input === e && (t.inputValidator = t.expectRejections ? Ce[e] : Ee.adaptInputValidator(Ce[e]))
                }),
                    (!t.target || "string" == typeof t.target && !document.querySelector(t.target) || "string" != typeof t.target && !t.target.appendChild) && (d('Target parameter is not valid, defaulting to "body"'),
                        t.target = "body");
                var e = void 0
                    , n = y()
                    , o = "string" == typeof t.target ? document.querySelector(t.target) : t.target;
                e = n && o && n.parentNode !== o.parentNode ? Z(t) : n || Z(t),
                    t.width && (e.style.width = "number" == typeof t.width ? t.width + "px" : t.width),
                    t.padding && (e.style.padding = "number" == typeof t.padding ? t.padding + "px" : t.padding),
                    t.background && (e.style.background = t.background);
                for (var r = window.getComputedStyle(e).getPropertyValue("background-color"), i = e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), a = 0; a < i.length; a++)
                    i[a].style.backgroundColor = r;
                var s = b()
                    , u = O()
                    , c = E();
                if (te(t),
                    J(t),
                    "string" == typeof t.backdrop ? b().style.background = t.backdrop : t.backdrop || R([document.documentElement, document.body], I["no-backdrop"]),
                    !t.backdrop && t.allowOutsideClick && d('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),
                    t.position in I ? R(s, I[t.position]) : (d('The "position" parameter is not valid, defaulting to "center"'),
                        R(s, I.center)),
                    t.grow && "string" == typeof t.grow) {
                    var l = "grow-" + t.grow;
                    l in I && R(s, I[l])
                }
                "function" == typeof t.animation && (t.animation = t.animation.call()),
                    t.showCloseButton ? (u.setAttribute("aria-label", t.closeButtonAriaLabel),
                        z(u)) : U(u),
                    e.className = I.popup,
                    t.toast ? (R([document.documentElement, document.body], I["toast-shown"]),
                        R(e, I.toast)) : R(e, I.modal),
                    t.customClass && R(e, t.customClass),
                    ee(t),
                    X(t),
                    G(t),
                    $(t),
                    Q(t.footer, c),
                    !0 === t.animation ? N(e, I.noanimation) : R(e, I.noanimation),
                    t.showLoaderOnConfirm && !t.preConfirm && d("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request")
            }(T),
                Object.freeze(T),
                ve.innerParams.set(this, T),
                oe.timeout && (oe.timeout.stop(),
                    delete oe.timeout),
                clearTimeout(oe.restoreFocusTimeout);
            var j = {
                popup: y(),
                container: b(),
                content: k(),
                actions: S(),
                confirmButton: B(),
                cancelButton: P(),
                closeButton: O(),
                validationError: v(I.validationerror),
                progressSteps: A()
            };
            ve.domCache.set(this, j);
            var _ = this.constructor;
            return new Promise(function (t, n) {
                var o = function (e) {
                    _.closePopup(T.onClose, T.onAfterClose),
                        T.useRejections ? t(e) : t({
                            value: e
                        })
                }
                    , u = function (e) {
                        _.closePopup(T.onClose, T.onAfterClose),
                            T.useRejections ? n(e) : t({
                                dismiss: e
                            })
                    }
                    , c = function (e) {
                        _.closePopup(T.onClose, T.onAfterClose),
                            n(e)
                    };
                T.timer && (oe.timeout = new we(function () {
                    u("timer"),
                        delete oe.timeout
                }
                    , T.timer)),
                    T.input && setTimeout(function () {
                        var e = L.getInput();
                        e && D(e)
                    }, 0);
                for (var l = function (t) {
                    if (T.showLoaderOnConfirm && _.showLoading(),
                        T.preConfirm) {
                        L.resetValidationError();
                        var e = Promise.resolve().then(function () {
                            return T.preConfirm(t, T.extraParams)
                        });
                        T.expectRejections ? e.then(function (e) {
                            return o(e || t)
                        }, function (e) {
                            L.hideLoading(),
                                e && L.showValidationError(e)
                        }) : e.then(function (e) {
                            F(j.validationError) || !1 === e ? L.hideLoading() : o(e || t)
                        }, function (e) {
                            return c(e)
                        })
                    } else
                        o(t)
                }, e = function (e) {
                    var t = e.target
                        , n = j.confirmButton
                        , o = j.cancelButton
                        , r = n && (n === t || n.contains(t))
                        , i = o && (o === t || o.contains(t));
                    switch (e.type) {
                        case "click":
                            if (r && _.isVisible())
                                if (L.disableButtons(),
                                    T.input) {
                                    var a = function () {
                                        var e = L.getInput();
                                        if (!e)
                                            return null;
                                        switch (T.input) {
                                            case "checkbox":
                                                return e.checked ? 1 : 0;
                                            case "radio":
                                                return e.checked ? e.value : null;
                                            case "file":
                                                return e.files.length ? e.files[0] : null;
                                            default:
                                                return T.inputAutoTrim ? e.value.trim() : e.value
                                        }
                                    }();
                                    if (T.inputValidator) {
                                        L.disableInput();
                                        var s = Promise.resolve().then(function () {
                                            return T.inputValidator(a, T.extraParams)
                                        });
                                        T.expectRejections ? s.then(function () {
                                            L.enableButtons(),
                                                L.enableInput(),
                                                l(a)
                                        }, function (e) {
                                            L.enableButtons(),
                                                L.enableInput(),
                                                e && L.showValidationError(e)
                                        }) : s.then(function (e) {
                                            L.enableButtons(),
                                                L.enableInput(),
                                                e ? L.showValidationError(e) : l(a)
                                        }, function (e) {
                                            return c(e)
                                        })
                                    } else
                                        l(a)
                                } else
                                    l(!0);
                            else
                                i && _.isVisible() && (L.disableButtons(),
                                    u(_.DismissReason.cancel))
                    }
                }, r = j.popup.querySelectorAll("button"), i = 0; i < r.length; i++)
                    r[i].onclick = e,
                        r[i].onmouseover = e,
                        r[i].onmouseout = e,
                        r[i].onmousedown = e;
                if (j.closeButton.onclick = function () {
                    u(_.DismissReason.close)
                }
                    ,
                    T.toast)
                    j.popup.onclick = function () {
                        T.showConfirmButton || T.showCancelButton || T.showCloseButton || T.input || u(_.DismissReason.close)
                    }
                        ;
                else {
                    var a = !1;
                    j.popup.onmousedown = function () {
                        j.container.onmouseup = function (e) {
                            j.container.onmouseup = void 0,
                                e.target === j.container && (a = !0)
                        }
                    }
                        ,
                        j.container.onmousedown = function () {
                            j.popup.onmouseup = function (e) {
                                j.popup.onmouseup = void 0,
                                    (e.target === j.popup || j.popup.contains(e.target)) && (a = !0)
                            }
                        }
                        ,
                        j.container.onclick = function (e) {
                            a ? a = !1 : e.target === j.container && M(T.allowOutsideClick) && u(_.DismissReason.backdrop)
                        }
                }
                T.reverseButtons ? j.confirmButton.parentNode.insertBefore(j.cancelButton, j.confirmButton) : j.confirmButton.parentNode.insertBefore(j.confirmButton, j.cancelButton);
                var s = function (e, t) {
                    for (var n = K(T.focusCancel), o = 0; o < n.length; o++)
                        return (e += t) === n.length ? e = 0 : -1 === e && (e = n.length - 1),
                            n[e].focus();
                    j.popup.focus()
                };
                oe.keydownHandlerAdded && (oe.keydownTarget.removeEventListener("keydown", oe.keydownHandler, {
                    capture: oe.keydownListenerCapture
                }),
                    oe.keydownHandlerAdded = !1),
                    T.toast || (oe.keydownHandler = function (e) {
                        return function (e, t) {
                            if (t.stopKeydownPropagation && e.stopPropagation(),
                                "Enter" !== e.key || e.isComposing)
                                if ("Tab" === e.key) {
                                    for (var n = e.target, o = K(t.focusCancel), r = -1, i = 0; i < o.length; i++)
                                        if (n === o[i]) {
                                            r = i;
                                            break
                                        }
                                    e.shiftKey ? s(r, -1) : s(r, 1),
                                        e.stopPropagation(),
                                        e.preventDefault()
                                } else
                                    -1 !== ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"].indexOf(e.key) ? document.activeElement === j.confirmButton && F(j.cancelButton) ? j.cancelButton.focus() : document.activeElement === j.cancelButton && F(j.confirmButton) && j.confirmButton.focus() : "Escape" !== e.key && "Esc" !== e.key || !0 !== M(t.allowEscapeKey) || u(_.DismissReason.esc);
                            else if (e.target && L.getInput() && e.target.outerHTML === L.getInput().outerHTML) {
                                if (-1 !== ["textarea", "file"].indexOf(t.input))
                                    return;
                                _.clickConfirm(),
                                    e.preventDefault()
                            }
                        }(e, T)
                    }
                        ,
                        oe.keydownTarget = T.keydownListenerCapture ? window : j.popup,
                        oe.keydownListenerCapture = T.keydownListenerCapture,
                        oe.keydownTarget.addEventListener("keydown", oe.keydownHandler, {
                            capture: oe.keydownListenerCapture
                        }),
                        oe.keydownHandlerAdded = !0),
                    L.enableButtons(),
                    L.hideLoading(),
                    L.resetValidationError(),
                    T.toast && (T.input || T.footer || T.showCloseButton) ? R(document.body, I["toast-column"]) : N(document.body, I["toast-column"]);
                for (var d = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], p = void 0, f = 0; f < d.length; f++) {
                    var m = I[d[f]]
                        , h = W(j.content, m);
                    if (p = L.getInput(d[f])) {
                        for (var g in p.attributes)
                            if (p.attributes.hasOwnProperty(g)) {
                                var b = p.attributes[g].name;
                                "type" !== b && "value" !== b && p.removeAttribute(b)
                            }
                        for (var v in T.inputAttributes)
                            p.setAttribute(v, T.inputAttributes[v])
                    }
                    h.className = m,
                        T.inputClass && R(h, T.inputClass),
                        U(h)
                }
                var y = void 0;
                switch (T.input) {
                    case "text":
                    case "email":
                    case "password":
                    case "number":
                    case "tel":
                    case "url":
                        (p = W(j.content, I.input)).value = T.inputValue,
                            p.placeholder = T.inputPlaceholder,
                            p.type = T.input,
                            z(p);
                        break;
                    case "file":
                        (p = W(j.content, I.file)).placeholder = T.inputPlaceholder,
                            p.type = T.input,
                            z(p);
                        break;
                    case "range":
                        var w = W(j.content, I.range)
                            , C = w.querySelector("input")
                            , k = w.querySelector("output");
                        C.value = T.inputValue,
                            C.type = T.input,
                            k.value = T.inputValue,
                            z(w);
                        break;
                    case "select":
                        var x = W(j.content, I.select);
                        if (x.innerHTML = "",
                            T.inputPlaceholder) {
                            var A = document.createElement("option");
                            A.innerHTML = T.inputPlaceholder,
                                A.value = "",
                                A.disabled = !0,
                                A.selected = !0,
                                x.appendChild(A)
                        }
                        y = function (e) {
                            e.forEach(function (e) {
                                var t = e[0]
                                    , n = e[1]
                                    , o = document.createElement("option");
                                o.value = t,
                                    o.innerHTML = n,
                                    T.inputValue.toString() === t.toString() && (o.selected = !0),
                                    x.appendChild(o)
                            }),
                                z(x),
                                x.focus()
                        }
                            ;
                        break;
                    case "radio":
                        var B = W(j.content, I.radio);
                        B.innerHTML = "",
                            y = function (e) {
                                e.forEach(function (e) {
                                    var t = e[0]
                                        , n = e[1]
                                        , o = document.createElement("input")
                                        , r = document.createElement("label");
                                    o.type = "radio",
                                        o.name = I.radio,
                                        o.value = t,
                                        T.inputValue.toString() === t.toString() && (o.checked = !0);
                                    var i = document.createElement("span");
                                    i.innerHTML = n,
                                        i.className = I.label,
                                        r.appendChild(o),
                                        r.appendChild(i),
                                        B.appendChild(r)
                                }),
                                    z(B);
                                var t = B.querySelectorAll("input");
                                t.length && t[0].focus()
                            }
                            ;
                        break;
                    case "checkbox":
                        var P = W(j.content, I.checkbox)
                            , S = L.getInput("checkbox");
                        S.type = "checkbox",
                            S.value = 1,
                            S.id = I.checkbox,
                            S.checked = Boolean(T.inputValue),
                            P.querySelector("span").innerHTML = T.inputPlaceholder,
                            z(P);
                        break;
                    case "textarea":
                        var E = W(j.content, I.textarea);
                        E.value = T.inputValue,
                            E.placeholder = T.inputPlaceholder,
                            z(E);
                        break;
                    case null:
                        break;
                    default:
                        V('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + T.input + '"')
                }
                if ("select" === T.input || "radio" === T.input) {
                    var O = function (e) {
                        return y((t = e,
                            n = [],
                            "undefined" != typeof Map && t instanceof Map ? t.forEach(function (e, t) {
                                n.push([t, e])
                            }) : Object.keys(t).forEach(function (e) {
                                n.push([e, t[e]])
                            }),
                            n));
                        var t, n
                    };
                    H(T.inputOptions) ? (_.showLoading(),
                        T.inputOptions.then(function (e) {
                            L.hideLoading(),
                                O(e)
                        })) : "object" === q(T.inputOptions) ? O(T.inputOptions) : V("Unexpected type of inputOptions! Expected object, Map or Promise, got " + q(T.inputOptions))
                } else
                    -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(T.input) && H(T.inputValue) && (_.showLoading(),
                        U(p),
                        T.inputValue.then(function (e) {
                            p.value = "number" === T.input ? parseFloat(e) || 0 : e + "",
                                z(p),
                                p.focus(),
                                L.hideLoading()
                        }).catch(function (e) {
                            V("Error in inputValue promise: " + e),
                                p.value = "",
                                z(p),
                                p.focus(),
                                L.hideLoading()
                        }));
                ke(T),
                    T.toast || (M(T.allowEnterKey) ? T.focusCancel && F(j.cancelButton) ? j.cancelButton.focus() : T.focusConfirm && F(j.confirmButton) ? j.confirmButton.focus() : s(-1, 1) : document.activeElement && document.activeElement.blur()),
                    j.container.scrollTop = 0
            }
            )
        }
    })
        , Ae = void 0;
    function Be() {
        if ("undefined" != typeof window) {
            "undefined" == typeof Promise && V("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)");
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            if (void 0 === t[0])
                return V("At least 1 argument is expected!"),
                    !1;
            Ae = this;
            var o = Object.freeze(this.constructor.argsToParams(t));
            Object.defineProperties(this, {
                params: {
                    value: o,
                    writable: !1,
                    enumerable: !0
                }
            });
            var r = this._main(this.params);
            ve.promise.set(this, r)
        }
    }
    Be.prototype.then = function (e, t) {
        return ve.promise.get(this).then(e, t)
    }
        ,
        Be.prototype.catch = function (e) {
            return ve.promise.get(this).catch(e)
        }
        ,
        Be.prototype.finally = function (e) {
            return ve.promise.get(this).finally(e)
        }
        ,
        r(Be.prototype, xe),
        r(Be, he),
        Object.keys(xe).forEach(function (t) {
            Be[t] = function () {
                var e;
                if (Ae)
                    return (e = Ae)[t].apply(e, arguments)
            }
        }),
        Be.DismissReason = e,
        Be.noop = function () { }
        ,
        Be.version = "7.26.11";
    var Pe, Se, Ee = ie((Pe = Be,
        Se = function (e) {
            function t() {
                return s(this, t),
                    u(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return a(t, Pe),
                o(t, [{
                    key: "_main",
                    value: function (e) {
                        return i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "_main", this).call(this, r({}, pe, e))
                    }
                }], [{
                    key: "setDefaults",
                    value: function (t) {
                        if (l(de),
                            !t || "object" !== (void 0 === t ? "undefined" : q(t)))
                            throw new TypeError("SweetAlert2: The argument for setDefaults() is required and has to be a object");
                        le(t),
                            Object.keys(t).forEach(function (e) {
                                Pe.isValidParameter(e) && (pe[e] = t[e])
                            })
                    }
                }, {
                    key: "resetDefaults",
                    value: function () {
                        l(de),
                            pe = {}
                    }
                }]),
                t
        }(),
        "undefined" != typeof window && "object" === q(window._swalDefaults) && Se.setDefaults(window._swalDefaults),
        Se));
    return Ee.default = Ee
}),
    "undefined" != typeof window && window.Sweetalert2 && (window.swal = window.sweetAlert = window.Swal = window.SweetAlert = window.Sweetalert2);
/*jQuery mmenu v5.7.2 @requires jQuery 1.7.0 or latermmenu.frebsite.nl Copyright (c) Fred Heusschen www.frebsite.nl License: CC-BY-NC-4.0 * http://creativecommons.org/licenses/by-nc/4.0/ */
!function (e) {
    function n() {
        e[t].glbl || (r = {
            $wndw: e(window),
            $docu: e(document),
            $html: e("html"),
            $body: e("body")
        },
            i = {},
            a = {},
            o = {},
            e.each([i, a, o], function (e, n) {
                n.add = function (e) {
                    e = e.split(" ");
                    for (var t = 0, s = e.length; s > t; t++)
                        n[e[t]] = n.mm(e[t])
                }
            }),
            i.mm = function (e) {
                return "mm-" + e
            }
            ,
            i.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"),
            i.umm = function (e) {
                return "mm-" == e.slice(0, 3) && (e = e.slice(3)),
                    e
            }
            ,
            a.mm = function (e) {
                return "mm-" + e
            }
            ,
            a.add("parent child"),
            o.mm = function (e) {
                return e + ".mm"
            }
            ,
            o.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"),
            e[t]._c = i,
            e[t]._d = a,
            e[t]._e = o,
            e[t].glbl = r)
    }
    var t = "mmenu"
        , s = "5.7.2";
    if (!(e[t] && e[t].version > s)) {
        e[t] = function (e, n, t) {
            this.$menu = e,
                this._api = ["bind", "initPanels", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"],
                this.opts = n,
                this.conf = t,
                this.vars = {},
                this.cbck = {},
                "function" == typeof this.___deprecated && this.___deprecated(),
                this._initMenu(),
                this._initAnchors();
            var s = this.$pnls.children();
            return this._initAddons(),
                this.initPanels(s),
                "function" == typeof this.___debug && this.___debug(),
                this
        }
            ,
            e[t].version = s,
            e[t].addons = {},
            e[t].uniqueId = 0,
            e[t].defaults = {
                extensions: [],
                initMenu: function () { },
                initPanels: function () { },
                navbar: {
                    add: !0,
                    title: "Menu",
                    titleLink: "panel"
                },
                onClick: {
                    setSelected: !0
                },
                slidingSubmenus: !0
            },
            e[t].configuration = {
                classNames: {
                    divider: "Divider",
                    inset: "Inset",
                    panel: "Panel",
                    selected: "Selected",
                    spacer: "Spacer",
                    vertical: "Vertical"
                },
                clone: !1,
                openingInterval: 25,
                panelNodetype: "ul, ol, div",
                transitionDuration: 400
            },
            e[t].prototype = {
                init: function (e) {
                    this.initPanels(e)
                },
                initPanels: function (e) {
                    e = e.not("." + i.nopanel),
                        e = this._initPanels(e),
                        this.opts.initPanels.call(this, e),
                        this.trigger("initPanels", e),
                        this.trigger("update")
                },
                update: function () {
                    this.trigger("update")
                },
                setSelected: function (e) {
                    this.$menu.find("." + i.listview).children().removeClass(i.selected),
                        e.addClass(i.selected),
                        this.trigger("setSelected", e)
                },
                openPanel: function (n) {
                    var s = n.parent()
                        , a = this;
                    if (s.hasClass(i.vertical)) {
                        var o = s.parents("." + i.subopened);
                        if (o.length)
                            return void this.openPanel(o.first());
                        s.addClass(i.opened),
                            this.trigger("openPanel", n),
                            this.trigger("openingPanel", n),
                            this.trigger("openedPanel", n)
                    } else {
                        if (n.hasClass(i.current))
                            return;
                        var r = this.$pnls.children("." + i.panel)
                            , l = r.filter("." + i.current);
                        r.removeClass(i.highest).removeClass(i.current).not(n).not(l).not("." + i.vertical).addClass(i.hidden),
                            e[t].support.csstransitions || l.addClass(i.hidden),
                            n.hasClass(i.opened) ? n.nextAll("." + i.opened).addClass(i.highest).removeClass(i.opened).removeClass(i.subopened) : (n.addClass(i.highest),
                                l.addClass(i.subopened)),
                            n.removeClass(i.hidden).addClass(i.current),
                            a.trigger("openPanel", n),
                            setTimeout(function () {
                                n.removeClass(i.subopened).addClass(i.opened),
                                    a.trigger("openingPanel", n),
                                    a.__transitionend(n, function () {
                                        a.trigger("openedPanel", n)
                                    }, a.conf.transitionDuration)
                            }, this.conf.openingInterval)
                    }
                },
                closePanel: function (e) {
                    var n = e.parent();
                    n.hasClass(i.vertical) && (n.removeClass(i.opened),
                        this.trigger("closePanel", e),
                        this.trigger("closingPanel", e),
                        this.trigger("closedPanel", e))
                },
                closeAllPanels: function () {
                    this.$menu.find("." + i.listview).children().removeClass(i.selected).filter("." + i.vertical).removeClass(i.opened);
                    var e = this.$pnls.children("." + i.panel)
                        , n = e.first();
                    this.$pnls.children("." + i.panel).not(n).removeClass(i.subopened).removeClass(i.opened).removeClass(i.current).removeClass(i.highest).addClass(i.hidden),
                        this.openPanel(n)
                },
                togglePanel: function (e) {
                    var n = e.parent();
                    n.hasClass(i.vertical) && this[n.hasClass(i.opened) ? "closePanel" : "openPanel"](e)
                },
                getInstance: function () {
                    return this
                },
                bind: function (e, n) {
                    e = "init" == e ? "initPanels" : e,
                        this.cbck[e] = this.cbck[e] || [],
                        this.cbck[e].push(n)
                },
                trigger: function () {
                    var e = this
                        , n = Array.prototype.slice.call(arguments)
                        , t = n.shift();
                    if (t = "init" == t ? "initPanels" : t,
                        this.cbck[t])
                        for (var s = 0, i = this.cbck[t].length; i > s; s++)
                            this.cbck[t][s].apply(e, n)
                },
                _initMenu: function () {
                    this.conf.clone && (this.$orig = this.$menu,
                        this.$menu = this.$orig.clone(!0),
                        this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function () {
                            e(this).attr("id", i.mm(e(this).attr("id")))
                        })),
                        this.opts.initMenu.call(this, this.$menu, this.$orig),
                        this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()),
                        this.$pnls = e('<div class="' + i.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu),
                        this.$menu.parent().addClass(i.wrapper);
                    var n = [i.menu];
                    this.opts.slidingSubmenus || n.push(i.vertical),
                        this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "",
                        this.opts.extensions && n.push(this.opts.extensions),
                        this.$menu.addClass(n.join(" "))
                },
                _initPanels: function (n) {
                    var t = this
                        , s = this.__findAddBack(n, "ul, ol");
                    this.__refactorClass(s, this.conf.classNames.inset, "inset").addClass(i.nolistview + " " + i.nopanel),
                        s.not("." + i.nolistview).addClass(i.listview);
                    var o = this.__findAddBack(n, "." + i.listview).children();
                    this.__refactorClass(o, this.conf.classNames.selected, "selected"),
                        this.__refactorClass(o, this.conf.classNames.divider, "divider"),
                        this.__refactorClass(o, this.conf.classNames.spacer, "spacer"),
                        this.__refactorClass(this.__findAddBack(n, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
                    var r = e()
                        , l = n.add(n.find("." + i.panel)).add(this.__findAddBack(n, "." + i.listview).children().children(this.conf.panelNodetype)).not("." + i.nopanel);
                    this.__refactorClass(l, this.conf.classNames.vertical, "vertical"),
                        this.opts.slidingSubmenus || l.addClass(i.vertical),
                        l.each(function () {
                            var n = e(this)
                                , s = n;
                            n.is("ul, ol") ? (n.wrap('<div class="' + i.panel + '" />'),
                                s = n.parent()) : s.addClass(i.panel);
                            var a = n.attr("id");
                            n.removeAttr("id"),
                                s.attr("id", a || t.__getUniqueId()),
                                n.hasClass(i.vertical) && (n.removeClass(t.conf.classNames.vertical),
                                    s.add(s.parent()).addClass(i.vertical)),
                                r = r.add(s)
                        });
                    var d = e("." + i.panel, this.$menu);
                    r.each(function (n) {
                        var s, o, r = e(this), l = r.parent(), d = l.children("a, span").first();
                        if (l.is("." + i.panels) || (l.data(a.child, r),
                            r.data(a.parent, l)),
                            l.children("." + i.next).length || l.parent().is("." + i.listview) && (s = r.attr("id"),
                                o = e('<a class="' + i.next + '" href="#' + s + '" data-target="#' + s + '" />').insertBefore(d),
                                d.is("span") && o.addClass(i.fullsubopen)),
                            !r.children("." + i.navbar).length && !l.hasClass(i.vertical)) {
                            l.parent().is("." + i.listview) ? l = l.closest("." + i.panel) : (d = l.closest("." + i.panel).find('a[href="#' + r.attr("id") + '"]').first(),
                                l = d.closest("." + i.panel));
                            var c = !1
                                , h = e('<div class="' + i.navbar + '" />');
                            if (t.opts.navbar.add && r.addClass(i.hasnavbar),
                                l.length) {
                                switch (s = l.attr("id"),
                                t.opts.navbar.titleLink) {
                                    case "anchor":
                                        c = d.attr("href");
                                        break;
                                    case "panel":
                                    case "parent":
                                        c = "#" + s;
                                        break;
                                    default:
                                        c = !1
                                }
                                h.append('<a class="' + i.btn + " " + i.prev + '" href="#' + s + '" data-target="#' + s + '" />').append(e('<a class="' + i.title + '"' + (c ? ' href="' + c + '"' : "") + " />").text(d.text())).prependTo(r)
                            } else
                                t.opts.navbar.title && h.append('<a class="' + i.title + '">' + t.opts.navbar.title + "</a>").prependTo(r)
                        }
                    });
                    var c = this.__findAddBack(n, "." + i.listview).children("." + i.selected).removeClass(i.selected).last().addClass(i.selected);
                    c.add(c.parentsUntil("." + i.menu, "li")).filter("." + i.vertical).addClass(i.opened).end().each(function () {
                        e(this).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).addClass(i.subopened)
                    }),
                        c.children("." + i.panel).not("." + i.vertical).addClass(i.opened).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).addClass(i.subopened);
                    var h = d.filter("." + i.opened);
                    return h.length || (h = r.first()),
                        h.addClass(i.opened).last().addClass(i.current),
                        r.not("." + i.vertical).not(h.last()).addClass(i.hidden).end().filter(function () {
                            return !e(this).parent().hasClass(i.panels)
                        }).appendTo(this.$pnls),
                        r
                },
                _initAnchors: function () {
                    var n = this;
                    r.$body.on(o.click + "-oncanvas", "a[href]", function (s) {
                        var a = e(this)
                            , o = !1
                            , r = n.$menu.find(a).length;
                        for (var l in e[t].addons)
                            if (e[t].addons[l].clickAnchor.call(n, a, r)) {
                                o = !0;
                                break
                            }
                        var d = a.attr("href");
                        if (!o && r && d.length > 1 && "#" == d.slice(0, 1))
                            try {
                                var c = e(d, n.$menu);
                                c.is("." + i.panel) && (o = !0,
                                    n[a.parent().hasClass(i.vertical) ? "togglePanel" : "openPanel"](c))
                            } catch (h) { }
                        if (o && s.preventDefault(),
                            !o && r && a.is("." + i.listview + " > li > a") && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
                            n.__valueOrFn(n.opts.onClick.setSelected, a) && n.setSelected(e(s.target).parent());
                            var u = n.__valueOrFn(n.opts.onClick.preventDefault, a, "#" == d.slice(0, 1));
                            u && s.preventDefault(),
                                n.__valueOrFn(n.opts.onClick.close, a, u) && n.close()
                        }
                    })
                },
                _initAddons: function () {
                    var n;
                    for (n in e[t].addons)
                        e[t].addons[n].add.call(this),
                            e[t].addons[n].add = function () { }
                            ;
                    for (n in e[t].addons)
                        e[t].addons[n].setup.call(this)
                },
                _getOriginalMenuId: function () {
                    var e = this.$menu.attr("id");
                    return e && e.length && this.conf.clone && (e = i.umm(e)),
                        e
                },
                __api: function () {
                    var n = this
                        , t = {};
                    return e.each(this._api, function (e) {
                        var s = this;
                        t[s] = function () {
                            var e = n[s].apply(n, arguments);
                            return "undefined" == typeof e ? t : e
                        }
                    }),
                        t
                },
                __valueOrFn: function (e, n, t) {
                    return "function" == typeof e ? e.call(n[0]) : "undefined" == typeof e && "undefined" != typeof t ? t : e
                },
                __refactorClass: function (e, n, t) {
                    return e.filter("." + n).removeClass(n).addClass(i[t])
                },
                __findAddBack: function (e, n) {
                    return e.find(n).add(e.filter(n))
                },
                __filterListItems: function (e) {
                    return e.not("." + i.divider).not("." + i.hidden)
                },
                __transitionend: function (n, t, s) {
                    var i = !1
                        , a = function (s) {
                            if ("undefined" != typeof s) {
                                if (!e(s.target).is(n))
                                    return !1;
                                n.unbind(o.transitionend),
                                    n.unbind(o.webkitTransitionEnd)
                            }
                            i || t.call(n[0]),
                                i = !0
                        };
                    n.on(o.transitionend, a),
                        n.on(o.webkitTransitionEnd, a),
                        setTimeout(a, 1.1 * s)
                },
                __getUniqueId: function () {
                    return i.mm(e[t].uniqueId++)
                }
            },
            e.fn[t] = function (s, i) {
                return n(),
                    s = e.extend(!0, {}, e[t].defaults, s),
                    i = e.extend(!0, {}, e[t].configuration, i),
                    this.each(function () {
                        var n = e(this);
                        if (!n.data(t)) {
                            var a = new e[t](n, s, i);
                            a.$menu.data(t, a.__api())
                        }
                    })
            }
            ,
            e[t].support = {
                touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
                csstransitions: function () {
                    if ("undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransitions)
                        return Modernizr.csstransitions;
                    var e = document.body || document.documentElement
                        , n = e.style
                        , t = "transition";
                    if ("string" == typeof n[t])
                        return !0;
                    var s = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
                    t = t.charAt(0).toUpperCase() + t.substr(1);
                    for (var i = 0; i < s.length; i++)
                        if ("string" == typeof n[s[i] + t])
                            return !0;
                    return !1
                }(),
                csstransforms: function () {
                    return "undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransforms ? Modernizr.csstransforms : !0
                }(),
                csstransforms3d: function () {
                    return "undefined" != typeof Modernizr && "undefined" != typeof Modernizr.csstransforms3d ? Modernizr.csstransforms3d : !0
                }()
            };
        var i, a, o, r
    }
}(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "offCanvas";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts[t]) {
                    var i = this.opts[t]
                        , a = this.conf[t];
                    o = e[n].glbl,
                        this._api = e.merge(this._api, ["open", "close", "setPage"]),
                        ("top" == i.position || "bottom" == i.position) && (i.zposition = "front"),
                        "string" != typeof a.pageSelector && (a.pageSelector = "> " + a.pageNodetype),
                        o.$allMenus = (o.$allMenus || e()).add(this.$menu),
                        this.vars.opened = !1;
                    var r = [s.offcanvas];
                    "left" != i.position && r.push(s.mm(i.position)),
                        "back" != i.zposition && r.push(s.mm(i.zposition)),
                        this.$menu.addClass(r.join(" ")).parent().removeClass(s.wrapper),
                        e[n].support.csstransforms || this.$menu.addClass(s["no-csstransforms"]),
                        e[n].support.csstransforms3d || this.$menu.addClass(s["no-csstransforms3d"]),
                        this.setPage(o.$page),
                        this._initBlocker(),
                        this["_initWindow_" + t](),
                        this.$menu[a.menuInjectMethod + "To"](a.menuWrapperSelector);
                    var l = window.location.hash;
                    if (l) {
                        var d = this._getOriginalMenuId();
                        d && d == l.slice(1) && this.open()
                    }
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"),
                    i.add("style"),
                    a.add("resize")
            },
            clickAnchor: function (e, n) {
                if (!this.opts[t])
                    return !1;
                var s = this._getOriginalMenuId();
                if (s && e.is('[href="#' + s + '"]'))
                    return this.open(),
                        !0;
                if (o.$page)
                    return s = o.$page.first().attr("id"),
                        s && e.is('[href="#' + s + '"]') ? (this.close(),
                            !0) : !1
            }
        },
            e[n].defaults[t] = {
                position: "left",
                zposition: "back",
                blockUI: !0,
                moveBackground: !0
            },
            e[n].configuration[t] = {
                pageNodetype: "div",
                pageSelector: null,
                noPageSelector: [],
                wrapPageIfNeeded: !0,
                menuWrapperSelector: "body",
                menuInjectMethod: "prepend"
            },
            e[n].prototype.open = function () {
                if (!this.vars.opened) {
                    var e = this;
                    this._openSetup(),
                        setTimeout(function () {
                            e._openFinish()
                        }, this.conf.openingInterval),
                        this.trigger("open")
                }
            }
            ,
            e[n].prototype._openSetup = function () {
                var n = this
                    , r = this.opts[t];
                this.closeAllOthers(),
                    o.$page.each(function () {
                        e(this).data(i.style, e(this).attr("style") || "")
                    }),
                    o.$wndw.trigger(a.resize + "-" + t, [!0]);
                var l = [s.opened];
                r.blockUI && l.push(s.blocking),
                    "modal" == r.blockUI && l.push(s.modal),
                    r.moveBackground && l.push(s.background),
                    "left" != r.position && l.push(s.mm(this.opts[t].position)),
                    "back" != r.zposition && l.push(s.mm(this.opts[t].zposition)),
                    this.opts.extensions && l.push(this.opts.extensions),
                    o.$html.addClass(l.join(" ")),
                    setTimeout(function () {
                        n.vars.opened = !0
                    }, this.conf.openingInterval),
                    this.$menu.addClass(s.current + " " + s.opened)
            }
            ,
            e[n].prototype._openFinish = function () {
                var e = this;
                this.__transitionend(o.$page.first(), function () {
                    e.trigger("opened")
                }, this.conf.transitionDuration),
                    o.$html.addClass(s.opening),
                    this.trigger("opening")
            }
            ,
            e[n].prototype.close = function () {
                if (this.vars.opened) {
                    var n = this;
                    this.__transitionend(o.$page.first(), function () {
                        n.$menu.removeClass(s.current).removeClass(s.opened),
                            o.$html.removeClass(s.opened).removeClass(s.blocking).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(n.opts[t].position)).removeClass(s.mm(n.opts[t].zposition)),
                            n.opts.extensions && o.$html.removeClass(n.opts.extensions),
                            o.$page.each(function () {
                                e(this).attr("style", e(this).data(i.style))
                            }),
                            n.vars.opened = !1,
                            n.trigger("closed")
                    }, this.conf.transitionDuration),
                        o.$html.removeClass(s.opening),
                        this.trigger("close"),
                        this.trigger("closing")
                }
            }
            ,
            e[n].prototype.closeAllOthers = function () {
                o.$allMenus.not(this.$menu).each(function () {
                    var t = e(this).data(n);
                    t && t.close && t.close()
                })
            }
            ,
            e[n].prototype.setPage = function (n) {
                var i = this
                    , a = this.conf[t];
                n && n.length || (n = o.$body.find(a.pageSelector),
                    a.noPageSelector.length && (n = n.not(a.noPageSelector.join(", "))),
                    n.length > 1 && a.wrapPageIfNeeded && (n = n.wrapAll("<" + this.conf[t].pageNodetype + " />").parent())),
                    n.each(function () {
                        e(this).attr("id", e(this).attr("id") || i.__getUniqueId())
                    }),
                    n.addClass(s.page + " " + s.slideout),
                    o.$page = n,
                    this.trigger("setPage", n)
            }
            ,
            e[n].prototype["_initWindow_" + t] = function () {
                o.$wndw.off(a.keydown + "-" + t).on(a.keydown + "-" + t, function (e) {
                    return o.$html.hasClass(s.opened) && 9 == e.keyCode ? (e.preventDefault(),
                        !1) : void 0
                });
                var e = 0;
                o.$wndw.off(a.resize + "-" + t).on(a.resize + "-" + t, function (n, t) {
                    if (1 == o.$page.length && (t || o.$html.hasClass(s.opened))) {
                        var i = o.$wndw.height();
                        (t || i != e) && (e = i,
                            o.$page.css("minHeight", i))
                    }
                })
            }
            ,
            e[n].prototype._initBlocker = function () {
                var n = this;
                this.opts[t].blockUI && (o.$blck || (o.$blck = e('<div id="' + s.blocker + '" class="' + s.slideout + '" />')),
                    o.$blck.appendTo(o.$body).off(a.touchstart + "-" + t + " " + a.touchmove + "-" + t).on(a.touchstart + "-" + t + " " + a.touchmove + "-" + t, function (e) {
                        e.preventDefault(),
                            e.stopPropagation(),
                            o.$blck.trigger(a.mousedown + "-" + t)
                    }).off(a.mousedown + "-" + t).on(a.mousedown + "-" + t, function (e) {
                        e.preventDefault(),
                            o.$html.hasClass(s.modal) || (n.closeAllOthers(),
                                n.close())
                    }))
            }
            ;
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "scrollBugFix";
        e[n].addons[t] = {
            setup: function () {
                var i = this
                    , r = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    e[n].support.touch && this.opts.offCanvas && this.opts.offCanvas.blockUI && ("boolean" == typeof r && (r = {
                        fix: r
                    }),
                        "object" != typeof r && (r = {}),
                        r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                        r.fix)) {
                    var l = this.$menu.attr("id")
                        , d = !1;
                    this.bind("opening", function () {
                        this.$pnls.children("." + s.current).scrollTop(0)
                    }),
                        o.$docu.on(a.touchmove, function (e) {
                            i.vars.opened && e.preventDefault()
                        }),
                        o.$body.on(a.touchstart, "#" + l + "> ." + s.panels + "> ." + s.current, function (e) {
                            i.vars.opened && (d || (d = !0,
                                0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1),
                                d = !1))
                        }).on(a.touchmove, "#" + l + "> ." + s.panels + "> ." + s.current, function (n) {
                            i.vars.opened && e(this)[0].scrollHeight > e(this).innerHeight() && n.stopPropagation()
                        }),
                        o.$wndw.on(a.orientationchange, function () {
                            i.$pnls.children("." + s.current).scrollTop(0).css({
                                "-webkit-overflow-scrolling": "auto"
                            }).css({
                                "-webkit-overflow-scrolling": "touch"
                            })
                        })
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                fix: !0
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "autoHeight";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var i = this.opts[t];
                    this.conf[t];
                    if (o = e[n].glbl,
                        "boolean" == typeof i && i && (i = {
                            height: "auto"
                        }),
                        "string" == typeof i && (i = {
                            height: i
                        }),
                        "object" != typeof i && (i = {}),
                        i = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], i),
                        "auto" == i.height || "highest" == i.height) {
                        this.$menu.addClass(s.autoheight);
                        var a = function (n) {
                            if (this.vars.opened) {
                                var t = parseInt(this.$pnls.css("top"), 10) || 0
                                    , a = parseInt(this.$pnls.css("bottom"), 10) || 0
                                    , o = 0;
                                this.$menu.addClass(s.measureheight),
                                    "auto" == i.height ? (n = n || this.$pnls.children("." + s.current),
                                        n.is("." + s.vertical) && (n = n.parents("." + s.panel).not("." + s.vertical).first()),
                                        o = n.outerHeight()) : "highest" == i.height && this.$pnls.children().each(function () {
                                            var n = e(this);
                                            n.is("." + s.vertical) && (n = n.parents("." + s.panel).not("." + s.vertical).first()),
                                                o = Math.max(o, n.outerHeight())
                                        }),
                                    this.$menu.height(o + t + a).removeClass(s.measureheight)
                            }
                        };
                        this.bind("opening", a),
                            "highest" == i.height && this.bind("initPanels", a),
                            "auto" == i.height && (this.bind("update", a),
                                this.bind("openPanel", a),
                                this.bind("closePanel", a))
                    }
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("autoheight measureheight"),
                    a.add("resize")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                height: "default"
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "backButton";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var i = this
                        , a = this.opts[t];
                    this.conf[t];
                    if (o = e[n].glbl,
                        "boolean" == typeof a && (a = {
                            close: a
                        }),
                        "object" != typeof a && (a = {}),
                        a = e.extend(!0, {}, e[n].defaults[t], a),
                        a.close) {
                        var r = "#" + i.$menu.attr("id");
                        this.bind("opened", function (e) {
                            location.hash != r && history.pushState(null, document.title, r)
                        }),
                            e(window).on("popstate", function (e) {
                                o.$html.hasClass(s.opened) ? (e.stopPropagation(),
                                    i.close()) : location.hash == r && (e.stopPropagation(),
                                        i.open())
                            })
                    }
                }
            },
            add: function () {
                return window.history && window.history.pushState ? (s = e[n]._c,
                    i = e[n]._d,
                    void (a = e[n]._e)) : void (e[n].addons[t].setup = function () { }
                    )
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                close: !1
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "columns";
        e[n].addons[t] = {
            setup: function () {
                var i = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof i && (i = {
                        add: i
                    }),
                    "number" == typeof i && (i = {
                        add: !0,
                        visible: i
                    }),
                    "object" != typeof i && (i = {}),
                    "number" == typeof i.visible && (i.visible = {
                        min: i.visible,
                        max: i.visible
                    }),
                    i = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], i),
                    i.add) {
                    i.visible.min = Math.max(1, Math.min(6, i.visible.min)),
                        i.visible.max = Math.max(i.visible.min, Math.min(6, i.visible.max)),
                        this.$menu.addClass(s.columns);
                    for (var a = this.opts.offCanvas ? this.$menu.add(o.$html) : this.$menu, r = [], l = 0; l <= i.visible.max; l++)
                        r.push(s.columns + "-" + l);
                    r = r.join(" ");
                    var d = function (e) {
                        u.call(this, this.$pnls.children("." + s.current))
                    }
                        , c = function () {
                            var e = this.$pnls.children("." + s.panel).filter("." + s.opened).length;
                            e = Math.min(i.visible.max, Math.max(i.visible.min, e)),
                                a.removeClass(r).addClass(s.columns + "-" + e)
                        }
                        , h = function () {
                            this.opts.offCanvas && o.$html.removeClass(r)
                        }
                        , u = function (n) {
                            this.$pnls.children("." + s.panel).removeClass(r).filter("." + s.subopened).removeClass(s.hidden).add(n).slice(-i.visible.max).each(function (n) {
                                e(this).addClass(s.columns + "-" + n)
                            })
                        };
                    this.bind("open", c),
                        this.bind("close", h),
                        this.bind("initPanels", d),
                        this.bind("openPanel", u),
                        this.bind("openingPanel", c),
                        this.bind("openedPanel", c),
                        this.opts.offCanvas || c.call(this)
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("columns")
            },
            clickAnchor: function (n, i) {
                if (!this.opts[t].add)
                    return !1;
                if (i) {
                    var a = n.attr("href");
                    if (a.length > 1 && "#" == a.slice(0, 1))
                        try {
                            var o = e(a, this.$menu);
                            if (o.is("." + s.panel))
                                for (var r = parseInt(n.closest("." + s.panel).attr("class").split(s.columns + "-")[1].split(" ")[0], 10) + 1; r !== !1;) {
                                    var l = this.$pnls.children("." + s.columns + "-" + r);
                                    if (!l.length) {
                                        r = !1;
                                        break
                                    }
                                    r++,
                                        l.removeClass(s.subopened).removeClass(s.opened).removeClass(s.current).removeClass(s.highest).addClass(s.hidden)
                                }
                        } catch (d) { }
                }
            }
        },
            e[n].defaults[t] = {
                add: !1,
                visible: {
                    min: 1,
                    max: 3
                }
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "counters";
        e[n].addons[t] = {
            setup: function () {
                var a = this
                    , r = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        add: r,
                        update: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    this.bind("initPanels", function (n) {
                        this.__refactorClass(e("em", n), this.conf.classNames[t].counter, "counter")
                    }),
                    r.add && this.bind("initPanels", function (n) {
                        var t;
                        switch (r.addTo) {
                            case "panels":
                                t = n;
                                break;
                            default:
                                t = n.filter(r.addTo)
                        }
                        t.each(function () {
                            var n = e(this).data(i.parent);
                            n && (n.children("em." + s.counter).length || n.prepend(e('<em class="' + s.counter + '" />')))
                        })
                    }),
                    r.update && this.bind("update", function () {
                        this.$pnls.find("." + s.panel).each(function () {
                            var n = e(this)
                                , t = n.data(i.parent);
                            if (t) {
                                var o = t.children("em." + s.counter);
                                o.length && (n = n.children("." + s.listview),
                                    n.length && o.html(a.__filterListItems(n.children()).length))
                            }
                        })
                    })
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("counter search noresultsmsg")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                add: !1,
                addTo: "panels",
                update: !1
            },
            e[n].configuration.classNames[t] = {
                counter: "Counter"
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "dividers";
        e[n].addons[t] = {
            setup: function () {
                var i = this
                    , r = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        add: r,
                        fixed: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    this.bind("initPanels", function (n) {
                        this.__refactorClass(e("li", this.$menu), this.conf.classNames[t].collapsed, "collapsed")
                    }),
                    r.add && this.bind("initPanels", function (n) {
                        var t;
                        switch (r.addTo) {
                            case "panels":
                                t = n;
                                break;
                            default:
                                t = n.filter(r.addTo)
                        }
                        e("." + s.divider, t).remove(),
                            t.find("." + s.listview).not("." + s.vertical).each(function () {
                                var n = "";
                                i.__filterListItems(e(this).children()).each(function () {
                                    var t = e.trim(e(this).children("a, span").text()).slice(0, 1).toLowerCase();
                                    t != n && t.length && (n = t,
                                        e('<li class="' + s.divider + '">' + t + "</li>").insertBefore(this))
                                })
                            })
                    }),
                    r.collapse && this.bind("initPanels", function (n) {
                        e("." + s.divider, n).each(function () {
                            var n = e(this)
                                , t = n.nextUntil("." + s.divider, "." + s.collapsed);
                            t.length && (n.children("." + s.subopen).length || (n.wrapInner("<span />"),
                                n.prepend('<a href="#" class="' + s.subopen + " " + s.fullsubopen + '" />')))
                        })
                    }),
                    r.fixed) {
                    var l = function (n) {
                        n = n || this.$pnls.children("." + s.current);
                        var t = n.find("." + s.divider).not("." + s.hidden);
                        if (t.length) {
                            this.$menu.addClass(s.hasdividers);
                            var i = n.scrollTop() || 0
                                , a = "";
                            n.is(":visible") && n.find("." + s.divider).not("." + s.hidden).each(function () {
                                e(this).position().top + i < i + 1 && (a = e(this).text())
                            }),
                                this.$fixeddivider.text(a)
                        } else
                            this.$menu.removeClass(s.hasdividers)
                    };
                    this.$fixeddivider = e('<ul class="' + s.listview + " " + s.fixeddivider + '"><li class="' + s.divider + '"></li></ul>').prependTo(this.$pnls).children(),
                        this.bind("openPanel", l),
                        this.bind("update", l),
                        this.bind("initPanels", function (n) {
                            n.off(a.scroll + "-dividers " + a.touchmove + "-dividers").on(a.scroll + "-dividers " + a.touchmove + "-dividers", function (n) {
                                l.call(i, e(this))
                            })
                        })
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("collapsed uncollapsed fixeddivider hasdividers"),
                    a.add("scroll")
            },
            clickAnchor: function (e, n) {
                if (this.opts[t].collapse && n) {
                    var i = e.parent();
                    if (i.is("." + s.divider)) {
                        var a = i.nextUntil("." + s.divider, "." + s.collapsed);
                        return i.toggleClass(s.opened),
                            a[i.hasClass(s.opened) ? "addClass" : "removeClass"](s.uncollapsed),
                            !0
                    }
                }
                return !1
            }
        },
            e[n].defaults[t] = {
                add: !1,
                addTo: "panels",
                fixed: !1,
                collapse: !1
            },
            e[n].configuration.classNames[t] = {
                collapsed: "Collapsed"
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        function n(e, n, t) {
            return n > e && (e = n),
                e > t && (e = t),
                e
        }
        function t(t, s, i) {
            var r, l, d, c, h, u = this, p = {}, f = 0, v = !1, m = !1, g = 0, b = 0;
            switch (this.opts.offCanvas.position) {
                case "left":
                case "right":
                    p.events = "panleft panright",
                        p.typeLower = "x",
                        p.typeUpper = "X",
                        m = "width";
                    break;
                case "top":
                case "bottom":
                    p.events = "panup pandown",
                        p.typeLower = "y",
                        p.typeUpper = "Y",
                        m = "height"
            }
            switch (this.opts.offCanvas.position) {
                case "right":
                case "bottom":
                    p.negative = !0,
                        c = function (e) {
                            e >= i.$wndw[m]() - t.maxStartPos && (f = 1)
                        }
                        ;
                    break;
                default:
                    p.negative = !1,
                        c = function (e) {
                            e <= t.maxStartPos && (f = 1)
                        }
            }
            switch (this.opts.offCanvas.position) {
                case "left":
                    p.open_dir = "right",
                        p.close_dir = "left";
                    break;
                case "right":
                    p.open_dir = "left",
                        p.close_dir = "right";
                    break;
                case "top":
                    p.open_dir = "down",
                        p.close_dir = "up";
                    break;
                case "bottom":
                    p.open_dir = "up",
                        p.close_dir = "down"
            }
            switch (this.opts.offCanvas.zposition) {
                case "front":
                    h = function () {
                        return this.$menu
                    }
                        ;
                    break;
                default:
                    h = function () {
                        return e("." + o.slideout)
                    }
            }
            var _ = this.__valueOrFn(t.node, this.$menu, i.$page);
            "string" == typeof _ && (_ = e(_));
            var C = new Hammer(_[0], this.opts[a].vendors.hammer);
            C.on("panstart", function (e) {
                c(e.center[p.typeLower]),
                    i.$slideOutNodes = h(),
                    v = p.open_dir
            }).on(p.events + " panend", function (e) {
                f > 0 && e.preventDefault()
            }).on(p.events, function (e) {
                if (r = e["delta" + p.typeUpper],
                    p.negative && (r = -r),
                    r != g && (v = r >= g ? p.open_dir : p.close_dir),
                    g = r,
                    g > t.threshold && 1 == f) {
                    if (i.$html.hasClass(o.opened))
                        return;
                    f = 2,
                        u._openSetup(),
                        u.trigger("opening"),
                        i.$html.addClass(o.dragging),
                        b = n(i.$wndw[m]() * s[m].perc, s[m].min, s[m].max)
                }
                2 == f && (l = n(g, 10, b) - ("front" == u.opts.offCanvas.zposition ? b : 0),
                    p.negative && (l = -l),
                    d = "translate" + p.typeUpper + "(" + l + "px )",
                    i.$slideOutNodes.css({
                        "-webkit-transform": "-webkit-" + d,
                        transform: d
                    }))
            }).on("panend", function (e) {
                2 == f && (i.$html.removeClass(o.dragging),
                    i.$slideOutNodes.css("transform", ""),
                    u[v == p.open_dir ? "_openFinish" : "close"]()),
                    f = 0
            })
        }
        function s(n, t, s, i) {
            var l = this;
            n.each(function () {
                var n = e(this)
                    , t = n.data(r.parent);
                if (t && (t = t.closest("." + o.panel),
                    t.length)) {
                    var s = new Hammer(n[0], l.opts[a].vendors.hammer);
                    s.on("panright", function (e) {
                        l.openPanel(t)
                    })
                }
            })
        }
        var i = "mmenu"
            , a = "drag";
        e[i].addons[a] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var n = this.opts[a]
                        , o = this.conf[a];
                    d = e[i].glbl,
                        "boolean" == typeof n && (n = {
                            menu: n,
                            panels: n
                        }),
                        "object" != typeof n && (n = {}),
                        "boolean" == typeof n.menu && (n.menu = {
                            open: n.menu
                        }),
                        "object" != typeof n.menu && (n.menu = {}),
                        "boolean" == typeof n.panels && (n.panels = {
                            close: n.panels
                        }),
                        "object" != typeof n.panels && (n.panels = {}),
                        n = this.opts[a] = e.extend(!0, {}, e[i].defaults[a], n),
                        n.menu.open && t.call(this, n.menu, o.menu, d),
                        n.panels.close && this.bind("initPanels", function (e) {
                            s.call(this, e, n.panels, o.panels, d)
                        })
                }
            },
            add: function () {
                return "function" != typeof Hammer || Hammer.VERSION < 2 ? void (e[i].addons[a].setup = function () { }
                ) : (o = e[i]._c,
                    r = e[i]._d,
                    l = e[i]._e,
                    void o.add("dragging"))
            },
            clickAnchor: function (e, n) { }
        },
            e[i].defaults[a] = {
                menu: {
                    open: !1,
                    maxStartPos: 100,
                    threshold: 50
                },
                panels: {
                    close: !1
                },
                vendors: {
                    hammer: {}
                }
            },
            e[i].configuration[a] = {
                menu: {
                    width: {
                        perc: .8,
                        min: 140,
                        max: 440
                    },
                    height: {
                        perc: .8,
                        min: 140,
                        max: 880
                    }
                },
                panels: {}
            };
        var o, r, l, d
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "dropdown";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var r = this
                        , l = this.opts[t]
                        , d = this.conf[t];
                    if (o = e[n].glbl,
                        "boolean" == typeof l && l && (l = {
                            drop: l
                        }),
                        "object" != typeof l && (l = {}),
                        "string" == typeof l.position && (l.position = {
                            of: l.position
                        }),
                        l = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], l),
                        l.drop) {
                        if ("string" != typeof l.position.of) {
                            var c = this.$menu.attr("id");
                            c && c.length && (this.conf.clone && (c = s.umm(c)),
                                l.position.of = '[href="#' + c + '"]')
                        }
                        if ("string" == typeof l.position.of) {
                            var h = e(l.position.of);
                            if (h.length) {
                                this.$menu.addClass(s.dropdown),
                                    l.tip && this.$menu.addClass(s.tip),
                                    l.event = l.event.split(" "),
                                    1 == l.event.length && (l.event[1] = l.event[0]),
                                    "hover" == l.event[0] && h.on(a.mouseenter + "-dropdown", function () {
                                        r.open()
                                    }),
                                    "hover" == l.event[1] && this.$menu.on(a.mouseleave + "-dropdown", function () {
                                        r.close()
                                    }),
                                    this.bind("opening", function () {
                                        this.$menu.data(i.style, this.$menu.attr("style") || ""),
                                            o.$html.addClass(s.dropdown)
                                    }),
                                    this.bind("closed", function () {
                                        this.$menu.attr("style", this.$menu.data(i.style)),
                                            o.$html.removeClass(s.dropdown)
                                    });
                                var u = function (i, a) {
                                    var r = a[0]
                                        , c = a[1]
                                        , u = "x" == i ? "scrollLeft" : "scrollTop"
                                        , p = "x" == i ? "outerWidth" : "outerHeight"
                                        , f = "x" == i ? "left" : "top"
                                        , v = "x" == i ? "right" : "bottom"
                                        , m = "x" == i ? "width" : "height"
                                        , g = "x" == i ? "maxWidth" : "maxHeight"
                                        , b = null
                                        , _ = o.$wndw[u]()
                                        , C = h.offset()[f] -= _
                                        , $ = C + h[p]()
                                        , y = o.$wndw[m]()
                                        , x = d.offset.button[i] + d.offset.viewport[i];
                                    if (l.position[i])
                                        switch (l.position[i]) {
                                            case "left":
                                            case "bottom":
                                                b = "after";
                                                break;
                                            case "right":
                                            case "top":
                                                b = "before"
                                        }
                                    null === b && (b = y / 2 > C + ($ - C) / 2 ? "after" : "before");
                                    var w, k;
                                    return "after" == b ? (w = "x" == i ? C : $,
                                        k = y - (w + x),
                                        r[f] = w + d.offset.button[i],
                                        r[v] = "auto",
                                        c.push(s["x" == i ? "tipleft" : "tiptop"])) : (w = "x" == i ? $ : C,
                                            k = w - x,
                                            r[v] = "calc( 100% - " + (w - d.offset.button[i]) + "px )",
                                            r[f] = "auto",
                                            c.push(s["x" == i ? "tipright" : "tipbottom"])),
                                        r[g] = Math.min(e[n].configuration[t][m].max, k),
                                        [r, c]
                                }
                                    , p = function (e) {
                                        if (this.vars.opened) {
                                            this.$menu.attr("style", this.$menu.data(i.style));
                                            var n = [{}, []];
                                            n = u.call(this, "y", n),
                                                n = u.call(this, "x", n),
                                                this.$menu.css(n[0]),
                                                l.tip && this.$menu.removeClass(s.tipleft + " " + s.tipright + " " + s.tiptop + " " + s.tipbottom).addClass(n[1].join(" "))
                                        }
                                    };
                                this.bind("opening", p),
                                    o.$wndw.on(a.resize + "-dropdown", function (e) {
                                        p.call(r)
                                    }),
                                    this.opts.offCanvas.blockUI || o.$wndw.on(a.scroll + "-dropdown", function (e) {
                                        p.call(r)
                                    })
                            }
                        }
                    }
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("dropdown tip tipleft tipright tiptop tipbottom"),
                    a.add("mouseenter mouseleave resize scroll")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                drop: !1,
                event: "click",
                position: {},
                tip: !0
            },
            e[n].configuration[t] = {
                offset: {
                    button: {
                        x: -10,
                        y: 10
                    },
                    viewport: {
                        x: 20,
                        y: 20
                    }
                },
                height: {
                    max: 880
                },
                width: {
                    max: 440
                }
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "fixedElements";
        e[n].addons[t] = {
            setup: function () {
                if (this.opts.offCanvas) {
                    var s = this.opts[t];
                    this.conf[t];
                    o = e[n].glbl,
                        s = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], s);
                    var i = function (e) {
                        var n = this.conf.classNames[t].fixed;
                        this.__refactorClass(e.find("." + n), n, "slideout").appendTo(o.$body)
                    };
                    i.call(this, o.$page),
                        this.bind("setPage", i)
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("fixed")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].configuration.classNames[t] = {
                fixed: "Fixed"
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "iconPanels";
        e[n].addons[t] = {
            setup: function () {
                var i = this
                    , a = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof a && (a = {
                        add: a
                    }),
                    "number" == typeof a && (a = {
                        add: !0,
                        visible: a
                    }),
                    "object" != typeof a && (a = {}),
                    a = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], a),
                    a.visible++,
                    a.add) {
                    this.$menu.addClass(s.iconpanel);
                    for (var r = [], l = 0; l <= a.visible; l++)
                        r.push(s.iconpanel + "-" + l);
                    r = r.join(" ");
                    var d = function (n) {
                        n.hasClass(s.vertical) || i.$pnls.children("." + s.panel).removeClass(r).filter("." + s.subopened).removeClass(s.hidden).add(n).not("." + s.vertical).slice(-a.visible).each(function (n) {
                            e(this).addClass(s.iconpanel + "-" + n)
                        })
                    };
                    this.bind("openPanel", d),
                        this.bind("initPanels", function (n) {
                            d.call(i, i.$pnls.children("." + s.current)),
                                n.not("." + s.vertical).each(function () {
                                    e(this).children("." + s.subblocker).length || e(this).prepend('<a href="#' + e(this).closest("." + s.panel).attr("id") + '" class="' + s.subblocker + '" />')
                                })
                        })
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("iconpanel subblocker")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                add: !1,
                visible: 3
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars";
        e[n].addons[t] = {
            setup: function () {
                var i = this
                    , a = this.opts[t]
                    , r = this.conf[t];
                if (o = e[n].glbl,
                    "undefined" != typeof a) {
                    a instanceof Array || (a = [a]);
                    var l = {};
                    e.each(a, function (o) {
                        var d = a[o];
                        "boolean" == typeof d && d && (d = {}),
                            "object" != typeof d && (d = {}),
                            "undefined" == typeof d.content && (d.content = ["prev", "title"]),
                            d.content instanceof Array || (d.content = [d.content]),
                            d = e.extend(!0, {}, i.opts.navbar, d);
                        var c = d.position
                            , h = d.height;
                        "number" != typeof h && (h = 1),
                            h = Math.min(4, Math.max(1, h)),
                            "bottom" != c && (c = "top"),
                            l[c] || (l[c] = 0),
                            l[c]++;
                        var u = e("<div />").addClass(s.navbar + " " + s.navbar + "-" + c + " " + s.navbar + "-" + c + "-" + l[c] + " " + s.navbar + "-size-" + h);
                        l[c] += h - 1;
                        for (var p = 0, f = 0, v = d.content.length; v > f; f++) {
                            var m = e[n].addons[t][d.content[f]] || !1;
                            m ? p += m.call(i, u, d, r) : (m = d.content[f],
                                m instanceof e || (m = e(d.content[f])),
                                u.append(m))
                        }
                        p += Math.ceil(u.children().not("." + s.btn).length / h),
                            p > 1 && u.addClass(s.navbar + "-content-" + p),
                            u.children("." + s.btn).length && u.addClass(s.hasbtns),
                            u.prependTo(i.$menu)
                    });
                    for (var d in l)
                        i.$menu.addClass(s.hasnavbar + "-" + d + "-" + l[d])
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("close hasbtns")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].configuration[t] = {
                breadcrumbSeparator: "/"
            },
            e[n].configuration.classNames[t] = {};
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , s = "breadcrumbs";
        e[n].addons[t][s] = function (t, s, i) {
            var a = e[n]._c
                , o = e[n]._d;
            a.add("breadcrumbs separator");
            var r = e('<span class="' + a.breadcrumbs + '" />').appendTo(t);
            this.bind("initPanels", function (n) {
                n.removeClass(a.hasnavbar).each(function () {
                    for (var n = [], t = e(this), s = e('<span class="' + a.breadcrumbs + '"></span>'), r = e(this).children().first(), l = !0; r && r.length;) {
                        r.is("." + a.panel) || (r = r.closest("." + a.panel));
                        var d = r.children("." + a.navbar).children("." + a.title).text();
                        n.unshift(l ? "<span>" + d + "</span>" : '<a href="#' + r.attr("id") + '">' + d + "</a>"),
                            l = !1,
                            r = r.data(o.parent)
                    }
                    s.append(n.join('<span class="' + a.separator + '">' + i.breadcrumbSeparator + "</span>")).appendTo(t.children("." + a.navbar))
                })
            });
            var l = function () {
                r.html(this.$pnls.children("." + a.current).children("." + a.navbar).children("." + a.breadcrumbs).html())
            };
            return this.bind("openPanel", l),
                this.bind("initPanels", l),
                0
        }
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , s = "close";
        e[n].addons[t][s] = function (t, s) {
            var i = e[n]._c
                , a = e[n].glbl
                , o = e('<a class="' + i.close + " " + i.btn + '" href="#" />').appendTo(t)
                , r = function (e) {
                    o.attr("href", "#" + e.attr("id"))
                };
            return r.call(this, a.$page),
                this.bind("setPage", r),
                -1
        }
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , s = "next";
        e[n].addons[t][s] = function (s, i) {
            var a, o, r = e[n]._c, l = e('<a class="' + r.next + " " + r.btn + '" href="#" />').appendTo(s), d = function (e) {
                e = e || this.$pnls.children("." + r.current);
                var n = e.find("." + this.conf.classNames[t].panelNext);
                a = n.attr("href"),
                    o = n.html(),
                    l[a ? "attr" : "removeAttr"]("href", a),
                    l[a || o ? "removeClass" : "addClass"](r.hidden),
                    l.html(o)
            };
            return this.bind("openPanel", d),
                this.bind("initPanels", function () {
                    d.call(this)
                }),
                -1
        }
            ,
            e[n].configuration.classNames[t].panelNext = "Next"
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , s = "prev";
        e[n].addons[t][s] = function (s, i) {
            var a = e[n]._c
                , o = e('<a class="' + a.prev + " " + a.btn + '" href="#" />').appendTo(s);
            this.bind("initPanels", function (e) {
                e.removeClass(a.hasnavbar).children("." + a.navbar).addClass(a.hidden)
            });
            var r, l, d = function (e) {
                if (e = e || this.$pnls.children("." + a.current),
                    !e.hasClass(a.vertical)) {
                    var n = e.find("." + this.conf.classNames[t].panelPrev);
                    n.length || (n = e.children("." + a.navbar).children("." + a.prev)),
                        r = n.attr("href"),
                        l = n.html(),
                        o[r ? "attr" : "removeAttr"]("href", r),
                        o[r || l ? "removeClass" : "addClass"](a.hidden),
                        o.html(l)
                }
            };
            return this.bind("openPanel", d),
                this.bind("initPanels", function () {
                    d.call(this)
                }),
                -1
        }
            ,
            e[n].configuration.classNames[t].panelPrev = "Prev"
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , s = "searchfield";
        e[n].addons[t][s] = function (t, s) {
            var i = e[n]._c
                , a = e('<div class="' + i.search + '" />').appendTo(t);
            return "object" != typeof this.opts.searchfield && (this.opts.searchfield = {}),
                this.opts.searchfield.add = !0,
                this.opts.searchfield.addTo = a,
                0
        }
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "navbars"
            , s = "title";
        e[n].addons[t][s] = function (s, i) {
            var a, o, r = e[n]._c, l = e('<a class="' + r.title + '" />').appendTo(s), d = function (e) {
                if (e = e || this.$pnls.children("." + r.current),
                    !e.hasClass(r.vertical)) {
                    var n = e.find("." + this.conf.classNames[t].panelTitle);
                    n.length || (n = e.children("." + r.navbar).children("." + r.title)),
                        a = n.attr("href"),
                        o = n.html() || i.title,
                        l[a ? "attr" : "removeAttr"]("href", a),
                        l[a || o ? "removeClass" : "addClass"](r.hidden),
                        l.html(o)
                }
            };
            return this.bind("openPanel", d),
                this.bind("initPanels", function (e) {
                    d.call(this)
                }),
                0
        }
            ,
            e[n].configuration.classNames[t].panelTitle = "Title"
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "rtl";
        e[n].addons[t] = {
            setup: function () {
                var i = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "object" != typeof i && (i = {
                        use: i
                    }),
                    i = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], i),
                    "boolean" != typeof i.use && (i.use = "rtl" == (o.$html.attr("dir") || "").toLowerCase()),
                    i.use && this.$menu.addClass(s.rtl)
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("rtl")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                use: "detect"
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        function n(e, n, t) {
            e.prop("aria-" + n, t)[t ? "attr" : "removeAttr"]("aria-" + n, "true")
        }
        function t(e) {
            return '<span class="' + a.sronly + '">' + e + "</span>"
        }
        var s = "mmenu"
            , i = "screenReader";
        e[s].addons[i] = {
            setup: function () {
                var o = this.opts[i]
                    , r = this.conf[i];
                if (l = e[s].glbl,
                    "boolean" == typeof o && (o = {
                        aria: o,
                        text: o
                    }),
                    "object" != typeof o && (o = {}),
                    o = this.opts[i] = e.extend(!0, {}, e[s].defaults[i], o),
                    o.aria) {
                    if (this.opts.offCanvas) {
                        var d = function () {
                            n(this.$menu, "hidden", !1)
                        }
                            , c = function () {
                                n(this.$menu, "hidden", !0)
                            };
                        this.bind("open", d),
                            this.bind("close", c),
                            c.call(this)
                    }
                    var h = function () {
                        n(this.$menu.find("." + a.hidden), "hidden", !0),
                            n(this.$menu.find('[aria-hidden="true"]').not("." + a.hidden), "hidden", !1)
                    }
                        , u = function (e) {
                            n(this.$pnls.children("." + a.panel).not(e).not("." + a.hidden), "hidden", !0),
                                n(e, "hidden", !1)
                        };
                    this.bind("update", h),
                        this.bind("openPanel", h),
                        this.bind("openPanel", u);
                    var p = function (e) {
                        n(e.find("." + a.prev + ", ." + a.next), "haspopup", !0)
                    };
                    this.bind("initPanels", p),
                        p.call(this, this.$menu.children("." + a.navbar))
                }
                if (o.text) {
                    var f = function (n) {
                        n.children("." + a.navbar).children("." + a.prev).html(t(r.text.closeSubmenu)).end().children("." + a.next).html(t(r.text.openSubmenu)).end().children("." + a.close).html(t(r.text.closeMenu)),
                            n.is("." + a.panel) && n.find("." + a.listview).find("." + a.next).each(function () {
                                e(this).html(t(r.text[e(this).parent().is("." + a.vertical) ? "toggleSubmenu" : "openSubmenu"]))
                            })
                    };
                    this.bind("initPanels", f),
                        f.call(this, this.$menu)
                }
            },
            add: function () {
                a = e[s]._c,
                    o = e[s]._d,
                    r = e[s]._e,
                    a.add("sronly")
            },
            clickAnchor: function (e, n) { }
        },
            e[s].defaults[i] = {
                aria: !1,
                text: !1
            },
            e[s].configuration[i] = {
                text: {
                    closeMenu: "Close menu",
                    closeSubmenu: "Close submenu",
                    openSubmenu: "Open submenu",
                    toggleSubmenu: "Toggle submenu"
                }
            };
        var a, o, r, l
    }(jQuery),
    function (e) {
        function n(e) {
            switch (e) {
                case 9:
                case 16:
                case 17:
                case 18:
                case 37:
                case 38:
                case 39:
                case 40:
                    return !0
            }
            return !1
        }
        var t = "mmenu"
            , s = "searchfield";
        e[t].addons[s] = {
            setup: function () {
                var l = this
                    , d = this.opts[s]
                    , c = this.conf[s];
                r = e[t].glbl,
                    "boolean" == typeof d && (d = {
                        add: d
                    }),
                    "object" != typeof d && (d = {}),
                    "boolean" == typeof d.resultsPanel && (d.resultsPanel = {
                        add: d.resultsPanel
                    }),
                    d = this.opts[s] = e.extend(!0, {}, e[t].defaults[s], d),
                    c = this.conf[s] = e.extend(!0, {}, e[t].configuration[s], c),
                    this.bind("close", function () {
                        this.$menu.find("." + i.search).find("input").blur()
                    }),
                    this.bind("initPanels", function (t) {
                        if (d.add) {
                            var r;
                            switch (d.addTo) {
                                case "panels":
                                    r = t;
                                    break;
                                default:
                                    r = this.$menu.find(d.addTo)
                            }
                            if (r.each(function () {
                                var n = e(this);
                                if (!n.is("." + i.panel) || !n.is("." + i.vertical)) {
                                    if (!n.children("." + i.search).length) {
                                        var t = l.__valueOrFn(c.clear, n)
                                            , s = l.__valueOrFn(c.form, n)
                                            , a = l.__valueOrFn(c.input, n)
                                            , r = l.__valueOrFn(c.submit, n)
                                            , h = e("<" + (s ? "form" : "div") + ' class="' + i.search + '" />')
                                            , u = e('<input placeholder="' + d.placeholder + '" type="text" autocomplete="off" />');
                                        h.append(u);
                                        var p;
                                        if (a)
                                            for (p in a)
                                                u.attr(p, a[p]);
                                        if (t && e('<a class="' + i.btn + " " + i.clear + '" href="#" />').appendTo(h).on(o.click + "-searchfield", function (e) {
                                            e.preventDefault(),
                                                u.val("").trigger(o.keyup + "-searchfield")
                                        }),
                                            s) {
                                            for (p in s)
                                                h.attr(p, s[p]);
                                            r && !t && e('<a class="' + i.btn + " " + i.next + '" href="#" />').appendTo(h).on(o.click + "-searchfield", function (e) {
                                                e.preventDefault(),
                                                    h.submit()
                                            })
                                        }
                                        n.hasClass(i.search) ? n.replaceWith(h) : n.prepend(h).addClass(i.hassearch)
                                    }
                                    if (d.noResults) {
                                        var f = n.closest("." + i.panel).length;
                                        if (f || (n = l.$pnls.children("." + i.panel).first()),
                                            !n.children("." + i.noresultsmsg).length) {
                                            var v = n.children("." + i.listview).first();
                                            e('<div class="' + i.noresultsmsg + " " + i.hidden + '" />').append(d.noResults)[v.length ? "insertAfter" : "prependTo"](v.length ? v : n)
                                        }
                                    }
                                }
                            }),
                                d.search) {
                                if (d.resultsPanel.add) {
                                    d.showSubPanels = !1;
                                    var h = this.$pnls.children("." + i.resultspanel);
                                    h.length || (h = e('<div class="' + i.panel + " " + i.resultspanel + " " + i.hidden + '" />').appendTo(this.$pnls).append('<div class="' + i.navbar + " " + i.hidden + '"><a class="' + i.title + '">' + d.resultsPanel.title + "</a></div>").append('<ul class="' + i.listview + '" />').append(this.$pnls.find("." + i.noresultsmsg).first().clone()),
                                        this.initPanels(h))
                                }
                                this.$menu.find("." + i.search).each(function () {
                                    var t, r, c = e(this), u = c.closest("." + i.panel).length;
                                    u ? (t = c.closest("." + i.panel),
                                        r = t) : (t = e("." + i.panel, l.$menu),
                                            r = l.$menu),
                                        d.resultsPanel.add && (t = t.not(h));
                                    var p = c.children("input")
                                        , f = l.__findAddBack(t, "." + i.listview).children("li")
                                        , v = f.filter("." + i.divider)
                                        , m = l.__filterListItems(f)
                                        , g = "a"
                                        , b = g + ", span"
                                        , _ = ""
                                        , C = function () {
                                            var n = p.val().toLowerCase();
                                            if (n != _) {
                                                if (_ = n,
                                                    d.resultsPanel.add && h.children("." + i.listview).empty(),
                                                    t.scrollTop(0),
                                                    m.add(v).addClass(i.hidden).find("." + i.fullsubopensearch).removeClass(i.fullsubopen + " " + i.fullsubopensearch),
                                                    m.each(function () {
                                                        var n = e(this)
                                                            , t = g;
                                                        (d.showTextItems || d.showSubPanels && n.find("." + i.next)) && (t = b);
                                                        var s = n.data(a.searchtext) || n.children(t).text();
                                                        s.toLowerCase().indexOf(_) > -1 && n.add(n.prevAll("." + i.divider).first()).removeClass(i.hidden)
                                                    }),
                                                    d.showSubPanels && t.each(function (n) {
                                                        var t = e(this);
                                                        l.__filterListItems(t.find("." + i.listview).children()).each(function () {
                                                            var n = e(this)
                                                                , t = n.data(a.child);
                                                            n.removeClass(i.nosubresults),
                                                                t && t.find("." + i.listview).children().removeClass(i.hidden)
                                                        })
                                                    }),
                                                    d.resultsPanel.add)
                                                    if ("" === _)
                                                        this.closeAllPanels(),
                                                            this.openPanel(this.$pnls.children("." + i.subopened).last());
                                                    else {
                                                        var s = e();
                                                        t.each(function () {
                                                            var n = l.__filterListItems(e(this).find("." + i.listview).children()).not("." + i.hidden).clone(!0);
                                                            n.length && (d.resultsPanel.dividers && (s = s.add('<li class="' + i.divider + '">' + e(this).children("." + i.navbar).text() + "</li>")),
                                                                s = s.add(n))
                                                        }),
                                                            s.find("." + i.next).remove(),
                                                            h.children("." + i.listview).append(s),
                                                            this.openPanel(h)
                                                    }
                                                else
                                                    e(t.get().reverse()).each(function (n) {
                                                        var t = e(this)
                                                            , s = t.data(a.parent);
                                                        s && (l.__filterListItems(t.find("." + i.listview).children()).length ? (s.hasClass(i.hidden) && s.children("." + i.next).not("." + i.fullsubopen).addClass(i.fullsubopen).addClass(i.fullsubopensearch),
                                                            s.removeClass(i.hidden).removeClass(i.nosubresults).prevAll("." + i.divider).first().removeClass(i.hidden)) : u || (t.hasClass(i.opened) && setTimeout(function () {
                                                                l.openPanel(s.closest("." + i.panel))
                                                            }, (n + 1) * (1.5 * l.conf.openingInterval)),
                                                                s.addClass(i.nosubresults)))
                                                    });
                                                r.find("." + i.noresultsmsg)[m.not("." + i.hidden).length ? "addClass" : "removeClass"](i.hidden),
                                                    this.update()
                                            }
                                        };
                                    p.off(o.keyup + "-" + s + " " + o.change + "-" + s).on(o.keyup + "-" + s, function (e) {
                                        n(e.keyCode) || C.call(l)
                                    }).on(o.change + "-" + s, function (e) {
                                        C.call(l)
                                    });
                                    var $ = c.children("." + i.btn);
                                    $.length && p.on(o.keyup + "-" + s, function (e) {
                                        $[p.val().length ? "removeClass" : "addClass"](i.hidden)
                                    }),
                                        p.trigger(o.keyup + "-" + s)
                                })
                            }
                        }
                    })
            },
            add: function () {
                i = e[t]._c,
                    a = e[t]._d,
                    o = e[t]._e,
                    i.add("clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"),
                    a.add("searchtext"),
                    o.add("change keyup")
            },
            clickAnchor: function (e, n) { }
        },
            e[t].defaults[s] = {
                add: !1,
                addTo: "panels",
                placeholder: "Search",
                noResults: "No results found.",
                resultsPanel: {
                    add: !1,
                    dividers: !0,
                    title: "Search results"
                },
                search: !0,
                showTextItems: !1,
                showSubPanels: !0
            },
            e[t].configuration[s] = {
                clear: !1,
                form: !1,
                input: !1,
                submit: !1
            };
        var i, a, o, r
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "sectionIndexer";
        e[n].addons[t] = {
            setup: function () {
                var i = this
                    , r = this.opts[t];
                this.conf[t];
                o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        add: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    this.bind("initPanels", function (n) {
                        if (r.add) {
                            var t;
                            switch (r.addTo) {
                                case "panels":
                                    t = n;
                                    break;
                                default:
                                    t = e(r.addTo, this.$menu).filter("." + s.panel)
                            }
                            t.find("." + s.divider).closest("." + s.panel).addClass(s.hasindexer)
                        }
                        if (!this.$indexer && this.$pnls.children("." + s.hasindexer).length) {
                            this.$indexer = e('<div class="' + s.indexer + '" />').prependTo(this.$pnls).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'),
                                this.$indexer.children().on(a.mouseover + "-sectionindexer " + s.touchstart + "-sectionindexer", function (n) {
                                    var t = e(this).attr("href").slice(1)
                                        , a = i.$pnls.children("." + s.current)
                                        , o = a.find("." + s.listview)
                                        , r = !1
                                        , l = a.scrollTop();
                                    a.scrollTop(0),
                                        o.children("." + s.divider).not("." + s.hidden).each(function () {
                                            r === !1 && t == e(this).text().slice(0, 1).toLowerCase() && (r = e(this).position().top)
                                        }),
                                        a.scrollTop(r !== !1 ? r : l)
                                });
                            var o = function (e) {
                                i.$menu[(e.hasClass(s.hasindexer) ? "add" : "remove") + "Class"](s.hasindexer)
                            };
                            this.bind("openPanel", o),
                                o.call(this, this.$pnls.children("." + s.current))
                        }
                    })
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("indexer hasindexer"),
                    a.add("mouseover touchstart")
            },
            clickAnchor: function (e, n) {
                return e.parent().is("." + s.indexer) ? !0 : void 0
            }
        },
            e[n].defaults[t] = {
                add: !1,
                addTo: "panels"
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "setSelected";
        e[n].addons[t] = {
            setup: function () {
                var a = this
                    , r = this.opts[t];
                this.conf[t];
                if (o = e[n].glbl,
                    "boolean" == typeof r && (r = {
                        hover: r,
                        parent: r
                    }),
                    "object" != typeof r && (r = {}),
                    r = this.opts[t] = e.extend(!0, {}, e[n].defaults[t], r),
                    "detect" == r.current) {
                    var l = function (e) {
                        e = e.split("?")[0].split("#")[0];
                        var n = a.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
                        n.length ? a.setSelected(n.parent(), !0) : (e = e.split("/").slice(0, -1),
                            e.length && l(e.join("/")))
                    };
                    l(window.location.href)
                } else
                    r.current || this.bind("initPanels", function (e) {
                        e.find("." + s.listview).children("." + s.selected).removeClass(s.selected)
                    });
                if (r.hover && this.$menu.addClass(s.hoverselected),
                    r.parent) {
                    this.$menu.addClass(s.parentselected);
                    var d = function (e) {
                        this.$pnls.find("." + s.listview).find("." + s.next).removeClass(s.selected);
                        for (var n = e.data(i.parent); n && n.length;)
                            n = n.not("." + s.vertical).children("." + s.next).addClass(s.selected).end().closest("." + s.panel).data(i.parent)
                    };
                    this.bind("openedPanel", d),
                        this.bind("initPanels", function (e) {
                            d.call(this, this.$pnls.children("." + s.current))
                        })
                }
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("hoverselected parentselected")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].defaults[t] = {
                current: !0,
                hover: !1,
                parent: !1
            };
        var s, i, a, o
    }(jQuery),
    function (e) {
        var n = "mmenu"
            , t = "toggles";
        e[n].addons[t] = {
            setup: function () {
                var i = this;
                this.opts[t],
                    this.conf[t];
                o = e[n].glbl,
                    this.bind("initPanels", function (n) {
                        this.__refactorClass(e("input", n), this.conf.classNames[t].toggle, "toggle"),
                            this.__refactorClass(e("input", n), this.conf.classNames[t].check, "check"),
                            e("input." + s.toggle + ", input." + s.check, n).each(function () {
                                var n = e(this)
                                    , t = n.closest("li")
                                    , a = n.hasClass(s.toggle) ? "toggle" : "check"
                                    , o = n.attr("id") || i.__getUniqueId();
                                t.children('label[for="' + o + '"]').length || (n.attr("id", o),
                                    t.prepend(n),
                                    e('<label for="' + o + '" class="' + s[a] + '"></label>').insertBefore(t.children("a, span").last()))
                            })
                    })
            },
            add: function () {
                s = e[n]._c,
                    i = e[n]._d,
                    a = e[n]._e,
                    s.add("toggle check")
            },
            clickAnchor: function (e, n) { }
        },
            e[n].configuration.classNames[t] = {
                toggle: "Toggle",
                check: "Check"
            };
        var s, i, a, o
    }(jQuery);
