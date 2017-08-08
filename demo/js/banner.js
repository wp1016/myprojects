// JavaScript Document
var indexAnimate = {
    bannerFn: function() { //banner动画
        var oBanner = $('.m_banner'),
            oLi = oBanner.find('ul').eq(0).find('li'),
            inow = 0,
            iold = 0,
            Time = null,
            Time2 = null,
            onoff = true,
            // 创建page小圆点和左右按钮
            html='<ul class="page">';
            oLi.each(function () {
                html+='<li></li>'
            });
            html+='</ul>';
        oBanner.append(html+'<div class="banner_btn"><a href="#" class="pre-btn"><i></i></a><a href="#" class="next-btn"><i></i></a></div>');
        var oPageLi = oBanner.find('ul').eq(1).find('li');
        var oPagePre = oBanner.find('.pre-btn');
        var oPageNext = oBanner.find('.next-btn');


        bannerAniamte(0);

        if (oLi.length <= 1) {
            oPageLi.hide();
            oBanner.find(".banner_btn").hide();
        }
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
            oLi.find('.m_wrap').children().hide();
            oLi.eq(inow).fadeIn(600, function() {
                $(this).find('.m_wrap').children().each(function() {
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
                oLi.eq(iold).find('.m_wrap').children() && oLi.eq(iold).find('.m_wrap').children().each(function() {
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
}
indexAnimate.bannerFn();


