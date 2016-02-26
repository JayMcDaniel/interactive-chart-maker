/** object that contains functions for all the navigation, ie changing between options and chart types */
module.exports = (function () {
    var navigation_setup = {

        /** when tabs on left side nav bar are clicked, options displayed are changed */
        sideNavTabsChange: function sideNavTabsChange() {

            $("#side_nav_tabs .tab").click(function () {
                //change selected menu tab
                $("#side_nav_tabs .selected_tab").removeClass("selected_tab");
                $(this).addClass("selected_tab");

                //change display div showing
                var selectedID = "#" + $(this).attr("id").replace("tab", "display");
                $("#side_display .selected_display").removeClass("selected_display");
                $(selectedID).addClass("selected_display");

            });
        },

        /** when chart type icon is clicked and changed */
        chartTypeIconChange: function chartTypeIconChange() {

            $("#chart_type_icons .chart_type_icon").click(function () {
                //change selected icon
                $("#chart_type_icons .chart_type_icon").removeClass("selected_chart_type");
                $(this).addClass("selected_chart_type");

            });
        },

        /** when a help icon is clicked */

        helpIconClick: function helpIconClick() {

            $(".help_icon").click(function () {
                $(this).toggleClass("help_on");
                $(".notes", $(this).parents("div")).toggle();
            });

        },

        /** when a get code button is clicked */

        getCodeButtonClick: function getCodeButtonClick() {

            $("#get_code_button").click(function (e) {
                var $get_code_span = $("#get_code_text");
                $(this).toggleClass("code_on");
                $("#main_result_code_div").slideToggle(100);
                if ($get_code_span.text() === "Get code") {
                    $get_code_span.text("Hide code");
                } else {
                    $get_code_span.text("Get code");
                }
            });

        }
    }

    navigation_setup.sideNavTabsChange();
    navigation_setup.chartTypeIconChange();
    navigation_setup.helpIconClick();
    navigation_setup.getCodeButtonClick();

})();