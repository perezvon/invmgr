import React from 'react'
import ReactTable from 'react-table'
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import ProductAutosuggest from './ProductAutosuggest'
import moment from 'moment'

export default class InvoiceDetail extends React.Component {
  componentWillMount = () => {
    this.props.setActiveItem('invoice', this.props.isNew ? '' : this.props.match.params.invoiceNum)
  }

  render () {
    const {invoice, product, handleMasterStateUpdate, handleInput, handleSubmit, isNew, vendors, products} = this.props;
    const vendorsList = vendors.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
    const id = !isNew ? this.props.match.params.invoiceNum : null;
    const data = invoice.data
    const tableColumns = [{
      Header: 'Product ID',
      accessor: 'productId'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Price',
      accessor: 'price'
    }, {
      Header: 'Qty',
      accessor: 'qty'
    }]
    return (
        <form onSubmit={e => {handleSubmit(e, 'invoice', isNew, id)}}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Invoice # </ControlLabel>
                <FormControl
                type='text'
                name='invoiceNum'
                value={invoice.invoiceNum}
                placeholder='Invoice #'
                onChange={e => {handleInput(e, 'invoice')}}
              />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ControlLabel>Date </ControlLabel>
                <FormControl
                type='date'
                name='date'
                value={moment(invoice.date).format('YYYY-MM-DD')}
                onChange={e => {handleInput(e, 'invoice')}}
              />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>Vendor</ControlLabel>
                <FormControl componentClass='select' placeholder='select' name='vendor' value={invoice.vendor} onChange={e => {handleInput(e, 'invoice')}}>
                  <option value=''>none selected</option>
                  {vendorsList}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md={4}>
            <ProductAutosuggest products={products} handleMasterStateUpdate={handleMasterStateUpdate} />
          </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Price </ControlLabel>
                <FormControl
                type='number'
                name='price'
                value={product.price}
                step='.01'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Qty </ControlLabel>
                <FormControl
                type='number'
                name='qty'
                value={product.qty}
                step='.01'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button bsStyle='primary' onClick={(e) => {handleSubmit(e, 'invoice', isNew, id)}}>Add Row</Button>
            </Col>
            <Col md={2}>
              <Button bsStyle='primary' onClick={(e) => {handleSubmit(e, 'invoice', isNew, id)}}>Save Invoice</Button>
            </Col>
          </Row>
          <Row><Col md={12}><ReactTable data={data} columns={tableColumns} className="-striped -highlight"/></Col></Row>
          <Button bsStyle='success' type='submit'>{isNew ? 'Add' : 'Update'} Invoice</Button>
        </form>
    )
  }
}
