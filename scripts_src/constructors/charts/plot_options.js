/** PlotOptions constructor. Info at http://api.highcharts.com/highcharts#plotOptions*/
var utils_main = require("../../utils/utils_main.js");


var PlotOptions = function (o) {

    //for all chart types
    if (o.series) {
        this.series = {
            events: {
                legendItemClick: o.series.events.legendItemClick
            },
            dataLabels: {
                enabled: o.series.dataLabels.enabled || false
            },
            pointPlacement: o.series.pointPlacement || null
        };
    }
    //just for column and bar charts
    if (o.column || o.bar) {
        this.series.stacking = o.series.stacking || null;
        this.series.pointPadding = o.series.pointPadding || 0.1; //0 is tight, 1 is loose
        this.series.groupPadding = o.series.groupPadding || 0.2;
        this.series.minPointLength = o.series.minPointLength || 2;
    }

    //just for bubble charts
    if (o.bubble) {
        this.bubble = {
            maxSize: o.bubble.maxSize || 50,
            sizeBy: 'width' //instead of 'area', seems more accurate
        };
    }

    //just for line charts
    if (o.line) {
        this.line = {
            lineWidth: 1.5,
            states: {
                hover: {
                    lineWidth: 4
                }
            },
            marker: {
                enabled: o.line.marker ? o.line.marker.enabled || false : false,
                states: {
                    hover: {
                        enabled: true,
                        radius: 5
                    }
                }
            }
        };
    }

}


module.exports = PlotOptions;