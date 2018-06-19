    /** 
                                                                                                                                    creates and returns some columns in a div that are ranked and sized and associated with the areas provided
                                                                                                                                    @namespace
                                                                                                                                    **/


    var map_ranked_columns_init = {

        /** creates and returns a ranked and sized columns div **/
        getRankedColumns: function (all_map_options) {


            //filter and sort areas
            var areas = all_map_options.areas.filter(function (area) {
                return area.value;
            }).sort(function (a, b) {
                return a.value - b.value;
            });



            //end if no areas
            if (!areas[areas.length - 1]) {
                return undefined;
            }
            var largest_val = areas[areas.length - 1].value;
            var smallest_val = areas[0].value;
            
           
            
            //outer div
            var ranked_column_div = $("<div id='ranked_column_div'>").css({
                height: "130px",
                width: "252px",
                backgroundColor: "none",
                position: "absolute",
                top: "470px",
                right: "7px",
                zIndex: 510
            });

            
                        

            //create inner columns
            $.each(areas, function (i, area) {
                var height = ((Math.abs(area.value) / largest_val) * 100);
                var column = $("<div>").attr("rel", area.id)
                    .addClass("map_ranked_column")
                    .css({
                        width: "4px",
                        backgroundColor: area.color,
                        height: height + "%",
                        position: "absolute",
                        left: (i * 5) + "px",
                        bottom: area.value < 0 ? (-1 * height) + "%" : 0 + "%"
                    })
                    .attr("previous_color", area.color);



                $(ranked_column_div).append(column);
            });
            
        

            return ranked_column_div;
        }
    }

    module.exports = map_ranked_columns_init;