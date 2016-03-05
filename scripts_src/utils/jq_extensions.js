var jq_extensions = (function () {

    jQuery.fn.extend({

        /** extend so that we can get and set "value" with divs */
        divVal: function (string) {
            if (arguments.length === 0) {
                return $(this).attr("value");
            } else {
                $(this).attr("value", string);
                return $(this);
            }

        },

        /** puts commas in a number */
        addCommas: function () {
            var val = this[0];
            if (isNaN(val)) {
                return val;
            } else if ((val > 999) || (val < -999)) {
                while (/(\d+)(\d{3})/.test(val.toString())) {
                    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                }
            }
            return val;
        },
        
        /** takes an element's text string and returns a number, trimming spaces and removing non-numbers (good for numbers with commas etc.)*/
        getNumber: function(){
            var val = Number($.trim($(this).text().replace(/[^0-9\.]+/g, '')));
            return isNaN(val) ? null : val;
        }
        
    });

})();

module.exports = jq_extensions;