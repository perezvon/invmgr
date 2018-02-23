import React from 'react'
import {Row, Col, Table} from 'react-bootstrap'
import moment from 'moment'

export const InvoiceTableView = ({invoice, invoiceTableData}) => (
  <div>
    <Row>
      <Col md={4}><h1>Invoice #{invoice.invoiceNum}</h1></Col>
      <Col md={4}><h1>{invoice.vendor}</h1></Col>
      <Col md={4}><h1>{moment(invoice.date).format('MM/DD/YYYY')}</h1></Col>
    </Row>
    <Row>
      <Col md={12}>
        <Table striped bordered responsive>
          <thead><tr><th>Product ID</th><th>Name</th><th>Qty</th><th>Price</th></tr></thead>
          <tbody>{invoiceTableData}</tbody>
        </Table>
      </Col>
    </Row>
  </div>
)
