$(document).ready(function () {
    var all_chart_options = {
        "chart": {
            "renderTo": "chart1",
            "margin": [100, 40, 80, 80],
            "borderWidth": 0,
            "plotBorderColor": "#000",
            "plotBorderWidth": 0,
            "type": "line",
            "events": {
                "load": function load() {
                    this.credits.element.onclick = function () {
                        window.open('http://www.bls.gov', '_blank');
                    };
                }
            },
            "zoomType": null,
            "alignTicks": false,
            "ignoreHiddenSeries": true
        },
        "colors": ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1", "#2f7ed8", "#0d233a", "#8bbc21", "#910000", "#1aadce", "#492970", "#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
        "legend": {
            "align": "left",
            "backgroundColor": "none",
            "borderColor": "none",
            "borderWidth": 0,
            "enabled": true,
            "floating": false,
            "itemDistance": 30,
            "layout": "horizontal",
            "reversed": false,
            "shadow": false,
            "useHTML": false,
            "verticalAlign": "top",
            "x": 100,
            "y": 40,
            "itemStyle": {
                "fontFamily": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                "color": "#000"
            },
            "itemHiddenStyle": {
                "color": "gray"
            },
            "itemHoverStyle": {
                "cursor": "pointer"
            }
        },
        "plotOptions": {
            "series": {
                "events": {
                    "legendItemClick": function legendItemClick(event) {}
                },
                "dataLabels": {
                    "enabled": false
                },
                "pointPlacement": null,
                "stacking": null,
                "pointPadding": 0.1,
                "groupPadding": 0.2,
                "minPointLength": 2,
                "maxSize": 90,
                "minSize": 4,
                "sizeBy": "width",
                "lineWidth": 1.5,
                "states": {
                    "hover": {
                        "lineWidth": 4
                    }
                },
                "marker": {
                    "enabled": false,
                    "states": {
                        "hover": {
                            "enabled": true,
                            "radius": 5
                        }
                    }
                }
            },
            "bubble": {
                "tooltip": {
                    "followPointer": true
                }
            }
        },
        "series": [{
            "name": "cat 1",
            "data": [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330, 332, 334, 336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376],
            "type": "line",
            "color": "#7cb5ec",
            "_symbolIndex": 0,
            "stacking": null,
            "visible": true
        }, {
            "name": "cat 2",
            "data": [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330, 332, 334, 336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 378],
            "type": "line",
            "color": "#434348",
            "_symbolIndex": 1,
            "stacking": null,
            "visible": true
        }, {
            "name": "cat 3",
            "data": [5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 89, 92, 95, 98, 101, 104, 107, 110, 113, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 176, 179, 182, 185, 188, 191, 194, 197, 200, 203, 206, 209, 212, 215, 218, 221, 224, 227, 230, 233, 236, 239, 242, 245, 248, 251, 254, 257, 260, 263, 266, 269, 272, 275, 278, 281, 284, 287, 290, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326, 329, 332, 335, 338, 341, 344, 347, 350, 353, 356, 359, 362, 365, 368, 371, 374, 377, 380, 383, 386, 389, 392, 395, 398, 401, 404, 407, 410, 413, 416, 419, 422, 425, 428, 431, 434, 437, 440, 443, 446, 449, 452, 455, 458, 461, 464, 467, 470, 473, 476, 479, 482, 485, 488, 491, 494, 497, 500, 503, 506, 509, 512, 515, 518, 521, 524, 527, 530, 533, 536, 539, 542, 545, 548, 551, 554, 557, 560, 563, 566],
            "type": "line",
            "color": "#90ed7d",
            "_symbolIndex": 2,
            "stacking": null,
            "visible": true
        }, {
            "name": "cat 4",
            "data": [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300, 302, 304, 306, 308, 310, 312, 314, 316, 318, 320, 322, 324, 326, 328, 330, 332, 334, 336, 338, 340, 342, 344, 346, 348, 350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 378, 380, 382],
            "type": "line",
            "color": "#f7a35c",
            "_symbolIndex": 3,
            "stacking": null,
            "visible": true
        }],
        "subtitle": {
            "text": "",
            "align": "left",
            "style": {
                "color": "#000000",
                "fontFamily": "sans-serif",
                "fontWeight": "normal",
                "fontSize": "12px"
            }
        },
        "title": {
            "text": "Wide table test",
            "align": "left",
            "style": {
                "color": "#000000",
                "fontFamily": "sans-serif",
                "fontWeight": "bold",
                "fontSize": "14px"
            }
        },
        "tooltip": {
            "backgroundColor": "#FEFFEF",
            "crosshairs": [false, false],
            "formatter": function () {
                var y_val = this.point.high ? "High: " + $(this.point.high * 1).addCommas(0) + " | Low: " + $(this.point.low * 1).addCommas(0) : $(this.y).addCommas(0);
                var s = "<b>" + this.series.name + "</b><br>" + this.x + ": " + y_val;
                all_chart_options.series[this.series.index] ? s = all_chart_options.tooltip.addExtraData(all_chart_options.series[this.series.index].extra_data, this.point, s) : s = s;
                return s.replace(/\$-/g, "-$");
            },
            "style": {
                "color": "#000000",
                "fontFamily": "Calibri, Verdana, Arial, Helvetica, sans-serif"
            },
            "useHTML": false,
            "shared": false,
            "addExtraData": function (extra_data, point, s) {
                if (extra_data && extra_data[0].name) {
                    $.each(extra_data, function (i) {
                        if (extra_data[i].values[point.index]) {
                            s = s + "<br>  " + extra_data[i].name + ": " + extra_data[i].values[point.index];
                        }
                    });
                }
                return s;
            }
        },
        "xAxis": {
            "categories": ["Jan 00", "Feb 00", "Mar 00", "Apr 00", "May 00", "Jun 00", "Jul 00", "Aug 00", "Sep 00", "Oct 00", "Nov 00", "Dec 00", "Jan 01", "Feb 01", "Mar 01", "Apr 01", "May 01", "Jun 01", "Jul 01", "Aug 01", "Sep 01", "Oct 01", "Nov 01", "Dec 01", "Jan 02", "Feb 02", "Mar 02", "Apr 02", "May 02", "Jun 02", "Jul 02", "Aug 02", "Sep 02", "Oct 02", "Nov 02", "Dec 02", "Jan 03", "Feb 03", "Mar 03", "Apr 03", "May 03", "Jun 03", "Jul 03", "Aug 03", "Sep 03", "Oct 03", "Nov 03", "Dec 03", "Jan 04", "Feb 04", "Mar 04", "Apr 04", "May 04", "Jun 04", "Jul 04", "Aug 04", "Sep 04", "Oct 04", "Nov 04", "Dec 04", "Jan 05", "Feb 05", "Mar 05", "Apr 05", "May 05", "Jun 05", "Jul 05", "Aug 05", "Sep 05", "Oct 05", "Nov 05", "Dec 05", "Jan 06", "Feb 06", "Mar 06", "Apr 06", "May 06", "Jun 06", "Jul 06", "Aug 06", "Sep 06", "Oct 06", "Nov 06", "Dec 06", "Jan 07", "Feb 07", "Mar 07", "Apr 07", "May 07", "Jun 07", "Jul 07", "Aug 07", "Sep 07", "Oct 07", "Nov 07", "Dec 07", "Jan 08", "Feb 08", "Mar 08", "Apr 08", "May 08", "Jun 08", "Jul 08", "Aug 08", "Sep 08", "Oct 08", "Nov 08", "Dec 08", "Jan 09", "Feb 09", "Mar 09", "Apr 09", "May 09", "Jun 09", "Jul 09", "Aug 09", "Sep 09", "Oct 09", "Nov 09", "Dec 09", "Jan 10", "Feb 10", "Mar 10", "Apr 10", "May 10", "Jun 10", "Jul 10", "Aug 10", "Sep 10", "Oct 10", "Nov 10", "Dec 10", "Jan 11", "Feb 11", "Mar 11", "Apr 11", "May 11", "Jun 11", "Jul 11", "Aug 11", "Sep 11", "Oct 11", "Nov 11", "Dec 11", "Jan 12", "Feb 12", "Mar 12", "Apr 12", "May 12", "Jun 12", "Jul 12", "Aug 12", "Sep 12", "Oct 12", "Nov 12", "Dec 12", "Jan 13", "Feb 13", "Mar 13", "Apr 13", "May 13", "Jun 13", "Jul 13", "Aug 13", "Sep 13", "Oct 13", "Nov 13", "Dec 13", "Jan 14", "Feb 14", "Mar 14", "Apr 14", "May 14", "Jun 14", "Jul 14", "Aug 14", "Sep 14", "Oct 14", "Nov 14", "Dec 14", "Jan 15", "Feb 15", "Mar 15", "Apr 15", "May 15", "Jun 15", "Jul 15", "Aug 15"],
            "gridLineColor": "#c0c0c0",
            "gridLineWidth": 0,
            "gridLineDashStyle": "Dot",
            "labels": {
                "rotation": 0,
                "style": {
                    "color": "#000000",
                    "fontFamily": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                    "fontWeight": "normal",
                    "backgroundColor": "#fff",
                    "fontSize": "12px",
                    "textOverflow": "none"
                }
            },
            "lineWidth": 1.2,
            "lineColor": "gray",
            "max": null,
            "min": null,
            "plotBands": [],
            "plotLines": [{
                "value": 0,
                "color": "#c0c0c0",
                "dashStyle": "solid",
                "width": 0
            }],
            "tickmarkPlacement": "on",
            "tickPosition": "outside",
            "tickColor": "#C0D0E0",
            "title": {
                "align": "middle",
                "useHTML": true,
                "text": "",
                "margin": 6,
                "rotation": 0,
                "style": {
                    "color": "#000000",
                    "fontFamily": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                    "fontWeight": "normal",
                    "backgroundColor": "#fff",
                    "fontSize": "13px"
                },
                "x": 0,
                "y": 0
            },
            "type": "linear"
        },
        "yAxis": {
            "gridLineColor": "#c0c0c0",
            "gridLineWidth": 1,
            "gridLineDashStyle": "Dot",
            "labels": {
                "formatter": function newYFormat() {
                    var s = this.value == parseInt(this.value) ? Highcharts.numberFormat(this.value, 0, ".", ",") : Highcharts.numberFormat(this.value, 1, ".", ",");
                    return s.replace(/\$-/g, "-$");
                },
                "rotation": 0,
                "style": {
                    "color": "#000000",
                    "fontFamily": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                    "fontWeight": "normal",
                    "backgroundColor": "#fff",
                    "fontSize": "12px"
                }
            },
            "lineColor": "gray",
            "lineWidth": 1,
            "max": null,
            "min": null,
            "opposite": false,
            "plotBands": [],
            "plotLines": [{
                "value": 0,
                "color": "#c0c0c0",
                "dashStyle": "solid",
                "width": 1
            }],
            "tickInterval": null,
            "tickmarkPlacement": "on",
            "tickPosition": "outside",
            "tickColor": "#C0D0E0",
            "tickWidth": 1,
            "title": {
                "useHTML": true,
                "text": "",
                "margin": 6,
                "align": "high",
                "offset": 20,
                "rotation": 0,
                "x": 35,
                "y": -20,
                "style": {
                    "color": "#000000",
                    "fontFamily": "Calibri, Verdana, Arial, Helvetica, sans-serif",
                    "fontWeight": "normal",
                    "fontSize": "13px"
                }
            },
            "type": "linear"
        },
        "credits": {
            "position": {
                "align": "left",
                "x": 10,
                "y": -22
            },
            "style": {
                "cursor": "default",
                "color": "#2C2C2C"
            },
            "text": "Click legend items to change data display. Hover over chart to view data.<br>Source: U.S. Bureau of Labor Statistics.",
            "useHTML": true
        },
        "saved_values": [{
            "id": "chart_type_icons",
            "val": "line"
        }, {
            "id": "chart_id_textinput",
            "val": "chart1"
        }, {
            "id": "map_type_select",
            "val": "state"
        }, {
            "id": "map_animated_checkbox",
            "val": false
        }, {
            "id": "bubble_animated_checkbox",
            "val": false
        }, {
            "id": "drilldown_type_select",
            "val": "bar"
        }, {
            "id": "chart_width_textinput",
            "val": "580"
        }, {
            "id": "chart_height_textinput",
            "val": "430"
        }, {
            "id": "top_margin_textinput",
            "val": "100"
        }, {
            "id": "right_margin_textinput",
            "val": "40"
        }, {
            "id": "bottom_margin_textinput",
            "val": "80"
        }, {
            "id": "left_margin_textinput",
            "val": "80"
        }, {
            "id": "map_spotlight_size_checkbox",
            "val": false
        }, {
            "id": "map_circle_size_range",
            "val": "10"
        }, {
            "id": "table_input_load_series_from_icons",
            "val": "row_heads"
        }, {
            "id": "example_table_select",
            "val": ""
        }, {
            "id": "table_input_textarea",
            "val": "<table id=\"BLS_table\" class=\"regular\" cellspacing=\"0\" cellpadding=\"0\" xborder=\"1\" style=\"width: 95%\"> <caption><span class=\"tableTitle\">Wide table test</span></caption> <thead> <tr> <th rowspan=\"1\"  style=\"vertical-align: middle;\">category</th> <th >Jan 00</th> <th >Feb 00</th> <th >Mar 00</th> <th >Apr 00</th> <th >May 00</th> <th >Jun 00</th> <th >Jul 00</th> <th >Aug 00</th> <th >Sep 00</th> <th >Oct 00</th> <th >Nov 00</th> <th >Dec 00</th> <th >Jan 01</th> <th >Feb 01</th> <th >Mar 01</th> <th >Apr 01</th> <th >May 01</th> <th >Jun 01</th> <th >Jul 01</th> <th >Aug 01</th> <th >Sep 01</th> <th >Oct 01</th> <th >Nov 01</th> <th >Dec 01</th> <th >Jan 02</th> <th >Feb 02</th> <th >Mar 02</th> <th >Apr 02</th> <th >May 02</th> <th >Jun 02</th> <th >Jul 02</th> <th >Aug 02</th> <th >Sep 02</th> <th >Oct 02</th> <th >Nov 02</th> <th >Dec 02</th> <th >Jan 03</th> <th >Feb 03</th> <th >Mar 03</th> <th >Apr 03</th> <th >May 03</th> <th >Jun 03</th> <th >Jul 03</th> <th >Aug 03</th> <th >Sep 03</th> <th >Oct 03</th> <th >Nov 03</th> <th >Dec 03</th> <th >Jan 04</th> <th >Feb 04</th> <th >Mar 04</th> <th >Apr 04</th> <th >May 04</th> <th >Jun 04</th> <th >Jul 04</th> <th >Aug 04</th> <th >Sep 04</th> <th >Oct 04</th> <th >Nov 04</th> <th >Dec 04</th> <th >Jan 05</th> <th >Feb 05</th> <th >Mar 05</th> <th >Apr 05</th> <th >May 05</th> <th >Jun 05</th> <th >Jul 05</th> <th >Aug 05</th> <th >Sep 05</th> <th >Oct 05</th> <th >Nov 05</th> <th >Dec 05</th> <th >Jan 06</th> <th >Feb 06</th> <th >Mar 06</th> <th >Apr 06</th> <th >May 06</th> <th >Jun 06</th> <th >Jul 06</th> <th >Aug 06</th> <th >Sep 06</th> <th >Oct 06</th> <th >Nov 06</th> <th >Dec 06</th> <th >Jan 07</th> <th >Feb 07</th> <th >Mar 07</th> <th >Apr 07</th> <th >May 07</th> <th >Jun 07</th> <th >Jul 07</th> <th >Aug 07</th> <th >Sep 07</th> <th >Oct 07</th> <th >Nov 07</th> <th >Dec 07</th> <th >Jan 08</th> <th >Feb 08</th> <th >Mar 08</th> <th >Apr 08</th> <th >May 08</th> <th >Jun 08</th> <th >Jul 08</th> <th >Aug 08</th> <th >Sep 08</th> <th >Oct 08</th> <th >Nov 08</th> <th >Dec 08</th> <th >Jan 09</th> <th >Feb 09</th> <th >Mar 09</th> <th >Apr 09</th> <th >May 09</th> <th >Jun 09</th> <th >Jul 09</th> <th >Aug 09</th> <th >Sep 09</th> <th >Oct 09</th> <th >Nov 09</th> <th >Dec 09</th> <th >Jan 10</th> <th >Feb 10</th> <th >Mar 10</th> <th >Apr 10</th> <th >May 10</th> <th >Jun 10</th> <th >Jul 10</th> <th >Aug 10</th> <th >Sep 10</th> <th >Oct 10</th> <th >Nov 10</th> <th >Dec 10</th> <th >Jan 11</th> <th >Feb 11</th> <th >Mar 11</th> <th >Apr 11</th> <th >May 11</th> <th >Jun 11</th> <th >Jul 11</th> <th >Aug 11</th> <th >Sep 11</th> <th >Oct 11</th> <th >Nov 11</th> <th >Dec 11</th> <th >Jan 12</th> <th >Feb 12</th> <th >Mar 12</th> <th >Apr 12</th> <th >May 12</th> <th >Jun 12</th> <th >Jul 12</th> <th >Aug 12</th> <th >Sep 12</th> <th >Oct 12</th> <th >Nov 12</th> <th >Dec 12</th> <th >Jan 13</th> <th >Feb 13</th> <th >Mar 13</th> <th >Apr 13</th> <th >May 13</th> <th >Jun 13</th> <th >Jul 13</th> <th >Aug 13</th> <th >Sep 13</th> <th >Oct 13</th> <th >Nov 13</th> <th >Dec 13</th> <th >Jan 14</th> <th >Feb 14</th> <th >Mar 14</th> <th >Apr 14</th> <th >May 14</th> <th >Jun 14</th> <th >Jul 14</th> <th >Aug 14</th> <th >Sep 14</th> <th >Oct 14</th> <th >Nov 14</th> <th >Dec 14</th> <th >Jan 15</th> <th >Feb 15</th> <th >Mar 15</th> <th >Apr 15</th> <th >May 15</th> <th >Jun 15</th> <th >Jul 15</th> <th >Aug 15</th> </tr> </thead> <tbody> <tr> <th > <p>cat 1</p> </th> <td >2</td> <td >4</td> <td >6</td> <td >8</td> <td >10</td> <td >12</td> <td >14</td> <td >16</td> <td >18</td> <td >20</td> <td >22</td> <td >24</td> <td >26</td> <td >28</td> <td >30</td> <td >32</td> <td >34</td> <td >36</td> <td >38</td> <td >40</td> <td >42</td> <td >44</td> <td >46</td> <td >48</td> <td >50</td> <td >52</td> <td >54</td> <td >56</td> <td >58</td> <td >60</td> <td >62</td> <td >64</td> <td >66</td> <td >68</td> <td >70</td> <td >72</td> <td >74</td> <td >76</td> <td >78</td> <td >80</td> <td >82</td> <td >84</td> <td >86</td> <td >88</td> <td >90</td> <td >92</td> <td >94</td> <td >96</td> <td >98</td> <td >100</td> <td >102</td> <td >104</td> <td >106</td> <td >108</td> <td >110</td> <td >112</td> <td >114</td> <td >116</td> <td >118</td> <td >120</td> <td >122</td> <td >124</td> <td >126</td> <td >128</td> <td >130</td> <td >132</td> <td >134</td> <td >136</td> <td >138</td> <td >140</td> <td >142</td> <td >144</td> <td >146</td> <td >148</td> <td >150</td> <td >152</td> <td >154</td> <td >156</td> <td >158</td> <td >160</td> <td >162</td> <td >164</td> <td >166</td> <td >168</td> <td >170</td> <td >172</td> <td >174</td> <td >176</td> <td >178</td> <td >180</td> <td >182</td> <td >184</td> <td >186</td> <td >188</td> <td >190</td> <td >192</td> <td >194</td> <td >196</td> <td >198</td> <td >200</td> <td >202</td> <td >204</td> <td >206</td> <td >208</td> <td >210</td> <td >212</td> <td >214</td> <td >216</td> <td >218</td> <td >220</td> <td >222</td> <td >224</td> <td >226</td> <td >228</td> <td >230</td> <td >232</td> <td >234</td> <td >236</td> <td >238</td> <td >240</td> <td >242</td> <td >244</td> <td >246</td> <td >248</td> <td >250</td> <td >252</td> <td >254</td> <td >256</td> <td >258</td> <td >260</td> <td >262</td> <td >264</td> <td >266</td> <td >268</td> <td >270</td> <td >272</td> <td >274</td> <td >276</td> <td >278</td> <td >280</td> <td >282</td> <td >284</td> <td >286</td> <td >288</td> <td >290</td> <td >292</td> <td >294</td> <td >296</td> <td >298</td> <td >300</td> <td >302</td> <td >304</td> <td >306</td> <td >308</td> <td >310</td> <td >312</td> <td >314</td> <td >316</td> <td >318</td> <td >320</td> <td >322</td> <td >324</td> <td >326</td> <td >328</td> <td >330</td> <td >332</td> <td >334</td> <td >336</td> <td >338</td> <td >340</td> <td >342</td> <td >344</td> <td >346</td> <td >348</td> <td >350</td> <td >352</td> <td >354</td> <td >356</td> <td >358</td> <td >360</td> <td >362</td> <td >364</td> <td >366</td> <td >368</td> <td >370</td> <td >372</td> <td >374</td> <td >376</td> </tr> <tr class=\"greenbar\"> <th > <p>cat 2</p> </th> <td >4</td> <td >6</td> <td >8</td> <td >10</td> <td >12</td> <td >14</td> <td >16</td> <td >18</td> <td >20</td> <td >22</td> <td >24</td> <td >26</td> <td >28</td> <td >30</td> <td >32</td> <td >34</td> <td >36</td> <td >38</td> <td >40</td> <td >42</td> <td >44</td> <td >46</td> <td >48</td> <td >50</td> <td >52</td> <td >54</td> <td >56</td> <td >58</td> <td >60</td> <td >62</td> <td >64</td> <td >66</td> <td >68</td> <td >70</td> <td >72</td> <td >74</td> <td >76</td> <td >78</td> <td >80</td> <td >82</td> <td >84</td> <td >86</td> <td >88</td> <td >90</td> <td >92</td> <td >94</td> <td >96</td> <td >98</td> <td >100</td> <td >102</td> <td >104</td> <td >106</td> <td >108</td> <td >110</td> <td >112</td> <td >114</td> <td >116</td> <td >118</td> <td >120</td> <td >122</td> <td >124</td> <td >126</td> <td >128</td> <td >130</td> <td >132</td> <td >134</td> <td >136</td> <td >138</td> <td >140</td> <td >142</td> <td >144</td> <td >146</td> <td >148</td> <td >150</td> <td >152</td> <td >154</td> <td >156</td> <td >158</td> <td >160</td> <td >162</td> <td >164</td> <td >166</td> <td >168</td> <td >170</td> <td >172</td> <td >174</td> <td >176</td> <td >178</td> <td >180</td> <td >182</td> <td >184</td> <td >186</td> <td >188</td> <td >190</td> <td >192</td> <td >194</td> <td >196</td> <td >198</td> <td >200</td> <td >202</td> <td >204</td> <td >206</td> <td >208</td> <td >210</td> <td >212</td> <td >214</td> <td >216</td> <td >218</td> <td >220</td> <td >222</td> <td >224</td> <td >226</td> <td >228</td> <td >230</td> <td >232</td> <td >234</td> <td >236</td> <td >238</td> <td >240</td> <td >242</td> <td >244</td> <td >246</td> <td >248</td> <td >250</td> <td >252</td> <td >254</td> <td >256</td> <td >258</td> <td >260</td> <td >262</td> <td >264</td> <td >266</td> <td >268</td> <td >270</td> <td >272</td> <td >274</td> <td >276</td> <td >278</td> <td >280</td> <td >282</td> <td >284</td> <td >286</td> <td >288</td> <td >290</td> <td >292</td> <td >294</td> <td >296</td> <td >298</td> <td >300</td> <td >302</td> <td >304</td> <td >306</td> <td >308</td> <td >310</td> <td >312</td> <td >314</td> <td >316</td> <td >318</td> <td >320</td> <td >322</td> <td >324</td> <td >326</td> <td >328</td> <td >330</td> <td >332</td> <td >334</td> <td >336</td> <td >338</td> <td >340</td> <td >342</td> <td >344</td> <td >346</td> <td >348</td> <td >350</td> <td >352</td> <td >354</td> <td >356</td> <td >358</td> <td >360</td> <td >362</td> <td >364</td> <td >366</td> <td >368</td> <td >370</td> <td >372</td> <td >374</td> <td >376</td> <td >378</td> </tr> <tr> <th > <p>cat 3</p> </th> <td >5</td> <td >8</td> <td >11</td> <td >14</td> <td >17</td> <td >20</td> <td >23</td> <td >26</td> <td >29</td> <td >32</td> <td >35</td> <td >38</td> <td >41</td> <td >44</td> <td >47</td> <td >50</td> <td >53</td> <td >56</td> <td >59</td> <td >62</td> <td >65</td> <td >68</td> <td >71</td> <td >74</td> <td >77</td> <td >80</td> <td >83</td> <td >86</td> <td >89</td> <td >92</td> <td >95</td> <td >98</td> <td >101</td> <td >104</td> <td >107</td> <td >110</td> <td >113</td> <td >116</td> <td >119</td> <td >122</td> <td >125</td> <td >128</td> <td >131</td> <td >134</td> <td >137</td> <td >140</td> <td >143</td> <td >146</td> <td >149</td> <td >152</td> <td >155</td> <td >158</td> <td >161</td> <td >164</td> <td >167</td> <td >170</td> <td >173</td> <td >176</td> <td >179</td> <td >182</td> <td >185</td> <td >188</td> <td >191</td> <td >194</td> <td >197</td> <td >200</td> <td >203</td> <td >206</td> <td >209</td> <td >212</td> <td >215</td> <td >218</td> <td >221</td> <td >224</td> <td >227</td> <td >230</td> <td >233</td> <td >236</td> <td >239</td> <td >242</td> <td >245</td> <td >248</td> <td >251</td> <td >254</td> <td >257</td> <td >260</td> <td >263</td> <td >266</td> <td >269</td> <td >272</td> <td >275</td> <td >278</td> <td >281</td> <td >284</td> <td >287</td> <td >290</td> <td >293</td> <td >296</td> <td >299</td> <td >302</td> <td >305</td> <td >308</td> <td >311</td> <td >314</td> <td >317</td> <td >320</td> <td >323</td> <td >326</td> <td >329</td> <td >332</td> <td >335</td> <td >338</td> <td >341</td> <td >344</td> <td >347</td> <td >350</td> <td >353</td> <td >356</td> <td >359</td> <td >362</td> <td >365</td> <td >368</td> <td >371</td> <td >374</td> <td >377</td> <td >380</td> <td >383</td> <td >386</td> <td >389</td> <td >392</td> <td >395</td> <td >398</td> <td >401</td> <td >404</td> <td >407</td> <td >410</td> <td >413</td> <td >416</td> <td >419</td> <td >422</td> <td >425</td> <td >428</td> <td >431</td> <td >434</td> <td >437</td> <td >440</td> <td >443</td> <td >446</td> <td >449</td> <td >452</td> <td >455</td> <td >458</td> <td >461</td> <td >464</td> <td >467</td> <td >470</td> <td >473</td> <td >476</td> <td >479</td> <td >482</td> <td >485</td> <td >488</td> <td >491</td> <td >494</td> <td >497</td> <td >500</td> <td >503</td> <td >506</td> <td >509</td> <td >512</td> <td >515</td> <td >518</td> <td >521</td> <td >524</td> <td >527</td> <td >530</td> <td >533</td> <td >536</td> <td >539</td> <td >542</td> <td >545</td> <td >548</td> <td >551</td> <td >554</td> <td >557</td> <td >560</td> <td >563</td> <td >566</td> </tr> <tr class=\"greenbar\"> <th > <p>cat 4</p> </th> <td >8</td> <td >10</td> <td >12</td> <td >14</td> <td >16</td> <td >18</td> <td >20</td> <td >22</td> <td >24</td> <td >26</td> <td >28</td> <td >30</td> <td >32</td> <td >34</td> <td >36</td> <td >38</td> <td >40</td> <td >42</td> <td >44</td> <td >46</td> <td >48</td> <td >50</td> <td >52</td> <td >54</td> <td >56</td> <td >58</td> <td >60</td> <td >62</td> <td >64</td> <td >66</td> <td >68</td> <td >70</td> <td >72</td> <td >74</td> <td >76</td> <td >78</td> <td >80</td> <td >82</td> <td >84</td> <td >86</td> <td >88</td> <td >90</td> <td >92</td> <td >94</td> <td >96</td> <td >98</td> <td >100</td> <td >102</td> <td >104</td> <td >106</td> <td >108</td> <td >110</td> <td >112</td> <td >114</td> <td >116</td> <td >118</td> <td >120</td> <td >122</td> <td >124</td> <td >126</td> <td >128</td> <td >130</td> <td >132</td> <td >134</td> <td >136</td> <td >138</td> <td >140</td> <td >142</td> <td >144</td> <td >146</td> <td >148</td> <td >150</td> <td >152</td> <td >154</td> <td >156</td> <td >158</td> <td >160</td> <td >162</td> <td >164</td> <td >166</td> <td >168</td> <td >170</td> <td >172</td> <td >174</td> <td >176</td> <td >178</td> <td >180</td> <td >182</td> <td >184</td> <td >186</td> <td >188</td> <td >190</td> <td >192</td> <td >194</td> <td >196</td> <td >198</td> <td >200</td> <td >202</td> <td >204</td> <td >206</td> <td >208</td> <td >210</td> <td >212</td> <td >214</td> <td >216</td> <td >218</td> <td >220</td> <td >222</td> <td >224</td> <td >226</td> <td >228</td> <td >230</td> <td >232</td> <td >234</td> <td >236</td> <td >238</td> <td >240</td> <td >242</td> <td >244</td> <td >246</td> <td >248</td> <td >250</td> <td >252</td> <td >254</td> <td >256</td> <td >258</td> <td >260</td> <td >262</td> <td >264</td> <td >266</td> <td >268</td> <td >270</td> <td >272</td> <td >274</td> <td >276</td> <td >278</td> <td >280</td> <td >282</td> <td >284</td> <td >286</td> <td >288</td> <td >290</td> <td >292</td> <td >294</td> <td >296</td> <td >298</td> <td >300</td> <td >302</td> <td >304</td> <td >306</td> <td >308</td> <td >310</td> <td >312</td> <td >314</td> <td >316</td> <td >318</td> <td >320</td> <td >322</td> <td >324</td> <td >326</td> <td >328</td> <td >330</td> <td >332</td> <td >334</td> <td >336</td> <td >338</td> <td >340</td> <td >342</td> <td >344</td> <td >346</td> <td >348</td> <td >350</td> <td >352</td> <td >354</td> <td >356</td> <td >358</td> <td >360</td> <td >362</td> <td >364</td> <td >366</td> <td >368</td> <td >370</td> <td >372</td> <td >374</td> <td >376</td> <td >378</td> <td >380</td> <td >382</td> </tr> </tbody></table>"
        }, {
            "id": "color_palettes",
            "val": -1
        }, {
            "id": "series_color_0",
            "val": "7CB5EC"
        }, {
            "id": "series_type_div_0",
            "val": "line"
        }, {
            "id": "line_style_select_0",
            "val": "Solid"
        }, {
            "id": "series_visible_checkbox_0",
            "val": true
        }, {
            "id": "series_extra_data_title_textarea_0",
            "val": ""
        }, {
            "id": "series_extra_data_values_textarea_0",
            "val": ""
        }, {
            "id": "series_color_1",
            "val": "434348"
        }, {
            "id": "series_type_div_1",
            "val": "line"
        }, {
            "id": "line_style_select_1",
            "val": "Solid"
        }, {
            "id": "series_visible_checkbox_1",
            "val": true
        }, {
            "id": "series_extra_data_title_textarea_1",
            "val": ""
        }, {
            "id": "series_extra_data_values_textarea_1",
            "val": ""
        }, {
            "id": "series_color_2",
            "val": "90ED7D"
        }, {
            "id": "series_type_div_2",
            "val": "line"
        }, {
            "id": "line_style_select_2",
            "val": "Solid"
        }, {
            "id": "series_visible_checkbox_2",
            "val": true
        }, {
            "id": "series_extra_data_title_textarea_2",
            "val": ""
        }, {
            "id": "series_extra_data_values_textarea_2",
            "val": ""
        }, {
            "id": "series_color_3",
            "val": "F7A35C"
        }, {
            "id": "series_type_div_3",
            "val": "line"
        }, {
            "id": "line_style_select_3",
            "val": "Solid"
        }, {
            "id": "series_visible_checkbox_3",
            "val": true
        }, {
            "id": "series_extra_data_title_textarea_3",
            "val": ""
        }, {
            "id": "series_extra_data_values_textarea_3",
            "val": ""
        }, {
            "id": "legend_layout_select",
            "val": "horizontal"
        }, {
            "id": "map_legend_enabled_checkbox",
            "val": true
        }, {
            "id": "legend_placement_x",
            "val": "100"
        }, {
            "id": "legend_placement_y",
            "val": "40"
        }, {
            "id": "legend_reverse_layout_checkbox",
            "val": false
        }, {
            "id": "legend_item_width_input",
            "val": ""
        }, {
            "id": "legend_make_toggle_checkbox",
            "val": false
        }, {
            "id": "chart_x_axis_title_textarea",
            "val": ""
        }, {
            "id": "chart_x_axis_x_position_input",
            "val": "40"
        }, {
            "id": "chart_x_axis_tickmark_interval_input",
            "val": ""
        }, {
            "id": "chart_x_axis_min_input",
            "val": ""
        }, {
            "id": "chart_x_axis_max_input",
            "val": ""
        }, {
            "id": "chart_x_axis_show_only_years",
            "val": false
        }, {
            "id": "chart_x_axis_add_commas",
            "val": false
        }, {
            "id": "chart_y_axis_title_textarea",
            "val": ""
        }, {
            "id": "chart_y_axis_x_position_input",
            "val": "35"
        }, {
            "id": "chart_y_axis_tickmark_interval_input",
            "val": ""
        }, {
            "id": "chart_y_axis_min_input",
            "val": ""
        }, {
            "id": "chart_y_axis_max_input",
            "val": ""
        }, {
            "id": "chart_y_axis_opposite_checkbox",
            "val": false
        }, {
            "id": "chart_y_axis_log_checkbox",
            "val": false
        }, {
            "id": "chart_y_axis_signs_select",
            "val": "no_signs"
        }, {
            "id": "chart_y_axis_decimals_select",
            "val": null
        }, {
            "id": "chart_y_axis_divide_select",
            "val": "1"
        }, {
            "id": "chart_tooltip_shared_checkbox",
            "val": false
        }, {
            "id": "chart_tooltip_force_decimals_select",
            "val": "0"
        }, {
            "id": "chart_tooltip_signs_select",
            "val": "no_signs"
        }, {
            "id": "chart_tooltip_force_decimals_x_select",
            "val": "0"
        }, {
            "id": "chart_tooltip_signs_x_select",
            "val": "no_signs"
        }, {
            "id": "chart_tooltip_force_decimals_z_select",
            "val": "0"
        }, {
            "id": "chart_tooltip_signs_z_select",
            "val": "no_signs"
        }, {
            "id": "map_tooltip_na_text_input",
            "val": "N/A"
        }, {
            "id": "chart_z_title_text_input",
            "val": ""
        }, {
            "id": "chart_tooltip_y_multiple_select",
            "val": "1"
        }, {
            "id": "chart_credits_text_textarea",
            "val": "Click legend items to change data display. Hover over chart to view data.Source: U.S. Bureau of Labor Statistics."
        }, {
            "id": "point_padding_input",
            "val": ".1"
        }, {
            "id": "group_padding_input",
            "val": ".2"
        }, {
            "id": "chart_subtitle_textarea",
            "val": ""
        }, {
            "id": "map_animation_speed_range",
            "val": "500"
        }, {
            "id": "chart_mlr_styles_checkbox",
            "val": false
        }, {
            "id": "chart_zoom_select",
            "val": "false,false,null"
        }, {
            "id": "chart_show_data_labels_checkbox",
            "val": false
        }, {
            "id": "chart_add_recession_shading_select",
            "val": "no_recession"
        }]
    };

    var chartCallback = function chartCallback(all_chart_options) {

        if (all_chart_options.timeline) {
            //call animation if applicable
            all_chart_options.timeline.animation();
        }

        $(".highcharts-legend-item").css("min-height", "0px").css("z-index", 100); //fix so CMS CSS doesn't make legend taller than it should
        $(".highcharts-tooltip").css("z-index", 200);

        /**
         * Highcharts plugin for setting a lower opacity for other series than the one that is hovered
         * in the legend
         */
        (function (Highcharts) {
            var each = Highcharts.each;

            Highcharts.wrap(Highcharts.Legend.prototype, 'renderItem', function (proceed, item) {

                proceed.call(this, item);

                var isPoint = !!item.series,
                    collection = isPoint ? item.series.points : this.chart.series,
                    groups = isPoint ? ['graphic'] : ['group', 'markerGroup'],
                    element = (this.options.useHTML ? item.legendItem : item.legendGroup).element;

                element.onmouseover = function () {
                    each(collection, function (seriesItem) {
                        if (seriesItem !== item) {
                            each(groups, function (group) {
                                seriesItem[group].animate({
                                    opacity: 0.25
                                }, {
                                    duration: 150
                                });
                            });
                        }
                    });
                };
                element.onmouseout = function () {
                    each(collection, function (seriesItem) {
                        if (seriesItem !== item) {
                            each(groups, function (group) {
                                seriesItem[group].animate({
                                    opacity: 1
                                }, {
                                    duration: 50
                                });
                            });
                        }
                    });
                };
            });
        })(Highcharts); //end gray other series plugin
    };
    Highcharts.setOptions({
        lang: {
            thousandsSep: ","
        }
    });

    var chart = new Highcharts.Chart(all_chart_options, chartCallback(all_chart_options));
});
jQuery.fn.extend({
    addCommas: function addCommas(decimals) {

        var val = this[0] || 0;

        if (val == 0) {
            return 0;
        } else if (isNaN(val) || val < 999 && val > -999 && decimals < 1) {
            //small numbers auto decimals
            return val;
        } else if (val < 999 && val > -999 && decimals > 0) {
            //small numbers fixed decimals
            return val.toFixed(decimals);
        } else if ((val > 999 || val < -999) && decimals > 0) {
            //big numbers fixed decimals
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toFixed(decimals).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
        } else if (val > 999 || val < -999) {
            //big number auto decimals
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
        }

        return val;
    }
});