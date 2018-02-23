import {
  GET_INVOICES_LIST
} from '../constants/actionTypes'

export default (state = [], action) => {
  switch(action.type) {
    case GET_INVOICES_LIST:
      return action.payload
    default:
      return state
  }
}
