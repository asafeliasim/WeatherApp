const request = require('request')

forecast = (lat,lon,callback)=>{
    const forecastUrl = "https://api.darksky.net/forecast/c8aebf6617736abd495f969cec91bd74/" + lat+","+lon +"?units=si";
    request({url:forecastUrl,json: true},(err,{body})=>{
        if(err){
            callback("Unable to connect to server",undefined)
        }else if(body.error){
            callback('Unable to find the location forecast',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +" "+ "It's is currently"+" "+body.currently.temperature
                +" "+ "degrees out."+" "+"There is a"+" "+body.currently.precipProbability+"%"+" "+"for rain.");
        }
    })
}

module.exports = forecast