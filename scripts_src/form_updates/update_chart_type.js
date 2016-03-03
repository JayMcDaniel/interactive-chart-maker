/** when a chart icon is clicked, this function is called - changes the chart type shown */
var plotOptionsInit = require("../initializers/plot_options_init.js");
var update_data = require("./update_data.js");

var updateChartType = function (i, type, chart, all_chart_options) {

    var y_axis_title_align;

    if (type === "bar") {
        //fix y axis position
        chart.inverted = true;
        y_axis_title_align = "middle";
        //hide non-relevant elements
        $(".not_bar").hide();


    } else {
        chart.inverted = false;
        y_axis_title_align = "high";
        $(".not_bar").show();

    }

    if (type === "drilldown") {
        type = "column";
    }
    

    chart.xAxis[0].update({}, false);
    chart.yAxis[0].update({}, false);
    chart.yAxis[0].setTitle({
        align: y_axis_title_align
    }, false);

    //re parse data
    update_data.updateData(chart, all_chart_options);

    


    all_chart_options.chart.type = type;
    all_chart_options.yAxis.title.align = y_axis_title_align;
}


module.exports = updateChartType;