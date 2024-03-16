// Author: Saida Amirova

var popupOpened = {};

/* This function makes the hidden popup visible and shows it over the plant boxes. */
function showPopupAtPosition(squareId, flowerName) {
    
    console.log("flowerName:", flowerName);
    
    var popup = document.querySelector('.popup');
    popup.style.display = 'block';
    popup.style.width = '600px';

    // Get the flower information text from the flowerInfo object
    var flowerInfoText = flowerInfo[flowerName];

    // Get the flower image path from the flowerPopupImages object
    var flowerImagePath = flowerPopupImages[flowerName];

    // Set the flower information text and image source in the popup
    document.getElementById('flowerInfo').textContent = flowerInfoText;

    // Set the src attribute of the img element with ID 'flowerPopupImages'
    document.getElementById('flowerPopupImages').src = flowerImagePath;

    // Set the position of the popup
    var popupX = 100;
    var popupY = 100;
    popup.style.left = popupX + 'px';
    popup.style.top = popupY + 'px';
}

/* This function helps to click on the plants */
function handleImageClick(event) {
    
    console.log("Event: ", event.target);
    var imgElement = event.target.closest('img');
    if (!imgElement) return; // Ensure that imgElement is found
    
    console.log("Dataset: ", imgElement.dataset); // Log dataset attributes
    var squareId = imgElement.parentElement.id;
    var flowerName = imgElement.dataset.seedType;
    console.log("flowerName: ", flowerName);

    if (!popupOpened[squareId]) {
        var squareRect = imgElement.parentElement.getBoundingClientRect();
        var squareX = squareRect.left + window.pageXOffset;
        var squareY = squareRect.top + window.pageYOffset;
        showPopupAtPosition(squareId, flowerName); // Pass squareId and flowerName
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
document.getElementById('bin').addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG' && event.target.parentElement.classList.contains('small-square')) {
        handleImageClick(event);
    }
});

var closeButton = document.getElementById('closeButton');
if (closeButton) {  
    closeButton.addEventListener('click', closePopup);
}

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
var flowerPopupImages = {
    betony: "/static/img/popup/betony_popup.png",
    chamomile: "/static/img/popup/chamomile_popup.jpg",
    hops: "/static/img/popup/hops_popup.jpg",
    lavender: "/static/img/popup/lavender_popup.jpg",
    passion: "/static/img/popup/passion_popup.png",
    skullcap: "/static/img/popup/skullcap_popup.jpg",
    stjohn: "/static/img/popup/stjohn_popup.jpg",
    valerian: "/static/img/popup/valerian_popup.jpg",
    vervain: "/static/img/popup/vervain_popup.png",
    viper: "/static/img/popup/viper_popup.jpg"
};