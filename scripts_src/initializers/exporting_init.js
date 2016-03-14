var Exporting = require("../constructors/charts/exporting.js");

/** Initializer for "exporting" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var exportingInit = function exportingInit() {

    //load options from user inputs
    var options = {

    };


    var exporting = new Exporting(options);
    return exporting;
};

module.exports = exportingInit;