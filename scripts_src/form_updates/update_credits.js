var creditsInit = require("../initializers/charts/credits_init.js");

/** when credit options are changed in the side area 
@namespace
*/

var update_credits = {

    /** get and set the credits text **/
    updateCreditText: function (chart, all_chart_options) {

        all_chart_options.credits = creditsInit();
        all_chart_options.exporting.chartOptions.credits.text = all_chart_options.credits.text.replace("Click legend items to change data display. Hover over chart to view data.", "");
        

        var new_y = Number($("#chart_height_textinput").val()) + all_chart_options.credits.position.y - 26;
        chart.credits.element.setAttribute("y", new_y);

        //svg text elements don't use break; each new line must be wrapped in a new tspan
        var credits_text = all_chart_options.credits.text.split("<br>").map(function (line, i) {
                return '<tspan x="10" dy="12">' + line + "</tspan>";
            })
            .join("");

        $(chart.credits.element).html(credits_text);

    },

    /** update chart_credits_text_textarea box with new text **/
    updateTextAreaBox: function (all_chart_options) {

        //if it's a map...
        if (all_chart_options.chart.type === "map") {

            var map_type = $("#map_type_select option:selected").text().toLowerCase();
            var map_type_plural = map_type === "county" ? "counties" : map_type + "s";

            $("#chart_credits_text_textarea").val("Hover over a " + map_type + " to see data.\nHover over legend items to see " + map_type_plural + " in a category.\nSource: U.S. Bureau of Labor Statistics."); //update credits area

        }


    }


}


module.exports = update_credits;