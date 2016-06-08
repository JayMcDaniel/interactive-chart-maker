/** Called from map_init.convertMapOptionsToSVG if user selected animated map. 
@module
**/

var map_animation_init = {


    /** Creates and returns a div containing a slider and play and pause buttons to animated the map  **/
    getAnimationDiv: function (all_map_options) {

        //outer div
        var map_animation_div = document.createElement("div");
        map_animation_div.style = "position: relative; margin-left: 20px; z-index: 500; margin-bottom: -6px";


        //play button
        var play_button = document.createElement("div");
        play_button.style = "float: left; margin-right: 10px; color: #337ab7; font-size: 26px; cursor: pointer";
        play_button.innerHTML = "\u25B6";
        play_button.className = "map_play_button";

        //slider
        var map_slider = document.createElement("input");
        map_slider.setAttribute("type", "range");
        map_slider.setAttribute("min", "0");
        map_slider.setAttribute("max", all_map_options.animated_value_titles.length - 1);
        map_slider.setAttribute("value", "0");
        map_slider.style = "float: left; margin-right: 10px; color: #337ab7; font-size: 26px; cursor: pointer; width: 400px; position: relative; top: 10px;";
        map_slider.className = "map_slider";

        //animation title (i.e. date shown)
        var animation_title = document.createElement("h3");
        animation_title.textContent = all_map_options.animated_value_titles[0];
        animation_title.style = "margin-bottom: 0px; font-family: sans-serif; font-weight: 200; color: #337ab7; font-size: 24px; position: relative; top: 5px; float: left;";
        animation_title.className = "animation_title";


        //put it all together in the div
        map_animation_div.appendChild(play_button);
        //  map_animation_div.appendChild(pause_button);
        map_animation_div.appendChild(map_slider);
        //  map_animation_div.appendChild(clear_div);
        map_animation_div.appendChild(animation_title);



        //adjust legend placement
        $("#legend_placement_y").val(70);
        all_map_options.legend.y = 70;

        return map_animation_div;

    },



    /** sets up the play, pause, and slider functionality in animated maps **/
    setUpMapAnimation: function (all_map_options, map_display_area) {



        //when slider changes, change the values displayed in the map and the animation title
        $(".map_slider", map_display_area).on("input", function () {
            var slider_val = $(this).val();

            //update animated title
            $(".animation_title", map_display_area).text(all_map_options.animated_value_titles[slider_val]);

            //reasign map values
            $("path[loc_name], circle[loc_name]", map_display_area).each(function () {
                var $this = $(this);
                var this_animated_vals = $this.attr("animated_vals");
                var new_val = this_animated_vals ? this_animated_vals.split(";")[slider_val] : "N/A";

                $this.attr("loc_value", new_val);



                //then recolor
                if (new_val === null || new_val === "N/A") {
                    $this.attr("fill", "rgb(223, 223, 223)");
                }

                if (new_val <= all_map_options.value_ranges[0]) {
                    $this.attr("fill", all_map_options.colors[0]);

                }

                for (var i = 0; i < all_map_options.value_ranges.length; i++) { //for length of value_ranges array, assign colors
                    if (new_val > all_map_options.value_ranges[i]) {
                        $this.attr("fill", all_map_options.colors[i + 1]);
                    }
                }

            }); // end path / circle loop


        });




        var playing; //becomes playing function that moves slider value to the right

        //play function, run when play button is clicked
        var playMap = function (map_display_area) {
            var $map_slider = $(".map_slider", map_display_area);

            //assign (and start) playing interval to playing var
            playing = setInterval(function (map_display_area) {

                //increase slider value by one unless at max. If at max, make 0
                $map_slider.val($map_slider.val() === $map_slider.attr("max") ? 0 : Number($map_slider.val()) + 1).trigger("input");

            }, 500);
        }


        //pause function, run when pause button is clicked
        var pauseMap = function () {
            clearInterval(playing);
        }


        //style buttons
        $(".map_play_button", map_display_area).hover(function () {
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


    }

};


module.exports = map_animation_init;