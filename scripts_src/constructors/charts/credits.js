/** Credits options constructor. Info at http://api.highcharts.com/highcharts#credits
 * @constructor Credits 
 *  @param o {object} credits options object
 */
var Credits = function (o) {

    this.href = "/";

    this.position = {
        align: 'left',
        x: 10,
        y: o.position ? o.position.y || -20 : -20
    };

    this.style = {
        cursor: "default",
        color: "#2C2C2C",
        "font-size": "11px"
    };
  
    this.target = "_blank";
    this.text = o.text || "";
    this.useHTML = true;
}


module.exports = Credits;