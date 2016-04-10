# Selfup - Rejs

Installation: `npm install selfup-rejs`

Load package:

    const selfupRejs = require('selfup-rejs')
    const rejs = new selfupRejs

Create a table: `rejs.createTable('tablename')`

Add data to table: `rejs.newData('tablename', jsonObject)`

Delete data by ID in a table: `rejs.deleteById('tablename', '2')`

### To work on

* `findBy` propperty
* `where` search
* More error handling
