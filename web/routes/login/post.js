
'use strict'

/**
 * @global
 *
 */
// const Bcrypt = require('bcryptjs') // hashing module
const Joi = require('@hapi/joi')
/** @namespace */
const i18n = require('../../../locales/locales')
/**
 * @namespace
*/

const { errorLogger, debugLogger } = require('../../../utils/logger')

// const profile = require('../../../models/profile')
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const profile = require('../../../models/profile')
const auth = require('../../middleware/auth')
const md5 = require('md5')

const handler = async (req, h) => {
    try {

        const body = req.payload
        // console.log('====auth======', req.auth)
        // console.log('body==============>>', body)
        const authData = {}
    const adminData = await profile.getOne({ email: new RegExp('^' + req.payload.email, 'i') })
    console.log('=======adminData====>>', adminData)
    if (!adminData) {
      return h.response({ message: req.i18n.__('admin.404') }).code(404)
    }



    const match = await bcrypt.compare(req.payload.password, adminData.password)
    if(!match) return h.response({ message: req.i18n.__('admin.405') }).code(405)
    // if (md5(req.payload.password) !== adminData.password) {
    //     return h.response({ message: req.i18n.__('admin.405') }).code(405)
    //   }

    // authData.immediateRevoke = 'false'
    // authData.multiLogin = 'true'
    authData.metaData = {
      sessionId: '',
      role: adminData.role,
      name: adminData.firstName,
      email: adminData.email,
      countryCode: '',
      mobile: '',
      institutionType: 0,
      customerType: 0,
      userType: 0
    }
    authData.userId = adminData._id.toString()
    authData.userType = 'admin'
    authData.accessTTL = config.get('ACCESSTTL')
    authData.refreshTTL = config.get('REFRESHTTL')

    // console.log('=====authData===>>', authData)
    const authToken = await auth.generateTokens(authData)

    // console.log('=====authToken===>>', authToken)

    

    

      return h.response({ message: req.i18n.__('genericErrMsg.200'), data: authToken }).code(200)
        // if (!body.email || !body.password) return h.response({ message: i18n.__('genericErrMsg.400') }).code(400)
        // const email = req.payload.email
        // // check user is exist or not
        // const isUserExist = await profile.getOne({ email })
        // console.log('isUserExist==============>>', isUserExist)
        // if (!isUserExist) return h.response({ message: i18n.__('genericErrMsg.400') }).code(409)

        // const match = await bcrypt.compare(body.password, isUserExist.password)

        // if(match) {
        //     const role = isUserExist.role
        //     const accessToken = jwt.sign(
        //         {
        //             "userInfo": {
        //                 "username": email,
        //                 "role": role
        //             },
        //         },
        //         config.get('SECRET_ACCESS_KEY'),
        //         { expiresIn: '30s'}
        //     )
        //     console.log('========accessToken=============>', accessToken)
        //     return  h.response({ message: req.i18n.__('genericErrMsg.200'), accessToken }).code(200)
        // } else {
        //     return h.response({ message: req.i18n.__('genericErrMsg.401') }).code(401)
        // }

    } catch (error) {
        errorLogger.error('Error occurred during Login : ', error)
        return h.response({
            message: req.i18n.__('genericErrMsg.500')
        }).code(500)
    }
}

const validator = Joi.object({
    email: Joi.string().required().description('Email').example('superadmin@gmail.com'),
    password: Joi.string().required().description('Password').example('123')
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
    },
    failAction: 'log'
}

module.exports = {
    handler,
    validator,
    response
}
