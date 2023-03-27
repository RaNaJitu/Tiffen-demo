'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
const headerValidator = require('../../../middleware/validator')
const post = require('./post')

module.exports = [
  {
    method: 'POST',
    path: '/category',
    handler: post.handler,
    config: {
      tags: ['api', 'Categories'],
      description: 'Api for post categories of food.',
      notes: 'This API allows add categories details.',
      auth: 'admin',
      validate: {
        /** @memberof post */
        payload: post.validator,
        /** @memberof headerValidator */
        headers: headerValidator.headerAuthValidator,
        /** @memberof headerValidator */
        failAction: headerValidator.customError
      },
      response: post.response
    },
  }
]
