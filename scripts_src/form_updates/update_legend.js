/** when legend options are changed in the side area 
@namespace
*/

var update_legend = {

    /** decide if the legend should be reverse order **/
    updateIsReversed: function updateIsReversed(val, chart, all_chart_options) {

        var legend = chart.legend;
        legend.options.reversed = val;
        legend.render();

        all_chart_options.legend.reversed = val;
    },



    /** updates legend item width - usefull for making legends with lots of items look more aligned */
    updateItemWidth: function (newItemWidth, chart, all_chart_options) {

        var legend = chart.legend;
        legend.options.itemWidth = newItemWidth;
        legend.render(false);

        all_chart_options.legend.itemWidth = newItemWidth;
    },


    /** if 'no legend' is selected, hide the legend, and set options, else, show it with the correct layout */
    updateLayout: function (val, chart, all_chart_options) {

        var legend = chart.legend;
        if (val === "no_legend") {
            legend.group.hide();
            legend.box.hide();
            legend.display = false;
            legend.options.enabled = false;
            legend.render(true);

            if (legend.pager) {
                legend.pager.hide();
                legend.up.hide();
                legend.down.hide();
            }

            val = undefined;

        } else {

            legend.options.layout = val;
            legend.render(false);
            legend.group.show();
            legend.box.show();

            legend.display = true;

            if (legend.pager) {
                legend.pager.show();
                legend.up.show();
                legend.down.show();
            }

            legend.options.enabled = true;
        }

        all_chart_options.legend.layout = val;
        all_chart_options.legend.enabled = legend.options.enabled;
        console.log(all_chart_options.legend.enabled);

    },



    /** set if when one legend item is clicked, the others hide */
    updateToggle: function (toggle_enabled, chart, all_chart_options, chart_type) {

        //update all_chart_options
        if (toggle_enabled) {

            var legendItemClick = function (event) {
                var selected = this.index;
                var allSeries = this.chart.series;
                $.each(allSeries, function (index, series) {
                    selected == index ? series.show() : series.hide();
                });
                return false;
            };

            var cursor_style = "pointer";


        } else if (chart_type === "drilldown") {
            var legendItemClick = function (event) {
                return false;
            };

            var cursor_style = "default";


        } else {
            var legendItemClick = function (event) {};

            var cursor_style = "pointer";

        }

        if (!chart) {
            return legendItemClick;
        } else { //if chart already made, update
            all_chart_options.plotOptions.series.events.legendItemClick = legendItemClick;

            all_chart_options.legend.itemHoverStyle.cursor =
                all_chart_options.legend.itemStyle.cursor =
                chart.legend.options.itemHoverStyle.cursor =
                chart.legend.options.itemStyle.cursor = cursor_style;

            // all_chart_options.legend.symbolWidth = chart.legend.options.symbolWidth = symbol_width;

            chart.legend.render(false);
        }

        //update in current chart
        chart.series.forEach(function (serie, i) {
            var is_visible = i > 0 && toggle_enabled === true ? false : true;

            serie.update({
                visible: is_visible,
                events: {
                    legendItemClick: all_chart_options.plotOptions.series.events.legendItemClick
                }
            }, false);

            all_chart_options.series[i].visible = is_visible;

        });

        chart.redraw(true);
    },


    /** update X and Y positions on legend */

    updateXYpositions: function (newX, newY, chart, all_chart_options) {
        var legend = chart.legend;
        legend.options.x = newX;
        legend.options.y = newY;
        legend.render(false);

        all_chart_options.legend.x = newX;
        all_chart_options.legend.y = newY;

    }

}


module.exports = update_legend;