// Author: Saida Amirova

// setting the main view point as Exeter Streatham Campus
var map = L.map('map', {
}).setView([50.734663728, -3.534497862], 13);

// adding a base map layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
    L.marker(seed.location).addTo(map)
        .bindPopup(seed.name); 
});

map.locate({setView: true, maxZoom: 16});

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

// var map = L.map('map').setView([50.734663728, -3.534497862], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var markerLocations = [
//     { name: "Seed 1", location: [50.7362, -3.5307] },
//     { name: "Seed 2", location: [50.7348, -3.5374] },
//     { name: "Seed 3", location: [50.7366, -3.5333] },
//     { name: "Seed 4", location: [50.7340, -3.5316] },
//     { name: "Seed 5", location: [50.7355, -3.5358] },
//     { name: "Seed 6", location: [50.7367, -3.5369] }
// ];

// var seedMarkers = [];

// // markerLocations.forEach(function(seed) {
// //     var marker = L.marker(seed.location, { clickable: true }).addTo(map).bindPopup(seed.name);
// //     seedMarkers.push(marker);
    
// //     marker.on('dragend', function(event) {
// //         marker.setLatLng(seed.location); 
// //     });

// //     marker.openPopup();
    
// // });

// markerLocations.forEach(function(seed) {
//     var marker = L.marker(seed.location, { clickable: true }).addTo(map).bindPopup(seed.name);

//     marker.on('click', function() {
//         this.openPopup();
//     });

//     seedMarkers.push(marker);
// });


// var userMarker;

// function onLocationFound(e) {
//     var userLatLng = e.latlng;

//     if (!userMarker) {
//         userMarker = L.marker(userLatLng).addTo(map).bindPopup("You are here");

//         userMarker.on('click', function() {
//             this.openPopup();
//         });
//     } else {
//         userMarker.setLatLng(userLatLng);
//     }

//     if (userMarker && seedMarkers.length > 0) {
//         var waypoints = seedMarkers.map(function(marker) {
//             return marker.getLatLng();
//         });
//         waypoints.unshift(userLatLng);

//         L.Routing.control({
//             waypoints: waypoints,
//             routeWhileDragging: true
//         }).addTo(map);
//     }
// }


// function onLocationError(e) {
//     alert(e.message);
// }

// map.on('locationfound', onLocationFound);
// map.on('locationerror', onLocationError);

// var watchId = navigator.geolocation.watchPosition(function(position) {
//     onLocationFound({ latlng: L.latLng(position.coords.latitude, position.coords.longitude) });
// }, function(error) {
//     console.error('Error getting user location:', error.message);
// }, {
//     enableHighAccuracy: true
// });

// window.addEventListener('unload', function() {
//     navigator.geolocation.clearWatch(watchId);
// });

