/** Credits options constructor. Info at http://api.highcharts.com/highcharts#credits
* @constructor Credits 
*  @param o {object} credits options object
*/
var Credits = function (o) {
    this.href = "http://www.bls.gov";

    this.position = {
        align: 'left',
        x: 10,
        y: o.position ? o.position.y || -20 : -20
    };

    this.style = {
        cursor: "default",
        color: "#2C2C2C"
    };

    this.text = o.text || "";
    this.useHTML = true;
}


module.exports = Credits;