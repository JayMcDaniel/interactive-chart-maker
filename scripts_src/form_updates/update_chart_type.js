var draw_chart = require("../draw_chart");
var plotOptionsInit = require("../initializers/charts/plot_options_init.js");
var update_data = require("./update_data.js");
var update_tooltip = require("./update_tooltip.js");
var update_x_axis = require("./update_x_axis.js");
var update_y_axis = require("./update_y_axis.js");
var utils_main = require("../utils/utils_main.js");


/** when a chart icon is clicked, this function is called - changes the chart type shown 
@module
*/
var updateChartType = function (chart_type, chart, all_chart_options) {


    //if drilled into a drilldown, click the up button to get out - prevents errors
    utils_main.drillUp();

    //if map
    if (chart_type === "map") {
        all_chart_options.chart.type = "map";
        return false;
    }


    //if not map
    var type = chart_type.replace("stacked_", "");
    

    //update xaxis for drilldown and make "bar" type
    if (type === "drilldown") {
        type = $("#drilldown_type_select").val();
        all_chart_options.xAxis.type = "category";
        all_chart_options.xAxis.categories = null;
    }else{
        all_chart_options.xAxis.type = "linear";
        all_chart_options.xAxis.categories = undefined;    
    }

    
    //if not a line and has a second y-axis, remove that axis

    if (type != "line") {
        $("#chart_y_axis_2_enabled_checkbox").prop('checked', false).change();
    }


    //update options
    var y_axis = all_chart_options.yAxis[0] ? all_chart_options.yAxis[0] : all_chart_options.yAxis;
    var x_axis = all_chart_options.xAxis;
    
    if (type === "bar" || type === "boxplot") {
        //fix y axis position
        chart.inverted = true;
        y_axis.title.align = "middle";
        x_axis.title.align = "high";
        y_axis.title.x = 0;
        y_axis.title.y = 8;
        x_axis.title.y = -20;
        x_axis.title.x = Number($("#chart_x_axis_x_position_input").val());

        //hide non-relevant elements
        $(".not_bar").hide();

    } else { //chart not bar
        chart.inverted = false;
        y_axis.title.align = "high";
        x_axis.title.align = "middle";
        y_axis.title.x = Number($("#chart_y_axis_x_position_input").val());
        y_axis.title.y = -20;
        x_axis.title.y = 0;
        x_axis.title.x = 0;

        $(".not_bar").show();
    }



    all_chart_options.xAxis.plotLines = [{
        "value": 0,
        "color": "#c0c0c0",
        "dashStyle": "solid",
        "width": type === "scatter" || type === "bubble" ? 1 : 0
        }];

    x_axis.gridLineWidth = type === "scatter" || type === "bubble" ? 1 : 0;
    x_axis.startOnTick = type === "scatter" || type === "bubble" ? true : false;

    chart.xAxis[0].update({
        gridLineWidth: all_chart_options.xAxis.gridLineWidth,
        plotLines: all_chart_options.xAxis.plotLines,
        startOnTick: all_chart_options.xAxis.startOnTick,
        type: all_chart_options.xAxis.type,
        categories: all_chart_options.xAxis.categories
    }, false);



    chart.xAxis[0].setTitle({
        align: all_chart_options.xAxis.title.align,
        y: all_chart_options.xAxis.title.y,
        x: all_chart_options.xAxis.title.x
    }, false);

    chart.yAxis[0].setTitle({
        align: y_axis.title.align,
        x: y_axis.title.x,
        y: y_axis.title.y
    }, false);


    //re parse data
    update_data.updateData(chart, all_chart_options);

    all_chart_options.chart.type = type;

    //update whether data labels are enabled
    $("#chart_show_data_labels_checkbox").change();

    //update tooltip
    update_tooltip.updateToolTip(chart, all_chart_options);


}


module.exports = updateChartType;