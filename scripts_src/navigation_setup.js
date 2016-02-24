/** object that contains functions for all the navigation, ie changing between options and chart types */
module.exports =  (function () {
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
                $(".notes", $(this).parents(".display")).toggle();
            });

        }
    }

    navigation_setup.sideNavTabsChange();
    navigation_setup.chartTypeIconChange();
    navigation_setup.helpIconClick();

})();

