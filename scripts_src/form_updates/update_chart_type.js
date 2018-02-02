var draw_chart = require("../draw_chart");
var plotOptionsInit = require("../initializers/charts/plot_options_init.js");
var update_data = require("./update_data.js");
var update_tooltip = require("./update_tooltip.js");
var update_x_axis = require("./update_x_axis.js");
var update_y_axis = require("./update_y_axis.js");
var utils_main = require("../utils/utils_main.js");


/** when a chart icon is clicked, this function is called - changes the chart type shown 
@module
*/
var updateChartType = function (chart_type, chart, all_chart_options) {


    //if drilled into a drilldown, click the up button to get out - prevents errors
    utils_main.drillUp();

    //if map
    if (chart_type === "map") {
        all_chart_options.chart.type = "map";
        return false;
    }


    //if not map
    var type = chart_type.replace("stacked_", "");

    if (type === "drilldown") {

        type = $("#drilldown_type_select").val();
    }

    //if not a line and has a second y-axis, remove that axis

    if (type != "line") {
        $("#chart_y_axis_2_enabled_checkbox").prop('checked', false).change();
    }


    if (type === "bar") {
        //fix y axis position
        chart.inverted = true;
        all_chart_options.yAxis.title.align = "middle";
        all_chart_options.xAxis.title.align = "high";
        all_chart_options.yAxis.title.x = 0;
        all_chart_options.yAxis.title.y = 8;
        all_chart_options.xAxis.title.y = -20;
        all_chart_options.xAxis.title.x = Number($("#chart_x_axis_x_position_input").val());

        //hide non-relevant elements
        $(".not_bar").hide();

    } else { //chart not bar
        chart.inverted = false;
        all_chart_options.yAxis.title.align = "high";
        all_chart_options.xAxis.title.align = "middle";
        all_chart_options.yAxis.title.x = Number($("#chart_y_axis_x_position_input").val());
        all_chart_options.yAxis.title.y = -20;
        all_chart_options.xAxis.title.y = 0;
        all_chart_options.xAxis.title.x = 0;

        $(".not_bar").show();
    }



    all_chart_options.xAxis.plotLines = [{
        "value": 0,
        "color": "#c0c0c0",
        "dashStyle": "solid",
        "width": type === "scatter" || type === "bubble" ? 1 : 0
        }];

    all_chart_options.xAxis.gridLineWidth = type === "scatter" || type === "bubble" ? 1 : 0;
    all_chart_options.xAxis.startOnTick = type === "scatter" || type === "bubble" ? true : false;

    chart.xAxis[0].update({
        gridLineWidth: all_chart_options.xAxis.gridLineWidth,
        plotLines: all_chart_options.xAxis.plotLines,
        startOnTick: all_chart_options.xAxis.startOnTick
    }, false);



    chart.xAxis[0].setTitle({
        align: all_chart_options.xAxis.title.align,
        y: all_chart_options.xAxis.title.y,
        x: all_chart_options.xAxis.title.x
    }, false);

    chart.yAxis[0].setTitle({
        align: all_chart_options.yAxis.title.align,
        x: all_chart_options.yAxis.title.x,
        y: all_chart_options.yAxis.title.y
    }, false);


    //re parse data
    update_data.updateData(chart, all_chart_options);

    all_chart_options.chart.type = type;

    //update whether data labels are enabled
    $("#chart_show_data_labels_checkbox").change();

    //update tooltip
    update_tooltip.updateToolTip(chart, all_chart_options);


}


module.exports = updateChartType;