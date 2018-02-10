/*
* Code for displaying substitution schedule on a website. Data exported from Untis, uploaded to ftp and loaded in this website
*/

$(document).ready(function () {

    //variables
	var tempPlanHeuteFile = "data/Lehrer_heute/LehrerAllHeute.html";
	var tempPlanMorgenFile = "data/Lehrer_morgen/LehrerAllMorgen.html";
	var tempTimeStampFile = "data/timeStamp.txt";
	
    var VertretungHeuteData = [];
    var VertretungMorgenData = [];
	var tempTimeStamp = "";

    var tempPlanLeft = 0; //current view position
    var tempPlanRight = 0;

    var viewCounter = 10; //change this var: time * 2 seconds for auto view-change
    $("#countdown").html(createTime()); //display current time
    var tempCounter = "0";

    //
    // Functions
    //
	
	//Function: load and check timeStamp.txt
	function loadAndCheckTimeStamp(){
		$.get(tempTimeStampFile + "?nocache=" + new Date().getTime(), function(dataTime) {
			if(tempTimeStamp != dataTime){	
				loadVertretungsplanHTML();
				$("#timeStamp").html("aktualisiert am " + dataTime);
				tempTimeStamp = dataTime;
			}else{
				// do nothing
			}
		});
	}
		
    //Function: load html files into arrays
    function loadVertretungsplanHTML() {
		//reset arrays
		VertretungHeuteData = [];
		VertretungMorgenData = [];
		
        //load left HTML and put each day into the array
        $.get(tempPlanHeuteFile + "?nocache=" + new Date().getTime(), function(dataLeft) {
            var tempDataLeft = $('<output>').append($.parseHTML(dataLeft)).find('#tempDay');
            // put every #tempDay div into the array
            for (var i = 0; i < tempDataLeft.length; i++) {
                VertretungHeuteData.push(tempDataLeft[i]);
            }
            $("#content").html(VertretungHeuteData[0]);
			changeProgressBar("left"); //init left progressBar
        }, 'text');
        //load right HTML and put each day into the array
        $.get(tempPlanMorgenFile + "?nocache=" + new Date().getTime(), function(dataRight) {
            var tempDataRight = $('<output>').append($.parseHTML(dataRight)).find('#tempDay');
            // put every #tempDay div into the array
            for (var j = 0; j < tempDataRight.length; j++) {
                VertretungMorgenData.push(tempDataRight[j]);
            }
            $("#content2").html(VertretungMorgenData[0]);
			changeProgressBar("right"); //init right progressBar
        }, 'text');
    }
	
	//Function: init and change progress bars
	function changeProgressBar(progressBar){
		var tempWidth = 0;
		var tempProgressBar = "";
		var Anzahl = 0;
		var tempAnzahl = 0;		
				
		if(progressBar == "left"){		
			Anzahl = VertretungHeuteData.length;
			tempAnzahl =  tempPlanLeft + 1;			
			tempProgressBar = ".progressBarLeft";
		}else{
			Anzahl = VertretungMorgenData.length;
			tempAnzahl = tempPlanRight + 1;
			tempProgressBar = ".progressBarRight";
		}
		//calculate current width
		tempWidth = ((100 / Anzahl)/2)*tempAnzahl;
		$(tempProgressBar).css("width", tempWidth + "%");
	}
	
    //Function: load HTML in content or content2 from array
    function loadHTML(direction) {
		//reset visual counter
		$(".countdownBorder").css("border", "7px solid #e0e0e0"); 
        if (direction == "right1") {
            if (tempPlanLeft < VertretungHeuteData.length - 1) {
                tempPlanLeft++;
				changeProgressBar("left");
            } else {
                tempPlanLeft = 0;
				changeProgressBar("left");
            }
            $("#content").html(VertretungHeuteData[tempPlanLeft]);

        } else if (direction == "left1") {
            if (tempPlanLeft > 0) {
                tempPlanLeft--;
				changeProgressBar("left");
            } else {
                tempPlanLeft = VertretungHeuteData.length - 1;
				changeProgressBar("left");
            }
            $("#content").html(VertretungHeuteData[tempPlanLeft]);
        ///////////////////////////////////////////////////////////
        } else if (direction == "right2") {
            if (tempPlanRight < VertretungMorgenData.length - 1) {
                tempPlanRight++;
				changeProgressBar("right");
            } else {
                tempPlanRight = 0;
				changeProgressBar("right");
            }
            $("#content2").html(VertretungMorgenData[tempPlanRight]);
        } else {
            if (tempPlanRight > 0) {
                tempPlanRight--;
				changeProgressBar("right");
            } else {
                tempPlanRight = VertretungMorgenData.length - 1;
				changeProgressBar("right");
            }
            $("#content2").html(VertretungMorgenData[tempPlanRight]);
        }
    }

    //Function: countdown to next view (called every 2 seconds)
    var x = setInterval(function() {
        tempCounter++;
		//test
		var tempBorder = viewCounter / 5;
		if(tempCounter > viewCounter - tempBorder){
			
			$(".countdownBorder").css("border", "7px solid #F0AD4E");
		}else if(tempCounter > viewCounter - tempBorder*2){
			$(".countdownBorder").css({
				"border-top": "7px solid #F0AD4E",
				"border-right": "7px solid #F0AD4E",
				"border-bottom": "7px solid #F0AD4E"
			});
			
		}else if(tempCounter > viewCounter - tempBorder*3){
			$(".countdownBorder").css({
				"border-top": "7px solid #F0AD4E",
				"border-right": "7px solid #F0AD4E"
			});
		}else if(tempCounter > viewCounter - tempBorder*4){
			$(".countdownBorder").css("border-top", "7px solid #F0AD4E");
		}
        //if counter > viewCounter load new substitution view
        if(tempCounter > viewCounter){
			$(".countdownBorder").css("border", "7px solid #e0e0e0");
            tempCounter = 0;
            loadHTML("right1");
            loadHTML("right2");
        }
    }, 2000);

	//Function: check TimeStamp every minute and update time
    var checkTime = setInterval(function() {		
		$("#countdown").html(createTime());
		loadAndCheckTimeStamp();
    }, 60000);
	
	function createTime() {
		var date = new Date();
		var hours = date.getHours();
		hours = hours < 10 ? "0" + hours : hours;
		var minutes = date.getMinutes();
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ':' + minutes;
		return strTime;
	}
	
    //
    // get Keypresses -> and change substitution view
    $(document).keydown(function(e) {
        if(e.which == 37) { //left
            loadHTML("left1");
            tempCounter = 0; //reset countdown
        }else if (e.which == 39) { //right
            loadHTML("right1");
            tempCounter = 0;
        }else if (e.which == 38) { //up
            loadHTML("right2");
            tempCounter = 0;
        }else if (e.which == 40) { //down
            loadHTML("left2");
            tempCounter = 0;
        }
    });

	//
    // Start
    //
    loadAndCheckTimeStamp();
	
});
