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
* Replace/Overwrite a table: `writeToTable('tablename', dataObject)`
* Table (GET) Object Query: `getTable('tablename')`
* Find by ID: `findId('tablename', 'id')`

### To work on

* `where`
