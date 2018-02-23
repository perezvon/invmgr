import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Home} from './Home'
import {Products} from './Products'
import {Vendors} from './Vendors'
import {Invoices} from './Invoices'
import {NotFoundPage} from './NotFoundPage'

export const Main = ({products, vendors, invoices, product, vendor, invoice, invoiceTableData, handleMasterStateUpdate, handleInput, handleSubmit, setActiveItem, inventoryNeeds, currentDate, submitOrders}) => (
  <main>
    <Switch>
      <Route exact path='/' render={props => <Home inventoryNeeds={inventoryNeeds} currentDate={currentDate} submitOrders={submitOrders} {...props} />} />
      <Route path='/products' render={props => <Products products={products} product={product} vendors={vendors} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} {...props} />} />
      <Route path='/vendors' render={props => <Vendors vendors={vendors} vendor={vendor} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} {...props} />} />
      <Route path='/invoices' render={props => <Invoices invoices={invoices} invoice={invoice} product={product} invoiceTableData={invoiceTableData} vendors={vendors} products={products} handleMasterStateUpdate={handleMasterStateUpdate} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} {...props} />} />
      <Route component={NotFoundPage} />
    </Switch>
  </main>
)
