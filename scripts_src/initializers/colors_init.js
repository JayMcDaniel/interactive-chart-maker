/** Initializer for "colors" options section of all_chart_options. Creates and returns a new instance */ 

var Colors = require("../constructors/charts/colors.js");


 var colorsInit = function colorsInit() {

     //load options from user inputs
     var options = {

     };


     var colors = new Colors(options);
     return colors.colors;
 };

 module.exports = colorsInit;
