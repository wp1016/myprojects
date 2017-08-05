$.fn.hoverDir = function(hoverColor,opacity) {
    var element = this,
        ul = this.find('ul'),
        li = ul.children('li'),
        x = 0,
        y = 0;
    li.each(function(index) {
        var html = li.eq(index).html();
        html += "<div class='img_hover'>";
        li.eq(index).html(html);
        var imgWidth=li.eq(index).find('img').outerWidth();
        var imgHeight=li.eq(index).find('img').outerHeight();
        li.eq(index).children('.img_hover').css({
            width: imgWidth,
            height: imgHeight,
            position:'absolute',
            top:0,
            left:'-100%',
            background:hoverColor,
            opacity:opacity,
            filter:"alpha(opacity="+opacity*100+")",
            zIndex:200
        });
    });
    li.bind("mouseenter mouseleave",function(e) {
        e.stopPropagation();
       var w = $(this).width(),
           h = $(this).height(),
           x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1),
           y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1),
           direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左,
            eventType = e.type,
            dirName = new Array('上方','右侧','下方','左侧');
           if(e.type == 'mouseenter'){
            $.proxy(enterMove,this,direction)();
          }else{
            $.proxy(outMove,this,direction)();
          }
      });
    function enterMove(dir){
        var img_hover=$(this).children('.img_hover');
        switch(dir) {
            case 0:
                img_hover.css({
                    top: '-100%',
                    left: 0
                });
                img_hover.moveAnimate(0,0);
                break;
            case 1:
                img_hover.css({
                    top:0,
                    left:'100%'
                });
                img_hover.moveAnimate(0,0);
                break;
            case 2:
                img_hover.css({
                    top:'100%',
                    left:0
                });
                img_hover.moveAnimate(0,0);
                break;
            case 3:
                img_hover.css({
                    top:0,
                    left:'-100%'
                });
                img_hover.moveAnimate(0,0);
                break;
        }
    }
    function outMove(dir){
        var img_hover=$(this).children('.img_hover');
        switch(dir) {
            case 0:
                img_hover.moveAnimate(0,'-100%');
                break;
            case 1:
                img_hover.moveAnimate('100%',0);
                break;
            case 2:
                img_hover.moveAnimate(0,'100%');
                break;
            case 3:
                img_hover.moveAnimate('-100%',0);
                break;
        }
    }
    $.fn.moveAnimate=function(left,top){
        this.stop(false,true).animate({
            left: left,
            top: top
        },300);
    }
};
