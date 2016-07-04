    var chart_animation_init = require("../initializers/charts/chart_animation_init.js");


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



        //get data for each bubble and push to and timeline.dates

        $("tbody tr", input).each(function (i, row) {
            all_chart_options.timeline.dates.push($.trim($("th:eq(0)", row).text()));


            //    get data values from each row's td cells (every third cell for xyz groups)
            all_chart_options.timeline.data.push([]);
            $("td:nth-child(3n - 1)", row).each(function (j) {
                var x = $(this).getNumber();
                var y = $(this).next().getNumber();
                var z = $(this).next().next().getNumber();
                var xyz_arr = [x, y, z];
                all_chart_options.timeline.data[i].push(xyz_arr);
            });

        });



        //for each series name in the top row of the table header make a series with a bubble for the first row in the tbody
        $("thead tr:eq(0) th:gt(0)", input).each(function (i) {
            var seriesObj = {
                name: $.trim($(this).text()),
                data: [all_chart_options.timeline.data[0][i]],
                date: all_chart_options.timeline.dates[0],
                type: chart_type,
                lineWidth: 0,
                marker: {
                    enabled: true
                },
                color: colors[i],
                _symbolIndex: i
            };
            output.series.push(seriesObj);
        });





        /** Creates and places a div containing a slider and play and pause buttons to animated the chart. Also set their functions  **/
        all_chart_options.timeline.animation = function () {


            //outer div//
            var chart_animation_div = document.createElement("div");
            chart_animation_div.style = "position: absolute; top: 28px; margin-left: 20px; z-index: 500; margin-bottom: -6px; -webkit-user-select: none;";


            //animation title (i.e. date shown)//
            var animation_title = document.createElement("h3");
            animation_title.textContent = all_chart_options.timeline.dates[0];
            animation_title.style = "margin: 0px; font-family: sans-serif; font-weight: 200; color: #337ab7; font-size: 18px; position: relative; top: 8px; float: left;";
            animation_title.className = "animation_title";



            //slider//
            var chart_slider = document.createElement("input");
            chart_slider.setAttribute("type", "range");
            chart_slider.setAttribute("min", "0");
            chart_slider.setAttribute("max", all_chart_options.timeline.dates.length - 1);
            chart_slider.setAttribute("value", "0");
            chart_slider.style = "float: left; margin-right: 10px; color: #337ab7; font-size: 18px; cursor: pointer; width: 350px; position: relative; top: 12px;";
            chart_slider.className = "chart_slider";

            //set up slider change//
            chart_slider.oninput = function () {
                var new_time_index = this.value;

                $.each(chart.series, function (i, e) {
                    e.update({
                        data: [all_chart_options.timeline.data[new_time_index][i]]
                    });
                });

                animation_title.textContent = all_chart_options.timeline.dates[new_time_index];

            };


            var playing; //becomes setTimeout function playing stepForward//

            //set step forward function//
            var stepForward = function () {

                var $chart_slider = $(chart_slider);
                $chart_slider.val() === $chart_slider.attr("max") ? $chart_slider.val(0).trigger("input") : $chart_slider.val(Number($chart_slider.val()) + 1).trigger("input");
            };


            //play button//
            var play_button = document.createElement("div");
            play_button.style = "float: left; margin-right: 10px; color: #337ab7; font-size: 24px; cursor: pointer; position: relative; top: 4px;";
            play_button.innerHTML = "\u25B6";
            play_button.className = "chart_play_button";

            //click to play//
            play_button.onclick = function () {

                if ($(this).hasClass("playing")) { //if playing, stop//
                    $(this).removeClass("playing");
                    clearInterval(playing);
                    this.innerHTML = "\u25B6";


                } else { //if stopped, start playing//
                    playing = setInterval(function () {
                        stepForward();
                    }, 500);

                    this.innerHTML = "&nbsp; ||";
                    $(this).addClass("playing");
                }
            };




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