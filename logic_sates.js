document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map
  let map = L.map("map", {
    center: [37.8, -96],
    zoom: 4
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const geoJsonUrl = "https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson";
  let fundingLayer, acquisitionLayer;

  // Function to calculate funding averages
  function calculateAverageFunding(data) {
    const stateFunding = {};
    data.forEach(row => {
      const stateCode = row.state_code.trim().toUpperCase();
      const funding = parseFloat(row.funding_total_usd);

      if (!stateFunding[stateCode]) {
        stateFunding[stateCode] = { totalFunding: 0, count: 0 };
      }

      if (!isNaN(funding)) {
        stateFunding[stateCode].totalFunding += funding;
        stateFunding[stateCode].count += 1;
      }
    });

    for (const stateCode in stateFunding) {
      stateFunding[stateCode].averageFunding =
        stateFunding[stateCode].totalFunding / stateFunding[stateCode].count;
    }

    return stateFunding;
  }

  // Function to calculate acquisition proportions
  function calculateAcquisitionProportions(data) {
    const stateAcquisitions = {};
    data.forEach(row => {
      const stateCode = row.state_code.trim().toUpperCase();
      const acquired = parseInt(row.labels, 10);

      if (!stateAcquisitions[stateCode]) {
        stateAcquisitions[stateCode] = { acquired: 0, total: 0 };
      }

      stateAcquisitions[stateCode].acquired += acquired;
      stateAcquisitions[stateCode].total += 1;
    });

    for (const stateCode in stateAcquisitions) {
      stateAcquisitions[stateCode].proportionAcquired =
        stateAcquisitions[stateCode].acquired / stateAcquisitions[stateCode].total;
    }

    return stateAcquisitions;
  }

// Function to determine color for funding
function getColor(funding) {
  return funding > 50000000 ? "#800026" :
         funding > 20000000 ? "#BD0026" :
         funding > 10000000 ? "#E31A1C" :
         funding > 5000000  ? "#FC4E2A" :
         funding > 1000000  ? "#FD8D3C" :
         funding > 500000   ? "#FEB24C" :
                              "#FFEDA0"; // Lightest
}

// Function to determine color for acquisition proportion
function getAcquisitionColor(proportion) {
  return proportion > 0.8 ? "#800026" : // Dark red
         proportion > 0.6 ? "#BD0026" :
         proportion > 0.4 ? "#E31A1C" :
         proportion > 0.2 ? "#FC4E2A" :
                            "#FFEDA0"; // Lightest
}


  // Load data and create layers
  Promise.all([
    d3.csv("startup_data_cleaned.csv"),
    d3.json(geoJsonUrl)
  ]).then(([csvData, geoJsonData]) => {
    const averageFunding = calculateAverageFunding(csvData);
    const acquisitionProportions = calculateAcquisitionProportions(csvData);

    // Create funding layer
    fundingLayer = L.geoJSON(geoJsonData, {
      style: function (feature) {
        const stateCode = feature.properties?.postal?.trim().toUpperCase();
        const funding = averageFunding[stateCode]?.averageFunding || 0;
        return {
          fillColor: getColor(funding),
          weight: 1,
          opacity: 1,
          color: "white",
          fillOpacity: 0.7
        };
      },
      onEachFeature: function (feature, layer) {
        const stateCode = feature.properties?.postal?.trim().toUpperCase();
        const funding = averageFunding[stateCode]?.averageFunding || 0;
        layer.bindPopup(`
          <b>${feature.properties.name}</b><br>
          Average Funding: $${funding.toFixed(2)}
        `);
      }
    });

    // Create acquisition layer
    acquisitionLayer = L.geoJSON(geoJsonData, {
      style: function (feature) {
        const stateCode = feature.properties?.postal?.trim().toUpperCase();
        const proportion = acquisitionProportions[stateCode]?.proportionAcquired || 0;
        return {
          fillColor: getAcquisitionColor(proportion),
          weight: 1,
          opacity: 1,
          color: "white",
          fillOpacity: 0.7
        };
      },
      onEachFeature: function (feature, layer) {
        const stateCode = feature.properties?.postal?.trim().toUpperCase();
        const proportion = acquisitionProportions[stateCode]?.proportionAcquired || 0;
        layer.bindPopup(`
          <b>${feature.properties.name}</b><br>
          Proportion Acquired: ${(proportion * 100).toFixed(2)}%
        `);
      }
    });

    // Add initial layer
    fundingLayer.addTo(map);

    // Handle dropdown changes
    document.getElementById("mapType").addEventListener("change", function (e) {
      const value = e.target.value;

      if (value === "funding") {
        map.removeLayer(acquisitionLayer);
        fundingLayer.addTo(map);
      } else if (value === "acquisition") {
        map.removeLayer(fundingLayer);
        acquisitionLayer.addTo(map);
      }
    });
  }).catch(error => console.error("Error loading data:", error));
});
