// const redis = require('../library/redis')
// const ObjectID = require('mongodb').ObjectID
// const { debugLogger, errorLogger } = require('../utils/logger')
// const workingHour = require('../web/commonModels/workingHour')
// // const managers = require('../models/managers')
// const config = require('config')
// const i18n = require('../locales/locales')

// const subscriber = redis.getSubscriber()
// subscriber.psubscribe('__key*__:*')
// subscriber.on('pmessage', function (pattern, channel, message) {
//   i18n.setLocale(config.get('DEFAULT_LANGUAGE'))
//   const channelArr = channel.split(':')
//   if (channelArr[1] === 'expired') {
//     switch (channelArr[1]) {
//       case 'expired':
//         var booking = message.split('_')
//         switch (booking[0]) {
//           case 'managerpresence':
//             debugLogger.debug('managerpresence Event')
//             managers.findAndUpdate({ _id: new ObjectID(booking[1]) }, {
//               $set: {
//                 online: 0
//               }
//             })
//             break
//           case 'storeOpen':
//             debugLogger.debug('storeOpen Hours Event')
//             workingHour.workingHourCheck(booking[1], (err, res) => {
//               if (err) {
//                 errorLogger.error('Store Working Hours Event Redis error :', err)
//               } else {
//                 debugLogger.debug('Store Working Hours Event result : ', res)
//               }
//             })
//             break
//           case 'storeNextOpen':
//             debugLogger.debug('storeNextOpen Hours Event')
//             workingHour.workingHourCheck(booking[1], (err, res) => {
//               if (err) {
//                 errorLogger.error('Store Working Hours Event Redis error :', err)
//               } else {
//                 debugLogger.debug('Store Working Hours Event result : ', res)
//               }
//             })
//             break
//           default:
//             break
//         }
//         break
//       default:
//         break
//     }
//   }
// })
