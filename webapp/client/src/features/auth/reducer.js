// TODO: refactor according the auth srategy
import {
  LOADING_USER,
  SET_CURRENT_USER,
  GET_ERRORS,
  SET_LOCATION_PATH,
} from './types';

// const isEmpty = require('is-empty');
const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: false, // TODO: Refactor this with server errors validation,
  locationPath: '',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        // isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
        error: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SET_LOCATION_PATH:
      console.log(action.payload);
      return {
        ...state,
        locationPath: JSON.parse(action.payload),
      };
    default:
      return state;
  }
}
