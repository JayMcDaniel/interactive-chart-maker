/** Initializer for "tooltip" options section of all_chart_options. Creates and returns a new instance */

var Tooltip = require("../constructors/charts/tooltip.js");
var utils_forms = require("../utils/utils_forms.js");

var tooltipInit = function tooltipInit() {

 
    //load options from user inputs
    var options = {
        formatter: undefined  ///formatter is created with update_tooltip as a callback (needs chart to exist first)
        
    };


    var tooltip = new Tooltip(options);
    return tooltip;
};

module.exports = tooltipInit;