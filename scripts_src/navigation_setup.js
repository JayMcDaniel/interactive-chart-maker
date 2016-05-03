var utils_main = require("./utils/utils_main.js");
var update_individual_series = require("./form_updates/update_individual_series.js");
var keyboard_inputs = require("./keyboard_inputs.js");


/** object that contains functions for all the navigation, ie changing between options and chart types 
@namespace
*/
var navigation_setup = {

    /** when tabs on left side nav bar are clicked, options displayed are changed **/
    sideNavTabsChange: function (chart, all_chart_options) {

        $("#side_nav_tabs .tab").unbind().click(function () {
            //change selected menu tab
            $("#side_nav_tabs .selected_tab").removeClass("selected_tab");
            $(this).addClass("selected_tab");

            //change display div showing
            var selectedID = "#" + $(this).attr("id").replace("tab", "display");
            $("#side_display .selected_display").removeClass("selected_display");
            $(selectedID).addClass("selected_display");

            //if this is "Individual Series Options", run that setup function
            if (selectedID === "#display_series_options") {
                update_individual_series.populateForm(chart, all_chart_options);
            }

        });
    },


    /** when chart code is hovered over, update **/
    chartOutputCodeFocus: function (all_chart_options) {
        $("#chart_output_code").unbind().hover(function () {
            utils_main.writeCode(all_chart_options);
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
            $(".color_palette_row, .map_color_palette_row").each(function () {
                var this_row = $(this);
                var color_cells = this_row.children('.color_palette_cell, .map_color_palette_cell');
                this_row.prepend(color_cells.get().reverse());
            });
            $("#color_palettes .selected, .map_color_palette_row.selected").click(); //click to change colors in chart

        });
    },





    /** when a get code button is clicked, update and show the code area. */
    getCodeButtonClick: function (all_chart_options) {

        $("#get_code_button").unbind().click(function (e) {
            $(".load_chart_showing").removeClass("load_chart_showing"); //hide the load saved chart area if it's showing
            $("#load_chart_div").hide();

            var $get_code_span = $("#get_code_text");

            if ($get_code_span.text() === "Get code") {
                $("#main_result_code_div").slideDown(50, function () {
                    //write all_chart_options
                    utils_main.writeCode(all_chart_options);
                    $get_code_span.text("Hide code");



                });

            } else {
                $("#main_result_code_div").slideUp(50);
                $get_code_span.text("Get code");


            }

            $(this).toggleClass("code_on");
            $(".chart_display_area").toggleClass("fixed");

        });

    },





    /** when a help icon is clicked */
    helpIconClick: function () {

        $(".help_icon").click(function () {
            $(this).toggleClass("help_on");

            $(".notes", $(this).parents(".display, #main_result_code_div, #load_chart_div, #side_nav_top")).toggle();

        });

    },





    /** when show_load_chart_area_button is clicked, show that entry area **/

    loadChartButtonClick: function (chart, all_chart_options) {
        $("#show_load_chart_area_button").unbind().click(function () {
            $("#main_result_code_div").slideUp(50, function () { //hide the get code area if it's showing
                $("#load_chart_div").slideToggle(50);
                $(".code_on").removeClass("code_on");
                $("#get_code_text").text("Get code");
                $(".chart_display_area").toggleClass("fixed");
            });

            $(this).toggleClass("load_chart_showing");
        });

    },




    /** INIT ALL NAVIGATION that needs parameters, called from all_form_updates when page is loaded, and whenever a saved chart is loaded **/
    initNavWithChart: function (chart, all_chart_options) {

        navigation_setup.chartOutputCodeFocus(all_chart_options);
        navigation_setup.getCodeButtonClick(all_chart_options);
        navigation_setup.loadChartButtonClick(chart, all_chart_options);
        navigation_setup.sideNavTabsChange(chart, all_chart_options);

        keyboard_inputs.initListeners(chart, all_chart_options);
        keyboard_inputs.sideNavTabShortcuts(chart, all_chart_options);

    },


    /** FIRST NAVIGATION INIT, called from app.js when page is loaded. These never need to be re-initialized **/
    firstNavInit: function () {

        navigation_setup.clearNextTextareaClick();
        navigation_setup.colorPaletteReverseIconClick();
        navigation_setup.helpIconClick();

    }

}


module.exports = navigation_setup;