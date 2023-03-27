'use strict'
/**
 * This const requires the modules get model
 * @const
 * @requires module:get
 */
/** @global */
const headerValidator = require('../../../middleware/validator')
const deleteCategory = require('./delete')

module.exports = [
  {
    method: 'DELETE',
    path: '/category',
    handler: deleteCategory.handler,
    config: {
      tags: ['api', 'Categories'],
      description: 'Api for DELETE categories of food.',
      notes: 'This API allows DELETE categories by ID.',
      auth: 'admin',
      validate: {
        /** @memberof post */
        query: deleteCategory.validator,
        /** @memberof headerValidator */
        headers: headerValidator.headerAuthenticator,
        /** @memberof headerValidator */
        failAction: headerValidator.customError
      },
      response: deleteCategory.response
    },
  }
]
