/** Parsing function for drilldown charts. See http://api.highcharts.com/highcharts#drilldown for more.
 * @module
 * @param input {element} input jquery table element retrieved from textarea
 * @param drill_type {string} type of drilldown (column or bar)
 * @param colors {array}
 * @returns {object} Object with series array and drilldown series array of objects*/
var parseForDrilldown = function (input, drill_type, colors) {
    var output = {};
    output.x_axis_categories = [];

    output.series = [{
        name: "test",
        colorByPoint: true,
        data: [],
        type: drill_type
    }];

    output.drilldown = {};
    output.drilldown.series = [];

    $("tbody th p", input).each(function (i) {

        var next_sub = $(this).attr("class") ? Number($(this).attr("class").replace("sub", "")) + 1 : 1; //to get the class of the next level sub
        var this_name = $.trim($(this).text());
        var this_drilldown = $("tbody th:eq(" + (i + 1) + ") p", input).is('[class*="' + next_sub + '"]') ? this_name : undefined;
        var this_val = $(this).parent().next().getNumber();

        if (!$(this).is('[class*="sub"]')) { //if this doesn't countain "sub" as a class, it's a top level

            //make top level series
            output.series[0].data.push({
                name: this_name,
                y: this_val,
                color: colors[output.series[0].data.length],
                type: drill_type,
                drilldown: this_drilldown
            });
            
            //push top level categories name
        //    output.x_axis_categories.push(this_name);

        } else if ($(this).is('[class*="sub"]')) { //if this is a sub1 sub2 etc

            output.drilldown.series[output.drilldown.series.length - 1].data.push({  //push to last drilldown series in array (last one made).
                name: this_name,
                y: this_val,
                type: drill_type,
                drilldown: this_drilldown
            });
        } //end if sub or not

        //make drilldown series for those that have a sub under them
        if (this_drilldown) {
            output.drilldown.series.push({
                name: this_name,
                id: this_name,
                data: [],
                type: drill_type
            });
        }
    });
    
    return output;
};


module.exports = parseForDrilldown;