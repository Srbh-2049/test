const request = require('request')
const geocode=require('./geocode');

const forecast = (latitude, longitude, callback) => {
    const url=`http://api.weatherstack.com/current?access_key=76674d118126d91419cb1714f063111a&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, resp) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (resp.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                Location:resp.body.location.name,
                Country:resp.body.location.country,
                Temperature:resp.body.current.temperature,
                Feels_Like:resp.body.current.feelslike
            }) }
    })
}

module.exports=forecast;
