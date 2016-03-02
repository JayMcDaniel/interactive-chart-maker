/** takes the table html from a given textarea and parses it into an object, depending on useer-selected inputs */


/** parsing function for typical chart types (line, bar, column) */
var parseForTypicalChart = function (input, output, chart_type, chart) {

    /** If loading series names from column heads is selected*/
    if ($(".selected_load_series_from").divVal() === "column_heads") {

        //load x-axis categories from row heads
        output.x_axis_categories = [];
        $("tbody th", input).each(function () {
            output.x_axis_categories.push($.trim($(this).text()));
        });

        //load series object names from column heads, and data from each column tds
        output.series = [];

        $("thead tr:last th:gt(0)", input).each(function (i) {
            var seriesObj = {
                name: $.trim($.trim($(this).text())),
                data: []
            };

            //data from each column's tds
            $("tbody tr", input).each(function () {
                var thisRow = $(this);
                $("td:eq(" + i + ")", thisRow).each(function () {
                    seriesObj.data.push(Number($.trim($(this).text())));
                });
            });

            output.series.push(seriesObj);

        });



        /** Else if loading series names from row heads is selected*/
    } else {

        //load x-axis categories from column heads
        output.x_axis_categories = [];
        $("thead th:gt(0)", input).each(function () {
            output.x_axis_categories.push($.trim($(this).text()));
        });

        //load series object names from row heads, and data from row tds
        output.series = [];
        $("tbody tr", input).each(function () {

            var thisRow = $(this);

            var seriesObj = {
                name: $.trim($("th:eq(0)", thisRow).text()),
                data: []
            };

            //get data values from each row's td cells
            $("td", thisRow).each(function () {
                seriesObj.data.push(Number($.trim($(this).text())));
            });

            output.series.push(seriesObj);

        });
    }

}; //end parseForTypicalChart()



/** parsing function for bubble charts */
var parseForBubble = function (input, output) {};


/** parsing function for scatter charts */
var parseForScatter = function (input, output) {};


/** parsing function for drilldown charts */
var parseForDrilldown = function (input, output) {};


/** parsing function for map charts */
var parseForMap = function (input, output) {};





var parseTableInput = function (input, chart_type) {

    var output = {};

    //add chart title (same for all types of charts)
    output.title_text = $("caption", input).text();

    /** Depending on the chart type, start that parsing */
    if (["line", "bar", "column"].indexOf(chart_type) > -1) {
        parseForTypicalChart(input, output, chart_type);
    } else if (chart_type == "bubble") {
        parseForBubble(input, output);
    } else if (chart_type == "scatter") {
        parseForScatter(input, output);
    } else if (chart_type == "drilldown") {
        parseForDrilldown(input, output);
    } else if (chart_type == "map") {
        parseForMap(input, output);
    }

    return output;

};

module.exports = parseTableInput;