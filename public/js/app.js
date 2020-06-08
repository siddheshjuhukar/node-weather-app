console.log('Client side javascript file is up and running');

const formElement = document.querySelector('form')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')
const messageThree = document.querySelector('#message3')
const messageFour = document.querySelector('#message4')
const messageFive = document.querySelector('#message5')

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = document.querySelector('input').value
    
    // if (!address) {
    //     return console.log('Please provide a address')
    // }
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'Error!'
            messageTwo.textContent = data.error;
            return console.log(data.error)
        }

        messageOne.textContent = data.location
        messageTwo.textContent = 'Weather: ' + data.weather + ' Temperature: ' + data.temperature + '°C' + ' Feels like: ' + data.feelslike + '°C'
        messageThree.textContent = 'Wind speed: ' + data.wind_speed + 'kmph' + ' Wind direction: ' + data.wind_dir + ' Pressure: ' + data.pressure + 'millibar'
        messageFour.textContent = 'Precipitation: ' + data.precipitation + '%' + ' Humidity: ' + data.humidity + 'millimeters'
        messageFive.textContent = 'UV index: ' + data.uv_index + ' Visibility: ' + data.visibility + 'km'
        console.log(data)
        })
    })
})