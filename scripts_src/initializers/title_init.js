/** Initializer for "title" options section of all_chart_options. Creates and returns a new instance */ 

var Title = require("../constructors/charts/title.js");


 var titleInit = function titleInit() {

     //load options from user inputs
     var options = {

     };


     var title = new Title(options);
     return title;
 };

 module.exports = titleInit;