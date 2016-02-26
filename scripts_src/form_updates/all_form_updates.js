/** listens for any form updates and calls appropriate function */
var update_template = require("./update_template.js");
var update_chart_options = require("./update_chart_options.js");
var writeCode = require("../write_code.js");
var utils_forms = require("../utils/utils_forms");

var allFormUpdates = function (chart, all_chart_options) {

    //chart width
    $("#chart_width_textinput").keyup(function () {
        update_template.resize($(this).val(), "width", chart, all_chart_options);
    });

    //chart height
    $("#chart_height_textinput").keyup(function () {
        update_template.resize($(this).val(), "height", chart, all_chart_options);
    });


    $(".margin_input").keyup(function () {

        var margins_arr = utils_forms.getClassValuesArray("margin_input");

        update_template.margin(margins_arr, chart, all_chart_options);

    });



    //chart type changed

    $.each(['line', 'bar', 'column', 'bubble', 'scatter', "drilldown"], function (i, type) {
        $('#chart_type_' + type).click(function () {
            update_chart_options.changeChartType(i, type, chart, all_chart_options)
        });
    });

};

module.exports = allFormUpdates;