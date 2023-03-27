
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

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

const handler = async (req, h) => {
  try {
    // const accountSid = process.env.accountSid
    // const authToken = process.env.authToken
    // const smsKey = process.env.smsKey
    // let twilioNum = process.env.twilioNum



    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount)
    // });

    // const userResponse = await admin.auth

    const { phone } = req.payload;
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log('OTP===========>>', otp);
    const ttl = 2 * 60 * 1000;
    let expire = Date.now();
    expire += ttl;
    // const data = `${phone}.${otp}.${expire}`
    const data = `${otp}.${expire}`
    // console.log('====data===>>', data)
    const sendData = {
      opt:otp,
      MobileNo: phone,
      OTPexpireDate: expire
    }

    // const data1 = await login.getAll({ _id: ObjectID('63e0b864d974a53ebc2a8146') })
    const phoneNo = await login.getByMobile({ MobileNo: phone })
    if(phoneNo === null || !phoneNo.MobileNo === phone ){
      console.log('========phoneNo==========', phoneNo)
      const data1 = await login.insert(sendData)
    }
    // console.log('data================>>', data1)
    return h.response({ message: req.i18n.__('opt.200'), otp }).code(200)
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
