/** object that contains functions for all the navigation, ie changing between options and chart types */
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
    }
}

module.exports = navigation_setup;