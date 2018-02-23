import React from 'react'
import { connect } from 'react-redux';
import {Navigation} from './components/Navigation'
import {MenuItem} from 'react-bootstrap'
import {Switch, Route} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Invoices from './components/Invoices'
import InvoiceDetail from './components/InvoiceDetail'
import Vendors from './components/Vendors'
import VendorDetail from './components/VendorDetail'
import {NotFoundPage} from './components/NotFoundPage'
import {Loading} from './components/Loading'
import {APP_LOAD, GET_VENDORS_LIST, GET_PRODUCTS_LIST} from './constants/actionTypes'
import agent from './agent'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    vendors: state.vendors
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  getVendorsList: (payload) =>
    dispatch({ type: GET_VENDORS_LIST, payload}),
  getProductsList: (payload) =>
    dispatch({ type: GET_PRODUCTS_LIST, payload})
});

class App extends React.Component {
  componentDidMount = () => {
    this.props.onLoad()
    this.props.getVendorsList(agent.Vendors.all())
    this.props.getProductsList(agent.Products.all())
  }
  render () {
    const {appLoaded, vendors} = this.props
    const vendorsList = vendors.map((item, index) => <LinkContainer key={index} to={`/vendors/${item._id}`}><MenuItem eventKey={(index+1) / 10 + 4}>{item.name}</MenuItem></LinkContainer>)
    if (appLoaded) {
      return (
          <div>
            <Navigation vendors={vendorsList}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path='/products' component={Products} />
              <Route exact path='/products/new' component={ProductDetail} />
              <Route path='/products/:id' component={ProductDetail} />
              <Route exact path='/vendors' component={Vendors} />
              <Route path='/vendors/:id' component={VendorDetail} />
              <Route exact path='/invoices' component={Invoices} />
              <Route exact path='/invoices/new' component={InvoiceDetail} />
              <Route path='/invoices/:number' component={InvoiceDetail} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        )
      } else {
        return (
          <div>
            <Navigation />
            <Loading />
          </div>
        )
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)
