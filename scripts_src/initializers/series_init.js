/** Initializer for "series" options section of all_chart_options. Creates and returns a new instance */

var Series = require("../constructors/charts/series.js");


var seriesInit = function seriesInit() {

    //load options from user inputs
    var options = [{

            name: "Series 1",
            data: [1000, 2000, 3000, 4000]
    },
        {
            name: "Series 2",
            data: [2000, 4000, 6000, 8000]
    }];


    var series = new Series(options);
    return series.series;
};

module.exports = seriesInit;