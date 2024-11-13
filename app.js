const express = require('express');
const app = express();
const path = require('path');

// For ejs connectivity
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Root Directory
app.get("/", (req, res) => {res.send(" New Root Directory");});

// Dummy Map
app.get("/showMap", (req, res) => {
    res.render("map.ejs");
});

app.get('/map', (req, res) => {
    const latitude = req.query.lat || 28.5204 ;
    const longitude = req.query.lng || 79.8567 ;
    // const latitude = req.query.lat ;
    // const longitude = req.query.lng ;


    // Log details to ensure values are passed correctly
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    res.render('map.ejs', { latitude, longitude });
});


// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
