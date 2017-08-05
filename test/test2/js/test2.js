$(function() {
    //输入框获得焦点
    (function(){
        var input=$('input');
        input.focus(function() {
            $(this).parent().addClass('active');
        }).blur(function(){
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
        var html="";
        imgs.each(function(i) {
            html+="<li><a href='#'></a></li>";
        });
        carousel.children('ol').html(html).children().eq(0).addClass('active')
        var indicators = carousel.find("ol li");//保存按钮集合
        if (imgs.size() == 1) {
            clearInterval(timer);
            timer = null;
            indicators.parent().hide();
        }
        carousel.mouseenter(function() {
            clearInterval(timer);
        }).mouseleave(function() {
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
    //校园资讯
    (function() {
        var photos=$(".row1_photos");
        //生成左右按钮
        var html=photos.html();
        html+="<p class='btn-left'><span></span></p><p class='btn-right'><span></span></p>";
        photos.html(html);
        var ul=photos.children('ul');
        var Lis=photos.find('li');
        var Liwidth = parseFloat(Lis.eq(0).css("width"));
        var prevBtn = photos.children('.btn-left');
        var nextBtn = photos.children('.btn-right');
        if (Lis.size() == 1) {
            prevBtn.css("display", "none");
            nextBtn.css("display", "none");
        }
        photos.mouseenter(function(e) {
            nextBtn.stop().css("display","none").fadeIn();
            prevBtn.stop().css("display","none").fadeIn();
        });
        photos.mouseleave(function(e) {
            prevBtn.stop().fadeOut();
            nextBtn.stop().fadeOut();
        });
        // 更新界面
        updateView();
        function updateView(){
            var Lis=ul.children();
            ul.css("width",Liwidth*Lis.size());
            Lis.each(function(i) {
                Lis.eq(i).css("left", (i-1) * Liwidth);
                if(parseFloat(Lis.eq(i).css("left"))===0){
                    Lis.css("zIndex",0).find('h3').removeClass('active');
                    Lis.eq(i).css("zIndex",100).children('h3').addClass('active');
                }
        });

        }
        function move(dir) { //开始移动
            Lis.each(function(i) {
                if(dir>0&&parseFloat(Lis.eq(i).css("left"))==-1*dir*Liwidth){
                    Lis.eq(i).css("left",(Lis.size()-1)*dir*Liwidth+"px");
                }else if(dir<0&&parseFloat(Lis.eq(i).css("left"))==-1*dir*(Lis.size()-1)*Liwidth){
                    Lis.eq(i).css("left",dir*Liwidth+"px");
                }
                Lis.css("zIndex",0).find('h3').removeClass('active');
                var left=parseFloat(Lis.eq(i).css("left"));
                Lis.eq(i).animate({
                    left: left-dir*Liwidth
                    },400,function(){
                        Lis.each(function(i) {
                            if(parseFloat(Lis.eq(i).css("left"))===0){
                                Lis.eq(i).css("zIndex",100).children('h3').addClass('active');
                        }
                    });
                });
            });
        }
        nextBtn.click(function(e){
            e.stopPropagation();
            Lis.each(function(i) {
                if(parseFloat(Lis.eq(i).css("left"))===0){
                    move(1); 
                }
            });
        });
        prevBtn.click(function(e) {
            e.stopPropagation();
            Lis.each(function(i) {
                if(parseFloat(Lis.eq(i).css("left"))===0){
                    move(-1); 
                }
            });
        });
    })();
    //左右移动方法封装
    $.fn.moveDir=function(num){
        //生成左右按钮
        var html=$(this).html();
        html+="<span class='btn btn-left'><i></i></span><span class='btn btn-right'><i></i></span>";
        $(this).html(html);
        var element=$(this).find('ul');
        var prevBtn=$(this).children('.btn-left');
        var nextBtn=$(this).children('.btn-right');
        var Liwidth=parseFloat(element.children('li').eq(0).css("width"));
        var offset=parseFloat(element.css("left"));
        var moved=0;//保存已经左移的LI的个数
        var number=element.children('li').size();
        var Lis=element.children();
        element.css("width",Liwidth*number);
        Lis.each(function(i) {
           Lis.eq(i).css("left",i*Liwidth+"px");
        });
        //如果图片个数小于等于一屏展示的个数，则隐藏左右按钮
        if(number<=num){
            prevBtn.hide();
            nextBtn.hide();
        }
        function move(dir){//移动图片
            if(dir>0&&number-moved==num){
                element.animate({
                    left:0
                    },400,function(){
                        moved=0;
                    });
            }else if(dir<0&&moved===0){
                element.animate({
                    left:-1*Liwidth*(number-num)
                    },400, function() {
                        moved=number-num;
                });
            }else{
                moved=moved+dir;
                element.animate({
                    left:(-1)*Liwidth*moved+offset
                },400);
            }
            
        }
        nextBtn.click(function(e){
            e.stopPropagation();
            if(!element.is(':animated')){
                move(1); 
            }
        });
        prevBtn.click(function(e) {
            e.stopPropagation();
           if(!element.is(':animated')){
                move(-1); 
            }
        });
    };
    (function (){
        //教师风采
        $('.teachers').moveDir(8);
        //学校应用
        $('.apps').moveDir(5);
    })();
    
    //空间动态
    (function(){
        var space=$('.space');
        var Liheight=parseFloat(space.children('li').eq(0).css("height"));
        var offset=17;
        var number=space.children('li').size();
        var timer=setInterval(moveUp,1000);
        function updateView(){
            var lis=space.children('li');
            lis.each(function(i) {
                lis.eq(i).css({
                    top:i*(Liheight+offset)+"px",
                    zIndex:50
                });
            });
        }
        updateView();
        if(number<=4){
            clearInterval(timer);
            timer=null;
        }
        space.mouseenter(function(e) {
            e.stopPropagation();
            clearInterval(timer);
            timer=null;
        }).mouseleave(function(e) {
            timer=setInterval(moveUp,1000);
        });
        function moveUp(){
            var lis=space.children('li');
            lis.each(function(i) {
                    var top=parseFloat(lis.eq(i).css('top')); 
                    lis.eq(i).css("zIndex",100).animate({
                        top: top-Liheight-offset
                    },400,function() {
                        space.append(lis.eq(0));
                        updateView();
                    });
                
            });
        }
    })();
    //现任领导
    (function(){
        var leaders=$('.leaders');
        var ul=leaders.find('ul');
        var ol=leaders.find('ol');
        var Liwidth=parseFloat(ul.children('li').eq(0).css("width"));
        var number=ul.children('li').size();
        var Lis=ul.children();
        var html="";
        Lis.each(function(i) {
            html+="<li></li>";
        });
        ol.html(html).children('li').eq(0).addClass('active')
        var indicators=ol.children('li');
        ul.css("width",Liwidth*number);
        Lis.each(function(i) {
           Lis.eq(i).css("left",i*Liwidth+"px");
        });
        if(number==1){
            ol.hide();
        }
        indicators.click(function() {
            var cur=ol.children('.active').index();
            var now=$(this).index();
            if(cur!=now&&!ul.is(":animated")){
                $(this).addClass('active').siblings('.active').removeClass('active');
                move(now-cur);
            }
        });
        function move(dir){//移动图片
            var left=parseFloat(ul.css('left'));
                ul.animate({
                    left:left+(-1)*Liwidth*dir
                },400);
            }
    })();
});