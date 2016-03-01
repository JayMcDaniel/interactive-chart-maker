
    /** sets an option to a given object. The chart options constructors use this in their prototypes */
    function setOption(option, val, all_chart_options) {

        var optionArr = option.split(".");
        var keyToSet = optionArr.pop();
        var objectToSetOn = this;
        
        optionArr.forEach(function (subKey) {
            // set a default value if that sub key doesn't yet exist
            objectToSetOn[subKey] = objectToSetOn[subKey] || {};
            objectToSetOn = objectToSetOn[subKey];
        });
        objectToSetOn[keyToSet] = val;

        utils_main.writeCode(all_chart_options);
    }