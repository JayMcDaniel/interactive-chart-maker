/** when legend options are changed in the side area */

var update_legend = {

    /* decide if the legend should be reverse order */
    updateIsReversed: function updateIsReversed(val, chart, all_chart_options) {

        var legend = chart.legend;
        legend.options.reversed = val;
        legend.render();

        all_chart_options.legend.setOption("reversed", val, all_chart_options);
    },


    /** if 'no legend' is selected, hide the legend, and set options, else, show it with the correct layout */
    updateLayout: function updateLayout(val, chart, all_chart_options) {

        var legend = chart.legend;
        if (val === "no_legend") {
            legend.group.hide();
            legend.box.hide();
            legend.display = false;
            legend.options.enabled = false;
            legend.render(false);

            val = undefined;

        } else {

            legend.options.layout = val;
            legend.render(false);
            legend.group.show();
            legend.box.show();
            legend.display = true;
            legend.options.enabled = true;
        }

        all_chart_options.legend.setOption("layout", val, all_chart_options);
        all_chart_options.legend.setOption("enabled", legend.options.enabled, all_chart_options);
    },

    /** update X and Y positions on legend */

    updateXYpositions: function (newX, newY, chart, all_chart_options) {
        var legend = chart.legend;
        legend.options.x = newX;
        legend.options.y = newY;
        legend.render(false);

        all_chart_options.legend.setOption("x", newX, all_chart_options);
        all_chart_options.legend.setOption("y", newY, all_chart_options);

    }

}


module.exports = update_legend;