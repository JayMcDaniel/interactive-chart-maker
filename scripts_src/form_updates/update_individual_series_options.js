var utils_main = require("../utils/utils_main.js");

/** methods for updating individual series options in  #display_series_options - called when its side nav tab is selected.
@module
@param chart {object} the main chart object, built when chart is loaded
@param all_chart_options {object} the main chart options that load into building of the chart and are turned to string for the output
**/



var update_individual_series_options = {

    /** called when the jscolor selector is changed (mouse still down). Updates the actual chart object and all_chart_options code output object***/
    updateSeriesColor: function (chart, all_chart_options, i, jscolor) {
        all_chart_options.colors[i] = jscolor.toRGBString();
        all_chart_options.series[i].color = all_chart_options.colors[i];
        chart.series[i].update({
            color: all_chart_options.series[i].color
        })
    },
    

    /** populates #display_series_options with options for each series. Called when its side nav tab is selected. **/
    populateForm: function (chart, all_chart_options) {

        var display_series_options_inner_div = $("#display_series_options_inner_div");
        display_series_options_inner_div.empty();

        $(chart.series).each(function (i) {

            //make series name header
            var series_name = document.createElement('h5');
            series_name.textContent = this.name;

            //make color input box
            var series_color = document.createElement('input');
            $(series_color).addClass("jscolor {valueElement:null}");

            //init with color, using jscolor.js
            var picker = new jscolor(series_color, {
                onFineChange: function () {
                    update_individual_series_options.updateSeriesColor(chart, all_chart_options, i, this);
                }
            });

            var rgb = utils_main.rgb2arr(all_chart_options.colors[i]);
            picker.fromRGB(rgb[0], rgb[1], rgb[2]);


            //make outer snippet p tag
            var series_snippet = document.createElement('p');
            series_snippet.className = "series_snippet";

            series_snippet.appendChild(series_name);
            series_snippet.appendChild(series_color);

            $(display_series_options_inner_div).append(series_snippet);

        });
    }

}



module.exports = update_individual_series_options;
