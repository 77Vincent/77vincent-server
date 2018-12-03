const fs = require('fs')
const wordsOfToday = require('./data/words')

const initialNavigation = [{
  title: 'Posts / 博客',
  link: '/posts',
}, {
  title: 'About Me / 关于我',
  link: '/about',
}]

const store = {
  bufferPosts: fs.readFileSync('./data/posts.json'),
  posts: [],
  post: {},
  navigation: initialNavigation,
  wordsOfToday,
}


module.exports = store

module.exports.initialNavigation = initialNavigation
