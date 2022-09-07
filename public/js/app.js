console.log('client side js fiel os load')

fetch('http://localhost:3000/weather?address=!').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      return console.log(data)
    }
    console.log(data.location)
    console.log(data.forecast)
  })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From javascipt'

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const location = search.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  weatherApi(location)
})

const weatherApi = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = ''
        return messageTwo.textContent = data.error
      }
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    })
  })
} 