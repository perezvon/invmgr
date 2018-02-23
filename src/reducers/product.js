import {
  VIEW_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case VIEW_PRODUCT:
    case ADD_PRODUCT:
    case UPDATE_PRODUCT:
      return action.payload
    default:
      return state
  }
}
