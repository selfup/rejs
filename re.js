'use strict'

var fs = require('fs');

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

  createTable(tableName) {
    if(!fs.existsSync(`./rejs/${tableName}`)) {
      let InitialData = {"0": {"table": `${tableName}`}}
      fs.writeFileSync(`./rejs/${tableName}`, JSON.stringify(InitialData))
    }
  }

  writeToTable(table, data) {
    fs.writeFileSync(`./rejs/${table}`, JSON.stringify(data))
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
