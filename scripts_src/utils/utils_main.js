     var chart_recall = require("../chart_recall.js");
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
         stringifyFormatter: function (tooltip, replacement_obj) {

             var tooltip_str = tooltip.toString();

             for (name in replacement_obj) {
                 var re = new RegExp(name, "g");

                 if (isNaN(Number(replacement_obj[name]))) { //replace strings with quotes
                     tooltip_str = tooltip_str.replace(re, '"' + replacement_obj[name] + '"');
                 } else {
                     tooltip_str = tooltip_str.replace(re, replacement_obj[name]); //replace numbers without quotes
                 }

                 if (replacement_obj.signs_arr) { //replace signs array (["$","%"]) with symbols 
                     tooltip_str = tooltip_str.replace(/signs_arr\[0\]/g, '"' + replacement_obj.signs_arr[0] + '"')
                         .replace(/signs_arr\[1\]/g, '"' + replacement_obj.signs_arr[1] + '"');
                 }

                 tooltip_str = tooltip_str.replace('+ ""', ""); //replace empty string
             }

             return tooltip_str;

         },



         /** calls code writing functions */
         writeCode: function writeCode(all_chart_options) {

             utils_main.writeHTMLCode(all_chart_options);
             utils_main.writeJSCode(all_chart_options);

         },

         writeHTMLCode: function (all_chart_options) {
             if (all_chart_options.chart.type !== "map") {
                 var width = $("#chart_width_textinput").val();
                 var height = $("#chart_height_textinput").val();
                 var id = all_chart_options.chart.renderTo;

                 var html_string = '<div id="' + id + '" style = "width: ' + width + 'px; height: ' + height + 'px; margin: auto; padding: 0px;"> </div>';
             }


             $("#chart_html_code").text(html_string).each(function (i, block) {
                 hljs.highlightBlock(block); //init code coloring
             });


         },


         /** place code in chart_output_code and reinit highlight */
         writeJSCode: function (all_chart_options) {
             //save chart input values
             all_chart_options.saved_values = chart_recall.saveValues();

             var chart_options_js_string = utils_main.deepStringify(all_chart_options)
                 .replace(/headers=\\"rowHead\d+ columnHead\d+\\"/g, "") //trim down table alt output to make it smaller
                 .replace(/id=\\"(rowHead|columnHead)\d+\\"/g, "")
                 .replace(/\s{2,} /g, " ");



             chart_options_js_string = '$(document).ready(function(){\n\
             var all_chart_options = ' + chart_options_js_string + ';\n\
    var ' + all_chart_options.chart.renderTo + ' = new Highcharts.Chart({all_chart_options});\n\
});';

     $("#chart_output_code").text(chart_options_js_string).each(function (i, block) {
         hljs.highlightBlock(block); //init code coloring
     });
     }


     }


     module.exports = utils_main;