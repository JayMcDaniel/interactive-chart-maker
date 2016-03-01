/** series (an array of objs) options constructor. Info at http://api.highcharts.com/highcharts#series */
var utils_main = require("../../utils/utils_main.js");

var Series = function (o) {

    this.series = o.series || [{
            name: "Series 1",
            data: [1000, 2000, 3000, 4000]
    },
        {
            name: "Series 2",
            data: [2000, 4000, 6000, 8000]
    }];

}


module.exports = Series;