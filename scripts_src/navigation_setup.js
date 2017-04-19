var utils_main = require("./utils/utils_main.js");
var update_individual_series = require("./form_updates/update_individual_series.js");
var keyboard_inputs = require("./keyboard_inputs.js");
var write_code = require("./utils/write_code.js");


/** object that contains functions for all the navigation, ie changing between options and chart types 
@namespace
*/
var navigation_setup = {

    /** when tabs on left side nav bar are clicked, options displayed are changed **/
    sideNavTabsChange: function (chart, all_chart_options) {

        $("#side_nav_tabs .tab").unbind().click(function () {
            //change selected menu tabs
            $("#side_nav_tabs .selected_tab").removeClass("selected_tab");
            $(this).addClass("selected_tab");

            //change display div showing
            var selectedID = "#" + $(this).attr("id").replace("tab", "display");
            $("#side_display .selected_display").removeClass("selected_display");
            $(selectedID).addClass("selected_display");

            //if this is "Individual Series Options", run that setup function
            if (selectedID === "#display_series_options" && all_chart_options.chart.type != "map") { //for charts

                update_individual_series.populateForm(chart, all_chart_options);

            }

        });
    },



    /** when clear next text area button (X) is clicked, find and clear the text of the next textarea */
    clearNextTextareaClick: function () {
        $(".clear_next_textarea_button").click(function () {
            $(this).next("textarea").val("");
        });
    },


    /**When a close box X is clicked, closes the containing popup div **/
    closeBoxIconClick: function () {
        $(".close_box_icon").click(function () {
            $(this).parent().parent().slideUp(50);
            //     $(".chart_display_area, .map_display_area").toggleClass("fixed");

        });
    },




    /** when #color_palette_reverse_icon is clicked, reverse the orders of each palette */
    colorPaletteReverseIconClick: function () {
        $("#color_palette_reverse_icon").click(function () {
            $(".color_palette_row, .map_color_palette_row").each(function () {
                var this_row = $(this);
                var color_cells = this_row.children('.color_palette_cell, .map_color_palette_cell');
                this_row.prepend(color_cells.get().reverse());
            });
            $("#color_palettes .selected, .map_color_palette_row.selected").click(); //click to change colors in chart

        });
    },





    /** when a get code button is clicked, update and show the code area. */
    getCodeButtonClick: function (chart, all_chart_options, all_map_options) {

        $("#get_code_button").unbind().click(function (e) {

            //populate individual series tab
            update_individual_series.populateForm(chart, all_chart_options);

            //hide the load saved chart area if it's showing
            $(".load_chart_showing").removeClass("load_chart_showing"); 
            $("#load_chart_div").hide();

            var $get_code_span = $("#get_code_text");

            if ($get_code_span.text() === "Get code") {
                //show loading
                $("#get_code_button .glyphicon-refresh-animate").css("visibility", "visible");
                $("#main_result_code_div").slideDown(50, function () {
                    //write all_chart_options
                    $get_code_span.text("Hide code");
                    write_code.writeCode(all_chart_options, all_map_options);
                    //hide loading
                    $("#get_code_button .glyphicon-refresh-animate").css("visibility", "hidden");

                });

            } else {
                $("#main_result_code_div").slideUp(50);
                $get_code_span.text("Get code");
                $("#chart_output_code, #chart_html_code").val("");
            }

            $(this).toggleClass("code_on");

            //    $(".chart_display_area, .map_display_area").toggleClass("fixed"); //so chart will go down to still be visible

            //scroll to top of page
            $("html, body").animate({
                scrollTop: 0
            }, "slow");


        });

    },





    /** when a help icon is clicked */
 
    helpIconClick: function () {

        $(".help_icon").click(function () {
            $(this).toggleClass("help_on");

            $(".notes", $(this).parents(".display, #main_result_code_div, #load_chart_div, #side_nav_top, #areas_colored_report_div")).toggle();

        });

    },





    /** when show_load_chart_area_button is clicked, show that entry area **/
   
    loadChartButtonClick: function (chart, all_chart_options) {
        $("#show_load_chart_area_button").unbind().click(function () {
            $("#main_result_code_div").slideUp(50, function () { //hide the get code area if it's showing
                $("#load_chart_div").slideToggle(50);
                $(".code_on").removeClass("code_on");
                $("#get_code_text").text("Get code");
                // $(".chart_display_area").toggleClass("fixed");
            });

            $(this).toggleClass("load_chart_showing");
        });

    },



    /** when black_and_white_button is clicked, toggle grascale of chart **/
    
    blackAndWhiteButtonClick: function(){
        $("#black_and_white_button").click(function(){
            $(".chart_display_area, .map_display_area, #black_and_white_button").toggleClass("grayscale");
            
        });
    },
    


    /** when areas of the chart are clicked, open that section **/
    
    chartClicks: function () {

        //give applicable chart areas pointer mouse
        $(".highcharts-yaxis-labels text, .highcharts-xaxis-labels text, .highcharts-tooltip, .highcharts-series-group, svg>text:last-child").unbind().css("cursor", "pointer");

        //subtitle	
        //        $(".highcharts-subtitle").click(function () {
        //            console.log("sub");
        //        });

        //y axis label
        //        $(".highcharts-yaxis-title").click(function () {
        //  console.log("y title");
        //        });

        $(".highcharts-yaxis-labels").click(function () {
            $("#tab_chart_y_axis").click();
            $("#chart_y_axis_title_textarea").select();
        });

        //x axis 
        //        $(".highcharts-xaxis-title").click(function () {
        //  console.log("x tit");
        //        });

        $(".highcharts-xaxis-labels").click(function () {
            $("#tab_chart_x_axis").click();
            $("#chart_x_axis_title_textarea").select();

        });

        //credits
        $("svg>text:last-child").click(function (e) {
            e.preventDefault();
            $("#tab_chart_credits").click();
            $("#chart_credits_text_textarea").select();
        });

        //tooltip
        $(".highcharts-series-group, .highcharts-tooltip").click(function () {
            if ($("#chart_type_icons .selected").divVal() !== "drilldown") {
                $("#tab_chart_tooltip").click();
            }
        });

    },


    /** Bind open code editor button **/

    openCodeEditorClick: function () {

        $("#open_code_editor_button").click(function () {
            $("#beautify_code_button").click();

            sessionStorage.setItem("export_code_html", $("#chart_html_code").val());
            sessionStorage.setItem("export_code_js", $("#chart_output_code").val());

            var newChartWindow = window.open("code_editor/code-editor.htm", "_blank");


        });
    },





    /** INIT ALL NAVIGATION that needs parameters, called from all_form_updates when page is loaded, and whenever a saved chart is loaded **/
    initNavWithChart: function (chart, all_chart_options, all_map_options) {
        var ns = navigation_setup;

        //  navigation_setup.chartOutputCodeFocus(all_chart_options, all_map_options);
        ns.getCodeButtonClick(chart, all_chart_options, all_map_options);
        ns.loadChartButtonClick(chart, all_chart_options);
        ns.sideNavTabsChange(chart, all_chart_options);
        ns.chartClicks();

        keyboard_inputs.initListeners(chart, all_chart_options);
        keyboard_inputs.sideNavTabShortcuts(chart, all_chart_options);

    },


    /** FIRST NAVIGATION INIT, called from app.js when page is loaded. These never need to be re-initialized **/
    firstNavInit: function () {
        console.log("navigation_setup.firstNavInit");
        
        var ns = navigation_setup;

        ns.closeBoxIconClick();
        ns.clearNextTextareaClick();
        ns.colorPaletteReverseIconClick();
        ns.helpIconClick();
        ns.openCodeEditorClick();
        ns.blackAndWhiteButtonClick();
        
        
    }

}


module.exports = navigation_setup;