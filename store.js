const fs = require('fs')

const initialNavigation = [{
  title: 'Posts / 博客',
  link: '/',
}, {
  title: 'About Me / 关于我',
  link: '/about',
}]

const store = {
  bufferPosts: fs.readFileSync('./data/posts.json'),
  posts: [],
  post: {},
  navigation: initialNavigation,
}


module.exports = store

module.exports.initialNavigation = initialNavigation
