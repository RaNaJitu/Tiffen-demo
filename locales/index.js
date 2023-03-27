const config = require('config')

const defaultLan = config.get('DEFAULT_LANGUAGE')

module.exports = require(`./${defaultLan}.json`)
