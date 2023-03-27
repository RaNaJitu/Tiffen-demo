'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
// const headerValidator = require('../../middleware/validator')
const patch = require('./patch')
const headerValidator = require('../../../middleware/validator')

module.exports = [
  {
    method: 'PATCH',
    path: '/category',
    handler: patch.handler,
    config: {
      tags: ['api', 'Categories'],
      description: 'Api for update categories of food.',
      notes: 'This API allows update categories details.',
      auth: false,
      validate: {
        /** @memberof post */
        payload: patch.validator,
        /** @memberof headerValidator */
        // headers: headerValidator.languageValidator,
        /** @memberof headerValidator */
        failAction: headerValidator.customError
      },
      response: patch.response
    },
  }
]
