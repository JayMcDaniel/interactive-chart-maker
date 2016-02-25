/** Initializer for "yAxis" options section of all_chart_options. Creates and returns a new instance */ 

var YAxis = require("../constructors/charts/y_axis.js");


 var yAxisInit = function yAxisInit() {

     //load options from user inputs
     var options = {

     };


     var yAxis = new YAxis(options);
     return yAxis;
 };

 module.exports = yAxisInit;