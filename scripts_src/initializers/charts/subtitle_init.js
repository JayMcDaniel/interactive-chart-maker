var Subtitle = require("../../constructors/charts/subtitle.js");

/** Initializer for "subtitle" options section of all_chart_options. Creates and returns a new instance
@module
*/

var subtitleInit = function subtitleInit() {

    //load options from user inputs
    var options = {
        text: $("#chart_subtitle_textarea").val()
    };


    var subtitle = new Subtitle(options);
    return subtitle;
};

module.exports = subtitleInit;