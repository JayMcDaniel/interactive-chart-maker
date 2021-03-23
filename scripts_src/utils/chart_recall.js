var utils_forms = require("./utils_forms.js");


/**
 * Contains functions that deal with chart (options selected and data loaded) saving and loading
 * @namespace
 */

var chart_recall = {


    /** reads all of the page's selectable options and loads values into an object **/

    saveValues: function () {
        //object to load each input's values and ID's into (textareas, selects, checkboxes, div icons etc )
        var saved_values = [];

        $("input, select, textarea, #chart_type_icons, #table_input_load_series_from_icons, #color_palettes, .series_type_div", $("#side_main")).each(function () {

            if (this.nodeName === "DIV") {
                var input_val = $(this).children("[class*='selected']").divVal();
            } else {
                var input_val = this.type === "checkbox" ? utils_forms.getCheckBoxValue($(this)) : $(this).val();
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

        console.log("loading saved chart");

        var utils_main = require("./utils_main.js");
        try {
            input = JSON.parse(input);
        } catch (e) {
            utils_main.showError("Sorry, the JSON parsing didn't work. Please double check your input. " + e);
        }


        /** goes through an array of objects with id / val, sets elements with a given ID to that value **/
        var setValues = function (arr, set_individual_series /*bool*/ ) {
            var individual_series_options = []; //gets populated if series_color and line_style_select are found

            $.each(arr, function () {

                if (!set_individual_series && this.id && this.id.match(/series_color|series_type_div|line_style_select|series_visible_checkbox|series_extra_data/)) { //look if this id has to do with individual series options
                    individual_series_options.push(this);
                } else {

                    var element = document.getElementById(this.id);
                    if (element) {
                        if (element.nodeName === "DIV") {
                            $(element).children().removeClass("selected");
                            $(element).children("[value='" + this.val + "']").addClass("selected");
                            $(element).children("[type='" + this.val + "']").click();


                        } else if (element.type === "checkbox") {
                            element.checked = this.val;
                        } else {
                            element.value = this.val;
                        }

                    } else {
                        console.log(this.id + " not found");

                    }
                }
            });



            return individual_series_options;
        }; //end setValues





        var individual_series_options = setValues(input, false); //false to not set indivdual series yet

        //initial all chart options init and redraw chart
        var allChartOptionsInit = require("../initializers/charts/all_chart_options_init.js");
        var draw_chart = require("../draw_chart.js");
        var chart_type = $("#chart_type_icons .selected").divVal();
        all_chart_options = allChartOptionsInit(chart_type);
        chart = undefined;
        chart = draw_chart.init(all_chart_options, draw_chart.chartCallback);

        //reinit form updates bindings
        var allFormUpdates = require("../form_updates/all_form_updates.js");


        

        allFormUpdates(chart, all_chart_options);


        //re populate the individual series options forms
        var update_individual_series = require("../form_updates/update_individual_series.js");
        update_individual_series.populateForm(chart, all_chart_options);
        setValues(individual_series_options, true); //true to set indivdual series now


        /*  trigger changes to update chart  */


        //line style changes
        $(".line_style_select, .series_visible_checkbox").each(function () {
            $(this).change();
        });

        //extra data 
        $(".series_extra_data_title_textarea, .series_extra_data_values_textarea").trigger('propertychange');

        //chart size
        $("#chart_width_textinput, #chart_height_textinput").keyup();

        //individual color changes
        $(".jscolor").each(function (i) {
            var color = "#" + $(this).val();
            update_individual_series.updateSeriesColor(chart, all_chart_options, i, color);
            $(this).focus().blur();
        });

        //add recession shading
        $("#chart_add_recession_shading_select").change();

        //click selected chart type (refreshes some .just_ options showing) FIX - this makes it all one type of chart
        allFormUpdates.displayOptions(chart_type);


        window.scrollTo(0, 0); //scrolls to top

        
        if (chart_type==="map"){
            $("#chart_type_icons .selected").click();
        }


    },




    /** when load_chart_button is clicked, load the input options from #load_chart_textarea and update the chart **/

    initLoad: function (chart, all_chart_options) {

        $("#load_chart_button").unbind().click(function () {
            var re = /"saved_values": *(\[[\s\S]+}\])/; //looks for saved values array of objects
            var input = $("#load_chart_textarea").val().match(re)[1]; //separate all_chart_options obj from textarea

            $("#load_chart_div").hide(function () { //hide this area (makes loading much faster)
                if (input.length > 0) {
                    chart_recall.loadValues(chart, all_chart_options, input);
                    $("#show_load_chart_area_button").removeClass("load_chart_showing");
                };
            });




        });
    }


};

module.exports = chart_recall;