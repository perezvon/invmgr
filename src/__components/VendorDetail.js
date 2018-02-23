import React from 'react'
import {Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'

export default class VendorDetail extends React.Component {
  componentWillMount = () => {
    this.props.setActiveItem('vendor', this.props.isNew ? '' : this.props.match.params.id)
  }

  render () {
    const {vendor, handleInput, handleSubmit, isNew} = this.props;
    const id = !isNew ? this.props.match.params.id : null;
    return (
        <form onSubmit={e => {handleSubmit(e, 'vendor', isNew, id)}}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Name </ControlLabel>
                <FormControl
                type='text'
                name='name'
                value={vendor.name}
                placeholder='Vendor Name'
                onChange={e => {handleInput(e, 'vendor')}}
              />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Primary Contact </ControlLabel>
                <FormControl
                type='text'
                name='contact_1'
                value={vendor.contact_1}
                placeholder='Primary Contact'
                onChange={e => {handleInput(e, 'vendor')}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder="123 fake st..."
                  value={vendor.address}
                  name='address'
                  onChange={e => {handleInput(e, 'vendor')}}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <ControlLabel>Primary Contact Email</ControlLabel>
                <FormControl
                type='email'
                name='contact_email_1'
                value={vendor.contact_email_1}
                placeholder='Primary Contact Email'
                onChange={e => {handleInput(e, 'vendor')}}
              />
              </FormGroup>
            </Col>
          </Row>
          <Button bsStyle='success' type='submit'>{isNew ? 'Add' : 'Update'} Vendor</Button>
        </form>
    )
  }
}
