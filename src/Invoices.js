import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {InvoicesList} from './InvoicesList'
import InvoiceDetail from './InvoiceDetail'
import {InvoiceTableView} from './InvoiceTableView'

export const Invoices = ({invoices, invoice, invoiceTableData, vendors, products, handleMasterStateUpdate, handleInput, handleSubmit, setActiveItem}) => (
  <Switch>
    <Route exact path='/invoices' render={props => <InvoicesList invoices={invoices} {...props} />} />
    <Route exact path='/invoices/new' render={props => <InvoiceDetail isNew={true} products={products} invoice={invoice} vendors={vendors} handleMasterStateUpdate={handleMasterStateUpdate} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} {...props} />} />
    <Route path='/invoices/:invoiceNum' render={props => <InvoiceTableView invoice={invoice} invoiceTableData={invoiceTableData} {...props} />} />
  </Switch>
)
