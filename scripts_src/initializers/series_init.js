var Series = require("../constructors/charts/series.js");

/** Initializer for "series" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var seriesInit = function seriesInit(series) {

    //load options from user inputs
    var options = series;


    var series = new Series(options);
    return series.series;
};

module.exports = seriesInit;