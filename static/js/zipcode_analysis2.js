// Initialize the map
var myMap2 = L.map("map2", {
    center: [39.8283, -98.5795],
    zoom: 4
});

// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap2);

const geoJsonUrl2 = "https://gist.githubusercontent.com/sdwfrost/d1c73f91dd9d175998ed166eb216994a/raw/e89c35f308cee7e2e5a784e1d3afc5d449e9e4bb/counties.geojson";

// Create a regular LayerGroup to hold the markers
let incomeMarkers = L.layerGroup().addTo(myMap2);
let heatmapMarkers = L.layerGroup().addTo(myMap2);

// Store the data globally
let incomeData = [];
let heatmapData = [];
let cityNames = [];
let categoryData = [];
let stateData = [];

// Load CSV data
d3.csv("../Resources/merged_df_cleaned.csv").then(data2 => {
    console.log(data2);

    let aggregatedData = {};

    data2.forEach(d2 => {
        let income = +d2.adjusted_gross_income;
        let totalincome = +d2.total_income_amount;
        let fundingamount = +d2.funding_total_usd;
        let business = +d2.number_of_business;
        let names = d2.name;
        let city = d2.city;
        let population = +d2.population;
        let county = d2.county;
        let lat = parseFloat(d2.latitude);
        let lon = parseFloat(d2.longitude);
        let categoryCode = d2.category_code;
        let stateName = d2.state_code;

        // Add income data to the global array for charting
        incomeData.push(income);
        cityNames.push(city);
        categoryData.push(categoryCode);
        stateData.push(stateName);

        var buildingIcon = L.icon({
            iconUrl: 'https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-blank-round-sticker-template-png-image_4684569.png',
            iconSize: [15, 15],
            iconAnchor: [1, 1],
            className: 'custom-marker'
        })

        let buildingMarker = L.marker([lat, lon], { icon: buildingIcon }, {
            weight: 0,
            opacity: 0.2,
            fillOpacity: 0.8
        }).addTo(myMap2);

        buildingMarker.bindTooltip("<b>"+ city + ", " + d2.state_code + "</b><br> Average number of businesses: " + business + "<br> Average total income: $" + totalincome + "<br> Average funding total: $" + fundingamount, {
            permanent: false,
            direction: 'top',
            className: 'custom-tooltip'
        });

        // Function to scale the marker on mouseover
        function scaleMarker(e) {
            var target = e.target;
            target.setIcon(L.icon({
                iconUrl: 'https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-blank-round-sticker-template-png-image_4684569.png',
                iconSize: [40, 40], 
                iconAnchor: [15, 25]
            }));
        }

        // Function to reset the marker size on mouseout
        function resetMarker(e) {
            var target = e.target;
            target.setIcon(L.icon({
                iconUrl: 'https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-blank-round-sticker-template-png-image_4684569.png', 
                iconSize: [15, 15],
                iconAnchor: [1, 1]
            }));
        }

        // Add event listeners for mouseover and mouseout
        buildingMarker.on({
            mouseover: scaleMarker,
            mouseout: resetMarker
        });
    });

    // After loading the data and creating markers, create the income chart
    createIncomeChart(cityNames, incomeData);
    createCategoryChart(stateData, categoryData);

});

d3.csv("../zipcodemerge_cleaned.csv").then(data3 => {
    console.log(data3);

    data3.forEach(d3 => {
        let heatIncome = +d3.adjusted_gross_income;
        let heatLat = parseFloat(d3.latitude);
        let heatLon = parseFloat(d3.longitude);

        heatmapData.push([heatLat, heatLon, heatIncome]);
    });

    console.log(heatmapData);

    L.heatLayer(heatmapData, {
        radius: 25,
        maxOpacity: 1,
        scaleRadius: true,
        blur: 40,
        maxZoom: 10,
        gradient: {
            0.0: '#FDE725',
            0.2: '#7AD151',
            0.4: '#22A884',
            0.6: '#2A788E',
            0.8: '#414487',
            1.0: '#440154' 
        }
    }).addTo(myMap2);

    let heatLegend = L.control({ position: "bottomright" });

    heatLegend.onAdd = function() {
        let heatDiv = L.DomUtil.create("div", "info legend");
        let heatGrades = [0, 2000000, 4000000, 6000000, 8000000, 10000000];
        let heatLabels = [];

        for (let k=0; k < heatGrades.length; k++) {
            heatDiv.innerHTML +=
                '<k style="background:' + getColor(heatGrades[k] + 1) + '"></k> ' + '$' +
                heatGrades[k] + (heatGrades[k + 1] ? ' &ndash; $' + heatGrades[k + 1] + '<br>' : '+');
        }
        heatDiv.innerHTML = '<h4>Income Levels</h4>' + heatDiv.innerHTML;

        return heatDiv;
    };
    
    function getColor(income) {
        return income > 10000000 ? '#440154' :
               income > 8000000  ? '#414487' :
               income > 6000000  ? '#2A788E' :
               income > 4000000  ? '#22A884' :
               income > 2000000  ? '#7AD151' :
                                 '#FDE725';
    }

    heatLegend.addTo(myMap2);
});