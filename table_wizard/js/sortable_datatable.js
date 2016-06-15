(function($) {
/*
 * Function: fnGetColumnData
 * Purpose:  Return an array of table values from a particular column.
 * Returns:  array string: 1d data array
 * Inputs:   object:oSettings - dataTable settings object. This is always the last argument past to the function
 *           int:iColumn - the id of the column to extract the data from
 *           bool:bUnique - optional - if set to false duplicated values are not filtered out
 *           bool:bFiltered - optional - if set to false all the table data is used (not only the filtered)
 *           bool:bIgnoreEmpty - optional - if set to false empty values are not filtered from the result array
 * Author:   Benedikt Forchhammer <b.forchhammer /AT\ mind2.de>
 */
        $.fn.dataTableExt.oApi.fnGetColumnData = function(oSettings, iColumn, bUnique, bFiltered, bIgnoreEmpty) {
            // check that we have a column id
            /*alert("iColumn: " + typeof iColumn);*/
            if (typeof iColumn == "undefined") return new Array();

            // by default we only wany unique data
            /*alert("bUnique: " + typeof bUnique);*/
            if (typeof bUnique == "undefined") bUnique = true;

            // by default we do want to only look at filtered data
            /*alert("bFiltered: " + typeof bFiltered);*/
            if (typeof bFiltered == "undefined") bFiltered = true; /*alert("bFiltered: " + typeof bFiltered);*/
            // by default we do not wany to include empty values
            /*alert("bIgnoreEmpty: " + typeof bIgnoreEmpty);*/
            if (typeof bIgnoreEmpty == "undefined") bIgnoreEmpty = true;

            // list of rows which we're going to loop through
            var aiRows;

            // use only filtered rows
            if (bFiltered == true) aiRows = oSettings.aiDisplay;
            // use all rows
            else aiRows = oSettings.aiDisplayMaster; // all row numbers
            /*alert(aiRows.length);*/
            // set up data array
            var asResultData = new Array(); /*alert("asResultData : " + typeof asResultData);*/
            for (var i = 0, c = aiRows.length; i < c; i++) {
                iRow = aiRows[i];
                var aData = this.fnGetData(iRow);
                var sValue = aData[iColumn];
				sValue = sValue.replace(/<.*?>/gi, "").replace(/<\/.*?>/gi, "");
/*if (i == 1) {
			alert(sValue);
		}*/
                // ignore empty values?
                /*if (bIgnoreEmpty == true && sValue.length == 0) continue;*/

                // ignore unique values?
                if (bUnique == true && jQuery.inArray(sValue, asResultData) > -1) continue;

                // else push the value onto the result data array
                else asResultData.push(sValue);
            } /*alert(asResultData);*/
            return asResultData.sort();
        }
    }(jQuery));


    function fnCreateSelect(aData, id, width) {
        var r = '<div class="filter-container"><div class="filter"><select class="wide" style="width:'+ width + ';" id="select-' + id + '"><option value="">All</option>',
            i, iLen = aData.length;

		

        var temp_array = aData;

        for (var i = 0; i < temp_array.length; i++) {
            temp_array[i] = String(temp_array[i]).replace(/<a href.*?>(.*?)<\/a>/i, "$1");
        }

        aData = temp_array.sort();

        for (i = 0; i < iLen; i++) {


            r += '<option value="' + aData[i] + '">' + aData[i] + '</option>';
        }
        return r + '</select></div></div>';
    }



$(document).ready(function() {
if($.browser.msie && $.browser.version < 8){
	$(".sort_row").css("display","block");
}else{
	$(".sort_row").css("display","table-row");
}

		$(".sortable_datatable").each(function(stindex){
			var sorting_options = new Array();
			var default_sort = new Array();

			$(this).find(".sort_row").children().each(function(i) {

				$(this).attr("id", "sort_" + i);
				
				var temp = {};
				if($(this).attr("class")!=null){
					if ($(this).attr("class").match(/disable_sort/)) { 
					   temp["bSortable"] = false;
					} 
					if ($(this).attr("class").match(/sort_type_/)) { 
					  
					   temp["sType"] =  String($(this).attr("class").match(/(^|\s)sort_type_.*?(\s|$)/)[0].replace(/sort_type_/g,"")).replace(/_/g,"-").replace(/\s/g,"") ;
		
					} 
					if ($(this).attr("class").match(/default_sort_/)) { 
						
						default_sort.push(Number($(".sort_row td").index($(this))));
						default_sort.push(String($(this).attr("class").match(/(^|\s)default_sort_.*?(\s|$)/)[0].replace(/default_sort_/g,"")).replace(/_/g,"-").replace(/\s/g,""));
		
					}
				}else{
					temp = null;	
				}
				
				sorting_options.push(temp);

				var temp = "table.sortable_datatable td:nth-child(" + (Number(i) + 1) + ")";
			
				if ($(this).attr("class").match(/(^|\s)left(\s|$)/)) {
					$(temp).removeClass("left").addClass("align-left");
				} else if ($(this).attr("class").match(/(^|\s)center(\s|$)/)) {
					$(temp).removeClass("center").addClass("align-center");
				} else {
					$(temp).removeClass("right").addClass("align-right");
				}
				
			});
				
			if(String($(this).find('.sort_row').attr("class")).match(/show_.*?(\s|$)/i)){
				var display_length = String($(this).find('.sort_row').attr("class")).match(/show_.*?(\s|$)/i)[0].replace(/show_(\d*?|\w*?)(\s|$)/i,"$1");
				if(display_length == "all"){
					display_length = -1;	
				}
				display_length = Number(display_length);
			}else{
				display_length = 10;	
			}
			
			if(default_sort.length == 0){
				default_sort = new Array([0,"asc"]);
			}else{
				default_sort = new Array(default_sort);
			}
			
			var oTable = $(this).dataTable({
				"iDisplayLength": display_length,
				"bRetrieve":true,
				"oLanguage": {
					"sSearch": "Text search table:",
					"sLengthMenu": 'Display <select>'+
					'<option value="10">10</option>'+
					'<option value="25">25</option>'+
					'<option value="50">50</option>'+
					'<option value="100">100</option>'+
					'<option value="-1">All</option>'+
					'</select> records'
				},
				"aoColumns": sorting_options,
				"aaSorting": default_sort
			});

			if($(this).find(".dropdown_sort").size() <= 0){
					$(this).find(".sort_row").css("display","none");
			}

			$(this).find(".dropdown_sort").each(function(i) {
				var table_row = $(this).attr("id").replace(/sort_/, "");

				var width = "auto";
				if(String($(this).attr("class")).match(/dropdown_w.*?(\s|$)/)){
				
					width = (String($(this).attr("class")).match(/dropdown_w.*?(\s|$)/))[0].replace(/dropdown_w/,"").replace(/\s/g,"") + "px";
					
				}
				if(!$(this).find("select").size()){
					this.innerHTML = fnCreateSelect(oTable.fnGetColumnData(table_row), table_row, width);
				}else{
					var temp = fnCreateSelect(oTable.fnGetColumnData(table_row), table_row, width);
					$(this).html($(temp.replace(/<option.*<\/option>/gi,$(this).find("select").html())));				
				}
				
				var parent = $(this);			
				$('select', this).change(function() {
					var temp_val = String($(this).val()).replace(new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"), "\\$&");
					if ($(this).val() == "") {
						oTable.fnFilter("", table_row, false);
						oTable.fnDraw();
					} else {
						if(!parent.attr("class").match("text_search")){
							oTable.fnFilter("^" + temp_val + "$", table_row, true);
						}else{
							oTable.fnFilter(temp_val, table_row, true);
						}
					}
				});

			});
	});
$('#btn_archive_table_length select:first-child').attr('id','btn_archive_table_length_select').before('<label for="btn_archive_table_length_select" style="display:none;">Display Records</label>');
$('#btn_archive_table_filter input:first-child').attr('id','btn_archive_table_filter_input').before('<label for="btn_archive_table_filter_input" style="display:none;">Search Data Table</label>');
$('.sort_row .filter select:first-child').each(function(){
	$(this).before('<label for="'+$(this).attr('id')+'" style="display:none;">Filter for '+ $(this).parents('.sort_row').prev().find('th:eq('+Number($('td').index($(this).parents('td')))  +')').html() +' Column</label>');
});

    if ($.browser.msie) {
			/*
			$('select.wide').each(function(){
				$(this).parent().css("width", String($(this).parent().width())+"px");
			});
			$('select.wide').focus(function() {
				if(!$(this).data("origWidth")){
					$(this).data("origWidth", $(this).css("width"));
				}	
				$(this).css("width","auto");
				$(this).change(function() {
					$(this).blur();
				});
				$(this).children().blur(function() {
					$(this).blur();
				});
			}).mouseover(function() { 	
				$(this).focus();
			}).blur(function() { 	
				$(this).css("width",$(this).data("origWidth"));	
			});*/
			
		
			var sd_dropdown_image = "<span style='display:block;  z-index:1000;'><img src='/images/mega_dropdowns/drop_down_icon_black.png' style='background-color:#ccc; position:relative; float:right; bottom:17px; left:2px; padding:8px 0px 7px 9px;' ></span></div>";

			$('select.wide').each(function(){
				var that = $(this); 
				
				var select_id = $(this).attr("id");
				
				$(this).after("<div class='wide sd-div-options'></div>");
				$(this).find('option').each(function(index, element) {

                    that.next('.wide').html(that.next('.wide').html()+ "<div>" + $(this).html() + "</div>");
                });
	
								
				$(this).css("display","none");
				$(this).after("<div class='sd-div-select' id='sd-"+ select_id +"'></div>");
				$('.sd-div-select').each(function() {
					 temp = "#" + String($(this).attr("id")).replace(/^sd-/i,"")+ " option:nth-child(1)";
					 $(this).html($(temp).html() + sd_dropdown_image);	

                });
			
				
			});
			
			
			$(".sd-div-select").each(function(){
				
				$(this).css({"border":"1px solid #aaa","padding":"2px","white-space":"nowrap","overflow":"hidden","height":"1.3em","cursor":"pointer","width":String($(this).prev().width()) + "px"})
				
			});
			
				$('.sd-div-options > div').live("mousedown",function(){
					$(".js-blur-div").remove();
					var temp = Number($($(this).parent().find("div")).index($(this)))+1;
					$(this).find("option[selected]").removeAttr("selected");	
					
					
					$(this).parent().prev().prev().find("option:nth-child("+temp+")").attr("selected","selected");
			
			
					$(this).parent().prev().prev().change();
	
				
					$(this).parent().prev().html($(this).parent().prev().prev().find('option:nth-child('+temp+')').html() + sd_dropdown_image);
		
					$(this).parent().css("display","none");
				
					
				});
			
			
				$(".sd-div-options").css("display","none");
				
				
				$('.sd-div-options').each(function(){

					$(this).css({"border":"1px solid #000","padding":"2px","position":"absolute","background-color":"#ffffff","z-index":"1000","overflow-y":"auto","overflow-x":"hidden","height": $(this).height() > 200 ?  "200px" : String($(this).height()*1.28) + "px","width":String($(this).width()+20) + "px"})
				});
				
			
				
				$('.sd-div-options > div').css({"cursor":"pointer","padding":"2px"})
				$('.sd-div-options > div').hover(function(){
					$(this).css({"background-color":"#0a246a","color":"#fff"});	
				},
				function(){
					$(this).css({"background-color":"#fff","color":"#000"});	
				});
				
				
				var mouseleft_sd_options;
				$('.sd-div-select').live("click",function(){
					mouseleft_sd_options = true;
					$('.sd-div-select').next().not($(this)).css("display","none");
						if($(this).next().css("display") == "block"){
							$(this).next().css("display","none");
						}else{
							$(this).next().css("display","block");
						}
				});
			
				$('.sd-div-options').mouseleave(function(){
					mouseleft_sd_options = true;					
				});
				$('.sd-div-select').live("blur",function(){
					if(mouseleft_sd_options){
						mouseleft_sd_options = false;
						$('.sd-div-select').next().css("display","none");
					}
				});
				$('.sd-div-options').mouseenter(function(){
					mouseleft_sd_options = false;
				});
			
			
			
			
	}

});
