var chart_recall = require("./chart_recall.js");
var utils_main = require("./utils_main.js");
/** functions for chart / map code output 
@namespace
**/

var write_code = {

    /** calls code writing functions and writes to code area*/
    writeCode: function writeCode(all_chart_options, all_map_options) {

        var width = $("#chart_width_textinput").val();
        var height = $("#chart_height_textinput").val();
        var id = $("#chart_id_textinput").val();

        if (all_chart_options.chart.type !== "map") { //not map

            var html_string = write_code.writeChartHTMLCode(all_chart_options, width, height, id);
            var js_string = write_code.writeChartJSCode(all_chart_options);
        } else { //map
            var html_string = write_code.writeMapHTMLCode(all_map_options, width, height, id);
            var js_string = write_code.writeMapJSCode(all_map_options, all_chart_options);
        }

        //put code in the <code>
        $("#chart_html_code").val(html_string);

        //put js code in code area
        $("#chart_output_code").val(js_string);


    },





    /** creates and returns chart HTML code  **/
    writeChartHTMLCode: function (all_chart_options, width, height, id) {
        var html_string = '<div id="' + id + '" style = "position: relative; width: ' + width + 'px; height: ' + height + 'px; margin: auto; padding: 0px;"> </div>';

        return html_string;
    },


    /** creates and returns map HTML code  **/
    writeMapHTMLCode: function (all_map_options, width, height, id) {

        var html_string = '<div class="map_display_area" id="' + id + '" style = "width: ' + width + 'px; height: ' + height + 'px; margin: auto; padding: 0px;"> </div>';

        return html_string;
    },



    /** place code in chart_output_code and reinit highlight */
    writeChartJSCode: function (all_chart_options) {

        var draw_chart = require("../draw_chart.js");


        //save chart input values
        all_chart_options.saved_values = chart_recall.saveValues();

        
        var chart_options_js = utils_main.deepStringify(all_chart_options);

        chart_options_js.string = chart_options_js.string

            .replace(/"function(\d+)"/g, function (match, i) {
                return chart_options_js.functions_arr[i]
            }) // replace function place holders with their function string from its index in the array
            .replace(/headers=\\"rowHead\d+ columnHead\d+\\"/g, "") //trim down table alt output to make it smaller
            .replace(/id=\\"(rowHead|columnHead)\d+\\"/g, "")
            //replace ansi symbols (n-dash etc), with printed js code
            .replace(/–/, "\\u2013") //ndash
            .replace(/—/, "\\u2014") //mdash
            .replace(/\s{2,} /g, " ") //replace several spaces with one
            .replace(/"null"/g, "null") //replace "null" with null
            .replace('"drilldown":{},', "") //replace empty drilldown obj with nothing
            + ";\n\n";

        
        //write callback function
        chart_options_js.string = chart_options_js.string + "var chartCallback = " + draw_chart.chartCallback.toString(); + "\n";


        //add surrounding JS (doc ready, render chart, jq extensions...)
        chart_options_js.string = '$(function(){\n\
             var all_chart_options = ' + chart_options_js.string + ';\n\
Highcharts.setOptions({lang: {thousandsSep: ",",\n\drillUpText: "◁ Back "\n\   }});\n\n\
    var chart = new Highcharts.Chart(all_chart_options, chartCallback(all_chart_options));\n';

        //redraw the chart if its a drilldown (to customize individual points)\n\
        if (all_chart_options.drilldown) {
            if (Object.keys(all_chart_options.drilldown).length > 0) {
                chart_options_js.string += 'chart.redraw(false);//redraw the chart if its a drilldown (to customize individual points)\n';
            }
        }

        chart_options_js.string += '});\n\
jQuery.fn.extend({addCommas:' + $("string").addCommas.toString() + ' });';

        return chart_options_js.string;


    },




    /** creates and returns map JS code  **/
    writeMapJSCode: function (all_map_options, all_chart_options) {

        var map_init = require("../initializers/maps/map_init.js");
        var map_subtitle_init = require("../initializers/maps/map_subtitle_init.js");
        var map_title_init = require("../initializers/maps/map_title_init.js");
        var map_credits_init = require("../initializers/maps/map_credits_init.js");
        var map_legend_init = require("../initializers/maps/map_legend_init.js");
        var map_tooltip_init = require("../initializers/maps/map_tooltip_init.js");
        var map_animation_init = require("../initializers/maps/map_animation_init.js");

        //save chart input values
        all_map_options.saved_values = chart_recall.saveValues();


        var map_js = utils_main.deepStringify(all_map_options);

        //write out map options object
        map_js.string = "$(function(){\n" +

            "var all_map_options = " + map_js.string + ";\n\n" +

            //write out functions needed to convert all_map_options to svg //

            //map_init

            "var map_init = {}; \n" +

            //map_init.getMapOuterDiv
            "map_init.getMapOuterDiv = " + map_init.getMapOuterDiv.toString() + ";\n\n" +

            //map_init.getMapOuterSVG
            "map_init.getMapOuterSVG = " + map_init.getMapOuterSVG.toString() + ";\n\n" +

            //map_init.populateSVGAreas
            "map_init.populateSVGAreas = " + map_init.populateSVGAreas.toString() + ";\n\n" +

            //map_title_init.getMapTitle
            "var map_title_init = {}; \n map_title_init.getMapTitle = " + map_title_init.getMapTitle.toString() + ";\n\n" +

            //map_subtitle_init.getMapSubtitle
            "var map_subtitle_init = {}; \n map_subtitle_init.getMapSubtitle = " + map_subtitle_init.getMapSubtitle.toString() + ";\n\n" +

            //map_credits_init.getMapCredits
            "var map_credits_init = {}; \n map_credits_init.getMapCredits = " + map_credits_init.getMapCredits.toString() + ";\n\n" +


            //map_legend_init.valueMod
            "var map_legend_init = {}; \n map_legend_init.valueMod = " + map_legend_init.valueMod.toString() + ";\n\n" +

            //map_legend_init.getMapLegend
            "map_legend_init.getMapLegend = " + map_legend_init.getMapLegend.toString() + ";\n\n" +

            //map_tooltip_init.getMapTooltip
            "var map_tooltip_init = {}; \n map_tooltip_init.getMapTooltip = " + map_tooltip_init.getMapTooltip.toString() + ";\n\n" +

            //map_init.convertMapOptionsToSVG 
            "map_init.convertMapOptionsToSVG = " + map_init.convertMapOptionsToSVG.toString() + ";\n\n" +

            //map_init.setUpMapHover
            "map_init.setUpMapHover = " + map_init.setUpMapHover.toString() + ";\n\n" +

            //map_init.setUpMapLegendHover
            "map_init.setUpMapLegendHover = " + map_init.setUpMapLegendHover.toString() + ";\n\n" +

            //map_init.setUpMapStateLinks
            "map_init.setUpMapStateLinks = " + map_init.setUpMapStateLinks.toString() + ";\n\n" +


            //map_animation_init.getAnimationDiv (only if used)
            "var map_animation_init = {}; \n map_animation_init.getAnimationDiv = " + (all_map_options.is_animated ? map_animation_init.getAnimationDiv.toString() : null) + ";\n\n" +


            //map_animation_init.setUpMapAnimation (only if used)
            "map_animation_init.setUpMapAnimation = " + (all_map_options.is_animated ? map_animation_init.setUpMapAnimation.toString() : null) + ";\n\n" +


            //call functions
            "var map_display_area = map_init.convertMapOptionsToSVG(all_map_options);\n\n" + //converts all_map_options to svg and puts it on page

            //init tooltip and highlighting
            "map_init.setUpMapHover(all_map_options, map_display_area);\n\n" +

            //init legend hovering
            "map_init.setUpMapLegendHover(map_display_area);\n\n" +

            //init state links to eag pages
            "map_init.setUpMapStateLinks(map_display_area);\n\n" +


            //init setup of animation functions (if used)
            (all_map_options.is_animated ? "map_animation_init.setUpMapAnimation(all_map_options, map_display_area);\n\n" : "") +

            ///end of doc ready
            "});" +

            //add jQuery addcommas extension
            'jQuery.fn.extend({addCommas:' + $("string").addCommas.toString() + ' });';

        //replacements
        map_js.string = map_js.string.replace(/▶/g, "\\u25B6");

        return map_js.string;
    }


};

module.exports = write_code;