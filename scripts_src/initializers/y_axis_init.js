/** Initializer for "yAxis" options section of all_chart_options. Creates and returns a new instance */
var utils_main = require("../utils/utils_main.js");
var YAxis = require("../constructors/charts/y_axis.js");
var update_y_axis = require("../form_updates/update_y_axis.js");
var utils_forms = require("../utils/utils_forms.js");


var yAxisInit = function yAxisInit() {

    //load options from user inputs
    var options = {

        labels: {
            format: update_y_axis.updateFormat($("#chart_y_axis_signs_select").val(), $("#chart_y_axis_decimals_select").val()) //val, decimals
        },

        max: update_y_axis.updateMax(Number($("#chart_y_axis_max_input").val())),
        min: update_y_axis.updateMin(Number($("#chart_y_axis_min_input").val())),
        type: update_y_axis.updateIsLog(utils_forms.getCheckBoxValue($("#chart_y_axis_log_checkbox"))),
        opposite: utils_forms.getCheckBoxValue($("#chart_y_axis_opposite_checkbox")),
        tickInterval: update_y_axis.updateTickmarkInterval(Number($("#chart_y_axis_tickmark_interval_input").val())),

        title: {
            text: $("#chart_y_axis_title_textarea").val(),
            align: $(".selected_chart_type").divVal() === "bar" ? "middle" : "high",
            x: Number($("#chart_y_axis_x_position_input").val())
        }


    };


    var yAxis = new YAxis(options);
    return yAxis;
};

module.exports = yAxisInit;
