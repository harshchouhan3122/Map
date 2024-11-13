// Use the latitude and longitude passed from map.ejs
const map = L.map('map').setView([latitude, longitude], 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© WanderLust'
}).addTo(map);

// Define the custom marker icon
const customIcon = L.icon({
    iconUrl: 'icons/marker.png', // Replace with your custom icon image URL
    iconSize: [32, 32],  // Size of the icon
    iconAnchor: [16, 32],  // Anchor point of the icon (where it points to)
    popupAnchor: [0, -32],  // Adjusts the position of the popup relative to the icon
});

// Add the custom marker to the map
const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

// Bind a popup to the marker to display the location
marker.bindPopup(`Location: ${latitude}°N, ${longitude}°E`).openPopup();
