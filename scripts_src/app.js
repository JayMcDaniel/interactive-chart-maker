$(document).ready(function () {

    //utils
    var utils_main = require("./utils/utils_main.js");
    var jq_extensions = require("./utils/jq_extensions.js");

    //page init
    var page_init = require("./initializers/page_init.js");
    
    //initial all chart options init
    var allChartOptionsInit = require("./initializers/all_chart_options_init.js");
    var all_chart_options = allChartOptionsInit();



    var chart_options_js_string = utils_main.deepStringify(all_chart_options);

    $("#chart_output_code").text(chart_options_js_string);

});


