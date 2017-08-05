function lsShowNotice(e, t, n) {
    if (typeof e == "string") {
        var r = jQuery("#" + e)
    } else if (typeof e == "object") {
        var r = e
    }
    var i, s;
    switch (t) {
        case "jquery":
            i = "multiple jQuery issue";
            s = "It looks like that one of your other plugins or your theme itself loads an extra copy of the jQuery library which causes a Javascript conflict and LayerSlider WP can't load your slider. <strong>Please navigate on your WordPress admin area to edit this slider and enable the \"Put JS includes to body\" option in the Global Settings under the Troubleshooting section.</strong><br><br>If this doesn't solve your problem, please try to disable every other plugin one-by-one to find out which one causes this issue. If you have found the corresponding plugin, please contact with the plugin author to solve this case. If none of your plugins causes this problem, it must be your theme and you should contact with the author of the theme. Ask help from them to remove any duplicates of the jQuery library.<br><br>If there is no one to help you, please write a comment in the comments section of the item on CodeCanyon.";
            break;
        case "oldjquery":
            i = "old jQuery issue";
            s = "It looks like you are using an old version (" + n + ') of the jQuery library. LayerSlider requires at least version 1.7.2 or newer. If you are using the WordPress version of LayerSlider, you can try out the "jQuery Updater" plugin from the WP plugin depository. If you don\'t know what to do, you can write us a private message from our CodeCanyon profile page. We need a temporary WP admin account (or a temporary FTP account in some cases) to solve this issue.';
            break;
        case "transit":
            i = "jQuery Transit issue";
            s = 'It looks like one of your other plugins also uses jQuery Transit and loads an extra copy of this library which can cause issues. Please navigate on your WordPress admin area to edit this slider and enable the "Put JS includes to body" option in your Global Settings under the Troubleshooting section.';
            break
    }
    r.addClass("ls-error");
    r.append('<p class="ls-exclam">!</p>');
    r.append('<p class="ls-error-title">LayerSlider WP: ' + i + "</p>");
    r.append('<p class="ls-error-text">' + s + "</p>")
} (function (e) {
    e.fn.layerSlider = function (n) {
        var r = "1.7.2";
        var i = e.fn.jquery;
        var s = e(this);
        var o = function (e, t) {
            var n = e.split(".");
            var r = t.split(".");
            for (var o = 0; o < n.length; ++o) {
                if (r.length == o) {
                    lsShowNotice(s, "oldjquery", i);
                    return false
                }
                if (n[o] == r[o]) {
                    continue
                } else if (n[o] > r[o]) {
                    lsShowNotice(s, "oldjquery", i);
                    return false
                } else {
                    return true
                }
            }
            if (n.length != r.length) {
                return true
            }
            return true
        };
        if (o(r, i)) {
            if ((typeof n).match("object|undefined")) {
                return this.each(function (e) {
                    new t(this, n)
                })
            } else {
                if (n == "data") {
                    var u = e(this).data("LayerSlider").g;
                    if (u) {
                        return u
                    }
                } else {
                    return this.each(function (t) {
                        var r = e(this).data("LayerSlider");
                        if (r) {
                            if (!r.g.isAnimating && !r.g.isLoading) {
                                if (typeof n == "number") {
                                    if (n > 0 && n < r.g.layersNum + 1 && n != r.g.curLayerIndex) {
                                        r.change(n)
                                    }
                                } else {
                                    switch (n) {
                                        case "prev":
                                            r.o.cbPrev(r.g);
                                            r.prev("clicked");
                                            break;
                                        case "next":
                                            r.o.cbNext(r.g);
                                            r.next("clicked");
                                            break;
                                        case "start":
                                            if (!r.g.autoSlideshow) {
                                                r.o.cbStart(r.g);
                                                r.g.originalAutoSlideshow = true;
                                                r.start()
                                            }
                                            break
                                    }
                                }
                            }
                            if (n == "debug") {
                                r.d.show()
                            }
                            if ((r.g.autoSlideshow || !r.g.autoSlideshow && r.g.originalAutoSlideshow) && n == "stop") {
                                r.o.cbStop(r.g);
                                r.g.originalAutoSlideshow = false;
                                r.g.curLayer.find('iframe[src*="www.youtu"], iframe[src*="player.vimeo"]').each(function () {
                                    clearTimeout(e(this).data("videoTimer"))
                                });
                                r.stop()
                            }
                        }
                    })
                }
            }
        }
    };
    var t = function (o, u) {
        var a = this;
        a.$el = e(o).addClass("ls-container");
        a.$el.data("LayerSlider", a);
        a.load = function () {
            a.o = e.extend({},
            t.options, u);
            a.g = e.extend({},
            t.global);
            if (typeof layerSliderTransitions != "undefined") {
                a.t = e.extend({},
                layerSliderTransitions)
            }
            if (typeof layerSliderCustomTransitions != "undefined") {
                a.ct = e.extend({},
                layerSliderCustomTransitions)
            }
            if (!a.g.initialized) {
                a.g.initialized = true;
                a.debug();
                if (e("html").find('meta[content*="WordPress"]').length) {
                    a.g.wpVersion = e("html").find('meta[content*="WordPress"]').attr("content").split("WordPress")[1]
                }
                if (e("html").find('script[src*="layerslider"]').length) {
                    if (e("html").find('script[src*="layerslider"]').attr("src").indexOf("?") != -1) {
                        a.g.lswpVersion = e("html").find('script[src*="layerslider"]').attr("src").split("?")[1].split("=")[1]
                    }
                }
                a.d.aT("LayerSlider controls");
                a.d.aU('<a href="#">prev</a> | <a href="#">next</a> | <a href="#">start</a> | <a href="#">stop</a> | <a href="#">force stop</a>');
                a.d.history.find("a").each(function () {
                    e(this).click(function (t) {
                        t.preventDefault();
                        if (e(this).text() == "force stop") {
                            e(o).find("*").stop(true, false);
                            e(o).layerSlider("stop")
                        } else {
                            e(o).layerSlider(e(this).text())
                        }
                    })
                });
                a.d.aT("LayerSlider version information");
                a.d.aU("JS version: <strong>" + a.g.version + "</strong>");
                if (a.g.lswpVersion) {
                    a.d.aL("WP version: <strong>" + a.g.lswpVersion + "</strong>")
                }
                if (a.g.wpVersion) {
                    a.d.aL("WordPress version: <strong>" + a.g.wpVersion + "</strong>")
                }
                a.d.aL("jQuery version: <strong>" + e().jquery + "</strong>");
                if (e(o).attr("id")) {
                    a.d.aT("LayerSlider container");
                    a.d.aU("#" + e(o).attr("id"))
                }
                a.d.aT("Init code");
                a.d.aeU();
                for (var n in a.o) {
                    a.d.aL(n + ": <strong>" + a.o[n] + "</strong>")
                }
                if (!a.o.skin || a.o.skin == "" || !a.o.skinsPath || a.o.skinsPath == "") {
                    a.d.aT("Loading without skin. Possibilities: mistyped skin and / or skinsPath.");
                    a.init()
                } else {
                    a.d.aT("Trying to load with skin: " + a.o.skin, true);
                    e(o).addClass("ls-" + a.o.skin);
                    var r = a.o.skinsPath + a.o.skin + "/skin.css";
                    cssContainer = e("head");
                    if (!e("head").length) {
                        cssContainer = e("body")
                    }
                    if (e('link[href="' + r + '"]').length) {
                        a.d.aU('Skin "' + a.o.skin + '" is already loaded.');
                        i = e('link[href="' + r + '"]');
                        if (!a.g.loaded) {
                            a.g.loaded = true;
                            a.init()
                        }
                    } else {
                        if (document.createStyleSheet) {
                            document.createStyleSheet(r);
                            var i = e('link[href="' + r + '"]')
                        } else {
                            var i = e('<link rel="stylesheet" href="' + r + '" type="text/css" />').appendTo(cssContainer)
                        }
                    }
                    i.load(function () {
                        if (!a.g.loaded) {
                            a.d.aU("curSkin.load(); fired");
                            a.g.loaded = true;
                            a.init()
                        }
                    });
                    e(window).load(function () {
                        if (!a.g.loaded) {
                            a.d.aU("$(window).load(); fired");
                            a.g.loaded = true;
                            a.init()
                        }
                    });
                    setTimeout(function () {
                        if (!a.g.loaded) {
                            a.d.aT("Fallback mode: Neither curSkin.load(); or $(window).load(); were fired");
                            a.g.loaded = true;
                            a.init()
                        }
                    },
                    2e3)
                }
            }
        };
        a.init = function () {
            a.d.aT("FUNCTION ls.init();");
            a.d.aeU();
            if (!e("html").attr("id")) {
                e("html").attr("id", "ls-global")
            } else if (!e("body").attr("id")) {
                e("body").attr("id", "ls-global")
            }
            a.g.sliderWidth = function () {
                if (a.g.normalWidth && a.g.goingNormal) {
                    return a.g.normalWidth
                } else {
                    return e(o).width()
                }
            };
            a.g.sliderHeight = function () {
                if (a.g.normalHeight && a.g.goingNormal) {
                    return a.g.normalHeight
                } else {
                    return e(o).height()
                }
            };
            if (e(o).find(".ls-layer").length == 1) {
                a.o.autoStart = false;
                a.o.navPrevNext = false;
                a.o.navStartStop = false;
                a.o.navButtons = false;
                a.o.loops = 0;
                a.o.forceLoopNum = false;
                a.o.autoPauseSlideshow = true;
                a.o.firstLayer = 1;
                a.o.thumbnailNavigation = "disabled"
            }
            a.d.aL("Number of layers found: <strong>" + e(o).find(".ls-layer").length + "</strong>");
            if (a.o.width) {
                a.g.sliderOriginalWidthRU = a.g.sliderOriginalWidth = "" + a.o.width
            } else {
                a.g.sliderOriginalWidthRU = a.g.sliderOriginalWidth = e(o)[0].style.width
            }
            a.d.aL("sliderOriginalWidth: <strong>" + a.g.sliderOriginalWidth + "</strong>");
            if (a.o.height) {
                a.g.sliderOriginalHeight = "" + a.o.height
            } else {
                a.g.sliderOriginalHeight = e(o)[0].style.height
            }
            a.d.aL("sliderOriginalHeight: <strong>" + a.g.sliderOriginalHeight + "</strong>");
            if (a.g.sliderOriginalWidth.indexOf("%") == -1 && a.g.sliderOriginalWidth.indexOf("px") == -1) {
                a.g.sliderOriginalWidth += "px"
            }
            if (a.g.sliderOriginalHeight.indexOf("%") == -1 && a.g.sliderOriginalHeight.indexOf("px") == -1) {
                a.g.sliderOriginalHeight += "px"
            }
            if (a.o.responsive && a.g.sliderOriginalWidth.indexOf("px") != -1 && a.g.sliderOriginalHeight.indexOf("px") != -1) {
                a.g.responsiveMode = true
            } else {
                a.g.responsiveMode = false
            }
            e(o).find('*[class*="ls-s"], *[class*="ls-bg"]').each(function () {
                if (!e(this).parent().hasClass("ls-layer")) {
                    e(this).insertBefore(e(this).parent())
                }
            });
            e(o).find(".ls-layer").each(function () {
                e(this).children(':not([class*="ls-"])').each(function () {
                    e(this).remove()
                })
            });
            a.d.aT("LayerSlider Content");
            e(o).find('.ls-layer, *[class*="ls-s"]').each(function () {
                if (e(this).hasClass("ls-layer")) {
                    a.d.aU("<strong>LAYER " + (e(this).index() + 1) + "</strong>");
                    a.d.aUU();
                    a.d.aL("<strong>LAYER " + (e(this).index() + 1) + " properties:</strong><br><br>")
                } else {
                    a.d.aU("    Sublayer " + (e(this).index() + 1));
                    a.d.aF(e(this));
                    a.d.aUU();
                    a.d.aL("<strong>SUBLAYER " + (e(this).index() + 1) + " properties:</strong><br><br>");
                    a.d.aL("type: <strong>" + e(this).prev().prop("tagName") + "</strong>");
                    a.d.aL("class: <strong>" + e(this).attr("class") + "</strong>")
                }
                if (e(this).attr("rel") || e(this).attr("style")) {
                    if (e(this).attr("rel")) {
                        var t = e(this).attr("rel").toLowerCase().split(";")
                    } else {
                        var t = e(this).attr("style").toLowerCase().split(";")
                    }
                    for (x = 0; x < t.length; x++) {
                        param = t[x].split(":");
                        if (param[0].indexOf("easing") != -1) {
                            param[1] = a.ieEasing(param[1])
                        }
                        var n = "";
                        if (param[2]) {
                            n = ":" + e.trim(param[2])
                        }
                        if (param[0] != " " && param[0] != "") {
                            e(this).data(e.trim(param[0]), e.trim(param[1]) + n);
                            a.d.aL(e.trim(param[0]) + ": <strong>" + e.trim(param[1]) + n + "</strong>")
                        }
                    }
                }
                var r = e(this);
                r.data("originalLeft", r[0].style.left);
                r.data("originalTop", r[0].style.top);
                if (e(this).is("a") && e(this).children().length > 0) {
                    r = e(this).children()
                }
                var i = r.width();
                var o = r.height();
                if (r[0].style.width && r[0].style.width.indexOf("%") != -1) {
                    i = r[0].style.width
                }
                if (r[0].style.height && r[0].style.height.indexOf("%") != -1) {
                    o = r[0].style.height
                }
                r.data("originalWidth", i);
                r.data("originalHeight", o);
                r.data("originalPaddingLeft", r.css("padding-left"));
                r.data("originalPaddingRight", r.css("padding-right"));
                r.data("originalPaddingTop", r.css("padding-top"));
                r.data("originalPaddingBottom", r.css("padding-bottom"));
                if (a.g.isMobile() == true && s().webkit) {
                    var u = typeof parseFloat(r.css("opacity")) == "number" ? Math.round(parseFloat(r.css("opacity")) * 100) / 100 : 1;
                    e(this).data("originalOpacity", u)
                }
                if (r.css("border-left-width").indexOf("px") == -1) {
                    r.data("originalBorderLeft", r[0].style.borderLeftWidth)
                } else {
                    r.data("originalBorderLeft", r.css("border-left-width"))
                }
                if (r.css("border-right-width").indexOf("px") == -1) {
                    r.data("originalBorderRight", r[0].style.borderRightWidth)
                } else {
                    r.data("originalBorderRight", r.css("border-right-width"))
                }
                if (r.css("border-top-width").indexOf("px") == -1) {
                    r.data("originalBorderTop", r[0].style.borderTopWidth)
                } else {
                    r.data("originalBorderTop", r.css("border-top-width"))
                }
                if (r.css("border-bottom-width").indexOf("px") == -1) {
                    r.data("originalBorderBottom", r[0].style.borderBottomWidth)
                } else {
                    r.data("originalBorderBottom", r.css("border-bottom-width"))
                }
                r.data("originalFontSize", r.css("font-size"));
                r.data("originalLineHeight", r.css("line-height"))
            });
            if (document.location.hash) {
                for (var t = 0; t < e(o).find(".ls-layer").length; t++) {
                    if (e(o).find(".ls-layer").eq(t).data("deeplink") == document.location.hash.split("#")[1]) {
                        a.o.firstLayer = t + 1
                    }
                }
            }
            e(o).find('*[class*="ls-linkto-"]').each(function () {
                var t = e(this).attr("class").split(" ");
                for (var n = 0; n < t.length; n++) {
                    if (t[n].indexOf("ls-linkto-") != -1) {
                        var r = parseInt(t[n].split("ls-linkto-")[1]);
                        e(this).css({
                            cursor: "pointer"
                        }).click(function (t) {
                            t.preventDefault();
                            e(o).layerSlider(r)
                        })
                    }
                }
            });
            a.g.layersNum = e(o).find(".ls-layer").length;
            if (a.o.randomSlideshow && a.g.layersNum > 2) {
                a.o.firstLayer == "random";
                a.o.twoWaySlideshow = false
            } else {
                a.o.randomSlideshow = false
            }
            if (a.o.firstLayer == "random") {
                a.o.firstLayer = Math.floor(Math.random() * a.g.layersNum + 1)
            }
            a.o.firstLayer = a.o.firstLayer < a.g.layersNum + 1 ? a.o.firstLayer : 1;
            a.o.firstLayer = a.o.firstLayer < 1 ? 1 : a.o.firstLayer;
            a.g.nextLoop = 1;
            if (a.o.animateFirstLayer) {
                a.g.nextLoop = 0
            }
            e(o).find('iframe[src*="www.youtu"]').each(function () {
                e(this).parent().addClass("ls-video-layer");
                if (e(this).parent('[class*="ls-s"]')) {
                    var t = e(this);
                    e.getJSON("http://gdata.youtube.com/feeds/api/videos/" + e(this).attr("src").split("embed/undefined.undefined")[1].split("?")[0] + "?v=2&alt=json&callback=?",
                    function (e) {
                        t.data("videoDuration", parseInt(e["entry"]["media$group"]["yt$duration"]["seconds"]) * 1e3)
                    });
                    var n = e("<div>").addClass("ls-vpcontainer").appendTo(e(this).parent());
                    e("<img>").appendTo(n).addClass("ls-videopreview").attr("src", "http://img.youtube.com/vi/" + e(this).attr("src").split("embed/undefined.undefined")[1].split("?")[0] + "/" + a.o.youtubePreview);
                    e("<div>").appendTo(n).addClass("ls-playvideo");
                    e(this).parent().css({
                        width: e(this).width(),
                        height: e(this).height()
                    }).click(function () {
                        a.g.isAnimating = true;
                        if (a.g.paused) {
                            if (a.o.autoPauseSlideshow != false) {
                                a.g.paused = false
                            }
                            a.g.originalAutoSlideshow = true
                        } else {
                            a.g.originalAutoSlideshow = a.g.autoSlideshow
                        }
                        if (a.o.autoPauseSlideshow != false) {
                            a.stop()
                        }
                        a.g.pausedByVideo = true;
                        e(this).find("iframe").attr("src", e(this).find("iframe").data("videoSrc"));
                        e(this).find(".ls-vpcontainer").delay(a.g.v.d).fadeOut(a.g.v.fo,
                        function () {
                            if (a.o.autoPauseSlideshow == "auto" && a.g.originalAutoSlideshow == true) {
                                var e = setTimeout(function () {
                                    a.start()
                                },
                                t.data("videoDuration") - a.g.v.d);
                                t.data("videoTimer", e)
                            }
                            a.g.isAnimating = false
                        })
                    });
                    var r = "&";
                    if (e(this).attr("src").indexOf("?") == -1) {
                        r = "?"
                    }
                    e(this).data("videoSrc", e(this).attr("src") + r + "autoplay=1");
                    e(this).data("originalWidth", e(this).attr("width"));
                    e(this).data("originalHeight", e(this).attr("height"));
                    e(this).attr("src", "")
                }
            });
            e(o).find('iframe[src*="player.vimeo"]').each(function () {
                e(this).parent().addClass("ls-video-layer");
                if (e(this).parent('[class*="ls-s"]')) {
                    var t = e(this);
                    var n = e("<div>").addClass("ls-vpcontainer").appendTo(e(this).parent());
                    e.getJSON("http://vimeo.com/api/v2/video/" + e(this).attr("src").split("video/undefined.undefined")[1].split("?")[0] + ".json?callback=?",
                    function (r) {
                        e("<img>").appendTo(n).addClass("ls-videopreview").attr("src", r[0]["thumbnail_large"]);
                        t.data("videoDuration", parseInt(r[0]["duration"]) * 1e3);
                        e("<div>").appendTo(n).addClass("ls-playvideo")
                    });
                    e(this).parent().css({
                        width: e(this).width(),
                        height: e(this).height()
                    }).click(function () {
                        a.g.isAnimating = true;
                        if (a.g.paused) {
                            if (a.o.autoPauseSlideshow != false) {
                                a.g.paused = false
                            }
                            a.g.originalAutoSlideshow = true
                        } else {
                            a.g.originalAutoSlideshow = a.g.autoSlideshow
                        }
                        if (a.o.autoPauseSlideshow != false) {
                            a.stop()
                        }
                        a.g.pausedByVideo = true;
                        e(this).find("iframe").attr("src", e(this).find("iframe").data("videoSrc"));
                        e(this).find(".ls-vpcontainer").delay(a.g.v.d).fadeOut(a.g.v.fo,
                        function () {
                            if (a.o.autoPauseSlideshow == "auto" && a.g.originalAutoSlideshow == true) {
                                var e = setTimeout(function () {
                                    a.start()
                                },
                                t.data("videoDuration") - a.g.v.d);
                                t.data("videoTimer", e)
                            }
                            a.g.isAnimating = false
                        })
                    });
                    var r = "&";
                    if (e(this).attr("src").indexOf("?") == -1) {
                        r = "?"
                    }
                    e(this).data("videoSrc", e(this).attr("src") + r + "autoplay=1");
                    e(this).data("originalWidth", e(this).attr("width"));
                    e(this).data("originalHeight", e(this).attr("height"));
                    e(this).attr("src", "")
                }
            });
            if (a.o.animateFirstLayer) {
                a.o.firstLayer = a.o.firstLayer - 1 == 0 ? a.g.layersNum : a.o.firstLayer - 1
            }
            a.g.curLayerIndex = a.o.firstLayer;
            a.g.curLayer = e(o).find(".ls-layer:eq(" + (a.g.curLayerIndex - 1) + ")");
            e(o).find(".ls-layer").wrapAll('<div class="ls-inner"></div>');
            e("<div>").addClass("ls-webkit-hack").prependTo(e(o));
            a.g.li = e("<div>").css({
                zIndex: -1,
                display: "none"
            }).addClass("ls-loading-container").appendTo(e(o));
            e("<div>").addClass("ls-loading-indicator").appendTo(a.g.li);
            if (e(o).css("position") == "static") {
                e(o).css("position", "relative")
            }
            e(o).find(".ls-inner").css({
                backgroundColor: a.o.globalBGColor
            });
            if (a.o.globalBGImage) {
                e(o).find(".ls-inner").css({
                    backgroundImage: "url(" + a.o.globalBGImage + ")"
                })
            }
            if (a.g.responsiveMode && a.g.isMobile() != true && a.o.allowFullScreenMode && (lsPrefixes(document, "FullScreen") != undefined || lsPrefixes(document, "IsFullScreen") != undefined)) {
                var n = e("<a>").css("display", "none").addClass("ls-fullscreen").click(function () {
                    a.goFullScreen()
                }).appendTo(e(o).find(".ls-inner"));
                e(o).hover(function () {
                    if (a.g.ie78) {
                        n.css({
                            display: "block"
                        })
                    } else {
                        n.stop(true, true).fadeIn(300)
                    }
                },
                function () {
                    if (a.g.ie78) {
                        n.css({
                            display: "none"
                        })
                    } else {
                        n.stop(true, true).fadeOut(300)
                    }
                })
            }
            if (a.o.navPrevNext) {
                e('<a class="ls-nav-prev" href="#" />').click(function (t) {
                    t.preventDefault();
                    e(o).layerSlider("prev")
                }).appendTo(e(o));
                e('<a class="ls-nav-next" href="#" />').click(function (t) {
                    t.preventDefault();
                    e(o).layerSlider("next")
                }).appendTo(e(o));
                if (a.o.hoverPrevNext) {
                    e(o).find(".ls-nav-prev, .ls-nav-next").css({
                        display: "none"
                    });
                    e(o).hover(function () {
                        if (!a.g.forceHideControls) {
                            if (a.g.ie78) {
                                e(o).find(".ls-nav-prev, .ls-nav-next").css("display", "block")
                            } else {
                                e(o).find(".ls-nav-prev, .ls-nav-next").stop(true, true).fadeIn(300)
                            }
                        }
                    },
                    function () {
                        if (a.g.ie78) {
                            e(o).find(".ls-nav-prev, .ls-nav-next").css("display", "none")
                        } else {
                            e(o).find(".ls-nav-prev, .ls-nav-next").stop(true, true).fadeOut(300)
                        }
                    })
                }
            }
            if (a.o.navStartStop || a.o.navButtons) {
                var r = e('<div class="ls-bottom-nav-wrapper" />').appendTo(e(o));
                a.g.bottomWrapper = r;
                if (a.o.thumbnailNavigation == "always") {
                    r.addClass("ls-above-thumbnails")
                }
                if (a.o.navButtons && a.o.thumbnailNavigation != "always") {
                    e('<span class="ls-bottom-slidebuttons" />').appendTo(e(o).find(".ls-bottom-nav-wrapper"));
                    if (a.o.thumbnailNavigation == "hover") {
                        var i = e('<div class="ls-thumbnail-hover"><div class="ls-thumbnail-hover-inner"><div class="ls-thumbnail-hover-bg"></div><div class="ls-thumbnail-hover-img"><img></div><span></span></div></div>').appendTo(e(o).find(".ls-bottom-slidebuttons"))
                    }
                    for (x = 1; x < a.g.layersNum + 1; x++) {
                        var u = e('<a href="#" />').appendTo(e(o).find(".ls-bottom-slidebuttons")).click(function (t) {
                            t.preventDefault();
                            e(o).layerSlider(e(this).index() + 1)
                        });
                        if (a.o.thumbnailNavigation == "hover") {
                            e(o).find(".ls-thumbnail-hover, .ls-thumbnail-hover-img").css({
                                width: a.o.tnWidth,
                                height: a.o.tnHeight
                            });
                            var f = e(o).find(".ls-thumbnail-hover");
                            var l = f.find("img").css({
                                height: a.o.tnHeight
                            });
                            var c = e(o).find(".ls-thumbnail-hover-inner").css({
                                visibility: "hidden",
                                display: "block"
                            });
                            u.hover(function () {
                                var t = e(o).find(".ls-layer").eq(e(this).index());
                                if (t.find(".ls-tn").length) {
                                    var n = t.find(".ls-tn").attr("src")
                                } else if (t.find(".ls-videopreview").length) {
                                    var n = t.find(".ls-videopreview").attr("src")
                                } else if (t.find(".ls-bg").length) {
                                    var n = t.find(".ls-bg").attr("src")
                                } else {
                                    var n = a.o.skinsPath + a.o.skin + "/nothumb.png"
                                }
                                e(o).find(".ls-thumbnail-hover-img").css({
                                    left: parseInt(f.css("padding-left")),
                                    top: parseInt(f.css("padding-top"))
                                });
                                l.load(function () {
                                    if (e(this).width() == 0) {
                                        l.css({
                                            position: "relative",
                                            margin: "0 auto",
                                            left: "auto"
                                        })
                                    } else {
                                        l.css({
                                            position: "absolute",
                                            marginLeft: -e(this).width() / 2,
                                            left: "50%"
                                        })
                                    }
                                }).attr("src", n);
                                f.css({
                                    display: "block"
                                }).stop().animate({
                                    left: e(this).position().left + (e(this).width() - f.outerWidth()) / 2
                                },
                                250, "easeInOutQuad");
                                c.css({
                                    display: "none",
                                    visibility: "visible"
                                }).stop().fadeIn(250)
                            },
                            function () {
                                c.stop().fadeOut(250,
                                function () {
                                    f.css({
                                        visibility: "hidden",
                                        display: "block"
                                    })
                                })
                            })
                        }
                    }
                    if (a.o.thumbnailNavigation == "hover") {
                        i.appendTo(e(o).find(".ls-bottom-slidebuttons"))
                    }
                    e(o).find(".ls-bottom-slidebuttons a:eq(" + (a.o.firstLayer - 1) + ")").addClass("ls-nav-active")
                }
                if (a.o.navStartStop) {
                    var h = e('<a class="ls-nav-start" href="#" />').click(function (t) {
                        t.preventDefault();
                        e(o).layerSlider("start")
                    }).prependTo(e(o).find(".ls-bottom-nav-wrapper"));
                    var p = e('<a class="ls-nav-stop" href="#" />').click(function (t) {
                        t.preventDefault();
                        e(o).layerSlider("stop")
                    }).appendTo(e(o).find(".ls-bottom-nav-wrapper"))
                } else if (a.o.thumbnailNavigation != "always") {
                    e('<span class="ls-nav-sides ls-nav-sideleft" />').prependTo(e(o).find(".ls-bottom-nav-wrapper"));
                    e('<span class="ls-nav-sides ls-nav-sideright" />').appendTo(e(o).find(".ls-bottom-nav-wrapper"))
                }
                if (a.o.hoverBottomNav && a.o.thumbnailNavigation != "always") {
                    r.css({
                        display: "none"
                    });
                    e(o).hover(function () {
                        if (!a.g.forceHideControls) {
                            if (a.g.ie78) {
                                r.css("display", "block")
                            } else {
                                r.stop(true, true).fadeIn(300)
                            }
                        }
                    },
                    function () {
                        if (a.g.ie78) {
                            r.css("display", "none")
                        } else {
                            r.stop(true, true).fadeOut(300)
                        }
                    })
                }
            }
            if (a.o.thumbnailNavigation == "always") {
                var d = e('<div class="ls-thumbnail-wrapper"></div>').appendTo(e(o));
                var i = e('<div class="ls-thumbnail"><div class="ls-thumbnail-inner"><div class="ls-thumbnail-slide-container"><div class="ls-thumbnail-slide"></div></div></div></div>').appendTo(d);
                a.g.thumbnails = e(o).find(".ls-thumbnail-slide-container");
                if (!("ontouchstart" in window)) {
                    a.g.thumbnails.hover(function () {
                        e(this).addClass("ls-thumbnail-slide-hover")
                    },
                    function () {
                        e(this).removeClass("ls-thumbnail-slide-hover");
                        a.scrollThumb()
                    }).mousemove(function (t) {
                        var n = parseInt(t.pageX - e(this).offset().left) / e(this).width() * (e(this).width() - e(this).find(".ls-thumbnail-slide").width());
                        e(this).find(".ls-thumbnail-slide").stop().css({
                            marginLeft: n
                        })
                    })
                } else {
                    a.g.thumbnails.addClass("ls-touchscroll")
                }
                e(o).find(".ls-layer").each(function () {
                    var t = e(this).index() + 1;
                    if (e(this).find(".ls-tn").length) {
                        var n = e(this).find(".ls-tn").attr("src")
                    } else if (e(this).find(".ls-videopreview").length) {
                        var n = e(this).find(".ls-videopreview").attr("src")
                    } else if (e(this).find(".ls-bg").length) {
                        var n = e(this).find(".ls-bg").attr("src")
                    }
                    if (n) {
                        var r = e('<a href="#" class="ls-thumb-' + t + '"><img src="' + n + '"></a>')
                    } else {
                        var r = e('<a href="#" class="ls-nothumb ls-thumb-' + t + '"><img src="' + a.o.skinsPath + a.o.skin + '/nothumb.png"></a>')
                    }
                    r.appendTo(e(o).find(".ls-thumbnail-slide"));
                    if (!("ontouchstart" in window)) {
                        r.hover(function () {
                            e(this).children().stop().fadeTo(300, a.o.tnActiveOpacity / 100)
                        },
                        function () {
                            if (!e(this).children().hasClass("ls-thumb-active")) {
                                e(this).children().stop().fadeTo(300, a.o.tnInactiveOpacity / 100)
                            }
                        })
                    }
                    r.click(function (n) {
                        n.preventDefault();
                        e(o).layerSlider(t)
                    })
                });
                if (h && p) {
                    var v = e('<div class="ls-bottom-nav-wrapper ls-below-thumbnails"></div>').appendTo(e(o));
                    h.clone().click(function (t) {
                        t.preventDefault();
                        e(o).layerSlider("start")
                    }).appendTo(v);
                    p.clone().click(function (t) {
                        t.preventDefault();
                        e(o).layerSlider("stop")
                    }).appendTo(v)
                }
                if (a.o.hoverBottomNav) {
                    d.css({
                        visibility: "hidden"
                    });
                    if (v) {
                        a.g.bottomWrapper = v.css("display") == "block" ? v : e(o).find(".ls-above-thumbnails");
                        a.g.bottomWrapper.css({
                            display: "none"
                        })
                    }
                    e(o).hover(function () {
                        if (a.g.ie78) {
                            d.css({
                                visibility: "visible"
                            });
                            if (bottomWrapper) {
                                bottomWrapper.css("display", "block")
                            }
                        } else {
                            d.css({
                                visibility: "visible",
                                display: "none"
                            }).stop(true, false).fadeIn(300);
                            if (bottomWrapper) {
                                bottomWrapper.stop(true, true).fadeIn(300)
                            }
                        }
                    },
                    function () {
                        if (a.g.ie78) {
                            d.css({
                                visibility: "hidden"
                            });
                            if (bottomWrapper) {
                                bottomWrapper.css("display", "none")
                            }
                        } else {
                            d.stop(true, true).fadeOut(300,
                            function () {
                                e(this).css({
                                    visibility: "hidden",
                                    display: "block"
                                })
                            });
                            if (bottomWrapper) {
                                bottomWrapper.stop(true, true).fadeOut(300)
                            }
                        }
                    })
                }
            }
            var m = e('<div class="ls-shadow"></div>').appendTo(e(o));
            m.data("originalHeight", m.height());
            shadowTimer = 150;
            setTimeout(function () {
                if (e(o).find(".ls-shadow").css("display") == "block") {
                    a.g.shadow = e(o).find(".ls-shadow").append(e("<img />").attr("src", a.o.skinsPath + a.o.skin + "/shadow.png"))
                }
                a.resizeShadow()
            },
            shadowTimer);
            if (a.o.keybNav && e(o).find(".ls-layer").length > 1) {
                e("body").bind("keydown",
                function (e) {
                    if (!a.g.isAnimating && !a.g.isLoading) {
                        if (e.which == 37) {
                            a.o.cbPrev(a.g);
                            a.prev("clicked")
                        } else if (e.which == 39) {
                            a.o.cbNext(a.g);
                            a.next("clicked")
                        }
                    }
                })
            }
            if ("ontouchstart" in window && e(o).find(".ls-layer").length > 1 && a.o.touchNav) {
                e(o).find(".ls-inner").bind("touchstart",
                function (e) {
                    var t = e.touches ? e.touches : e.originalEvent.touches;
                    if (t.length == 1) {
                        a.g.touchStartX = a.g.touchEndX = t[0].clientX
                    }
                });
                e(o).find(".ls-inner").bind("touchmove",
                function (e) {
                    var t = e.touches ? e.touches : e.originalEvent.touches;
                    if (t.length == 1) {
                        a.g.touchEndX = t[0].clientX
                    }
                    if (Math.abs(a.g.touchStartX - a.g.touchEndX) > 45) {
                        e.preventDefault()
                    }
                });
                e(o).find(".ls-inner").bind("touchend",
                function (t) {
                    if (Math.abs(a.g.touchStartX - a.g.touchEndX) > 45) {
                        if (a.g.touchStartX - a.g.touchEndX > 0) {
                            a.o.cbNext(a.g);
                            e(o).layerSlider("next")
                        } else {
                            a.o.cbPrev(a.g);
                            e(o).layerSlider("prev")
                        }
                    }
                })
            }
            if (a.o.pauseOnHover == true && e(o).find(".ls-layer").length > 1) {
                e(o).find(".ls-inner").hover(function () {
                    a.o.cbPause(a.g);
                    if (a.g.autoSlideshow) {
                        a.g.paused = true;
                        a.stop()
                    }
                },
                function () {
                    if (a.g.paused == true) {
                        a.start();
                        a.g.paused = false
                    }
                })
            }
            a.resizeSlider();
            if (a.o.yourLogo) {
                a.g.yourLogo = e("<img>").addClass("ls-yourlogo").appendTo(e(o)).attr("style", a.o.yourLogoStyle).css({
                    visibility: "hidden",
                    display: "bock"
                }).load(function () {
                    var t = 0;
                    if (!a.g.yourLogo) {
                        t = 1e3
                    }
                    setTimeout(function () {
                        a.g.yourLogo.data("originalWidth", a.g.yourLogo.width());
                        a.g.yourLogo.data("originalHeight", a.g.yourLogo.height());
                        if (a.g.yourLogo.css("left") != "auto") {
                            a.g.yourLogo.data("originalLeft", a.g.yourLogo[0].style.left)
                        }
                        if (a.g.yourLogo.css("right") != "auto") {
                            a.g.yourLogo.data("originalRight", a.g.yourLogo[0].style.right)
                        }
                        if (a.g.yourLogo.css("top") != "auto") {
                            a.g.yourLogo.data("originalTop", a.g.yourLogo[0].style.top)
                        }
                        if (a.g.yourLogo.css("bottom") != "auto") {
                            a.g.yourLogo.data("originalBottom", a.g.yourLogo[0].style.bottom)
                        }
                        if (a.o.yourLogoLink != false) {
                            e("<a>").appendTo(e(o)).attr("href", a.o.yourLogoLink).attr("target", a.o.yourLogoTarget).css({
                                textDecoration: "none",
                                outline: "none"
                            }).append(a.g.yourLogo)
                        }
                        a.g.yourLogo.css({
                            display: "none",
                            visibility: "visible"
                        });
                        a.resizeYourLogo()
                    },
                    t)
                }).attr("src", a.o.yourLogo)
            }
            e(window).resize(function () {
                var e = 0;
                if (a.g.normalWidth != false && a.g.goingNormal) {
                    e = 400
                }
                if (a.g.resizeTimeout) {
                    clearTimeout(a.g.resizeTimeout)
                }
                a.g.resizeTimeout = setTimeout(function () {
                    a.makeResponsive(a.g.curLayer,
                    function () {
                        return
                    });
                    if (a.g.yourLogo) {
                        a.resizeYourLogo()
                    }
                },
                e)
            });
            a.g.showSlider = true;
            if (a.o.animateFirstLayer == true) {
                if (a.o.autoStart) {
                    a.g.autoSlideshow = true;
                    e(o).find(".ls-nav-start").addClass("ls-nav-start-active")
                } else {
                    e(o).find(".ls-nav-stop").addClass("ls-nav-stop-active")
                }
                a.next()
            } else {
                a.imgPreload(a.g.curLayer,
                function () {
                    a.g.curLayer.fadeIn(1e3,
                    function () {
                        a.g.isLoading = false;
                        e(this).addClass("ls-active");
                        if (a.o.autoPlayVideos) {
                            e(this).delay(e(this).data("delayin") + 25).queue(function () {
                                e(this).find(".ls-videopreview").click();
                                e(this).dequeue()
                            })
                        }
                        a.g.curLayer.find(' > *[class*="ls-s"]').each(function () {
                            if (e(this).data("showuntil") > 0) {
                                a.sublayerShowUntil(e(this))
                            }
                        })
                    });
                    a.changeThumb(a.g.curLayerIndex);
                    if (a.o.autoStart) {
                        a.g.isLoading = false;
                        a.start()
                    } else {
                        e(o).find(".ls-nav-stop").addClass("ls-nav-stop-active")
                    }
                })
            }
            a.o.cbInit(e(o))
        };
        a.goFullScreen = function () {
            if (!a.g.isAnimating && !a.g.isLoading) {
                if (lsPrefixes(document, "FullScreen") || lsPrefixes(document, "IsFullScreen")) {
                    a.g.goingNormal = true;
                    lsPrefixes(document, "CancelFullScreen");
                    e(o).removeClass("ls-container-fullscreen")
                } else {
                    a.g.normalWidth = a.g.sliderWidth();
                    a.g.normalHeight = a.g.sliderHeight();
                    a.g.normalRatio = a.g.ratio;
                    lsPrefixes(e(o)[0], "RequestFullScreen");
                    e(o).addClass("ls-container-fullscreen")
                }
            }
        };
        a.start = function () {
            if (a.g.autoSlideshow) {
                if (a.g.prevNext == "prev" && a.o.twoWaySlideshow) {
                    a.prev()
                } else {
                    a.next()
                }
            } else {
                a.g.autoSlideshow = true;
                if (!a.g.isAnimating && !a.g.isLoading) {
                    a.timer()
                }
            }
            e(o).find(".ls-nav-start").addClass("ls-nav-start-active");
            e(o).find(".ls-nav-stop").removeClass("ls-nav-stop-active")
        };
        a.timer = function () {
            var t = e(o).find(".ls-active").data("slidedelay") ? parseInt(e(o).find(".ls-active").data("slidedelay")) : a.o.slideDelay;
            if (!a.o.animateFirstLayer && !e(o).find(".ls-active").data("slidedelay")) {
                var n = e(o).find(".ls-layer:eq(" + (a.o.firstLayer - 1) + ")").data("slidedelay");
                t = n ? n : a.o.slideDelay
            }
            clearTimeout(a.g.slideTimer);
            a.g.slideTimer = window.setTimeout(function () {
                a.start()
            },
            t)
        };
        a.stop = function () {
            if (!a.g.paused && !a.g.originalAutoSlideshow) {
                e(o).find(".ls-nav-stop").addClass("ls-nav-stop-active");
                e(o).find(".ls-nav-start").removeClass("ls-nav-start-active")
            }
            clearTimeout(a.g.slideTimer);
            a.g.autoSlideshow = false
        };
        a.ieEasing = function (t) {
            if (e.trim(t.toLowerCase()) == "swing" || e.trim(t.toLowerCase()) == "linear") {
                return t.toLowerCase()
            } else {
                return t.replace("easeinout", "easeInOut").replace("easein", "easeIn").replace("easeout", "easeOut").replace("quad", "Quad").replace("quart", "Quart").replace("cubic", "Cubic").replace("quint", "Quint").replace("sine", "Sine").replace("expo", "Expo").replace("circ", "Circ").replace("elastic", "Elastic").replace("back", "Back").replace("bounce", "Bounce")
            }
        };
        a.prev = function (e) {
            if (a.g.curLayerIndex < 2) {
                a.g.nextLoop += 1
            }
            if (a.g.nextLoop > a.o.loops && a.o.loops > 0 && !e) {
                a.g.nextLoop = 0;
                a.stop();
                if (a.o.forceLoopNum == false) {
                    a.o.loops = 0
                }
            } else {
                var t = a.g.curLayerIndex < 2 ? a.g.layersNum : a.g.curLayerIndex - 1;
                a.g.prevNext = "prev";
                a.change(t, a.g.prevNext)
            }
        };
        a.next = function (e) {
            if (!a.o.randomSlideshow) {
                if (!(a.g.curLayerIndex < a.g.layersNum)) {
                    a.g.nextLoop += 1
                }
                if (a.g.nextLoop > a.o.loops && a.o.loops > 0 && !e) {
                    a.g.nextLoop = 0;
                    a.stop();
                    if (a.o.forceLoopNum == false) {
                        a.o.loops = 0
                    }
                } else {
                    var t = a.g.curLayerIndex < a.g.layersNum ? a.g.curLayerIndex + 1 : 1;
                    a.g.prevNext = "next";
                    a.change(t, a.g.prevNext)
                }
            } else if (!e) {
                var t = a.g.curLayerIndex;
                var n = function () {
                    t = Math.floor(Math.random() * a.g.layersNum) + 1;
                    if (t == a.g.curLayerIndex) {
                        n()
                    } else {
                        a.g.prevNext = "next";
                        a.change(t, a.g.prevNext)
                    }
                };
                n()
            } else if (e) {
                var t = a.g.curLayerIndex < a.g.layersNum ? a.g.curLayerIndex + 1 : 1;
                a.g.prevNext = "next";
                a.change(t, a.g.prevNext)
            }
        };
        a.change = function (t, n) {
            if (a.g.pausedByVideo == true) {
                a.g.pausedByVideo = false;
                a.g.autoSlideshow = a.g.originalAutoSlideshow;
                a.g.curLayer.find('iframe[src*="www.youtu"], iframe[src*="player.vimeo"]').each(function () {
                    e(this).parent().find(".ls-vpcontainer").fadeIn(a.g.v.fi,
                    function () {
                        e(this).parent().find("iframe").attr("src", "")
                    })
                })
            }
            e(o).find('iframe[src*="www.youtu"], iframe[src*="player.vimeo"]').each(function () {
                clearTimeout(e(this).data("videoTimer"))
            });
            clearTimeout(a.g.slideTimer);
            a.g.nextLayerIndex = t;
            a.g.nextLayer = e(o).find(".ls-layer:eq(" + (a.g.nextLayerIndex - 1) + ")");
            if (!n) {
                if (a.g.curLayerIndex < a.g.nextLayerIndex) {
                    a.g.prevNext = "next"
                } else {
                    a.g.prevNext = "prev"
                }
            }
            var r = 0;
            if (e(o).find('iframe[src*="www.youtu"], iframe[src*="player.vimeo"]').length > 0) {
                r = a.g.v.fi
            }
            clearTimeout(a.g.changeTimer);
            a.g.changeTimer = setTimeout(function () {
                var e = function () {
                    if (a.g.goingNormal) {
                        setTimeout(function () {
                            e()
                        },
                        500)
                    } else {
                        a.imgPreload(a.g.nextLayer,
                        function () {
                            a.animate()
                        })
                    }
                };
                e()
            },
            r)
        };
        a.imgPreload = function (t, n) {
            a.g.isLoading = true;
            if (a.g.showSlider) {
                e(o).css({
                    visibility: "visible"
                })
            }
            if (a.o.imgPreload) {
                var r = [];
                var i = 0;
                if (t.css("background-image") != "none" && t.css("background-image").indexOf("url") != -1) {
                    var s = t.css("background-image");
                    s = s.match(/url\((.*)\)/)[1].replace(/"/gi, "");
                    r.push(s)
                }
                t.find("img").each(function () {
                    r.push(e(this).attr("src"))
                });
                t.find("*").each(function () {
                    if (e(this).css("background-image") != "none" && e(this).css("background-image").indexOf("url") != -1) {
                        var t = e(this).css("background-image");
                        t = t.match(/url\((.*)\)/)[1].replace(/"/gi, "");
                        r.push(t)
                    }
                });
                if (r.length == 0) {
                    a.makeResponsive(t, n)
                } else {
                    if (a.g.ie78) {
                        a.g.li.css("display", "block")
                    } else {
                        a.g.li.fadeIn(300)
                    }
                    for (x = 0; x < r.length; x++) {
                        e("<img>").load(function () {
                            if (++i == r.length) {
                                a.g.li.dequeue().css({
                                    display: "none"
                                });
                                e(".ls-thumbnail-wrapper, .ls-nav-next, .ls-nav-prev, .ls-bottom-nav-wrapper").css({
                                    visibility: "visible"
                                });
                                a.makeResponsive(t, n)
                            }
                        }).attr("src", r[x])
                    }
                }
            } else {
                e(".ls-thumbnail-wrapper, .ls-nav-next, .ls-nav-prev, .ls-bottom-nav-wrapper").css({
                    visibility: "visible"
                });
                a.makeResponsive(t, n)
            }
        };
        a.makeResponsive = function (t, n) {
            t.css({
                visibility: "hidden",
                display: "block"
            });
            a.resizeSlider();
            if (a.o.thumbnailNavigation == "always") {
                a.resizeThumb()
            }
            t.children().each(function () {
                var t = e(this);
                var n = t.data("originalLeft") ? t.data("originalLeft") : "0";
                var r = t.data("originalTop") ? t.data("originalTop") : "0";
                if (t.is("a") && t.children().length > 0) {
                    t.css({
                        display: "block"
                    });
                    t = t.children()
                }
                var i = "auto";
                var s = "auto";
                if (t.data("originalWidth")) {
                    if (typeof t.data("originalWidth") == "number") {
                        i = parseInt(t.data("originalWidth")) * a.g.ratio
                    } else if (t.data("originalWidth").indexOf("%") != -1) {
                        i = t.data("originalWidth")
                    }
                }
                if (t.data("originalHeight")) {
                    if (typeof t.data("originalHeight") == "number") {
                        s = parseInt(t.data("originalHeight")) * a.g.ratio
                    } else if (t.data("originalHeight").indexOf("%") != -1) {
                        s = t.data("originalHeight")
                    }
                }
                var o = t.data("originalPaddingLeft") ? parseInt(t.data("originalPaddingLeft")) * a.g.ratio : 0;
                var u = t.data("originalPaddingRight") ? parseInt(t.data("originalPaddingRight")) * a.g.ratio : 0;
                var f = t.data("originalPaddingTop") ? parseInt(t.data("originalPaddingTop")) * a.g.ratio : 0;
                var l = t.data("originalPaddingBottom") ? parseInt(t.data("originalPaddingBottom")) * a.g.ratio : 0;
                var c = t.data("originalBorderLeft") ? parseInt(t.data("originalBorderLeft")) * a.g.ratio : 0;
                var h = t.data("originalBorderRight") ? parseInt(t.data("originalBorderRight")) * a.g.ratio : 0;
                var p = t.data("originalBorderTop") ? parseInt(t.data("originalBorderTop")) * a.g.ratio : 0;
                var d = t.data("originalBorderBottom") ? parseInt(t.data("originalBorderBottom")) * a.g.ratio : 0;
                var v = t.data("originalFontSize");
                var m = t.data("originalLineHeight");
                if (a.g.responsiveMode || a.o.responsiveUnder > 0) {
                    if (t.is("img")) {
                        t.css({
                            width: "auto",
                            height: "auto"
                        });
                        i = t.width();
                        s = t.height();
                        t.css({
                            width: i * a.g.ratio,
                            height: s * a.g.ratio
                        })
                    }
                    if (!t.is("img")) {
                        t.css({
                            width: i,
                            height: s,
                            "font-size": parseInt(v) * a.g.ratio + "px",
                            "line-height": parseInt(m) * a.g.ratio + "px"
                        })
                    }
                    if (t.is("div") && t.find("iframe").data("videoSrc")) {
                        var g = t.find("iframe");
                        g.attr("width", parseInt(g.data("originalWidth")) * a.g.ratio).attr("height", parseInt(g.data("originalHeight")) * a.g.ratio);
                        t.css({
                            width: parseInt(g.data("originalWidth")) * a.g.ratio,
                            height: parseInt(g.data("originalHeight")) * a.g.ratio
                        })
                    }
                    t.css({
                        padding: f + "px " + u + "px " + l + "px " + o + "px ",
                        borderLeftWidth: c + "px",
                        borderRightWidth: h + "px",
                        borderTopWidth: p + "px",
                        borderBottomWidth: d + "px"
                    })
                }
                if (!t.hasClass("ls-bg")) {
                    var y = t;
                    if (t.parent().is("a")) {
                        t = t.parent()
                    }
                    var b = a.o.sublayerContainer > 0 ? (a.g.sliderWidth() - a.o.sublayerContainer) / 2 : 0;
                    b = b < 0 ? 0 : b;
                    if (n.indexOf("%") != -1) {
                        t.css({
                            left: a.g.sliderWidth() / 100 * parseInt(n) - y.width() / 2 - o - c
                        })
                    } else if (b > 0 || a.g.responsiveMode || a.o.responsiveUnder > 0) {
                        t.css({
                            left: b + parseInt(n) * a.g.ratio
                        })
                    }
                    if (r.indexOf("%") != -1) {
                        t.css({
                            top: a.g.sliderHeight() / 100 * parseInt(r) - y.height() / 2 - f - p
                        })
                    } else if (a.g.responsiveMode || a.o.responsiveUnder > 0) {
                        t.css({
                            top: parseInt(r) * a.g.ratio
                        })
                    }
                } else {
                    t.css({
                        width: "auto",
                        height: "auto"
                    });
                    i = t.width();
                    s = t.height();
                    t.css({
                        width: Math.round(i * a.g.ratio),
                        height: Math.round(s * a.g.ratio),
                        marginLeft: -Math.round(i * a.g.ratio) / 2 + "px",
                        marginTop: -Math.round(s * a.g.ratio) / 2 + "px"
                    })
                }
            });
            t.css({
                display: "none",
                visibility: "visible"
            });
            a.resizeShadow();
            n();
            e(this).dequeue();
            if (a.g.normalWidth && a.g.goingNormal) {
                a.g.normalWidth = false;
                a.g.normalHeight = false;
                a.g.normalRatio = false;
                a.g.goingNormal = false
            }
        };
        a.resizeShadow = function () {
            if (a.g.shadow) {
                a.g.shadow.css({
                    height: Math.round(a.g.shadow.data("originalHeight") * a.g.ratio)
                })
            }
        };
        a.resizeSlider = function () {
            if (a.o.responsiveUnder > 0) {
                if (e(window).width() < a.o.responsiveUnder) {
                    a.g.responsiveMode = true;
                    a.g.sliderOriginalWidth = a.o.responsiveUnder + "px"
                } else {
                    a.g.responsiveMode = false;
                    a.g.sliderOriginalWidth = a.g.sliderOriginalWidthRU;
                    a.g.ratio = 1
                }
            }
            if (a.g.responsiveMode) {
                var t = e(o).parent();
                if (a.g.normalRatio && a.g.goingNormal) {
                    e(o).css({
                        width: a.g.normalWidth
                    });
                    a.g.ratio = a.g.normalRatio;
                    e(o).css({
                        height: a.g.normalHeight
                    })
                } else {
                    e(o).css({
                        width: t.width() - parseInt(e(o).css("padding-left")) - parseInt(e(o).css("padding-right"))
                    });
                    a.g.ratio = e(o).width() / parseInt(a.g.sliderOriginalWidth);
                    e(o).css({
                        height: a.g.ratio * parseInt(a.g.sliderOriginalHeight)
                    })
                }
            } else {
                a.g.ratio = 1;
                e(o).css({
                    width: a.g.sliderOriginalWidth,
                    height: a.g.sliderOriginalHeight
                })
            }
            if (e(o).closest(".ls-wp-fullwidth-container").length) {
                e(o).closest(".ls-wp-fullwidth-helper").css({
                    height: e(o).outerHeight(true)
                });
                e(o).closest(".ls-wp-fullwidth-container").css({
                    height: e(o).outerHeight(true)
                });
                e(o).closest(".ls-wp-fullwidth-helper").css({
                    width: e(window).width(),
                    left: -e(o).closest(".ls-wp-fullwidth-container").offset().left
                });
                if (a.g.sliderOriginalWidth.indexOf("%") != -1) {
                    var n = parseInt(a.g.sliderOriginalWidth);
                    var r = e("body").width() / 100 * n - (e(o).outerWidth() - e(o).width());
                    e(o).width(r)
                }
            }
            e(o).find(".ls-inner, .ls-lt-container").css({
                width: a.g.sliderWidth(),
                height: a.g.sliderHeight()
            });
            if (a.g.curLayer && a.g.nextLayer) {
                a.g.curLayer.css({
                    width: a.g.sliderWidth(),
                    height: a.g.sliderHeight()
                });
                a.g.nextLayer.css({
                    width: a.g.sliderWidth(),
                    height: a.g.sliderHeight()
                })
            } else {
                e(o).find(".ls-layer").css({
                    width: a.g.sliderWidth(),
                    height: a.g.sliderHeight()
                })
            }
        };
        a.resizeYourLogo = function () {
            a.g.yourLogo.css({
                width: a.g.yourLogo.data("originalWidth") * a.g.ratio,
                height: a.g.yourLogo.data("originalHeight") * a.g.ratio
            });
            if (a.g.ie78) {
                a.g.yourLogo.css("display", "block")
            } else {
                a.g.yourLogo.fadeIn(300)
            }
            var t = oR = oT = oB = "auto";
            if (a.g.yourLogo.data("originalLeft") && a.g.yourLogo.data("originalLeft").indexOf("%") != -1) {
                t = a.g.sliderWidth() / 100 * parseInt(a.g.yourLogo.data("originalLeft")) - a.g.yourLogo.width() / 2 + parseInt(e(o).css("padding-left"))
            } else {
                t = parseInt(a.g.yourLogo.data("originalLeft")) * a.g.ratio
            }
            if (a.g.yourLogo.data("originalRight") && a.g.yourLogo.data("originalRight").indexOf("%") != -1) {
                oR = a.g.sliderWidth() / 100 * parseInt(a.g.yourLogo.data("originalRight")) - a.g.yourLogo.width() / 2 + parseInt(e(o).css("padding-right"))
            } else {
                oR = parseInt(a.g.yourLogo.data("originalRight")) * a.g.ratio
            }
            if (a.g.yourLogo.data("originalTop") && a.g.yourLogo.data("originalTop").indexOf("%") != -1) {
                oT = a.g.sliderHeight() / 100 * parseInt(a.g.yourLogo.data("originalTop")) - a.g.yourLogo.height() / 2 + parseInt(e(o).css("padding-top"))
            } else {
                oT = parseInt(a.g.yourLogo.data("originalTop")) * a.g.ratio
            }
            if (a.g.yourLogo.data("originalBottom") && a.g.yourLogo.data("originalBottom").indexOf("%") != -1) {
                oB = a.g.sliderHeight() / 100 * parseInt(a.g.yourLogo.data("originalBottom")) - a.g.yourLogo.height() / 2 + parseInt(e(o).css("padding-bottom"))
            } else {
                oB = parseInt(a.g.yourLogo.data("originalBottom")) * a.g.ratio
            }
            a.g.yourLogo.css({
                left: t,
                right: oR,
                top: oT,
                bottom: oB
            })
        };
        a.resizeThumb = function () {
            e(o).find(".ls-thumbnail-slide a").css({
                width: parseInt(a.o.tnWidth * a.g.ratio),
                height: parseInt(a.o.tnHeight * a.g.ratio)
            });
            e(o).find(".ls-thumbnail-slide a:last").css({
                margin: 0
            });
            e(o).find(".ls-thumbnail-slide").css({
                height: parseInt(a.o.tnHeight * a.g.ratio)
            });
            var t = e(o).find(".ls-thumbnail");
            var n = a.o.tnContainerWidth.indexOf("%") == -1 ? parseInt(a.o.tnContainerWidth) : parseInt(parseInt(a.g.sliderOriginalWidth) / 100 * parseInt(a.o.tnContainerWidth));
            t.css({
                width: n * Math.floor(a.g.ratio * 100) / 100
            });
            if (t.width() > e(o).find(".ls-thumbnail-slide").width()) {
                t.css({
                    width: e(o).find(".ls-thumbnail-slide").width()
                })
            }
        };
        a.changeThumb = function (t) {
            var n = t ? t : a.g.nextLayerIndex;
            e(o).find(".ls-thumbnail-slide a:not(.ls-thumb-" + n + ")").children().each(function () {
                e(this).removeClass("ls-thumb-active").stop().fadeTo(750, a.o.tnInactiveOpacity / 100)
            });
            e(o).find(".ls-thumbnail-slide a.ls-thumb-" + n).children().addClass("ls-thumb-active").stop().fadeTo(750, a.o.tnActiveOpacity / 100)
        };
        a.scrollThumb = function () {
            if (!e(o).find(".ls-thumbnail-slide-container").hasClass("ls-thumbnail-slide-hover")) {
                var t = e(o).find(".ls-thumb-active").length ? e(o).find(".ls-thumb-active").parent() : false;
                if (t) {
                    var n = t.position().left + t.width() / 2;
                    var r = e(o).find(".ls-thumbnail-slide-container").width() / 2 - n;
                    r = r > 0 ? 0 : r;
                    r = r < e(o).find(".ls-thumbnail-slide-container").width() - e(o).find(".ls-thumbnail-slide").width() ? e(o).find(".ls-thumbnail-slide-container").width() - e(o).find(".ls-thumbnail-slide").width() : r;
                    e(o).find(".ls-thumbnail-slide").animate({
                        marginLeft: r
                    },
                    600, "easeInOutQuad")
                }
            }
        };
        a.animate = function () {
            a.g.isAnimating = true;
            a.g.isLoading = false;
            clearTimeout(a.g.slideTimer);
            clearTimeout(a.g.changeTimer);
            a.g.stopLayer = a.g.curLayer;
            a.o.cbAnimStart(a.g);
            if (a.o.thumbnailNavigation == "always") {
                a.changeThumb();
                if (!("ontouchstart" in window)) {
                    a.scrollThumb()
                }
            }
            a.g.nextLayer.addClass("ls-animating");
            var t = curLayerRight = curLayerTop = curLayerBottom = nextLayerLeft = nextLayerRight = nextLayerTop = nextLayerBottom = layerMarginLeft = layerMarginRight = layerMarginTop = layerMarginBottom = "auto";
            var u = nextLayerWidth = a.g.sliderWidth();
            var f = nextLayerHeight = a.g.sliderHeight();
            var l = a.g.prevNext == "prev" ? a.g.curLayer : a.g.nextLayer;
            var c = l.data("slidedirection") ? l.data("slidedirection") : a.o.slideDirection;
            var h = a.g.slideDirections[a.g.prevNext][c];
            if (h == "left" || h == "right") {
                u = curLayerTop = nextLayerWidth = nextLayerTop = 0;
                layerMarginTop = 0
            }
            if (h == "top" || h == "bottom") {
                f = t = nextLayerHeight = nextLayerLeft = 0;
                layerMarginLeft = 0
            }
            switch (h) {
                case "left":
                    curLayerRight = nextLayerLeft = 0;
                    layerMarginLeft = -a.g.sliderWidth();
                    break;
                case "right":
                    t = nextLayerRight = 0;
                    layerMarginLeft = a.g.sliderWidth();
                    break;
                case "top":
                    curLayerBottom = nextLayerTop = 0;
                    layerMarginTop = -a.g.sliderHeight();
                    break;
                case "bottom":
                    curLayerTop = nextLayerBottom = 0;
                    layerMarginTop = a.g.sliderHeight();
                    break
            }
            a.g.curLayer.css({
                left: t,
                right: curLayerRight,
                top: curLayerTop,
                bottom: curLayerBottom
            });
            a.g.nextLayer.css({
                width: nextLayerWidth,
                height: nextLayerHeight,
                left: nextLayerLeft,
                right: nextLayerRight,
                top: nextLayerTop,
                bottom: nextLayerBottom
            });
            var p = a.g.curLayer.data("delayout") ? parseInt(a.g.curLayer.data("delayout")) : a.o.delayOut;
            var d = a.g.curLayer.data("durationout") ? parseInt(a.g.curLayer.data("durationout")) : a.o.durationOut;
            var v = a.g.curLayer.data("easingout") ? a.g.curLayer.data("easingout") : a.o.easingOut;
            var m = a.g.nextLayer.data("delayin") ? parseInt(a.g.nextLayer.data("delayin")) : a.o.delayIn;
            var g = a.g.nextLayer.data("durationin") ? parseInt(a.g.nextLayer.data("durationin")) : a.o.durationIn;
            var y = a.g.nextLayer.data("easingin") ? a.g.nextLayer.data("easingin") : a.o.easingIn;
            var b = function () {
                a.g.curLayer.delay(p + d / 15).animate({
                    width: u,
                    height: f
                },
                d, v,
                function () {
                    w()
                })
            };
            var w = function () {
                a.g.stopLayer.find(' > *[class*="ls-s"]').stop(true, true);
                a.o.cbAnimStop(a.g);
                a.g.curLayer = a.g.nextLayer;
                a.g.curLayerIndex = a.g.nextLayerIndex;
                e(o).find(".ls-layer").removeClass("ls-active");
                e(o).find(".ls-layer:eq(" + (a.g.curLayerIndex - 1) + ")").addClass("ls-active").removeClass("ls-animating");
                e(o).find(".ls-bottom-slidebuttons a").removeClass("ls-nav-active");
                e(o).find(".ls-bottom-slidebuttons a:eq(" + (a.g.curLayerIndex - 1) + ")").addClass("ls-nav-active");
                if (a.g.autoSlideshow) {
                    a.timer()
                }
                a.g.isAnimating = false
            };
            var E = function (t) {
                a.g.curLayer.find(' > *[class*="ls-s"]').each(function () {
                    var n = e(this).data("slidedirection") ? e(this).data("slidedirection") : h;
                    var r, i;
                    switch (n) {
                        case "left":
                            r = -a.g.sliderWidth();
                            i = 0;
                            break;
                        case "right":
                            r = a.g.sliderWidth();
                            i = 0;
                            break;
                        case "top":
                            i = -a.g.sliderHeight();
                            r = 0;
                            break;
                        case "bottom":
                            i = a.g.sliderHeight();
                            r = 0;
                            break
                    }
                    var o = e(this).data("slideoutdirection") ? e(this).data("slideoutdirection") : false;
                    switch (o) {
                        case "left":
                            r = a.g.sliderWidth();
                            i = 0;
                            break;
                        case "right":
                            r = -a.g.sliderWidth();
                            i = 0;
                            break;
                        case "top":
                            i = a.g.sliderHeight();
                            r = 0;
                            break;
                        case "bottom":
                            i = -a.g.sliderHeight();
                            r = 0;
                            break
                    }
                    var u = parseInt(e(this).attr("class").split("ls-s")[1]);
                    if (u == -1) {
                        var f = parseInt(e(this).css("left"));
                        var l = parseInt(e(this).css("top"));
                        if (i < 0) {
                            i = -(a.g.sliderHeight() - l)
                        } else if (i > 0) {
                            i = l + e(this).outerHeight()
                        }
                        if (r < 0) {
                            r = -(a.g.sliderWidth() - f)
                        } else if (r > 0) {
                            r = f + e(this).outerWidth()
                        }
                        var c = 1
                    } else {
                        var p = a.g.curLayer.data("parallaxout") ? parseInt(a.g.curLayer.data("parallaxout")) : a.o.parallaxOut;
                        var c = u * p
                    }
                    var d = e(this).data("delayout") ? parseInt(e(this).data("delayout")) : a.o.delayOut;
                    var v = e(this).data("durationout") ? parseInt(e(this).data("durationout")) : a.o.durationOut;
                    var m = e(this).data("easingout") ? e(this).data("easingout") : a.o.easingOut;
                    if (t) {
                        d = 0;
                        v = t
                    }
                    if (o == "fade" || !o && n == "fade") {
                        if (t && a.g.ie78) {
                            e(this).dequeue().css({
                                visibility: "hidden"
                            })
                        } else {
                            if (a.g.isMobile() == true && s().webkit) {
                                e(this).stop().delay(d).fadeTo(v, 0, m,
                                function () {
                                    e(this).css({
                                        visibility: "hidden",
                                        opacity: e(this).data("originalOpacity")
                                    })
                                })
                            } else {
                                e(this).stop(true, true).delay(d).fadeOut(v, m,
                                function () {
                                    e(this).css({
                                        visibility: "hidden",
                                        display: "block"
                                    })
                                })
                            }
                        }
                    } else {
                        e(this).stop().dequeue().delay(d).animate({
                            marginLeft: -r * c,
                            marginTop: -i * c
                        },
                        v, m)
                    }
                })
            };
            var S = function () {
                a.g.nextLayer.delay(p + m).animate({
                    width: a.g.sliderWidth(),
                    height: a.g.sliderHeight()
                },
                g, y)
            };
            var x = function () {
                if (a.g.totalDuration) {
                    p = 0
                }
                a.g.nextLayer.find(' > *[class*="ls-s"]').each(function () {
                    var t = e(this).data("slidedirection") ? e(this).data("slidedirection") : h;
                    var n, r;
                    switch (t) {
                        case "left":
                            n = -a.g.sliderWidth();
                            r = 0;
                            break;
                        case "right":
                            n = a.g.sliderWidth();
                            r = 0;
                            break;
                        case "top":
                            r = -a.g.sliderHeight();
                            n = 0;
                            break;
                        case "bottom":
                            r = a.g.sliderHeight();
                            n = 0;
                            break;
                        case "fade":
                            r = 0;
                            n = 0;
                            break
                    }
                    var i = parseInt(e(this).attr("class").split("ls-s")[1]);
                    if (i == -1) {
                        var o = parseInt(e(this).css("left"));
                        var u = parseInt(e(this).css("top"));
                        if (r < 0) {
                            r = -(u + e(this).outerHeight())
                        } else if (r > 0) {
                            r = a.g.sliderHeight() - u
                        }
                        if (n < 0) {
                            n = -(o + e(this).outerWidth())
                        } else if (n > 0) {
                            n = a.g.sliderWidth() - o
                        }
                        var f = 1
                    } else {
                        var l = a.g.nextLayer.data("parallaxin") ? parseInt(a.g.nextLayer.data("parallaxin")) : a.o.parallaxIn;
                        var f = i * l
                    }
                    var c = e(this).data("delayin") ? parseInt(e(this).data("delayin")) : a.o.delayIn;
                    var d = e(this).data("durationin") ? parseInt(e(this).data("durationin")) : a.o.durationIn;
                    var v = e(this).data("easingin") ? e(this).data("easingin") : a.o.easingIn;
                    var g = e(this);
                    var y = function () {
                        if (a.o.autoPlayVideos == true) {
                            g.find(".ls-videopreview").click()
                        }
                        if (g.data("showuntil") > 0) {
                            a.sublayerShowUntil(g)
                        }
                    };
                    if (t == "fade") {
                        if (a.g.isMobile() == true && s().webkit) {
                            e(this).css({
                                opacity: 0,
                                visibility: "visible",
                                marginLeft: 0,
                                marginTop: 0
                            }).stop().delay(p + m + c).fadeTo(d, e(this).data("originalOpacity"), v,
                            function () {
                                y()
                            })
                        } else {
                            e(this).css({
                                display: "none",
                                visibility: "visible",
                                marginLeft: 0,
                                marginTop: 0
                            }).stop(true, true).delay(p + m + c).fadeIn(d, v,
                            function () {
                                y()
                            })
                        }
                    } else {
                        if (a.g.isMobile() == true && s().webkit) {
                            e(this).css({
                                opacity: e(this).data("originalOpacity")
                            })
                        }
                        e(this).css({
                            marginLeft: n * f,
                            marginTop: r * f,
                            display: "block",
                            visibility: "visible"
                        });
                        e(this).stop().delay(p + m + c).animate({
                            marginLeft: 0,
                            marginTop: 0
                        },
                        d, v,
                        function () {
                            y()
                        })
                    }
                })
            };
            var T = function () {
                if (n(e(o)) && e.transit != undefined && (a.g.nextLayer.data("transition3d") || a.g.nextLayer.data("customtransition3d"))) {
                    if (a.g.nextLayer.data("transition3d") && a.g.nextLayer.data("customtransition3d")) {
                        var t = Math.floor(Math.random() * 2);
                        var r = [["3d", a.g.nextLayer.data("transition3d")], ["custom3d", a.g.nextLayer.data("customtransition3d")]];
                        N(r[t][0], r[t][1])
                    } else if (a.g.nextLayer.data("transition3d")) {
                        N("3d", a.g.nextLayer.data("transition3d"))
                    } else {
                        N("custom3d", a.g.nextLayer.data("customtransition3d"))
                    }
                } else {
                    if (a.g.nextLayer.data("transition2d") && a.g.nextLayer.data("customtransition2d")) {
                        var t = Math.floor(Math.random() * 2);
                        var r = [["2d", a.g.nextLayer.data("transition2d")], ["custom2d", a.g.nextLayer.data("customtransition2d")]];
                        N(r[t][0], r[t][1])
                    } else if (a.g.nextLayer.data("transition2d")) {
                        N("2d", a.g.nextLayer.data("transition2d"))
                    } else if (a.g.nextLayer.data("customtransition2d")) {
                        N("custom2d", a.g.nextLayer.data("customtransition2d"))
                    } else {
                        N("2d", "all")
                    }
                }
            };
            var N = function (e, t) {
                var n = e.indexOf("custom") == -1 ? a.t : a.ct;
                var r = "3d",
                s, o;
                if (e.indexOf("2d") != -1) {
                    r = "2d"
                }
                if (t.indexOf("last") != -1) {
                    o = n["t" + r].length - 1;
                    s = "last"
                } else if (t.indexOf("all") != -1) {
                    o = Math.floor(Math.random() * i(n["t" + r]));
                    s = "random from all"
                } else {
                    var u = t.split(",");
                    var f = u.length;
                    o = parseInt(u[Math.floor(Math.random() * f)]) - 1;
                    s = "random from specified"
                }
                C(r, n["t" + r][o])
            };
            var C = function (t, n) {
                var i = e(o).find(".ls-inner");
                var s = 1e3;
                var u = typeof n.cols == "number" ? n.cols : Math.floor(Math.random() * (n.cols[1] - n.cols[0] + 1)) + n.cols[0];
                var f = typeof n.rows == "number" ? n.rows : Math.floor(Math.random() * (n.rows[1] - n.rows[0] + 1)) + n.rows[0];
                if (a.g.isMobile() == true && a.o.optimizeForMobile == true || a.g.ie78 && a.o.optimizeForIE78 == true) {
                    if (u >= 15) {
                        u = 7
                    } else if (u >= 5) {
                        u = 4
                    } else if (u >= 4) {
                        u = 3
                    } else if (u > 2) {
                        u = 2
                    }
                    if (f >= 15) {
                        f = 7
                    } else if (f >= 5) {
                        f = 4
                    } else if (f >= 4) {
                        f = 3
                    } else if (f > 2) {
                        f = 2
                    }
                    if (f > 2 && u > 2) {
                        f = 2;
                        if (u > 4) {
                            u = 4
                        }
                    }
                }
                var l = e(o).find(".ls-inner").width() / u;
                var c = e(o).find(".ls-inner").height() / f;
                if (!a.g.ltContainer) {
                    a.g.ltContainer = e("<div>").addClass("ls-lt-container").addClass("ls-overflow-hidden").css({
                        width: i.width(),
                        height: i.height()
                    }).prependTo(i)
                } else {
                    a.g.ltContainer.empty().css({
                        width: i.width(),
                        height: i.height()
                    })
                }
                var h = i.width() - Math.floor(l) * u;
                var p = i.height() - Math.floor(c) * f;
                var d = [];
                for (var v = 0; v < u * f; v++) {
                    d.push(v)
                }
                switch (n.tile.sequence) {
                    case "reverse":
                        d.reverse();
                        break;
                    case "col-forward":
                        d = r(f, u, "forward");
                        break;
                    case "col-reverse":
                        d = r(f, u, "reverse");
                        break;
                    case "random":
                        d.randomize();
                        break
                }
                if (t == "3d") {
                    a.g.totalDuration = s + (u * f - 1) * n.tile.delay;
                    var m = 0;
                    if (n.before && n.before.duration) {
                        m += n.before.duration
                    }
                    if (n.animation && n.animation.duration) {
                        m += n.animation.duration
                    }
                    if (n.after && n.after.duration) {
                        m += n.after.duration
                    }
                    a.g.totalDuration += m;
                    var g = 0;
                    if (n.before && n.before.delay) {
                        g += n.before.delay
                    }
                    if (n.animation && n.animation.delay) {
                        g += n.animation.delay
                    }
                    if (n.after && n.after.delay) {
                        g += n.after.delay
                    }
                    a.g.totalDuration += g
                } else {
                    a.g.totalDuration = s + (u * f - 1) * n.tile.delay + n.transition.duration
                }
                for (var y = 0; y < u * f; y++) {
                    var b = y % u == 0 ? h : 0;
                    var S = y > (f - 1) * u - 1 ? p : 0;
                    var T = e("<div>").addClass("ls-lt-tile").css({
                        width: Math.floor(l) + b,
                        height: Math.floor(c) + S
                    }).appendTo(a.g.ltContainer);
                    var N, C;
                    if (t == "3d") {
                        T.addClass("ls-3d-container");
                        var k = Math.floor(l) + b;
                        var L = Math.floor(c) + S;
                        var A;
                        if (n.animation.direction == "horizontal") {
                            if (Math.abs(n.animation.transition.rotateY) > 90 && n.tile.depth != "large") {
                                A = Math.floor(k / 10) + b
                            } else {
                                A = k
                            }
                        } else {
                            if (Math.abs(n.animation.transition.rotateX) > 90 && n.tile.depth != "large") {
                                A = Math.floor(L / 10) + S
                            } else {
                                A = L
                            }
                        }
                        var O = k / 2;
                        var M = L / 2;
                        var _ = A / 2;
                        var D = function (t, n, r, i, s, o, u, a, f) {
                            e("<div>").addClass(t).css({
                                width: r,
                                height: i,
                                transform: "translate3d(" + s + "px, " + o + "px, " + u + "px) rotateX(" + a + "deg) rotateY(" + f + "deg) rotateZ(0deg) scale3d(1, 1, 1)",
                                "-o-transform": "translate3d(" + s + "px, " + o + "px, " + u + "px) rotateX(" + a + "deg) rotateY(" + f + "deg) rotateZ(0deg) scale3d(1, 1, 1)",
                                "-ms-transform": "translate3d(" + s + "px, " + o + "px, " + u + "px) rotateX(" + a + "deg) rotateY(" + f + "deg) rotateZ(0deg) scale3d(1, 1, 1)",
                                "-moz-transform": "translate3d(" + s + "px, " + o + "px, " + u + "px) rotateX(" + a + "deg) rotateY(" + f + "deg) rotateZ(0deg) scale3d(1, 1, 1)",
                                "-webkit-transform": "translate3d(" + s + "px, " + o + "px, " + u + "px) rotateX(" + a + "deg) rotateY(" + f + "deg) rotateZ(0deg) scale3d(1, 1, 1)"
                            }).appendTo(n)
                        };
                        D("ls-3d-box", T, 0, 0, 0, 0, -_, 0, 0);
                        var P = 0;
                        var H = 0;
                        var B = 0;
                        if (n.animation.direction == "vertical" && Math.abs(n.animation.transition.rotateX) > 90) {
                            D("ls-3d-back", T.find(".ls-3d-box"), k, L, -O, -M, -_, 180, 0)
                        } else {
                            D("ls-3d-back", T.find(".ls-3d-box"), k, L, -O, -M, -_, 0, 180)
                        }
                        D("ls-3d-bottom", T.find(".ls-3d-box"), k, A, -O, M - _, 0, -90, 0);
                        D("ls-3d-top", T.find(".ls-3d-box"), k, A, -O, -M - _, 0, 90, 0);
                        D("ls-3d-front", T.find(".ls-3d-box"), k, L, -O, -M, _, 0, 0);
                        D("ls-3d-left", T.find(".ls-3d-box"), A, L, -O - _, -M, 0, 0, -90);
                        D("ls-3d-right", T.find(".ls-3d-box"), A, L, O - _, -M, 0, 0, 90);
                        N = T.find(".ls-3d-front");
                        if (n.animation.direction == "horizontal") {
                            if (Math.abs(n.animation.transition.rotateY) > 90) {
                                C = T.find(".ls-3d-back")
                            } else {
                                C = T.find(".ls-3d-left, .ls-3d-right")
                            }
                        } else {
                            if (Math.abs(n.animation.transition.rotateX) > 90) {
                                C = T.find(".ls-3d-back")
                            } else {
                                C = T.find(".ls-3d-top, .ls-3d-bottom")
                            }
                        }
                        var j = s + d[y] * n.tile.delay;
                        var F = a.g.ltContainer.find(".ls-3d-container:eq(" + y + ") .ls-3d-box");
                        if (n.before && n.before.transition) {
                            n.before.transition.delay = n.before.transition.delay ? n.before.transition.delay + j : j;
                            F.transition(n.before.transition, n.before.duration, n.before.easing)
                        } else {
                            n.animation.transition.delay = n.animation.transition.delay ? n.animation.transition.delay + j : j
                        }
                        F.transition(n.animation.transition, n.animation.duration, n.animation.easing);
                        if (n.after) {
                            F.transition(e.extend({},
                            {
                                scale3d: 1
                            },
                            n.after.transition), n.after.duration, n.after.easing)
                        }
                    } else {
                        var I = L1 = T2 = L2 = "auto";
                        var q = O2 = 1;
                        if (n.transition.direction == "random") {
                            var R = ["top", "bottom", "right", "left"];
                            var U = R[Math.floor(Math.random() * R.length)]
                        } else {
                            var U = n.transition.direction
                        }
                        switch (U) {
                            case "top":
                                I = T2 = -T.height();
                                L1 = L2 = 0;
                                break;
                            case "bottom":
                                I = T2 = T.height();
                                L1 = L2 = 0;
                                break;
                            case "left":
                                I = T2 = 0;
                                L1 = L2 = -T.width();
                                break;
                            case "right":
                                I = T2 = 0;
                                L1 = L2 = T.width();
                                break;
                            case "topleft":
                                I = T.height();
                                T2 = 0;
                                L1 = T.width();
                                L2 = 0;
                                break;
                            case "topright":
                                I = T.height();
                                T2 = 0;
                                L1 = -T.width();
                                L2 = 0;
                                break;
                            case "bottomleft":
                                I = -T.height();
                                T2 = 0;
                                L1 = T.width();
                                L2 = 0;
                                break;
                            case "bottomright":
                                I = -T.height();
                                T2 = 0;
                                L1 = -T.width();
                                L2 = 0;
                                break
                        }
                        if (!a.g.ie78 || a.g.ie78 && !a.o.optimizeForIE78 || a.g.ie78 && a.o.optimizeForIE78 == true && n.name.toLowerCase().indexOf("crossfade") != -1) {
                            switch (n.transition.type) {
                                case "fade":
                                    I = T2 = L1 = L2 = 0;
                                    q = 0;
                                    O2 = 1;
                                    break;
                                case "mixed":
                                    q = 0;
                                    O2 = 1;
                                    T2 = L2 = 0;
                                    break
                            }
                        }
                        N = e("<div>").addClass("ls-curtile").appendTo(T);
                        C = e("<div>").addClass("ls-nexttile").appendTo(T).css({
                            top: -I,
                            left: -L1,
                            dispay: "block",
                            opacity: q
                        });
                        var z = s + d[y] * n.tile.delay;
                        if (a.g.cssTransitions && e.transit != undefined) {
                            C.transition({
                                delay: z,
                                top: 0,
                                left: 0,
                                opacity: O2
                            },
                            n.transition.duration, n.transition.easing);
                            N.transition({
                                delay: z,
                                top: T2,
                                left: L2
                            },
                            n.transition.duration, n.transition.easing)
                        } else {
                            C.delay(z).animate({
                                top: 0,
                                left: 0,
                                opacity: O2
                            },
                            n.transition.duration, n.transition.easing);
                            N.delay(z).animate({
                                top: T2,
                                left: L2
                            },
                            n.transition.duration, n.transition.easing)
                        }
                    }
                    var W = a.g.curLayer.find(".ls-bg");
                    if (W.length) {
                        N.append(e("<img>").attr("src", W.attr("src")).css({
                            width: W[0].style.width,
                            height: W[0].style.height,
                            marginLeft: i.width() / 2 + parseFloat(W.css("margin-left")) - parseInt(T.position().left),
                            marginTop: i.height() / 2 + parseFloat(W.css("margin-top")) - parseInt(T.position().top)
                        }))
                    }
                    var X = a.g.nextLayer.find(".ls-bg");
                    if (X.length) {
                        C.append(e("<img>").attr("src", X.attr("src")).css({
                            width: X[0].style.width,
                            height: X[0].style.height,
                            marginLeft: i.width() / 2 + parseFloat(X.css("margin-left")) - parseInt(T.position().left),
                            marginTop: i.height() / 2 + parseFloat(X.css("margin-top")) - parseInt(T.position().top)
                        }))
                    }
                }
                var V = a.g.curLayer;
                var J = a.g.nextLayer;
                J.find(".ls-bg").css({
                    visibility: "hidden"
                });
                if (t == "3d" && a.g.isHideOn3D(e(o))) {
                    a.g.forceHideControls = true;
                    if (a.g.bottomWrapper) {
                        a.g.bottomWrapper.stop(true, true).fadeOut(300)
                    }
                    if (a.g.yourLogo && a.o.hideYourLogo) {
                        a.g.yourLogo.stop(true, true).fadeOut(500)
                    }
                }
                if (t == "3d") {
                    e(o).find(".ls-fullscreen").stop(true, true).fadeOut(300)
                }
                E(s);
                setTimeout(function () {
                    V.css({
                        width: 0
                    });
                    a.g.ltContainer.removeClass("ls-overflow-hidden");
                    if (a.g.shadow && t == "3d" && a.g.isHideOn3D(e(o))) {
                        a.g.shadow.fadeOut(250)
                    }
                },
                s);
                var K = parseInt(J.data("timeshift")) ? parseInt(J.data("timeshift")) : 0;
                var Q = a.g.totalDuration + K > 0 ? a.g.totalDuration + K : 0;
                setTimeout(function () {
                    x();
                    J.css({
                        width: a.g.sliderWidth(),
                        height: a.g.sliderHeight()
                    })
                },
                Q);
                setTimeout(function () {
                    a.g.ltContainer.addClass("ls-overflow-hidden");
                    J.addClass("ls-active");
                    if (J.find(".ls-bg").length) {
                        J.find(".ls-bg").css({
                            display: "none",
                            visibility: "visible"
                        });
                        if (a.g.ie78) {
                            J.find(".ls-bg").css("display", "block");
                            setTimeout(function () {
                                w()
                            },
                            500)
                        } else {
                            J.find(".ls-bg").fadeIn(500,
                            function () {
                                w()
                            })
                        }
                    } else {
                        w()
                    }
                    if (t == "3d" && a.g.isHideOn3D(e(o))) {
                        a.g.forceHideControls = false;
                        if (a.g.bottomWrapper) {
                            a.g.bottomWrapper.stop(true, true).fadeIn(300)
                        }
                        if (a.g.yourLogo && a.o.hideYourLogo) {
                            a.g.yourLogo.stop(true, true).fadeIn(500)
                        }
                    }
                },
                a.g.totalDuration);
                if (a.g.shadow && t == "3d" && a.g.isHideOn3D(e(o))) {
                    setTimeout(function () {
                        a.g.shadow.fadeIn(250)
                    },
                    a.g.totalDuration - 125)
                }
            };
            transitionType = (a.g.nextLayer.data("transition3d") || a.g.nextLayer.data("transition2d")) && a.t || (a.g.nextLayer.data("customtransition3d") || a.g.nextLayer.data("customtransition2d")) && a.ct ? "new" : "old";
            if (a.o.animateFirstLayer && !a.g.firstLayerAnimated) {
                if (a.g.layersNum == 1) {
                    var p = 0;
                    a.o.cbAnimStop(a.g)
                } else {
                    var k = parseInt(a.g.nextLayer.data("timeshift")) ? parseInt(a.g.nextLayer.data("timeshift")) : 0;
                    var L = transitionType == "new" ? 0 : d;
                    setTimeout(function () {
                        w()
                    },
                    L + Math.abs(k))
                }
                a.g.totalDuration = true;
                x();
                a.g.nextLayer.css({
                    width: a.g.sliderWidth(),
                    height: a.g.sliderHeight()
                });
                if (!a.g.ie78) {
                    a.g.nextLayer.find(".ls-bg").css({
                        display: "none"
                    }).fadeIn(500)
                }
                a.g.firstLayerAnimated = true;
                a.g.isLoading = false
            } else {
                switch (transitionType) {
                    case "old":
                        a.g.totalDuration = false;
                        b();
                        E();
                        S();
                        x();
                        break;
                    case "new":
                        T();
                        break
                }
            }
        };
        a.sublayerShowUntil = function (e) {
            var t = a.g.curLayer;
            if (a.g.prevNext != "prev" && a.g.nextLayer) {
                t = a.g.nextLayer
            }
            var n = t.data("slidedirection") ? t.data("slidedirection") : a.o.slideDirection;
            var r = a.g.slideDirections[a.g.prevNext][n];
            var i = e.data("slidedirection") ? e.data("slidedirection") : r;
            var o, u;
            switch (i) {
                case "left":
                    o = -a.g.sliderWidth();
                    u = 0;
                    break;
                case "right":
                    o = a.g.sliderWidth();
                    u = 0;
                    break;
                case "top":
                    u = -a.g.sliderHeight();
                    o = 0;
                    break;
                case "bottom":
                    u = a.g.sliderHeight();
                    o = 0;
                    break
            }
            var f = e.data("slideoutdirection") ? e.data("slideoutdirection") : false;
            switch (f) {
                case "left":
                    o = a.g.sliderWidth();
                    u = 0;
                    break;
                case "right":
                    o = -a.g.sliderWidth();
                    u = 0;
                    break;
                case "top":
                    u = a.g.sliderHeight();
                    o = 0;
                    break;
                case "bottom":
                    u = -a.g.sliderHeight();
                    o = 0;
                    break
            }
            var l = parseInt(e.attr("class").split("ls-s")[1]);
            if (l == -1) {
                var c = parseInt(e.css("left"));
                var h = parseInt(e.css("top"));
                if (u < 0) {
                    u = -(a.g.sliderHeight() - h)
                } else if (u > 0) {
                    u = h + e.outerHeight()
                }
                if (o < 0) {
                    o = -(a.g.sliderWidth() - c)
                } else if (o > 0) {
                    o = c + e.outerWidth()
                }
                var p = 1
            } else {
                var d = a.g.curLayer.data("parallaxout") ? parseInt(a.g.curLayer.data("parallaxout")) : a.o.parallaxOut;
                var p = l * d
            }
            var v = parseInt(e.data("showuntil"));
            var m = e.data("durationout") ? parseInt(e.data("durationout")) : a.o.durationOut;
            var g = e.data("easingout") ? e.data("easingout") : a.o.easingOut;
            if (f == "fade" || !f && i == "fade") {
                if (a.g.isMobile() == true && s().webkit) {
                    e.delay(v).fadeTo(m, 0, g)
                } else {
                    e.delay(v).fadeOut(m, g)
                }
            } else {
                e.delay(v).animate({
                    marginLeft: -o * p,
                    marginTop: -u * p
                },
                m, g)
            }
        };
        a.debug = function () {
            a.d = {
                history: e("<div>"),
                aT: function (t) {
                    e("<h1>" + t + "</h1>").appendTo(a.d.history)
                },
                aeU: function () {
                    e("<ul>").appendTo(a.d.history)
                },
                aU: function (t) {
                    e("<ul><li>" + t + "</li></ul>").appendTo(a.d.history)
                },
                aL: function (t) {
                    e("<li>" + t + "</li>").appendTo(a.d.history.find("ul:last"))
                },
                aUU: function (t) {
                    e("<ul>").appendTo(a.d.history.find("ul:last li:last"))
                },
                aF: function (e) {
                    a.d.history.find("ul:last li:last").hover(function () {
                        e.css({
                            border: "2px solid red",
                            marginTop: parseInt(e.css("margin-top")) - 2,
                            marginLeft: parseInt(e.css("margin-left")) - 2
                        })
                    },
                    function () {
                        e.css({
                            border: "0px",
                            marginTop: parseInt(e.css("margin-top")) + 2,
                            marginLeft: parseInt(e.css("margin-left")) + 2
                        })
                    })
                },
                show: function () {
                    if (!e("body").find(".ls-debug-console").length) {
                        var t = e("<div>").addClass("ls-debug-console").css({
                            position: "fixed",
                            zIndex: "10000000000",
                            top: "10px",
                            right: "10px",
                            width: "300px",
                            padding: "20px",
                            background: "black",
                            "border-radius": "10px",
                            height: e(window).height() - 60,
                            opacity: 0,
                            marginRight: 150
                        }).appendTo(e("body")).animate({
                            marginRight: 0,
                            opacity: .9
                        },
                        600, "easeInOutQuad").click(function (t) {
                            if (t.shiftKey && t.altKey) {
                                e(this).animate({
                                    marginRight: 150,
                                    opacity: 0
                                },
                                600, "easeInOutQuad",
                                function () {
                                    e(this).remove()
                                })
                            }
                        });
                        var n = e("<div>").css({
                            width: "100%",
                            height: "100%",
                            overflow: "auto"
                        }).appendTo(t);
                        var r = e("<div>").css({
                            width: "100%"
                        }).appendTo(n).append(a.d.history)
                    }
                },
                hide: function () {
                    e("body").find(".ls-debug-console").remove()
                }
            };
            e(o).click(function (e) {
                if (e.shiftKey && e.altKey) {
                    a.d.show()
                }
            })
        };
        a.load()
    };
    var n = function (t) {
        var n = e("<div>"),
        r = false,
        i = false,
        s = ["perspective", "OPerspective", "msPerspective", "MozPerspective", "WebkitPerspective"];
        transform = ["transformStyle", "OTransformStyle", "msTransformStyle", "MozTransformStyle", "WebkitTransformStyle"];
        for (var o = s.length - 1; o >= 0; o--) {
            r = r ? r : n[0].style[s[o]] != undefined
        }
        for (var o = transform.length - 1; o >= 0; o--) {
            n.css("transform-style", "preserve-3d");
            i = i ? i : n[0].style[transform[o]] == "preserve-3d"
        }
        if (r && n[0].style[s[4]] != undefined) {
            n.attr("id", "ls-test3d").appendTo(t);
            r = n[0].offsetHeight === 3 && n[0].offsetLeft === 9;
            n.remove()
        }
        return r && i
    };
    var r = function (e, t, n) {
        var r = [];
        if (n == "forward") {
            for (var i = 0; i < e; i++) {
                for (var s = 0; s < t; s++) {
                    r.push(i + s * e)
                }
            }
        } else {
            for (var i = e - 1; i > -1; i--) {
                for (var s = t - 1; s > -1; s--) {
                    r.push(i + s * e)
                }
            }
        }
        return r
    };
    Array.prototype.randomize = function () {
        var e = this.length,
        t, n, r;
        if (e == 0) return false;
        while (--e) {
            t = Math.floor(Math.random() * (e + 1));
            n = this[e];
            r = this[t];
            this[e] = r;
            this[t] = n
        }
        return this
    };
    var i = function (e) {
        var t = 0;
        for (var n in e) {
            if (e.hasOwnProperty(n)) {
                ++t
            }
        }
        return t
    };
    var s = function () {
        uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            }
        };
        var e = uaMatch(navigator.userAgent),
        t = {};
        if (e.browser) {
            t[e.browser] = true;
            t.version = e.version
        }
        if (t.chrome) {
            t.webkit = true
        } else if (t.webkit) {
            t.safari = true
        }
        return t
    };
    lsPrefixes = function (e, t) {
        var n = ["webkit", "khtml", "moz", "ms", "o", ""];
        var r = 0,
        i, s;
        while (r < n.length && !e[i]) {
            i = t;
            if (n[r] == "") {
                i = i.substr(0, 1).toLowerCase() + i.substr(1)
            }
            i = n[r] + i;
            s = typeof e[i];
            if (s != "undefined") {
                n = [n[r]];
                return s == "function" ? e[i]() : e[i]
            }
            r++
        }
    };
    t.global = {
        version: "4.1.0",
        isMobile: function () {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                return true
            } else {
                return false
            }
        },
        isHideOn3D: function (e) {
            if (e.css("padding-bottom") == "auto" || e.css("padding-bottom") == "none" || e.css("padding-bottom") == 0 || e.css("padding-bottom") == "0px") {
                return true
            } else {
                return false
            }
        },
        cssTransitions: !s().msie || s().msie && s().version > 9 ? true : false,
        ie78: s().msie && s().version < 9 ? true : false,
        normalWidth: false,
        normalHeight: false,
        normalRatio: false,
        goingNormal: false,
        paused: false,
        pausedByVideo: false,
        autoSlideshow: false,
        isAnimating: false,
        layersNum: null,
        prevNext: "next",
        slideTimer: null,
        sliderWidth: null,
        sliderHeight: null,
        slideDirections: {
            prev: {
                left: "right",
                right: "left",
                top: "bottom",
                bottom: "top"
            },
            next: {
                left: "left",
                right: "right",
                top: "top",
                bottom: "bottom"
            }
        },
        v: {
            d: 500,
            fo: 750,
            fi: 500
        }
    };
    t.options = {
        autoStart: true,
        firstLayer: 1,
        twoWaySlideshow: true,
        keybNav: true,
        imgPreload: true,
        navPrevNext: true,
        navStartStop: true,
        navButtons: true,
        skin: "glass",
        skinsPath: "layerslider/skins/undefined.undefined",
        pauseOnHover: true,
        globalBGColor: "transparent",
        globalBGImage: false,
        animateFirstLayer: true,
        yourLogo: false,
        yourLogoStyle: "left: -10px; top: -10px;",
        yourLogoLink: false,
        yourLogoTarget: "_blank",
        touchNav: true,
        loops: 0,
        forceLoopNum: true,
        autoPlayVideos: true,
        autoPauseSlideshow: "auto",
        youtubePreview: "maxresdefault.jpg",
        responsive: true,
        randomSlideshow: false,
        responsiveUnder: 0,
        sublayerContainer: 0,
        thumbnailNavigation: "hover",
        tnWidth: 100,
        tnHeight: 60,
        tnContainerWidth: "60%",
        tnActiveOpacity: 35,
        tnInactiveOpacity: 100,
        hoverPrevNext: true,
        hoverBottomNav: false,
        optimizeForMobile: true,
        optimizeForIE78: true,
        hideYourLogo: false,
        allowFullScreenMode: false,
        cbInit: function (e) { },
        cbStart: function (e) { },
        cbStop: function (e) { },
        cbPause: function (e) { },
        cbAnimStart: function (e) { },
        cbAnimStop: function (e) { },
        cbPrev: function (e) { },
        cbNext: function (e) { },
        slideDirection: "right",
        slideDelay: 4e3,
        parallaxIn: .45,
        parallaxOut: .45,
        durationIn: 1500,
        durationOut: 1500,
        easingIn: "easeInOutQuart",
        easingOut: "easeInOutQuart",
        delayIn: 0,
        delayOut: 0
    }
})(jQuery)