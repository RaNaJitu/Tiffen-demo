
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
      if(role !== 'superAdmin' ||  role !== 'admin') return h.response({ message: i18.__('admin.401') }).code(401)
      
    const categoryId = req.payload.categoryId;
    
    const updateServiceProviders = () => new Promise(async (resolve, reject) => {
      await category.findAndUpdate({ _id: ObjectID(categoryId) }, { $set: req.payload, updatedAt: new Date().toISOString() }).then((data) => {
        console.log('======data==========>', data)
        return resolve(data)
      }).catch((err) => reject(err))
    })

    return updateServiceProviders()
    .then(data => {
      return h.response({ message: i18n.__('common.response.200'), data }).code(200)
    })
    // .catch(e => {
    //   if (e.code) {
    //     debugLogger.debug('Provider signup API error =>', e)
    //     return h.response({ message: e.message }).code(e.code)
    //   }
    //   debugLogger.debug('Provider signup API error =>', e)
    //   return h.response({ message: e.message }).code(500)
    // })
  } catch (error) {
    errorLogger.error('Error occurred during category PATCH: ', error)
    return h.response({
      message: req.i18n.__('genericErrMsg.500')
    }).code(500)
  }
}

const validator = Joi.object().keys({
  categoryId: Joi.string().required().description('Category Id').example('64199e0ab8686ce391a98b45'),
  categoryName: Joi.string().description('Category Name').example('Veg'),
  status: Joi.string().description('Category status').example('Active'),
  bannerImage: Joi.string().description('Banner Image').example('https://as2.ftcdn.net/v2/jpg/04/49/45/99/1000_F_449459947_CXsOqKenZYmQS887rPWRGHk2BbHQkrNM.jpg'),
  galleryImage: Joi.array().items(Joi.object({
    image1: Joi.string().optional().allow('').description('Image 1').example('https://logodix.com/logos/2088591'),
    image2: Joi.string().optional().allow('').description('Image 2').example('https://logodix.com/logos/2088591'),
    image3: Joi.string().optional().allow('').description('Image 3').example('https://logodix.com/logos/2088591')
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
  }
}


module.exports = {
  handler,
  validator,
  response
}
