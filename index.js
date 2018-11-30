const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const { PORT } = require('./consts')
const { fetchData } = require('./services')
const { routePost, routePosts, routeAbout } = require('./routes')

const app = express()

app.enable('trust proxy')

app.use(cors())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
}))

app.get('/api/posts', routePosts)
app.get('/api/posts/:id', routePost)
app.get('/api/about', routeAbout)

setInterval(() => {
  fetchData()
}, 15 * 60 * 1000)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
