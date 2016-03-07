var Credits = require("../constructors/charts/credits.js");

/** Initializer for "credits" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var creditsInit = function creditsInit() {

    //load options from user inputs
    var options = {
        text: $("#chart_credits_text_textarea").val(),
        position:{
            y: Number($("#chart_credits_y_position_input").val())
        }


    };


    var credits = new Credits(options);
    return credits;
};

module.exports = creditsInit;