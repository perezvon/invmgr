//batch update products
const Product = require('./model/products');
const moment = require('moment')

Product.find({pack: 1, size: 6, unit: '#10'}, function (err, products) {
  products.forEach(prod => {
    prod.pack = 6;
    prod.size = 1;
    prod.unit = '#10';
    prod.save()
  })
})

//pop out order history from old system
Product.find({}, (err, products) => {
  products.forEach(p => {
    const productId = p.productId;
    const vendor = p.vendor;
    if (p.orderHistory) p.orderHistory.forEach(item => {
      var invoice = new Invoice();
      invoice.productId = productId;
      invoice.date = moment(item.date).toDate();
      invoice.qty = +item.qty;
      invoice.price = +item.price;
      invoice.vendor = vendor;
      invoice.save()
    })
  })
})
