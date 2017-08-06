$(document).ready(function () {

    //variables
    var VertretungHeute = [];
    VertretungHeute[0] = "subst_001";
    VertretungHeute[1] = "subst_002";
    var VertretungHeuteData = [];

    var VertretungMorgen = [];
    VertretungMorgen[0] = "subst_001";
    VertretungMorgen[1] = "subst_002";
    var VertretungMorgenData = [];

    var tempPlanLeft = 0; //position in array
    var tempPlanRight = 0;

    // load html in Array
    function loadVertretungsplanHTML() {
        for (i = 0; i <= VertretungHeute.length; i++) {
            VertretungHeuteData[i] = $('<div>');
            VertretungHeuteData[i].load("/data/Lehrer_heute/end_pretty.html  #" + VertretungHeute[i]);
        }
    }
    loadVertretungsplanHTML();

    $("#content").html(VertretungHeuteData[0]);
    $("#content2").load("/data/Lehrer_heute/end_pretty.html?nocache=" + (new Date()).getTime());



    //
    // Functions
    //

    var scrollDownLeft = true;
    var scrollDownRight = true;
    var tempHeightLeft = -1;
    var tempHeightRight = -1;
    var tempTimeout = 50;
    var tempJumps = 1;

    //Function: ScrollDiv
    function scrollDivLeft() {
        var element = document.getElementById("wrapper");

        //toggle scrollDown true - false
        if (element.scrollTop == tempHeightLeft) {
            scrollDownLeft = !scrollDownLeft;
        } 
        
        //scrolling
        if (scrollDownLeft) {
            setTimeout(function () {
                tempHeightLeft = element.scrollTop;
                element.scrollTop += tempJumps;
                scrollDivLeft();
            }, tempTimeout);
        } else {
            setTimeout(function () {
                tempHeightLeft = element.scrollTop;
                element.scrollTop -= tempJumps;
                scrollDivLeft();
            }, tempTimeout);
        }
    }
    function scrollDivRight() {
        var element = document.getElementById("wrapper2");

        //toggle scrollDown true - false
        if (element.scrollTop == tempHeightRight) {
            scrollDownRight = !scrollDownRight;
        } 
        
        //scrolling
        if (scrollDownRight) {
            setTimeout(function () {
                tempHeightRight = element.scrollTop;
                element.scrollTop += tempJumps;
                scrollDivRight();
            }, tempTimeout);
        } else {
            setTimeout(function () {
                tempHeightRight = element.scrollTop;
                element.scrollTop -= tempJumps;
                scrollDivRight();
            }, tempTimeout);
        }
    }




    //Function: PageScroll 1
    function PageScroll1() {
        var elmnt = document.getElementById("wrapper");
        elmnt.scrollTop += 10;
        scrolldelay = setTimeout(PageScroll1, 100);
    }

    //Function: PageScroll 2
    var scrolled;
    function PageScroll2() {
        scrolled = scrolled + 300;
        $("#wrapper").animate({
            scrollTop: scrolled
        });
    }

    //Function: load HTML
    function loadHTML(direction) {
        if (direction == "right1") {
            if (tempPlanLeft < VertretungHeute.length - 1) {
                tempPlanLeft++;
            } else {
                tempPlanLeft = 0;
            }
            $("#content").html(VertretungHeuteData[tempPlanLeft]);

        } else if (direction == "left1") {
            if (tempPlanLeft > 0) {
                tempPlanLeft--;
            } else {
                tempPlanLeft = VertretungHeute.length - 1;
            }
            $("#content").html(VertretungHeuteData[tempPlanLeft]);
        } else if (direction == "right2") {

        } else {

        }
    }

    //
    // Buttons
    //
    //Btn: Navigation
    $("#btn_right1").click(function () {
        $("#content").animate({
            left: '-50%'
        }, 500, function () {
            $(this).css('left', '150%');
            $(this).appendTo('#wrapper');
        });
        loadHTML("right1");
    });
    $("#btn_left1").click(function () {
        //loadHTML("left1");
        scrollDivLeft();
        scrollDivRight();
    });
    $("#btn_right2").click(function () {
        $('#wrapper2').animate({
            scrollTop: $("#subst_002").offset().top
        }, 2000);
    });
    $("#btn_left2").click(function () {
        $('#wrapper2').animate({
            scrollTop: $("#subst_001").offset().top
        }, 2000);
    });




    /*
        //Function: right Wrapper scroll
        function ScrollRight() {
            var divHeight = $('#content2').height();
            console.log(divHeight);
            nachUnten();
        }
        function nachUnten() {
            $('#content2').scrollTop += 100;
        }
    
        //Function: left Wrapper scroll
        function animateContent(direction) {
            var animationOffset = $('#wrapper').height() - $('#content').height() - 30;
            var animationSpeed = $('#content').height() * 10;
            if (direction == 'up') {
                animationOffset = 0;
            }
    
            console.log("animationOffset:" + animationOffset);
            $('#content').animate({ "marginTop": (animationOffset) + "px" }, animationSpeed);
        }
    
        function up() {
            animateContent("up")
        }
        function down() {
            animateContent("down")
        }
    
        function start() {
            setTimeout(function () {
                down();
            }, 2000);
            setTimeout(function () {
                up();
            }, 2000);
            setTimeout(function () {
                console.log("wait...");
            }, 5000);
        }
    */
});