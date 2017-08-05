jQuery.noConflict()(function ($) {
$(document).ready(function ($) {


/*----------------------------------------------------------*/
    /*        响应试导航     */
    /*----------------------------------------------------------*/

        //var $menu_select = $("<select />");
        //$("<option />", {
        //    "selected": "selected",
        //    "value": "",
        //    "text": "网站导航"
        //}).appendTo($menu_select);

    
    var Lihtml = "<div id=\"smenu_\" class='smenu_'   onclick=\"set_smenu()\"><img src='/images/function.png' id='smenu_img' >导航</div> <div class='smenu' id='smenu' style=\"display:none;\">";
        $("#main-navigation ul li a.primary").each(function () {
            var menu_url = $(this).attr("href");
            var menu_text = $(this).text();
            //if ($(this).parents("li").length == 2) {
            //    menu_text = '- ' + menu_text;
            //}
            //if ($(this).parents("li").length == 3) {
            //    menu_text = "-- " + menu_text;
            //}
            //if ($(this).parents("li").length > 3) {
            //    menu_text = "--- " + menu_text;
            //}
            Lihtml += "<dd><a href='" + menu_url + "'><img src='/images/jiantou.png' id='img'>" + menu_text + "</dd>";
        });
        Lihtml += "</div>";

        $('#main-navigation').append(Lihtml);


        //field_id = "#main-navigation select";
        //$(field_id).change(function () {
        //    value = $(this).attr('value');
        //    window.location = value;
        //});

/*----------------------------------------------------------*/
/*             banner                   */
/*----------------------------------------------------------*/
        if ($('#layerslider').length && jQuery()) {
            $('#layerslider').layerSlider({
                //width: '100%',
                //height: '450px',
                //responsive: true,
                //responsiveUnder: 940,
                //sublayerContainer: 940,
                //autoStart: true,
                //pauseOnHover: true,
                //firstLayer: 1,
                //animateFirstLayer: true,
                //randomSlideshow: false,
                //twoWaySlideshow: true,
                //loops: 0,
                //forceLoopNum: true,
                //autoPlayVideos: false,
                //autoPauseSlideshow: 'auto',
                //keybNav: true,
                //touchNav: true,
                //navButtons: true,
                //navStartStop: false,

                skin: 'fullwidth',
                skinsPath: '/css/',
                responsive: false,
                responsiveUnder: 1500,
                sublayerContainer: 1500
            });
        }

    });
});

/*----------------------------------------------------------*/
/*           移动端手机显示
/*----------------------------------------------------------*/

var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
var browser = navigator.userAgent.toLowerCase();
var isMobile = false;
for (var i = 0; i < mobileAgent.length; i++) {
    if (browser.indexOf(mobileAgent[i]) != -1) {
        isMobile = true;

        document.writeln("<div class=\"footer_phone\">");
        document.writeln("	 <a href=\"tel:037167776666\"><span>立即拨打：<strong>0371-67776666</strong></span></a>");
        document.writeln("</div>");
        document.writeln("<style type=\"text/css\">");
        document.writeln("    #LXB_CONTAINER_SHOW{ display: none !important;}");
        document.writeln("    #LXB_CONTAINER { display: none !important;}");
        document.writeln("    .lxb-container { display: none !important;}");
        document.writeln("    .lxb-invite { display: none !important;}");
        document.writeln("    ins { display: none !important;}");
        document.writeln("</style>");
        //document.getElementById("LXB_CONTAINER").style.display = "none";

        break;
    }
}