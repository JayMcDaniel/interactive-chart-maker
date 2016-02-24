    var ChartOptions = function (o) {
        this.chart = o.chart || {};
        this.colors = o.colors || [];
        this.credits = o.credits || {};
        this.exporting = o.exporting || {};
        this.legend = o.legend || {};
        this.plotOptions = o.plotOptions || {};
        this.series = o.series || [{}];
        this.subtitle = o.subtitle || {};
        this.title = o.title || {};
        this.tooltip = o.tooltip || {};
        this.xAxis = o.xAxis || {};
        this.yAxis = o.yAxis || {};
    }


    ChartOptions.prototype.setOption = function (option, obj) {
        this[option] = obj;
    }


    module.exports = ChartOptions;