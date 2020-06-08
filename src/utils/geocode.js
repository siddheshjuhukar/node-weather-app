const request = require('request')

const geocode = ( location, callback ) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic2lkZGhlc2hqdWh1a2FyIiwiYSI6ImNrYWs3cGJmNjBseHoycmw2dW9lZzB2NnUifQ.NFp7HWtm0pTuC3AMHzVvgA'

    request( { url: url, json: true }, ( error, response ) => {
        if( error ){
            callback( 'Unable to access location services', undefined )
        } else if ( response.body.features.length === 0 ) {
            callback( 'Unable to find location. Try another keyword', undefined )
        } else {
            location = response.body.features[0].place_name
            longitude = response.body.features[0].center[0]
            latitude = response.body.features[0].center[1]
            callback( undefined, {
                location,
                latitude,
                longitude
            } )
        }
    })
}

module.exports = geocode