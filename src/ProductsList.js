import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row, Col, Table} from 'react-bootstrap'

const style = {cursor: 'pointer'}
export const ProductsList = ({products}) => (
    <Row>
      <Col md={12}>
        <Table striped bordered responsive hover>
          <thead><tr><th>Vendor</th><th>Product ID</th><th>Product Name</th></tr></thead>
          <tbody>
            {products.map((p, i) =>
              <LinkContainer style={style} key={i} to={`/products/${p._id}`}>
                <tr data-id={p._id}>
                  <td>{p.vendor}</td>
                  <td>{p.productId}</td>
                  <td>{p.name}</td>
                </tr>
              </LinkContainer>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
)
