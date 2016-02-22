var navigation_setup = {

    sideNavTabsChange: function sideNavTabsChange() {
        $("#side_nav_tabs .tab").click(function () {
            //change selected menu tab
            $(".selected_tab").removeClass("selected_tab");
            $(this).addClass("selected_tab");

            //change display div showing
            var selectedID = "#" + $(this).attr("id").replace("tab", "display");
            $("#side_display .selected_display").removeClass("selected_display");
            $(selectedID).addClass("selected_display");

        });
    }
}

module.exports = navigation_setup;