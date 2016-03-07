var Colors = require("../constructors/charts/colors.js");

/** Initializer for "colors" options section of all_chart_options. Creates and returns a new instance 
@module
*/ 
 var colorsInit = function colorsInit() {

     //load options from user inputs
     var options = {
      //   colors: ["#000"]
     };


     var colors = new Colors(options);
     return colors.colors;
 };

 module.exports = colorsInit;
