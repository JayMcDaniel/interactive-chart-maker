var map_ranked_columns_init = require("./map_ranked_columns_init");
var map_init = require("./map_init");
var map_data_labels_init = require("./map_data_labels_init");


/** Called from map_init.convertMapOptionsToSVG if user selected animated map. 
@module
**/

var map_animation_init = {


    /** Creates and returns a div containing a slider and play and pause buttons to animated the map  **/
    getAnimationDiv: function (all_map_options) {

        //outer div
        var map_animation_div = document.createElement("div");
        $(map_animation_div).css({
            position: "absolute",
            "margin-left": "20px",
            "z-index": "500",
            "margin-bottom": "-6px",
            "-webkit-user-select": "none",
            top: "55px",
            zIndex: 500,
        });


        //play button
        var play_button = document.createElement("div");
        $(play_button).css({
                float: "left",
                "margin-right": "10px",
                color: "#337ab7",
                "font-size": "32px",
                cursor: "pointer",
                position: "relative",
                top: "-6px"
            })
            .html("\u25B6")
            .addClass("map_play_button");


        //step backward button
        var step_backward_button = document.createElement("div");
        $(step_backward_button).css({
                float: "left",
                "margin-right": "10px",
                color: "#337ab7",
                "font-size": "26px",
                cursor: "pointer",
                position: "relative",
                top: "-5px"
            })
            .html("&lt")
            .addClass("map_step_backward_button");

        //step forward button
        var step_forward_button = document.createElement("div");
        $(step_forward_button).css({
                float: "left",
                "margin-right": "10px",
                "margin-left": "-2px",
                color: "#337ab7",
                "font-size": "26px",
                cursor: "pointer",
                position: "relative",
                top: "-5px"
            })
            .html("&gt")
            .addClass("map_step_forward_button");


        //slider
        var map_slider = document.createElement("input");
        $(map_slider).attr({
                "type": "range",
                "min": "0",
                "max": all_map_options.animated_value_titles.length - 1,
                "value": all_map_options.animation_start_at_end ? all_map_options.animated_value_titles.length - 1 : 0
            })
            .css({
                float: "left",
                "margin-right": "10px",
                color: "#337ab7",
                "font-size": "26px",
                cursor: "pointer",
                width: all_map_options.sized_for_spotlight ? "310px" : "400px",
                position: "relative",
                top: "10px"
            })
            .addClass("map_slider")



        //animation title (i.e. date shown)
        var animation_title = document.createElement("span");
        $(animation_title).text(all_map_options.animated_value_titles[0])
            .css({
                margin: "0px",
                "font-family": "sans-serif",
                "font-weight": "200",
                color: "#337ab7",
                "font-size": "24px",
                position: "relative",
                top: "5px",
                float: "left"
            })
            .addClass("animation_title");


        //put it all together in the div
        $(map_animation_div).append(play_button, step_backward_button, step_forward_button, map_slider, animation_title);


        //adjust legend placement
        //        $("#legend_placement_y").val(70);
        //        all_map_options.legend.y = 70;

        return map_animation_div;

    },



    /** sets up the play, pause, and slider functionality in animated maps **/
    setUpMapAnimation: function (all_map_options, map_display_area) {
        //when slider changes, change the values displayed in the map and the animation title
        $(".map_slider", map_display_area).on("input", function () {
            var slider_val = all_map_options.animation_index = $(this).val();

            //update animated title
            $(".animation_title", map_display_area).text(all_map_options.animated_value_titles[slider_val]);

            //reasign map values
            $("path[loc_name], circle[loc_name]", map_display_area).each(function () {
                var $this = $(this);
                var this_animated_vals = $this.attr("animated_vals");
                var new_val = this_animated_vals ? this_animated_vals.split(";")[slider_val] : "N/A";

                //assign new loc_value
                $this.attr("loc_value", new_val);

                var new_fill = ""; //new color to be assigned

                //then recolor
                for (var i = 0; i < all_map_options.value_ranges.length; i++) { //for length of value_ranges array, assign colors
                    if (new_val > all_map_options.value_ranges[i]) {
                        new_fill = all_map_options.colors[i + 1];
                    }
                }

                if (new_val <= all_map_options.value_ranges[0]) {
                    new_fill = all_map_options.colors[0];
                }

                if (new_val === null || new_val === "N/A" || new_val === "") {
                    new_fill = "#f7f7f7";
                }


                //if a circle, resize and give opacity

                if ($this.attr("r") && all_map_options.map_type !== "state") {

                    var circle_sized_by = all_map_options.circle_sized_by;
                    var this_area;
                    var this_r;


                    if (new_val == "N/A") {
                        this_r = 0;

                    } else if (circle_sized_by === "main_values") {
                        this_area = new_val ? Math.abs(new_val) || 0 : 0;

                    } else if (circle_sized_by === "extra_data_1") {
                        this_area = this_area = this.extra_vals[0] ? Math.abs(this.extra_vals[0]) || 0 : 0;

                    } else if (circle_sized_by === "same_size") {
                        this_area = 400;
                    }


                    this_r = Math.sqrt(this_area / Math.PI) * all_map_options.circle_size_multiple;

                    if (isNaN(this_r)) {
                        this_r = 0;
                    }


                    $this.attr("r", this_r);


                    $this.attr("fill", new_fill.replace(')', ', 0.75)').replace('rgb', 'rgba'));
                } else { //for paths, no resize or opacity
                    $this.attr("fill", new_fill);
                }


            }); // end path / circle loop


            //update tooltip
            var tooltip = all_map_options.tooltip;
            var loc_value = $("path[loc_name='" + tooltip.current_loc_name + "'], circle[loc_name='" + tooltip.current_loc_name + "']", map_display_area).attr("loc_value");

            if (!all_map_options.is_colored_by_names) { //if colored by values
                loc_value = $(Number(loc_value)).addCommas(tooltip.decimals || "");
            }

            var value_html = "<span style='font-size: 80%'>" + tooltip.prepend_to_value + tooltip.dollar_sign + "</span>" + loc_value + "<span style='font-size: 80%'>" + tooltip.percent_sign + "</span>";

            $(".tooltip_main_value", map_display_area).html(value_html);


            //add ranked columns if applicable
            $("#ranked_column_div", map_display_area).remove();
            var ranked_columns_div = all_map_options.add_ranked_columns && all_map_options.map_type == "state" ? map_ranked_columns_init.getRankedColumns(all_map_options) : undefined;
            $(".map_outer_div", map_display_area).append(ranked_columns_div);



            //update map labels if applicable
            if (all_map_options.has_data_labels && all_map_options.map_type == "state") {
                map_data_labels_init.addDataLabels(all_map_options, map_display_area);
            }

        }); //end .map_slider trigger




        var playing; //becomes playing function that moves slider value to the right

        //move the slider a step in a direction. if at max, make 0
        var moveSlider = function (num) {
            var $map_slider = $(".map_slider", map_display_area);

            $map_slider.val($map_slider.val() === $map_slider.attr("max") ? 0 : Number($map_slider.val()) + num).trigger("input");
        }

        //play function, run when play button is clicked
        var playMap = function (map_display_area) {
            //assign (and start) playing interval to playing var
            playing = setInterval(function (map_display_area) {
                //increase slider value by one unless at max. If at max, make 0
                moveSlider(1);
            }, all_map_options.animation_delay);
        }


        //pause function, run when pause button is clicked
        var pauseMap = function () {
            clearInterval(playing);
        }


        //style buttons
        $(".map_play_button, .map_step_backward_button, .map_step_forward_button", map_display_area).hover(function () {
            $(this).css("color", "#b73438"); //red
        }, function () {
            $(this).css("color", "#337ab7"); //blue

        });


        //play / pause button click
        $(".map_play_button", map_display_area).click(function () {
            var $this = $(this);

            $this.toggleClass("playing");

            if ($this.hasClass("playing")) { //if user clicked it to play, start animation, and show pause button
                $this.html("&nbsp;||");

                playMap(map_display_area);

            } else { //if user click it to pause, show play button and stop animation
                $this.html("\u25B6");

                pauseMap(map_display_area);
            }

        });

        //step forward button click
        $(".map_step_forward_button", map_display_area).click(function () {
            moveSlider(1);
        });

        //step back button click
        $(".map_step_backward_button", map_display_area).click(function () {
            moveSlider(-1);
        });

        $(".map_slider").trigger("input"); //called at the end of this setUpMapAnimation function

    }

};


module.exports = map_animation_init;