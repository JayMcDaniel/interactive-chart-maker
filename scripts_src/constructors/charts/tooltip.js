/** Tooltip options constructor. Info at http://api.highcharts.com/highcharts#tooltip
 * @constructor Tooltip 
 * @param o {object} Tooltip options object
 */

var Tooltip = function (o) {
    this.backgroundColor = '#FEFFEF';
    this.crosshairs = o.crosshairs || [false, false];
    this.formatter = o.formatter;

    this.style = {
        color: '#000000',
        fontFamily: 'Calibri, Arial, Helvetica, sans-serif'
    };

    this.useHTML = false;

}


module.exports = Tooltip;