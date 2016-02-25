/** Initializer for "xAxis" options section of all_chart_options. Creates and returns a new instance */ 

var XAxis = require("../constructors/charts/x_axis.js");


 var xAxisInit = function xAxisInit() {

     //load options from user inputs
     var options = {

     };


     var xAxis = new XAxis(options);
     return xAxis;
 };

 module.exports = xAxisInit;