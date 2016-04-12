'use strict'

const assert = require('chai').assert;
const r      = require('../re.js')

describe('Rejs', function() {
  beforeEach(function() {
    this.rejs = new r
    this.rejs.createTable('testOne')
  })

  afterEach(function() {
    this.rejs.dropTable('testOne')
  })

  describe('where', function() {
    it('selects records that have a matching key', function() {
      this.rejs.newData('testOne', {test: "test data 1"})
      this.rejs.newData('testOne', {test: "test data 2"})
      this.rejs.newData('testOne', {test: "test data 1"})
      this.rejs.newData('testOne', {test: "test data 4"})

      const expected = [{test: 'test data 1'}, {test: 'test data 1'}]
      assert.deepEqual(expected, this.rejs.where('testOne', 'test data 1'))
    })
  })

  describe('getTable', function() {
    it('returns all the data from the table', function() {
      this.rejs.newData('testOne', {test: "test data 1"})
      this.rejs.newData('testOne', {test: "test data 2"})

      const expected = {
        '0': { table: 'testOne', nextId: 3 },
        '1': { test: 'test data 1' },
        '2': { test: 'test data 2' },
      }

      assert.deepEqual(expected, this.rejs.getTable('testOne'))
    })
  })

  describe('findId', function() {
    it('returns the matching record if one exists', function() {
      this.rejs.newData('testOne', {test: "test data 1"})
      this.rejs.newData('testOne', {test: "test data 2"})
      assert.deepEqual({test: 'test data 1'}, this.rejs.findId('testOne', '1'))
      assert.deepEqual({test: 'test data 2'}, this.rejs.findId('testOne', '2'))
      assert.equal(null,                      this.rejs.findId('testOne', '3'))
    })
  })

  describe('newAndGetBenchmark', function() {
    it('can append and fetch a good amount of data', function() {
      for (let i = 0; i < 10; i++) {
        this.rejs.newData('testOne', {test: "test data 2"})
      }
      for (let i = 0; i < 1000; i++) {
        this.rejs.getTable('testOne')
      }
    })
  })

  describe('updateTable', function() {
    it('replaces the data in a table', function() {
      this.rejs.newData('testOne',     {test: "old data"})
      this.rejs.updateTable('testOne', {test: "new data"})
      const expected = {
        '0': { table: 'testOne', nextId: 2 },
        '1': { test: 'new data' },
      }
      assert.deepEqual(expected, this.rejs.getTable('testOne'))
    })
  })
})
