'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
const headerValidator = require('../../middleware/validator')
const post = require('./post')

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: post.handler,
    config: {
      tags: ['api', 'Signup'],
      description: 'Api for add the user details.',
      notes: 'This API allows add user .',
      // auth: 'admin',
      auth: false,
      validate: {
        /** @memberof post */
        payload: post.validator,
        /** @memberof headerValidator */
        // headers: headerValidator.headerAuthValidator,
        /** @memberof headerValidator */
        failAction: headerValidator.customError
      },
      response: post.response
    },
  }
]
