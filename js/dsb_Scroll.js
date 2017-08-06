
var stop = 0; 
var iMinPosition = 0; 
var iPosition = 0; 
var iVerzoegerungPixel = getPageVisibleArea(); 
var iSekPause = 5; 
var iSekLetztePause = 5; 
var iMaxPosition = getPageHeight(); 
var iGeschwidigkeit = 100; 
var iLetzteVerzoegerung = 0; 

function NachUnten() { 
    if (stop == 0) { 
        iPosition = iPosition + 1; 
        if (iMaxPosition > 0) { 
            if (iPosition <= iMaxPosition) { 
                window.scrollBy(0, 1); 
                if (iLetzteVerzoegerung == iVerzoegerungPixel) { 
                    iLetzteVerzoegerung = 0; 
                    window.setTimeout("NachUnten()", (iSekPause * 1000)); 
                } else if (iPosition == (iMaxPosition - 1)) { 
                    iLetzteVerzoegerung = iLetzteVerzoegerung + 1; 
                    window.setTimeout("NachUnten()", (iSekLetztePause * 1000)); 
                } else { 
                    iLetzteVerzoegerung = iLetzteVerzoegerung + 1; 
                    window.setTimeout("NachUnten()", iGeschwidigkeit); 
                } 
            } else { 
                iLetzteVerzoegerung = 0; 
                iPosition = 0; 
                window.scrollTo(0, 0); 
                window.setTimeout("NachUnten()", (iSekPause * 1000)); 
            } 
        } 
    } 
} 

function Stop() { 
    stop = 1; 
} 

function Start() { 
    stop = 0; 
} 

function NachOben() { 
    if (stop == 0) { 
        iPosition = iPosition - 1; 
        if (iPosition > iMinPosition) { 
            window.scrollBy(0, -1); 
            if (iLetzteVerzoegerung == iVerzoegerungPixel) { 
                iLetzteVerzoegerung = 0; 
                window.setTimeout("NachOben()", (iSekPause * 1000)); 
            } else if (iPosition == (iMinPosition + 1)) { 
                iLetzteVerzoegerung = iLetzteVerzoegerung + 1; 
                window.setTimeout("NachOben()", (iSekPause * 1000)); 
            } else { 
                iLetzteVerzoegerung = iLetzteVerzoegerung + 1; 
                window.setTimeout("NachOben()", iGeschwidigkeit); 
            } 
        } else { 
            iLetzteVerzoegerung = 0; 
            NachUnten(); 
        } 
    } 
} 

function getPageHeight() { 
    return (document.body.scrollHeight - getPageVisibleArea()); 
} 

function getPageVisibleArea() { 
    if (window.innerHeight) {
        return (window.innerHeight); 
    } else { 
        return (document.body.offsetHeight); 
    } 
} 

NachUnten();
