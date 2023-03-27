'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
// const headerValidator = require('../../middleware/validator')
const get = require('./get')

module.exports = [
  {
    method: 'GET',
    path: '/menu',
    handler: get.handler,
    config: {
      tags: ['api', 'Categories'],
      description: 'Api for categories.',
      notes: 'This API allows user to categories of the application.',
      auth: false,
      // validate: {
      //   /** @memberof post */
      //   // payload: get.validator,  
      //   /** @memberof headerValidator */
      //   // headers: headerValidator.languageValidator,
      //   /** @memberof headerValidator */
      //   // failAction: headerValidator.customError
      // },
      response: get.response
    },
  }
]
