'use strict'

var fs = require('fs');

let store = {}
let id = 1

if(!fs.existsSync("rejs")){
   fs.mkdirSync("rejs", err => {
     if(err){console.log(err)}
   })
 }

const writeToTable = (table, data) => {
  fs.writeFile(`./rejs/${table}.txt`, JSON.stringify(data), err => {
    if (err) return console.log(err)
  })
}

const newData = (table, data) => {
  store[id] = data
  writeToTable(table, store)
  id += 1
}

// const deleteById = (id) => {
//   if (id in table) {
//     delete table[id]
//     console.log(`RECORD with ID: ${id} has been DELETED`)
//   } else {
//     console.log("ID is NOT in the DB")
//   }
// }

newData('coordinates', {k: 2634236})
newData('coordinates', {k: 2634236})
newData('coordinates', {k: 2634236})
