var Legend = require("../../constructors/charts/legend.js");
var utils_forms = require("../../utils/utils_forms.js");
var utils_main = require("../../utils/utils_main.js");

/** Initializer for "legend" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var legendInit = function legendInit(chart_type) {

    var getLegendLayout = function () {
        var legend_layout_val = $("#legend_layout_select").val();
        return legend_layout_val !== "no_legend" ? legend_layout_val : undefined;
    };



    //load options from user inputs
    var options = {
        layout: getLegendLayout(),
        x: Number($("#legend_placement_x").val()),
        y: Number($("#legend_placement_y").val()),
        reversed: utils_forms.getCheckBoxValue($("#legend_reverse_layout_checkbox")),
        itemWidth: utils_main.checkForUndefined($("#legend_item_width_input").val()),
        itemHoverStyle: {
            cursor: chart_type === "drilldown" ? "default" : "pointer"
        },
        itemStyle: {
            cursor: chart_type === "drilldown" ? "default" : "pointer"
        },
        width: utils_main.checkForUndefined($("#legend_width_input").val())

    };


    var legend = new Legend(options);
    
    return legend;
};

module.exports = legendInit;