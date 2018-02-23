import React from 'react'
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

export const FileUpload = ({handleUpload}) => (
  <FormGroup controlId='fileUpload'>
      <ControlLabel>upload a file...</ControlLabel>
      <FormControl
        type='file'
        label='File'
        onChange={handleUpload}
      />
    </FormGroup>
)
