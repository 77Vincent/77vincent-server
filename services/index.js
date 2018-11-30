const fetch = require('cross-fetch')
const fs = require('fs')

const { API_POSTS } = require('../consts')
const store = require('../store')

function fetchData() {
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

module.exports = { fetchData }
