/** Initializer for "legend" options section of all_chart_options. Creates and returns a new instance */ 

var Legend = require("../constructors/charts/legend.js");


 var legendInit = function legendInit() {

     //load options from user inputs
     var options = {

     };


     var legend = new Legend(options);
     return legend;
 };

 module.exports = legendInit;