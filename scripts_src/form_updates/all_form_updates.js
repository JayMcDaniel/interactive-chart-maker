var update_template = require("./update_template.js");
var updateChartType = require("./update_chart_type.js");
var updateColors = require("./update_colors.js");
var utils_forms = require("../utils/utils_forms");
var update_legend = require("./update_legend.js");
var update_x_axis = require("./update_x_axis.js");
var update_y_axis = require("./update_y_axis.js");
var update_tooltip = require("./update_tooltip.js");
var update_data = require("./update_data.js");
var update_credits = require("./update_credits.js");
var update_chart_options = require("./update_chart_options.js");
var update_individual_series = require("./update_individual_series.js");

/** listens for any form updates and calls appropriate function 
@module
*/
var allFormUpdates = function (chart, all_chart_options) {
    /* CHART TYPE CHANGES */

    //chart type changed
    $.each(['area', 'line', 'bar', 'stacked_bar', 'column', 'stacked_column', 'bubble', 'scatter', "drilldown"], function (i, type) {
        $('#chart_type_' + type).click(function () {
            updateChartType(i, type, chart, all_chart_options);
        });

    });


    /* TEMPLATE CHANGES */

    //chart width
    $("#chart_width_textinput").keyup(function () {
        update_template.resize($(this).val(), "width", chart);
    });

    //chart height
    $("#chart_height_textinput").keyup(function () {
        update_template.resize($(this).val(), "height", chart);
    });

    //inner chart margins
    $(".margin_input").keyup(function () {
        var margins_arr = utils_forms.getClassValuesArray("margin_input");
        update_template.margin(margins_arr, chart, all_chart_options);
    });


    /* CHART DATA CHANGES - (x-axis categories and series array)*/

    //"series names loaded from" icon clicked
    $(".load_series_from_icon").click(function () {
        update_data.updateData(chart, all_chart_options);
    });

    $("#table_input_textarea").bind('input propertychange', function () {
        update_data.updateData(chart, all_chart_options);
    });




    /* INDIVIDUAL SERIES UPDATES */

    //update individual series options section (call on load and when data is changed)
    $("#tab_series_options").click(function () {
        update_individual_series.populateForm(chart, all_chart_options);

    });



    /* COLOR PALETTE CHANGES - defined and initiated in navigation setup*/

    allFormUpdates.colorPaletteRowClick = function () {
        $(".color_palette_row").click(function () {
            var chart_type = $("#chart_type_icons .selected").divVal();
            updateColors(chart, all_chart_options, chart_type);
        });
    }



    /* LEGEND CHANGES */

    //legend layout changed
    $("#legend_layout_select").change(function () { 
        update_legend.updateLayout($(this).val(), chart, all_chart_options);
    });


    //legend reverse ceckbox changed
    $("#legend_reverse_layout_checkbox").change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_legend.updateIsReversed(val, chart, all_chart_options);
    });


    //legend toggle (hide others) checkbox changed
    $("#legend_make_toggle_checkbox").change(function () {
        var toggle_enabled = utils_forms.getCheckBoxValue($(this));
        update_legend.updateToggle(toggle_enabled, chart, all_chart_options);
    });

    //legend X or Y placement values changed
    $("#legend_placement_x, #legend_placement_y").keyup(function () {
        var newX = Number($("#legend_placement_x").val());
        var newY = Number($("#legend_placement_y").val());

        update_legend.updateXYpositions(newX, newY, chart, all_chart_options);
    });



    /* X-AXIS CHANGES */

    //x-axis title textarea changed
    $("#chart_x_axis_title_textarea").keyup(function () {
        var newTitle = $(this).val();
        update_x_axis.updateTitle(newTitle, chart, all_chart_options);
    });

    //x-axis tickmark interval input changed
    $("#chart_x_axis_tickmark_interval_input").keyup(function () {
        var newInterval = Number($(this).val());
        update_x_axis.updateTickmarkInterval(newInterval, chart, all_chart_options);
    });




    /* Y-AXIS CHANGES */

    //y-axis title textarea changed
    $("#chart_y_axis_title_textarea").keyup(function () {
        var newTitle = $(this).val();
        update_y_axis.updateTitle(newTitle, chart, all_chart_options);
    });

    //y-axis title indent changed
    $("#chart_y_axis_x_position_input").keyup(function () {
        var newXPosition = Number($(this).val());
        update_y_axis.updateXPosition(newXPosition, chart, all_chart_options);
    });

    //y-axis tickmark interval input changed
    $("#chart_y_axis_tickmark_interval_input").keyup(function () {
        var newInterval = Number($(this).val());
        update_y_axis.updateTickmarkInterval(newInterval, chart, all_chart_options);
    });

    //y-axis max input changed
    $("#chart_y_axis_max_input").keyup(function () {
        var newMax = Number($(this).val());
        update_y_axis.updateMax(newMax, chart, all_chart_options);
    });

    //y-axis min input changed
    $("#chart_y_axis_min_input").keyup(function () {
        var newMin = Number($(this).val());
        update_y_axis.updateMin(newMin, chart, all_chart_options);
    });

    //y-axis opposite side ceckbox changed
    $("#chart_y_axis_opposite_checkbox").change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_y_axis.updateIsOpposite(val, chart, all_chart_options);
    });

    //y-axis log ceckbox changed
    $("#chart_y_axis_log_checkbox").change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_y_axis.updateIsLog(val, chart, all_chart_options);
    });

    //y-axis dollar / percent or decimal selects changed (format)
    $("#chart_y_axis_signs_select, #chart_y_axis_decimals_select").change(function () {
        var sign = $("#chart_y_axis_signs_select").val();
        var decimals = $("#chart_y_axis_decimals_select").val();
        update_y_axis.updateFormat(sign, decimals, chart, all_chart_options)
    });



    /* TOOLTIP CHANGES */

    //change shared tooltip checkbox, decimals, signs, or mulitplier selects
    $("#chart_tooltip_shared_checkbox, #chart_tooltip_force_decimals_select, #chart_tooltip_signs_select, #chart_tooltip_y_multiple_select").change(function () {
        update_tooltip.updateToolTip(chart, all_chart_options);
    });
    //call update tooltip after page and chart is loaded (has to be on a callback with the 'chart' object)
    update_tooltip.updateToolTip(chart, all_chart_options);




    /* CREDITS CHANGES */

    $("#chart_credits_text_textarea").bind('input propertychange', function () {
        update_credits.updateCreditText(chart, all_chart_options);
    });



    /* EXTRA OPTIONS CHANGES */

    //MLR style toggle
    $("#chart_mlr_styles_checkbox").change(function () {
        var is_checked = utils_forms.getCheckBoxValue($(this));
        update_x_axis.toggleMLRStyle(is_checked, chart, all_chart_options);
        update_y_axis.toggleMLRStyle(is_checked, chart, all_chart_options);
        update_chart_options.toggleMLRStyle(is_checked, all_chart_options); //draw_chart is called from here to update plotBorder
    });


    //Zoom type changed
    $("#chart_zoom_select").change(function () {
        var val = $(this).val();
        update_chart_options.changeZoomType(val, chart, all_chart_options);
    }).change(); //change once on init to make type null, because zoomtype must be xy to start to enable dynamic changing


    //data labels checkbox toggled
    $("#chart_show_data_labels_checkbox").change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_chart_options.toggleDataLabels(val, chart, all_chart_options);
    });


};

module.exports = allFormUpdates;