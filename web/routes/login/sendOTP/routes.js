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
    path: '/signIn',
    handler: post.handler,
    config: {
      tags: ['api', 'Login'],
      description: 'Api for signIn.',
      notes: 'This API allows user to sign in to the application, It allows you to sign in with facebook and google as well, if the registration is processed with the same ID.',
      // auth: false,
      // validate: {
      //   /** @memberof post */
      //   // payload: post.validator,
      //   /** @memberof headerValidator */
      //   // headers: headerValidator.languageValidator,
      //   /** @memberof headerValidator */
      //   failAction: headerValidator.customError
      // },
      // response: post.response
    },
  }
]
