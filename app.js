require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const routes = require('./routes/index')
// require('./utils/MC').connect()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

routes.forEach(route => {
  app.use(route.url, require(`./routes/${route.file}`))
})

module.exports = app
