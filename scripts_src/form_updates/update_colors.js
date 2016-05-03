var colorsInit = require("../initializers/charts/colors_init.js");

/** updates the chart's colors - called when palette is changed. Calls colorsInit 
@module
@param chart {object} the main chart object, built when chart is loaded
@param all_chart_options {object} the main chart options that load into building of the chart and are turned to string for the output
**/
var updateColors = function (chart, all_chart_options, chart_type) {
    all_chart_options.colors = colorsInit();
    chart.options.colors = all_chart_options.colors;

    if (chart_type === "drilldown") { //drilldowns color by point

        $(chart.series[0].data).each(function (i) {
            //update chart
            this.update({
                color: all_chart_options.colors[i]
            }, false);
            //update all_chart_options.series.data colors
            all_chart_options.series[0].data[i].color = all_chart_options.colors[i];
        });

    } else { //other charts color by series

        $(chart.series).each(function (i) {
            //update chart
            this.update({
                color: all_chart_options.colors[i]
            }, false);
            //update all_chart_options.series colors
            all_chart_options.series[i].color = all_chart_options.colors[i];
        });


    }

    chart.redraw();
}

module.exports = updateColors;