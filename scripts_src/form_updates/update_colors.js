var colorsInit = require("../initializers/colors_init.js");

/** updates the chart's colors - called when palette is changed. Calls colorsInit 
@module
@param chart {object} the main chart object, built when chart is loaded
@param all_chart_options {object} the main chart options that load into building of the chart and are turned to string for the output
**/
var updateColors = function (chart, all_chart_options) {
    all_chart_options.colors = colorsInit(chart);
    chart.options.colors = all_chart_options.colors;

    $(chart.series).each(function (i) {
        this.update({
            _colorIndex: i
        }, false);
    });
    
    chart.redraw();
}

module.exports = updateColors;