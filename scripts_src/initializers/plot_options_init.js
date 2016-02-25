/** Initializer for "plotOptions" options section of all_chart_options. Creates and returns a new instance */ 

var PlotOptions = require("../constructors/charts/plot_options.js");


 var plotOptionsInit = function plotOptionsInit() {

     //load options from user inputs
     var options = {

     };


     var plotOptions = new PlotOptions(options);
     return plotOptions;
 };

 module.exports = plotOptionsInit;