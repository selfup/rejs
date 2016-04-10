const r = require('./../re.js')

rejs = new r

rejs.createTable('testOne')

rejs.newData('testOne', {test: "test data 1"})
rejs.newData('testOne', {test: "test data 2"})
rejs.newData('testOne', {test: "test data 3"})
rejs.newData('testOne', {test: "test data 4"})

console.log(rejs.getTable('testOne'))
console.log(rejs.findId('testOne', '1'))

rejs.updateTable('testOne', {test: "test data updated table"})

console.log(rejs.getTable('testOne'))

rejs.dropTable('testOne')

rejs.createTable('testOne')
rejs.newData('testOne', {test: "test data 1"})

console.log(rejs.getTable('testOne'))
console.log(rejs.findId('testOne', '1'))

rejs.dropTable('testOne')
