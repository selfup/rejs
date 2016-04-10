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

### To work on

* `where`
