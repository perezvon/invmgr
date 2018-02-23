import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {VendorsList} from './VendorsList'
import VendorDetail from './VendorDetail'

export const Vendors = ({vendors, vendor, handleInput, handleSubmit, setActiveItem}) => (
  <Switch>
    <Route exact path='/vendors' render={props => <VendorsList vendors={vendors} {...props} />} />
    <Route exact path='/vendors/new' render={props => <VendorDetail isNew={true} vendor={vendor} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} {...props} />} />
    <Route path='/vendors/:id' render={props => <VendorDetail vendor={vendor} handleInput={handleInput} handleSubmit={handleSubmit} setActiveItem={setActiveItem} {...props} />} />
</Switch>
)
