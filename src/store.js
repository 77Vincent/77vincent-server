const fs = require('fs')

const initialNavigation = []

const store = {
  bufferPosts: fs.readFileSync('./data/posts.json'),
  posts: [],
  post: {},
  navigation: initialNavigation,
}


module.exports = store

module.exports.initialNavigation = initialNavigation
