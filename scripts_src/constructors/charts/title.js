/** Title options constructor. Info at http://api.highcharts.com/highcharts#title
* @constructor Title 
* @param o {object} Title options object
*/
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


module.exports = Title;

