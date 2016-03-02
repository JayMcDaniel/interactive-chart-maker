/** Initializer for "series" options section of all_chart_options. Creates and returns a new instance */

var Series = require("../constructors/charts/series.js");


var seriesInit = function seriesInit(series) {

    //load options from user inputs
    var options = series;


    var series = new Series(options);
    return series.series;
};

module.exports = seriesInit;