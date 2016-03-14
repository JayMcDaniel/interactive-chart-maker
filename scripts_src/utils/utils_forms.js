/**
 * Forms utility object, contains functions that work with form elements
 * @namespace
 */
var utils_forms = {
    
    
    /** returns true if checkbox is checked, false if not 
    @param elem {element} checkbox element
    @returns {bool}
    */
    getCheckBoxValue: function getCheckBoxValue(elem){
        return elem.is(':checked');
    },

    /** gets an array of values from a given class 
    @param class_name {string}
    @returns {array}
    */
    getClassValuesArray: function (class_name) {
        var arr = [];
        $("." + class_name).each(
            function () {
                arr.push(Number($(this).val()));
            }
        );
        return arr;
    }

}

module.exports = utils_forms;