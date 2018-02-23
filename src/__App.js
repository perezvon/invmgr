import React from 'react'
import {Navigation} from './components/Navigation'
import {Grid, MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Main} from './components/Main'
import {Loading} from './components/Loading'
import Papa from 'papaparse'
import _ from 'underscore'
import moment from 'moment'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      vendor: {},
      invoice: {},
      products: {},
      vendors: {},
      invoices: {},
      inventoryNeeds: [],
      currentDate: moment().format('MMMM DD, YYYY'),
      loading: true
    }
  }

  getSubscriptionData = () => {
    fetch('/api/products/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          products: json
        })
      })
      .then(() => {
        fetch('/api/invoices/')
        .then(res => res.json())
        .then(json => {
          json.forEach(i => i.date = moment(i.date).format("MM/DD/YYYY"))
          this.setState({
            invoices: json
          })
        })
      })
      .then(() => {
        fetch('/api/vendors/')
        .then(res => res.json())
        .then(json => {
          this.setState({
            vendors: json
          })
        })
        .then(() => {
          this.setState({
            loading: false
          })
          this.getInventoryNeeds()
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  getInventoryNeeds = () => {
    let toOrder = [];
    this.state.products.forEach(item => {
      let order = {};
      if (item.currentStock < item.parLevel) {
        order.productId = item.productId;
        order.name = item.name;
        order.vendor = item.vendor;
        order.qty = item.parLevel - item.currentStock;
        toOrder.push(order);
      }
    })
    this.setState({
      inventoryNeeds: toOrder
    })
  }

  handleMasterStateUpdate = (e, page) => {
    if (e.target) {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState((prevState) => ({
        [page]: {
          ...prevState[page],
          [name]: value
        }
      }))
    } else {
      const data = e;
      this.setState((prevState) => ({
        [page]: data
      }))
    }
  }

  handleInput = (e, page) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState((prevState) =>({
      [page]: {
        ...prevState[page],
        [name]: value
      }
    }))
  }

  handleSubmit = (e, page, isNew, id) => {
    e.preventDefault();
    const coll = page + 's';
    let data, method, url;
    if (page === 'invoice') {
      method = 'POST'
      url = '/api/' + coll + '/'
      data = this.state.product;
      data.invoiceNum = this.state.invoice.invoiceNum;
      data.date = this.state.invoice.date;
      data.vendor = this.state.invoice.vendor;
      console.log(data)
    } else {
      data = this.state[page]
      method = isNew ? 'POST' : 'PUT';
      url = isNew ? '/api/' + coll + '/' : '/api/' + coll + '/' + id
    }
    const body = JSON.stringify(data);
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    .then((res) => console.log(res.ok))
  }

  handleUpload = (e) => {
    e.preventDefault();
    Papa.parse(e.target.files[0], {
      header: true,
      complete: function(results) {
        results.data.filter(i => !!i.productId).forEach(item => {
          item.location = item.place;
          item.pack = +item.pack;
          item.size = +item.size;
          item.price = +item.price;
          if (item.orderHistory) {
            item.orderHistory = JSON.parse(item.orderHistory)
            item.orderHistory.forEach(i => {
              i.date = moment(i.date);
              i.qty = +i.qty;
              i.price = +i.price;
            })
          }
          delete item.place;
          const json = JSON.stringify(item);
          fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: json
          })
        })
      }
  })
}

  setActiveItem = (page, id) => {
    const coll = page + 's';
    if (coll === 'invoices') {
      let data = {date: moment().format('YYYY-MM-DD')} ;
      if (id) {
        let temp = this.state.invoices.filter(i => i.invoiceNum === id)
        data.invoiceNum = temp[0].invoiceNum;
        data.date = temp[0].date;
        data.vendor = temp[0].vendor;
        data.data = [];
        temp.forEach(line => {
          if (!line.name) line.name = ''
          data.data.push({
            productId: line.productId,
            price: line.price,
            name: line.name,
            qty: line.qty
        })
      })
    }
      this.setState(prevState => ({
        [page]: data
      }))
    } else {
      this.setState(prevState => ({
        [page]: id ? _.first(prevState[coll].filter(i => i._id === id)) : {}
      }));
    }
  }

  submitOrders = (e) => {
    e.preventDefault()
    const body = JSON.stringify(this.state.inventoryNeeds)
    fetch('/api/submitOrders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
    console.log('orders submitted')
  }

  componentDidMount = () => {
    this.getSubscriptionData()
  }

  render () {
    //console.log(this.state)
  const {loading, products, vendors, invoices, product, vendor, invoice, inventoryNeeds} = this.state;
    if (loading) return <Loading />
    else {
        const uniqueInvoiceNums = !_.isEmpty(invoices) ? _.uniq(invoices.filter(i => !!i.invoiceNum).map(i => i.invoiceNum)) : []
        const uniqueInvoices = _.sortBy(uniqueInvoiceNums.map(i => _.find(invoices, j => j.invoiceNum === i)), 'date').reverse()
        const invoiceTableData = [] //!_.isEmpty(invoices) ? invoices.filter(i => i.invoiceNum === invoice.invoiceNum).map((item, index) => {<tr key={index}><td>item.productId</td><td>item.name</td><td>item.qty</td><td>item.price</td></tr>}) : []
        const toOrder = inventoryNeeds.map((item, index) =>
          <tr key={index}><td>{item.vendor}</td><td>{item.productId}</td><td>{item.name}</td><td>{item.qty}</td></tr>
        )
      let vendorsNav = _.sortBy(vendors, 'name')
      vendorsNav = vendorsNav.map((item, index) => <LinkContainer key={index} to={`/vendors/${item._id}`}><MenuItem eventKey={(index+1) / 10 + 4}>{item.name}</MenuItem></LinkContainer>)
      return (
        <div>
          <Navigation vendors={vendorsNav} />
          <Grid>
            <Main
              products={products}
              vendors={vendors}
              invoices={uniqueInvoices}
              product={product}
              vendor={vendor}
              invoice={invoice}
              invoiceTableData={invoiceTableData}
              inventoryNeeds={toOrder}
              handleMasterStateUpdate={this.handleMasterStateUpdate}
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}
              setActiveItem={this.setActiveItem}
              handleUpload={this.handleUpload}
              currentDate={this.state.currentDate}
              submitOrders={this.submitOrders} />
          </Grid>
        </div>
      )
    }
  }
}
