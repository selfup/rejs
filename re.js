'use strict'

const fs = require('fs')
const _ = require('lodash')

class Rejs {
  constructor() {
    this.initDbDir
  }

  get initDbDir() {
    if(!fs.existsSync("rejs")) {
      fs.mkdirSync("rejs", err => {
        if(err) console.log(err)
      })
    }
  }

  getTable(table) {
    return JSON.parse(fs.readFileSync(`./rejs/${table}`, 'utf8'))
  }

  findId(table, id) {
    let tableQuery = JSON.parse(fs.readFileSync(`./rejs/${table}`, 'utf8'))
    return tableQuery[id]
  }

  where(table, prop) {
    let whereTable = this.getTable(`${table}`)
    let ids = Object.keys(whereTable)
    let whereStore = []
    for (let i = 0; i < ids.length; i++) {
      if (_.includes(whereTable[`${ids[i]}`], prop)) {
        whereStore.push(whereTable[`${ids[i]}`])
      }
    }
    return whereStore
  }

  createTable(tableName) {
    if(!fs.existsSync(`./rejs/${tableName}`)) {
      let initialData = {"0": {"table": `${tableName}`}}
      fs.writeFileSync(`./rejs/${tableName}`, JSON.stringify(initialData))
    }
  }

  writeToTable(table, data) {
    fs.writeFileSync(`./rejs/${table}`, JSON.stringify(data))
  }

  updateTable(table, data) {
    let initialData = {"0": {"table": `${table}`}}
    fs.writeFileSync(`./rejs/${table}`, JSON.stringify(initialData))
    this.newData(table, data)
  }

  newData(table, data) {
    let tableRead = JSON.parse(fs.readFileSync(`./rejs/${table}`, 'utf8'))
    let lastId = Object.keys(tableRead)
    lastId = parseInt((lastId[lastId.length - 1])) + 1
    tableRead[lastId] = data
    this.writeToTable(table, tableRead)
  }

  dropTable(table) {
    fs.unlinkSync(`./rejs/${table}`)
  }

  deleteById(table, id) {
    let tableRead = fs.readFileSync(`./rejs/${table}`, 'utf8')
    let modData = JSON.parse(tableRead)
    delete modData[`${id}`]
    this.writeToTable(`${table}`, modData)
  }
}

module.exports = Rejs
