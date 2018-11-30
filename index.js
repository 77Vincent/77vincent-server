const fetch = require('cross-fetch')
const express = require('express')
const cors = require('cors')
const fs = require('fs')

const { API_POSTS, PORT } = require('./consts')
const store = require('./store')

const { routePost, routePosts, routeAbout } = require('./routes')

const app = express()

const fetchData = () => {
  fetch(API_POSTS)
    .then(res => res.json())
    .then((data) => {
      const dataStr = JSON.stringify(data)
      store.bufferPosts = Buffer.from(dataStr)
      fs.writeFileSync('./data/posts.json', dataStr)
      console.log('Data is sync')
    })
    .catch(err => console.error(err))
}

setInterval(() => {
  fetchData()
}, 1000 * 60 * 15)

app.use(cors())

app.get('/api/posts', routePosts)
app.get('/api/posts/:id', routePost)
app.get('/api/about', routeAbout)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
