const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req,res) => {
    res.render('index', {
        title: 'My Weather app',
        name: 'Siddhesh'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Siddhesh'
    })
})

app.get( '/help', (req,res) => {
    res.render('help', {
        title: 'Help section',
        help: 'This is the help section',
        name: 'Siddhesh'
    })
})

app.get( '/weather', (req,res) => {
    if( !req.query.address ){
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geocode( req.query.address, ( error, { location, latitude, longitude } = {} ) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast( latitude, longitude, ( error, { temperature, weather, precipitation } = {} ) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                weather,
                temperature,
                precipitation
            })
        } )
    })
})

app.get('/help/*', (req,res) => {
    res.render('help404',{
        name: 'Siddhesh'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        name: 'Siddhesh'
    })
})

app.listen(3000, () => {
    console.log('Server up and running on port 3000')
})