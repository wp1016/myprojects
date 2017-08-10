$.fn.preview = function() {
    this.css('position', 'relative');
    var mainWidth = this.width();
    //动态添加中图大图容器
    var html = this.html();
    html = "<div class='m_large'></div><div class='m_middle'></div><div class='m_modal'><div class='modal_wrap'><div class='pic_wrap'><div class='ul_wrap'></div></div></div><span class='modal_close'></span></div>" + html;
    this.html(html);
    var element = this,
        m_modal=this.children('.m_modal'),//保存模态窗容器
        m_large = this.children('.m_large'), //保存大图容器
        m_small = this.children('.m_small'), //保存小图容器
        m_middle = this.children('.m_middle'); //保存中图容器
    //设置大图容器、中图容器尺寸
    m_large.css({ width: mainWidth, height: mainWidth,left:mainWidth+1});
    m_middle.css({ width: mainWidth, height: mainWidth });
    var ul = m_small.find('ul'),
        li = ul.children('li'),
        small_wrap = m_small.children('.small_wrap'),
        maxWidth = m_middle.width(), //中图片最大宽度
        maxHeight = m_middle.height(), //中图片最大高度
        m_mask = null, //保存放大镜
        mask_wrap = null, //保存放大镜容器
        mWidth = 0, //初始化中图片容器宽度
        mHeight = 0, //初始化中图片容器宽度
        maskWidth = 0, //初始化放大镜宽度
        maskHeight = 0, //初始化放大镜高度
        wWidth = small_wrap.width(), //小图列表容器宽度
        lWidth = 0, //初始化大图片宽度
        lHeight = 0, //初始化大图片高度
        lBaseNum = 0, //初始化大图水平移动基数
        tBaseNum = 0, //初始化大图垂直移动基数
        Ratio = 1, //初始化缩放比例
        len = li.size(), //保存li个数
        index = 0, //初始化页码
        liWidth = li.outerWidth(true), //获取每个li宽度
        num = Math.floor(wWidth / liWidth), //每页显示的li个数
        counter = Math.floor((len * liWidth) / wWidth); //保存总页数
        //将图片组添加到模态窗
        var pic_wrap=m_modal.find('.pic_wrap'),
            ul_wrap=pic_wrap.children('.ul_wrap'),
            ul1=ul.clone(),
            li1=ul1.children();
        ul_wrap.html(ul1);
        li1.each(function(index) {
            var img1=li1.eq(index).children('img');
            img1.attr('src',img1.data('src'));
        });
        var html3=pic_wrap.html();
        if (li1.size()>1) {
            html3+="<span class='arrow arrow_left'></span><span class='arrow arrow_right'></span>";
        }
        pic_wrap.html(html3);
            ul1=pic_wrap.find('ul');//保存模态框中的图片列表
        var index1=0,
            arrow_left=pic_wrap.children('.arrow_left'),
            arrow_right=pic_wrap.children('.arrow_right');
        li1Width=ul1.children('li').width();
        ul1.css('width',li1Width*len);

    //生成左右按钮
    if (counter != 0) {
        var html1 = "<div class='btn btn-prev'></div><div class='btn btn-next'></div>";
        m_small.append(html1);
    }
    var prevBtn = m_small.children('.btn-prev'),
        nextBtn = m_small.children('.btn-next');
    ul.css('width', len * liWidth);
    // 上一页
    prevBtn.click(function() {
        if (!ul.is(":animated")) {
            slide(-1);
        }
    });
    // 下一页
    nextBtn.click(function() {
        if (!ul.is(":animated")) {
            slide(1);
        }
    });
    //上一个
    arrow_left.click(function() {
        if(!ul1.is(":animated")){
            slide1(-1);
        }
    });
    //下一个
    arrow_right.click(function(){
        if(!ul1.is(":animated")){
            slide1(1);
        }
    });
    if (len == 1) {
        m_small.hide();
    }
    //小图片列表左右切换
    function slide(dir) {
        if (len - (index * num) <= num && dir > 0) {
            index = 0;
        } else if (index === 0 && dir < 0) {
            index = counter;
        } else {
            index += dir;
        }
        ul.animate({
            left: -1 * index * num * liWidth
        }, 300);
    }
    //模态窗列表左右切换
    function slide1(dir){
        index1+=dir;
        if(index1>=len&&dir>0){
            index1=0;
        }else if(index1<=0&&dir<0){
            index1=len-1;
        }
        ul1.animate({
            left:-1*index1*li1Width
        },400);
    }
    //绑定点击事件
    ul.on('click', 'li', function(e) {
        e.stopPropagation();
        $(this).addClass('on').siblings('.on').removeClass('on');
        var lSrc = $(this).children('images').data('src');
        loadImg(lSrc);
        var idx=$(this).index();
        index1=idx;
        ul1.css('left',-1*idx*li1Width);
    });
    // 加载图片
    function loadImg(src) {
        // 加载大图
        var img = new Image();
        $(img).on('load', function() {
            lWidth = this.width;
            lHeight = this.height;
            //加载中图
            var newImg = new Image();
            var html2 = "<div class='padding_wrap'><div class='middle_container'><div class='mask_wrap'></div><div class='m_mask'></div><images src='" + src + "'/></div></div>";
            m_middle.html(html2);
            m_middle.find('img').css({
                maxWidth: mainWidth,
                maxHeight: mainWidth
            });
            $(newImg).on('load', function() {
                m_mask = element.find('.m_mask');
                mask_wrap = element.find('.mask_wrap');
                mask_wrap.hover(function() {
                    m_mask.toggle();
                    m_large.toggle();
                });
                mask_wrap.click(function(event) {
                    m_modal.show();
                });
                m_modal.children('.modal_close').click(function() {
                    m_modal.hide();
                });
                var mImg = m_middle.find('img'); //保存中图片
                var w = mImg.width();
                var h = mImg.height();
                if (w == h) {
                    Ratio = h / lHeight;
                    m_middle.children().css({
                        paddingTop: 0,
                        paddingBottom: 0
                    });
                } else if (w == maxWidth && h < maxHeight) {
                    Ratio = w / lWidth;
                    $(newImg).css('height', lHeight * Ratio + 'px');
                    m_middle.children().css({
                        paddingTop: (maxHeight - lHeight * Ratio) / 2 + 'px',
                        paddingBottom: (maxHeight - lHeight * Ratio) / 2 + 'px'
                    });
                } else if (h == maxHeight && w < maxWidth) {
                    Ratio = h / lHeight;
                    $(newImg).css('width', lWidth * Ratio + 'px');
                    m_middle.children().css({
                        paddingTop: 0,
                        paddingBottom: 0
                    });
                }
                //动态设置放大镜尺寸
                maskWidth = mainWidth * Ratio;
                maskHeight = mainWidth * Ratio;
                m_mask.css({ width: maskWidth, height: maskHeight });
                var imgWidth = m_middle.find('img').width();
                var imgHeight = m_middle.find('img').height();
                lBaseNum = lWidth / imgWidth; //计算大图水平移动基数
                tBaseNum = lHeight / imgHeight; //计算大图垂直移动基数
                mask_wrap.css({ width: imgWidth, height: imgHeight }); //动态设置放大镜容器尺寸
                m_middle.find('.middle_container').css({ width: imgWidth, height: imgHeight });
                //保存中图容器尺寸
                mWidth = imgWidth;
                mHeight = imgHeight;
            });
            newImg.src = src;
            m_middle.on('mousemove', '.mask_wrap', function(e) {
                var x = e.offsetX,
                    y = e.offsetY,
                    maskLeft = x - maskWidth / 2,
                    maskTop = y - maskHeight / 2;
                if (maskLeft <= 0) {
                    maskLeft = 0;
                } else if (maskLeft >= (mWidth - maskWidth)) {
                    maskLeft = mWidth - maskWidth;
                }
                if (maskTop <= 0) {
                    maskTop = 0;
                } else if (maskTop >= (mHeight - maskHeight)) {
                    maskTop = mHeight - maskHeight;
                }
                m_mask.css({
                    left: maskLeft,
                    top: maskTop
                });
                m_large.find('img').css({
                    left: -1 * lBaseNum * maskLeft,
                    top: -1 * tBaseNum * maskTop
                });
            });
        });
        img.src = src;
        m_large.html(img);
    }
    //初始加载中图，大图
    var initSrc = ul.children('.on').children('img').data('src') || ul.children(":eq(0)").children('img').data('src');
    loadImg(initSrc);
};
