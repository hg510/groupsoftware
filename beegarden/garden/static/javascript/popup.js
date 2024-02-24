
var popupOpened = {};

function showPopupAtPosition(x, y) {
    var popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
}

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

function closePopup() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'none';
    
    popupOpened = {};
}

document.getElementById('bin').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG' && event.target.parentElement.classList.contains('small-square')) {
        handleImageClick(event);
    }
});

var closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', closePopup);
