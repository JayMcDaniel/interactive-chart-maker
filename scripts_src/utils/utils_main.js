/** Main utility object, contains functions that get reused often */
var utils_main = {
    /** add commas function */
    addCommas: function (val) {

        if (isNaN(val)) {
            return val;
        } else if ((val > 999) || (val < -999)) {
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
        }
        return val;
    },

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

    /** stringify tooltip formatter function **/
    stringifyFormatter: function (new_tooltip, decimals, multiplier, signs_arr) {
        return new_tooltip.toString()
            .replace(/multiplier/g, multiplier)
            .replace(/decimals/g, decimals)
            .replace(/signs_arr\[0\]/g, '"' + signs_arr[0] + '"')
            .replace(/signs_arr\[1\]/g, '"' + signs_arr[1] + '"');

    },


    /** place code in chart_output_code and reinit highlight */
    writeCode: function writeCode(all_chart_options) {


        var chart_options_js_string = utils_main.deepStringify(all_chart_options);
        $("#chart_output_code").text(chart_options_js_string).each(function (i, block) {
            hljs.highlightBlock(block);
        });

    }


}


module.exports = utils_main;