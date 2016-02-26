 /** create and return an instance of all_chart_options */

 var AllChartOptions = require("../constructors/charts/all_chart_options.js"),
     chartInit = require("./chart_init.js"),
     colorsInit = require("./colors_init.js"),
     creditsInit = require("./credits_init.js"),
     exportingInit = require("./exporting_init.js"),
     legendInit = require("./legend_init.js"),
     plotOptionsInit = require("./plot_options_init.js"),
     seriesInit = require("./series_init.js"),
     subtitleInit = require("./subtitle_init.js"),
     titleInit = require("./title_init.js"),
     tooltipInit = require("./tooltip_init.js"),
     xAxisInit = require("./x_axis_init.js"),
     yAxisInit = require("./y_axis_init.js");


 var allChartOptionsInit = function allChartOptionsInit() {

     //get options from individual inits
     var options = {
         chart: chartInit(),
         colors: colorsInit(),
         credits: creditsInit(),
        // exportig: exportingInit(),
         legend: legendInit(),
         plotOptions: plotOptionsInit(),
         series: seriesInit(),
         subtitle: subtitleInit(),
         title: titleInit(),
         tooltip: tooltipInit(),
         xAxis: xAxisInit(),
         yAxis: yAxisInit()

     };


     var all_chart_options = new AllChartOptions(options);
     return all_chart_options;
 };

 module.exports = allChartOptionsInit;