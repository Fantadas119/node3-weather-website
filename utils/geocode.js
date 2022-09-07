const request = require('request')

const geocode = (city, callback) => {
  const geocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZWRpcjExOSIsImEiOiJjanJ0c2hmdXowbzZuM3luODVlNHYzaDV0In0.1VvW_PegFOylpRRrB7n87g&limit=1`

  request({  url: geocoding, json: true}, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try another search.', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].text
      })
    }
  })
  /*const horde = 'https://dapp.horde.games/dashboard'
  request({  url: horde, json: true}, (error, { body } = {}) => {
    console.log(body)
  })*/
}

module.exports = geocode