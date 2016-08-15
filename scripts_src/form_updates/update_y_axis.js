var utils_main = require("../utils/utils_main.js");


/** when Y-axis options are changed in the side area, these methods are called 
@namespace
*/
var update_y_axis = {

    /**makes y-axis MLR or standard style **/
    toggleMLRStyle: function (is_checked, chart, all_chart_options) {

        //if using MLR styles
        if (is_checked) {
            all_chart_options.yAxis.tickWidth = 0;
            all_chart_options.yAxis.gridLineDashStyle = 'Solid';
        } else { //using standard styles
            all_chart_options.yAxis.tickWidth = 1;
            all_chart_options.yAxis.gridLineDashStyle = 'Dot';

        }

        chart.yAxis[0].update({
            tickWidth: all_chart_options.yAxis.tickWidth,
            gridLineDashStyle: all_chart_options.yAxis.gridLineDashStyle
        });

    },


    /** update format when dollar / percent signs select is changed */
    updateFormatter: function (sign, y_axis_decimals, dividend, chart, all_chart_options) {

        var y_axis_signs_arr = [sign === "$" ? "$" : "", sign === "%" ? "%" : ""];

        if (y_axis_decimals !== "null") { //if decimals are not null   

            var newYFormat = function () {
                var s = Highcharts.numberFormat(this.value / dividend, y_axis_decimals, ".", ",");
                return y_axis_signs_arr[0] + s.replace(/\$-/g, "-$") + y_axis_signs_arr[1];
            }

        } else { //if decimals are null
            var newYFormat = function () {
                var s = (this.value / dividend == parseInt(this.value / dividend)) ? Highcharts.numberFormat(this.value / dividend, 0, ".", ",") : Highcharts.numberFormat(this.value / dividend, 1, ".", ",");
                return y_axis_signs_arr[0] + s.replace(/\$-/g, "-$") + y_axis_signs_arr[1];
            }

        }


        if (!chart) { // called when this is used in y_axis_init
            return newYFormat;
        }

        chart.yAxis[0].update({
            labels: {
                formatter: newYFormat
            }
        });


        update_y_axis.replacement_obj = {
            y_axis_decimals: y_axis_decimals,
            dividend: dividend,
            y_axis_signs_arr: y_axis_signs_arr
        };

        all_chart_options.yAxis.labels.formatter = newYFormat;


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

        //update y axis title position
        $("#chart_y_axis_x_position_input").val($("#chart_y_axis_x_position_input").val()*-1).keyup();

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



}


module.exports = update_y_axis;