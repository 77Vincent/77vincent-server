const express = require('express')

const store = require('../src/store')
const { LINK_BACK } = require('../src/consts')
const { initialNavigation } = require('../src/store')
const { getPosts, generateAnchors, formatDate } = require('../services')

const app = express()

app.get('/', (req, res) => {
  const page = req.query.page || 1
  const { type, search } = req.query
  store.posts = getPosts(page, type, search)
  store.navigation = initialNavigation

  res.render('Posts', store)
})

app.get('/search', (req, res) => {
  store.posts = getPosts(1, null, req.query.content)
  store.navigation = initialNavigation

  return res.render('Posts', store)
})

app.get('/write', (req, res) => {
  console.log(1)
  return res.render('Write', store)
})

app.get('/write/:id', (req, res) => {
  store.post = JSON.parse(store.bufferPosts.toString()).filter(item => String(item.id) === req.params.id)[0]
  if (!store.post) {
    store.navigation = initialNavigation
    return res.render('404', store)
  }
  return res.render('Write', store)
})

app.get('/posts/:id', (req, res) => {
  store.post = JSON.parse(store.bufferPosts.toString()).filter(item => String(item.id) === req.params.id)[0]
  if (!store.post) {
    store.navigation = initialNavigation
    return res.render('404', store)
  }
  store.post.updated_at = formatDate(store.post.updated_at)
  store.navigation = generateAnchors(store.post.body).concat([LINK_BACK])

  return res.render('Post', store)
})

app.get('*', (req, res) => {
  store.navigation = initialNavigation
  return res.render('404', store)
})

module.exports = app
