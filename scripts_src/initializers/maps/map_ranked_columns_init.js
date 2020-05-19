   /** creates and returns a ranked and sized columns div **/
   var map_ranked_columns_init = {


       getRankedColumns: function (all_map_options, map_display_area) {

           //filter and sort area values
           var areas = all_map_options.areas.filter(function (area) {

               if (all_map_options.is_animated && area.animated_vals) {
                   area.value = area.animated_vals[all_map_options.animation_index];
                   area.color = $("#" + area.id, map_display_area).css("fill");
               }

               return area.value;

           }).sort(function (a, b) {
               return a.value - b.value;
           });



           //end if no areas
           if (!areas[areas.length - 1]) {
               return undefined;
           }

           var largest_val = areas[areas.length - 1].value;
           if (largest_val < 10) {
             largest_val = 10;
           }



           //outer div
           var ranked_column_div = $("<div id='ranked_column_div'>").css({
               height: "130px",
               width: "252px",
               backgroundColor: "none",
               position: "absolute",
               top: "470px",
               right: "10px",
               zIndex: 510
           });



           //create inner columns
           $.each(areas, function (i, area) {
               var height = ((Math.abs(area.value) / largest_val) * all_map_options.ranked_columns_multiplier);

               console.log("height", height);
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
                   .attr("previous_color", area.color)
                   .hover(function () {
                           $(this).css("background-color", "#FFEB00");
                           $("#" + $(this).attr("rel"), map_display_area).mouseenter();
                       },
                       function () {
                           $(this).css("background-color", $(this).attr("previous_color"));
                           $("#" + $(this).attr("rel"), map_display_area).mouseleave();
                       });

               $(ranked_column_div).append(column);
           });



           return ranked_column_div;
       }
   }

   module.exports = map_ranked_columns_init;
