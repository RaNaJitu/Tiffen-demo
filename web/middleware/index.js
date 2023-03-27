const good = require('./good')
const swagger = require('./swagger')
const localization = require('./localization')

const auth = require('./auth')
const authScheme = require('./authScheme')

module.exports = [].concat(good, swagger, auth, authScheme, localization)
