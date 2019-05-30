/**
 * Main utility object, contains functions that get reused often, including the code writing
 * @namespace
 */
var utils_main = {

    /** check value - if 0 or not a number, return undefined **/
    checkForUndefined: function (val) {
        if (val === "0") {
            return 0;
        }

        if (isNaN(val) || val === "") {
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
        var update_x_axis = require("../form_updates/update_x_axis.js");

        var fn_count = 0;

        var stringified_obj = {
            string: "",
            functions_arr: []
        };

        stringified_obj.string = JSON.stringify(obj, function (key, value) {

            //functions are named "function1, function2" and later replaced with the real function after the rest of the json has been stringified
            if (typeof value === 'function') {

                //combine y axis and tooltip replacement objs
                var replacements_obj = $.extend({}, update_x_axis.replacement_obj);
                //update_tooltip.replacement_obj, 
                //put these string functions in the array for later
                stringified_obj.functions_arr.push(utils_main.stringifyFormatter(value, replacements_obj));

                // use a placeholder text in this json
                var fn_placeholder = "function" + fn_count;

                fn_count++;
                return fn_placeholder;

            } else {
                return value;
            }
        });

        return stringified_obj;

    },


    /** if drilled into a drilldown, click the up button to get out - prevents errors **/
    drillUp: function () {
        while ($(".highcharts-button").length > 0) {
            $(".highcharts-button").click();
        }
    },




    /** find index of greatest in array funct **/

    findIndex: function (arr, findIndex) {

        var selected;
        var selected_index;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (!selected || findIndex(arr[i], selected)) {
                selected = arr[i];
                selected_index = i;
            }
        }
        return selected_index;
    },


    /** find index of greatest val in array funct **/
    findIndexOfGreatest: function (array) {
        return this.findIndex(array, function (val, selected) {
            return val > selected;
        });
    },


    /** find index of lowest val in array funct **/

    findIndexOfLowest: function (array) {

        return this.findIndex(array, function (val, selected) {
            return val < selected;
        });
    },



    /** functions to set or return chart min max values **/
    limits: {

        max: 0,
        min: undefined,

        setMax: function (val) {
            this.max = val > this.max ? val : this.max;
        },

        setMin: function (val) {
            if (this.min === undefined) {
                this.min = val;
            } else {
                this.min = val < this.min ? val : this.min;
            }
        },

        resetMax: function () {
            this.max = 0;
        },

        resetMin: function () {
            this.min = undefined;
        },

        getMax: function () {
            return this.max;
        },

        getMin: function () {
            return this.min;
        }
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


        var formatter_str = formatter.toString().replace(/\/\/.*\/\//g, ""); //replace notes in between //...//

        //x,y,z signs array replacements

        formatter_str = formatter_str
            .replace(/x_axis_signs_arr\[0\]/g, '"' + replacement_obj.x_axis_signs_arr[0] + '"')
            .replace(/x_axis_signs_arr\[1\]/g, '"' + replacement_obj.x_axis_signs_arr[1] + '"');


        for (name in replacement_obj) {
            var re = new RegExp("\\b" + name, "g");

            if (isNaN(Number(replacement_obj[name]))) { //replace strings with quotes
                formatter_str = formatter_str.replace(re, '"' + replacement_obj[name] + '"');
            } else {
                formatter_str = formatter_str.replace(re, replacement_obj[name]); //replace numbers without quotes
            }




            formatter_str = formatter_str.replace('+ ""', "")
                .replace('"" +', "")
                .replace(/y \* 1(?!0)/g, "y")
                .replace(/value \/ 1(?!0)/g, "value"); //replace empty strings and remove divide or times by 1
        }

        return formatter_str;

    },

    /** returns a sorted array, given an array of objects, each with a value key **/
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