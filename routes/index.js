const express = require('express')

const store = require('../store')
const { initialNavigation } = require('../store')
const { getPosts, generateAnchors, formatDate } = require('../services')

const app = express()

app.get('/', (req, res) => {
  const page = req.query.page || 1
  const { type, search } = req.query
  store.posts = getPosts(page, type, search)
  store.navigation = initialNavigation

  res.render('index', store)
})

app.get('/search', (req, res) => {
  store.posts = getPosts(1, null, req.query.content)
  store.navigation = initialNavigation

  res.render('index', store)
})

app.get('/posts/:id', (req, res) => {
  store.post = JSON.parse(store.bufferPosts.toString()).filter(item => String(item.id) === req.params.id)[0]
  store.post.updated_at = formatDate(store.post.updated_at)
  store.navigation = generateAnchors(store.post.body)

  res.render('Post', store)
})

app.get('/about', (req, res) => {

  res.render('About', store)
})

app.get('*', (req, res) => {
  res.render('404', store)
})

module.exports = app
