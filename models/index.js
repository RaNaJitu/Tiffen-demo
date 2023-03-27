// const { errorLogger } = require('../utils/logger')

// const cart = require('./cart')
// const guestUser = require('./guestUser')
// const masterOrder = require('./masterOrder')
// const storeOrder = require('./storeOrder')
// const dcOrder = require('./dcOrder')
// const deliveryOrder = require('./deliveryOrder')
// const driverJobs = require('./driverJobs')
// const driverRoasterDaily = require('./driverRoasterDaily')
// const zones = require('./zones')
// const shiftlog = require('./shiftlog')
// const customer = require('./customer')
// const locationLogs = require('./locationLogs')
// const savedAddress = require('./savedAddress')
// const messageDB = require('./messageDB')

// const createIndex = () => new Promise(async (resolve, reject) => {
//   try {
//     await cart.createIndex()
//     await guestUser.createIndex()
//     await masterOrder.createIndex()
//     await storeOrder.createIndex()
//     await dcOrder.createIndex()
//     await deliveryOrder.createIndex()
//     await driverJobs.createIndex()
//     await driverRoasterDaily.createIndex()
//     await zones.createIndex()
//     await shiftlog.createIndex()
//     await customer.createIndex()
//     await locationLogs.createIndex()
//     await savedAddress.createIndex()
//     await messageDB.createIndex()

//     return resolve(true)
//   } catch (err) {
//     errorLogger.error('error while creating indexes : ', err)
//     return resolve(true)
//   }
// })

// module.exports = {
//   createIndex
// }
