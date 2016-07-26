/** Map tooltip object 
@namespace
**/

var map_tooltip_init = {
    
        /** creates and returns an empty tooltip div template **/
    getMapTooltip: function () {

        var tooltip_div = document.createElement("div");
        tooltip_div.className = "map_tooltip";
        tooltip_div.setAttribute("style", "min-width: 200px; min-height: 60px; background-color: #FCF8E3; border: solid 1px #395463; position: absolute; left: 353px; top: 5px; z-index: 501; display: none; padding-right: 5px;");

        var tooltip_title = document.createElement("h2");
        tooltip_title.className = "tooltip_title";
        tooltip_title.setAttribute("style", "color: #000; font-family: sans-serif; font-weight: bold; font-size:16px; margin: 5px 0px 0px 5px; ");

        var tooltip_main_value = document.createElement("h4");
        tooltip_main_value.className = "tooltip_main_value";
        tooltip_main_value.setAttribute("style", "color: #395463; font-family: sans-serif; font-weight: bold; font-size:38px; margin: 0px 0px 0px 5px;");
        
        
        tooltip_div.appendChild(tooltip_title);
        tooltip_div.appendChild(tooltip_main_value);

        return tooltip_div;
    },
    
    /** mods all_map_options.tooltip to have a dollar sign or percent sign if that option is selected **/
    formatMapToolTip: function(all_map_options){
        all_map_options.tooltip.dollar_sign = $("#chart_tooltip_signs_select").val() === "$" ? "$" : "";
        all_map_options.tooltip.percent_sign = $("#chart_tooltip_signs_select").val() === "%" ? "%" : "";
        all_map_options.tooltip.decimals = $("#chart_tooltip_force_decimals_select").val();
        all_map_options.tooltip.na_text = $("#map_tooltip_na_text_input").val();
    }
    
    
    
};


module.exports = map_tooltip_init;



