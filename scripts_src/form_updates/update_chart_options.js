var writeCode = require("../write_code.js");


var update_chart_options = {
    changeChartType: function (i, type, chart, all_chart_options) {

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

        chart.series[0].update({
            type: type
        });

        all_chart_options.chart.setOption("type", type);
        writeCode(all_chart_options);
    }

}

module.exports = update_chart_options;