/*main make new table function, called when data is altered in table_input_textarea */

function makeNewTable(input) {

    try {

        $("#table_result").html(getEmptyTable());
        var table_ID = addTableID();

        var parsed_input = parseInput(input);

        //insert caption title
        $("#table_result .tableTitle").text(parsed_input.caption);

        //insert thead elements
        insertTHead(parsed_input);

        //insert tbody elements
        insertTBody(parsed_input);

        //insert tfoot elements
        insertTFoot(parsed_input, table_ID);

        //style table
        styleTable();

        //add indents to row headers
        addIndents();

        //merge first cell of THead if needed
        formatFirstTHead();

        //footer links back to table
        addFooterLinks(table_ID);



        //linkify urls
        $("th, td", $("#table_result table")).each(function (i, e) {
            $(e).html(linkify($(e).html()));
        });

        //bind toolbox clicks to table
        tableClicks();

    } catch (error) {
        console.error(error);
    }

}




/*returns an empty table shell */
function getEmptyTable() {

    return $("<table class='regular'> <caption> <span class= 'tableTitle'> test table  </span>  </caption> <thead> </thead> <tbody> </tbody><tfoot style = 'display: none;'><tr class='footnotes'><td class='footnotes'></td></tr></tfoot></table>");

}



/*inserts thead elements*/
function insertTHead(parsed_input) {
    for (var i = 0; i < parsed_input.thead.length; i++) {
        parsed_input.thead[i] = "<tr>" + parsed_input.thead[i].map(function (val, i) {
            return "<th scope='col'><p>" + val + "</p></th>";
        }).join("") + "</tr>";

    }

    parsed_input.thead.join("");

    $("#table_result thead").html(parsed_input.thead);

}




/*inserts tbody elements*/
function insertTBody(parsed_input) {
    for (var i = 0; i < parsed_input.tbody.length; i++) {
        parsed_input.tbody[i] = "<tr>" + parsed_input.tbody[i].map(function (val, i) {

            if (i === 0) {
                return "<th scope='row'><p>" + val + "</p></th>";
            } else {
                return "<td>" + val + "</td>";
            }

        }).join("") + "</tr>";

    }

    parsed_input.tbody.join("");

    $("#table_result tbody").html(parsed_input.tbody);

}



/*inserts tfoot elements*/
function insertTFoot(parsed_input, table_ID) {

    for (var i = 0; i < parsed_input.tfoot.length; i++) {
        parsed_input.tfoot[i] = "<p>" + parsed_input.tfoot[i].map(function (val, i) {
            return val + "</br>";
        }).join("") + "</p>";

    }

    parsed_input.tfoot.join("");

    $("#table_result tfoot").attr("id", table_ID + "_footnotes");
    $("#table_result tfoot tr td").append(parsed_input.tfoot);

}


/*returns an object out of the inputed Excell (text) table data */
function parseInput(input) {

    var is_text_tabulation = $('#is_text_tabulation_checkbox').attr('checked');


    parsed_input = {
        caption: "",
        thead: [],
        tbody: [],
        tfoot: []

    };


    var all_rows = input.split("\n");

    var header_row = 1;
    //no caption if a tabulation table
    if (is_text_tabulation) {
        header_row = 0;

    } else { //else a normal table
        parsed_input.caption = $.trim(all_rows[0]);
    }
    parsed_input.thead.push(all_rows[header_row].split("\t"));




    var in_header = true;
    var in_footer = false;


    var start_body_row = is_text_tabulation ? 1 : 2;

    for (var i = start_body_row; i < all_rows.length; i++) {
        var row = all_rows[i].split("\t");

        //test if begining of the footer
        if (/^(foot)*notes*:|^\[\S+\]/gi.test(row)) {

            in_footer = true;
            $("#table_result tfoot").css("display", "table-footer-group");
            var colspan = parsed_input.thead[parsed_input.thead.length - 1].length;
            $("#table_result tfoot td").attr("colspan", colspan);
        }

        if (in_footer) {
            parsed_input.tfoot.push(row);
        } else if (!is_text_tabulation && in_header && row[0] === "") {
            parsed_input.thead.push(row);
        } else {
            in_header = false;
            parsed_input.tbody.push(row);
        }

    }

    // console.log(parsed_input);

    return parsed_input;
}




function addTableID() {

    var date = new Date();
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var table_ID = "BLStable" + "_" + year + "_" + day + "_" + hours + "_" + minutes + "_" + seconds;

    $("#table_result table").attr("id", table_ID);

    return table_ID;
}



//adds indents to row th's

function addIndents() {

    $("th p", $("#table_result tbody tr")).each(function (i, p) {

        var indent = $(p).text().match(/^\s+/);
        if (indent) {
            var sub = "sub" + Math.floor(indent[0].length / 2);
            $(p).addClass(sub);
        }


    });
}



//merges cells in first cell of thead if needed
function formatFirstTHead() {

    var rowspan = 1;
    //for each empty first cell, increase colspan 1, then assign it
    $("th:first", $("#table_result thead tr")).each(function (i, tr) {

        if ($(this).text() === "") {
            rowspan++;
            $(this).remove();
        }
    });

    $("#table_result thead tr:first th:first").attr("rowspan", rowspan).css({
        verticalAlign: "middle",
        minWidth: "80px"
    });

}



function addFooterLinks(table_ID) {

    //top section
    $("td, th", $("#table_result tbody, #table_result thead")).each(function (i, e) {

        var text = $(e).text();
        var matched = text.match(/(\[\S+\])/gi);
        if (matched) {
            $(e).html(text.replace(matched[0], "<a href='#" + table_ID + "_footnotes'>" + matched[0] + "</a>"));
        }
    });

    //footer section
    $("p", $("#table_result tfoot")).each(function (i, e) {

        var text = $(e).text();
        var matched = text.match(/(\[\S+\])/gi);
        if (matched) {
            $(e).html(text.replace(matched[0], "<a href='#" + table_ID + "'>" + matched[0] + "</a>"));
        }
    });

}



//takes url strings and turns them into clickable links
function linkify(inputText) {

    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    if (inputText.match(/a href/)) {
        return inputText;
    }

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //urls starting with "data.bls.gov"
    replacePattern2 = /(^|[^\/])(data\.bls\.gov[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}



//style table function
function styleTable() {

    //stripe rows or format for text-tablulation table
    if ($('#is_text_tabulation_checkbox').attr('checked')) {
        $("td, th, p, table", $("#table_result")).css({
            "text-align": "center",
            "border-width": "0",
            "background": "#fff"
        });


    } else {
        $("#table_result tbody tr:odd").addClass("greenbar");
         $("td, th, p, table", $("#table_result")).removeAttr("style");
    }

    //make smaller if it's for mlr

    if ($('#for_MLR_checkbox').attr('checked')) {
        $("#table_result table").css("width", "618px");
    }else{
        $("#table_result table").css("width", "95%");
    }

    //left align columns if desired
    var left_align_columns = Math.floor(Number($("#left_align").val()));
    if (!isNaN(left_align_columns) && left_align_columns > 0) {
        $("td:lt(" + left_align_columns + ")", $("#table_result table tbody tr")).css("text-align", "left");
    }

}


//show html when button clicked
function getCodeSetup() {

    $("#get_code_button").click(function () {
        if ($(this).hasClass("showing")) {
            $(this).removeClass("showing");
            $("#get_code_text").text("Get HTML and make charts");
            $("#main_result_code_div").hide();

        } else {
            $(this).addClass("showing");
            $("#get_code_text").text("Hide HTML");
            $("#load_table_div").hide();
            $("#main_result_code_div").show();
            $("#table_html").val($("#table_result").html());

        }
    });

}




/** When clipboard icon is clicked, this copies the next textarea to a clipboard **/
function copyToClipBoardSetup() {
    $(".copy_to_clipboard_button").click(
        function () {
            var copied_text = $(this).nextAll("textarea:eq(0)").select();
            var copy_message_span = $(this).next().children(".copy_message");

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Copied!' : 'Not copied! Try again in a few seconds.';
                copy_message_span.text(msg);

                setTimeout(function () { //hide message after a bit
                    copy_message_span.text("");
                }, 2000);

            } catch (err) {
                alert("Your browser won't allow this to copy - please do it manually");
            }

        });
};



/** setup for loading of a previously saved html table */
function loadTableSetup() {

    //show and hide overlay
    $("#show_load_chart_area_button").click(function () {
        if ($(this).hasClass("showing")) {
            $(this).removeClass("showing");
            $("#load_table_div").hide();

        } else {
            $(this).addClass("showing");
            $("#load_table_div").show();
            $("#main_result_code_div").hide();

        }
    });

    //load textarea html into table display area
    $("#load_table_button").click(function () {
        $("#table_result").html($("#load_table_textarea").val());
        $("#show_load_chart_area_button").removeClass("showing");
        $("#load_table_div").hide();
        $("#table_input_textarea").val("");
    });

}



//sets up the toolbox functions

function toolboxSetup() {

    $(".tool_box_button").click(function () {

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#main_content_div").attr("contenteditable", true).css("cursor", "text");
            tool_functions.active_tool_box_button = null;
        } else {
            $(".tool_box_button").removeClass("active");
            $(this).addClass("active");
            tool_functions.active_tool_box_button = $(this).attr("id");
            $("#main_content_div").attr("contenteditable", false).css("cursor", "pointer");
        }

    });

}



//tool functions object with lots of functions
var tool_functions = {

    active_tool_box_button: null,

    toolBoxAlignLeft: function (elem) {

        $(elem).css("text-align", "left");

    },

    toolBoxAlignCenter: function (elem) {

        $(elem).css("text-align", "center");

    },

    toolBoxAlignRight: function (elem) {

        $(elem).css("text-align", "right");

    },

    toolBoxVertAlignTop: function (elem) {

        $(elem).css("vertical-align", "top");

    },

    toolBoxVertAlignMiddle: function (elem) {

        $(elem).css("vertical-align", "middle");

    },

    toolBoxVertAlignBottom: function (elem) {

        $(elem).css("vertical-align", "bottom");

    },

    toolBoxAddPercent: function (elem) {

        var index = $(elem).index() - 1;

        var text = $(elem).text();
        var new_text = "";

        if (/%/.test(text)) {
            var new_text = text.replace("%", "");
        } else {
            var new_text = text + "%";
        }

        $("td:eq(" + index + ")", $("#table_result tbody tr")).text(new_text);

    },



    toolBoxAddDollar: function (elem) {

        var index = $(elem).index() - 1;

        var text = $(elem).text();
        var new_text = "";

        if (/\$/.test(text)) {
            var new_text = text.replace("$", "");
        } else {
            var new_text = "$" + text;
        }

        $("td:eq(" + index + ")", $("#table_result tbody tr")).text(new_text);

    },


    toolBoxAddCommas: function (elem) {

        var index = $(elem).index() - 1;
        var text = $(elem).text();
        var new_text = "";

        if (/,/.test(text)) {
            var new_text = text.replace(",", "");
        } else {
            var new_text = addCommas(text);
            console.log(new_text);
        }

        $("td:eq(" + index + ")", $("#table_result tbody tr")).text(new_text);

    },


    toolBoxIncreaseIndent: function (elem) {

        if ($("p[class^='sub']", $(elem)).length > 0) {
            var new_sub = Number($("p", $(elem)).attr("class").replace("sub", "")) + 1;
            $("p", $(elem)).attr("class", "sub" + new_sub);

        } else {
            $("p", $(elem)).addClass("sub1");
        }

    },

    toolBoxDecreaseIndent: function (elem) {

        if ($("p[class^='sub']", $(elem)).length > 0) {
            var new_sub = Number($("p", $(elem)).attr("class").replace("sub", "")) - 1;
            $("p", $(elem)).attr("class", "sub" + new_sub);

        } else {
            $("p", $(elem)).addClass("sub0");
        }

    },

    toolBoxTextBold: function (elem) {

        if ($(elem).css("font-weight") === "bold" || $(elem).css("font-weight") > 400) {
            $(elem).css("font-weight", "normal");
        } else {
            $(elem).css("font-weight", "bold");
        }

    },

    toolBoxTextItalic: function (elem) {

        if ($(elem).css("font-style") === "italic") {
            $(elem).css("font-style", "normal");
        } else {
            $(elem).css("font-style", "italic");
        }

    },


    toolBoxMergeCells: function (elem) {

        if ($(elem).hasClass("to_be_merged")) {

            $(elem).removeClass("to_be_merged");


            //merging
        } else if ($("#table_result table .to_be_merged").length > 0) {

            var cell_1 = elem;
            var cell_2 = $(".to_be_merged");

            cell_1.x = $(cell_1).index();
            cell_1.y = $(cell_1).parent().index();

            cell_2.x = $(cell_2).index();
            cell_2.y = $(cell_2).parent().index();

            //  console.log("cell_1", cell_1, "cell_2", cell_2);

            if (cell_1.y === cell_2.y) {
                tool_functions.mergeHorizontal(cell_1, cell_2);
            } else {
                tool_functions.mergeVertical(cell_1, cell_2);
            }

            $(".to_be_merged").removeClass("to_be_merged");

        } else {
            $(elem).addClass("to_be_merged");
        }
    },



    mergeHorizontal: function (cell_1, cell_2) {

        if (!$(cell_1).attr("colspan")) {
            $(cell_1).attr("colspan", "1");
        }
        if (!$(cell_2).attr("colspan")) {
            $(cell_2).attr("colspan", "1");
        }

        if (cell_1.x > cell_2.x) {
            $(cell_1).remove();
            $(cell_2).attr("colspan", Number($(cell_2).attr("colspan")) + 1);
        } else {
            $(cell_2).remove();
            $(cell_1).attr("colspan", Number($(cell_1).attr("colspan")) + 1);

        }

    },


    mergeVertical: function (cell_1, cell_2) {

        if (!$(cell_1).attr("rowspan")) {
            $(cell_1).attr("rowspan", "1");
        }
        if (!$(cell_2).attr("rowspan")) {
            $(cell_2).attr("rowspan", "1");
        }

        if (cell_1.y > cell_2.y) {
            $(cell_1).remove();
            $(cell_2).attr("rowspan", Number($(cell_2).attr("rowspan")) + 1);
            tool_functions.toolBoxVertAlignTop(cell_2);
        } else {
            $(cell_2).remove();
            $(cell_1).attr("rowspan", Number($(cell_1).attr("rowspan")) + 1);
            tool_functions.toolBoxVertAlignTop(cell_1);
        }

    },

}



//bind toolbox clicking to table, called when table is made
function tableClicks() {

    $("th, td", $("#table_result table")).click(function () {

        if (tool_functions.active_tool_box_button) {

            tool_functions[tool_functions.active_tool_box_button]($(this));

        }
    });

}



/** when clear next text area button (X) is clicked, find and clear the text of the next textarea */
function clearNextTextareaClick() {
    $(".clear_next_textarea_button").click(function () {
        $(this).next("textarea").val("");
    });
}








/** puts commas in a number */
function addCommas(val) {

    console.log("val", val);

    if (isNaN(val) || ((val < 999) && (val > -999))) { //small numbers auto decimals
        return val;
    } else if ((val > 999) || (val < -999)) { //big numbers fixed decimals
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
    }

    return val;
}





//when chart button is clicked, opens up chartmaker
function makeChartSetup() {

    $(".chartThisTableButton").click(function () {

        sessionStorage.setItem('imported_chart_type', $(this).attr('id'));
        sessionStorage.setItem('imported_table', $("#table_html").val());

        var newChartWindow = window.open("../");
    });
}



$(document).ready(function () {

    $("#app_version").text("2.0.0");

    //update table when text area is edited
    $("#table_input_textarea").bind("input blur paste", function (e) {
        var input = $.trim($("#table_input_textarea").val());
        makeNewTable(input);
    });

    $("#is_text_tabulation_checkbox, #for_MLR_checkbox, #left_align").bind("input", styleTable);

    getCodeSetup();
    loadTableSetup()
    copyToClipBoardSetup();
    clearNextTextareaClick();
    toolboxSetup();
    makeChartSetup();

});