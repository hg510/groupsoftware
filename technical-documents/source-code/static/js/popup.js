// Author: Saida Amirova

var popupOpened = {};

/* This function makes the hidden popup visible and shows it over the plant boxes. */
function showPopupAtPosition() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.style.width = '600px'; 

    var popupX = 100; 
    var popupY = 100; 

    popup.style.left = popupX + 'px';
    popup.style.top = popupY + 'px';
}

/* This function helps to click on the plants */
function handleImageClick(event) {
    var squareId = event.target.parentElement.id;
    
    if (!popupOpened[squareId]) {
        var squareRect = event.target.parentElement.getBoundingClientRect();
        var squareX = squareRect.left + window.pageXOffset;
        var squareY = squareRect.top + window.pageYOffset;
        showPopupAtPosition(squareX, squareY);

        popupOpened[squareId] = true;
    }
}

/* This function helps to close the opened popup */
function closePopup() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'none';
    
    popupOpened = {};
}

// adding an event listener to the squares/plant placeholder
document.getElementById('bin').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG' && event.target.parentElement.classList.contains('small-square')) {
        handleImageClick(event);
    }
});

var closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', closePopup);
