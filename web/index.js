const config = require('config')

if (config.get('CLUSTER_PROCESS') === 'true' || config.get('CLUSTER_PROCESS') === true) {
  const cluster = require('cluster')
  // const numCPUs = require('os').cpus().length
  // const moment = require('moment')
  // const redis = require('../library/redis')

  const Db = require('../library/mongodb')
  // const elasticSearch = require('../library/elasticsearch')
  // const workingHour = require('../web/commonModels/workingHour')
  // const amqp = require('../library/rabbitMq/rabbitMq')

  const { infoLogger } = require('../utils/logger')

  if (cluster.isMaster) {
    infoLogger.info(`Master ${process.pid} is running`)
    // // Fork workers.
    // for (let i = 0; i < numCPUs; i += 1) {
    //   cluster.fork()
    //   infoLogger.info(`${moment()} Forking process number ${i}...`)
    // }

    if (config.get('IS_TRACE_ENABLE') === 'true' || config.get('IS_TRACE_ENABLE') === true) {
      // // node trace
      // const trace = require('./middleware/node-trace')
      // const express = require('express')
      // const metricsServer = express()
      // metricsServer.listen(config.get('ISOMETRIC_PORT'), () => {
      // })
      // metricsServer.use('', trace.MetricsCluster(metricsServer, express))
      // metricsServer.use('', trace.SnapshotExpress(metricsServer, express))
    }
    // // Listen for dying workers
    // cluster.on('exit', (worker) => {
    //   // Replace the dead worker,
    //   // we're not sentimental
    //   infoLogger.info(`${moment()}  worker ${worker.process.pid} died`)
    //   cluster.fork()
    // })
    const redisConnect = async () => {
      // await redis.connect()
      // await amqp.connect()
      // await elasticSearch.connect()
      await Db.connectToServer()
      // workingHour.syncStores()
      // require('../utils/redisEventListner')
    }
    redisConnect()
  } else {
    const server = require('./server')
    server.startServer()
  }
} else {
  if (config.get('IS_TRACE_ENABLE') === 'true' || config.get('IS_TRACE_ENABLE') === true) {
    // node trace
    // const trace = require('./middleware/node-trace')
    const express = require('express')
    const metricsServer = express()
    metricsServer.listen(config.get('ISOMETRIC_PORT'), () => {
    })
    // metricsServer.use('', trace.MetricsNotCluster(metricsServer, express))
    // metricsServer.use('', trace.SnapshotExpress(metricsServer, express))
  }
  const server = require('./server')
  server.startServer()
}
