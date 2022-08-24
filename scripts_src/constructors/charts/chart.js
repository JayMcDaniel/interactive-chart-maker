const AllChartOptions = require("./all_chart_options");

/** Chart options constructor. Info at http://api.highcharts.com/highcharts#chart
* @constructor ChartOptions 
*  @param o {object} chart options object
*/
var ChartOptions = function (o) {

    this.renderTo = o.renderTo || "chart_display_area";
    this.margin = [o.margin[0] || 90, o.margin[1] || 40, o.margin[2] || 80, o.margin[3] || 75]; //[top,right,bottom,left]
    this.borderWidth = o.borderWidth || 0;
    this.plotBorderColor = o.plotBorderColor || '#000';
    this.plotBorderWidth = o.plotBorderWidth || 0;
    this.backgroundColor = '#fff';
    this.type = o.type || 'line';
    this.events = o.events;
    this.zoomType = 'xy';
    this.alignTicks = o.alignTicks || false;
    this.ignoreHiddenSeries = o.ignoreHiddenSeries || true; //false for bubble charts so bubbles won't resize
    this.inverted = o.inverted;

    
    //show table from menu popup function
    this.showTable = function(){


        var self = this;

        var table_popup_div = $(`<div>${all_chart_options.input_table}</div>`)
            .css({
                display: "block",
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: "1000",
                backgroundColor: "white"
            })
            .attr({
                id: "table_popup_div"
            })
            .prependTo("body");


        var table_popup_div_close_button = $("<a href='#'>Close</a>")
            .css({
                display: "block",
                textAlign: "center"

            })
            .click(function(ev){
                ev.preventDefault();

                $("#table_popup_div").remove();
                $(`#${self.renderTo} .highcharts-a11y-proxy-button`).focus(); 

            })
            .prependTo($("#table_popup_div"))
            .focus()

    };


     //download CSV function (uses FileSaver.js and saveAs)
     this.downloadCSV = function() {

        var csv = [];

        $("tr", all_chart_options.input_table).each(function(i,tr){
            var tr_arr = [];

            $("th, td", tr).each(function(j, td){
                tr_arr.push('"' + $(td).text() + '"');
            });
            csv.push(tr_arr);
        });



        csv = csv.map(function(val,i){
            return val.join(",");
        })
        csv = csv.join("\n");


/*
        map.dataframe.matrix.forEach(function (row) {
            let str_row = row.map(cell => `"${cell}"`).join(",");
            csv.push([str_row]);
        });
        */


        var file = new File([csv], `${this.renderTo}.csv`, {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);

        $(".highcharts-focus-border").remove();

    }
}


module.exports = ChartOptions;