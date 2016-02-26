/** listens for any form updates and calls appropriate function */
var update_template = require("./update_template.js");
var writeCode = require("../write_code.js");

var allFormUpdates = function (chart, all_chart_options) {

    $("#chart_width_textinput").keyup(function () {
        update_template.size($(this).val(), "width", chart);
    });

    $("#chart_height_textinput").keyup(function () {
        update_template.size($(this).val(), "height", chart);
    });

};

module.exports = allFormUpdates;