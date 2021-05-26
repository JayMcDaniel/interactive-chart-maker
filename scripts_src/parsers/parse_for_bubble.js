/** 
 * Parsing function for bubble charts
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */
var parseForBubble = function (input, chart_type, colors) {
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
                enabled: true
            },
            color: colors[i],
            _symbolIndex: 0
        };

        //get data values from each row's td cells (every third cell for xyz groups)
        $("td:nth-child(3n - 1)", this_row).each(function (i) {
            var x = $(this).getNumber();
            var y = $(this).next().getNumber();
            var z_val = $(this).next().next().getNumber();
            var z = Math.abs(z_val);
            var zIndex = 10000000 - z;
            var xyz_arr = {
                x: x,
                y: y,
                z: z,
                z_val: z_val,
                zIndex: zIndex
            };
            seriesObj.data.push(xyz_arr);


        });


        output.series.push(seriesObj);

    });


    return output;
};

module.exports = parseForBubble;