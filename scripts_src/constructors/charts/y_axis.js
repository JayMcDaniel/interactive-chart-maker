/** yAxis options constructor. Info at http://api.highcharts.com/highcharts#yAxis */
var utils_main = require("../../utils/utils_main.js");

var yAxis = function (o) {

    this.gridLineColor = o.gridLineColor || '#c0c0c0';
    this.gridLineWidth = o.gridLineWidth || 1;
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

    this.lineColor = o.lineColor || 'gray';
    this.lineWidth = o.lineWidth || 1;
    this.max = o.max || null;
    this.min = o.min || null;
    this.opposite = o.opposite || false;
    this.plotBands = o.plotBands || [];

    this.plotLines = o.plotLines || [{
        "value": 0,
        "color": "#c0c0c0",
        "dashStyle": "solid",
        "width": 1
    }];

    this.tickInterval = o.tickInterval || null;
    this.tickmarkPlacement = o.tickmarkPlacement || 'on';
    this.tickPosition = o.tickPosition || 'outside';
    this.tickColor = o.tickColor || '#C0D0E0';
    this.tickWidth = o.tickWidth: || 1;

    this.title = {
        useHTML: true,
        text: o.title.text || '',
        margin: o.title.margin || 6,
        align: o.title.align || 'middle',
        offset: 20,
        rotation: 0,
        x: o.title.x || 35,
        y: -15,

        style: {
            color: '#000000',
            fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'normal',
            backgroundColor: '#fff',
            fontSize: '13px'
        }
    };

    this.type = o.type || 'linear';

}


yAxis.prototype.setOption = utils_main.setOption;

module.exports = yAxis;