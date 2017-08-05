$(function() {
    // 二级导航
    (function() {
        var navbar = $('.navbar');
        var lis = navbar.children('li');
        var timer = null;
        var mouseinsub = false;
        var navbar_item = navbar.children('.navbar_item');
        navbar_item.each(function(i) {
            if (parseFloat(navbar_item.eq(i).css("width")) < 70) {
                navbar_item.eq(i).children('ul').css("marginLeft", "-50%");
            }
        });
        navbar_item.mouseenter(function() {
            mouseinsub = true;
        }).mouseleave(function() {
            mouseinsub = false;
        });
        lis.mouseenter(function(e) {
            e.stopPropagation();
            if (!$(this).hasClass('hover')) {
                $(this).addClass('hover').siblings('.hover').removeClass('hover');
            }
        }).mouseleave(function() {
            clearTimeout(timer);
            var self = this;
            if ($(this).hasClass('navbar_item')) {
                timer = setTimeout(function() {
                    if (mouseinsub) {
                        return;
                    }
                    $(self).removeClass('hover');
                }, 300);
            } else {
                $(this).removeClass('hover');
            }
        });
    })();
    //输入框获得焦点
    (function() {
        var input = $('input');
        input.focus(function() {
            $(this).parent().addClass('active');
        }).blur(function() {
            $(this).parent().removeClass('active');
        });
    })();
    // 轮播动画
    (function() {
        var carousel = $(".carousel"); //保存轮播图
        var imgs = carousel.find("ul li"); //保存图片集合
        var cur = 0; //保存当前图片下标
        var timer = setInterval(startAuto, 3000); //启动自动轮播
        //生成按钮指示器
        var html = "";
        imgs.each(function(i) {
            html += "<li><a href='#'></a></li>";
        });
        carousel.children('ol').html(html).children().eq(0).addClass('active');
        var indicators = carousel.find("ol li"); //保存按钮集合
        if (imgs.size() == 1) {
            clearInterval(timer);
            timer = null;
            indicators.parent().hide();
        }
        carousel.mouseenter(function(e) {
            e.stopPropagation();
            clearInterval(timer);
        }).mouseleave(function(e) {
            e.stopPropagation();
            timer = setInterval(startAuto, 3000);
        });
        indicators.children("a").click(function(e) {
            e.preventDefault();
            var now = $(this).parent().index();
            if (now != cur) {
                imgs.eq(cur).stop().fadeOut(500);
                imgs.eq(now).stop().fadeIn(500);
                indicators.removeClass("active").eq(now).addClass("active");
                cur = now;
            }
        });

        function startAuto() { //启动轮播
            if (cur < imgs.size() - 1) {
                imgs.eq(cur).stop().fadeOut(500);
                imgs.eq(cur + 1).stop().fadeIn(500);
                indicators.removeClass().eq(cur + 1).addClass("active");
                cur++;
            } else {
                imgs.eq(cur).stop().fadeOut(500);
                imgs.eq(0).stop().fadeIn(500);
                indicators.removeClass().eq(0).addClass("active");
                cur = 0;
            }
        }
    })();
    //左右切换方法封装
    (function($){
        $.fn.moveDir = function(num, slideNum, auto, speed) {
        slideNum = slideNum || 1;
        auto = auto || false;
        speed = speed || 2000;
        var self=this;
        //生成按钮和指示器
        var ol = this.find('ol'),
            number = this.find('ul').children('li').size();
        if (ol.length === 0) {
            var html = this.html();
            html += "<span class='btn btn-left'><i></i></span><span class='btn btn-right'><i></i></span>";
            this.html(html);
        } else {
            var html1 = "";
            for (var i = 0; i < number; i++) {
                html1 += "<li></li>";
            }
            ol.html(html1).children('li').eq(0).addClass('active');
        }
        var element = this.find('ul'),
            indicators = ol.children('li'),
            prevBtn = this.children('.btn-left'),
            nextBtn = this.children('.btn-right'),
            Liwidth = element.children('li').outerWidth(true),
            moved = 0, //保存已经移动的LI个数
            timer = null;
        element.css("width", Liwidth * number);
        //如果图片个数小于等于一屏展示的个数，则隐藏左右按钮和指示器
        element.find('h3').eq(0).addClass('active');
        if (number <= num) {
            prevBtn.hide();
            nextBtn.hide();
            ol.hide();
            return;
        }
        if (auto) {
            timer = setInterval(autoPlay, speed);
        }
        this.mouseenter(function(e) {
            e.stopPropagation();
            console.log(1);
            nextBtn.stop().css("display", "none").fadeIn();
            prevBtn.stop().css("display", "none").fadeIn();
            if (auto) {
                clearInterval(timer);
                timer = null;
            }
        }).mouseleave(function(e) {
            e.stopPropagation();
            console.log(2);
            prevBtn.stop().fadeOut();
            nextBtn.stop().fadeOut();
            if (auto) {
                timer = setInterval(autoPlay, speed);
            }
        });
        nextBtn.click(function(e) {
            e.stopPropagation();
            if (!element.is(':animated')) {
                move(slideNum);
            }
        });
        prevBtn.click(function(e) {
            e.stopPropagation();
            if (!element.is(':animated')) {
                move(-1 * slideNum);
            }
        });
        indicators.click(function() {
            var cur = $(this).siblings('.active').index();
            var now = $(this).index();
            if (!element.is(':animated')) {
                $(this).addClass('active').siblings('.active').removeClass('active');
                move(now - cur);
            }
        });

        function autoPlay() {
            if (indicators.length !== 0) {
                var i = ol.children('.active').index();
                if (i == number - 1) {
                    indicators.removeClass('active').eq(0).addClass('active');
                } else {
                    indicators.removeClass('active').eq(i + 1).addClass('active');
                }
            }
            move(slideNum);
        }
        //是否启动自动轮播
        function move(dir) { //移动图片
            element.find('h3.active').removeClass('active');
            if (dir > 0 && number - moved <= num) {
                moved = 0;
                element.animate({
                    left: 0,
                }, 400, function() {
                    element.children().eq(moved).children('h3').addClass('active');
                });
            } else if (dir < 0 && moved <= 0) {
                moved = number - num;
                element.animate({
                    left: -1 * moved * Liwidth
                }, 400, function() {
                    element.children().eq(moved).children('h3').addClass('active');
                });
            } else {
                moved += dir;
                element.animate({
                    left: -1 * moved * Liwidth
                }, 400, function() {
                    element.children().eq(moved).children('h3').addClass('active');
                });
            }
        }
    };
    })(jQuery);
    
    (function() {
        //校园资讯
        $('.row1_photos').moveDir(1, true, 3000);
        //教师风采
        $('.teachers').moveDir(8, true, 2000);
        //学校应用
        $('.apps').moveDir(5, true, 2000);
        //现任领导
        $('.leaders').moveDir(1, true, 2000);
    })();
    //空间动态
    (function() {
        var space = $('.space');
        var Liheight = parseFloat(space.children('li').eq(0).css("height"));
        var offset = 17;
        var number = space.children('li').size();
        var timer = setInterval(moveUp, 1000);
        if (number <= 4) {
            clearInterval(timer);
        }
        space.mouseenter(function(e) {
            e.stopPropagation();
            clearInterval(timer);
            timer = null;
        }).mouseleave(function(e) {
            timer = setInterval(moveUp, 1000);
        });

        function moveUp() {
            space.animate({
                top: '-=' + space.children('li:eq(0)').outerHeight(true)
            }, 400, function() {
                space.append(space.children().eq(0));
                space.css("top", 0);
            });
        }
    })();
});
