 /** Has functions for setting up a chart animation (buttons, slider, etc)
 @namespace
 **/

var chart_animation_init = {
    
    /** Creates and returns a div containing a slider and play and pause buttons to animated the map  **/
    getAnimationDiv: function () {

        //outer div
        var chart_animation_div = document.createElement("div");
        chart_animation_div.style = "position: absolute; top: 28px; margin-left: 20px; z-index: 500; margin-bottom: -6px; -webkit-user-select: none;";


        //play button
        var play_button = document.createElement("div");
        play_button.style = "float: left; margin-right: 10px; color: #337ab7; font-size: 24px; cursor: pointer; position: relative; top: 4px;";
        play_button.innerHTML = "\u25B6";
        play_button.className = "chart_play_button";


        //slider
        var chart_slider = document.createElement("input");
        chart_slider.setAttribute("type", "range");
        chart_slider.setAttribute("min", "0");
        chart_slider.setAttribute("max", "20");
        chart_slider.setAttribute("value", "0");
        chart_slider.style = "float: left; margin-right: 10px; color: #337ab7; font-size: 18px; cursor: pointer; width: 350px; position: relative; top: 12px;";
        chart_slider.className = "chart_slider";

        //animation title (i.e. date shown)
        var animation_title = document.createElement("h3");
        animation_title.textContent = "test";
        animation_title.style = "margin: 0px; font-family: sans-serif; font-weight: 200; color: #337ab7; font-size: 18px; position: relative; top: 8px; float: left;";
        animation_title.className = "animation_title";


        //put it all together in the div
        chart_animation_div.appendChild(play_button);

        chart_animation_div.appendChild(chart_slider);
        chart_animation_div.appendChild(animation_title);



        return chart_animation_div;

    },
    
};


module.exports = chart_animation_init;