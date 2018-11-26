const fetch = require('cross-fetch')
const express = require('express')
const fs = require('fs')

const port = 3001

const postsAPI = 'https://api.github.com/repos/77Vincent/blog/issues'

const app = express()

const fetchData = () => {
  fetch(postsAPI)
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
  const posts = JSON.parse(fs.readFileSync('./data/posts.json')).map(post => ({
    id: post.id,
    comments: post.comments,
    updated_at: post.updated_at,
    title: post.title,
  }))
  posts.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

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
