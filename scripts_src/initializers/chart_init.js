/** Initializer for "chart" options section of all_chart_options. Creates and returns a new instance */ 

var ChartOptions = require("../constructors/charts/chart.js");


 var chartInit = function chartInit() {

     //load options from user inputs
     var options = {

     };


     var chart_options = new ChartOptions(options);
     return chart_options;
 };

 module.exports = chartInit;
