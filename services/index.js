const fetch = require('cross-fetch')
const moment = require('moment')
const fs = require('fs')

const { API_POSTS, QUERY_LIMITS } = require('../consts')
const store = require('../store')

const rawPosts = JSON.parse(store.bufferPosts.toString())

function formatDate(date) {
  return moment(date).format('D/MM/YYYY')
}

function generateAnchors(post) {
  const matches = post.match(/##.*/g) || []

  return matches.map((item) => {
    if (item.indexOf('name=') !== -1) {
      const rawLink = item.split('=')[1].split('><')[0]
      return {
        title: item.split('a>')[1],
        link: `#${rawLink.slice(1, rawLink.length - 1)}`,
      }
    }
    return { title: null, link: '' }
  })
}

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

function getPosts(page = 1, type, search) {
  const searchContent = search && search.toLowerCase()

  let posts = rawPosts.map(post => ({
    id: post.id,
    comments: post.comments,
    updated_at: formatDate(post.updated_at),
    title: post.title,
    labels: post.labels.map(label => ({
      id: label.id,
      color: label.color,
      name: label.name,
    })),
  }))

  posts = searchContent
    ? rawPosts
      .filter(post => post.body
        .toLowerCase()
        .indexOf(searchContent) !== -1
        || post.title
          .toLowerCase()
          .indexOf(searchContent) !== -1)
    : posts
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .filter(post => (type ? post.labels[0].name.toLowerCase() === type : true))
      .slice(QUERY_LIMITS * (page - 1), QUERY_LIMITS * page)
  return posts
}

module.exports = {
  fetchData,
  getPosts,
  generateAnchors,
  formatDate,
}
