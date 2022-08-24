/** 
* All Chart options constructor. Combines all other options into main options object. Info at http://api.highcharts.com/highcharts 
@constructor AllChartOptions
@param o {object} chart options object
*/
var AllChartOptions = function (o) {
    this.chart = o.chart;
    this.colors = o.colors;
    this.legend = o.legend;
    this.plotOptions = o.plotOptions;
    this.series = o.series;
    this.drilldown = o.drilldown;
    this.subtitle = o.subtitle;
    this.title = o.title;
    this.tooltip = o.tooltip;
    this.xAxis = o.xAxis;
    this.yAxis = o.yAxis;
    this.credits = o.credits;
    this.exporting = o.exporting;
    this.input_table = $("#table_input_textarea").val();
}


module.exports = AllChartOptions;