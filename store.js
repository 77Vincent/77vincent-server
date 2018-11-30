const fs = require('fs')

const store = {
  bufferPosts: fs.readFileSync('./data/posts.json'),
}

module.exports = store
