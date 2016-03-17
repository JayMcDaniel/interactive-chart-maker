/** parsing function for drilldown charts */
var parseForDrilldown = function (input, chart_type, colors) {

    var output = {};
    output.x_axis_categories = undefined;

    output.series = [{
        name: "test",
        colorByPoint: true,
        data: []
    }];

    output.drilldown = {};
    output.drilldown.series = [];

    $("tbody th p", input).each(function (i) {
        
        
        
        
        

        if (!$(this).is('[class*="sub"]')) { //if this doesn't countain "sub" as a class, it's a top level

            var this_name = $.trim($(this).text());
            var this_drilldown = $("tbody th:eq(" + (i + 1) + ") p", input).is('[class*="sub1"]') ? this_name : undefined;

            //make top level series
            output.series[0].data.push({
                name: this_name,
                y: $(this).parent().next().getNumber(),
                type: chart_type,
                color: colors[output.series[0].data.length],
                drilldown: this_drilldown
            });


        } else if ($(this).is('[class*="sub"]')) { //if this is a sub1 sub2 etc

            var next_sub = Number($(this).attr("class").replace("sub", "")) + 1; //to get the class of the next level sub
            console.log(next_sub);

            var this_name = $.trim($(this).text());
            var this_drilldown = $("tbody th:eq(" + (i + 1) + ") p", input).is('[class*="' + next_sub + '"]') ? this_name : undefined;
            var this_val = $(this).parent().next().getNumber();
            var last_drill_series = output.drilldown.series.length - 1;

            output.drilldown.series[last_drill_series].data.push({
                name: this_name,
                y: this_val,
                drilldown: this_drilldown
            });

        }

        //make drilldown series for those
        if (this_drilldown) {
            output.drilldown.series.push({
                name: this_name,
                id: this_name,
                data: []
            });
        }

    });
    return output;
};


module.exports = parseForDrilldown;