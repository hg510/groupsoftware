/* Author: Saida Amirova */

var popupOpened = {};
var flowerName; // Define flowerName variable here

// Define flower information object
var flowerInfo = {
    betony: "Betony is a flowering plant...",
    chamomile: "Chamomile is a common name for several daisy-like plants...",
    hops: "Hops are the flowers of the hop plant...",
    lavender: "Lavender is a genus of 47 known species...",
    passion: "Passionflower, a climbing vine, is used for sleep problems...",
    skullcap: "Skullcap is a perennial herbaceous plant in the mint family...",
    stjohn: "St. John's wort is a flowering plant...",
    valerian: "Valerian is a perennial flowering plant...",
    vervain: "Vervain is a flowering plant in the family Verbenaceae...",
    viper: "Viper's bugloss is a plant species in the borage family..."
};

// Define flower image paths object
var flowerImages = {
    betony: "{% static 'img/popup/betony.png' %}",
    chamomile: "{% static 'img/popup/chamomile.jpg' %}",
    hops: "{% static 'img/popup/hops.jpg' %}",
    lavender: "{% static 'img/popup/lavender.jpg' %}",
    passion: "{% static 'img/popup/passion.png' %}",
    skullcap: "{% static 'img/popup/skullcap.jpg' %}",
    stjohn: "{% static 'img/popup/stjohn.jpg' %}",
    valerian: "{% static 'img/popup/valerian.jpg' %}",
    vervain: "{% static 'img/popup/vervain.png' %}",
    viper: "{% static 'img/popup/viper.jpg' %}"
};

/* This function makes the hidden popup visible and shows it over the plant boxes. */
function showPopupAtPosition() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.style.width = '600px';

    // Display flower information based on flower name
    var flowerInfoText = flowerInfo[flowerName];
    var flowerImagePath = flowerImages[flowerName];

    document.getElementById('flowerInfo').textContent = flowerInfoText;
    document.getElementById('flowerImage').src = flowerImagePath;

    var popupX = 100;
    var popupY = 100;

    popup.style.left = popupX + 'px';
    popup.style.top = popupY + 'px';
}

/* This function helps to click on the plants */
function handleImageClick(event) {
    var squareId = event.target.parentElement.id;
    flowerName = event.target.dataset.seedType; 

    if (!popupOpened[squareId]) {
        var squareRect = event.target.parentElement.getBoundingClientRect();
        var squareX = squareRect.left + window.pageXOffset;
        var squareY = squareRect.top + window.pageYOffset;
        showPopupAtPosition(flowerName);

        popupOpened[squareId] = true;
    }
}

/* This function helps to close the opened popup */
function old_closePopup() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'none';

    popupOpened = {};
}

// adding an event listener to the squares/plant placeholder
document.getElementById('bin').addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG' && event.target.parentElement.classList.contains('small-square')) {
        handleImageClick(event);
    }
});

var closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', closePopup);