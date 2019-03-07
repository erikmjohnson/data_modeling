'use strict';

const schema = require('./');

class Categories {

  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    let queryObject =  _id ? {_id} : {};
    return this.schema.find(queryObject);
  }
  
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  put(_id, record) {
    return schema.findByIdAndUpdate(_id,record, {new: true});
  }

  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }

}

module.exports = Categories;
