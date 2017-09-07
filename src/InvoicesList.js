import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row, Col, Table} from 'react-bootstrap'

const style = {cursor: 'pointer'}
export const InvoicesList = ({invoices}) => (
    <Row>
      <Col md={12}>
        <Table striped bordered responsive hover>
          <thead><tr><th>Invoice #</th><th>Vendor</th><th>Date</th></tr></thead>
          <tbody>
            {invoices.map((inv, i) =>
              <LinkContainer style={style} key={i} to={`/invoices/${inv.invoiceNum}`}>
                <tr data-id={inv._id}>
                  <td>{inv.invoiceNum}</td>
                  <td>{inv.vendor}</td>
                  <td>{inv.date}</td>
                </tr>
              </LinkContainer>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
)
