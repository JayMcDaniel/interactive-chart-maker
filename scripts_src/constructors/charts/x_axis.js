/** xAxis options constructor. Info at http://api.highcharts.com/highcharts#xAxis
 * @constructor XAxis 
 * @param o {object} XAxis options object
 */
var XAxis = function (o) {

    this.categories = o.categories;
    this.gridLineColor = o.gridLineColor || '#c0c0c0';
    this.gridLineWidth = o.gridLineWidth || 0;
    this.gridLineDashStyle = o.gridLineDashStyle || 'Dot';

    this.labels = {
        formatter: o.labels ? o.labels.formatter || undefined : undefined,
        rotation: o.labels ? o.labels.rotation || 0 : 0,
        style: {
            color: '#000000',
            fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'normal',
            backgroundColor: '#fff',
            fontSize: '12px',
            textOverflow: 'none'
        }

    };

    this.lineWidth = o.lineWidth || 1.2;
    this.lineColor = o.lineColor || 'gray';
    this.max = o.max || null;
    this.min = o.min || null;
    this.plotBands = o.plotBands || [];
    this.plotLines = o.plotLines || [{
        "value": 0,
        "color": "#c0c0c0",
        "dashStyle": "solid",
        "width": 0
    }];
    
    this.startOnTick = o.startOnTick;
    this.tickInterval = o.tickInterval || null;
    this.tickmarkPlacement = o.tickmarkPlacement || 'on';
    this.tickPosition = o.tickPosition || 'outside';
    this.tickColor = o.tickColor || '#C0D0E0';

    this.title = {
        align: o.title.align,
        useHTML: true,
        text: o.title ? o.title.text || '' : '',
        margin: o.title ? o.title.margin || 6 : '',
        rotation: 0,
        style: {
            color: '#000000',
            fontFamily: 'Calibri, Verdana, Arial, Helvetica, sans-serif',
            fontWeight: 'normal',
            backgroundColor: '#fff',
            fontSize: '13px'
        },
        x: o.title.x
    };

    this.type = o.type;

}


module.exports = XAxis;