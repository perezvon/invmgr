import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import common from './reducers/common'
import product from './reducers/product'
import products from './reducers/products'
import invoice from './reducers/invoice'
import invoices from './reducers/invoices'
import vendors from './reducers/vendors'

export default combineReducers({
  common,
  products,
  product,
  invoice,
  invoices,
  vendors,
  router: routerReducer
})
