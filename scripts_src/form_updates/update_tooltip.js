var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms");



/** when tooltip options are changed in the side area, these methods are called 
@namespace
*/
var update_tooltip = {


    /** gets a tooltip for bubble charts. Called from updateToolTip **/
    getBubbleTooltip: function (chart, decimals, signs_arr, multiplier, chart_type, z_title, all_chart_options) {


        if (decimals > 0) { //use decimal formatter//

            all_chart_options.tooltip.formatter = function () {
                var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
                var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";


                var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                    Highcharts.numberFormat((this.y * multiplier), decimals, ".", ",") + signs_arr[1] + "</b><br/>" +
                    x_axis_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.x * multiplier), decimals, ".", ",") + signs_arr[1] + "</b><br/>" +
                    z_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.point.z * multiplier), decimals, ".", ",") + signs_arr[1] + "</b>";

                all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

                return s.replace(/\$-/g, "-$");
            };
        } else { //don't use decimal formatter//

            all_chart_options.tooltip.formatter = function () {
                var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
                var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";



                var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                    $(this.y * multiplier).addCommas() + signs_arr[1] + "</b><br/>" +
                    x_axis_title + ": <b>" + signs_arr[0] + $(this.x * multiplier).addCommas() + signs_arr[1] + "</b><br/>" +
                    z_title + ": <b>" + signs_arr[0] + $(this.point.z * multiplier).addCommas() + signs_arr[1] + "</b>";

                all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

                return s.replace(/\$-/g, "-$");

            };




        };


    },



    /** gets a tooltip for scatter charts. Called from updateToolTip**/
    getScatterTooltip: function (chart, decimals, signs_arr, multiplier, chart_type, all_chart_options) {

        if (decimals > 0) { //use decimal formatter//
            all_chart_options.tooltip.formatter = function () {

                var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
                var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";


                var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                    Highcharts.numberFormat((this.y * multiplier), decimals, ".", ",") + signs_arr[1] + "</b><br>" +
                    x_axis_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.x * multiplier), decimals, ".", ",") + signs_arr[1] + "</b>";


                //add extra data//
                all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

                return s.replace(/\$-/g, "-$");
            };
        } else { //no decimal formatter //

            all_chart_options.tooltip.formatter = function () {
                var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
                var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

                var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                    $(this.y * multiplier).addCommas() + signs_arr[1] + "</b><br>" +
                    x_axis_title + ": <b>" + signs_arr[0] + $(this.x * multiplier).addCommas() + signs_arr[1] + "</b>";

                //add extra data//
                all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

                return s.replace(/\$-/g, "-$");

            };
        }

    },





    /** gets a tooltip for typical charts (line, area, bar etc). Called from updateToolTip**/
    getTypicalTooltip: function (chart, is_shared, decimals, signs_arr, multiplier, chart_type, all_chart_options) {


        if (is_shared) { //SHARED TOOLTIP

            if (decimals > 0) { //use decimal formatter

                all_chart_options.tooltip.formatter = function () {

                    var shared_tooltip_arr = ["<b>" + this.key + "</b>"];
                    var point = this.point;

                    $.each(this.series.chart.series, function (i) {

                        var y_val = this.points[point.x].high ? " High: " + signs_arr[0] + Highcharts.numberFormat((this.points[point.x].high * multiplier), decimals, ".", ",") + signs_arr[1] + " | Low: " + signs_arr[0] + Highcharts.numberFormat((this.points[point.x].low * multiplier), decimals, ".", ",") + signs_arr[1] :
                            signs_arr[0] + Highcharts.numberFormat((this.points[point.x].y * multiplier), decimals, ".", ",") + signs_arr[1];


                        var s = this.name + ": " + y_val;

                        all_chart_options.series[i].extra_data ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[i].extra_data, point, s) : s = s;

                        shared_tooltip_arr.push(s);

                    });

                    return shared_tooltip_arr.join('<br/>').replace(/\$-/g, "-$");
                }



            } else { //don't use decimal formatter

                all_chart_options.tooltip.formatter = function () {

                    var shared_tooltip_arr = ["<b>" + this.key + "</b>"];
                    var point = this.point;

                    $.each(this.series.chart.series, function (i) {

                        var y_val = this.points[point.x].high ? " High: " + signs_arr[0] + $(this.points[point.x].high * multiplier).addCommas() + signs_arr[1] + " | Low: " + signs_arr[0] + $(this.points[point.x].low * multiplier).addCommas() + signs_arr[1] :
                            signs_arr[0] + $(this.points[point.x].y * multiplier).addCommas() + signs_arr[1];


                        var s = this.name + ": " + y_val;

                        all_chart_options.series[i].extra_data ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[i].extra_data, point, s) : s = s;


                        var s = this.name + ": " + y_val;

                        shared_tooltip_arr.push(s);

                    });

                    return shared_tooltip_arr.join('<br/>').replace(/\$-/g, "-$");

                }
            }


        } else { //NOT SHARED TOOLTIP

            if (decimals > 0) { //use decimal formatter
                all_chart_options.tooltip.formatter = function () {

                    var y_val = this.point.high ? "High: " + signs_arr[0] + Highcharts.numberFormat((this.point.high * multiplier), decimals, ".", ",") + signs_arr[1] + " | Low: " + signs_arr[0] + Highcharts.numberFormat((this.point.low * multiplier), decimals, ".", ",") + signs_arr[1] : signs_arr[0] + Highcharts.numberFormat((this.y * multiplier), decimals, ".", ",") + signs_arr[1];

                    var s = "<b>" + this.series.name + "</b><br>" + this.x + ": " + y_val;

                    all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

                    return s.replace(/\$-/g, "-$");
                }

            } else { //don't use decimal formatter
                all_chart_options.tooltip.formatter = function () {

                    var y_val = this.point.high ? "High: " + signs_arr[0] + $(this.point.high * multiplier).addCommas() + signs_arr[1] + " | Low: " + signs_arr[0] + $(this.point.low * multiplier).addCommas() + signs_arr[1] :
                        signs_arr[0] + $(this.y * multiplier).addCommas() + signs_arr[1];

                    var s = "<b>" + this.series.name + "</b><br>" + this.x + ": " + y_val;

                    all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;
                    return s.replace(/\$-/g, "-$");
                }
            }
        }

    },





    /** update tooltip - decide which kind of chart and call that get tooltip function **/
    updateToolTip: function (chart, all_chart_options) {


        //extra data function
        all_chart_options.tooltip.addExtraData = function (extra_data, point, s) {

            if (extra_data && extra_data[0].name) {

                $.each(extra_data, function (i) {
                    if (extra_data[i].values[point.index]) {
                        s = s + "<br>&nbsp;&nbsp;" + extra_data[i].name + ": " + extra_data[i].values[point.index];
                    }

                });
            }
            return s;
        };

        var is_shared = utils_forms.getCheckBoxValue($("#chart_tooltip_shared_checkbox")),
            decimals = Number($("#chart_tooltip_force_decimals_select").val()),
            signs = $("#chart_tooltip_signs_select").val(),
            multiplier = Number($("#chart_tooltip_y_multiple_select").val()),
            chart_type = all_chart_options.chart.type,
            signs_arr = [signs === "$" ? "$" : "", signs === "%" ? "%" : ""],
            z_title = $("#chart_z_title_text_input").val() === "" ? "Z" : $("#chart_z_title_text_input").val();



        //IF A TYPICAL CHART
        if (["area", "line", "bar", "stacked_bar", "column", "stacked_column", "arearange", "columnrange"].indexOf(chart_type) > -1) {
            update_tooltip.getTypicalTooltip(chart, is_shared, decimals, signs_arr, multiplier, chart_type, all_chart_options);
        }



        //IF A SCATTER CHART
        else if (chart_type === "scatter") {
            update_tooltip.getScatterTooltip(chart, decimals, signs_arr, multiplier, chart_type, all_chart_options);
        }

        //IF A BUBBLE CHART
        else if (chart_type === "bubble") {
            update_tooltip.getBubbleTooltip(chart, decimals, signs_arr, multiplier, chart_type, z_title, all_chart_options);
        }



        if (!chart) { //for use in tooltip_init
            return all_chart_options.tooltip;
        }

        chart.tooltip.options.formatter = all_chart_options.tooltip.formatter;

        update_tooltip.replacement_obj = {
            decimals: decimals,
            multiplier: multiplier,
            signs_arr: signs_arr,
            z_title: z_title
        };

        //  all_chart_options.tooltip.formatter = utils_main.stringifyFormatter(all_chart_options.tooltip.formatter, update_tooltip.replacement_obj);

    }

}


module.exports = update_tooltip;