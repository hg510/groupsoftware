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
    { name: "Seed 1", location: [50.7362, -3.5307] },
    { name: "Seed 2", location: [50.7348, -3.5374] },
    { name: "Seed 3", location: [50.7366, -3.5333] },
    { name: "Seed 4", location: [50.7340, -3.5316] },
    { name: "Seed 5", location: [50.7355, -3.5358] },
    { name: "Seed 6", location: [50.7367, -3.5369] }
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
        if (isNearSeed(userLocation, seedLocation)) {

            clearRoutingControls();
        } else {

            addRouting(userLocation, seedLocation);
        }
    });
});


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



