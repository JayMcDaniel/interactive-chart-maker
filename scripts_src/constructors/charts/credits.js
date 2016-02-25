/** Credits options constructor. Info at http://api.highcharts.com/highcharts#credits */
var utils_main = require("../../utils/utils_main.js");

var Credits = function (o) {

    this.useHTML = true;
    this.position = {
        align: 'left',
        x: 10,
        y: o.position.y || -20
    };
    this.style = {
        cursor: "default",
        color: "#2C2C2C"
    };
    this.href = "http://www.bls.gov";
}

Credits.prototype.setOption = utils_main.setOption;


module.exports = Credits;