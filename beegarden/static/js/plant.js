// Author: Nur Deeni

// const { flow } = require("lodash");

// This function ensures cross-browser compatibility for attaching event listeners to DOM elements.

document.addEventListener("DOMContentLoaded", function() {

    console.log("DOM plant content loaded");
    var images = document.querySelectorAll('ul li img');
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
    // var images = document.querySelectorAll('ul li img');

    console.log(images);

    console.log("Before for loop");

    // Iterates over each image element
    for (var i = 0; i > images.length; i++) {
        console.log("Inside for loop for loop");
        (function() {
            var img = images[i];
            img.setAttribute('draggable', 'true');
            
            // Extract seed type from image source URL
            var seedType = img.src.split('/').pop().split('_')[0];

            console.log('Image source:', img.src);
            console.log('Extracted seed type:', seedType);
            
            // Set seed type as a data attribute
            img.dataset.seedType = seedType;

            //Pass the flower name
            img.dataset.flowerName = seedType;            
    
            img.addEventListener('dragstart', function (e) {
                e.dataTransfer.effectAllowed = 'copy';
                var seedType = this.dataset.seedType;
                e.dataTransfer.setData('seedType', seedType);
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
            
            // var seedType = e.dataTransfer.getData('seedType');
            var seedType = e.dataTransfer.getData('text/plain');

            console.log("New: ", seedType);
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

    document.addEventListener("DOMContentLoaded", function() {
        // Fetch planted seeds from the server
        fetchPlantedSeeds();
    });

    function fetchPlantedSeeds() {
        fetch('http://127.0.0.1:8000/garden/load_planted_seeds/', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': getCSRFToken()
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
                popupContent = 'Betony can last from early-summer to autumn. It is an important source of nectar that is extremely attractive to bees and many species of butterflies. Its bright colour also lures bees in. Betony thrives in a sunny to semi-sunny or shady location and most well-drained soils. It can cope well with heavy clay and locations such as grasslands, open woodlands, and hedgerows, making it an excellent garden plant. Rank: Rare';
                break;
            case 'chamomile':
                popupContent = 'Chamomile blooms in spring and summer. Since chamomile has sweet nectar, fragrant leaves, and is easy to spread and grow, it is loved by bees and other pollinators. Chamomile prefers plenty of sun and light soil that drains freely but does not dry out totally quickly or get waterlogged. While it grows quickly, it needs protection from slugs and snails during its young phase. Rank: Rare';
                break;
            case 'hops':
                popupContent = 'Hops’ Early varieties start to bloom around the summer solstice while its Alpha varieties tend to bloom later in midsummer. Its nectar does not have sweet scent, making bees generally not interested in it. But bees can depend on it when needed. Hops needs plenty of climbing space in a sunny location with well-draining soil. Ideally, some shade should be provided during the hot afternoon hours. Rank: Common';
                break;
            case 'lavender':
                popupContent = 'Lavender usually blooms from early summer and last until late summer. Due to long bloomer period and abundant amount of nectar and pollen, it is a great and classic source of food for bees. Bees are also attracted to its colourful and fragrant flowers. Lavender needs full sun and well-drained soil to grow best. It prefers low to moderately-fertile soils. Afternoon shade may help in the hot summer climates. Rank: Epic';
                break;
            case 'passion':
                popupContent = 'Passion flower blooms from early summer through to autumn. It has vibrant colour produce both nectar and pollen, resulting in a vast range of pollinators from insects to hummingbirds. It is deeply loved by the honey bee as it is not only their food source but also hiding spot and gathering place. Passionflower grows best in a sunny spot with the little shelter, and moist but well-drained soil. Most of them also produce edible fruits. Rank: Uncommon';
                break;
            case 'skullcap':
                popupContent = 'Skullcap blooms during summer and produce nectar and pollen rich flower. Therefore, it becomes a food source of the long-tongued bees. It also attracts a wide range of other insects such as butterflies, leafcutters, and beetles. Skullcap thrives best in partial shade and fertile soil that is moist but not waterlogged. Once the seedlings are established, it is known to spread quickly. Rank: Common';
                break;
            case 'stjohn':
                popupContent = 'St. John’s Wort usually bloom around early-summer or midsummer to early autumn. It has rich amount of nectar and pollen that attracts pollinators especially bees and butterflies. St. John’s Wort has diverse species that come with different requirements. In general, a good planting site for it is a sunny to semi-shady spot with humus-rich well-drained soil. Rank: Rare';
                break;
            case 'valerian':
                popupContent = 'Valerian blooms during summer and produce extremely fragrant flowers, making it a great source of nectar that attracts pollinators like Honeybees, Bumblebees, and Solitary bees, including butterflies and moths. Interestingly, cats also appreciate its smell. Valerian thrives best in full sun with consistently moist condition, and soil consisting of fertile loam. However, it can adapt to less ideal circumstance.Rank: Uncommon';
                break;
            case 'vervain':
                popupContent = 'Vervain blooms from late spring to early fall. As it blooms late and profusely, vervain offers both and great amount of nectar and pollen at the time when pollinators, especially bumblebees, are preparing for the coming of fall. Plus, vibrant colour makes it even more desirable for bees. Vervain needs full sun to part shade and average to moist soils to grow. It tolerates wet sites better than most plants. Rank: Epic';
                break;
            case 'viper':
                popupContent = 'Vipers Bugloss has a long blooming period from sprint to autumn. It produces energy rich nectars regularly throughout the day. Therefore, it attracts all sorts of bees while butterfly and moths also love it. Vipers Bugloss thrives in warm, sunny, dry place and can often be found on dry, ruderal areas. Therefore, the ideal way to plant it is under plenty of sun in a sandy, stony, or gravelly spot. Rank: Uncommon';
                break;
            default:
                popupContent = 'Information about the plant...';
        }

        popup.innerHTML = `
        <div id="closeButton" onclick="closePopup()">&times;</div>
        <p class="flower-info">${popupContent}</p>  
        <img class="real-plant" src="/static/img/popup/${seedType}_popup.jpg" alt="${seedType}" style="width: 200px;">`;        
        

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

function userSeeds(chosenFlower) {
    // Send AJAX request to Django view to save the chosen flower
    fetch('http://127.0.0.1:8000/garden/userSeeds/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({ chosenFlower: chosenFlower })
    })
    .then(response => {
        if (response.ok) {
            console.log("User's seed saved successfully");
        } else {
            console.error('Failed to save user seed');
        }
    })
    .catch(error => console.error('Error saving user seed:', error));
}

function clearUserSeeds() {

    // Send AJAX request to Django view to clear user seeds
    fetch('http://127.0.0.1:8000/garden/clearUserSeeds/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => {
        if (response.ok) {
            console.log("User's seeds cleared.");
        } else {
            console.error('Failed to clear user seeds');
        }
    })
    .catch(error => console.error('Error clearing user seeds:', error));
}

function updateDisplayedSeeds() {
    fetch('http://127.0.0.1:8000/garden/updateDisplayedSeeds/')
    .then(response => response.json())
    .then(data => {
        console.log("Fetched user seeds:", data.userSeedsArray); // Log the fetched user seeds
        // Clear the existing displayed seeds
        var container = document.getElementById("draggable-container");
        container.innerHTML = '';

        // Extract the array from the response object
        var userSeedsArray = data.userSeedsArray;

        // Iterate over the fetched seeds and add them to the container
        userSeedsArray.forEach(seed => {
            addSeedImage(seed);
        });
    })
    .catch(error => console.error('Error fetching user seeds:', error));
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
    
    // Attach a dragstart event listener
    newImg.addEventListener('dragstart', function(event) {
        // Set the drag data (seed type)
        event.dataTransfer.setData('text/plain', seedType);
    });

    // Attach a dragend event listener
    newImg.addEventListener('dragend', function(event) {
        // Hide the image after it has been dragged and dropped
        newImg.style.display = 'none';
    });
    
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