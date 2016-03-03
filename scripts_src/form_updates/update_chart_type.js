/** when a chart icon is clicked, this function is called - changes the chart type shown */

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

    $.each(chart.series, function () {
        this.update({
            type: type
        }, false);
    });

    chart.yAxis[0].setTitle({
        align: y_axis_title_align
    });


    all_chart_options.chart.type = type;
    all_chart_options.yAxis.title.align = y_axis_title_align;
}


module.exports = updateChartType;