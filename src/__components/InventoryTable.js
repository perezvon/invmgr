import React from 'react'
import {Row, Col, Table} from 'react-bootstrap'

export const InventoryTable = ({inventoryNeeds}) => (
    <Row>
      <Col md={12}>
        <Table striped bordered responsive>
          <thead><tr><th>Vendor</th><th>Product ID</th><th>Name</th><th>Qty Needed</th></tr></thead>
          <tbody>{inventoryNeeds}</tbody>
        </Table>
      </Col>
    </Row>
)
