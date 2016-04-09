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
         if(err){console.log(err)}
      })
    }
  }

  writeToTable(table, data) {
    fs.writeFile(`./rejs/${table}.txt`, JSON.stringify(data), err => {
      if (err) return console.log(err)
    })
  }

  newData (table, data) {
    this.store[this.id] = data
    this.writeToTable(table, this.store)
    this.id += 1
  }
}

// const deleteById = (id) => {
//   if (id in table) {
//     delete table[id]
//     console.log(`RECORD with ID: ${id} has been DELETED`)
//   } else {
//     console.log("ID is NOT in the DB")
//   }
// }
const rejs = new Rejs

rejs.newData('coordinates', {k: 2634236})
rejs.newData('coordinates', {k: 2634236})
rejs.newData('coordinates', {k: 2634236})
