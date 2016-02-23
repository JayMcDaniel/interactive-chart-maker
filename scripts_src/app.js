var utils = require("./utils/utils_main.js");
var navigation_setup = require("./navigation_setup.js");
var keyboard_inputs = require("./keyboard_inputs");

$(document).ready(function () {

    navigation_setup.sideNavTabsChange();
    navigation_setup.chartTypeIconChange();
    navigation_setup.helpIconClick();
    
    keyboard_inputs.bindNumberEntryInputs();
});