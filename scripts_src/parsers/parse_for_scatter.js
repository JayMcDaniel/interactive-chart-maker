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
    $("tbody tr", input).each(function (i, tr) {

        var seriesObj = {
            name: $.trim($("th:eq(0)", tr).text()),
            data: [],
            type: chart_type,
            lineWidth: 0,
            marker: {
                enabled: true,
                symbol: "circle"
            },
            color: colors[i - Math.floor(i / 15) * 15],
            _symbolIndex: 0
        };

        //get data values from each row's td cells
        $("td:even", tr).each(function (i, td) {
            var x = $(td).getNumber();
            var y = $(td).next().getNumber();
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

    
    //add point names if applicable (more than one row of column headers)
    
    var header_rows = $("thead tr", input);
    if (header_rows.length > 1){
        var point_names = [];
        $("th:gt(0)", header_rows[0]).each(function(i, th){
           point_names.push($(th).text());
        });
        
        $.each(output.series, function(i, series){
            series.point_names = point_names
        });
        
    }
        

    return output;


};

module.exports = parseForScatter;