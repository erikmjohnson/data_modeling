'use strict';

const uuid = require('uuid/v4');

const schema = {
  id: {require: true},
  name: {require: true},
  description: {require:false}
};

schema.pre('save', function (next) {
  this.name = this.name.toUpperCase();
  next();
});

class Products {

  constructor() {
  }

  get(_id) {
    let queryObject =  _id ? {_id} : {};
    return schema.find(queryObject);
  }

  post(record) {
    let newRecord = new schema(record);
    return newRecord.save();
  }

  put(_id, record) {
    return schema.findByIdAndUpdate(_id,record, {new: true});
  }

  delete(_id) {
    return schema.findByIdAndDelete(_id);
  }

}

module.exports = Products;
