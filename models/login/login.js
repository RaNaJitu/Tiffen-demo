const tableName = 'user'
const db = require('../../library/mongodb')
const ObjectID = require('mongodb').ObjectID

// const getAll = (params, project, sort, limit, skip) => db.get().collection(tableName).find(params, { projection: project }).sort(sort || {}).skip(skip || 0).limit(limit || 20).toArray()
const getAll = () => db.get().collection(tableName).find().toArray()

const getByMobile = (date) => db.get().collection(tableName).findOne(date)

const insert = data => {
    console.log('=========>>DATA', data)
    return db.get().collection(tableName).insertOne(data)
  }

module.exports = {
    getAll,
    insert,
    getByMobile
  }
