
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
    const preferedVegetable = []
    const body = req.payload;

    //TODO check the username or valid or not 

    //TODO check user has order the details or not
    // const OrderId = req.body.id

    //TODO check categoryId is exist or not
    const menuList = {
      categoryId: body.categoryId,
      userId: body.userId,
      preferableVegetableId: body.preferableVegetableId,
      day: body.day,
      dinner: {
        price: body.dinner.price,
        meal: body.dinner.meal
      },
      lunch: {
        image1: body.lunch.price,
        meal: body.lunch.meal
      },
      status: body.status,
      createdAt: new Date()
    }
    const resData = await category.insert(menuList)
    return h.response({ message: req.i18n.__('opt.200'), data: resData }).code(200)
  } catch (error) {
    errorLogger.error('Error occurred during category POST: ', error)
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

const validator =  Joi.object().keys({
  categoryId: Joi.string().required().description('Category Id').example('6417f69880662498bf3be85b'),
  userId: Joi.string().required().description('User Id').example('6417f69880662498bf3be85b'),
  preferableVegetableId: Joi.string().required().description('Preferable Vegetable Id').example('6417f69880662498bf3be85b'),
  status: Joi.string().required().description('meal status').example('Active, In-Active'),
  day: Joi.string().required().description('day').example('Monday'),
  dinner: Joi.object({
    price: Joi.number().description('price of meal').example(80),
    meal: Joi.string().description('DINNER MEAL').example('daal, chawal, 2-roti, dahi, allu shimla mirch ka sabji')
  }).required(),
  lunch: Joi.object({
    price: Joi.number().description('price of meal').example(80),
    meal: Joi.string().description('LUNCH MEAL').example('daal, chawal, 2-roti, dahi, allu shimla mirch ka sabji')
  }).required()
})  

const response = {
  status: {
    200: Joi.object({
      message: Joi.any().example(i18n.__('common.response.200')).description(i18n.__('common.response.200'))
    }).description(i18n.__('category.200')),
    404: Joi.object({
        message: Joi.any().example(i18n.__('common.response.404')).description(i18n.__('common.response.404'))
    }).description(i18n.__('category.200')),
    500: Joi.object({
      message: Joi.any().example(i18n.__('common.response.500')).description(i18n.__('common.response.500'))
  }).description(i18n.__('category.500')),
  }
}

module.exports = {
  handler,
  response,
  validator
}
