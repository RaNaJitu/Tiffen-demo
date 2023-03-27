const Joi = require('@hapi/joi')

const i18n = require('../../../locales/locales')
const { debugLogger, errorLogger } = require('../../../utils/logger')

/**
 * validate request header with auth and other params
 */
const headerAuthValidator = Joi.object({
  authorization: Joi.string()
    .required()
    .description(i18n.__('common.fields.authorization')),
  language: Joi.string()
    .required()
    .default('en')
    .description(i18n.__('common.fields.language')),
  platform: Joi.number()
    // .valid([1, 2, 3])
    .required()
    .default(2)
    .description(i18n.__('common.fields.platform')),
  // currencysymbol: Joi.string()
  //   .required()
  //   .default('$')
  //   .description(i18n.__('common.fields.currencysymbol')),
  // currencycode: Joi.string()
  //   .required()
  //   .default('USD')
  //   .description(i18n.__('common.fields.currencycode'))
}).unknown()

/**
 * validate request header with auth and other params
 * and without currencycode & currency symbol
 */
const headerAuthenticator = Joi.object({
  authorization: Joi.string()
    .required()
    .description(i18n.__('common.fields.authorization')),
  language: Joi.string()
    .required()
    .default('en')
    .description(i18n.__('common.fields.language')),
  platform: Joi.number()
    .valid([1, 2, 3])
    .required()
    .default(2)
    .description(i18n.__('common.fields.platform'))
}).unknown()

const languageAuthenticator = Joi.object({
  language: Joi.string()
    .required()
    .default('en')
    .description(i18n.__('common.fields.language')),
  // platform: Joi.number()
  //   .valid([1, 2, 3])
  //   .required()
  //   .default(3)
  //   .description(i18n.__('common.fields.platform'))
}).unknown()
/**
 * validate request header with this params
 */
const languageValidator = Joi.object({
  language: Joi.string()
    .required()
    .default('en')
    .description(i18n.__('common.fields.language')),
  // platform: Joi.number()
  //   .valid([1, 2, 3])
  //   .required()
  //   .default(3)
  //   .description(i18n.__('common.fields.platform')),
  currencysymbol: Joi.string()
    .required()
    .default('$')
    .description(i18n.__('common.fields.currencysymbol')),
  currencycode: Joi.string()
    .required()
    .default('USD')
    .description(i18n.__('common.fields.currencycode'))
}).unknown()

/**
 * Customer action for faild any validation
 * @param {*} req
 * @param {*} h
 * @param {*} error
 */

const customError = (req, h, err) => {
  if (err.isJoi || Array.isArray(err.details)) {
    debugLogger.debug('req.headers : ', req.headers)
    debugLogger.debug('req.payload : ', req.payload)
    debugLogger.debug('req.query : ', req.query)
    debugLogger.debug('JOI error : ', err.details[0])
    const invalidItem = err.details[0]
    return h.response({
      message: req.i18n.__('common.response.400', invalidItem.path.join(','))
    }).code(400).takeover()
  }
  errorLogger.error('Other Error : ', err)
  return h.response({
    message: req.i18n.__('common.response.500')
  }).code(500).takeover()
}

module.exports = { headerAuthValidator, headerAuthenticator, languageValidator, languageAuthenticator, customError }
