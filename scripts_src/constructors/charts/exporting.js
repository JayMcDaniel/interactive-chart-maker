/** Exporting options constructor. Info at http://api.highcharts.com/highcharts#exporting
* @constructor Exporting 
* @param o {object} exporting options object
*/
var Exporting = function (o) {
    this.sourceWidth = 640;
    this.scale = 1;
    
    
    this.buttons = {
        contextButton: {
            enabled: true,
            verticalAlign: 'bottom',
            x: -10,
            symbol: 'url(https://www.bls.gov/images/icons/download-icon.png)'
        }
    };
}


module.exports = Exporting;