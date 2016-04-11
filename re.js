'use strict'

const fs = require('fs')
const _  = require('lodash')

class Rejs {
  constructor() {
    if (fs.existsSync("rejs")) return
    fs.mkdirSync("rejs", err => { if (err) console.log(err) })
  }

  // public
  createTable(tableName) {
    if (fs.existsSync(`./rejs/${tableName}`)) return
    this.resetTable(tableName)
  }

  newData(tableName, data) {
    this.modifyTable(tableName, t => t[t[0].nextId++] = data)
  }

  deleteById(tableName, id) {
    this.modifyTable(tableName, t => delete t[id])
  }

  dropTable(tableName) {
    fs.unlinkSync(`./rejs/${tableName}`)
  }

  updateTable(tableName, data) {
    this.resetTable(tableName)
    this.newData(tableName, data)
  }

  getTable(tableName) {
    return JSON.parse(fs.readFileSync(`./rejs/${tableName}`, 'utf8'))
  }

  findId(tableName, id) {
    return this.getTable(tableName)[id]
  }

  where(tableName, prop) {
    const whereTable = this.getTable(tableName)
    const records    = _.values(whereTable)
    records.shift() // remove the metadata
    return _.filter(records, (record) => _.includes(record, prop))
  }

  // private
  replaceTable(tableName, data) {
    fs.writeFileSync(`./rejs/${tableName}`, JSON.stringify(data))
  }

  resetTable(tableName) {
    this.replaceTable(tableName, this.initialData(tableName))
  }

  modifyTable(tableName, fn) {
    const table = this.getTable(tableName)
    fn(table)
    this.replaceTable(tableName, table)
  }

  initialData(tableName) {
    return {"0": {"table": tableName, nextId: 1}}
  }
}

module.exports = Rejs
