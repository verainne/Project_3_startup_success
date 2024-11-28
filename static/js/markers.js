// Initialize the map
let myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Create a regular LayerGroup to hold the markers
let markers = L.layerGroup().addTo(myMap);

// Store the loaded data globally
let allData = [];

// Load CSV data
d3.csv("../Resources/startup_data_cleaned.csv").then(function (data) {
    allData = data;

    // Add markers for all data initially
    updateMarkers();
})

// Function to update markers based on selected categories
function updateMarkers() {
    const selectedCategories = Array.from(document.querySelectorAll("#category-filters input:checked"))
    .map(input => input.value);

    // Clear existing markers
    markers.clearLayers();

    // Loop through the data
    for (let i = 0; i < allData.length; i++) {
        let row = allData[i];
        let latitude = parseFloat(row.latitude);
        let longitude = parseFloat(row.longitude);

        // Check if coord exist and match selected categories
        if (latitude && longitude && selectedCategories.some(cat => row[cat] === "1")) {
            let markerColor = "blue";
            if (row.status === "closed") markerColor = "red";
            else if (row.status === "acquired") markerColor = "green";

            // Create a marker
            let marker = L.circleMarker([latitude, longitude], {
                color: markerColor,
                radius: 8
            }).bindPopup(`
                <b>${row.name}</b><br>
                Category: ${row.category_code}<br>
                Status: ${row.status}<br>
                Funding: $${row.funding_total_usd}
            `);

            // Add the marker to the LayerGroup
            markers.addLayer(marker);
        }
    }
}

// Add event listener for category selection changes
document.querySelector("#category-filters").addEventListener("change", updateMarkers);