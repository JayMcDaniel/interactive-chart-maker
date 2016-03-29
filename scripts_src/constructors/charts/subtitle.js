/** subtitle options constructor. Info at http://api.highcharts.com/highcharts#subtitle
* @constructor Subtitle 
* @param o {object} Subtitle options object
*/
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


module.exports = Subtitle;