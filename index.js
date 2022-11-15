const express = require('express')
const morgan = require('morgan') 
const bodyParser = require('body-parser') 
const cors = require('cors') 
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json({limit: "2mb"}))
app.use(cors())

app.use('/api', require("./routes/auth"))
app.use('/api', require("./routes/movie"))

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`[INFO] Api running on PORT ${port}`)
})