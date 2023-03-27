
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


const handler = async (req, h) => {
  try {

    const role = req.auth.credentials.metaData.role
    console.log('role=============>>', role)
    if(role !== 'admin' && role !== 'superAdmin') return h.response({ message: i18n.__('admin.401') }).code(401)

    const body = req.payload;
    const ggData = []
    body.galleryImage.map(data => {
      ggData.push(data)
    })
    const categoryData = {
      categoryName: body.categoryName,
      status: body.status,
      bannerImage:body.bannerImage,
      galleryImage: ggData,
      createdAt: new Date().toISOString()
    }
    const data = await category.insert(categoryData)
    // return h.response({ message: req.i18n.__('common.response.200'), data: 'otp' }).code(200)
    return h.response({ message: i18n.__('common.response.200') }).code(200)
  } catch (error) {
    errorLogger.error('Error occurred during category POST: ', error)
    return h.response({
      message: req.i18n.__('genericErrMsg.500')
    }).code(500)
  }
}

const validator = Joi.object().keys({
  categoryName: Joi.string().required().description('Category Name').example('Veg'),
  status: Joi.string().default('Active').description('Category status').example('InActive'),
  bannerImage: Joi.string().description('Banner Image').example('https://as2.ftcdn.net/v2/jpg/04/49/45/99/1000_F_449459947_CXsOqKenZYmQS887rPWRGHk2BbHQkrNM.jpg'),
  galleryImage: Joi.array().items(Joi.object({
    image1: Joi.string().allow('').description('Image 1').example('https://logodix.com/logos/2088591'),
    image2: Joi.string().allow('').description('Image 2').example('https://logodix.com/logos/2088591'),
    image3: Joi.string().allow('').description('Image 3').example('https://logodix.com/logos/2088591')
  }).unknown()).default([])
})


const response = {
  status: {
    200: Joi.object({
      message: Joi.any().example(i18n.__('common.response.200')).description(i18n.__('common.responseDescription.200'))
    }).description(i18n.__('category.responseDescription.200')),
    404: Joi.object({
      message: Joi.any().example(i18n.__('common.response.404')).description(i18n.__('common.responseDescription.404'))
    }).description(i18n.__('category.responseDescription.404')),
    500: Joi.object({
      message: Joi.any().example(i18n.__('common.response.500')).description(i18n.__('common.responseDescription.500'))
    }).description(i18n.__('common.responseDescription.500')),
    401: Joi.object({
      message: Joi.any().example(i18n.__('admin.401')).description(i18n.__('admin.401'))
    }).description(i18n.__('admin.401')),
  }
}


module.exports = {
  handler,
  validator,
  response
}
