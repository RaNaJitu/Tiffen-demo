
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

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

const handler = async (req, h) => {
  try {
    console.log('========get is called=========>')
    const categoryData = await category.getAll()
    if(categoryData === null) return h.response({ message: req.i18n.__('category.404') }).code(404)
    console.log('========categoryData=========>', categoryData)
    // return h.response({ message: req.i18n.__('category.200'), categoryData }).code(200)
    return h.response({ message: req.i18n.__('category.200'), categoryData }).code(200)
  } catch (error) {
    errorLogger.error('Error occurred during get category : ', error)
    return h.response({
      message: req.i18n.__('genericErrMsg.500')
    }).code(500)
  }
}

/**
 * @function
 * @name updateLogs
 * @param {string} id - customer id.
 * @param {string} userType - customer or guest
 * @param {object} data - data coming from req.payload
 * @param {object} responseData - response data
 */
/**
 *@constant
 *@type {object}
 *@default
 *A object that validates request payload!
 */

  /**
   * A module that exports customer postSignIn's handler, validator!
   * @exports validator
   * @exports handler
   */
  
const response = {
  status: {
    200: Joi.object({
      message: Joi.any().example(i18n.__('category.200')).description(i18n.__('category.200'))
    }),
    404: Joi.object({
        message: Joi.any().example(i18n.__('category.404')).description(i18n.__('category.404'))
    }),
  }
}
module.exports = {
  handler,
  response
}
