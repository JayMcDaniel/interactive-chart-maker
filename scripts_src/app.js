/** main app file, starts everything off **/
'use strict';
$(function() {

  //utils
  var jq_extensions = require("./utils/jq_extensions.js");
  var utils_main = require("./utils/utils_main");

  //load test table into table_input_textarea

  $.get("./dev/test_tables/test_table.htm", function(table) {

    $("#table_input_textarea").val(table);
    //check if app was opened from the chart wizard (imediately invoked function)
    var loadFromTableWizard = require("./utils/load_from_table_wizard");

    //initial empty all map options

    var all_map_options = {};
    var chart_type = $("#chart_type_icons .selected").divVal();

    //initial all chart options init
    var allChartOptionsInit = require("./initializers/charts/all_chart_options_init.js");
    var all_chart_options = allChartOptionsInit(chart_type);

    //draw chart
    var draw_chart = require("./draw_chart.js");
    var chart = draw_chart.init(all_chart_options, draw_chart.chartCallback);

    //page init (navigation and keyboard entries)
    var navigation_setup = require("./navigation_setup.js");
    navigation_setup.firstNavInit();


    //all form updates - when updates are made, update the chart. this also calls some nav and keyboard input inits
    var allFormUpdates = require("./form_updates/all_form_updates.js");
    allFormUpdates(chart, all_chart_options, all_map_options);

    //diplay only options related to chart type
    allFormUpdates.displayOptions(chart_type);

    //click selected map icon to make sure everything in the map loads correctly
    if (chart_type === "map") {
      $("#chart_type_map").click();
    }


  });

  //set app version (better through JS than statically to make sure JS is new)
  $("#app_version").text("v2.11.0"); 
});
