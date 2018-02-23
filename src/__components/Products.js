import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Grid, Row, Col, Table} from 'react-bootstrap'
import { connect } from 'react-redux'
import agent from '../agent'
import {GET_PRODUCTS_LIST} from '../constants/actionTypes'
import {Loading} from './Loading'
const style = {cursor: 'pointer'}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: GET_PRODUCTS_LIST, pager, payload })
});

class Products extends React.Component{
  componentDidMount() {
    this.props.onLoad(agent.Products.all, agent.Products.all())
  }
  render () {
    if (this.props.products.length > 0) {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Table striped bordered responsive hover>
              <thead><tr><th>Vendor</th><th>Product ID</th><th>Product Name</th></tr></thead>
              <tbody>
                {this.props.products.map((p, i) =>
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
      </Grid>
    )}
    else {
      return <Loading />
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Products)
