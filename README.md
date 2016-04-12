# Selfup - Rejs

**File based database! Built for developer freedom.**

Installation: `npm install selfup-rejs --save`

Load package:

    const selfupRejs = require('selfup-rejs')
    const rejs = new selfupRejs

### How to Use:

Using RESTful verbs to help explain from a high level what is happening.

This is not a server.

This is a database that writes and reads files on the server.

* (POST)   Create a table: `rejs.createTable('tablename')`
* (POST)   Add data to table: `rejs.newData('tablename', dataObject)`
* (DELETE) Delete data by ID in a table: `rejs.deleteById('tablename', '2')`
* (DELETE) Drop a table: `rejs.dropTable('tablename')`
* (PUT)    Replace/Overwrite a table: `rejs.updateTable('tablename', dataObject)`
* (GET)    Table Object Query: `rejs.getTable('tablename')`
* (GET)    Find by ID: `rejs.findId('tablename', 'id')`
* (GET)    Where/Select: `rejs.where('tablename', 'any value in a flat object')`

Video on how to use selfup-rejs: ![Link to Youtube Vid](https://www.youtube.com/watch?v=dVTePMkw9EE&feature=youtu.be&a)
