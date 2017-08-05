// JavaScript Document
$.fn.extend({
    FnManth: function(PrevBtn, NextBtn, scrollobj, scrollChildtag, num, dir, time, auto) { //轮播滚动
        $(this).each(function() {
            $(this).attr('onoff', true)
            var oBox = $(this);
            var oPrevBtn = PrevBtn && oBox.find(PrevBtn);
            var oNextBtn = NextBtn && oBox.find(NextBtn);
            var oUl = oBox.find(scrollobj);
            var aLi = oUl.find(scrollChildtag);
            var dirNew = dir == 1 || dir == 2 ? 'left' : 'top';
            var iscale = dirNew == 'left' ? aLi.eq(0).outerWidth(true) : aLi.eq(0).outerHeight(true);
            var timer = null;
            oUl.css({
                dirNew: aLi.length * iscale
            });
            var inum = aLi.length / num;
            if (inum < 1) return false;

            oBox.hover(function() {
                oPrevBtn && oPrevBtn.add(oNextBtn).fadeIn();
                clearInterval(timer);
            }, function() {
                oPrevBtn && oPrevBtn.add(oNextBtn).fadeOut();
                auto && initFn();
            });

            oPrevBtn && oPrevBtn.click(function() {
                fnScroll(1);
                return false;
            });
            oPrevBtn && oNextBtn.click(function() {
                fnScroll(2);
                return false;
            });

            auto && initFn();

            function initFn() {
                if (timer) clearInterval(timer);
                timer = setInterval(function() {
                    fnScroll(dirNew == 'left' ? 2 : 4);
                }, 3000)
            }

            function fnScroll(dir) {
                onOff = false;
                if (dir == 1) {
                    oBox.find(scrollChildtag + ':last').prependTo(oBox.find(scrollobj));
                    oBox.find(scrollobj).css({
                        'left': -iscale
                    }).stop(true, false).animate({
                        'left': '0'
                    }, time * 100, function() {
                        onOff = true;
                    });
                }
                else if (dir == 2) {
                    oBox.find(scrollobj).stop(true, false).animate({
                        'left': -iscale
                    }, time * 100, function() {
                        oBox.find(scrollChildtag + ':first').appendTo(oBox.find(scrollobj));
                        $(this).css({
                            'left': '0'
                        });
                        onOff = true;
                    })
                }
                else if (dir == 3) {
                    oBox.find(scrollChildtag + ':last').prependTo(oBox.find(scrollobj));
                    oBox.find(scrollobj).css({
                        'top': -iscale
                    }).stop(true, false).animate({
                        'top': '0'
                    }, time * 100, function() {
                        onOff = true;
                    });
                }
                else {
                    oBox.find(scrollobj).stop(true, false).animate({
                        'top': -iscale
                    }, time * 100, function() {
                        oBox.find(scrollChildtag + ':first').appendTo(oBox.find(scrollobj));
                        $(this).css({
                            'top': '0'
                        });
                        onOff = true;
                    });
                }
            }
        })
    }

});



var indexAnimate = {
    onoffAnimate: supportCss3('animation'),
    init: function() {
        
        $('.trends-rect').FnManth('', '', 'ul', 'li', 6, 3, 6, true);
        indexAnimate.MantleFn();
            
        
        this.bannerFn();
        
    },
    bannerFn: function() { //banner动画
        var oBanner = $('.m_banner');
        var oLi = oBanner.find('ul').eq(0).find('li');
        var inow = 0;
        var iold = 0;
        var Time = null;
        var Time2 = null;
        var onoff = true;
        // 创建page小圆点和左右按钮
        var html='<ul class="page">';
        oLi.each(function () {
            html+='<li></li>'
        });
        html+='</ul>';
        oBanner.append(html+'<div class="banner_btn"><a href="#" class="pre-btn"><i></i></a><a href="#" class="next-btn"><i></i></a></div>');
        var oPageLi = oBanner.find('ul').eq(1).find('li');
        var oPagePre = oBanner.find('.pre-btn');
        var oPageNext = oBanner.find('.next-btn');


        bannerAniamte(0);

        if (oLi.length <= 1) oPageLi.hide();
        into();

        oPagePre.click(function() {
            if (!onoff || oLi.length <= 1) return false;
            onoff = false;
            inow--
            if (inow == -1) inow = oLi.length - 1;
            bannerAniamte(inow, iold);
            iold = inow;
            return false;
        });

        oPageNext.click(function() {
            if (!onoff || oLi.length <= 1) return false;
            onoff = false;
            inow++
            inow %= oLi.length;
            bannerAniamte(inow, iold);
            iold = inow;
            return false;
        });

        oPageLi.click(function() {
            if (!onoff || oLi.length <= 1) return false;
            onoff = false;
            inow = $(this).index();
            bannerAniamte(inow, iold);
            iold = inow;
        });

        //当只有一张banner图的时候此处屏蔽
        oBanner.hover(function() {
            clearInterval(Time);
            oBanner.find(".banner_btn").stop().show();
        }, function() {
            oBanner.find(".banner_btn").stop().hide();
            into();

        });

        //鼠标移上
        oBanner.mouseover(function() {
            clearInterval(oBanner.timer);
            oBanner.find("p").find("span").stop().fadeIn("slow");
        })

        function into() {
            Time = setInterval(function() { //自动播放
                if (!onoff || oLi.length <= 1) return false;
                onoff = false;
                inow++
                inow %= oLi.length;
                bannerAniamte(inow, iold);
                iold = inow;
            }, 5000);
        }

        function bannerAniamte(inow, iold) {
            oLi.find('p').hide();
            oLi.eq(inow).fadeIn(600, function() {
                $(this).find('p').each(function() {
                    var _this = $(this);
                    setTimeout(function() {
                        _this.show();
                    }, 300);
                    addClassFn($(this));
                });
                if (Time2) {
                    clearTimeout(Time2)
                };
                Time2 = setTimeout(function() {
                    onoff = true;
                }, 1000)
            });
            oPageLi.eq(iold) && oPageLi.eq(iold).removeClass('active')
            oLi.eq(iold) && oLi.eq(iold).fadeOut(500),
                oLi.eq(iold).find('p') && oLi.eq(iold).find('p').each(function() {
                    removeClassFn($(this));
                });
            oPageLi.eq(inow).addClass('active');
            oPageLi.eq(iold).removeClass('active');
        }

        function addClassFn(obj) {
            obj.addClass('animated ' + obj.attr('data-animateName'));
        }

        function removeClassFn(obj) {
            obj.removeClass('animated ' + obj.attr('data-animateName'));
        }
    },
    screenAnimate: function() { //随屏滚动动画
        var oScreenRect = $('div[name="animate-rect"]');
    },
    MantleFn: function() { //成功展示动画
        $('.mantle').each(function() {
            var _this = $(this);
            if (_this.attr('onoff')) {
                return false
            };
            _this.attr('onoff', true);
            var oCaseBox = _this;
            var oCaseul = oCaseBox.find('.pig_img');
            var oCaseLi = oCaseul.find('li');
            var oPrevBtn = oCaseBox.find('.prev');
            var oNextBtn = oCaseBox.find('.next');
            var iW = oCaseul.find('li').innerWidth(true);
            var ilen = oCaseul.find('li').length;
            var onOff = true;
            var oClick = oCaseBox.find('.pageList');
            var str = '';
            var iOld = 0;
            var iNow = 0;
            var timer = null;

            oCaseul.css({
                width: iW * ilen
            });

            if (ilen <= 1) return false;
            var timer = null;
            init();
            oCaseBox.hover(function() {
                clearInterval(timer);
            }, function() {
                init();
            })

            for (var i = 0; i < ilen; i++) {
                str += "<li></li>"
            }
            oClick.append(str);
            var oClickLi = oClick.find('li');
            oClickLi.eq(0).addClass('cur');

            oClick.find('li').click(function() {
                iNow = $(this).index();
                if (iNow == iOld) return false;
                fnScroll(iOld, iNow);
                iOld = iNow;
            });
            oNextBtn.click(function() {
                iNow++
                if (iNow >= ilen) {
                    iNow = 0;
                }
                fnScroll(iOld, iNow);
                iOld = iNow;
                return false;
            });

            oPrevBtn.click(function() {
                iNow--
                if (iNow <= -1) {
                    iNow = ilen - 1;
                }
                fnScroll(iOld, iNow);
                iOld = iNow;
                return false;
            });

            function init() {
                if (timer) clearInterval(timer);
                timer = setInterval(function() {
                    iNow++
                    if (iNow >= ilen) {
                        iNow = 0;
                    }
                    fnScroll(iOld, iNow);
                    iOld = iNow;
                }, 5000)
            }

            function fnScroll(old, now) {
                oClickLi.eq(now).attr({
                    'class': 'cur'
                }).siblings().attr({
                    'class': ''
                });
                if (now > old) {
                    oCaseLi.eq(now).insertAfter(oCaseLi.eq(old));
                    oCaseul.stop(true, false).animate({
                        'left': -iW
                    }, function() {
                        oCaseul.css({
                            'left': '0'
                        });
                        oCaseLi.eq(now).prependTo(oCaseul);
                    })
                }
                else {
                    oCaseLi.eq(now).insertBefore(oCaseLi.eq(old));
                    oCaseul.css({
                        left: -iW
                    });
                    oCaseul.stop(true, false).animate({
                        left: 0
                    })
                }
            }
        })
    }
}
indexAnimate.init();


function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function(string) {
            return string.replace(/-(\w)/g, function($0, $1) {
                return $1.toUpperCase();
            });
        };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}
