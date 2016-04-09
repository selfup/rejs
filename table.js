'use strict'

const _ = require('lodash')

let table = {}
let id = 1

const newData = (data) => {
  table[id] = data
  id += 1
}

const deleteById = (id) => {
  delete table[id]
}

const deleteByProp = (prop) => {

}

// TESTS

newData({x: 90})
newData({x: 98})
newData({x: 30})
newData({x: 3044})
newData({x: 3034342})
newData({x: 3223434330})

deleteById('2')
console.log(table);
