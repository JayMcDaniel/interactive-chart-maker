var update_template = {
    size: function (val, dimension, chart) {
        val = Number(val);
        if (!isNaN(val)) {
            $(".chart_display_area").css(dimension, val + "px");
        }
        chart.reflow();

    }
}



module.exports = update_template;