'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema ({
  name: {type:String, required:true},
  description: {type:String, require:false}
});

products.pre('save', function (next) {
  this.name = this.name.toUpperCase();
  next();
});

const product = mongoose.model('product', products);

class Products {

  constructor() {
  }

  get(_id) {
    let queryObject =  _id ? {_id} : {};
    return product.find(queryObject);
  }

  post(record) {
    let newRecord = new product(record);
    return newRecord.save();
  }

  put(_id, record) {
    return product.findByIdAndUpdate(_id,record, {new: true});
  }

  delete(_id) {
    return product.findByIdAndDelete(_id);
  }

}

module.exports = Products;
