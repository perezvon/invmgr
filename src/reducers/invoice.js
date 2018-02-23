import {
  VIEW_INVOICE,
  ADD_INVOICE,
  UPDATE_INVOICE
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case VIEW_INVOICE:
    case ADD_INVOICE:
    case UPDATE_INVOICE:
      return action.payload
    default:
      return state
  }
}
