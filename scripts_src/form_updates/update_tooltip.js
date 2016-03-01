/** when tooltip options are changed in the side area, these methods are called */
var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms");

var addCommas = utils_main.addCommas;

var update_tooltip = {


    /** update if tooltip is shared (all series showing on hover) */
    updateToolTip: function (chart, all_chart_options) {

        var is_shared = utils_forms.getCheckBoxValue($("#chart_tooltip_shared_checkbox"));
        var decimals = Number($("#chart_tooltip_force_decimals_select").val());
        var signs = $("#chart_tooltip_signs_select").val();
        var multiplier = $("#chart_tooltip_y_multiple_select").val();
        var chart_type = $(".selected_chart_type").divVal();

        var new_tooltip;
        var signs_arr = [signs === "$" ? "$" : "", signs === "%" ? "%" : ""];

        //SHARED TOOLTIP
        if (is_shared) {

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

                    var shared_tooltip_arr = [];
                    var point = this.point;

                    $.each(chart.series, function () {
                        shared_tooltip_arr.push("<b>" + this.name + "</b> <br>" + this.points[point.x].x + ": " + signs_arr[0] + (addCommas(this.points[point.x].y * multiplier)) + signs_arr[1]);
                    });
                    return shared_tooltip_arr.join('<br/>');
                }
            }


            //NOT SHARED TOOLTIP
        } else {

            if (decimals > 0) { //use decimal formatter
                new_tooltip = function () {
                    return "<b>" + this.series.name + "</b><br>" + this.x + ": " +
                        Highcharts.numberFormat((this.y * multiplier), decimals);
                }
            } else { //don't use decimal formatter
                new_tooltip = function () {
                    return "<b>" + this.series.name + "</b><br>" + this.x + ": " +
                        (addCommas(this.y * multiplier));
                }
            }
        }


        if (!chart) { //for use in tooltip_init
            return new_tooltip;
        }
        chart.tooltip.options.formatter = new_tooltip;

        all_chart_options.tooltip.formatter = utils_main.stringifyFormatter(new_tooltip, decimals, multiplier, signs_arr);

    }

}


module.exports = update_tooltip;