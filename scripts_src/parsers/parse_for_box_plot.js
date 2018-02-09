/** 
 * Parsing function for box plot charts
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param chart_type {string} type of chart ("box_plot")
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */
var parseForBoxPlot = function (input, chart_type, colors) {
    console.log("parseForBoxPlot");
    
    var output = {};

    //load x-axis categories from row heads
    output.x_axis_categories = [];
    $("tbody th", input).each(function () {
        output.x_axis_categories.push($.trim($(this).text()));
    });




    //load series names from row heads, and data from row tds
    output.series = [];


    var this_row = $(this);

    //set up series objs
    var seriesObj = {
        ranges: [],
        data: [],
        type: "boxplot",
        showInLegend: false,
        marker: {
            enabled: false
        },
        color: colors[0]
    };


    //add in ranges from column heads


    $("thead th:gt(0)", input).each(function () {

        seriesObj.ranges.push($.trim($(this).text()));

    });

    $("tbody tr", input).each(function (i, tr) {

        var row_data = [];

        //get data values from each row's td cells (every third cell for xyz groups)
        $("td", tr).each(function (i) {
            row_data.push($(this).getNumber());
        });

        seriesObj.data.push(row_data);

    });


    output.series.push(seriesObj);
    return output;
};

module.exports = parseForBoxPlot;