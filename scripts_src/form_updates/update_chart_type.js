var plotOptionsInit = require("../initializers/plot_options_init.js");
var update_data = require("./update_data.js");
var update_tooltip = require("./update_tooltip.js");


/** when a chart icon is clicked, this function is called - changes the chart type shown 
@module
*/
var updateChartType = function (i, type, chart, all_chart_options) {
    var y_axis_title_align;

    type = type.replace("stacked_", "");

    if (type === "bar") {
        //fix y axis position
        chart.inverted = true;
        all_chart_options.yAxis.title.align = "middle";
        all_chart_options.xAxis.title.align = "high";
        all_chart_options.yAxis.title.x = 0;
        all_chart_options.yAxis.title.y = 8;
        all_chart_options.xAxis.title.y = -20;
        all_chart_options.xAxis.title.x = 40;

        //hide non-relevant elements
        $(".not_bar").hide();

    } else { //chart not bar
        chart.inverted = false;
        all_chart_options.yAxis.title.align = "high";
        all_chart_options.xAxis.title.align = "middle";
        $(".not_bar").show();
        all_chart_options.yAxis.title.y = -20;
        all_chart_options.xAxis.title.y = 0;
        all_chart_options.xAxis.title.x = 0;
    }

    if (type === "drilldown") {
        type = "column";
    }

    chart.xAxis[0].update({
        plotLines: [{
            "value": 0,
            "color": "#c0c0c0",
            "dashStyle": "solid",
            "width": type === "scatter" || type === "bubble" ? 1 : 0
        }]
    }, false);


    chart.yAxis[0].update({}, false);
    
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