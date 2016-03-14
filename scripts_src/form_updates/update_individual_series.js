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
            $(".series_type_selected", $(this).parent()).removeClass("series_type_selected");
            $(this).addClass("series_type_selected");
            
            //update all_chart_options
            all_chart_options.series[i].type = type;
                        
        });
    },

    /** called when the jscolor selector is changed (mouse still down). Updates the actual chart object and all_chart_options code output object***/
    updateSeriesColor: function (chart, all_chart_options, i, jscolor) {
        all_chart_options.colors[i] = jscolor.toRGBString();
        all_chart_options.series[i].color = all_chart_options.colors[i];
        chart.series[i].update({
            color: all_chart_options.series[i].color
        })
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

        //init with color, using jscolor.js
        var picker = new jscolor(series_color, {
            onFineChange: function () {
                update_individual_series.updateSeriesColor(chart, all_chart_options, i, this);
            }
        });

        //convert rgb string into arrray
        var rgb = utils_main.rgb2arr(all_chart_options.colors[i]);
        //create picker
        picker.fromRGB(rgb[0], rgb[1], rgb[2]);

        //make clear float div
        var clear_div = utils_main.makeClearFloatDiv();


        series_color_div.appendChild(series_color_label);
        series_color_div.appendChild(series_color);
        series_color_div.appendChild(clear_div);

        return series_color_div;
    },


    makeSeriesTypeDiv: function (chart, all_chart_options, i) {
        var series_type_div = document.createElement("div");
        series_type_div.className = "series_type_div";

        var series_type_label = document.createElement("label");
        series_type_label.className = "series_type_label";
        series_type_label.textContent = "Type: ";


        var series_type_column = document.createElement("div");
        $(series_type_column).addClass("series_type_icon series_type_column")
            .attr("type", "column");
        if (chart.series[i].type === "column") {
            $(series_type_column).addClass("series_type_selected");
        }

        var series_type_line = document.createElement("div");
        $(series_type_line).addClass("series_type_icon series_type_line")
            .attr("type", "line");
        if (chart.series[i].type === "line") {
            $(series_type_line).addClass("series_type_selected");
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


            $(display_series_options_inner_div).append(series_snippet);

        });
        
        //bind series type changes
        update_individual_series.seriesTypeIconChange(chart, all_chart_options);
    }

}



module.exports = update_individual_series;