# This is the Documentation for selfup-rejs

### Things to consider:

##### As @cite-reader mentioned in this [issue](https://github.com/selfup/rejs/issues/13):


*This database is only as strong as the `fs.writeFileSync` method provided by the `fs` module API
*This mean that is there is a power failure or what have you during a table update/write event, your data will more than likely be lost forever!

* If you can read javascript tests, skip the docs and just go read the tests!
* They are pretty verbose and will get you up to speed on how things work.
* If you like videos, here is a link to the quick demo vid from the README: [vid](https://www.youtube.com/watch?v=dVTePMkw9EE&feature=youtu.be&a)
* If you are not familiar with Javascript Testing Frameworks keep reading!

# How this DB works:

* (POST)   Create a table: `rejs.createTable('tablename')`
* (POST)   Create Multiple Tables: `rejs.createTables('one', 'two', 'three')`
* (POST)   Add data to table: `rejs.newData('tablename', dataObject)`
* **(POST)   Add data to Multiple Tables:**
```
rejs.newDatas(
  ['firstTable', {test: "data"}],
  ['secondTable', {test: "data"}],
  ['thirdTable', {test: "data"}]
)
```
* (DELETE) Delete data by ID in a table: `rejs.deleteById('tablename', '2')`
* (DELETE) Drop a table: `rejs.dropTable('tablename')`
* (DELETE) Multi-Table Drop: `rejs.dropTables('firstTable', 'secondTable')`
* (PUT)    Replace/Overwrite a table: `rejs.updateTable('tablename', dataObject)`
* **(PUT)    Replace/Overwrite Multiple tables:**
```
rejs.updateTables(
  ['firstTable', {test: "new data"}],
  ['secondTable', {test: "new data"}],
  ['thirdTable', {test: "new data"}]
)
```
* (GET)    Table Object Query: `rejs.getTable('tablename')`
* (GET)    Multi-Table Query: `rejs.getTables('table', 'table2', 'table3')`
* (GET)    Find by ID: `rejs.findId('tablename', 'id')`
* (GET)    Where/Select: `rejs.where('tablename', 'any value in a flat object')`

# Examples below:

*In each example, I call a `createTable('someTableName')` to mimic developer behavior. However I don't always call `rejs.dropTable('someTableName')` because each example is to be considered a new, independent example.*

*I create the data for each example so that the steps needed for each method is clear.*

How to have access to the package:

```
const Selfup = require('selfup-rejs')
const rejs = new Selfup
```

This will make the `selfup-rejs` library available in your program.

**createTable**

`rejs.createTable('exampleOne')`

There will now be a folder called 'selfup-rejs'
This folder will now contain a file with no extension named: exampleOne

Create table will not re-create a new table if it already exist!

Inside of this file will be some basic metadata about the table
You will find an example like so: `'0': { table: 'testOne', nextId: 3 }`

This is to never be deleted. This data is required for the database to function.
It also makes your life easier!

**createTables**

`rejs.createTables('one', 'two', 'three')`

There will now be a folder called 'selfup-rejs'
This folder will now contain three files with no extension named:

one, two, and three

Create tables will not re-create new tables if they already exist!

**newData**

```
rejs.createTable('exampleOne')
rejs.newData('exampleOne', {exampleData: "some example stuff"})
```

Now your exampleData table will have the new object appended to the table.
A new ID will point to the object you appended. These ID's are event logs.

What you will find in the table:

```
{
  '0': { table: 'exampleOne', nextId: 2 },
  '1': { exampleData: 'some example stuff' },
}
```

**newDatas**

Works like above, just use arrays as arguments like in the REST verbs section.

**dropTable**

`rejs.dropTable('exampleOne')`

The table/file for exampleOne will now be deleted!

**dropTables**

```
rejs.createTable('firstTable')
rejs.createTable('firstTable')

rejs.dropTables('firstTable', 'secondTable')
```

Now all tables given as arguments will be dropped!

**updateTable**

```
rejs.createTable('testOne')
rejs.newData('testOne',     {test: "old data"})

rejs.updateTable('testOne', {test: "new data"})
```

What you find in the table:

```
{
  '0': { table: 'testOne', nextId: 2 },
  '1': { test: 'new data' },
}
```

As you can see, the old data has been wiped/replaced
The exampleOne data will be wiped/replaced with the new data.
The metadata will go in first, and then the new object will go in right after.

**updateTables**

Works like above, just use arrays as arguments like in the REST verbs section.

**findId**

```
rejs.createTable('testOne')
rejs.newData('testOne', {test: "old data"})

rejs.findId('testOne', '1')
```

You will now have have access to/be returned: `{test: "old data"}`

**deleteById**

```
rejs.createTable('testOne')
rejs.newData('testOne', {test: "old data"})

rejs.deleteById('testOne', '1')
```

You will now just have the metadata left in your table.
If you have 20 ID's, you can remove '16' and keep the rest!

**getTable**

```
rejs.createTable('testOne')
rejs.newData('testOne', {test: "old data"})

rejs.getTable('testOne')
```

This will return the entire table!

```
{
  '0': { table: 'testOne', nextId: 2 },
  '1': { test: "old data" },
}
```

**getTables**

```
rejs.createTable('testOne')
rejs.newData('testOne', {test: "old data"})
rejs.deleteById('testOne', '1')

rejs.createTable('exampleOne')
rejs.newData('exampleOne', {exampleData: "some example stuff"})

rejs.getTables('exampleOne', 'testOne')
```

This will return both tables in a flat array:

```
[
  {
    '0': { table: 'exampleOne', nextId: 2 },
    '1': { exampleData: 'some example stuff' },
  },
  {
    '0': { table: 'testOne', nextId: 2 },
    '1': { test: "old data" },
  }
]
```

**where**

```
rejs.createTable('exampleOne')
rejs.newData('exampleOne', {exampleData: "some example stuff"})
rejs.newData('exampleOne', {exampleData: "top level text"} )
rejs.newData('exampleOne', {exampleData: "top level text"})

rejs.where('exampleOne', 'top level text')
```

This will return an array of all objects with the string searched for at the top level of the objects:

```
[
  {exampleData: "top level text"},
  {exampleData: "top level text"}
]
```
