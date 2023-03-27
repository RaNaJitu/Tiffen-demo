
const config = require('config')

const defaultLan = config.get('DEFAULT_LANGUAGE')
const languages = config.get('LANGUAGES')

const options = {
  locales: languages.split(','),
  directory: './locales',
  languageHeaderField: 'language',
  defaultLocale: defaultLan,
  objectNotation: true,
  syncFiles: true
}
module.exports = {
  plugin: require('hapi-i18n'),
  options
}
