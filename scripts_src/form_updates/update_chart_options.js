var draw_chart = require("../draw_chart.js");
var utils_main = require("../utils/utils_main");

/** updaters for all_chart_options.chart
@namespace
**/
var update_chart_options = {


    /** when zoon type dropdown is changed **/
    changeZoomType: function (val, chart, all_chart_options) {

        var val_arr = utils_main.parseBoolsFromArray(val.split(",")); //array is [x-zoom {bool}, y-zoom {bool}, zoomtype {stiring: x, y, or xy}]

        chart.pointer.zoomX = val_arr[0];
        chart.pointer.zoomY = val_arr[1];
        chart.pointer.zoomHor = val_arr[0];
        chart.pointer.zoomVert = val_arr[1];

        all_chart_options.chart.zoomType = val_arr[2];

    },


    /** enable or disabled data labels. Called when chart_show_data_labels_checkbox is changed **/

    toggleDataLabels: function (val, chart, all_chart_options) {

        $(chart.series).each(function () {
            this.update({
                dataLabels: {
                    enabled: val
                }
            });
        });

        all_chart_options.plotOptions.series.dataLabels.enabled = val;
    },


    /** when Use MLR Styles checkbox is toggled **/
    toggleMLRStyle: function (is_checked, all_chart_options) {
        //if or not using MLR styles
        all_chart_options.chart.plotBorderWidth = is_checked ? 1 : 0;

        //have to completely redraw chart to update plotBorderWidth - not accesible by HC's API - this messes up a lot, so for now I'm not.        
    },

    /** updates the subtitle (when that #chart_subtitle_textarea is updated) **/
    updateSubtitle: function (new_title, chart, all_chart_options) {

        chart.setTitle(null, {
            text: new_title
        });

        all_chart_options.subtitle.text = new_title;
    }

}

module.exports = update_chart_options;