/** when X-axis options are changed in the side area, these methods are called */

var update_x_axis = {

    /** update the x axis title */
    updateTitle: function (newTitle, chart, all_chart_options) {
        chart.xAxis[0].setTitle({
            text: newTitle
        });

        all_chart_options.xAxis.title.text = newTitle;

    },


    /** update x axis tickmark interval */
    updateTickmarkInterval: function (newInterval, chart, all_chart_options) {


        if (isNaN(newInterval) || newInterval === 0) {
            newInterval = undefined;
        };

        if (!chart) { // called when this is used in x_axis_init
            return newInterval;
        } 

        if (newInterval > chart.xAxis[0].dataMax) {
            newInterval = chart.xAxis[0].dataMax;
        }

        chart.xAxis[0].update({
            tickInterval: newInterval

        });
        all_chart_options.xAxis.tickInterval = newInterval;

    }


}


module.exports = update_x_axis;