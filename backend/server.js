
const app = require('./app')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000
connectDB()

app.listen(PORT, () => console.log(`Server works at port: ${PORT}`))

