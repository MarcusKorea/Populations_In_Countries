var link = "https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson"
var link2 = "../../Data/clean_populations.json";

d3.json(link).then(function(data) {
    d3.json(link2).then(function(population) {
//filters the data by year
        function filterYear(inputValue){
                
            var filterByYear = population.filter(row => row.Time == inputValue);
        
            return filterByYear;
        }

        //filter the country
        function filterCountry(country,inputValue){

            var filteredYear = filterYear(inputValue);
        
            var filteredData = filteredYear.filter(row => row.Location == country);
        
            return filteredData;
        }

        // Function to create graph when go button is clicked
        function runEnter(){
            // Prevent the page from refreshing
            d3.event.preventDefault();
            
            // Select the input element and get the raw HTML node
            var inputElement = d3.select("#datetime");
        
            // Get the value property of the input element
            var inputValue = inputElement.property("value");

            var filteredByYear = filterYear(inputValue);

            var filteredByCountry = filterCountry("Australia",2015);

            console.log(filteredByCountry);

        }


        function optionChanged(newInputValue) {
            runEnter()
            // filteredGraph(newInputValue);
            // metadata(newInputValue);
            // buildGraph(newInputValue);
          };
        
    });
});