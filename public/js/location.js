const axios = require('axios');


const apiKey = '4f77f8c9407145768351c42736f2d05a';          // Replace with your actual API key


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
}




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
}



// Test the function
getCoordinates("Divise Electronics Private limited, Pune, India").then(coordinates => {
    console.log("Coordinates for Divine:", coordinates);
});

getPlaceName(18.51957, 73.85535).then(placeName => {
    console.log("Place Name:", placeName);
});













// Example test case runner
// const testCities = [
//     "New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", 
//     "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
// ];

// testCities.forEach(city => {
//     getCoordinates(`${city}, India`).then(coordinates => {
//         console.log(`Coordinates for ${city}:`, coordinates);
//     }).catch(error => console.error(`Error fetching coordinates for ${city}:`, error));
// });

// // Additional Edge and Error test cases
// const edgeTestCases = [
//     "NonExistentCity, India", "", "₹, India", 
//     "The Taj Mahal, Mehtab Bagh, Agra, Uttar Pradesh, India", "Delhi"
// ];

// edgeTestCases.forEach(address => {
//     getCoordinates(address).then(coordinates => {
//         console.log(`Coordinates for "${address}":`, coordinates);
//     }).catch(error => console.error(`Error fetching coordinates for "${address}":`, error));
// });





// getPlaceName(28.365, 77.6542).then(placeName => {
//     console.log("Place Name:", placeName);
// });


// async function runTests() {
//     // Test Case 1: Valid coordinates (expected: known place name)
//     console.log("Test Case 1: Valid coordinates for New Delhi, India");
//     const result1 = await getPlaceName(28.6139, 77.2090);
//     console.log("Expected: Place name for New Delhi\nActual:", result1, "\n");

//     // Test Case 2: Coordinates in the ocean (expected: nearest location or "Unknown Location")
//     console.log("Test Case 2: Coordinates in the middle of the Atlantic Ocean");
//     const result2 = await getPlaceName(0, -30);
//     console.log("Expected: 'Unknown Location' or nearest coastal location\nActual:", result2, "\n");

//     // Test Case 3: Invalid coordinates (latitude out of range)
//     console.log("Test Case 3: Invalid latitude (91, should be out of range)");
//     const result3 = await getPlaceName(91, 0);
//     console.log("Expected: 'Unknown Location' or error handling\nActual:", result3, "\n");

//     // Test Case 4: Invalid coordinates (longitude out of range)
//     console.log("Test Case 4: Invalid longitude (181, should be out of range)");
//     const result4 = await getPlaceName(0, 181);
//     console.log("Expected: 'Unknown Location' or error handling\nActual:", result4, "\n");

//     // Test Case 5: Edge case near the North Pole
//     console.log("Test Case 5: Coordinates near the North Pole");
//     const result5 = await getPlaceName(89.9, 135);
//     console.log("Expected: nearest location or 'Unknown Location'\nActual:", result5, "\n");

//     // Test Case 6: Edge case near the South Pole
//     console.log("Test Case 6: Coordinates near the South Pole");
//     const result6 = await getPlaceName(-89.9, 45);
//     console.log("Expected: nearest location or 'Unknown Location'\nActual:", result6, "\n");

//     // Test Case 7: Check if the function gracefully handles API request errors (e.g., network error)
//     console.log("Test Case 7: Simulate network error or invalid API key");
//     const invalidKey = 'INVALID_API_KEY';
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=28.6139+77.2090&key=${invalidKey}`;
//     try {
//         await axios.get(url);
//     } catch (error) {
//         console.log("Expected: Error message due to invalid API key or network error\nActual:", error.message, "\n");
//     }
// }

// // Run all test cases
// runTests();