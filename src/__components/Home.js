import React from 'react'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {InventoryTable} from './InventoryTable'

const mapStateToProps = state => {
  return {
    date: state.common.date
  }};

class Home extends React.Component {
  
  render () {

    return (
      <Grid>
        <Row>
          <h1>Today's Orders — {this.props.date}</h1>
          <InventoryTable />
          <Col md={4} mdOffset={4}><Button bsStyle='success' bsSize='large' block onClick={e => console.log('hi')}>Submit Orders</Button></Col>
        </Row>
      </Grid>
    )
    }
  }

export default connect(mapStateToProps, {})(Home)
