const get = require('./get')
const post = require('./post')
const patch = require('./patch')
const deleteCategory = require('./delete')

module.exports = [].concat(
    get,
    post,
    deleteCategory,
    patch,
)
