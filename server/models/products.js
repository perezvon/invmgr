//model/products.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var ProductSchema = new Schema({
 name: String,
 productId: String,
 vendor: String,
 pack: Number,
 size: Number,
 unit: String,
 category: String,
 subcategory: String,
 location: String,
 inventoryCode: String,
 price: Number,
 parLevel: Number,
 currentStock: Number,
 orderHistory: [{
   date: Date,
   qty: Number,
   price: Number
  }]
});
//export our module to use in server.js
var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
