import React from 'react'
import {Row, Col, Button} from 'react-bootstrap'

import {InventoryTable} from './InventoryTable'

export const Home = ({inventoryNeeds, submitOrders, currentDate}) => (
  <Row>
    <h1>Today's Orders — {currentDate}</h1>
    <InventoryTable inventoryNeeds={inventoryNeeds} />
    <Col md={4} mdOffset={4}><Button bsStyle='success' bsSize='large' block onClick={submitOrders}>Submit Orders</Button></Col>
  </Row>
)
