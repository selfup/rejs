# This is the Documentation for selfup-rejs

### Things to consider:

* If you can read javascript tests, skip the docs and just go read the tests
* They are pretty verbose and will get you up to speed on how things work
* If you like videos, here a link to the quick demo vid from the README: [vid](https://www.youtube.com/watch?v=dVTePMkw9EE&feature=youtu.be&a)
* If you are not familiar with Javascript Testing Frameworks keep reading!

# How this DB works:

* (POST)   Create a table: `rejs.createTable('tablename')`
* (POST)   Add data to table: `rejs.newData('tablename', dataObject)`
* (DELETE) Delete data by ID in a table: `rejs.deleteById('tablename', '2')`
* (DELETE) Drop a table: `rejs.dropTable('tablename')`
* (PUT)    Replace/Overwrite a table: `rejs.updateTable('tablename', dataObject)`
* (GET)    Table Object Query: `rejs.getTable('tablename')`
* (GET)    Multi-Table Query: `rejs.getTables('table', 'table2', 'table3')`
* (GET)    Find by ID: `rejs.findId('tablename', 'id')`
* (GET)    Where/Select: `rejs.where('tablename', 'any value in a flat object')`


# Examples below:

```
const Selfup = require('selfup-rejs')
const rejs = new Selfup

rejs.createTable('exampleOne')

\\ There will now be a folder called 'selfup-rejs'
\\ This folder will now contain a file with no extension named: exampleOne

\\ Inside of this file will be some basic metadata about the table
\\ You will find an example like so: '0': { table: 'testOne', nextId: 3 }

\\ This is never be deleted. This data is required for the database to function.
\\ It also makes your life easier!

rejs.newData('exampleOne', {exampleData: "some example stuff"})

\\ Now your exampleData table will have the new object appended to the table.
\\ A new ID will point to the object you appended. These ID's are event logs.

rejs.updateTable('exampleOne', {ex: "data"})

\\ The exampleOne data will be wiped/replaced with the new data.
\\ The metadata will go in first, and then the new object will go in right after.

\\ The findId/deleteById methods are pretty self explanatory at this point!
```
