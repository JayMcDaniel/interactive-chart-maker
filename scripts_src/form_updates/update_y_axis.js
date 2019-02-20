var utils_main = require("../utils/utils_main.js");


/** when Y-axis options are changed in the side area, these methods are called 
@namespace
*/
var update_y_axis = {


    /** add second y-axis **/
    addSecondAxis: function (chart, all_chart_options) {

        var sign = $("#chart_y_axis_signs_select_2").val();
        //update chart
        var second_axis = {
            id: 'second-y-axis',
            title: {
                text: $("#chart_y_axis_title_textarea_2").val(),
                align: "high",
                rotation: 0,
                offset: 20,
                margin: 6,
                style: {
                    color: '#000000',
                    fontFamily: 'Calibri, Arial, Helvetica, sans-serif',
                    fontWeight: 'normal',
                    fontSize: '13px'
                },
                x: $("#chart_y_axis_x_position_input_2").getValNumber(),
                y: -15
            },

            labels: {
                formatter: function () {
                    return $(this.value).addCommas(0);
                },
                decimals: $("#chart_y_axis_decimals_select_2").val(),
                dividend: 1,
                signs_arr: [sign === "$" ? "$" : "", sign === "%" ? "%" : ""]
            },

            opposite: true,
            lineColor: 'gray',
            lineWidth: 1,
            max: update_y_axis.updateMax(Number($("#chart_y_axis_max_input_2").val())),
            min: update_y_axis.updateMin(Number($("#chart_y_axis_min_input_2").val())),
            tickInterval: update_y_axis.updateTickmarkInterval(Number($("#chart_y_axis_tickmark_interval_input_2").val())),
            tickmarkPlacement: 'on',
            tickPosition: 'outside',
            tickColor: '#C0D0E0',
            tickWidth: 1

        };

        chart.addAxis(second_axis);


        //update options
        all_chart_options.yAxis = [all_chart_options.yAxis, second_axis];

    },

    /** remove second y-axis and move each series to first axis**/
    removeSecondAxis: function (chart, all_chart_options) {

        if (chart.get('second-y-axis')) {

            $(chart.series).each(function (i, series) {
                series.update({
                    yAxis: 0
                });

            });

            $(all_chart_options.series).each(function (i, series) {
                series.yAxis = 0;
            });


            chart.get('second-y-axis').remove();
            all_chart_options.yAxis = all_chart_options.yAxis[0];
        }

    },






    /** update format when dollar / percent signs select is changed */
    updateFormatter: function (sign, y_axis_decimals, y_axis_dividend, chart, all_chart_options, axis_number) {

        //make signs array from chosen sign
        var y_axis_signs_arr = [sign === "$" ? "$" : "", sign === "%" ? "%" : ""];

        //set y-axis index (for secondary axes)
        var index = axis_number == "2" ? 1 : 0;


        //update options
        var y_axis = all_chart_options.yAxis[0] ? all_chart_options.yAxis[index] : all_chart_options.yAxis;

        y_axis.labels.signs_arr = y_axis_signs_arr;
        y_axis.labels.decimals = y_axis_decimals;
        y_axis.labels.dividend = y_axis_dividend;


        //update chart
        chart.yAxis[index].update({
            labels: {
                signs_arr: y_axis_signs_arr,
                decimals: y_axis_decimals,
                dividend: y_axis_dividend
            }
        })



        //create formatter
        if (y_axis_decimals !== "null") { //if decimals are not null   


            var yAxisFormat = function () {
                var decimals = this.axis.options.labels.decimals;
                var signs_arr = this.axis.options.labels.signs_arr;
                var dividend = this.axis.options.labels.dividend;

                var s = Highcharts.numberFormat(this.value / dividend, decimals, ".", ",");
                s = signs_arr[0] + s + signs_arr[1];
                return s.replace(/\$-/g, "-$");
            }



        } else { //if decimals are null
            var yAxisFormat = function () {
                var decimals = this.axis.options.labels.decimals;
                var signs_arr = this.axis.options.labels.signs_arr;
                var dividend = this.axis.options.labels.dividend;

                var s = (this.value / dividend == parseInt(this.value / dividend)) ? Highcharts.numberFormat(this.value / dividend, 0, ".", ",") : Highcharts.numberFormat(this.value / dividend, 1, ".", ",");
                s = signs_arr[0] + s + signs_arr[1];
                return s.replace(/\$-/g, "-$");
            }

        }




        // called when this is used in y_axis_init
        if (!chart) {
            return yAxisFormat;
        }


        //update chart formatter
        chart.yAxis[index].update({
            labels: {
                formatter: yAxisFormat
            }
        });


        //update chart_options formatter
        if (all_chart_options.yAxis.labels) {
            all_chart_options.yAxis.labels.formatter = yAxisFormat;
        } else { //dual axis
            all_chart_options.yAxis[index].labels.formatter = yAxisFormat;
        }

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
        $("#chart_y_axis_x_position_input").val($("#chart_y_axis_x_position_input").val() * -1).keyup();

    },



    /** update y-axis max */
    updateMax: function (new_max, chart, all_chart_options, axis_number) {

        var index = axis_number == "2" ? 1 : 0;





        new_max = utils_main.checkForUndefined(new_max);
        if (!chart) { // called when this is used in y_axis_init
            return new_max;
        }

        chart.yAxis[index].update({
            max: new_max
        });


        if (Array.isArray(all_chart_options.yAxis)) {
            all_chart_options.yAxis[index].max = new_max;
        } else {
            all_chart_options.yAxis.max = new_max;
        }

    },



    /** update y-axis min */
    updateMin: function (new_min, chart, all_chart_options, axis_number) {

        var index = axis_number == "2" ? 1 : 0;

        new_min = utils_main.checkForUndefined(new_min);
        if (!chart) { // called when this is used in y_axis_init
            return new_min;
        }

        chart.yAxis[index].update({
            min: new_min
        });


        if (Array.isArray(all_chart_options.yAxis)) {
            all_chart_options.yAxis[index].min = new_min;
        } else {
            all_chart_options.yAxis.min = new_min;
        }

    },




    /** update the y axis title */
    updateTitle: function (new_title, chart, all_chart_options, axis_number) {

        var index = axis_number == "2" ? 1 : 0;

        chart.yAxis[index].setTitle({
            text: new_title
        });

        if (all_chart_options.yAxis.title) {
            all_chart_options.yAxis.title.text = new_title;
        } else {
            all_chart_options.yAxis[index].title.text = new_title;
        }


    },



    /** update y axis x-position (title.x) */
    updateXPosition: function (new_x, chart, all_chart_options, axis_number) {

        var index = axis_number == "2" ? 1 : 0;

        new_x = utils_main.checkForUndefined(new_x);

        chart.yAxis[index].setTitle({
            x: new_x
        });


        if (all_chart_options.yAxis.title) {
            all_chart_options.yAxis.title.x = new_x;
        } else {
            all_chart_options.yAxis[index].title.x = new_x;
        }

    },





    /** update y axis tickmark interval */
    updateTickmarkInterval: function (new_interval, chart, all_chart_options, axis_number) {

        var index = axis_number == "2" ? 1 : 0;

        new_interval = utils_main.checkForUndefined(new_interval);

        if (!chart) { // called when this is used in y_axis_init
            return new_interval;
        }

        if (new_interval > chart.yAxis[index].dataMax) {
            new_interval = chart.yAxis[index].dataMax;
        }

        chart.yAxis[index].update({
            tickInterval: new_interval

        });


        var y_axis = all_chart_options.yAxis[0] ? all_chart_options.yAxis[index] : all_chart_options.yAxis;

        y_axis.tickInterval = new_interval;


    }


}


module.exports = update_y_axis;