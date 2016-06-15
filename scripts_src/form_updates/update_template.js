/** when template are changed in the side area, these methods are called 
@namespace
*/
var update_template = {

    /** change the chart's RenderTo ID (the div ID that the chart is loaded into)  **/
    changeID: function (new_ID, all_chart_options, all_map_options) {

        new_ID = $.trim(new_ID).replace(/^[^a-zA-Z_]+/g, "");
        if (!all_chart_options || all_map_options) {
            return new_ID;
        } else {
            all_chart_options.chart.renderTo = new_ID;
        }
    },

    /** change the chart height and witdh **/
    resize: function (val, dimension, chart, all_chart_options) {
        val = Number(val);
        if (!isNaN(val)) {
            $(".chart_display_area, .map_display_area").css(dimension, val + "px");
        }

        if (all_chart_options.chart.type !== "map") {
            chart.reflow();
            $("#chart_credits_text_textarea").trigger("input"); //fix credits loacation
        }
    },

    /** change the chart's inner margins **/
    margin: function (margins_arr, chart, all_chart_options) {

        $.each(chart.axes, function (i, e) {
            e.isDirty = true; //to tell axes to refresh
        });
        chart.margin = margins_arr;
        chart.redraw(false);

        all_chart_options.chart.margin = margins_arr;

    }
}



module.exports = update_template;