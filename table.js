'use strict'

var fs = require('fs');

class Rejs {
  constructor() {
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

  newData(table, data) {
    if (fs.existsSync(`rejs/${table}`) === false) {
      let tableRead = JSON.parse(fs.readFileSync(`./rejs/${table}.txt`, 'utf8'))
      let lastId = Object.keys(tableRead)
      lastId = parseInt((lastId[lastId.length - 1])) + 1
      tableRead[lastId] = data
      this.writeToTable(table, tableRead)
    }
    // else if (!fs.existsSync(`rejs/${table}`) === false) {
    //   let store = {}
    //   store[this.id] = data
    //   this.writeToTable(table, store)
    //   this.id += 1
    // }
  }

  deleteById(table, id) {
    let tableRead = fs.readFileSync(`./rejs/${table}.txt`, 'utf8')
    let modData = JSON.parse(tableRead)
    delete modData[`${id}`]
    this.writeToTable(`${table}`, modData)
  }
}

const rejs = new Rejs

rejs.newData('coordinates', {k: 21})
rejs.deleteById('coordinates', '3')
rejs.deleteById('coordinates', '5')
