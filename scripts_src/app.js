$(document).ready(function () {

    //utils
    var jq_extensions = require("./utils/jq_extensions.js");
    var utils_main = require("./utils/utils_main");


    //page init
    var page_init = require("./initializers/page_init.js");

    //initial all chart options init
    var allChartOptionsInit = require("./initializers/all_chart_options_init.js");
    var all_chart_options = allChartOptionsInit();

    //draw chart
    var draw_chart = require("./draw_chart.js");
    var chart = draw_chart.init(all_chart_options);

    //write code to "#chart_output_code" function
    utils_main.writeCode(all_chart_options);

    //all form updates - when updates are made, update the chart
    var allFormUpdates = require("./form_updates/all_form_updates.js");
    allFormUpdates(chart, all_chart_options);


});