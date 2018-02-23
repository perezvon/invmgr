import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Row, Col, Table} from 'react-bootstrap'

const style = {cursor: 'pointer'}
export const VendorsList = ({vendors}) => (
    <Row>
      <Col md={12}>
        <Table striped bordered responsive hover>
          <thead><tr><th>Vendor Name</th></tr></thead>
          <tbody>
            {vendors.map((v, i) =>
              <LinkContainer style={style} key={i} to={`/vendors/${v._id}`}>
                <tr>
                  <td>{v.name}</td>
                </tr>
              </LinkContainer>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
)
