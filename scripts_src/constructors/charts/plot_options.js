/** PlotOptions constructor. Info at http://api.highcharts.com/highcharts#plotOptions
 * @constructor PlotOptions 
 * @param o {object} PlotOptions options object
 */
var PlotOptions = function (o) {

    //for all chart types. values are undefined if not in o.
    this.series = {
        events: {
            legendItemClick: o.series.events.legendItemClick
        },
        dataLabels: {
            enabled: o.series.dataLabels.enabled || false,
            allowOverlap: o.series.dataLabels.allowOverlap || false,
            padding: 0,
            verticalAlign: "bottom",
            style:{
                "textShadow": "none",
                "color": "#000"
            }
        },
        pointPlacement: o.series.pointPlacement,
        stacking: o.series.stacking,
        pointPadding: o.series.pointPadding,
        groupPadding: o.series.groupPadding,
        minPointLength: o.series.minPointLength,
      //  maxSize: o.series.maxSize,
        minSize: o.series.minSize,
        sizeBy: o.series.sizeBy,
        lineWidth: o.series.lineWidth,
        states: o.series.states,
        marker: o.series.marker

    };

    this.bubble = {
        tooltip: {
            followPointer: true
        }
    };

}


module.exports = PlotOptions;