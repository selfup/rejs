# Selfup - Rejs

Installation: `npm install selfup-rejs --save`

Load package:

    const selfupRejs = require('selfup-rejs')
    const rejs = new selfupRejs

### How to Use:

* Create a table: `rejs.createTable('tablename')`
* Add data to table: `rejs.newData('tablename', dataObject)`
* Delete data by ID in a table: `rejs.deleteById('tablename', '2')`
* Drop a table: `rejs.dropTable('tablename')`
* Replace/Overwrite a table: `rejs.updateTable('tablename', dataObject)`
* (GET) Table Object Query: `rejs.getTable('tablename')`
* (GET) Find by ID: `rejs.findId('tablename', 'id')`
* (GET) Where/Select: `rejs.where('tablename', 'any value is an object')`

### Advanced Use:

#### Wipe a table, change initial data structure:

Here is where you will still have to use an ID but you can remove the initial `{"0": {"table": `${table}`}}` Object.

You can use: `writeToTable('tablename', dataObject)`

*dataObject must have an ID for the DB to work*

*Use at your own risk!*

Example: `writeToTable('tablename', {"0": {"color": "blue"}})`

### To work on

* `where`
