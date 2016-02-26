/** when a chart icon is clicked, this function is called - changes the chart type shown */

var updateChartType = function (i, type, chart, all_chart_options) {

        if (type === "bar") {
            chart.inverted = true;
        } else {
            chart.inverted = false;
        }

        if (type === "drilldown") {
            type = "column";
        }

        chart.xAxis[0].update({}, false);
        chart.yAxis[0].update({}, false);

        $.each(chart.series, function () {
        this.update({
                type: type
            });
        });

        all_chart_options.chart.setOption("type", type, all_chart_options);
    }


module.exports = updateChartType;