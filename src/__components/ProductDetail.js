import React from 'react'
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import agent from '../agent'
import { VIEW_PRODUCT } from '../constants/actionTypes'

const mapStateToProps = state => {
  return {
    product: state.product,
    vendors: state.vendors
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: VIEW_PRODUCT, pager, payload })
});

class ProductDetail extends React.Component {
  componentDidMount = () => {
    this.props.onLoad(agent.Products.get, agent.Products.get(this.props.match.params.id))
  }

  render () {
    const {product, handleInput, handleSubmit, isNew, vendors} = this.props;
    const vendorsList = vendors.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
    const id = !isNew ? this.props.match.params.id : null;
    return (
        <form onSubmit={e => {handleSubmit(e, 'product', isNew, id)}}>
          <Row>
            <Col md={3}>
              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>Vendor</ControlLabel>
                <FormControl componentClass='select' placeholder='select' name='vendor' value={product.vendor} onChange={e => {handleInput(e, 'product')}}>
                  <option value=''>none selected</option>
                  {vendorsList}
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ControlLabel>Product ID </ControlLabel>
                <FormControl
                type='text'
                name='productId'
                value={product.productId}
                placeholder='Product ID'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col><Col md={6}>
              <FormGroup>
                <ControlLabel>Name </ControlLabel>
                <FormControl
                type='text'
                name='name'
                value={product.name}
                placeholder='Product Name'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <ControlLabel>Location </ControlLabel>
                <FormControl
                type='text'
                name='location'
                value={product.location}
                placeholder='Location'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ControlLabel>Category </ControlLabel>
                <FormControl
                type='text'
                name='category'
                value={product.category}
                placeholder='Category'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ControlLabel>Subcategory </ControlLabel>
                <FormControl
                type='text'
                name='subcategory'
                value={product.subcategory}
                placeholder='Subcategory'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Pack </ControlLabel>
                <FormControl
                type='number'
                name='pack'
                value={product.pack}
                step='.01'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Size </ControlLabel>
                <FormControl
                type='number'
                name='size'
                value={product.size}
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Unit </ControlLabel>
                <FormControl
                type='text'
                name='unit'
                value={product.unit}
                placeholder='Unit'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
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
                <ControlLabel>Par Level </ControlLabel>
                <FormControl
                type='number'
                name='parLevel'
                value={product.parLevel}
                step='.1'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <ControlLabel>Current Stock </ControlLabel>
                <FormControl
                type='number'
                name='currentStock'
                value={product.currentStock}
                step='.1'
                onChange={e => {handleInput(e, 'product')}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Button bsStyle='success' type='submit'>{isNew ? 'Add' : 'Update'} Product</Button>
        </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
