/** title options constructor. Info at http://api.highcharts.com/highcharts#title */
var utils_main = require("../../utils/utils_main.js");

var Title = function (o) {
    
    this.text = o.text || "";
    this.align = o.align || "left";
    
    this.style = {
        color: '#000000',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: '14px'
    };

}


Title.prototype.setOption = utils_main.setOption;

module.exports = Title;

