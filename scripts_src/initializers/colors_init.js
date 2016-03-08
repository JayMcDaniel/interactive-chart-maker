var Colors = require("../constructors/charts/colors.js");

/** Initializer for "colors" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var colorsInit = function colorsInit(chart) {
    var color_arr = [];
    $(".color_palette_selected .color_palette_cell").each(function () {
        color_arr.push($(this).css("background-color"));
    });
    
    if (chart){
        return color_arr;
    }

    //load options from user inputs
    var options = {
        colors: color_arr
    };

    var colors = new Colors(options);
    return colors.colors;
};

module.exports = colorsInit;