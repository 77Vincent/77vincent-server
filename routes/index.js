const express = require('express')

const store = require('../store')
const { initialNavigation } = require('../store')
const { getPosts, generateAnchors, formatDate } = require('../services')

const app = express()

app.get('/', (req, res) => {
  store.navigation = initialNavigation
  res.render('Welcome', store)
})

app.get('/posts', (req, res) => {
  const page = req.query.page || 1
  const { type, search } = req.query
  store.posts = getPosts(page, type, search)
  store.navigation = initialNavigation

  res.render('Posts', store)
})

app.get('/search', (req, res) => {
  store.posts = getPosts(1, null, req.query.content)
  store.navigation = initialNavigation

  res.render('Posts', store)
})

app.get('/posts/:id', (req, res) => {
  store.post = JSON.parse(store.bufferPosts.toString()).filter(item => String(item.id) === req.params.id)[0]
  if (!store.post) {
    return res.render('404', store)
  }
  store.post.updated_at = formatDate(store.post.updated_at)
  store.navigation = generateAnchors(store.post.body).concat([{
    title: 'Back / 返回',
    link: '/posts',
  }])

  return res.render('Post', store)
})

app.get('/about', (req, res) => {
  res.render('About', store)
})

app.get('*', (req, res) => {
  res.render('404', store)
})

module.exports = app
