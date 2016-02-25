/** Initializer for "tooltip" options section of all_chart_options. Creates and returns a new instance */ 

var Tooltip = require("../constructors/charts/tooltip.js");


 var tooltipInit = function tooltipInit() {

     //load options from user inputs
     var options = {

     };


     var tooltip = new Tooltip(options);
     return tooltip;
 };

 module.exports = tooltipInit;