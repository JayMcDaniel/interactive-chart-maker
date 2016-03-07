var PlotOptions = require("../constructors/charts/plot_options.js");

/** Initializer for "plotOptions" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var plotOptionsInit = function plotOptionsInit(chart_type) {

    //load options from user inputs
    var options = {
        series: {
            events: {},
            dataLabels: {},

            lineWidth: 1.5,
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true,
                        radius: 5
                    }
                }
            },
            states: {
                hover: {
                    lineWidth: 4
                }
            }

        }

    };

    options[chart_type] = {};

    /** unique chart options (choosing to keep these with every chart so I don't have to reload them with individual series when chart types are updated) */
    //just for bar or column 
    options.series.groupPadding = 0.2;
    options.series.pointPadding = 0.1;
    options.series.pointPlacement = null;
    options.series.stacking = null;
    options.series.minPointLength = 2;


    //just for bubble charts
    options.series.maxSize = 50;
    options.series.sizeBy = 'width'; //instead of 'area', seems more accurate


    var plotOptions = new PlotOptions(options);
    return plotOptions;
};

module.exports = plotOptionsInit;