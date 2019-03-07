'use strict';

const uuid = require('uuid/v4');

const schema = {
  id: {require: true},
  name: {require: true}
};

class Products {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter(record => record.id === id) : this.database;
    return Promise.resolve(response);
  }
  
  post(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) {this.database.push(record);}
    return Promise.resolve(record);
  }

  put(id, entry) {
    let record = this.sanitize(entry);
    if(record.id) {this.database = this.database.map(item => (item.id === id) ? record : item);}
  }

  delete(id) {
    this.database = this.database.filter(record => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {
    let valid = true;
    let record = {};

    Object.keys(schema).forEach(data => {
      if (schema[data].required) {
        if(entry[data]) {record[data] = entry[data];}
        else {valid = false;}}
      else {record[data] = entry[data];}});
    if(valid === false) {return record;}
  }

}

module.exports = Products;
