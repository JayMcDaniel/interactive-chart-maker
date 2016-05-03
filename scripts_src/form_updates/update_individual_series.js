var utils_main = require("../utils/utils_main.js");

/** methods for updating individual series options in  #display_series_options - called when its side nav tab is selected.
@module
@param chart {object} the main chart object, built when chart is loaded
@param all_chart_options {object} the main chart options that load into building of the chart and are turned to string for the output
**/



var update_individual_series = {


    /** called when the series type icons are clicked. Binded at the end of populateForm **/
    seriesTypeIconChange: function (chart, all_chart_options) {
        $(".series_type_icon").click(function () {
            //update series type
            var type = $(this).attr("type");
            var i = $(this).parents(".series_snippet").index();
            chart.series[i].update({
                type: type
            });

            //highlight clicked icon
            $(".selected", $(this).parent()).removeClass("selected");
            $(this).addClass("selected");

            //hide or show the line styles for that series
            type === "line" ? $(".line_style_div:eq(" + i + ")").show() : $(".line_style_div:eq(" + i + ")").hide();

            //update all_chart_options
            all_chart_options.series[i].type = type;

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
            chart.series[i].update({
                dashStyle: line_style
            });
        });
    },


    /** makes a color box, called from populateForm **/
    makeSeriesColorDiv: function (chart, all_chart_options, i) {
        var series_color_div = document.createElement("div");
        series_color_div.className = "series_color_div";

        // make a color label
        var series_color_label = document.createElement("label");
        series_color_label.className = "series_color_label";
        series_color_label.textContent = "Color: ";

        //make color input box
        var series_color = document.createElement('input');
        $(series_color).addClass("jscolor {valueElement:null}");
        series_color.id = "series_color_" + i;

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

        series_color_div.appendChild(series_color_label);
        series_color_div.appendChild(series_color);
        series_color_div.appendChild(clear_div);

        return series_color_div;
    },



    /** add line style option - shown only if type is line**/
    makeLineStyleDiv: function (i) {

        var line_style_div = document.createElement("div");
        line_style_div.className = "line_style_div";

        var line_style_label = document.createElement("label");
        line_style_label.className = "line_style_label";
        line_style_label.textContent = "Line style: ";

        var line_style_select = document.createElement("select");
        line_style_select.className = "line_style_select";
        line_style_select.id = "line_style_select_" + i;

        var line_style_option_solid = document.createElement("option");
        line_style_option_solid.textContent = "Solid";
        line_style_option_solid.value = "Solid";

        var line_style_option_dash = document.createElement("option");
        line_style_option_dash.textContent = "Dash";
        line_style_option_dash.value = "Dash";

        var line_style_option_dot = document.createElement("option");
        line_style_option_dot.textContent = "Dot";
        line_style_option_dot.value = "Dot";

        var line_style_option_long_dash = document.createElement("option");
        line_style_option_long_dash.textContent = "Long dash";
        line_style_option_long_dash.value = "LongDash";

        var line_style_option_dash_dot = document.createElement("option");
        line_style_option_dash_dot.textContent = "Dash-dot";
        line_style_option_dash_dot.value = "DashDot";

        line_style_select.appendChild(line_style_option_solid);
        line_style_select.appendChild(line_style_option_dash);
        line_style_select.appendChild(line_style_option_dot);
        line_style_select.appendChild(line_style_option_long_dash);
        line_style_select.appendChild(line_style_option_dash_dot);

        line_style_div.appendChild(line_style_label);
        line_style_div.appendChild(line_style_select);

        return line_style_div;

    },


    makeSeriesTypeDiv: function (chart, all_chart_options, i) {
        var series_type_div = document.createElement("div");
        series_type_div.className = "series_type_div";
        series_type_div.id = "series_type_div_" + i;

        var series_type_label = document.createElement("label");
        series_type_label.className = "series_type_label";
        series_type_label.textContent = "Type: ";


        var series_type_column = document.createElement("div");
        $(series_type_column).addClass("series_type_icon series_type_column")
            .attr("type", "column");
        if (chart.series[i].type === "column") {
            $(series_type_column).addClass("selected");
        }

        var series_type_line = document.createElement("div");
        $(series_type_line).addClass("series_type_icon series_type_line")
            .attr("type", "line");
        if (chart.series[i].type === "line") {
            $(series_type_line).addClass("selected");

        }


        var clear_div = utils_main.makeClearFloatDiv();

        series_type_div.appendChild(series_type_label);
        series_type_div.appendChild(series_type_line);
        series_type_div.appendChild(series_type_column);
        series_type_div.appendChild(clear_div);

        return series_type_div;

    },




    /** populates #display_series_options with options for each series. Called when its side nav tab is selected. **/
    populateForm: function (chart, all_chart_options) {

        var display_series_options_inner_div = $("#display_series_options_inner_div");
        display_series_options_inner_div.empty();

        $(chart.series).each(function (i) {

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
            var line_style_div = update_individual_series.makeLineStyleDiv(i);
            series_snippet.appendChild(line_style_div);

            //append all
            $(display_series_options_inner_div).append(series_snippet);


            if (all_chart_options.chart.type === "line") {
                $(".line_style_div").show();
            }

        });

        //bind series type changes
        update_individual_series.seriesTypeIconChange(chart, all_chart_options);
        //bind line style changes
        update_individual_series.lineStyleSelectChange(chart, all_chart_options);
    }

}



module.exports = update_individual_series;