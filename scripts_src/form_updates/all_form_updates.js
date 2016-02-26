/** listens for any form updates and calls appropriate function */
var update_template = require("./update_template.js");
var updateChartType = require("./update_chart_type.js");
var utils_forms = require("../utils/utils_forms");
var update_legend = require("./update_legend.js");

var allFormUpdates = function (chart, all_chart_options) {

    //chart width
    $("#chart_width_textinput").keyup(function () {
        update_template.resize($(this).val(), "width", chart, all_chart_options);
    });

    //chart height
    $("#chart_height_textinput").keyup(function () {
        update_template.resize($(this).val(), "height", chart, all_chart_options);
    });

    //inner chart margins
    $(".margin_input").keyup(function () {

        var margins_arr = utils_forms.getClassValuesArray("margin_input");

        update_template.margin(margins_arr, chart, all_chart_options);

    });


    //chart type changed
    $.each(['line', 'bar', 'column', 'bubble', 'scatter', "drilldown"], function (i, type) {
        $('#chart_type_' + type).click(function () {
            updateChartType(i, type, chart, all_chart_options)
        });
    });


    //legend layout changed
    $("#legend_layout_select").change(function () {
        update_legend.updateLayout($(this).val(), chart, all_chart_options);
    });

    //legend reverse ceckbox changed
    $("#legend_reverse_layout_checkbox").change(function () {
        var val = utils_forms.getCheckBoxValue($(this));
        update_legend.updateIsReversed(val, chart, all_chart_options);
    });

    //legend X or Y placement values changed
    $("#legend_placement_x, #legend_placement_y").keyup(function () {
        var newX = Number($("#legend_placement_x").val());
        var newY = Number($("#legend_placement_y").val());

        update_legend.updateXYpositions(newX, newY, chart, all_chart_options);
    });

};

module.exports = allFormUpdates;