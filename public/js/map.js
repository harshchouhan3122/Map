// Use provided latitude and longitude from the template
const lat = latitude || 28.644800;  // Default latitude (Delhi)
const lng = longitude || 77.216721; // Default longitude (Delhi)

// Initialize the map centered at given coordinates
const map = L.map('map').setView([lat, lng], 10);

// Add OpenStreetMap tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; Wanderlust'
}).addTo(map);

// Custom marker icon (optional)
const customIcon = L.icon({
    iconUrl: 'icons/marker.png', // Path to your custom icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Add a marker at the provided coordinates
const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
marker.bindPopup("Location: " + lat + "°N, " + lng + "°E").openPopup();
