/** Initializer for "title" options section of all_chart_options. Creates and returns a new instance */ 

var Title = require("../constructors/charts/title.js");


 var titleInit = function titleInit(title_text) {

     //load options from user inputs
     var options = {
         text: title_text
     };


     var title = new Title(options);
     return title;
 };

 module.exports = titleInit;