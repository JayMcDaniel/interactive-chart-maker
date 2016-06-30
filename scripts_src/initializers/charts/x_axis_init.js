var update_x_axis = require("../../form_updates/update_x_axis.js");
var XAxis = require("../../constructors/charts/x_axis.js");
var utils_forms = require("../../utils/utils_forms.js");

/** Initializer for "xAxis" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var xAxisInit = function xAxisInit(categories, chart_type) {

    //load options from user inputs
    var options = {

        categories: categories || undefined,

        labels: {
            formatter: update_x_axis.updateFormatter(utils_forms.getCheckBoxValue($("#chart_x_axis_show_only_years")))
        },

        plotLines: [{
            "value": 0,
            "color": "#c0c0c0",
            "dashStyle": "solid",
            "width": chart_type === "scatter" || chart_type === "bubble" ? 1 : 0
        }],
        title: {
            align: chart_type === "bar" || chart_type === "stacked_bar" ? "high" : "middle",
            text: $("#chart_x_axis_title_textarea").val(),
            x: chart_type === "bar" || chart_type === "stacked_bar" ? Number($("#chart_x_axis_x_position_input").val()) : 0
        },
        tickInterval: update_x_axis.updateTickmarkInterval(Number($("#chart_x_axis_tickmark_interval_input").val())),
        type: "linear"

    };


    var xAxis = new XAxis(options);
    return xAxis;
};

module.exports = xAxisInit;