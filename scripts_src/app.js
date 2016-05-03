$(document).ready(function () {

    //utils
    var jq_extensions = require("./utils/jq_extensions.js");
    var utils_main = require("./utils/utils_main");

    //load test table into table_input_textarea


    $("#table_input_textarea").load("./dev/test_tables/metro_area_map_table.htm", function () {


        //initial all chart options init
        var allChartOptionsInit = require("./initializers/charts/all_chart_options_init.js");
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



});