const request= require('request')

const geocode= (address,callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)
        + ".json?access_token=pk.eyJ1IjoiYXNhZmVsaWFzaW0iLCJhIjoiY2szbmV6bjN2MDlodzNkbzZxMm5hMXdzMyJ9.8N4XyIX5y-SyphxY8DJTBw";

    request({url, json: true},(err,res)=>{
        if(err){
            callback('Unable to connect to the server', undefined)
        }else if(res.body.features.length=== 0){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,{
                latitude: res.body.features[0].center[0],
                longitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode