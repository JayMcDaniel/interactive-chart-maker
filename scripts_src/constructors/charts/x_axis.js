/** xAxis options constructor. Info at http://api.highcharts.com/highcharts#xAxis */
var utils_main = require("../../utils/utils_main.js");

var XAxis = function (o) {

    this.categories = o.categories || undefined;
    this.gridLineColor = o.gridLineColor || '#c0c0c0';
    this.gridLineWidth = o.gridLineWidth || 0;
    this.gridLineDashStyle = o.gridLineDashStyle || 'Dot';
    
    this.labels = {
        formatter: o.labels.formatter || undefined,
        rotation: o.labels.rotation || 0,
        style: {
            color: '#000000',
            fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'normal',
            backgroundColor: '#fff',
            fontSize: '12px'
        }

    };
    
    this.lineWidth = o.lineWidth || 1.2;
    this.lineColor = o.lineColor || 'gray';
    this.plotBands = o.plotBands || [];
    this.tickInterval = o.tickInterval || null;
    this.tickmarkPlacement = o.tickmarkPlacement || 'on';
    this.tickPosition = o.tickPosition || 'outside';
    this.tickColor = o.tickColor || '#C0D0E0';

    this.title = {
        useHTML: true,
        text: o.title.text || '',
        margin: o.title.margin || 6,
        style: {
            color: '#000000',
            fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'normal',
            backgroundColor: '#fff',
            fontSize: '13px'
        }
    };

}


XAxis.prototype.setOption = utils_main.setOption;

module.exports = XAxis;