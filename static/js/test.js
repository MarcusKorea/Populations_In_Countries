var link = "https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson"
// Grabbing our GeoJSON data..
var link2 = "../../Data/clean_populations.json";


// read populations data
d3.json(link).then(function(data) {
    d3.json(link2).then(function(population) {
        var population = population;

        var filter = d3.select("#filter-btn")
        
        filter.on("click",runEnter);

        //filters the data
        function filterData(inputValue){
                
            var filteredData = population.filter(row => row.Time == inputValue);
        
            // console.log(filteredData);

            return filteredData;
        }
        
        // Create the metadata table
        function metadata(inputValue){
      
            // select where the data will be displayed
            var box = d3.select("#sample-metadata");
            
            Object.entries(inputValue[0]).forEach(([key,value]) => {
                box.append("h6").text(`${key}: ${value}`);
            });
    
        }
        
        // Create the graph
        function buildGraph(inputValue) {
            //var populations = inputValue.slice(4,7);
            var result = inputValue[0];
            var male = result.PopMale;
            var female = result.PopFemale;
            var total = result.PopTotal;
            console.log(result);
            console.log(male);
            console.log(female);
            console.log(total);

        
            var barData = [
              {
                y: [male,female,total],
                x: ["Male","Female","Total"],
                text: ["Male","Female","Total"],
                type: "bar",
                // orientation: "h"
              }
            ];
  
            var barLayout = {
              title: "Population Breakdown",
              yaxis: {title: "Population (x1000)"}
            };

            Plotly.newPlot("graph",barData,barLayout);
        };

        // Function to create graph when go button is clicked
        function runEnter(){
            // Prevent the page from refreshing
            d3.event.preventDefault();
            
            // Select the input element and get the raw HTML node
            var inputElement = d3.select("#datetime");
        
            // Get the value property of the input element
            var inputValue = inputElement.property("value");

            var filtered = filterData(inputValue);

            filteredGraph(filtered);

            metadata(filtered);
        
            buildGraph(filtered);

        }


        // create map based off filter
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
                        fillColor: "lightgreen",
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
                    }),
                    this.openPopup();
                    this.closePopup();
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
                layer.on('mouseover', function (e) {
                    this.openPopup();
                });
                layer.on('mouseout', function (e) {
                    
                });
                        }
                    }).addTo(myMap);   
        }
    });
});

// Create an initialisation function that will specify the first year (2021) to populate 
// the web page on start-up.

// Initialisation function
function init() {
      const firstInputValue = 2021;
      console.log(filterData(firstInputValue));
      metadata(firstInputValue); 
      buildGraph(firstInputValue);
};
  
// Create the Option Change function that will trigger the filteredGraph function, metadata funtion and buildGraph function when 
// a change occurs in the year input cell.
  
// Year Input Change function
function optionChanged(newInputValue) {
  filteredGraph(newInputValue   );
  metadata(newInputValue);
  buildGraph(newInputValue);
};
  

// Initialise the dashboard
init();

