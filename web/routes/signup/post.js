
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

const profile = require('../../../models/profile')
const ObjectID = require('mongodb').ObjectID
const bcrypt = require('bcrypt')


const handler = async (req, h) => {
    try {

        const body = req.payload;
        body.createdAt = new Date().toISOString()
        // const role = req.auth.credentials.metaData.role
        // if(role !== 'superAdmin') return h.response({ message: 'you are Unauthorised, Super Admin can do Only ' }).code(401) 


        const isEmailExist = await profile.getOne({ email: new RegExp('^' + req.payload.email, 'i') })
        if (isEmailExist) {
            return h.response({ message: i18n.__('genericErrMsg.404') }).code(412)
        }


        const isMobileExist = await profile.getOne({ mobile: req.payload.mobile })
        if (isMobileExist) {
            return h.response({ message: i18n.__('genericErrMsg.404') }).code(413)
        }

        // if(isUserExist) return h.response({ message: i18n.__('genericErrMsg.400' ) }).code(409)
        const hashedPwd  = await bcrypt.hash(body.password, 10)
        body.password = hashedPwd

        


        const data = await profile.insert(body)

        return h.response({ message: i18n.__('common.response.200'), data }).code(200)

    } catch (error) {
        errorLogger.error('Error occurred during category POST: ', error)
        return h.response({
            message: req.i18n.__('genericErrMsg.500')
        }).code(500)
    }
}

const validator = Joi.object().keys({
    firstName: Joi.string().required().description('First name ').example('jeet'),
    lastName: Joi.any().description('Last name ').example('Rana'),
    gender: Joi.number().default(1).min(1).max(3).description('1-Male, 2-Female, 3- Others').example(1),
    dateOfBirth: Joi.date().required().allow('').description('dateOfBirth date YYYY-MM-DD').example('2023-01-01'),
    profilePic: Joi.string().description('profilePic').example('jeet'),
    email: Joi.string().required().description('Email').example('rinkesh@mobifyi.com'),
    mobile: Joi.string().required().description('Mobile number').example('9098987890'),
    username: Joi.string().required().description('username').example('jeet'),
    password: Joi.string().required().description('Password').example('123'),
    role: Joi.string().required().description('role').example('superAdmin'),
})


const response = {
    // status: {
    //   200: Joi.object({
    //     message: Joi.any().example(i18n.__('common.response.200')).description(i18n.__('common.response.200'))
    //   }).description(i18n.__('category.200')),
    //   404: Joi.object({
    //       message: Joi.any().example(i18n.__('common.response.404')).description(i18n.__('common.response.404'))
    //   }).description(i18n.__('category.200')),
    //   500: Joi.object({
    //     message: Joi.any().example(i18n.__('common.response.500')).description(i18n.__('common.response.500'))
    // }).description(i18n.__('category.500')),
    // }
}


module.exports = {
    handler,
    validator,
    response
}
