var utils_form = require("./utils/utils_forms.js")

/**
 * Contains functions that deal with chart (options selected and data loaded) saving and loading
 * @namespace
 */

var chart_recall = {

    /** reads all of the page's selectable options and loads values into an object **/
    saveValues: function () {
        //object to load each input's values and ID's into (textareas, selects, checkboxes, div icons etc )
        var saved_values = [];

        $("input, select, textarea, #chart_type_icons, #table_input_load_series_from_icons, #color_palettes").each(function () {
            
            if (this.nodeName === "DIV"){
                var input_val = $(this).children("[class*='selected']").divVal();
            }else{
                var input_val = this.type === "checkbox" ? utils_form.getCheckBoxValue($(this)) : $(this).val();
            }
            
            saved_values.push({
                id: $(this).attr("id"),
                val: input_val
            });

        });

        return saved_values;

    }
};

module.exports = chart_recall;