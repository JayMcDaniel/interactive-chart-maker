/** Initializer for "credits" options section of all_chart_options. Creates and returns a new instance */ 

var Credits = require("../constructors/charts/credits.js");


 var creditsInit = function creditsInit() {

     //load options from user inputs
     var options = {

     };


     var credits = new Credits(options);
     return credits;
 };

 module.exports = creditsInit;