/** legend options constructor. Info at http://api.highcharts.com/highcharts#legend */
var utils_main = require("../../utils/utils_main.js");

var Legend = function (o) {

    this.align = o.align || 'left';
    this.backgroundColor = o.backgroundColor || 'none';
    this.borderColor = o.borderColor || 'none';
    this.borderWidth = o.borderWidth || 0;
    this.enabled = o.enabled || true;
    this.floating = o.floating || false;
    this.itemDistance = o.itemDistance || 30;
    this.layout = o.layout || 'horizontal';
    this.reversed = o.reversed || false;
    this.shadow = o.shadow || false;
    this.useHTML = o.useHTML || false;
    this.verticalAlign = o.verticalAlign || 'top';
    this.width = o.width;
    this.x = o.x || 0;
    this.y = o.y || 30;

    this.itemStyle = {
        fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
        color: '#000'
    };
    this.itemHiddenStyle = {
        color: 'gray'
    };
    this.itemHoverStyle = {
        cursor: o.itemHoverStyle ? o.itemHoverStyle.cursor || "pointer" : "pointer"
    }

}


Legend.prototype.setOption = utils_main.setOption;

module.exports = Legend;