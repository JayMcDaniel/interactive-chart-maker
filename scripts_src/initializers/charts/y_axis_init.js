var utils_main = require("../../utils/utils_main.js");
var YAxis = require("../../constructors/charts/y_axis.js");
var update_y_axis = require("../../form_updates/update_y_axis.js");
var utils_forms = require("../../utils/utils_forms.js");

/** Initializer for "yAxis" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var yAxisInit = function yAxisInit(chart_type) {

    /** load options from user inputs */
    var options = {

        labels: {
            formatter: undefined //fomatter is made on call back in all_form_updates.js
        },

        max: update_y_axis.updateMax(Number($("#chart_y_axis_max_input").val())),
        min: update_y_axis.updateMin(Number($("#chart_y_axis_min_input").val())),
        type: update_y_axis.updateIsLog(utils_forms.getCheckBoxValue($("#chart_y_axis_log_checkbox"))),
        opposite: utils_forms.getCheckBoxValue($("#chart_y_axis_opposite_checkbox")),
        tickInterval: update_y_axis.updateTickmarkInterval(Number($("#chart_y_axis_tickmark_interval_input").val())),

        title: {
            text: $("#chart_y_axis_title_textarea").val(),
            align: chart_type === "bar" ? "middle" : "high",
            x: chart_type === "bar" || chart_type === "stacked_bar" ? 0 : Number($("#chart_y_axis_x_position_input").val()),
            y: chart_type === "bar" || chart_type === "stacked_bar" ? 8 : -20,
        }


    };


    var yAxis = new YAxis(options);
    return yAxis;
};

module.exports = yAxisInit;