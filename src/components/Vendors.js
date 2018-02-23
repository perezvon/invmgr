import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Grid, Row, Col, Table} from 'react-bootstrap'
import { connect } from 'react-redux'
import agent from '../agent'
import {GET_VENDORS_LIST} from '../constants/actionTypes'
import {Loading} from './Loading'

const style = {cursor: 'pointer'}

const mapStateToProps = state => {
  return {
    vendors: state.vendors
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: GET_VENDORS_LIST, pager, payload })
});

class Vendors extends React.Component {
  componentDidMount = () => {
    this.props.onLoad(agent.Vendors.all, agent.Vendors.all())
  }
  render () {
    const {vendors} = this.props
    return (
      <Grid>
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
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendors)
