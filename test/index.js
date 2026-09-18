const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('chai').assert;
const Rejs = require('../index.js');

describe('Rejs', function () {
  before(function () {
    this.cwd = process.cwd();
    this.tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rejs-'));
    process.chdir(this.tmpDir);
  });

  after(function () {
    process.chdir(this.cwd);
    fs.rmSync(this.tmpDir, { recursive: true, force: true });
  });

  beforeEach(function () {
    this.rejs = new Rejs();
    this.rejs.createTable('testOne');
  });

  afterEach(function () {
    this.rejs.dropTable('testOne');
  });

  describe('table name validation', function () {
    it('rejects a name containing a forward slash', function () {
      assert.throws(() => this.rejs.createTable('../escape'));
    });

    it('rejects a name containing a backslash', function () {
      assert.throws(() => this.rejs.createTable('..\\escape'));
    });

    it('rejects a parent directory name', function () {
      assert.throws(() => this.rejs.createTable('..'));
    });

    it('rejects the current directory name', function () {
      assert.throws(() => this.rejs.createTable('.'));
    });

    it('rejects an empty name', function () {
      assert.throws(() => this.rejs.createTable(''));
    });

    it('rejects a non-string name', function () {
      assert.throws(() => this.rejs.createTable(42));
    });

    it('rejects a traversal name on read', function () {
      assert.throws(() => this.rejs.getTable('../../etc/passwd'));
    });

    it('rejects a traversal name on write', function () {
      assert.throws(() => this.rejs.newData('../escape', { test: 'data' }));
    });
  });

  describe('createTable', function () {
    it('does not overwrite an existing table', function () {
      this.rejs.newData('testOne', { test: 'kept data' });
      this.rejs.createTable('testOne');

      const expected = {
        '0': { table: 'testOne', nextId: 2 },
        '1': { test: 'kept data' },
      };

      assert.deepEqual(expected, this.rejs.getTable('testOne'));
    });
  });

  describe('getTable and newData', function () {
    it('appends new data and returns all the appended data', function () {
      this.rejs.newData('testOne', { test: 'test data 1' });
      this.rejs.newData('testOne', { test: 'test data 2' });

      const expected = {
        '0': { table: 'testOne', nextId: 3 },
        '1': { test: 'test data 1' },
        '2': { test: 'test data 2' },
      };

      assert.deepEqual(expected, this.rejs.getTable('testOne'));
    });
  });

  describe('where', function () {
    it('selects records that have a matching key', function () {
      this.rejs.newData('testOne', { test: 'test data 1' });
      this.rejs.newData('testOne', { test: 'test data 2' });
      this.rejs.newData('testOne', { test: 'test data 1' });
      this.rejs.newData('testOne', { test: 'test data 4' });

      const expected = [{ test: 'test data 1' }, { test: 'test data 1' }];
      assert.deepEqual(expected, this.rejs.where('testOne', 'test data 1'));
    });
  });

  describe('findId', function () {
    it('returns the matching record if one exists', function () {
      this.rejs.newData('testOne', { test: 'test data 1' });
      this.rejs.newData('testOne', { test: 'test data 2' });

      assert.deepEqual(
        { test: 'test data 1' },
        this.rejs.findId('testOne', '1'),
      );
      assert.deepEqual(
        { test: 'test data 2' },
        this.rejs.findId('testOne', '2'),
      );
      assert.equal(null, this.rejs.findId('testOne', '3'));
    });
  });

  describe('deleteById', function () {
    it('deletes the correct object by ID in the correct table', function () {
      this.rejs.newData('testOne', { test: 'test data 1' });
      this.rejs.newData('testOne', { test: 'test data 2' });
      this.rejs.deleteById('testOne', '2');
      assert.equal(null, this.rejs.findId('testOne', '2'));
    });

    it('does not reuse the id of a deleted record', function () {
      this.rejs.newData('testOne', { test: 'test data 1' });
      this.rejs.newData('testOne', { test: 'test data 2' });
      this.rejs.deleteById('testOne', '2');
      this.rejs.newData('testOne', { test: 'test data 3' });

      const expected = {
        '0': { table: 'testOne', nextId: 4 },
        '1': { test: 'test data 1' },
        '3': { test: 'test data 3' },
      };

      assert.deepEqual(expected, this.rejs.getTable('testOne'));
    });
  });

  describe('updateTable', function () {
    it('replaces the data in a table', function () {
      this.rejs.newData('testOne', { test: 'old data' });
      this.rejs.updateTable('testOne', { test: 'new data' });
      const expected = {
        '0': { table: 'testOne', nextId: 2 },
        '1': { test: 'new data' },
      };
      assert.deepEqual(expected, this.rejs.getTable('testOne'));
    });
  });

  describe('getTables: two', function () {
    it('returns an array of two tables', function () {
      this.rejs.createTable('firstTable');
      this.rejs.createTable('secondTable');

      const expected = [
        { '0': { table: 'firstTable', nextId: 1 } },
        { '0': { table: 'secondTable', nextId: 1 } },
      ];
      const tbls = this.rejs.getTables('firstTable', 'secondTable');

      assert.deepEqual(expected, tbls);

      this.rejs.dropTable('firstTable');
      this.rejs.dropTable('secondTable');
    });
  });

  describe('getTables: three', function () {
    it('returns an array of four tables', function () {
      this.rejs.createTable('firstTable');
      this.rejs.createTable('secondTable');
      this.rejs.createTable('thirdTable');
      this.rejs.createTable('fourthTable');

      const expected = [
        { '0': { table: 'firstTable', nextId: 1 } },
        { '0': { table: 'secondTable', nextId: 1 } },
        { '0': { table: 'thirdTable', nextId: 1 } },
      ];

      const tbls = this.rejs.getTables(
        'firstTable',
        'secondTable',
        'thirdTable',
      );

      assert.deepEqual(expected, tbls);

      this.rejs.dropTable('firstTable');
      this.rejs.dropTable('secondTable');
      this.rejs.dropTable('thirdTable');
    });
  });

  describe('getTables: four - dropTables: four - createTable: four', function () {
    it('gets 4 - drops 4 - creates 4: tables', function () {
      this.rejs.createTables(
        'firstTable',
        'secondTable',
        'thirdTable',
        'fourthTable',
      );

      const expected = [
        { '0': { table: 'firstTable', nextId: 1 } },
        { '0': { table: 'secondTable', nextId: 1 } },
        { '0': { table: 'thirdTable', nextId: 1 } },
        { '0': { table: 'fourthTable', nextId: 1 } },
      ];

      const tbls = this.rejs.getTables(
        'firstTable',
        'secondTable',
        'thirdTable',
        'fourthTable',
      );

      assert.deepEqual(expected, tbls);

      this.rejs.dropTables(
        'firstTable',
        'secondTable',
        'thirdTable',
        'fourthTable',
      );
    });
  });

  describe('newDatas and updateTables', function () {
    it('replaces the data in multiple tables', function () {
      this.rejs.createTables('firstTable', 'secondTable', 'thirdTable');

      this.rejs.newDatas(
        ['firstTable', { test: 'old data' }],
        ['secondTable', { test: 'old data' }],
        ['thirdTable', { test: 'old data' }],
      );

      this.rejs.updateTables(
        ['firstTable', { test: 'new data' }],
        ['secondTable', { test: 'new data' }],
        ['thirdTable', { test: 'new data' }],
      );

      const expected = [
        {
          '0': { table: 'firstTable', nextId: 2 },
          '1': { test: 'new data' },
        },
        {
          '0': { table: 'secondTable', nextId: 2 },
          '1': { test: 'new data' },
        },
        {
          '0': { table: 'thirdTable', nextId: 2 },
          '1': { test: 'new data' },
        },
      ];

      assert.deepEqual(
        expected,
        this.rejs.getTables('firstTable', 'secondTable', 'thirdTable'),
      );

      this.rejs.dropTables('firstTable', 'secondTable', 'thirdTable');
    });
  });

  describe('newAndGetBenchmark', function () {
    it('can append and fetch a good amount of data', function () {
      for (let i = 0; i < 10; i++) {
        this.rejs.newData('testOne', { test: 'test data 2' });
      }
      for (let i = 0; i < 1000; i++) {
        this.rejs.getTable('testOne');
      }
    });
  });
});
