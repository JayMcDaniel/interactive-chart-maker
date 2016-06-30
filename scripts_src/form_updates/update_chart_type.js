var draw_chart = require("../draw_chart");
var plotOptionsInit = require("../initializers/charts/plot_options_init.js");
var update_data = require("./update_data.js");
var update_tooltip = require("./update_tooltip.js");
var update_x_axis = require("./update_x_axis.js");


/** when a chart icon is clicked, this function is called - changes the chart type shown 
@module
*/
var updateChartType = function (chart_type, chart, all_chart_options) {

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




    chart.xAxis[0].update({
        plotLines: [{
            "value": 0,
            "color": "#c0c0c0",
            "dashStyle": "solid",
            "width": type === "scatter" || type === "bubble" ? 1 : 0
        }]
    }, false);

    all_chart_options.xAxis.plotLines = chart.xAxis[0].plotLines;


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

    //update tooltip
    update_tooltip.updateToolTip(chart, all_chart_options);


}


module.exports = updateChartType;