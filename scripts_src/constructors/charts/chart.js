/** Chart options constructor. Info at http://api.highcharts.com/highcharts#chart */
var utils_main = require("../../utils/utils_main.js");


var ChartOptions = function (o) {

    this.renderTo = o.renderTo || "chart_display_area";
    this.margin = [o.margin[0] || 90, o.margin[1] || 40, o.margin[2] || 80, o.margin[3] || 75]; //[top,right,bottom,left]
    this.borderWidth = o.borderWidth || 0;
    this.plotBorderColor = o.plotBorderColor || '#fff';
    this.plotBorderWidth = o.plotBorderWidth || 0;
    this.type = o.type || 'line';
    this.zoomType = o.zoomType || null;
    this.alignTicks = o.alignTicks || false;
    this.inverted = o.inverted || false;
    this.ignoreHiddenSeries = o.ignoreHiddenSeries || true; //false for bubble charts so bubbles won't resize
}

ChartOptions.prototype.setOption = utils_main.setOption;


module.exports = ChartOptions;