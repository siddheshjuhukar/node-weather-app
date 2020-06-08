console.log('Client side javascript file is up and running');

const formElement = document.querySelector('form')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

formElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = document.querySelector('input').value
    
    // if (!address) {
    //     return console.log('Please provide a address')
    // }
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + address).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'Error!'
            messageTwo.textContent = data.error;
            return console.log(data.error)
        }

        messageOne.textContent = data.location
        messageTwo.textContent = 'Weather: ' + data.weather + ' Temperature: ' + data.temperature + ' Precipitation: ' + data.precipitation
        console.log(data)
        })
    })
})