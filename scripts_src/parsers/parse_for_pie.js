/** 
 * Parsing function for pie charts
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param chart_type {string} type of chart (line, bar etc.)
 * @returns {object} Object with chart title, X-axis categories and series array of objects
 */
var parseForPie = function (input, chart_type, colors) {
    
    
     
    
    
    var output = {};

    output.x_axis_categories = []; //resets this in case there were previous categories

    //load series names from row heads, and data from row tds
    output.series = [{
        data: [],
        type: chart_type
    }];



    $("tbody tr", input).each(function (i) {

        var this_row = $(this);

        var slice = {
            y: $("td:first", this_row).getNumber(),
            name: $.trim($("th:first", this_row).text()),
            color: colors[i]
        };

        output.series[0].data.push(slice);

    });
    


    return output;
};

module.exports = parseForPie;