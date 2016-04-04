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
     parseTableInput = require("../parsers/parse_table_input.js"),
     utils_forms = require("../utils/utils_forms.js");


 /** create and return an instance of all_chart_options 
 @module
 **/
 var allChartOptionsInit = function allChartOptionsInit() {
     var chart_type = $("#chart_type_icons .selected").divVal();
     var load_series_from = $("#table_input_load_series_from_icons .selected").divVal(); 
     var legend_toggle_enabled = utils_forms.getCheckBoxValue($("#legend_make_toggle_checkbox"));
     var input = $("#table_input_textarea").val();
     var colors = colorsInit();
     
     var parsed_table_output = parseTableInput(input, load_series_from, chart_type, legend_toggle_enabled, colors);

     //get options from individual inits
     var options = {
         chart: chartInit(chart_type),
         credits: creditsInit(),
         colors: colors,
         // exporting: exportingInit(),
         legend: legendInit(),
         plotOptions: plotOptionsInit(legend_toggle_enabled),
         series: parsed_table_output.series, //removed seriesInit(parsed_table_output.series)
         drilldown: parsed_table_output.drilldown || {},
         subtitle: subtitleInit(),
         title: titleInit(parsed_table_output.title_text),
         tooltip: tooltipInit(),
         xAxis: xAxisInit(parsed_table_output.x_axis_categories, chart_type),
         yAxis: yAxisInit(chart_type)

     };

     var all_chart_options = new AllChartOptions(options);
     return all_chart_options;
 };

 module.exports = allChartOptionsInit;