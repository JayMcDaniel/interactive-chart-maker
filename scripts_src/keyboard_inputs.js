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


    /** when nothing is selected, pressing up or downchanges which side nav tab is selected */
    sideNavTabShortcuts: function () {
        $(document).keydown(function (e) {

            if (e.keyCode === 38) { //up
                e.preventDefault();
                $(".selected_tab").prev().click();
            } else if (e.keyCode === 40) { //down
                e.preventDefault();
                $(".selected_tab").next().click();
            } else if (e.keyCode === 67) { //c
                $("#tab_type").click();
            } else if (e.keyCode === 83) { //s
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
    when it leaves to main document, attach those
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


    }

}

//first init
keyboard_inputs.sideNavTabShortcuts();
keyboard_inputs.initListeners();

module.exports = keyboard_inputs;