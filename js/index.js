/*
* Code for displaying substitution schedule on a website. Data exported from Untis and loaded in this website
*/

$(document).ready(function () {
	
    //variables
    var tempPlanHeute = "/data/Lehrer_heute/LehrerAllHeute.html";
	var tempPlanMorgen = "/data/Lehrer_morgen/LehrerAllMorgen.html";
	
	var VertretungHeuteData = [];
    var VertretungMorgenData = [];

    var tempPlanLeft = 0; //current view position
    var tempPlanRight = 0;

    var viewCounter = 5; //change this var: time * 2 seconds for auto view-change
    $("#countdown").html(viewCounter);
    var tempCounter = 5;

    // load html in Array
    function loadVertretungsplanHTML() {
        //load left HTML and put each day into the array
        $.get(tempPlanHeute + "?nocache=" + new Date().getTime(), function(dataLeft) {
            var tempDataLeft = $('<output>').append($.parseHTML(dataLeft)).find('#tempDay');
            // put every tempDay div into the array
            for (var i = 0; i < tempDataLeft.length; i++) {
                VertretungHeuteData.push(tempDataLeft[i]);
            }
            $("#content").html(VertretungHeuteData[0]);
        }, 'text');
        //load right HTML and put each day into the array
        $.get(tempPlanMorgen + "?nocache=" + new Date().getTime(), function(dataRight) {
            var tempDataRight = $('<output>').append($.parseHTML(dataRight)).find('#tempDay');
            // put every tempDay div into the array
            for (var j = 0; j < tempDataRight.length; j++) {
                VertretungMorgenData.push(tempDataRight[j]);
            }
            $("#content2").html(VertretungMorgenData[0]);
        }, 'text');

    }
    loadVertretungsplanHTML();

    //
    // Functions
    //

    //Function: load HTML in content or content2 from array
    function loadHTML(direction) {
        if (direction == "right1") {
            if (tempPlanLeft < VertretungHeuteData.length - 1) {
                tempPlanLeft++;
            } else {
                tempPlanLeft = 0;
            }
            $("#content").html(VertretungHeuteData[tempPlanLeft]);

        } else if (direction == "left1") {
            if (tempPlanLeft > 0) {
                tempPlanLeft--;
            } else {
                tempPlanLeft = VertretungHeuteData.length - 1;
            }
            $("#content").html(VertretungHeuteData[tempPlanLeft]);
        ///////////////////////////////////////////////////////////
        } else if (direction == "right2") {
            if (tempPlanRight < VertretungMorgenData.length - 1) {
                tempPlanRight++;
            } else {
                tempPlanRight = 0;
            }
            $("#content2").html(VertretungMorgenData[tempPlanRight]);
        } else {
            if (tempPlanRight > 0) {
                tempPlanRight--;
            } else {
                tempPlanRight = VertretungMorgenData.length - 1;
            }
            $("#content2").html(VertretungMorgenData[tempPlanRight]);
        }
    }


    //Function: countdown to next view (called every 2 seconds)
    var x = setInterval(function() {
        tempCounter--;
        //if counter <0 load new substitution view
        if(tempCounter < 0){
            tempCounter = viewCounter;
            loadHTML("right1");
            loadHTML("right2");
        }
        $("#countdown").html(tempCounter);
    }, 2000);


    //
    // Buttons
    //
    //Btn: test
    $("#btn_right1").click(function () {

    });
    $("#btn_left1").click(function () {

    });
    $("#btn_right2").click(function () {

    });
    $("#btn_left2").click(function () {

    });

    //
    // get Keypresses -> and change substitution view
    $(document).keydown(function(e) {
        if(e.which == 37) { //left
            loadHTML("left1");
            tempCounter = viewCounter; //reset countdown
        }else if (e.which == 39) { //right
            loadHTML("right1");
            tempCounter = viewCounter;
        }else if (e.which == 38) { //up
            loadHTML("right2");
            tempCounter = viewCounter;
        }else if (e.which == 40) { //down
            loadHTML("left2");
            tempCounter = viewCounter;
        }
        $("#countdown").html(tempCounter);
    });


});
