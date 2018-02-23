import moment from 'moment'

import {
  APP_LOAD,
  SUBMIT_ORDERS
} from '../constants/actionTypes'

const defaultState = {
  appName: 'Orderr',
  date: moment().format('MMMM DD, YYYY')
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case SUBMIT_ORDERS:
      return {
        ...state,
        ordersSubmitted: true
      };
    default:
    return state
  }
}
