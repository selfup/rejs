'use strict'

const fs = require('fs')
const _  = require('lodash')

const _resetTable   = Symbol('resetTable')
const _modifyTable  = Symbol('modifyTable')
const _replaceTable = Symbol('replaceTable')
const _initialData  = Symbol('initialData')

class Rejs {
  constructor() {
    if (fs.existsSync("selfup-rejs")) return
    fs.mkdirSync("selfup-rejs")
  }

  // public
  createTable(tableName) {
    if (fs.existsSync(`./selfup-rejs/${tableName}`)) return
    this[_resetTable](tableName)
  }

  createTables() {
    return Array.from(arguments).map(table => this.createTable(table))
  }

  newData(tableName, data) {
    this[_modifyTable](tableName, t => t[t[0].nextId++] = data)
  }

  newDatas() {
    return Array.from(arguments).map(arg => this.newData(arg[0], arg[1]))
  }

  deleteById(tableName, id) {
    this[_modifyTable](tableName, t => delete t[id])
  }

  dropTable(tableName) {
    fs.unlinkSync(`./selfup-rejs/${tableName}`)
  }

  dropTables() {
    return Array.from(arguments).map(table => this.dropTable(table))
  }

  updateTable(tableName, data) {
    this[_resetTable](tableName)
    this.newData(tableName, data)
  }

  updateTables() {
    return Array.from(arguments).map(arg => this.updateTable(arg[0], arg[1]))
  }

  getTable(tableName) {
    return JSON.parse(fs.readFileSync(`./selfup-rejs/${tableName}`, 'utf8'))
  }

  getTables() {
    return Array.from(arguments).map(table => this.getTable(table))
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
  [_replaceTable](tableName, data) {
    fs.writeFileSync(`./selfup-rejs/${tableName}`, JSON.stringify(data))
  }

  [_resetTable](tableName) {
    this[_replaceTable](tableName, this[_initialData](tableName))
  }

  [_modifyTable](tableName, fn) {
    const table = this.getTable(tableName)
    fn(table)
    this[_replaceTable](tableName, table)
  }

  [_initialData](tableName) {
    return {"0": {"table": tableName, nextId: 1}}
  }
}

module.exports = Rejs
