/** Exporting options constructor. Info at http://api.highcharts.com/highcharts#exporting */
var utils_main = require("../../utils/utils_main.js");


var Exporting = function (o) {

    this.buttons = {
        contextButton: {
            enabled: true,
            verticalAlign: 'bottom',
            x: -10
        }
    };
}

Exporting.prototype.setOption = utils_main.setOption;


module.exports = Exporting;