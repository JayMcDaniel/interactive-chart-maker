/** 
Contains functions that make a report showing what areas from the given map were colored and what weren't
@module
**/
var areas_colored_report = {

    /** gerates the report **/
    generateReport: function (all_map_options) {

        var areas_colored = [];
        var areas_not_colored = [];

        $.each(all_map_options.areas, function (i, e) {
                        
            if (e.loc_name && typeof e.value === "number") { //if the area has a value
                areas_colored.push(e.loc_name);
            } else if (e.loc_name && typeof e.value === "object") { //if it's null or undefined
                areas_not_colored.push(e.loc_name)
            }

        });

        //alphabetize lists
        areas_colored.sort();
        areas_not_colored.sort();
        all_map_options.areas_not_found_from_table.sort();


        //bind to link and popup box
        $(".alert-danger").text($(areas_colored.length).addCommas() + " areas colored. Click for details.").css({
            "cursor": "pointer",
            "text-decoration": "underline"
        }).unbind().click(function () {
            areas_colored_report.showReport(all_map_options, areas_colored, areas_not_colored);
        });

    },



    /** bind clicking the alert-danger text popup to bring up the areas colored report **/
    showReport: function (all_map_options, areas_colored, areas_not_colored) {
        $("#areas_colored_report_div").slideDown(50, function () {
            $("#areas_colored_textarea").val(areas_colored.join("\n"));
            $("#areas_not_colored_textarea").val(areas_not_colored.join("\n"));
            $("#areas_not_found_from_table_textarea").val(all_map_options.areas_not_found_from_table.join("\n"));

        });

    }



};

module.exports = areas_colored_report;