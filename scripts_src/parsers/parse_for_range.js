/** 
 * Parsing function for range chart types. Values in the first column will load as a line or just markers depending on type of range. Then, values from the second column will load as the top range, and values from the third column will load as the bottom range. To load more lines with ranges, add more columns.
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param load_series_from {string} column_heads or column_rows
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */


var parseForRange = function (input, chart_type, colors) {

    var type = chart_type.replace("stacked_", "");

    var output = {};
    output.series = [];

    //load x-axis categories from row heads
    output.x_axis_categories = [];
    $("tbody th", input).each(function () {
        output.x_axis_categories.push($.trim($(this).text()));
    });

    //load series object names from column heads, and data from each column tds



    $("thead tr:last th:nth-child(3n - 1)", input).each(function (i) {
        var seriesObj = {
            name: $.trim($(this).text()),
            data: [],
            type: "line",
            lineWidth: chart_type === "columnrange" ? 0 : 1,
            marker: {
                enabled: chart_type === "columnrange"
            },
            color: colors[i],
            _symbolIndex: i,
            stacking: null,
            zIndex: 1,
        };

        //data from each column's tds
        $("tbody tr", input).each(function () {
            var this_row = $(this);
            $("td:eq(" + i + ")", this_row).each(function () {
                seriesObj.data.push($(this).getNumber());
            });
        });


        //get range series
        var rangeObj = {
            name: $.trim($(this).text()) + ' range',
            data: [],
            type: chart_type,
            lineWidth: 0,
            linkedTo: ':previous',
            color: chart_type === "columnrange" ? colors[i+1] : colors[i],
            fillOpacity: 0.3,
            zIndex: 0,
            stacking: null
        };

        //data from next 2 columns
        $("tbody tr", input).each(function () {
            var this_row = $(this);
            $("td:eq(" + (i + 1) + ")", this_row).each(function () {
                var high = $(this).getNumber();
                var low = $(this).next().getNumber();
                rangeObj.data.push([low, high]);
            });
        });

        output.series.push(seriesObj);
                output.series.push(rangeObj);


    });



    return output;

};


module.exports = parseForRange;