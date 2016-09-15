var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms");



/** when tooltip options are changed in the side area, these methods are called 
@namespace
*/
var update_tooltip = {


    /** gets a tooltip for bubble charts. Called from updateToolTip **/
    getBubbleTooltip: function (chart, y_decimals, x_decimals, z_decimals, y_signs_arr, x_signs_arr, z_signs_arr, multiplier, chart_type, z_title, all_chart_options) {

        all_chart_options.tooltip.formatter = function () {
            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + y_signs_arr[0] +
                $(this.y * multiplier).addCommas(y_decimals) + y_signs_arr[1] + "</b><br/>" +
                x_axis_title + ": <b>" + x_signs_arr[0] + $(this.x * multiplier).addCommas(x_decimals) + x_signs_arr[1] + "</b><br/>" +
                z_title + ": <b>" + z_signs_arr[0] + $(this.point.z * multiplier).addCommas(z_decimals) + z_signs_arr[1] + "</b>";

            //extra data//
            all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

            return s.replace(/\$-/g, "-$");

        };

    },


    /** gets a tooltip for drilldown charts. Called from updateToolTip**/
    getDrilldownTooltip: function (chart, y_decimals, x_decimals, z_decimals, y_signs_arr, x_signs_arr, z_signs_arr, multiplier, chart_type, z_title, all_chart_options) {

        //if a bubble drilldown//
        if ($("#drilldown_type_select").val() === "bubble") {

            all_chart_options.tooltip.formatter = function () {

                var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
                var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

                var s = "<b>" + this.series.name + "</b><br>" +
                    this.key + "<br>" +
                    y_axis_title + ": <b>" + y_signs_arr[0] +
                    $(this.y * multiplier).addCommas(y_decimals) + y_signs_arr[1] + "</b><br/>" +
                    x_axis_title + ": <b>" + x_signs_arr[0] + $(this.x * multiplier).addCommas(x_decimals) + x_signs_arr[1] + "</b><br/>" +
                    z_title + ": <b>" + z_signs_arr[0] + $(this.point.z * multiplier).addCommas(z_decimals) + z_signs_arr[1] + "</b>";

                this.point.drilldown ? s = s + "<br>(Click to drill down)" : s = s;
                return s.replace(/\$-/g, "-$");
            }

        } else {

            all_chart_options.tooltip.formatter = function () {

                var y_val = y_signs_arr[0] + $(this.y * multiplier).addCommas(y_decimals) + y_signs_arr[1];
                var s = "<b>" + this.series.name + "</b><br>" + this.key + ": " + y_val;
                this.point.drilldown ? s = s + "<br>(Click to drill down)" : s = s;
                return s.replace(/\$-/g, "-$");
            }
        }

    },



    /** gets a tooltip for scatter charts. Called from updateToolTip**/
    getScatterTooltip: function (chart, y_decimals, x_decimals, y_signs_arr, x_signs_arr, multiplier, chart_type, all_chart_options) {

        all_chart_options.tooltip.formatter = function () {
            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + y_signs_arr[0] +
                $(this.y * multiplier).addCommas(y_decimals) + y_signs_arr[1] + "</b><br>" +
                x_axis_title + ": <b>" + x_signs_arr[0] + $(this.x * multiplier).addCommas(x_decimals) + x_signs_arr[1] + "</b>";

            //add extra data//
            all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

            return s.replace(/\$-/g, "-$");

        };


    },





    /** gets a tooltip for typical charts (line, area, bar etc). Called from updateToolTip**/
    getTypicalTooltip: function (chart, is_shared, y_decimals, y_signs_arr, multiplier, chart_type, all_chart_options) {


        if (is_shared) { //SHARED TOOLTIP

            all_chart_options.tooltip.shared = chart.tooltip.shared = true;


            all_chart_options.tooltip.formatter = function () {

                var shared_tooltip_arr = ["<b>" + this.x + "</b>"];

                $.each(this.points, function (i) {

                    var y_val = this.point.high ? " High: " + y_signs_arr[0] + $(this.point.high * multiplier).addCommas(y_decimals) + y_signs_arr[1] + " | Low: " + y_signs_arr[0] + $(this.point.low * multiplier).addCommas(y_decimals) + y_signs_arr[1] :
                        y_signs_arr[0] + $(this.point.y * multiplier).addCommas(y_decimals) + y_signs_arr[1];


                    var s = this.series.name + ": " + y_val;

                    all_chart_options.series[i].extra_data ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[i].extra_data, this.point, s) : s = s;

                    shared_tooltip_arr.push(s);

                });

                return shared_tooltip_arr.join('<br/>').replace(/\$-/g, "-$");

            }


        } else { //NOT SHARED TOOLTIP


            all_chart_options.tooltip.formatter = function () {

                var y_val = this.point.high ? "High: " + y_signs_arr[0] + $(this.point.high * multiplier).addCommas(y_decimals) + y_signs_arr[1] + " | Low: " + y_signs_arr[0] + $(this.point.low * multiplier).addCommas(y_decimals) + y_signs_arr[1] :
                    y_signs_arr[0] + $(this.y * multiplier).addCommas(y_decimals) + y_signs_arr[1];

                var s = "<b>" + this.series.name + "</b><br>" + this.x + ": " + y_val;

                all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;
                return s.replace(/\$-/g, "-$");

            }
        }

    },





    /** update tooltip - decide which kind of chart and call that get tooltip function **/
    updateToolTip: function (chart, all_chart_options) {

        //default to single point tooltip
        all_chart_options.tooltip.shared = chart.tooltip.shared = false;

        //extra data function
        all_chart_options.tooltip.addExtraData = function (extra_data, point, s) {

            if (extra_data && extra_data[0].name) {
                $.each(extra_data, function (i) {
                    if (extra_data[i].values[point.index]) {

                        s = s + "<br>  " + extra_data[i].name + ": " + extra_data[i].values[point.index];
                    }
                });
            }
            return s;
        };



        //tooltip vars//
        var is_shared = utils_forms.getCheckBoxValue($("#chart_tooltip_shared_checkbox")),
            chart_type = $("#chart_type_icons .selected").divVal(),

            //y value decimals
            y_decimals = Number($("#chart_tooltip_force_decimals_select").val()),
            //x value decimals
            x_decimals = Number($("#chart_tooltip_force_decimals_x_select").val()),
            //z value decimals
            z_decimals = Number($("#chart_tooltip_force_decimals_z_select").val()),

            //y value signs
            y_signs = $("#chart_tooltip_signs_select").val(),

            y_signs_arr = [y_signs === "$" ? "$" : "", y_signs === "%" ? "%" : ""],
            //x value signs
            x_signs = $("#chart_tooltip_signs_x_select").val(),
            x_signs_arr = [x_signs === "$" ? "$" : "", x_signs === "%" ? "%" : ""],
            //z value signs
            z_signs = $("#chart_tooltip_signs_z_select").val(),
            z_signs_arr = [z_signs === "$" ? "$" : "", z_signs === "%" ? "%" : ""],

            multiplier = Number($("#chart_tooltip_y_multiple_select").val()),

            //bubble size title
            z_title = $("#chart_z_title_text_input").val() === "" ? "Z" : $("#chart_z_title_text_input").val();


        //IF A TYPICAL CHART
        if (["area", "line", "bar", "stacked_bar", "column", "stacked_column", "arearange", "columnrange"].indexOf(chart_type) > -1) {
            update_tooltip.getTypicalTooltip(chart, is_shared, y_decimals, y_signs_arr, multiplier, chart_type, all_chart_options);
        }

        //IF A DRILLDOWN CHART
        else if (chart_type === "drilldown") {
            update_tooltip.getDrilldownTooltip(chart, y_decimals, x_decimals, z_decimals, y_signs_arr, x_signs_arr, z_signs_arr, multiplier, chart_type, z_title, all_chart_options);
        }


        //IF A SCATTER CHART
        else if (chart_type === "scatter") {
            update_tooltip.getScatterTooltip(chart, y_decimals, x_decimals, y_signs_arr, x_signs_arr, multiplier, chart_type, all_chart_options);
        }

        //IF A BUBBLE CHART
        else if (chart_type === "bubble") {
            update_tooltip.getBubbleTooltip(chart, y_decimals, x_decimals, z_decimals, y_signs_arr, x_signs_arr, z_signs_arr, multiplier, chart_type, z_title, all_chart_options);
        }



        if (!chart) { //for use in tooltip_init
            return all_chart_options.tooltip;
        }

        chart.tooltip.options.formatter = all_chart_options.tooltip.formatter;
        //these are looped through in utils.deepStringify from write_code to replace variable names with their values
        update_tooltip.replacement_obj = {
            y_decimals: y_decimals,
            x_decimals: x_decimals,
            z_decimals: z_decimals,
            multiplier: multiplier,
            y_signs_arr: y_signs_arr,
            x_signs_arr: x_signs_arr,
            z_signs_arr: z_signs_arr,
            z_title: z_title
        };

        //  all_chart_options.tooltip.formatter = utils_main.stringifyFormatter(all_chart_options.tooltip.formatter, update_tooltip.replacement_obj);

    }

}


module.exports = update_tooltip;