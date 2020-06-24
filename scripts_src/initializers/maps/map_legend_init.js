    /**
                                                                            creates and returns a styled map div legend with color boxes and text
                                                                            @namespace
                                                                            **/


    var map_legend_init = {

      /** creates and returns a map legend div **/
      getMapLegend: function(all_map_options) {

        console.log("map_legend_init.getMapLegend");

        //create outer legend box
        var map_legend_div = document.createElement("div");
        map_legend_div.setAttribute("class", "map_legend_div");

        var top_adjustment = all_map_options.is_animated ? 480 : 420;
        map_legend_div.setAttribute("style", "position: absolute; top: " + (all_map_options.legend.y + top_adjustment) + "px; left: " + (all_map_options.legend.x + 261) + "px; width: " + all_map_options.legend.legend_width + "px; min-height: 130px; margin: auto; z-index: 500");


        //create legend item for each color
        var dollar = all_map_options.tooltip.dollar_sign;
        var percent = all_map_options.tooltip.percent_sign;
        var ranges = all_map_options.value_ranges;

        $.each(all_map_options.colors, function(i) {


          //outer div for each legend item
          var map_legend_item = document.createElement("div");
          map_legend_item.setAttribute("class", "map_legend_item");
          map_legend_item.setAttribute("style", "min-width: " + all_map_options.legend.item_width + "px; min-height: 15px; margin-bottom: 7px; cursor: default; float: left;");

          //map color box div for each legend item
          var map_legend_color = document.createElement("div");
          map_legend_color.setAttribute("class", "map_legend_color");

          //set round color boxes for metro type maps
          var border_radius = all_map_options.map_type === "metro_area" ? "50px" : "0px";

          //set legend color
          map_legend_color.setAttribute("style", "width: 15px; height: 15px; background-color: " + all_map_options.colors[i] + "; float: left; border: rgb(153, 153, 153) solid .5px; border-radius: " + border_radius + "");

          //map text div for each legend item
          var map_legend_text = document.createElement("div");
          map_legend_text.setAttribute("class", "map_legend_text");
          map_legend_text.setAttribute("style", "color: black; float: left; line-height: 1em; margin-left: 5px; font-size: 12px;");


          //if map is colored by names, just use unique names, otherwise use ranges
          if (all_map_options.is_colored_by_names) {

            map_legend_text.textContent = ranges[i];

          } else { //coloring by values

            //set legend text content and set mod so that numbers in legend are 1, .1, .01, or .001 off
            var dec = all_map_options.legend.decimals;
            if (i === 0) {

              map_legend_text.textContent = dollar + $(ranges[i]).addCommas(dec) + percent + " and lower";
            } else if (i === all_map_options.colors.length - 1) {
              map_legend_text.textContent = dollar + $(map_legend_init.valueMod(ranges[i - 1], all_map_options, dec)).addCommas(dec) + percent + " and higher";
            } else if ($(map_legend_init.valueMod(ranges[i - 1], all_map_options, dec)).addCommas(dec) === $(ranges[i]).addCommas(dec)) {
              map_legend_text.textContent = dollar + $(ranges[i]).addCommas(dec) + percent;
            } else {
              map_legend_text.textContent = dollar + $(map_legend_init.valueMod(ranges[i - 1], all_map_options, dec)).addCommas(dec) + percent + " to " + dollar + $(ranges[i]).addCommas(dec) + percent;
            }

            //replace dash signs with minus signs
            map_legend_text.textContent = map_legend_text.textContent.replace(/-/g, "\u2212");

          }

          if ($(map_legend_text).text() !== "") {
            map_legend_item.appendChild(map_legend_color);
            map_legend_item.appendChild(map_legend_text);
            map_legend_div.prepend(map_legend_item);
          }



        });


        //if map legend text is N/A, make gray color and move to end

        $.each($(map_legend_div).children(), function(i, el) {

          if ($(this).text() === "N/A") {

            $(this).children(".map_legend_color").css("background-color", "#f7f7f7");
            $(this).appendTo($(map_legend_div));
          }

        });

        //rgb(223, 223, 223)


        return map_legend_div;

      },



      /** returns a mod so that numbers in legend are 1, .1, .01, or .001 off so they don't overlap **/
      valueMod: function(val, all_map_options, dec) {
        var mod;

        switch (dec) {

          case "null": {
            if (all_map_options.value_ranges[all_map_options.value_ranges.length - 1] > 100) {
              mod = 1;
              dec = 0;
            } else {
              mod = .01;
              dec = 2;
            }
            break;
          }

          case "0": {
            mod = 1;
            break;
          }
          case "1": {
            mod = .1;
            break;
          }
          case "2": {
            mod = .01;
            break;
          }
          case "3": {
            mod = .001;
            break;
          }

        }


        return Number((val + mod).toFixed(dec));


      }



    };


    module.exports = map_legend_init;
