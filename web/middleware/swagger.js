// this plugin use for generate documentations
const config = require('config')
const options = {
  grouping: 'tags',
  // payloadType: 'form',
  schemes: ['http', 'https'],
  host: config.get('SWAGGER_HOST'),
  cors: true,
  debug: true,
  // basePath: "/v1",
  swaggerUIPath: `${config.get('VERSION')}/swaggerui`,
  jsonPath: `${config.get('VERSION')}/swagger.json`,
  documentationPath: `${config.get('VERSION')}/doc`,
  // expanded: "full",
  info: {
    title: config.get('API_TITLE'),
    version: config.get('API_VERSION'),
    contact: {
      name: config.get('API_AUTHOR'),
      email: config.get('API_EMAIL_AUTHOR')
    }
  }
}

module.exports = {
  plugin: require('hapi-swagger'),
  options
}
