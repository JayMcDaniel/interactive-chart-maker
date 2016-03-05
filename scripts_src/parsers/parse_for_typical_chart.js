/** parsing function for typical chart types (line, bar, column) */

var parseForTypicalChart = function (input, load_series_from, chart_type) {
    
    var type = chart_type.replace("stacked_","");
    
        var output = {};

    /** If loading series names from column heads is selected*/
    if (load_series_from === "column_heads") {
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
                type: type,
                data: [],
                stacking: ["area", "stacked_bar", "stacked_column"].indexOf(chart_type) > -1 ? "stacked" : null
                
            };

            //data from each column's tds
            $("tbody tr", input).each(function () {
                var this_row = $(this);
                $("td:eq(" + i + ")", this_row).each(function () {
                    seriesObj.data.push($(this).getNumber());
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

            var this_row = $(this);

            var seriesObj = {
                type: type ,
                name: $.trim($("th:eq(0)", this_row).text()),
                data: [],
                stacking: ["area", "stacked_bar", "stacked_column"].indexOf(chart_type) > -1 ? "stacked" : null
            };

            //get data values from each row's td cells
            $("td", this_row).each(function () {
                seriesObj.data.push($(this).getNumber());
            });

            output.series.push(seriesObj);

        });
    }
    
    return output;

}; 


module.exports = parseForTypicalChart;