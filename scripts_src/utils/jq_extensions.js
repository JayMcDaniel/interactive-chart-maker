var jq_extensions = (function () {

    jQuery.fn.extend({
        divVal: function (string) { //extend so that we can get and set "value" with divs
            if (arguments.length === 0) {
                return $(this).attr("value");
            } else {
                
                $(this).attr("value", string);
                return $(this);
            }

        }
    });

})();

module.exports = jq_extensions;