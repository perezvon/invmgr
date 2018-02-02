const express = require('express');
const router = express.Router();
const _ = require('underscore')
const moment = require('moment')
const mailService = require('./mailService')
const Product = require('./model/products');
const Vendor = require('./model/vendors');
const Invoice = require('./model/invoices');
//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//adding the /products route to our /api router
router.route('/products')
  //retrieve all products from the database
  .get(function(req, res) {
    //looks at our Product Schema
    Product.find(function(err, products) {
      if (err)
        res.send(err);
      //responds with a json object of our database products.
      res.json(products)
    });
  })
  //post new product to the database
  .post(function(req, res) {
    var product = new Product();
    for (var key in req.body) {
      req.body[key] ? product[key] = req.body[key] : null;
    }
    console.log(product)
    product.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Product successfully added!' });
    });
  });

//Adding a route to a specific product based on the database ID
router.route('/products/:product_id')
//The put method gives us the chance to update our product based on the ID passed to the route
  .put(function(req, res) {
    Product.findById(req.params.product_id, function(err, product) {
      if (err)
        res.send(err);
      //check for field changes
      for (var key in req.body) {
        req.body[key] ? product[key] = req.body[key] : null;
      }
      //save product
      product.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Product has been updated' });
      });
    });
  })
  //delete method for removing a product from our database
  .delete(function(req, res) {
    //selects the product by its ID, then removes it.
    Product.remove({ _id: req.params.product_id }, function(err, product) {
      if (err)
        res.send(err);
      res.json({ message: 'Product has been deleted' })
    })
  });
  //adding the /vendors route to our /api router
  router.route('/vendors')
    //retrieve all vendors from the database
    .get(function(req, res) {
      //looks at our Vendor Schema
      Vendor.find(function(err, vendors) {
        if (err)
          res.send(err);
        //responds with a json object of our database vendors.
        res.json(vendors)
      });
    })
    //post new vendor to the database
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

  //Adding a route to a specific vendor based on the database ID
  router.route('/vendors/:vendor_id')
  //The put method gives us the chance to update our vendor based on the ID passed to the route
    .put(function(req, res) {
      Vendor.findById(req.params.vendor_id, function(err, vendor) {
        if (err)
          res.send(err);
        //check for field changes
        for (var key in req.body) {
          req.body[key] ? vendor[key] = req.body[key] : null;
        }
        console.log(vendor)
        //save vendor
        vendor.save(function(err) {
          if (err)
            res.send(err);
          res.json({ message: 'Vendor has been updated' });
        });
      });
    })
    //delete method for removing a vendor from our database
    .delete(function(req, res) {
      //selects the vendor by its ID, then removes it.
      Vendor.remove({ _id: req.params.vendor_id }, function(err, vendor) {
        if (err)
          res.send(err);
        res.json({ message: 'Vendor has been deleted' })
      })
    });
    //adding the /invoices route to our /api router
    router.route('/invoices')
      //retrieve all invoices from the database
      .get(function(req, res) {
        //looks at our Invoice Schema
        Invoice.find(function(err, invoices) {
          if (err)
            res.send(err);
          //responds with a json object of our database invoices.
          res.json(invoices)
        });
      })
      //post new invoice to the database
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

    //Adding a route to a specific invoice based on the database ID
    router.route('/invoices/:invoice_id')
    //The put method gives us the chance to update our invoice based on the ID passed to the route
      .put(function(req, res) {
        Invoice.findById(req.params.invoice_id, function(err, invoice) {
          if (err)
            res.send(err);
          //check for field changes
          for (var key in req.body) {
            req.body[key] ? invoice[key] = req.body[key] : null;
          }
          console.log(invoice)
          //save invoice
          invoice.save(function(err) {
            if (err)
              res.send(err);
            res.json({ message: 'Invoice has been updated' });
          });
        });
      })
      //delete method for removing a invoice from our database
      .delete(function(req, res) {
        //selects the invoice by its ID, then removes it.
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
          const uniqueVendors = _.uniq(req.body.map(i => i.vendor).sort())
          uniqueVendors.forEach(v => {
            data.push(req.body.filter(d => d.vendor === v));
          })
          data.forEach(array => {
            const vendorOrderHtml = array.map(x => '<tr><td>' + x.productId + '</td><td>' + x.name + '</td><td>' + x.qty + '</td></tr>').toString().replace(/,/g , '');
            const vendorOrderText = array.map(x => x.productId + '--' + x.name + '--' + x.qty + '\n').toString().replace(/,/g , '');
            let email = Vendor.findOne({name: array[0].vendor}, 'contact_email_1', (err, email) => {
              if (!!email) {
                let mailOptions = {
                    from: company, // sender address
                    to: email.contact_email_1,// list of receivers
                    subject: 'Order from ' + companyName + '—' + moment().add(1, 'days').format('MM/DD/YYYY'), // Subject line
                    text: array[0].vendor + '\n' + 'Product # -- Name -- QTY \n' + vendorOrderText, // plain text body
                    html: '<h2 style="color: #999;">Hello,</h2> <p>Please see the below order. Let me know if there are any questions. Thanks!</p><p>' + array[0].vendor + '</p>' + '<table style="border: 1px solid black; border-collapse:collapse; width:100%;"><thead><th>Product#</th><th>Name</th><th>QTY</th></thead><tbody>'+vendorOrderHtml+'</tbody></table>' // html body
                };
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
          //get each vendor email
          //create email templates for each vendor


          res.json({message: 'Emails sent'})
        })

module.exports = router;
