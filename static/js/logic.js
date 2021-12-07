var link = "https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson"
// Grabbing our GeoJSON data..
var link2 = "../../Data/clean_populations.json";
// read populations data
d3.json(link).then(function(data) {
    d3.json(link2).then(function(population) {
        var population = population;

        var filter = d3.select("#filter-btn")
        
        filter.on("click",runEnter);

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
            return "white";
            }
        }

        function filterData(inputValue){
                
            var filteredData = population.filter(row => row.Time == inputValue);
        
            console.log(filteredData);

            return filteredData;
        }
        function runEnter(){
            // Prevent the page from refreshing
            d3.event.preventDefault();
            
            // Select the input element and get the raw HTML node
            var inputElement = d3.select("#datetime");
        
            // Get the value property of the input element
            var inputValue = inputElement.property("value");

            var filtered = filterData(inputValue);

            filteredGraph(filtered);
        }


        // create graph based off filter
        function filteredGraph(filteredData){
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
                // Creating a geoJSON layer with the retrieved data
            geoJson = L.geoJson(data, {
                // Style for each feature (in this case a country)
                style: function(feature) {
                return {
                    color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                    fillColor: chooseColor(filteredData.PopTotal),
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
                layer.bindPopup("<h3>Country: " + feature.properties.ADMIN +"</h3>");
                }
            }).addTo(myMap);

            filteredGraph()
        }
    });
});
