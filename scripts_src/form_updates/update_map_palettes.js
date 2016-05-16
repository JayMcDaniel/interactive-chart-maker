var map_colors_init = require("../initializers/maps/map_colors_init.js");
var map_init = require("../initializers/maps/map_init.js");

/**
Relates to the map color palettes. functions called from all_form_updates
@namespace
**/

var update_map_palettes = {

    /** when plus and minus buttons ("#add_map_color) are clicked, this is triggered **/
    changeAmount: function (button) {

        if (!button.hasClass("off")) {

            var mod = button.attr("id").replace("_map_color", "") == "add" ? 1 : -1;

            var new_palette_num = $(".map_color_palette_row.selected .map_color_palette_cell").length + mod;
            map_colors_init.loadMapColorPalettes(new_palette_num, map_init.loadNewMap);

            $("#add_map_color, #minus_map_color").removeClass("off");
            if (new_palette_num > 6) {
                $("#add_map_color").addClass("off");
            }else if (new_palette_num < 3) {
                $("#minus_map_color").addClass("off");
            }


        }
    }

}

module.exports = update_map_palettes;