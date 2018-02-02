//model/invoices.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var InvoiceSchema = new Schema({
 date: Date,
 invoiceNum: String,
 productId: String,
 name: String,
 qty: Number,
 price: Number,
 vendor: String
});
//export our module to use in server.js
var Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
