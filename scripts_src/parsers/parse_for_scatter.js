/** 
 * Parsing function for scatter charts
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */
var parseForScatter = function (input, chart_type, colors) {

    var output = {};
    output.x_axis_categories = undefined; //resets this in case there were previous categories

    //load series names from row heads, and data from row tds
    output.series = [];
    $("tbody tr", input).each(function (i) {

        var this_row = $(this);

        var seriesObj = {
            name: $.trim($("th:eq(0)", this_row).text()),
            data: [],
            type: chart_type,
            lineWidth: 0,
            marker: {
                enabled: true,
                symbol: "circle"
            },
            color: colors[i - Math.floor(i / 15) * 15],
            _symbolIndex: i
        };

        //get data values from each row's td cells
        $("td:even", this_row).each(function (i) {
            var x = $(this).getNumber();
            var y = $(this).next().getNumber();
            if (y === null || y === undefined) {
                $(".alert-danger").text("Sorry, the table wasn't formatted correctly for a scatter chart. Please see the example on the data tab.");

                setTimeout(function () {
                    $(".alert-danger").text("");
                }, 10000);
            }

            var xy_arr = [x, y];

            seriesObj.data.push(xy_arr);

        });

        output.series.push(seriesObj);

    });


    return output;


};

module.exports = parseForScatter;