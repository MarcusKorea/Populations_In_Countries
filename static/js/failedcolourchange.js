        // Function that will determine the color of a country based on its population
        function chooseColor(totalPopulation) {
            switch (true) {
                case totalPopulation > 50000  :
                return "darkred";
                case totalPopulation > 40000:
                return "red";
                case totalPopulation > 30000:
                return "orange";
                case totalPopulation > 20000:
                return "gold";
                case totalPopulation > 10000:
                return "yellow";
                default:
                return "white";
                }
        }

if(pos == 169){
    return //{color:"white"};
}
else{
    var a = filteredData[pos].Location
    console.log(a);
    var b = filteredData[pos].PopTotal
    // console.log(chooseColor(b));
    // console.log("Step number");
    // console.log(pos);
    // console.log("next number");
    // console.log(pos+1)
    pos += 1    
        if(feature.properties.ADMIN == filteredData[0].Location){
            return {
                color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillColor: chooseColor(filteredData[0].PopTotal),
                fillOpacity: 0.5,
                weight: 1.5
            };
        }
        else{
            console.log(a)
                console.log(feature.properties.ADMIN)
            return {
                
                color: "white",
                    // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                fillOpacity: 0,
                weight: 1.5
            };
        }

    