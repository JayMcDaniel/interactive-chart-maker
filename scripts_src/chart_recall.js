var utils_form = require("./utils/utils_forms.js");



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
        //console.log(JSON.stringify(saved_values));
        return saved_values;

    },




    /** takes input (originally from #load_chart_textarea, parses it, and sets option values accordingly, to load a saved chart) **/

    loadValues: function (chart, all_chart_options, input) {
        try {
            input = JSON.parse(input);
        } catch (e) {
            // statements to handle any exceptions
            $(".alert-danger").text("Sorry, the JSON parsing didn't work. Please double check your input. " + e); // pass exception object to error handler
            setTimeout(function () {
                $(".alert-danger").text("");
            }, 8000);

        }




        /** goes through an array of objects with id / val, sets elements with a given ID to that value **/
        var setValues = function (arr, set_individual_series /*bool*/ ) {
            var individual_series_options = []; //gets populated if series_color and line_style_select are found

            $.each(arr, function () {

                if (!set_individual_series && this.id.match(/series_color/)) { //look if this id has to do with individual series options
                    individual_series_options.push(this);
                } else if (!set_individual_series && this.id.match(/line_style_select/)) {
                    individual_series_options.push(this);
                } else {

                    var element = document.getElementById(this.id);
                    if (element) {
                        if (element.nodeName === "DIV") {
                            $(element).children().removeClass("selected");
                            $(element).children("[value='" + this.val + "']").addClass("selected");
                        } else if (element.type === "checkbox") {
                            element.checked = this.val;
                        } else {
                            element.value = this.val;
                        }
                    }
                }
            });

            return individual_series_options;
        }; //end setValues



        if (input.saved_values) {
            var individual_series_options = setValues(input.saved_values, false); //false to not set indivdual series yet
            //console.log(individual_series_options);

            //initial all chart options init and redraw chart
            var allChartOptionsInit = require("./initializers/all_chart_options_init.js");
            var draw_chart = require("./draw_chart.js");
            all_chart_options = allChartOptionsInit();
            chart = undefined;
            chart = draw_chart.init(all_chart_options);

            //reinit form updates bindings
            var allFormUpdates = require("./form_updates/all_form_updates.js");
            allFormUpdates(chart, all_chart_options);

            //re populate the individual series options forms
            var update_individual_series = require("./form_updates/update_individual_series.js");
            update_individual_series.populateForm(chart, all_chart_options);
            setValues(individual_series_options, true); //true to set indivdual series now


            $(".line_style_select").each(function () {
                $(this).change();
            });


        }
    },




    /** when load_chart_button is clicked, load the input options from #load_chart_textarea and update the chart **/

    initLoad: function (chart, all_chart_options) {

        $("#load_chart_button").unbind().click(function () {
            var input = $("#load_chart_textarea").val();
            $("#show_load_chart_area_button").click(); //hide this area (makes loading much faster)
            if (input.length > 0) {
                chart_recall.loadValues(chart, all_chart_options, input);
            };

        });
    }


};

module.exports = chart_recall;