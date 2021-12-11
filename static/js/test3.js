var link = "https://s3.amazonaws.com/rawstore.datahub.io/23f420f929e0e09c39d916b8aaa166fb.geojson";

d3.json(link).then(function(data) {
//filter the country
        function filterCountry(country,inputValue){
          // var filteredYear = filterData(inputValue);

          var filteredData = data.filter(row => row.Location == country);
      
          // console.log(filteredData);

          return filteredData;
      }
      var test = filterCountry(data);
      console.log(test);

});