const { MongoClient } = require('mongodb')

const config = require('config')

/**
 * Method to connect to the mongodb
 * @param {*} url
 * @returns connection object
 */

const url = config.get('MONGODB_URL')
let _db
let client

const dbName = config.get('MONGO_DATABASE')
// if (db === "prod") {
//   dbName = "5Canale";
// } else {
//   dbName = "test-5Canale";
//   infoLogger.info(`Trying to connnect with test-database:${dbName}`);
// }

module.exports = {
  // method is use for connect db to server
  async connectToServer() {
    // Use connect method to connect to the Server
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    _db = client.db(dbName)
    return client
  },

  async closeConnection() {
    client.close()
  },

  // export db instance
  get() {
    return _db
  }
}
