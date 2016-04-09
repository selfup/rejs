'use strict'

var fs = require('fs');

class Rejs {
  constructor() {
    this.store = {}
    this.id = 1
    this.initDbDir
  }

  get initDbDir() {
    if(!fs.existsSync("rejs")){
       fs.mkdirSync("rejs", err => {
         if(err) console.log(err)
      })
    }
  }

  fileExists(table) {
    if(fs.existsSync(`rejs/${table}`) === false){
      return false
    }
  }

  writeToTable(table, data) {
    fs.writeFileSync(`./rejs/${table}.txt`, JSON.stringify(data))
  }

  newData(table, data) {
    if (this.fileExists(table) === false) {
      let store = {}
      store[this.id] = data
      this.writeToTable(table, store)
      this.id += 1
    } else {
      let tableRead = JSON.parse(fs.readFileSync(`./rejs/${table}.txt`, 'utf8'))
      let lastId = Object.keys(tableRead)[-1]
      tableRead[lastId + 1] = data
      this.writeToTable(table, tableRead)
    }
  }

  deleteById(table, id) {
    let tableRead = fs.readFileSync(`./rejs/${table}.txt`, 'utf8')
    let modData = JSON.parse(tableRead)
    delete modData[`${id}`]
    this.writeToTable(`${table}`, modData)
  }
}

const rejs = new Rejs

rejs.newData('coordinates', {k: 24})
rejs.newData('coordinates', {k: 23})
rejs.newData('coordinates', {k: 28})
rejs.deleteById('coordinates', '2')
// rejs.newData('coordinates', {k: 26})
