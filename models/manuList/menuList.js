const tableName = 'menu'
const db = require('../../library/mongodb')
const ObjectID = require('mongodb').ObjectID

// const getAll = (params, project, sort, limit, skip) => db.get().collection(tableName).find(params, { projection: project }).sort(sort || {}).skip(skip || 0).limit(limit || 20).toArray()
const getAll = () => db.get().collection(tableName).find().toArray()

const getById = (date) => db.get().collection(tableName).findOne(date)

const insert = data =>  db.get().collection(tableName).insertOne(data)

module.exports = {
    getAll,
    insert,
    getById
  }
