var utils_main = require("./utils/utils_main.js");

/** object that contains functions for all the navigation, ie changing between options and chart types 
@namespace
*/
var navigation_setup = {

    /** when tabs on left side nav bar are clicked, options displayed are changed **/
    sideNavTabsChange: function () {

        $("#side_nav_tabs .tab").click(function () {
            //change selected menu tab
            $("#side_nav_tabs .selected_tab").removeClass("selected_tab");
            $(this).addClass("selected_tab");

            //change display div showing
            var selectedID = "#" + $(this).attr("id").replace("tab", "display");
            $("#side_display .selected_display").removeClass("selected_display");
            $(selectedID).addClass("selected_display");

        });
    },


    /** when chart code is entered, update **/
    chartOutputCodeFocus: function (all_chart_options) {
        $("#chart_output_code").hover(function () {
            utils_main.writeCode(all_chart_options);
        });

    },


    /** when chart type icon is clicked and changed **/
    chartTypeIconChange: function () {

        $("#chart_type_icons .chart_type_icon").click(function () {
            //change selected icon
            $("#chart_type_icons .chart_type_icon").removeClass("selected_chart_type");
            $(this).addClass("selected_chart_type");
            var chart_type = $(this).divVal();

            //hide stuff unrelated to that chart type (line, bar, column)
            if (["area", "line", "bar", "column", "stacked_column", "stacked_bar"].indexOf(chart_type) > -1) {
                $(".show_line, .show_bar, .show_column").show();
            } else {
                $(".show_line, .show_bar, .show_column").hide();
            }

            $(".show_drilldown, .show_scatter").hide();
            if (["scatter", "drilldown"].indexOf(chart_type) > -1 ) {
                $(".show_" + chart_type).show();
            } 
            
         
                
        });
    },
    
    

    /** when clear next text area button (X) is clicked, find and clear the text of the next textarea */
    clearNextTextareaClick: function () {
        $(".clear_next_textarea_button").click(function () {
            $(this).next("textarea").val("");
        });
    },


    /** when #color_palette_reverse_icon is clicked, reverse the orders of each palette */
    colorPaletteReverseIconClick: function () {
        $("#color_palette_reverse_icon").click(function () {
            $(".color_palette_row").each(function () {
                var this_row = $(this);
                var color_cells = this_row.children('.color_palette_cell');
                this_row.prepend(color_cells.get().reverse());
            });
            $(".color_palette_selected").click();
        });
    },

    /** when .color_palette_row is clicked, change colors */
    colorPaletteRowClick: function () {
        $(".color_palette_row").click(function () {
            $(".color_palette_row").removeClass("color_palette_selected");
            $(this).addClass("color_palette_selected");
        });
    },


    /** when a help icon is clicked */

    helpIconClick: function () {

        $(".help_icon").click(function () {
            $(this).toggleClass("help_on");
            $(".notes", $(this).parents(".display, #main_result_code_div")).toggle();
        });

    },

    /** when a get code button is clicked, update and show the code area. */

    getCodeButtonClick: function (all_chart_options) {

        $("#get_code_button").click(function (e) {

            var $get_code_span = $("#get_code_text");
            $(this).toggleClass("code_on");
            $("#main_result_code_div").slideToggle(100);
            if ($get_code_span.text() === "Get code") {
                utils_main.writeCode(all_chart_options);
                $get_code_span.text("Hide code");
            } else {
                $get_code_span.text("Get code");
            }
        });

    },

    /** when "Load series names from:" icons are clicked and changed */
    loadSeriesFromIcon: function () {

        $("#table_input_load_series_from_icons .load_series_from_icon").click(function () {
            //change selected icon
            $("#table_input_load_series_from_icons .load_series_from_icon").removeClass("selected_load_series_from");
            $(this).addClass("selected_load_series_from");

        });
    },

    /** INIT ALL NAVIGATION, called from app.js when page is loaded **/
    initAllNavigation: function (all_chart_options) {

        navigation_setup.sideNavTabsChange();
        navigation_setup.chartTypeIconChange();
        navigation_setup.helpIconClick();
        navigation_setup.getCodeButtonClick(all_chart_options);
        navigation_setup.chartOutputCodeFocus(all_chart_options);
        navigation_setup.loadSeriesFromIcon();
        navigation_setup.clearNextTextareaClick();
        navigation_setup.colorPaletteRowClick();
        navigation_setup.colorPaletteReverseIconClick();

    }

}


module.exports = navigation_setup;