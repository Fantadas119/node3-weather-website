const path = require('path')
const express = require('express')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicStaticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and viewa lacatiopn
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicStaticPath))

app.get('', (request, response) => {
  response.render('index', {
    title: "Weather",
    name: "Edir"
  })
})
app.get('/about', (request, response) => {
  response.render('about', {
    title: "About",
    name: "Edir"
  })
})

app.get('/help', (request, response) => {
  response.render('help', {
    title: "Help",
    question1: "Qual os teus hobbies?",
    name: "Edir"
  })
})

app.get('/weather', (request, response) => {
  const address = request.query.address
  if (!address) {
    return response.send({
      error: "Por favor insira um endereço!"
    })
  }
  console.log(address)
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return response.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        response.send({ error })
      }
      return response.send({
        forecast: forecastData,
        location: location,
        address: address
      })
    })
  })
})


app.get('/products', (request, response) => {
  if (!request.query.search) {
    return response.send({
      error: "Errororrrrrrrrrrr"
    })
  }
  response.send({
    products: []
  })
})

app.get('/help/*', (request, response) => {
  response.render('404', {
    title: "404 Help",
    name: "Edir",
    errorMessage: "Help article not found"
  })
})
app.get('*', (request, response) => {
  response.render('404', {
    title: "404",
    name: "Edir",
    errorMessage: "Erro porra, dei erro"
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 300')
})