const express = require('express')
const cors = require('cors')

const { PORT } = require('./consts')
const { fetchData } = require('./services')
const { routePost, routePosts, routeAbout } = require('./routes')

const app = express()

app.use(cors())

app.get('/api/posts', routePosts)
app.get('/api/posts/:id', routePost)
app.get('/api/about', routeAbout)

setInterval(() => {
  fetchData()
}, 1000 * 60 * 15)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
