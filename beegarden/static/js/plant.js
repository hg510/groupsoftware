// Author: Nur Deeni

// const { flow } = require("lodash");

// This function ensures cross-browser compatibility for attaching event listeners to DOM elements.

document.addEventListener("DOMContentLoaded", function() {

    console.log("DOM plant content loaded");
    var authToken = "{{ auth_token }}"; 
    fetchPlantedSeeds();
    
    var addEvent = (function () {
        if (document.addEventListener) {
            return function (el, type, fn) {
                if (el && el.nodeName || el === window) {
                    el.addEventListener(type, fn, false);
                } else if (el && el.length) {
                    for (var i = 0; i < el.length; i++) {
                        addEvent(el[i], type, fn);
                    }
                }
            };
        } else {
            return function (el, type, fn) {
                if (el && el.nodeName || el === window) {
                    el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
                } else if (el && el.length) {
                    for (var i = 0; i < el.length; i++) {
                        addEvent(el[i], type, fn);
                    }
                }
            };
        }
    })();

    // Creates a paragraph element
    var yum = document.createElement('p');
    var msie = /*@cc_on!@*/0;
    yum.style.opacity = 1;

    // Selects all image elements within list items of unordered lists
    var images = document.querySelectorAll('ul li img');

    // Iterates over each image element
    for (var i = 0; i < images.length; i++) {
        (function() {
            var img = images[i];
            img.setAttribute('draggable', 'true');
            
            // Extract seed type from image source URL
            var seedType = img.src.split('/').pop().split('_')[0];
            
            // Set seed type as a data attribute
            img.dataset.seedType = seedType;

            //Pass the flower name
            img.dataset.flowerName = seedType;            
    
            img.addEventListener('dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('seedType', this.dataset.seedType);
                e.dataTransfer.setData('originalContainer', this.parentElement.id);
            });
        })();
    }    

    // Selects all elements with the class 'small-square'
    var smallSquares = document.querySelectorAll('.small-square');

    // Iterates over each element with the class 'small-square'
    for (var i = 0; i < smallSquares.length; i++) {

        var dropSound = new Audio("/static/sound/planting_effect.mp3");
        var square = smallSquares[i];
        
        square.addEventListener('dragover', function (e) {
            if (e.preventDefault) e.preventDefault();
            this.classList.add('over');
            e.dataTransfer.dropEffect = 'copy';
            return false;
        });

        square.addEventListener('dragenter', function (e) {
            this.classList.add('over');
            return false;
        });

        square.addEventListener('dragleave', function () {
            this.classList.remove('over');
        });

        square.addEventListener('drop', function (e) {
            e.preventDefault();
            
            var seedType = e.dataTransfer.getData('seedType');
            var position = this.id;

            savePlantedSeed(seedType,position);
            
            var flowerPlantingImages = {                
                betony: "/static/img/flowers/betony.png",
                chamomile: "/static/img/flowers/chamomile.png",
                hops: "/static/img/flowers/hops.png",
                lavender: "/static/img/flowers/lavender.png",
                passion: "/static/img/flowers/passion.png",
                skullcap: "/static/img/flowers/skullcap.png",
                stjohn: "/static/img/flowers/stjohn.png",
                valerian: "/static/img/flowers/valerian.png",
                vervain: "/static/img/flowers/vervain.png",
                viper: "/static/img/flowers/viper.png"
            };
        
            var newImage = new Image();
            newImage.classList.add('swaying-flower');
            newImage.src = flowerPlantingImages[seedType];
        
            this.innerHTML = ''; 
            this.appendChild(newImage);
        
            var yumClone = yum.cloneNode(true);
            this.appendChild(yumClone);
        
            // Remove the seed from its original container
            var originalContainerId = e.dataTransfer.getData('originalContainer');
            var originalContainer = document.getElementById(originalContainerId);
            if (originalContainer) {
                var originalSeed = originalContainer.querySelector('img[data-seedType="' + seedType + '"]');
                if (originalSeed) {
                    originalContainer.removeChild(originalSeed);
                    originalSeed.classList.remove('swaying-flower');
                }
            }

            dropSound.play();
        
            setTimeout(function () {
                var opacity = 1;
                var fadeInterval = setInterval(function () {
                    if (opacity <= 0) {
                        clearInterval(fadeInterval);
                    } else {
                        yumClone.style.opacity = opacity;
                        opacity -= 0.1;
                    }
                }, 50);
            }, 250);
        
            return false;
        });             
    }

    function savePlantedSeed(seedType, position) {
        
        console.log("Flower type: ", seedType);
        console.log("At position: ", position);
        
        fetch('http://127.0.0.1:8000/garden/save_planted_seed/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCSRFToken() 
            },
            body: JSON.stringify({seed_type: seedType, position: position})
        })
        .then(response => {
            if (response.ok) {
                console.log('Seed saved successfully');
            } else {
                console.error('Failed to save seed');
            }
        })
        .catch(error => console.error('Error saving seed:', error));
    }    

    function getCSRFToken() {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Search for CSRF token cookie
                if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken' + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Fetch planted seeds from the server
        fetchPlantedSeeds();
    });

    // var authToken = null;

    document.addEventListener("DOMContentLoaded", function() {
        // Fetch the authentication token from the template
        authToken = "{{ auth_token }}"; 
    });

    function getAuthToken() {
        // Return the authentication token from the template
        return authToken;
    }

    function fetchPlantedSeeds() {
        fetch('http://127.0.0.1:8000/garden/load_planted_seeds/', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCSRFToken(),
                'Authorization': 'Bearer ' + getAuthToken()
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Planted seeds data: ", data);
            renderPlantedSeeds(data);
        })
        .catch(error => console.error('Error fetching planted seeds:', error));
    }    
    
    function renderPlantedSeeds(seeds) {
        if (!Array.isArray(seeds)) {
            console.error("Invalid data format for planted seeds:", seeds);
            return;
        }
    
        console.log("Rendering planted seeds: ", seeds);


        console.log("Before");

        seeds.forEach(seed => {
            console.log("After");
            const square = document.getElementById(seed.position);
            const newImage = new Image();
            newImage.src = `/static/img/flowers/${seed.seed_type}.png`;
            square.innerHTML = '';
            square.appendChild(newImage);
        });
    }
});

    // Author: Saida Amirova

    var popupOpened = {};

    /* This function makes the hidden popup visible and shows it over the plant boxes. */
    function showPopupAtPosition(squareX, squareY, seedType) {
        var popup = document.querySelector('.popup');
        popup.style.display = 'block';
        popup.style.width = '600px'; 

        var popupContent = '';

        switch(seedType) {
            case 'betony':
                popupContent = ' This is Betony popup';
                break;
            case 'chamomile':
                popupContent = 'This is Chamomile popup';
                break;
            case 'hops':
                popupContent = 'This is Hops popup';
                break;
            case 'lavender':
                popupContent = 'This is Lavender popup';
                break;
            case 'passion':
                popupContent = 'This is Passion popup';
                break;
            case 'skullcap':
                popupContent = 'This is Skullcap popup';
                break;
            case 'stjohn':
                popupContent = 'This is St John\s popup';
                break;
            case 'valerian':
                popupContent = 'This is Valerian popup';
                break;
            case 'vervain':
                popupContent = 'This is Vervain popup';
                break;
            case 'viper':
                popupContent = 'This is Viper popup';
                break;
            default:
                popupContent = 'Information about the plant...';
        }    

        popup.innerHTML = `
        <div id="closeButton" onclick="closePopup()">&times;</div>
        <p>${popupContent}</p>  
        <img class="real-plant" src="/static/img/popup/${seedType}_popup.jpg" alt="${seedType}">`;

        var popupX = 100;
        var popupY = 100; 

        popup.style.left = popupX + 'px';
        popup.style.top = popupY + 'px';
    }

    function getSeedType(element) {
        while (element && element.tagName !== 'IMG') {
            element = element.parentNode;
        }
        console.log("Element:", element);
        console.log("Dataset:", element ? element.dataset : null);
    
        if (element) {
            const flowerName = extractFlowerName(element.src);
            console.log("Flower name:", flowerName);
            return flowerName;
        } else {
            return null;
        }
    }    
    
    function extractFlowerName(src) {
        // Extracting flower name from image source URL
        const parts = src.split('/');
        const filename = parts[parts.length - 1];
        const flowerName = filename.split('.')[0];
        return flowerName;
    }   
    
    function handleImageClick(event) {
        console.log("Image clicked");
    
        // Check the event target
        console.log("Event target:", event.target);
    
        var squareId = event.target.parentElement.id;
    
        var flowerName = getSeedType(event.target);
    
        console.log('Flower name:', flowerName);
    
        if (!popupOpened[squareId]) {
            console.log('After if Clicked flower name:', flowerName);
            var squareRect = event.target.parentElement.getBoundingClientRect();
            var squareX = squareRect.left + window.pageXOffset;
            var squareY = squareRect.top + window.pageYOffset;
    
            if (flowerName) {
                showPopupAtPosition(squareX, squareY, flowerName);
                popupOpened[squareId] = true;
            } else {
                console.error('Flower name is undefined');
            }
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


// Function to generate a random seed
function randomSeed() {
    const flowersArray = ["betony", "chamomile", "lavender", "passion", "stjohn", "valerian", "vervain", "viper"];
    var chosenFlower = flowersArray[Math.floor(Math.random() * flowersArray.length)];
    console.log("Chosen flower:", chosenFlower);
    return chosenFlower;
}

// Initialize user seeds array if it doesn't exist in localStorage
var userSeedsArray = localStorage.getItem('userSeedsArray') ? JSON.parse(localStorage.getItem('userSeedsArray')) : [];

// Function to add the chosen flower to the user's seeds array
function userSeeds(chosenFlower) {
    // Add the chosen flower to the user seeds array
    userSeedsArray.push(chosenFlower);
    // Store the updated user seeds array in localStorage
    localStorage.setItem('userSeedsArray', JSON.stringify(userSeedsArray));
    console.log("User's seeds:", userSeedsArray);
}

// Function to clear the user seeds array
function clearUserSeeds() {
    // Empty the user seeds array
    userSeedsArray = [];
    // Update the localStorage to reflect the changes
    localStorage.setItem('userSeedsArray', JSON.stringify(userSeedsArray));
    console.log("User's seeds cleared.");
}

// Function to update the displayed seed images based on userSeedsArray
function updateDisplayedSeeds() {
    // Get the draggable container
    var container = document.getElementById("draggable-container");

    // Clear the existing content of the container
    container.innerHTML = '';

    // Iterate over userSeedsArray
    userSeedsArray.forEach(function(seedType) {
        // Add the seed image to the container
        addSeedImage(seedType);
    });
}

// Function to add a seed image to the draggable container
function addSeedImage(seedType) {
    // Create a new image element
    var newImg = document.createElement('img');
    // Set the src attribute of the image
    newImg.src = "/static/img/seeds/" + seedType + "_seed.png";
    // Set the data attributes
    newImg.setAttribute('data-seedType', seedType);
    newImg.setAttribute('data-flowerName', seedType);
    newImg.setAttribute('draggable', true);
    // Add the 'seed' class to the image
    newImg.classList.add('seed');
    // Append the image to the draggable container
    document.getElementById('draggable-container').appendChild(newImg);
}

function assignAndDisplay(){
    
    // Call randomSeed and userSeeds functions
    var randomFlower = randomSeed(); 
    userSeeds(randomFlower);  

    // Update the displayed seeds
    updateDisplayedSeeds();

    // Clear user seeds
    clearUserSeeds();

}

assignAndDisplay();
clearUserSeeds();