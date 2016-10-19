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
            if (this.color != "none") {
                //update chart
                this.update({
                    color: all_chart_options.colors[i]
                }, false);
                //update all_chart_options.series.data colors
                all_chart_options.series[0].data[i].color = all_chart_options.colors[i];
            }

        });

    } else { //other charts color by series

        var start_coloring_index = 0;
        var color_index_mod = 0;

        if (chart_type === "bubble" && $("#bubble_animated_checkbox").is(":checked")) {
            start_coloring_index = 2;
            color_index_mod = 2;
        }

        $(chart.series).each(function (i) {

            if (i >= start_coloring_index) {
                //update chart
                this.update({
                    color: all_chart_options.colors[(i - color_index_mod) - Math.floor((i - color_index_mod) / 15) * 15]
                }, false);
                //update all_chart_options.series colors
                all_chart_options.series[i - color_index_mod].color = all_chart_options.colors[(i - color_index_mod) - Math.floor((i - color_index_mod) / 15) * 15];

            }
        });




    }

    chart.redraw();
}

module.exports = updateColors;