$(document).ready(function () {

    //utils
    var jq_extensions = require("./utils/jq_extensions.js");
    var utils_main = require("./utils/utils_main");


    //initial all chart options init
    var allChartOptionsInit = require("./initializers/all_chart_options_init.js");
    var all_chart_options = allChartOptionsInit();

    //draw chart
    var draw_chart = require("./draw_chart.js");
    var chart = draw_chart.init(all_chart_options);

    //page init (navigation and keyboard entries)
    var navigation_setup = require("./navigation_setup.js");
    navigation_setup.firstNavInit();


    //all form updates - when updates are made, update the chart. this also calls some nav and keyboard input inits
    var allFormUpdates = require("./form_updates/all_form_updates.js");
    allFormUpdates(chart, all_chart_options);
        
    
});