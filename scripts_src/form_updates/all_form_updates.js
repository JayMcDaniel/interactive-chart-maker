var calculate_recession_dates = require("../utils/calculate_recession_dates.js");
var navigation_setup = require("../navigation_setup.js");
var update_template = require("./update_template.js");
var updateChartType = require("./update_chart_type.js");
var updateColors = require("./update_colors.js");
var utils_forms = require("../utils/utils_forms.js");
var utils_main = require("../utils/utils_main.js");
var update_legend = require("./update_legend.js");
var update_x_axis = require("./update_x_axis.js");
var update_y_axis = require("./update_y_axis.js");
var update_tooltip = require("./update_tooltip.js");
var update_data = require("./update_data.js");
var update_credits = require("./update_credits.js");
var update_chart_options = require("./update_chart_options.js");
var chart_recall = require("../utils/chart_recall.js");
var update_individual_series = require("./update_individual_series.js");
var update_map_palettes = require("./update_map_palettes.js");

var map_init = require("../initializers/maps/map_init.js");
var map_colors_init = require("../initializers/maps/map_colors_init.js");



/** listens for any form updates and calls appropriate function 
@module
*/
var allFormUpdates = function (chart, all_chart_options, all_map_options) {


    /* CHART TYPE CHANGES */


    /** highlights the icon clicked by adding 'selected' class **/
    allFormUpdates.selectChart = function (selected) {
        //change selected icon
        $("#chart_type_icons .chart_type_icon").removeClass("selected");
        $(selected).addClass("selected");

    };



    /** shows and hides elements depending on what chart type is selected **/
    allFormUpdates.displayOptions = function (chart_type) {

        //reset alert message to nothing
        $(".alert-danger").text("");

        $(".chart_tab, .display_options>*").not(".notes").show(); //start showing all, and might hide later if map selected
        $(".just_map").hide(); //hide just map stuff

        //hide stuff unrelated to that chart type (line, bar, column)
        if (["area", "line", "bar", "column", "stacked_column", "stacked_bar"].indexOf(chart_type) > -1) { //if one of these
            $(".show_line, .show_bar, .show_column").show();
        } else {
            $(".show_line, .show_bar, .show_column").hide();
        }

        //hide all classes with just_ ...
        $(".just_drilldown, .just_scatter, .just_bubble, .just_column, .just_bar, .just_arearange, .just_columnrange").hide();

        //show just_...
        if (["scatter", "drilldown", "bubble", "bar", "column", "stacked_column", "stacked_bar", "arearange", "columnrange"].indexOf(chart_type) > -1) {
            $(".just_" + chart_type.replace("stacked_", "")).show();
            $(".show_" + chart_type.replace("stacked_", "")).show();
        }

        //if drilldown, hide unrelated
        if (chart_type === "drilldown") {
            $("#tab_series_options").hide();
            if ($("#drilldown_type_select").val() === "bubble") {
                $(".just_bubble").show();
            }

        } else {
            $("#tab_series_options").show();
        }

    };



    /* when chart type icon is clicked and changed */

    $('.chart_type_icon').unbind().click(function () {


        allFormUpdates.selectChart(this);
        var chart_type = $(this).divVal();
        allFormUpdates.displayOptions(chart_type);

        updateChartType(chart_type, chart, all_chart_options);


        if (chart_type === "map") { //if map
            $(".chart_display_area").hide();
            $(".map_display_area").show();

            map_colors_init.loadMapColorPalettes(4); //loads color palettes then loads new map


        } else { //if not map
            $(".map_display_area").hide();
            $(".chart_display_area").show();
            chart.reflow();
            navigation_setup.chartClicks();

            //update tickmark interval (recalculates if not set)
            var new_x_interval = $("#chart_x_axis_tickmark_interval_input").val();
            update_x_axis.updateTickmarkInterval(new_x_interval, chart, all_chart_options, all_chart_options.xAxis.categories);

        }

    });



    /* when map type icon is clicked don't unbind this */
    $("#chart_type_map").click(function () {
        allFormUpdates.selectChart(this);
        $(".chart_tab").not(".map_tab").hide();
        $(".display_options:gt(0)>*").not(".notes").not(".show_map").hide(); //hide everything except map relevent options
        $(".just_map").show();
        $("#chart_credits_text_textarea").val("Hover over an area to see data.\nHover over legend items to see areas in a category.\nSource: U.S. Bureau of Labor Statistics."); //update credits area

    });


    /* when drilldown type dropdown is changed */

    $("#drilldown_type_select").unbind().change(function () {
        updateChartType("drilldown", chart, all_chart_options);

    });

    /* when animated bubble checkbox is clicked */


    $("#bubble_animated_checkbox").unbind().change(function () {
        $(".chart_animation_div").remove();
        updateChartType("bubble", chart, all_chart_options);
        all_chart_options.timeline = null;
        update_data.updateData(chart, all_chart_options);

    });



    /* TEMPLATE CHANGES */


    //chart ID
    $("#chart_id_textinput").unbind().keyup(function () {
        if (all_chart_options.chart.type === "map") { //for maps
            map_init.loadNewMap(chart, all_chart_options, all_map_options, false); // true to repopulate form
        } else {
            update_template.changeID($(this).val(), all_chart_options);
        }

    });

    //chart width
    $("#chart_width_textinput").unbind().keyup(function () {
        update_template.resize($(this).val(), "width", chart, all_chart_options);
    });

    //chart height
    $("#chart_height_textinput").unbind().keyup(function () {
        update_template.resize($(this).val(), "height", chart, all_chart_options);
    });

    //inner chart margins
    $(".margin_input").unbind().keyup(function () {
        var margins_arr = utils_forms.getClassValuesArray("margin_input");
        update_template.margin(margins_arr, chart, all_chart_options);
    });




    /* CHART DATA CHANGES - (x-axis categories and series array) */

    //"series names loaded from" icon clicked
    $("#table_input_load_series_from_icons .load_series_from_icon").unbind().click(function () {
        //change selected icon
        $("#table_input_load_series_from_icons .selected").removeClass("selected");
        $(this).addClass("selected");

        update_data.updateData(chart, all_chart_options);
        update_individual_series.populateForm(chart, all_chart_options);

        //update tickmark interval (recalculates if not set)
        var new_x_interval = $("#chart_x_axis_tickmark_interval_input").val();
        update_x_axis.updateTickmarkInterval(new_x_interval, chart, all_chart_options, all_chart_options.xAxis.categories);

    });




    //table input textarea
    $("#table_input_textarea").unbind().bind('blur paste', function () {

        if (all_chart_options.chart.type === "map") { //for maps
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
        } else {
            update_data.updateData(chart, all_chart_options); //for charts
        }
    });



    //example table select menu
    $("#example_table_select").unbind().change(function () {

        var new_table_file = "./dev/test_tables/" + $(this).val() + ".htm";

        $.get(new_table_file, function (table) {
            $("#table_input_textarea").val(table);
            $("#chart_type_icons .selected").click();
        });
    });




    /* COLOR PALETTE CHANGES - defined and initiated in navigation setup*/

    //chart color palettes
    allFormUpdates.colorPaletteRowClick = function () {

        $(".color_palette_row").unbind().click(function () {
            var chart_type = $("#chart_type_icons .selected").divVal(); //need chart type because drill is colored differently
            $(".color_palette_row").removeClass("selected");
            $(this).addClass("selected");
            updateColors(chart, all_chart_options, chart_type);
        });


        //map color palettes
        $(".map_color_palette_row").unbind().click(function () {

            $(".map_color_palette_row").removeClass("selected");
            var color_palette = $(this);
            color_palette.addClass("selected");
            $("#display_series_options_inner_div").empty(); //emptys the individual choices area so colors are redone.
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form

        });


    }


    // when page loads, load the chart palettes

    if ($("#color_palettes").children().length < 1) {
        $("#color_palettes").load("./components/color_palettes.htm", function () {
            allFormUpdates.colorPaletteRowClick();
        });
    } else {
        allFormUpdates.colorPaletteRowClick(); // runs when this main function is called with chart_recall
    }





    /* LEGEND CHANGES */

    //legend layout changed
    $("#legend_layout_select").unbind().change(function () {
        update_legend.updateLayout($(this).val(), chart, all_chart_options);
    });


    //legend item width changed

    $("#legend_item_width_input").unbind().keyup(function () {
        var newItemWidth = utils_main.checkForUndefined($(this).val());
        update_legend.updateItemWidth(newItemWidth, chart, all_chart_options);

    });


    //legend reverse ceckbox changed
    $("#legend_reverse_layout_checkbox, #map_legend_enabled_checkbox").unbind().change(function () {

        if (all_chart_options.chart.type === "map") { //for maps
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
        } else {
            var val = utils_forms.getCheckBoxValue($(this));
            update_legend.updateIsReversed(val, chart, all_chart_options);
        }
    });


    //legend toggle (hide others) checkbox changed
    $("#legend_make_toggle_checkbox").unbind().change(function () {
        var toggle_enabled = utils_forms.getCheckBoxValue($(this));
        update_legend.updateToggle(toggle_enabled, chart, all_chart_options);
    });

    //legend X or Y placement values changed
    $("#legend_placement_x, #legend_placement_y").unbind().keyup(function () {

        if (all_chart_options.chart.type === "map") { //for maps
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
        } else {

            var newX = Number($("#legend_placement_x").val());
            var newY = Number($("#legend_placement_y").val());

            update_legend.updateXYpositions(newX, newY, chart, all_chart_options);
        }
    });



    /* X-AXIS CHANGES */

    //x-axis title textarea changed
    $("#chart_x_axis_title_textarea").unbind().keyup(function () {
        var new_title = $(this).val();
        update_x_axis.updateTitle(new_title, chart, all_chart_options);
    });

    //x-axis title indent input changed (bar charts only)
    $("#chart_x_axis_x_position_input").unbind().keyup(function () {
        var new_indent = Number($(this).val());
        update_x_axis.updateTitleIndent(new_indent, chart, all_chart_options);
    });

    //x-axis tickmark interval input changed
    $("#chart_x_axis_tickmark_interval_input").unbind().keyup(function () {
        var new_interval = Number($(this).val());
        update_x_axis.updateTickmarkInterval(new_interval, chart, all_chart_options, all_chart_options.xAxis.categories);
    });


    //x-axis max input changed
    $("#chart_x_axis_max_input").unbind().keyup(function () {
        var newMax = $(this).val();
        update_x_axis.updateMax(newMax, chart, all_chart_options);
    });

    //x-axis min input changed
    $("#chart_x_axis_min_input").unbind().keyup(function () {
        var newMin = $(this).val();
        update_x_axis.updateMin(newMin, chart, all_chart_options);
    });


    //x-axis formatter (only years) changed
    $("#chart_x_axis_show_only_years, #chart_x_axis_add_commas").unbind().change(function () {
        var only_numbers = utils_forms.getCheckBoxValue($("#chart_x_axis_show_only_years"));
        var add_commas = utils_forms.getCheckBoxValue($("#chart_x_axis_add_commas"));
        update_x_axis.updateFormatter(only_numbers, add_commas, chart, all_chart_options);
    });





    /* Y-AXIS CHANGES */

    //y-axis title textarea changed
    $("#chart_y_axis_title_textarea").unbind().keyup(function () {
        var newTitle = $(this).val();
        update_y_axis.updateTitle(newTitle, chart, all_chart_options);
    });

    //y-axis title indent changed
    $("#chart_y_axis_x_position_input").unbind().keyup(function () {
        var newXPosition = $(this).val();
        update_y_axis.updateXPosition(newXPosition, chart, all_chart_options);
    });

    //y-axis tickmark interval input changed
    $("#chart_y_axis_tickmark_interval_input").unbind().keyup(function () {
        var newInterval = $(this).val();
        update_y_axis.updateTickmarkInterval(newInterval, chart, all_chart_options);
    });

    //y-axis max input changed
    $("#chart_y_axis_max_input").unbind().keyup(function () {
        var newMax = $(this).val();
        update_y_axis.updateMax(newMax, chart, all_chart_options);
    });

    //y-axis min input changed
    $("#chart_y_axis_min_input").unbind().keyup(function () {
        var newMin = $(this).val();
        update_y_axis.updateMin(newMin, chart, all_chart_options);
    });

    //y-axis opposite side ceckbox changed
    $("#chart_y_axis_opposite_checkbox").unbind().change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_y_axis.updateIsOpposite(val, chart, all_chart_options);
    });

    //y-axis log ceckbox changed
    $("#chart_y_axis_log_checkbox").unbind().change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_y_axis.updateIsLog(val, chart, all_chart_options);
    });

    //y-axis dollar / percent or decimal selects changed (format)
    $("#chart_y_axis_signs_select, #chart_y_axis_decimals_select, #chart_y_axis_divide_select").unbind().change(function () {
        var sign = $("#chart_y_axis_signs_select").val();
        var decimals = $("#chart_y_axis_decimals_select").val();
        var dividend = Number($("#chart_y_axis_divide_select").val());
        update_y_axis.updateFormatter(sign, decimals, dividend, chart, all_chart_options);
    });
    $("#chart_y_axis_signs_select").change(); //call once on load


    /* TOOLTIP CHANGES */

    //change shared tooltip checkbox, decimals, signs, or mulitplier selects
    $("#chart_tooltip_shared_checkbox, #chart_tooltip_force_decimals_select, #chart_tooltip_force_decimals_x_select, #chart_tooltip_force_decimals_z_select, #chart_tooltip_signs_select, #chart_tooltip_signs_x_select, #chart_tooltip_signs_z_select, #chart_tooltip_y_multiple_select").unbind().change(function () {
        if (all_chart_options.chart.type === "map") { //for maps
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
        } else {
            update_tooltip.updateToolTip(chart, all_chart_options);
        }
    });
    //call update tooltip after page and chart is loaded (has to be on a callback with the 'chart' object)
    $("#chart_tooltip_shared_checkbox").change();

    //bubble z value
    $("#chart_z_title_text_input").unbind().keyup(function () {
        update_tooltip.updateToolTip(chart, all_chart_options);

    });




    /* CREDITS CHANGES */

    $("#chart_credits_text_textarea").unbind().bind('input propertychange', function () {
        if (all_chart_options.chart.type === "map") { //for maps
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
        } else {
            update_credits.updateCreditText(chart, all_chart_options); //for charts
        }
    });



    /* EXTRA OPTIONS CHANGES */


    //Point padding change (only bar and column)

    $("#point_padding_input").unbind().bind('input propertychange', function () {

        var val = $(this).getValNumber();

        update_chart_options.changePointPadding(val, chart, all_chart_options);
    });


    //group padding change (only bar and column)

    $("#group_padding_input").unbind().bind('input propertychange', function () {
        var val = $(this).getValNumber();

        update_chart_options.changeGroupPadding(val, chart, all_chart_options);
    });


    //Subtitle change
    $("#chart_subtitle_textarea").unbind().bind('input propertychange', function () {

        if (all_chart_options.chart.type === "map") { //if map
            map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form

        } else { //if chart
            var new_title = $(this).val();
            update_chart_options.updateSubtitle(new_title, chart, all_chart_options);
        }

    });

    //MLR style toggle
    $("#chart_mlr_styles_checkbox").unbind().change(function () {
        var is_checked = utils_forms.getCheckBoxValue($(this));
        update_x_axis.toggleMLRStyle(is_checked, chart, all_chart_options);
        update_y_axis.toggleMLRStyle(is_checked, chart, all_chart_options);
        update_chart_options.toggleMLRStyle(is_checked, all_chart_options); //draw_chart is called from here to update plotBorder
        if (is_checked) {
            $("#color_palette_mlr").click(); //click MLR color palette
        }
    });


    //Zoom type changed
    $("#chart_zoom_select").unbind().change(function () {
        var val = $(this).val();
        update_chart_options.changeZoomType(val, chart, all_chart_options);
    }).change(); //change once on init to make type null, because zoomtype must be xy to start to enable dynamic changing


    //data labels checkbox toggled
    $("#chart_show_data_labels_checkbox").unbind().change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_chart_options.toggleDataLabels(val, chart, all_chart_options);
    });


    //recession shading
    $("#chart_add_recession_shading_select").unbind().change(function () {
        var dates_type = $(this).val();
        var plot_bands_arr = calculate_recession_dates.createPlotBands(all_chart_options.xAxis.categories, dates_type);
        calculate_recession_dates.insertPlotBands(plot_bands_arr, chart, all_chart_options);
        update_credits.updateCreditText(chart, all_chart_options);
    });





    /* MAP SPECIFIC FORM CHANGES */

    //type of map changed
    $("#map_type_select").unbind().change(function () {
        map_colors_init.loadMapColorPalettes(4);
        // map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
    });


    //is animated checkbox changed
    $("#map_animated_checkbox").unbind().change(function () {
        $("#legend_placement_y").val(70); // set legend y value so legend is lower for animated maps
        map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
    });

    //circle size range slider changed
    $("#map_circle_size_range").unbind().on("input", function () {
        map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
    });


    //map tooltip N/A input value changed
    $("#map_tooltip_na_text_input").unbind().on("input", function () {
        map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
    });

    //map size for spotlight checkbox changed
    $("#map_spotlight_size_checkbox").unbind().change(function () {
        map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
    });

    //map animation delay input changed
    $("#map_animation_speed_range").unbind().on("input", function () {
        map_init.loadNewMap(chart, all_chart_options, all_map_options, true); // true to repopulate form
    });



    //map palette + / - buttons clicked to change amount of colors
    $("#add_map_color, #minus_map_color").unbind().click(function () {
        update_map_palettes.changeAmount($(this));

    });









    /* Initialize chart_recall (load saved chart button ) */

    chart_recall.initLoad(chart, all_chart_options);

    //bind nav clicks and keys
    var navigation_setup = require("../navigation_setup.js");
    navigation_setup.initNavWithChart(chart, all_chart_options, all_map_options); // rebinds chart and all_chart_options to form events

};

module.exports = allFormUpdates;