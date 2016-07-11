
/**
 * Main utility object, contains functions that get reused often, including the code writing
 * @namespace
 */
var utils_main = {

    /** check value - if 0 or not a number, return undefined **/
    checkforUndefined: function (val) {
        if(val === "0" ){
            return 0;
        }
        
        if (isNaN(val) || val === ""){
            return undefined;
        }
        
        return Number(val);
    },


    /** 
    turns objects into strings, methods are stringified and put in an array to replace placeholders in the JSON later
    @returns {string} JSON
    */
    deepStringify: function deepStringify(obj) {
        var update_tooltip = require("../form_updates/update_tooltip.js");
        var update_y_axis = require("../form_updates/update_y_axis.js");

        var fn_count = 0;

        var stringified_obj = {
            string: "",
            functions_arr: []
        };

        stringified_obj.string = JSON.stringify(obj, function (key, value) {

            //functions are named "function1, function2" and later replaced with the real function after the rest of the json has been stringified
            if (typeof value === 'function') {

                
                //combine y axis and tooltip replacement objs
                var replacements_obj = $.extend({}, update_tooltip.replacement_obj, update_y_axis.replacement_obj);

                //put these string functions in the array for later
                stringified_obj.functions_arr.push(utils_main.stringifyFormatter(value, replacements_obj));

                // use a placeholder text in this json
                var fn_placeholder = "function" + fn_count;

                fn_count++;
                return fn_placeholder;

            } else {
                return value;
            }
        }).replace(/\\n/g, "");

        return stringified_obj;

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


    /** looks at an array, takes string "false" or "null" and returns false or null **/
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




    /** Converts an rgb string to an array of 3 values**/
    rgb2arr: function (rgb) {
        return rgb.replace(/[^0-9\,]+/g, '').split(",").map(function (item) {
            return parseInt(item, 10);
        });
    },




    /** Displays an error message for a few seconds**/
    showError: function (string) {
        $(".alert-danger").text(string);
        setTimeout(function () {
            $(".alert-danger").text("");
        }, 8000);

    },




    /** stringify tooltip / y-axis formatter function **/
    stringifyFormatter: function (formatter, replacement_obj) {

        var formatter_str = formatter.toString().replace(/\/\/.*\/\//g,""); //replace notes in between //...//


        for (name in replacement_obj) {
            var re = new RegExp("\\b" + name, "g");

            if (isNaN(Number(replacement_obj[name]))) { //replace strings with quotes
                formatter_str = formatter_str.replace(re, '"' + replacement_obj[name] + '"');
            } else {
                formatter_str = formatter_str.replace(re, replacement_obj[name]); //replace numbers without quotes
            }


            if (replacement_obj.y_signs_arr) { //replace signs array (["$","%"]) with symbols 
                formatter_str = formatter_str.replace(/y_signs_arr\[0\]/g, '"' + replacement_obj.y_signs_arr[0] + '"')
                    .replace(/y_signs_arr\[1\]/g, '"' + replacement_obj.y_signs_arr[1] + '"');
            }

            if (replacement_obj.signs_arr) { //replace signs array (["$","%"]) with symbols 
                formatter_str = formatter_str.replace(/signs_arr\[0\]/g, '"' + replacement_obj.signs_arr[0] + '"')
                    .replace(/signs_arr\[1\]/g, '"' + replacement_obj.signs_arr[1] + '"');
            }

            formatter_str = formatter_str.replace('+ ""', "")
                .replace('"" +', "")
                .replace(/y \* 1(?!0)/g, "y")
                .replace(/value \/ 1(?!0)/g, "value"); //replace empty strings and remove divide or times by 1
        }

        return formatter_str;

    },

    valueSort(arr) {
        var values_arr = [];
        $.each(arr, function () {
            if (this.value) {
                values_arr.push(this.value);
            }
        });
        values_arr.sort(function (a, b) {
            return a - b;
        });

        return values_arr;
    },

}


module.exports = utils_main;