/** takes all_chart_options and prints a chart to the screen 
@namespace
*/

var draw_chart = {

    chartCallback: function (all_chart_options) {
        
        if (all_chart_options.timeline){ //call animation if applicable
            all_chart_options.timeline.animation();
        }

        $(".highcharts-legend-item").css("min-height", "0px").css("z-index", 100); //fix so CMS CSS doesn't make legend taller than it should
        $(".highcharts-tooltip").css("z-index", 200);

        /**
         * Highcharts plugin for setting a lower opacity for other series than the one that is hovered
         * in the legend
         */
        (function (Highcharts) {
            var each = Highcharts.each;

            Highcharts.wrap(Highcharts.Legend.prototype, 'renderItem', function (proceed, item) {

                proceed.call(this, item);

                var isPoint = !!item.series,
                    collection = isPoint ? item.series.points : this.chart.series,
                    groups = isPoint ? ['graphic'] : ['group', 'markerGroup'],
                    element = (this.options.useHTML ? item.legendItem : item.legendGroup).element;

                element.onmouseover = function () {
                    each(collection, function (seriesItem) {
                        if (seriesItem !== item) {
                            each(groups, function (group) {
                                seriesItem[group].animate({
                                    opacity: 0.25
                                }, {
                                    duration: 150
                                });
                            });
                        }
                    });
                }
                element.onmouseout = function () {
                    each(collection, function (seriesItem) {
                        if (seriesItem !== item) {
                            each(groups, function (group) {
                                seriesItem[group].animate({
                                    opacity: 1
                                }, {
                                    duration: 50
                                });
                            });
                        }
                    });
                }

            });
        }(Highcharts)); //end gray other series plugin


    },


    /** initialize function **/
    init: function (all_chart_options, chartCallback) {

        $(".chart_display_area").attr("id", all_chart_options.chart.renderTo); //change ID of chart area to make sure it matches the renderTo value

        //set highcharts globals default
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

        var chart = new Highcharts.Chart(all_chart_options, draw_chart.chartCallback(all_chart_options));
        return chart;
    },

}

module.exports = draw_chart;