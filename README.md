# Selfup - Rejs

Installation: `npm install selfup-rejs --save`

Load package:

    const selfupRejs = require('selfup-rejs')
    const rejs = new selfupRejs

Create a table: `rejs.createTable('tablename')`

Add data to table: `rejs.newData('tablename', dataObject)`

Delete data by ID in a table: `rejs.deleteById('tablename', '2')`

Drop a table: `rejs.dropTable('tablename')`

Replace/Overwrite a table: `writeToTable(tablename, dataObject)`

### To work on

* `findBy` propperty
* `where` search
* More error handling
