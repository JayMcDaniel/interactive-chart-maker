/** takes all_chart_options and prints a chart to the screen 
@namespace
*/

var draw_chart = {

    /** initialize function **/
    init: function (all_chart_options) {

        $(".chart_display_area").attr("id", all_chart_options.chart.renderTo); //change ID of chart area to make sure it matches the renderTo value

        //set highcharts globals default
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });
        
        var chart = new Highcharts.Chart(all_chart_options);
        return chart;
    },

}

module.exports = draw_chart;