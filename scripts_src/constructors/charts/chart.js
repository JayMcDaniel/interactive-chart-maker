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
                minWidth: "fit-content",
                height: "100%",
                overflow: "scroll",
                position: "fixed",
                zIndex: "5000",
                backgroundColor: "rgb(255,255,255)",
                top: "0px",
                left: "0px",
                padding: "20px"
            })
            .attr({
                id: "table_popup_div",
                class: "table_popup_div"
            })
            .appendTo("body");


        var table_popup_div_close_button = $("<a href='#' class='close_popup'></a>")
            .text("Close")
            .css({
                display: "block",
                textAlign: "center",
                fontSize: "1.4em",
                color: "#e31c3d",
                margin: "auto",
                marginBottom: "9px"

            })
            .click(function(ev){
                ev.preventDefault();

                $("#table_popup_div").remove();
                $(`#${self.renderTo} .highcharts-a11y-proxy-button`).focus(); 
                $(".focus-disabled").attr("tabindex", "0").removeClass("focus-disabled");

            })
            .prependTo($("#table_popup_div"))
            .focus()

            $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').not(".close_popup")
            .attr("tabindex", "-1").addClass("focus-disabled");

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