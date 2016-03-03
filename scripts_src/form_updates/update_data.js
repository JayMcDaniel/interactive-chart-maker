var parseTableInput = require("../parsers/parse_table_input.js");

var update_data = {

    updateData: function (chart, all_chart_options) {
        var chart_type = $(".selected_chart_type").divVal();
        var load_series_from = $(".selected_load_series_from").divVal();
        var input = $("#table_input_textarea").val();
        var parsed_table_output = parseTableInput(input, load_series_from, chart_type);

        //update x-axis categories
        chart.xAxis[0].update({
            categories: parsed_table_output.x_axis_categories
        }, false);

        //remove existing series array
        $(chart.series).each(function () {
            this.remove(false); //false to not redraw yet
        });

        //add new series

        $(parsed_table_output.series).each(function(){
            chart.addSeries(this, false); //false to not redraw yet
        });
        chart.redraw(true);


        //update chart options for code output
        
        all_chart_options.series = parsed_table_output.series;
        all_chart_options.xAxis.categories = parsed_table_output.x_axis_categories;
        
    }

}

module.exports = update_data;