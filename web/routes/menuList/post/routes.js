'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
// const headerValidator = require('../../middleware/validator')
const post = require('./post')

module.exports = [
  {
    method: 'POST',
    path: '/menu',
    handler: post.handler,
    config: {
      tags: ['api', 'MenuList'],
      description: 'Api for Menu List.',
      notes: 'This API allows user to Menu List of the application.',
      auth: false,
      validate: {
        /** @memberof post */
        payload: post.validator,  
        /** @memberof headerValidator */
        // headers: headerValidator.languageValidator,
        /** @memberof headerValidator */
        // failAction: headerValidator.customError
      },
      response: post.response
    },
  }
]
