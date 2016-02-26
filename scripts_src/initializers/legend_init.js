/** Initializer for "legend" options section of all_chart_options. Creates and returns a new instance */ 

var Legend = require("../constructors/charts/legend.js");


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


//
///** legend options constructor. Info at http://api.highcharts.com/highcharts#legend */
//var utils_main = require("../../utils/utils_main.js");
//
//var Legend = function (o) {
//
//    this.align = o.align || 'center';
//    this.backgroundColor = o.backgroundColor || 'none';
//    this.borderColor = o.borderColor || 'none';
//    this.borderWidth = o.borderWidth || 0;
//    this.enabled = o.enabled || true;
//    this.floating = o.floating || false;
//    this.itemDistance = o.itemDistance || 30;
//    this.layout = o.layout || 'horizontal';
//    this.reversed = o.reversed || false;
//    this.shadow = o.shadow || false;
//    this.useHTML = o.useHTML || false;
//    this.verticalAlign = o.verticalAlign || 'top';
//    this.width = o.width;
//    this.x = o.x || 0;
//    this.y = o.y || 30;
//
//    this.itemStyle = {
//        fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
//        color: '#000'
//    };
//    this.itemHiddenStyle = {
//        color: 'gray'
//    };
//    this.itemHoverStyle = {
//        cursor: o.itemHoverStyle ? o.itemHoverStyle.cursor || "pointer" : "pointer"
//    }
//
//}
//
//
//Legend.prototype.setOption = utils_main.setOption;
//
//module.exports = Legend;