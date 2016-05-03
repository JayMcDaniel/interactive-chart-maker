/** Gets title from a text input element and returns it
@module
*/
var mapSubtitleInit = function (input) {
    var map_subtitle = {
        text: $.trim(input.val()),
        style: "color: #000; font-family: sans-serif; font-weight: normal; font-size: 12px; padding: 10px; margin-bottom: 0px; "
    }
    return map_subtitle;
};

module.exports = mapSubtitleInit;