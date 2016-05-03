var creditsInit = require("../initializers/charts/credits_init.js");

/** when credit options are changed in the side area 
@namespace
*/

var update_credits = {

    /** get and set the credits text **/
    updateCreditText: function (chart, all_chart_options) {

        all_chart_options.credits = creditsInit();

        var new_y = Number($("#chart_height_textinput").val()) + all_chart_options.credits.position.y - 26;
        chart.credits.element.setAttribute("y", new_y);

        //svg text elements don't use break; each new line must be wrapped in a new tspan
        var credits_text = all_chart_options.credits.text.split("<br>").map(function (line, i) {
                return '<tspan x="10" dy="12">' + line + "</tspan>";
            })
            .join("");

        $(chart.credits.element).html(credits_text);

    }

}


module.exports = update_credits;