const express = require('express')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const { PORT } = require('./src/consts')
const { fetchData } = require('./services')
const routes = require('./routes')

const app = express()
const MAX_AGE_STATIC = 24 * 60 * 60 * 1000

app.use(compression())
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
