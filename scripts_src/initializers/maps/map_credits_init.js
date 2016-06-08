/** 
functions for map credits
@module
*/

var map_credits_init = {

/**Gets credits from a text input element and returns it **/
    mapCreditsInit: function (input) {
        var map_credits = {
            text: input.val().replace(/\n/g, "<br>"),
            style: "color: #000; font-family: sans-serif; font-weight: normal; font-size: 12px; padding: 10px; margin-bottom: -5px; position: absolute; bottom: 0px; z-index: 500"
        }
        return map_credits;

    },

    /** creates and returns a styled map div credits with text **/
    getMapCredits: function (credits) {
        var map_credits = document.createElement("div");
        map_credits.innerHTML = credits.text;
        map_credits.setAttribute("style", credits.style);

        return map_credits;
    }
};

module.exports = map_credits_init;