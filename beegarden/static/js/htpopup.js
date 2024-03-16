// Authors: Saida Amirova, Harry Gammie

var popupOpened = false;

/* This function makes the hidden popup visible. */
function showPopup() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.style.width = '1200px'; 

    var popupX = 10; 
    var popupY = 10; 

    popup.style.left = popupX + 'px';
    popup.style.top = popupY + 'px';
}

/* This function helps to click on the button */
function handleButtonClick(event) {
    var squareId = event.target.parentElement.id;
    
    if (!popupOpened) {
        showPopupAtPosition(10,10);
        popupOpened = true;
    }
}

/* This function helps to close the opened popup */
function closePopup() {
    var popup = document.querySelector('.htpopup');
    popup.style.display = 'none';
    
    popupOpened = False;
}

// adding an event listener to the button
document.getElementById('bin').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG' && event.target.parentElement.classList.contains('small-square')) {
        handleButtonClick(event);
    }
});

var closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', closePopup);
