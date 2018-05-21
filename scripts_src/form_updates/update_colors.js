var colorsInit = require("../initializers/charts/colors_init.js");
var allFormUpdates = require("./all_form_updates.js");

/** updates the chart's colors - called when palette is changed. Calls colorsInit 
@module
@param chart {object} the main chart object, built when chart is loaded
@param all_chart_options {object} the main chart options that load into building of the chart and are turned to string for the output
**/
var updateColors = function (chart, all_chart_options, chart_type) {
    all_chart_options.colors = colorsInit();
    chart.options.colors = all_chart_options.colors;


    console.log("updating colors", chart_type);

    if (chart_type === "drilldown") { //drilldowns color by point

        $(chart.series[0].data).each(function (i) {


            if (this.color != "none") {
                //update chart
                this.update({
                    color: all_chart_options.colors[i]
                }, false);
                //update all_chart_options.series.data colors
                all_chart_options.series[0].data[i].color = all_chart_options.colors[i];
            } else {

            }

        });

    } else { //other charts color by series

        var start_coloring_index = 0;
        var color_index_mod = 0;

        if (chart_type === "bubble" && $("#bubble_animated_checkbox").is(":checked")) {
            start_coloring_index = 2;
            color_index_mod = 2;
        }

        var colors_len = all_chart_options.colors.length;
        console.log("colors_len", colors_len);
        
        $(chart.series).each(function (i) {

            if (i >= start_coloring_index) {
                var color_index = (i - color_index_mod) - Math.floor((i - color_index_mod) / colors_len) * colors_len;
                var new_color = all_chart_options.colors[color_index];
                //update chart
                this.update({
                    color: new_color
                }, false);
                //update all_chart_options.series colors
                all_chart_options.series[i - color_index_mod].color = new_color;

            }
        });


    }

    chart.redraw();
}

//make custom color palette from textbox and add to end of palettes, callback is updating the color row functionality
updateColors.addCustomPalette = function (all_chart_options, callback) {
    var custom_colors = $.trim($("#custom_colors_textarea").val()).split(/\s/);
    custom_colors = custom_colors.filter(function (n) {
        return n != undefined
    });


    var color_palette_row_class, color_palette_cell_class;

    if (all_chart_options.chart.type === "map") {
        color_palette_row_class = "map_color_palette_row";
        color_palette_cell_class = "map_color_palette_cell";

    } else {
        color_palette_row_class = "color_palette_row";
        color_palette_cell_class = "color_palette_cell";
    }


    var $custom_color_palette_row = $('<div class="' + color_palette_row_class + ' color_palette_row_custom" value="color_palette_row_custom"></div>');

    $.each(custom_colors, function (i, color) {

        var $color_palette_cell = $('<div class="' + color_palette_cell_class + '" style="background-color: ' + color + ';">&nbsp;</div>');
        $custom_color_palette_row.append($color_palette_cell);
    });

    $custom_color_palette_row.append('<div style="clear:both; height:5px;">&nbsp;</div>');

    if (all_chart_options.chart.type === "map") {
        $("#map_color_palettes").append($custom_color_palette_row);

    } else {
        $("#color_palettes").append($custom_color_palette_row);

    }

    callback();
    $(".color_palette_row_custom").click();




};

module.exports = updateColors;