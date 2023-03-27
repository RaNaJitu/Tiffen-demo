
// const Promise = require('bluebird');
const joi = require('@hapi/joi')
const convert = require('joi-to-json-schema')
const rp = require('request-promise')
const config = require('config')
const jwt = require('jsonwebtoken')


const internals = {}
exports.plugin = {
  name: 'authorization',
  version: '1.0.0',
  async register(server) { // , options) {
    server.auth.scheme('pass', internals.implementation) // hapijs.com/api#serverauthapi
    // add routing swagger json
    // server.route([
    //   {
    //     method: 'GET',
    //     path: `${config.get('VERSION')}/krakend.json`,
    //     options: {
    //       auth: false,
    //       handler: async (request, h) => {
    //         const routes = request.server.table()
    //         const krakendData = []
    //         routes.forEach((route) => {
    //           const query = route.settings.validate.query !== null ? convert(route.settings.validate.query) : []
    //           const headers = route.settings.validate.headers !== null ? convert(route.settings.validate.headers) : []
    //           if (headers.properties) {
    //             headers.properties = {
    //               ...headers.properties,
    //               'Content-Length': ''
    //             }
    //           }
    //           if (typeof route.settings.tags !== 'undefined' && route.settings.tags !== null && route.settings.tags.indexOf('api') !== -1) {
    //             krakendData.push({
    //               endpoint: route.path,
    //               method: route.method.toUpperCase(),
    //               querystring_params: query.properties ? Object.keys(query.properties) : [],
    //               headers_to_pass: headers.properties ? Object.keys(headers.properties) : [],
    //               backend: [
    //                 {
    //                   url_pattern: route.path,
    //                   encoding: 'no-op',
    //                   host: [
    //                     config.get('APP_IP') || ''
    //                   ],
    //                   extra_config: {
    //                     auth: (route.settings.auth) ? route.settings.auth.strategies : false,
    //                     'github.com/devopsfaith/krakend-ratelimit/juju/proxy': {
    //                       maxRate: 0,
    //                       capacity: 0,
    //                       strategy: 'ip'
    //                     }
    //                   }
    //                 }
    //               ],
    //               output_encoding: 'no-op'
    //             })
    //           }
    //         })
    //         return h.response({ endpoints: krakendData }).code(200)
    //       }
    //     }
    //   }
    // ])
  }
}

/**
 * implementation is the "main" interface to the plugin and contains all the
 * "implementation details" (methods) such as authenticate, response & raiseError
 * @param {Object} server - the Hapi.js server object we are attaching the
 * the hapi-auth-jwt2 plugin to.
 * @param {Object} options - any configuration options passed in.
 * @returns {Function} authenticate - we return the authenticate method after
 * registering the plugin as that's the method that gets called for each route.
 */
internals.implementation = () => ({
  /**
   * authenticate is the "work horse" of the plugin. it's the method that gets
   * called every time a route is requested and needs to validate/verify a JWT
   * @param {Object} request - the standard route handler request object
   * @param {Object} reply - the standard hapi reply interface
   * @returns {Boolean} if the JWT is valid we return a credentials object
   * otherwise throw an error to inform the app & client of unauthorized req.
   */
  async authenticate(req, h) {

      
      let token = {}
      const unAuth = { message: 'Unauthorised' }
      console.log('req.headers.authorization============>>', req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
      console.log('token=====>', token)
  }
  let tokenData = {}
    try {
      
    if (token === '') {
      return h.response(unAuth).code(401).takeover()
    }
      // tokenData = JSON.parse(token)
      tokenData = jwt.verify(token, config.get('SECRET_ACCESS_KEY'))
    } catch (e) {
      console.log('========authenticate ERROR======', e)
      return h.response(unAuth).code(401).takeover()
    }
    const credentials = {
      userId: tokenData.userId,
      sub: tokenData.userType,
      metaData: tokenData.metaData
    }

    console.log('===credentials===', credentials)
    return h.authenticated({
      credentials,
      artifacts: token
    })
  },
  /**
   * response is an Optional method called if an options.responseFunc is set.
   * @param {Object} request - the standard route handler request object
   * @param {Object} reply - the standard hapi reply interface ...
   * after we run the custom options.responseFunc we reply.continue to execute
   * the next plugin in the list.
   * @returns {Boolean} true. always return true (unless there's an error...)
   */
  response(req, h) {
    return h.continue
  }
})

const genTokenSchema = joi.object({
  userId: joi.string().required(),
  userType: joi.string().required(),
  // multiLogin: joi.string().allow(['true', 'false']).required(),
  allowedMax: joi.string().optional(),
  // immediateRevoke: joi.string().allow(['true', 'false']).required(),
  metaData: joi.object().required(),
  accessTTL: joi.string().optional(),
  refreshTTL: joi.string().optional()
}).unknown().required()
// {
// userId: '1',
// userType: 'admin',
// multiLogin: 'true',
// AllowedMax: '5', // optional
// immediateRevoke: 'false',
// metaData: {}, // if you want to store any other info of the user
// accessTTL: '48h', // optional
// refreshTTL: '180h', // optional
// }
/** generateTokens - create a new refresh and access token for user
 * @param {Object} user - user data
 * @param {String} user.userId - user id
 * @param {String} user.userType - type of the user
 * @param {String} user.multiLogin - multi login allowed or not - true, false
 * @param {String} user.allowedMax Optional - maximum allowed logins if multi login is true
 * @param {String} user.immediateRevoke - immediate revoke on blacklisted - true, false
 * @param {Object} user.metaData - metadata if anything want to add in token
 * @param {String} user.accessTTL Optional - TTL for Access token ex. 1h, 1m, 1s,etc
 * @param {String} user.refreshTTL Optional - TTL for refresh token ex. 1h, 1m, 1s,etc
 */
exports.generateTokens = user => new Promise((resolve, reject) => {
  const { error, value } = joi.validate(user, genTokenSchema)
  if (error) {
    return reject(error)
  }
  console.log('==========value========>>', value.metaData)
  const accessToken = jwt.sign(
            value,
            config.get('SECRET_ACCESS_KEY'),
            { expiresIn: '3000s'}
        )
        // console.log('========accessToken=============>', accessToken)
            // return  h.response({token: accessToken }).code(200)

            resolve(accessToken)
  // .then(accessToken)
  // .then(data => {
  //   resolve(data)
  // })
  .catch(err => reject(err))
  // const options = {
  //   method: 'POST',
  //   url: config.get('AUTH_SERVER'),
  //   headers: {
  //     lan: 'en',
  //     'content-type': 'application/json'
  //   },
  //   body: value,
  //   json: true
  // }
  // rp(options)
  //   .then(body => {
  //     console.log('====generateTokens===body======', body.data)
  //     resolve(body.data)
  //   })
  //   .catch(err => reject(err))
})

const blockTokenSchema = joi.object({
  userId: joi.string().required(),
  userType: joi.string().required(),
  refreshToken: joi.string().required(),
  time: joi.string().optional()
}).unknown().required()
/** blockTokens - blacklisting refresh token
 * @param {Object} user - user data
 * @param {String} user.userId - user mongoid
 * @param {String} user.userType - type of the user
 * @param {String} user.refreshToken - refresh token for blacklist all for user *
 * @param {String} user.time Optional - TTL for blocking token ex. 1h, 1m, 1s,etc
 * @returns {object} success (unless there's an error...)
 */
exports.blockTokens = user => new Promise((resolve, reject) => {
  const { error, value } = joi.validate(user, blockTokenSchema)
  if (error) {
    return reject(error)
  }
  const options = {
    method: 'DELETE',
    url: config.get('AUTH_SERVER'),
    headers: {
      lan: 'en',
      'content-type': 'application/json'
    },
    body: value,
    json: true
  }
  rp(options)
    .then(body => {
      console.log('=====blockTokens==body======', body.data)
      resolve(body.data)
    })
    .catch(err => reject(err))
})

/**
 * @param {string} accessToken - access token
 * @param {string} refreshToken - refresh token
 * @returns {object} success (unless there's an error...)
 */
exports.refreshAuthToken = (accessToken, refreshToken) => new Promise((resolve, reject) => {
  const options = {
    method: 'GET',
    url: config.get('AUTH_SERVER'),
    headers: {
      lan: 'en',
      'content-type': 'application/json',
      authorization: accessToken,
      refreshtoken: refreshToken
    },
    json: true
  }
  rp(options)
    .then(body => resolve(body.data))
    .catch(err => reject(err))
})
