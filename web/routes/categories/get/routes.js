'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
// const headerValidator = require('../../middleware/validator')
const get = require('./get')
const i18n = require('../../../../locales/locales')
const headerValidator = require('../../../middleware/validator')

module.exports = [
  {
    method: 'GET',
    path: '/categories',
    handler: get.handler,
    config: {
      tags: ['api', 'Categories'],
      description: 'Api for get all categories of food.',
      notes: 'This API allows get all categories of the food.',
      auth: 'superAdmin',
      // auth: false,
      validate: {
        /** @memberof post */
        query: get.validator,  
        /** @memberof headerValidator */
        // headers: headerValidator.languageValidator,
        /** @memberof headerValidator */
        failAction: headerValidator.customError
      },
      response: get.response
    },
  }
]
