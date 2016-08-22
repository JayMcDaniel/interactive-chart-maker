var utils_main = require("../utils/utils_main.js");


/**
functions for the individual series tab for maps. Called ad populates from navigation_setup. Lets user fine adjust ranges and colors
@namespace
**/
var update_map_individual_series = {


    /** makes a color box, called from populateForm **/
    makeMapColorDiv: function (chart, all_chart_options, all_map_options, color, i) {

        var map_color_div = document.createElement("div");
        map_color_div.className = "map_color_div";

        //make color input box
        var map_color_input = document.createElement('input');
        $(map_color_input).addClass("jscolor {valueElement:null}");
        map_color_input.id = "map_color_input" + i;

        //init with color, using jscolor.js
        var picker = new jscolor(map_color_input, {
            onFineChange: function () {
                update_map_individual_series.updateMapColor(chart, all_chart_options, all_map_options, i, this);
            }

        });


        //create picker
        if (color.charAt(0) === "#") { //if hex
            picker.fromString(color);

        } else { //else color is rgb
            var rgb = utils_main.rgb2arr(color);
            picker.fromRGB(rgb[0], rgb[1], rgb[2]);
        }

        map_color_div.appendChild(map_color_input);


        return map_color_div;
    },




    /** makes the range value input boxes **/
    makeMapRangeInput: function (all_map_options, i) {
        var map_ranges_div = document.createElement("div");

        var range = document.createElement("input");
        range.className = "map_range_input";

        var range_text = document.createElement("span");

        if (i === 0) {
            range_text.innerHTML = "&nbsp; next value and lower"

        } else if (i === all_map_options.colors.length - 1) {
            range.value = all_map_options.value_ranges[i - 1] || "";
            range_text.textContent = " and higher"
            map_ranges_div.appendChild(range);

        } else {
            range.value = all_map_options.value_ranges[i - 1] || "";
            range_text.textContent = " to.."
            map_ranges_div.appendChild(range);
        }


        
        map_ranges_div.appendChild(range_text);


        return map_ranges_div;

    },


    /** main function that loads the individual series area with color and range boxes **/
    populateForm: function (chart, all_chart_options, all_map_options) {

        var $display_series_options_inner_div = $("#display_series_options_inner_div");
        $display_series_options_inner_div.empty();

        
        $.each(all_map_options.colors, function (i) {

            var map_color_box = update_map_individual_series.makeMapColorDiv(chart, all_chart_options, all_map_options, this, i);

            var map_range_input = update_map_individual_series.makeMapRangeInput(all_map_options, i);


            $display_series_options_inner_div.append(map_color_box);
            $display_series_options_inner_div.append(map_range_input);

            //make clear float div
            var clear_div = utils_main.makeClearFloatDiv();
            $display_series_options_inner_div.append(clear_div);

        });


        $("#display_series_options_inner_div").show();
        update_map_individual_series.updateMapRange(chart, all_chart_options, all_map_options); //binds value input boxes

    },

    /** when range color boxes are changed, this is fired to change the colors in the map **/
    updateMapColor: function (chart, all_chart_options, all_map_options, i, jscolor) {
        var map_init = require("../initializers/maps/map_init.js");

        all_map_options.colors[i] = typeof jscolor === "string" ? jscolor : jscolor.toRGBString();
        map_init.loadNewMap(chart, all_chart_options, all_map_options, false); // false to not repopulate form
    },

    /** when custom value range input boxes are changed, this is fired **/
    updateMapRange: function (chart, all_chart_options, all_map_options) {
        var map_init = require("../initializers/maps/map_init.js");

        $(".map_range_input").keyup(function () {
            map_init.loadNewMap(chart, all_chart_options, all_map_options, false); //false for don't repopulate form
        });

    }




};


module.exports = update_map_individual_series;