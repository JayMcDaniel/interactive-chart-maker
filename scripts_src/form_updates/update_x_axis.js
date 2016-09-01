var utils_main = require("../utils/utils_main.js");

/** when X-axis options are changed in the side area, these methods are called 
@namespace
*/

var update_x_axis = {



    /** update x-axis formatter **/
    /** update format when dollar / percent signs select is changed TODO!*/
    updateFormatter: function (only_numbers, add_commas, sign, x_axis_decimals, chart, all_chart_options) {

        var newXFormat = undefined;
        var x_axis_signs_arr = [sign === "$" ? "$" : "", sign === "%" ? "%" : ""];

        if (only_numbers) {
            newXFormat = function () {
                return this.value.replace(/[^0-9\.\-]+/g, '') //hide non-numbers if show only years box is checked//
            }
        }

        if (add_commas || sign != "no_signs" || x_axis_decimals != "null") {
            newXFormat = function () {
                var s = x_axis_signs_arr[0] + $(Number(this.value)).addCommas(x_axis_decimals) + x_axis_signs_arr[1];

                return s.replace(/\$-/g, "-$");
            }
        }


        //replacement_obj is used to replace stings with values when writing the output code in utils_main
        update_x_axis.replacement_obj = {
            x_axis_decimals: x_axis_decimals || null,
            x_axis_signs_arr: x_axis_signs_arr || ["", ""]
        };


        if (!chart) { // called when this is used in y_axis_init
            return newXFormat;
        }

        chart.xAxis[0].update({
            labels: {
                formatter: newXFormat
            }
        });


        all_chart_options.xAxis.labels.formatter = newXFormat;

    },

    
    

    /** update x-axis max */
    updateMax: function (newMax, chart, all_chart_options) {
        newMax = utils_main.checkForUndefined(newMax);
        if (!chart) { // called when this is used in x_axis_init
            return newMax;
        }

        chart.xAxis[0].update({
            max: newMax
        });

        all_chart_options.xAxis.max = newMax;
    },



    /** update y-axis min */
    updateMin: function (newMin, chart, all_chart_options) {
        newMin = utils_main.checkForUndefined(newMin);
        if (!chart) { // called when this is used in x_axis_init
            return newMin;
        }

        chart.xAxis[0].update({
            min: newMin
        });

        all_chart_options.xAxis.min = newMin;
    },


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


    /** update the x-axis title **/
    updateTitle: function (new_title, chart, all_chart_options) {
        chart.xAxis[0].setTitle({
            text: new_title
        });

        all_chart_options.xAxis.title.text = new_title;

    },


    /** update the x-axis title indent (bar charts only) **/
    updateTitleIndent: function (new_indent, chart, all_chart_options) {
        chart.xAxis[0].setTitle({
            x: new_indent
        });

        all_chart_options.xAxis.title.x = new_indent;

    },


    /** update x axis tickmark interval **/
    updateTickmarkInterval: function (new_interval, chart, all_chart_options, categories) {

        if (isNaN(Number(new_interval)) || Number(new_interval) === 0) {

            if (!categories) {
                new_interval = null;
            } else {
                new_interval = categories.length * .2 > 1 ? Math.floor(categories.length * .2) : null;
            }

        };

        if (!chart) { // called when this is used in x_axis_init
            return new_interval;
        }

        if (new_interval > chart.xAxis[0].dataMax) {
            new_interval = chart.xAxis[0].dataMax;
        }

        chart.xAxis[0].update({
            tickInterval: new_interval
        });
        all_chart_options.xAxis.tickInterval = new_interval;

    }


}


module.exports = update_x_axis;