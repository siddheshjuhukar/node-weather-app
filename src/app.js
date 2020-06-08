const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req,res) => {
    res.render('index', {
        title: 'My Weather App',
        name: 'Siddhesh Juhukar'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Siddhesh Juhukar',
        desc: 'I am a graduate student at Northeastern University with a major in Computer Software Engineering. Open to opportunities as a Full Stack developer, Front-End developer or UX designer.'
    })
})

app.get( '/help', (req,res) => {
    res.render('help', {
        title: 'Help section',
        help: 'Thank you for using my weather app. This Sample was created by using node js and uses data from weatherstack.com. This is a basic free version. Stay tuned for more updates.',
        name: 'Siddhesh Juhukar'
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

        forecast( latitude, longitude, ( error, { temperature, weather, precipitation, wind_speed, wind_dir, pressure, humidity, feelslike, uv_index, visibility } = {} ) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                weather,
                temperature,
                precipitation,
                wind_speed,
                wind_dir,
                pressure,
                humidity,
                feelslike,
                uv_index,
                visibility
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

app.listen(port, () => {
    console.log('Server up and running on port 3000')
})