/** when X-axis options are changed in the side area */

var update_x_axis = {

    //update the x axis title
    updateTitle: function (newTitle, chart, all_chart_options) {
        chart.xAxis[0].setTitle({
            text: newTitle
        });

        all_chart_options.xAxis.setOption("title.text", newTitle, all_chart_options);

    }

}


module.exports = update_x_axis;
