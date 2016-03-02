/** Initializer for "plotOptions" options section of all_chart_options. Creates and returns a new instance */

var PlotOptions = require("../constructors/charts/plot_options.js");


var plotOptionsInit = function plotOptionsInit(chart_type) {

    //load options from user inputs
    var options = {
        series:{
            events:{},
            dataLabels: {}
        }
    };
    
    options[chart_type] = {};


    var plotOptions = new PlotOptions(options);
    return plotOptions;
};

module.exports = plotOptionsInit;