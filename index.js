const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const { PORT } = require('./consts')
const store = require('./store')
const { initialNavigation } = require('./store')
const {
  fetchData,
  getPosts,
  generateAnchors,
  formatDate,
} = require('./services')

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
  store.navigation = initialNavigation

  res.render('index', store)
})

app.get('/posts/:id', (req, res) => {
  store.post = JSON.parse(store.bufferPosts.toString()).filter(item => String(item.id) === req.params.id)[0]
  store.post.updated_at = formatDate(store.post.updated_at)
  store.navigation = generateAnchors(store.post.body)

  res.render('Post', store)
})

setInterval(() => {
  fetchData()
}, 15 * 60 * 1000)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
