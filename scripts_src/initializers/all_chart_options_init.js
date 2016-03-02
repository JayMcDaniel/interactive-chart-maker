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
     yAxisInit = require("./y_axis_init.js"),
     parseTableInput = require("./parse_table_input.js");



 var allChartOptionsInit = function allChartOptionsInit() {
     
     var chart_type = $(".selected_chart_type").divVal();
     var parsed_table_output = parseTableInput($("#table_input_textarea").val(), chart_type);

     //get options from individual inits
     var options = {
         chart: chartInit(chart_type),
         colors: colorsInit(),
         credits: creditsInit(),
         // exportig: exportingInit(),
         legend: legendInit(),
         plotOptions: plotOptionsInit(chart_type),
         series: seriesInit(parsed_table_output.series),
         subtitle: subtitleInit(),
         title: titleInit(parsed_table_output.title_text),
         tooltip: tooltipInit(),
         xAxis: xAxisInit(parsed_table_output.x_axis_categories),
         yAxis: yAxisInit(chart_type)

     };


     var all_chart_options = new AllChartOptions(options);
     return all_chart_options;
 };

 module.exports = allChartOptionsInit;