const express = require('express');
const app = express();
const path = require('path');

// Set up EJS and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Route for home
app.get("/", (req, res) => { res.send("New Root Directory"); });

// Render the map with default coordinates if none are provided
app.get('/map', (req, res) => {
    const latitude = req.query.lat || 28.644800;  // Default to Delhi
    const longitude = req.query.lng || 77.216721;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    res.render('map', { latitude, longitude });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


// GeoCoding