var utils_forms = require("../../utils/utils_forms.js");
var parseForMap = require("../../parsers/parse_for_map.js");
var map_animation_init = require("./map_animation_init.js");
var map_colors_init = require("./map_colors_init.js");
var map_title_init = require("./map_title_init.js");
var map_subtitle_init = require("./map_subtitle_init.js");
var map_tooltip_init = require("./map_tooltip_init.js");
var map_legend_init = require("./map_legend_init");
var map_ranked_columns_init = require("./map_ranked_columns_init");
var map_data_labels_init = require("./map_data_labels_init");
var map_credits_init = require("./map_credits_init.js");
var map_circle_sizes_init = require("./map_circle_sizes_init.js");
var update_map_individual_series = require("../../form_updates/update_map_individual_series.js");
var update_template = require("../../form_updates/update_template.js");
var areas_colored_report = require("../../utils/areas_colored_report.js");
var is_checked = utils_forms.getCheckBoxValue;

/**
Map initialization object
@namespace
**/

var map_init = {

  /** creates / sets all map options, the main object that the map svg is made from **/
  createAllMapOptions: function(all_map_options, areas, map_type) {


    console.log(Number("width", $("#legend_width_input").val()));
    //setup empty all_map_options
    all_map_options = {
      render_ID: update_template.changeID($("#chart_id_textinput").val(), null, all_map_options),
      title: {},
      subtitle: {},
      colors: [],
      circle_size_multiple: 1,
      circle_sized_by: $("#map_circle_size_by_select").val(),
      is_animated: is_checked($("#map_animated_checkbox")),
      is_colored_by_names: is_checked($("#map_color_by_names_checkbox")),
      add_ranked_columns: is_checked($("#map_add_ranked_columns_checkbox")),
      has_data_labels: is_checked($("#map_add_state_labels_checkbox")),
      animation_delay: Number($("#map_animation_speed_range").val()),
      animation_index: 0,
      animation_start_at_end: is_checked($("#map_animated_start_at_last_date_checkbox")),
      legend: {
        decimals: $("#map_legend_decimals_select").val(),
        enabled: is_checked($("#map_legend_enabled_checkbox")),
        reversed: is_checked($("#legend_reverse_layout_checkbox")),
        alphabetized: is_checked($("#legend_alphabetical_layout_checkbox")),
        x: Number($("#legend_placement_x").val()),
        y: Number($("#legend_placement_y").val()),
        item_width: Number($("#legend_item_width_input").val()) == 0 ? 220 : Number($("#legend_item_width_input").val()),
        legend_width: Number($("#legend_width_input").val()) == 0 ? 220 : Number($("#legend_width_input").val())
      },
      map_type: map_type,
      viewbox: "",
      sized_for_spotlight: $("#map_spotlight_size_checkbox").is(":checked"),
      ranges_amount: $(".map_color_palette_row.selected .map_color_palette_cell").length,
      value_ranges: [],
      credits: {},
      tooltip: {
        current_loc_name: null,
        dollar_sign: "",
        percent_sign: "",
        prepend_to_value: "",
        decimals: "",
        na_text: "",
        value_font_size: $("#map_tooltip_main_value_font_size_input").val() + "px",

      },
      extra_value_titles: [],
      animated_value_titles: [],
      areas: areas

    };


    //set viewbox
    console.log("setting viewbox");
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
      case "region":
        all_map_options.viewbox = "180 0 620 620";
        break;
      case "division":
        all_map_options.viewbox = "180 0 620 620";
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

    //hide / enable areas
    all_map_options.areas = map_init.setHiddenAreas(all_map_options);




    ////// assign values to all_map_options.areas based on table input ////

    parseForMap(all_map_options, table_input);


    var colors = map_colors_init.newColorArray($(".map_color_palette_row.selected"), all_map_options); //gets array of colors depending on what is selected


    map_colors_init.getBoundaryMapColors(all_map_options, colors); //mods all_map_options.areas to include fill colors depending on values

    //get circle sizes for circle type maps
    if (map_type === "metro_area") {
      map_circle_sizes_init.getCircleSizes(all_map_options); //decides what radius map circle elements will have, depending on their value

    }

    return all_map_options;


  },







  /** converts all_map_options (actually an array of objects by now after the .get() auto conversion) to svg and puts it on page **/
  convertMapOptionsToSVG: function(all_map_options) {
    var map_display_area = $("#" + all_map_options.render_ID + ".map_display_area");
    map_display_area.empty();

    var map_outer_div = map_init.getMapOuterDiv(all_map_options); //creates and returns outer map div

    var map_outer_svg = map_init.getMapOuterSVG(all_map_options); //creates and returns empty map svg tag

    map_init.populateSVGAreas(all_map_options, map_outer_svg); //colorizes paths, sets circle attributes, appends g elements to svg

    var map_title = map_title_init.getMapTitle(all_map_options.title); //creates and returns a styled map h2 title with text
    var map_subtitle = map_subtitle_init.getMapSubtitle(all_map_options.subtitle) || undefined; //creates and returns a styled map h3 title with text
    var map_credits = map_credits_init.getMapCredits(all_map_options.credits); //creates and returns a styled map div credits with text

    var tooltip_div = map_tooltip_init.getMapTooltip(all_map_options); //creates and returns an empty tooltip div template

    //put elements together
    $(map_outer_div).append(tooltip_div, map_title, map_subtitle); //tooltip


    // if it's animated, make and add the slider
    if (all_map_options.is_animated) {
      var map_animation_div = map_animation_init.getAnimationDiv(all_map_options);
      map_outer_div.appendChild(map_animation_div);
    }


    var map_legend = all_map_options.legend.enabled ? map_legend_init.getMapLegend(all_map_options) : undefined; //creates and returns a styled map div legend with color boxes and text


    //add ranked columns if applicable
    var ranked_columns_div = all_map_options.add_ranked_columns && all_map_options.map_type == "state" ? map_ranked_columns_init.getRankedColumns(all_map_options, map_display_area) : undefined;


    //put more together
    $(map_outer_div).append(map_outer_svg, map_legend, ranked_columns_div, map_credits);


    map_display_area.append($(map_outer_div)); //put map on page


    //add state data labels if applicable
    if (all_map_options.has_data_labels && all_map_options.map_type == "state") {
      map_data_labels_init.addDataLabels(all_map_options, map_display_area);
    }



    //reverse legend if needed
    if (all_map_options.legend.reversed) {
      var map_legend_div = $("#" + all_map_options.render_ID + " .map_legend_div");
      $(map_legend_div).children().each(function(i, div) {
        map_legend_div.prepend(div)
      });
    }

    return map_display_area;

  },





  /** creates and returns an empty map outer div. This will hold the map svg, tooltip box, legend, title, etc. **/

  getMapOuterDiv: function(all_map_options) {

    var div = document.createElement("div");

    $(div).css({
        position: "relative",
        width: all_map_options.sized_for_spotlight ? "595px" : "99%",
        "min-height": all_map_options.sized_for_spotlight ? "530px" : "96%",
        "text-align": "left",
        margin: "auto",
        "background-color": "#FFFFFF"
      })
      .addClass("map_outer_div");

    return div;
  },




  /** creates and returns an empty map svg element **/
  getMapOuterSVG: function(all_map_options) {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $(svg).css({
      "z-index": "400",
      position: "absolute",
      left: "13px",
      top: all_map_options.is_animated ? "93px" : "45px",
      "background-color": "#fff",
      "height": all_map_options.sized_for_spotlight ? "382px" : "450px",
      "width": all_map_options.sized_for_spotlight ? "578px" : "680px"


    });

    svg.setAttribute("class", "map_svg");
    svg.setAttribute("viewBox", all_map_options.viewbox);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    return svg;
  },







  /** ******* Initial Function (called from map icon click or other map updates) - calls functions to loads the map json, convert it to svg, loads options and displays map in .map_display_area******  **/
  loadNewMap: function(chart, all_chart_options, all_map_options, repopulate_form) {

    //show loading icon
    $("#chart_loading_icon").removeClass("invisible");

    $(".map_play_button.playing").click(); //if animated map is playing, stop it - prevents errors

    var navigation_setup = require("../../navigation_setup.js");

    var map_type = $("#map_type_select").val();

    var filename = "json/maps/" + map_type + "_map.json";



    $.get(filename, function(areas) {


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

      //init legend clicking for metro maps only
      if (all_map_options.map_type === "metro_area") {
        map_init.setUpMapLegendClick(map_display_area);
      } else {
        //init state links to eag pages
        //   map_init.setUpMapStateLinks(map_display_area);
      }

      //init animation functionality if applicable
      if (all_map_options.is_animated) {
        map_animation_init.setUpMapAnimation(all_map_options, map_display_area);
      }


      //init individual series range setup
      if (repopulate_form) {
        setTimeout(function() {
          update_map_individual_series.populateForm(chart, all_chart_options, all_map_options);
        }, 1000)

      }

      //reinit navigation get code button click so that load chart code button will work
      navigation_setup.getCodeButtonClick(chart, all_chart_options, all_map_options);

      //generate areas colored report
      areas_colored_report.generateReport(all_map_options);

    });

  },









  /** resizes chart_display_area by changing input values and triggering keyup **/
  resizeMap: function(all_map_options) {

    var current_width = $("#chart_width_textinput").val();
    var current_height = $("#chart_height_textinput").val();

    if (all_map_options.sized_for_spotlight) {
      var new_width = 615;
      var new_height = 590;
    } else {
      var new_width = 710 > current_width ? 710 : current_width;
      var new_height = 650 > current_height ? 650 : current_height;
    }

    if (new_width != current_width) {
      $("#chart_width_textinput").val(new_width).keyup();
    }

    if (new_height != current_height) {
      $("#chart_height_textinput").val(new_height).keyup();
    }

  },


  /** sets hidden areas i.e. Puerto Rico and VI **/

  setHiddenAreas: function(all_map_options) {

    var hidden_areas = [];

    $("#map_include_puerto_rico_checkbox, #map_include_virgin_islands_checkbox").each(function() {
      if (!is_checked($(this))) {
        hidden_areas.push($(this).val());
      }
    });

    $.each(all_map_options.areas, function(i, e) {
      if (hidden_areas.indexOf(this.id || this.class) > -1) {
        this.enabled = false;
      } else {
        this.enabled = true;
      }
    });

    return all_map_options.areas;
  },



  /** populates map svg (creates paths and circles) with options from all_map_options.areas. Called from convertMapOptionsToSVG() **/

  populateSVGAreas: function(all_map_options, map_outer_svg) {

    var status_bar = $("#status_bar");

    $.each(all_map_options.areas, function() {

      var g = document.createElementNS("http://www.w3.org/2000/svg", "g");

      if (this.enabled) { //not hidden

        if (this.d) { //path outline

          var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
          el.setAttributeNS(null, "d", this.d); //sets path outline

          //set stroke (lighter for county maps)
          var new_stroke = all_map_options.map_type === "county" ? "rgba(179, 179, 179, .5)" : "#646464";
          if (this.id === "state_borders") {
            new_stroke = "rgb(107, 107, 107)";
          }
          el.setAttributeNS(null, "stroke", new_stroke); //set path stroke


          if (all_map_options.map_type === "metro_area" && this.id != "PR") {
            //transform smaller for metro area maps
            el.setAttributeNS(null, "transform", "scale(0.8) translate(0, 5.471371609992666)");
            el.setAttributeNS(null, "fill", this.color || "#f7f7f7"); //light gray if NA val
          }

          //move Puerto Rico's position
          if (all_map_options.map_type === "state" && this.id === "PR") {
            el.setAttributeNS(null, "transform", "scale(0.8) translate(390, 250)");
          } else if (all_map_options.map_type === "county" && this.class === "PR") {
            el.setAttributeNS(null, "transform", "translate(140, 40)");
          }


          //if it's a named area, set values and color
          if (this.loc_name) {
            el.setAttributeNS(null, "loc_value", this.value);
            el.setAttributeNS(null, "fill", this.color || "#f7f7f7"); //light gray if NA val
            el.setAttribute("loc_name", this.loc_name);

          }

          //if it has a region, set it on the svg path
          if (this.region) {
            el.setAttributeNS(null, "region", this.region);
          }

          //if it has a division, set it on the svg path
          if (this.division) {
            el.setAttributeNS(null, "division", this.division);
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
          el.setAttributeNS(null, "stroke", this.color ? "rgba(67, 67, 72, .8)" : "#337ab7"); //stroke

          if (all_map_options.map_type === "metro_area") {
            el.setAttributeNS(null, "fill", this.color ? this.color.replace(')', ', 0.75)').replace('rgb', 'rgba') : "#337ab7"); //fill
          } else {
            el.setAttributeNS(null, "fill", this.color || "#f7f7f7"); //fill

          }


          if (this.loc_name) { //if it's a named area, set value and color
            el.setAttributeNS(null, "loc_value", this.value || null);
            el.setAttribute("loc_name", this.loc_name);
          }

        }



        if (this.style) {
          el.setAttribute("style", this.style || null);
        }

        el.setAttribute("class", this.class);
        this.extra_vals ? el.setAttributeNS(null, "extra_vals", this.extra_vals.join(";")) : null;
        this.animated_vals ? el.setAttributeNS(null, "animated_vals", this.animated_vals.join(";")) : null;

        if (this.id) {
          el.setAttribute("id", this.id);
        }

        //add status textbox
        status_bar.text("Coloring" + this.loc_name);

        //add path (or circle element)
        g.appendChild(el);
        map_outer_svg.appendChild(g);

        //hide loading icon
        $("#chart_loading_icon").addClass("invisible");
      }
    });

  },





  /** sets up hover functionality for the map **/
  setUpMapHover: function(all_map_options, map_display_area) {

    var map = all_map_options;

    //other areas fade out when an area is hovered
    $("path[loc_name], circle[loc_name]", map_display_area).not("#state_borders").hover(function(event) {


      var $this = $(this);

      //set current loc name - to be used if tooltip needs to be updated without disapearing (animated maps)
      all_map_options.tooltip.current_loc_name = $this.attr("loc_name");

      //gray out other states, highlight this one

      var opacity = ["state", "region", "division"].indexOf(map.map_type) > -1 ? ".1" : ".35";
      $("path, circle", map_display_area).attr("fill-opacity", opacity);
      $this.attr("fill-opacity", "1");

      //hide labels
      $(".state_data_label", map_display_area).hide();


      //highlight other states if a region or division map

      var is_region = ["region", "division"].indexOf(map.map_type);
      if (is_region > -1) {
        var region_type = ["region", "division"][is_region];
        var region_name = $this.attr(region_type);
        $("path[" + region_type + "='" + region_name + "']", map_display_area).attr("fill-opacity", "1");

      }


      // populate tooltip
      var this_tooltip = $(".map_tooltip", map_display_area); //get element

      var tooltip_title;
      if (map.map_type === "division") {
        tooltip_title = $this.attr("division");
      } else if (map.map_type === "region") {
        tooltip_title = $this.attr("region");
      } else {
        tooltip_title = $this.attr("loc_name") || ""
      }

      //set title
      $(".tooltip_title", this_tooltip).text(tooltip_title);

      //add main value to tooltip if applicable
      var this_loc_value = $this.attr("loc_value"); //get main value

      if (["null", "", "undefined"].indexOf(this_loc_value) < 0) {

        if (!map.is_colored_by_names) { //if colored by values
          this_loc_value = $(Number(this_loc_value)).addCommas(map.tooltip.decimals || "");
        }

        var value_html = "<span style='font-size: 80%'>" + map.tooltip.prepend_to_value + map.tooltip.dollar_sign + "</span>" + this_loc_value + "<span style='font-size: 80%'>" + map.tooltip.percent_sign + "</span>";


        //add extra values to tooltip if applicable, and not animated
        if (!map.is_animated) {

          var this_extra_vals = $this.attr("extra_vals"); //get extra values (if applicable)
          if (this_extra_vals) {
            this_extra_vals = this_extra_vals.split(";");
            $.each(this_extra_vals, function(i) {
              value_html = value_html + "<p style='font-size: 14px; line-height: 1.1; margin: 2px 0px 2px 0px;'><span style='color: black'>" + map.extra_value_titles[i] + ": </span>" + this_extra_vals[i] + "</p>";
            });

          }
        }


      } else { //if no loc_value
        var value_html = "<span style='font-size: 70%'>" + map.tooltip.na_text + "</span>";
      }


      //set main value
      $(".tooltip_main_value", this_tooltip).html(value_html);


      //get mouse position to setup tooltip position
      var parentOffset = $this.parent().parent().offset();
      var relX = event.pageX - parentOffset.left;
      var left_position = relX > 340 ? "10px" : "353px";

      this_tooltip.css("left", left_position).show(); //show just this map's tooltip



      //highlight ranked column if enabled

      if (all_map_options.add_ranked_columns) {
        var column = $("#" + all_map_options.render_ID + " .map_ranked_column[rel='" + $(this).attr('id') + "']");
        column.css("background-color", "#FFEB00");
      }


    }, function() { //mouse out

      //return to all previous fill opacity
      $("path, circle", map_display_area).attr("fill-opacity", "1");

      //hide tooltip
      $(".map_tooltip").hide();

      //show labels
      $(".state_data_label", map_display_area).show();

      all_map_options.tooltip.current_loc_name = null;

      //dehighlight ranked column if enabled

      if (all_map_options.add_ranked_columns) {
        var column = $("#" + all_map_options.render_ID + " .map_ranked_column[rel='" + $(this).attr('id') + "']");
        column.css("background-color", column.attr("previous_color"));
      }
    });

  },





  /** set up hover functionality for the map legend **/
  setUpMapLegendHover: function(map_display_area) {
    $(".map_legend_item", map_display_area).hover(function(event) {

        var this_color = $(this).children(".map_legend_color").css("background-color");
        $(".map_legend_text", this).css("color", "#B73438"); //make text red


        //lower opacity on other areas (paths)
        $("path", map_display_area).each(function() {
          var this_fill = $(this).attr("fill");
          if (this_fill !== this_color) {
            $(this).attr("fill-opacity", ".1");
          }
        });
        //lower opacity on other areas (circles)
        $("circle", map_display_area).each(function() {
          var this_fill = $(this).attr("fill");
          if (this_fill.replace(', 0.75)', ')').replace('rgba', 'rgb') !== this_color) {
            $(this).attr("fill-opacity", ".1").attr("stroke-opacity", ".02");
          }
        });

      },
      function() {

        //bring back opacity
        $("path, circle", map_display_area).each(function() {
          $(this).attr("fill-opacity", "1").attr("stroke-opacity", "1");
        });

        $(".map_legend_text", this).css("color", "#000"); //make text black

      });
  },


  /** set up click functionality for the map legend (just for metro area for now**/
  setUpMapLegendClick: function setUpMapLegendClick(map_display_area) {
    $(".map_legend_item", map_display_area).css("cursor", "pointer")
      .addClass("showing")
      .click(function() {
        var this_color = $(".map_legend_color", $(this)).css("background-color").replace("rgb", "rgba").replace(")", ", 0.75)");
        var is_showing = $(this).hasClass("showing");

        if (is_showing) {
          $(this).removeClass("showing");
          $(".map_legend_color", $(this)).css("visibility", "hidden");
          $("circle", map_display_area).each(function(i, e) {
            var area_color = $(e).attr("fill");
            if (this_color === area_color) {
              $(e).hide();
            }
          });

        } else {
          $(this).addClass("showing");
          $(".map_legend_color", $(this)).css("visibility", "visible");
          $("circle", map_display_area).each(function(i, e) {
            var area_color = $(e).attr("fill");
            if (this_color === area_color) {
              $(e).show();
            }
          });
        }

      });
  },



  /** Set up state links to eag page if applicable **/

  setUpMapStateLinks: function(map_display_area) {

    $("path[loc_name], circle[loc_name]", map_display_area).each(function() {
      var thisID = $(this).attr("id");
      if (thisID) {
        $(this).css("cursor", "pointer")
          .click(function() {
            window.open("http://www.bls.gov/eag/eag." + thisID + ".htm", '_blank');
          });
      }

    });

  }

};

module.exports = map_init;
