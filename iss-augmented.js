var prompt = require('prompt');
var request = require('request');

Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
}

function distanceBetweenPoints (lat1, lon1, lat2, lon2){
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();
    
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c; 
}


function getIssData(callback){

    request('http://api.open-notify.org/iss-now.json', function(err, result){
        if(err){
            console.log(err);
        }
        else {
            var issData = JSON.parse(result.body);
            console.log("issData = ", issData);
            callback(issData)
        }
    });
}

function getOwnPosition (callback){
    prompt.start();
    prompt.get('position', function(err, result){
        if (err){
            console.log(err);
        }
        else {  //get latitude & longitude
            var position = result.position;
            request('https://maps.googleapis.com/maps/api/geocode/json?address=' + position, function(err, result){
                if(err){
                    console.log(err);
                }
                else {
                    var googleData = JSON.parse(result.body);
                    console.log("Google data = ", googleData);
                    callback(googleData)
                }
            });
        }
    });
}

getIssData(function(issData) {
    getOwnPosition(function(ownPos){
        //console.log(issData.iss_position.latitude);
        //console.log(issData.iss_position.longitude);
        //console.log(ownPos.results[0].location.lat);
        //console.log(issData);
        //console.log(ownPos.results[0].geometry.location.lng);
        var distance = distanceBetweenPoints(issData.iss_position.latitude, issData.iss_position.longitude, ownPos.results[0].geometry.location.lat, ownPos.results[0].geometry.location.lng);
        console.log("Distance is: ",distance.toFixed(2));
    })
});
