/**
 * Main utility object, contains functions that get reused often
 * @namespace
 */
var utils_main = {

    /** check value - if 0 or not a number, return undefined **/
    checkforUndefined: function (val) {
        return val === 0 || isNaN(val) ? undefined : val;
    },

    /** 
    turns objects into strings, including their methods 
    @returns {string} JSON
    */
    deepStringify: function deepStringify(obj) {
        return JSON.stringify(obj, function (key, value) {
            if (typeof value === 'function') {
                return value.toString();
            } else {
                return value;
            }
        }).replace(/\\n/g, "");

    },

    /** 
    creates and returns a clearfloat class div
    @returns {element} div with "clearfloat" class
    */
    makeClearFloatDiv: function () {
        var clear_div = document.createElement("div");
        clear_div.className = "clearfloat";
        return clear_div;
    },

    parseBoolsFromArray: function (arr) {
        return arr.map(function (e) {
            if (e === "true") {
                return true;
            } else if (e === "false") {
                return false;
            } else if (e === "null") {
                return null;
            } else {
                return e;
            }
        });
    },

    rgb2arr: function (rgb) {
        return rgb.replace(/[^0-9\,]+/g, '').split(",").map(function (item) {
            return parseInt(item, 10);
        });
    },


    /** stringify tooltip formatter function **/
    stringifyFormatter: function (new_tooltip, decimals, multiplier, signs_arr, z_title) {
        return new_tooltip.toString()
            .replace(/multiplier/g, multiplier)
            .replace(/decimals/g, decimals)
            .replace(/signs_arr\[0\]/g, '"' + signs_arr[0] + '"')
            .replace(/signs_arr\[1\]/g, '"' + signs_arr[1] + '"')
            .replace(/z_title/, z_title);

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