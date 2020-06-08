const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2be8253d497d9b29c8a293960b51fa35&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request( { url: url, json: true }, (error, response) => {
        if(error){
            callback( 'Unable to access weather services', undefined )
        } else if (response.body.error) {
            callback( 'Unable to find Location', undefined )
        } else {
            temperature = response.body.current.temperature
            weather = response.body.current.weather_descriptions
            precipitation = response.body.current.precip
            wind_speed = response.body.current.wind_speed
            wind_dir = response.body.current.wind_dir
            pressure = response.body.current.pressure
            humidity = response.body.current.humidity
            feelslike = response.body.current.feelslike
            uv_index = response.body.current.uv_index
            visibility = response.body.current.visibility
            callback( undefined, {
                temperature,
                weather,
                precipitation,
                wind_speed,
                wind_dir,
                pressure,
                humidity,
                feelslike,
                uv_index,
                visibility
            })
        }
    })
}

module.exports = forecast