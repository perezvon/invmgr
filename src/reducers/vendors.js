import {
  ADD_VENDOR,
  UPDATE_VENDOR,
  GET_VENDORS_LIST
} from '../constants/actionTypes'

export default (state = [], action) => {
  switch(action.type) {
    case ADD_VENDOR:
      return {
        ...state,
        vendor: action.payload
      }
    case UPDATE_VENDOR:
      //TODO implement update logic
      return state
    case GET_VENDORS_LIST:
      return action.payload
    default:
      return state
  }
}
