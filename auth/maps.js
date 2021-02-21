//for rest requests
const axios = require('axios').default;
const apikey = require('./auth.json').maps_key;

var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";



//gets a place id from an address
async function getPlaceId(address)
{
    var id;
    var requestBody = 
    {
        params:
        {
            address:address,
            key:apikey
        }
    };


    await axios.get(baseUrl,requestBody)
        .then(resp =>{
            id = resp.data.results[0].place_id;
        })
        .catch(err =>{
            id = err;
        });
    
    return id;

}

//gets the full address from the place id
async function decomposePlaceId(placeid)
{
    var address;
    var requestBody = 
    {
        params:
        {
            place_id:placeid,
            key:apikey
        }
    };

    await axios.get(baseUrl,requestBody)
        .then(resp =>{
            address = resp.data.results[0].formatted_address;
        })
        .catch(err =>{
            address = err;
        });
    return address;
}



getPlaceId("10458 red rose lane san diego, california 92127").then(resp => console.log(resp));
decomposePlaceId("ChIJS7Uk8uT224ARBcCU3FbsJZc").then(resp => console.log(resp));

