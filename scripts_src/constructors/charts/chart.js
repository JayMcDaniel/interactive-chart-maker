/** Chart options constructor. Info at http://api.highcharts.com/highcharts#chart
* @constructor ChartOptions 
*  @param o {object} chart options object
*/
var ChartOptions = function (o) {

    this.renderTo = o.renderTo || "chart_display_area";
    this.margin = [o.margin[0] || 90, o.margin[1] || 40, o.margin[2] || 80, o.margin[3] || 75]; //[top,right,bottom,left]
    this.borderWidth = o.borderWidth || 0;
    this.plotBorderColor = o.plotBorderColor || '#000';
    this.plotBorderWidth = o.plotBorderWidth || 0;
    this.backgroundColor = '#fff';
    this.type = o.type || 'line';
    this.events = o.events;
    this.zoomType = 'xy';
    this.alignTicks = o.alignTicks || false;
    this.ignoreHiddenSeries = o.ignoreHiddenSeries || true; //false for bubble charts so bubbles won't resize
    this.inverted = o.inverted;
}


module.exports = ChartOptions;