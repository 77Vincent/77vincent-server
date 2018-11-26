const fetch = require('cross-fetch')
const express = require('express')
const fs = require('fs')

const port = 3001

const API_POSTS = 'https://api.github.com/repos/77Vincent/blog/issues'
const QUERY_LIMITS = 15

const app = express()

const fetchData = () => {
  fetch(API_POSTS)
    .then((respond) => {
      respond.json()
    })
    .then((data) => {
      fs.writeFileSync('./data/posts.json', JSON.stringify(data))
      console.log('Data is sync')
    })
    .catch(err => console.error(err))
}

setInterval(() => {
  fetchData()
}, 1000 * 60 * 10)

app.get('/api/posts', (req, res) => {
  const page = req.query.page || 1

  let posts = JSON.parse(fs.readFileSync('./data/posts.json')).map(post => ({
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
})

app.get('/api/posts/:id', (req, res) => {
  const post = JSON.parse(fs.readFileSync('./data/posts.json')).filter(item => String(item.id) === req.params.id)[0]
  res.json(post)
})

app.get('/api/about', (req, res) => {
  const data = fs.readFileSync('./data/about.md', 'utf8')
  res.send(data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
