const API_POSTS = 'https://api.github.com/repos/77Vincent/77vincent/issues'
const QUERY_LIMITS = 20
const PORT = process.env.PORT || 3000
const LINK_BACK = {
  title: 'Back / 返回',
  link: '/',
}

module.exports = {
  API_POSTS,
  LINK_BACK,
  QUERY_LIMITS,
  PORT,
}
