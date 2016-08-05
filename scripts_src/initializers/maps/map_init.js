var utils_forms = require("../../utils/utils_forms.js");
var parseForMap = require("../../parsers/parse_for_map.js");
var map_animation_init = require("./map_animation_init.js");
var map_colors_init = require("./map_colors_init.js");
var map_title_init = require("./map_title_init.js");
var map_subtitle_init = require("./map_subtitle_init.js");
var map_tooltip_init = require("./map_tooltip_init.js");
var map_legend_init = require("./map_legend_init");
var map_credits_init = require("./map_credits_init.js");
var map_circle_sizes_init = require("./map_circle_sizes_init.js");
var update_map_individual_series = require("../../form_updates/update_map_individual_series.js");
var update_template = require("../../form_updates/update_template.js");
var areas_colored_report = require("../../utils/areas_colored_report.js");

/** 
Map initialization object
@namespace
**/

var map_init = {


    /** creates / sets all map options, the main object that the map svg is made from **/
    createAllMapOptions: function (all_map_options, areas, map_type) {

        //setup empty all_map_options
        all_map_options = {
            render_ID: update_template.changeID($("#chart_id_textinput").val(), null, all_map_options),
            title: {},
            subtitle: {},
            colors: [],
            circle_size_multiple: 1,
            is_animated: utils_forms.getCheckBoxValue($("#map_animated_checkbox")),
            animation_delay: Number($("#map_animation_speed_range").val()),
            legend: {
                reversed: utils_forms.getCheckBoxValue($("#legend_reverse_layout_checkbox")),
                x: Number($("#legend_placement_x").val()),
                y: Number($("#legend_placement_y").val())
            },
            map_type: map_type,
            viewbox: "",
            sized_for_spotlight: $("#map_spotlight_size_checkbox").is(":checked"),
            ranges_amount: $(".map_color_palette_row.selected .map_color_palette_cell").length,
            value_ranges: [],
            credits: {},
            tooltip: {
                dollar_sign: "",
                percent_sign: "",
                decimals: "",
                na_text: ""
            },
            extra_value_titles: [],
            animated_value_titles: [],
            areas: areas

        };

        //   console.log(all_map_options);

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
        all_map_options.title = map_title_init.mapTitleInit(table_input);

        //set subtitle
        all_map_options.subtitle = map_subtitle_init.mapSubtitleInit($("#chart_subtitle_textarea"));

        //set credits
        all_map_options.credits = map_credits_init.mapCreditsInit($("#chart_credits_text_textarea"));

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
        var map_display_area = $("#" + all_map_options.render_ID + ".map_display_area");
        

        //  var map_display_area = $(".map_display_area");
        map_display_area.empty();

        var map_outer_div = map_init.getMapOuterDiv(all_map_options); //creates and returns outer map div

        var map_outer_svg = map_init.getMapOuterSVG(all_map_options); //creates and returns empty map svg tag
        map_init.populateSVGAreas(all_map_options, map_outer_svg); //colorizes paths, sets circle attributes, appends g elements to svg

        var map_title = map_title_init.getMapTitle(all_map_options.title); //creates and returns a styled map h2 title with text
        var map_subtitle = map_subtitle_init.getMapSubtitle(all_map_options.subtitle); //creates and returns a styled map h3 title with text
        var map_credits = map_credits_init.getMapCredits(all_map_options.credits); //creates and returns a styled map div credits with text

        var tooltip_div = map_tooltip_init.getMapTooltip(); //creates and returns an empty tooltip div template 

        //put elements together
        $(map_outer_div).append(tooltip_div, map_title, map_subtitle); //tooltip
       

        // if it's animated, make and add the slider
        if (all_map_options.is_animated) {
            var map_animation_div = map_animation_init.getAnimationDiv(all_map_options);
            map_outer_div.appendChild(map_animation_div);
        }

        var map_legend = map_legend_init.getMapLegend(all_map_options); //creates and returns a styled map div legend with color boxes and text

        //put more together
        $(map_outer_div).append(map_outer_svg, map_legend, map_credits); 
       

        map_display_area.append($(map_outer_div)); //put map on page

        //reverse legend if needed
        if (all_map_options.legend.reversed) {
            var map_legend_div = $(".map_legend_div");
            $(map_legend_div).children().each(function (i, div) {
                map_legend_div.prepend(div)
            });
        }

        return map_display_area;

    },





    /** creates and returns an empty map outer div. This will hold the map svg, tooltip box, legend, title, etc. **/

    getMapOuterDiv: function (all_map_options) {

        var div = document.createElement("div");
        
        $(div).css({
            position: "relative",
            width: all_map_options.sized_for_spotlight ? "595px" : "695px",
            "min-height": all_map_options.sized_for_spotlight ? "530px" : "590px",
            "text-align": "left",
            margin: "auto",
            "background-color":"#FFFFFF"
        })
        .addClass("map_outer_div");
        
        return div;
    },




    /** creates and returns an empty map svg element **/
    getMapOuterSVG: function (all_map_options) {

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        $(svg).css({
            "z-index": "400",
            position: "relative",
            left: "13px",
            top: "-9px",
            "background-color": "#fff",
            "height": all_map_options.sized_for_spotlight ? "382px" : "450px",
            "width": all_map_options.sized_for_spotlight ? "578px" : "680px"


        })
        .addClass("map_svg")
        
        svg.setAttribute("viewBox", all_map_options.viewbox);

        return svg;
    },





    /** Initial Function (called from map icon click) - calls functions to loads the map json, convert it to svg, loads options and displays map in .map_display_area **/
    loadNewMap: function (chart, all_chart_options, all_map_options, repopulate_form) {

        $(".map_play_button.playing").click(); //if animated map is playing, stop it - prevents errors
        
        var navigation_setup = require("../../navigation_setup.js");

        var map_type = $("#map_type_select").val();
        
        var filename = "json/maps/" + map_type + "_map.json";

        $.get(filename, function (areas) {

            var all_map_options = map_init.createAllMapOptions(all_map_options, areas, map_type);

            //give .map_display_area the chosen ID
            $(".map_display_area").attr("id", all_map_options.render_ID);

            //convert all_map_options to svg and puts it on page, returns jquery object of map div
            var map_display_area = map_init.convertMapOptionsToSVG(all_map_options);

            //adjust map_display_area size
            map_init.resizeMap(all_map_options);

            //init tooltip and highlighting
            map_init.setUpMapHover(all_map_options, map_display_area);

            //init legend hovering
            map_init.setUpMapLegendHover(map_display_area);

            //init animation functionality if applicabla
            if (all_map_options.is_animated) {
                map_animation_init.setUpMapAnimation(all_map_options, map_display_area);
            }

            //init state links to eag pages
            map_init.setUpMapStateLinks(map_display_area);

            //init individual series range setup
            if (repopulate_form === true) {
                update_map_individual_series.populateForm(all_map_options);
            }

            //reinit navigation get code button click so that load chart code button will work
            navigation_setup.getCodeButtonClick(all_chart_options, all_map_options);

            //generate areas colored report
            areas_colored_report.generateReport(all_map_options);

        });

    },




    /** resizes chart_display_area by changing input values and triggering keyup **/
    resizeMap: function (all_map_options) {
        var new_width = all_map_options.sized_for_spotlight ? 615 : 710;
        var new_height = all_map_options.sized_for_spotlight ? 590 : 650;
        $("#chart_width_textinput").val(new_width).keyup();
        $("#chart_height_textinput").val(new_height).keyup();
    },




    /** populates map svg (creates paths and circles) with options from all_map_options.areas. Called from convertMapOptionsToSVG() **/

    populateSVGAreas: function (all_map_options, map_outer_svg) {

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

                if (this.loc_name) { //if it's a named area, set values and color
                    el.setAttributeNS(null, "loc_value", this.value);
                    el.setAttributeNS(null, "fill", this.color || "#E0E0E0");
                    el.setAttributeNS(null, "stroke", "#646464");
                    el.setAttribute("loc_name", this.loc_name);

                }

                if (this.class === "border") {
                    el.setAttributeNS(null, "fill", "none");
                    el.setAttributeNS(null, "stroke", "#A9A9A9");
                    el.setAttributeNS(null, "stroke-width", 2);
                }

            } else { //circle (DC or metro area)

                var el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                el.setAttributeNS(null, "r", this.r); //radius
                el.setAttributeNS(null, "cx", this.cx); //x pos
                el.setAttributeNS(null, "cy", this.cy); //y pos
                el.setAttributeNS(null, "stroke", this.color ? this.color : "#337ab7"); //stroke

                if (all_map_options.map_type === "metro_area") {
                    el.setAttributeNS(null, "fill", this.color ? this.color.replace(')', ', 0.75)').replace('rgb', 'rgba') : "#337ab7"); //fill
                } else {
                    el.setAttributeNS(null, "fill", this.color ? this.color : "#337ab7"); //fill

                }



                if (this.loc_name) { //if it's a named area, set value and color
                    el.setAttributeNS(null, "loc_value", this.value);
                    el.setAttribute("loc_name", this.loc_name);
                }

            }


            if (this.style) {
                el.setAttribute("style", this.style);
            }

            el.setAttribute("class", this.class);
            this.extra_vals ? el.setAttributeNS(null, "extra_vals", this.extra_vals.join(";")) : null;
            this.animated_vals ? el.setAttributeNS(null, "animated_vals", this.animated_vals.join(";")) : null;

            if (this.id) {
                el.setAttribute("id", this.id);
            }


            g.appendChild(el);
            map_outer_svg.appendChild(g);

        });

    },





    /** sets up hover functionality for the map **/
    setUpMapHover: function (all_map_options, map_display_area) {


        //other areas fade out when an area is hovered
        $("path[loc_name], circle[loc_name]", map_display_area).hover(function () {

            var $this = $(this);

            //gray out other states, highlight this one
            $("path, circle", map_display_area).attr("fill-opacity", ".05");
            $this.attr("fill-opacity", "1");

            //// populate tooltip
            var this_tooltip = $(".map_tooltip", map_display_area); //get element
            //set title
            $(".tooltip_title", this_tooltip).text($this.attr("loc_name") || "");


            //add main value to tooltip if applicable
            var this_loc_value = Number($this.attr("loc_value")); //get main value
            if (this_loc_value) {
                var value_html = "<span style='font-size: 80%'>" + all_map_options.tooltip.dollar_sign + "</span>" + ($(this_loc_value).addCommas(all_map_options.tooltip.decimals || "")) + "<span style='font-size: 80%'>" + all_map_options.tooltip.percent_sign + "</span>";

                //add extra values to tooltip if applicable, and not animated

                if (!all_map_options.is_animated) {

                    var this_extra_vals = $this.attr("extra_vals"); //get extra values (if applicable)
                    if (this_extra_vals) {
                        this_extra_vals = this_extra_vals.split(";");
                        $.each(this_extra_vals, function (i) {
                            value_html = value_html + "<p style='font-size: 40%; line-height: 1.1; margin: 2px 0px 2px 0px;'><span style='color: black'>" + all_map_options.extra_value_titles[i] + ": </span>" + this_extra_vals[i] + "</p>";
                        });

                    }
                }


            } else { //if no loc_value
                var value_html = "<span style='font-size: 70%'>" + all_map_options.tooltip.na_text + "</span>";
            }


            //set main value
            $(".tooltip_main_value", this_tooltip).html(value_html);


            this_tooltip.show(); //show just this map's tooltip

        }, function () { //mouse out

            //return to all previous fill opacity
            $("path, circle", map_display_area).attr("fill-opacity", "1");

            //hide tooltip
            $(".map_tooltip").hide();
        });

    },



    /** set up hover functionality for the map legend **/
    setUpMapLegendHover: function (map_display_area) {
        $(".map_legend_item", map_display_area).hover(function () {
                var this_color = $(this).children(".map_legend_color").css("background-color");
                $(".map_legend_text", this).css("color", "#B73438"); //make text red

                //lower opacity on other areas
                $("path, circle", map_display_area).each(function () {
                    if ($(this).attr("fill") !== this_color && $(this).attr("stroke") !== this_color) {
                        $(this).attr("fill-opacity", ".1").attr("stroke-opacity", ".02");
                    }
                });

            },
            function () {

                //bring back opacity
                $("path, circle", map_display_area).each(function () {
                    $(this).attr("fill-opacity", "1").attr("stroke-opacity", "1");
                });

                $(".map_legend_text", this).css("color", "#000"); //make text black

            });
    },





    /** Set up state links to eag page if applicable **/

    setUpMapStateLinks: function (map_display_area) {

        $("path[loc_name], circle[loc_name]", map_display_area).each(function () {
            var thisID = $(this).attr("id");
            if (thisID) {
                $(this).css("cursor", "pointer")
                    .click(function () {
                        window.open("http://www.bls.gov/eag/eag." + thisID + ".htm", '_blank');
                    });
            }

        });

    }




};

module.exports = map_init;