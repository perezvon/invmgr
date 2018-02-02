import {
  ADD_PRODUCT,
  UPDATE_PRODUCT
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: action.payload
      }
  }
}
