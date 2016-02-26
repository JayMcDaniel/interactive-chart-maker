/** series (an array of objs) options constructor. Info at http://api.highcharts.com/highcharts#series */
var utils_main = require("../../utils/utils_main.js");

var Series = function (o) {

    this.series = o.series || [{
            name: "Series 1",
            data: [1, 2, 3, 4]
    },
        {
            name: "Series 2",
            data: [2, 4, 6, 8]
    }];

}


Series.prototype.setOption = utils_main.setOption;

module.exports = Series;