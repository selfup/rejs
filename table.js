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
    fs.writeFile(`./rejs/${table}.txt`, JSON.stringify(data), err => {
      if (err) return console.log(err)
    })
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
    fs.readFile(`./rejs/${table}.txt`, 'utf8', (err,data) => {
      if (err) return console.log(err)
      let modData = JSON.parse(data)
      delete modData[`${id}`]
      modData = JSON.stringify(modData)
      this.writeToTable(`${table}`, modData)
    });
  }
}


const rejs = new Rejs

rejs.newData('coordinates', {k: 2634236})
rejs.newData('coordinates', {k: 2634236})
rejs.newData('coordinates', {k: 2634236})
rejs.deleteById('coordinates', '2')

console.log(rejs)