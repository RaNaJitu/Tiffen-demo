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
    path: '/login',
    handler: post.handler,
    config: {
      tags: ['api', 'Login'],
      description: 'Api for Login.',
      notes: 'This API allows Login.',
      auth: false,
      validate: {
        /** @memberof post */
        payload: post.validator,
        /** @memberof headerValidator */
        // headers: headerValidator.languageValidator,
        /** @memberof headerValidator */
        failAction: headerValidator.customError
      },
      response: post.response
    },
  }
]
