import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export const Navigation = ({vendors}) => (
<Navbar>
    <Navbar.Header>
      <LinkContainer to='/'><Navbar.Brand>Orderr</Navbar.Brand></LinkContainer>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavDropdown eventKey={1} title='Products' id='basic-nav-dropdown'>
          <LinkContainer to='/products'><MenuItem eventKey={1.1}>Products List</MenuItem></LinkContainer>
          <LinkContainer to='/products/new'><MenuItem eventKey={1.2}>Enter New Product</MenuItem></LinkContainer>
        </NavDropdown>
        <NavItem eventKey={2}>Inventory</NavItem>
        <NavDropdown eventKey={3} title='Invoices' id='basic-nav-dropdown'>
          <LinkContainer to='/invoices/new'><MenuItem eventKey={3.1}>Enter New Invoice</MenuItem></LinkContainer>
          <MenuItem divider />
          <LinkContainer to='/invoices'><MenuItem eventKey={3.2}>Manage Invoices...</MenuItem></LinkContainer>
        </NavDropdown>
        <NavDropdown eventKey={4} title='Vendors' id='basic-nav-dropdown'>
          {vendors}
          <MenuItem divider />
          <LinkContainer to='/vendors'><MenuItem eventKey={vendors ? vendors.length + 1/10 + 4 : 1}>Vendors List...</MenuItem></LinkContainer>
          <LinkContainer to='/vendors/new'><MenuItem eventKey={4.99}>New Vendor</MenuItem></LinkContainer>
      </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
