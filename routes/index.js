const fs = require('fs')

const store = require('../store')
const { getPosts } = require('../services')

function routePosts(req, res) {
  const page = req.query.page || 1
  const { type, search } = req.query

  const posts = getPosts(page, type, search)
  res.json(posts)
}

function routePost(req, res) {
  const post = JSON.parse(store.bufferPosts.toString()).filter(item => String(item.id) === req.params.id)[0]
  res.json(post)
}

function routeAbout(req, res) {
  const data = fs.readFileSync('./data/about.md', 'utf8')
  res.send(data)
}

module.exports = {
  routePosts,
  routePost,
  routeAbout,
}
