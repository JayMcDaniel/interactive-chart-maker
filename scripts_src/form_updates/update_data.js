var parseTableInput = require("../parsers/parse_table_input.js");
var utils_forms = require("../utils/utils_forms.js");

/** called when .selected_chart_type or #table_input_textarea is changed - calls functions to reparse data
@namespace
*/

var update_data = {

    /** called when .selected_chart_type or #table_input_textarea is changed - calls functions to reparse data */
    updateData: function (chart, all_chart_options) {
        var chart_type = $(".selected_chart_type").divVal();
        var input = $("#table_input_textarea").val();
        var legend_toggle_enabled = utils_forms.getCheckBoxValue($("#legend_make_toggle_checkbox"));
        var load_series_from = $(".selected_load_series_from").divVal();
        var parsed_table_output = parseTableInput(input, load_series_from, chart_type, legend_toggle_enabled, all_chart_options.colors, all_chart_options); 

        //update x-axis categories
        chart.xAxis[0].update({
            categories: parsed_table_output.x_axis_categories
        }, false);

        //remove existing series array
        $(chart.series).each(function () {
            this.remove(false); //false to not redraw yet
        });

        //add new series
        $(parsed_table_output.series).each(function () {
            chart.addSeries(this, false); //false to not redraw yet
        });
        chart.redraw(true);


        //update chart options for code output
        all_chart_options.series = parsed_table_output.series;
        all_chart_options.xAxis.categories = parsed_table_output.x_axis_categories;
        
        //update whether legend toggle is enabled 
        $("#legend_make_toggle_checkbox").change();
        

    }

}

module.exports = update_data;


