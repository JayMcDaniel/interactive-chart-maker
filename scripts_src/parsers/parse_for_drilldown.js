    var utils_main = require("../utils/utils_main.js");

    //get x or z val for bubbles
    var getBubbleVal = function (str) {
        if (str === "x") {
            return $(this).parent().next().next().getNumber();
        }
        if (str === "z") {
            return $(this).parent().next().next().next().getNumber();
        }

    };




    /** get an invisible bubble (so sizes are constant between drills) **/

    var getInvisibleBubble = function (size, output) {

        //given a series, calls utils_main.limits.setMin() for each data.z
        var getZ = function (series, func) {
            $.each(series, function (i, serie) {
                $.each(serie.data, function (j, val) {
                    func(val.z);
                });
            });
        }


        var invisible_bubble_series = {
            name: "invisible size placeholder series",
            x: 0,
            y: 0,
            z: 0,
            type: "bubble",
            lineWidth: 0,
            marker: {
                enabled: false
            },
            color: "none",
            showInLegend: false,
            visible: false,
            zIndex: -1
        };


        //if min, return a min size bubble
        if (size === "min") {

            utils_main.limits.resetMin();

            getZ(output.drilldown.series, utils_main.limits.setMin);
            getZ(output.series, utils_main.limits.setMin);

            invisible_bubble_series.z = utils_main.limits.getMin();

        } else { //else get max

            utils_main.limits.resetMax();

            getZ(output.drilldown.series, utils_main.limits.setMax);
            getZ(output.series, utils_main.limits.setMax);

            invisible_bubble_series.z = utils_main.limits.getMax();

        }

        return invisible_bubble_series;
    };





    /** creates and pushes a new series object into the drilldown.series array **/
    var pushDrillSeries = function (output, drill_type, this_name, next_sub, this_drilldown) {

        output.drilldown.series.push({
            name: this_name,
            id: this_drilldown,
            data: [],
            type: drill_type,
            lineWidth: 0,
            sub: next_sub
        });
    };



    /** Parsing function for drilldown charts. See http://api.highcharts.com/highcharts#drilldown for more.
     * @module
     * @param input {element} input jquery table element retrieved from textarea
     * @param drill_type {string} type of drilldown (column or bar or bubble)
     * @param colors {array}
     * @returns {object} Object with series array and drilldown series array of objects*/
    var parseForDrilldown = function (chart, input, drill_type, colors) {


        //returns a unique number for the drilldown ids
        var IDcounter = {
            count: 0,
            getNextID: function () {
                this.count++;
                return this.count;
            }

        }

        try {

            //main obj that gets a series and drilldown.series arrays and is returned
            var output = {};


            output.x_axis_categories =  null;

            //top series array
            output.series = [{
                name: $.trim($("thead tr:first th:first", input).text()),
                colorByPoint: true,
                data: [],
                type: drill_type
            }];

            //drilldown object with a series array of objects - that will have a name, id, and data array


            //drilldown options, contains drilldown.series
            output.drilldown = {
                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        align: "right",
                        y: 0,
                        x: 0
                    }
                },

                activeAxisLabelStyle: {
                    cursor: drill_type === "bubble" ? "default" : "pointer",
                    fontWeight: drill_type === "bubble" ? "normal" : "bold",
                    textDecoration: "none"
                },

                series: []
            };

            //set for current chart
            if (chart) {
                chart.options.drilldown.drillUpButton = output.drilldown.drillUpButton;
                chart.options.drilldown.activeAxisLabelStyle = output.drilldown.activeAxisLabelStyle;
            }


            /** parsing function for top level series **/
            var parseTopLevel = function () {
                    var top_indexes = [];
                    $("tbody th p", input).each(function (i) {
                        if (!$(this).is('[class*="sub"]') || $(this).is('[class*="sub0"]')) { //if class is sub0 or nothing

                            var this_name = $.trim($(this).text());
                            var this_val = $(this).parent().next().getNumber();

                            //check if there's levels beneath this
                            var this_drilldown = $("tbody th:eq(" + (i + 1) + ") p", input).is('[class="sub1"]') ? this_name : null;


                            //if so, set up a drilldown series obj
                            if (this_drilldown) {
                                this_drilldown = this_drilldown + "_" + IDcounter.getNextID();
                                top_indexes.push(i);
                                pushDrillSeries(output, drill_type, this_name, "sub1", this_drilldown);
                            }


                            output.series[0].data.push({
                                name: this_name,
                                x: drill_type === "bubble" ? getBubbleVal.call($(this), "x") : undefined,
                                y: this_val,
                                z: drill_type === "bubble" ? getBubbleVal.call($(this), "z") : undefined,
                                color: colors[output.series[0].data.length],
                                cursor: this_drilldown ? "pointer" : "default",
                                type: drill_type,
                                drilldown: this_drilldown,
                                lineWidth: 0,
                                sub: "sub0"
                            });

                        }

                    });

                    return top_indexes;

                } //end parseTopLevel




            /**parsing function for sub levels **/
            var drill_series_index = 0; // output.drilldown.series index (increments after this_sub === current_sub statement)

            var parseSubLevel = function (current_sub, indexes) {
                    var drill_found = false; //if returned false, loop will stop calling this func
                    var indexes_count = 0; // gets incremented to move through indexes array
                    var new_indexes = []; //keeps track of row indexes for start of each sub

                    ///go through drilldown series array and populate with data

                    $(output.drilldown.series).each(function (i, e) {

                        var this_sub = this.sub;

                        if (this_sub === current_sub) {
                            var high_i = indexes[indexes_count + 1] ? indexes[indexes_count + 1] : 10000000;
                            var low_i = indexes[indexes_count];

                            //go through each row with this sub and add them as an obj to that drilldown series data array
                            $("tbody th:lt(" + high_i + "):gt(" + low_i + ") p." + this_sub, input).each(function () {
                                var this_name = $(this).text();

                                var this_row = $(this).parent().parent();
                                var this_row_index = this_row.index();
                                var this_y = $("td:eq(0)", this_row).getNumber();

                                //check if there's a level beneath this
                                var next_sub = "sub" + Number(Number(this_sub.replace("sub", "")) + 1);
                                var this_drilldown = $("p", this_row.next()).is('[class="' + next_sub + '"]') ? this_name : null;
                                

                                output.drilldown.series[drill_series_index].data.push({
                                    name: this_name,
                                    x: drill_type === "bubble" ? getBubbleVal.call($(this), "x") : undefined,
                                    y: this_y,
                                    z: drill_type === "bubble" ? getBubbleVal.call($(this), "z") : undefined,
                                    sub: next_sub,
                                    type: drill_type,
                                    cursor: this_drilldown ? "pointer" : "default",
                                    lineWidth: 0
                                });
                                
                                

                                //if there was a next sub level found, create that drilldown series with an id, name, and empty data array
                                if (this_drilldown) {
                                    
                                    //assign drilldown id to this last series (just pushed)
                                    this_drilldown = this_drilldown + "_" + IDcounter.getNextID();
                                    output.drilldown.series[drill_series_index].data[output.drilldown.series[drill_series_index].data.length -1].drilldown = this_drilldown;
                                    
                                    drill_found = true;
                                    new_indexes.push(this_row_index);

                                    pushDrillSeries(output, drill_type, this_name, next_sub, this_drilldown);

                                }

                            }); //end loop through p.[sub]

                            drill_series_index++;
                            indexes_count++;
                        } // end if specfific sub
                    }); //end loop through output.drilldown.series


                    return {
                        drill_found: drill_found,
                        indexes: new_indexes
                    }

                } //end parseSubLevel



            //make the top level series 
            var top_indexes = parseTopLevel();

            //  loop through sub levels until no more drilldowns found
            var current_sub = 1;
            var drill_stat = parseSubLevel("sub" + current_sub, top_indexes);

            while (drill_stat.drill_found) {
                current_sub++;
                drill_stat = parseSubLevel("sub" + current_sub, drill_stat.indexes);
            }


            //if this is a bubble drilldown, make a min and max size bubble so sizing is constant between drills
            if (drill_type === "bubble") {
                var min_invisible_bubble = getInvisibleBubble("min", output);
                var max_invisible_bubble = getInvisibleBubble("max", output);

                //apend invisible series to each series and drilldown.series array
                function appendToEachSeries(series, obj) {
                    $.each(series, function (i, serie) {
                        serie.data.push(obj);
                    });
                }

                output.series[0].data.push(min_invisible_bubble);
                output.series[0].data.push(max_invisible_bubble);

                //  output.drilldown.series.push(max_invisible_bubble);

                appendToEachSeries(output.drilldown.series, max_invisible_bubble);
                appendToEachSeries(output.drilldown.series, min_invisible_bubble);

            }

            return output;

        } catch (e) {
            console.log(e.line, e.stack, e);
            utils_main.showError("Sorry, the table wasn't formatted correctly for a drilldown chart. Please see the example on the data tab.")
        }
    };


    module.exports = parseForDrilldown;