/** 
 * Parsing function for boundary-type maps 
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @returns {object} modded map object with path d's and fill colors
 */

var parseForBoundaryMap = function (all_map_options, table_input) {


    

    $("tbody tr", $(table_input)).each(function () {
        //get location name and value from table input

        var thisRow = this;
        var row_loc_name = $.trim($("th", thisRow).text());
        var row_val = $("td:eq(0)", thisRow).getNumber();

        //assign values on objs in all_map_options.areas array
        for (var i = 0, len = all_map_options.areas.length; i < len; i++) {
            if (all_map_options.areas[i].loc_name === row_loc_name) {
                all_map_options.areas[i].value = row_val;
                break;
            }

        }

    });


}

module.exports = parseForBoundaryMap;