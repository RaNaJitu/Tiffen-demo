const get = require('./get')
const post = require('./post')

module.exports = [].concat(
    get,
    post
)