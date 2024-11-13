// Initialize the map and set the center and zoom level
var map = L.map('map').setView([28.644800, 77.216721], 10);

// OpenStreetMap Tile Layer
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,  // Maximum allowed zoom level
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
osm.addTo(map);

// Add Marker to the map
var marker = L.marker([28.644800, 77.216921]).addTo(map);

// Bind popup to the marker
// marker.bindPopup("<b>Hello world!</b><br>I am a popup for marker 1.").openPopup();
marker.bindPopup("<b>Hello world!</b><br>I am a popup for marker 1.");

// Create a standalone popup and set it on the map
var popup = L.popup()
    .setLatLng([28.644900, 77.216621])
    .setContent("I am a standalone popup.");
    // .openOn(map);

    
// Define the custom icon for the marker (if you have a custom icon)
// const customIcon = L.icon({
//     iconUrl: 'icons/marker.png', // Path to your custom icon
//     iconSize: [40, 40],  // Size of the icon (adjust as necessary)
//     iconAnchor: [12, 41],  // Anchor point of the icon
//     popupAnchor: [1, -34], // Position of the popup relative to the icon
// });

// // Add the custom marker to the map
// const marker2 = L.marker([28.644800, 77.556921], {
//     icon: customIcon,
//     draggable: true  // Marker is draggable
// });

// // Bind a popup to the marker and open it immediately
// marker2.bindPopup("Custom Marker at " + marker2.getLatLng()).openPopup();

// Add the marker to the map
// marker2.addTo(map);

// console.log(marker2.toGeoJSON());



// Layer Control

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});


googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});





// Leaflet EVENTS

// Handle mouse click events on the map
function onMapClick(e) {
    var clickPopup = L.popup()
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

// Add an event listener to the map for the 'click' event
map.on('click', onMapClick);


map.on('mousemove', (e) => {
    // Update the coordinate display in the element with class 'coordinate'
    document.getElementsByClassName('coordinate')[0].innerHTML = 'Lat:'+ e.latlng.lat + ', Lng: ' + e.latlng.lng;
    // console.log(e.latlng.lat +', '+ e.latlng.lng);
});













// Define the custom icon for the marker
customIcon = L.icon({
    iconUrl: 'icons/marker.png',  // Path to your custom icon
    iconSize: [40, 40],  // Size of the icon
    iconAnchor: [12, 41],  // Anchor point of the icon
    popupAnchor: [1, -34], // Position of the popup relative to the icon
});

// Add the custom marker to the map
marker2 = L.marker([28.644800, 77.556921], {
    icon: customIcon,
    draggable: true  // Marker is draggable
});

// // Bind a popup to the marker
// marker2.bindPopup("Custom Marker at " + marker2.getLatLng());

// Open the popup immediately
marker2.openPopup();

// Add the marker to the map
marker2.addTo(map);

// Listen for the 'dragend' event to update the popup when the marker is dragged
marker2.on('dragend', function(e) {
    const newLatLng = marker2.getLatLng();  // Get the new position of the marker
    marker2.setPopupContent("Custom Marker at " + newLatLng).openPopup();  // Update the popup content with new position
});















var baseLayers = {
    "Google Street": googleStreets,
    "OpenStreetMap": osm,
    "Google Hybrid": googleHybrid,
    "Google Satelite": googleSat,
    "Google Terrain": googleTerrain,
};

var overlays = {
    "Default Marker": marker,
    "Custom Marker": marker2
};

L.control.layers(baseLayers, overlays, {collapsed: false}).addTo(map);



// //////////////////////////////////////////////////////////////////
//                        GEO Coding in Leaflet  and marker position preview
/////////////////////////////////////////////////////////////////////

