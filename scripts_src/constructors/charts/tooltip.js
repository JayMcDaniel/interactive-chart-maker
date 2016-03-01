/** tooltip options constructor. Info at http://api.highcharts.com/highcharts#tooltip */
var utils_main = require("../../utils/utils_main.js");

var Tooltip = function (o) {
    this.backgroundColor = '#FEFFEF';
    this.crosshairs = o.crosshairs || [false, false];
    this.formatter = o.formatter;
    
    this.style = {
        color: '#000000',
        fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif'
    };
    
    this.useHTML = true;

}


module.exports = Tooltip;