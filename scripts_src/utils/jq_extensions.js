/** 
 * custom jQuery extensions
 * @module
 */
var jq_extensions = (function () {

    jQuery.fn.extend({

        /** extend so that we can get and set "value" with divs */
        divVal: function (string) {
            if (arguments.length === 0) {
                return $(this).attr("value") || $(this).attr("type") || $(this).index();
            } else {
                $(this).attr("value", string);
                return $(this);
            }

        },

        /** puts commas in a number */
        addCommas: function (decimals) {

            var val = this[0] || 0;

            if (val == 0) {
                return 0;
            } else if (isNaN(val) || (((val < 999) && (val > -999)) && decimals < 1)) { //small numbers auto decimals
                return val;
            } else if (((val < 999) && (val > -999)) && decimals > 0) { //small numbers fixed decimals
                return val.toFixed(decimals);

            } else if (((val > 999) || (val < -999)) && decimals > 0) { //big numbers fixed decimals
                while (/(\d+)(\d{3})/.test(val.toString())) {
                    val = val.toFixed(decimals).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                }
            } else if ((val > 999) || (val < -999)) { //big number auto decimals
                while (/(\d+)(\d{3})/.test(val.toString())) {
                    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                }
            }


            return val;
        },



        /** takes an element's text string and returns a number, trimming spaces and removing non-numbers (good for numbers with commas etc.)*/
        getNumber: function () {
            var val = $.trim($(this).text().replace(/\(.*\)/, "").replace(/[^0-9\.\-]+/g, ''));

            return val === "" || isNaN(Number(val)) ? null : Number(val);
        },
        
       
        /** gets a .val() but returns 0 if isNaN **/
        getValNumber: function(){
            return isNaN(Number($(this).val())) ? 0 : Number($(this).val());
        
        }



    });

})();

module.exports = jq_extensions;