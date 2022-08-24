/** Exporting options constructor. Info at http://api.highcharts.com/highcharts#exporting
 * @constructor Exporting 
 * @param o {object} exporting options object
 */
var Exporting = function (o) {
    this.sourceWidth = 640;
    this.scale = 1;

    this.chartOptions = {

        chart: {
            backgroundColor: '#fff'
        },
        credits:{
            text: $("#chart_credits_text_textarea").val().replace(/\n/g, "<br>").replace("Click legend items to change data display. Hover over chart to view data.", "")
        }
    };

    this.buttons = {
        // contextButton: {
        //     enabled: true,
        //     verticalAlign: 'bottom',
        //     x: -10
        // }

        contextButton: {
            text: "<span style='color: #112e51'>Options</span>",
            symbolY: 14,
            symbolStroke: '#112e51',
            enabled: true,
            verticalAlign: 'bottom',
            x: -10,
    
            menuItems: [{
                    textKey: 'printChart',
                    onclick: function () {
                        $(".highcharts-focus-border").remove();
                        this.print();
    
                    }
                }, {
                    separator: true
                }, {
                    textKey: 'downloadPNG',
                    onclick: function () {
                        this.exportChartLocal();
                    }
                }, {
                    textKey: 'downloadJPEG',
                    onclick: function () {
                        this.exportChartLocal({
                            type: 'image/jpeg'
                        });
                    }
                }, {
                    textKey: 'downloadSVG',
                    onclick: function () {
                        this.exportChartLocal({
                            type: 'image/svg+xml'
                        });
                    }
                }, {
                    separator: true
                }, {
                    text: 'Show table',
                    onclick: function () {
                       this.options.chart.showTable();
                    }
                },
                {
                    text: 'Download CSV',
                    onclick: function () {
                        this.options.chart.downloadCSV();
                    }
                }
            ]
        }

        
    };


}


module.exports = Exporting;


