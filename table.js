'use strict'

let table = {}
let id = 1

const newData = (data) => {
  table[id] = data
  id += 1
}

const deleteById = (id) => {
  if (id in table) {
    delete table[id]
    console.log(`RECORD with ID: ${id} has been DELETED`)
  } else {
    console.log("ID is NOT in the DB")
  }
}

// TESTS

newData({x: 90})
newData({x: 98})
newData({x: 32})
newData({x: 232})
newData({x: 6782})

deleteById('2')
deleteById('2')

console.log(table);
