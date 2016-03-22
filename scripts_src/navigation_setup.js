var all_form_updates = require("./form_updates/all_form_updates.js");
var chart_recall = require("./chart_recall.js");
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

        $(".chart_type_icon").click(function () {
            //change selected icon
            $(".chart_type_icon").removeClass("selected");
            $(this).addClass("selected");
            var chart_type = $(this).divVal();

            //hide stuff unrelated to that chart type (line, bar, column)
            if (["area", "line", "bar", "column", "stacked_column", "stacked_bar"].indexOf(chart_type) > -1) {
                $(".show_line, .show_bar, .show_column").show();
            } else {
                $(".show_line, .show_bar, .show_column").hide();
            }
 
            $(".show_drilldown, .show_scatter").hide();
            if (["scatter", "drilldown"].indexOf(chart_type) > -1) {
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
            $("#color_palettes .selected").click();
        });
    },


    /** when .color_palette_row is clicked, change colors */
    colorPaletteRowClick: function () {
        $(".color_palette_row").click(function () {
            $(".color_palette_row").removeClass("selected");
            $(this).addClass("selected");
        });
    },


    /** when color palettes tab is selected for the first time, load the palettes **/
    colorPalettesLoad: function () {
        $("#tab_color_palette").click(function () {
            if ($("#color_palettes").children().length < 1) {
                $("#color_palettes").load("./components/color_palettes.htm", function () {
                    navigation_setup.colorPaletteRowClick();
                    all_form_updates.colorPaletteRowClick();

                });
            }
        });
    },



    /** when a help icon is clicked */
    helpIconClick: function () {

        $(".help_icon").click(function () {
            $(this).toggleClass("help_on");
            $(".notes", $(this).parents(".display, #main_result_code_div, #load_chart_div")).toggle();
        });

    },


    /** when a get code button is clicked, update and show the code area. */
    getCodeButtonClick: function (all_chart_options) {

        $("#get_code_button").click(function (e) {
            $(".load_chart_showing").click(); //hide the load saved chart area if it's showing

            var $get_code_span = $("#get_code_text");
            $(this).toggleClass("code_on");
            $("#main_result_code_div").slideToggle(100);
            if ($get_code_span.text() === "Get code") {

                //write all_chart_options
                utils_main.writeCode(all_chart_options);
                $get_code_span.text("Hide code");
                $("#chart_display_area").removeClass("fixed");
            } else {
                $get_code_span.text("Get code");
                $("#chart_display_area").addClass("fixed");

            }
        });

    },



    /** when load_chart_button is clicked, show that entry area **/

    loadChartButtonClick: function (chart, all_chart_options) {
        $("#load_chart_button").click(function () {
            $(".code_on").click(); //hide the get code area if it's showing
            $(this).toggleClass("load_chart_showing");
            $("#load_chart_div").slideToggle(100);

            if (!$(this).hasClass("load_chart_showing")) { // if closing the entry area, call function to load the chart_recall
                $("#chart_display_area").addClass("fixed");

                var input = $("#load_chart_textarea").val();
                if (input.length > 0) {
                    chart_recall.loadValues(chart, all_chart_options, input);
                }
            } else {
                $("#chart_display_area").removeClass("fixed");
            }

        });
    },


    /** when "Load series names from:" icons are clicked and changed */
    loadSeriesFromIcon: function () {

        $("#table_input_load_series_from_icons .load_series_from_icon").click(function () {
            //change selected icon
            $("#table_input_load_series_from_icons .selected").removeClass("selected");
            $(this).addClass("selected");

        });
    },


    /** INIT ALL NAVIGATION, called from app.js when page is loaded **/
    initAllNavigation: function (chart, all_chart_options) {

        navigation_setup.sideNavTabsChange();
        navigation_setup.chartTypeIconChange();
        navigation_setup.chartOutputCodeFocus(all_chart_options);
        navigation_setup.clearNextTextareaClick();
        navigation_setup.colorPalettesLoad();
        navigation_setup.colorPaletteReverseIconClick();
        navigation_setup.getCodeButtonClick(all_chart_options);
        navigation_setup.helpIconClick();
        navigation_setup.loadSeriesFromIcon();
        navigation_setup.loadChartButtonClick(chart, all_chart_options);


    }

}


module.exports = navigation_setup;