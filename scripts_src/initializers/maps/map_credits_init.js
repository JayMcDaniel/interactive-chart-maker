/** Gets credits from a text input element and returns it
@module
*/
var mapCreditsInit = function (input) {
    var map_credits = {
        text: input.val().replace(/\n/g,"<br>"),
        style: "color: #000; font-family: sans-serif; font-weight: normal; font-size: 12px; padding: 10px; margin-bottom: 0px; "
    }
    return map_credits;
};

module.exports = mapCreditsInit;