$(document).ready(function (e) {
var loadFixedHeaders = function(){
    var tableOffset = []; //top of table
    var $header = []; //comes from cloned thead
    var $fixedHeader = []; //cloned thead put in .header-fixed
    var anchor_bottom = []; //from anchor div
    var fixedOffset = []; //offset of fixed table head
	
	
	
    $("table.fixed-headers").each(function (i, element) {

        var thisTable = $(this);

        //add fixed header holder

        $(thisTable).after('<table class="header-fixed display sortable_datatable" style="display:none;"></table><div class="bottom_anchor"></div>');
        ///add custom class to header holder
        var classToAdd = $(thisTable).attr("class");
        $(thisTable).next().addClass(classToAdd);

        ///add custom width to header holder
        var widthToAdd = Number($(thisTable).css("width").replace("px", ""));
        widthToAdd = widthToAdd + 2;
        $(thisTable).next().css("width", widthToAdd + "px");

        tableOffset[i] = $(thisTable).offset().top;

        $header[i] = $("thead", thisTable).clone();


        $fixedHeader[i] = $(".header-fixed:eq(" + i + ")").append($header[i]);


        anchor_bottom[i] = $(".bottom_anchor:eq(" + i + ")").offset().top;

        $(window).bind("scroll", function () {
        var offset = $(this).scrollTop();

            fixedOffset[i] = $(".header-fixed:eq(" + i + ")").offset().top;


            if (offset > tableOffset[i] && fixedOffset[i] <= anchor_bottom[i]) {
                if(($fixedHeader[i]).is(':hidden')){
				$fixedHeader[i].show();
				}

            } else {
                $fixedHeader[i].hide();
            }
        });
    });


    ///styles

    $(".header-fixed th").css({
        backgroundImage: "none"
    });

    $(".header-fixed").css({
        position: "fixed",
        top: "0px",
        display: "none",
        backgroundColor: "white",
        margin: "0px"
    });

///////////////fix anchors and offsets on zoom


var zoomListeners = 
function(){
	//loadFixedHeaders();
	
	for (i=0; i< $(".bottom_anchor").length; i++){
	
	anchor_bottom[i] = $(".bottom_anchor:eq(" + i + ")").offset().top;
	console.log(anchor_bottom[i]);
	}
	
	
	var realTables = $("table.fixed-headers").not($('.header-fixed'));
	
	$("realTables").each(function(index, element) {
        tableOffset[index] = $(this).offset().top;
		console.log(tableOffset[index]);
    });
	
	$(realTables).each(function(index, element) {
        tableOffset[index] = $(this).offset().top;
		
    });
	//for (i=0; i< $(realTables).length; i++){
		
	
	//alert(tableOffset[i]);
	console.log("tableOffset: " + tableOffset[i] + "(page) offset: " + offset);
	
//	}
	
	
}




  // Poll the pixel width of the window; invoke zoom listeners
  // if the width has been changed.
  var lastWidth = 0;
  function pollZoomFireEvent() {
	  offset = $(window).scrollTop();
    var widthNow = jQuery(window).width();
    if (lastWidth == widthNow){ return false;
	}else{
    lastWidth = widthNow;
	zoomListeners();
    // Length changed, user must have zoomed, invoke listeners.
	}
      
  
  }
  setInterval(pollZoomFireEvent, 100);




}

loadFixedHeaders();
});