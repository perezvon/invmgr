import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Grid, Row, Col, Table} from 'react-bootstrap'
import { connect } from 'react-redux'
import agent from '../agent'
import moment from 'moment'
import {GET_INVOICES_LIST} from '../constants/actionTypes'
import {Loading} from './Loading'

const style = {cursor: 'pointer'}

const mapStateToProps = state => {
  return {
    invoices: state.invoices
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: GET_INVOICES_LIST, pager, payload })
});

class Invoices extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Invoices.all, agent.Invoices.all())
  }
  render () {
    const invoices = this.props.invoices.filter(inv => !!inv.invoiceNum)
    return (
      <Grid>
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
                  <td>{moment(inv.date).format('MM/DD/YYYY')}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Invoices)
