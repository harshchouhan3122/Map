const express = require("express");
const app = express();


// Templates path
const path = require("path");


//Connect Ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));



app.get("/", (req, res) => {
    let latitude = 28.7041;     //Delhi
    let longitude = 77.1025;
    res.render("index.ejs", {latitude, longitude} );
});

app.get('/show', (req, res) => {
    const latitude = req.query.lat || null; // Access latitude from the query string
    const longitude = req.query.lng || null; // Access longitude from the query string
    const address = req.query.address || null;
    
    if (latitude && longitude){
        console.log(`Coordinates: Latitude = ${latitude}, Longitude = ${longitude}`);
        res.render("index.ejs", {latitude, longitude});
    }
    
    else if (address) {
        console.log(`Address : ${address}`);
        res.render("index.ejs", {latitude, longitude, address});
    }
});

// app.get('/show', (req, res) => {
//     const { lat, lng, address } = req.query;
//     let mapUrl;

//     if (lat && lng) {
//         // Use latitude and longitude if both are provided
//         mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
//     } else if (address) {
//         // Fallback to address if latitude and longitude are not provided
//         mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
//     } else {
//         // Handle case where neither coordinates nor address are provided
//         return res.send("Please provide either latitude and longitude or an address.");
//     }

//     res.render('map', { mapUrl }); // Pass the map URL to your view
// });



app.listen(3000, (req, res) => {
    console.log("App is Listening to Port: 3000");
});