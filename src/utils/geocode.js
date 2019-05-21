const request = require('request')

const geocode = (address, callback) => {
    
    var encodeAddress = encodeURIComponent(address);

    request({ 
        url:`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeAddress}.json?access_token=pk.eyJ1IjoiYW5nZWxvZnJpa2kiLCJhIjoiY2p2dzgydGU0MGprZjN6bnVlY2pyOHIyOSJ9.DDwocK5KH0U7N1xVOnQQ4w&limit=1`,
        json: true 
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode