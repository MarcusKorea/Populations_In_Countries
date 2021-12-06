// Create a map object
var myMap = L.map("map", {
    center: [10, -20],
    zoom: 2
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
//var link = "countries.geojson";
var link = "https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson"

// Use this link to get the population data.
var link2 = "data/PopulationByAgeSex";

// Function that will determine the color of a country based on its population
function chooseColor(totalPopulation) {
  switch (true) {
  case totalPopulation > 100000000:
    return "darkred";
  case totalPopulation > 50000000:
    return "red";
  case totalPopulation > 30000000:
    return "orange";
  case totalPopulation > 20000000:
    return "gold";
  case totalPopulation > 10000000:
    return "yellow";
  default:
    return "green";
  }
}

// fetchJSON('countries.geojson').then(function(data) { 
//   console.log(data);
//   return data });

d3.json("https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson").then(function(response) {
  console.log(response);
});

// d3.json("countries.geojson").then((importedData) => {
//   console.log(importedData);
// });

// var geojson = new L.GeoJSON.AJAX("countries.geojson");
// geojson.on('data:loaded', function(){
// geojson.addTo(mymap);
// });

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  console.log(data)
  geoJson = L.geoJson(data, {
    // Style for each feature (in this case a country)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: white,  //chooseColor(features.ADMIN[0]),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Setting various mouse events to change style when different events occur
      layer.on({
        // On mouse over, make the feature (neighborhood) more visible
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // Set the features style back to the way it was
        mouseout: function(event) {
          geoJson.resetStyle(event.target);
        },
        // When a feature (neighborhood) is clicked, fit that feature to the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information about that specific feature
      layer.bindPopup("<h3>Country: " + data.features.properties.ADMIN[0] + "</h3>");
    }
  }).addTo(myMap);
});
