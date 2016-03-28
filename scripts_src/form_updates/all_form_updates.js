var calculate_recession_dates = require("../utils/calculate_recession_dates.js");
var update_template = require("./update_template.js");
var updateChartType = require("./update_chart_type.js");
var updateColors = require("./update_colors.js");
var utils_forms = require("../utils/utils_forms.js");
var update_legend = require("./update_legend.js");
var update_x_axis = require("./update_x_axis.js");
var update_y_axis = require("./update_y_axis.js");
var update_tooltip = require("./update_tooltip.js");
var update_data = require("./update_data.js");
var update_credits = require("./update_credits.js");
var update_chart_options = require("./update_chart_options.js");
var chart_recall = require("../chart_recall.js");
var update_individual_series = require("./update_individual_series.js");


/** listens for any form updates and calls appropriate function 
@module
*/
var allFormUpdates = function (chart, all_chart_options) {

    /* CHART TYPE CHANGES */


    /** when chart type icon is clicked and changed **/


    $.each(['area', 'line', 'bar', 'stacked_bar', 'column', 'stacked_column', 'bubble', 'scatter', "drilldown"], function (i, type) {
        $('#chart_type_' + type).unbind().click(function () {
            //change selected icon
            $("#chart_type_icons .chart_type_icon").removeClass("selected");
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

            updateChartType(i, type, chart, all_chart_options);
        });
    });




    /* TEMPLATE CHANGES */

    //chart width
    $("#chart_width_textinput").unbind().keyup(function () {
        update_template.resize($(this).val(), "width", chart);
    });

    //chart height
    $("#chart_height_textinput").unbind().keyup(function () {
        update_template.resize($(this).val(), "height", chart);
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

    });




    //table input textarea
    $("#table_input_textarea").unbind().bind('input propertychange', function () {
        update_data.updateData(chart, all_chart_options);
    });





    /* COLOR PALETTE CHANGES - defined and initiated in navigation setup*/

    allFormUpdates.colorPaletteRowClick = function () {
        $(".color_palette_row").unbind().click(function () {
            var chart_type = $("#chart_type_icons .selected").divVal(); //need chart type because drill is colored differently
            $(".color_palette_row").removeClass("selected");
            $(this).addClass("selected");
            updateColors(chart, all_chart_options, chart_type);

        });
    }

    // when page loads, load the palettes

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


    //legend reverse ceckbox changed
    $("#legend_reverse_layout_checkbox").unbind().change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_legend.updateIsReversed(val, chart, all_chart_options);
    });


    //legend toggle (hide others) checkbox changed
    $("#legend_make_toggle_checkbox").unbind().change(function () {
        var toggle_enabled = utils_forms.getCheckBoxValue($(this));
        update_legend.updateToggle(toggle_enabled, chart, all_chart_options);
    });

    //legend X or Y placement values changed
    $("#legend_placement_x, #legend_placement_y").unbind().keyup(function () {
        var newX = Number($("#legend_placement_x").val());
        var newY = Number($("#legend_placement_y").val());

        update_legend.updateXYpositions(newX, newY, chart, all_chart_options);
    });



    /* X-AXIS CHANGES */

    //x-axis title textarea changed
    $("#chart_x_axis_title_textarea").unbind().keyup(function () {
        var newTitle = $(this).val();
        update_x_axis.updateTitle(newTitle, chart, all_chart_options);
    });

    //x-axis tickmark interval input changed
    $("#chart_x_axis_tickmark_interval_input").unbind().keyup(function () {
        var newInterval = Number($(this).val());
        update_x_axis.updateTickmarkInterval(newInterval, chart, all_chart_options);
    });




    /* Y-AXIS CHANGES */

    //y-axis title textarea changed
    $("#chart_y_axis_title_textarea").unbind().keyup(function () {
        var newTitle = $(this).val();
        update_y_axis.updateTitle(newTitle, chart, all_chart_options);
    });

    //y-axis title indent changed
    $("#chart_y_axis_x_position_input").unbind().keyup(function () {
        var newXPosition = Number($(this).val());
        update_y_axis.updateXPosition(newXPosition, chart, all_chart_options);
    });

    //y-axis tickmark interval input changed
    $("#chart_y_axis_tickmark_interval_input").unbind().keyup(function () {
        var newInterval = Number($(this).val());
        update_y_axis.updateTickmarkInterval(newInterval, chart, all_chart_options);
    });

    //y-axis max input changed
    $("#chart_y_axis_max_input").unbind().keyup(function () {
        var newMax = Number($(this).val());
        update_y_axis.updateMax(newMax, chart, all_chart_options);
    });

    //y-axis min input changed
    $("#chart_y_axis_min_input").unbind().keyup(function () {
        var newMin = Number($(this).val());
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
    $("#chart_y_axis_signs_select, #chart_y_axis_decimals_select").unbind().change(function () {
        var sign = $("#chart_y_axis_signs_select").val();
        var decimals = $("#chart_y_axis_decimals_select").val();
        update_y_axis.updateFormat(sign, decimals, chart, all_chart_options)
    });



    /* TOOLTIP CHANGES */

    //change shared tooltip checkbox, decimals, signs, or mulitplier selects
    $("#chart_tooltip_shared_checkbox, #chart_tooltip_force_decimals_select, #chart_tooltip_signs_select, #chart_tooltip_y_multiple_select").unbind().change(function () {
        update_tooltip.updateToolTip(chart, all_chart_options);
    });
    //call update tooltip after page and chart is loaded (has to be on a callback with the 'chart' object)
    update_tooltip.updateToolTip(chart, all_chart_options);




    /* CREDITS CHANGES */

    $("#chart_credits_text_textarea").unbind().bind('input propertychange', function () {
        update_credits.updateCreditText(chart, all_chart_options);
    });



    /* EXTRA OPTIONS CHANGES */

    //MLR style toggle
    $("#chart_mlr_styles_checkbox").unbind().change(function () {
        var is_checked = utils_forms.getCheckBoxValue($(this));
        update_x_axis.toggleMLRStyle(is_checked, chart, all_chart_options);
        update_y_axis.toggleMLRStyle(is_checked, chart, all_chart_options);
        update_chart_options.toggleMLRStyle(is_checked, all_chart_options); //draw_chart is called from here to update plotBorder
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
    $("#chart_add_recession_shading_select").change(function(){
        var dates_type = $(this).val();
        var plot_bands_arr = calculate_recession_dates.createPlotBands(all_chart_options.xAxis.categories, dates_type);
        calculate_recession_dates.insertPlotBands(plot_bands_arr, chart, all_chart_options);
        update_credits.updateCreditText(chart, all_chart_options);
    });
    
    
    


    /* Initialize chart_recall (load saved chart button ) */

    chart_recall.initLoad(chart, all_chart_options);

    //bind nav clicks and keys
    var navigation_setup = require("../navigation_setup.js");
    navigation_setup.initNavWithChart(chart, all_chart_options); // rebinds chart and all_chart_options to form events

};

module.exports = allFormUpdates;