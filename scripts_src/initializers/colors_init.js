/** Initializer for "colors" options section of all_chart_options. Creates and returns a new instance 
@module
*/
var colorsInit = function colorsInit() {
    var color_arr = [];
    $("#color_palettes .selected .color_palette_cell").each(function () {
        color_arr.push($(this).css("background-color"));
    });
    
    if (color_arr.length < 1){
      color_arr =  ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
   '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
   '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    }
    
        return color_arr;
};
 
module.exports = colorsInit;