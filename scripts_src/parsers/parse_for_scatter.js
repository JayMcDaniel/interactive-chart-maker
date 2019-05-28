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


        //add regression (or 45-degree line if applicable)
        if ($("#chart_scatter_add_line_checkbox").is(':checked')) {
            console.log("adding line");

            var x_vals = [];
            var y_vals = [];

            $.each(output.series, function (i, series) {
                $.each(series.data, function (j, data) {
                    x_vals.push(data[0]);
                    y_vals.push(data[1]);
                });
            });


            var plot_min = Math.min(...x_vals, ...y_vals);
            var plot_max = Math.max(...x_vals, ...y_vals);


            var min_x = 0,
                min_y = 0,
                max_x = 0,
                max_y = 0;

            while (min_x > plot_min) {
                min_x -= 5;
            }
            while (min_y > plot_min) {
                min_y -= 5;
            }
            while (max_x < plot_max) {
                max_x += 5;
            }
            while (max_y < plot_max) {
                max_y += 5;
            }

            output.series.unshift(

                {
                    type: 'line',
                    name: 'Regression Line',
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

            )
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