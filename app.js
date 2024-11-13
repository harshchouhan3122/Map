const express = require('express');
// const fetch = require('node-fetch'); // Ensure to install node-fetch
const axios = require('axios');
const app = express();
const path = require('path');

// Set up EJS and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Route for home
app.get("/", (req, res) => { res.send("New Root Directory"); });

// Render the map with default coordinates if none are provided
app.get('/map1', async (req, res) => {
    const latitude = req.query.lat || 28.644800;  // Default to Delhi
    const longitude = req.query.lng || 77.216721;
    const cityName = await getPlaceName(latitude, longitude);

    console.log(`Latitude: ${latitude}, Longitude: ${longitude} and City is : ${cityName}`);

    // Rendering map (use proper template later)
    // res.send("Done Coord");
    res.render("map.ejs", {latitude, longitude});
});

// Render the map with default coordinates if none are not provided
app.get('/map2', async (req, res) => {
    const address = req.query.address;

    const coordinates = await getCoordinates(address);
    const { latitude, longitude } = coordinates;

    console.log(`Address: ${address} and its coordinates are ${JSON.stringify(coordinates)}`);
    
    // Rendering map (use proper template later)
    // res.send("Done Place");
    res.render("map2.ejs", {latitude, longitude, address});
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});





// GeoCoding

const apiKey = '4f77f8c9407145768351c42736f2d05a';          // Replace with your actual API key


// Forward Geocoding
async function getPlaceName(latitude, longitude) {

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        // console.log("Reverse Geocoding Response:", response.data);

        return response.data.results[0].formatted || "Unknown Location";
    } catch (error) {
        console.error("Error fetching place name:", error.message || error);
        return "Unknown Location";
    }
};

// Rverse GeoCoding
async function getCoordinates(address) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        // console.log("Forward Geocoding Response:", response.data); // Log full response data

        if (response.data.results && response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            return { latitude: parseFloat(lat), longitude: parseFloat(lng) };
        } else {
            console.error("Address not found in response.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message || error);
        return null;
    }
};