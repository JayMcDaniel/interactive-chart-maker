/** Main utility object, contains functions that get reused often */
var utils_main = {

    /** shortcut for console.log **/
    log: function log(e) {
        return console.log(e);
    },

    //turns objects into strings, including their methods
    deepStringify: function deepStringify(obj) {
        return JSON.stringify(obj, function (key, value) {
            if (typeof value === 'function') {
                return value.toString();
            } else {
                return value;
            }
        }).replace(/\\n/g, "");

    }

}


module.exports = utils_main;