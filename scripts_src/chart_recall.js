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

        $("input, select, textarea, #chart_type_icons, #table_input_load_series_from_icons, #color_palettes", $("#side_main")).each(function () {

            if (this.nodeName === "DIV") {
                var input_val = $(this).children("[class*='selected']").divVal();
            } else {
                var input_val = this.type === "checkbox" ? utils_form.getCheckBoxValue($(this)) : $(this).val();
            }

            saved_values.push({
                id: $(this).attr("id"),
                val: input_val
            });

        });

        return saved_values;

    },
    

    /** takes input (originally from #load_chart_textarea, parses it, and sets option values accordingly, to load a saved chart) **/
    loadValues: function (chart, all_chart_options, input) {
        try {
            input = JSON.parse(input);
        } catch (e) {
            // statements to handle any exceptions
            console.log("JSON parsing didn't work: " + e); // pass exception object to error handler
        }

        if (input.saved_values) {
            $.each(input.saved_values, function () {

                var element = document.getElementById(this.id);

                if (element.nodeName === "DIV") {
                    $(element).children().removeClass("selected");
                    $(element).children("[value='" + this.val + "']").addClass("selected");
                } else if (element.type === "checkbox") {
                    element.checked = this.val;
                } else{
                    element.value = this.val;
                }

            });

        }
    }

};

module.exports = chart_recall;