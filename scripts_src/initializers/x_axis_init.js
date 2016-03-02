/** Initializer for "xAxis" options section of all_chart_options. Creates and returns a new instance */
var update_x_axis = require("../form_updates/update_x_axis.js");

var XAxis = require("../constructors/charts/x_axis.js");


var xAxisInit = function xAxisInit(categories) {

    //load options from user inputs
    var options = {
        
        categories: categories || undefined,
        title: {
            text: $("#chart_x_axis_title_textarea").val()
        },
        tickInterval: update_x_axis.updateTickmarkInterval(Number($("#chart_x_axis_tickmark_interval_input").val()))

    };


    var xAxis = new XAxis(options);
    return xAxis;
};

module.exports = xAxisInit;