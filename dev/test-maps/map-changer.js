$(document).ready(function () {
    
    $("#map_toggle_button").click(function () {
        if ($(this).text() === "Show wages map") {
            $("#employmentmap").hide();
            $("#wagesmap").show();

            $(this).text("Show employment map");
        } else {

            $("#wagesmap").hide();
            $("#employmentmap").show();
            $(this).text("Show wages map");

        }
    });
});