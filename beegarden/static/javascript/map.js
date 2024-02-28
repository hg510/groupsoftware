// Initialize the map with retina display support
var map = L.map('map', {
}).setView([50.734663728, -3.534497862], 13);

// Add a base map layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Array containing marker locations (latitude and longitude)
var markerLocations = [
    { name: "Seed 1", location: [50.7362, -3.5307] },
    { name: "Seed 2", location: [50.7348, -3.5374] },
    { name: "Seed 3", location: [50.7366, -3.5333] },
    { name: "Seed 4", location: [50.7340, -3.5316] },
    { name: "Seed 5", location: [50.7355, -3.5358] },
    { name: "Seed 6", location: [50.7367, -3.5369] }
];

// Loop through the marker locations array and add markers to the map
markerLocations.forEach(function(seed) {
    L.marker(seed.location).addTo(map)
        .bindPopup(seed.name); // Add popup with seed name
});

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

// Request continuous tracking of user's location
var watchId = navigator.geolocation.watchPosition(function(position) {
    // Update marker position with new location
    userMarker.setLatLng([position.coords.latitude, position.coords.longitude]).update();
}, function(error) {
    console.error('Error getting user location:', error.message);
}, {
    enableHighAccuracy: true // Enable high accuracy mode for better location accuracy
});

// Stop tracking when the user leaves the page
window.addEventListener('unload', function() {
    navigator.geolocation.clearWatch(watchId);
});
