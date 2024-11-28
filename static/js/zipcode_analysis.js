// Initialize the map
var myMap2 = L.map("map2", {
    center: [39.8283, -98.5795],
    zoom: 5
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap2);

// Create a regular LayerGroup to hold the markers
let incomeMarkers = L.layerGroup().addTo(myMap2);

// Store the income data globally
let incomeData = [];

// Load CSV data
d3.csv("../zipcodemerge_cleaned.csv").then(function (data) {
    console.log(data);

    data.forEach(d => {
        let income = +d.adjusted_gross_income;
        let lat = parseFloat(d.latitude);
        let lon = parseFloat(d.longitude);

        let marker = L.circleMarker([lat, lon], {
            radius: income / 1000090,
            fillColor: income > 50000 ? "#b10026" : "#ffffb2",
            color: "#fff",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(myMap2);

        marker.bindTooltip(d.city + ", " + d.state_code + "<br> Adjusted Gross Income: $" + income, {
            permanent: false,
            direction: 'top',
            className: 'custom-tooltip'
        });
    });
});
