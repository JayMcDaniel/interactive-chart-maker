var Legend = require("../../constructors/charts/legend.js");

/** Initializer for "legend" options section of all_chart_options. Creates and returns a new instance 
@module
*/ 
 var legendInit = function legendInit() {
     
     
     var getLegendLayout = function(){
         var legend_layout_val = $("#legend_layout_select").val();
         return legend_layout_val !== "no_legend" ? legend_layout_val : undefined;
     };
     
     

     //load options from user inputs
     var options = {
         layout: getLegendLayout(),
         x: Number($("#legend_placement_x").val()),
         y: Number($("#legend_placement_y").val())

     };


     var legend = new Legend(options);
     return legend;
 };

 module.exports = legendInit;