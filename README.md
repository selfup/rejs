# Selfup - Rejs

### File based database! Built for developer freedom. Geared for NodeBots and IoT

**Installation:**

`npm install selfup-rejs --save`

**Ensure your data is safe and not in version control:**

`echo 'selfup-rejs/*' >> .gitignore`

**Load package:**

    const Selfup = require('selfup-rejs')
    const rejs = new Selfup

### How to Use:

* Using RESTful verbs to help explain from a high level what is happening.
* This is not a server.
* This is a database that writes and reads files on the server.


* (POST)   Create a table: `rejs.createTable('tablename')`
* (POST)   Add data to table: `rejs.newData('tablename', dataObject)`
* (DELETE) Delete data by ID in a table: `rejs.deleteById('tablename', '2')`
* (DELETE) Drop a table: `rejs.dropTable('tablename')`
* (PUT)    Replace/Overwrite a table: `rejs.updateTable('tablename', dataObject)`
* (GET)    Table Object Query: `rejs.getTable('tablename')`
* (GET)    Multi-Table Query: `rejs.getTables('table', 'table2', 'table3')`
* (GET)    Find by ID: `rejs.findId('tablename', 'id')`
* (GET)    Where/Select: `rejs.where('tablename', 'any value in a flat object')`

### Video on how to use selfup-rejs:

[Link to Youtube Vid](https://www.youtube.com/watch?v=dVTePMkw9EE&feature=youtu.be&a)

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

#### To run tests without coverage:

`npm test`

Pictures of coverage since I gitignored the coverage folder:

![](http://i.imgur.com/doE5Iex.png)

![](http://i.imgur.com/9E969Dp.png)
