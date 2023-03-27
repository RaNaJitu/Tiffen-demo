
const Glue = require('@hapi/glue')
const config = require('config')
const Hapi = require('@hapi/hapi')
const moment = require('moment')
const { infoLogger, errorLogger } = require('../utils/logger')
const manifest = require('./manifest')
const Db = require('../library/mongodb')
const models = require('../models')

const options = {
  // relativeTo: __dirname
}

// const server = Glue.compose(manifest, options)
const server = new Hapi.Server(manifest.server)

const startServer = async () => {
  try {
    const serverId = 'base-node-api-' + Math.floor(Math.random() * 999) + '-' + moment().unix()
    // connect database
    try {
      await Db.connectToServer()
      infoLogger.info('SuccessFully connected to database....')
    } catch (error) {
      errorLogger.error('[MONGO DB] : connection error..', error)
    }
    

    // compose server with glue
    // server = await Glue.compose(manifest, options)
    await server.register(manifest.register.plugins, options)
    await server.start()
    infoLogger.info(`====sever running on ===== ${manifest.server.port}`)
  } catch (error) {
    errorLogger.error('[Server] : Server starting error...', error)
    process.exit(1)
  }
}

// method for stop server
const stopServer = async () => {
  await Db.closeConnection()
  await redis.disconnect()
  await server.stop()
}

module.exports = {
  server,
  startServer,
  stopServer
}
