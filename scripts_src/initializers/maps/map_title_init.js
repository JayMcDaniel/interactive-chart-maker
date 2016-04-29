/** Gets title from a table and returns it
@module
*/
var mapTitleInit = function titleInit(table_input) {
    var map_title = {
        text: $.trim($("caption", $(table_input)).text()),
        style: "color: #000; font-family: sans-serif; font-weight: bold; font-size:14px; padding: 10px; margin-bottom: 0px;"
    }
    return map_title;
};

module.exports = mapTitleInit;