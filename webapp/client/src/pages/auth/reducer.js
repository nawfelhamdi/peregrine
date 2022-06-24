// TODO: refactor according the auth srategy
import { LOADING_USER, SET_CURRENT_USER, GET_ERRORS } from './types';

// const isEmpty = require('is-empty');
const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: false, // TODO: Refactor this with server errors validation
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
    default:
      return state;
  }
}
