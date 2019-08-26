const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const favicon = require('serve-favicon')
const path = require('path')

const { PORT } = require('./consts')
const { fetchData } = require('./services')
const routes = require('./routes')

const app = express()
const MAX_AGE_STATIC = 24 * 60 * 60 * 1000

app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.enable('trust proxy')

app.use(cors())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
}))
app.use(express.static('static', { maxAge: MAX_AGE_STATIC }))
app.use(routes)

app.set('views', './views')
app.set('view engine', 'pug')

setInterval(() => {
  fetchData()
}, 10 * 60 * 1000)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}, with ${process.env.NODE_ENV.toUpperCase()} mode.`)
})
