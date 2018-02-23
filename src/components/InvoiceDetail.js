import React from 'react'
import ReactTable from 'react-table'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import ProductAutosuggest from './ProductAutosuggest'
import moment from 'moment'
import { VIEW_INVOICE, ADD_INVOICE, UPDATE_INVOICE } from '../constants/actionTypes'
import agent from '../agent'

const mapStateToProps = state => {
  return {
    invoice: state.invoice,
    vendors: state.vendors
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: VIEW_INVOICE, payload }),
  updateInvoice: (payload) =>
    dispatch({type: UPDATE_INVOICE, payload }),
  createInvoice: (payload) =>
    dispatch({type: ADD_INVOICE, payload })
});

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: {},
      isNew: true
    }
  }
  componentDidMount() {
    this.props.match.params.number && this.props.onLoad(agent.Invoices.get(this.props.match.params.number))
  }

  componentWillReceiveProps = (prevProps) => {
    const isNew = this.props.match.params.number ? false : true
    if (prevProps !== this.state) {
       this.setState({
        invoice: {...prevProps.invoice},
        isNew
      })
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState((prevState) =>({
        ...prevState,
        invoice: {
          ...prevState.invoice,
          [name]: value
        }
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
      let {invoice, isNew} = this.state
      if (isNew) this.props.createInvoice(agent.Invoices.create(invoice))
      else this.props.updateInvoice(agent.Invoices.update(invoice))
  }

  render () {
    console.log(this.props)
    const {invoice, isNew} = this.state
    const { vendors } = this.props
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
      <Grid>
        <form onSubmit={e => {this.handleSubmit(e)}}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Invoice # </ControlLabel>
                <FormControl
                type='text'
                name='invoiceNum'
                value={invoice.invoiceNum}
                placeholder='Invoice #'
                onChange={e => {this.handleInput(e)}}
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
                onChange={e => {this.handleInput(e)}}
              />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>Vendor</ControlLabel>
                <FormControl componentClass='select' placeholder='select' name='vendor' value={invoice.vendor} onChange={e => {this.handleInput(e)}}>
                  <option value=''>none selected</option>
                  {vendorsList}
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md={4}>
            <ProductAutosuggest  />
          </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Price </ControlLabel>
                <FormControl
                type='number'
                name='price'
                value=''
                step='.01'
                onChange={e => {this.handleInput(e)}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Qty </ControlLabel>
                <FormControl
                type='number'
                name='qty'
                value=''
                step='.01'
                onChange={e => {this.handleInput(e)}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button bsStyle='primary' onClick={(e) => {this.handleSubmit(e)}}>Add Row</Button>
            </Col>
            <Col md={2}>
              <Button bsStyle='primary' onClick={(e) => {this.handleSubmit(e)}}>Save Invoice</Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
            <ReactTable
              data={data}
              columns={tableColumns}
              className="-striped -highlight"/>
          </Col>
        </Row>
          <Button bsStyle='success' type='submit'>{isNew ? 'Add' : 'Update'} Invoice</Button>
        </form>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail)
