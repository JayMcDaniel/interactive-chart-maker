/** when Y-axis options are changed in the side area, these methods are called */
var utils_main = require("../utils/utils_main.js");



var update_y_axis = {


    /** update format when dollar / percent signs select is changed */
    updateFormat: function (sign, decimals, chart, all_chart_options) {

        var newFormat = "{value:,." + decimals + "f}";
        if (sign === "$") {
            newFormat = "${value:,." + decimals + "f}";
        }

        if (sign === "%") {
            newFormat = "{value:,." + decimals + "f}%";
        }

        if (!chart) { // called when this is used in y_axis_init
            return newFormat;
        }

        chart.yAxis[0].update({
            labels: {
                format: newFormat
            }
        });

        all_chart_options.yAxis.format = newFormat;

    },


    /** update if y-axis is log */
    updateIsLog: function (val, chart, all_chart_options) {

        var type = val === true ? "logarithmic" : "linear";
        if (!chart) { // called when this is used in y_axis_init
            return type;
        }

        chart.yAxis[0].update({
            type: type
        });
        all_chart_options.yAxis.type = type;

    },


    /** update if y axis labels are on opposite side */
    updateIsOpposite: function (val, chart, all_chart_options) {
        chart.yAxis[0].update({
            opposite: val
        });
        all_chart_options.yAxis.opposite = val;

    },

    /** update y-axis max */
    updateMax: function (newMax, chart, all_chart_options) {
        newMax = utils_main.checkforUndefined(newMax);
        if (!chart) { // called when this is used in y_axis_init
            return newMax;
        }

        chart.yAxis[0].update({
            max: newMax
        });

        all_chart_options.yAxis.max = newMax;
    },

    /** update y-axis min */
    updateMin: function (newMin, chart, all_chart_options) {
        newMin = utils_main.checkforUndefined(newMin);
        if (!chart) { // called when this is used in y_axis_init
            return newMin;
        }

        chart.yAxis[0].update({
            min: newMin
        });

        all_chart_options.yAxis.min = newMin;
    },

    /** update the y axis title */
    updateTitle: function (newTitle, chart, all_chart_options) {
        chart.yAxis[0].setTitle({
            text: newTitle
        });

        all_chart_options.yAxis.title.text = newTitle;

    },

    /** update y axis x-position (title.x) */


    updateXPosition: function (newXPosition, chart, all_chart_options) {

        newXPosition = utils_main.checkforUndefined(newXPosition);

        chart.yAxis[0].setTitle({
            x: newXPosition
        });

        all_chart_options.yAxis.title.x = newXPosition;

    },

    /** update y axis tickmark interval */
    updateTickmarkInterval: function (newInterval, chart, all_chart_options) {


        newInterval = utils_main.checkforUndefined(newInterval);

        if (!chart) { // called when this is used in y_axis_init
            return newInterval;
        }

        if (newInterval > chart.yAxis[0].dataMax) {
            newInterval = chart.yAxis[0].dataMax;
        }

        chart.yAxis[0].update({
            tickInterval: newInterval

        });
        all_chart_options.yAxis.tickInterval = newInterval;

    }




    //
    //
    //        if (isNaN(newInterval) || newInterval === 0) {
    //            newInterval = undefined;
    //        };
    //
    //        if (!chart) { // called when this is used in x_axis_init
    //            return newInterval;
    //        } 
    //
    //        if (newInterval > chart.xAxis[0].dataMax) {
    //            newInterval = chart.xAxis[0].dataMax;
    //        }
    //
    //        chart.xAxis[0].update({
    //            tickInterval: newInterval
    //
    //        });
    //        all_chart_options.xAxis.tickInterval = newInterval;
    //
    //
    //    }


}


module.exports = update_y_axis;