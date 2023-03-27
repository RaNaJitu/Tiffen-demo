
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
const user = require('../../../../models/profile')
const { Console } = require('winston/lib/winston/transports')
const ObjectID = require('mongodb').ObjectID


const handler = async (req, h) => {
  try {
    const categoryId = req.query.categoryId;
    const userCredentials = req.auth.credentials;

    const categoryData = await category.getOne({ _id: ObjectID(categoryId) })
    console.log('=======categoryData=====', categoryData)

    //CHECKING DATA IS AVAILABLE IN DB OR NOT
    if (!categoryData) {
      return h.response({ message: i18n.__('category.response.404') }).code(404)
    }

    //get user data
    const userData = await user.getOne({ _id: ObjectID(userCredentials._id) })

    //checking user has permission
    const isPermission = userData.role.map(data => {
      console.log('=====data======>.',Object.keys(data).length)
      if (userCredentials.sub === data.admin)
        return true
      else
        return false
    })
    if (isPermission[0] === true) {
      const data = await category.deleteCategory({ _id : ObjectID(categoryId)})
      return h.response({ message: i18n.__('category.response.200') }).code(200)
    } else {
      return h.response({ message: i18n.__('admin.403') }).code(403)
    }
  } catch (error) {
    errorLogger.error('Error occurred during category DELETE: ', error)
    return h.response({
      message: req.i18n.__('genericErrMsg.500')
    }).code(500)
  }
}

const validator = Joi.object().keys({
  categoryId: Joi.string().required().description('Category Id').example('64198640c28a2c0bec7f659c')
})

const response = {
  status: {
    200: Joi.object({
      message: Joi.any().example(i18n.__('common.response.200')).description(i18n.__('common.responseDescription.200'))
    }).description(i18n.__('category.responseDescription.200')),
    404: Joi.object({
      message: Joi.any().example(i18n.__('category.response.404')).description(i18n.__('category.responseDescription.404'))
    }).description(i18n.__('category.responseDescription.404')),
    403: Joi.object({
      message: Joi.any().example(i18n.__('category.response.403')).description(i18n.__('category.responseDescription.403'))
    }).description(i18n.__('category.responseDescription.403')),
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
