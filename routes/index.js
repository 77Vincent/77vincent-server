const fs = require('fs')

const store = require('../store')
const { QUERY_LIMITS } = require('../consts')

function routePosts(req, res) {
  const page = req.query.page || 1

  let posts = JSON.parse(store.bufferPosts.toString()).map(post => ({
    id: post.id,
    comments: post.comments,
    updated_at: post.updated_at,
    title: post.title,
    labels: post.labels.map(label => ({
      id: label.id,
      color: label.color,
      name: label.name,
    })),
  }))
  posts = posts
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .filter(post => (req.query.type ? post.labels[0].name.toLowerCase() === req.query.type : true))
    .slice(QUERY_LIMITS * (page - 1), QUERY_LIMITS * page)

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
