var update_individual_series = require("./form_updates/update_individual_series.js");

/**
 * Contains functions that deal with keyboard inputs
 * @namespace
 */
var keyboard_inputs = {

    adjValue: function (val, direction) {
        var val = Number(val);
        if (!isNaN(val)) {
            return direction === "+" ? val + 10 : val - 10;
        } else {
            return val;
        }
    },

    /** clicks the next element of a given classname than the one selected
    @param classname {string} the class name of each of the elements
    @param selected_classname {string} the name of the selected element
    **/
    clickNext: function (classname, selected_classname, prev) {
        var only_visible = classname === "tab" ? ":visible" : "";
        
        var next = 0;
        var len = $("." + classname + only_visible).length;
        
        $("." + classname + only_visible).each(function (i) {
            if ($(this).hasClass(selected_classname)) {
 
               next = prev ? i + prev : i+ 1; //if a prev exists, go backwards
                if (next === len) { //if end is reached, go to first
                    next = 0;
                }
            }
        });
        $("." + classname + only_visible+":eq(" + next + ")").click();
    },


    /** when nothing is selected, pressing up or down changes which side nav tab is selected */
    sideNavTabShortcuts: function () {
        var keys = keyboard_inputs,
            $h = $("#chart_height_textinput"),
            $w = $("#chart_width_textinput"),
            $rm = $("#right_margin_textinput"),
            $lm = $("#left_margin_textinput"),
            $tm = $("#top_margin_textinput"),
            $bm = $("#bottom_margin_textinput");


        $(document).unbind().keydown(function (e) {

            //chart resizing keys
            if (e.shiftKey && e.keyCode === 40) { //shift + down
                e.preventDefault();
                $h.val(keys.adjValue($h.val(), "+")).keyup();

            } else if (e.shiftKey && e.keyCode === 38) { //shift + up
                e.preventDefault();
                $h.val(keys.adjValue($h.val(), "-")).keyup();

            } else if (e.shiftKey && e.keyCode === 37) { //shift + left
                e.preventDefault();
                $w.val(keys.adjValue($w.val(), "-")).keyup();

            } else if (e.shiftKey && e.keyCode === 39) { //shift + right
                e.preventDefault();
                $w.val(keys.adjValue($w.val(), "+")).keyup();
            }



            //margin resizing keys (up and right margins)
            else if ((event.ctrlKey || event.metaKey) && e.keyCode === 39) { //ctrl/cmd + right
                e.preventDefault();
                $rm.val(keys.adjValue($rm.val(), "-")).keyup();

            } else if ((event.ctrlKey || event.metaKey) && e.keyCode === 37) { //ctrl/cmd + left
                e.preventDefault();
                $rm.val(keys.adjValue($rm.val(), "+")).keyup();

            } else if ((event.ctrlKey || event.metaKey) && e.keyCode === 38) { //ctrl/cmd + up
                e.preventDefault();
                $tm.val(keys.adjValue($tm.val(), "-")).keyup();

            } else if ((event.ctrlKey || event.metaKey) && e.keyCode === 40) { //ctrl/cmd + down
                e.preventDefault();
                $tm.val(keys.adjValue($tm.val(), "+")).keyup();
            }


            //margin resizing keys (bottom and left margins
            else if (event.altKey && e.keyCode === 39) { //alt + right
                e.preventDefault();
                $lm.val(keys.adjValue($lm.val(), "+")).keyup();

            } else if (event.altKey && e.keyCode === 37) { //alt + left
                e.preventDefault();
                $lm.val(keys.adjValue($lm.val(), "-")).keyup();

            } else if (event.altKey && e.keyCode === 38) { //alt + up
                e.preventDefault();
                $bm.val(keys.adjValue($bm.val(), "+")).keyup();

            } else if (event.altKey && e.keyCode === 40) { //alt + down
                e.preventDefault();
                $bm.val(keys.adjValue($bm.val(), "-")).keyup();
            }


            //side nav up and down keys
            else if (e.keyCode === 38) { //up
                e.preventDefault();
                keys.clickNext("tab", "selected_tab", -1); //-1 for prev
            } else if (e.keyCode === 40) { //down
                e.preventDefault();
                keys.clickNext("tab", "selected_tab");
            }


            //chart type (cycle through)    
            else if (e.shiftKey && e.keyCode === 67) { //shift + c 
                e.preventDefault();
                keys.clickNext("chart_type_icon", "selected");
            }


            
            //color template (cycle through)    
            else if (e.keyCode === 67) { //c
                e.preventDefault();

                if ($(".map_display_area").is(":visible")) {
                    keys.clickNext("map_color_palette_row", "selected"); //map colors
                } else {
                    keys.clickNext("color_palette_row", "selected"); //chart colors
                }

            }

            //side nav shortcut keys
            else if (e.keyCode === 83) { //s
                $("#tab_chart_template").click();
            } else if (e.keyCode === 68) { //d
                $("#tab_data").click();
            } else if (e.keyCode === 73) { //i
                $("#tab_series_options").click();
            } else if (e.keyCode === 76) { //l
                $("#tab_chart_legend").click();
            } else if (e.keyCode === 88) { //x
                $("#tab_chart_x_axis").click();
            } else if (e.keyCode === 89) { //y
                $("#tab_chart_y_axis").click();
            } else if (e.keyCode === 84) { //t
                $("#tab_chart_tooltip").click();
            } else if (e.keyCode === 78) { //n
                $("#tab_chart_credits").click();
            } else if (e.keyCode === 69) { //69
                $("#tab_chart_extra_options").click();
            }

        });
    },

    /** in number entry inputs, pressing up or down will adjust value */
    numberChange: function (e) {
        if (e.keyCode === 38) { //up 
            $(this).val(keyboard_inputs.adjValue($(this).val(), "+"));
        } else if (e.keyCode === 40) { //down
            $(this).val(keyboard_inputs.adjValue($(this).val(), "-"));
        }
    },

    /** initialize listenters 
    when a number entry input is focused on, attach those event listeners
    when it leaves to main document, attach those. called from navigation_setup.InitNavWithChart()
    **/
    initListeners: function () {
        
        $("input, textarea").focus(function () {
            $(document).unbind();      

            $(this).off("keydown"); //so it doesnt duplicate when moving from one entry to another
            $(".number_entry").on("keydown", keyboard_inputs.numberChange);
        });
        $("input, textarea").blur(function () {
            $(this).off("keydown");
            //reinit side tab nav shortcuts
            keyboard_inputs.sideNavTabShortcuts();
        });

        //unbind nav quick keys when over the code result area
        $("#main_result_code_div").hover(function () {
                $(document).unbind();
            },
            function () {
                keyboard_inputs.sideNavTabShortcuts();
            });

    }

}


module.exports = keyboard_inputs;