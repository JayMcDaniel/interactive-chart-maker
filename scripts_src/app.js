$(document).ready(function () {

    //utils
    var utils = require("./utils/utils_main.js");
    var jq_extensions = require("./utils/jq_extensions.js");

    //inits
    var navigation_setup = require("./navigation_setup.js");
    var keyboard_inputs = require("./keyboard_inputs");

    //constructors
    var ChartOptions = require("./constructors/chart_options.js");









    var options = {
        colors: [1, 3]
    }
    var chart_options = new ChartOptions(options);




    var chart_options_js_string = utils.deepStringify(chart_options);

    $("#chart_output_code").text(chart_options_js_string);

});