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

  writeToTable(table, data) {
    fs.writeFileSync(`./rejs/${table}.txt`, JSON.stringify(data))
  }

  fetchFromTable(table, id) {
    fs.readFileSync(`./rejs/${table}.txt`, 'utf8', (err,data) => {
      if (err) return console.log(err)
      let modData = JSON.parse(data)
      delete modData[`${id}`]
      this.writeToTable(`${table}`, modData)
    });
  }

  newData(table, data) {
    this.store[this.id] = data
    this.writeToTable(table, this.store)
    this.id += 1
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