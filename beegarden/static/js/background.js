// Author: Iona Cessford

function changeBackground() {
    var currentdate = new Date();
    var currentmonth = currentdate.getMonth()
    var season = Math.floor(currentmonth / 5)
    switch (season){
        case 0:
            document.body.style.backgroundImage = "url('" + winterPath + "') ";
            document.body.style.backgroundSize = cover;
            document.body.style.backgroundPosition = centre;
            break;
        case 1:
            document.body.style.backgroundImage = "url('" + springPath + "')";
            document.body.style.backgroundSize = cover;
            document.body.style.backgroundPosition = centre;
            break;
        case 2:
            document.body.style.backgroundImage = "url('" + summerPath + "')";
            document.body.style.backgroundSize = cover;
            document.body.style.backgroundPosition = centre;
            break;
        case 3:
            document.body.style.backgroundImage = "url('" + autumnPath + "')";
            document.body.style.backgroundSize = cover;
            document.body.style.backgroundPosition = centre;
            break;
    }
}

changeBackground();
