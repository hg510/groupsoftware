const clickableElem = document.getElementById('clickableElement'); 

const popup = document.getElementById('popup');


function closePopup() {
        popup.style.display = 'none';
    }


clickableElem.addEventListener('click', showPopup);