const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const { PORT } = require('./consts')
const store = require('./store')
const { fetchData, getPosts } = require('./services')
const { routePost, routePosts, routeAbout } = require('./routes')

const app = express()

app.enable('trust proxy')

app.use(cors())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
}))

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  const page = req.query.page || 1
  const { type, search } = req.query
  store.posts = getPosts(page, type, search)

  res.render('index', store)
})

// RESTful api
app.get('/api/posts', routePosts)
app.get('/api/posts/:id', routePost)
app.get('/api/about', routeAbout)

setInterval(() => {
  fetchData()
}, 15 * 60 * 1000)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
