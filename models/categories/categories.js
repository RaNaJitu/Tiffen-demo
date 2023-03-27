const tableName = 'category'
const db = require('../../library/mongodb')
const ObjectID = require('mongodb').ObjectID

// const getAll = (params, project, sort, limit, skip) => db.get().collection(tableName).find(params, { projection: project }).sort(sort || {}).skip(skip || 0).limit(limit || 20).toArray()
const getAll = (data) => db.get().collection(tableName).find(data).toArray()

const getOne = (date) => db.get().collection(tableName).findOne(date)

const insert = data =>  db.get().collection(tableName).insertOne(data)

// const deleteCategory = data =>  db.get().collection(tableName).findOneAndDelete(data)

const deleteCategory = data =>  db.get().collection(tableName).deleteOne(data)

const findAndUpdate = (id, data) => db.get().collection(tableName).updateOne(id, data)
// const findAndUpdate = (params, data) => db.get().collection(tableName).findOneAndUpdate(params, data, { upsert: true, returnOriginal: false })

module.exports = {
    getAll,
    insert,
    getOne,
    deleteCategory,
    findAndUpdate
  }
