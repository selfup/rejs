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
    fs.readFile(`./rejs/${table}.txt`, 'utf8', (err,data) => {
      if (err) return console.log(err)
      return console.log(data);
    });
  }

  newData(table, data) {
    this.store[this.id] = data
    this.writeToTable(table, this.store)
    this.id += 1
  }

  deleteById(table, id) {
    // Next Step is actually delete by id
    this.fetchFromTable(table, id)
  }
}


const rejs = new Rejs

rejs.newData('coordinates', {k: 2634236})
rejs.newData('coordinates', {k: 2634236})
rejs.newData('coordinates', {k: 2634236})
rejs.deleteById('coordinates', '2')
