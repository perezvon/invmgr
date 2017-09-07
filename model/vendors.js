//model/products.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var VendorSchema = new Schema({
 name: String,
 contact_1: String,
 contact_email_1: String,
 address: String
});
//export our module to use in server.js
module.exports = mongoose.model('Vendor', VendorSchema);
