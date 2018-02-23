import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {ProductsList} from './ProductsList'
import ProductDetail from './ProductDetail'

export const Products = ({products, product, vendors, handleInput, handleSubmit, setActiveItem}) => (
  <Switch>
    <Route exact path='/products' render={props => <ProductsList products={products} {...props} />} />
    <Route exact path='/products/new' render={props => <ProductDetail isNew={true} product={product} vendors={vendors} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} data-page='product' {...props} />} />
    <Route path='/products/:id' data-page='product' render={props => <ProductDetail product={product} vendors={vendors} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} data-page='product' {...props} />} />
  </Switch>
)
