import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {InventoryTable} from './InventoryTable'
import agent from '../agent'
import {GET_PRODUCTS_LIST, SUBMIT_ORDERS} from '../constants/actionTypes'

const mapStateToProps = state => {
  return {
    date: state.common.date,
    products: state.products
  }};

  const mapDispatchToProps = dispatch => ({
    getProducts: payload =>
      dispatch({type: GET_PRODUCTS_LIST, payload}),
    submitOrders: payload => {
      dispatch({type: SUBMIT_ORDERS, payload})
    }
  });

class Home extends React.Component {
  componentDidMount () {
    this.props.getProducts(agent.Products.all())
  }
  render () {
    let toOrder = []
    this.props.products.forEach(item => {
      let order = {}
      if (item.currentStock < item.parLevel) {
        order.productId = item.productId
        order.name = item.name
        order.vendor = item.vendor
        order.qty = item.parLevel - item.currentStock
        order.unit = item.unit
        toOrder.push(order)
      }
    })
    const inventoryNeeds = toOrder.map((item, index) =>
      <tr key={index}><td>{item.vendor}</td><td>{item.productId}</td><td>{item.name}</td><td>{item.qty + ' ' + item.unit}</td></tr>
    )
    return (
      <Grid>
        <Row>
          <h1>Today's Orders — {this.props.date}</h1>
          <InventoryTable inventoryNeeds={inventoryNeeds}/>
          <Col md={4} mdOffset={4}><Button bsStyle='success' bsSize='large' block onClick={e => this.props.submitOrders(agent.Orders.submit(toOrder))}>Submit Orders</Button></Col>
        </Row>
      </Grid>
    )
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
