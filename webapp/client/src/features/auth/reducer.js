import {
  LOADING_USER,
  SET_CURRENT_USER,
  GET_ERRORS,
  SET_LOCATION_PATH,
  SET_UNNAUTHOROZID,
  FIRE_SSOSILENT,
  CLOSE_UNNAUTHOROZID_MODAL,
} from './types';

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  locationPath: '',
  isUnauthorized: false,
  fireSsoSilent: false,
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
    case SET_UNNAUTHOROZID:
      return {
        ...state,
        isUnauthorized: true,
      };
    case FIRE_SSOSILENT:
      return {
        ...state,
        fireSsoSilent: true,
      };
    case CLOSE_UNNAUTHOROZID_MODAL:
      return {
        ...state,
        isUnauthorized: false,
      };
    default:
      return state;
  }
}
