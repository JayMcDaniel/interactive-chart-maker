/** takes all_chart_options and prints a chart to the screen 
@namespace
*/

var draw_chart = {
    
    /** initialize function **/
    init: function (all_chart_options) {
        var chart = new Highcharts.Chart(all_chart_options);
            return chart;
    },
    
}

module.exports = draw_chart;