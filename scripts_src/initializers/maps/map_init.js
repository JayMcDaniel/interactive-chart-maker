var parseForMap = require("../../parsers/parse_for_map.js");
var map_colors_init = require("./map_colors_init.js");
var mapTitleInit = require("./map_title_init.js");
var mapSubtitleInit = require("./map_subtitle_init.js");
var map_tooltip_init = require("./map_tooltip_init.js");
var mapCreditsInit = require("./map_credits_init.js");
var map_circle_sizes_init = require("./map_circle_sizes_init.js");


/** 
Map initialization object
@namespace
**/

var map_init = {



    createAllMapOptions: function (areas, map_type) {


        //setup empty all_map_options
        var all_map_options = {
            title: {},
            subtitle: {},
            areas: areas,
            colors: [],
            legend: "",
            map_type: map_type,
            viewbox: "",
            value_ranges: [],
            credits: {},
            tooltip: {
                dollar_sign: "",
                percent_sign: "",
                decimals: "",
                na_text: ""
            },
            extra_value_titles: []

        };

        //set viewbox
        switch (map_type) {
        case "county":
            all_map_options.viewbox = "95 -10 380 380";
            break;
        case "state":
            all_map_options.viewbox = "180 0 620 620";
            break;
        case "metro_area":
            all_map_options.viewbox = "45 0 670 510";
            break;
        }


        var table_input = $("#table_input_textarea").val();

        //set title
        all_map_options.title = mapTitleInit(table_input);

        //set subtitle
        all_map_options.subtitle = mapSubtitleInit($("#chart_subtitle_textarea"));

        //set credits
        all_map_options.credits = mapCreditsInit($("#chart_credits_text_textarea"));

        //set tooltip format
        map_tooltip_init.formatMapToolTip(all_map_options);


        //assign values to all_map_options.areas based on table input

        parseForMap(all_map_options, table_input);


        var colors = map_colors_init.newColorArray($(".map_color_palette_row.selected")); //gets array of colors depending on what is selected
        map_colors_init.getBoundaryMapColors(all_map_options, colors); //mods all_map_options.areas to include fill colors depending on values

        //get circle sizes for circle type maps
        if (map_type === "metro_area") {
            map_circle_sizes_init.getCircleSizes(all_map_options); //decides what radius map circle elements will have, depending on their value

        }

        return all_map_options;


    },







    /** converts all_map_options (actually an array of objects by now after the .get() auto conversion) to svg and puts it on page **/
    convertMapOptionsToSVG: function (all_map_options) {
        var map_display_area = $(".map_display_area");
        map_display_area.empty();

        var map_outer_div = map_init.getMapOuterDiv(); //creates and returns outer map div

        var map_outer_svg = map_init.getMapOuterSVG(all_map_options); //creates and returns empty map svg tag
        map_init.populateSVG(all_map_options, map_outer_svg); //colorizes paths, sets circle attributes, appends g elements to svg

        var map_title = map_init.getMapTitle(all_map_options.title); //creates and returns a styled map h2 title with text
        var map_subtitle = map_init.getMapSubtitle(all_map_options.subtitle); //creates and returns a styled map h3 title with text
        var map_credits = map_init.getMapCredits(all_map_options.credits); //creates and returns a styled map div credits with text
        var map_legend = map_init.getMapLegend(all_map_options); //creates and returns a styled map div legend with color boxes and text

        var tooltip_div = map_tooltip_init.getMapTooltip(); //creates and returns an empty tooltip div template 

        //put elements together
        map_outer_div.appendChild(tooltip_div); //tooltip
        map_outer_div.appendChild(map_title); //title
        map_outer_div.appendChild(map_subtitle); //subtitle
        map_outer_div.appendChild(map_outer_svg); //main svg
        map_outer_div.appendChild(map_legend); //legend
        map_outer_div.appendChild(map_credits); //credits

        map_display_area.append($(map_outer_div)); //put map on page

        map_init.resizeMap(); //adjust map_display_area size

        //init tooltip and highlighting
        map_init.setUpMapHover(all_map_options);

    },



    /** creates and returns a styled map div legend with color boxes and text **/
    getMapLegend: function (all_map_options) {

        //create outer legend box
        var map_legend_div = document.createElement("div");
        map_legend_div.setAttribute("class", "map_legend_div");
        map_legend_div.setAttribute("style", "position: absolute; top: 430px; left: 351px; min-width: 171px; min-height: 130px; margin: auto; z-index: 500");

        //create legend item for each color
        $.each(all_map_options.colors, function (i) {

            var map_legend_item = document.createElement("div"); //outer div for each legend item
            map_legend_item.setAttribute("class", "map_legend_item");
            map_legend_item.setAttribute("style", "min-width: 171px; min-height: 15px; margin-bottom: 7px;");

            var map_legend_color = document.createElement("div"); //map color box div for each legend item
            map_legend_color.setAttribute("class", "map_legend_color");

            //set round color boxes for metro type maps
            var border_radius = all_map_options.map_type === "metro_area" ? "50px" : "0px";

            map_legend_color.setAttribute("style", "width: 15px; height: 15px; background-color: " + all_map_options.colors[i] + "; float: left; border: rgb(153, 153, 153) solid .5px; border-radius: " + border_radius + "");

            var map_legend_text = document.createElement("div"); //map text div for each legend item
            map_legend_text.setAttribute("class", "map_legend_text");
            map_legend_text.setAttribute("style", "color: black; float: left; line-height: 1em; margin-left: 5px; font-size: 12px;");


            // all_map_options.value_ranges.reverse();
            if (i === 0) {
                map_legend_text.textContent = all_map_options.value_ranges[i] + " and lower";
            } else if (i === all_map_options.colors.length - 1) {
                map_legend_text.textContent = all_map_options.value_ranges[i - 1] + " and higher";
            } else {
                map_legend_text.textContent = all_map_options.value_ranges[i - 1] + " to " + all_map_options.value_ranges[i];
            }





            map_legend_item.appendChild(map_legend_color);
            map_legend_item.appendChild(map_legend_text);
         //   map_legend_div.appendChild(map_legend_item);
            map_legend_div.insertBefore(map_legend_item, null);

        });

        return map_legend_div;
    },




    /** creates and returns an empty map outer div. This will hold the map svg, tooltip box, legend, title, etc. **/

    getMapOuterDiv: function () {
        var div = document.createElement("div");
        div.setAttribute("style", "position: relative; width: 695px; min-height: 580px; margin: auto; background-color:#FFFFFF;");
        div.setAttribute("class", "map_outer_div");

        return div;
    },




    /** creates and returns an empty map svg element **/
    getMapOuterSVG: function (all_map_options) {

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", 450);
        svg.setAttribute("width", 680);
        svg.setAttribute("class", "map_svg");

        svg.setAttribute("viewBox", all_map_options.viewbox);

        svg.setAttribute("style", "z-index: 400; position: relative; left: 13px; top: 0px; background-color: #fff;");

        return svg;
    },







    /** creates and returns a styled map h2 title with text **/
    getMapTitle: function (title) {
        var map_title = document.createElement("h2");
        map_title.textContent = title.text;
        map_title.setAttribute("style", title.style);

        return map_title;
    },


    /** creates and returns a styled map h3 subtitle with text **/
    getMapSubtitle: function (subtitle) {
        var map_subtitle = document.createElement("h3");
        map_subtitle.textContent = subtitle.text;
        map_subtitle.setAttribute("style", subtitle.style);

        return map_subtitle;
    },


    /** creates and returns a styled map div credits with text **/
    getMapCredits: function (credits) {
        var map_credits = document.createElement("div");
        map_credits.innerHTML = credits.text;
        map_credits.setAttribute("style", credits.style);

        return map_credits;
    },



    /** loads and returns map json **/
    loadMapJSON: function (filename, map_type, convertMapJSONtoSVG) {
        $.get(filename, function (areas) {
            var all_map_options = map_init.createAllMapOptions(areas, map_type);
            map_init.convertMapOptionsToSVG(all_map_options);
        });
    },





    /** Initial Function (called from map icon click) - calls functions to loads the map json, convert it to svg, loads options and displays map in .map_display_area **/
    loadNewMap: function () {

        var map_type = $("#map_type_select").val();

        map_init.loadMapJSON("json/maps/" + map_type + "_map.json", map_type, map_init.convertMapJSONtoSVG);
    },




    /** resizes chart_display_area by changind input values and triggering keyup **/
    resizeMap: function () {
        $("#chart_width_textinput").val(710).keyup();
        $("#chart_height_textinput").val(650).keyup();
    },




    /** populates map svg (creates paths and circles) with options from all_map_options.areas **/

    populateSVG: function (all_map_options, map_outer_svg) {

        $.each(all_map_options.areas, function () {

            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

            if (this.d) { //path outline

                var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
                el.setAttributeNS(null, "d", this.d); //sets path outline


                if (all_map_options.map_type === "metro_area") {
                    //transform smaller for metro area maps
                    el.setAttributeNS(null, "transform", "scale(0.8) translate(0, 5.471371609992666)");
                    el.setAttributeNS(null, "fill", this.color || "#E0E0E0");
                }

                if (this.loc_name) { //if it's a named area, set value and color
                    el.setAttributeNS(null, "loc_value", this.value);

                    el.setAttributeNS(null, "fill", this.color || "#E0E0E0");
                    el.setAttribute("loc_name", this.loc_name);
                    this.extra_vals ? el.setAttributeNS(null, "extra_vals", this.extra_vals.join(";")) : null;
                }

            } else { //circle (DC or metro area)

                var el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                el.setAttributeNS(null, "r", this.r); //radius
                el.setAttributeNS(null, "cx", this.cx); //x pos
                el.setAttributeNS(null, "cy", this.cy); //y pos
                el.setAttributeNS(null, "stroke", this.color ? this.color : "#337ab7"); //stroke
                el.setAttributeNS(null, "fill", this.color ? this.color.replace(')', ', 0.75)').replace('rgb', 'rgba') : "#337ab7"); //fill


                if (this.loc_name) { //if it's a named area, set value and color
                    el.setAttributeNS(null, "loc_value", this.value);
                    el.setAttribute("loc_name", this.loc_name);
                }


            }

            el.setAttribute("style", this.style);
            el.setAttribute("class", this.class);


            g.appendChild(el);
            map_outer_svg.appendChild(g);

        });

    },





    /** sets up hover functionality for the map **/
    setUpMapHover: function (all_map_options) {

        //other areas fade out when an area is hovered
        $(".map_svg path[loc_name], .map_svg circle[loc_name]").hover(function () {

            //gray out other states
            $(".map_svg path[loc_name], .map_svg circle[loc_name]").not($(this)).attr("fill-opacity", ".1");

            //populate and show tooltip
            var this_tooltip = $(".map_tooltip", $(this).parents(".map_outer_div"));
            //set title
            $(".tooltip_title", this_tooltip).text($(this).attr("loc_name") || "");

            var this_loc_value = Number($(this).attr("loc_value")); //get main value
            var this_extra_vals = $(this).attr("extra_vals"); //get extra values (if applicable)

            //add main value to tooltip if applicable
            if (this_loc_value) {
                var value_html = "<span style='font-size: 80%'>" + all_map_options.tooltip.dollar_sign + "</span>" + ($(this_loc_value).addCommas(all_map_options.tooltip.decimals) || "") + "<span style='font-size: 80%'>" + all_map_options.tooltip.percent_sign + "</span>";

                //add extra values to tooltip if applicable
                if (this_extra_vals) {
                    this_extra_vals = this_extra_vals.split(";");
                    $.each(this_extra_vals, function (i) {
                        value_html = value_html + "<p style='font-size: 40%'><span style='color: black'>" + all_map_options.extra_value_titles[i] + ": </span>" + this_extra_vals[i] + "</p>";
                    });

                }

            } else {
                var value_html = "<span style='font-size: 70%'>" + all_map_options.tooltip.na_text + "</span>";
            }



            //set main value
            $(".tooltip_main_value", this_tooltip).html(value_html);


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