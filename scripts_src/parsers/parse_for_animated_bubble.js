    var chart_animation_init = require("../initializers/charts/chart_animation_init.js");
    var utils_main = require("../utils/utils_main.js");

    /** 
     * Parsing function for animated bubble charts
     * @module
     * @param input {element} input jquery table element retrieved from textarea
     * @param chart_type {string} type of chart (line, bar etc.)
     * @returns {object} Object with chart title, X-axis categories and series array of objects
     */
    var parseForAnimatedBubble = function (input, chart_type, colors, chart, all_chart_options) {
        var output = {}; //obj that gets returned
        output.x_axis_categories = undefined; //resets this in case there were previous categories

        //set up array of data arrays to be used in the timeline. this data[time] will replace data in the initial series array when it's animated
        all_chart_options.timeline = {};
        all_chart_options.timeline.data = [];
        all_chart_options.timeline.dates = []; //e.g. years - to be populated by each row header.
        output.series = []; //initial series array - gets a seriesObj for each series

        //reset mins and maxes (used for placing invisible min and max sized bubbles so other bubbles aren't resized when animated)
        utils_main.limits.resetMax();


        //get data for each bubble and push to and timeline.dates

        $("tbody tr", input).each(function (i, row) {
            all_chart_options.timeline.dates.push($.trim($("th:eq(0)", row).text()));


            //    get data values from each row's td cells (every third cell for xyz groups)
            all_chart_options.timeline.data.push([]);
            $("td:nth-child(3n - 1)", row).each(function (j) {
                var x = $(this).getNumber();
                var y = $(this).next().getNumber();
                var z = $(this).next().next().getNumber();

                //get min and max bubble sizes to use later for invisible bubbles.
                utils_main.limits.setMax(z);
                utils_main.limits.setMin(z);

                var xyz_arr = [x, y, z];

                all_chart_options.timeline.data[i].push(xyz_arr);
            });

        });




        //for each series name in the top row of the table header make a series with a bubble for the first row in the tbody
        $("thead tr:eq(0) th:gt(0)", input).each(function (i) {
            var series_obj = {
                name: $.trim($(this).text()),
                data: [all_chart_options.timeline.data[0][i]],
                date: all_chart_options.timeline.dates[0],
                type: chart_type,
                lineWidth: 0,
                marker: {
                    enabled: true
                },
                color: colors[i],
                _symbolIndex: 0
            };
            output.series.push(series_obj);
        });



        //put in the invisible placeholder series that are based on the min/max values - this way bubbles resize against a constant

        //put min and max arrays in
        for (var i = 0, len = all_chart_options.timeline.data.length; i < len; i++) {
            all_chart_options.timeline.data[i].unshift([0, 0, utils_main.limits.getMin()], [0, 0, utils_main.limits.getMax()]);
        }


        var min_size_placeholder = {
            name: "invisible min size placeholder series",
            data: [all_chart_options.timeline.data[0][0]],
            date: all_chart_options.timeline.dates[0],
            type: chart_type,
            lineWidth: 0,
            marker: {
                enabled: false
            },
            color: "none",
            showInLegend: false,
            zIndex: -1
        };



        var max_size_placeholder = $.extend({}, min_size_placeholder, {
            name: "invisible max size placeholder series",
            data: [all_chart_options.timeline.data[0][1]]
        });

        output.series.unshift(min_size_placeholder, max_size_placeholder);




        /** Creates and places a div containing a slider and play and pause buttons to animated the chart. Also set their functions  **/
        all_chart_options.timeline.animation = function () {

            //outer div//
            var chart_animation_div = document.createElement("div");
            $(chart_animation_div).css({
                    position: "absolute",
                    top: "33px",
                    "margin-left": "20px",
                    "z-index": "500",
                    "margin-bottom": "-6px",
                    "-webkit-user-select": "none"
                })
                .addClass("chart_animation_div");


            //animation title (i.e. date shown)//
            var animation_title = document.createElement("h3");

            $(animation_title).text(all_chart_options.timeline.dates[0])
                .css({
                    margin: "0px",
                    "font-family": "sans-serif",
                    "font-weight": "200",
                    color: "#337ab7",
                    "font-size": "20px",
                    position: "relative",
                    top: "10px",
                    float: "left"
                })
                .addClass("animation_title");



            //slider//
            var chart_slider = document.createElement("input");

            $(chart_slider).attr({
                    type: "range",
                    min: "0",
                    max: all_chart_options.timeline.dates.length - 1,
                    value: "0",
                    class: "chart_slider"
                })
                .css({
                    float: "left",
                    "margin-right": "10px",
                    color: "#337ab7",
                    "font-size": "18px",
                    cursor: "pointer",
                    width: "350px",
                    position: "relative",
                    top: "15px"
                })
                .on("input change", function () {

                    chart.tooltip.hide(0);

                    var new_time_index = this.value;

                    $.each(chart.series, function (i, e) {
                        e.update({
                            data: [all_chart_options.timeline.data[new_time_index][i]]
                        });
                    });

                    animation_title.textContent = all_chart_options.timeline.dates[new_time_index];


                });






            var playing; //becomes setTimeout function playing stepForward//

            //set step forward function//
            var stepForward = function () {

                var $chart_slider = $(chart_slider);
                $chart_slider.val() === $chart_slider.attr("max") ? $chart_slider.val(0).trigger("input") : $chart_slider.val(Number($chart_slider.val()) + 1).trigger("input");
            };


            //play button//
            var play_button = document.createElement("div");

            $(play_button).css({
                    float: "left",
                    "margin-right": "10px",
                    color: "#337ab7",
                    "font-size": "24px",
                    cursor: "pointer",
                    position: "relative",
                    top: "4px"
                })
                .html("\u25B6")
                .addClass("chart_play_button")
                .click(function () {

                    if ($(this).hasClass("playing")) { //if playing, stop//
                        $(this).removeClass("playing").html("\u25B6");
                        clearInterval(playing);
                    } else { //if stopped, start playing//
                        playing = setInterval(function () {
                            stepForward();
                        }, 500);

                        $(this).addClass("playing").html("&nbsp; ||");
                    }
                });




            //put it all together in the div//
            chart_animation_div.appendChild(play_button);
            chart_animation_div.appendChild(chart_slider);
            chart_animation_div.appendChild(animation_title);

            var chart_id = "#" + all_chart_options.chart.renderTo;
            setTimeout(function () {
                $(chart_id).prepend(chart_animation_div);
            }, 100);

        };
        all_chart_options.timeline.animation();



        return output;
    };

    module.exports = parseForAnimatedBubble;