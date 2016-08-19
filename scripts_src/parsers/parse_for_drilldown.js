    //get x or z val for bubbles
    var getBubbleVal = function (str) {
        if (str === "x") {
            return $(this).parent().next().next().getNumber();
        }
        if (str === "z") {
            return $(this).parent().next().next().next().getNumber();
        }
    }


    /** Parsing function for drilldown charts. See http://api.highcharts.com/highcharts#drilldown for more.
     * @module
     * @param input {element} input jquery table element retrieved from textarea
     * @param drill_type {string} type of drilldown (column or bar)
     * @param colors {array}
     * @returns {object} Object with series array and drilldown series array of objects*/
    var parseForDrilldown = function (input, drill_type, colors) {

        try {

            //main obj that gets a series and drilldown.series arrays and is returned
            var output = {};

            output.x_axis_categories = drill_type === "bubble" ? null : [];

            //top series array
            output.series = [{
                name: $.trim($("thead tr:first th:first", input).text()),
                colorByPoint: true,
                data: [],
                type: drill_type
            }];

            //drilldown object with a series array of objects - that will have a name, id, and data array
            output.drilldown = {
                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        y: 0,
                        x: 0
                    }
                },
                series: []
            };



            ///////make the top level series /////
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
                            top_indexes.push({
                                name: this_name,
                                index: i
                            });

                            output.drilldown.series.push({
                                name: this_name,
                                id: this_name,
                                data: [],
                                type: drill_type,
                                lineWidth: 0
                            });
                        }


                        output.series[0].data.push({
                            name: this_name,
                            x: drill_type === "bubble" ? getBubbleVal("x") : undefined,
                            y: this_val,
                            z: drill_type === "bubble" ? getBubbleVal("z") : undefined,
                            color: colors[output.series[0].data.length],
                            type: drill_type,
                            drilldown: this_drilldown,
                            lineWidth: 0
                        });

                    }

                });

                return top_indexes;

            }

            var top_indexes = parseTopLevel();


            ///////make first sub indexes /////
            var parseSubs = function (indexes, sub_level, skip_num) {

                var sub_indexes = [];
                var next_sub_level = "sub" + Number(Number(sub_level.replace("sub", "")) + 1);
                console.log(next_sub_level);

                $(indexes).each(function (i) {
                    //get high and low row indexes from array - this is the subset
                    var high_i = indexes[i + 1] ? indexes[i + 1].index : 10000000;
                    var low_i = indexes[i].index;

                    $("tbody th:lt(" + high_i + "):gt(" + low_i + ") p", input).each(function (j, e) {


                        //look only at the .sub1 th p's
                        if ($(this).is('[class*="' + sub_level + '"]')) {

                            var row_index = $(this).parent().parent().index();
                            var next_index = row_index + 1;
                            var next_row_p_class = $("tbody tr:eq(" + next_index + ") th p", input).attr("class");
                            var next_row_title = $("tbody tr:eq(" + next_index + ") th p", input).text();

                            var this_name = $.trim($(this).text());
                            var this_val = $(this).parent().next().getNumber();


                            //look if this has a sub under it, if so, add drilldown
                            if (next_row_p_class === next_sub_level) {

                                sub_indexes.push({
                                    name: this_name,
                                    index: row_index
                                });


                                var this_drilldown = this_name;


                                //add a drilldown series object to the end
                                output.drilldown.series.push({
                                    name: this_name,
                                    id: this_name,
                                    data: [],
                                    type: drill_type,
                                    lineWidth: 0
                                });

                            }



                            //add the data to the recently set up drilldown series obj (i is an index of the loop through indexes)
                            output.drilldown.series[i + skip_num].data.push({
                                name: this_name,
                                x: drill_type === "bubble" ? getBubbleVal("x") : undefined,
                                y: this_val,
                                z: drill_type === "bubble" ? getBubbleVal("z") : undefined,
                                type: drill_type,
                                drilldown: this_drilldown || undefined,
                                lineWidth: 0

                            });

                        }


                    });



                });

                return sub_indexes;
            }




            ///DO the sub level parsing if applicable ////
            if (top_indexes.length > 0) {
                //first round of subs
                var sub_indexes = parseSubs(top_indexes, "sub1", 0); //(index obj, current sub level, number to skip when pushing to drilldown.series[i+skip_num].data)

                //next rounds of subs
                var sub_num = 1;
                while (sub_indexes.length > 0) {
                    var skip_num = sub_indexes.length + 1;
                    sub_num++;
                    sub_indexes = parseSubs(sub_indexes, "sub" + sub_num, skip_num);

                }
            }


            return output;

        } catch (e) {
            console.log(e);
            $(".alert-danger").text("Sorry, the table wasn't formatted correctly for a drilldown chart. Please see the example on the data tab.");

            setTimeout(function () {
                $(".alert-danger").text("");
            }, 10000);
        }
    };


    module.exports = parseForDrilldown;