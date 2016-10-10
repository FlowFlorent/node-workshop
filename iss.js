
var request = require('request');

function issPosition(){
    
    request("http://api.open-notify.org/iss-now.json", function(err, result){
        if (err){
            console.log(err);
        }
        else {
            var actualValue = JSON.parse(result.body);
            console.log("The ISS position is: "+ actualValue.iss_position.longitude.toFixed(2) + " longitude, " + actualValue.iss_position.latitude.toFixed(2) + " latitude");
        }
    })
}

issPosition();

