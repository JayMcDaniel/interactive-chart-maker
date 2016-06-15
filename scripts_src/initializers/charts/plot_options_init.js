var PlotOptions = require("../../constructors/charts/plot_options.js");
var update_legend = require("../../form_updates/update_legend.js");
var utils_forms = require("../../utils/utils_forms.js");

/** Initializer for "plotOptions" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var plotOptionsInit = function plotOptionsInit(legend_toggle_enabled) {

    //load options from user inputs
    var options = {
        series: {
            events: {
                // when one legend item is clicked, the others hide
                legendItemClick: update_legend.updateToggle(legend_toggle_enabled)
            },

            dataLabels: {
                enabled: utils_forms.getCheckBoxValue($("#chart_show_data_labels_checkbox"))
            },

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


    /* unique chart options (choosing to keep these with every chart so I don't have to reload them with individual series when chart types are updated) */

    //bar or column options
    options.series.groupPadding = $("#group_padding_input").getValNumber() || 0.2;
    options.series.pointPadding = $("#point_padding_input").getValNumber() || 0.1;
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