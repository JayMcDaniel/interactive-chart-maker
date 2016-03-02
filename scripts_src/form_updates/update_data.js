var parseTableInput = require("../initializers/parse_table_input.js");

var update_data = {

    updateData: function (chart, all_chart_options) {
        var chart_type = $(".selected_chart_type").divVal();
        var parsed_table_output = parseTableInput($("#table_input_textarea").val(), chart_type);

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



    }

}

module.exports = update_data;