/** Initializer for "subtitle" options section of all_chart_options. Creates and returns a new instance */ 

var Subtitle = require("../constructors/charts/subtitle.js");


 var subtitleInit = function subtitleInit() {

     //load options from user inputs
     var options = {

     };


     var subtitle = new Subtitle(options);
     return subtitle;
 };

 module.exports = subtitleInit;