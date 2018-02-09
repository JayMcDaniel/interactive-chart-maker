var ChartOptions = require("../../constructors/charts/chart.js");
var update_template = require("../../form_updates/update_template.js");
//var update_chart_options = require("../../form_updates/update_chart_options.js");

/** Initializer for "chart" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var chartInit = function chartInit(chart_type, chart) {

    if (chart_type === "drilldown") {
        chart_type = "column";
    }

    //load options from user inputs
    var options = {
        events: {
            redraw: function () {
                if (chart) {
                    $.each(chart.series, function (i, serie) {
                        $.each(serie.data, function (j, point) {
                            if (point.options.cursor === "pointer") {
                                point.graphic.attr({
                                    cursor: 'pointer'
                                });
                            }
                        });
                    });
                }
            }

        },
        margin: [Number($("#top_margin_textinput").val()),
                  Number($("#right_margin_textinput").val()),
                  Number($("#bottom_margin_textinput").val()),
                  Number($("#left_margin_textinput").val()),
                 ],
        renderTo: update_template.changeID($("#chart_id_textinput").val()),
        type: chart_type,
        inverted: chart_type == "boxplot" ? true : false
    }

    var chart_options = new ChartOptions(options);
    return chart_options;
};

module.exports = chartInit;