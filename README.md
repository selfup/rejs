# Selfup - Rejs

### File based database! Built for developer freedom. Geared for NodeBots/IoT

#### Event Based Key Value Store:

Made to store hardware data on the filesystem!

**Installation:**

`npm install selfup-rejs --save`


**Warning**

This was built with node 5.10 +

Please make sure your node version supports ES6!

**Ensure your data is safe and not in version control:**

`echo 'selfup-rejs/*' >> .gitignore`

**Load package:**

    const Selfup = require('selfup-rejs')
    const rejs = new Selfup

**Official DOCS:**

Documentation: [right here!](https://github.com/selfup/rejs/blob/master/DOCS.md)

### Example Use Case Repos:

**Raspberry Pi**

`NodeBots/JohnnyFive` and logging event data: [Repo](https://github.com/selfup/rpi-rejs)

**Arduino**

`NodeBots/JohnnyFive` and logging event data: [Repo](https://github.com/selfup/arduino-rejs)

### Video on how to use selfup-rejs:

[Link to Youtube Vid](https://www.youtube.com/watch?v=dVTePMkw9EE&feature=youtu.be&a)

### How to Use:

Using RESTful verbs to help explain from a high level what is happening.

This is not a server.

This is a database that writes and reads files on the server.

**Verbs/Methods**

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

### Potential use Cases:

#### JohnnyFive/NodeBots/IoT

* Store temperature data over time
* Store how many times a door has been opened
* Store telemetry data
* Store Data on a Raspberry Pi
* Store Data on a server hooked up to an Arduino
* Store Data on an Arduino Yun/BeagleBone/etc...
* Many possibilities for IoT

#### Electron OSX/Windows Apps

* Store file paths to load files needed on load
* Store small notes for a twitter like notes app
* Store image url's
* Store any data that you need to persist from app shutdown back to open

#### VPS

* Use it as a small DB for a low volume production app
* Use it to get quickly set up, and then move on to Mongo/Postgres once your app is mature and MVP is proven

### Test Coverage

#### To get 100% coverage:

If the `selfup-rejs` folder is in your directory:

```
npm install
rm -rf selfup-rejs
```

Then you can run:

`./node_modules/.bin/istanbul cover _mocha`

Now the selfup-rejs folder will be in your directory again!

![](http://i.imgur.com/CAEz4uU.png)

#### To run tests without coverage:

`npm test`
