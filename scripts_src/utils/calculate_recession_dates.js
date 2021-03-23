var utils_main = require("../utils/utils_main.js");

/** calculate recession dates function 
@namespace
**/

var calculate_recession_dates = {

    /** calculate recession dates function  **/
    createPlotBands: function (x_axis_categories, dates_type, all_chart_options) {

        all_chart_options.covid_recession_found = false;

        //load new plotbands
        var plot_bands_arr = [];

        if (dates_type === "no_recession") {
            return plot_bands_arr;
        }

        if (dates_type === "quarterly_recession") { ///quarterly dates
            var recession_dates_starts_array = ["Q2 1953", "Q3 1957", "Q2 1960", "Q4 1969", "Q4 1973", "Q1 1980", "Q3 1981", "Q3 1990", "Q1 2001", "Q4 2007", "Q1 2020"];
            var recession_date_ends_array = ["Q2 1954", "Q2 1958", "Q1 1961", "Q4 1970", "Q1 1975", "Q3 1980", "Q4 1982", "Q1 1991", "Q4 2001", "Q2 2009", "Q2 2020"];
        }

        if (dates_type === "monthly_recession") { //monthly dates
            var recession_dates_starts_array = ["Jul 1953", "Aug 1957", "Apr 1960", "Dec 1969", "Nov 1973", "Jan 1980", "Jul 1981", "Jul 1990", "Mar 2001", "Dec 2007", "Feb 2020"];
            var recession_date_ends_array = ["May 1954", "Apr 1958", "Feb 1961", "Nov 1970", "Mar 1975", "Jul 1980", "Nov 1982", "Mar 1991", "Nov 2001", "Jun 2009", "Mar 2020"];
        }

        if (dates_type === "eci_recession") { //ECI dates
            var recession_dates_starts_array = ["Jun 1953", "Sep 1957", "Jun 1960", "Dec 1969", "Dec 1973", "Mar 1980", "Sep 1981", "Sep 1990", "Mar 2001", "Dec 2007", "Mar 2020"];
            var recession_date_ends_array = ["Jun 1954", "Jun 1958", "Mar 1961", "Dec 1970", "Mar 1975", "Sep 1980", "Dec 1982", "Mar 1991", "Dec 2001", "Jun 2009", "Mar 2020"];
        }


        var plot_band_starts_arr = [];
        var plot_band_ends_arr = [];



        ///get start indexes
        for (var i = 0, len = recession_dates_starts_array.length; i < len; i++) {
            var found_start_index = x_axis_categories.indexOf(recession_dates_starts_array[i]);
            if (found_start_index >= 0) {
                plot_band_starts_arr.push(found_start_index);

                if (i === len-1){
                    all_chart_options.covid_recession_found = true;
                }
            }


        }

        ///get ends indexes
        for (var i = 0, len = recession_date_ends_array.length; i < len; i++) {
            var found_end_index = x_axis_categories.indexOf(recession_date_ends_array[i]);
            if (found_end_index >= 0) {
                plot_band_ends_arr.push(found_end_index);
            }
        }




        //fix if lengths aren't the same (if chart starts or ends in the middle of a recession)
        if (plot_band_starts_arr[0] > plot_band_ends_arr[0]) {
            plot_band_starts_arr.unshift(0);
        }

        if (plot_band_ends_arr.length < plot_band_starts_arr.length) {
            plot_band_ends_arr.push(x_axis_categories.length - 1);
        }

        if (plot_band_ends_arr.length > plot_band_starts_arr.length) {
            plot_band_starts_arr.unshift(0);
        }


        ///alert if not found
        if (plot_band_starts_arr.length == 0) {
            utils_main.showError("There are no matching recession dates, or your dates aren't formatted in the needed style.");

        } else {
            for (var i = 0, len = plot_band_starts_arr.length; i < len; i++) {
                var newPlotBand = {
                    color: 'rgb(222, 222, 222)',
                    from: plot_band_starts_arr[i],
                    to: plot_band_ends_arr[i]
                }
                plot_bands_arr.push(newPlotBand);
            }
        }

        return plot_bands_arr;
    },


    /** add the recession plot bands array to the actual chart **/
    insertPlotBands: function (plot_bands_arr, chart, all_chart_options) {

        var covid_recession_found = all_chart_options.covid_recession_found;

        chart.xAxis[0].update({
            plotBands: plot_bands_arr
        });


        var credits = "Click legend items to change data display. Hover over chart to view data.";
        
        var area_str = plot_bands_arr.length > 1 ? "areas represent recessions" : "area represents a recession";

        console.log(covid_recession_found, plot_bands_arr.length);


        if (covid_recession_found && plot_bands_arr.length === 1){
            credits += "\nThe vertical line at February 2020 represents the start of a recession, as determined by the National Bureau of Economic<br>Research. When this chart was published, the NBER had not yet determined an endpoint for that recession."
        }else if (plot_bands_arr.length > 0){
            credits +=  "\nShaded "+area_str+" as determined by the National Bureau of Economic Research.";

        }else if (covid_recession_found && plot_bands_arr.length > 1){
            credits +=  "\nWhen this chart was published, the NBER had not yet determined an endpoint for the recession that began in February 2020."
        }


    
        credits+= "\nSource: U.S. Bureau of Labor Statistics."


        $("#chart_credits_text_textarea").val(credits);

        all_chart_options.xAxis.plotBands = plot_bands_arr;
    }


}



module.exports = calculate_recession_dates;