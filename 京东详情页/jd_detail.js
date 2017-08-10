$(".app_jd,.service").hover(function(){
	var $items=$(this).children("[id$='_items']");
	$items.toggle();
	if ($items.css("display")=="block")
		$items.prev().addClass("hover");
	else $items.prev().removeClass("hover");
});
$("#category").hover(function(){
	var $cate_box=$(this).children("#cate_box");
	$cate_box.toggle();
	$("#cate_box>li").hover(function(){
		var $sub=$(this).children(".sub_cate_box");
		$sub.toggle();
		if ($sub.css("display")=="block")
		$sub.prev().addClass("hover");
	else $sub.prev().removeClass("hover");
	})
});
$("#product_detail>.main_tabs").on("click","li>a",function(){
	if (!$(this).parent().hasClass("current"))
	{
		$(this).parent().addClass("current")
		.siblings(".current").removeClass("current");
		if ($(this).is(":contains('商品评价')"))
		{
			$(this).parent().parent().siblings(".show").removeClass("show");
		}else
		{
			var $i=$(".main_tabs>li>a:not(:contains('商品评价'))").index($(this));
			$(this).parent().parent().siblings(`:eq(${$i})`).addClass("show").siblings(".show").removeClass("show")
		}
	}
});
$("#store_select").hover(function(){
	$("#store_content").toggle();
	if ($("#store_content").css("display")=="block")
		$("#store_content").prev().addClass("hover");
	else $("#store_content").prev().removeClass("hover")
});
var preview={
	LIWIDTH:62,//每个LI的宽
	$forward:null,//保存前进按钮
	$backward:null,//保存后退按钮
	$ul:null,//保存ul
	$mImg:null,//保存中图片
	$smask:null,//保存supermask
	$mask:null,//小遮罩层
	$large:null,//保存大图div
	MAXTOP:0,
	MAXLEFT:0,
	moved:0,//保存已经左移的li的个数
	OFFSET:20,//保存初始偏移量
	init(){
		//找到id为preview下的h1下的ul保存在$ul中
		this.$ul=$("#preview>h1>ul");
		//找到$ul的前一个兄弟保存在$forward
		this.$forward=this.$ul.prev();
		//找到$forward的前一个兄弟保存在$backward
		this.$backward=this.$forward.prev();
		this.$forward.click({dir:1},e=>this.aClick(e));
		this.$backward.click({dir:-1},e=>this.aClick(e));
		this.$mImg=$("#mImg");
		this.$large=$("#largeDiv");
		this.$large.css("backgroundImage","url(images/products/product-s1-l.jpg)")
		this.$ul.on("mouseover","li images",e=>{
			var $src=$(e.target).attr("src");
			var i=$src.lastIndexOf(".");
			this.$mImg.attr("src",$src.slice(0,i).concat("-m").concat($src.slice(i)))
			this.$large.css("backgroundImage","url("+$src.slice(0,i)+"-l"+$src.slice(i)+")");
		});
		this.$smask=$("#superMask");
		this.$mask=$("#mask");
		this.MAXTOP=parseFloat(this.$smask.css("height"))-parseFloat(this.$mask.css("height"));
		this.MAXLEFT=parseFloat(this.$smask.css("width"))-parseFloat(this.$mask.css("width"));
		this.$smask.hover(()=>{
			this.$mask.toggle();
			this.$large.toggle();
			});
		this.$smask.mousemove(e=>{
			var x=e.offsetX,y=e.offsetY;
			var $top=y-parseFloat(this.$mask.css("height"))/2,
				$left=x-parseFloat(this.$mask.css("width"))/2;
			if ($top<0)
			{
				$top=0;
			}else if($top>this.MAXTOP)
			{
				$top=this.MAXTOP
			};
			if ($left<0)
			{
				$left=0;
			}else if($left>this.MAXLEFT)
			{
				$left=this.MAXLEFT;
			};
			this.$mask.css({
				top:$top,
				left:$left
			});
			this.$large.css("backgroundPosition",
				`${-2*$left}px ${-2*$top}px`
			)
		})
	},
	aClick(e){
		 if(!$(e.target).is("[class$='_disabled']")){
			this.moved+=e.data.dir;
			this.$ul.animate({
				left:(-1)*this.LIWIDTH*this.moved+this.OFFSET
				},500);
				this.checkA();
			}
	},
	checkA(){//检查两个a的状态
		if (this.$ul.children().size()-this.moved==5)
		{
			this.$forward.attr("class","forward_disabled");
		}else if (this.moved==0)
		{
			this.$backward.attr("class","backward_disabled")
		}else
		{
			this.$forward.attr("class","forward");
			this.$backward.attr("class","backward")
		}
		 //如果$ul的children的size-moved==5
      //修改forward的class为forward_disabled
    //否则, 如果moved==0
      //修改backward的class为back_disabled
    //否则
      //修改forward的class为forward, 
      //修改backward的class为backward
	
	},

}
preview.init();