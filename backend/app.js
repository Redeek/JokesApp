const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())

//enable processing json
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//use routes of jokes
app.use('/api/jokes', require('./routes/jokesRoutes'))

module.exports = app

