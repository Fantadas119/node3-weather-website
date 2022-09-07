const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=a1864f24193a2208530474c93f783df3&query=${latitude},${longitude}&unit=m`

  request({ url, json: true}, (error, { body } = {}) => {

    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location, Try another search.', undefined)
    } else {
      const {weather_descriptions, temperature, feelslike} = body.current

      callback(undefined, `Está ${weather_descriptions} em ${body.location.region}, com uma temperatura de ${temperature} ºC e uma sensacao de ${feelslike} ºC`)
    }
  })
}

module.exports = forecast