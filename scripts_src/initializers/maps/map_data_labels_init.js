/** adds data labels to states
@module
*/

var map_data_labels_init = {

    labels: [{
        "id": "WA",
        "x": 100.74796875,
        "y": 54.775
    }, {
        "id": "OR",
        "x": 67.85796875,
        "y": 124.77499999999999
    }, {
        "id": "CA",
        "x": 54.98796875,
        "y": 280.17499999999995
    }, {
        "id": "AK",
        "x": 89.30796875,
        "y": 499.97499999999997
    }, {
        "id": "NV",
        "x": 117.90796875,
        "y": 236.77499999999998
    }, {
        "id": "ID",
        "x": 189.40796874999998,
        "y": 145.77499999999998
    }, {
        "id": "MT",
        "x": 255.18796874999998,
        "y": 92.57499999999999
    }, {
        "id": "WY",
        "x": 278.06796875,
        "y": 187.77499999999998
    }, {
        "id": "UT",
        "x": 202.27796874999999,
        "y": 261.97499999999997
    }, {
        "id": "AZ",
        "x": 182.25796875,
        "y": 369.775
    }, {
        "id": "HI",
        "x": 286.64796874999996,
        "y": 560.175
    }, {
        "id": "CO",
        "x": 306.66796875,
        "y": 281.575
    }, {
        "id": "NM",
        "x": 283.78796875,
        "y": 373.97499999999997
    }, {
        "id": "TX",
        "x": 408.19796875,
        "y": 453.775
    }, {
        "id": "OK",
        "x": 445.37796875,
        "y": 365.575
    }, {
        "id": "KS",
        "x": 423.64796874999996,
        "y": 294.775
    }, {
        "id": "NE",
        "x": 409.62796875,
        "y": 229.77499999999998
    }, {
        "id": "SD",
        "x": 403.90796875,
        "y": 163.975
    }, {
        "id": "ND",
        "x": 408.19796875,
        "y": 95.375
    }, {
        "id": "MN",
        "x": 491.13796874999997,
        "y": 120.57499999999999
    }, {
        "id": "IA",
        "x": 515.44796875,
        "y": 210.17499999999998
    }, {
        "id": "MO",
        "x": 526.7479687499999,
        "y": 294.17499999999995
    }, {
        "id": "AR",
        "x": 529.7479687499999,
        "y": 371.17499999999995
    }, {
        "id": "LA",
        "x": 541.18796875,
        "y": 443.97499999999997
    }, {
        "id": "IL",
        "x": 589.80796875,
        "y": 256.375
    }, {
        "id": "WI",
        "x": 575.5079687499999,
        "y": 162.575
    }, {
        "id": "MI",
        "x": 651.29796875,
        "y": 177.975
    }, {
        "id": "IN",
        "x": 638.42796875,
        "y": 252.17499999999998
    }, {
        "id": "KY",
        "x": 665.59796875,
        "y": 299.775
    }, {
        "id": "TN",
        "x": 644.14796875,
        "y": 338.97499999999997
    }, {
        "id": "MS",
        "x": 594.09796875,
        "y": 413.17499999999995
    }, {
        "id": "AL",
        "x": 647.0079687499999,
        "y": 411.775
    }, {
        "id": "FL",
        "x": 759.97796875,
        "y": 497.17499999999995
    }, {
        "id": "GA",
        "x": 708.4979687499999,
        "y": 404.775
    }, {
        "id": "SC",
        "x": 754.2579687499999,
        "y": 373.97499999999997
    }, {
        "id": "NC",
        "x": 765.69796875,
        "y": 326.375
    }, {
        "id": "VA",
        "x": 777.1379687499999,
        "y": 280.17499999999995
    }, {
        "id": "WV",
        "x": 727.08796875,
        "y": 268.97499999999997
    }, {
        "id": "PA",
        "x": 772.84796875,
        "y": 211.575
    }, {
        "id": "NY",
        "x": 804.30796875,
        "y": 154.17499999999998
    }, {
        "id": "CT",
        "x": 851.4979687499999,
        "y": 203.17499999999998
    }, {
        "id": "RI",
        "x": 896.2479687499999,
        "y": 193.375
    }, {
        "id": "MA",
        "x": 911.2679687499999,
        "y": 168.17499999999998
    }, {
        "id": "VT",
        "x": 831.47796875,
        "y": 84.175
    }, {
        "id": "NH",
        "x": 890.1079687499999,
        "y": 137.375
    }, {
        "id": "ME",
        "x": 877.2379687499999,
        "y": 84.175
    }, {
        "id": "OH",
        "x": 687.7629687499999,
        "y": 243.77499999999998
    }, {
        "id": "MD",
          "x": 883.67296875,
        "y": 273.17499999999995
       
    }, {
        "id": "DC",
         "x": 840.77296875,
        "y": 274.575
      
    }, {
        "id": "DE",
        "x": 894.67296875,
        "y": 231.17499999999998
    }, {
        "id": "NJ",
        "x": 849.35296875,
        "y": 236.77499999999998
    }],

    /** adds data labels (svg text) to states **/
    addDataLabels: function (all_map_options) {

        var labels = map_data_labels_init.labels;
        
        for (var i = 0; i < labels.length; i++) {
            var path = $("#" + all_map_options.render_ID + " #" + labels[i].id);

            var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttributeNS(null, 'x', labels[i].x);
            label.setAttributeNS(null, 'y', labels[i].y);
            label.setAttributeNS(null, 'fill', "black");

            var id_tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            var val_tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            val_tspan.setAttributeNS(null, "dy", "1em");
            val_tspan.setAttributeNS(null, "dx", "-1.5em");

            var id_txt_node = document.createTextNode(labels[i].id);
            var val_txt = path.attr("loc_value") ? path.attr("loc_value").replace("null", "N/A").replace("undefined","") : "";
            var val_txt_node = document.createTextNode(all_map_options.tooltip.dollar_sign + val_txt + all_map_options.tooltip.percent_sign);

            id_tspan.appendChild(id_txt_node);
            val_tspan.appendChild(val_txt_node);
            label.appendChild(id_tspan);
            label.appendChild(val_tspan);
            $(".map_svg").append(label);
        }

    }
}

module.exports = map_data_labels_init;