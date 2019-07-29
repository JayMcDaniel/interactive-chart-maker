/** checks if the app was loaded from the Better Table Wizard, and if so, loads that table and selects that icon 
@module
**/

var loadFromTableWizard = (function () {
    
    var imported_table = sessionStorage.getItem('imported_table');

    var imported_chart_type = sessionStorage.getItem('imported_chart_type');
    
    console.log("importing", imported_table, imported_chart_type);
    
    if (imported_table && imported_chart_type) {

        
            $(".chart_type_icon").removeClass("selected");
            
            $("#"+imported_chart_type).addClass("selected");
            
            $("#table_input_textarea").val(imported_table);
            
          //  window.opener.importedTable = null; //clear it so when page refreshes it's not the same table still
        
    }
    
})();

module.exports = loadFromTableWizard;