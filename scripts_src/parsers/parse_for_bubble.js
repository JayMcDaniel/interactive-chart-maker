/** parsing function for bubble charts */
var parseForBubble = function (input, chart_type) {
    var output = {};
    output.x_axis_categories = undefined; //resets this in case there were previous categories

    //load series names from row heads, and data from row tds
    output.series = [];
    $("tbody tr", input).each(function () {

        var this_row = $(this);

        var seriesObj = {
            name: $.trim($("th:eq(0)", this_row).text()),
            type: chart_type,
            lineWidth: 0,
            marker: {
                enabled: true
            },
            data: []
        };

        //get data values from each row's td cells (every third cell for xyz groups)
        $("td:nth-child(3n - 1)", this_row).each(function (i) {
            var x = Number($.trim($(this).text()));
            var y = Number($.trim($(this).next().text()));
            var z = Number($.trim($(this).next().next().text()));
            var xyz_arr = [x, y, z];
            seriesObj.data.push(xyz_arr);
        });

        output.series.push(seriesObj);

    });


    return output;
};

module.exports = parseForBubble;