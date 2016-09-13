/** 
functions for map subtitle
@namespace
*/

var map_subtitle_init = {
    
    /**Gets title from a text input element and returns it **/
    mapSubtitleInit: function (input) {
        var map_subtitle = {
            text: $.trim(input.val()),
            style: "color: #000; font-family: sans-serif; font-weight: normal; font-size: 12px; padding: 10px; margin: 0px; position: absolute; top: 20px; z-index: 500"
        }
        return map_subtitle;
    },

    /** creates and returns a styled map h3 subtitle with text **/
    getMapSubtitle: function (subtitle) {
        var map_subtitle = document.createElement("h3");
        map_subtitle.textContent = subtitle.text;
        map_subtitle.setAttribute("style", subtitle.style);

        return map_subtitle;
    },
}


module.exports = map_subtitle_init;