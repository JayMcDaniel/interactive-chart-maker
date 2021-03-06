var utils_main = require("../utils/utils_main.js");
var utils_forms = require("../utils/utils_forms.js");
var keyboard_inputs = require("../keyboard_inputs.js");
var update_y_axis = require("./update_y_axis.js");

/** methods for updating individual series options in  #display_series_options - called when its side nav tab is selected in navigation_setup.
@module
@param chart {object} the main chart object, built when chart is loaded
@param all_chart_options {object} the main chart options that load into building of the chart and are turned to string for the output
**/



var update_individual_series = {


    /** updates all the extra data titles and values. Called from  seriesExtraDataChange()**/
    updateExtraData: function (chart, all_chart_options) {

        $(".series_snippet").each(function (i) {

            chart.series[i].extra_data = [];
            all_chart_options.series[i].extra_data = [];

            var $series_snippet = $(this);


            //push names
            $(".series_extra_data_title_textarea", $series_snippet).each(function (j) {
                var extra_data_obj = {};

                extra_data_obj.name = $(this).val();

                //push values
                $(".series_extra_data_values_textarea:eq(" + j + ")", $series_snippet).each(function (k) {

                    extra_data_obj.values = $(this).val().split("\n");
                });


                chart.series[i].extra_data.push(extra_data_obj);
                all_chart_options.series[i].extra_data.push(extra_data_obj);

            });

        });

    },




    /** called when changes are made to the series extra data text areas and plus and minus buttons **/
    seriesExtraDataChange: function (chart, all_chart_options) {

        //bind keyboard listeners so they aren't triggered inside of new text boxes
        keyboard_inputs.initListeners();

        //always hide the first minus sign for each series. Show the rest
        $(".series_extra_data_div:gt(0) .series_subtract_extra_data_button", $(".series_snippet")).show();

        //when plus buttons are clicked, duplicate the extra data entry boxes
        $(".series_add_extra_data_button").unbind().click(function () {
            var $extra_data_div = $(this).parents(".series_extra_data_div");

            $extra_data_div.clone().hide().insertAfter($extra_data_div).fadeIn().children().val("");
            //rebind extra data changes
            update_individual_series.seriesExtraDataChange(chart, all_chart_options);
        });

        //when minius buttons are clicked, remove the extra data entry boxes
        $(".series_subtract_extra_data_button").unbind().click(function () {
            $(this).parents(".series_extra_data_div").fadeOut(300, function () {
                $(this).remove();
            });
        });


        //when extra data title text areas are changed
        $(".series_extra_data_title_textarea, .series_extra_data_values_textarea").unbind('input propertychange').bind('input propertychange', function () {
            update_individual_series.updateExtraData(chart, all_chart_options);
        });

    },




    /** called when the series type icons are clicked. Binded at the end of populateForm **/
    seriesTypeIconChange: function (chart, all_chart_options) {

        $(".series_type_icon").click(function () {
            //update series type
            var i = $(this).parents(".series_snippet").index();
            var type = $(this).attr("type");
            var marker,
                lineWidth,
                zIndex;


            //if scatter chosen, make it a line chart with markers but no line

            if (type === "scatter") {
                lineWidth = 0;
                zIndex = 500;
                marker = {
                    enabled: true,
                    symbol: "circle"
                };


            } else { //not scatter

                zIndex = type === "column" ? -1 : i;
                marker = {
                    enabled: false
                };
                lineWidth = type === "line" ? 1 : 0;

            }


            chart.series[i].update({
                type: type,
                lineWidth: lineWidth,
                zIndex: zIndex,
                marker: marker
            });

            //update all_chart_options
            all_chart_options.series[i].type = type;
            all_chart_options.series[i].lineWidth = lineWidth;
            all_chart_options.series[i].zIndex = zIndex;
            all_chart_options.series[i].marker = marker;



            //highlight clicked icon
            $(".selected", $(this).parent()).removeClass("selected");
            $(this).addClass("selected");

            //hide or show the line styles options for that series
            type === "line" ? $(".line_style_div:eq(" + i + ")").show() : $(".line_style_div:eq(" + i + ")").hide();

            //hide or show tooltip options for that series
            type === "line" || type === "bar" || type === "column" ? $(".series_decimals_div:eq(" + i + "), .individual_tooltip_signs_div:eq(" + i + ")").show() : $(".series_decimals_div:eq(" + i + "), .individual_tooltip_signs_div:eq(" + i + ")").hide();



        });
    },




    /** called when series visible by default checkbox is changed.  Binded at the end of populateForm **/
    seriesVisibleChange: function (chart, all_chart_options) {

        $(".series_visible_checkbox").change(function () {
            var is_visible = utils_forms.getCheckBoxValue($(this));
            var i = $(this).parents(".series_snippet").index();
            chart.series[i].update({
                visible: is_visible
            });

            //update all_chart_options
            all_chart_options.series[i].visible = is_visible;
        });
    },



    /** called when use second y-axis checkbox is changed.  Binded at the end of populateForm **/
    useSecondYAxisChange: function (chart, all_chart_options) {

        $(".use_2nd_y_axis_checkbox").change(function () {


            var axis_index = utils_forms.getCheckBoxValue($(this)) ? 1 : 0;

            //add second axis if not there by clicking the add y axis checkbox
            if (!Array.isArray(all_chart_options.yAxis) && axis_index === 1) {
                $("#chart_y_axis_2_enabled_checkbox").prop('checked', true).change();
            }


            //if unchecked, look if there is still a need for the second axis. if not, remove it
            if (axis_index === 0) {
                var need_2nd_axis = false;

                $(".use_2nd_y_axis_checkbox").each(function () {
                    if (utils_forms.getCheckBoxValue($(this))) {
                        need_2nd_axis = true;
                    }
                });

                if (need_2nd_axis === false) {
                    $("#chart_y_axis_2_enabled_checkbox").prop('checked', false).change();
                }

            }



            var i = $(this).parents(".series_snippet").index();

            chart.series[i].update({
                yAxis: axis_index
            });

            //update all_chart_options
            all_chart_options.series[i].yAxis = axis_index;
        });
    },





    /** called when the jscolor selector is changed (mouse still down). Updates the actual chart object and all_chart_options code output object***/
    updateSeriesColor: function (chart, all_chart_options, i, jscolor) {

        all_chart_options.colors[i] = typeof jscolor === "string" ? jscolor : jscolor.toRGBString();
        all_chart_options.series[i].color = all_chart_options.colors[i];
        chart.series[i].update({
            color: all_chart_options.series[i].color
        });
    },



    /** bound with populateForm. When the line style dropdown is changed, change that series **/
    lineStyleSelectChange: function (chart, all_chart_options) {
        $(".line_style_select").change(function () {
            var line_style = $(this).val();
            var i = $(this).parents(".series_snippet").index();

            all_chart_options.series[i].dashStyle = line_style;

            chart.series[i].update({
                dashStyle: line_style
            });
        });
    },


    /** bound with populateForm. When the unique tooltip signs dropdown is changed, change that series **/
    tooltipSignsSelectChange: function (chart, all_chart_options) {
        $(".individual_tooltip_signs_select").change(function () {
            var val = $(this).val();

            var dollar = val === "$" ? "$" : undefined;

            var percent;
            if (val === "%"){
              percent = val;
            }else if (val === "percentage point(s)"){
              percent = " " + val;
            }

            var i = $(this).parents(".series_snippet").index();

            all_chart_options.series[i].dollar = dollar;
            all_chart_options.series[i].percent = percent;

            chart.series[i].update({
                dollar: dollar,
                percent: percent
            });
        });
    },



    seriesDecimalsSelectChange: function (chart, all_chart_options) {
        $(".series_decimals_select").change(function () {

            var decimals = $(this).val() || undefined;

            var i = $(this).parents(".series_snippet").index();

            all_chart_options.series[i].decimals = decimals;

            chart.series[i].update({
                decimals: decimals
            });
        });
    },



    /** makes a color box, called from populateForm **/
    makeSeriesColorDiv: function (chart, all_chart_options, i) {
        var series_color_div = document.createElement("div");
        series_color_div.className = "series_color_div";

        //make color input box
        var series_color = document.createElement('input');
        $(series_color).addClass("jscolor {valueElement:null}")
            .attr("id", "series_color_" + i);

        //init with color, using jscolor.js
        var picker = new jscolor(series_color, {
            onFineChange: function () {
                update_individual_series.updateSeriesColor(chart, all_chart_options, i, this);
            }

        });



        //convert rgb string into arrray
        var c = i < 15 ? i : i - 15;
        var color = all_chart_options.colors[c] || "#000";

        //create picker
        if (color.charAt(0) === "#") { //if hex
            picker.fromString(color);

        } else { //else color is rgb
            var rgb = utils_main.rgb2arr(color);
            picker.fromRGB(rgb[0], rgb[1], rgb[2]);
        }

        //make clear float div
        var clear_div = utils_main.makeClearFloatDiv();

        $(series_color_div).append(series_color, clear_div);

        return series_color_div;
    },



    /** add line style option - shown only if type is line**/
    makeLineStyleDiv: function (i, series) {

        var line_style_div = document.createElement("div");
        $(line_style_div).addClass("line_style_div");

        var line_style_label = document.createElement("label");
        $(line_style_label).addClass("line_style_label")
            .text("Line style: ");

        var line_style_select = document.createElement("select");
        $(line_style_select).addClass("line_style_select")
            .attr("id", "line_style_select_" + i);

        var line_style_option_solid = document.createElement("option");
        $(line_style_option_solid).text("Solid")
            .val("Solid");

        var line_style_option_dash = document.createElement("option");
        $(line_style_option_dash).text("Dash")
            .val("Dash");

        var line_style_option_dot = document.createElement("option");
        $(line_style_option_dot).text("Dot")
            .val("Dot");

        var line_style_option_long_dash = document.createElement("option");
        $(line_style_option_long_dash).text("Long dash")
            .val("LongDash");

        var line_style_option_dash_dot = document.createElement("option");
        $(line_style_option_dash_dot).text("Dash-dot")
            .val("DashDot");

        $(line_style_select).append(line_style_option_solid, line_style_option_dash, line_style_option_dot, line_style_option_long_dash, line_style_option_dash_dot);

        $(line_style_select).val(series.dashStyle || "Solid"); //set selected value

        $(line_style_div).append(line_style_label, line_style_select);

        return line_style_div;

    },




    /** add option to select individual series tooltip sign **/
    makeIndividualTooltipSignsDiv: function (i, series) {

        var individual_tooltip_signs_div = document.createElement("div");
        $(individual_tooltip_signs_div).addClass("individual_tooltip_signs_div");

        var individual_tooltip_signs_label = document.createElement("label");
        $(individual_tooltip_signs_label).addClass("individual_tooltip_signs_label")
            .text("Unique dollar / percent signs: ");

        var individual_tooltip_signs_select = $('<select class ="individual_tooltip_signs_select" id="individual_tooltip_signs_select_' + i + '"><option value="no_signs" selected="">&nbsp;</option><option value="$">$</option><option value="%">%</option><option value="percentage point(s)">percentage point(s)</option></select>');

        $(individual_tooltip_signs_div).append(individual_tooltip_signs_label, individual_tooltip_signs_select);

        return individual_tooltip_signs_div;

    },


    /** add option to select individual series decimal places **/

    makeSeriesDecimalsDiv: function (i, series) {

        var series_decimals_div = document.createElement("div");
        $(series_decimals_div).addClass("series_decimals_div");

        var series_decimals_label = document.createElement("label");
        $(series_decimals_label).addClass("series_decimals_label")
            .text("Unique decimal places: ");

        var series_decimals_select = $('<select class="series_decimals_select" id="series_decimals_select_' + i + '"><option value="null" selected="">Auto</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>');

        $(series_decimals_div).append(series_decimals_label, series_decimals_select);

        return series_decimals_div;

    },



    /** makes and returns div with icons that let user choose line or bar type for that series **/
    makeSeriesTypeDiv: function (chart, all_chart_options, i) {
        var series_type_div = document.createElement("div");
        series_type_div.className = "series_type_div";
        series_type_div.id = "series_type_div_" + i;


        //column icon
        var series_type_column = document.createElement("div");
        $(series_type_column).addClass("series_type_icon series_type_column")
            .attr("type", "column").attr("title", "Column");
        if (chart.series[i].type === "column") {
            $(series_type_column).addClass("selected");
        }

        //line icon
        var series_type_line = document.createElement("div");
        $(series_type_line).addClass("series_type_icon series_type_line")
            .attr("type", "line").attr("title", "Line");
        if (chart.series[i].type === "line") {
            $(series_type_line).addClass("selected");

        }

        //scatter icon
        var series_type_scatter = document.createElement("div");
        $(series_type_scatter).addClass("series_type_icon series_type_scatter")
            .attr("type", "scatter").attr("title", "Just markers");


        var clear_div = utils_main.makeClearFloatDiv();


        //put it together
        $(series_type_div).append(series_type_line, series_type_column, series_type_scatter, clear_div);

        return series_type_div;
    },




    /** makes and returns a div with a checkbox that lets user determine whether the series should be visible by default **/

    makeSeriesVisibleDiv: function (all_chart_options, i) {
        var series_visible_div = document.createElement("div");
        series_visible_div.className = "series_visible_div";

        var series_visible_label = document.createElement("label");
        series_visible_label.className = "series_visible_label";
        series_visible_label.textContent = "Visible by default: ";
        series_visible_label.setAttribute("for", "series_visible_checkbox_" + i);

        var series_visible_checkbox = document.createElement("input");
        series_visible_checkbox.setAttribute("type", "checkbox");
        series_visible_checkbox.checked = all_chart_options.series[i].visible ? "checked" : null;
        series_visible_checkbox.id = "series_visible_checkbox_" + i;
        series_visible_checkbox.className = "series_visible_checkbox";

        series_visible_div.appendChild(series_visible_label);
        series_visible_div.appendChild(series_visible_checkbox);

        return series_visible_div;
    },




    /** makes and returns a div with a checkbox that lets the user choose to put the series (line only) on the second y-axis **/
    use2ndYAxisDiv: function (all_chart_options, i) {
        var use_2nd_y_axis_div = document.createElement("div");
        use_2nd_y_axis_div.className = "use_2nd_y_axis_div";

        var use_2nd_y_axis_label = document.createElement("label");
        use_2nd_y_axis_label.className = "use_2nd_y_axis_label";
        use_2nd_y_axis_label.textContent = "Plot on second Y-Axis: ";
        use_2nd_y_axis_label.setAttribute("for", "use_2nd_y_axis_checkbox_" + i);

        var use_2nd_y_axis_checkbox = document.createElement("input");
        use_2nd_y_axis_checkbox.setAttribute("type", "checkbox");
        use_2nd_y_axis_checkbox.checked = all_chart_options.series[i].yAxis == 1 ? "checked" : null;
        use_2nd_y_axis_checkbox.id = "use_2nd_y_axis_checkbox_" + i;
        use_2nd_y_axis_checkbox.className = "use_2nd_y_axis_checkbox";

        use_2nd_y_axis_div.appendChild(use_2nd_y_axis_label);
        use_2nd_y_axis_div.appendChild(use_2nd_y_axis_checkbox);

        return use_2nd_y_axis_div;
    },




    /** makes and returns a div that has options to add extra data to a series for its tooltip **/

    makeSeriesExtraDataDiv: function (all_chart_options, i, j) {
        var j = j || 0;

        var series_extra_data_div = document.createElement("div");
        $(series_extra_data_div).addClass("series_extra_data_div");



        //make title box and label
        var series_extra_data_title_label = document.createElement("label");
        $(series_extra_data_title_label).addClass("series_extra_data_title_label")
            .text("Extra data title for tooltip: ");


        //title text area
        var series_extra_data_title_textarea = document.createElement("textarea");

        $(series_extra_data_title_textarea).css({
                "height": "30px"
            })
            .addClass("series_extra_data_title_textarea")
            .attr("id", "series_extra_data_title_textarea_" + i)
            .val(all_chart_options.series[i].extra_data ? all_chart_options.series[i].extra_data[j].name : "");

        //make values box and label
        var series_extra_data_values_label = document.createElement("label");
        series_extra_data_values_label.className = "series_extra_data_values_label";
        series_extra_data_values_label.textContent = "Extra data values for tooltip: ";

        //values text area
        var series_extra_data_values_textarea = document.createElement("textarea");
        $(series_extra_data_values_textarea).addClass("series_extra_data_values_textarea")
            .attr("id", "series_extra_data_values_textarea_" + i)
            .val(all_chart_options.series[i].extra_data ? all_chart_options.series[i].extra_data[j].values.join("\n") : "");


        //notes
        var extra_data_notes = document.createElement("p");

        $(extra_data_notes).addClass("notes")
            .text("For each point in a series, separate the extra value with a new line. Any formatting will be carried over, so if you want commas or a dollar sign in your value, make sure to include that here.");

        //add button
        var add_extra_data_button = document.createElement("div");
        $(add_extra_data_button)
            .addClass("series_add_extra_data_button")
            .text("+")
            .css({
                cursor: "pointer",
                float: "left",
                "font-size": "190%",
                color: "#337ab7",
                "line-height": ".9"
            });


        //subtract button
        var subtract_extra_data_button = document.createElement("div");
        $(subtract_extra_data_button)
            .addClass("series_subtract_extra_data_button")
            .html("&minus;")
            .css({
                cursor: "pointer",
                float: "left",
                marginLeft: "10px",
                "font-size": "190%",
                color: "#337ab7",
                "line-height": ".9",
                display: "none"
            });


        //clearfloat div
        var clear_div = utils_main.makeClearFloatDiv();


        //horizontal rule
        var extra_data_hr = document.createElement("hr");
        $(extra_data_hr).css({
            "margin-bottom": "0px"
        });


        //put it all together

        $(series_extra_data_div).append(extra_data_hr,
            series_extra_data_title_label,
            series_extra_data_title_textarea,
            series_extra_data_values_label,
            series_extra_data_values_textarea,
            extra_data_notes,
            add_extra_data_button,
            subtract_extra_data_button,
            clear_div);

        return series_extra_data_div;
    },




    /** populates #display_series_options with options for each series. Called when its side nav tab is selected from navigation_setup. **/
    populateForm: function (chart, all_chart_options) {


        var display_series_options_inner_div = $("#display_series_options_inner_div");
        display_series_options_inner_div.empty();

        $(all_chart_options.series).each(function (i, series) {

            //make series name header
            var series_name = document.createElement('h5');
            series_name.textContent = this.name;

            //make series color input
            var series_color_div = update_individual_series.makeSeriesColorDiv(chart, all_chart_options, i);

            //make outer snippet p tag
            var series_snippet = document.createElement('p');
            series_snippet.className = "series_snippet";

            series_snippet.appendChild(series_name);
            series_snippet.appendChild(series_color_div);

            //make series type div if applicable
            if (["line", "column"].indexOf(all_chart_options.chart.type) > -1) {
                var series_type_div = update_individual_series.makeSeriesTypeDiv(chart, all_chart_options, i);
                series_snippet.appendChild(series_type_div);
            }

            //make line style div
            var line_style_div = update_individual_series.makeLineStyleDiv(i, series);
            series_snippet.appendChild(line_style_div);

            //make individual tooltip signs div
            var individual_tooltip_signs_div = update_individual_series.makeIndividualTooltipSignsDiv(i, series);
            series_snippet.appendChild(individual_tooltip_signs_div);

            //make series decimals div
            var series_decimals_div = update_individual_series.makeSeriesDecimalsDiv(i, series);
            series_snippet.appendChild(series_decimals_div);

            //make use second y-axis checkbox div
            var use_2nd_y_axis_div = update_individual_series.use2ndYAxisDiv(all_chart_options, i);
            series_snippet.appendChild(use_2nd_y_axis_div);

            //make "is series visible on startup?" div
            var series_visible_div = update_individual_series.makeSeriesVisibleDiv(all_chart_options, i);
            series_snippet.appendChild(series_visible_div);

            //make extra data div text area (default of 1, but can be more if series already has extra_data)
            if (series.extra_data) {
                $.each(series.extra_data, function (j) {
                    var series_extra_data_div = update_individual_series.makeSeriesExtraDataDiv(all_chart_options, i, j);
                    series_snippet.appendChild(series_extra_data_div);
                });
            } else {
                var series_extra_data_div = update_individual_series.makeSeriesExtraDataDiv(all_chart_options, i);
                series_snippet.appendChild(series_extra_data_div);
            }




            //append all
            $(display_series_options_inner_div).append(series_snippet);


            if (all_chart_options.chart.type === "line") {
                $(".line_style_div").show();
            }

            //show or hide tooltip options
            if (all_chart_options.chart.type === "line" || all_chart_options.chart.type === "bar" || all_chart_options.chart.type === "column") {
                $(".series_decimals_div, .individual_tooltip_signs_div, .use_2nd_y_axis_div").show();
            }else{
                $(".series_decimals_div, .individual_tooltip_signs_div, .use_2nd_y_axis_div").hide();
            }


        });

        //bind series type changes
        update_individual_series.seriesTypeIconChange(chart, all_chart_options);

        //bind line style changes
        update_individual_series.lineStyleSelectChange(chart, all_chart_options);

        //bind unique tooltip sign changes
        update_individual_series.tooltipSignsSelectChange(chart, all_chart_options);

        //bind series decimals change
        update_individual_series.seriesDecimalsSelectChange(chart, all_chart_options);

        //bind use second y-axis checkbox changes
        update_individual_series.useSecondYAxisChange(chart, all_chart_options);

        //bind is visible by default changes
        update_individual_series.seriesVisibleChange(chart, all_chart_options);

        //bind extra data changes
        update_individual_series.seriesExtraDataChange(chart, all_chart_options);

    }

}



module.exports = update_individual_series;
