//topSelect
jQuery(document).ready(
function () {
    jQuery(".tst").click(function () {
        jQuery(this).next("div").slideToggle("fast")
		.siblings(".tsc:visible").slideUp("fast");
        jQuery(this).toggleClass("tso");
        jQuery(this).siblings(".tso").removeClass("tso");
    });
});



function setTab(name, cursel, n) {

    for (i = 1; i <= n; i++) {
        var menu = document.getElementById(name + i);
        var con = document.getElementById("con_" + name + "_" + i);
        menu.className = i == cursel ? "current" : "";
        con.style.display = i == cursel ? "block" : "none";
    }
}



function Mea(value) {
	var n=value;
	setBg(value);
	}
function setBg(value){
	for(var i=0;i<8;i++){
	   if(value==i){
	     document.getElementById("a"+value).className='li1';      
			}	else{	
			 document.getElementById("a"+i).className='li0';
			}  
	} 
}



function set_smenu() {
    var smenu = document.getElementById("smenu");
    var smenu_img = document.getElementById("smenu_img");
    if (smenu.style.display == "block")
    {
        smenu.style.display = "none";
        smenu_img.src = "/images/function.png";
    }
    else { smenu.style.display = "block"; smenu_img.src = "/images/functionclick.png"; }
}