/** Initializer for "tooltip" options section of all_chart_options. Creates and returns a new instance */

var Tooltip = require("../constructors/charts/tooltip.js");
var utils_forms = require("../utils/utils_forms.js");
var update_tooltip = require("../form_updates/update_tooltip.js");


var tooltipInit = function tooltipInit() {

 
    //load options from user inputs
    var options = {
        formatter: undefined
        
    };


    var tooltip = new Tooltip(options);
    return tooltip;
};

module.exports = tooltipInit;