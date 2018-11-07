var update_x_axis = require("../../form_updates/update_x_axis.js");
var XAxis = require("../../constructors/charts/x_axis.js");
var utils_forms = require("../../utils/utils_forms.js");
var utils_main = require("../../utils/utils_main.js");

/** Initializer for "xAxis" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var xAxisInit = function xAxisInit(categories, chart_type) {
    
    var only_numbers = utils_forms.getCheckBoxValue($("#chart_x_axis_show_only_years"));
    var add_commas = utils_forms.getCheckBoxValue($("#chart_x_axis_add_commas"));
    var sign = $("#chart_x_axis_signs_select").val();
    var decimals = $("#chart_x_axis_decimals_select").val();

    //load options from user inputs
    var options = {

        categories: chart_type === "drilldown" ? null : categories || undefined,
        only_numbers,
        add_commas,
        sign,
        decimals,
        labels: {
            formatter: update_x_axis.updateFormatter(only_numbers, add_commas, sign, decimals)
        },

        max: update_x_axis.updateMax(Number($("#chart_x_axis_max_input").val())),
        min: update_x_axis.updateMin(Number($("#chart_x_axis_min_input").val())),

        plotLines: [{
            "value": 0,
            "color": "#c0c0c0",
            "dashStyle": "solid",
            "width": chart_type === "scatter" || chart_type === "bubble" ? 1 : 0
        }],

        startOnTick: chart_type === "bubble" || chart_type === "scatter" ? true : false,

        title: {
            align: chart_type === "bar" || chart_type === "stacked_bar" ? "high" : "middle",
            text: $("#chart_x_axis_title_textarea").val(),
            x: chart_type === "bar" || chart_type === "stacked_bar" ? Number($("#chart_x_axis_x_position_input").val()) : 0
        },
        tickInterval: update_x_axis.updateTickmarkInterval(Number($("#chart_x_axis_tickmark_interval_input").val()), null, null, categories, chart_type),
        type: chart_type === "drilldown" ? "category" : "linear"

    };
    

    var xAxis = new XAxis(options);
    return xAxis;
};

module.exports = xAxisInit;