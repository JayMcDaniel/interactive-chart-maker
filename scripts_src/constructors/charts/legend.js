/** Legend options constructor. Info at http://api.highcharts.com/highcharts#legend
 * @constructor Legend
 * @param o {object} legend options object
 */
var Legend = function (o) {

    this.align = o.align || 'left';
    this.alignColumns = o.alignColumns || false;
    this.backgroundColor = o.backgroundColor || 'none';
    this.borderColor = o.borderColor || 'none';
    this.borderWidth = o.borderWidth || 0;
    this.enabled = o.enabled || true;
    this.floating = o.floating || true;
//    this.itemDistance = o.itemDistance || 0;
    this.itemWidth = o.itemWidth;
    this.layout = o.layout || 'horizontal';
    this.reversed = o.reversed || false;
    this.shadow = o.shadow || false;
    this.symbolRadius = 0;
    this.title = {};
    this.useHTML = o.useHTML || false;
    this.verticalAlign = o.verticalAlign || 'top';
    this.width = o.width || 520;
    this.x = o.x || 0;
    this.y = o.y || 30;

    this.itemStyle = {
        fontFamily: 'Calibri, Arial, Helvetica, sans-serif',
        color: '#000',
        cursor: o.itemStyle.cursor,
        textOverflow: "wrap"
    };
    this.itemHiddenStyle = {
        color: 'gray'
    };
    this.itemHoverStyle = {
        cursor: o.itemHoverStyle.cursor
    }


}

module.exports = Legend;
