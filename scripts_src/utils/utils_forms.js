var utils_forms = {
    
    
    /** returns true if checkbox is checked, false if not */
    getCheckBoxValue: function getCheckBoxValue(elem){
        return elem.is(':checked');
    },

    /** gets an array of values from a given class */
    getClassValuesArray: function (className) {
        var arr = [];
        $("." + className).each(
            function () {
                arr.push(Number($(this).val()));
            }
        );
        return arr;
    }

}

module.exports = utils_forms;