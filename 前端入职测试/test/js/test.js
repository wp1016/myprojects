$(function ($) {
    //解决IE不兼容bind方法
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }
    (function () {
        //顶部搜索建议
        var main_top=$(".main_top");
        var dropdown_btn=main_top.find(".dropdown_btn");
        dropdown_btn.click(function (e) {
            e.stopPropagation();
            var next=$(this).next();
            if(next.css("display")==="none"){
                next.stop().fadeIn()
            }
            next.find("a").off("click").click(function (e) {
                e.preventDefault();
                var html=dropdown_btn.children("span").html();
                dropdown_btn.children("span").html($(this).html());
                $(this).html(html);
                next.stop().fadeOut();
            })
        });
        $(document).click(function (e) {
            e.stopPropagation();
            dropdown_btn.next().stop().fadeOut();
        })
    })();
    (function () {
        //猜你喜欢图片hover事件
        var images=$(".main_section").find(".curriculum").children("dt");
        images.mouseenter(function () {
            $(this).children("p").stop().animate({
                bottom:0
            },200)
        }).mouseleave(function () {
            $(this).children("p").stop().animate({
                bottom:-20
            },200)
        })
    })();
    (function () {
        //选项卡
        var tab_item=$(".tabs").children("li");
        tab_item.click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            if(!$(this).hasClass("active")){
                $(this).addClass("active").siblings(".active").removeClass("active")
                    .parents(".header").siblings(".content").children()
                    .children(".tab_content").hide()
                    .eq($(this).index()).fadeIn(300)
            }
        })
    })();
    (function () {
        //手风琴组件
        $(".accordion").on("mouseenter","li",function (e) {
            e.stopPropagation();
            if(!$(this).hasClass("active")){
                $(this).addClass("active").siblings(".active").removeClass("active");
                $(this).siblings().children(".active").removeClass("active");
                $(this).children("div:not('.title')").addClass("active").parent().siblings()
                    .children(".active").removeClass("active")
            }
        });
    })();
    //轮播动画
    (function () {
        var carousel=$(".carousel");//保存轮播图容器
        var imgs=carousel.find(".carousel_images li");//保存图片
        var indicators=carousel.find(".carousel_indicators li");//保存指示器
        var cur=0;//获取当前下标
        var timer=setInterval(startAuto,3000);//自动轮播
        carousel.mouseover(function (e) {
            e.stopPropagation();
            clearInterval(timer);
        }).mouseout(function (e) {
            e.stopPropagation();
            timer=setInterval(startAuto,3000);
        });
        if(imgs.size()<=1){
            clearInterval(timer);
            timer=null;
            indicators.parent().hide();
        }
        indicators.children("a").click(function () {
            var now=$(this).parent().index();
            if(now!==cur){
                imgs.eq(cur).stop().fadeOut(500);
                imgs.eq(now).stop().fadeIn(500);
                indicators.removeClass("active").eq(now).addClass("active");
                cur=now;
            }
        });
        function startAuto(){//启动轮播
            if(cur<imgs.size()-1){
                imgs.eq(cur).stop().fadeOut(500);
                imgs.eq(cur+1).stop().fadeIn(500);
                indicators.removeClass().eq(cur+1).addClass("active");
                cur++;
            }else{
                imgs.eq(cur).stop().fadeOut(500);
                imgs.eq(0).stop().fadeIn(500);
                indicators.removeClass().eq(0).addClass("active");
                cur=0;
            }
        }
    })();
});
