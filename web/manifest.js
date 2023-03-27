const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
const config = require('config')
const routes = require('./routes')
const middleware = require('./middleware')

// define all plugin here

const PORT = config.get('SERVER_PORT')

module.exports = {
  server: {
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['authorization', 'language', 'currencysymbol', 'currencycode', 'platform']
      },
      // validate: {
      //   failAction: customError
      // }
    }
  },
  register: {
    plugins: [inert, vision, ...middleware, {
      plugin: routes,
      routes: {
        prefix: config.get('VERSION') // version 1 routes
      }
    }]
  }
}
