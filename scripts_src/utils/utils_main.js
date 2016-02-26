/** Main utility object, contains functions that get reused often */
var utils_main = {

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

    /** sets an option to a given object. The chart options constructors use this in their prototypes */
    setOption: function setOption(option, val, all_chart_options) {

        var optionArr = option.split(".");
        switch (optionArr.length) {
        case 1:
            {
                this[optionArr[0]] = val;
                break;
            }
        case 2:
            {
                this[optionArr[0]][optionArr[1]] = val;
                break;
            }
        case 3:
            {
                this[optionArr[0]][optionArr[1]][optionArr[2]] = val;
                break;
            }
        case 4:
            {
                this[optionArr[0]][optionArr[1]][optionArr[2]][optionArr[3]] = val;
                break;
            }
        }

        utils_main.writeCode(all_chart_options);
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