/** tooltip options constructor. Info at http://api.highcharts.com/highcharts#tooltip */
var utils_main = require("../../utils/utils_main.js");

var Tooltip = function (o) {
    this.backgroundColor = '#FEFFEF';
    this.crosshairs = o.crosshairs || [false, false];
    this.formatter = o.formatter;
    this.shared = o.shared || false;
    
    this.style = {
        color: '#000000',
        fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif'
    };
    
    this.useHTML = true;
    this.valueDecimals = o.valueDecimals;
    this.valuePrefix = o.valuePrefix || "";
    this.valueSuffix = o.valueSuffix || "";

}


module.exports = Tooltip;