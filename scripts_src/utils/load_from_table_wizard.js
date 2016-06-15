/** checks if the app was loaded from the Better Table Wizard, and if so, loads that table and selects that icon 
@module
**/

var loadFromTableWizard = (function () {
    if (window.opener) {

        if (window.opener.importedTable && window.opener.importedTable.length > 0) {
            
            $(".chart_type_icon").removeClass("selected");
            
            $("#"+window.opener.importedChartType).addClass("selected");
            
            $("#table_input_textarea").val(window.opener.importedTable);
            
            window.opener.importedTable = null; //clear it so when page refreshes it's not the same table still
        }
    }
    
})();

module.exports = loadFromTableWizard;