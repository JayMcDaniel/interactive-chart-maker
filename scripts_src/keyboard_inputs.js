module.exports = (function () {

    var keyboard_inputs = {


        bindNumberEntryInputs: function bindNumberEntryInputs() {

            var adjValue = function adjValue(val, direction) {
                var val = Number(val);
                if (!isNaN(val)) {
                    return direction === "+" ? val + 10 : val - 10;
                } else {
                    return val;
                }
            };

            $(".number_entry").keyup(function (e) {
                if (e.keyCode === 38) { //up pushed
                    $(this).val(adjValue($(this).val(), "+"));
                } else if (e.keyCode === 40) {
                    $(this).val(adjValue($(this).val(), "-"));
                }
            });

        }

    }

    keyboard_inputs.bindNumberEntryInputs();
})();