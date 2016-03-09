var Credits = require("../constructors/charts/credits.js");

/** Initializer for "credits" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var creditsInit = function creditsInit() {

    var credits_text = $("#chart_credits_text_textarea").val().replace(/\n/g, "<br>");
    /** calculate vertical y position of credits, depending on how many lines it has 
    @param text {string} the credits text, originally from #chart_credits_text_textarea
    */
    var calculateCreditsPosition = function (text) {
        var new_y_pos = (text.split("<br>").length) * -11;
        return new_y_pos;
    };

    //load options from user inputs
    var options = {
        text: credits_text,
        position: {
            y: calculateCreditsPosition(credits_text)
        }
    };


    var credits = new Credits(options);
    return credits;
};

module.exports = creditsInit;