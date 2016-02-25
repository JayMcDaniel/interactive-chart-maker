/** Colors options constructor. Info at http://api.highcharts.com/highcharts#colors */
var utils_main = require("../../utils/utils_main.js");

var Colors = function (o) {

    this.colors = o.colors || ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
   '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
}

Colors.prototype.setOption = utils_main.setOption;


module.exports = Colors;