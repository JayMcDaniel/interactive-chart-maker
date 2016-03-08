var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms");


/** when tooltip options are changed in the side area, these methods are called 
@namespace
*/
var update_tooltip = {

    /** gets a tooltip for scatter charts. Called from updateToolTip**/
    getScatterTooltip: function (chart, is_shared, decimals, signs_arr, multiplier, chart_type) {
        var new_tooltip = function () {

            var y_axis_title = this.series.yAxis.axisTitle ? this.series.yAxis.axisTitle.textStr : "Y-Axis";
            var x_axis_title = this.series.xAxis.axisTitle ? this.series.xAxis.axisTitle.textStr : "X-Axis";

            return "<b>" + this.series.name + "</b><br>" + y_axis_title + ": <b>" + signs_arr[0] +
                Highcharts.numberFormat((this.y * multiplier), decimals) + signs_arr[1] + "</b><br/>" +
                x_axis_title + ": <b>" + signs_arr[0] + Highcharts.numberFormat((this.x * multiplier), decimals) + signs_arr[1] + "<br/>";

        };

        return new_tooltip;
    },

    /** gets a tooltip for typical charts (line, area, bar etc). Called from updateToolTip**/
    getTypicalTooltip: function (chart, is_shared, decimals, signs_arr, multiplier, chart_type) {

        var new_tooltip;

        if (is_shared) { //SHARED TOOLTIP

            if (decimals > 0) { //use decimal formatter

                new_tooltip = function () {

                    var shared_tooltip_arr = [];
                    var point = this.point;

                    $.each(chart.series, function () {
                        shared_tooltip_arr.push("<b>" + this.name + "</b> <br>" + this.points[point.x].x + ": " + signs_arr[0] + Highcharts.numberFormat((this.points[point.x].y * multiplier), decimals) + signs_arr[1]);
                    });
                    return shared_tooltip_arr.join('<br/>');
                }

            } else { //don't use decimal formatter

                new_tooltip = function () {

                    var shared_tooltip_arr = ["<b>" + this.key + "</b>"];
                    var point = this.point;

                    $.each(chart.series, function () {
                        shared_tooltip_arr.push(this.name + ": " + signs_arr[0] + $(this.points[point.x].y * multiplier).addCommas() + signs_arr[1]);
                    });
                    return shared_tooltip_arr.join('<br/>');
                }
            }


        } else { //NOT SHARED TOOLTIP

            if (decimals > 0) { //use decimal formatter
                new_tooltip = function () {
                    return "<b>" + this.series.name + "</b><br>" + this.x + ": " + signs_arr[0] +
                        Highcharts.numberFormat((this.y * multiplier), decimals) + signs_arr[1];
                }
            } else { //don't use decimal formatter
                new_tooltip = function () {
                    console.log("hi");
                    return "<b>" + this.series.name + "</b><br>" + this.x + ": " + signs_arr[0] +
                        $(this.y * multiplier).addCommas() + signs_arr[1];
                }
            }
        }

        return new_tooltip;
    },





    /** update tooltip - decide which kind of chart and call that get tooltip function **/
    updateToolTip: function (chart, all_chart_options) {

        var is_shared = utils_forms.getCheckBoxValue($("#chart_tooltip_shared_checkbox"));
        var decimals = Number($("#chart_tooltip_force_decimals_select").val());
        var signs = $("#chart_tooltip_signs_select").val();
        var multiplier = $("#chart_tooltip_y_multiple_select").val();
        var chart_type = all_chart_options.chart.type;
        var new_tooltip;
        var signs_arr = [signs === "$" ? "$" : "", signs === "%" ? "%" : ""];


        //IF A TYPICAL CHART
        if (["area", "line", "bar", "stacked_bar", "column", "stacked_column"].indexOf(chart_type) > -1) {
            new_tooltip = update_tooltip.getTypicalTooltip(chart, is_shared, decimals, signs_arr, multiplier, chart_type);
        }


        //IF A SCATTER CHART
        else if (chart_type === "scatter") {
            new_tooltip = update_tooltip.getScatterTooltip(chart, is_shared, decimals, signs_arr, multiplier, chart_type);

        }


        if (!chart) { //for use in tooltip_init
            return new_tooltip;
        }

        chart.tooltip.options.formatter = new_tooltip;
    //    chart.tooltip.refresh(chart.series[0].data[0]);

        all_chart_options.tooltip.formatter = utils_main.stringifyFormatter(new_tooltip, decimals, multiplier, signs_arr);
        
    }

}


module.exports = update_tooltip;


