// Author: Saida Amirova

// setting the main view point as Exeter Streatham Campus
var map = L.map('map', {
}).setView([50.734663728, -3.534497862], 13);

// adding a base map layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var seedIcon = L.icon({
    iconUrl: seedIconUrl, 
    iconSize: [32, 32],  
    iconAnchor: [16, 16] 
});

// creating seed markers scattered around on campus
var markerLocations = [
    { name: "lavender", location: [50.7362, -3.5307] },
    { name: "vervain", location: [50.7348, -3.5374] },
    { name: "chamomile", location: [50.7366, -3.5333] },
    { name: "stjohn", location: [50.7340, -3.5316] },
    { name: "betony", location: [50.7355, -3.5358] },
    { name: "viper", location: [50.7367, -3.5369] }
];

// adding a popup for the seeds, e.g., seed 1, seed 2, etc. 
markerLocations.forEach(function(seed) {
    L.marker(seed.location, {icon: seedIcon}).addTo(map) // Assigning the custom icon
        .bindPopup(seed.name); 
});

map.locate({setView: true, maxZoom: 16});

// Define an array to store routing control instances for each seed
var routingControls = [];


function addRouting(userLocation, seedLocation) {
    var control = L.Routing.control({
        waypoints: [
            L.latLng(userLocation),
            L.latLng(seedLocation)
        ],
        routeWhileDragging: true,
        show: false
    }).addTo(map);
    
    routingControls.push(control);
}

function clearRoutingControls() {
    routingControls.forEach(function(control) {
        map.removeControl(control);
    });
    routingControls = [];
}


function isNearSeed(userLocation, seedLocation) {
    var distance = userLocation.distanceTo(seedLocation);
    return distance <= 10; // Adjust the distance threshold as needed
}

map.on('locationfound', function(e) {
    var userLocation = e.latlng;

    markerLocations.forEach(function(seed) {
        var seedLocation = L.latLng(seed.location);
        if (!isNearSeed(userLocation, seedLocation)) {
            // clearRoutingControls();
            // updateScore(seed.name); 
            onSeedReached(seed.name);
        } else {
            addRouting(userLocation, seedLocation);
        }
    });
}); 

// Function to update the user's score
function updateScore() {
    // Retrieve the CSRF token from the HTML
    var csrftoken = getCookie('csrftoken');

    // Send an AJAX request to update the user's score
    $.ajax({
        url: 'http://127.0.0.1:8000/map/seedMap/', // Endpoint URL to update the score
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken  // Include the CSRF token in the headers
        },
        data: {
            score_increment: 30  // Fixed score increment of 30 points
        },
        success: function(response) {
            if (response.success) {
                console.log('Score updated successfully.');
                // Handle success as needed
                console.log('Current Score:', response.current_score);
                console.log('Updated Score:', response.updated_score);
            } else {
                console.error('Error updating score:', response.error);
            }
        },
        error: function(error) {
            console.error('Error updating score:', error);
        }
    });
}

// Function to retrieve the CSRF token from cookies
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

map.on('locationerror', onLocationError);

/* This function helps to find the user's location. If the location is found, it is shown on the map immediately. */
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are here!").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

/* This function helps to trap any location related errors */
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

var userMarker = L.marker([0, 0]).addTo(map); // Initialize userMarker with a dummy location

// the variable finds the user's geolocation
var watchId = navigator.geolocation.watchPosition(function(position) {

// updating the user location whenever it changes
    userMarker.setLatLng([position.coords.latitude, position.coords.longitude]).update();
}, function(error) {
    console.error('Error getting user location:', error.message);
}, {
    enableHighAccuracy: true 
});

window.addEventListener('unload', function() {
    navigator.geolocation.clearWatch(watchId);
});



