var parseForBoundaryMap = require("../../parsers/parse_for_boundary_map.js");
var map_colors_init = require("./map_colors_init.js");
var mapTitleInit = require("./map_title_init.js");


/** 
Map initialization object
@namespace
**/

var map_init = {



    createAllMapOptions: function (areas) {

        //setup empty all_map_options
        var all_map_options = {
            title: "",
            subtitle: "",
            areas: areas,
            legend: ""

        };

        var table_input = $("#table_input_textarea").val();
        all_map_options.title = mapTitleInit(table_input);

        parseForBoundaryMap(all_map_options, table_input); //mods areas with values depending on table input

        var colors = map_colors_init.newColorArray($(".map_color_palette_row.selected")); //gets array of colors depending on what is selected
        map_colors_init.getBoundaryMapColors(all_map_options, colors); //mods all_map_options.areas to include fill colors depending on values

        return all_map_options;

    },



    /** converts all_map_options (actually an array of objects by now after the .get() auto conversion) to svg and puts it on page **/
    convertMapOptionsToSVG: function (all_map_options) {

        var map_display_area = $(".map_display_area");
        map_display_area.empty();

        var map_outer_div = map_init.getMapOuterDiv(); //creates and returns outer map div

        var map_outer_svg = map_init.getMapOuterSVG(); //creates and returns empty map svg tag
        map_init.populateSVG(all_map_options, map_outer_svg); //colorizes paths, sets circle attributes, appends g elements to svg

        var map_title = map_init.getMapTitle(all_map_options.title); //creates and returns a styled map h2 title with text
        var tooltip_div = map_init.getMapTooltip(); //creates and returns an empty tooltip div template 

        //put elements together
        map_outer_div.appendChild(tooltip_div);
        map_outer_div.appendChild(map_title);
        map_outer_div.appendChild(map_outer_svg); //put svg in outer div
        map_display_area.append($(map_outer_div)); //put map on page

        map_init.resizeMap(); //adjust map_display_area size

        //init tooltip and highlighting
        map_init.setUpMapHover();

    },





    /** creates and returns an empty map outer div. This will hold the map svg, tooltip box, legend, title, etc. **/

    getMapOuterDiv: function () {
        var div = document.createElement("div");
        div.setAttribute("style", "position: relative; width: 695px; min-height: 480px; margin: auto; background-color:#FFFFFF;");
        div.setAttribute("class", "map_outer_div");

        return div;
    },




    /** creates and returns an empty map svg element **/
    getMapOuterSVG: function () {

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", 450);
        svg.setAttribute("width", 680);
        svg.setAttribute("class", "map_svg");
        svg.setAttribute("viewBox", "180 0 620 620");
        svg.setAttribute("style", "z-index: 400; position: relative; left: 13px; top: 0px; background-color: #fff;");

        return svg;
    },


    /** creates and returns an empty tooltip div template **/
    getMapTooltip: function () {

        var tooltip_div = document.createElement("div");
        tooltip_div.className = "map_tooltip";
        tooltip_div.setAttribute("style", "min-width: 251px; min-height: 94px; background-color: #FCF8E3; border: solid 1px #395463; position: absolute; left: 373px; top: 5px; z-index: 500; display: none;");

        var tooltip_title = document.createElement("h2");
        tooltip_title.className = "tooltip_title";
        tooltip_title.setAttribute("style", "color: #000; font-family: sans-serif; font-weight: bold; font-size:14px; margin: 5px 0px 0px 5px; ");

        var tooltip_main_value = document.createElement("h4");
        tooltip_main_value.className = "tooltip_main_value";
        tooltip_main_value.setAttribute("style", "color: #395463; font-family: sans-serif; font-weight: bold; font-size:38px; margin-left: 5px; margin-top: 0px;");

        tooltip_div.appendChild(tooltip_title);
        tooltip_div.appendChild(tooltip_main_value);

        return tooltip_div;
    },


    /** creates and returns a styled map h2 title with text **/
    getMapTitle: function (title) {
        var map_title = document.createElement("h2");
        map_title.textContent = title.text;
        map_title.setAttribute("style", title.style);

        return map_title;
    },



    /** loads and returns map json **/
    loadMapJSON: function (filename, convertMapJSONtoSVG) {
        $.get(filename, function (areas) {
            var all_map_options = map_init.createAllMapOptions(areas);
            map_init.convertMapOptionsToSVG(all_map_options);
        });
    },



    /** Initial Function (called from map icon click) - calls functions to loads the map json, convert it to svg, loads options and displays map in .map_display_area **/
    loadNewMap: function () {

        map_init.loadMapJSON("json/maps/state_map.json", map_init.convertMapJSONtoSVG);
    },




    /** resizes chart_display_area by changind input values and triggering keyup **/
    resizeMap: function () {
        $("#chart_width_textinput").val(710).keyup();
        $("#chart_height_textinput").val(550).keyup();
    },




    /** populates map svg (creates paths and circles) with options from all_map_options.areas **/

    populateSVG: function (all_map_options, map_outer_svg) {

        $.each(all_map_options.areas, function () {

            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

            if (this.d) { //state outline

                var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
                el.setAttributeNS(null, "d", this.d); //sets path outline

                if (this.loc_name) { //if it's a named area, set value and color
                    el.setAttributeNS(null, "loc_value", this.value);
                    el.setAttributeNS(null, "fill", this.color || "#E0E0E0");
                }

            } else { //circle (DC or metro area)

                var el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                el.setAttributeNS(null, "r", this.r); //radius
                el.setAttributeNS(null, "cx", this.cx); //x pos
                el.setAttributeNS(null, "cy", this.cy); //y pos

            }

            el.setAttribute("style", this.style);
            el.setAttribute("class", this.class);
            el.setAttribute("loc_name", this.loc_name || "");

            g.appendChild(el);
            map_outer_svg.appendChild(g);


        });


    },


    /** sets up hover functionality for the map **/
    setUpMapHover: function () {

        //other areas fade out when an area is hovered
        $(".map_svg path[loc_name], .map_svg circle[loc_name]").hover(function () {

            //gray out other states
            $(".map_svg path[loc_name], .map_svg circle[loc_name]").not($(this)).attr("fill-opacity", ".1");

            //populate and show tooltip
            var this_tooltip = $(".map_tooltip", $(this).parents(".map_outer_div"));
            //set title
            $(".tooltip_title", this_tooltip).text($(this).attr("loc_name") || "");
            //set main value
            $(".tooltip_main_value", this_tooltip).text($(Number($(this).attr("loc_value"))).addCommas() || "");

            $(this_tooltip).show(); //show just this map's tooltip

        }, function () {

            //return to all previous fill opacity
            $(".map_svg path[loc_name], .map_svg circle[loc_name]").attr("fill-opacity", "1");

            //hide tooltip
            $(".map_tooltip").hide();
        });




    }

};

module.exports = map_init;