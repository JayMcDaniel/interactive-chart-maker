/** function that writes chart or map code to "#chart_output_code" */
var utils_main = require("./utils/utils_main.js");

function writeCode(all_chart_options) {

    var chart_options_js_string = utils_main.deepStringify(all_chart_options);
    $("#chart_output_code").text(chart_options_js_string);
}

module.exports = writeCode;