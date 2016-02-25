$(document).ready(function () {

    //utils
    var utils_main = require("./utils/utils_main.js");
    var jq_extensions = require("./utils/jq_extensions.js");

    //page init
    var page_init = require("./controllers/page_init.js");

    //constructors
    var AllChartOptions = require("./constructors/charts/all_chart_options.js");









    var options = {
        colors: [1, 3]
    }
    var all_chart_options = new AllChartOptions(options);
    
    all_chart_options.setOption("colors", [5,6]);




    var chart_options_js_string = utils_main.deepStringify(all_chart_options);

    $("#chart_output_code").text(chart_options_js_string);

});