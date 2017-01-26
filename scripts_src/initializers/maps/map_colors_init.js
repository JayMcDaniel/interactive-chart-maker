var utils_main = require("../../utils/utils_main.js");
var utils_forms = require("../../utils/utils_forms.js");
/** Given an array of map areas, this sorts them by value and decides which colors they should have 
@module
**/

var map_colors_init = {


    cached_map_options: {},

    /** colors existing svg paths - used when chart is updated  **/
    colorPaths: function (all_map_options) {

        $.each(all_map_options.areas, function () {

            $('.map_display_area path[loc_name="' + this.loc_name + '"], .map_display_area circle[loc_name="' + this.loc_name + '"]').attr("fill", this.color);
        });
    },



    /** assigns colors to all_map_options.areas depending on where their values are on a range**/
    getBoundaryMapColors: function (all_map_options, colors) {

        //used cached if all_map_options not passed
        all_map_options = all_map_options || map_colors_init.cached_map_options;


        //get all values in order
        var values_arr = utils_main.valueSort(all_map_options.areas);
        var value_ranges = []; //to be used to color areas



        //if coloring by value, calculate ranges
        if (!all_map_options.is_colored_by_names) {


            //use custom input if available
            if ($(".map_range_input").length > 0) { //grab from custom if available

                $.each($(".map_range_input"), function () {
                    value_ranges.push(Number($(this).val()));
                });

            } else { //else calculate

                var fraction = 1 / all_map_options.ranges_amount;
                for (var i = fraction; i < 1; i = i + fraction) {
                    value_ranges.push(values_arr[Math.floor(values_arr.length * i)]);
                }
            }



        } else { ///else all_map_options.is_colored_by_names is true

            //populate value_ranges with array of unique strings from values_arr ///TODO make this look at all future animated values also
            $.each(values_arr, function (i, val) {
                if ($.inArray(val, value_ranges) === -1) { //if not already in the value_ranges array, push it in
                    value_ranges.push(val);
                }
            });

            //add in animated vals when coloring by names (if they have animated vals)
            if (all_map_options.is_animated) {

                $.each(all_map_options.areas, function (i, area) {

                    if (area.animated_vals) {
                        $.each(area.animated_vals, function (j, val) {
                            if ($.inArray(val, value_ranges) === -1) { //if not already in the value_ranges array, push it in
                                value_ranges.push(val);
                            }

                        });
                    }

                });

            }



            //[i].animated_vals

            value_ranges.sort();

            //if a value is "N/A", put at the end

            value_ranges.push(value_ranges.splice(value_ranges.indexOf("N/A"), 1)[0]);

            //truncate colors array to be same length as values_ranges (keeps legend from showing extra colors) with gray at end
            // colors = colors.slice(0, value_ranges.length - 1);
            //add gray color at the end
            //  colors.push("rgb(223, 223, 223)");


        }






        //add color property to each obj in map_objs depending on its value
        var value_ranges_len = all_map_options.is_colored_by_names ? value_ranges.length - 1 : value_ranges.length;
        $.each(all_map_options.areas, function () {
            if (this.value === null || this.value === "N/A") {
                this.color = "rgb(223, 223, 223)" //gray

            } else { //not N/A

                if (this.value <= value_ranges[0]) {
                    this.color = colors[0];

                }

                for (i = 0; i < value_ranges_len; i++) { //for length of value_ranges array, assign colors
                    if (this.value > value_ranges[i]) {
                        this.color = colors[i + 1];
                    }
                }

            }
        });


        //set new cached array
        map_colors_init.cached_value_ranges = value_ranges;
        map_colors_init.cached_map_options = all_map_options;

        all_map_options.value_ranges = value_ranges;
        all_map_options.colors = colors;

        return all_map_options;
    },


    /** make and return an array of colors from a color palette **/
    newColorArray: function (color_palette, all_map_options) {
        var selected_colors = [];

        if ($(".map_color_div .jscolor").length > 0) { //grab from custom if available

            $.each($(".map_color_div .jscolor"), function () {
                selected_colors.push($(this).css("background-color"));
            });

        } else { //else grab from selected template
            $.each($(".map_color_palette_cell", color_palette), function () {
                selected_colors.push($(this).css("background-color"));
            });

        }

        return selected_colors;
    },



    /** load map color palette boxes into #map_color_palettes **/
    loadMapColorPalettes(val) {

        var selected_index = utils_forms.getSelectedIndex($(".map_color_palette_row")); //get current selected index to click later
        var allFormUpdates = require("../../form_updates/all_form_updates.js");

        var val = val || 4;
        $("#map_color_palettes").load("./components/map_color_palettes_" + val + ".htm", function () {
            allFormUpdates.colorPaletteRowClick(); // reinits the click functionality

            $(".map_color_palette_row:eq(" + selected_index + ")").click(); //click a color to initialize a new map

            if (val > 2) {
                $("#minus_map_color").attr("class", "on"); //turn minus button on
            }

            if (val < 6) {
                $("#add_map_color").attr("class", "on"); //turn plus button on
            }

        });
    }


}


module.exports = map_colors_init;