import React from 'react'
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import agent from '../agent'
import { VIEW_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT } from '../constants/actionTypes'

const mapStateToProps = state => {
  return {
    product: state.product,
    products: state.products,
    vendors: state.vendors
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: VIEW_PRODUCT, payload }),
  updateProduct: (payload) =>
    dispatch({type: UPDATE_PRODUCT, payload }),
  createProduct: (payload) =>
    dispatch({type: ADD_PRODUCT, payload })
});

class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      isNew: true
    }
  }
  componentDidMount() {
    this.props.match.params.id && this.props.onLoad(agent.Products.get(this.props.match.params.id))
  }

  handleInput = (e) => {
    e.preventDefault()
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState((prevState) =>({
        ...prevState,
        product: {
          ...prevState.product,
          [name]: value
        }
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
      let {product, isNew} = this.state
      if (isNew) this.props.createProduct(agent.Products.create(product))
      else this.props.updateProduct(agent.Products.update(product))
  }

  componentWillReceiveProps = (prevProps) => {
    const isNew = this.props.match.params.id ? false : true
    if (prevProps !== this.state) {
       this.setState({
        product: {...prevProps.product},
        isNew
      })
    }
  }

  render () {
    const {vendors, products} = this.props
    const {product, isNew} = this.state
    const vendorsList = vendors.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
    const locations = new Set(products.map(p => p.location))
    const categories = new Set(products.map(p => p.category))
    const locationsList = [...locations].filter(l => !!l).map((item, index) => <option key={index} value={item}>{item}</option>)
    const categoriesList = [...categories].filter(c => !!c).map((item, index) => <option key={index} value={item}>{item}</option>)
    const id = !isNew ? this.props.match.params.id : null;
      return (
        <Grid>
          <form onSubmit={e => {this.handleSubmit(e, isNew, id)}}>
            <Row>
              <Col md={3}>
                <FormGroup controlId='formControlsSelect'>
                  <ControlLabel>Vendor </ControlLabel>
                  <FormControl componentClass='select' placeholder='select' name='vendor' value={product.vendor} onChange={e => {this.handleInput(e)}}>
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
                />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroup controlId='formControlsSelect'>
                  <ControlLabel>Location </ControlLabel>
                  <FormControl componentClass='select' placeholder='select' name='location' value={product.location} onChange={e => {this.handleInput(e)}}>
                    <option value=''>none selected</option>
                    {locationsList}
                    {/*<option value='new'>add new...</option>*/}
                  </FormControl>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup controlId='formControlsSelect'>
                  <ControlLabel>Category </ControlLabel>
                  <FormControl componentClass='select' placeholder='select' name='category' value={product.category} onChange={e => {this.handleInput(e)}}>
                    <option value=''>none selected</option>
                    {categoriesList}
                    {/*<option value='new'>add new...</option>*/}
                  </FormControl>
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
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
                  onChange={e => {this.handleInput(e)}}
                />
                </FormGroup>
              </Col>
            </Row>
            <Button bsStyle='success' type='submit'>{isNew ? 'Add' : 'Update'} Product</Button>
          </form>
          </Grid>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
