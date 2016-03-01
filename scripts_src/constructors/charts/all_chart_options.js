/** All Chart options constructor. combines all other options into main options object. Info at http://api.highcharts.com/highcharts */
var utils_main = require("../../utils/utils_main.js");

var AllChartOptions = function (o) {
    this.chart = o.chart;
    this.colors = o.colors;
    this.credits = o.credits;
    this.exporting = o.exporting;
    this.legend = o.legend;
    this.plot_options = o.plot_options;
    this.series = o.series;
    this.subtitle = o.subtitle;
    this.title = o.title;
    this.tooltip = o.tooltip;
    this.xAxis = o.xAxis;
    this.yAxis = o.yAxis;
}


module.exports = AllChartOptions;