const express = require('express');
const router = express.Router();
const _ = require('underscore')
const moment = require('moment')
const mailService = require('./mailService')
const Product = require('./models/products');
const Vendor = require('./models/vendors');
const Invoice = require('./models/invoices');

//routes for POS integrations
const squareConnect = require('./integrations/square/index')
const revelConnect = require('./integrations/revel/index')

router.get('/square', function(req, res) {
  squareConnect.getInventoryData(data => {
    res.json(data)
  })
})

router.get('/revel', function(req, res) {
  revelConnect.getInventoryData(data => {
    res.json(data)
  })
})

//application API routes

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/products')
  .get(function(req, res) {
    Product.find(function(err, products) {
      if (err)
        res.send(err);
      res.json(products)
    });
  })
  .post(function(req, res) {
    var product = new Product();
    for (var key in req.body.product) {
      req.body.product[key] ? product[key] = req.body.product[key] : null;
      console.log(key, product[key])
    }
    console.log(product)
    product.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Product successfully added!' });
    });
  });

router.route('/products/:product_id')
  .get(function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        res.send(err);
      res.json(product)
    })
  })
  .put(function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        res.send(err);
      for (var key in req.body.product) {
        if (key !== '_id' && key !=='__v') {
        product[key] = req.body.product[key] ? req.body.product[key] : null;
        }
      }
      product.save(function(err) {
        if (err)
          res.send(err);
        res.json(product);
      });
    });
  })
  .delete(function(req, res) {
    Product.remove({ _id: req.params.product_id }, function(err, product) {
      if (err)
        res.send(err);
      res.json({ message: 'Product has been deleted' })
    })
  });

  router.route('/vendors')
    .get(function(req, res) {
      Vendor.find(function(err, vendors) {
        if (err)
          res.send(err);
        res.json(vendors)
      });
    })
    .post(function(req, res) {
      var vendor = new Vendor();
      for (var key in req.body) {
        req.body[key] ? vendor[key] = req.body[key] : null;
      }
      vendor.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Vendor successfully added!' });
      });
    });

  router.route('/vendors/:vendor_id')
    .get(function(req, res) {
      Vendor.findById(req.params.vendor_id, function(err, vendor) {
        if (err)
          res.send(err);
        res.json(vendor)
      })
    })
    .put(function(req, res) {
      Vendor.findById(req.params.vendor_id, function(err, vendor) {
        if (err)
          res.send(err);
        for (var key in req.body) {
          req.body[key] ? vendor[key] = req.body[key] : null;
        }
        console.log(vendor)
        vendor.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Vendor has been updated' });
        });
      });
    })
    .delete(function(req, res) {
      Vendor.remove({ _id: req.params.vendor_id }, function(err, vendor) {
        if (err)
          res.send(err);
        res.json({ message: 'Vendor has been deleted' })
      })
    });
    router.route('/invoices')
      .get(function(req, res) {
        Invoice.find(function(err, invoices) {
          if (err)
            res.send(err);
          res.json(invoices)
        });
      })
      .post(function(req, res) {
        var invoice = new Invoice();
        console.log(req.headers)
        for (var key in req.body) {
          req.body[key] ? invoice[key] = req.body[key] : null;
        }
        console.log(invoice)
        invoice.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Invoice successfully added!' });
          res.end()
        });
      });

    router.route('/invoices/:invoice_id')
      .get(function(req, res) {
        Invoice.findOne({invoiceNum: req.params.invoice_id}, function(err, invoice) {
          if (err)
            res.send(err);
          res.json(invoice)
        })
      })
      .put(function(req, res) {
        Invoice.findById(req.params.invoice_id, function(err, invoice) {
          if (err)
            res.send(err);
          for (var key in req.body.invoice) {
            req.body.invoice[key] ? invoice[key] = req.body.invoice[key] : null;
          }
          console.log(invoice)
          invoice.save(function(err) {
            if (err)
              res.send(err);
            res.json({ message: 'Invoice has been updated' });
          });
        });
      })
      .delete(function(req, res) {
        Invoice.remove({ _id: req.params.invoice_id }, function(err, invoice) {
          if (err)
            res.send(err);
          res.json({ message: 'Invoice has been deleted' })
        })
      });

      //route to send email orders to vendors
      router.route('/submitOrders')
        .post(function(req, res) {
          const company = process.env.COMPANY_EMAIL || '"orders" <orders@distantbluesoftware.com>'
          const companyName = process.env.COMPANY_NAME || "Distant Blue Software"
          let data = [];
          const uniqueVendors = _.uniq(req.body.orders.map(i => i.vendor).sort())
          uniqueVendors.forEach(v => {
            data.push(req.body.orders.filter(d => d.vendor === v));
          })
          data.forEach(array => {
            const vendorOrderHtml = array.map(x => '<tr><td>' + x.productId + '</td><td>' + x.name + '</td><td>' + x.qty + ' ' + x.unit + '</td></tr>').toString().replace(/,/g , '');
            const vendorOrderText = array.map(x => x.productId + '--' + x.name + '--' + x.qty + '\n').toString().replace(/,/g , '');
            let email = Vendor.findOne({name: array[0].vendor}, 'contact_email_1', (err, email) => {
              if (email) {
                let mailOptions = {
                    from: company, // sender address
                    to: email.contact_email_1,// list of receivers
                    subject: 'Order from ' + companyName + '—' + moment().add(1, 'days').format('MM/DD/YYYY'), // Subject line
                    text: array[0].vendor + '\n' + 'Product # -- Name -- QTY \n' + vendorOrderText, // plain text body
                    html: '<h2 style="color: #999;">Hello,</h2> <p>Please see the below order. Please round quantities up to the nearest whole case where required. Reply to this email with any questions. Thanks!</p><p>' + array[0].vendor + '</p>' + '<table style="border: 1px solid black; border-collapse:collapse; width:100%;"><thead><th>Product#</th><th>Name</th><th>QTY</th></thead><tbody>'+vendorOrderHtml+'</tbody></table>' // html body
                };
                console.log(mailOptions)
                // send mail with defined transport object
                mailService.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
            })
          })

          res.json({message: 'Emails sent'})
        })

module.exports = router;
