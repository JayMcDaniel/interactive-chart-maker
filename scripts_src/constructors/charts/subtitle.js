/** subtitle options constructor. Info at http://api.highcharts.com/highcharts#subtitle */
var utils_main = require("../../utils/utils_main.js");

var Subtitle = function (o) {
    
    this.text = o.text || "";
    this.align = o.align || "left";
    
    this.style = {
        color: '#000000',
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
        fontSize: '12px'
    };

}


Subtitle.prototype.setOption = utils_main.setOption;

module.exports = Subtitle;