    /** 
    creates and returns a styled map div legend with color boxes and text 
    @namespace
    **/


var map_legend_init = {
    
    getMapLegend: function (all_map_options) {

        //create outer legend box
        var map_legend_div = document.createElement("div");
        map_legend_div.setAttribute("class", "map_legend_div");
        map_legend_div.setAttribute("style", "position: absolute; top: " + (all_map_options.legend.y + 390) + "px; left: " + (all_map_options.legend.x + 261) + "px; min-width: 131px; min-height: 130px; margin: auto; z-index: 500");


        //create legend item for each color
        var dollar = all_map_options.tooltip.dollar_sign;
        var percent = all_map_options.tooltip.percent_sign;

        $.each(all_map_options.colors, function (i) {


            var map_legend_item = document.createElement("div"); //outer div for each legend item
            map_legend_item.setAttribute("class", "map_legend_item");
            map_legend_item.setAttribute("style", "min-width: 171px; min-height: 15px; margin-bottom: 7px; cursor: default;");

            var map_legend_color = document.createElement("div"); //map color box div for each legend item
            map_legend_color.setAttribute("class", "map_legend_color");
            //set round color boxes for metro type maps
            var border_radius = all_map_options.map_type === "metro_area" ? "50px" : "0px";
            map_legend_color.setAttribute("style", "width: 15px; height: 15px; background-color: " + all_map_options.colors[i] + "; float: left; border: rgb(153, 153, 153) solid .5px; border-radius: " + border_radius + "");

            var map_legend_text = document.createElement("div"); //map text div for each legend item
            map_legend_text.setAttribute("class", "map_legend_text");
            map_legend_text.setAttribute("style", "color: black; float: left; line-height: 1em; margin-left: 5px; font-size: 12px;");
            
            var dec = all_map_options.tooltip.decimals;

            if (i === 0) {
                map_legend_text.textContent = dollar + $(all_map_options.value_ranges[i]).addCommas(dec) + percent + " and lower";
            } else if (i === all_map_options.colors.length - 1) {
                map_legend_text.textContent = dollar + $(all_map_options.value_ranges[i - 1]).addCommas(dec) + percent + " and higher";
            } else {
                map_legend_text.textContent = dollar + $(all_map_options.value_ranges[i - 1]).addCommas(dec) + percent + " to " + dollar + $(all_map_options.value_ranges[i]).addCommas(dec) + all_map_options.tooltip.percent_sign;
            }


            map_legend_item.appendChild(map_legend_color);
            map_legend_item.appendChild(map_legend_text);
            map_legend_div.appendChild(map_legend_item);


        });

        return map_legend_div;
    }
};


module.exports = map_legend_init;

    