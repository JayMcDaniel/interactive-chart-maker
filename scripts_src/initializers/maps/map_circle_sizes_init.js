var utils_main = require("../../utils/utils_main.js");

/** Given an array of map circles, this sorts them by value and decides what radius they should have 
@module
**/

var map_circle_sizes_init = {

    /** Given an array of map circles, this sorts them by value and decides what radius they should have  **/
    getCircleSizes: function (all_map_options) {


        var circle_values_arr = utils_main.valueSort(all_map_options.areas);
        //get multiple and adjust for big numbers
        all_map_options.circle_size_multiple = $("#map_circle_size_range").val();
        if (circle_values_arr[circle_values_arr.length - 1] > 100) {
            all_map_options.circle_size_multiple = all_map_options.circle_size_multiple * .05;
        }

        //assign R value to each circle area

        $(all_map_options.areas).each(function () {

            console.log(this.value);

            if (this.value != undefined) {
                console.log("coloring", this.value);
                var this_area = this.value ? Math.abs(this.value) || 1 : 1;
                this.r = Math.sqrt(this_area / Math.PI) * all_map_options.circle_size_multiple;
            }else{
                this.r = 0;
            }

            console.log("r",this.r);


        });

        map_circle_sizes_init.sortCircles(all_map_options.areas);

    },




    /** sorts circles so that smaller ones will appear on top in the map **/
    sortCircles: function (areas) {
        areas.sort(function (a, b) {

            //if no radius (ie a path, make order a high number so it gets stacked near the bottom)
            a.order = a.r ? a.r : 100000000000;
            b.order = b.r ? b.r : 100000000000;

            return b.order - a.order;

        });




    }

};

module.exports = map_circle_sizes_init;