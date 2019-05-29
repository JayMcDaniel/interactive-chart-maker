var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms");



/** when tooltip options are changed in the side area, these methods are called 
@namespace
*/
var update_tooltip = {




    /** gets a tooltip for box plot charts. Called from updateToolTip **/
    getBoxPlotTooltip: function (chart, chart_type, all_chart_options) {

        all_chart_options.tooltip.formatter = function () {

            var options = this.series.chart.tooltip.options;
            var dollar = options.y_signs_arr[0];
            var percent = options.y_signs_arr[1];
            var decimals = options.y_decimals;
            var ranges = this.series.options.ranges;

            return "<b>" + this.x + "</b><br>" +
                ranges[4] + ": " + dollar + $(this.point.high).addCommas(decimals) + percent + "<br/>" +
                ranges[3] + ": " + dollar + $(this.point.q3).addCommas(decimals) + percent + "<br/>" +
                ranges[2] + ": " + dollar + $(this.point.median).addCommas(decimals) + percent + "<br/>" +
                ranges[1] + ": " + dollar + $(this.point.q1).addCommas(decimals) + percent + "<br/>" +
                ranges[0] + ": " + dollar + $(this.point.low).addCommas(decimals) + percent;

        };

    },



    /** gets a tooltip for bubble charts. Called from updateToolTip **/
    getBubbleTooltip: function (chart, chart_type, all_chart_options) {

        all_chart_options.tooltip.formatter = function () {

            var options = this.series.chart.tooltip.options;

            var y_dollar = options.y_signs_arr[0];
            var y_percent = options.y_signs_arr[1];
            var x_dollar = options.x_signs_arr[0];
            var x_percent = options.x_signs_arr[1];
            var z_dollar = options.z_signs_arr[0];
            var z_percent = options.z_signs_arr[1];

            var y_decimals = options.y_decimals;
            var x_decimals = options.x_decimals;
            var z_decimals = options.z_decimals;

            var multiple = options.multiplier;
            var z_title = options.z_title;

            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            var s = "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + y_dollar +
                $(this.y * multiple).addCommas(y_decimals) + y_percent + "</b><br/>" +
                x_axis_title + ": <b>" + x_dollar + $(this.x * multiple).addCommas(x_decimals) + x_percent + "</b><br/>" +
                z_title + ": <b>" + z_dollar + $(this.point.z * multiple).addCommas(z_decimals) + z_percent + "</b>";

            //extra data//
            all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

            return s.replace(/\$-/g, "-$");

        };

    },


    /** gets a tooltip for drilldown charts. Called from updateToolTip**/
    getDrilldownTooltip: function (chart, chart_type, all_chart_options) {

        //if a bubble drilldown//
        if ($("#drilldown_type_select").val() === "bubble") {

            all_chart_options.tooltip.formatter = function () {

                var options = this.series.chart.tooltip.options;

                var y_dollar = options.y_signs_arr[0];
                var y_percent = options.y_signs_arr[1];
                var x_dollar = options.x_signs_arr[0];
                var x_percent = options.x_signs_arr[1];
                var z_dollar = options.z_signs_arr[0];
                var z_percent = options.z_signs_arr[1];

                var y_decimals = options.y_decimals;
                var x_decimals = options.x_decimals;
                var z_decimals = options.z_decimals;

                var multiple = options.multiplier;
                var z_title = options.z_title;

                var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
                var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

                var s = "<b>" + this.series.name + "</b><br>" +
                    this.key + "<br>" +
                    y_axis_title + ": <b>" + y_dollar +
                    $(this.y * multiple).addCommas(y_decimals) + y_percent + "</b><br/>" +
                    x_axis_title + ": <b>" + x_dollar + $(this.x * multiple).addCommas(x_decimals) + x_percent + "</b><br/>" +
                    z_title + ": <b>" + z_dollar + $(this.point.z * multiple).addCommas(z_decimals) + z_percent + "</b>";

                this.point.drilldown ? s = s + "<br>(Click to drill down)" : s = s;
                return s.replace(/\$-/g, "-$");
            }

        } else {

            all_chart_options.tooltip.formatter = function () {

                var options = this.series.chart.tooltip.options;

                var y_dollar = options.y_signs_arr[0];
                var y_percent = options.y_signs_arr[1];
                var y_decimals = options.y_decimals;
                var multiple = options.multiplier;


                var y_val = y_dollar + $(this.y * multiple).addCommas(y_decimals) + y_percent;
                var s = "<b>" + this.series.name + "</b><br>" + this.key + ": " + y_val;
                this.point.drilldown ? s = s + "<br>(Click to drill down)" : s = s;
                return s.replace(/\$-/g, "-$");
            }
        }

    },



    /** gets a tooltip for pie charts. Called from updateToolTip **/
    getPieTooltip: function (chart, chart_type, all_chart_options) {

        all_chart_options.tooltip.formatter = function () {

            var options = this.series.chart.tooltip.options;
            var dollar = options.y_signs_arr[0];
            var percent = options.y_signs_arr[1];
            var decimals = options.y_decimals;

            return "<b>" + this.point.name + "</b>: " + dollar + $(this.y).addCommas(decimals) + percent;

        };

    },




    /** gets a tooltip for scatter charts. Called from updateToolTip**/
    getScatterTooltip: function (chart, chart_type, all_chart_options) {

        all_chart_options.tooltip.formatter = function () {

            var options = this.series.chart.tooltip.options;

            var y_dollar = options.y_signs_arr[0];
            var y_percent = options.y_signs_arr[1];
            var x_dollar = options.x_signs_arr[0];
            var x_percent = options.x_signs_arr[1];

            var y_decimals = options.y_decimals;
            var x_decimals = options.x_decimals;

            var multiple = options.multiplier;

            var point_name = this.series.options.point_names && this.series.options.point_names[this.point.index] ? this.series.options.point_names[this.point.index] + "<br>" : "";
            
            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            var s = "<b>" + this.series.name + "</b><br>" + point_name + y_axis_title + ": <b>" + y_dollar +
                $(this.y * multiple).addCommas(y_decimals) + y_percent + "</b><br>" +
                x_axis_title + ": <b>" + x_dollar + $(this.x * multiple).addCommas(x_decimals) + x_percent + "</b>";

            //add extra data//
            all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;

            return s.replace(/\$-/g, "-$");

        };


    },





    /** gets a tooltip for typical charts (line, area, bar etc). Called from updateToolTip**/
    getTypicalTooltip: function (chart, is_shared, chart_type, all_chart_options) {


        if (is_shared) { //SHARED TOOLTIP

            all_chart_options.tooltip.shared = chart.tooltip.shared = true;


            all_chart_options.tooltip.formatter = function () {



                var shared_tooltip_arr = ["<b>" + this.x + "</b>"];

                $.each(this.points, function (i, e) {

                    var options = this.series.chart.tooltip.options;
                    var dollar = options.y_signs_arr[0];
                    var percent = options.y_signs_arr[1];
                    var decimals = options.y_decimals;
                    var multiple = options.multiplier;

                    if (all_chart_options.series[this.series.index].yAxis == 1) {
                        dollar = options.y_signs_arr_2[0];
                        percent = options.y_signs_arr_2[1];
                        decimals = options.y_decimals_2;
                        multiple = options.multiplier_2;
                    }


                    var index = e.series.index;

                    var y_val = this.point.high ? " High: " + dollar + $(this.point.high * multiple).addCommas(decimals) + percent + " | Low: " + dollar + $(this.point.low * multiple).addCommas(decimals) + percent :
                        dollar + $(this.point.y * multiple).addCommas(decimals) + percent;


                    var s = this.series.name + ": " + y_val;

                    all_chart_options.series[index].extra_data ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[index].extra_data, this.point, s) : s = s;

                    shared_tooltip_arr.push(s);

                });

                return shared_tooltip_arr.join('<br/>').replace(/\$-/g, "-$");

            }


        } else { //NOT SHARED TOOLTIP


            all_chart_options.tooltip.formatter = function () {

                var options = this.series.chart.tooltip.options;
                var dollar = this.series.options.dollar || options.y_signs_arr[0];
                var percent = this.series.options.percent || options.y_signs_arr[1];
                var decimals = this.series.options.decimals || options.y_decimals;
                var multiple = options.multiplier;

                if (all_chart_options.series[this.series.index].yAxis == 1) {

                    dollar = options.y_signs_arr_2[0];
                    percent = options.y_signs_arr_2[1];
                    decimals = options.y_decimals_2;
                    multiple = options.multiplier_2;
                }


                var y_val = this.point.high ? "High: " + dollar + $(this.point.high * multiple).addCommas(decimals) + percent + " | Low: " + dollar + $(this.point.low * multiple).addCommas(decimals) + percent

                    : dollar + $(this.y * multiple).addCommas(decimals) + percent;

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

                        s = s + "<br>" + extra_data[i].name + ": " + extra_data[i].values[point.index];
                    }
                });
            }
            return s;
        };



        //update chart and all_chart_options  options //
        var is_shared = utils_forms.getCheckBoxValue($("#chart_tooltip_shared_checkbox"));
        var chart_type = $("#chart_type_icons .selected").divVal();


        //x value signs
        var x_signs = $("#chart_tooltip_signs_x_select").val();
        var x_signs_arr = [x_signs === "$" ? "$" : "", x_signs === "%" ? "%" : ""];
        all_chart_options.tooltip.x_signs_arr = chart.tooltip.options.x_signs_arr = x_signs_arr;

        //z value signs
        var z_signs = $("#chart_tooltip_signs_z_select").val();
        var z_signs_arr = [z_signs === "$" ? "$" : "", z_signs === "%" ? "%" : ""];
        all_chart_options.tooltip.z_signs_arr = chart.tooltip.options.z_signs_arr = z_signs_arr;

        //y decimals
        all_chart_options.tooltip.y_decimals = chart.tooltip.options.y_decimals = Number($("#chart_tooltip_force_decimals_select").val());

        //y decimals (second y-axis)
        all_chart_options.tooltip.y_decimals_2 = chart.tooltip.options.y_decimals_2 = Number($("#chart_tooltip_force_decimals_select_2").val());

        //x decimals
        all_chart_options.tooltip.x_decimals = chart.tooltip.options.x_decimals = Number($("#chart_tooltip_force_decimals_x_select").val());

        //z decimals
        all_chart_options.tooltip.z_decimals = chart.tooltip.options.z_decimals = Number($("#chart_tooltip_force_decimals_z_select").val());

        //z (bubble size) title
        all_chart_options.tooltip.z_title = chart.tooltip.options.z_title = $("#chart_z_title_text_input").val() === "" ? "Z" : $("#chart_z_title_text_input").val();

        //mutiplier
        all_chart_options.tooltip.multiplier = chart.tooltip.options.multiplier = Number($("#chart_tooltip_y_multiple_select").val());

        //mutiplier (second y-axis)
        all_chart_options.tooltip.multiplier_2 = chart.tooltip.options.multiplier_2 = Number($("#chart_tooltip_y_multiple_select_2").val());


        function makeSignsArray(signs) {

            var signs_arr = [];

            switch (signs) {
            case "$":
                signs_arr = ["$", ""];
                break;
            case "%":
                signs_arr = ["", "%"];
                break;
            case "percentage point(s)":
                signs_arr = ["", " percentage point(s)"];
                break;
            default:
                signs_arr = ["", ""];
            };

            return signs_arr;
        }



        //y value signs
        all_chart_options.tooltip.y_signs_arr = chart.tooltip.options.y_signs_arr = makeSignsArray($("#chart_tooltip_signs_select").val());

        //y value signs (second y-axis)
        all_chart_options.tooltip.y_signs_arr_2 = chart.tooltip.options.y_signs_arr_2 = makeSignsArray($("#chart_tooltip_signs_select_2").val());


        //IF A TYPICAL CHART
        if (["area", "line", "bar", "stacked_bar", "column", "stacked_column", "arearange", "columnrange"].indexOf(chart_type) > -1) {
            update_tooltip.getTypicalTooltip(chart, is_shared, chart_type, all_chart_options);
        }

        //IF A DRILLDOWN CHART
        else if (chart_type === "drilldown") {
            update_tooltip.getDrilldownTooltip(chart, chart_type, all_chart_options);
        }


        //IF A SCATTER CHART
        else if (chart_type === "scatter") {
            update_tooltip.getScatterTooltip(chart, chart_type, all_chart_options);
        }

        //IF A BUBBLE CHART
        else if (chart_type === "bubble") {
            update_tooltip.getBubbleTooltip(chart, chart_type, all_chart_options);
        }


        //IF A BOX PLOT CHART
        else if (chart_type === "boxplot") {
            update_tooltip.getBoxPlotTooltip(chart, chart_type, all_chart_options);
        }

        //IF A PIE CHART
        else if (chart_type === "pie") {
            update_tooltip.getPieTooltip(chart, chart_type, all_chart_options);
        }



        if (!chart) { //for use in tooltip_init
            return all_chart_options.tooltip;
        }

        chart.tooltip.options.formatter = all_chart_options.tooltip.formatter;

    }

}


module.exports = update_tooltip;