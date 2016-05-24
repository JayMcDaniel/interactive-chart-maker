var chart_recall = require("../chart_recall.js");
var utils_main = require("./utils_main.js");
/** functions for chart / map code output 
@namespace
**/

var write_code = {

    /** calls code writing functions and writes to code area*/
    writeCode: function writeCode(all_chart_options, all_map_options) {

        var width = $("#chart_width_textinput").val();
        var height = $("#chart_height_textinput").val();
        var id = all_chart_options.chart.renderTo;

        if (all_chart_options.chart.type !== "map") { //not map

            var html_string = write_code.writeChartHTMLCode(all_chart_options, width, height, id);
            var js_string = write_code.writeChartJSCode(all_chart_options);
        } else { //map
            var html_string = write_code.writeMapHTMLCode(all_map_options, width, height, id);
            var js_string = write_code.writeMapJSCode(all_map_options);
        }

        //put code in the <code> and init code coloring
        $("#chart_html_code").text(html_string).each(function (i, block) {
            hljs.highlightBlock(block);
        });

        //put js code in code area
        $("#chart_output_code").text(js_string).each(function (i, block) {
            hljs.highlightBlock(block); //init code coloring
        });

    },





    /** creates and returns chart HTML code  **/
    writeChartHTMLCode: function (all_chart_options, width, height, id) {

        var html_string = '<div id="' + id + '" style = "width: ' + width + 'px; height: ' + height + 'px; margin: auto; padding: 0px;"> </div>';

        return html_string;

    },


    /** creates and returns map HTML code  **/
    writeMapHTMLCode: function (all_map_options, width, height, id) {

        var html_string = '<div class="map_display_area" id="' + id + '" style = "width: ' + width + 'px; height: ' + height + 'px; margin: auto; padding: 0px;"> </div>';

        return html_string;


    },



    /** place code in chart_output_code and reinit highlight */
    writeChartJSCode: function (all_chart_options) {

        //save chart input values
        all_chart_options.saved_values = chart_recall.saveValues();

        var chart_options_js = utils_main.deepStringify(all_chart_options);

        chart_options_js.string = chart_options_js.string

            .replace(/"function(\d+)"/g, function (match, i) {
                return chart_options_js.functions_arr[i]
            }) // replace function place holders with their function string from its index in the array
            .replace(/headers=\\"rowHead\d+ columnHead\d+\\"/g, "") //trim down table alt output to make it smaller
            .replace(/id=\\"(rowHead|columnHead)\d+\\"/g, "")
            .replace(/\s{2,} /g, " ")
            .replace(/"null"/g, "null"); //replace "null" with null

        //add surrounding JS (doc ready, render chart, jq extensions...)
        chart_options_js.string = '$(document).ready(function(){\n\
             var all_chart_options = ' + chart_options_js.string + ';\n\
Highcharts.setOptions({lang: {thousandsSep: ","}});\n\
    var ' + all_chart_options.chart.renderTo + ' = new Highcharts.Chart(all_chart_options);\n\
});\n\
jQuery.fn.extend({addCommas:' + $("string").addCommas.toString() + ' });';

        return chart_options_js.string;


    },


    /** creates and returns map JS code  **/
    writeMapJSCode: function (all_map_options) {
        var map_options_js = utils_main.deepStringify(all_map_options);

        return map_options_js.string;
    }


};

module.exports = write_code;