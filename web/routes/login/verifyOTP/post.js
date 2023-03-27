
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

const login = require('../../../../models/login')
const ObjectID = require('mongodb').ObjectID

const handler = async (req, h) => {
  try {
    const otp = req.payload.otp;
    const MobileNo = req.payload.phone;
    
    const optGiven = await login.getByMobile({ MobileNo })
    // console.log('=======optGiven======>>')
    console.log('optGiven========>>', optGiven)
    console.log('optGiven.otp========>>', optGiven.opt)

    if(optGiven.opt === otp)
      return h.response({ message: req.i18n.__('patchOrderMissing.responseDescription.200') }).code(200)
    else
      return h.response({ message: req.i18n.__('patchOrderMissing.responseDescription.403') }).code(403)
  } catch (error) {
    errorLogger.error('Error occurred during provider postSignIn (isExists): ', error)
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
const validator = {
//   countryCode: Joi.string().allow('').description('Country code').example('+91')
}
/**
 * A module that exports customer postSignIn's handler, validator!
 * @exports validator
 * @exports handler
 */
const response = {
  status: {
    200: {
      // message: Joi.string().required().example(i18n.__('postSignIn.200')).description(i18n.__('postSignIn.200'))
    }
  }
}
module.exports = {
  handler,
  validator,
  response
}
