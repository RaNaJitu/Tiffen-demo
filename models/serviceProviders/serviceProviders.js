// const moment = require('moment')
const tableName = 'serviceProvider'
const db = require('../../library/mongodb')

const ObjectID = require('mongodb').ObjectID

/**
 * get one services provider data
 * @param {*} params
 */
const getOne = async(params) => {
  console.log('params====================>>', params)
  const data = await db.get().collection(tableName).findOne(params)
  console.log('data================>>', data)
  return data;
}

/**
 * create new services provider
 * @param {*} params
 */
const createOne = (params) => db.get().collection(tableName).insertOne(params)

/**
 * update  services provider
 * @param {*} params
 */
const update = (id, data) => {
  return db.get().collection(tableName).updateOne(id, data)
}

/**
 * @function
 * @name updateDeviceStatusLog
 * @param {object} data - data coming from controller
 * @param {object} params - update data coming from controller
 */
const updateDeviceStatusLog = (data, params) => db.get().collection(tableName).findOneAndUpdate(
  { _id: new ObjectID(data.id) },
  {
    $set: params
  },
  { upsert: true })

/**
 * find one provider and update
 * @param {*} params
 * @param {*} data
 */

const findAndUpdate = (params, data) => db.get().collection(tableName).findOneAndUpdate(params, data, { returnOriginal: false })

/**
 * delete services provider
 * @param {*} params
 */
const deleteOne = (params) => db.get().collection(tableName).findOneAndDelete(params)

/**
 *  services provider all details
 * @param {*} params
 */
// const getAll = (params, projection) => db.get().collection(tableName).find(params, projection)
const getAll = (params, project, sort, limit, skip) => db.get().collection(tableName).find(params, { projection: project }).sort(sort || {}).skip(skip || 0).limit(limit || 20).toArray()

const count = (condition) => db.get().collection(tableName).countDocuments(condition)

module.exports = {
  createOne,
  getOne,
  update,
  findAndUpdate,
  updateDeviceStatusLog,
  deleteOne,
  getAll,
  count
}
