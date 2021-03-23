var utils_main = require("../utils/utils_main.js");


///////linear least squares function to find simple regression line

function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    var x = 0;
    var y = 0;
    var values_length = values_x.length;
    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    if (values_length === 0) {
        return [[], []];
    }

    // Calculate the sum for each of the parts necessary.
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x * x;
        sum_xy += x * y;
        count++;
    }

    /*
     * Calculate m and b for the formula:
     * y = x * m + b
     */
    var m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    var b = (sum_y / count) - (m * sum_x) / count;

    /*
     * We will make the x and y result line now
     */
    var result_values_x = [];
    var result_values_y = [];

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }

    return [result_values_x, result_values_y];
}





//returns a regression line object - calls findLineByLeastSquares to calculate
function getRegressionLine(series) {

    var x_vals = [];
    var y_vals = [];

    $.each(series, function (i, serie) {
        $.each(serie.data, function (j, point) {
            x_vals.push(point[0]);
            y_vals.push(point[1]);
        });
    });

    var r_line = findLineByLeastSquares(x_vals, y_vals);
    var greatest_x_index = utils_main.findIndexOfGreatest(r_line[0]);
    var lowest_x_index = utils_main.findIndexOfLowest(r_line[0]);

    return {
        type: 'line',
        name: 'Regression line',
        color: "rgb(255, 198, 208)",
        showInLegend: false,
        data: [[r_line[0][lowest_x_index],
                r_line[1][lowest_x_index]
               ],
               [r_line[0][greatest_x_index],
                r_line[1][greatest_x_index]
               ]
              ],
        enableMouseTracking: false,
        marker: {
            enabled: false
        }
    };
}




//makes and create a 45 degree line. called if #chart_scatter_add_45_line_checkbox is checked
var get45DegreeLine = function (series) {

    var x_vals = [];
    var y_vals = [];

    $.each(series, function (i, series) {
        $.each(series.data, function (j, point) {
            x_vals.push(point[0]);
            y_vals.push(point[1]);
        });
    });


    var plot_min = Math.min(...x_vals, ...y_vals);
    var plot_max = Math.max(...x_vals, ...y_vals);

    var min_x = 0,
        min_y = 0,
        max_x = 0,
        max_y = 0;

    while (min_x > plot_min) {
        min_x = min_y -= 5;
    }

    while (max_x < plot_max) {
        max_x = max_y += 5;
    }


    return {
        type: 'line',
        name: '45-degree line',
        data: [[min_x, min_y], [max_x, max_y]],
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        color: "#999",
        enableMouseTracking: false,
        showInLegend: false
    }


};






//puts red circle around points if point meets the highlight_points_by criteria
var highlightPoints = function (series, highlight_points_by) {

    for (var i = series.length - 1; i >= 0; i--) {
        var serie = series[i];

        for (var j = serie.data.length - 1; j >= 0; j--) {
            var data = serie.data[j];

            //x value larger than y is below 45deg line
            if ((highlight_points_by === "x>y" && data[0] > data[1]) ||
                (highlight_points_by === "x<y" && data[0] < data[1])
            ) {

                series[i].data[j] = {
                    x: data[0],
                    y: data[1],
                    color: serie.color,
                    marker: {
                        fillColor: serie.color,
                        lineWidth: 2,
                        lineColor: "#ff163d" //red
                    }
                };
            }
        }
    }
};





/** 
 * Parsing function for scatter charts
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */

var parseForScatter = function (input, chart_type, colors) {

    console.log("parsing for scatter");

    var output = {};
    output.x_axis_categories = undefined; //resets this in case there were previous categories

    //load series names from row heads, and data from row tds
    output.series = [];



    var getRowData = function (tr, series_obj) {

        //get data values from each row's td cells
        $("td:even", tr).each(function (i, td) {
            var x = $(td).getNumber();
            var y = $(td).next().getNumber();
            var xy_arr = [x, y];

            // console.log("header class", $("th p", $(this).parent().next()).attr("class"));

            // var this_indent = 

            if (!(y === null || y === undefined)) {
                series_obj.data.push(xy_arr);
            }

        });

    }



    try {


        $("tbody tr", input).each(function (i, tr) {


            //if it's an indented th in the row, use the previously made series_obj, else, make a new one and push it to the output series

            if ($("th p[class^='sub']", tr).length > 0) {

                var series_obj = output.series[output.series.length - 1];
                series_obj.point_names.push($.trim($("th:eq(0)", tr).text()));
                getRowData(tr, series_obj);

            } else {

                var series_obj = {
                    name: $.trim($("th:eq(0)", tr).text()),
                    data: [],
                    type: chart_type,
                    lineWidth: 0,
                    marker: {
                        enabled: true,
                        symbol: "circle"
                    },
                    color: colors[i - Math.floor(i / 15) * 15],
                    _symbolIndex: 0,
                    point_names: []
                };


                getRowData(tr, series_obj);

                output.series.push(series_obj);

            }

        });


        //add point names if applicable (more than one row of column headers)

        var header_rows = $("thead tr", input);
        if (header_rows.length > 1) {
            var point_names = [];
            $("th:gt(0)", header_rows[0]).each(function (i, th) {
                point_names.push($(th).text());
            });

            $.each(output.series, function (i, series) {
                series.point_names = point_names
            });

        }


        //add 45-degree line? (needs to be called before highlightPoints turns data arrays into objects)
        if ($("#chart_scatter_add_45_line_checkbox").is(':checked')) {
            output.series.unshift(get45DegreeLine(output.series));
        }


        //add regression line?
        if ($("#chart_scatter_add_regression_line_checkbox").is(':checked')) {
            output.series.unshift(getRegressionLine(output.series));
        }

        //red outline?

        var highlight_points_by = $("#chart_scatter_highlight_points_select").val();
        if (highlight_points_by != "no_highlight") {
            highlightPoints(output.series, highlight_points_by);
        }



    } catch (error) {

        console.log(error);
        $(".alert-danger").text("Sorry, the table wasn't formatted correctly for a scatter chart. Please see the example on the data tab.");

        setTimeout(function () {
            $(".alert-danger").text("");
        }, 10000);

    }



    return output;


};

module.exports = parseForScatter;