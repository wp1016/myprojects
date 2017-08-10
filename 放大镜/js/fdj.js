window.onload=function(){
    $.fn.preview=function(){
        var element=this,
            m_large=this.children('.m_large'),
            m_small=this.children('.m_small'),
            m_middle=this.children('.m_middle'),
            small_wrap=m_small.children('.small_wrap'),
            m_mask=this.find('.m_mask'),
            mask_wrap=this.find('.mask_wrap'),
            ul=m_small.find('ul'),
            li=ul.children('li'),
            prevBtn=m_small.children('.btn-prev'),
            nextBtn=m_small.children('.btn-next'),
            mWidth=mask_wrap.width(),
            mHeight=mask_wrap.height(),
            maskWidth=m_mask.width(),
            maskHeight=m_mask.height(),
            wWidth=small_wrap.width(),
            lWidth=0,
            lHeight=0,
            lBaseNum=0,
            tBaseNum=0,
            len=li.size(),
            index=0,
            offset=0,
            liWidth=li.outerWidth(true),
            num=Math.floor(wWidth/liWidth),
            counter=Math.floor((len*liWidth)/wWidth);
            ul.css('width',len*liWidth);
            prevBtn.click(function() {
                if(!$(this).hasClass('disabled')){
                    slide(-1);
                }
            });
            nextBtn.click(function() {
                if (!$(this).hasClass('disabled')) {
                    slide(1);
                }
            });
            function slide(dir){
                if(len-(index*num)<=num&&dir>0){
                    index=0;
                }else if(index===0&&dir<0){
                    index=counter;
                }else{
                    index+=dir;
                }
                ul.animate({
                    left:-1*index*num*liWidth,
                    },300);
            }
            function loadBigImg(src){
                var img=new Image();
                img.src=src;
                img.onload=function(){
                    lWidth=this.width;
                    lHeight=this.height;
                };
                m_large.html(img);
            }
            function loadMidImg(src){
                var img=new Image();
                img.src=src;
                img.onload=function(){
                    mWidth=this.width;
                    mHeight=this.height;
                    lBaseNum=lWidth/mWidth;
                    tBaseNum=lHeight/mHeight;
                    mask_wrap.css({
                    width: this.width,
                    height: this.height
                });
                };
               m_middle.children('img').remove();
               m_middle.append(img);
               offset=parseFloat(m_middle.children('img').css('marginLeft'));
               mask_wrap.css('left',offset);
            }
            loadBigImg(m_large.children('img').attr('src'));
            loadMidImg(m_middle.children('img').attr('src'));
            li.mouseenter(function() {
                $(this).addClass('on').siblings('.on').removeClass('on');
                var lSrc=$(this).children('images').data('src');
                loadMidImg(lSrc);
                loadBigImg(lSrc);

            });
            mask_wrap.hover(function() {
                m_mask.toggle();
                m_large.toggle();
            });
            mask_wrap.mousemove(function(e) {
                var x=e.offsetX,y=e.offsetY,
                    maskLeft=x-maskWidth/2+offset,
                    maskTop=y-maskHeight/2;
                if(maskLeft<offset){
                    maskLeft=offset;
                }else if(maskLeft>(mWidth-maskWidth+offset)){
                    maskLeft=mWidth-maskWidth+offset;
                }
                if(maskTop<0){
                    maskTop=0;
                }else if(maskTop>(mHeight-maskHeight)){
                    maskTop=mHeight-maskHeight;
                }
                m_mask.css({
                    left: maskLeft,
                    top: maskTop
                });
                m_large.find('img').css({
                    left: -1*lBaseNum*(maskLeft-offset),
                    top: -1*tBaseNum*maskTop
                });
            });
    };
    $('.magnify').preview();
};