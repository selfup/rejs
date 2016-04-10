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

  createTable(tableName) {
    if(!fs.existsSync(`./rejs/${tableName}.txt`)) {
      let tableInit = `${tableName}`
      let InitialData = {"0": {"table": `${tableName}`}}
      fs.writeFileSync(`./rejs/${tableName}.txt`, JSON.stringify(InitialData))
    }
  }

  writeToTable(table, data) {
    fs.writeFileSync(`./rejs/${table}.txt`, JSON.stringify(data))
  }

  newData(table, data) {
    let tableRead = JSON.parse(fs.readFileSync(`./rejs/${table}.txt`, 'utf8'))
    let lastId = Object.keys(tableRead)
    lastId = parseInt((lastId[lastId.length - 1])) + 1
    tableRead[lastId] = data
    this.writeToTable(table, tableRead)
  }

  deleteById(table, id) {
    let tableRead = fs.readFileSync(`./rejs/${table}.txt`, 'utf8')
    let modData = JSON.parse(tableRead)
    delete modData[`${id}`]
    this.writeToTable(`${table}`, modData)
  }
}

module.exports = Rejs

const rejs = new Rejs
