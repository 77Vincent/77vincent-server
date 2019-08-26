const fs = require('fs')
const wordsOfToday = require('./data/words')

const initialNavigation = []

const store = {
  bufferPosts: fs.readFileSync('./data/posts.json'),
  posts: [],
  post: {},
  navigation: initialNavigation, 
  wordsOfToday,
}


module.exports = store

module.exports.initialNavigation = initialNavigation
