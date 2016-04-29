var utils_main = require("../../utils/utils_main.js");

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

        all_map_options = all_map_options || map_colors_init.cached_map_options; //used cached if all_map_options not passed

        
        //get all values in order
        var values_arr = utils_main.valueSort(all_map_options.areas);
        

        //divide values into ranges
        var value_ranges = []; //to be used to color areas
        for (var i = .2; i < 1; i = i + .2) {
            value_ranges.push(values_arr[Math.floor(values_arr.length * i)]);
        }

        map_colors_init.cached_value_ranges = value_ranges; //set new cached array


        //add color property to each obj in map_objs depending on its value
        $.each(all_map_options.areas, function () {
            if (this.value === null || this.value === "N/A") {
                this.color = "rgb(223, 223, 223)" //gray
            } else if (this.value <= value_ranges[0]) {
                this.color = colors[0];
            } else if (this.value > value_ranges[0] && this.value <= value_ranges[1]) {
                this.color = colors[1];
            } else if (this.value > value_ranges[1] && this.value <= value_ranges[2]) {
                this.color = colors[2];
            } else if (this.value > value_ranges[2] && this.value <= value_ranges[3]) {
                this.color = colors[3];
            } else if (this.value > value_ranges[3]) {
                this.color = colors[4];
            }
        });


        map_colors_init.cached_map_options = all_map_options;
        //    console.log("values", values_arr);
        //    console.log("map", map_objs);

        return all_map_options;
    },


    /** make and return an array of colors from a color palette **/
    newColorArray: function (color_palette) {
        var selected_colors = [];
        $.each($(".map_color_palette_cell", color_palette), function () {
            selected_colors.push($(this).css("background-color"));
        });

        return selected_colors;
    }

}


module.exports = map_colors_init;