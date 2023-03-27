
'use strict'

/**
 * @global
 *
 */
// const Bcrypt = require('bcryptjs') // hashing module
const Joi = require('@hapi/joi')
/** @namespace */
const i18n = require('../../../../locales/locales')
/**
 * @namespace
*/

const { errorLogger, debugLogger } = require('../../../../utils/logger')

const category = require('../../../../models/categories')
const ObjectID = require('mongodb').ObjectID
// const error = require('../../../../locales')
const error = require('../../../../locales')


// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

const handler = async (req, h) => {
  try {
    const con = { status: req.query.status }
    const userId = req.auth.credentials.metaData.role
    console.log('=====userId======>>', userId)
    const categoryData = await category.getAll(con)
    console.log('categoryData========>>>', categoryData);
    
    // HERE WE ARE CHECKING CATEGORY DATA IS AVAILABLE OR NOT
    if(categoryData.length == 0) return h.response({ message: req.i18n.__('category.response.404') }).code(404)
    
    return h.response({ message: req.i18n.__('genericErrMsg.200'), data: categoryData }).code(200)
  } catch (error) {
    errorLogger.error('Error occurred during get category : ', error)
    return h.response({
      message: req.i18n.__('genericErrMsg.500')
    }).code(500)
  }
}

const validator = Joi.object().keys({
  status: Joi.string().required().description('status').example('Active')
})

const response = {
  status: {
    200: Joi.object({
      message: Joi.any().example(i18n.__('common.response.200')).description(i18n.__('common.responseDescription.200')),
      data: Joi.any()
    }).description(i18n.__('category.responseDescription.200')),
    404: Joi.object({
      message: Joi.any().example(i18n.__('common.response.404')).description(i18n.__('common.responseDescription.404'))
    }).description(i18n.__('category.responseDescription.404')),
    500: Joi.object({
      message: Joi.any().example(i18n.__('common.response.500')).description(i18n.__('common.responseDescription.500'))
    }).description(i18n.__('common.responseDescription.500')),
  }
}

module.exports = {
  handler,
  response,
  validator,
}
