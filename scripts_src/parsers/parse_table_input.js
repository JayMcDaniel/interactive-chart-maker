/* takes the table html from a given textarea and parses it into an object, depending on user-selected inputs */

/* parsing function for typical chart types (line, bar, column) */
var parseForTypicalChart = require("./parse_for_typical_chart.js");

/* parsing function for range charts */
var parseForRange = require("./parse_for_range.js");

/* parsing function for scatter charts */
var parseForScatter = require("./parse_for_scatter.js");


/* parsing function for box plot charts */
var parseForBoxPlot = require("./parse_for_box_plot.js");

/* parsing function for bubble charts */
var parseForBubble = require("./parse_for_bubble.js");

/*parsing function for pie charts */
var parseForPie = require("./parse_for_pie.js");

/* parsing function for animated bubble charts */
var parseForAnimatedBubble = require("./parse_for_animated_bubble.js");

/* parsing function for drilldown charts */
var parseForDrilldown = require("./parse_for_drilldown.js");

var utils_main = require("../utils/utils_main.js");



/** 
 * Function that decides which parse function to run, depending on chart type
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param load_series_from {string} column_heads or column_rows
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */

var parseTableInput = function (input, load_series_from, chart_type, legend_toggle_enabled, colors, chart, all_chart_options) {

    try {
        
        
           if (chart) {
                chart.yAxis[0].update({
                    lineWidth: chart_type == "pie" ? 0 : 1
                });

                chart.xAxis[0].update({
                    lineWidth: chart_type == "pie" ? 0 : 1
                });
            }


        var output = {};

        //if animated map is playing, stop it and remove - also prevents errors
        $(".map_play_button.playing").click();
        $(".chart_animation_div").remove();


        /** Depending on the chart type, start that parsing */
        if (["area", "line", "bar", "stacked_bar", "column", "stacked_column"].indexOf(chart_type) > -1) {
            output = parseForTypicalChart(input, load_series_from, chart_type, legend_toggle_enabled, colors);

        } else if (chart_type == "pie") {

            output = parseForPie(input, chart_type, colors);


        } else if (chart_type == "arearange" || chart_type == "columnrange") {
            output = parseForRange(input, chart_type, colors);

        } else if (chart_type == "bubble") {
            if ($("#bubble_animated_checkbox").is(':checked')) {
                output = parseForAnimatedBubble(input, chart_type, colors, chart, all_chart_options);

            } else {
                output = parseForBubble(input, chart_type, colors);
            }


        } else if (chart_type == "scatter") {
            console.log("is scatter");
            output = parseForScatter(input, chart_type, colors);

        } else if (chart_type == "drilldown") {
            var drill_type = $("#drilldown_type_select").val();
            output = parseForDrilldown(chart, input, drill_type, colors);
        } else if (chart_type == "boxplot") {
            output = parseForBoxPlot(input, chart_type, colors);
        }



        //add chart title (same for all types of charts)
        output.title_text = $("caption", input).text();


        // console.log("out", output);
        return output


    } catch (e) {
        console.log("error", e);
        utils_main.showError("Sorry, the table wasn't formatted correctly for a " + chart_type + " chart. Please see the example on the data tab.")

    }


};

module.exports = parseTableInput;