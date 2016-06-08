/** 
 * Parsing function for maps  - adds values to all_map_options.areas based on table input
 * @module
 * @param all_map_options {object} main map object with path and svg options
 * @param input {element} input jquery table element retrieved from textarea
 * @returns {object} modded map object with path d's and fill colors
 */

var parseForMap = function (all_map_options, table_input) {


    $("tbody tr", $(table_input)).each(function () {
        //get location name, value, and extra values from table input

        var thisRow = this;
        var row_loc_name = $.trim($("th", thisRow).text()); //location name
        var row_val = $("td:eq(0)", thisRow).getNumber(); //main value


        var extra_vals = []; //extra values
        var animated_vals = []; //animated values for animated maps


        //if animated, add animated titles and values
        if (all_map_options.is_animated) {

            $("td", thisRow).each(function () {
                animated_vals.push($(this).getNumber());
            });

            //else add extra value titles and values
        } else {

            $("td:gt(0)", thisRow).each(function () {
                extra_vals.push($.trim($(this).text()));
            });
        }



        //assign values on objs in all_map_options.areas array
        for (var i = 0, len = all_map_options.areas.length; i < len; i++) {
            if (all_map_options.areas[i].loc_name === row_loc_name) {
                all_map_options.areas[i].value = row_val;
                all_map_options.areas[i].extra_vals = extra_vals;
                all_map_options.areas[i].animated_vals = animated_vals;


                break;
            }
        }

    }); //end tbody tr loop



    //adds titles to an array from THs
    var addTitles = function (i, arr) {
        $("thead th:gt(" + i + ")", $(table_input)).each(function () {
            all_map_options[arr].push($.trim($(this).text()));
        });
    };


    //if animated, add animated titles and values
    if (all_map_options.is_animated) {
        addTitles(0, "animated_value_titles");

        //else add extra value titles and values
    } else {
        addTitles(1, "extra_value_titles");

    }



}

module.exports = parseForMap;