/** when X-axis options are changed in the side area, these methods are called 
@namespace
*/

var update_x_axis = {


    /**makes x-axis MLR or standard style **/
    toggleMLRStyle: function (is_checked, chart, all_chart_options) {

        //if using MLR styles
        if (is_checked) {
            all_chart_options.xAxis.tickPosition = "inside";
            all_chart_options.xAxis.tickColor = "#000";
        } else { //using standard styles
            all_chart_options.xAxis.tickPosition = "outside";
            all_chart_options.xAxis.tickColor = "#C0D0E0";
        }


        chart.xAxis[0].update({
            tickPosition: all_chart_options.xAxis.tickPosition,
            tickColor: all_chart_options.xAxis.tickColor
        });
    },


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