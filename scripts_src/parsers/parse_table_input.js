/** takes the table html from a given textarea and parses it into an object, depending on useer-selected inputs */

/** parsing function for typical chart types (line, bar, column) */
var parseForTypicalChart = require("./parse_for_typical_chart.js");

/** parsing function for scatter charts */
var parseForScatter = require("./parse_for_scatter.js");

/** parsing function for bubble charts */
var parseForBubble = require("./parse_for_bubble.js");



/** parsing function for drilldown charts */
var parseForDrilldown = function (input) {};


/** parsing function for map charts */
var parseForMap = function (input) {};




/** Decides which parse function to run, depending on chart type */
var parseTableInput = function (input, load_series_from, chart_type) {

    var output;
    /** Depending on the chart type, start that parsing */
    if (["area", "line", "bar","stacked_bar", "column", "stacked_column"].indexOf(chart_type) > -1) {
        output = parseForTypicalChart(input, load_series_from, chart_type);
    } else if (chart_type == "bubble") {
        output = parseForBubble(input, chart_type);
    } else if (chart_type == "scatter") {
        output = parseForScatter(input, chart_type);
    } else if (chart_type == "drilldown") {
        output = parseForDrilldown(input, chart_type);
    } else if (chart_type == "map") {
        output = parseForMap(input);
    }

    //add chart title (same for all types of charts)
    output.title_text = $("caption", input).text();
    
    return output;

};

module.exports = parseTableInput;