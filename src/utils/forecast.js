const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2be8253d497d9b29c8a293960b51fa35&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '%2074.0060&units=f'

    request( { url: url, json: true }, (error, response) => {
        if(error){
            callback( 'Unable to access weather services', undefined )
        } else if (response.body.error) {
            callback( 'Unable to find Location', undefined )
        } else {
            temperature = response.body.current.temperature
            weather = response.body.current.weather_descriptions
            precipitation = response.body.current.precip
            callback( undefined, {
                temperature,
                weather,precipitation
            })
        }
    })
}

module.exports = forecast