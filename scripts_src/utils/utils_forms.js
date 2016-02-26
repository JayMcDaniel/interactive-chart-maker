var utils_forms = {

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