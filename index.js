const fs = require('fs');

const _resetTable = Symbol('resetTable');
const _modifyTable = Symbol('modifyTable');
const _replaceTable = Symbol('replaceTable');
const _initialData = Symbol('initialData');
const _multiCall = Symbol('multiCall');
const _tablePath = Symbol('tablePath');

class Rejs {
  constructor() {
    if (fs.existsSync('selfup-rejs')) {
      return null;
    }

    fs.mkdirSync('selfup-rejs');

    return null;
  }

  createTable(tableName) {
    if (fs.existsSync(this[_tablePath](tableName))) {
      return null;
    }

    this[_resetTable](tableName);

    return null;
  }

  createTables() {
    return Array.from(arguments).map((table) => this.createTable(table));
  }

  newData(tableName, data) {
    this[_modifyTable](tableName, (t) => (t[t[0].nextId++] = data));
  }

  newDatas() {
    return Array.from(arguments).map((arg) => this.newData(arg[0], arg[1]));
  }

  deleteById(tableName, id) {
    this[_modifyTable](tableName, (t) => delete t[id]);
  }

  dropTable(tableName) {
    fs.unlinkSync(this[_tablePath](tableName));
  }

  dropTables() {
    return this[_multiCall](Array.from(arguments), this.dropTable);
  }

  updateTable(tableName, data) {
    this[_resetTable](tableName);

    this.newData(tableName, data);
  }

  updateTables() {
    return Array.from(arguments).map((arg) => this.updateTable(arg[0], arg[1]));
  }

  getTable(tableName) {
    const file = fs.readFileSync(this[_tablePath](tableName), 'utf-8');

    return JSON.parse(file);
  }

  getTables() {
    return this[_multiCall](Array.from(arguments), this.getTable);
  }

  findId(tableName, id) {
    return this.getTable(tableName)[id];
  }

  where(tableName, prop) {
    const whereTable = this.getTable(tableName);
    const records = Object.values(whereTable);

    records.shift();

    return records.filter((record) => JSON.stringify(record).includes(prop));
  }

  [_multiCall](args, fn) {
    return args.map((table) => fn.call(this, table));
  }

  [_replaceTable](tableName, data) {
    fs.writeFileSync(this[_tablePath](tableName), JSON.stringify(data));
  }

  [_tablePath](tableName) {
    if (typeof tableName !== 'string' || tableName.length === 0) {
      throw new TypeError('Table name must be a non-empty string');
    }

    const escapesTable = tableName === '.' || tableName === '..';
    const hasSeparator = /[\\/\0]/.test(tableName);

    if (escapesTable || hasSeparator) {
      throw new Error(`Invalid table name: ${tableName}`);
    }

    return `./selfup-rejs/${tableName}`;
  }

  [_resetTable](tableName) {
    this[_replaceTable](tableName, this[_initialData](tableName));
  }

  [_modifyTable](tableName, fn) {
    const table = this.getTable(tableName);

    fn(table);

    this[_replaceTable](tableName, table);
  }

  [_initialData](table) {
    const nextId = 1;

    return { '0': { table, nextId } };
  }
}

module.exports = Rejs;
