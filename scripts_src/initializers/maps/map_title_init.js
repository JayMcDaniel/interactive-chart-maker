/** Gets title from a table and returns it
@module
*/

var map_title_init = {


    /** creates and returns a styled map h2 title with text **/
    getMapTitle: function (title) {
        var map_title = document.createElement("h2");
        map_title.textContent = title.text;
        map_title.setAttribute("style", title.style);

        return map_title;
    },

    mapTitleInit: function titleInit(table_input) {
        var map_title = {
            text: $.trim($("caption", $(table_input)).text()),
            style: "color: #000; font-family: sans-serif; font-weight: bold; font-size:14px; padding: 10px; margin-bottom: 0px;"
        }
        return map_title;
    }
}


module.exports = map_title_init;