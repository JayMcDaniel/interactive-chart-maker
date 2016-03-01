/** Main utility object, contains functions that get reused often */
var utils_main = {

    checkforUndefined: function (val) {
        return val === 0 || isNaN(val) ? undefined : val;
    },

    /** shortcut for console.log **/
    log: function log(e) {
        return console.log(e);
    },

    /** turns objects into strings, including their methods */
    deepStringify: function deepStringify(obj) {
        return JSON.stringify(obj, function (key, value) {
            if (typeof value === 'function') {
                return value.toString();
            } else {
                return value;
            }
        }).replace(/\\n/g, "");

    },

    writeCode: function writeCode(all_chart_options) {

        //place code in chart_output_code and reinit highlight
        var chart_options_js_string = utils_main.deepStringify(all_chart_options);
        $("#chart_output_code").text(chart_options_js_string).each(function (i, block) {
            hljs.highlightBlock(block);
        });

    }


}


module.exports = utils_main;